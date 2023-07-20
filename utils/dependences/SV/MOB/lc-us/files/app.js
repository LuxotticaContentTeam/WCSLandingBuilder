/*! lux-b2c-lenscrafters - v0.0.1 - 2023-06-14 */var app = angular.module('LensCraftersApp', [
	'ngSidebarJS',
	'ngCookies',
	'angularMoment',
	'lcInsuranceModule',
	'lcPrescriptionModule',
	'lcActionsModule',
	'angularMask',
	'vcRecaptcha',
	'ngMagnify',
	'headerModule',
	'selectize',
	'frameAdvisorModule'
]);

app.config(['$httpProvider', function ($httpProvider) {
	//initialize get if not there
	if (!$httpProvider.defaults.headers.get) {
		$httpProvider.defaults.headers.get = {};
	}
	$httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
	$httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
	$httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
}]);

// turn angular routing url rewrites into a no-op
app.config( ['$provide', function ($provide) {
	$provide.decorator('$browser', ['$delegate', function ($delegate) {
		$delegate.onUrlChange = function () {};
		$delegate.url = function () { return "" };
		return $delegate;
	}]);
}]);

/* PDP-LENSPANEL INTEGRATION */

// tealium
var tealium_data2track = tealium_data2track || [];


app.controller('accountController', function ($scope, $rootScope, $window, $timeout, $q, $log, $http, lpModalService, lpRest, lcInsurance, lcPrescription, $compile) {
	$scope.logoutFB = function () {
		FB.logout(function(response) {
			//logout
			//alert(response.status);
		});
	}
	FB.Event.subscribe('auth.statusChange', function(response) {
	    if(response.status === 'connected') {
	    	//logging 
	    	$scope.testAPI();
	    	//callback
	    }
	});
	
	$scope.testAPI = function () {
	    console.log('Welcome!  Fetching your information.... ');
	    FB.api('/me?fields=name,email', function(response) {
	    	alert('Successful login for: ' + response.name);
	    	alert('Successful login for: ' + response.email);
	    	console.log(response);
	    });
	}
});

// PDP CONTROLLER
app.controller('pdpController', function ($scope, $rootScope, $window, $timeout, $q, $log, $http, lcActionsModule, lcInsurance, lcPrescription, $compile) {
	$scope.showModalImage = false;
	$scope.thisImage = '';
	$scope.lcInsurance = lcInsurance;
	$scope.zoomImageVar = false;

	$scope.closeModalImage = function () {
		$scope.showModalImage = false;
		$scope.thisImage = '';
		angular.element('.image-modal.slick-active img').removeClass('image-fullscreen-double');
		angular.element('.image-modal.slick-active').removeClass('image-overflow');
		$('.container-image-fullscreen').slick("slickSetOption", "swipe", true, true);
		$scope.zoomImageVar = false;
		angular.element('#header_wrapper').removeAttr('style');
		angular.element(document).find('body').removeAttr('style');
		$('.container-image-fullscreen').slick("unslick");
	}

	$scope.zoomImage = function (id) {
		if ($scope.zoomImageVar) {
			//Chiudo zoom
			angular.element('.image-modal.slick-active img').removeClass('image-fullscreen-double');
			angular.element('.image-modal.slick-active').removeClass('image-overflow');
			angular.element('.container-image-fullscreen').removeClass('container-image-fullscreen-db');
			$scope.zoomImageVar = false;
			$('.container-image-fullscreen').slick("slickSetOption", "swipe", true, true);
		} else {
			//Apro zoom
			$('.container-image-fullscreen').on('beforeChange', function (event, slick,
				currentSlide, nextSlide) {
				angular.element('.image-modal.slick-active img').removeClass('image-fullscreen-double');
				angular.element('.image-modal.slick-active').removeClass('image-overflow');
				angular.element('.container-image-fullscreen').removeClass('container-image-fullscreen-db');
				$('.container-image-fullscreen').slick("slickSetOption", "swipe", true, true);
				$scope.zoomImageVar = false;
			});
			//$('.container-image-fullscreen').slickSetOption({swipe: false});
			$('.container-image-fullscreen').slick("slickSetOption", "swipe", false, false);
			angular.element('.image-modal.slick-active img').addClass('image-fullscreen-double');
			angular.element('.image-modal.slick-active').addClass('image-overflow');
			angular.element('.container-image-fullscreen').addClass('container-image-fullscreen-db');
			$scope.zoomImageVar = true;
		}
	};

	$scope.openImageFullScreen = function (image, id, isMobile) {
		$scope.showModalImage = true;
		$scope.thisImage = image;
		if (isMobile === 'true') {
			$('.container-image-fullscreen').slick({
				dots: true,
				infinite: true,
				fade: true,
				cssEase: 'linear',
				initialSlide: id
			});
			angular.element(document).find('body').css('overflow', 'hidden');

			var element = angular.element('.image-full-mobile');
			element.on('touchstart', touchstartHandler);
			element.on('touchmove', touchmoveHandler);
			element.on('touchend', touchendHandler);

		} else {
			angular.element('#header_wrapper').css('z-index', '9');
			$('.container-image-fullscreen').slick({
				dots: true,
				infinite: true,
				fade: true,
				cssEase: 'linear',
				initialSlide: id
			});
		}
		angular.element('.container-image-fullscreen .slick-dots .slick-active').click();
	};

	var mode = '';
	var distance = 0;
	var initialDistance = 0;
	var scale = 1;
	var relativeScale = 1;
	var initialScale = 1;
	var positionX = 0;
	var positionY = 0;
	var initialPositionX = 0;
	var initialPositionY = 0;
	var originX = 0;
	var originY = 0;

	function touchstartHandler(evt) {
		var touches = evt.originalEvent ? evt.originalEvent.touches : evt.touches;
	}

	function touchmoveHandler(evt) {
		var touches = evt.originalEvent ? evt.originalEvent.touches : evt.touches;

		if (mode === '') {
			if (touches.length === 2) {
				mode = 'pinch';

				initialScale = scale;
				initialDistance = getDistance(touches);
			}
		}

		if (mode === 'pinch') {
			evt.preventDefault();

			distance = getDistance(touches);
			relativeScale = distance / initialDistance;
			scale = relativeScale * initialScale;
		}
	}

	function touchendHandler(evt) {
		var touches = evt.originalEvent ? evt.originalEvent.touches : evt.touches;

		if (mode === '' || touches.length > 0) {
			return;
		}

		if (scale < 1) {
			if ($scope.zoomImageVar) {
				//Chiudo zoom
				angular.element('.image-modal.slick-active img').removeClass('image-fullscreen-double');
				angular.element('.image-modal.slick-active').removeClass('image-overflow');
				angular.element('.container-image-fullscreen').removeClass('container-image-fullscreen-db');
				$scope.zoomImageVar = false;
				$('.container-image-fullscreen').slick("slickSetOption", "swipe", true, true);
			}
		} else if (scale > 1) {
			//Apro zoom
			if (!$scope.zoomImageVar) {
				$('.container-image-fullscreen').on('beforeChange', function (event, slick,
					currentSlide, nextSlide) {
					angular.element('.image-modal.slick-active img').removeClass('image-fullscreen-double');
					angular.element('.image-modal.slick-active').removeClass('image-overflow');
					angular.element('.container-image-fullscreen').removeClass('container-image-fullscreen-db');
					$('.container-image-fullscreen').slick("slickSetOption", "swipe", true, true);
					$scope.zoomImageVar = false;
				});
				$('.container-image-fullscreen').slick("slickSetOption", "swipe", false, false);
				angular.element('.image-modal.slick-active img').addClass('image-fullscreen-double');
				angular.element('.image-modal.slick-active').addClass('image-overflow');
				angular.element('.container-image-fullscreen').addClass('container-image-fullscreen-db');
				$scope.zoomImageVar = true;
			}
		}

		mode = '';
	}

	function getDistance(touches) {
		var d = Math.sqrt(Math.pow(touches[0].clientX - touches[1].clientX, 2) +
			Math.pow(touches[0].clientY - touches[1].clientY, 2));
		return parseInt(d, 10);
	}

	// RXC integration object
	$rootScope.rxc = null;

	// lens initializations
	$scope.isLoadingLens = false;
	$scope.isLoadingInsurance = lcInsurance.isLoading();
	$scope.isCalculatingPrices = false;
	$scope.hasLenses = false;

	$scope.lensData = {};

	// TODO to remove selectedPerkCode and selectedLens
	$scope.selectedPerkCode = null;
	$scope.selectedLens = null;

	$scope.prices = {
		framePrice: 0.00,
		frameSaving: 0.00,
		lensPrice: 0.00,
		lensSaving: 0.00,
		totalSaving: 0.00,
		insuranceSaving: 0.00,
		perkSaving: 0.00,
		warrantyPrice: 0.00,
		total: 0.00,
		full: 0.00
	};

	$scope.frameRXValues = null;

	$scope.BFPercentage = null;
	$scope.BFClass = null;

	// Initialization
	$scope.init = function (_params) {
		$scope.params = _params;

		if (lcPrescription && $scope.params.isPrescriptionEnabled) {
			lcPrescription.init($scope.params.storeId, $scope.params.catalogId);
			$scope.frameRXValues = lcPrescription.getFrameRXValues(_params.frameMinTotalPower, _params.frameMaxTotalPower);
		}

		// TODO to remove perk code
		lcActionsModule.selectedPerkCode = $scope.selectedPerkCode = getSelectedPerkCode();

		$scope.isLoadingLens = true;

		$timeout(function () {
			// Init RXC object
			$rootScope.rxc = {};

			// Call RXC lens service
			$http.get('/wcs/resources/store/' + $scope.params.storeId + '/catalog/' + $scope.params.catalogId +
				'/rxc/frameId/' + $scope.params.frameId + '/lenses')
				.then(function (response) {
					if (response && response.data && response.data.response && response.data.response.status == 'ok') {
						angular.merge($scope.lensData, response.data.response.data);

						var planoPackage = null;

						if ($scope.lensData && $scope.lensData.packages && $scope.lensData.packages.length > 0) {
							planoPackage = $scope.lensData.packages.filter(function (currentPackage) {
								if (currentPackage.lensPackage.upc == $scope.params.frameOnlyLensUPC) {
									return currentPackage;
								}
							});

							var listGVPPairs = $scope.lensData.packages.filter(function (currentPackage) {
								return currentPackage.frame.promoType == "GVP";
							});
							$scope.params.isGVPFrameAndLens = listGVPPairs.length > 0 ? true : false;

							$scope.params.isFrameAndLensDetailGVP = $scope.lensData.packages.filter(function (currentPackage) {
								return currentPackage.frame.promoTypeDetail == "GVP";
							}).length > 0 ? true : false;
							$scope.params.isFrameAndLensDetailAEO = $scope.lensData.packages.filter(function (currentPackage) {
								return currentPackage.frame.promoTypeDetail == "AEO";
							}).length > 0 ? true : false;
							$scope.params.isFrameAndLensDetailBOM = $scope.lensData.packages.filter(function (currentPackage) {
								return currentPackage.frame.promoTypeDetail == "BOM";
							}).length > 0 ? true : false;

							$rootScope.isGVPFrameAndLens = $scope.params.isGVPFrameAndLens;

							// Disable warranty for STELLA products
							if ($scope.params.isStellaProduct) {
								$scope.lensData.warrantyOptions = null;
							}
							
							// Select plano
							if (planoPackage && planoPackage.length == 1) {
								planoPackage = planoPackage[0];

								$rootScope.rxc.selectedFrame = planoPackage.frame;
								$rootScope.rxc.selectedLens = planoPackage.lensPackage;

								// Global add to cart variables
								lensSelected = true;
								includeLens = true;
								frameCatentryId = $scope.params.frameId;
								currentOrderId = $scope.params.currentOrderId ? $scope.params.currentOrderId : '';

								// Remove plano package from packages count
								$scope.hasLenses = ($scope.lensData.packages.length - 1 > 0) ? true : false;
							} else {
								$scope.hasLenses = true;
							}
							$('head').append(document.getElementById('rxcCssUrl').value);
						} else {
							$scope.hasLenses = false;
						}
					} else {
						$scope.hasLenses = false;
					}
				}, function (error) {
					$log.error(error);
					tealium_data2track.push({
						'id': 'Error',
						'Error_Code': 'RXC service error',
						'Error_Source': 'Client'
					});

					$scope.hasLenses = false;
				})
				.finally(function () {
					$scope.isLoadingLens = false;

					$scope.genericCalculatePrices().then(function(response) {
						if ($scope.isGVPFrame) {
							$scope.genericCalculateGvpPrice();
						}
					});
				});
		});
		initCarousel();
	};

	// TODO to remove perk code
	var getSelectedPerkCode = function () {
		var searchString = $window.location.search.substring(1);
		var queryParams = searchString.split('&');

		for (var i = 0; i < queryParams.length; i++) {
			queryParam = queryParams[i].split('=');

			if (queryParam[0] == 'selectedPerkCode')
				return queryParam[1];
		}

		return null;
	};

	var showHiddenElement = function () {
		angular.element(document.getElementById('footer_wrapper')).removeClass("hidden");
		angular.element(document.getElementById('header_wrapper')).removeClass("hidden");
		angular.element(document.getElementById('pdp-wrapper')).removeClass("hidden");
		angular.element(document.getElementById('site-breadcrumb')).removeClass("hidden");
		angular.element(document.getElementById('footer_wrapper')).removeClass("hidden");
		angular.element(document.getElementById('header_wrapper')).removeClass("hidden");
		angular.element(document.getElementById('pdp-wrapper')).removeClass("hidden");
		angular.element(document.getElementById('site-breadcrumb')).removeClass("hidden");
		angular.element(document.getElementById('main-navigation')).removeClass("hidden");
		angular.element(document.getElementById('main-content-comp')).removeClass("hidden");
	};

	$scope.resetPrices = function () {
		$scope.prices = {
			framePrice: 0.00,
			frameSaving: 0.00,
			lensPrice: 0.00,
			lensSaving: 0.00,
			totalSaving: 0.00,
			insuranceSaving: 0.00,
			perkSaving: 0.00,
			warrantyPrice: 0.00,
			total: 0.00
		};
	};

	$scope.isGVPFrame = function () {
		return $scope.lensData.frame && $scope.lensData.frame.promotions && $scope.lensData.frame.promotions.completePairAvailable ? true : false;
	};

	$scope.isGVPLens = function () {
		return $scope.selectedLens && $scope.selectedLens.promotions && $scope.selectedLens.promotions.completePairAvailable ? true : false;
	};

	$scope.isBFEnabled = function () {
		return bfEnabled($scope.params.framePartNumber);
	};

	$scope.getBFClass = function () {
		return $scope.BFClass;
	};

	// Calculate prices for RXC
	$rootScope.genericCalculatePrices = function () {
		var _defer = $q.defer();
		var _isResolved = false;
		var _rejectError = null;

		if ($scope.isCalculatingPrices) {
			_defer.reject();
			return _defer.promise;
		}

		if (!$scope.params.frameOfferPrice) {
			_defer.reject();
			return _defer.promise;
		}
		
		var updateWarrantyTotals = function (_startingPrice, _finalPrice) {
			if ($rootScope.rxc.selectedWarranty) {
				$scope.prices.warrantyPrice = parseFloat($rootScope.rxc.selectedWarranty.price);
				_finalPrice += $scope.prices.warrantyPrice;
			}

			$scope.prices.totalSaving = (_startingPrice - _finalPrice);
			$scope.prices.total = _finalPrice;
			$scope.prices.full = parseFloat($scope.prices.total) + parseFloat($scope.prices.totalSaving);

			var affirmProductElem = document.getElementById("affirm-product");

			if (affirmProductElem && typeof affirm.ui.refresh === 'function') {
				affirmProductElem.setAttribute('data-amount', _finalPrice * 100);
				affirm.ui.refresh();
			}

			$scope.isCalculatingPrices = false;
		};

		$scope.isCalculatingPrices = true;

		// Reset prices
		$scope.resetPrices();

		try {
			$scope.prices.framePrice = parseFloat($scope.params.frameOfferPrice);

			var _startingPrice = $scope.prices.framePrice;
			var _finalPrice = $scope.prices.framePrice;

			if (lcInsurance.isEnabled()) {
				// Insurance enabled
				var data = {
					storeId: $scope.params.storeId,
					catalogId: $scope.params.catalogId,
					langId: $scope.params.langId,
					pricingEntries: [],
				};

				if (!$rootScope.rxc.selectedFrame ||
					($rootScope.rxc.selectedFrame && $rootScope.rxc.selectedFrame.insPrice == null)) {
					// If insurance price is not set
					data.pricingEntries[0] = {};
					data.pricingEntries[0].frame = {
						price: $scope.params.frameOfferPrice,
						upc: $scope.params.framePartNumber,
						quantity: '1',
						type: 'f'
					};
				} else if ($rootScope.rxc.selectedFrame && $rootScope.rxc.selectedFrame.insPrice !== null) {
					// If insurance price is already set
					$scope.prices.framePrice = parseFloat($rootScope.rxc.selectedFrame.insPrice);
					$scope.prices.frameSaving = Math.max(0.0, parseFloat($scope.params.frameOfferPrice) - $scope.prices.framePrice);
					$scope.prices.insuranceSaving += $scope.prices.frameSaving;
				}

				if ($rootScope.rxc.selectedLens) {
					_startingPrice += parseFloat($rootScope.rxc.selectedLens.listPrice);

					if ($rootScope.rxc.selectedLens.insurable !== false &&
						$rootScope.rxc.selectedLens.insPrice == null &&
						$rootScope.rxc.selectedLens.upc !== $scope.params.frameOnlyLensUPC) {
						// If lens is insurable and insurance price is not set
						data.pricingEntries[0].lens = {
							price: $rootScope.rxc.selectedLens.listPrice,
							upc: $rootScope.rxc.selectedLens.upc,
							quantity: '1',
							type: 'l'
						};
					} else if ($rootScope.rxc.selectedLens.insurable !== false && $rootScope.rxc.selectedLens.insPrice !== null) {
						// If lens is insurable and insurance price is already set
						$scope.prices.lensPrice = parseFloat($rootScope.rxc.selectedLens.insPrice);
						$scope.prices.lensSaving = Math.max(0.0, parseFloat($rootScope.rxc.selectedLens.listPrice) - $scope.prices.lensPrice);
						$scope.prices.insuranceSaving += $scope.prices.lensSaving;
					}
				}

				if (data.pricingEntries.length > 0) {
					// Get insurance discounts
					lcInsurance.getDiscounts(data)
						.then(function (response) {
							if (response[0].frame &&
								response[0].frameDiscount !== null &&
								typeof response[0].frameDiscount !== 'undefined') {
								$scope.prices.framePrice = Math.max(0.00, parseFloat($scope.params.frameOfferPrice) - response[0].frameDiscount);
								$scope.prices.frameSaving = response[0].frameDiscount;
								$scope.prices.insuranceSaving += response[0].frameDiscount;
							}

							if (response[0].lens &&
								response[0].lensDiscount !== null &&
								typeof response[0].lensDiscount !== 'undefined') {
								$scope.prices.lensPrice = Math.max(0.00, parseFloat($rootScope.rxc.selectedLens.listPrice) - response[0].lensDiscount);
								$scope.prices.lensSaving = response[0].lensDiscount;
								$scope.prices.insuranceSaving += response[0].lensDiscount;
							}

							_isResolved = true;
						}, function (error) {
							tealium_data2track.push({
								'id': 'Error',
								'Error_Code': 'Error getting insurance discount',
								'Error_Source': 'Client'
							});

							_isResolved = false;
							_rejectError = error;
						})
						.finally(function () {
							_finalPrice = $scope.prices.framePrice + $scope.prices.lensPrice;

							updateWarrantyTotals(_startingPrice, _finalPrice);

							_isResolved ? _defer.resolve() : _defer.reject(_rejectError);
						});
				} else {
					_finalPrice = $scope.prices.framePrice + $scope.prices.lensPrice;

					updateWarrantyTotals(_startingPrice, _finalPrice);

					_defer.resolve();
				}
			} else {
				// Insurance disabled
				if (bfEnabled($scope.params.framePartNumber)) {
					if (bf.inclusion && bf.inclusion != undefined && bf.inclusion[$scope.params.framePartNumber]) {
						$scope.BFPercentage = bf.inclusion[$scope.params.framePartNumber] * 100 + '% Off';
						$scope.BFClass = 'badge_' + bf.inclusion[$scope.params.framePartNumber] * 100 + ' badge-bf';
					}
				}

				if ($rootScope.rxc.selectedFrame) {
					$scope.prices.framePrice = parseFloat($rootScope.rxc.selectedFrame.offerPrice);
					$scope.prices.frameSaving = Math.max(0.00, parseFloat($scope.params.frameOfferPrice)
						- $scope.prices.framePrice);
					_finalPrice = $scope.prices.framePrice;
				}

				if ($rootScope.rxc.selectedLens) {
					_startingPrice += parseFloat($rootScope.rxc.selectedLens.listPrice);
					$scope.prices.lensPrice = parseFloat($rootScope.rxc.selectedLens.offerPrice);
					$scope.prices.lensSaving = Math.max(0.00, parseFloat($rootScope.rxc.selectedLens.listPrice)
						- $scope.prices.lensPrice);
					_finalPrice += $scope.prices.lensPrice;
				}

				updateWarrantyTotals(_startingPrice, _finalPrice);

				_defer.resolve();
			}
		} catch (error) {
			$scope.isCalculatingPrices = false;
			var errorMessage = 'Error during calculate price';
			tealium_data2track.push({
				'id': 'Error',
				'Error_Code': errorMessage,
				'Error_Source': 'Client'
			});
			$log.error(error);
			_defer.reject(error);
		}

		return _defer.promise;
	}

	$scope.getLensAttributeContent = function (_attrName, _attrValue) {
		var _content = null;

		if ($scope.lensData && $scope.lensData.content && _attrName && _attrValue) {
			try {
				_content = $scope.lensData.content[_attrName][_attrValue];
			} catch (e) {
				console.warn('Unable to get content for attribute ' + _attrName + ' and value ' + _attrValue);
			}
		}

		return _content;
	};

	$scope.genericCalculateGvpPrice = function () {
		var getPrice = function (node) {

			var minPrice;

			const nodeGVP = node.filter(function(pack) {
				return pack.frame.promoType === "GVP";
			});

			if(nodeGVP.length){
				minPrice = parseFloat(nodeGVP[0].lensPackage.offerPrice) + parseFloat(nodeGVP[0].frame.offerPrice);
				for (var i = 1; i < nodeGVP.length; i++) {
					if (parseFloat(nodeGVP[i].lensPackage.offerPrice) + parseFloat(nodeGVP[i].frame.offerPrice) < minPrice){
						minPrice = parseFloat(nodeGVP[i].lensPackage.offerPrice) + parseFloat(nodeGVP[i].frame.offerPrice);
					}
				}
			} else {
 				minPrice = $scope.prices.total;
 			}

			return minPrice;
		}

		if (!$scope.lensData || !$scope.lensData.packages) {
			$scope.prices.gvpBasePrice = $scope.prices.total;
			return;
		}

		$scope.prices.gvpBasePrice = getPrice($scope.lensData.packages , $scope.prices.total);
	};

	var insuranceAnalytics = function () {
		try {
			tealium_data2track.push({
				id: 'Click',
				Click_FocusElement: document.getElementById('insurance-switch'),
				Tracking_Type: 'link',
				data_element_id: 'X_Pdp_Prod_UseInsurance',
				data_description: 'X_Pdp_Prod_UseInsurance'
			});
		} catch (err) {
			$log.error(err);
		}
	};

	$scope.toggleInsurance = function () {
		insuranceAnalytics();
		lcInsurance.toggleInsurance();
	}

	// Listen to insurance login event (switch)
	$scope.$on(lcInsurance.getEvents().INSURANCE_ENABLED, function () {

		try {
			tealium_data2track.push({
				id: 'Click',
				Click_FocusElement: document.getElementById('insurance-switch'),
				Tracking_Type: 'link',
				data_element_id: 'X_Pdp_Prod_UseInsurance',
				data_description: 'X_Pdp_Prod_UseInsurance'
			});
		} catch (err) {
			$log.error(err);
		}

		// If perk active
		if ($scope.selectedPerkCode !== null && $scope.selectedPerkCode !== '') {
			$window.location.href = $window.location.origin + $window.location.pathName;
			return;
		}

		$timeout(function () {
			// Recalculate PDP prices if RXC is hidden to avoid concurrency
			if (!$rootScope.rxc.rxcWidget) {
				$scope.genericCalculatePrices().then(function(response) {
					if ($scope.isGVPFrame) {
						$scope.genericCalculateGvpPrice();
					}
				});
			}
		});
	});

	// Listen to insurance login
	$scope.$on(lcInsurance.getEvents().INSURANCE_DISABLED, function () {
		$window.location.reload();
	});

	$scope.genericEditLens = function () {
		var paymentInstallmentTypes = [];
		var multiplePaymentInstallmentValue = false;
		var singleTypeOnly = '';
		var espotContentIdentifier = 'X_PDP_Installments_All';
		if($scope.params.isAffirmEnabled && $scope.params.isAfterpayEnabled && $scope.params.isKlarnaEnabled){
			paymentInstallmentTypes = ['klarna', 'affirm', 'afterpay'];
			multiplePaymentInstallmentValue = true;
			espotContentIdentifier = 'X_PDP_Installments_All';
		}
		if(!$scope.params.isAfterpayEnabled && !$scope.params.isKlarnaEnabled && $scope.params.isAffirmEnabled){
			paymentInstallmentTypes = ['affirm'];
			multiplePaymentInstallmentValue = false;
			singleTypeOnly = 'affirm';
		}
		if(!$scope.params.isAffirmEnabled && !$scope.params.isKlarnaEnabled && $scope.params.isAfterpayEnabled){
			paymentInstallmentTypes = ['afterpay'];
			multiplePaymentInstallmentValue = false;
			singleTypeOnly = 'afterpay';
		}
		if(!$scope.params.isAffirmEnabled && !$scope.params.isAfterpayEnabled && $scope.params.isKlarnaEnabled){
			paymentInstallmentTypes = ['klarna'];
			multiplePaymentInstallmentValue = false;
			singleTypeOnly = 'klarna';
		}
		if($scope.params.isAffirmEnabled && !$scope.params.isAfterpayEnabled && $scope.params.isKlarnaEnabled){
			paymentInstallmentTypes = ['klarna', 'affirm'];
			multiplePaymentInstallmentValue = true;
			espotContentIdentifier = 'X_PDP_Installments_Affirm_Klarna';
		}
		if($scope.params.isAffirmEnabled && $scope.params.isAfterpayEnabled && !$scope.params.isKlarnaEnabled){
			paymentInstallmentTypes = ['affirm', 'afterpay'];
			multiplePaymentInstallmentValue = true;
			espotContentIdentifier = 'X_PDP_Installments_Affirm_Afterpay';
		}
		if(!$scope.params.isAffirmEnabled && $scope.params.isAfterpayEnabled && $scope.params.isKlarnaEnabled){
			paymentInstallmentTypes = ['klarna', 'afterpay'];
			multiplePaymentInstallmentValue = true;
			espotContentIdentifier = 'X_PDP_Installments_Afterpay_Klarna';
		}
		var config = {
			selector: '#rxcApp',
			currencyFormat: {
				thousandSeparator: ",",
				decimalSeparator: ".",
				prefix: "$",
			},
			insuranceModule: $scope.params.isRiaEnabled ? lcInsurance : null,
			prescriptionModule: $scope.params.isPrescriptionEnabled ? lcPrescription : null,
			actionsModule: lcActionsModule,
			lensesData: $scope.params.lensData,
			data: {
				langId: $scope.params.langId,
				frame: {
					catEntryId: $scope.params.frameId,
					name: $scope.params.frameName,
					upc: $scope.params.framePartNumber,
					model: $scope.params.frameModel,
					color: $scope.params.frameColor,
					listPrice: $scope.params.frameOfferPrice,
					brand: $scope.params.frameBrand,
					category: $scope.params.frameCategory,
					imageUrl: $scope.params.frameImage.replace('_001', '_002').replace('imwidth=200', 'imwidth=680'),
					brandImageUrl: 'https://assets.lenscrafters.com/extra/image/LensCrafters/brands/LC_' + $scope.params.frameBrand.replace(/ /g, '_') + '_Logo.png',
					rxValues: $scope.frameRXValues,
				},
				frameOnlyLensUPC: $scope.params.frameOnlyLensUPC,
				showFrameOnly: $scope.params.frameCategory.toUpperCase() !== 'SUNGLASSES',
			},
			learnMoreBaseEndpoint: "/wcs/resources/store/" + $scope.params.storeId + "/espot/",
			linksData: {
				warrantyLearnMore: ($scope.params.storeId === '10851') ? '/lc-us/our-guarantee?section=protectionPlan' : '/en-ca/our-guarantee?section=protectionPlan' 
			},
			layoutSettings: {
				enableDigitalOptometry: ($scope.params.isOpthyEnabled == 'true'), // pd tool enable based on PD_TOOL_ENABLED xstoreconf
				enableLargeIcons: ($scope.params.isLargeIconsEnabled == 'true'), // 3D Icons - LCDP-11426 - based on RXC_LARGE_ICONS_ENABLED xstoreconf
				enableGrayout: ($scope.params.isGrayOut), // LCDP-11865 - grey out activator
				enableBrandLastStep: ($scope.params.enableBrandLastStep == 'true') // RXC brand last step - based on RXC_LAST_BRAND_STEP_ENABLED xstoreconf
			},
			paymentInstallment: {
				type: singleTypeOnly,
				installments: 4,
				multiplePaymentInstallment: multiplePaymentInstallmentValue,
				types: paymentInstallmentTypes,
				contentIdentifier: espotContentIdentifier

			}
		};

		if ($rootScope.rxc.selectedLens) {
			config.data.lens = {
				catEntryId: $rootScope.rxc.selectedLens.catEntryId
			}
		}

		if ($rootScope.rxc.selectedWarranty && !$scope.params.isStellaProduct) {
			config.data.warranty = {
				catEntryId: $rootScope.rxc.selectedWarranty.id
			}
		}

		// Move chat button to center when opening RXC
		var chatButtonElem = document.getElementsByClassName('cx-side-button-group');

		if (chatButtonElem && chatButtonElem.length && !(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))) {
			chatButtonElem = chatButtonElem[0];
			chatButtonElem.style.setProperty('right', '50%', 'important');
		}

		$rootScope.oldHistoryLength = window.history.length;
		$rootScope.rxc.rxcWidget = RXC.rxcWidget.new(config);
		$rootScope.rxc.rxcWidget.render();
	}

	$scope.genericRemoveLens = function () {
		$rootScope.rxc.selectedLens = null;
		$rootScope.rxc.selectedWarranty = null;

		$scope.genericCalculatePrices();
	}
	
	var getJSON = function(url, callback) {
	    var xhr = new XMLHttpRequest();
	    xhr.open('GET', url, true);
	    xhr.responseType = 'json';
	    xhr.onload = function() {
	      var status = xhr.status;
	      if (status === 200) {
	        callback(null, xhr.response);
	      } else {
	        callback(status, xhr.response);
	      }
	    };
	    xhr.send();
	};
	
	var initCarouselElement = function(entry, imgCount) {
		var imageUrl = 'https://assets.lenscrafters.com/is/image/LensCrafters/' + $scope.params.framePartNumber + '_FILE_KEY.png';
		imageUrl = imageUrl.replace('FILE_KEY', entry);

		//PDP slider
		divPDPElement = document.createElement("div");
		divPDPElement.setAttribute('class', 'image');
		var color = document.querySelector('.frame-color.description').innerHTML;
		imgPDPElement = angular.element('<img itemprop="image" ng-click="openImageFullScreen(\'' + imageUrl + '\',\'' + imgCount + '\',\''+ (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) +'\')" tabindex="0" class="PDPproductImage hidden" escapexml="false" title="' + $scope.params.gender + ' ' + $scope.params.glasses + ' - ' + $scope.params.frameBrand + ' ' + $scope.params.frameName + '" src="' + imageUrl + '" alt="' + $scope.params.frameBrand + ' ' + $scope.params.frameName + ' ' + color + ' ' + $scope.params.glasses + ' ' + (imgCount*1 + 1*1) + '"></img>');

		//fullscreen zoom
		if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
			imgFullScreenContainer = angular.element('<div class="image image-modal"><img class="image-full-mobile" on-double-click="zoomImage(\''+ imgCount + '\')" ng-src="'+ imageUrl +'"></img></div>');
			angular.element(document.getElementsByClassName('container-image-fullscreen')).append(imgFullScreenContainer);
		} else{
			imgFullScreenContainer = document.createElement("div");
			imgFullScreenContainer.setAttribute('class', 'image');
			divFullScreenElement = angular.element('<div class="image"><div data-ng-magnify data-glass-width="300" data-glass-height="300" data-image-src="'+ imageUrl +'"></div></div>');
			angular.element(imgFullScreenContainer).append(divFullScreenElement);
			document.getElementsByClassName('container-image-fullscreen')[0].appendChild(imgFullScreenContainer);
		}

		angular.element(divPDPElement).append(imgPDPElement);
		document.getElementsByClassName('pdp-image-items')[0].appendChild(divPDPElement);

		$compile(divPDPElement)($scope);
		$compile(imgFullScreenContainer)($scope);
	}
	
	var initCarousel = function() {
		
		if(window.orderImagePDP == undefined){
			window.orderImagePDP = [['_STD__shad__fr', 'shad_fr'],['_STD__shad__qt', 'shad_qt'],['_STD__shad__lt', '_090A'],['_STD__shad__cfr', '_180A'],['_STD__shad__bk'],['_STD__shad__al2'],['_STD__shad__alN'],['_STD__shad__fld']]
		}
		
		var availableImages = [];
		var divFullScreenElement;
		var imgFullScreenElement;
		var imgFullScreenContainer;
		var divPDPElement;
		var imgPDPElement;
		var imgCount = 0;
		
		getJSON('https://assets.lenscrafters.com/is/image/LensCrafters/' + $scope.params.framePartNumber + '_manifest_2.json', function(err, data) {
			  if (err !== null) {
			  	console.error("Unable to load manifest_2.json");
			  } else {
				if(data && data.items){
					
					data.items.forEach(function(entry) {
						availableImages.push(entry.file_key);
					});
					
					window.orderImagePDP.forEach(function(entry) {
						if(availableImages.indexOf(entry[0]) > -1){
							initCarouselElement(entry[0], imgCount);
							imgCount = imgCount + 1;
						} else if (entry.length > 1 && availableImages.indexOf(entry[1]) > -1){
							initCarouselElement(entry[1], imgCount);
							imgCount = imgCount + 1;
						}
					});
					
					$('.pdp-image-items').slick({
						  dots: true,
						  infinite: true,
						  fade: true,
						  cssEase: 'linear',
						  lazyLoad: 'ondemand',
						  variableWidth: true
					});	
			    	$('.PDPproductImage').removeClass('hidden');
					
				} else {
					console.error("Unable to load data for manifest_2.json");
				}
			  }
			});
		
	}
});

app.controller('HomePageController', ['$scope', '$window', 'headerModule', '$http', '$timeout',
	function ($scope, $window, headerModule, $http, $timeout) {
	
		// constants
		var CONST_BRAND = '#BRAND#';
		var CONST_FACET = '#FACET#';
		
		var CONTACT_BRAND_FACET = 'ads_f42001_ntk_cs';
		
		var CONTACTS_ITEMS_URL = '/wcs/resources/store/10851/productview/bySearchTerm/*?facet=#FACET#%3A%22#BRAND#%22&pageSize=7&pageNumber=1';
		
		$scope.contactsProducts = {};
		$scope.currentContactsBrand = '';
		$scope.cartItemsNum = 0;
		$scope.serviceCardTexts = null;
		$scope.serviceCardImages = null;
		$scope.serviceCardHref = null;
		$scope.serviceCardCTA = null;
		$scope.selectedMenu=0; 
		$scope.mobileMenuStatus=0;
		$scope.selectedCard=0;
		$scope.userType = 'G'; // or 'R' if registered
		
		if ($window.serviceCardTexts) {
			$scope.serviceCardTexts =  $window.serviceCardTexts; 
		}
		if ($window.serviceCardImages) {
			$scope.serviceCardImages =  $window.serviceCardImages;
		}
		if ($window.serviceCardHref) {
			$scope.serviceCardHref =  $window.serviceCardHref;
		}
		
		if ($window.serviceCardCTA) {
			$scope.serviceCardCTA =  $window.serviceCardCTA;
		}
		
		$scope.init = function (_params) {
			$scope.params = _params;
			
			$scope.selectedCategory='eyeglasses';
			$scope.selectedFilter=1;
			$scope.searchOpen=false;
						
			
			// retrieve cart quantity from headerModule
			headerModule.getCartItems().then(function(response){
				$scope.cartItemsNum = response;
			});

			// retrieve wihslist quantity from headerModule
			headerModule.getWishListItems().then(function(response){
				$rootScope.wishlistCount = response.count;
				$rootScope.wishlistItems = response.catentryIds;
			});
			
			// retrieve user type
			headerModule.getUserType().then(function(response){
				$scope.userType = response;
			});
		}
		
		$scope.stopScrolling = function () {
			$('body').addClass('stop-scrolling');
		}
		
		$scope.enableScrolling = function () {
			$('body').removeClass('stop-scrolling');
		}
	
		$scope.retreiveContacts = function(brand){
			//TODO prendere la facet in automatico
			//$http.get('/wcs/resources/store/10851/productview/bySearchTerm/*?facet=ads_f42001_ntk_cs%3A%22' + brand + '%22&pageSize=7&pageNumber=1')
			
			if(location.hostname.indexOf('developer') != -1)
				CONTACT_BRAND_FACET = 'ads_f26001_ntk_cs';
			
			if($scope.contactsProducts[brand] == null){
				$http.get(CONTACTS_ITEMS_URL.replace(CONST_BRAND, brand).replace(CONST_FACET, CONTACT_BRAND_FACET))
				.then(function (response) {
					if (response && response.data.CatalogEntryView) {
						$scope.contactsProducts[brand]= [];
						
						response.data.CatalogEntryView.forEach(function(entry) {
							$scope.contactsProducts[brand].push({
								name: entry.name,
								upc: entry.partNumber
							})
						});
						$scope.currentContactsBrand = brand;
					} 
				}, function (error) {
					$log.error(error);
					tealium_data2track.push({
						'id': 'Error',
						'Error_Code': 'DDM Contacts error',
						'Error_Source': 'Client'
	  					});
	  	
	  					$scope.hasLenses = false;
	  				})
	  			}else{
	  				$scope.currentContactsBrand = brand;
	  			}
	  		}
	  	    
	  	    var timer;
	  	    
	  	    $scope.showIt = function (index) {
	  	        timer = $timeout(function () {
	  	        	$scope.selectedCard=index;
	  	        }, 500);
	  	    };
	  	
	  	    $scope.leaveIt = function () {
	  	    	timer = $timeout(function () {
	  	    		$scope.selectedCard=0;
	  	    	}, 500);
	  	    };
	  	}
	  ])

app.controller('cartItemController', function ($scope, $rootScope, $http, $timeout, $log, lcActionsModule, lcInsurance, lcPrescription) {

	// RXC integration object
	$rootScope.rxc = {};

	$scope.frameRXValues = null;

	$scope.init = function (_params) {
		$scope.params = _params;

		if (lcPrescription && $scope.params.isPrescriptionEnabled) {
			//lcPrescription.init($scope.params.storeId, $scope.params.catalogId);
			$scope.frameRXValues = lcPrescription.getFrameRXValues(_params.frameMinTotalPower, _params.frameMaxTotalPower);
		}

		$scope.callerId = lcActionsModule.CALLERID_CART + '_' + _params.orderItemId;
	}
	
	$scope.deleteLoaderVisible = false;
	
	$scope.editLens = function() {

		if (!$scope.params.lensId) {
			var errorMessage = 'Undefined Lens Id';
			tealium_data2track.push({
				'id': 'Error',
				'Error_Code': errorMessage,
				'Error_Source': 'Client'
			});
			$log.error(errorMessage);
			return;
		}
		
		var paymentInstallmentTypes = [];
		var multiplePaymentInstallmentValue = false;
		var singleTypeOnly = '';
		var espotContentIdentifier = 'X_PDP_Installments_All';
		if($scope.params.isAffirmEnabled && $scope.params.isAfterpayEnabled && $scope.params.isKlarnaEnabled){
			paymentInstallmentTypes = ['klarna', 'affirm', 'afterpay'];
			multiplePaymentInstallmentValue = true;
			espotContentIdentifier = 'X_PDP_Installments_All';
		}
		if(!$scope.params.isAfterpayEnabled && !$scope.params.isKlarnaEnabled && $scope.params.isAffirmEnabled){
			paymentInstallmentTypes = ['affirm'];
			multiplePaymentInstallmentValue = false;
			singleTypeOnly = 'affirm';
		}
		if(!$scope.params.isAffirmEnabled && !$scope.params.isKlarnaEnabled && $scope.params.isAfterpayEnabled){
			paymentInstallmentTypes = ['afterpay'];
			multiplePaymentInstallmentValue = false;
			singleTypeOnly = 'afterpay';
		}
		if(!$scope.params.isAffirmEnabled && !$scope.params.isAfterpayEnabled && $scope.params.isKlarnaEnabled){
			paymentInstallmentTypes = ['klarna'];
			multiplePaymentInstallmentValue = false;
			singleTypeOnly = 'klarna';
		}
		if($scope.params.isAffirmEnabled && !$scope.params.isAfterpayEnabled && $scope.params.isKlarnaEnabled){
			paymentInstallmentTypes = ['klarna', 'affirm'];
			multiplePaymentInstallmentValue = true;
			espotContentIdentifier = 'X_PDP_Installments_Affirm_Klarna';
		}
		if($scope.params.isAffirmEnabled && $scope.params.isAfterpayEnabled && !$scope.params.isKlarnaEnabled){
			paymentInstallmentTypes = ['affirm', 'afterpay'];
			multiplePaymentInstallmentValue = true;
			espotContentIdentifier = 'X_PDP_Installments_Affirm_Afterpay';
		}
		if(!$scope.params.isAffirmEnabled && $scope.params.isAfterpayEnabled && $scope.params.isKlarnaEnabled){
			paymentInstallmentTypes = ['klarna', 'afterpay'];
			multiplePaymentInstallmentValue = true;
			espotContentIdentifier = 'X_PDP_Installments_Afterpay_Klarna';
		}

		var _config = {
			selector: '#rxcApp',
			currencyFormat: {
				thousandSeparator: ",",
				decimalSeparator: ".",
				prefix: "$",
			},
			insuranceModule: $scope.params.isRiaEnabled ? lcInsurance : null,
			prescriptionModule: $scope.params.isPrescriptionEnabled ? lcPrescription : null,
			actionsModule: lcActionsModule,
			lensesData: $scope.params.lensData,
			data: {
				langId: $scope.params.langId,
				frame: {
					catEntryId: $scope.params.frameId,
					name: $scope.params.frameName,
					upc: $scope.params.framePartNumber,
					model: $scope.params.frameModel,
					color: $scope.params.frameColor,
					listPrice: $scope.params.frameOfferPrice,
					brand: $scope.params.frameBrand,
					category: $scope.params.frameCategory,
					imageUrl: $scope.params.frameImage.replace('shad_fr', 'shad_qt').replace('imwidth=200', 'imwidth=680'),
					brandImageUrl: 'https://assets.lenscrafters.com/extra/image/LensCrafters/brands/LC_' + $scope.params.frameBrand.replace(/ /g, '_') + '_Logo.png',
					rxValues: $scope.frameRXValues,
				},
				frameOnlyLensUPC: $scope.params.frameOnlyLensUPC,
				showFrameOnly: $scope.params.frameCategory.toUpperCase() !== 'SUNGLASSES',
				lens: {
					catEntryId: $scope.params.lensId
				}
			},
			learnMoreBaseEndpoint: "/wcs/resources/store/" + $scope.params.storeId + "/espot/",
			linksData: {
				warrantyLearnMore: ($scope.params.storeId === '10851') ? '/lc-us/purchase-care/details' : '/en-ca/purchase-care/details'
			},
			paymentInstallment: {
				type: singleTypeOnly,
				installments: 4,
				multiplePaymentInstallment: multiplePaymentInstallmentValue,
				types: paymentInstallmentTypes,
				contentIdentifier: espotContentIdentifier

			}
		};

		if (angular.element(document.getElementById('warranty_' + $scope.params.orderItemId)).attr('checked') == 'checked') {
			_config.data.warranty = {
				catEntryId: angular.element(document.getElementById('warranty_' + $scope.params.orderItemId)).val()
			};
		}

		// Call RXC lens service
		$http.get('/wcs/resources/store/' + $scope.params.storeId + '/catalog/' + $scope.params.catalogId +
			'/rxc/frameId/' + $scope.params.frameId + '/lenses')
			.then(function (response) {
				if (response && response.data && response.data.response && response.data.response.status == 'ok') {
					_config.lensesData = response.data.response.data;
					_config.cartMode = {
						orderItemId: $scope.params.orderItemId,
						orderIndex: $scope.params.orderIndex
					};

					// Disable warranty for STELLA products
					if ($scope.params.isStellaProduct) {
						_config.lensesData.warrantyOptions = null;
					}

					$scope.genericEditLens(_config);
				} else {
					$scope.hasLenses = false;
				}
				$('head').append(document.getElementById('rxcCssUrl').value);
			}, function (error) {
				$log.error(error);
				tealium_data2track.push({
					'id': 'Error',
					'Error_Code': 'Error while calling RXC lens service',
					'Error_Source': 'Client'
				});

				$scope.hasLenses = false;
			})
			.finally(function () {
				$scope.isLoadingLens = false;
			});
	}

	$scope.$on('lenspanel:closed', function (event, callerId, action, lens) {
		if ($scope.callerId != callerId)
			return;

		showHiddenElement();

		// workaround to hide cart header
		var _header = document.getElementById('header_wrapper');
		_header.style.zIndex = '';

		var _el = document.getElementById('skipToMainContent');
		if (_el) _el.style.display = '';

		if (!action || action == lcActionsModule.CLOSE_ACTION_CANCEL)
			return;

		if (!lens) {
			var missingLensData = 'Missing lens data';
			tealium_data2track.push({
				'id': 'Error',
				'Error_Code': missingLensData,
				'Error_Source': 'Client'
			});
			$log.error(missingLensData);
			return;
		}

		// Variabili globali utilizzate dalla funzione cartPageEditPrescription()
		lensCatentryId = lens.catEntryId;
		addOns = '';

		// Variabili utilizzate dai campi hidden ".lens-hidden-data"
		$scope.lensInfo.catentryId = lens.catEntryId;
		$scope.lensInfo.skuId = lens.partNumber;

		// update cart
		$timeout(function () {
			cartPageEditPrescription($scope.params.orderItemId, $scope.params.orderIndex);
		});
	});

	var showHiddenElement = function () {
		angular.element(document.getElementById('footer_wrapper')).removeClass("hidden");
		angular.element(document.getElementById('header_wrapper')).removeClass("hidden");
		angular.element(document.getElementById('pdp-wrapper')).removeClass("hidden");
		angular.element(document.getElementById('site-breadcrumb')).removeClass("hidden");
		angular.element(document.getElementById('footer_wrapper')).removeClass("hidden");
		angular.element(document.getElementById('header_wrapper')).removeClass("hidden");
		angular.element(document.getElementById('pdp-wrapper')).removeClass("hidden");
		angular.element(document.getElementById('site-breadcrumb')).removeClass("hidden");
		angular.element(document.getElementById('main-navigation')).removeClass("hidden");
		angular.element(document.getElementById('main-content-comp')).removeClass("hidden");
		angular.element(document.getElementById('cart-section')).removeClass("hidden");
	}

	$scope.genericEditLens = function (_config) {
		if (!_config) {
			var paymentInstallmentTypes = [];
			var multiplePaymentInstallmentValue = false;
			var singleTypeOnly = '';
			var espotContentIdentifier = 'X_PDP_Installments_All';
			if($scope.params.isAffirmEnabled && $scope.params.isAfterpayEnabled && $scope.params.isKlarnaEnabled){
				paymentInstallmentTypes = ['klarna', 'affirm', 'afterpay'];
				multiplePaymentInstallmentValue = true;
				espotContentIdentifier = 'X_PDP_Installments_All';
			}
			if(!$scope.params.isAfterpayEnabled && !$scope.params.isKlarnaEnabled && $scope.params.isAffirmEnabled){
				paymentInstallmentTypes = ['affirm'];
				multiplePaymentInstallmentValue = false;
				singleTypeOnly = 'affirm';
			}
			if(!$scope.params.isAffirmEnabled && !$scope.params.isKlarnaEnabled && $scope.params.isAfterpayEnabled){
				paymentInstallmentTypes = ['afterpay'];
				multiplePaymentInstallmentValue = false;
				singleTypeOnly = 'afterpay';
			}
			if(!$scope.params.isAffirmEnabled && !$scope.params.isAfterpayEnabled && $scope.params.isKlarnaEnabled){
				paymentInstallmentTypes = ['klarna'];
				multiplePaymentInstallmentValue = false;
				singleTypeOnly = 'klarna';
			}
			if($scope.params.isAffirmEnabled && !$scope.params.isAfterpayEnabled && $scope.params.isKlarnaEnabled){
				paymentInstallmentTypes = ['klarna', 'affirm'];
				multiplePaymentInstallmentValue = true;
				espotContentIdentifier = 'X_PDP_Installments_Affirm_Klarna';
			}
			if($scope.params.isAffirmEnabled && $scope.params.isAfterpayEnabled && !$scope.params.isKlarnaEnabled){
				paymentInstallmentTypes = ['affirm', 'afterpay'];
				multiplePaymentInstallmentValue = true;
				espotContentIdentifier = 'X_PDP_Installments_Affirm_Afterpay';
			}
			if(!$scope.params.isAffirmEnabled && $scope.params.isAfterpayEnabled && $scope.params.isKlarnaEnabled){
				paymentInstallmentTypes = ['klarna', 'afterpay'];
				multiplePaymentInstallmentValue = true;
				espotContentIdentifier = 'X_PDP_Installments_Afterpay_Klarna';
			}
			var _config = {
				selector: '#rxcApp',
				currencyFormat: {
					thousandSeparator: ",",
					decimalSeparator: ".",
					prefix: "$",
				},
				insuranceModule: $scope.params.isRiaEnabled ? lcInsurance : null,
				prescriptionModule: $scope.params.isPrescriptionEnabled ? lcPrescription : null,
				actionsModule: lcActionsModule,
				lensesData: $scope.params.lensData,
				data: {
					langId: $scope.params.langId,
					frame: {
						catEntryId: $scope.params.frameId,
						name: $scope.params.frameName,
						upc: $scope.params.framePartNumber,
						model: $scope.params.frameModel,
						color: $scope.params.frameColor,
						listPrice: $scope.params.frameOfferPrice,
						brand: $scope.params.frameBrand,
						category: $scope.params.frameCategory,
						imageUrl: $scope.params.frameImage.replace('_001', '_002').replace('imwidth=200', 'imwidth=680'),
						brandImageUrl: 'https://assets.lenscrafters.com/extra/image/LensCrafters/brands/LC_' + $scope.params.frameBrand.replace(/ /g, '_') + '_Logo.png',
						rxValues: $scope.frameRXValues,
					},
					frameOnlyLensUPC: $scope.params.frameOnlyLensUPC,
					showFrameOnly: $scope.params.frameCategory.toUpperCase() !== 'SUNGLASSES',
				},
				learnMoreBaseEndpoint: "/wcs/resources/store/" + $scope.params.storeId + "/espot/",
				linksData: {
					warrantyLearnMore: ($scope.params.storeId === '10851') ? '/lc-us/our-guarantee?section=protectionPlan' : '/en-ca/our-guarantee?section=protectionPlan'
				},
				layoutSettings: {
					enableDigitalOptometry: ($scope.params.isOpthyEnabled == 'true'), // pd tool enable based on PD_TOOL_ENABLED xstoreconf
					enableLargeIcons: ($scope.params.isLargeIconsEnabled == 'true'), // 3D Icons - LCDP-11426 - based on RXC_LARGE_ICONS_ENABLED xstoreconf
					enableGrayout: ($scope.params.isGrayOut), // LCDP-11865 - grey out activator
					enableBrandLastStep: ($scope.params.enableBrandLastStep == 'true') // RXC brand last step - based on RXC_LAST_BRAND_STEP_ENABLED xstoreconf
				},
				paymentInstallment: {
					type: singleTypeOnly,
					installments: 4,
					multiplePaymentInstallment: multiplePaymentInstallmentValue,
					types: paymentInstallmentTypes,
					contentIdentifier: espotContentIdentifier
				}
			};

			if ($rootScope.rxc.selectedLens) {
				_config.data.lens = {
					catEntryId: $rootScope.rxc.selectedLens.catEntryId
				}
			}

			if ($rootScope.rxc.selectedWarranty && !$scope.params.isStellaProduct) {
				_config.data.warranty = {
					catEntryId: $rootScope.rxc.selectedWarranty.id
				}
			}
		}

		// workaround to hide cart header
		var _header = document.getElementById('header_wrapper');
		_header.style.zIndex = '30';

		// Move chat button to center when opening RXC
		var chatButtonElem = document.getElementsByClassName('cx-side-button-group');

		if (chatButtonElem && chatButtonElem.length && !(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))) {
			chatButtonElem = chatButtonElem[0];
			chatButtonElem.style.setProperty('right', '50%', 'important');
		}
		
		$rootScope.oldHistoryLength = window.history.length;
		$rootScope.rxc.rxcWidget = RXC.rxcWidget.new(_config);
		$rootScope.rxc.rxcWidget.render();
	}

	var isTrueProgressive = false;
	var cookies = document.cookie.split(';')
	for (var i = 0; i < cookies.length; i++) {
		if (cookies[i].includes('isTrueProgressive')) {
			if (cookies[i].split('=')[1].trim().includes('true'))
				isTrueProgressive = true;
			else
				isTrueProgressive = false;
		}
	}
	var lens = document.querySelectorAll('.lens-type span');
	for (var i = 0; i < lens.length; i++) {
		if(document.getElementById('tab2')){
			if (lens[i].innerText.includes('Progressive') && document.getElementsByClassName('lc-tabs-header hide').length < 1 && !isTrueProgressive && document.getElementById('tab2') != null)
				document.getElementById('tab2').click();
	
			if (lens[i].innerText.includes('Progressive') && document.getElementsByClassName('lc-tabs-header hide').length < 1) {
				angular.element(document.querySelectorAll('#tab2')).on('click', function () {
					document.cookie = 'isTrueProgressive=false';
				});
				angular.element(document.querySelectorAll('#tab1')).on('click', function () {
					document.cookie = 'isTrueProgressive=true';
				});
				var element = angular.element(document.querySelectorAll('.shipping-type-container input.ng-pristine'));
				element.on('click', function () {
					document.cookie = 'isTrueProgressive=true';
				});
			}
		}
	}
});

// Bottone apertura modale LensPanel
var _lensPanelLensSelectDirective = function (_name, _template) {

	app.directive(_name, function ($rootScope, lcActionsModule, lcInsurance, lcPrescription) {

		return {
			restrict: 'E',
			template: _template,
			scope: {
				isLoadingLens: '=',
				isLoadingInsurance: '=',
				lensData: '=data'
			},
			link: function (scope, elem, attrs, ctrl) {
				scope.title = attrs.title;
				scope.lensCategory = attrs.lenscategory;
				scope.storeId = attrs.storeid;
				scope.catalogId = attrs.catalogid;
				scope.langId = attrs.langid;
				scope.frameId = attrs.frameid;
				scope.framePartNumber = attrs.framepartnumber;
				scope.frameBrand = attrs.framebrand;
				scope.frameBrandImage = attrs.framebrandimage;
				scope.frameCategory = attrs.framecategory;
				scope.frameName = attrs.framename;
				scope.frameOfferPrice = attrs.frameofferprice;
				scope.frameListPrice = attrs.framelistprice;
				scope.frameSize = attrs.framesize;
				scope.frameImage = attrs.frameimage;
				scope.frameColor = attrs.framecolor;
				scope.frameModel = attrs.framemodel;
				scope.frameOnlyLensUPC = attrs.frameonlylensupc;
				scope.frameMinTotalPower = attrs.framemintotalpower;
				scope.frameMaxTotalPower = attrs.framemaxtotalpower;
				scope.currentOrderId = attrs.currentorderid;
				scope.partType = attrs.parttype;
				scope.isSunglasses = attrs.sunglasses == 'true';
				scope.isBuyable = attrs.buyable == 'true';
				scope.warrantyPrice = attrs.warrantyprice || '0.00';
				scope.warrantyId = attrs.warrantyid || null;
				scope.isPrescriptionEnabled = attrs.isprescriptionenabled == 'true';
				scope.isAfterpayEnabled = attrs.isafterpayenabled;
				scope.isAffirmEnabled = attrs.isaffirmenabled;
				scope.isKlarnaEnabled = attrs.isklarnaenabled;

				// open modal
				scope.open = function () {
					try{
						if (scope.isLoadingLens || scope.isLoadingInsurance)
							return;
		
						var frameRXValues = null;
	
						if (lcPrescription && scope.isPrescriptionEnabled) {
							frameRXValues = lcPrescription.getFrameRXValues(scope.frameMinTotalPower, scope.frameMaxTotalPower);
						}
						
						var paymentInstallmentTypes = [];
						var multiplePaymentInstallmentValue = false;
						var singleTypeOnly = '';
						var espotContentIdentifier = 'X_PDP_Installments_All';
						if($scope.params.isAffirmEnabled && $scope.params.isAfterpayEnabled && $scope.params.isKlarnaEnabled){
							paymentInstallmentTypes = ['klarna', 'affirm', 'afterpay'];
							multiplePaymentInstallmentValue = true;
							espotContentIdentifier = 'X_PDP_Installments_All';
						}
						if(!$scope.params.isAfterpayEnabled && !$scope.params.isKlarnaEnabled && $scope.params.isAffirmEnabled){
							paymentInstallmentTypes = ['affirm'];
							multiplePaymentInstallmentValue = false;
							singleTypeOnly = 'affirm';
						}
						if(!$scope.params.isAffirmEnabled && !$scope.params.isKlarnaEnabled && $scope.params.isAfterpayEnabled){
							paymentInstallmentTypes = ['afterpay'];
							multiplePaymentInstallmentValue = false;
							singleTypeOnly = 'afterpay';
						}
						if(!$scope.params.isAffirmEnabled && !$scope.params.isAfterpayEnabled && $scope.params.isKlarnaEnabled){
							paymentInstallmentTypes = ['klarna'];
							multiplePaymentInstallmentValue = false;
							singleTypeOnly = 'klarna';
						}
						if($scope.params.isAffirmEnabled && !$scope.params.isAfterpayEnabled && $scope.params.isKlarnaEnabled){
							paymentInstallmentTypes = ['klarna', 'affirm'];
							multiplePaymentInstallmentValue = true;
							espotContentIdentifier = 'X_PDP_Installments_Affirm_Klarna';
						}
						if($scope.params.isAffirmEnabled && $scope.params.isAfterpayEnabled && !$scope.params.isKlarnaEnabled){
							paymentInstallmentTypes = ['affirm', 'afterpay'];
							multiplePaymentInstallmentValue = true;
							espotContentIdentifier = 'X_PDP_Installments_Affirm_Afterpay';
						}
						if(!$scope.params.isAffirmEnabled && $scope.params.isAfterpayEnabled && $scope.params.isKlarnaEnabled){
							paymentInstallmentTypes = ['klarna', 'afterpay'];
							multiplePaymentInstallmentValue = true;
							espotContentIdentifier = 'X_PDP_Installments_Afterpay_Klarna';
						}
						
						// Load RXC
						var config = {
							selector: '#rxcApp',
							currencyFormat: {
								thousandSeparator: ",",
								decimalSeparator: ".",
								prefix: "$",
							},
							insuranceModule: $scope.params.isRiaEnabled ? lcInsurance : null,
							prescriptionModule: scope.isPrescriptionEnabled ? lcPrescription : null,
							actionsModule: lcActionsModule,
							lensesData: scope.lensData,
							data: {
								langId: scope.langId,
								frame: {
									catEntryId: scope.frameId,
									name: scope.frameName,
									upc: scope.framePartNumber,
									model: scope.frameModel,
									color: scope.frameColor,
									offerPrice: scope.frameOfferPrice,
									listPrice: scope.frameListPrice,
									brand: scope.frameBrand,
									category: scope.frameCategory,
									imageUrl: scope.frameImage.replace('_001', '_002').replace('imwidth=200', 'imwidth=680'),
									brandImageUrl: 'https://assets.lenscrafters.com/extra/image/LensCrafters/brands/LC_' + scope.frameBrand.replace(/ /g, '_') + '_Logo.png',
									rxValues: frameRXValues,
								},
								frameOnlyLensUPC: scope.frameOnlyLensUPC,
								showFrameOnly: scope.frameCategory.toUpperCase() !== 'SUNGLASSES',
							},
							learnMoreBaseEndpoint: "/wcs/resources/store/" + $scope.params.storeId + "/espot/",
							linksData: {
								warrantyLearnMore: ($scope.params.storeId === '10851') ? '/lc-us/our-guarantee?section=protectionPlan' : '/en-ca/our-guarantee?section=protectionPlan'
							},
							layoutSettings: {
								enableDigitalOptometry: ($scope.params.isOpthyEnabled == 'true'), // pd tool enable based on PD_TOOL_ENABLED xstoreconf
								enableLargeIcons: ($scope.params.isLargeIconsEnabled == 'true'), // 3D Icons - LCDP-11426 - based on RXC_LARGE_ICONS_ENABLED xstoreconf
								enableGrayout: ($scope.params.isGrayOut), // LCDP-11865 - grey out activator
								enableBrandLastStep: ($scope.params.enableBrandLastStep == 'true') // RXC brand last step - based on RXC_LAST_BRAND_STEP_ENABLED xstoreconf
							},
							paymentInstallment: {
								type: singleTypeOnly,
								installments: 4,
								multiplePaymentInstallment: multiplePaymentInstallmentValue,
								types: paymentInstallmentTypes,
								contentIdentifier: espotContentIdentifier
							}
						};
	
						// Move chat button to center when opening RXC
						var chatButtonElem = document.getElementsByClassName('cx-side-button-group');
	
						if (chatButtonElem && chatButtonElem.length && !(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))) {
							chatButtonElem = chatButtonElem[0];
							chatButtonElem.style.setProperty('right', '50%', 'important');
						}

						$rootScope.oldHistoryLength = window.history.length;
						$rootScope.rxc.rxcWidget = RXC.rxcWidget.new(config);
						$rootScope.rxc.rxcWidget.render();
					} catch (error) {
						tealium_data2track.push({
							'id': 'Error',
							'Error_Code': 'Cannot add lenses',
							'Error_Source': 'Client'
						});
					}
				}
			}
		}
	});
}

var _tmplDesktop = ''
	+ '<a href="#" class="st-button st-button-small select-edit-lens new-lens-selection-text edit-lens-selection button-big-black-fill"'
	+ ' data-parttype="{{partType}}"'
	+ ' data-catentryid="{{frameId}}"'
	+ ' data-rxable="true" rel="#select-a-lens-type"'
	+ ' data-productname="{{frameName}}"'
	+ ' data-price="{{frameOfferPrice}}"'
	+ ' data-is_sunglasses="{{isSunglasses}}"'
	+ ' data-element-id="X_X_Prod_AddLens"'
	+ ' data-description="{{frameModel}}_{{framePartNumber}}"'
	+ ' ng-show="isBuyable || isLoadingLens"'
	+ ' ng-class="{\'disabled\': isLoadingLens}"'
	+ ' ng-click="open()">'
	+ ' {{!isLoadingLens ? title : \'\'}}'
	+ '<div class="wait-loader" ng-if="isLoadingLens"><div class="fa fa-spinner fa-spin"></div></div>'
	+ '</a>';

var _tmplMobile = ''
	+ '<a href="#" class="st-button st-button-big lens-selection-popup lp-font-medium"'
	+ ' rel="#select-a-lens-type" tabindex="0"'
	+ ' data-element-id="X_X_Prod_AddLens"'
	+ ' data-description="{{frameModel}}_{{framePartNumber}}"'
	+ ' ng-class="{\'disabled\': isLoadingLens}"'
	+ ' ng-click="open()">'
	+ ' {{title}}'
	+ '</a>';

_lensPanelLensSelectDirective('lensPanelLensSelect', _tmplDesktop);
_lensPanelLensSelectDirective('lensPanelLensSelectMobile', _tmplMobile);

app.factory('$loader', function () {

	var _previousContent;
	var _container;

	function _create(element) {
		// create loader item
		var _div = document.createElement('div');
		_div.id = 'loader';
		_div.className = 'wait-loader hidden';
		_div.addEventListener("click", function (event) {
			event.preventDefault();
			event.stopImmediatePropagation();
		});

		// add spinner
		var _spin = document.createElement('em');
		_spin.className = 'fa fa-spinner fa-spin';
		_div.appendChild(_spin);

		// add to container

		if (element == undefined)
			element = 'page-container';

		_container = document.getElementById(element);

		if (!angular.isUndefined(_container)) {
			if (_container.tagName == 'A') {
				_previousContent = _container.innerHTML;
				_div.classList.add("white");
				_container.classList.add("no-underline");
				_container.innerHTML = "";
			}
			_container.appendChild(_div);

		}

		return _div;
	}

	return {
		_loader: null,

		show: function (element) {

			this._loader = _create(element);

			this._loader.classList.remove("hidden");
		},

		hide: function () {
			if (this._loader == null) {
				this._loader = _create();
			}

			this._loader.classList.add("hidden");
			_container.classList.remove("no-underline");

			if (_previousContent != undefined)
				_container.innerHTML = _previousContent;
		}
	}
});
;
app.component('insurancePanel',{
	templateUrl: '/wcsstore/LensCraftersStorefrontAssetStore/angular/insurance/insurancePanel.html',
	controller: async function InsuranceController($rootScope, $http, $compile, $scope){
		
		var STOREID = '#STOREID#';
		var ESPOTNAME = '#ESPOTNAME#';

		var ESPOT_URL = '/wcs/resources/store/'+STOREID+'/espot/'+ESPOTNAME;

			
			await $http.get(ESPOT_URL.replace(ESPOTNAME, "X_Insurance_Providers").replace(STOREID, "10851"))
			.then(function (response) {
				if(response.data.MarketingSpotData
					&& response.data.MarketingSpotData.length > 0
					&& response.data.MarketingSpotData[0].baseMarketingSpotActivityData 
					&& response.data.MarketingSpotData[0].baseMarketingSpotActivityData.length > 0 
					&& response.data.MarketingSpotData[0].baseMarketingSpotActivityData[0].marketingContentDescription
					&& response.data.MarketingSpotData[0].baseMarketingSpotActivityData[0].marketingContentDescription.length > 0
					&& response.data.MarketingSpotData[0].baseMarketingSpotActivityData[0].marketingContentDescription[0].marketingText){
				
					var html = response.data.MarketingSpotData[0].baseMarketingSpotActivityData[0].marketingContentDescription[0].marketingText;
					var e = $compile(html)($scope);

					var elementHtml = document.createElement("script")
					elementHtml.append(e.html());
					document.body.append(elementHtml);
					
				}
			}, function (error) {
				$log.error(error);
				tealium_data2track.push({
					'id': 'Error',
					'Error_Code': 'Error loading espot ' + setup.espotName,
					'Error_Source': 'Client'
				});
			})

			$scope.$ctrl.insuranceProviders = window.insuranceProviders;
			$scope.$ctrl.defaultLink  = window.defaultLink;
	}
});;
app.directive("ngTouchClick", [function () {
	return function (scope, elem, attrs) {
		elem.bind("touchstart click", function (e) {
			e.preventDefault();
			e.stopPropagation();

			scope.$apply(attrs["ngTouchClick"]);
		});
	}
}]);

app.directive('onDoubleClick', function ($timeout) {
	return {
		restrict: 'A',
		link: function ($scope, $elm, $attrs) {
			var clicks = 0;
			var lastClick = new Date();

			$elm.bind('click', function (evt) {
				var dateDiff = new Date() - lastClick;
				if (dateDiff > 300) { // 300 ms
					clicks = 0;
				}
				lastClick = new Date();
				clicks++;
				if (clicks == 1) {
					$timeout(function () {
						if (clicks == 1) {
							//....
						} else {
							$scope.$apply(function () {
								$scope.$eval($attrs.onDoubleClick);
							});
						}
					}, 300);
				}
			});
		}
	};
});

/**
 * It supports all slick parameters and the following custom:
 * 
 * model: model to watch for changes
 * square: element to square out
 * events: (key, value) pairs where the key is a Slick event name and value is a callback function
 * 
 */
app.directive('slickSlider',function($timeout, $window){
	 return {
	   restrict: 'A',
	   link: function(scope, element, attrs) {
		    $timeout(function() {

		    	$(element).on('lazyloaded', function(e,slick) {
		    		$(e.target).closest('.image-holder').find("svg").remove();
		    	});
		    	
		    	$(element).on('init', function(e,slick) {
		    		
                    document.addEventListener("visibilitychange", function() {
                        if (!document.hidden){
                            //console.log('Slick resize');
                            slick.refresh();
                        }
                    });

					setTimeout(function(){
						if($(".bestseller-carousel"))
						$(".bestseller-carousel").removeClass("slick-hidden")

						if($(".bestseller-skelethon"))
						$(".bestseller-skelethon").hide()
					},1500)
		    	});
				
				// parse attributes passed to directive
				var ob = scope.$eval(attrs.slickSlider);

		        if (ob != undefined && ob.model != undefined) {
		            scope.$watch(ob.model, function() {
		                if (ob.model !== undefined && ob.model != '') {
		                    $timeout(function() {
		                        if ($(element).hasClass('slick-initialized')) {
		                            $(element).slick('slickUnfilter');
		                            $(element).slick('slickFilter', '.active');
		                        } else {
		                            $(element).slick(ob).slick('slickFilter', '.active');
		                        }
		                    });
		                }
		            });
		        } else if (ob != undefined && ob.square != undefined) {
		        	try{
			        	document.querySelectorAll(ob.square).forEach(function(elem){
				        	if(angular.element(elem)[0].clientWidth > 0){
				        		elem.style.height = angular.element(elem)[0].clientWidth + 'px';
				        		elem.style.minHeight = angular.element(elem)[0].clientWidth + 'px';
							}
							angular.element($window).bind('resize', function(){
								elem.style.height = angular.element(elem)[0].clientWidth + 'px';
								elem.style.minHeight = angular.element(elem)[0].clientWidth + 'px';
							});
			        	});
						$(element).slick(ob);
		        	}catch (e){
		        		console.log('No element found for: ' + ob.square);
		        	}
		        } else if (ob != undefined && ob.events != undefined) {
					// add slick event listeners BEFORE initializing
					Object.keys(ob.events).forEach(function (event) {
						$(element).on(event, ob.events[event]);
					});
					$(element).slick(ob);
				} else {
		            $(element).slick(ob);
		        }

				// if children list is dynamic a refresh is necessary after every change
				if (ob != undefined && ob.dynamic === true) {
					// Create an observer instance to refresh slider when children list changes
					(new MutationObserver(function(mutationsList, observer) {
						for (const mutation of mutationsList) {
							if (mutation.type === "childList") {
								// first disable observer as to not create an infinite loop
								observer.disconnect();

								element[0].slick.refresh();
								
								// enable observer again
								observer.observe(element[0], { childList: true });
								return;
							}
						}
					})).observe(element[0], { childList: true });
				}
			});
		}
	 }
});

/**
 * Compile an AJAX inserted element so that it can use angular
 */
app.directive('ngAjaxCompile', function($compile) {
	return {
		link: function (scope, element, attrs) {
			// Create an observer instance that compiles element's contents when they change
			(new MutationObserver(function(mutationsList, observer) {
				for (const mutation of mutationsList) {
					if (mutation.type === "childList") {
						observer.disconnect(); // not needed anymore

						$compile(element.contents())(scope);
						return;
					}
				}
			})).observe(element[0], { childList: true });
		}
	}
})

app.directive('stickyBar',function($window,$timeout){
	return {
		restrict: 'A',
		link: function(scope,element,attrs) {

			$timeout(function() {
				// This is needed to be sure to recalculate at resize correct values even if the element is in sticky position
				var moreResizeHappened = false;
				var containerPadding = 0;
				var elementHeight = 0;
				var options = scope.$eval(attrs.stickyBar);		    	 
				var sticky = 0;
				var pElement = angular.element(element)[0];
				
				// only for header
				var lastScrollTop = 0;
				var isHeader = (options != undefined && options.header) ? true : false;
				
				if(!isHeader) element.addClass("stickable");
				
				angular.element($window).bind('resize', function(){
					if(element.hasClass('sticky')){
						element.removeClass('sticky');
						moreResizeHappened = true;
					}
					
					elementHeight = element[0].offsetHeight;
	
					while(pElement) {
						sticky += angular.element(pElement)[0].offsetTop;
						pElement = angular.element(pElement)[0].offsetParent;
					}
	
					if(scope.deviceType == 'D' && options != undefined && options.offset.D != undefined){
						sticky += options.offset.D;
					}
					if ((scope.deviceType == 'T' || scope.deviceType == 'M') && options != undefined && options.offset.M != undefined){
						sticky += options.offset.M;
					}
					
					//save parent padding and onscroll add this and element padding to remove the 'jump' effect
					var parentEl = $(element.parent()[0]);
					
					if(!parentEl.attr('data-pad')){
						containerPadding = element.parent()[0].style.paddingTop != '' ? element.parent()[0].style.paddingTop : 0;
						parentEl.attr('data-pad', containerPadding);
					}
	
					if(moreResizeHappened){
						moreResizeHappened = false;
						if(window.pageYOffset >= sticky) {
							element.addClass('sticky');
						}
					}
					
		    	});
				angular.element($window).bind('scroll', function(){
					var st = window.pageYOffset;
					
					if (window.pageYOffset >= sticky && !$('#menu_search_nav_links').hasClass('opened')) {
						element.addClass("sticky").removeClass('top-auto'); 
						element.parent()[0].style.paddingTop = (parseInt(containerPadding) + elementHeight) + 'px';
					} else {
						element.removeClass("sticky").addClass('top-auto'); 
						element.parent()[0].style.paddingTop = parseInt(containerPadding) + 'px';
					}
					
					if(isHeader){
						if (st > lastScrollTop && st > elementHeight && !$('#menu_search_nav_links').hasClass('opened')){
							// Scroll Down
							element.removeClass('nav-down').addClass('nav-up');
							$('.stickable:not(#header-sticky-wrapper)').removeClass('sticky-header');
						} else {
							// Scroll Up
							if(st + $(window).height() < $(document).height()) {
								element.removeClass('nav-up').addClass('nav-down');
								$('.sticky:not(#header-sticky-wrapper)').addClass('sticky-header');
							}
						}
					}
					lastScrollTop = st;
				});
		    	angular.element($window).triggerHandler('resize');
		    });
	    }
	}
});

app.directive('backTop',function($window,$timeout){
	return {
		restrict: 'A',
		link: function(scope,element,attrs) {

			$timeout(function() {
				// This is needed to be sure to recalculate at resize correct values even if the element is in sticky position    	 
				var sticky = 10;
				
				angular.element($window).bind('scroll', function(){
					el = document.getElementById("btt_button");
					if (window.pageYOffset > sticky) {
						el.style.display = "block";
					} else {
						el.style.display = "none";
					}
				});
		    });
	    }
	}
});

/***
 * It stop scrolling when the model value passes the condition in configuration
 * 
 * example input object
 * {
 * 		model: {
 * 			name: 'VariableName',
 * 			value: value
 * 		},
 * 		condition: '==true && othervariableinscope == 2'
 * 	}	
 */
app.directive('stopScroll',function($timeout){
	 return {
	   restrict: 'A', 
	   link: function(scope,element,attrs) {
	     $timeout(function() {
	    	 var scrollRules = scope.$eval(attrs.stopScroll);
	    	 scope.$watch(scrollRules.model.name, function (v) {
	    		 var enable = scope.$eval('' + v + scrollRules.condition);
	    		 //console.log('[' + scrollRules.model.name +'('+v + ') ' + scrollRules.condition + '] = ' + scope.$eval('' + v + scrollRules.condition));
	    		 
	    		 function clipPage(){
	    			 document.querySelectorAll('html,body').forEach(function(elem){
	                 	elem.style.overflow = enable ? 'hidden' : '';
					    elem.style.position = enable ? 'fixed' : '';
					    elem.style.height = enable ? '100vh' : '';
					    elem.style.maxWidth = enable ? '100%' : '';
	                 });
	    		 }
	    		 var html = $('html');
	    		 if(enable){
	    			 var scrollPosition = self.pageYOffset || document.documentElement.scrollTop  || document.body.scrollTop;
	    			 if(html.attr('scroll-position')) return;
	                 html.attr('scroll-position', scrollPosition);
	                 $timeout(function() {
	                	 clipPage();
	                 });
	    		 }else{
	    			 var scrollPosition = html.attr('scroll-position');
	    			 if(!scrollPosition) return;
	    			 clipPage();
	    			 window.scrollTo(0, scrollPosition);
	    			 html.removeAttr('scroll-position');
	    		 }
	          });
	     });
	   }
	 }
});

app.directive('dynamicSquare',function($window, $timeout){
	return {
		restrict: 'A',
		link: function(scope,element,attrs) {
			if(angular.element(element)[0].clientWidth > 0){
				element.css('height', angular.element(element)[0].clientWidth + 'px');
				element.css('min-height', angular.element(element)[0].clientWidth + 'px');
			}
			angular.element($window).bind('resize', function(){
				element.css('height', angular.element(element)[0].clientWidth + 'px');
				element.css('min-height', angular.element(element)[0].clientWidth + 'px');
			});
		}
	}
});

app.directive('dynamicHorizontalBanner',function($window, $timeout){
	 return {
	   restrict: 'A',
	   link: function(scope,element,attrs) {
		   var wrappedQueryResult =  document.getElementsByClassName('image-holder');
		   
		   if(angular.element(element)[0].clientWidth > 0){
			   element.css('height',wrappedQueryResult[0].clientWidth + 'px');
			   element.css('min-height', wrappedQueryResult[0].clientWidth + 'px');
		   }
		   angular.element($window).bind('resize', function(){
			   element.css('height',wrappedQueryResult[0].clientWidth + 'px');
			   element.css('min-height', wrappedQueryResult[0].clientWidth + 'px');
	       });
	   }
	 }
});

app.directive('dynamicVerticalBanner',function($window, $timeout){
	return {
		restrict: 'A',
		link: function(scope,element,attrs) {
			
			var isMobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
			var wrappedQueryResult =  document.getElementsByClassName('image-holder');
			var wrappedQueryResultPS =  document.getElementsByClassName('product-square');
			
			if(angular.element(element)[0].clientWidth > 0){
				element.css('width',wrappedQueryResult[0].clientWidth + 'px');
				element.css('min-width', wrappedQueryResult[0].clientWidth + 'px');
				if(!isMobile){
					element.css('height',(wrappedQueryResultPS[0].clientHeight + wrappedQueryResult[0].clientHeight) + 'px');
				}
			}
			angular.element($window).bind('resize', function(){
				element.css('width',wrappedQueryResult[0].clientWidth + 'px');
				element.css('min-width', wrappedQueryResult[0].clientWidth + 'px');
				if(!isMobile){
					element.css('height',(wrappedQueryResultPS[0].clientHeight + wrappedQueryResult[0].clientHeight) + 'px');
				}
			});
		}
	}
});


app.directive('resetField', ['$compile', '$timeout', function ($compile, $timeout) {
    return {
        require: 'ngModel',
        scope: {},
        link: function (scope, el, attrs, ctrl) {
            // limit to input element of specific types
            var inputTypes = /text|search|tel|url|email|password|date/i;
            if (el[0].nodeName !== "INPUT") {
                throw new Error("resetField is limited to input elements");
            }
            if (!inputTypes.test(attrs.type)) {
                throw new Error("Invalid input type for resetField: " + attrs.type);
            }		

			
            // compiled reset icon template
            var template = $compile('<a ng-show="enabled" class=\"clear-input-icon\" ng-mousedown=\"reset()\"><svg class=\"icon close\"><use xlink:href=\"#clear-input\"></use></svg></a>')(scope);
            el.after(template);
			var onFocus = function () {
                scope.enabled = !ctrl.$isEmpty(el.val());
                scope.$parent[el.attr('name') + '_resetenabled'] = scope.enabled;
                scope.$parent[el.attr('name') + '_focused'] = true;
                scope.$apply();
            };
			var onBlur = function () {
				scope.enabled = false;
				scope.$parent[el.attr('name') + '_resetenabled'] = scope.enabled;
				scope.$parent[el.attr('name') + '_focused'] = false;
				scope.$apply();
			};
			var onKeyUp = function () {
				scope.enabled = !ctrl.$isEmpty(el.val());
				scope.$parent[el.attr('name') + '_resetenabled'] = scope.enabled;
				scope.$parent[el.attr('name') + '_focused'] = true;
				scope.$apply();
			};


            scope.reset = function () {
                ctrl.$setViewValue(null);
                ctrl.$render();
                scope.enabled = false;
                scope.$parent[el.attr('name') + '_resetenabled'] = scope.enabled;
                scope.$parent[el.attr('name') + '_focused'] = true;
                $timeout(function () {
                    el[0].focus();
                }, 0, false);
            };

            scope.$watch(attrs.ngModel, function (newValue, oldValue) {
                if (newValue !== oldValue) {
                    scope.enabled = !ctrl.$isEmpty(el.val());
                    scope.$parent[el.attr('name') + '_resetenabled'] = scope.enabled;
                }
            });


            el.bind('focus', onFocus )
			.bind('blur', onBlur )
			.bind('keyup',onKeyUp );
        }
    };
}]);

//direttiva per verificare il formato del numero di telefono
app.directive('phoneValidation', [function () {
	return {
		require: 'ngModel',
		link: function (scope, iElement, iAttribute, ngModelController) {
			function formatPhoneNumber(inputValue) {
				var viewValue = "";

				try {
					var cleanInputValue = inputValue.replace(/\D/g, ""); // remove non-numeral characters

					if (cleanInputValue !== "") {
						// build the formatted string padding with spaces
						var viewValue = "(" + cleanInputValue.slice(0,3).padEnd(3, " ") + ") " 
							+ cleanInputValue.slice(3,6).padEnd(3, " ") + " - " 
							+ cleanInputValue.slice(6,10).padEnd(4, " ");
						
						// get index of last numeral and slice the formatted string
						var match = /(\d)(?!.*\d)/.exec(viewValue);
						if (match)
							viewValue = viewValue.slice(0, match.index + 1);
					}
				} catch (e) {
					console.error(e);
				}

				ngModelController.$setViewValue(viewValue);
				ngModelController.$render(); //change DOM

				return viewValue;
			}

			ngModelController.$validators.isPhoneNumber = function (modelValue, viewValue) {
				var value = modelValue || viewValue;
				return (value ? value.replace(/\D/g, "").length == 10 : false);
			}

			ngModelController.$parsers.push(formatPhoneNumber);
			ngModelController.$formatters.push(formatPhoneNumber);
		}
	};
}]);



app.directive("lcDatepicker", function () {
	function calendarTemplate() {
		var template = (
			'<div ng-transclude></div>'+ // children HTML elements go here
			'<button type="button" ng-show="showToggle" class="calendar-toggle" ng-click="toggleCalendar()">Toggle calendar</button>'+
			'<div class="underlay" ng-show="showCalendar" ng-click="toggleCalendar()"></div>'+
			'<div class="lc-datepicker" ng-show="showCalendar" ng-switch on="currentPage" data-analytics_available_call="0">'+
			'  <div class="year-page" ng-switch-when="yearPage">'+
			'    <div class="header">'+
			'      <span>{{yearsPage[0]}} - {{yearsPage[yearsPage.length - 1]}}</span>'+
			'      <div class="buttons">'+
			'        <button type="button" class="prev" ng-class="{\'disabled\': prevYearsPageInvalid()}" ng-disabled="prevYearsPageInvalid()" ng-click="goToPrevYearsPage()"> < </button>'+
			'        <button type="button" class="next" ng-class="{\'disabled\': nextYearsPageInvalid()}" ng-disabled="nextYearsPageInvalid()" ng-click="goToNextYearsPage()"> > </button>'+
			'      </div>'+
			'    </div>'+
			'    <div class="years-list">'+
			'      <span class="year" ng-class="{\'selected\': selectedDate.getFullYear() === y, \'invalid\': yearIsInvalid(y)}"  ng-repeat="y in yearsPage" ng-click="selectYear(y)">{{y}}</span>'+
			'    </div>'+
			'  </div>'+
			'  <div class="month-page" ng-switch-when="monthPage">'+
			'    <div class="header">'+
			'      <span class="header-control" ng-click="goToYearPage()">{{year}}</span>'+
			'      <div class="buttons">'+
			'        <button type="button" class="prev" ng-class="{\'disabled\': yearIsInvalid(year - 1)}" ng-disabled="yearIsInvalid(year - 1)" ng-click="goToPrevYear()"> < </button>'+
			'        <button type="button" class="next" ng-class="{\'disabled\': yearIsInvalid(year + 1)}" ng-disabled="yearIsInvalid(year + 1)" ng-click="goToNextYear()"> > </button>'+
			'      </div>'+
			'    </div>'+
			'    <div class="months-list">'+
			'      <span class="month" ng-class="{\'selected\': m === selectedDate.getMonth() && selectedDate.getFullYear() === year, \'invalid\': monthIsInvalid(m)}" ng-repeat="m in months" ng-click="selectMonth(m)">{{ formatMonthNumber(m) }}</span>'+
			'    </div>'+
			'  </div>'+
			'  <div class="date-page" ng-switch-when="datePage">'+
			'    <div class="header">'+
			'      <span class="header-control" ng-click="goToMonthPage()">{{monthNames[month]}}</span>'+
			'      <span class="header-control" ng-click="goToYearPage()">{{year}}</span>'+
			'      <div class="buttons">'+
			'        <button type="button" class="prev" ng-class="{\'disabled\': prevMonthIsInvalid()}" ng-disabled="prevMonthIsInvalid()" ng-click="goToPrevMonth()"> < </button>'+
			'        <button type="button" class="next" ng-class="{\'disabled\': nextMonthIsInvalid()}" ng-disabled="nextMonthIsInvalid()" ng-click="goToNextMonth()"> > </button>'+
			'      </div>'+
			'    </div>'+
			'    <div class="weekdays">'+
			'      <span class="weekday" ng-repeat="day in week">{{day.slice(0,3)}}</span>'+
			'    </div>'+
			'    <div class="dates-list">'+
			'      <span class="date pastMonth" ng-class="{\'selected\': selectedDate.getTime() === date.getTime(), \'invalid\': dateIsInvalid(date)}" ng-repeat="date in pastMonth" ng-click="selectDate(date)">'+
			'        {{date.getDate()}}'+
			'      </span>'+
			'      <span class="date currentMonth" ng-class="{\'selected\': selectedDate.getTime() === date.getTime(), \'invalid\': dateIsInvalid(date)}" ng-repeat="date in currentMonth" ng-click="selectDate(date)">'+
			'        {{date.getDate()}}'+
			'      </span>'+
			'      <span class="date nextMonth" ng-class="{\'selected\': selectedDate.getTime() === date.getTime(), \'invalid\': dateIsInvalid(date)}" ng-repeat="date in nextMonth" ng-click="selectDate(date)">'+
			'        {{date.getDate()}}'+
			'      </span>'+
			'    </div>'+
			'  </div>'+
			'</div>'
		);
			
		return template;
	}
	
	return {
		restrict: 'E',
		transclude: true,
		template: calendarTemplate(),
		scope: {
			format: "@?",
			selector: "@?",
			showCalendar: "=?",
			startDate: "<?",
			minDate: "<?",
			maxDate: "<?",
		},
		link: function ($scope, elem, attr) {
			if (attr.selector){
				$scope.input = angular.element(elem[0].querySelector(attr.selector));
			} else {
				$scope.input = angular.element(elem[0].querySelector("input"));
			}

			// no need for toggle button if toggle is passed
			$scope.showToggle = (typeof attr.showCalendar === "undefined");

			$scope.format = attr.format || "dd/MM/yyyy";
		},
		controller: function($scope, $filter) {
			// init and utility functions
			function range(start, end) {
				return Array(end-start).join(0).split(0).map(
					function(_, id) {
						return id + start;
					});
			} 

			function getDaysInMonth(month, year) {
				var date = new Date(year, month, 1);
				var days = [];

				while (date.getMonth() === month) {
					days.push(new Date(date));
					date.setDate(date.getDate() + 1);
				}

				return days;
			}

			function getDaysBeforeInFirstWeek(month, year) {
				var first = new Date(year, month, 1);
				var days = [];
				date = new Date(first); // copy old date object
				date.setDate(date.getDate() - first.getDay()) // go back to beginning of week

				while (date.getMonth() !== month) {
					days.push(new Date(date));
					date.setDate(date.getDate() + 1);
				}

				return days;
			}

			function getDaysAfterInLastWeek(month, year) {
				var first = new Date(year, month + 1, 1); // first day of next month
				var days = [];
				date = new Date(first); // copy old date object

				while (date.getDay() !== 0) {
					days.push(new Date(date));
					date.setDate(date.getDate() + 1);
				}

				return days;
			}

			function updateCalendarDays() {
				$scope.pastMonth = getDaysBeforeInFirstWeek($scope.month, $scope.year);
				$scope.currentMonth = getDaysInMonth($scope.month, $scope.year);
				$scope.nextMonth = getDaysAfterInLastWeek($scope.month, $scope.year);
			}

			function monthNames() {
				var names = [];

				for (var month = 0; month < 12; month++) {
					var date = new Date(2021, month, 1);
					names.push(date.toLocaleString('default', { month: 'long' }));
				}

				return names;
			}

			function weekdayNames() {
				var date = new Date();
				var names = [];
				date.setDate(date.getDate() - date.getDay()) // go back to beginning of week

				for (var day = 0; day < 7; day++) {
					names.push(date.toLocaleString('default', { weekday: 'long' }));
					date.setDate(date.getDate() + 1);
				}

				return names;
			}

			function getYearsPage(startYear) {
				var years = [];

				for (var i = 0; i < 12; i++) {
					years.push(startYear + i);
				}

				return years;
			}

			// init
			var now = new Date()
			var baseDate;
			
			if ($scope.startDate) {
				baseDate = $scope.startDate;
			} else if ($scope.minDate) {
				baseDate = $scope.minDate;
			} else if ($scope.maxDate) {
				baseDate = $scope.maxDate;
			} else {
				baseDate = now;
			}

			$scope.currentPage = "datePage";
			$scope.selectedDate = $scope.startDate; // either valid or undefined
			$scope.week = weekdayNames();
			$scope.months = range(0,12); // months in js start at 0
			$scope.monthNames = monthNames();
			$scope.month = baseDate.getMonth();
			$scope.year = baseDate.getFullYear();
			$scope.startYearPage = baseDate.getFullYear();
			$scope.yearsPage = getYearsPage(baseDate.getFullYear());
			updateCalendarDays();

			// calendar methods
			$scope.dateIsInvalid = function(date) {
				if ($scope.minDate && date.getTime() < $scope.minDate.getTime()) {
					return true;
				}
				
				if ($scope.maxDate && date.getTime() > $scope.maxDate.getTime()) {
					return true;
				}
				
				return false;
			}

			$scope.monthIsInvalid = function(month) {
				var firstOfMonth = new Date($scope.year, month);
				var lastOfMonth = new Date($scope.year, month + 1, 1, 0, 0, -1); // last second of month

				if ($scope.minDate && lastOfMonth.getTime() < $scope.minDate.getTime()) {
					return true;
				}
				
				if ($scope.maxDate && firstOfMonth.getTime() > $scope.maxDate.getTime()) {
					return true;
				}

				return false;
			}
			
			$scope.yearIsInvalid = function(year) {
				var firstOfYear = new Date(year, 0);
				var lastOfYear = new Date(year + 1, 0, 1, 0, 0, -1); // last second of year

				if ($scope.minDate) {
					if(lastOfYear.getTime() < $scope.minDate.getTime()) {
						return true;
					}
				}
				
				if ($scope.maxDate) { 
					if (firstOfYear.getTime() > $scope.maxDate.getTime()) {
						return true;
					}
				}

				return false;
			}

			$scope.prevMonthIsInvalid = function() {
				var first = $scope.currentMonth[0];
				var prevMonth = new Date(first);
				prevMonth.setDate(first.getDate() - 1);

				if ($scope.minDate && prevMonth.getTime() < $scope.minDate.getTime()) {
					return true
				}

				return false;
			}

			$scope.nextMonthIsInvalid = function() {
				var last = $scope.currentMonth[$scope.currentMonth.length - 1];
				var nextMonth = new Date(last);
				nextMonth.setDate(last.getDate() + 1);

				if ($scope.maxDate && nextMonth.getTime() > $scope.maxDate.getTime()) {
					return true
				}

				return false;
			}

			$scope.formatMonthNumber = function(m) {
				return ('0' + (m + 1).toString()).slice(-2);
			}

			$scope.toggleCalendar = function() {
				$scope.showCalendar = !$scope.showCalendar;
			}

			$scope.goToDayPage = function() {
				$scope.currentPage = "datePage";
			}

			$scope.goToMonthPage = function() {
				$scope.currentPage = "monthPage";
			}

			$scope.goToYearPage = function() {
				$scope.currentPage = "yearPage";
			}

			$scope.goToNextMonth = function() {
				if ($scope.month === 11) {
					$scope.month = 0;
					$scope.year++;
				} else {
					$scope.month++;
				}

				updateCalendarDays();
			}

			$scope.goToPrevMonth = function() {
				if ($scope.month === 0) {
					$scope.month = 11;
					$scope.year--;
				} else {
					$scope.month--;
				}

				updateCalendarDays();
			}

			$scope.goToPrevYear = function() {
				$scope.year--;
			}
			
			$scope.goToNextYear = function() {
				$scope.year++;
			}

			$scope.selectMonth = function(month) {
				$scope.month = month;
				$scope.goToDayPage()

				updateCalendarDays();
			}

			$scope.selectYear = function(year) {
				$scope.year = year;
				$scope.goToMonthPage()
			}

			$scope.goToPrevYearsPage = function() {
				$scope.startYearPage -= 12;
				$scope.yearsPage = getYearsPage($scope.startYearPage);
			}

			$scope.goToNextYearsPage = function() {
				$scope.startYearPage += 12;
				$scope.yearsPage = getYearsPage($scope.startYearPage);
			}

			function yearsPageInvalid(years) {
				for (var y of years) {
					if (!$scope.yearIsInvalid(y)) {
						return false;
					}
				}

				return true;
			}

			$scope.prevYearsPageInvalid = function() {
				var years = getYearsPage($scope.startYearPage - 12);
				return yearsPageInvalid(years);
			}

			$scope.nextYearsPageInvalid = function() {
				var years = getYearsPage($scope.startYearPage + 12);
				return yearsPageInvalid(years);
			}

			$scope.selectDate = function(date) {
				$scope.selectedDate = date;
				if (date.getMonth() !== $scope.month) {
					$scope.selectMonth(date.getMonth());
				}

				$scope.input.val($filter("date")($scope.selectedDate, $scope.format));
				$scope.input.triggerHandler('input');
				$scope.input.triggerHandler('change');//just to be sure;
				$scope.toggleCalendar();
			}
		}
	}
});

app.directive('espot',function($window,$timeout, $http, $compile){
	return {
		restrict: 'A',
		link: function(scope,element,attrs){
			var STOREID = '#STOREID#';
			var ESPOTNAME = '#ESPOTNAME#';
			var setup = scope.$eval(attrs.espot );
			var ESPOT_URL = '/wcs/resources/store/'+STOREID+'/espot/'+ESPOTNAME;
			if(setup.productId)
				ESPOT_URL = ESPOT_URL + '/product/' + setup.productId; 
			$timeout(function() {
				
				$http.get(ESPOT_URL.replace(ESPOTNAME, setup.espotName).replace(STOREID, setup.storeId))
				.then(function (response) {
					if(response.data.MarketingSpotData
						&& response.data.MarketingSpotData.length > 0
						&& response.data.MarketingSpotData[0].baseMarketingSpotActivityData 
						&& response.data.MarketingSpotData[0].baseMarketingSpotActivityData.length > 0 
						&& response.data.MarketingSpotData[0].baseMarketingSpotActivityData[0].marketingContentDescription
						&& response.data.MarketingSpotData[0].baseMarketingSpotActivityData[0].marketingContentDescription.length > 0
						&& response.data.MarketingSpotData[0].baseMarketingSpotActivityData[0].marketingContentDescription[0].marketingText){
					
						var html = response.data.MarketingSpotData[0].baseMarketingSpotActivityData[0].marketingContentDescription[0].marketingText;
			            var e = $compile(html)(scope);
			            element.replaceWith(e);
					}
				}, function (error) {
					$log.error(error);
					tealium_data2track.push({
						'id': 'Error',
						'Error_Code': 'Error loading espot ' + setup.espotName,
						'Error_Source': 'Client'
					});
				})
			});
		}
	}
});
;
app.controller('HeaderController', ['$scope', '$rootScope', '$compile', '$window', 'headerModule', '$http', '$timeout', '$httpParamSerializer', '$log',
	function ($scope, $rootScope, $compile, $window, headerModule, $http, $timeout, $httpParamSerializer, $log) {
	
		// device type init
		$rootScope.deviceType = 'D';
	
		// constants
		var CONST_STOREID = '#STOREID#';
		var CONST_BRAND = '#BRAND#';
		var CONST_FACET = '#FACET#';
		var CONST_CATEGORYID = "#CATEGORYID#";
		var CONST_SALESCATALOGID = "#SALESCATALOGID#";
		
		var CONTACT_BRAND_FACET = '';
		var CONTACT_BRAND_CATEGORY_ID = '';
		
		var CONTACTS_ITEMS_URL = '/search/resources/store/#STOREID#/productview/byCategory/#CATEGORYID#?facet=#FACET#%3A%22#BRAND#%22&pageSize=10&pageNumber=1&catalogId=#SALESCATALOGID#&profileName=RONA_findProductsByCategory_CL'
			
		$scope.params = {};
		$scope.contactsProducts = {};
		$scope.currentContactsBrand = '';
		$scope.currentContactsBrandLink = '';
		$scope.cartItemsNum = 0;
		$scope.selectedMenu = 0; 
		$scope.desktopMenuStatus = false; 
		$scope.mobileMenuStatus = 0;
		$scope.userType = 'G'; // or 'R' if registered
		$scope.errorMessage= null;
		$scope.searchOpen = false;
		$scope.contactImageBaseURL = ''
		$scope.searchInputHasGainFocus = false;
		$scope.emptySearchField = true;
		
		$rootScope.wishlistCount = 0;
		$rootScope.wishlistItems = [];
		
		// init screen type functions
		headerModule.getDeviceType($window.screen.width);
		angular.element($window).bind('resize', function(event){
			headerModule.getDeviceType(event.target.screen.width);
		});
		
		$scope.init = function (_params) {
			$scope.params = _params;
			
			$scope.selectedCategory='eyeglasses';
			$scope.selectedFilter=1;
			$scope.searchOpen=false;
			$scope.contactImageBaseURL = _params.contactImageBaseURL;
			
			// Initialize header module
			headerModule.init($scope.params);
			
			// Retrieve user type
			headerModule.getUserType().then(function(response){
				$scope.userType = response.data.basicInfo.registerType;
				
				if(response.data.basicInfo.callerId != -1002){
				
					// Retrieve cart quantity from headerModule
					headerModule.getCartItems().then(function(response){
						$scope.cartItemsNum = response;
					});
				}
			});

			// Retrieve wish list quantity from headerModule
			headerModule.getWishListItems().then(function(response){
				$rootScope.wishlistCount = response.count;
				$rootScope.wishlistItems = response.catentries;
			});
			
			// Init OCR functionality
			ocr.init();
		}
		
		$scope.resetSearchField = function(){
			//if (document.getElementById("SimpleSearchForm_SearchTerm").value == "") {
				document.getElementById("SimpleSearchForm_SearchTerm").value = document.getElementById("searchTextHolder").innerHTML.trim();
				$('#SimpleSearchForm_SearchTerm').addClass ('blur');
			//}
			// hide the search box results
			if(typeof autoSuggestHover !== 'undefined' && !autoSuggestHover) {
				showAutoSuggest(false);
			}
		}
		
		$scope.hideSearch = function(){
			document.getElementById("header_search_wrapper").style.display = "none";
			document.getElementById("menu_search_nav_links").style.top = null;
			document.getElementById("menu_search_nav_links").style.height = null;
		}
		
		$scope.showSearch = function(){
			document.getElementById("header_search_wrapper").style.display = "flex";
			document.getElementById("menu_search_nav_links").style.top = "0";
			document.getElementById("menu_search_nav_links").style.height = "100%";
			$scope.searchInputHasGainFocus = true;
			document.getElementById("SimpleSearchForm_SearchTerm").focus();
		}
		
		$scope.showCloseIcon = function(event){
			if((event.target.value == "" || event.target.value == "Search for...") && ($scope.deviceType == 'M')) {
				  $scope.emptySearchField = true;
			  }else{
				  $scope.emptySearchField = false;
		  }
		}
		
		$scope.switchMenu = function(menuId) {
			// solves cutted third level menu problems on mobiles and tablets
			$('.nav-links').animate(
				{
					scrollTop: 0,
				},
				"ease"
			);
			
			if(menuId == 0){
				$scope.desktopMenuStatus = false;
				$scope.selectedMenu = menuId; 
			}

			if(menuId == $scope.selectedMenu){
				$scope.desktopMenuStatus = false;
				$scope.selectedMenu = 0; 
			}else{
				if($scope.selectedMenu == 0){
					$scope.selectedMenu = menuId;
					$timeout(function(){
						$scope.desktopMenuStatus = true;
					}, 500);
				}else{
					$scope.selectedMenu = menuId;
				}
			}
			
			if(window.innerWidth > 480){

				$(".contacts-list-fill").mCustomScrollbar({
					scrollInertia : 200,
					scrollButtons: {
						enable: true 
					},
					mouseWheel:{ preventDefault: true }
				});

				$(".ct_menu__main.mCustomScrollJs").mCustomScrollbar({
					scrollInertia : 200,
					scrollButtons: {
						enable: true 
					},
					mouseWheel:{ preventDefault: true }
				});

			}
		}
		
		$scope.stopScrolling = function () {
			$('body').addClass('stop-scrolling');
		}
		
		$scope.enableScrolling = function () {
			$('body').removeClass('stop-scrolling');
		}

		$rootScope.wrapAngular = function(elementFunc){
			$compile(elementFunc)($scope);
		}

		$scope.retreiveContacts = function(contactsCategoryId, brand, brandFacet, salesCatalogId, link){
			//CL_SUPPLIER or CL_BRAND_LINE
			if($scope.contactsProducts[brand] == null){
				if(brand == 'Acuvue'){
                        CONTACTS_ITEMS_URL = '/search/resources/store/10851/productview/byCategory/#CATEGORYID#?facet=&pageSize=10&pageNumber=1&catalogId=#SALESCATALOGID#&profileName=RONA_findProductsByCategory_CL'
                }else{
                        CONTACTS_ITEMS_URL = '/search/resources/store/10851/productview/byCategory/#CATEGORYID#?facet=#FACET#%3A%22#BRAND#%22&pageSize=10&pageNumber=1&catalogId=#SALESCATALOGID#&profileName=RONA_findProductsByCategory_CL'
                }
                $http.get(CONTACTS_ITEMS_URL.replace(CONST_CATEGORYID, contactsCategoryId).replace(CONST_BRAND, brand).replace(CONST_FACET, brandFacet).replace(CONST_SALESCATALOGID, salesCatalogId))
				.then(function (response) {
					if (response && response.data.catalogEntryView) {
						$scope.contactsProducts[brand]= [];
						
						response.data.catalogEntryView.forEach(function(entry) {
							
							var contactLensName = '';
							entry.attributes.forEach(function(attr) {
								if(attr.name == 'MODEL_NAME'){
									contactLensName = attr.values[0].value;
								}
							});
							window.contactsSEOURLs = {};
							$scope.contactsProducts[brand].push({
								name: contactLensName,
								upc: entry.partNumber,
								url: link + '/' + entry.keyword
							})
						});
						$scope.currentContactsBrand = brand;
						$scope.currentContactsBrandLink = link;
						
						if(window.innerWidth > 480){

							$(".ct_menu__main.mCustomScrollJs").mCustomScrollbar({
								scrollInertia : 200,
								scrollButtons: {
									enable: true 
								},
								mouseWheel:{ preventDefault: true }
							});

						}
					} 
				}, function (error) {
					$log.error(error);
					tealium_data2track.push({
						'id': 'Error',
						'Error_Code': 'DDM Contacts error',
						'Error_Source': 'Client'
					});
	
					$scope.hasLenses = false;
				})
			}else{
				$scope.currentContactsBrand = brand;
				$scope.currentContactsBrandLink = link;
			}
		}
	}
])

;
app.controller('FooterController', ['$scope', '$rootScope', 'lcActionsModule', 'PromoPopupService', '$http', '$httpParamSerializer', '$window', '$log', '$cookies',
	function ($scope, $rootScope, lcActionsModule, PromoPopupService, $http, $httpParamSerializer, $window, $log, $cookies) {
		$scope.selectOtherBrandVal = 0;
		$scope.langselection = 0;

		$scope.selectedLang = "";
		
		$scope.errorMessage= null;
		$scope.subscribe = {};
		$rootScope.backdropOn = false;
		
	    $scope.submitEmailSubscription = function () {
	    	$scope.errorMessage= null;
	    	$scope.subscribeDone= null;
	    	
	    	var submitURL = getAbsoluteURL() + 'LCEmailSubscription';
	    	
	    	var data = {
				preregister: $scope.subscribe.preregister,
				addressType: $scope.subscribe.addressType,
				canAddOrigin: $scope.subscribe.canAddOrigin,
				optinStatus: $scope.subscribe.optinStatus,
				URL: $scope.subscribe.URL,
				storeId: $scope.subscribe.storeId,
				langId: $scope.subscribe.langId,
				emailType: $scope.subscribe.emailType,
				showRegister: $scope.subscribe.showRegister,
				email: $scope.subscribe.enteredEmail
			};

	    	data['lcGeneralEmailOptIn_'+$scope.subscribe.storeId+'_r_1'] = $scope.subscribe.lcGeneralEmailOptIn;    
	    	data['ageCheck_'+$scope.subscribe.storeId+'_r_1'] = $scope.subscribe.ageCheck;
	    	
	    	if (!$scope.subscribe.enteredEmail) {
	    		 $scope.errorMessage = 'Please enter an email address.';
	    		 return;
	    	}
	    	
	    	$http.post(submitURL, $httpParamSerializer(data), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
    			.then(function (response) {
					if (response.status == 200 && response.data.status == 300) {
						$log.log(response.data.message);
						errorMessage= (response.data.message);
						$scope.errorMessage = 'The email address you provided is already subscribed.'
					} else if (response.status == 200 && response.data.message == "Success") {
						var trimmedLowerMail = '';

						if(data.email){
							trimmedLowerMail = data.email.trim().toLowerCase();
						}

						tealium_data2track.push({
							id: 'SignupForm',
							User_Email_MD5: MD5(data.email), 
							User_Email_SHA256: sha256(trimmedLowerMail), 
						});

						// Add eaactivity cookie if Early Access is active
						try {
							var eaactivityCookie = $cookies.get("eaactivity");

							if ($window.eaaccess && $window.eaaccess === true && !eaactivityCookie) {
								document.cookie = "eaactivity=true; max-age=2592000; path=/";
								PromoPopupService.removeMinimizedPopup();
								$window.location.reload();
							}
						} catch (e) {
							$log.info("eaaccess is disabled");
						}

						$log.log(response.statusText);
						$scope.subscribeDone = 'Thank you for signing up for emails!';
					} else if (response.status == 200 && response.data.status == 400 && response.data.message == "Invalid email address supplied.") {
						$log.log(response.data.message);
						$scope.errorMessage = 'Please enter a valid e-mail address';
					} else if($scope.subscribe.enteredEmail != undefined) {
						$log.log(response.data.message);
						$scope.errorMessage = 'Email Subscription Error';
					}
    		 });
  		}

	    $scope.selectOtherBrand = function() {
	    	$scope.selectOtherBrandVal = ($scope.selectOtherBrandVal == 0) ? 1 : 0;
	    	if( $scope.selectOtherBrandVal ) $("html, body").animate({ scrollTop: $(document).height() }, 300);
	    }

	    $scope.initLanguageSwitcher = function() {
	    	var currLanguageLi = null;
	    	var host = window.location.host;

	    	if(host.indexOf('lenscrafters.com') !== -1){
	    		// USA
	    		if(host == 'www.lenscrafters.com'){
					$scope.selectedLang = 'UNITED STATES (English)';
	    			currLanguageLi = 0;
	    		}else if(host == 'es.lenscrafters.com'){
					$scope.selectedLang = 'UNITED STATES (Espa&ntilde;ol)';
	    			currLanguageLi = 1;
	    		}else{
					$scope.selectedLang = 'UNITED STATES (English)';
	    			currLanguageLi = 0; 
	    		}
	    	}else if(host.indexOf('lenscrafters.ca') !== -1){
	    		// CA
	    		if(host == 'www.lenscrafters.ca'){
					$scope.selectedLang = 'CANADA (English)';
	    			currLanguageLi = 2;
	    		}else if(host == 'fr.lenscrafters.ca' || host == 'fr-uat.lenscrafters.ca'){
					$scope.selectedLang = 'CANADA (Fran&ccedil;aise)';
					currLanguageLi = 3;
				}else{
					$scope.selectedLang = 'CANADA (English)';
	    			currLanguageLi = 2;
				}
	    	}else{
	    		// fallback if <> lenscrafters.com && lenscrafters.ca
					$scope.selectedLang = 'UNITED STATES (English)';
    			currLanguageLi = 0;
	    	}
	    	
	    	$('.lang-pop ul li').eq(currLanguageLi).find('a').addClass('selected');
	    }
	    $scope.initLanguageSwitcher();
	    
	    $scope.langselectionFn = function(){
	    	$scope.langselection = ($scope.langselection == 0) ? 1 : 0;
	    	if( $scope.langselection ) $("html, body").animate({ scrollTop: $(document).height() }, 300);
	    }
	    
	    
	    
	    $scope.asyncSVGLoader = function(){
	    	
	    	var revision = 1;

	    	var isLocalStorage = 'localStorage' in window && window['localStorage'] !== null,
	    	request,
	    	insertIT = function (data) {
	    	    document.body.insertAdjacentHTML('beforeend', data);
	    	},
	    	insert = function (data) {
	    	    if (document.body)
	    	        insertIT(data);
	    	    else
	    	        document.addEventListener('DOMContentLoaded', insertIT);
	    	};

	    	/* disable localstorage for the moment
	    	if (isLocalStorage && localStorage.getItem('inlineSVGrev') == revision) {
	    	    data = localStorage.getItem('inlineSVGdata');
	    	    if (data) {
	    	        insert(data);
	    	        return true;
	    	    }
	    	}
			*/
	    	
	    	lcActionsModule.loadContent('X_SVG_Icons').then(function (data) {
	    	    insert(data);
	    	    if (isLocalStorage) {
	    	        localStorage.setItem('inlineSVGdata', data);
	    	        localStorage.setItem('inlineSVGrev', revision);
	    	    }

	    	});
	    }
	    
	    //load SVG at the end
	    angular.element(document).ready(function () {
	    	 $scope.asyncSVGLoader();
	    });
	}
]);

;
app.controller('FindAStoreController', ['$scope', '$rootScope', '$http', '$window', '$cookies', '$filter', '$log', '$timeout', 'moment',
	function ($scope, $rootScope, $http, $window, $cookies, $filter, $log, $timeout, moment) {
	$scope.params = {};
	$rootScope.currentStep = 1;
	$rootScope.locationEntry = '';
	$rootScope.stores = [];
	$rootScope.geoLocate = false;
	$rootScope.locationWrongCountry = 0;
	
	$scope.currentLocation = null;
	$scope.currentLocationEntry = '';
	$scope.invalidateStoreCards = false;
	$scope.noResults = false;
	$scope.offset = 0;
	$scope.moreInfoStoreIndex = -1;
	$scope.eyeExamInCalifornia = -1;
	$scope.eyeExamInTexasOrOklahoma = -1;
	$scope.selectedStoreIndex = -1;
	$scope.currentTimeOffset = 0;
	$scope.seeMore = false;
	$scope.lastLocation = null;
	$scope.defaultLanguage = 'English';
	$scope.storesLoading = false;
	$scope.moreInfoLoading = -1;
	$scope.locationWrongCountryUrl = null;
	$scope.storeFavouriteLoading = -1;
	$scope.favouriteStoresAdded = 0;
	$scope.fullscreenControlCreated = false;
	$scope.isFullScreen = false;
	$scope.areFiltersOpen = false;
	$scope.isSortByOpen = false;
	$scope.insuranceProviderInput = '';
	$scope.insuranceProviderSelected = false;
	$scope.insuranceProviderListVisible = false;

	$scope.filters = {
		openings: [{
			id: 1,
			value: 'Open today',
			selected: false
		}, {
			id: 2,
			value: 'Open weekends',
			selected: false
		}],
		insuranceProviders: [],
		languages: []
	};

	$scope.appliedFilters = {};

	$scope.sortBy = {
		selected: 0,
		options: ['Distance', 'Availability']
	}
	
	$scope.map = null;
	$scope.markers = [];
	
	$scope.storeCards = {
		collapsed : false,
		slickCarousel : null,
		elem : null,
		wrapperElem : null,
		expandedPosition : 0,
		collapsedPosition : 0
	};

	$scope.specialCharsRegex = /^[^!@#$%^&*()_+\-=\[\]{};':"\\|.<>\/?]*$/;

	$scope.markerShape = {
		coords: [0, 0, 36, 36],
	    type: 'rect'
	};

	$scope.zoomLevel = {
		disabled: 10,
		group: 13,
		store: 15
	};

	$scope.defaultLocation = new google.maps.LatLng({
		lat: 39.358056,
		lng: -84.311944
	});

	$scope.disabledMapOptions = {
		center: $scope.defaultLocation,
		zoom: $scope.zoomLevel.disabled,
		disableDefaultUI: true,
		draggable: false,
		scrollwheel: false,
		gestureHandling: 'none'
	};

	$scope.mapOptions = {
		zoom: $scope.zoomLevel.group,
		disableDefaultUI: false,
		zoomControl: true,
		mapTypeControl: false,
		fullscreenControl: false,
		streetViewControl: false,
		draggable: true,
		clickableIcons: false,
		scrollwheel: true,
		gestureHandling: 'greedy'
	};

	$scope.init = function(params) {
		$scope.params = angular.copy(params);

		if ($scope.params.isMobile) {
			$scope.mapOptions.zoomControl = false;
		} else {
			var map = document.getElementsByClassName('map')[0];

			if ($rootScope.currentStep == 1) {
				$scope.map = new google.maps.Map(map, $scope.disabledMapOptions);
			} else {
				$scope.map = new google.maps.Map(map, $scope.mapOptions);
			}
		}

		var locationEntry = null;

		// Handle header location search
		if (($scope.params.fromHeader || $scope.params.fromEspot == 'HomePage') && $scope.params.locationEntry !== '') {
			locationEntry = $scope.params.locationEntry;
		} else {
			// Handle saved cookie location
			locationEntry = $scope.getLocationEntryCookie();
		}

		if (locationEntry !== null) {
			$rootScope.locationEntry = locationEntry;
			$scope.submitCurrentForm();
		}

		angular.element(document.getElementById('storeFiltersForm')).on('click', function() {
			if ($scope.areFiltersOpen && $scope.insuranceProviderListVisible) {
				$scope.$apply(function() {
					$scope.insuranceProviderListVisible = false;
				});
			}
		});
	};

	$scope.getLocationEntryCookie = function() {
		var locationEntry = null;

		var cookieLocationEntry = $cookies.get('lc_location_entry');

		if (cookieLocationEntry && cookieLocationEntry !== '') {
			locationEntry = cookieLocationEntry;
		}

		return locationEntry;
	};

	$scope.setLocationEntryCookie = function(locationEntry) {
		$cookies.put('lc_location_entry', locationEntry);
	};

	$scope.clearLocationEntryCookie = function() {
		$cookies.remove('lc_location_entry');	
	};
	
	$scope.geolocate = function() {
		var geolocation = navigator.geolocation;
			
		if (geolocation) {
			$scope.resetStores();
			
			$rootScope.geolocateWatchId = geolocation.getCurrentPosition(function(position) {
				$scope.currentLocation = new google.maps.LatLng({
					lat: parseFloat(position.coords.latitude),
					lng: parseFloat(position.coords.longitude)
				});
				
				if (!$scope.params.isMobile) {
					// Desktop
					$scope.map.center.latitude = $scope.currentLocation.lat();
				    $scope.map.center.longitude = $scope.currentLocation.lng();
				}
				
				$scope.findStores();
			}, function(error) {
				switch(error.code) {
					case error.PERMISSION_DENIED:
						$log.warn('User denied the request for Geolocation');
						break;
					case error.POSITION_UNAVAILABLE:
						$log.error('Location information is unavailable');
						break;
					case error.TIMEOUT:
						$log.error('The request to get user location timed out');
						break;
					case error.UNKNOWN_ERROR:
						$log.error('An unknown error occurred');
						break;
				}
			});
		} else {
			alert('Geolocation is not supported by this browser');
		}
	};

	$scope.$watch('locationEntry', function(newValue, oldValue) {
		if ($scope.noResults && newValue !== oldValue) {
			$scope.noResults = false;
		}
	})

	$scope.performGeocode = function(callback) {
		if (callback && typeof(callback) == 'function') {
			var geocoder = new google.maps.Geocoder();
			if($scope.params.storeId == '10851') {
				geocoder.geocode({
					address : $scope.currentLocationEntry + '|country:US'
				}, callback);
			} else {
				geocoder.geocode({
					address : $scope.currentLocationEntry
				}, callback);
			}
		}
	};

	$scope.resetStores = function() {
		$scope.offset = 0;
		$scope.totalCount = 0;
		$rootScope.stores.length = 0;
	};

	$scope.findStores = function(form) {
		if (form) {
			if (form.$valid) {
				$scope.currentLocationEntry = $rootScope.locationEntry;
				sessionStorage.setItem('Store_Search_Type', 'text');
				sessionStorage.setItem('Store_Search_Keyword',  $rootScope.locationEntry);
			} else if (form.$invalid) {
				return;
			}
		} else {
			if ($scope.currentLocationEntry == '') {
				$scope.currentLocationEntry = $rootScope.locationEntry;
				sessionStorage.setItem('Store_Search_Type', 'geolocalized');
				sessionStorage.setItem('Store_Search_Keyword',  'geolocalized');
			}
		}

		if ($scope.seeMore == false) {
			$scope.resetStores();
		}

		if($scope.currentLocation == null) {
			$rootScope.geoLocate = false;

			$scope.performGeocode(function(response, status) {
				
				if (status == 'OK' && response.length) {
					$scope.currentLocation = new google.maps.LatLng({
						lat: response[0].geometry.location.lat(),
						lng: response[0].geometry.location.lng()
					});

					if($scope.params.storeId == '10852') {
						for(i in response[0].address_components){
							$rootScope.locationWrongCountry = 0;
							if (response[0].address_components[i].short_name == 'US' && response[0].address_components[i].types.includes('country')){
								$rootScope.locationWrongCountry = 1;
								locationWrongCountryUrl = $scope.getWrongCountryUrl(true);
								$scope.currentLocation = null;
								$('.wrongCountryError').html(locationWrongCountryUrl);
								$('.wrongCountryError').removeClass('hide');
								break;
							}
						}
					}

					if($rootScope.locationWrongCountry != null && $rootScope.locationWrongCountry == 0){
						$('.wrongCountryError').addClass('hide');
						$scope.loadStores();
					}
				} else {
					$scope.$apply(function() {
						$scope.noResults = true;
					});
					obj = {
					 	id: 'Exam-Funnel-FindStore',
						Store_Search_Keyword: sessionStorage.Store_Search_Keyword,
						Store_Search_Type: sessionStorage.Store_Search_Type,
						Store_Search_ResultItemsQnt: '0'
				    }
					tealium_data2track.push(obj);
				}
			});
		} else {
			$('.wrongCountryError').addClass('hide');
			sessionStorage.setItem('Store_Search_Type', 'geolocalized');
			sessionStorage.setItem('Store_Search_Keyword',  'geolocalized');
			$rootScope.geoLocate = true;
			$scope.loadStores();
		}
	};
	
	$scope.createFavouriteStoreTip = function(event) {
		$scope.cancelFavouriteStoreTip();

		var el = angular.element(event.srcElement || event.target)[0];

		var title = 'My favourite store';
		
		var tooltipWrap = document.createElement("div"); //creates div
	    tooltipWrap.className = 'tooltip'; //adds class
	    tooltipWrap.appendChild(document.createTextNode(title)); //add the text node to the newly created div.
	 
	    var firstChild = document.body.firstChild;//gets the first elem after body
	    firstChild.parentNode.insertBefore(tooltipWrap, firstChild); //adds tt before elem
	    
		var padding = 5;
	    var linkBounds = el.getBoundingClientRect();
	    var tooltipBounds = tooltipWrap.getBoundingClientRect();

	    var topPos = (linkBounds.top + $window.scrollY) - (tooltipBounds.height + padding) ;
	    tooltipWrap.setAttribute('style', 'top:' + topPos + 'px; left:' + linkBounds.left + 'px;');
	}
	
	$scope.cancelFavouriteStoreTip = function() {
		var tooltip = document.querySelector(".tooltip");
		if (tooltip) {
			tooltip.remove();
		}
	}
	
	$scope.loadStores = function() {
		$scope.storesLoading = true;
				
		var data = {
			selectedOpeningFilters: getSelectedOpeningFilters(),
			selectedInsuranceFilters: getSelectedInsuranceFilters(),
			selectedLanguageFilters: getSelectedLanguageFilters()
		};

		$http.post('/wcs/resources/store/' + $scope.params.storeId + '/storelocator/filtered/latitude/'
			+ $scope.currentLocation.lat() + '/longitude/' + $scope.currentLocation.lng() + '?pageSize=' + $scope.params.pageSize +'&offset=' + $scope.offset, data)
		.then(function(response) {
			if (response != undefined && response.data  != undefined && response.data.PhysicalStore != undefined) {
				var stores = angular.copy($rootScope.stores);

				// Populate stores
				$scope.favouriteStoresAdded = 0;
				
				for (var i = 0; i < response.data.PhysicalStore.length; i++) {
					var physicalStore = response.data.PhysicalStore[i];

					// add schedule URL
					physicalStore.scheduleURL = decodeURIComponent($scope.scheduleBaseURL).replace('#storeNumber#', physicalStore.storeName);
					
					// add appointment button options
					physicalStore.showUniqueAppointmentAction = $scope.showUniqueAppointmentAction();
							
					// add e-appointmnet availability
					physicalStore.eyeExamOnline = $scope.isOnlineExamAvailable(physicalStore);

					// add booking appointment availability
					physicalStore.appointmentOnline = $scope.isOnlineAppointmentAvailable(physicalStore);
		
					// Add parsed store hours
					physicalStore.storeHours = $scope.getStoreHours(physicalStore);

					//physicalStore.isStoreOpen = $scope.isStoreOpen(physicalStore);

					physicalStore.storeStatusClass = $scope.getStoreStatusClass(physicalStore);
					
					physicalStore.doctorInfo = {};
					
					physicalStore.doctorInfo.doctors = [];
					
					// if the store if preferred by the user, increment the favourite store count
					if (physicalStore.x_userId) {
						$scope.favouriteStoresAdded++;
					}

					// Populate available filters if location changes or filters are empty
					if (i == 0 && (areFiltersEmpty($scope.filters) || ($scope.currentLocationEntry !== $scope.getLocationEntryCookie()))) {
						populateAvailableFilters(physicalStore);
					}

					stores.push(physicalStore);
				}

				$rootScope.stores = angular.copy(stores);

				if (!areFiltersEmpty($scope.appliedFilters)) {
					$scope.filters = angular.copy($scope.appliedFilters);
				}

				$scope.totalCount = response.data.recordSetTotal;
				sessionStorage.setItem('Store_Search_ResultItemsQnt', $scope.totalCount);
				
				obj = {
					id: 'Exam-Funnel-FindStore',
					Store_Search_Keyword: sessionStorage.Store_Search_Keyword,
					Store_Search_Type: sessionStorage.Store_Search_Type,
					Store_Search_ResultItemsQnt: sessionStorage.Store_Search_ResultItemsQnt
				}
				tealium_data2track.push(obj);
				
				$scope.noResults = false;
				$scope.storesLoading = false;

				if (!$scope.params.isMobile) {
					// Desktop
					$scope.map.setOptions($scope.mapOptions);
					$scope.createFullscreenControl();
					$scope.setMarkers();
					$scope.map.panTo($scope.currentLocation);
				} else {
					// Mobile
					if ($scope.seeMore || $scope.currentLocationEntry !== $scope.getLocationEntryCookie() || $scope.storeResultsTab == 2) {
						$scope.invalidateStoreCards = true;
					} else {
						$scope.invalidateStoreCards = false;
					}

					if ($scope.storeResultsTab && ($scope.storeResultsTab == 2)) {
						$scope.reinitStoreCards();

						$scope.setMarkers();
						$scope.map.panTo($scope.currentLocation);
					} else {
						// First search
						$scope.storeResultsTab = 1;
					}
				}

				$scope.setLocationEntryCookie($scope.currentLocationEntry);

				if ($scope.seeMore) {
					$scope.seeMore = false;
				}
				
				$scope.lastLocation = $scope.currentLocation;
				$scope.currentLocation = null;
				$rootScope.currentStep = 2;
				if ($scope.params.isMobile) {
					$('.store-results-tabs').removeClass('hidden');
					$('.store-results-tabs-content').removeClass('hidden');
				}
			} else {
				$scope.currentLocation = null;
				$scope.noResults = true;
				if ($scope.params.isMobile) {
					$scope.setStoreResultTab(1);
					$('.store-results-tabs').addClass('hidden');
					$('.store-results-tabs-content').addClass('hidden');
				}
				obj = {
						id: 'Exam-Funnel-FindStore',
						Store_Search_Keyword: sessionStorage.Store_Search_Keyword,
						Store_Search_Type: sessionStorage.Store_Search_Type,
						Store_Search_ResultItemsQnt: '0'
				}
				tealium_data2track.push(obj);
			}
		}, function(error) {
			$log.error(error);
		});
	};

	$scope.toggleStoreFavourite = function (storeIndex) {
		var store = $rootScope.stores[storeIndex]
		var path = '/wcs/resources/store/' + $scope.params.storeId + '/favouritestore/addfavourite';
		
		$scope.storeFavouriteLoading = storeIndex;

		if (store.x_userId === undefined) {

			$http.post(path, {"storeLocId": store.uniqueID, "storeNickName": ""}, storeIndex)
			.then(function (response) {
				if (response.data) {
					$rootScope.stores[storeIndex].x_userId = response.data["user"];

					$scope.storeFavouriteLoading = -1;
					$scope.favouriteStoresAdded++;
				}
			}, function (error) {
				$log.error(error);
			});
		} else {
			path = '/wcs/resources/store/' + $scope.params.storeId + '/favouritestore/removefavourite/storelocid/' + store.uniqueID;
			
			$http.delete(path, storeIndex)
			.then(function (response) {
				if (response.data) {
					delete $rootScope.stores[storeIndex].x_userId;
					
					$scope.storeFavouriteLoading = -1;
					$scope.favouriteStoresAdded--;
				}
			}, function (error) {
				$log.error(error);
			});
		}
	};

	var populateAvailableFilters = function(store) {
		if (store && (store.x_availableInsuranceFilters || store.x_availableLanguageFilters)) {

			// Reset filters
			$scope.filters = {
				openings: [{
					id: 1,
					value: 'Open today',
					selected: false
				}, {
					id: 2,
					value: 'Open weekends',
					selected: false
				}],
				insuranceProviders: [],
				languages: []
			};

			// Populate insurance filters
			if (store.x_availableInsuranceFilters) {
				var availableInsuranceFilters = store.x_availableInsuranceFilters.split(',');

				for (var i = 0; i < availableInsuranceFilters.length; i++) {
					var availableInsuranceFilter = availableInsuranceFilters[i].trim();

					if (availableInsuranceFilter.length !== 0) {
						$scope.filters.insuranceProviders.push({
							id: (i + 1),
							value: availableInsuranceFilter,
							selected: false
						});
					}
				}
			}

			// Populate language filters
			if (store.x_availableLanguageFilters) {
				var availableLanguageFilters = store.x_availableLanguageFilters.split(',');

				for (var i = 0; i< availableLanguageFilters.length; i++) {
					var availableLanguageFilter = availableLanguageFilters[i].trim();

					if (availableLanguageFilter.length !== 0) {
						$scope.filters.languages.push({
							id: (i + 1),
							value: availableLanguageFilter,
							selected: false
						});
					}
				}
			}
		}
	};

	var areFiltersEmpty = function(filters) {
		return (typeof filters.insuranceProviders == 'undefined' || filters.insuranceProviders.length == 0)
			 && (typeof filters.languages == 'undefined' || filters.languages.length == 0);
	};

	$scope.toggleInsuranceProvider = function(oldInsuranceProvider) {
		$scope.insuranceProviderSelected = false;

		for (var i = 0; i < $scope.filters.insuranceProviders.length; i++) {
			if ($scope.filters.insuranceProviders[i].id !== oldInsuranceProvider.id) {
				$scope.filters.insuranceProviders[i].selected = false;
			} else {
				$scope.filters.insuranceProviders[i].selected = !oldInsuranceProvider.selected;

				if ($scope.filters.insuranceProviders[i].selected) {
					$scope.insuranceProviderInput = $scope.filters.insuranceProviders[i].value;
					$scope.insuranceProviderSelected = true;
				}
			}
		}

		$scope.insuranceProviderListVisible = false;
	};

	$scope.clearFilters = function() {
		for (var i = 0; i < $scope.filters.openings.length; i++) {
			$scope.filters.openings[i].selected = false;
		}

		for (var j = 0; j < $scope.filters.insuranceProviders.length; j++) {
			$scope.filters.insuranceProviders[j].selected = false;
		}

		for (var k = 0; k < $scope.filters.languages.length; k++) {
			$scope.filters.languages[k].selected = false;
		}
	};

	$scope.applyFilters = function() {
		$scope.appliedFilters = angular.copy($scope.filters);

		$log.info($scope.appliedFilters);

		$scope.areFiltersOpen = false;

		$scope.findStores();
	};

	var getSelectedOpeningFilters = function() {
		var selectedOpeningFilters = [];

		if ($scope.appliedFilters.openings) {
			selectedOpeningFilters = $scope.appliedFilters.openings.filter(function(opening) {
				return opening.selected;
			}).map(function(opening) {
				return opening.value;
			});
		}

		return selectedOpeningFilters;
	};

	var getSelectedInsuranceFilters = function() {
		var selectedInsuranceFilters = [];

		if ($scope.appliedFilters.insuranceProviders) {
			selectedInsuranceFilters = $scope.appliedFilters.insuranceProviders.filter(function(insuranceProvider) {
				return insuranceProvider.selected;
			}).map(function(insuranceProvider) {
				return insuranceProvider.value;
			});
		}

		return selectedInsuranceFilters;
	};

	var getSelectedLanguageFilters = function() {
		var selectedLanguageFilters = [];

		if ($scope.appliedFilters.languages) {
			selectedLanguageFilters = $scope.appliedFilters.languages.filter(function(language) {
				return language.selected;
			}).map(function(language) {
				return language.value;
			});
		}

		return selectedLanguageFilters;
	};
	
	$scope.isOnlineExamAvailable = function(store) {
		var available = false;
		
		store.Attribute.forEach(function(attribute) {
			if(attribute.name == 'onlineAppt')
				if(attribute.value == 'Y')
					available = true;
		});
		
		return available;
	};
	
	$scope.isOnlineAppointmentAvailable = function(store) {
		var available = false;
		
		store.Attribute.forEach(function(attribute) {
			if(attribute.name == 'bookingAppt')
				if(attribute.value == 'Y')
					available = true;
		});
		
		return available;
	};
	
	$scope.showUniqueAppointmentAction = function(store) {
		var unique = false;
		
		var uniqueButton= $.cookie('lc_bte_uniqueappointment');
		unique = (uniqueButton && uniqueButton === 'true');
		
		return unique;
	};

	$scope.storeBookingPreConf= function(store){
		//Monetate cookie
		var uniqueButton= $.cookie('lc_bte_uniqueappointment');
		if(uniqueButton && uniqueButton === 'true'){
			$('.store-booking-content_option-right > .store-booking-content_options-rectangle').attr("href", "/BookingDisplayView?storeNumber=" + store.storeName);
			$('#popupStoreBooking').show();
		} else {
			var urlRedirect = "/BookingDisplayView?storeNumber=" + store.storeName;
			location.href = urlRedirect;
		}
	};

	$scope.createFullscreenControl = function() {
		if (!$scope.fullscreenControlCreated) {
			$scope.fullscreenControlCreated = true;

			var fullscreenControlElem = document.createElement('button');
			fullscreenControlElem.classList.add('fullscreen-button');

			var findAStoreWrapperElem = document.getElementsByClassName('find-a-store')[0];

			angular.element(findAStoreWrapperElem).on('webkitfullscreenchange mozfullscreenchange fullscreenchange',
				function (event) {
					event = event || window.event;

					$log.info(event);

					if (!$scope.isFullScreen && (!document.fullscreenElement || !document.mozFullScreenElement ||
						!document.webkitFullscreenElement || !document.msFullscreenElement)) {
			
						fullscreenControlElem.classList.add('expanded');
			
						$scope.$apply(function() {
							$scope.isFullScreen = true;
						});
					} else {
						fullscreenControlElem.classList.remove('expanded');

						$scope.$apply(function() {
							$scope.isFullScreen = false;
						});
					}
				});

			fullscreenControlElem.addEventListener('click', function(event) {
				toggleFullscreen();
			});
			
			$scope.map.controls[google.maps.ControlPosition.TOP_RIGHT].push(fullscreenControlElem);
		}
	};

	var toggleFullscreen = function() {
		if ($scope.params.isMobile) {
			return;
		}

		var findAStoreWrapperElem = document.getElementsByClassName('find-a-store')[0];

		// Cross browser compatibility
		if (!$scope.isFullScreen && (!document.fullscreenElement || !document.mozFullScreenElement ||
			!document.webkitFullscreenElement || !document.msFullscreenElement)) {

			if (findAStoreWrapperElem.requestFullscreen) {
				findAStoreWrapperElem.requestFullscreen();
			} else if (findAStoreWrapperElem.mozRequestFullScreen) {
				findAStoreWrapperElem.mozRequestFullScreen(); // Firefox
			} else if (findAStoreWrapperElem.webkitRequestFullscreen) {
				findAStoreWrapperElem.webkitRequestFullscreen(); // Chrome and Safari
			} else if (findAStoreWrapperElem.msRequestFullscreen) {
				findAStoreWrapperElem.msRequestFullscreen(); // IE
			}
		} else {
			if (document.exitFullscreen) {
				document.exitFullscreen();
			} else if (document.msExitFullscreen) {
				document.msExitFullscreen();
			} else if (document.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			} else if (document.webkitExitFullscreen) {
				document.webkitExitFullscreen();
			}
		}
	};

	$scope.toggleFilters = function($event) {
		$event.preventDefault();
		$scope.areFiltersOpen = !$scope.areFiltersOpen;
		$scope.insuranceProviderListVisible = false;
	};

	$scope.toggleSortBy = function($event) {
		$event.preventDefault();
		$scope.isSortByOpen = true;
	};

	$scope.changeSortBy = function(index) {
		$scope.sortBy.selected = index;
		$scope.isSortByOpen = false;
	};

	$scope.setStoreResultTab = function(tabIndex) {
		if ($scope.params.isMobile) {

			// Check if tab is different
			if ($scope.storeResultsTab !== tabIndex) {
				$scope.storeResultsTab = tabIndex;

				function validateStoreCards() {
					if ($scope.currentLocationEntry !== $scope.getLocationEntryCookie()) {
						$scope.invalidateStoreCards = true;
					} else {
						$scope.invalidateStoreCards = false;
					}
				}

				if (tabIndex == 1) {
					$scope.setScrollLock(false);

					validateStoreCards();
				} else if (tabIndex == 2) {
					$scope.setScrollLock(true);

					if (!$scope.map) {
						var map = document.getElementsByClassName('map')[0];
						$scope.map = new google.maps.Map(map, $scope.mapOptions);

						if ($scope.map == undefined) {
							$scope.currentLocation = null;
							$scope.noResults = true;
							$scope.setStoreResultTab(1);
							$('.store-results-tabs').addClass('hidden');
							$('.store-results-tabs-content').addClass('hidden');

							return;
						}

						$scope.map.addListener('click', function() {
							$scope.toggleStoreCards(false);
						});

						$scope.map.addListener('dragstart', function() {
							$scope.toggleStoreCards(false);
						});
					}
					
					$scope.reinitStoreCards();

					angular.element($window).off('resize.findastore');
					angular.element($window).on('resize.findastore', function() {
						validateStoreCards();
						
						google.maps.event.trigger($scope.map, "resize");		

						$scope.reinitStoreCards();
					});

					$scope.setMarkers();
					$scope.map.setOptions($scope.mapOptions);
				}
			}
		}
	};

	$scope.reinitStoreCards = function() {
		return $timeout(function() {
			if ($scope.params.isMobile) {
				$scope.storeCards.elem = angular.element(document.getElementsByClassName('store-cards')[0]);
				$scope.storeCards.wrapperElem = angular.element(document.getElementsByClassName('store-cards-wrapper')[0]);

				if ($scope.storeCards.slickCarousel) {
					$scope.storeCards.elem.off('afterChange touchstart touchmove touchend');
					$scope.storeCards.elem.slick('unslick');
					$scope.storeCards.elem.off('destroy');
					$scope.storeCards.slickCarousel = null;
				}

				$scope.storeCards.slickCarousel = $scope.storeCards.elem.slick({
					centerMode : true,
					centerPadding : '25px',
					arrows : false,
					infinite: false
				});

				$scope.moveToStore(0);

				$scope.storeCards.elem.on('afterChange', function(slick, currentSlide, nextSlide) {
					$scope.moveToStore(currentSlide.currentSlide);
				});

				$scope.storeCards.elem.on('destroy', function(event, slick) {
					if ($scope.invalidateStoreCards) {
						slick.$slides.remove();
					}
				});	

				var mapContainerTop = $scope.storeCards.wrapperElem[0].parentElement.offsetTop;
				var mapContainerHeight = $scope.storeCards.wrapperElem[0].parentElement.clientHeight;
				var storeCardsWrapperTop = mapContainerTop + $scope.storeCards.wrapperElem[0].offsetTop;
				var storeCardsWrapperBottom = document.documentElement.clientHeight;
				var storeCardsWrapperHeight = $scope.storeCards.wrapperElem[0].clientHeight;
				var collapsedBottomOffset = Math.round(storeCardsWrapperHeight * 0.3);
				var collapsedThreshold = storeCardsWrapperTop + Math.round(storeCardsWrapperHeight * 0.5);

				$scope.storeCards.expandedPosition = Math.round(Math.min(mapContainerHeight, storeCardsWrapperBottom - mapContainerTop) * 0.5);
				$scope.storeCards.collapsedPosition = (storeCardsWrapperBottom - collapsedBottomOffset) - mapContainerTop;

				var touchData = {
					distXThreshold : 10,
					distYThreshold : 25,
					distTimeThreshold : 200,
					startX : null,
					startY : null,
					startTime : null,
					endX : null,
					endY : null,
					endTime : null,
					distX : null,
					dirX : null,
					distY : null,
					dirY : null,
					distTime : null
				};

				$scope.storeCards.elem.on('touchstart', function(e) {
					var touches = e.originalEvent.changedTouches;

					// Check single touch
					if (touches.length == 1) {
						var touch = touches[0];

						$scope.storeCards.wrapperElem.stop();

						touchData.startX = touch.clientX;
						touchData.startY = touch.clientY;
						touchData.startTime = new Date().getTime();
					}
				});

				$scope.storeCards.elem.on('touchmove', function(e) {
					e.preventDefault();

					var touches = e.originalEvent.changedTouches;

					// Check single touch
					if (touches.length == 1) {
						var touch = touches[0];

						var currentDistX = Math.abs(touch.clientX - touchData.startX);
						var currentDistY = Math.abs(touch.clientY - touchData.startY);

						if (currentDistY > currentDistX) {
							if (touch.clientY >= storeCardsWrapperTop &&
								touch.clientY <= storeCardsWrapperBottom - collapsedBottomOffset) {
								$scope.storeCards.wrapperElem[0].style.top = (touch.clientY - mapContainerTop)  + 'px';
							}
						}
					}
				});

				$scope.storeCards.elem.on('touchend', function(e) {
					var touches = e.originalEvent.changedTouches;

					// Check single touch
					if (touches.length == 1) {
						var touch = touches[0];

						touchData.endX = touch.clientX;
						touchData.endY = touch.clientY;
						touchData.endTime = new Date().getTime();

						touchData.distX = Math.abs(touchData.endX - touchData.startX);
						touchData.distY = Math.abs(touchData.endY - touchData.startY);
						touchData.dirX = Math.sign(touchData.endX - touchData.startX);
						touchData.dirY = Math.sign(touchData.endY - touchData.startY);
						touchData.distTime = touchData.endTime - touchData.startTime;

						if (touchData.distY > touchData.distX) {
							// If swipe detected
							if (touchData.distTime <= touchData.distTimeThreshold &&
								touchData.distY >= touchData.distYThreshold) {
								if (touchData.dirY < 0) {
									// Swipe up
									$scope.toggleStoreCards(true, touchData.distTime);
								} else if (touchData.dirY >= 0) {
									// Swipe down
									$scope.toggleStoreCards(false, touchData.distTime);
								}
							} else {
								// Reset position
								if (touchData.endY < collapsedThreshold) {
									$scope.toggleStoreCards(true, touchData.distTime);
								} else if (touchData.endY >= collapsedThreshold) {
									$scope.toggleStoreCards(false, touchData.distTime);
								}
							}
						}else{
							if (touchData.endY > collapsedThreshold && touchData.distX < touchData.distXThreshold) {
							    $scope.toggleStoreCards(true);
						    }
						}
					}
				});

				// Reset store card position on reinit
				$scope.toggleStoreCards(false, 1);
			}
		});
	};

	$scope.toggleStoreCards = function(open, delay, callback) {
		if ($scope.params.isMobile && $scope.storeCards.slickCarousel) {
			var defaultDelay = 500;

			if (!delay) {
				delay = defaultDelay;
			}

			$scope.storeCards.wrapperElem.animate({ top: open ? $scope.storeCards.expandedPosition : $scope.storeCards.collapsedPosition + 'px' },
				delay, function() {
				$scope.storeCards.collapsed = open ? false : true;

				if (callback && typeof callback == 'function') {
					callback();
				}
			});
		}
	};

	$scope.moveToStore = function(index) {
		if(!$scope.storesLoading){
			$scope.currentLocation = new google.maps.LatLng({
				lat: parseFloat($rootScope.stores[index].latitude),
				lng: parseFloat($rootScope.stores[index].longitude)
			});
	
			$scope.toggleMarkerIcon(index);
	
			$scope.map.setZoom($scope.zoomLevel.store);
			$scope.map.panTo($scope.currentLocation);
			
			$scope.selectedStoreIndex = index;
			$scope.currentLocation  = null;
		}
	};

	$scope.scrollToStore = function(id) {
		var storeElem = document.getElementById('store-' + id);
		var storeList = storeElem.parentElement;
		
		$scope.$apply(function() {
			$scope.selectedStoreIndex = id - 1;
		});
		$scope.toggleMarkerIcon(id-1);
		$(storeList).animate({ scrollTop : (storeElem.offsetTop - storeList.offsetTop)});
	};

	$scope.scrollToStoreCard = function(id) {
		if ($scope.params.isMobile) {
			$scope.storeCards.elem.slick('slickGoTo', id - 1);
		}
	};
	
	$scope.clearMarkers = function () {
		for (var i = 0; i < $scope.markers.length; i++) {
			$scope.markers[i].setMap(null);
		}

		$scope.markers.length = 0;
	};

	$scope.setMarkers = function () {
		$scope.clearMarkers();

		var bounds = new google.maps.LatLngBounds();

		var image = {
			url: $scope.storeLocationIcon,
			size: new google.maps.Size(36, 36),
			origin: new google.maps.Point(0, 0),
			anchor: new google.maps.Point(0, 36)
		};

		for (var i = 0; i < $rootScope.stores.length; i++) {
			var store = $rootScope.stores[i];
			var marker = new google.maps.Marker({
				position: { lat: parseFloat(store.latitude), lng: parseFloat(store.longitude) },
				map: $scope.map,
				icon: image,
				shape: $scope.markerShape,
				title: store.Description.displayStoreName,
				zIndex: 0,
				storeIndex: (i + 1)
			});

			marker.addListener('click', function() {
				if ($scope.params.isMobile) {
					$scope.scrollToStoreCard(this.storeIndex);
				} else {
					$scope.scrollToStore(this.storeIndex);
				}
			});

			google.maps.event.addListener(marker, 'highlight', function(highlight) {
				if (highlight) {
					this.setIcon($scope.storeLocationIconHighlight);
					this.setShape($scope.markerShape);
					this.setZIndex(1);
				} else {
					this.setIcon($scope.storeLocationIcon);
					this.setShape($scope.markerShape);
					this.setZIndex(0);
				}
			});

			$scope.markers.push(marker);

			bounds.extend(marker.getPosition());
		}

		$scope.map.fitBounds(bounds);
	};

	$scope.toggleMarkerIcon = function(index) {
		for (i = 0; i < $scope.markers.length; i++) {
			google.maps.event.trigger($scope.markers[i], 'highlight', (i == index));
		}
	};
	
	$scope.getDirections = function(index) {
		var directionsUrl = 'https://www.google.com/maps/dir/?api=1&destination=';

		var selectedStore = $rootScope.stores[index];

		if (selectedStore) {
			directionsUrl += encodeURIComponent(selectedStore.addressLine[0].trim() 
				+ ',' + selectedStore.city.trim() + ',' + selectedStore.stateOrProvinceName.trim() + ',' + selectedStore.postalCode.trim());

			$window.open(directionsUrl,'_blank');
		}		
	};

	$scope.showMoreInfo = function(index) {
		// Reset tabs and accordions
		$scope.moreInfoTab = 1;
		$scope.examStoreServices = 1;
		$scope.doctorInfo = {};
        $scope.doctorInfo.doctors = [];

		function populateMoreInfo() {
			if (!$rootScope.stores[index].storeServices) {
				$rootScope.stores[index].storeServices = $scope.getStoreServices(index);
			}
			if (!$rootScope.stores[index].featuredBrands) {
				$rootScope.stores[index].featuredBrands = $scope.getFeaturedBrands(index);
			}

			if ($scope.params.isMobile) {
				$scope.setScrollLock(true);
			}

			$scope.moreInfoStoreIndex = index;
			$scope.moreInfoLoading = -1;
		}

		// Get store doctor info from service if none
		if ($rootScope.stores[index].doctorInfo.doctors == 0) {
			$scope.moreInfoLoading = index;

			$scope.getStoreDoctorInfo(index).then(function(response) {
				if (response.data) {
					$rootScope.stores[index].doctorInfo = response.data.response.data;
					$rootScope.stores[index].doctorInfo.examServicies = $scope.decodeServices($rootScope.stores[index].doctorInfo.examServicies);
				}
				
				$scope.getPracticeHours(index).then(function(response){
					if(response.data && response.data.doctors && response.data.doctors.length > 0 ) {
						for (i = 0; i < $rootScope.stores[index].doctorInfo.doctors.length; i++) {
							var doctorFound = response.data.doctors.find((item) => item.doctorId == $rootScope.stores[index].doctorInfo.doctors[i].doctorId);
							if(doctorFound) {
								$rootScope.stores[index].doctorInfo.doctors[i].stateLicense = (doctorFound.stateLicense ? doctorFound.stateLicense : '');
								$rootScope.stores[index].doctorInfo.doctors[i].npi = (doctorFound.npi ? doctorFound.npi : '');
								if (doctorFound.newPatients === 'Y'){
									$rootScope.stores[index].doctorInfo.doctors[i].newPatients = 'Yes';
								}else {
									$rootScope.stores[index].doctorInfo.doctors[i].newPatients = 'No';
								}
							}
						}
					}
					if (response.data && response.data.examHours && response.data.examHours.length > 0 ) {
						$rootScope.stores[index].practiceHours = response.data.examHours;
					}
					populateMoreInfo(index);
				}, function(error) {
					populateMoreInfo(index);
					$log.warn('Unable to retrieve practice hours');
					$scope.moreInfoLoading = -1;
				});				
				
			}, function(error) {
				$log.warn('Unable to retrieve doctor info');
				$scope.moreInfoLoading = -1;
			});
		} else {
			populateMoreInfo(index);
		}
	};

	$scope.calculateMoreInfoTabsTopPos = function() {
		var timerCounts = 1;
		var moreInfoContainerIsVisible = setInterval(function() {
			timerCounts += 1;
			if (timerCounts > 10) {
				clearInterval(moreInfoContainerIsVisible);
			}
			if ($('.more-info-container').is(":visible")) {
				clearInterval(moreInfoContainerIsVisible);

				var topElement = $('.more-info-modal .more-info-row').eq(1);
				var topElementBottomPosition = topElement.position().top + topElement.outerHeight(true) + 10;
				if ($('.more-info-modal .more-info-row  .store-hours .more-info-store-same-week-hours-container').length > 0) {
					topElementBottomPosition = topElementBottomPosition + 90;
					$('.more-info-row.more-info-tabs-content').css('margin-top', 0);
				} else {
					$('.more-info-row.more-info-tabs-content').css('margin-top', 50);
				}
				$('.more-info-row.more-info-tabs').css('top', topElementBottomPosition);
			}
		}, 1000);
	};

	$scope.hideMoreInfo = function() {
		$scope.moreInfoTab = 1;
		if ($scope.params.isMobile) {
			$scope.setScrollLock(false);
		}

		$scope.moreInfoStoreIndex = -1;
		document.querySelector('#tab1').click();
	};

	$scope.getStoreHours = function(store) {
		var storeHours = [];

		if (store) {
			angular.forEach(store.Attribute, function(value, key) {
				if(value.displayName == 'StoreHours') {
					if (value.displayValue !== '') {
						var days = value.displayValue.split(';');

						for (var i = 0; i < days.length; i++) {
							var hours = days[i].split('-');

							this.push([]);

							for (var j = 0; j < hours.length; j++) {
								this[i].push(hours[j].trim());
							}
						}
					}
				}
			}, storeHours);

			return storeHours;
		}
	};

	$scope.getStoreServices = function(index) {
		var storeServices = [];
		var selectedStore = $rootScope.stores[index];
		
		if (selectedStore) {
			angular.forEach(selectedStore.Attribute, function(value, key) {
				if(value.displayName.startsWith('Service') && value.displayValue !== '') {
					this.push(value.displayValue);
				}
			}, storeServices);
		}

		return storeServices;
	};

	$scope.getFeaturedBrands = function(index) {
		var featuredBrands = [];
		var selectedStore = $rootScope.stores[index];
		
		if (selectedStore) {
			angular.forEach(selectedStore.Attribute, function(value, key) {
				if(value.displayName == 'FrameBrands') {
					angular.copy(value.displayValue.split(';'), this);
				}
			}, featuredBrands);
		}

		return featuredBrands;
	};

	$scope.getStoreStatusClass = function(store) {
		var storeStatus = null;
		var lastRemodel = null;
		var openDate = null;
		var reopenDate = null;
		var lastMovedDate = null;

		var storeStatusClass = '';

		if (store) {
			angular.forEach(store.Attribute, function(value, key) {
				if (value.displayName == 'StoreStatus' && storeStatus == null) {
					storeStatus = value.displayValue;
				}
				if (value.displayName == 'LastRemodel' && lastRemodel == null) {
					lastRemodel = value.displayValue;
				}
				if (value.displayName == 'OpenDate' && openDate == null) {
					openDate = value.displayValue;
				}
				if (value.displayName == 'ReOpenDate' && reopenDate == null) {
					reopenDate = value.displayValue;
				}
				if (value.displayName == 'LastMoveDate' && lastMovedDate == null) {
					lastMovedDate = value.displayValue;
				}
			}, storeStatus);

			function handleOpenStatusClass(initOpenStatusClass) {
				var openStatusClass = initOpenStatusClass;

				function checkTimeDiff(dateString, daysDiff, checkNow) {
					var valid = false;
					var now = moment();
					var date = moment(dateString.trim(), 'MM/DD/YYYY');
					var diff = now.diff(date, 'days');

					if ((checkNow ? (diff >= 0) : (diff > 0)) && diff <= daysDiff) {
						valid = true;
					}

					return valid;
				}

				if (lastRemodel !== null && lastRemodel !== '' && checkTimeDiff(lastRemodel, 180, false)) {
					openStatusClass = 'new-look';
				} else if (openDate !== null && openDate !== '' && checkTimeDiff(openDate, 180, false)) {
					openStatusClass = 'now-open';
				} else if (lastMovedDate !== null && lastMovedDate !== '' && checkTimeDiff(lastMovedDate, 365, true)) {
					openStatusClass = 'recently-moved';
				}

				return openStatusClass;
			}

			if (storeStatus !== null) {
				switch (storeStatus) {
					case 'U':
						storeStatusClass = 'coming-soon';
						break;
					case 'T':
						storeStatusClass = 'temporary-closed';
						break;
					case 'C':
						storeStatusClass = 'store-closed';
						break;
					case 'O':
						storeStatusClass = handleOpenStatusClass();
						break;
					default:
						break;
				}
			}
		}

		return storeStatusClass;
	};

	/* $scope.fetchCurrentLocationTimeOffset = function() {
		return new Promise(function(resolve, reject) {
			var timezoneAPIKey = document.getElementById('googleAPIKey').value;

			if ($scope.currentLocation) {
				$http.get('https://maps.googleapis.com/maps/api/timezone/json?location=' + $scope.currentLocation.lat() + ',' +
					$scope.currentLocation.lng() + '&timestamp=' + moment().unix() + '&key=' + timezoneAPIKey)
				.then(function(response) {
					if (response.data.status == 'OK') {
						$scope.currentTimeOffset = response.data.rawOffset / 60;
					}
				}, function(error) {
					$log.error(error);
				});
			}
		});
	}; */

	$scope.getStoreDoctorInfo = function(index) {
		return $http.get('/wcs/resources/store/' + $scope.params.storeId +  '/eappointment/' + $rootScope.stores[index].storeName + '/doctors');
	};

	$scope.getPracticeHours = function(index) {
		return $http.get($scope.params.doctorPracticeURL + $rootScope.stores[index].storeName);
	};
	
	/*$scope.isStoreOpen = function(store) {
		var googleAPIKey = document.getElementById('googleAPIKey').value;

		var now = moment();
		var dayIndex = now.isoWeekday() - 1;

		// Get current search location timezone
		if (!$scope.currentTimeOffset) {
			$http.get('https://maps.googleapis.com/maps/api/timezone/json?location=' + $scope.currentLocation.lat() + ',' +
				$scope.currentLocation.lng() + '&timestamp=' + now.unix() + '&key=' + googleAPIKey)
			.then(function(response) {
				if (response.data.status == 'OK') {
					$scope.currentTimeOffset = response.data.rawOffset / 60;
				}

				return $scope.checkStoreOpen(now,dayIndex, store);
			}, function(error) {
				$log.error(error);
				return false;
			});
		}

		return false;
	};*/

	$scope.checkStoreOpen = function(now, dayIndex, store) {
		now = now.utcOffset($scope.currentTimeOffset).format('HH:mm');

		if ((store.storeHours.length > 0) && store.storeHours[dayIndex]) {
			var open = moment(store.storeHours[dayIndex][0], 'hh:mm a').format('HH:mm');
			var close = moment(store.storeHours[dayIndex][1], 'hh:mm a').format('HH:mm');

			if ((now > open) && (now < close)) {												 
				return true;
			}
		}

		return false;
	};

	$scope.getClosingTime = function(store) {
		var dayIndex = moment().isoWeekday() - 1;

		var closingTime = '';

		if (store && (store.storeHours.length > 0) && store.storeHours[dayIndex]) {
			closingTime = store.storeHours[dayIndex][1];
		}

		return closingTime;
	};
	
	$scope.isEmpty = function(obj) {
		for(var key in obj) {
			if(obj.hasOwnProperty(key))
				return false;
		}
		return true;
	};
	
	$scope.getStoreAttributeDisplayValue= function(moreInfoStoreIndex, attrName){
		var selectedStore = $rootScope.stores[moreInfoStoreIndex];
		
		if ($scope.isEmpty(selectedStore)){
			return '';
		} else {
			return selectedStore.Attribute.find(a => a.name === attrName) ? selectedStore.Attribute.find(a => a.name === attrName).displayValue:'';
		}
	};
	
	$scope.parsePhoneNumber = function(phoneNumber) {
		var parsedPhoneNumber = '';

		if (phoneNumber) {
			parsedPhoneNumber = phoneNumber.replace('\(\)', '').replace(' ', '-');
		}

		return parsedPhoneNumber;
	};
	
	$scope.showMoreLocations = function(){
		$scope.offset = $scope.offset +  $scope.params.pageSize;
		$scope.seeMore = true;
		$scope.currentLocation = $scope.lastLocation;
		$scope.findStores();	
	}
	
	$scope.showStoreHours = function(store, dayIndex) {
		var dayHours = 'Closed';

		if (store && (store.storeHours.length > 0) && store.storeHours[dayIndex]) {
			var open = store.storeHours[dayIndex][0];
			var close = store.storeHours[dayIndex][1];

			if (open && close) {
				dayHours = open + ' - ' + close;
			}
		}

		return dayHours;
	};
	
    $scope.checkWeekHours = function(store) {
		if (store) {
			for (var dayIndex = 0; dayIndex < 5; dayIndex++) {
				if (!angular.equals($scope.showStoreHours(store, dayIndex), $scope.showStoreHours(store, dayIndex + 1))) {
					return true;
				}
			}
		}

		return false;
    };
    
    $scope.parseDoctorsLanguages = function(languages) {
    	if (languages !== null && languages !== ''){
    		return languages.toString().replace(/,/g, ', ');
    	}else{
    		return $scope.defaultLanguage;
    	}
    };
    
    $scope.setStoreDistance = function(store) {
    	sessionStorage.setItem('storeDistance', store.distance);
    };
    
    $scope.setEyeExamInCaliforniaIndex = function(index) {
    	$scope.eyeExamInCalifornia = index;	
    };
    
    $scope.setEyeExamInTexasOrOklahomaIndex = function(index) {
    	$scope.eyeExamInTexasOrOklahoma = index;	
    };
    
    $scope.EyeExamInCaliforniaRedirect = function() {
    	var californiaURL = document.getElementsByName('californiaURL')[0].value;
    	californiaURL = californiaURL.concat($scope.stores[$scope.eyeExamInCalifornia].storeName);
    	$window.open(californiaURL);	
    	$scope.setEyeExamInCaliforniaIndex(-1);
    };
    
    $scope.EyeExamInTexasRedirect = function() {
    	var texasURL = document.getElementsByName('texasURL')[0].value;
    	texasURL = texasURL.concat($scope.stores[$scope.eyeExamInTexasOrOklahoma].storeName);
    	$window.open(texasURL);	
    	$scope.setEyeExamInTexasOrOklahomaIndex(-1);
    };

    $scope.scrollToDoctorInfo = function(e){
		var selector = '#doctorID_' + e.doctorId;
		
		if($(selector).parent().parent().siblings().closest('.infoFocus').length ==0) {
			$('.more-info-container-mobile').animate({ scrollTop: $(selector).offset().top + 300 });
		}
    }

    $scope.decodeServices= function(servicies){
    	var decodedServices=servicies;
    	for(service in servicies){
			var tempArea= document.createElement('textarea');
			tempArea.innerHTML = servicies[service].serviceName;
			decodedServices[service].serviceName = tempArea.value;
    	}
    	return decodedServices;
    }

    $scope.getWrongCountryUrl= function(fromCA){
    	var currUrl = window.location.href;
    	var errorText = '';
    	if (!fromCA){
    		currUrl = window.location.href.substring(0,window.location.href.indexOf('lc-us'));
			currUrl = currUrl.concat('en-ca/eye-exam').replace('.com', '.ca');
			errorText= 'Did you mean to go to <a href="'+currUrl+'">LensCrafters.ca</a>?'
    	}else{
    		currUrl = window.location.href.substring(0,window.location.href.indexOf('en-ca'));
			currUrl = currUrl.concat('lc-us/eye-exam').replace('.ca', '.com');
			errorText= 'Did you mean to go to <a href="'+currUrl+'">LensCrafters.com</a>?';
    	}

    	return errorText;
	}
	
	$scope.submitCurrentForm = function() {
		var currentForm = null;

		if ($rootScope.currentStep == 1) {
			currentForm = angular.element(document.getElementsByName('storeSearchForm')[0]);
		} else if ($rootScope.currentStep == 2) {
			currentForm = angular.element(document.getElementsByName('storeResultsSearchForm')[0]);
		}

		if (currentForm !== null) {
			$timeout(function() {
				currentForm.triggerHandler('submit');
			});
		}
	};

	$scope.setScrollLock = function(lock) {
		if ($scope.params.isMobile) {
			var htmlBodyElems = angular.element(document.querySelectorAll('html, body'));

			if (lock) {
				htmlBodyElems.css({'overflow': 'hidden', 'position': 'fixed', 'width': '100%', 'height': '100%'});
			} else {
				htmlBodyElems.css({'overflow': '', 'position': '', 'width': '', 'height': ''});
			} 
		}
	};
}]);
;
app.controller('FormComponentsController', ['$scope', '$rootScope',
	function ($scope, $rootScope) {

}]);
;
app.controller('InsuranceStepsCtrl', ['$scope', '$rootScope', '$cookies', '$log', 'lcInsurance',
	function ($scope, $rootScope, $cookies, $log, lcInsurance) {

		// URLs objects
        /* var riaURL = {
            login: "/webapp/wcs/stores/jsonpInsuranceAjax.jsp"
        } */

        /**
         * Pages
         * 
         * 1: login information
         * 2: loader
         * 3: login error
         * 4: login successful 
         * 5: too many retries
         * 
         * Sync modes
         * 
         * 1: personal information
         * 2: plan information
         */

		//init navigation
		$rootScope.insuranceStep = 1;
		$rootScope.insuranceLoginMod = 1;
		
		$rootScope.documentMinSwipeX = 10;
		$rootScope.documentSwipeRange = 100;
		$rootScope.selectedInsurancesProvider = undefined;
		$rootScope.isUnselected = false;
		$scope.isPresent=false;
		$scope.loginData = {
			firstname:"",
			lastname:"",
			dob:"",
			zipcode:"",
			memberid:"",
			planid:"",
			certifyage: false,
		}
		
		if(window.screen.width <= 1024){
			$rootScope.documentMinSwipeX = 200;
			$rootScope.documentSwipeRange = 0;
		}


		$rootScope.eligibility = {};
		
		// Insurance loading
		$rootScope.isLoadingInsurance = false;

		// when panel is open block scroll on the body
		$rootScope.onSidebarOpen = function() {
			document.body.classList.add('hidden-overflow');
			document.querySelector("html").classList.add("hidden-overflow")
		}
		// when panel is closed enable scroll on the body
		$rootScope.onSidebarClose = function() {
			document.body.classList.remove('hidden-overflow')
			document.querySelector("html").classList.remove("hidden-overflow")
		}

		if (lcInsurance.isLogged()) {
			updateEligibility();
			$rootScope.insuranceStep = 4;
		}

		$scope.validateInsuranceForm = function () {
			
			if ($rootScope.insuranceStep = 1) {
				return false;
			} else if ($rootScope.insuranceStep = 2) {
				if (insuranceLoginForm.planid.value != '' && insuranceLoginForm.memberid.value != ''
					&& insuranceLoginForm.planid.$valid && insuranceLoginForm.memberid.$valid){
					return true;
				} else {
					obj = {
					    'id' : 'Insurance-Tentative', 
					    'Events_InsuranceTentative' : '1',
					    'Order_InsuranceCode' : $scope.$ctrl.insuranceProviders[$rootScope.selectedInsurancesProvider],
					    'Order_InsuranceMethod': insuranceMethod,
					    'Error_Source' : 'User', 
					    'Error_Code' : 'Insurance - Invalid form',
					    'Error_Message' : 'Invalid form'
					}
					tealium_data2track.push(obj);
				}
			}
		}

		function personalFormFilled() {
			var data = $scope.loginData;
			return (!!data.firstname && !!data.lastname && !!data.dob && !!data.zipcode && !!$rootScope.selectedInsurancesProvider);
		}
		
		function planFormFilled() {
			var data = $scope.loginData;
			return (!!data.memberid && !!data.planid);
		}

		function updateEligibility() {
			$rootScope.eligibility.frames = lcInsurance.checkSingleBenefit(lcInsurance.getBenefitCategories().FRAMES) || lcInsurance.checkSingleBenefit(lcInsurance.getBenefitCategories().FRAMES_ADD);
			$rootScope.eligibility.lenses = lcInsurance.checkSingleBenefit(lcInsurance.getBenefitCategories().LENSES) || lcInsurance.checkSingleBenefit(lcInsurance.getBenefitCategories().LENSES_ADD);
			$rootScope.eligibility.contacts = lcInsurance.checkSingleBenefit(lcInsurance.getBenefitCategories().CONTACT_LENSES);
			$rootScope.eligibility.exams = lcInsurance.checkSingleBenefit(lcInsurance.getBenefitCategories().EXAMS);
		}

		$scope.personalFormRequired = function() {
			return !planFormFilled();
		}

		$scope.planFormRequired = function() {
			return !personalFormFilled();
		}
		
		//ria calls
		$scope.submitInsuranceLogin = function (insuranceLoginFormController) {
			$log.info('Submit login');

			$rootScope.isLoadingInsurance = true;

			//touch all invalid elements within the form
			if (insuranceLoginFormController && insuranceLoginFormController.$invalid) {
				$log.warn('insuranceLoginForm not valid', insuranceLoginFormController)
				
				$rootScope.isLoadingInsurance = false;

				angular.forEach(insuranceLoginFormController.$error, function (field) {
					angular.forEach(field, function(errorField){
						errorField.$setTouched();
					})
				});
			}

			//update selectize
			$rootScope.isUnselected = !$rootScope.selectedInsurancesProvider ? true : false;

			if ($scope.loginData.certifyage && ( personalFormFilled() || planFormFilled() )) {
				$rootScope.insuranceStep = 2;
				var infoForm = planFormFilled() ? 'plan' : 'personal';

				var data = {
					planID: insuranceLoginForm.planid ? insuranceLoginForm.planid.value : null,
					memberID: insuranceLoginForm.memberid ? insuranceLoginForm.memberid.value : null,
					firstName: insuranceLoginForm.firstname.value,
					lastName: insuranceLoginForm.lastname.value,
					birth_month: insuranceLoginForm.dob.value.substring(0, 2),
					birth_date: insuranceLoginForm.dob.value.substring(3, 5),
					birth_year: insuranceLoginForm.dob.value.substring(6),
					zip: insuranceLoginForm.zipcode.value,
					infoForm: infoForm,
					provider: $rootScope.selectedInsurancesProvider ? $scope.$ctrl.insuranceProviders[$rootScope.selectedInsurancesProvider].value : 'EYEMED',
					storeId: 10851
				};

				if (data.provider === 'AETNA') {
					data.infoForm = null;
				}

				if (data.provider === 'UHC') {
					// UHC has only personal form
					data.infoForm = 'personal';
				}

				$log.info('Insurance login call');

				lcInsurance.login(data)
					.then(
						function (response) {
							$rootScope.isLoadingInsurance = false;
							
							updateEligibility();

							constants.ajaxParams['insuranceCheckEligibility'] = true;

							$rootScope.insuranceStep = 4;
							
							//Insurance tracking analytics
							var benefits = '';
							var insuranceMethod = '';
							
							if ($rootScope.eligibility.frames) {
								benefits = benefits + "frames";
							}

							if ($rootScope.eligibility.lenses) {
								if (benefits != "") {
									benefits = benefits + ",";
								}

								benefits = benefits + "lenses";
							}

							if ($rootScope.eligibility.contacts) {
								if (benefits != "") {
									benefits = benefits + ",";
								}

								benefits = benefits + "contact";
							}

							if ($rootScope.eligibility.exams) {
								if (benefits != "") {
									benefits = benefits + ",";
								}

								benefits = benefits + "eye exam";
							}
							
							if ($rootScope.insuranceLoginMod == 1) {
								insuranceMethod = "standard";
							} else {
								insuranceMethod = "memberid";
							}
							
							//[RONA-5513][LCDP-12153]: Removed firing event "Insurance Applied" if already applied
							if(!sessionStorage.getItem("InsuranceMethod")){
								sessionStorage.setItem("InsuranceMethod", insuranceMethod);
							
								obj = {
									'id' : 'Insurance-Applied',
									'Events_InsuranceApplied' : '1',
									'Order_InsuranceCode' : data.provider,
									'Order_InsuranceMethod': insuranceMethod,
									'Order_InsuranceBenefits' : benefits
								}
							
								window.turnInsuranceOn();
								tealium_data2track.push(obj);
							}
						},
						function (error) {
							$rootScope.isLoadingInsurance = false;

							var errorCode;

							if (error == lcInsurance.getErrors().INSURANCE_TENTATIVE_LIMIT_REACHED) {
								errorCode = 'Insurance - Insurance account locked';
								try {
									var _dlCopy = $.extend(true, {}, null);
									_dlCopy.site_events = {
										"insurance_account_locked": "true",
										"insurance_sync_failure": "true"
									};

									if ($rootScope.insuranceLoginMod == 1) {
										_dlCopy.sync_method = "personal information";
										_dlCopy.zip_code = $scope.loginData.zipcode;
									} else {
										_dlCopy.sync_method = "insurance information";
									}
									callTrackAnalytics(_dlCopy);
								} catch (err) {
									$log.error(err);
								}
								$rootScope.insuranceStep = 5;
							} else {
								errorCode = 'Insurance - User entered wrong data';
								try {
									var _dlCopy = $.extend(true, {}, null);
									_dlCopy.site_events = {
										"insurance_sync_failure": "true"
									};
									_dlCopy.failure_try_count = $cookies.get('tentative_user');
									_dlCopy.failure_reason = "user entered wrong data";

									if ($rootScope.insuranceLoginMod == 1) {
										_dlCopy.sync_method = "personal information";
										_dlCopy.zip_code = $scope.loginData.zipcode;
									} else {
										_dlCopy.sync_method = "insurance information";
									}
									var orderInsuranceCode = "Unknown";
									if($scope.$ctrl.insuranceProviders[$rootScope.selectedInsurancesProvider].value){
										orderInsuranceCode = $scope.$ctrl.insuranceProviders[$rootScope.selectedInsurancesProvider].value;
									}

									var insuranceMethod = "Standard form";
									if($rootScope.insuranceStep == 3){
										insuranceMethod = "MemberId form";
									}
									var insuranceTentative = 4 - $cookies.get('tentative_user');
									callTrackAnalytics(_dlCopy);
									obj = {
										id: 'Error',
										Events_Error: "1",
										Error_Source: "User",
										Error_Code: "Insurance",
										Error_Message: 'Cannot find user profile ',
										Error_Details: 'Cannot find user profile ',
										Order_InsuranceCode : orderInsuranceCode,
										Events_InsuranceTentative : 3 - $cookies.get('tentative_user'),
										Order_InsuranceMethod : insuranceMethod
									}
									tealium_data2track.push(obj);
								} catch (err) {
									$log.error(err);
								}
								$rootScope.insuranceStep = 3;
								$rootScope.insuranceLoginMod = 2;

								// scroll down to member/group id inputs
								setTimeout( function () {
									document.querySelector(".login-data-title").scrollIntoView({behavior: "smooth", block:"center"});
								}, 1000);

								//set date for the calendar in the step 3
								//$scope.dateSet = new Date($scope.loginData.dob);
							}

							constants.ajaxParams['insuranceCheckEligibility'] = false;

							obj = {
								'id' : 'Insurance-Tentative', 
								'Events_InsuranceTentative' : '1',
								'Order_InsuranceCode' : data.provider,
								'Order_InsuranceMethod': insuranceMethod,
								'Error_Source' : 'User', 
								'Error_Code' : errorCode,
								'Error_Message' : 'We\'re having trouble finding you.'
							}
							
							tealium_data2track.push(obj);
						}
				);
			} else {
				$rootScope.isLoadingInsurance = false;

				$log.warn('Invalid form');
				
				if ($rootScope.insuranceLoginMod == 2) {
					insuranceLoginForm.certifyage.focus();
					insuranceLoginForm.planid.focus();
					insuranceLoginForm.memberid.focus();
					insuranceLoginForm.submitplaninfobutton.focus();
				} else if ($rootScope.insuranceLoginMod == 1) {
					insuranceLoginForm.certifyage.focus();
					insuranceLoginForm.firstname.focus();
					insuranceLoginForm.lastname.focus();
					insuranceLoginForm.dob.focus();
					insuranceLoginForm.zipcode.focus();
					insuranceLoginForm.submitplaninfobutton.focus();
				}
			}
		}

		$scope.trySyncAgain = function (mode) {
			if (mode == undefined) {
				$rootScope.insuranceStep = 1;
			} else if (mode == 'plan-mode') {
				$rootScope.insuranceLoginMod = 2;
				$rootScope.insuranceStep = 1;
			} else if (mode == 'personal-mode'){
				$rootScope.insuranceLoginMod = 1;
				$rootScope.insuranceStep = 1;
			}
		}

		$scope.logoutInsurance = function () {
			if (lcInsurance.logout()) {
				$rootScope.insuranceStep = 3;
			}
		}

		$scope.openChat = function () {
			document.getElementsByClassName('close-ins')[0].click();
			_genesys.widgets.bus.command('WebChat.open');
		}
		
		$rootScope.closeMobileInsuranceSidebar = function () {
			if (RiaHelper.isInsuranceOn()) {
				if (document.getElementsByClassName('pdp-container').length == 0){
					chooseInsurance(true);
				}else if (document.getElementById('rxcApp').children.length==0){
					document.getElementById('insurance-switch').click()
				}
			}
		};

		$scope.singleConfig = {
			openOnFocus: true,
			valueField: 'key',
			maxItems: 1,
			onChange: function(value) {
				$scope.selectizeIsFocused = false;
				$rootScope.selectedInsurancesProvider = value;
				$rootScope.isUnselected = value === "" ? true : false;
				
				if($scope.$ctrl.insuranceProviders[$rootScope.selectedInsurancesProvider] && !$scope.$ctrl.insuranceProviders[$rootScope.selectedInsurancesProvider].network && $scope.oldSelectizeIsFocused != $rootScope.selectedInsurancesProvider){
					obj = {
					    'id' : 'Error', 
					    'Error_Source' : 'User', 
					    'Error_Code' : 'Insurance',
					    'Error_Message' : 'Out-of-network plan'
					}
					tealium_data2track.push(obj);
				}
				
				$scope.oldSelectizeIsFocused = $rootScope.selectedInsurancesProvider;
			},
			onDropdownOpen: function() {
				$scope.$apply(function() { $scope.selectizeIsFocused = true; });
			},
			onDropdownClose: function() {
				$scope.$apply(function() { $scope.selectizeIsFocused = false; });
			},
			plugins: {
				'no_results': {},
				'clear_button': {
					className: "selectize-clear-button",
					label: '<svg class="icon close"><use xlink:href="#clear-input"></use></svg>',
				},
				'input_label': {
					label: "Insurance provider"
				}
			},
		}

		// insuranceProviders is defined in espot X_Insurance_Providers
		// wait for insuranceProviders to be defined
		var unregister = $scope.$watch(function() {
			return window.insuranceProviders;
		}, function(value) {
			if(typeof value !== "undefined"){
				$rootScope.defaultLink  = window.defaultLink;
				$rootScope.insuranceProviders = window.insuranceProviders;
				unregister();

				favoriteProviders = ["EyeMed", "Aetna", "Humana Vision", "UnitedHealthcare Vision (UHC)", "Cigna"]

				$rootScope.favoriteProviders = Object.values($rootScope.insuranceProviders)
					.filter(v => favoriteProviders.indexOf(v.text) != -1)
					.reduce((m, p) => {
						m[p.text] = p.key
						return m
					}, {})
			}
		});

		// Angular Date Picker Initialization
        $scope.maxDate =new Date();
		$scope.dateSet = undefined;
        $scope.dobDatePickerToggle = false;
        $scope.dobDatePickerToggleFn = function(value = null){
			if(value === null) {
				$scope.dobDatePickerToggle = !$scope.dobDatePickerToggle;
			} else {
				$scope.dobDatePickerToggle = value;
			}
        }

		$scope.isUHCProviderSelected = function() {
			var isUHC = false;
			
			if ($scope.$ctrl.insuranceProviders && $rootScope.selectedInsurancesProvider && //
					$scope.$ctrl.insuranceProviders[$rootScope.selectedInsurancesProvider] && //
					$scope.$ctrl.insuranceProviders[$rootScope.selectedInsurancesProvider].value === 'UHC') {
				isUHC = true;
			}
			
			return isUHC;
		};
	}
]);

//direttiva per verificare il formato della data di nascita
app.directive('dobValidation', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attr, mCtrl) {
        	element.on('keydown', function (e) {
        		    var key = e.keyCode;
					if (this.value.length >10) {
						//e.preventDefault(); //no nothing
						this.value = this.value.substr(0, 10);
					}else if(this.value.length == 10){
						if((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)){
							//e.preventDefault(); //no nothing
						}
					}
			});

            function myValidation(value) {
                var myDate = new Date(value);
                var currDate = new Date();
                if (value.length == 10 && myDate.toString() != "Invalid Date" && myDate < currDate) {
                    mCtrl.$setValidity('dob', true);
					scope.dobDatePickerToggleFn(false);
                    // scope.dobDatePickerToggle = false;
                } else {
                    mCtrl.$setValidity('dob', false);
                     if (value.length > 10){
                     	value=value.substr(0,10);
                     }
                }
                return value;
            }
            mCtrl.$parsers.push(myValidation);
        }
    };
});
;
app.controller('MyPaymentMethodsController', ['$scope', '$rootScope', '$http', '$window', '$cookies', '$log', '$timeout', 'moment',
	function ($scope, $rootScope, $http, $window, $cookies, $log, $timeout, moment) {
	$scope.params = {};
	$scope.hovering = false;
	$scope.showAddPayment = false;
	$scope.ccinfo = {};
	$scope.invalidCard = false;
	$scope.index = 0;
	$scope.paymentLoaded = false;
	
	$rootScope.paymentMethods = [];
	$rootScope.defaultPaymentMethod;
	$rootScope.expiredCard = false;
	$rootScope.addingPayment = false;
	$rootScope.removingPayment = false;
	
	
	$scope.init = function(params) {
		$scope.params = angular.copy(params);
		$scope.loadPaymentMethods();
	};
	
	$scope.loadPaymentMethods = function() {
		$http.get('/wcs/resources/store/' + $scope.params.storeId + '/mypayments/list/').then(function(response){
			if (response.data.payments != undefined) {
				$rootScope.paymentMethods = response.data.payments;
				$rootScope.defaultPaymentMethod = response.data.defaultPayment;
				$scope.paymentLoaded = true;
			}
		}, function(error) {
			$log.error('Unable to load payment methods:' + error);
		});
	};
	
	$scope.addCard = function(validCard) {
		if(validCard && !$rootScope.expiredCard){
			$rootScope.addingPayment = true;
			var cc = $scope.ccinfo.number;
			if (cc != undefined){
				cc = cc.replace(/\s/g, '');
			}
			var expirationMonth = $scope.ccinfo.expiration.substring(0, 2);
			var expirationYear = $scope.ccinfo.expiration.substring(3, 7);
			var ccBrand = $scope.cardBrand(cc);
			
			if (ccBrand != undefined && ccBrand != null && ccBrand != ''){
				var data = {
					"billTo_city":$scope.ccinfo.city,
					"billTo_country":$scope.ccinfo.country,
					"billTo_email":$scope.ccinfo.email,
					"billTo_firstName":$scope.ccinfo.firstname,
					"billTo_lastName":$scope.ccinfo.lastname,
					"billTo_postalCode":$scope.ccinfo.zip,
					"billTo_state":$scope.ccinfo.state,
					"billTo_street1":$scope.ccinfo.address,
					"card_accountNumber": cc,
					"card_cardType":ccBrand,
					"card_expirationMonth":expirationMonth,
					"card_expirationYear":expirationYear,
					"cc_cvc":$scope.ccinfo.securityCode,
					"recaptchaResponse": $scope.recaptchaResponse
	            };
				
				
				$http.put('/wcs/resources/store/' + $scope.params.storeId + '/mypayments', data).then(function(response){
					if(response.status == '200' && response.data.ccAuthReply_reasonCode == '100'){
						$rootScope.addingPayment = false;
						
						$scope.loadPaymentMethods();
						$scope.closePaymentModal();
						$log.info('Payment method added');
					}else{
						$log.info('Payment method error');
						$scope.invalidCard = true;
						$rootScope.addingPayment = false;
						$scope.checkCybersourceError(response.data.invalidField_0);
						
					}
				}, function(error) {
					$log.error('Unable to add the payment method:' + error);
					$scope.invalidCard = true;
					$rootScope.addingPayment = false;
				});	
			} else {
				$log.info('Payment method error');
				$scope.paymentForm.cardNumber.$setValidity("brand", false);
				$rootScope.addingPayment = false;
			}
		} else if (!validCard){
			$log.info('Payment method error');
			$rootScope.addingPayment = false;
		}
	};
	
	$scope.cardBrand = function(cardNum) {
		var visa = /^4[0-9]{12}(?:[0-9]{3})?$/;
		var mastercard = /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/;
		var amex = /^3[47][0-9]{13}$/;
		var discover = /^(?:6011\d{12})|(?:65\d{14})$/;
		var JCB = /^(?:2131|1800|35[0-9]{3})[0-9]{11}$/;
		
		var cardBrand;
		
		if (visa.test(cardNum)) {
			if($scope.params.visaEnabled){
				cardBrand = 'Visa';
			}
		}else if (mastercard.test(cardNum)) {
			if($scope.params.mastercardEnabled){
				cardBrand = 'Master Card';
			}
		}else if (amex.test(cardNum)) {
			if($scope.params.amexEnabled){
				cardBrand = 'Amex';
			}
		}else if (discover.test(cardNum)) {
			if($scope.params.discoverEnabled){
				cardBrand = 'Discover';
			}
		}else if (JCB.test(cardNum)) {
			if($scope.params.jcbEnabled){
				cardBrand = 'JCB';
			}
		}
		
		return cardBrand;
	};
	
	$scope.removeCard = function(index) {
		if($rootScope.removingPayment == false){
			$rootScope.removingPayment = true;
			if (index == $rootScope.defaultPaymentMethod){
				$scope.setDefault(0);
			}
			$http.delete('/wcs/resources/store/' + $scope.params.storeId + '/mypayments/' + index).then(function(response){
				if (response.data.response.decision == 'ACCEPT') {
					$scope.loadPaymentMethods();
					$log.info('Payment method removed');
					$rootScope.removingPayment = false;
				}else{
					$log.warn('Unable to remove the payment method');
					$rootScope.removingPayment = false;
				}
			}, function(error) {
				$log.error('Unable to remove the payment method:' + error);
				$rootScope.removingPayment = false;
			});
		}
	};
	
	$scope.setDefault = function(index) {
		$http.post('/wcs/resources/store/' + $scope.params.storeId + '/mypayments/setdefault/' + index).then(function(response){
			if(response.status == '200'){
				$scope.loadPaymentMethods();
				$log.info('Default payment updated');
			}else{
				$log.warn('Unable to update the default payment method');
			}
		}, function(error) {
			$log.error('Unable to update the default payment method:' + error);
		});
	};
	
	$scope.isExpiredCard = function(expiration) {
		var patt = /^(0\d|1[0-2])\/\d{4}$/;
		
		if (!patt.test(expiration)){
			$rootScope.expiredCard = true;
		}else{
			var expirationMonth = expiration.substring(0, 2);
			var expirationYear = expiration.substring(3, 7);
			
			var currentDate = new Date();
			var currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
			var currentYear = currentDate.getFullYear().toString();
			
			if(expirationYear > currentYear){
				$rootScope.expiredCard = false;
			}else{
				if(expirationYear == currentYear && expirationMonth >= currentMonth){
					$rootScope.expiredCard = false;
				} else{
					$rootScope.expiredCard = true;
				}
			}
		}
	};

	$scope.closePaymentModal = function() {
		if($rootScope.addingPayment == false){
			$scope.invalidCard=false;
			$scope.resetForm();
		}
	};

	$scope.formatCardNumber = function(event, creditCard) {
		if (creditCard != undefined){
			var blocks;
			if(event != undefined && event.keyCode != undefined && ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105)) ){
				if(creditCard.length < 19) {
					blocks = creditCard.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ');
					$scope.ccinfo.number = blocks;
				}else{
					blocks = creditCard.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ');
					$scope.ccinfo.number = blocks.substring(0, 19);
				}
			}else if(event.keyCode != 8) {
				blocks = creditCard.replace(/\D/g,'');
				$scope.ccinfo.number = blocks.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ');
			}
		}
	};
	
	$scope.formatExpiration = function(event, expiration) {
		if(expiration != undefined){
			var blocks;
			if(event != undefined && event.keyCode != undefined && ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105)) ){
				if(expiration.length == 2){
					blocks = expiration.concat('/');
					$scope.ccinfo.expiration = blocks;
				}
			}else if(event.keyCode == 8) {
				$scope.ccinfo.expiration = '';
			}else{
				blocks = expiration.replace(/\D/g,'');
				if(blocks.length > 1){
					blocks = [blocks.slice(0, 2), '/', blocks.slice(2)].join('');
				}
				$scope.ccinfo.expiration = blocks;
			}
		}
	};
	
	$scope.formatCVV = function(CVV) {
		if(CVV != undefined){
			$scope.ccinfo.securityCode = CVV.replace(/\D/g,'');
		}
	};
	
	$scope.formatZIP = function(ZIP) {
		if (ZIP != undefined){
			$scope.ccinfo.zip = ZIP.replace(/\D/g,'');
		}
	};
	
	$scope.resetForm = function() {
	  $scope.showAddPayment = false;
	  $scope.paymentForm.submitAttempt = false;
	  $scope.ccinfo = {};
	  $scope.ccinfo.firstname = null;
	  $scope.ccinfo.lastname = null;
	  $scope.ccinfo.number = null;
	  $scope.ccinfo.expiration = null;
	  $scope.ccinfo.securityCode = null;
	  $scope.ccinfo.email = null;
	  $scope.ccinfo.country = null;
	  $scope.ccinfo.state = null;
	  $scope.ccinfo.zip = null;
	  $scope.ccinfo.city = null;
	  $scope.ccinfo.address = null;
	  $scope.paymentForm.$setPristine();
	}
	
	$scope.checkCybersourceError = function(error) {
		switch (error) {
		  case 'billTo_city':
			  $scope.paymentForm.$setValidity("cybersource", false);
	          $scope.paymentForm.city.$setValidity("cybersource", false);
			  break;
		  case 'billTo_country':
			  $scope.paymentForm.$setValidity("cybersource", false);
	          $scope.paymentForm.country.$setValidity("cybersource", false);
			  break;
		  case 'billTo_email':
			  $scope.paymentForm.$setValidity("cybersource", false);
	          $scope.paymentForm.email.$setValidity("cybersource", false);
			  break;
		  case 'billTo_firstName':
			  $scope.paymentForm.$setValidity("cybersource", false);
	          $scope.paymentForm.firstname.$setValidity("cybersource", false);
			  break;
		  case 'billTo_lastName':
			  $scope.paymentForm.$setValidity("cybersource", false);
	          $scope.paymentForm.lastname.$setValidity("cybersource", false);
			  break;
		  case 'billTo_postalCode':
			  $scope.paymentForm.$setValidity("cybersource", false);
	          $scope.paymentForm.zip.$setValidity("cybersource", false);
			  break;
		  case 'billTo_state':
			  $scope.paymentForm.$setValidity("cybersource", false);
	          $scope.paymentForm.state.$setValidity("cybersource", false);
			  break;
		  case 'billTo_street1':
			  $scope.paymentForm.$setValidity("cybersource", false);
	          $scope.paymentForm.address.$setValidity("cybersource", false);
			  break;
		  case 'card_accountNumber':
			  $scope.paymentForm.$setValidity("cybersource", false);
	          $scope.paymentForm.cardNumber.$setValidity("cybersource", false);
			  break;
		  case 'card_cardType':
			  $scope.paymentForm.$setValidity("cybersource", false);
	          $scope.paymentForm.cardNumber.$setValidity("cybersource", false);
			  break;
		  case 'card_expirationMonth':
			  $scope.paymentForm.$setValidity("cybersource", false);
	          $scope.paymentForm.expiration.$setValidity("cybersource", false);
			  break;
		  case 'card_expirationYear':
			  $scope.paymentForm.$setValidity("cybersource", false);
	          $scope.paymentForm.expiration.$setValidity("cybersource", false);
			  break;
		  case 'cc_cvc':
			  $scope.paymentForm.$setValidity("cybersource", false);
	          $scope.paymentForm.securityCode.$setValidity("cybersource", false);
			  break;
		  default:
			  $scope.paymentForm.$setValidity("cybersource", false);
          	  $scope.paymentForm.cardNumber.$setValidity("cybersource", false);
          	  break;
		}
	};
	
	$scope.clearCybersourceError = function(field) {
		switch (field) {
		case 'city':
			$scope.paymentForm.$setValidity("cybersource", true);
			$scope.paymentForm.city.$setValidity("cybersource", true);
			break;
		case 'country':
			$scope.paymentForm.$setValidity("cybersource", true);
			$scope.paymentForm.country.$setValidity("cybersource", true);
			break;
		case 'email':
			$scope.paymentForm.$setValidity("cybersource", true);
			$scope.paymentForm.email.$setValidity("cybersource", true);
			break;
		case 'firstName':
			$scope.paymentForm.$setValidity("cybersource", true);
			$scope.paymentForm.firstname.$setValidity("cybersource", true);
			break;
		case 'lastName':
			$scope.paymentForm.$setValidity("cybersource", true);
			$scope.paymentForm.lastname.$setValidity("cybersource", true);
			break;
		case 'zip':
			$scope.paymentForm.$setValidity("cybersource", true);
			$scope.paymentForm.zip.$setValidity("cybersource", true);
			break;
		case 'state':
			$scope.paymentForm.$setValidity("cybersource", true);
			$scope.paymentForm.state.$setValidity("cybersource", true);
			break;
		case 'address':
			$scope.paymentForm.$setValidity("cybersource", true);
			$scope.paymentForm.address.$setValidity("cybersource", true);
			break;
		case 'cardNumber':
			$scope.paymentForm.$setValidity("cybersource", true);
			$scope.paymentForm.cardNumber.$setValidity("cybersource", true);
			$scope.paymentForm.cardNumber.$setValidity("brand", true);
			break;
		case 'expiration':
			$scope.paymentForm.$setValidity("cybersource", true);
			$scope.paymentForm.expiration.$setValidity("cybersource", true);
			break;
		case 'cc_cvc':
			$scope.paymentForm.$setValidity("cybersource", true);
			$scope.paymentForm.securityCode.$setValidity("cybersource", true);
			break;
		default:
			break;
		}
	};
	
}]);
;
app.controller('PrescriptionPageController', ['$scope', '$rootScope', '$http', '$window', '$cookies', '$log', '$timeout', '$filter', 'moment', '$anchorScroll',
    function($scope, $rootScope, $http, $window, $cookies, $log, $timeout, $filter, moment,$anchorScroll) {

        // global variables by default
        $scope.params = {
            storeId: '',
            userId: 0,
            langId: '',
            catalogId: '',
            framesImageURL: '',
            contactsImageURL: '',
            orderId: '',
            nextStepUrl: ''
        };

        $scope.states = [];

        // errors global 
        $scope.errors = {
            'missingPrescriptionData': {
                'msg': 'You need to choose a submission method',
                'value': false
            },
            'missingDoctorData': {
                'msg': 'You need to choose a doctor',
                'value': false
            },
            'invalidPatientForm': {
                'msg': 'You need to add the missing information',
                'value': false
            },
            'uploadError': {
                'value': false
            },
            'uploadNoFileUploadedError': {
                'msg': 'You need to upload your prescription',
                'value': false
            },
            'uploadFileSizeError': {
                'msg': 'FILE IS TOO BIG',
                'subMsg': 'Your file size is too big. Maximum upload 10 MB'
            },
            'uploadFileFormatError': {
                'msg': 'Incorrect file type',
                'subMsg': 'We accept: pdf/png/gif/jpeg/tiff/doc/docx/bmp/pages'
            },
            'uploadFileError': {
                'msg': 'Oops! Something went wrong.',
                'subMsg': 'Please try again.'
            },
            'invalidAddDoctorForm': {
                'msg': 'Oops! You need to add the missing information',
                'value': false
            },
            'submitPrescriptionError': {
                'msg': 'Oops! Something went wrong. Please try again.',
                'value': false
            }
        };
        
        //common utils params
        $scope.maxSize = 10485760; //10 MB

        $scope.allowedContentTypes = [
            'image/png',
            'image/gif',
            'image/jpeg',
            'image/tiff',
            'image/bmp',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx files
            'application/pdf',
            'application/x-iwork-pages-sffpages' // Apple iWork Pages
        ];

        $scope.allowedPreviewContentTypes = [
            'image/png',
            'image/gif',
            'image/jpeg',
            'image/jpg',
            'image/bmp'
        ];

        $scope.isRedirecting = false;
        $scope.currentItemId = 0;
        $scope.setupItemsLength = 0;
        $scope.setupFrames = 0;
        $scope.setupContact = 0;

        $scope.loadingDoctors = false;
        $scope.doctors = [];
        $scope.searchTentative = 0;

        $scope.prevChosenDoctor = {}; //used to save doctors data in case of edit mode

        $scope.allPrescriptionProvided = false;

        $scope.firstItemPrescriptionFrame = 0; //frame itemId prima prescrizione inserita; utile per copyPrescription
        $scope.firstItemPrescriptionContact = 0; //contact itemId prima prescrizione inserita; utile per copyPrescription

        $scope.items = {}; //items with no prescription submitted

        $scope.pupillaryDistance = false;

        $scope.fileEditMode = false;

        $scope.showPrescription = false;
        $scope.backdropPrescriptionPreviewOn = false;
        $scope.showPrism = true;
        $scope.isPrescriptionDetailsModalOpen = false;
        $scope.prescriptionValueModal = {};
        $scope.prescriptionClicked = -1;

        $scope.prescriptionSaved = [];

        $scope.showPrescriptionSaved = function() {
            $scope.showPrescription = true;
        }
        
        $scope.clickPrescription = function(prescriptionId) {
        	$scope.prescriptionClicked = prescriptionId;
        	$scope.items[$scope.currentItemId].prescriptionProvided = true;
        }
        
        $scope.getFormattedDate = function(date) {
        	if(date !== null) {
    	    let dateFormat = new Date(Date.parse(date))
    	    let year = dateFormat.getFullYear();
    	    let month = (1 + dateFormat.getMonth()).toString().padStart(2, '0');
    	    let day = dateFormat.getDate().toString().padStart(2, '0');
    	  
    	    return month + '/' + day + '/' + year;
    	  } else {
    	    return '';
    	  }
        }
        
        $scope.isToday = function(date) {
    	  if(date !== null) {
    	    const today = new Date();
    	    let dateFormat = new Date(Date.parse(date))

    	    if (today.toDateString() === dateFormat.toDateString()) {
    	      return true;
    	    }  
    	  }

    	  return false;
    	}

    	$scope.isYesterday = function(date) {
    	  if (date !== null) {
    	    const yesterday = new Date();
    	    yesterday.setDate(yesterday.getDate() - 1);
    	    let dateFormat = new Date(Date.parse(date))

    	    if (yesterday.toDateString() === dateFormat.toDateString()) {
    	      return true;
    	    }
    	  }

    	  return false;
    	}
    	
    	$scope.isOneHourAgo = function(date) {
      	  if (date !== null) {
      	    const oneHourAgo = new Date();
      	    oneHourAgo.setHours(oneHourAgo.getHours() - 1);
      	    let dateFormat = new Date(Date.parse(date))

      	    if (oneHourAgo < dateFormat) {
      	      return true;
      	    }
      	  }

      	  return false;
      	}
    	
    	$scope.oneYearAgo = function(date) {
      	  if(date !== null) {
      	    const oneYearAgo = new Date();
      	    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
      	    let dateFormat = new Date(Date.parse(date))

      	    if (oneYearAgo > dateFormat) {
      	      return true;
      	    }  
      	  }

      	  return false;
      	}
        
        $scope.hidePrescriptionSaved = function() {
            $scope.showPrescription = false;
            $scope.prescriptionClicked = -1;
        }
        
        $scope.showPrescriptionClicked = function(prescription) {
            $scope.isPrescriptionDetailsModalOpen = true;
            $scope.backdropPrescriptionPreviewOn = true;
            $scope.prescriptionValueModal = {
            	rightSphere: prescription.rightSphere,
            	leftSphere: prescription.leftSphere,
            	rightCyl: prescription.rightCyl,
            	leftCyl: prescription.leftCyl,
            	rightAxis: prescription.rightAxis === null ? '-' : prescription.rightAxis,
            	leftAxis: prescription.leftAxis === null ? '-' : prescription.leftAxis,
            	rightAdd: prescription.rightAdd === null ? '-' : prescription.rightAdd,
            	leftAdd: prescription.leftAdd === null ? '-' : prescription.leftAdd,
            	pupillaryDistance: prescription.pupillaryDistance,
            	rpDistance: prescription.rpDistance,
            	lpDistance: prescription.lpDistance,
            	prismEnable: prescription.prismEnable === 'true',
            	odVPrism: prescription.odVPrism === null ? '-' : prescription.odVPrism,
            	osVPrism: prescription.osVPrism === null ? '-' : prescription.osVPrism,
            	odVPrismBaseDir: prescription.odVPrismBaseDir === null ? '-' : prescription.odVPrismBaseDir,
            	osVPrismBaseDir: prescription.osVPrismBaseDir === null ? '-' : prescription.osVPrismBaseDir,
            	odHPrism: prescription.odHPrism === null ? '-' : prescription.odHPrism,
            	osHPrism: prescription.osHPrism === null ? '-' : prescription.osHPrism,
            	odHPrismBaseDir: prescription.odHPrismBaseDir === null ? '-' : prescription.odHPrismBaseDir,
            	osHPrismBaseDir: prescription.osHPrismBaseDir === null ? '-' : prescription.osHPrismBaseDir,
            }
        }

        $scope.closePrescriptionClicked = function() {
            $scope.isPrescriptionDetailsModalOpen = false;
            $scope.backdropPrescriptionPreviewOn = false;
        }

        // global errors init/rest function
        $scope.resetErrors = function () {
            $scope.errors['missingPrescriptionData'].value = false;
            $scope.errors['missingDoctorData'].value = false;
            $scope.errors["invalidPatientForm"].value = false;
            $scope.errors["uploadError"].value = false;
            $scope.errors["uploadNoFileUploadedError"].value = false;
            $scope.errors["invalidAddDoctorForm"].value = false;
            $scope.errors["submitPrescriptionError"].value = false;
        };

        // Selectize start

        // create providers
        $scope.singlePDProvider = [];
        var i = 0;
        for(i = 51; i <= 77.5; i+=0.5){
            $scope.singlePDProvider.push({text:i, value:i});
        }
        $scope.doublePDProvider = [];
        for(i = 25; i <= 38.5; i+=0.5){
            $scope.doublePDProvider.push({text:i, value:i});
        }
        $rootScope.getPupillaryProvider = function(){
            return ($scope.doublePD) ? $scope.doublePDProvider : $scope.singlePDProvider;
        }
        
        // selectize patch (copied from aedb10e3fa7333f840b6889095903b8474c13cf6)
        function monkeyPatch(selectize){
            // Fix unwanted behavior for Selectize. Warning: might have side effects.
            selectize.$control.off('mousedown');
            selectize.$control_input.off('mousedown');
            selectize.$control.on('mousedown', function()
            {
                // We click on the control, so we have to set the focus on it!
                // Even if openOnFocus is false. Which is more to control the default focus (first item of a forum)
                // or focus on keyboard navigation (tab).
                selectize.isFocused = false; // Set focus
                selectize.onMouseDown.apply(selectize, arguments);
                selectize.isFocused = true; // Open drop-down if needed
                return selectize.onMouseDown.apply(selectize, arguments);
            });
            selectize.$control_input.on('mousedown', function(e)
            {
                e.stopPropagation();
                if (selectize.settings.mode === 'single')
                {
                    // toggle dropdown
                    if (selectize.isOpen) selectize.close(); else selectize.open();
                }
            });
        }

        $scope.singleConfig = {
		    openOnFocus: false,
		    sortField: 'text',
		    maxItems: 1,
		    onInitialize: function(selectize)
		    {
		        monkeyPatch(selectize);
		    }
		}
        
        // Selectize end

        $scope.setupPrescriptionData = function(){
            //var currentPrescriptionData = $scope.items[$scope.currentItemId].prescriptionData;
            $scope.items[$scope.currentItemId].prescriptionData = {
                'prescriptionMode': '',
                'chosenDoctor': {},
                'uploadFileInput': {},
                'editFile': {},
                'patient': {
                    'firstName': '',
                    'lastName': '',
                    'dateOfBirth': ''
                },
                'pupillaryDistance': {
                    'rightPD': '',
                    'leftPD': ''
                }
            }
            console.log('prescription data setup');
        }

        // this function is responsible for pre-filling backend saved prescriptions upon page load (AKA if from shipping i want to EDIT them again) 
        $scope.setupExistingPrescriptionData = function (itemId, prescriptionData) {
            
            
            console.log('prescriptionData is ', prescriptionData);

            var allowedPreviewContentTypes = [
                'png',
                'gif',
                'jpeg',
                'jpg',
                'bmp'
            ];

            switch(prescriptionData.prescriptionType_p){
                case 'uploadPrescription':
                    $http.get($scope.downloadImageURL+$scope.params.userId.toString()+'/'+prescriptionData.fileName, {responseType : 'blob'})
	                .then(function(response) {
                        var blob = response.data;
                        $scope.fileLoading = false;
                        $scope.items[itemId].prescriptionProvided = true;
                        $scope.items[itemId].prescriptionData = {
                            'prescriptionMode': prescriptionData.prescriptionType_p,
                            'chosenDoctor': {},
                            'uploadFileInput': {
                                previewAllowed: (allowedPreviewContentTypes.indexOf(prescriptionData.fileName.split('.').pop()) == -1) ? false : true,
                                files: [
                                    {
                                        name: prescriptionData.fileName,
                                    }
                                ],
                                savedFilename: prescriptionData.fileName,
                                path:  window.URL.createObjectURL(blob)
                            },
                            'editFile': {},
                            'patient': {
                                'firstName': '',
                                'lastName': '',
                                'dateOfBirth': ''
                            },
                            'pupillaryDistance': {
                                'rightPD': '',
                                'leftPD': ''
                            }
                        }
                        if($scope.items[itemId].itemType == 'contact'){
                            $scope.items[itemId].prescriptionData.patient = {
                                'firstName': prescriptionData.firstName,
                                'lastName': prescriptionData.lastName,
                                'dateOfBirth': prescriptionData.dob_p.split('-').reverse().join('/')
                            }
                            $scope.items[itemId].prescriptionData.chosenDoctor = {
                                doctorAddress: {
                                    address1: prescriptionData.doctorAddress_p,
                                    address2: '',
                                    city: prescriptionData.doctorCity_p,
                                    country: 'US',
                                    stateProvince: prescriptionData.doctorState_p,
                                    zipPostalCode: prescriptionData.doctorZip_p
                                },
                                doctorFaxNumber: prescriptionData.doctorFax_p,
                                doctorName: prescriptionData.doctor,
                                doctorOfficeNumber: prescriptionData.telephone,
                                doctorPhoneNumber: prescriptionData.telephone,
                                officeName: prescriptionData.officeeName,
                                isValidDoctor: true
                            }
                        }
                    });
	                
	            	                  
                break;
                case 'callDoctor':
                    $scope.fileLoading = false;
                    $scope.items[itemId].prescriptionProvided = true;
                    $scope.items[itemId].prescriptionData = {
                        'prescriptionMode': prescriptionData.prescriptionType_p,
                        'chosenDoctor': {
                            doctorAddress: {
                                address1: prescriptionData.doctorAddress_p,
                                address2: '',
                                city: prescriptionData.doctorCity_p,
                                country: 'US',
                                stateProvince: prescriptionData.doctorState_p,
                                zipPostalCode: prescriptionData.doctorZip_p
                            },
                            doctorFaxNumber: prescriptionData.doctorFax_p,
                            doctorName: prescriptionData.doctor,
                            doctorOfficeNumber: prescriptionData.telephone,
                            doctorPhoneNumber: prescriptionData.telephone,
                            officeName: prescriptionData.officeeName,
                            isValidDoctor: true
                        },
                        'uploadFileInput': {},
                        'editFile': {},
                        'patient': {
                            'firstName': '',
                            'lastName': '',
                            'dateOfBirth': ''
                        },
                        'pupillaryDistance': {
                            'rightPD': '',
                            'leftPD': ''
                        }
                    }
                    if($scope.items[itemId].itemType == 'contact'){
                        $scope.items[itemId].prescriptionData.patient = {
                            'firstName': prescriptionData.firstName,
                            'lastName': prescriptionData.lastName,
                            'dateOfBirth': prescriptionData.dob_p.split('-').reverse().join('/')
                        }
                    }
                break;
            }
            console.log('itemId ', itemId, $scope.items[itemId]);
        }




        $scope.currentlyEditing = null; // frame or contact
        $scope.useSamePrescriptionFrame = true;
        $scope.disableSamePrescriptionOption = false;
        $scope.useSamePrescriptionContact = true;
        $scope.previousSavedFileName = null;
        // variabili di stato (frontend prescription-status) quando usano la "same prescription"
        $scope.haveSamePrescriptionFrames = false;
        $scope.haveSamePrescriptionFramesMode = null;
        $scope.haveSamePrescriptionFramesArr = []; 
        $scope.haveSamePrescriptionContact = false;
        $scope.haveSamePrescriptionContactMode = null;
        $scope.haveSamePrescriptionContactArr = [];

        // frontend labels
        $scope.nextProductButtonLabel = 'CONTINUE';


        // Retrieve JSP init params
        $scope.init = function(initParams) {
            // saves params
            angular.merge($scope.params, initParams);
            // DEBUG
            $log.info($scope.params);
            
            // rest services urls
            $scope.providePrescriptionBaseURL = '/wcs/resources/store/' + $scope.params.storeId + '/provideprescription';
            $scope.setupURL = $scope.providePrescriptionBaseURL + '/setup';
            $scope.searchDoctorURL = $scope.providePrescriptionBaseURL + '/searchdoctor';
            $scope.prescriptionUploadURL = $scope.providePrescriptionBaseURL + '/upload';
            $scope.prescriptionSubmitURL = $scope.providePrescriptionBaseURL + '/submit';
            $scope.downloadImageURL = $scope.providePrescriptionBaseURL + '/download/';
            $scope.prescriptionSavedUrl = '/wcs/resources/store/' + $scope.params.storeId + '/wcs/prescription/user/@self?nocache=' + new Date().getTime().toString();
            
            if($scope.params.userType === 'R') {//condition ok? 
            	//call services for return prescription list
            	$http.get($scope.prescriptionSavedUrl)
            	.then(function(response) {
            		if(response.data && response.data.resultList && response.data.resultList.length > 0) {
            			$scope.prescriptionSaved = response.data.resultList; //TO TEST
            		}
            	}, function(error) {
            		$log.error('Error getting list of prescription saved ' + error);
            	});
            }
               
            $scope.projectImageUrl = $scope.params.projectImagesUrl+'202005-rxreview/';
            
            if($scope.params.storeId == 10852){
            	$scope.states = ['AB','BC','MB','NB','NL','NT','NS','NU','ON','PE','QC','SK','YT']
            }else{
            	//[LCDP-10970] Added NJ
            	
            	$scope.states = ['AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID',
            	                 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM',
            	                 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA',
            	                 'WA', 'WV', 'WI', 'WY'];
            }
            
           
            
            //prescriptions setup
            $http.get($scope.setupURL + '/' + $scope.params.orderId)
                .then(function(response) {
                    if (response.data && response.data.response.data.status == 'Success') {
                        $scope.prescriptions  = response.data.response.data.dataContent.rxDataContent; // map returned by setup service with {rxId : rxData} format
                        //$scope.items = response.data.response.data.dataContent.itemNamesMap;
                        
                        //[RONA-5035][LCDP-11027]: Display Items only with prescription sent later
                        var items = {};
                        items = response.data.response.data.dataContent.itemNamesMap;
                        for(var key in items){
                        	if(items.hasOwnProperty(key) && items[key].prescriptionId != null){
                        		delete items[key];
                        	}
                        }
                        $scope.items = items;
                        
                        var itemIndex = 1;
                        var currentLensType = null;
                        angular.forEach($scope.items, function(itemData, itemId) {
                            // cross saved prescriptions
                            itemData.backendSavedPrescription = null;
                            angular.forEach($scope.prescriptions, function(prescriptionData, prescriptionId) {
                                //console.log(prescriptionId, prescriptionData);
                                if(!itemData.backendSavedPrescription && itemData.prescriptionId == prescriptionId){
                                    itemData.backendSavedPrescription = prescriptionData.prescriptionType_p;
                                    $scope.setupExistingPrescriptionData(itemData.itemId, prescriptionData);
                                }
                            });

                            try {
	                            if (null != itemData.itemLensAttributes && itemData.itemLensAttributes.length > 0) {
		                            if (null != currentLensType && currentLensType != itemData.itemLensAttributes[0].toUpperCase()) {
		                            	$scope.useSamePrescriptionFrame = false;
		                            	$scope.disableSamePrescriptionOption = true;
		                            	$($('#provide-prescription-ctrl .use-same-prescription-checkbox label')[0]).addClass('disabled');
		                            } else {
		                            	currentLensType = itemData.itemLensAttributes[0].toUpperCase();
		                            }
	                            }
                            } catch (e) {}

                        	if ($scope.currentItemId == 0) {
                        		$scope.currentItemId = itemId;
                                $scope.currentlyEditing = itemData.itemType;
							}
							if (itemData.itemType == 'frame') {
								itemData.itemUrl = $scope.params.framesImageURL.replace('{0}', itemData.itemUPC).replace('{1}', '_002').replace('{2}', '200');
								
								if(itemData.gridModel && itemData.gridColor && itemData.itemLensAttributes[1] && itemData.itemLensAttributes[3] && itemData.itemLensAttributes[4]){
									
									var cartImageURL = 'https://assets.lenscrafters.com/extra/image/rxc/frames/{0}__{1}__RXP__FRAME__qt.png?impolicy={4}&Lenses=https://assets.lenscrafters.com/extra/image/rxc/lenses/{0}__RXP__{2}__qt.png';
									var cartImageLogoURL = '&Logo=https://assets.lenscrafters.com/extra/image/rxc/logo/{0}__RXP__{3}__qt.png';
									
									var frameGridModel = itemData.gridModel;
									var frameGridColor = itemData.gridColor;
									var rxcLensBrand = itemData.itemLensAttributes[1];
									var rxcLensColorCode = itemData.itemLensAttributes[3];
									var rxcLensPolar = itemData.itemLensAttributes[4];
								
									cartImageURL = cartImageURL.replace('{0}', frameGridModel);
									cartImageURL = cartImageURL.replace('{1}', frameGridColor);
									cartImageURL = cartImageURL.replace('{2}', rxcLensColorCode);

									var brandLogo = '';
									
									if(rxcLensBrand.indexOf('Costa Del Mar') > -1){
										brandLogo = 'LOGO01';
									} else if(rxcLensBrand.indexOf('Ray-Ban') > -1){
										brandLogo = 'LOGO04';
										if(rxcLensBrand.indexOf('Polar') > -1){
											brandLogo = 'LOGO03';
										}
									} else if(rxcLensBrand.indexOf('Oakley') > -1){
										brandLogo = 'LOGO05';
									}
									
									if(brandLogo === ''){
										cartImageURL = cartImageURL.replace('{4}', 'CompositeNoLogo');
									} else{
										cartImageURL = cartImageURL.replace('{4}', 'CompositeLogo');
										cartImageLogoURL = cartImageLogoURL.replace('{0}', frameGridModel);
										cartImageLogoURL = cartImageLogoURL.replace('{3}', brandLogo);
										cartImageURL = cartImageURL.concat(cartImageLogoURL);
									}
									
									itemData.itemUrl = cartImageURL;
								}
								
							} else {
								itemData.itemUrl = $scope.params.contactsImageURL + itemData.itemUPC + '_fr.png?imwidth=200';
							}
							itemData.itemIndex = itemIndex;
							itemIndex ++; 
                            
                        });
                        console.log('$scope.items', $scope.items);
                        $scope.setupItemsLength = Object.keys($scope.items).length;
                        
                        $scope.setupFrames = $filter('isFrame')($scope.items); // check if they have the same prescription FRAMES
                        if($scope.setupFrames.length > 1){ 
                            for(i = 0; i < $scope.setupFrames.length; i++){
                                var itemData = $scope.setupFrames[i];
                                if(itemData.backendSavedPrescription && $scope.haveSamePrescriptionFramesArr.indexOf(itemData.backendSavedPrescription) == -1){
                                    console.log("pusho", itemData.backendSavedPrescription);
                                    $scope.haveSamePrescriptionFramesArr.push(itemData.backendSavedPrescription);
                                }
                            }
                            if($scope.haveSamePrescriptionFramesArr.length == 1){
                                $scope.haveSamePrescriptionFrames = true;
                                $scope.haveSamePrescriptionFramesMode = $scope.haveSamePrescriptionFramesArr[0];
                            }
                        }
                        $scope.setupContact = $filter('isContact')($scope.items); // check if they have the same prescription CONTACT
                        if($scope.setupContact.length > 1){ 
                            for(i = 0; i < $scope.setupContact.length; i++){
                                var itemData = $scope.setupContact[i];
                                if(itemData.backendSavedPrescription && !$scope.haveSamePrescriptionContactArr.indexOf(itemData.backendSavedPrescription) == -1){
                                    $scope.haveSamePrescriptionContactArr.push(itemData.backendSavedPrescription);
                                }
                            }
                            if($scope.haveSamePrescriptionContactArr.length == 1){
                                $scope.haveSamePrescriptionContact = true;
                                $scope.haveSamePrescriptionContactMode = $scope.haveSamePrescriptionContactArr[0];
                            }
                        }



                        if($scope.setupItemsLength == 0){
                            $scope.isRedirecting = true;
                            window.location.href = "AjaxOrderItemDisplayView?storeId=" + $scope.params.storeId + "&catalogId=" + $scope.params.catalogId + "&langId=&URL=AjaxOrderItemDisplayView1&orderId=.";	
                        }
                        if(!$scope.items[$scope.currentItemId].backendSavedPrescription) $scope.setupPrescriptionData();

                        $scope.allPrescriptionProvided = $scope.allRXProvided(false);

                        $log.info('rx setup completed');
                        
                    } else {
                        $log.error('Error getting order item data from service');
                    }

                }, function(error) {
                    $log.error('Error getting order item data from service.\n' + error);
                });
        }

        $scope.carouselUpdateCurrentProduct = function(event, slick, oldIndex, newIndex) {
            if (oldIndex != newIndex) {
                slick.$slides[newIndex].click();
            }
        }

        // watch per risettare il current item al primo disponibile dei frame
        $scope.$watch('useSamePrescriptionFrame', function(newVal, oldVal) {
            if(newVal != oldVal && newVal == true){
                var frames = $filter('isFrame')($scope.items);
                $scope.currentItemId = frames[0].itemId;
                $scope.currentlyEditing = 'frame';
                $scope.nextProductButtonLabel = 'CONTINUE';
            }else if(!newVal){
                $scope.currentlyEditing = 'frame';
                $scope.nextProductButtonLabel = 'NEXT PRODUCT';
            }
        });
        // watch per risettare il current item al primo disponibile delle contact
        $scope.$watch('useSamePrescriptionContact', function(newVal, oldVal) {
            if(newVal != oldVal && newVal == true){
                var contacts = $filter('isContact')($scope.items);
                $scope.currentItemId = contacts[0].itemId;
                $scope.currentlyEditing = 'contact';
                $scope.nextProductButtonLabel = 'CONTINUE';
            }else if(!newVal){
                $scope.currentlyEditing = 'contact';
                $scope.nextProductButtonLabel = 'NEXT PRODUCT';
            }
        });

        $scope.nextProduct = function(nextItemId) {
            
            if (nextItemId == null || nextItemId != $scope.currentItemId) {
                if (nextItemId == null) {
                    $scope.confirmPrescription(false);
                } else {
                    if( $scope.items[$scope.currentItemId].itemType == $scope.items[nextItemId].itemType && 
                        $scope.currentlyEditing == 'frame' &&
                        $scope.useSamePrescriptionFrame == true){
                        return;
                    }else if( $scope.items[$scope.currentItemId].itemType == $scope.items[nextItemId].itemType && 
                        $scope.currentlyEditing == 'contact' &&
                        $scope.useSamePrescriptionContact == true){
                        return;
                    }else{
                        $scope.currentlyEditing = $scope.items[nextItemId].itemType;
                        $scope.nextProductButtonLabel = (($scope.useSamePrescriptionFrame && $scope.items[$scope.currentItemId].itemType =='frame') || ($scope.useSamePrescriptionContact && $scope.items[$scope.currentItemId].itemType =='contact')) ? 'CONTINUE': 'NEXT PRODUCT';
                    }
                    if ($scope.items[$scope.currentItemId].prescriptionId == null) {
                        $scope.items[$scope.currentItemId].prescriptionProvided = false;
                    }else{
                    	if((($scope.items[$scope.currentItemId].prescriptionData && $scope.items[$scope.currentItemId].prescriptionData.prescriptionMode == 'callDoctor') || $scope.items[$scope.currentItemId].itemType == 'contact') && $scope.prevChosenDoctor.doctorName != undefined){
							angular.merge($scope.items[$scope.currentItemId].prescriptionData.chosenDoctor,$scope.prevChosenDoctor);
						}
                    }
                    if ($scope.items[nextItemId].prescriptionSkipped) {
                        $scope.items[nextItemId].prescriptionSkipped = false;
                    }

                    $scope.currentItemId = nextItemId;

                    if ($scope.items[nextItemId].prescriptionId == null) {
                        $scope.setupPrescriptionData();
                    }

                    //reset campi
                    $scope.resetField();

                    window.scrollTo(0, 0);

                }
            }
        }

        $scope.skipProduct = function() {
            if($scope.items[$scope.currentItemId].prescriptionId!=null){
				//user started to edit his prescription but he didnt't confirm changes
				$scope.items[$scope.currentItemId].prescriptionProvided = true;

				if(($scope.items[$scope.currentItemId].prescriptionData && $scope.items[$scope.currentItemId].prescriptionData.prescriptionMode == 'callDoctor') || $scope.items[$scope.currentItemId].itemType == 'contact'){
                    $scope.items[$scope.currentItemId].prescriptionData.chosenDoctor = $scope.prevChosenDoctor;
				}
            }
            
            var nextItemId = 0;
            var rxNeededItems = $filter('rxNeededPerType')($scope.items, $scope.items[$scope.currentItemId].itemType);

            if (rxNeededItems.length == 0) {
                console.log('ALTRI',$scope.items[$scope.currentItemId].itemType,'NON TROVATI')
                var otherPossibileItemType = $filter('rxNeededPerType')($scope.items, ($scope.items[$scope.currentItemId].itemType == 'frame') ? 'contact':'frame');

                if(otherPossibileItemType.length){
                    var i, itemData;
                    for(i= 0; i < otherPossibileItemType.length; i++){
                        itemData = otherPossibileItemType[i];
                        if (itemData.prescriptionSkipped != true && itemData.itemId != $scope.currentItemId && itemData.prescriptionData == undefined) {
                            $scope.currentlyEditing = itemData.itemType;
                            nextItemId = itemData.itemId;
                            break;
                        }
                    }
                }else{
                    $scope.isRedirecting = true;
                    window.location.href = $scope.params.nextStepUrl;
                }
            }else{
                // se NON ci sono altri tipi (! dal current item type) e ho spuntato use same prescription (ma in questo caso è skipped)
                // allora skippo tutto e mando al prossimo step 
                if( ($scope.useSamePrescriptionFrame == true && $scope.items[$scope.currentItemId].itemType == 'frame') ||
                    ($scope.useSamePrescriptionContact == true && $scope.items[$scope.currentItemId].itemType == 'contact')){
                        angular.forEach(rxNeededItems, function(itemData, itemIndex) {
                            $scope.items[itemData.itemId].prescriptionSkipped = true;
                        });
                        var otherPossibileItemType = $filter('rxNeededPerType')($scope.items, ($scope.items[$scope.currentItemId].itemType == 'frame') ? 'contact':'frame');

                        if(otherPossibileItemType.length){
                            var i, itemData;
                            for(i= 0; i < otherPossibileItemType.length; i++){
                                itemData = otherPossibileItemType[i];
                                if (itemData.prescriptionSkipped != true && itemData.itemId != $scope.currentItemId && itemData.prescriptionData == undefined) {
                                    $scope.currentlyEditing = itemData.itemType;
                                    nextItemId = itemData.itemId;
                                    break;
                                }
                            }
                        }else{
                            $scope.isRedirecting = true;
                            window.location.href = $scope.params.nextStepUrl;
                        }
                }else{
                    // se invece sono sull'editing singolo allora trovo la prima itemId disponibile (e non l'ultima se usassi angular.foreach) e la valorizzo per essere usata piu sotto
                    var i, itemData;
                    for(i = 0; i < rxNeededItems.length; i++){
                        itemData = rxNeededItems[i];
                        if (itemData.prescriptionSkipped != true && itemData.itemId != $scope.currentItemId) {
                            nextItemId = itemData.itemId;
                            break;
                        }
                    }
                    if(nextItemId == 0){
                        var otherPossibileItemType = $filter('rxNeededPerType')($scope.items, ($scope.items[$scope.currentItemId].itemType == 'frame') ? 'contact':'frame');

                        if(otherPossibileItemType.length){
                            var i, itemData;
                            for(i= 0; i < otherPossibileItemType.length; i++){
                                itemData = otherPossibileItemType[i];
                                if (itemData.prescriptionSkipped != true && itemData.itemId != $scope.currentItemId && itemData.prescriptionData == undefined) {
                                    $scope.currentlyEditing = itemData.itemType;
                                    nextItemId = itemData.itemId;
                                    break;
                                }
                            }
                        }
                    }
                }
            } 
            
            if (nextItemId == 0) {
                // current item is the last with no prescription provided, skipped items excluded    
                $scope.isRedirecting = true;
                window.location.href = $scope.params.nextStepUrl;

            } else {
                
                $scope.resetErrors();

                $scope.items[$scope.currentItemId].prescriptionSkipped = true;
           
                $scope.currentItemId = nextItemId;
                $scope.setupPrescriptionData();
                $scope.allPrescriptionProvided = $scope.allRXProvided(false);

                //TODO rendere lo scroll meno netto ed eseguirlo solo se già scrollato di un tot
                window.scrollTo(0, 0);

            }
        }

        $scope.resetContactUpload = function() {
            $scope.items[$scope.currentItemId].prescriptionData.uploadFileInput = {};
        }

        $scope.allRXProvided = function(edit) {
            var prescrProvidedNum;
            if (edit) {
                prescrProvidedNum = 0;
            } else {
                prescrProvidedNum = 1; //parte da 1: in questo modo includo nel conteggio finale anche l'item corrente per il quale la prescrizione non è ancora stata inserita
            }

            angular.forEach($scope.items, function(item, key) {
            	if (key != $scope.currentItemId && ((item.prescriptionProvided && item.prescriptionData != undefined) || item.prescriptionSkipped)) {
                    prescrProvidedNum++;
                }
            });

            if (Object.keys($scope.items).length == prescrProvidedNum) {
                return true;
            }

            return false;
        }

        $scope.searchDoctors = function() {

            $scope.loadingDoctors = true;

            var searchQuery;
            if ($scope.doctorSearchType == 'docname') {
                searchQuery = ($scope.docName != undefined ? $scope.docName : '') + '!' + ($scope.docState != undefined ? $scope.docState : '') + '!' + ($scope.docCity != undefined ? $scope.docCity.replace(' ', '_') : '');
            } else if ($scope.doctorSearchType == 'docphonenumber') {
                searchQuery = $scope.docPhoneNumber.replace('(','').replace(')','').replace('-','').replace(' ','').replace('  ','');
            }
            $log.info(searchQuery);

            var scrollToSearchDoc = document.getElementById("search-doc-results");

            if ($scope.params.storeId == 10852)
			{
            	var query = {};
				var options = {};
				
				if ($scope.doctorSearchType == 'docphonenumber')
				{
					query = {
	              			  $and: [
	              			    { phoneSearch: "'" + String($scope.docPhoneNumber.replace('(','').replace(')','').replace('-','').replace(' ','').replace('  ',''))}
	              			  ]
	              			};
					
					options = {
		          				  includeScore: true,
		          				  useExtendedSearch: true,
		          				  keys: ['phoneSearch']
		          				};
				}
				else
				{
					var shortState = "";
					
					switch(String($scope.docState)) {
					  case 'Alberta':
						  shortState = 'AB';
					    break;
					  case 'British Columbia':
						  shortState = 'BC';
					    break;
					  case 'Manitoba':
						  shortState = 'MB';
					    break;
					  case 'New Brunswick':
						  shortState = 'NB';
					    break;
					  case 'Newfoundland':
						  shortState = 'NL';
					    break;
					  case 'Northwest Territory':
						  shortState = 'NT';
					    break;
					  case 'Nova Scotia':
						  shortState = 'NS';
					    break;
					  case 'Nunavut':
						  shortState = 'NU';
					    break;
					  case 'Ontario':
						  shortState = 'ON';
					    break;
					  case 'Prince Edward Island':
						  shortState = 'PE';
					    break;
					  case 'Quebec':
						  shortState = 'QC';
					    break;
					  case 'Saskatchewan':
						  shortState = 'SK';
					    break;
					  case 'Yukon':
						  shortState = 'YT';
					    break;
					  default:
						  shortState = String($scope.docState);
					}
					
					query = {
							$and: [
		              			    { $or: [ {clinic: "'" + String(_requestObject.name)}, {name: "'" + String(_requestObject.name)}]},
		              			    { stateSearch: "'" + shortState},
		              				{ citySearch: "'" + String(_requestObject.city)} 
		              			  ]
	              	};
					
					options = {
		          				  includeScore: true,
		          				  useExtendedSearch: true,
		          				  keys: ['name','clinic','stateSearch','citySearch']
		          				};
				} 
				
            	$http.get($scope.searchDoctorURL + '/' + searchQuery)
	            .then(function(response) {
	            	if (response.data && response.data.response.status == 'Success') {
	            		$scope.doctors = [];
	            		
	            		var allDoctors = []; 
	            		allDoctors = response.data.response.data;
	            		const fuse = new Fuse(allDoctors, options);
	            		const result = fuse.search(query);
	            		for (const item of result) 
	            		{
	            			$scope.doctors.push(item.item); 
	            		} 

                        setTimeout(function(){
                            scrollToSearchDoc.scrollIntoView();
                        }, 200);
                        
	                } else {
	                    $log.error('Error getting doctors from service: unsuccessful.');
	                	obj = {
                			id: 'Error',
                			Error_Source: "Server",
                			Error_Code: "RX panel",
                			Error_Message: 'Unable to get doctor list'
                		}
                		tealium_data2track.push(obj);
	                }
	                
	                $scope.searchTentative++;
	                $scope.loadingDoctors = false;
	
	            }, function(error) {
	                $log.error('Error getting doctors from service');
	                $scope.loadingDoctors = false;
	                $scope.searchTentative++;
	                obj = {
            			id: 'Error',
            			Error_Source: "Server",
            			Error_Code: "RX panel",
            			Error_Message: 'Unable to get doctor list'
            		}
            		tealium_data2track.push(obj);
	            }
	        );
			}
            else
            {
            $http.get($scope.searchDoctorURL + '/' + searchQuery)
	            .then(function(response) {
	            	if (response.data && response.data.response.status == 'Success') {
	            		$scope.doctors = [];
	                    angular.forEach(response.data.response.data, function(doc, doctorId) {
                            if(doc.doctorName.length != 0 && doc.doctorPhoneNumber.length != 0 && doc.doctorOfficeNumber.length != 0){
                                $scope.doctors.push(doc);
                            }
	                    });
                        setTimeout(function(){
                            scrollToSearchDoc.scrollIntoView();
                        }, 200);
                        
	                } else {
	                    $log.error('Error getting doctors from service: unsuccessful.');
	                	obj = {
                			id: 'Error',
                			Error_Source: "Server",
                			Error_Code: "RX panel",
                			Error_Message: 'Unable to get doctor list'
                		}
                		tealium_data2track.push(obj);
	                }
	                
	                $scope.searchTentative++;
	                $scope.loadingDoctors = false;
	
	            }, function(error) {
	                $log.error('Error getting doctors from service');
	                $scope.loadingDoctors = false;
	                $scope.searchTentative++;
	                obj = {
            			id: 'Error',
            			Error_Source: "Server",
            			Error_Code: "RX panel",
            			Error_Message: 'Unable to get doctor list'
            		}
            		tealium_data2track.push(obj);
	            }
	        );
            }
            
            scrollToSearchDoc.scrollIntoView();
        };

        $scope.chooseDoctor = function(index) {
            $scope.items[$scope.currentItemId].prescriptionProvided = true;
            $scope.openDoctorSearchModal = false;
            $scope.items[$scope.currentItemId].prescriptionData = $scope.items[$scope.currentItemId].prescriptionData || {};
            $scope.items[$scope.currentItemId].prescriptionData.chosenDoctor={};
            $scope.items[$scope.currentItemId].prescriptionData.chosenDoctor = $scope.doctors[index];
            angular.forEach(document.querySelectorAll('body,html'), function(elem) {
					elem.classList.remove('hidden-overflow');
				});
        };

        $scope.addDoctor =function(){
        	$scope.resetErrors();

			if($scope.addDoctorForm.$valid && $scope.addDocPhoneNumber != ''){
				$scope.items[$scope.currentItemId].prescriptionProvided = true;
				$scope.openDoctorAddModal=false;
				$scope.items[$scope.currentItemId].prescriptionData.chosenDoctor={};
				$scope.items[$scope.currentItemId].prescriptionData.chosenDoctor.doctorName = $scope.addDocName;
				$scope.items[$scope.currentItemId].prescriptionData.chosenDoctor.doctorPhoneNumber = $scope.addDocPhoneNumber.replace(/[- )(]/g,'');
                $scope.items[$scope.currentItemId].prescriptionData.chosenDoctor.doctorAddress = {
                    "address1": "-",
                    "stateProvince": "",
                    "address2": "",
                    "zipPostalCode": "",
                    "city": "",
                    "country": ""
                };
                
				angular.forEach(document.querySelectorAll('body,html'), function(elem) {
					elem.classList.remove('hidden-overflow');
				});
				
			}else{
				 $scope.errors['invalidAddDoctorForm'].value = true;
			}
		};

        $scope.uploadPrescriptionFile = function() {
            $scope.resetErrors();
            $scope.fileLoading = true;

            if ($scope.items[$scope.currentItemId].prescriptionData.uploadFileInput.files[0].size < $scope.maxSize) {//file size check
                if (
                    $scope.allowedContentTypes.indexOf($scope.items[$scope.currentItemId].prescriptionData.uploadFileInput.files[0].type) != -1
                    || 
                    $scope.items[$scope.currentItemId].prescriptionData.uploadFileInput.files[0].name.indexOf(".pages") != -1
                    ) {//file format check
                    $scope.fileEditMode = false;
                    var uploadParams = {
                        storeId: $scope.params.storeId.toString(),
                        langId: $scope.params.langId.toString(),
                        catalogId: $scope.params.catalogId.toString(),
                        userId: $scope.params.userId.toString(),
                        isItemFile: true.toString()
                    }
                    
                    uploadParams.fileName =  $filter('nospace')($scope.items[$scope.currentItemId].prescriptionData.uploadFileInput.files[0].name);
                    uploadParams.fileData = $scope.items[$scope.currentItemId].prescriptionData.uploadFileInput.path.substring($scope.items[$scope.currentItemId].prescriptionData.uploadFileInput.path.indexOf(',') + 1);


                    //if contact, we use the current orderItemId, otherwise (frame) we use the lens orderItemId saved in field1 of the frame
                    if ($scope.items[$scope.currentItemId].itemType == 'contact') {
                        uploadParams.orderItemId = $scope.currentItemId;
                    } else {
                        uploadParams.orderItemId = $scope.items[$scope.currentItemId].itemField1;
                    }

                    $log.info("Start: file upload for item " + $scope.currentItemId);
                    
                    $http.post($scope.prescriptionUploadURL, uploadParams)
                        .then(function(response) {
                            if (response.data && response.data.status == 'Success') {
                                $log.info("Prescription file uploaded for item " + $scope.currentItemId);
                                $scope.items[$scope.currentItemId].prescriptionData.uploadFileInput.savedFilename = response.data.savedFileName;
                                if(response.data.file_checksum){
                                	$scope.items[$scope.currentItemId].prescriptionData.uploadFileInput.checksum = response.data.file_checksum;
                                }
                                if($scope.items[$scope.currentItemId].itemType == 'frame' || ($scope.items[$scope.currentItemId].itemType == 'contact' && $scope.params.callDoctorEnabled == 'false')){
                                	$scope.items[$scope.currentItemId].prescriptionProvided = true;
                                }

                                //check to allow image preview
                                if ($scope.allowedPreviewContentTypes.indexOf($scope.items[$scope.currentItemId].prescriptionData.uploadFileInput.files[0].type) == -1){
                                	$scope.items[$scope.currentItemId].prescriptionData.uploadFileInput.previewAllowed = false;
                                }else{
                                	$scope.items[$scope.currentItemId].prescriptionData.uploadFileInput.previewAllowed = true;
                                }



                                $scope.resetErrors();
                                $scope.fileLoading = false;
                            } else {
                                //error according to messages from server

                                if (response.data.messages.toString().indexOf('extension') != -1) {
                                    //file format error
                                    $log.error(response.data.messages[0]);
                                    angular.merge($scope.errors['uploadError'],$scope.errors['uploadFileFormatError']);
					                $scope.errors['uploadError'].value=true;
                                    $scope.items[$scope.currentItemId].prescriptionData.uploadFileInput={};

                                    tealium_data2track.push({
										'id' : 'Error', 
										'Error_Code' : response.data.messages[0],
										'Error_Source' : 'User'
									});

                                } else if (response.data.messages.toString().indexOf('length') != -1) {
                                    //file size error
                                    $log.error(response.data.messages[0]);
                                    angular.merge($scope.errors['uploadError'],$scope.errors['uploadFileSizeError']);
				                    $scope.errors['uploadError'].value=true;
				                    $scope.items[$scope.currentItemId].prescriptionData.uploadFileInput={};

				                    tealium_data2track.push({
										'id' : 'Error', 
										'Error_Code' : response.data.messages[0],
										'Error_Source' : 'User' 
									});
                                } else {
                                    //generic error
                                    angular.merge($scope.errors['uploadError'],$scope.errors['uploadFileError']);
					                $scope.errors['uploadError'].value=true;
					                $scope.items[$scope.currentItemId].prescriptionData.uploadFileInput={};

					                tealium_data2track.push({
										'id' : 'Error', 
										'Error_Code' : response.data.messages[0],
										'Error_Source' : 'Server' 
									});
                                }
                                $scope.fileLoading = false;
                            }

                        }, function(error) {
                            $log.error('Error: no prescription uploaded for item ' + $scope.currentItemId);
                            //generic error
                            angular.merge($scope.errors['uploadError'],$scope.errors['uploadFileError']);
							$scope.errors['uploadError'].value=true;
							$scope.items[$scope.currentItemId].prescriptionData.uploadFileInput={};

							tealium_data2track.push({
								'id' : 'Error', 
								'Error_Code' : $scope.errors['uploadError'].msg,
								'Error_Source' : 'Server' 
							});

                            $scope.fileLoading = false;
                        });
                } else {
                    //file format error
                    angular.merge($scope.errors['uploadError'],$scope.errors['uploadFileFormatError']);
					$scope.errors['uploadError'].value=true;
					$scope.items[$scope.currentItemId].prescriptionData.uploadFileInput={};

					tealium_data2track.push({
						'id' : 'Error', 
						'Error_Code' : $scope.errors['uploadError'].msg,
						'Error_Source' : 'User' 
					});
					$scope.fileLoading = false;
                }
            } else {
                //file size error
				angular.merge($scope.errors['uploadError'],$scope.errors['uploadFileSizeError']);
				$scope.errors['uploadError'].value=true;
				$scope.items[$scope.currentItemId].prescriptionData.uploadFileInput={};

				tealium_data2track.push({
					'id' : 'Error', 
					'Error_Code' : $scope.errors['uploadError'].msg ,
					'Error_Source' : 'User'
				});

				$scope.fileLoading = false;
            }

        }

        $scope.confirmPrescription = function(goToNextStep) {
            $scope.resetErrors();
            console.log($scope.items[$scope.currentItemId].itemType, $scope.useSamePrescriptionFrame, $scope.firstItemPrescriptionFrame)
            if (
                ($scope.items[$scope.currentItemId].itemType == 'frame' && $scope.useSamePrescriptionFrame && $scope.firstItemPrescriptionFrame != 0) ||
                ($scope.items[$scope.currentItemId].itemType == 'contact' && $scope.useSamePrescriptionContact && $scope.firstItemPrescriptionContact != 0)
            ) {
                $scope.items[$scope.currentItemId].prescriptionProvided = true;
            }

            if ($scope.items[$scope.currentItemId].prescriptionProvided == true) {
                console.log("A")
                if ($scope.items[$scope.currentItemId].itemType == 'frame' || ($scope.callAuth && $scope.patientForm.$valid)) {
                    var submitParams = {}
                    console.log("B")
                    if ($scope.useSamePrescriptionFrame && $scope.items[$scope.currentItemId].itemType == 'frame' && $scope.firstItemPrescriptionFrame != 0) {//copy prescription 
                        console.log('B3 - copy prescription è true e siamo in un frame')
                    	//order item prescription copy from: lens orderitemid 
                        submitParams.cp_rx_oid = $scope.items[$scope.firstItemPrescriptionFrame].itemField1;
                         
                        submitParams.cp_rx_id = $scope.items[$scope.firstItemPrescriptionFrame].prescriptionId;

                        //we use the lens orderItemId saved in field1 of the frame
                        submitParams.orderitemid = $scope.items[$scope.currentItemId].itemField1;

                        $scope.haveSamePrescriptionFrames = true;
                        $scope.haveSamePrescriptionFramesMode = $scope.items[$scope.firstItemPrescriptionFrame].prescriptionData.prescriptionMode;
                    } else {//new prescription, no copy 
                        console.log("new prescription")
                        $scope.haveSamePrescriptionFrames = false;
                        $scope.haveSamePrescriptionFramesMode = null;
                        $scope.haveSamePrescriptionContact = false;
                        $scope.haveSamePrescriptionContactMode = null;

                        if ($scope.useSamePrescriptionContact && $scope.items[$scope.currentItemId].itemType == 'contact' && $scope.firstItemPrescriptionContact != 0) {//copy prescription data ONLY FOR CONTACTS
                            $scope.items[$scope.currentItemId].prescriptionData = {};
                            angular.merge($scope.items[$scope.currentItemId].prescriptionData, $scope.items[$scope.firstItemPrescriptionContact].prescriptionData);
                            $scope.haveSamePrescriptionContact = true;
                            $scope.haveSamePrescriptionContactMode = $scope.items[$scope.firstItemPrescriptionContact].prescriptionData.prescriptionMode;
                            if($scope.previousSavedFileName) $scope.items[$scope.currentItemId].prescriptionData.uploadFileInput.savedFilename = $scope.previousSavedFileName;
                        }
                        
						var chosenDoctor = $scope.items[$scope.currentItemId].prescriptionData.chosenDoctor;
						var uploadedFile = $scope.items[$scope.currentItemId].prescriptionData.uploadFileInput;
						var isMissingData = false;
                        console.log(chosenDoctor, uploadedFile)
						if ($scope.items[$scope.currentItemId].itemType == 'frame' && chosenDoctor && uploadedFile 
								&& Object.keys(chosenDoctor).length === 0 && Object.keys(uploadedFile).length === 0 && $scope.prescriptionClicked === -1) {
							$scope.errors['missingPrescriptionData'].value = true;
							isMissingData = true;
						} else if ($scope.items[$scope.currentItemId].itemType == 'contact' && chosenDoctor && uploadedFile) {
							if (Object.keys(chosenDoctor).length === 0) {
								$scope.errors['missingDoctorData'].value = true;
								isMissingData = true;
							} else if ($scope.clPrescriptionMode == 'upload' && Object.keys(uploadedFile).length === 0) {
								$scope.errors['uploadError'].value = true;
								isMissingData = true;
							}

							$anchorScroll('patientForm');
						} else {
                            if (!chosenDoctor){
                                $scope.errors['missingDoctorData'].value = true;
                                isMissingData = true;
                            }
                            if (!uploadedFile && $scope.items[$scope.currentItemId].itemType == 'contact' && $scope.clPrescriptionMode == 'upload'){
                                $scope.errors['uploadNoFileUploadedError'].value = true;
                                isMissingData = true;
                            }
                        }

						if (isMissingData) {
							$log.error('Error: no prescription submitted for item ' + $scope.currentItemId);
							return;
						}

                        if ($scope.items[$scope.currentItemId].prescriptionData.chosenDoctor != undefined
                        		&& $scope.items[$scope.currentItemId].prescriptionData.chosenDoctor.doctorName != undefined) {//callDoctor
                            $scope.items[$scope.currentItemId].prescriptionData.prescriptionMode = "callDoctor";
                            if($scope.items[$scope.currentItemId].prescriptionData.chosenDoctor.doctorAddress !=undefined){
                            	angular.merge(submitParams, $scope.formatDoctorData($scope.items[$scope.currentItemId].prescriptionData.chosenDoctor));
                            }else{
                            	angular.merge(submitParams, $scope.items[$scope.currentItemId].prescriptionData.chosenDoctor);
                            }
                            submitParams.doctorNumber = $filter('formatPhoneNumber')($scope.items[$scope.currentItemId].prescriptionData.chosenDoctor.doctorPhoneNumber.split('-').join(''), '-');

                        }

                        if ($scope.items[$scope.currentItemId].prescriptionData.uploadFileInput != undefined
                        		&& $scope.items[$scope.currentItemId].prescriptionData.uploadFileInput.savedFilename != undefined
                        		&& $scope.items[$scope.currentItemId].prescriptionData.uploadFileInput.savedFilename.length > 0) {//uploadFile

                            if($scope.items[$scope.currentItemId].itemType == 'frame' || ($scope.items[$scope.currentItemId].itemType == 'contact' && $scope.clPrescriptionMode=='upload')){
                                $scope.items[$scope.currentItemId].prescriptionData.prescriptionMode = "uploadPrescription";

								if ($scope.fileEditMode) {
									//no changes on file during fileEditMode

									submitParams.fileName = $scope.items[$scope.currentItemId].prescriptionData.editFile.editFileName;
									submitParams.file = $scope.items[$scope.currentItemId].prescriptionData.editFile.editFilePath.substring($scope.items[$scope.currentItemId].prescriptionData.editFile.editFilePath.indexOf(',') + 1);

								} else {//no file edit mode
									angular.merge(submitParams, $scope.items[$scope.currentItemId].prescriptionData.uploadFileInput);
									$scope.items[$scope.currentItemId].prescriptionData.editFile={};
								}	
                            }else{
                            	//user is editing cl prescription from upload to callDoctor
                            	$scope.items[$scope.currentItemId].prescriptionData.editFile={};
                            	$scope.items[$scope.currentItemId].prescriptionData.uploadFileInput={};
                            }
                            

                        }

                        //Add parameters in prescriptionSaved
                        if ($scope.prescriptionClicked !== -1) {
                        	submitParams.prescriptionIdMyAccountSelected = $scope.prescriptionClicked.toString();
                        } else {
                        	submitParams.rx = "doctor";
                        	submitParams.prescriptionMode = $scope.items[$scope.currentItemId].prescriptionData.prescriptionMode;
                        }

                        if ($scope.items[$scope.currentItemId].itemType == 'contact') {//contact
                        	//format submit params
                            var patientDoB = $scope.items[$scope.currentItemId].prescriptionData.patient.dateOfBirth;
                            if(patientDoB.indexOf('/')==-1){
                            	$scope.items[$scope.currentItemId].prescriptionData.patient.dateOfBirth = patientDoB.substr(0,2)+'/'+ patientDoB.substr(2,2) + '/'+ patientDoB.substr(4,4);
                            }
                            
                            angular.merge(submitParams, $scope.items[$scope.currentItemId].prescriptionData.patient);
                            
                            var dob = $scope.items[$scope.currentItemId].prescriptionData.patient.dateOfBirth.split("/"); // MM dd yyy
                            submitParams.dateOfBirth = [dob[2],dob[0],dob[1]].join('-');
                            
                            submitParams.orderitemid = $scope.currentItemId;

                        }else {//frame
                        	//we use the lens orderItemId saved in field1 of the frame
                            submitParams.orderitemid = $scope.items[$scope.currentItemId].itemField1;
                            
                            if ($scope.pupillaryDistance && $scope.prescriptionClicked === -1) {
                                angular.merge(submitParams, $scope.items[$scope.currentItemId].prescriptionData.pupillaryDistance);
                            }
                        }
                    }
                    
                    if($scope.params.externalFlow == 'true'){
                    	submitParams.itemStatusUpdate = true.toString();
                    }
                    console.log("submitParams are", submitParams);

                    $http.post($scope.prescriptionSubmitURL, submitParams)
                        .then(function(response) {
                            if (response.data && response.data.status == 'Success') {

                                $scope.items[$scope.currentItemId].prescriptionId = response.data.prescriptionId;
                                $log.info("Prescription confirmed for item " + $scope.currentItemId);
                                /*console.log("=================")
                                console.log($scope.items[$scope.currentItemId].prescriptionData);
                                console.log("=================")
                                return;*/

                                if ($scope.useSamePrescriptionFrame && $scope.items[$scope.currentItemId].itemType == 'frame') {
                                    //in case of prescription copied, prescriptionData must be copied too
                                    angular.forEach($scope.items, function(itemData, id) {
										if (itemData.itemField1 == submitParams.cp_rx_oid) {
											$scope.items[$scope.currentItemId].prescriptionData ={};
											angular.merge($scope.items[$scope.currentItemId].prescriptionData,$scope.items[id].prescriptionData);
                                            // fix uploaded file not merged
                                            if($scope.items[id].prescriptionData.uploadFileInput.files && $scope.items[id].prescriptionData.uploadFileInput.files[0].name){
                                                $scope.items[$scope.currentItemId].prescriptionData.uploadFileInput.files[0].name = $scope.items[id].prescriptionData.uploadFileInput.files[0].name;
                                                $scope.items[$scope.currentItemId].prescriptionData.uploadFileInput.files[0].type = $scope.items[id].prescriptionData.uploadFileInput.files[0].type;
                                                $scope.items[$scope.currentItemId].prescriptionData.uploadFileInput.files[0].size = $scope.items[id].prescriptionData.uploadFileInput.files[0].size
                                            }
										}
									});    	
                                }

                                

                                if (submitParams.prescriptionMode == "uploadPrescription") {
                                    console.log('$scope.fileEditMode',$scope.fileEditMode)
                                    if (!$scope.fileEditMode) {
                                        $scope.items[$scope.currentItemId].prescriptionData.uploadFileInput.savedFilename = $scope.items[$scope.currentItemId].prescriptionData.uploadFileInput.savedFilename.replace(submitParams.orderitemid + "_RX.", response.data.prescriptionId + "_RX.");
                                        if(!$scope.previousSavedFileName) $scope.previousSavedFileName = $scope.items[$scope.currentItemId].prescriptionData.uploadFileInput.savedFilename;
                                    } else {

                                    	//in case of editMode with no changes at previous file
                                        if(!$scope.previousSavedFileName) $scope.previousSavedFileName = $scope.items[$scope.currentItemId].prescriptionData.uploadFileInput.savedFilename;
                                        $scope.items[$scope.currentItemId].prescriptionData.uploadFileInput.savedFilename = response.data.savedFileName;
                                        $scope.moveFileData(true);
                                    }
                                }
                                
                                var analyticsMethod = submitParams.prescriptionMode == "uploadPrescription" ? 'upload' : 'calldoctor';

                                //Analytics
								tealium_data2track.push({
								   'id': 'Checkout-Order-PrescriptionOk',
								   'Order_PrescriptionMethod': undefined
								});


                                if (goToNextStep) {
                                    $scope.isRedirecting = true;
                                    window.location.href = $scope.params.nextStepUrl;
                                } else {

                                    //reset 
                                    $scope.resetField();

						            //in case of first frame submitted,it stores its itemId for future frame prescriptionCopy 
                                    if ($scope.items[$scope.currentItemId].itemType == 'frame' && $scope.firstItemPrescriptionFrame == 0) {
                                        console.log("salvo $scope.firstItemPrescriptionFrame e setto le altre prescription id a null")
                                        $scope.firstItemPrescriptionFrame = $scope.currentItemId;
                                        
                                        if($scope.useSamePrescriptionFrame == true){
                                            // setto le altre prescription id dei frame a null altrimenti non posso sovrascriverle nel loop
                                            angular.forEach($scope.items, function(itemData, itemId) {
                                                if(itemData.itemId != $scope.currentItemId && itemData.itemType == $scope.items[$scope.currentItemId].itemType){
                                                    itemData.prescriptionId = null;
                                                    itemData.prescriptionProvided = false;
                                                    console.log('setto a null la prescr dellitem', itemData.itemId)
                                                }
                                            });
                                            console.log('$scope.items', $scope.items);
                                        }
                                    }

                                    //in case of first contact submitted,it stores its itemId for future contact prescriptionCopy 
                                    if ($scope.items[$scope.currentItemId].itemType == 'contact' && $scope.firstItemPrescriptionContact == 0) {
                                        console.log("salvo $scope.firstItemPrescriptionContact e setto le altre prescription id a null")
                                        $scope.firstItemPrescriptionContact = $scope.currentItemId;
                                        
                                        if($scope.useSamePrescriptionContact == true){
                                            // setto le altre prescription id dei frame a null altrimenti non posso sovrascriverle nel loop
                                            angular.forEach($scope.items, function(itemData, itemId) {
                                                if(itemData.itemId != $scope.currentItemId && itemData.itemType == $scope.items[$scope.currentItemId].itemType){
                                                    itemData.prescriptionId = null;
                                                    itemData.prescriptionProvided = false;
                                                    console.log('setto a null la prescr dellitem', itemData.itemId)
                                                }
                                            });
                                            console.log('$scope.items', $scope.items);
                                        }
                                    }



                                    /*var rxNeededItems = $filter('rxNeeded')($scope.items);
									var nextItemId = 0;
									if (rxNeededItems.length == 0) {
										angular.forEach($scope.items, function(itemData, itemIndex) {
											if (itemData.prescriptionSkipped != true && itemData.itemId != $scope.currentItemId && itemData.prescriptionData == undefined) {
												nextItemId = itemData.itemId;
											}
										});
									} else {
										angular.forEach(rxNeededItems, function(itemData, itemIndex) {
											if (itemData.prescriptionSkipped != true && itemData.itemId != $scope.currentItemId) {
												nextItemId = itemData.itemId;
											}
										});
									}*/
                                    var rxNeededItems = $filter('rxNeededPerType')($scope.items, $scope.items[$scope.currentItemId].itemType);
                                    console.log('rxNeededItems', rxNeededItems)
									var nextItemId = 0;
									if (rxNeededItems.length == 0) {
                                        $scope.previousSavedFileName = null;
                                        console.log("ALTRI ITEM TYPE NON TROVATI")
                                        var otherPossibileItemType = $filter('rxNeededPerType')($scope.items, ($scope.items[$scope.currentItemId].itemType == 'frame') ? 'contact':'frame');
                                        console.log('otherPossibleItemType', otherPossibileItemType);
                                        if(otherPossibileItemType.length){
                                            var i, itemData;
                                            for(i= 0; i < otherPossibileItemType.length; i++){
                                                itemData = otherPossibileItemType[i];
                                                if(itemData.prescriptionData) delete itemData.prescriptionData;
                                                if (itemData.prescriptionSkipped != true && itemData.itemId != $scope.currentItemId && itemData.prescriptionData == undefined) {
                                                    $scope.currentlyEditing = itemData.itemType;
                                                    console.log('switching to item type', $scope.currentlyEditing)
                                                    nextItemId = itemData.itemId;
                                                    break;
                                                }
                                            }
                                        }else{
                                            console.log("NON TROVO PIU ITEMS CON RX NEEDED");
                                            $scope.isRedirecting = true;
                                            window.location.href = $scope.params.nextStepUrl;
                                        }
										/*angular.forEach($scope.items, function(itemData, itemIndex) {
											if (itemData.prescriptionSkipped != true && itemData.itemId != $scope.currentItemId && itemData.prescriptionData == undefined) {
												nextItemId = itemData.itemId;
											}
										});*/
									} else {
                                        if(($scope.useSamePrescriptionFrame == true && $scope.items[$scope.currentItemId].itemType == 'frame') || ($scope.useSamePrescriptionContact == true && $scope.items[$scope.currentItemId].itemType == 'contact')){
                                             
                                            nextItemId = rxNeededItems[0].itemId;

                                            $scope.currentItemId = nextItemId;
                                            console.log("Invio la prossima prescription per l'item id", nextItemId);
                                            $scope.confirmPrescription(false);
                                            return;
                                            
                                        }else{
                                            // single mode
                                            var i, itemData;
                                            for(i= 0; i < rxNeededItems.length; i++){
                                                var itemData = rxNeededItems[i];
                                                if (itemData.prescriptionSkipped != true && itemData.itemId != $scope.currentItemId) {
                                                    nextItemId = itemData.itemId;
                                                    break;
                                                }
                                            }
                                        }
									}

                                    $scope.currentItemId = nextItemId;
                                    $scope.setupPrescriptionData();
                                    $scope.allPrescriptionProvided = $scope.allRXProvided(false);
                                    console.log("ITEMS USERDATA", $scope.items)
                                    window.scrollTo(0, 0);
                                }
                            } else {
                                $log.error('Error: no prescription submitted for item ' + $scope.currentItemId);
                                 $scope.errors["submitPrescriptionError"].value = true;

								tealium_data2track.push({
									'id' : 'Error', 
									'Error_Code' : 'No prescription submitted for item ' + $scope.currentItemId,
									'Error_Source' : 'Server'
								});

                            }
                        }, function(error) {
                            $log.error('Error: no prescription submitted for item ' + $scope.currentItemId);
                            $scope.errors["submitPrescriptionError"].value = true;
                            tealium_data2track.push({
								'id' : 'Error', 
								'Error_Code' : 'No prescription submitted for item ' + $scope.currentItemId,
								'Error_Source' : 'Server'
							});

                        });

                } else {
                    console.log("C")
                    //missing patient data
                    $scope.errors["invalidPatientForm"].value = true;
                    $scope.patientForm.patientFirstName.$setTouched();
                    $scope.patientForm.patientLastName.$setTouched();
                    $scope.patientForm.patientDateOfBirth.$setTouched();

                    var chosenDoctor = ($scope.items[$scope.currentItemId].prescriptionData) ? $scope.items[$scope.currentItemId].prescriptionData.chosenDoctor : null;
                    var uploadedFile = ($scope.items[$scope.currentItemId].prescriptionData) ? $scope.items[$scope.currentItemId].prescriptionData.uploadFileInput : null;
                    
                    if ($scope.items[$scope.currentItemId].itemType == 'contact' && !$scope.items[$scope.currentItemId].prescriptionData){
                        $scope.errors['missingDoctorData'].value = true;
                        if($scope.clPrescriptionMode == 'upload') $scope.errors['uploadNoFileUploadedError'].value = true;
                    }else if ($scope.items[$scope.currentItemId].itemType == 'contact' && chosenDoctor && uploadedFile) {
                        if (Object.keys(chosenDoctor).length === 0) {
                            $scope.errors['missingDoctorData'].value = true;
                        } else if ($scope.clPrescriptionMode == 'upload' && Object.keys(uploadedFile).length === 0) {
                            $scope.errors['uploadError'].value = true;
                        }

                        $anchorScroll('patientForm');
                    }
                }

            } else {//prescriptionProvided = false
                console.log('D1 - la prescr provided è false');
                if($scope.items[$scope.currentItemId].prescriptionId!=null){
                	//user started to edit his prescription but he didnt't confirm changes
                    console.log('D2 - ho una prescription id e setto prescr provided a true')
                    $scope.items[$scope.currentItemId].prescriptionProvided = true;
                    
                    //retrieve doctor data if no changes
                    if(($scope.items[$scope.currentItemId].prescriptionData.prescriptionMode == 'callDoctor' || $scope.items[$scope.currentItemId].itemType == 'contact') && $scope.prevChosenDoctor.doctorName != undefined){
                    	angular.merge($scope.items[$scope.currentItemId].prescriptionData.chosenDoctor,$scope.prevChosenDoctor);
                    }


                	if (goToNextStep) {
                        $scope.isRedirecting = true;
						window.location.href = $scope.params.nextStepUrl;
					} else {

						//reset
						$scope.resetField();

						//in case of first frame submitted,it stores its itemId for future frame prescriptionCopy 
						if ($scope.items[$scope.currentItemId].itemType == 'frame' && $scope.firstItemPrescriptionFrame == 0) {
                            console.log("salvo il current item id in first item prescription e setto copyPrescription a true")
							$scope.firstItemPrescriptionFrame = $scope.currentItemId;
							$scope.useSamePrescriptionFrame = true;
						}


						var rxNeededItems = $filter('rxNeeded')($scope.items);
                        console.log("cerco il prossimo elemento")
						var nextItemId = 0;
						angular.forEach(rxNeededItems, function(itemData, itemIndex) {
							if (itemData.prescriptionSkipped != true && itemData.itemId != $scope.currentItemId) {
								nextItemId = itemData.itemId;
							}
						});

						$scope.currentItemId = nextItemId;
						$scope.setupPrescriptionData();
						$scope.allPrescriptionProvided = $scope.allRXProvided(false);
					}
                }else{
                    console.log("E")
                	//no prescriptionData : no prescription mode chosen 
					if($scope.items[$scope.currentItemId].itemType == 'frame'){
					    $scope.errors['missingPrescriptionData'].value = true;
					}else if($scope.items[$scope.currentItemId].itemType == 'contact'){
						$scope.errors['missingDoctorData'].value = true;
                        $anchorScroll('patientForm');
                        var uploadedFile = ($scope.items[$scope.currentItemId].prescriptionData) ? $scope.items[$scope.currentItemId].prescriptionData.uploadFileInput : null;
                        console.log(uploadedFile)
                        if ((!uploadedFile || Object.keys(uploadedFile).length === 0) && $scope.clPrescriptionMode == 'upload'){
                            $scope.errors['uploadNoFileUploadedError'].value = true;
                        }
					}

					if ($scope.items[$scope.currentItemId].itemType == 'contact' && $scope.patientForm.$invalid) {
						$scope.errors["invalidPatientForm"].value = true;
						$scope.patientForm.patientFirstName.$setTouched();
						$scope.patientForm.patientLastName.$setTouched();
						$scope.patientForm.patientDateOfBirth.$setTouched();
						$anchorScroll('patientForm');
					}
                }

                
            }
        }

        $scope.editPrescription = function(itemId) {
            if($scope.currentItemId == itemId) return;
            if( $scope.items[$scope.currentItemId].itemType == $scope.items[itemId].itemType && 
                $scope.items[$scope.currentItemId].itemType == 'contact' && 
                $scope.useSamePrescriptionContact == true){
                    return;
                }else{
                    $scope.currentlyEditing = $scope.items[itemId].itemType;
                }
            //current item prescription provided check
            if ($scope.items[$scope.currentItemId].prescriptionId == null) {
				$scope.items[$scope.currentItemId].prescriptionProvided = false;
				$scope.setupPrescriptionData();
            }

            $scope.items[itemId].prescriptionProvided = true;
            $scope.currentItemId = itemId;
            
            //prescriptionData clean according to prescriptionMode
            if ($scope.items[itemId].prescriptionData != undefined) {
	            if ($scope.items[itemId].prescriptionData.prescriptionMode == "uploadPrescription") {
	                if($scope.items[itemId].itemType == 'frame'){
	                	$scope.items[itemId].prescriptionData.chosenDoctor={};
	
	                }else if($scope.items[itemId].itemType == 'contact'){
	                	$scope.clPrescriptionMode='upload';
	                }
	
	                //enter fileEditMode in case of uploadPrescription : user will leave fileEditMode in case of new file chosen
	                $scope.fileEditMode = true;
	                if($scope.items[$scope.currentItemId].prescriptionData.editFile.editFilePath==undefined){
	                	$scope.moveFileData(false);
	                }				
	
	            } else if($scope.items[itemId].prescriptionData.prescriptionMode == "callDoctor") {
	            	$scope.items[itemId].prescriptionData.editFile={};
	            	$scope.items[itemId].prescriptionData.uploadFileInput={};
                    if($scope.items[itemId].itemType == 'contact'){
	                	$scope.clPrescriptionMode='call-doctor';
	                }
	            }
            }
            
            
            //check if user starts to edit first submitted frame item 
            if ($scope.items[itemId].itemType == 'frame' && itemId == $scope.firstItemPrescriptionFrame) {
                $scope.firstItemPrescriptionFrame = 0;
                $scope.useSamePrescriptionFrame = false;
            }
            if ($scope.items[itemId].itemType == 'contact' && itemId == $scope.firstItemPrescriptionContact) {
                $scope.firstItemPrescriptionContact = 0;
                $scope.useSamePrescriptionContact = false;
            }

            $scope.allPrescriptionProvided = $scope.allRXProvided(true);

        }

        
        $scope.moveFileData = function(fromEdit){
        	if(fromEdit){
        	    $scope.items[$scope.currentItemId].prescriptionData.uploadFileInput.path = $scope.items[$scope.currentItemId].prescriptionData.editFile.editFilePath;
				$scope.items[$scope.currentItemId].prescriptionData.uploadFileInput.files[0].name = $scope.items[$scope.currentItemId].prescriptionData.editFile.editFileName;
        	    $scope.items[$scope.currentItemId].prescriptionData.uploadFileInput.files[0].type = $scope.items[$scope.currentItemId].prescriptionData.editFile.editFileType;
        	    $scope.items[$scope.currentItemId].prescriptionData.uploadFileInput.files[0].size = $scope.items[$scope.currentItemId].prescriptionData.editFile.editFileSize;
        	    $scope.items[$scope.currentItemId].prescriptionData.uploadFileInput.previewAllowed = $scope.items[$scope.currentItemId].prescriptionData.editFile.editPreviewAllowed;
        	}else{
        		$scope.items[$scope.currentItemId].prescriptionData.editFile.editFilePath = $scope.items[$scope.currentItemId].prescriptionData.uploadFileInput.path;
				$scope.items[$scope.currentItemId].prescriptionData.editFile.editFileName = $scope.items[$scope.currentItemId].prescriptionData.uploadFileInput.files[0].name;
				$scope.items[$scope.currentItemId].prescriptionData.editFile.editFileSize = $scope.items[$scope.currentItemId].prescriptionData.uploadFileInput.files[0].size;
				$scope.items[$scope.currentItemId].prescriptionData.editFile.editFileType = $scope.items[$scope.currentItemId].prescriptionData.uploadFileInput.files[0].type;
				$scope.items[$scope.currentItemId].prescriptionData.editFile.editPreviewAllowed = $scope.items[$scope.currentItemId].prescriptionData.uploadFileInput.previewAllowed; 
        	}

        }

        $scope.resetField = function() {
 
            $scope.doctors = [];
            $scope.searchTentative = 0;
            $scope.pupillaryDistance = false;
            
            $scope.resetErrors();

            $scope.prevChosenDoctor = {};

            $scope.patientForm.$setUntouched();
            $scope.addDoctorForm.$setUntouched();

            $scope.fileEditMode = false;

        }

        $scope.formatDoctorData = function(chosenDoctor){
        	var formattedDoctor = {};
        	formattedDoctor.doctorAddress = chosenDoctor.doctorAddress.address1;
        	formattedDoctor.doctorCity = chosenDoctor.doctorAddress.city;
        	formattedDoctor.doctorState = chosenDoctor.doctorAddress.stateProvince;
        	formattedDoctor.doctorZip = chosenDoctor.doctorAddress.zipPostalCode;
        	formattedDoctor.doctorFax = chosenDoctor.doctorFaxNumber;
        	formattedDoctor.doctorClinic = chosenDoctor.officeName;
        	formattedDoctor.doctorName = chosenDoctor.doctorName;

            return formattedDoctor;

        }

        $scope.showFileDetails = function() {
	        var $modal = $("#rx_modal_image");
            var rxFileName;
            if($scope.items[$scope.currentItemId].prescriptionData.uploadFileInput.files != undefined && $scope.items[$scope.currentItemId].prescriptionData.uploadFileInput.files[0].name!=undefined){
            	rxFileName = $filter('nospace')($scope.items[$scope.currentItemId].prescriptionData.uploadFileInput.files[0].name);
            }else{
            	rxFileName = $filter('nospace')($scope.items[$scope.currentItemId].prescriptionData.editFile.editFileName);
            }

            //fileName_orderItemId_RX.fileExtension
            var rxFileNameSplitted = rxFileName.split('.');
            var rxFileNamePt1;
            for(var i = 0; i<rxFileNameSplitted.length -1 ; i++){
                if(i==0){
                    rxFileNamePt1 = rxFileNameSplitted[i];
                }else{
                	rxFileNamePt1 = rxFileNamePt1 + '.' + rxFileNameSplitted[i];
                }
            }
            if($scope.items[$scope.currentItemId].itemType == 'frame'){
                rxFileName = rxFileNamePt1+'_'+$scope.items[$scope.currentItemId].itemField1+'_RX.'+rxFileNameSplitted[rxFileNameSplitted.length-1];
            }else{
            	rxFileName = rxFileNamePt1+'_'+$scope.currentItemId+'_RX.'+rxFileNameSplitted[rxFileNameSplitted.length-1];
            }
             $http.get($scope.downloadImageURL + $scope.params.userId + '/' + rxFileName,{responseType : 'blob'})
	            .then(function(response) {
	                
	            	 var blob = response.data;
					 $modal.find('.rx-image').attr('src', window.URL.createObjectURL(blob));
					 $modal.toggleClass('hidden');
					 $('html,body').toggleClass('hidden-overflow');
					 
	
	            }, function(error) {
	                $log.error('Error getting image from service');
	                obj = {
            			id: 'Error',
            			Error_Source: "Server",
            			Error_Code: "RX panel",
            			Error_Message: 'Unable to load prescription details'
            		}
            		tealium_data2track.push(obj);
	            }
	        );

        }

        // Angular Date Picker Initialization
        $scope.datepickerMaxDate = new Date();
        var startDate = new Date();
        startDate.setFullYear( startDate.getFullYear() - 16 );
        $scope.dateSet = startDate;
        console.log($scope.dateSet, $scope.datepickerMaxDate);
        $scope.dobDatePickerToggle = false;
        $scope.dobDatePickerToggleFn = function(isVisible = null){
            if(isVisible === null){
                $scope.dobDatePickerToggle = !$scope.dobDatePickerToggle;
            }else{
                $scope.dobDatePickerToggle = isVisible;
            }
        }

    }
]);


app.filter('range', function() {
    return function(input, from, to) {
        to = parseInt(to, 10);
        from = parseInt(from, 10);
        for (var i = from; i < to; i++) {
            input.push(i);
            //console.log(i);
        }
        return input;
    };
});

app.filter('rxNeeded', function() {
    return function(items) {
        var out = [];
        angular.forEach(items, function(item, itemId) {
            if (item.prescriptionId == null) {
                out.push(item);
            }
        });
        return out;
    }
});

app.filter('rxNeededPerType', function() {
    return function(items, type) {
        var out = [];
        angular.forEach(items, function(item, itemId) {
            if (item.prescriptionId == null && item.itemType == type) {
                out.push(item);
            }
        });
        return out;
    }
});

app.filter('rxProvided', function() {
    return function(items) {
        var out = [];
        angular.forEach(items, function(item, itemId) {
            if (item.prescriptionId != null) {
                out.push(item);
            }
        });
        return out;
    }
});

app.filter('isContact', function() {
    return function(items) {
        var out = [];
        angular.forEach(items, function(item, itemId) {
            if (item.itemType === "contact") {
                out.push(item);
            }
        });
        return out;
    }
});

app.filter('isFrame', function() {
    return function(items) {
        var out = [];
        angular.forEach(items, function(item, itemId) {
            if (item.itemType === "frame") {
                out.push(item);
            }
        });
        return out;
    }
});

//direttiva per intercettare la scelta di un file di input 
app.directive("filesInput", function() {
    return {
        require: "ngModel",
        link: function postLink(scope, elem, attrs, ngModel) {
            elem.on("change", function(e) {
            	scope.fileLoading = true;
                var files = elem[0].files;
                var reader = new FileReader();

                // Closure to capture the file information.
                reader.onload = (function(theFile) {
                    return function(e) {
                        ngModel.$setViewValue({
                            'files': files,
                            'path': e.target.result
                        });
                    };
                })(files[0]);

                // Read in the image file as a data URL.
                reader.readAsDataURL(files[0]);
            })
        }
    }
});

//filtro per formattare numeri di telefono/fax
app.filter("formatPhoneNumber", function() {
    return function(number, filterElem) {
        if (number != undefined) {
            var formattedNumber;
            switch (filterElem) {
                case '()':
                    formattedNumber = '($1) $2-$3';
                    break;
                case '-':
                    formattedNumber = '$1-$2-$3';
                    break;
                default:
            }
            var phone1 = number.substr(0, 3);
            var phone2 = number.substr(3, 3);
            var phone3 = number.substr(6);
            return formattedNumber.replace('$1', phone1).replace('$2', phone2).replace('$3', phone3);
        }

    };
});


//direttiva per verificare il formato della data di nascita
app.directive('dobValidation', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attr, mCtrl) {
        	element.on('keydown', function (e) {
        		    var key = e.keyCode;
					if (this.value.length >10) {
						e.preventDefault(); //no nothing
						this.value = this.value.substr(0, 10);
					}else if(this.value.length == 10){
						if((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)){
							e.preventDefault(); //no nothing
						}
					}
			});

            function myValidation(value) {
                var myDate = new Date(value);
                var currDate = new Date();
                if (value.length == 10 && myDate.toString() != "Invalid Date" && myDate < currDate) {
                    mCtrl.$setValidity('dob', true);
                    scope.dobDatePickerToggleFn(false);
                } else {
                    mCtrl.$setValidity('dob', false);
                     if (value.length > 10){
                     	value=value.substr(0,10);
                     }
                }
                return value;
            }
            mCtrl.$parsers.push(myValidation);
        }
    };
});


app.filter('nospace', function () {
    return function (value) {
        return (!value) ? '' : value.replace(/ /g, '');
    };
});
;
app.controller('PLPController', ['$scope', '$rootScope', '$window', 'lcPrescription', '$cookies', '$http', '$location', '$compile', '$timeout', 'frameAdvisorFactory', '$log',
    function ($scope, $rootScope, $window, lcPrescription, $cookies, $http, $location, $compile, $timeout, frameAdvisorFactory, $log) {
	
		// redesign variables
		$scope.storeId = null;
		$scope.langId = null;
		$scope.catalogId = null;
		$scope.categoryId = null;
	
		$scope.openFilters = null;
		$scope.openPrescriptionFilter = null;
		$scope.currentFilters = {};
		$scope.appliedFilters = [];
		$scope.baseFiltersURL = location.pathname;
		$rootScope.brandText = '';
		$scope.contactsPLP = false;
		$scope.suggestedFilters = {};
		$scope.labelsToRemove = ['Goggles', 'Rox_lens', 'Rox_service']; // LCDP-9298
		
		// endpoints
		var FILTERS_GENERATE_SEARCHPAGE_URL = '/search/resources/store/#storeId#/productview/bySearchTerm/#searchTerm#?storeId=#storeId#&catalogId=#catalogId#&searchType=1&responseFormat=json&langId=#langId#&pageNumber=1&pageSize=1';

		var FILTERS_GENERATE_PLP_URL = '/search/resources/store/#storeId#/productview/byCategory/#categoryId#?storeId=#storeId#&catalogId=#catalogId#&searchType=1&responseFormat=json&langId=#langId#&pageNumber=1&pageSize=1';
		
		if (window.location.href.indexOf('-sku') > -1 || window.location.href.indexOf('searchType=101') > -1){
		    FILTERS_GENERATE_SEARCHPAGE_URL = '/search/resources/store/#storeId#/productview/bySearchTerm/#searchTerm#?storeId=#storeId#&catalogId=#catalogId#&searchType=101&responseFormat=json&langId=#langId#&pageNumber=1&pageSize=1';
		    FILTERS_GENERATE_PLP_URL = '/search/resources/store/#storeId#/productview/byCategory/#categoryId#?storeId=#storeId#&catalogId=#catalogId#&searchType=101&responseFormat=json&langId=#langId#&pageNumber=1&pageSize=1';
		}
	
		// prescription cookie value
		var PRESCRIPTIONFLOW_COOKIE = 'prescriptionFlow';
	
        // prescription values
        $scope.od = {};
        $scope.os = {};

        // prescription module params
        $scope.isModuleEnabled = false;
        $scope.params = null;
        $scope.errorEmpty = false;
        $scope.errorNoPrescription = false;
        $scope.isFormVisible = false;
    	$scope.selectedSphOs = null;
    	$scope.selectedSphOd = null;
    	$scope.selectedCylOs = null;
    	$scope.selectedCylOd = null;
    	$scope.selectedCylOd = null;

		$scope.faPluginState = frameAdvisorFactory.state;

		$scope.openSizeAdv = function () {
			$scope.openFilters = false
			frameAdvisorFactory.openSizeAdvisor()
		}

		$scope.useMySizeOn = JSON.parse(sessionStorage.getItem("sa-use-my-size")) || false
		sessionStorage.removeItem("sa-use-my-size")
		$scope.useMySize = function () {
			size = $scope.faPluginState.sa.sizeData.label
			frameSizeFacet = $scope.currentFilters.facetView.find(f => f.name === "FRAME_SIZE_DISPLAY")
			facetName = frameSizeFacet.value
			frameSizeEntry = frameSizeFacet.entry.find(s => s.label === size)
			
			if (frameSizeEntry) {
				$scope.mySizeNotFound = false

				if (!$scope.useMySizeOn) {
					$scope.currentAppliedFacets[facetName] = [] // clear all frame size filters
				}
				$scope.useMySizeOn = !$scope.useMySizeOn
				sessionStorage.setItem("sa-use-my-size", $scope.useMySizeOn)
				$scope.updateFilter(frameSizeFacet, frameSizeEntry)
				
				if ($scope.useMySizeOn) {
					// send analytics when enabling filter
					try{
						tealium_data2track.push({
							'id' : 'Event',
							'Search_ResultItemsQnt': frameSizeEntry.count.toString(),
							'Events_SearchFiltering': '1',
							'Search_FacetValues_Type': 'SizeGenius',
						});
					} catch (error) {
						$log.error(
							'Error during tealium_data2track push. ' +
								error
						);
					}
				}
			} else {
				$scope.mySizeNotFound = true
			}
		}
		
		$scope.mobileTwoColumns = false;
		$scope.setMobileTwoColumns = function(value) {
			$scope.mobileTwoColumns = !!value;

			$timeout(function() {
				// might need to show a loader because there are many slick instances on the page
				window.dispatchEvent(new Event('resize'));
				angular.element(document.querySelectorAll('.slick-slider')).slick('refresh');
			}, 0); // delay refresh until next digest cycle
		};
    	
        const errorMessage = 'ERROR while retrieving prescription data';
        
        $rootScope.wrapAngular = function(elementFunc){
  		    $compile(elementFunc)($scope);
  		}
        
        $scope.init = function(params) {
        	
        	$scope.storeId = params.storeId;
        	$scope.langId = params.langId;
    		$scope.catalogId = params.catalogId;
        	$scope.categoryId = params.categoryId;
        	$scope.searchTerm = params.searchTerm;
        	$scope.lifecycleFacet = params.lifecycleFacet;
        	$scope.inStockFacet = params.inStockFacet;
			$scope.inStoreOnlyFacet = params.inStoreOnlyFacet;
        	$scope.openFilters = false;
        	$scope.openPrescriptionFilter = false;
        	$scope.contactsPLP = params.contactsPLP ? params.contactsPLP : false;
        	$scope.prescriptionFilterEnabled = params.prescriptionFilterEnabled;
        	
        	$scope.isEA = params.isEA ? params.isEA : false;
        	$scope.isEAOfferPriceEnabled = params.isEAOfferPriceEnabled;
        	
        	$scope.generatePrescriptionValues();
        	$scope.currentAppliedFacets = $scope.getUrlFacets() || [];
        	$scope.getFilters();
        	
        	var prescriptionFlow = $cookies.get(PRESCRIPTIONFLOW_COOKIE);
        	
        	// AB testing enabler
        	if($scope.prescriptionFilterEnabled && prescriptionFlow && prescriptionFlow == 'true') {
        		$scope.isModuleEnabled = true;
	            $scope.params = params;
	
	            lcPrescription.init($scope.params.storeId, $scope.params.catalogId);
	
	            lcPrescription.loadPrescription().then(
	                function (response) {
	                	
	                	$scope.selectedCylOs = null;
                    	$scope.selectedCylOd = null;
                    	
	                    if (response !== undefined && response !== null) {
	                        $log.log('Prescription loaded');
	                        $scope.isFormVisible = false;
	                        $scope.selectedSphOd = response.SPH.OD > 0 ? '+' + response.SPH.OD : response.SPH.OD;
	                        $scope.selectedSphOs = response.SPH.OS > 0 ? '+' + response.SPH.OS : response.SPH.OS;
	                        
	                        if(response.CYL){
		                        $scope.selectedCylOd = response.CYL.OD > 0 ? '+' + response.CYL.OD : response.CYL.OD;
		                        $scope.selectedCylOs = response.CYL.OS > 0 ? '+' + response.CYL.OS : response.CYL.OS;
	                        }
	                        
	                    } else if (response == null) {
	                        $log.log('No prescription data found');
	                        $scope.isFormVisible = true;
	                        $scope.selectedSphOs = null;
	                    	$scope.selectedSphOd = null;
	                    }
	                    $scope.$apply();
	                },
	                function (error) {
	                    $log.error(error);
	                }
	            );
        	}

			function updateDetailsNewSlide(slickObj) {
				$(slickObj.$slides).each(function(index,item) {
					if ($(this).hasClass('slick-active')) {
						var nextSlickClasses =  $(this).attr('class').split(' ');
						var nextProductId = null;
						$.each(nextSlickClasses, function(index, value) {
							if (value.indexOf('product-container-') > -1)
								nextProductId = value.replace('product-container-', '');
						});
						if (nextProductId) {
							var nextProductListPrice = $('#' + nextProductId + '_list_price').val();
							var nextProductOfferPrice = $('#' + nextProductId + '_offer_price').val();
							var nextProductIsAmountOff = $('#' + nextProductId + '_amount_off').val();
							var nextProductAttributes = $('#' + nextProductId + '_attributes').val();
							nextProductAttributes = nextProductAttributes.replace(/[\r\t\n]/g, '')
							nextProductAttributes = nextProductAttributes.replace(/ /g, '')
							nextProductAttributes = nextProductAttributes.split('|');

							var currProdId;
							var sliderId = $(slickObj.$slider[0]).attr('id');
							var sliderIdElements = sliderId.split('_');
							var indexDiv = sliderIdElements.indexOf('div');
							currProdId = sliderIdElements[indexDiv - 1];

							var badge_div = $('#badges_' + currProdId);
							var subBadge_div = $('#sub-badges_' + currProdId);

							var MAX_VISIBLE_BADGES = $("#MAX_VISIBLE_BADGES").val();
							// BIG BADGE
							// Hide all big badges 
							$('#badges_' + currProdId + ' > span').each(function(index,item) {
								item.setAttribute('style', 'display: none');
							});
							// SUB BADGE
							var myPolarized = $('#sub-badges_' + currProdId + ' > .sub-badge-polarized.hide')
							// Hide badge
							if(myPolarized.length == 0) {
								$('#sub-badges_' + currProdId + ' > .sub-badge-polarized').addClass('hide');
							}
							var badgeCount = 0;
							for (let i = 0; i < nextProductAttributes.length; i++) {
								const el = nextProductAttributes[i];
								if(el != "") {
									// BIG BADGES
									if(el == 'prerelease' && badgeCount <= MAX_VISIBLE_BADGES) {
										$('#badges_' + currProdId + ' > .badge-pre-release').removeAttr('style');
										badgeCount += 1;
									} else if (el == 'new' && badgeCount <= MAX_VISIBLE_BADGES && !nextProductAttributes.includes('best')) {
										const indexprodType = nextProductAttributes.findIndex(element => {
											if (element.includes('prodType')) {
											  return true;
											}
										});
										if(indexprodType != -1) {
											if(nextProductAttributes[indexprodType].split('=')[1] != 'Electronics') {
												$('#badges_' + currProdId + ' > .badge-new').removeAttr('style');
												badgeCount += 1;
											}
										} else {
											$('#badges_' + currProdId + ' > .badge-new').removeAttr('style');
											badgeCount += 1;
										}
									} else if (el == 'instoreonly' && badgeCount <= MAX_VISIBLE_BADGES) {
										$('#badges_' + currProdId + ' > .badge-in-store-only').removeAttr('style');
										badgeCount += 1;
									} else if (el == 'exclusive' && badgeCount <= MAX_VISIBLE_BADGES) {
										$('#badges_' + currProdId + ' > .badge-exclusive').removeAttr('style');
										badgeCount += 1;
									} else if (el == 'limited' && badgeCount <= MAX_VISIBLE_BADGES) {
										$('#badges_' + currProdId + ' > .badge-limited-availability').removeAttr('style');
										badgeCount += 1;
									} else if (el == 'best' && badgeCount <= MAX_VISIBLE_BADGES) {
										$('#badges_' + currProdId + ' > .badge-best-seller').removeAttr('style');
										badgeCount += 1;
									}
									//SUB BADGES
									else if (el == 'polarized') {
										$('#sub-badges_' + currProdId + ' > .sub-badge-polarized').removeClass('hide');
									}												
								}
							}

							// Prices
							var slickPriceDiv = $('#' + $(slickObj.$slider[0]).attr('id') + '0');
							if (nextProductListPrice === nextProductOfferPrice) {
								slickPriceDiv.find('.price.listPrice').text('');
								if (slickPriceDiv.find('span.price.offerprice').length > 0)
									slickPriceDiv.find('span.price.offerprice').text(nextProductOfferPrice);
								else if (slickPriceDiv.find('div.price.offerprice span.offer-price').length > 0)
									slickPriceDiv.find('div.price.offerprice span.offer-price').text(nextProductOfferPrice);
								slickPriceDiv.find('.badge-BF').text('');
							} else {
								var nextProductListPriceValue = parseFloat(nextProductListPrice.replace('$', ''));
								var nextProductOfferPriceValue = parseFloat(nextProductOfferPrice.replace('$', ''));
								
								if (nextProductListPriceValue > nextProductOfferPriceValue) {
									var discountPercentage = (100 - (nextProductOfferPriceValue / nextProductListPriceValue) * 100);
									var amountOffDiscountPercentage = nextProductListPriceValue - nextProductOfferPriceValue;
									
									if (slickPriceDiv.find('.price.listPrice').length > 0)
										slickPriceDiv.find('.price.listPrice').text(nextProductListPrice);
									else {
										slickPriceDiv.prepend("<span class='price listPrice'></span>");
										slickPriceDiv.find('.price.listPrice').text(nextProductListPrice);
									}

									if (slickPriceDiv.find('span.price.offerprice').length > 0)
										slickPriceDiv.find('span.price.offerprice').text(nextProductOfferPrice);
									else if (slickPriceDiv.find('div.price.offerprice span.offer-price').length > 0)
										slickPriceDiv.find('div.price.offerprice span.offer-price').text(nextProductOfferPrice);

									if(nextProductIsAmountOff == 'true') {
										if (slickPriceDiv.find('.badge-BF').length > 0)
											slickPriceDiv.find('.badge-BF').text('$' + amountOffDiscountPercentage + ' Off');
										else {
											slickPriceDiv.append("<span class='badge-BF'></span>");
											slickPriceDiv.find('.badge-BF').text('$' + amountOffDiscountPercentage + ' Off');
										}
									} else {
										if (slickPriceDiv.find('.badge-BF').length > 0)
											slickPriceDiv.find('.badge-BF').text(discountPercentage + '% Off');
										else {
											slickPriceDiv.append("<span class='badge-BF'></span>");
											slickPriceDiv.find('.badge-BF').text(discountPercentage + '% Off');
										}
									}
								}
							}
						}
					}
				});
			}
			
			// Hovering slick-arrows, make the color always visible
			var productCarousel = $('.slick-prod-thumb');
			productCarousel.on('init', function(evt, slickObj){								
				if(slickObj.slideCount > 1){
					$(slickObj.$nextArrow).on('mouseenter', function(e){
						$(slickObj.$slides).each(function(index,item){
							angular.element($(this).find('a')[0]).triggerHandler('mouseenter');
						});
					});
					$(slickObj.$prevArrow).on('mouseenter', function(e){
						$(slickObj.$slides).each(function(index,item){
							angular.element($(this).find('a')[0]).triggerHandler('mouseenter');
						});
					});

					$(slickObj.$prevArrow).add($(slickObj.$nextArrow)).on('click', function(e) {						
						e.stopImmediatePropagation();
						//updateDetailsNewSlide(slickObj);					
					});
					$(slickObj.$slider[0]).on('afterChange', function(event, slick, currentSlide, nextSlide){
						event.stopImmediatePropagation();
						updateDetailsNewSlide(slickObj);
					});
				}
			});
			
			if(window.innerWidth > 480){
				// scroll dash button with mouse/desktop
				var slider = document.querySelector(".dash-buttons-holder .row");
				var isDown = false;
				var startX;
				var scrollLeft;
				if(slider != undefined){
					slider.addEventListener("mousedown", e => {
					  isDown = true;
					  slider.classList.add("active");
					  startX = e.pageX - slider.offsetLeft;
					  scrollLeft = slider.scrollLeft;
					});
					slider.addEventListener("mouseleave", () => {
					  isDown = false;
					  slider.classList.remove("active");
					});
					slider.addEventListener("mouseup", () => {
					  isDown = false;
					  slider.classList.remove("active");
					});
					slider.addEventListener("mousemove", e => {
					  if (!isDown) return;
					  e.preventDefault();
					  var x = e.pageX - slider.offsetLeft;
					  var walk = x - startX;
					  slider.scrollLeft = scrollLeft - walk;
					});
				}
			}
			if(window.localAppliedFilters && window.localAppliedFilters['ELECTRONICS'] && window.localAppliedFilters['ELECTRONICS'].length > 0 && window.localAppliedFilters['Glasses']){
				var electronicsFacetEntry = window.localAppliedFilters['ELECTRONICS'][0];
				window.localAppliedFilters['Glasses'].push(electronicsFacetEntry);
				window.localAppliedFilters['ELECTRONICS'].splice(0,1);
			}
        };
        
        //submitPrescription
        $scope.submitPrescription = function() {
            $scope.errorEmpty = false;
            $scope.errorNoPrescription = false;
            
            $log.log($scope.selectedSphOd);
            if ($scope.selectedSphOs == null || $scope.selectedSphOd == null) {
                $scope.errorEmpty = true;
	            try{
                    tealium_data2track.push({
						'id' : 'Error', 
						'Error_Code' : 'Oops! You need to add your values',
						'Error_Source' : 'User' 
					});
	            } catch (error) {
	                $log.error(
	                    'Error during tealium_data2track push. ' +
	                        error
	                );
	            }
            } else {
                var frame = {
                    category: $scope.params.category,
                };

                var prescriptionObject = {
                    SPH: {
                        OD: parseFloat($scope.selectedSphOd),
                        OS: parseFloat($scope.selectedSphOs),
                    },
                    ADD: false,
                };
                
                if($scope.selectedCylOd != null && $scope.selectedCylOs != null){
                	prescriptionObject.CYL = {
                		OD: parseFloat($scope.selectedCylOd),
                        OS: parseFloat($scope.selectedCylOs)
                    }
                }

                var selectedFacets = $scope.params.selectedFacets;

                var searchType = $scope.params.searchType;

                lcPrescription.checkAvailableFramesWithCount(frame, prescriptionObject, selectedFacets, true, searchType)
                    .then(
                        function (response) {
                            if (response.count !== undefined && response.count > 0) {
                                $scope.$apply(function() {
                                    $scope.isFormVisible = false;
                                });

                                lcPrescription.savePrescription(prescriptionObject); 
                                
            					sessionStorage.setItem("prescriptionFilterUtag", 'prescription=true');
            							
                                // Se ci sono frame refresh altrimenti esce messaggio d'errore
                                $window.location.reload();
                            } else {
                            	try{
                                      tealium_data2track.push({
                                    	'id' : 'Error', 
      	         						'Error_Source' : 'User',
      	         						'Error_Code' : 'RX Configurator: prescription values',
      	         						'Error_Details':
      	         							'SPHOD:' +
     	                                     prescriptionObject.SPH.OD +
     	                                     ',SPHOS:' +
     	                                     prescriptionObject.SPH.OS +
      	                                     ',CYLOD:' +
      	                                     prescriptionObject.CYL.OD +
      	                                     ',CYLOS:' +
      	                                     prescriptionObject.CYL.OS,
      	         						'Error_Message' : 'Sorry! The frame you\'ve chosen isn\'t compatible with your prescription' 
                  					});
                  	            } catch (error) {
                  	                $log.error(
                  	                    'Error during tealium_data2track push. Check if tealium_data2track exists in the window.\n' +
                  	                        error
                  	                );
                  	            }
                                $scope.$apply(function() {
                                    $scope.errorNoPrescription = true;
                                });
                            }
                        }, function (error) {
                            $log.error(error);
	                       	try{
	                             tealium_data2track.push({
	         						'id' : 'Error', 
	         						'Error_Source' : 'User',
	         						'Error_Code' : 'RX Configurator: prescription values',
	         						'Error_Details':
	         							'SPHOD:' +
	                                     prescriptionObject.SPH.OD +
	                                     ',SPHOS:' +
	                                     prescriptionObject.SPH.OS +
 	                                     ',CYLOD:' +
 	                                     prescriptionObject.CYL.OD +
 	                                     ',CYLOS:' +
 	                                     prescriptionObject.CYL.OS,
	         						'Error_Message' : 'Sorry! The frame you\'ve chosen isn\'t compatible with your prescription'
	         						 
	         					});
	         	            } catch (error) {
	         	                $log.error(
	         	                    'Error during tealium_data2track push. Check if tealium_data2track exists in the window.\n' +
	         	                        error
	         	                );
	         	            }
                            $scope.$apply(function() {
                                $scope.errorNoPrescription = true;
                            });
                        }
                    );
            }
        }
        
        $scope.generatePrescriptionValues = function(){
       	 	j = -20;
            i = 1;
            // $scope.od[0] = '-';
            while (j <= 20) {
            	if(j > 0)
            		$scope.od[i] = j;
            	else 
            		$scope.od[i] = j;
                j = j + 0.25;
                i = i + 1;
            }
            j = -20;
            i = 1;
            //$scope.os[0] = '-';
            while (j <= 20) {
            	if(j > 0)
            		$scope.os[i] = j;
            	else 
            		$scope.os[i] = j;
                j = j + 0.25;
                i = i + 1;
            }
            
            $scope.positive = {};
            $scope.negative = {};
            j = 0;
            i = 0;
            while (j < 20) {
            	 j = j*1 + 0.25;
            	 j = j + '';
            	 if(j.split('.')[1]){
            		 if(j.split('.')[1].length === 1)
            			 j = j + '0';
            	 } else 
            		 j = j + '.00';
            	 $scope.positive[i] = '+' + j;
            	 i = i + 1;
            }
            j = 0;
            i = 0;
            while (j > -20) {
           	 j = j*1 - 0.25;
           	 j = j + '';
    	   	 if(j.split('.')[1]){
    	   		 if(j.split('.')[1].length === 1)
    	   			 j = j + '0';
    	   	 } else 
    	   		 j = j + '.00';
           	 $scope.negative[i] = j;
           	 i = i + 1;
           }
        }

        $scope.clearPrescription = function () {
            $scope.isFormVisible = true;
            $scope.selectedCylOd = null;
            $scope.selectedCylOs = null;
            $scope.selectedSphOs = null;
            $scope.selectedSphOd = null;
            
            if(sessionStorage.getItem('prescriptionFilterUtag')){
            	sessionStorage.removeItem('prescriptionFilterUtag');
            }
            
            lcPrescription.clearPrescription();
            $window.location.reload();
        }
        
        $scope.filterBrand = function(obj){
        	
            if($rootScope.brandText == undefined || $rootScope.brandText == ''){
            	return true;
            }

            if(obj.label.toLowerCase().startsWith($rootScope.brandText.toLowerCase())){
                return true; // this will be listed in the results
            }

            return false; // otherwise it won't be within the results
        };
        
        $scope.isSuggestedFilter = function(obj){
        	
        	var found = false;
        	
        	angular.forEach($scope.suggestedFilters, function (filter, i) {
        		if(!found)
        			found = filter.indexOf(obj.label) != -1;
        	});

            return found; // otherwise it won't be within the results
        };
        
        $scope.getFilters = function(){
        	
        	var url = FILTERS_GENERATE_PLP_URL.replaceAll('#storeId#', $scope.storeId).replace('#langId#', $scope.langId).replace('#catalogId#', $scope.catalogId).replace('#categoryId#', $scope.categoryId);
        	var profileNameVal = $scope.contactsPLP ? 'RONA_findProductsByCategory_CL' : 'RONA_findProductsByCategory_group';
        	
        	if($scope.searchTerm != null && $scope.searchTerm != ''){
        		url = FILTERS_GENERATE_SEARCHPAGE_URL.replaceAll('#storeId#', $scope.storeId).replace('#langId#', $scope.langId).replace('#catalogId#', $scope.catalogId).replace('#searchTerm#', $scope.searchTerm);
        		profileNameVal = $scope.contactsPLP ? 'RONA_CL_findProductsBySearchTerm' : 'RONA_findProductsBySearchTerm';
        	}
        	
        	if($scope.categoryId != null && $scope.categoryId != ''){
        		url = url + '&categoryId=' + $scope.categoryId;
            	url = url + '&profileName=' + profileNameVal;
        	}
        	
        	if ($scope.inStockFacet && !$scope.contactsPLP) {
        		url = url + '&facet=' + $scope.inStockFacet + '%3A1';
        	}

			if ($scope.inStoreOnlyFacet) {
				url += '&facet=-' + $scope.inStoreOnlyFacet + '%3A1'; 
			}
        	
        	angular.forEach($scope.currentAppliedFacets, function (facet, facetCode) {
        		angular.forEach(facet, function (facetValue, i) {
	        		url = url + '&facet=' + facetCode + '%3A' + facetValue;
	        	});  
        	});
        	
        	$http.get(url)
			.then(function (response) {
				if (response && response.data.recordSetTotal > 0) {
					
					$scope.currentFilters = response.data;
					
					var filtersLabels = {
						'GENDER': 'Gender',
						'PRODUCT_TYPE': 'Product Type',
						'BRAND': 'Brand', 
						'FRAME_SHAPE_FACET': 'Frame shape', 
						'FRAME_MATERIAL_FACET': 'Frame material',
						'MATERIAL': 'FRAME_MATERIAL_CLASS',
						'FRONT_COLOR_FACET': 'Frame color',
						'OfferPrice_USD': 'Price',
						'OfferPrice_LC_EA_USD': 'Price',
						'OfferPrice_CAD': 'Price',
						'OfferPrice_LC_EA_CAD' : 'Price',
						'CL_BRAND_FAMILY': 'Brand',
						'CL_MATERIAL_PATENTED': 'FRAME_MATERIAL_CLASS',
						'CL_SUPPLIER': 'Manufacturer', 
						'CL_MODALITY': 'Category',
						'CL_CORRECTION_TYPE': 'Type',
						'FRAME_SIZE': 'Fit',
						'FRAME_FITTING': 'Frame size',
						'MACRO_AGE_RANGE': 'Macro age range',
						'FRAME_SIZE_DISPLAY': 'Frame size',
						'IS_NEW' : 'New',
						'EXCLUSIVE': 'Exclusive',
						'POLARIZED': 'Polarized sunglasses',
						'LENS_TREATMENT_FACET': 'Lens treatment',
						'LENS_COLOR_FACET': 'Lens Color',
						'OnSale_USD' : 'On Sale',
						'OnSale_CAD' : 'On Sale',
						'OnSale_EA_USD' : 'On Sale',
						'OnSale_EA_CAD' : 'On Sale',
						'FRAME_FITTING' : 'Fitting',
						'GEOFIT' : 'Bridge and nosepads',
						'HIGH_PRESCRIPTION': 'High prescription'
					}
					
					//sort by attrsequence
					$scope.currentFilters.facetView.sort(function(facet1, facet2) {
						// OfferPrice_USD facet doesn't have an associated attribute
						if (facet1.name == 'OfferPrice_USD' || facet1.name == 'OfferPrice_CAD' || facet1.name == 'OfferPrice_EA_LC_USD' || facet1.name == 'OfferPrice_EA_LC_CAD') facet1.extendedData.attrsequence = '3.0';
						else if (facet2.name == 'OfferPrice_USD' || facet2.name == 'OfferPrice_CAD' || facet2.name == 'OfferPrice_EA_LC_USD' || facet2.name == 'OfferPrice_EA_LC_CAD') facet2.extendedData.attrsequence = '3.0';

						if(facet1.extendedData.attrsequence == null)
							facet1.extendedData.attrsequence = '99.0';
						if(facet2.extendedData.attrsequence == null)
							facet2.extendedData.attrsequence = '99.0';
				        return parseFloat(facet1.extendedData.attrsequence) - parseFloat(facet2.extendedData.attrsequence);
				    });
					
					var productTypeFilterOn = true;
					var genderFilterOn = true;
					var brandFilterOn = true;
					var glassesIndex = -1;
					var genderIndex = -1;
					var electronicsEntry = null;
					var polarizedFilterOn = true;
					var kidsEntry = null;
					var onSaleFilterOn = false;
					var highPrescriptionFilterOn = true;
					
					if (window.location.href.indexOf("kids-") > -1){
						var genderFilterOn = false;
					}
					
					$scope.currentFilters.facetView.forEach(function(facetView, indexFacetView) {
						if(facetView.name == 'MACRO_AGE_RANGE'){
							facetView.entry.forEach(function(value,index){
								if(facetView.entry[index].label == 'Children'){
									facetView.entry[index].label = 'Kids';
									kidsEntry = facetView.entry[index];
								}
							})
						}
					});
					
					$scope.currentFilters.facetView.forEach(function(facetView, indexFacetView) {
						if(filtersLabels[facetView.extendedData.attridentifier] != undefined){
							$scope.currentFilters.facetView[indexFacetView].label = filtersLabels[facetView.extendedData.attridentifier];
							if(facetView.name == 'BRAND'){
								if(window.location.href.indexOf('/brands/') > -1 || facetView.entry.length < 2){
									brandFilterOn = false;
								}else{
									facetView.entry.sort(function(a, b){
										if(a.label < b.label) { return -1; }
										if(a.label > b.label) { return 1; }
										return 0;
									})
								}
							}
							if(facetView.name == 'GENDER'){
								genderIndex = indexFacetView;
								if(kidsEntry != null && genderIndex != -1){
									$scope.currentFilters.facetView[genderIndex].entry.push(kidsEntry);
								}
								facetView.entry.sort(function(a, b){
									if(a.label < b.label) { return -1; }
									if(a.label > b.label) { return 1; }
									return 0;
								})
								let removedUnisex;
								facetView.entry, removedUnisex = $scope.removeItemByLabel(facetView, 'Unisex');

								// Separate man/woman and unisex into 2 different filters
								if(removedUnisex) {
									facetView.entry = $scope.concatenateFilters(facetView, removedUnisex)
								}
							}
							if(facetView.name == 'PRODUCT_TYPE'){
								if(facetView.entry.length < 2){
									productTypeFilterOn = false;
								}
								glassesIndex = indexFacetView;
								facetView.entry = $scope.removeFacetsEntry(facetView.entry);
							}
							if(facetView.name == 'FRAME_SIZE_DISPLAY'){
								
								facetView.entry.sort(function(a, b){
									if (a.label === 'XXS' || b.label === 'XXL' || (a.label === 'XS' && b.label === 'S') || (a.label === 'XS' && b.label === 'M') || (a.label === 'XS' && b.label === 'L') || (a.label === 'XS' && b.label === 'XL') || (a.label === 'S' && b.label === 'M') || (a.label === 'S' && b.label === 'L') || (a.label === 'S' && b.label === 'XL') || (a.label === 'M' && b.label === 'L') || (a.label === 'M' && b.label === 'XL') || (a.label === 'L' && b.label === 'XL')){
										return -1;
									}
									else if(a.label === 'XXL' || b.label === 'XXS' || (b.label === 'XL' && a.label === 'XS') || (b.label === 'L' && a.label === 'XS') || (b.label === 'S' && a.label === 'XS') || (b.label === 'M' && a.label === 'XS')  ||  (b.label === 'XL' && a.label === 'S') || (b.label === 'L' && a.label === 'S') || (b.label === 'XS' && a.label === 'S') || (b.label === 'M' && a.label === 'S') || (b.label === 'XL' && a.label === 'M') || (b.label === 'L' && a.label === 'M') || (b.label === 'XS' && a.label === 'M') || (b.label === 'S' && a.label === 'M') || (b.label === 'XL' && a.label === 'L') || (b.label === 'XS' && a.label === 'L') || (b.label === 'S' && a.label === 'L') || (b.label === 'M' && a.label === 'L')  ||  (b.label === 'S' && a.label === 'XL') || (b.label === 'L' && a.label === 'XL') || (b.label === 'XS' && a.label === 'XL') || (b.label === 'M' && a.label === 'XL')   ){
										return 1;
									}
									return 0;
								})
							}
							if(facetView.name == 'POLARIZED'){
								if(facetView.entry.length < 2 && 
								$scope.currentAppliedFacets != undefined && 
								($scope.currentAppliedFacets[facetView.value] == undefined || 
									($scope.currentAppliedFacets[facetView.value] != undefined && $scope.currentAppliedFacets[facetView.value].length < 0)
								)){
									polarizedFilterOn = false;
								}
								facetView.entry = facetView.entry.filter(function(facetViewEntry, index){
									if(facetViewEntry.label == 'True'){ // to include prices
										return true;
									}
									return false;
								});
								facetView.entry.forEach(function(facetViewEntry, indexFacetViewEntry) {
									if(facetViewEntry.label == 'True'){
										$scope.currentFilters.facetView[indexFacetView].entry[indexFacetViewEntry].label = 'Polarized';
									}
								});
							}
							
							if(facetView.name == 'IS_NEW'){
								facetView.entry.forEach(function(facetViewEntry, indexFacetViewEntry) {
									if(facetViewEntry.label == '1'){
										$scope.currentFilters.facetView[indexFacetView].entry[indexFacetViewEntry].label = 'True';
									}else if(facetViewEntry.label == '0'){
										$scope.currentFilters.facetView[indexFacetView].entry[indexFacetViewEntry].label = 'False';
									}
								});
							}

							function aggregateEntries(entries, mappings, descriptions) {
								const groups = {}

								for (group of Object.values(mappings))
									groups[group] = []

								entries.forEach(function(entry) {
									if (mappings[entry.label])
										groups[mappings[entry.label]].push(entry)
								})

								newEntries = []

								for (const [group, entries] of Object.entries(groups)) {
									newEntry = entries.reduce((accum, curr) => {
										if (accum.value)
											accum.value += "OR" + curr.value
										else
											accum.value = curr.value

										accum.count = +accum.count + +curr.count

										return accum
									}, { count: 0, value: "" })

									newEntry.label = group
									if (descriptions && descriptions[group])
										newEntry.description = descriptions[group]
									newEntries.push(newEntry)
								}

								return newEntries
							}
							
							if (facetView.name == "FRAME_FITTING" ) {
								facetView.entry = aggregateEntries(facetView.entry, {
									"Narrow": "Narrow fitting",
									"Regular": "Regular fitting",
									"Standard": "Regular fitting",
									"Average": "Regular fitting",
									"Wide": "Wide fitting",
									"Oversized": "Wide fitting"
								}, {
									"Narrow fitting": "A small lens front designed for those with a more narrow head.",
									"Regular fitting": "A medium lens front designed for those with an average-sized head.",
									"Wide fitting": "A larger lens front designed for those with a wider head."
								})
							}
							
							if (facetView.name == "GEOFIT" ) {
								facetView.entry = aggregateEntries(facetView.entry, {
									"Adjustable Nosepads": "Adjustable Nosepads",
									"High Bridge Fit": "High Bridge Fit",
									"Low Bridge Fit": "Low Bridge Fit",
									"Universal Fit": "Universal Fit",
									"Asian": "Low Bridge Fit",
									"Asian Design": "Low Bridge Fit",
									"Asian Fitting": "Low Bridge Fit",
									"Full Fitting": "Low Bridge Fit",
									"Global": "Adjustable Nosepads",
									"International": "High Bridge Fit",
									"Universal Fitting": "Universal Fit",
								}, {
									"Adjustable Nosepads": "Adjustable nosepads can be widened or narrowed to fit your unique nose shape.",
									"High Bridge Fit": "Offers a more secure and comfortable fit for those with a high nose bridge and lower cheekbones. A good choice if the bridge of your nose is above the level of your pupils.",
									"Low Bridge Fit": "Offers a more secure and comfortable fit for those with a low nose bridge and higher cheekbones. A good choice if eyewear tends to slide down your nose, sit too low, or press on your temples or cheeks.",
									"Universal Fit": "This option accommodates most face shapes.",
								})
							}
							//high prescription only has 1 label with TRUE
							if(facetView.name == 'HIGH_PRESCRIPTION'){
								if(facetView.entry.length == 0){
										highPrescriptionFilterOn = false;
								} else {
									facetView.entry = facetView.entry.filter(function(facetViewEntry, index){
										if(facetViewEntry.label.toUpperCase() == 'TRUE'){
											return true;
										}
										return false;
									});
									facetView.entry.forEach(function(facetViewEntry, indexFacetViewEntry) {
										if(facetViewEntry.label.toUpperCase() == 'TRUE'){
											$scope.currentFilters.facetView[indexFacetView].entry[indexFacetViewEntry].label = 'High prescription';
										}
									});
								}
							}

						}else{
							$scope.currentFilters.facetView[indexFacetView].label = filtersLabels[facetView.name];
							if(facetView.name == 'OfferPrice_USD' || facetView.name == 'OfferPrice_CAD' || facetView.name == 'OfferPrice_LC_EA_USD' || facetView.name == 'OfferPrice_LC_EA_CAD'){
								facetView.entry.forEach(function(facetViewEntry, indexFacetViewEntry) {
									if(facetViewEntry.label == '({* 100} 100)'){
										$scope.currentFilters.facetView[indexFacetView].entry[indexFacetViewEntry].label = 'Under $100';
									}else if(facetViewEntry.label == '({* 200} 200)'){
										$scope.currentFilters.facetView[indexFacetView].entry[indexFacetViewEntry].label = '$200 and up';
									}else if(facetViewEntry.label == '({* 149.99} 149.99)'){
										$scope.currentFilters.facetView[indexFacetView].entry[indexFacetViewEntry].label = 'Under $149.99';
									}else if(facetViewEntry.label == '({150 249.99} 249.99)'){
										$scope.currentFilters.facetView[indexFacetView].entry[indexFacetViewEntry].label = '$150.00 - $240.99';
									}else if(facetViewEntry.label == '({250 *})'){
										$scope.currentFilters.facetView[indexFacetView].entry[indexFacetViewEntry].label = '$250 and up';
									}
								});
							}
							if(facetView.name == 'ELECTRONICS'){
								if(facetView.entry){
									electronicsEntry = facetView.entry[0];
								}
							}
							
							if((facetView.name == 'OnSale_USD' || facetView.name == 'OnSale_CAD' || facetView.name == 'OnSale_EA_USD' || facetView.name == 'OnSale_EA_CAD') && onSaleFilterOn){
								facetView.entry.forEach(function(facetViewEntry, indexFacetViewEntry) {
									if(facetViewEntry.label == '1'){
										$scope.currentFilters.facetView[indexFacetView].entry[indexFacetViewEntry].label = 'True';
									}else if(facetViewEntry.label == '0'){
										$scope.currentFilters.facetView[indexFacetView].entry[indexFacetViewEntry].label = 'False';
									}
								});
							}
						}
					});
					
					if(electronicsEntry != null && glassesIndex != -1){
						$scope.currentFilters.facetView[glassesIndex].entry.push(electronicsEntry);
					}
					
					var enabledFilters = [];			
					if($scope.contactsPLP){
						enabledFilters = ['FRAME_SHAPE','FRAME_SIZE','CL_MATERIAL_PATENTED','OfferPrice_USD','OfferPrice_CAD','CL_BRAND_FAMILY','FRONT_COLOR_FACET', 'CL_SUPPLIER', 'CL_MODALITY', 'CL_CORRECTION_TYPE','FRAME_MATERIAL_FACET'];
					}else{
						enabledFilters = ['FRAME_SIZE','CONTACT_MATERIAL', 'FRAME_SIZE_DISPLAY', 'FRAME_SHAPE_FACET', 'FRAME_MATERIAL_FACET', 'FRONT_COLOR_FACET', 'LENS_TREATMENT_FACET', 'FRAME_MATERIAL_FACET', 'LENS_COLOR_FACET', 'EXCLUSIVE','IS_NEW', 'FRAME_FITTING', 'GEOFIT'];
						
						if($scope.isEA && $scope.isEAOfferPriceEnabled){
							if($scope.storeId == 10851){
								enabledFilters.push('OfferPrice_LC_EA_USD');
							}else{
								enabledFilters.push('OfferPrice_LC_EA_CAD');

							}	
						}else{
							enabledFilters.push('OfferPrice_USD');
							enabledFilters.push('OfferPrice_CAD');
						}
						
						if(genderFilterOn) enabledFilters.push('GENDER');
						if(productTypeFilterOn) enabledFilters.push('PRODUCT_TYPE');
						if(polarizedFilterOn) enabledFilters.push('POLARIZED');
						if(highPrescriptionFilterOn) enabledFilters.push('HIGH_PRESCRIPTION');
						if(brandFilterOn) enabledFilters.push('BRAND');
						if(onSaleFilterOn){
							if($scope.isEA && $scope.isEAOfferPriceEnabled){
								if($scope.storeId == 10851){
									enabledFilters.push('OnSale_EA_USD');
								}else{
									enabledFilters.push('OnSale_EA_CAD');
								}
							}else{
								if($scope.storeId == 10851){
									enabledFilters.push('OnSale_USD');
								}else{
									enabledFilters.push('OnSale_CAD');
								}
							}
							
						}
					}

					// Remove filters in eyeglasses PLP regarding ONLY sunglasses
					if(
						utag_data.Page_Section2.includes('Eyeglasses')
						|| utag_data.Page_Section2.includes('eyeglasses')
						|| utag_data.Page_Section2.includes('Bluelightglasses')
						|| utag_data.Page_Section1.includes('eyeglasses')
						|| utag_data.Page_Section1.includes('Eyeglasses')
						)
					{
						var indexRemove = enabledFilters.indexOf('LENS_COLOR_FACET');
						if(indexRemove > -1) {
							enabledFilters.splice(indexRemove, 1);
						}
						indexRemove = enabledFilters.indexOf('LENS_TREATMENT_FACET');
						if(indexRemove > -1) {
							enabledFilters.splice(indexRemove, 1);
						}
						indexRemove = enabledFilters.indexOf('POLARIZED');
						if(indexRemove > -1) {
							enabledFilters.splice(indexRemove, 1);
						}						
					}
					
					$scope.currentFilters.facetView = response.data.facetView.filter(function(facetView, index){
						if(enabledFilters.indexOf(facetView.extendedData.attridentifier) != -1){
							return true;
						}
						if((facetView.name == 'OfferPrice_USD' && (!$scope.isEA || !$scope.isEAOfferPriceEnabled)) || (facetView.name == 'OfferPrice_CAD' && (!$scope.isEA || !$scope.isEAOfferPriceEnabled)) || (facetView.name == 'OfferPrice_LC_EA_USD' && $scope.isEA && $scope.isEAOfferPriceEnabled && $scope.storeId == 10851) || (facetView.name == 'OfferPrice_LC_EA_CAD' && (!$scope.isEA || !$scope.isEAOfferPriceEnabled) && $scope.storeId == 10852)){ // to include prices
							return true;
						}
						if(((facetView.name == 'OnSale_USD' && (!$scope.isEA || !$scope.isEAOfferPriceEnabled)) || (facetView.name == 'OnSale_CAD' && (!$scope.isEA || !$scope.isEAOfferPriceEnabled)) || (facetView.name == 'OnSale_EA_USD' && $scope.isEA && $scope.isEAOfferPriceEnabled && $scope.storeId == 10851) || (facetView.name == 'OnSale_EA_CAD' && (!$scope.isEA || !$scope.isEAOfferPriceEnabled) && $scope.storeId == 10852)) && onSaleFilterOn){ // to include on sale
							return true;
						}
						return false;
					});
					
					$scope.currentFilters.appliedCount = 0;
					angular.forEach($scope.currentAppliedFacets, function (appFilter, appFilterName) {
						if(appFilter.length > 0){
							var appFilterNameMapped = appFilterName;
							if(appFilterNameMapped == "ELECTRONICS"){
								appFilterNameMapped = 'Glasses';
							}
							$scope.currentFilters.facetView.forEach(function(facetView, indexFacetView) {
								var facetName = facetView.value; //take the facet name es. ads_f31506_ntk_cs
								if(facetView.name == "OfferPrice_USD"){
									facetName = 'price_USD';
								}
								if(facetView.name == "OfferPrice_CAD"){
									facetName = 'price_CAD';
								}
								if(facetView.name == "OfferPrice_LC_EA_USD"){
									facetName = 'eaprice_LC_USD';
								}
								if(facetView.name == "OfferPrice_LC_EA_CAD"){
									facetName = 'eaprice_LC_CAD';
								}
								if(facetView.label == "Gender"){
                                    facetName = appFilterName;
								}
								if(facetName == appFilterNameMapped){
									facetView.entry.forEach(function(entry, indexEntry) {
										$scope.currentAppliedFacets[appFilterName].forEach(function(appFilterValue, appFilterIndex) {
											var facetValue = entry.value.split('%3A').slice(1).join("%3A").replaceAll("%22", "").replaceAll("\"", "");
											facetValue = facetValue.split('&')[0]; // for gender concatenate man/woman + Unisex
											appFilterValue = appFilterValue.replaceAll("%22", "").replaceAll("\"", "");
											if(facetValue != "" && appFilterValue == facetValue){
												$scope.currentFilters.facetView[indexFacetView].entry[indexEntry].selected = true;
												$scope.currentFilters.appliedCount++;
											}
										});
									});
								}
							});
						}
					});
					
					if($scope.currentFilters.appliedCount == 0){
						sessionStorage.removeItem('filtersUtag');
					}
				} 
			}, function (error) {
				$scope.currentFilter = {};
			})
        }

		$scope.removeFacetsEntry = function(entries) {
			let newEntries = [];
			for (let e of entries) {
				if (!$scope.labelsToRemove.includes(e.label)) {
					newEntries.push(e);
				}
			}

			return newEntries;
		}

		$scope.removeItemByLabel = function (currFacetView, label) {
			let indexToRemove, valToremove, removed;
			currFacetView.entry.forEach(function(value,index){
				if(currFacetView.entry[index].label.toLowerCase() == label.toLowerCase()){
					indexToRemove = index;
					valToremove = currFacetView.entry[index].value;
					removed = value;
				}
			});
			currFacetView.entry.splice(indexToRemove, 1);
			return currFacetView.entry, removed;
		}

		$scope.concatenateFilters = function(currFacetView, entryToConcatenate) {
			// OLD IMPL to AGGREGATE in OR 
			/*currFacetView.entry.forEach(function(value,index){
				if(currFacetView.entry[index].label.toLowerCase() == 'Man'.toLowerCase() ||
					currFacetView.entry[index].label.toLowerCase() == 'Woman'.toLowerCase()){
						currFacetView.entry[index].value += "OR" + entryToAggregate.value.split('%3A')[0] + "%3A%22" + entryToAggregate.label + "%22";
						let newCount = parseInt(currFacetView.entry[index].count) + parseInt(entryToAggregate.count)
						currFacetView.entry[index].count = newCount.toString();
				}
			}); 
			END OLD IMPL TO AGGREGATE in OR
			*/
			currFacetView.entry.forEach(function(value,index){
				if(currFacetView.entry[index].label.toLowerCase() == 'Man'.toLowerCase() ||
					currFacetView.entry[index].label.toLowerCase() == 'Woman'.toLowerCase()){
						currFacetView.entry[index].value += "&facet=" + entryToConcatenate.value.split('%3A')[0] + "%3A%22" + entryToConcatenate.label + "%22";
				}
			});
			return currFacetView.entry;
		}

        $scope.updateFilter = function(facet, entry){
        	if(entry.count == 0){
        		return;
        	}
        	
        	var filter = entry.value.split('%3A');
        	
        	if(entry.value.indexOf('price') != -1){
        		filter = entry.value.split('%3A');
        	}
        	
        	var filterName = filter[0];
        	var filterValue = filter.slice(1).join("%3A");
        	
        	if($scope.currentAppliedFacets[filterName] == undefined){
        		$scope.currentAppliedFacets[filterName] = [];
        	}
 
        	var found = false;
        	var originalArray = JSON.parse(JSON.stringify($scope.currentAppliedFacets));
        	
        	var facetName = facet.name;
        	if(facet.name == "OfferPrice_USD" || facet.name == "OfferPrice_CAD" || facet.name == "OfferPrice_LC_EA_USD" || facet.name == "OfferPrice_LC_EA_CAD"){
        		facetName = 'Price';
	    	}
			if($scope.currentAppliedFacets[filterName] != undefined){
				$scope.currentAppliedFacets[filterName].forEach(function (appFilter, i) {
	        		var facetValue = entry.value.split('%3A').slice(1).join("%3A").replaceAll("%22", "").replaceAll("\"", "");
					facetValue = facetValue.split('&')[0]; // for gender concatenate man/woman + Unisex
	        		var appFilterCleaned= appFilter.replaceAll("%22", "").replaceAll("\"", "");
					if(facetValue != "" && appFilterCleaned == facetValue){
	        			found = true;
	        			originalArray[filterName].splice(i,1);
	        		}
	        	}); 
			}
        	       	
        	
        	if(!found){
        		originalArray[filterName].push(filterValue);
        	}
        	
        	$scope.currentAppliedFacets = originalArray;

        	
        	$scope.getFilters();
        }
        
		$scope.backToTop = function(){
        	document.body.scrollTop = 0;
        	document.documentElement.scrollTop = 0;
        }

        $scope.seeResults = function(){
        	var urlElements = window.location.href.split('?')
            var baseURL = urlElements[0].split('#')[0];
            var params = [];
            if(urlElements.length > 1){
				var params = urlElements[1].split('&');
            }
            
			var parameters = 'page=1&'; // applying a filter resets navigation to page 1
            angular.forEach(params, function (param, i) {
            	if (!param.startsWith('facet') && !param.startsWith('page') && !param.startsWith('sku[]')) {
					parameters = parameters + param + '&';
            	}
            });

            if ('undefined' !== typeof RONACatalogEntryQuickView && 'undefined' !== typeof RONACatalogEntryQuickView.selectedProduct) {
				angular.forEach(RONACatalogEntryQuickView.selectedProduct, function (product, i) {
					parameters = parameters + 'sku[]=' + product.sku + '&'; 
				});
			}

        	var newUrl = baseURL + '?' + parameters;

        	var applyCLCategoryURLRewrite = true;
        	if (undefined != window.contactLensesCategoriesWithParams) {
        		var clCategoriesWithParamsArray = window.contactLensesCategoriesWithParams.split(',');
        		applyCLCategoryURLRewrite = clCategoriesWithParamsArray.indexOf($scope.categoryId) < 0;
        	}
        	
        	if (applyCLCategoryURLRewrite && newUrl.indexOf('/contact-lenses') > -1) {
        		var contactsBrandToRemove = newUrl.slice(newUrl.indexOf('/contact-lenses'));
        		newUrl = newUrl.replace(contactsBrandToRemove, "/contact-lenses?");
        	}

        	utag_data.Search_FacetValues_String = "";
        	angular.forEach($scope.currentAppliedFacets, function (facetValue, facetName) {
        		var facetDisplayName ="";
        		for(var facetViewIndex in $scope.currentFilters.facetView){
        			if($scope.currentFilters.facetView[facetViewIndex].value === facetName){
        				facetDisplayName = $scope.currentFilters.facetView[facetViewIndex].label;
        				break;
        			}
        		}
        		angular.forEach(facetValue, function (singleFacetValue, i) {
        			newUrl = newUrl + 'facet=' + facetName + '%3A' + singleFacetValue + '&';	
        		});
    			
        		facetValue = (facetValue ? decodeURI(facetValue).replaceAll("\"", '') : '');
        		
    			if(utag_data.Search_FacetValues_String==""){
    				sessionStorage.setItem("filtersUtag", facetDisplayName + '=' + facetValue);
    				utag_data.Search_FacetValues_String = sessionStorage.getItem('filtersUtag');
    			} else{
    				sessionStorage.setItem("filtersUtag", utag_data.Search_FacetValues_String + '|' + facetDisplayName + '=' + facetValue);
    				utag_data.Search_FacetValues_String = sessionStorage.getItem('filtersUtag');
    			}
        	});
        	
        	$log.log('plpCtrl - set Events_SearchFiltering');
        	
        	$window.location = newUrl.slice(0, -1); // remove the "&"" at the end of the url
        }
        
        $scope.clearFilters = function(){
        	angular.forEach($scope.currentAppliedFacets, function (filter, i) {
        		$scope.currentAppliedFacets[i] = [];
        	});
        	
        	$scope.getFilters();
        	sessionStorage.removeItem('filtersUtag');
        	categoryDisplayJS.clearFacets();
        }
        
        $scope.getUrlFacets = function() {
            var params = {};
            var i = 1;
            var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
                if (key.includes('facet')) {
                	var facet = value.split('%3A');
                    if(params[facet[0]] == undefined){
                    	params[facet[0]] = [];
                    }
                    params[facet[0]].push(facet.slice(1).join("%3A"));
                }
                i++;
            });
            return params;
        }

		$scope.$timeout = $timeout;
		
		$scope.qnaInitializer = function () {
			jsonElements = document.querySelectorAll('[type="application/ld+json"]');
			for (var i = 0; i < jsonElements.length; i++) {
				try {
					if(jsonElements[i].innerHTML != null) {
						qnasObj = JSON.parse(jsonElements[i].innerHTML);
						$log.log(qnasObj);
						if(qnasObj[0]["@type"] != null && qnasObj[0]["@type"] == "FAQPage") {
							if(qnasObj[0].mainEntity.length > 0)
								$scope._qnas = qnasObj;
								break;
						}
					}
				} catch (error) {
					$log.error("Json does not contain faq");
				}
			}
		}

		$scope.getQNA = function(text, index, type) {
			if(type == 'question') {
				elements = document.getElementsByClassName("plp_question");
		  		elements[index].innerHTML = text;
			}
			else if (type == 'answer') {
				elements = document.getElementsByClassName("plp_a");
			  	elements[index].innerHTML = text;
			}
		}

		$scope.showAnswer = function($event, isAlwaysOpen) {
			if(!isAlwaysOpen) {
				questions = document.getElementsByClassName("plp_q");
				answers = document.getElementsByClassName("plp_a");
				plusIcons = document.getElementsByClassName("plus-icon");
				minusIcons = document.getElementsByClassName("minus-icon");

				index = Array.prototype.indexOf.call(questions, $event.currentTarget);
				if(answers[index].style.display == "block") {
					answers[index].style.display = "none";
				} else {
					answers[index].style.display = "block";
				}
				if(plusIcons[index].style.display == "none") {
					plusIcons[index].style.display = "block";
				} else {
					plusIcons[index].style.display = "none";
				}
				if(minusIcons[index].style.display == "block") {
					minusIcons[index].style.display = "none";
				} else {
					minusIcons[index].style.display = "block";
				}
			}
		}
    }
])
.directive('prescriptionSelect', function($document) {
  return {
	    template: tmplPrescription,
	    scope: {
	        model: '=',
	        positive: '=',
	        negative: '=',
	      },
	    link: function (scope, elem, attrs, ctrl) {
	    	scope.selectVisible = false;
	    	positive = scope.positive;
	    	negative = scope.negative;
	    	scope.selectItem = function(item) {
	        	scope.model = item;
	        	scope.selectVisible = false;
	        };	        
	        const handler = function (e) {
                if (elem !== e.target && !elem[0].contains(e.target)) {
                    scope.$apply(function () {
                        scope.selectVisible = false;
                    });
                }
            }

            $document.on('click', handler);

            scope.$on('$destroy', function() {
                $document.off('click', handler);
            });
	    },
	  };
});


var tmplPrescription = ''
	+ '<div class="prescription-select">'
	+ '	<div class="prescription-select-value" ng-click="selectVisible = !selectVisible">'
	+ '		{{model == null ? "-" : model}}'
	+ '	</div>'
	+ '	<div class="prescription-select-table" ng-show="selectVisible">'
	+ ' 	<div class="prescription-select-row-zero" ng-click="selectItem(0)">'
	+ ' 		0'		
	+ ' 	</div>'
	+ '     <div class="prescription-col-container">'
	+ '			<div class="prescription-select-col">'
	+ '				<div class="prescription-select-row" ng-click="selectItem(item)" ng-repeat="item in negative">'
	+ '					{{item}}'
	+ '				</div>'
	+ '			</div>'
	+ ' 		<div class="prescription-select-col">'
	+ '				<div class="prescription-select-row" ng-click="selectItem(item)" ng-repeat="item in positive">'
	+ '					{{item}}'
	+ ' 			</div>'
	+ '			</div>'
	+ '		</div>'
	+ '	</div>'
	+ '</div>';

	
;
app.controller('GuestOrderTrackerController', ['$scope', '$rootScope', '$http', '$window', '$cookies', '$log', '$timeout', '$filter', 'moment', '$loader',
    function($scope, $rootScope, $http, $window, $cookies, $log, $timeout, $filter, moment, $loader) {

        // global variables
		$scope.params = {	storeId: storeId,
							langId: langId, 
							catalogId: catalogId,
							framesImageURL: '',
							contactsImageURL: ''
						};
	
		$scope.orderData = undefined;
		$scope.data = {
						orderId: '', 
						email : ''
					  }	
    	$scope.parentCatentryInfo = {};
        // errors global 
	    $scope.errors = {
    						'trackOrderError' : {
    							'msg' : 'Oops! No order found. Please check your data and try again.',
    							'value': false
    						}
						};
       
        $scope.retreiveOrder = function(){
        	$loader.show('search-order');
        	$scope.errors.trackOrderError.value=false;
        	$scope.retreiveOrderURL = '/wcs/resources/store/' + $scope.params.storeId + '/ordercst/guest/' + $scope.data.orderId + '?email=' + encodeURIComponent($scope.data.email.toLowerCase());
        	$http.get($scope.retreiveOrderURL)
            .then(function(response) {
                if (response.data && response.status == 200) {
                	$scope.orderData = response.data;
                	angular.forEach($scope.orderData.orderItem, function(value, key){
                		
                		var productViewURL = '/wcs/resources/store/' + $scope.params.storeId + '/productview/' + value.partNumber;
                		
                		$http.get(productViewURL)
                        .then(function(response) {
                            if (response.data && response.status == 200) {
                            	
                            	if((value.comments == 'SUN' || value.comments == 'EYE' || value.comments == 'LENS') && value.partNumber != '99' ){
                            		$scope.orderData.orderItem[key]['productview'] = response.data;
                            		
                            		//get Model Name value for parentProduct
                            		if(value.comments == 'SUN' || value.comments == 'EYE'){
	                            		var parentProductViewURL = '/wcs/resources/store/' + $scope.params.storeId + '/productview/byId/' + response.data.CatalogEntryView[0].parentProductID;
	                            		var partnumber = value.partNumber;
	                            		$http.get(parentProductViewURL).then(function(parentResponse) {
	                                        if (parentResponse.data && parentResponse.status == 200) {
	                                        	
	                                        	angular.forEach(parentResponse.data.CatalogEntryView[0]['Attributes'], function(value, key){
	                                        		
	                                        		if(value.name == 'MODEL_NAME'){
	                                        			$scope.parentCatentryInfo[partnumber] = value.Values[0].values;
	                                        		}
	                                        	});
	                                        	
	                                        } else {
	                                            $log.error('Error getting parent product model name from service');
	                                        }
	                                    }, function(error) {
	                                        $log.error('Error getting parent product model name from service.\n' + error);
	                                    });
                            	    }
                            	
                            	}else if(value.comments == 'LCON' || value.comments == 'RCON'){
                        			productViewURL = '/wcs/resources/store/' + $scope.params.storeId + '/productview/byId/' + response.data.CatalogEntryView[0].parentProductID;
                        		
	                            	$http.get(productViewURL)
	                                .then(function(response) {
	                                    if (response.data && response.status == 200) {
	                                    	$scope.orderData.orderItem[key]['productview'] = response.data;
	                                    } else {
	                                        $log.error('Error getting order item data from service');
	                                    }
	                                    
	                                    $loader.hide('red-button');
	                                }, function(error) {
	                                    $log.error('Error getting order item data from service.\n' + error);
	                                });
                            	}
                            	
                            } else {
                                $log.error('Error getting order item data from service');
                            }
                        }, function(error) {
                            $log.error('Error getting order item data from service.\n' + error);
                        });
 
                		$scope.trackOrderItem(key);
                	});
                	
                	//connect lens if available
                	angular.forEach($scope.orderData.orderItem, function(value, key){
                		
                		if(value.comments == 'SUN' || value.commetns == 'EYE'){
                			
                			angular.forEach($scope.orderData.orderItem, function(item, key2){
                				if(value.orderItemId == item.xitem_field1 && item.partNumber != '99'){
                					$scope.orderData.orderItem[key]['lens_object'] = item;
                				}
                			});
                		}
                	});
                	
                } else if(response.data && response.status == 404){ 
                	$scope.errors.trackOrderError.value=true;
                } else {
                    $log.error('Error getting order item data from service');
                }

            }, function(error) {
                $log.error('Error getting order item data from service.\n' + error);
                	
                $scope.errors.trackOrderError.value=true;	
                	
                $loader.hide('search-order');
            });
        	
        }
        
        $scope.trackOrderItem = function(itemIndex){
        	
        	var trackingURL = '/wcs/resources/store/' + $scope.params.storeId + '/delivery/' + $scope.orderData.orderItem[itemIndex].orderItemId + '/carrierUrl';
        	
        	$http.get(trackingURL)
            .then(function(response) {
                if (response.data && response.status == 200) {
                	let oid = $scope.orderData.orderItem[itemIndex].orderItemId;
                	for (let i = 0; i < $scope.orderData.orderItem.length; i++) {
                		//testo $scope.orderData.orderItem[i]['trackingURL'] per evitare problemi di ordinamento degli items
                		//testo oid per limitare il cambiamento agli items raggruppati
                		if (($scope.orderData.orderItem[i]['trackingURL'] == undefined || $scope.orderData.orderItem[i]['trackingURL'] == "") && ($scope.orderData.orderItem[i].orderItemId == oid || $scope.orderData.orderItem[i].xitem_field1 == oid)) {
                			$scope.orderData.orderItem[i]['trackingURL'] = response.data.carrierUrl;
                		} 
                	}
                } else {
                    $log.error('Error getting order item data from service');
                }
            }, function(error) {
                $log.error('Error getting order item data from service.\n' + error);
            });
        }
        
        $scope.parseFloat = function(value){
        	return parseFloat(value);
        }
        
        $scope.translateStatus = function(status){
        	switch(status){
        		case 'M': return 'Open';
        		case 'S': return 'Shipped';
        		case 'D': return 'Shipped and settled';
        		case 'Z': return 'Returned';
        		case 'X': return 'Cancelled';
        		case 'G': return 'In Process';
        		case 'R': return 'In Process';
        		case 'E': return 'Pending RX';
        		case 'F': return 'RX Verified';
				case 'U': return 'Ready for pickup';
        		default: return 'Open';
        	}
        }
    }
]);
;
app.controller('LensCraftersFAQ', ['$scope', '$filter', function($scope, $filter) {
	$scope.currentPage = 0;
	$scope.pageSize = 10;
	$scope.expanded = -1;

	$scope.toggleExpandFaq = function(index) {
		$scope.expanded = index;
	}
	;
	$scope.data = window['FAQ_LIST'];
	var url = window.location.href.indexOf('forgot');
	if (url == -1) {
		$scope.q = '';
	} else {
		$scope.q = 'forgot';
		$scope.expanded = 0;
	}

	$scope.getData = function() {
		return $filter('filter')($scope.data, $scope.q);
	}

	$scope.numberOfPages = function() {
		return Math.ceil($scope.getData().length / $scope.pageSize);
	}

	$scope.$watch('q', function(newValue, oldValue) {
		if (oldValue != newValue) {
			$scope.currentPage = 0;
		}
	}, true);
}
]);

app.filter('unsafe', function($sce) { return $sce.trustAsHtml; });
                    

app.filter('startFrom', function() {
	return function(input, start) {
		start = +start;
		return input.slice(start);
	}
});

app.filter('cut', function() {
	return function(value, wordwise, max, tail) {
		if (!value)
			return '';

		max = parseInt(max, 10);
		if (!max)
			return value;
		if (value.length <= max)
			return value;

		value = value.substr(0, max);
		if (wordwise) {
			var lastspace = value.lastIndexOf(' ');
			if (lastspace !== -1) {
				if (value.charAt(lastspace - 1) === '.' || value.charAt(lastspace - 1) === ',') {
					lastspace = lastspace - 1;
				}
				value = value.substr(0, lastspace);
			}
		}

		return value + (tail || ' ?');
	}
	;
});;
var lcInsuranceModule = angular.module('lcInsuranceModule', []);

lcInsuranceModule.factory('lcInsurance', function ($rootScope, $location, $http, $httpParamSerializerJQLike, $q, $cookies, $log, SidebarJS) {

	var isInit = false;

    var params = null;
	
    var isLogged = false;
    var isEnabled = false;
    var isLoginLoading = false;
    var isDiscountLoading = false;

    var INSURANCE_LOGIN_URL = 'jsonpInsuranceAjax.jsp';
    var INSURANCE_DISCOUNT_URL = '/wcs/resources/store/10851/catalog/22651/ria/benefitpricing';
    var ESTIMATED_INSURANCE_DISCOUNT_URL = '/wcs/resources/store/10851/catalog/22651/ria/estimatedbenefitpricing';
    var INSURANCE_ENABLED_COOKIE = 'ria_1';
    var INSURANCE_DISABLED_COOKIE = 'ria_0';
    var INSURANCE_SECONDARY_COOKIE = 'ria_2'; // Only for UHC
    var INSURANCE_ACTIVE_PLAN_COOKIE = "ria_active"; // Only for UHC
    var INSURANCE_TENTATIVE_COOKIE = 'tentative_user';
    var INSURANCE_MAX_TENTATIVE = 4;

    var INSURANCE_EVENTS = {
        INSURANCE_LOGIN: 'insuranceLogin',
        INSURANCE_LOGIN_LOADING: 'isLoginLoading',
        INSURANCE_LOGIN_ERROR: 'insuranceLoginError',
        INSURANCE_LOGOUT: 'insuranceLogout',
        INSURANCE_ENABLED: 'insuranceEnabled',
        INSURANCE_DISABLED: 'insuranceDisabled',
        INSURANCE_TENTATIVE_UPDATE: 'insuranceTentativeUpdate',
        INSURANCE_TENTATIVE_LIMIT_REACHED: 'insuranceTentativeLimitReached',
        INSURANCE_TENTATIVE_RESET: 'insuranceTentativeReset',
        INSURANCE_DISCOUNT_LOADING: 'isDiscountLoading',
        INSURANCE_DISCOUNT_ERROR: 'insuranceDiscountError',
        INSURANCE_DISCOUNT_LOADED: 'insuranceDiscountLoaded'
    };

    var INSURANCE_ERRORS = {
        INSURANCE_NOT_FOUND: 0,
        INSURANCE_SERVICE_ERROR: 1,
        INSURANCE_TENTATIVE_LIMIT_REACHED: 2,
        INSURANCE_ALREADY_LOGGED: 3,
        INSURANCE_DISABLED: 4,
        INSURANCE_LOGIN_LOADING: 5,
        INSURANCE_DISCOUNT_LOADING: 6
    };

    var INSURANCE_BENEFIT_CATEGORIES = {
        FRAMES: 'frames',
        FRAMES_ADD: 'frames_add',
        LENSES: 'lenses',
        LENSES_ADD: 'lenses_add',
        CONTACT_LENSES: 'contact',
        EXAMS: 'exam'
    };

    function getCookie(cookieName, parseJSON) {
        var cookieValue = null;
        var cookieValueStr = $cookies.get(cookieName);

        if (cookieValueStr) {
            cookieValueStr = decodeURIComponent(cookieValueStr.trim());

            if (parseJSON) {
                try {
                    cookieValue = JSON.parse(cookieValueStr);
                } catch (e) {
                    $log.error('Unable to parse cookie as JSON');
                }
            } else {
                cookieValue = cookieValueStr;
            }
        }

        return cookieValue;
    };

    function getTentativeCookie() {
        return getCookie(INSURANCE_TENTATIVE_COOKIE);
    }

    function setInsuranceCookie(data) {
        var now = new Date();
        var time = now.getTime() + 1800 * 1000;
        now.setTime(time);

        function fixInsurancePlanName(riaInsuranceInformation) {
            // Comma in cookie - Safari fix
            if (riaInsuranceInformation && riaInsuranceInformation.planName) {
                riaInsuranceInformation.planName = riaInsuranceInformation.planName.replace(',', '');
                riaInsuranceInformation = JSON.stringify(riaInsuranceInformation);
            }

            return riaInsuranceInformation;
        }
       
        if (!data.plans) {
            // Single insurance plan
            data.riaInsuranceInformation = fixInsurancePlanName(data.riaInsuranceInformation);

            var jsonStr = JSON.stringify(data);

            if (getCookie(INSURANCE_DISABLED_COOKIE)) {
                document.cookie = INSURANCE_DISABLED_COOKIE + '=' + jsonStr + '; path=/; expires=' + now.toUTCString() + ';';
            } else {
                document.cookie = INSURANCE_ENABLED_COOKIE + '=' + jsonStr + '; path=/; expires=' + now.toUTCString() + ';';
            }
        } else if (data.plans && angular.isArray(data.plans) && data.plans.length === 2 && data.activePlanId) {
            // Multiple insurance plans (UHC)
            var expireDate = now.toUTCString();
            
            // Set active plan token cookie
            document.cookie = INSURANCE_ACTIVE_PLAN_COOKIE + '=' + data.activePlanId + '; path=/; expires=' + expireDate + ';';

            for (var i = 0; i < data.plans.length; i++) {
                var plan = data.plans[i];

                plan.riaInsuranceInformation = fixInsurancePlanName(plan.riaInsuranceInformation);

                var jsonStr = JSON.stringify(plan);

                if (i === 0) {
                    if (getCookie(INSURANCE_DISABLED_COOKIE)) {
                        document.cookie = INSURANCE_DISABLED_COOKIE + '=' + jsonStr + '; path=/; expires=' + expireDate + ';';
                    } else {
                        document.cookie = INSURANCE_ENABLED_COOKIE + '=' + jsonStr + '; path=/; expires=' + expireDate + ';';
                    }
                } else if (i === 1) {
                    document.cookie = INSURANCE_SECONDARY_COOKIE + '=' + jsonStr + '; path=/; expires=' + expireDate + ';';
                }
            }
        }
    }

    function setTentativeCookie(value) {
        if (!isNaN(value) && value >= 0 && value <= INSURANCE_MAX_TENTATIVE) {
            var now = new Date();
            var time = now.getTime() + 3600 * 1000;
            now.setTime(time);

            var cookieOptions = {
                path: '/'
            };

            if (value == 0) {
                cookieOptions.expires = now.toUTCString();
            }

            $cookies.put(INSURANCE_TENTATIVE_COOKIE, value, cookieOptions);

            if (value == 0) {
                $rootScope.$broadcast(INSURANCE_EVENTS.INSURANCE_TENTATIVE_LIMIT_REACHED);
            } else if (value == INSURANCE_MAX_TENTATIVE) {
                $rootScope.$broadcast(INSURANCE_EVENTS.INSURANCE_TENTATIVE_RESET);
            } else {
                $rootScope.$broadcast(INSURANCE_EVENTS.INSURANCE_TENTATIVE_UPDATE, value);
            }
        }
    }

    function removeInsuranceCookie() {
        $cookies.remove(INSURANCE_DISABLED_COOKIE, { path: '/' });
        $cookies.remove(INSURANCE_ENABLED_COOKIE, { path: '/' });
        $cookies.remove(INSURANCE_SECONDARY_COOKIE, { path: '/' });
        $cookies.remove(INSURANCE_ACTIVE_PLAN_COOKIE, { path: '/' });
    }

    function removeTentativeCookie() {
        $cookies.remove(INSURANCE_TENTATIVE_COOKIE, { path: '/' });
    }

    // Custom event polyfill for IE
    /*(function () {
        if (typeof window.CustomEvent === 'function') return false;

        function CustomEvent(event, params) {
            params = params || { bubbles: false, cancelable: false, detail: undefined };
            var evt = document.createEvent('CustomEvent');
            evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
            return evt;
        }

        CustomEvent.prototype = window.Event.prototype;

        window.CustomEvent = CustomEvent;
    })();*/

    var insuranceModule = {
    	
    	/**
    	 * Insurance module initialization
    	 * @param {Object} params - Initialization params
    	 */
    	init: function (_params) {
    		if (this.isInit) {
    			return;
    		}
    		
    		params = _params;
    		this.isInit = true;
    	},	
    		
        /**
         * Insurance login
         * @param {Object} data - Login data
         * @param {string} data.planID
         * @param {string} data.memberID
         * @param {string} data.firstName
         * @param {string} data.lastName
         * @param {string} data.birth_month
         * @param {string} data.birth_date
         * @param {string} data.birth_year
         * @param {string} data.zip
         * @param {string} data.infoForm
         * @param {string} data.storeId
         * @returns {Promise} - Login promise
         */
        login: function (data) {
            var _defer = $q.defer();

            if (isLoginLoading) {
                _defer.reject(INSURANCE_ERRORS.INSURANCE_LOGIN_LOADING);
                return _defer.promise;
            }

            isLoginLoading = true;
            $rootScope.$broadcast(INSURANCE_EVENTS.INSURANCE_LOGIN_LOADING);
            window.dispatchEvent(new CustomEvent(INSURANCE_EVENTS.INSURANCE_LOGIN_LOADING));

            if (!this.isLogged()) {
                if (!data.orderId)
                    data.orderId = '.';

                // Create tentative cookie if not exists
                if (!getTentativeCookie()) {
                    this.resetTentative();
                }

                var _this = this;

                if (this.hasTentative()) {
                    $http.post(getAbsoluteURL() + INSURANCE_LOGIN_URL, $httpParamSerializerJQLike(data),
                        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
                        .then(function (response) {
                            isLoginLoading = false;

                            if (response && response.data && response.data.result == 'ok') {
                                _this.resetTentative();
                                setInsuranceCookie(response.data);

                                $rootScope.$broadcast(INSURANCE_EVENTS.INSURANCE_LOGIN, response.data);
                                window.dispatchEvent(new CustomEvent(INSURANCE_EVENTS.INSURANCE_LOGIN, {
                                    detail: response.data
                                }));
                                $rootScope.$broadcast(INSURANCE_EVENTS.INSURANCE_ENABLED);
                                window.dispatchEvent(new CustomEvent(INSURANCE_EVENTS.INSURANCE_ENABLED));

                                _defer.resolve(response.data);
                            } else {
                                _this.removeTentative();

                                $rootScope.$broadcast(INSURANCE_EVENTS.INSURANCE_LOGIN_ERROR, INSURANCE_ERRORS.INSURANCE_NOT_FOUND);
                                window.dispatchEvent(new CustomEvent(INSURANCE_EVENTS.INSURANCE_LOGIN_ERROR, {
                                    detail: INSURANCE_ERRORS.INSURANCE_NOT_FOUND
                                }));
                                _defer.reject(INSURANCE_ERRORS.INSURANCE_NOT_FOUND);
                            }
                        }, function (error) {
                            _this.removeTentative();

                            isLoginLoading = false;

                            $log.error(error);

                            $rootScope.$broadcast(INSURANCE_EVENTS.INSURANCE_LOGIN_ERROR, INSURANCE_ERRORS.INSURANCE_SERVICE_ERROR);
                            window.dispatchEvent(new CustomEvent(INSURANCE_EVENTS.INSURANCE_LOGIN_ERROR, {
                                detail: INSURANCE_ERRORS.INSURANCE_SERVICE_ERROR
                            }));
                            _defer.reject(INSURANCE_ERRORS.INSURANCE_SERVICE_ERROR);
                        });
                } else {
                    isLoginLoading = false;

                    $rootScope.$broadcast(INSURANCE_EVENTS.INSURANCE_LOGIN_ERROR, INSURANCE_ERRORS.INSURANCE_TENTATIVE_LIMIT_REACHED);
                    window.dispatchEvent(new CustomEvent(INSURANCE_EVENTS.INSURANCE_LOGIN_ERROR, {
                        detail: INSURANCE_ERRORS.INSURANCE_TENTATIVE_LIMIT_REACHED
                    }));
                    _defer.reject(INSURANCE_ERRORS.INSURANCE_TENTATIVE_LIMIT_REACHED);
                }
            } else {
                isLoginLoading = false;

                $rootScope.$broadcast(INSURANCE_EVENTS.INSURANCE_LOGIN_ERROR, INSURANCE_ERRORS.INSURANCE_ALREADY_LOGGED);
                window.dispatchEvent(new CustomEvent(INSURANCE_EVENTS.INSURANCE_LOGIN_ERROR, {
                    detail: INSURANCE_ERRORS.INSURANCE_TENTATIVE_LIMIT_REACHED
                }));
                _defer.reject(INSURANCE_ERRORS.INSURANCE_ALREADY_LOGGED);
            }

            return _defer.promise;
        },

        /**
         * Insurance logout
         * @returns {boolean}
         */
        logout: function () {
            removeInsuranceCookie();
            removeTentativeCookie();

            $rootScope.$broadcast(INSURANCE_EVENTS.INSURANCE_LOGOUT);
            window.dispatchEvent(new CustomEvent(INSURANCE_EVENTS.INSURANCE_LOGOUT));

            return true;
        },

        /**
         * Check if insurance is loading
         * @returns {boolean}
         */
        isLoading: function () {
            return isLoginLoading || isDiscountLoading;
        },

        /**
         * Check if user is logged
         * @returns {boolean}
         */
        isLogged: function () {
            return (getCookie(INSURANCE_ENABLED_COOKIE) || getCookie(INSURANCE_DISABLED_COOKIE)) ? true : false;
        },

        /**
         * Check if insurance is enabled
         * @returns {boolean}
         */
        isEnabled: function () {
            return getCookie(INSURANCE_ENABLED_COOKIE) ? true : false;
        },

        /**
         * Get insurance JSON
         * @returns {object}
         */
        getInsuranceJSON: function () {
            var insuranceJSON = getCookie(INSURANCE_ENABLED_COOKIE, true);
            return insuranceJSON ? insuranceJSON : getCookie(INSURANCE_DISABLED_COOKIE, true);
        },

        /**
         * Returns all insurance plans JSON
         * @returns {array} plans
         */
        getAllInsuranceJSON: function() {
            var plans = [];

            var primaryPlan = getCookie(INSURANCE_ENABLED_COOKIE, true);

            if (!primaryPlan) {
                primaryPlan = getCookie(INSURANCE_DISABLED_COOKIE, true);
            }

            if (primaryPlan) {
                plans.push(primaryPlan);

                var secondaryPlan = getCookie(INSURANCE_SECONDARY_COOKIE, true);

                if (secondaryPlan) {
                    plans.push(secondaryPlan);
                }
            }

            return plans;
        },

        /**
         * Get insurance discounts 
         * @param {Object} data
         * @param data.storeId
         * @param data.catalogId
         * @param data.langId
         * @param {Array} data.pricingEntries
         * @param {Object} data.pricingEntries.frame
         * @param data.pricingEntries.frame.price
         * @param data.pricingEntries.frame.upc
         * @param data.pricingEntries.frame.quantity default 1
         * @param data.pricingEntries.frame.type f for frames, l for lenses
         * @param {Object} data.pricingEntries.lens
         * @param data.pricingEntries.lens.price
         * @param data.pricingEntries.lens.upc
         * @param data.pricingEntries.lens.quantity default 1
         * @param data.pricingEntries.lens.type f for frames, l for lenses
         */
        getDiscounts: function (data) {
            var _defer = $q.defer();

            isDiscountLoading = true;
            $rootScope.$broadcast(INSURANCE_EVENTS.INSURANCE_DISCOUNT_LOADING);
            window.dispatchEvent(new CustomEvent(INSURANCE_EVENTS.INSURANCE_DISCOUNT_LOADING));

            if (this.isEnabled()) {
                var insuranceJSON = this.getInsuranceJSON();

                if (insuranceJSON && insuranceJSON.riaInsuranceInformation) {
                    var riaInsuranceInformation = JSON.parse(insuranceJSON.riaInsuranceInformation);

                    if (!data.orderId) {
                        data.orderId = '.';
                    }

                    data['__RIA_SYNC_TOKEN'] = riaInsuranceInformation.token;
                    data['__RIA_SYNC_INFO'] = insuranceJSON.riaInsuranceInformation;
                    
                    var activePlanId = this.getInsuranceActivePlanId();
                    
                    if (activePlanId) {
                    	data['__RIA_SYNC_ACTIVE_PLAN'] = activePlanId;
                    }
                    
                    data['__PRICING_ENTRY'] = [];

                    angular.forEach(data.pricingEntries, function (value, key) {
                        data['__PRICING_ENTRY'].push(JSON.stringify({ frame: value.frame, lens: value.lens }));
                    });

                    delete data.pricingEntries;
                    
                    var getInsuranceActivePlanId = this.getInsuranceActivePlanId;
                    var setInsuranceActivePlanId = this.setInsuranceActivePlanId;

                    $http({ method: 'POST', url: INSURANCE_DISCOUNT_URL, params: data })
                        .then(function (response) {
                            isDiscountLoading = false;
                            
                            if (response.data) {
                            	var activePlanId = getInsuranceActivePlanId();
                            	
                            	if (activePlanId && response.data.response['__RIA_SYNC_ACTIVE_PLAN'] && //
                            			activePlanId !== response.data.response['__RIA_SYNC_ACTIVE_PLAN']) {
                            		setInsuranceActivePlanId(response.data.response['__RIA_SYNC_ACTIVE_PLAN']);
                            	}
                            	
                            	if (response.data.response['__PAIR_DISCOUNT']) {
                                    try {
                                        _defer.resolve(response.data.response['__PAIR_DISCOUNT']);
                                    } catch (error) {
                                        _defer.reject(INSURANCE_ERRORS.INSURANCE_SERVICE_ERROR);
                                    }
                                } else if (response.data.response['__PRICING_ENTRY']) {
                                	try {
                                		_defer.resolve(response.data.response['__PRICING_ENTRY']);
                                	} catch (error) {
                                		_defer.reject(INSURANCE_ERRORS.INSURANCE_SERVICE_ERROR);
                                	}
                                } else {
                                    _defer.reject(INSURANCE_ERRORS.INSURANCE_SERVICE_ERROR);
                                }
                            } else {
                                _defer.reject(INSURANCE_ERRORS.INSURANCE_SERVICE_ERROR);
                            }
                        }, function (error) {
                            isDiscountLoading = false;

                            $rootScope.$broadcast(INSURANCE_EVENTS.INSURANCE_DISCOUNT_ERROR, INSURANCE_ERRORS.INSURANCE_SERVICE_ERROR);
                            window.dispatchEvent(new CustomEvent(INSURANCE_EVENTS.INSURANCE_DISCOUNT_ERROR, {
                                detail: INSURANCE_ERRORS.INSURANCE_SERVICE_ERROR
                            }));
                            _defer.reject(error);
                        });
                } else {
                    isDiscountLoading = false;

                    $rootScope.$broadcast(INSURANCE_EVENTS.INSURANCE_DISCOUNT_ERROR, INSURANCE_ERRORS.INSURANCE_DISCOUNT_ERROR);
                    window.dispatchEvent(new CustomEvent(INSURANCE_EVENTS.INSURANCE_DISCOUNT_ERROR, {
                        detail: INSURANCE_ERRORS.INSURANCE_DISCOUNT_ERROR
                    }));
                    _defer.reject(INSURANCE_ERRORS.INSURANCE_DISCOUNT_ERROR);
                }
            } else {
                isDiscountLoading = false;

                $rootScope.$broadcast(INSURANCE_EVENTS.INSURANCE_DISCOUNT_ERROR, INSURANCE_ERRORS.INSURANCE_DISABLED);
                window.dispatchEvent(new CustomEvent(INSURANCE_EVENTS.INSURANCE_DISCOUNT_ERROR, {
                    detail: INSURANCE_ERRORS.INSURANCE_DISABLED
                }));
                _defer.reject(INSURANCE_ERRORS.INSURANCE_DISABLED);
            }

            return _defer.promise;
        },

        /**
         * Get quick insurance discounts 
         * @param {Object} data
         * @param data.storeId
         * @param data.catalogId
         * @param data.langId
         * @param {Array} data.pricingEntries
         * @param {Object} data.pricingEntries.frame
         * @param data.pricingEntries.frame.price
         * @param data.pricingEntries.frame.upc
         * @param data.pricingEntries.frame.quantity default 1
         * @param data.pricingEntries.frame.type f for frames, l for lenses
         * @param {Object} data.pricingEntries.lens
         * @param data.pricingEntries.lens.price
         * @param data.pricingEntries.lens.upc
         * @param data.pricingEntries.lens.quantity default 1
         * @param data.pricingEntries.lens.type f for frames, l for lenses
         */
        getQuickInsuranceDiscounts: function (data) {
            var _defer = $q.defer();

            isDiscountLoading = true;
            $rootScope.$broadcast(INSURANCE_EVENTS.INSURANCE_DISCOUNT_LOADING);
            window.dispatchEvent(new CustomEvent(INSURANCE_EVENTS.INSURANCE_DISCOUNT_LOADING));

            if (this.isEnabled()) {
                var insuranceJSON = this.getInsuranceJSON();

                if (insuranceJSON && insuranceJSON.token && insuranceJSON.riaInsuranceInformation) {
                    if (!data.orderId) {
                        data.orderId = '.';
                    }

                    data['__RIA_SYNC_TOKEN'] = insuranceJSON.token;
                    data['__RIA_SYNC_INFO'] = insuranceJSON.riaInsuranceInformation;
                    data['__PRICING_ENTRY'] = [];

                    angular.forEach(data.pricingEntries, function (value, key) {
                        data['__PRICING_ENTRY'].push(JSON.stringify({ frame: null, lens: value.lens }));
                    });

                    delete data.pricingEntries;

                    $http({ method: 'POST', url: ESTIMATED_INSURANCE_DISCOUNT_URL, params: data })
                        .then(function (response) {
                            isDiscountLoading = false;

                            if (response.data && response.data.response['__PAIR_DISCOUNT']) {
                                try {
                                    _defer.resolve(response.data.response['__PAIR_DISCOUNT']);
                                } catch (error) {
                                    _defer.reject(INSURANCE_ERRORS.INSURANCE_SERVICE_ERROR);
                                }
                            } else if (response.data && response.data.response['__PRICING_ENTRY']) {
                            	try {
                            		_defer.resolve(response.data.response['__PRICING_ENTRY']);
                            	} catch (error) {
                            		_defer.reject(INSURANCE_ERRORS.INSURANCE_SERVICE_ERROR);
                            	}
                            } else {
                                _defer.reject(INSURANCE_ERRORS.INSURANCE_SERVICE_ERROR);
                            }
                        }, function (error) {
                            isDiscountLoading = false;

                            $rootScope.$broadcast(INSURANCE_EVENTS.INSURANCE_DISCOUNT_ERROR, INSURANCE_ERRORS.INSURANCE_SERVICE_ERROR);
                            window.dispatchEvent(new CustomEvent(INSURANCE_EVENTS.INSURANCE_DISCOUNT_ERROR, {
                                detail: INSURANCE_ERRORS.INSURANCE_SERVICE_ERROR
                            }));
                            _defer.reject(error);
                        });
                } else {
                    isDiscountLoading = false;

                    $rootScope.$broadcast(INSURANCE_EVENTS.INSURANCE_DISCOUNT_ERROR, INSURANCE_ERRORS.INSURANCE_DISCOUNT_ERROR);
                    window.dispatchEvent(new CustomEvent(INSURANCE_EVENTS.INSURANCE_DISCOUNT_ERROR, {
                        detail: INSURANCE_ERRORS.INSURANCE_DISCOUNT_ERROR
                    }));
                    _defer.reject(INSURANCE_ERRORS.INSURANCE_DISCOUNT_ERROR);
                }
            } else {
                isDiscountLoading = false;

                $rootScope.$broadcast(INSURANCE_EVENTS.INSURANCE_DISCOUNT_ERROR, INSURANCE_ERRORS.INSURANCE_DISABLED);
                window.dispatchEvent(new CustomEvent(INSURANCE_EVENTS.INSURANCE_DISCOUNT_ERROR, {
                    detail: INSURANCE_ERRORS.INSURANCE_DISABLED
                }));
                _defer.reject(INSURANCE_ERRORS.INSURANCE_DISABLED);
            }

            return _defer.promise;
        },
        
        /**
         * Get insurance settings for RXC
         * @returns {Object}
         */
        getInsuranceSettings: function () {
        	if (params && params.isRiaPricerEnabled) {
        		try {
                    var jsonRIACookieContent = getCookie(INSURANCE_ENABLED_COOKIE);
                    
                    if (jsonRIACookieContent != '') {
                        var insuranceProviderName = JSON.parse(JSON.parse(jsonRIACookieContent).riaInsuranceInformation).insuranceProviderName;
                        
                        if (insuranceProviderName == 'FACETS') {
                            $log.log('QUICK insurance setting');
                            
                            return {
                                "n" : 1,
                                "k" : 3,
                                "method" : "QUICK"
                            };
                        }
                    }
                } catch (e) {
                    $log.error(e);
                }
        	}
            
            $log.log('STANDARD insurance setting');
            
            return {
                "n" : 1,
                "k" : 3,
                "method" : "STANDARD"
            };
        },
        
        /**
         * Get insurance discounts for RXC
         * @param {object} _selectedFrame
         * @param {object} _selectedPackage
         * @returns {Promise}
         */
        getInsuranceDiscounts: function (_selectedFrame, _selectedPackage) {
            var _defer = $q.defer();

            var _pricingEntries = [];

            var _selectedFrameUPC = _selectedFrame.upc ? _selectedFrame.upc : _selectedFrame.partNumber;
            
            angular.forEach(_selectedPackage, function (currentPackage) {
                if (currentPackage.lensPackage.insPrice == null) {
                    const pricingEntry = {
                        frame: {
                            price: _selectedFrame.listPrice,
                            quantity: '1',
                            type: 'f',
                            upc: _selectedFrameUPC,
                        },
                        lens: {
                            price: currentPackage.lensPackage.listPrice,
                            quantity: '1',
                            type: 'l',
                            upc: currentPackage.lensPackage.upc,
                        },
                    };
                    _pricingEntries.push(pricingEntry);
                }
            });

            var data = {
                storeId: constants.ajaxParams['storeId'],
                catalogId: constants.ajaxParams['catalogId'],
                langId: constants.ajaxParams['langId'],
                pricingEntries: _pricingEntries,
            };

            var selectedFrameDiscountCachedRiaResponse = null;

            if (params && params.isRiaPricerEnabled && sessionStorage.getItem('_CACHED_RIA_RESPONSE_SELECTED_FRAME_DISCOUNT_LC_')) {
                try {
                    selectedFrameDiscountCachedRiaResponse = JSON.parse(sessionStorage.getItem('_CACHED_RIA_RESPONSE_SELECTED_FRAME_DISCOUNT_LC_'));
                } catch (e) {
                    $log.error(e);
                }
            }
            
            if (params && params.isRiaPricerEnabled && selectedFrameDiscountCachedRiaResponse && selectedFrameDiscountCachedRiaResponse.length > 0 && //
                _selectedFrameUPC == selectedFrameDiscountCachedRiaResponse[0].frame.upc){
            	
            	// RIA Pricer call
            	insuranceModule.getQuickInsuranceDiscounts(data).then(function (response) {
            		if (response) {
	                    try {
	                        var updatedPackages = [];
	
	                        angular.forEach(_selectedPackage, function (currentPackage) {
	                        	
	                            var tempPackage = JSON.parse(JSON.stringify(currentPackage));
	
	                            for (let i = 0; i < response.length; i++) {
	                                let insPackage = response[i];
	
	                                if (tempPackage.lensPackage.upc == insPackage.lens.upc) {
	                                	// il frame discount in questo caso lo recupero dallo ogetto in cahe
	                                    tempPackage.frame.insPrice = Math.max(
	                                        parseFloat(
	                                            _selectedFrame.listPrice - selectedFrameDiscountCachedRiaResponse[0].frameDiscount
	                                        ).toFixed(2),
	                                        0.0
	                                    );
	                                    tempPackage.lensPackage.insPrice = Math.max(
	                                        parseFloat(
	                                            tempPackage.lensPackage.listPrice - insPackage.lensDiscount
	                                        ).toFixed(2),
	                                        0.0
	                                    );
	
	                                    console.log('Lens UPC: ', tempPackage.lensPackage.upc);
	                                    console.log(
	                                        'Frame insurance price: ',
	                                        tempPackage.frame.insPrice
	                                    );
	                                    console.log(
	                                        'Lens insurance price: ',
	                                        tempPackage.lensPackage.insPrice
	                                    );
	
	                                    break;
	                                }
	                            }
	
	                            updatedPackages.push(tempPackage);
	                        });
	
	                        _defer.resolve(updatedPackages);
	                        
	                    } catch (error) {
	                        _defer.reject(INSURANCE_ERRORS.INSURANCE_SERVICE_ERROR);
	                    }
	                } else {
	                    _defer.reject(INSURANCE_ERRORS.INSURANCE_SERVICE_ERROR);
	                }
	            }).catch(function(error){
	            	_defer.reject(INSURANCE_ERRORS.INSURANCE_SERVICE_ERROR);
	            });
            } else {
            	// Standard RIA call
                if (params && params.isRiaPricerEnabled) {
                    sessionStorage.setItem('_CACHED_RIA_RESPONSE_SELECTED_FRAME_DISCOUNT_LC_', null);
                }
            	            
	            insuranceModule.getDiscounts(data).then(function (response) {
	                if (response) {
	                	/**
						 * Saving the response in session storage in order to exclude
                         * this call in the next requests for the same
                         * frame and recover the only discount for lenses with
                         * the new RIA Pricer service
						 */
                        if (params && params.isRiaPricerEnabled) {
                            sessionStorage.setItem('_CACHED_RIA_RESPONSE_SELECTED_FRAME_DISCOUNT_LC_', JSON.stringify(response));
                        }
	                	
	                    try {
	                        var updatedPackages = [];
	
	                        angular.forEach(_selectedPackage, function (currentPackage) {
	                        	
	                            var tempPackage = JSON.parse(JSON.stringify(currentPackage));
	
	                            for (let i = 0; i < response.length; i++) {
	                                let insPackage = response[i];
	
	                                if (tempPackage.lensPackage.upc == insPackage.lens.upc) {
	                                    tempPackage.frame.insPrice = Math.max(
	                                        parseFloat(
	                                            _selectedFrame.listPrice - insPackage.frameDiscount
	                                        ).toFixed(2),
	                                        0.0
	                                    );
	                                    tempPackage.lensPackage.insPrice = Math.max(
	                                        parseFloat(
	                                            tempPackage.lensPackage.listPrice - insPackage.lensDiscount
	                                        ).toFixed(2),
	                                        0.0
	                                    );
	
	                                    console.log('Lens UPC: ', tempPackage.lensPackage.upc);
	                                    console.log(
	                                        'Frame insurance price: ',
	                                        tempPackage.frame.insPrice
	                                    );
	                                    console.log(
	                                        'Lens insurance price: ',
	                                        tempPackage.lensPackage.insPrice
	                                    );
	
	                                    break;
	                                }
	                            }
	
	                            updatedPackages.push(tempPackage);
	                        });
	
	                        _defer.resolve(updatedPackages);
	                    } catch (error) {
	                        _defer.reject(INSURANCE_ERRORS.INSURANCE_SERVICE_ERROR);
	                    }
	                } else {
	                    _defer.reject(INSURANCE_ERRORS.INSURANCE_SERVICE_ERROR);
	                }
	            }).catch(function (error) {
	            	_defer.reject(INSURANCE_ERRORS.INSURANCE_SERVICE_ERROR);
	            });
            }
            
            return _defer.promise;
        },

        /**
         * Toggles insurance on or off
         */
        toggleInsurance: function () {
            if (!this.isLogged()) {
                return;
            }

            var now = new Date();
            var time = now.getTime() + 1800 * 1000;
            now.setTime(time);

            var insuranceJSON = getCookie(this.isEnabled() ? INSURANCE_ENABLED_COOKIE : INSURANCE_DISABLED_COOKIE);
            
            $("#cart-insurance-warning").toggleClass("hidden");
            
            if (this.isEnabled()) {
                document.cookie = INSURANCE_DISABLED_COOKIE + '=' + insuranceJSON + '; path=/; expires=' + now.toUTCString() + ';';
                $cookies.remove(INSURANCE_ENABLED_COOKIE, { path: '/' });

                $rootScope.$broadcast(INSURANCE_EVENTS.INSURANCE_DISABLED);
                window.dispatchEvent(new CustomEvent(INSURANCE_EVENTS.INSURANCE_DISABLED));
            } else {
                document.cookie = INSURANCE_ENABLED_COOKIE + '=' + insuranceJSON + '; path=/; expires=' + now.toUTCString() + ';';
                $cookies.remove(INSURANCE_DISABLED_COOKIE, { path: '/' });

                $rootScope.$broadcast(INSURANCE_EVENTS.INSURANCE_ENABLED);
                window.dispatchEvent(new CustomEvent(INSURANCE_EVENTS.INSURANCE_ENABLED));
            }
        },

        /**
         * Get the number of user login tentatives left
         * @returns {number} number of tentatives left
         */
        getTentative: function () {
            var tentativeCookie = getTentativeCookie();
            var tentative = 0;

            try {
                tentative = parseInt(tentativeCookie);
            } catch (error) {
                $log.error('Unable to parse tentative cookie');
            }

            return tentative;
        },

        /**
         * Check if user has any login tentatives left
         * @returns {boolean}
         */
        hasTentative: function () {
            return this.getTentative() > 0;
        },

        /**
         * Remove login tentative
         */
        removeTentative: function () {
            var tentative = this.getTentative();

            if (tentative > 0) {
                setTentativeCookie(--tentative);
            }
        },

        /**
         * Reset login tentatives
         */
        resetTentative: function () {
            setTentativeCookie(INSURANCE_MAX_TENTATIVE);
        },

        /**
         * Checks if the current logged member has all benefits
         * @returns {boolean}
         */
        checkAllBenefits: function () {
            var benefitsAvailable = false;

            if (this.isLogged()) {
                var i = 0;
                var tempBenefitsAvailable = true;
                var plans = this.getAllInsuranceJSON();

                while (i < plans.length && tempBenefitsAvailable) {
                    var plan = plans[i];
                    
                    if (plan.data) {
                        var j = 0;
                        var categoryKeys = Object.keys(plan.data);

                        while (j < categoryKeys.length && tempBenefitsAvailable) {
                            var categoryKey = categoryKeys[j];
                            
                            if (plan.data[categoryKey][0].available !== true) {
                                tempBenefitsAvailable = false;
                            }

                            j++;
                        }
                    }

                    i++;
                }

                if (tempBenefitsAvailable) {
                    benefitsAvailable = tempBenefitsAvailable;
                }
            }

            return benefitsAvailable;
        },

        /**
         * Checks if the current logged member is eligible for the benefit category
         * @param {string} category
         * @returns {boolean}
         */
        checkSingleBenefit: function (category) {
            var benefitAvailable = false;

            if (this.isLogged() && category) {
                var i = 0;
                var plans = this.getAllInsuranceJSON();

                while (i < plans.length && !benefitAvailable) {
                    var plan = plans[i];
                    
                    if (plan.data) {
                        var j = 0;
                        var categoryKeys = Object.keys(plan.data);

                        while (j < categoryKeys.length && !benefitAvailable) {
                            var categoryKey = categoryKeys[j];
                            
                            if (categoryKey === category && plan.data[categoryKey][0].available === true) {
                                benefitAvailable = true;
                            }

                            j++;
                        }
                    }

                    i++;
                }
            }

            return benefitAvailable;
        },
        
        /**
         * Returns active planId stored in ria_active cookie in case of UHC multiple plans
         * @returns {number} the active planId
         */
        getInsuranceActivePlanId: function () {
        	return getCookie(INSURANCE_ACTIVE_PLAN_COOKIE);
        },
        
        /**
         * Sets the active planId in the ria_active cookie in case of UHC multiple plans
         * @param {number} the active planId
         */
        setInsuranceActivePlanId: function (planId) {
        	if (planId) {
        		var now = new Date();
                var time = now.getTime() + 1800 * 1000;
                now.setTime(time);
        		
        		document.cookie = INSURANCE_ACTIVE_PLAN_COOKIE + '=' + planId + '; path=/; expires=' + now.toUTCString() + ';';
        	}
        },

        /**
         * Returns insurance event map
         * @returns {object}
         */
        getEvents: function () {
            return angular.copy(INSURANCE_EVENTS);
        },

        /**
         * Returns insurance error map
         * @returns {object}
         */
        getErrors: function () {
            return angular.copy(INSURANCE_ERRORS);
        },

        /**
         * Returns insurance benefit categories map
         */
        getBenefitCategories: function() {
            return angular.copy(INSURANCE_BENEFIT_CATEGORIES);
        },

        openInsurancePanel: function () {
        	SidebarJS.toggle();
        },
        
        removeInsuranceBenefits: function() {
        	removeInsuranceCookie();
            removeTentativeCookie();
        }
    };
    
    return insuranceModule;
});;
var lcPrescriptionModule = angular.module("lcPrescriptionModule", []);

lcPrescriptionModule.factory(
	"lcPrescription",
	function ($cookies, $http, $log) {
		var PRESCRIPTION_COOKIE = "prescriptionObject";

		var isInit = false;

		var storeId = null;
		var catalogId = null;
        var baseurl = window.location.protocol + "//" + window.location.hostname;

		return {
			prescriptionType: "FULL", // SIMPLE or FULL, case of Glasses.com after lens type selection
			prescriptionFlows: [],
			hideMoreOptions: true,
			fileExtensions: ["png", "gif", "jpeg", "tiff", "bmp", "doc", "docx", "pdf"],
			maxFileSize: 10,
			enablePrismComment: false,
          	enablePrism: true,

			init: function (_storeId, _catalogId, _prescriptionFlows, _prismEnabled) {
				/* Needed for checkAvailableFrames call */
				if (!isInit) {
					storeId = _storeId;
					catalogId = _catalogId;
					this.prescriptionFlows = _prescriptionFlows ? _prescriptionFlows : this.prescriptionFlows;
					this.hideMoreOptions = (_prismEnabled !== undefined) ? (_prismEnabled.toLowerCase() === 'false') : this.hideMoreOptions;
					isInit = true;
				} 
				this.prescriptionFlows = _prescriptionFlows;
				this.hideMoreOptions = (_prismEnabled != undefined && _prismEnabled.toLowerCase() === 'false');
				if (_prismEnabled !== undefined) {
					this.hideMoreOptions = (_prismEnabled.toLowerCase() === 'false');
				}
				this.enablePrismComment = (_prismEnabled != undefined && _prismEnabled.toLowerCase() === 'false');
				this.enablePrism = (_prismEnabled != undefined && _prismEnabled.toLowerCase() === 'true');
			},

			getFrameRXValues: function (frameMinTotalPower, frameMaxTotalPower) {
				var rxValues = null;

				if (
					typeof frameMinTotalPower !== "undefined" &&
					typeof frameMaxTotalPower !== "undefined" &&
					frameMinTotalPower !== "" &&
					frameMaxTotalPower !== "" &&
					!isNaN(frameMinTotalPower) &&
					!isNaN(frameMaxTotalPower)
				) {
					rxValues = {
						powerCombinedMin: frameMinTotalPower,
						powerCombinedMax: frameMaxTotalPower,
					};
				} else {
					$log.error("Invalid frame prescription values");
				}

				return rxValues;
			},

			loadExtendedPrescription: function (_requestObject) {
				return new Promise(function (resolve, reject) {
					var orderitemid = getCookie("prexOI");

					if (
						orderitemid !== null &&
						orderitemid !== undefined &&
						orderitemid !== ""
					) {
						var url =
							baseurl +
							"/wcs/resources/store/" +
							constants.ajaxParams["storeId"] +
							"/rxc/prescription/byOrderItemId/" +
							orderitemid + '?nocache=' + (new Date().getTime().toString());
						$http.get(url).then(
							function (response) {
								
								if (
									response.data.prescriptionFlow !== null &&
									response.data.prescriptionFlow.length > 0
								) {
									document.cookie =
										PRESCRIPTION_COOKIE +
										"=" +
										encodeURIComponent(JSON.stringify(response.data)) +
										"; path=/";
									resolve(response.data);
								} else {
									reject(null);
								}
							},
							function (response) {
								reject(null);
							}
						);

						$cookies.remove("prexOI", { path: "/" });
					} else {
						reject(null);
					}
				});
			},
			
			downloadExtendedPrescription: function (_requestObject){
	        	 var baseurl = window.location.protocol + '//' +  window.location.hostname;
	        	 var url  = baseurl + '/wcs/resources/store/' + constants.ajaxParams["storeId"] + '/rxc/prescription/download/';
	        	 var downloadURL = url+_requestObject.savedFileName;
	        	 return new Promise(function (resolve, reject) {
		        	 $http.get(downloadURL).then(function (response) {
		        		 var result={};
		        		 var filename = _requestObject.savedFileName;
		        		 var index = filename.lastIndexOf('_RXC_');
		        		 var ind_ext = filename.lastIndexOf('_RXC_'); 
		        		 var file=filename.substring(0,index) + filename.substring(ind_ext);
		        		 result.filename = file;
		        		 result.fileData = response.data;
		        		 resolve(result);
		        	 },function (response) {
	              		  alert("Error during upload.");
	              		  reject(null);
	              	});
	              });
	        	
	        },

			saveExtendedPrescription: function (_prescriptionObject) {
				const saveExtendedPrescriptionPromise = function (resolve, reject) {
					if (
						_prescriptionObject !== null ||
						_prescriptionObject !== undefined
					) {
						document.cookie =
							PRESCRIPTION_COOKIE +
							"=" +
							encodeURIComponent(JSON.stringify(_prescriptionObject)) +
							"; path=/";
						resolve(_prescriptionObject);
					} else {
						reject(_prescriptionObject);
					}
					
					return;
				};

				return new Promise(saveExtendedPrescriptionPromise);
			},

			// if no lenses are available against the prescription filtering, this function is called to retrieve the frames filtered PLP URL to link in the dedicated CTA "see available frames"
			// the PLP must be of the same category of the frame
			// if no URL is returned, then the user won't see the CTA
			checkAvailableFrames: function (_frame, _prescriptionObject) {
				return null;
			},

			uploadExtendedPrescription: function (_requestObject) {
                var timeout = 60000;

                function createTimeoutPromise() {
                    return new Promise(function(resolve, reject) {
                        setTimeout(function() {
                            $log.warn('Prescription file upload timed out');
                            reject(null);
                        }, timeout);
                    });
                };

                function createUploadPromise() {
                    return new Promise(function (resolve, reject) {
                        var url =
                            baseurl +
                            "/wcs/resources/store/" +
                            constants.ajaxParams["storeId"] +
                            "/rxc/prescription/upload";
                        var body = _requestObject;
                        $http.post(url, body).then(
                            function (response) {
                                resolve(response.data);
                               
                            },
                            function (error) {
                                $log.error(error);
                                reject(null);
                            }
                        );
				    });
                };

				return Promise.race([createUploadPromise(), createTimeoutPromise()]);
			},

			searchDoctors: function (_requestObject) {
				return new Promise(function (resolve, reject) {
					var search_parm = "";
					var name = String(_requestObject.name);
					name = name.replace(" ", "%20");
					var city = String(_requestObject.city);
					city = city.replace(" ", "_");
					var searchTermsList = new Array(
							_requestObject.phone,
							_requestObject.state,
							name,
							city
						);
					for (let i = 0; i < searchTermsList.length; i++) {
							if (searchTermsList[i] && searchTermsList[i] !== "null") {
								if (search_parm !== "") {
									search_parm += "!" + searchTermsList[i];
								} else {
									search_parm = searchTermsList[i];
								}
							}
						}

					search_parm = search_parm.replace("+", "").replace(" ", ""); 
					
					if (constants.ajaxParams["storeId"] == 10852)
					{
						var query = {};
						var options = {};
						
						if (String(_requestObject.phone) != 'null' && String(_requestObject.phone) != '')
						{
							query = {
			              			  $and: [
			              			    { phoneSearch: "'" + String(_requestObject.phone)}
			              			  ]
			              			};
							
							options = {
				          				  includeScore: true,
				          				  useExtendedSearch: true,
				          				  keys: ['phoneSearch']
				          				};
						}
						else
						{
							var shortState = "";
							
							switch(String(_requestObject.state)) {
							  case 'Alberta':
								  shortState = 'AB';
							    break;
							  case 'British Columbia':
								  shortState = 'BC';
							    break;
							  case 'Manitoba':
								  shortState = 'MB';
							    break;
							  case 'New Brunswick':
								  shortState = 'NB';
							    break;
							  case 'Newfoundland':
								  shortState = 'NL';
							    break;
							  case 'Northwest Territory':
								  shortState = 'NT';
							    break;
							  case 'Nova Scotia':
								  shortState = 'NS';
							    break;
							  case 'Nunavut':
								  shortState = 'NU';
							    break;
							  case 'Ontario':
								  shortState = 'ON';
							    break;
							  case 'Prince Edward Island':
								  shortState = 'PE';
							    break;
							  case 'Quebec':
								  shortState = 'QC';
							    break;
							  case 'Saskatchewan':
								  shortState = 'SK';
							    break;
							  case 'Yukon':
								  shortState = 'YT';
							    break;
							  default:
								  shortState = String(_requestObject.state);
							}
							
							query = {
									$and: [
				              			    { $or: [ {clinic: "'" + String(_requestObject.name)}, {name: "'" + String(_requestObject.name)}]},
				              			    { stateSearch: "'" + shortState},
				              				{ citySearch: "'" + String(_requestObject.city)} 
				              			  ]
			              			};
							
							options = {
				          				  includeScore: true,
				          				  useExtendedSearch: true,
				          				  keys: ['name','clinic','stateSearch','citySearch']
				          	};
						}
						
						var url =
							baseurl +
							"/wcs/resources/store/" +
							constants.ajaxParams["storeId"] +
							"/provideprescription/searchdoctor/" +
							search_parm;
						$http.get(url).then(
							function (response) {
								if(response.data.response.status === 'Fail'){
									reject(null);
									return;
								}
								const doctorsList = response.data.response.data;
								if(doctorsList.length == 0){
									reject(null);
									 return;
								}
								
								const fuse = new Fuse(doctorsList, options);
	    	            		const result = fuse.search(query);
	    	            		var foundDoctors = [];
	    	            		
	    	            		for (const item of result) 
	    	            		{
	    	            			foundDoctors.push(item.item); 
	    	            		} 
	    							 
								const res = { doctors: foundDoctors };
								resolve(res);
							},
							function (error) {
	                            $log.error(error);
								reject(null);
							}
						);
					}
					else
					{
						var url =
							baseurl +
							"/wcs/resources/store/" +
							constants.ajaxParams["storeId"] +
							"/provideprescription/searchdoctor/" +
							search_parm;
						$http.get(url).then(
							function (response) {
								if(response.data.response.status === 'Fail'){
									reject(null);
									return;
								}
								const doctorsList = response.data.response.data;
								if(doctorsList.length == 0){
									reject(null);
									 return;
								}
								const newKeys = new Array(
									"name",
									"clinic",
									"phone",
									"fax",
									"address"
								);
								const oldKeys = new Array(
									"doctorName",
									"officeName",
									"doctorPhoneNumber",
									"doctorFaxNumber",
									"doctorOfficeNumber"
								);
								const remKeys = new Array(
									"isOpenSaturday",
									"doctorAddress",
									"isValidDoctor"
								);

								for (let i = 0; i < doctorsList.length; i++) {
									for (let j = 0; j < newKeys.length; j++) {
										if (newKeys[j] === "address") {
											doctorsList[i][newKeys[j]] =
												doctorsList[i]["doctorAddress"]["address1"] +
												", " +
												doctorsList[i]["doctorAddress"]["zipPostalCode"] +
												", " +
												doctorsList[i]["doctorAddress"]["city"] +
												", " +
												doctorsList[i]["doctorAddress"]["stateProvince"] +
												", " +
												doctorsList[i]["doctorAddress"]["country"];
										} else {
											doctorsList[i][newKeys[j]] = doctorsList[i][oldKeys[j]];
											delete doctorsList[i][oldKeys[j]];
										}
									}
								}
								const res = { doctors: doctorsList };
								resolve(res);
							},
							function (error) {
	                            $log.error(error);
								reject(null);
							}
						);
					}					
				});
			},

			checkAvailableFramesWithCount: function (
				_frame,
				_prescriptionObject,
				_selectedFacets,
				_returnCount,
				_searchType
			) {
				return new Promise(function (resolve, reject) {
					if (storeId && catalogId && _frame && _prescriptionObject) {
						var data = {
							frame: _frame,
							prescriptionObject: _prescriptionObject,
							selectedFacets: _selectedFacets,
							searchType: _searchType,
						};

						$http({
							method: "POST",
							url:
								"/wcs/resources/store/" +
								storeId +
								"/catalog/" +
								catalogId +
								"/checkAvailableFrames",
							data: data,
						}).then(
							function (response) {
								if (
									response.data !== undefined &&
									response.data.response.count !== undefined
								) {
									var _count = response.data.response.count;
									var _url = response.data.response.url;

									if (_returnCount) {
										if (_count >= 0) {
											var _response = {
												count: _count,
											};

											if (_url !== undefined) {
												_response.url = _url;
											}

											resolve(_response);
										}
									} else {
										if (_count > 0 && _url !== undefined) {
											resolve(_url);
										} else {
											resolve(null);
										}
									}
								} else {
									reject();
								}
							},
							function (error) {
								reject(error);
							}
						);
					} else {
						var error = "Missing parameters";
						$log.error(error);
						reject(error);
					}
				});
			},

			clearExtendedPrescription: function () {
				$cookies.remove(PRESCRIPTION_COOKIE, { path: "/" });
			},

			// it removes the cookie information
			clearPrescription: function () {
				$cookies.remove(PRESCRIPTION_COOKIE, { path: "/" });
			},

			/**
			 * Returns the list of account prescriptions for the registered user
			 * @returns {Array}
			 */
			retrieveFromMyAccount: function() {
				var url  = baseurl + '/wcs/resources/store/' + constants.ajaxParams["storeId"] + '/wcs/prescription/user/@self?nocache=' + (new Date().getTime().toString());
				return new Promise(function (resolve, reject) {
					$http.get(url).then(function (response) {
						if (response.data) {
							const prescriptions = response.data.resultList.map(p => ({
								prescriptionId: p.prescriptionId,
								SPH: {
									OD: +(p.rightSphere || "0.0"),
									OS: +(p.leftSphere || "0.0")
								},
								CYL: {
									OD: +(p.rightCyl || "0.0"),
									OS: +(p.leftCyl || "0.0")
								},
								AX: {
									OD: +(p.rightAxis || "0.0"),
									OS: +(p.leftAxis || "0.0")
								},
								ADD: {
									OD: +(p.rightAdd || "0"),
									OS: +(p.leftAdd || "0")
								},
								PD: {
									OD: +(p.pupillaryDistance || p.rpDistance),
									OS: p.lpDistance !== null ? +(p.lpDistance) : null
								},
								PRISM_ENABLED: p.prismEnable === 'true',
							    VPRISM: {
							    	OD: p.odVPrism !== null ? +(p.odVPrism) : null,
							        OS: p.osVPrism !== null ? +(p.osVPrism) : null,
							    },
							    VBASEDIR: {
							    	OD: p.odVPrismBaseDir,
									OS: p.osVPrismBaseDir,
							    },
							    HPRISM: {
							    	OD: p.odHPrism !== null ? +(p.odHPrism) : null,
									OS: p.osHPrism !== null ? +(p.osHPrism) : null,
							    },
							    HBASEDIR: {
							    	OD: p.odHPrismBaseDir,
									OS: p.osHPrismBaseDir,
							    },
								name: p.prescriptionName,
								lastUpdate: p.lastUpdate,
								issueDate: p.issue,
								expireDate: p.expiration
							}))
							resolve(prescriptions);
						} else {
							reject(null);
						}
					},
					function (response) {
						reject(null);
					})
				})
			},

			/**
			 * Saves a prescription in the registered user's account
			 * @param {object} _prescriptionObject 
			 * @returns {object}
			 */
			saveToMyAccount: function(_prescriptionObject) {
				var prescriptionType = "ST";
				if (typeof _prescriptionObject.ADD_OS !== undefined && _prescriptionObject.ADD_OS != null 
					|| typeof _prescriptionObject.ADD_OD !== undefined && _prescriptionObject.ADD_OD != null) {
					prescriptionType = "MF";
				}

				var pupillaryDistance = parseInt(_prescriptionObject.PD_OD);
				var rPDistance = null;
				var lPDistance = null;
				
				if (typeof _prescriptionObject.PD_OS !== undefined && _prescriptionObject.PD_OS != null) {
				      pupillaryDistance = null;
				      rPDistance = parseInt(_prescriptionObject.PD_OD);
				      lPDistance = parseInt(_prescriptionObject.PD_OS);
				}

				var prescription = {
					prescriptionId: _prescriptionObject.prescriptionId,
					prescriptionName: _prescriptionObject.name,
					prescriptionType: prescriptionType,
					prescriptionOrigin: "MANUAL",
					prescriptionOriginMode: "rxcPrescription",
					firstName: "", // TODO
					lastName: "", // TODO

					rightSphere: _prescriptionObject.SPH_OD,
					leftSphere: _prescriptionObject.SPH_OS,
					rightCyl: _prescriptionObject.CYL_OD,
					leftCyl: _prescriptionObject.CYL_OS,
					rightAxis: _prescriptionObject.AX_OD,
					leftAxis: _prescriptionObject.AX_OS,
					rightAdd: _prescriptionObject.ADD_OD,
					leftAdd: _prescriptionObject.ADD_OS,
					pupillaryDistance: pupillaryDistance,
					rPDistance: rPDistance,
					lPDistance: lPDistance,

					odHPrism: _prescriptionObject.HPRISM_OD,
					odVPrism: _prescriptionObject.VPRISM_OD,
					odHPrismBaseDir: _prescriptionObject.HBASEDIR_OD,
					odVPrismBaseDir: _prescriptionObject.VBASEDIR_OD,
					osHPrism: _prescriptionObject.HPRISM_OS,
					osVPrism: _prescriptionObject.VPRISM_OS,
					osHPrismBaseDir: _prescriptionObject.HBASEDIR_OS,
					osVPrismBaseDir: _prescriptionObject.VBASEDIR_OS,
					prismEnable: _prescriptionObject.PRISM_ENABLED,
				};

				var endpoint = '/wcs/resources/store/' + constants.ajaxParams['storeId'] + '/wcs/prescription/';
				if (typeof _prescriptionObject.prescriptionId != 'undefined' && _prescriptionObject.prescriptionId !== null) {
					endpoint += 'user/@self/' + _prescriptionObject.prescriptionId;
				} else {
					endpoint += 'user/@self';
				}

				$http.post(endpoint, prescription).then(
					function (response) {
						if (!!response.data.prescriptionId) {
							var newPrescriptionObject = angular.copy(_prescriptionObject);
							
							newPrescriptionObject.prescriptionId = response.data.prescriptionId;

							document.cookie = PRESCRIPTION_COOKIE +
								"=" +
								encodeURIComponent(JSON.stringify(newPrescriptionObject)) +
								"; path=/";
						} else {
							$log.error("Couldn't save prescription to my account", response.data);
						}
					},
					function (error) {
						$log.error(error);
					}
				);
				
				return prescription;
			},
		};
	}
);
;
var headerModule = angular.module('headerModule', []);

headerModule.factory('headerModule', function ($rootScope, $location, $http, $httpParamSerializerJQLike, $q, $cookies, $log) {
	
	// Defaults to US
	var params = {
		storeId: '',
		catalogId: '',
		langId: '',
	};
	
	function getCartItemsURL() {
		return '/wcs/resources/store/' + params.storeId + '/cart/@self';
	};
	
	function getUserDataURL() {
		return '/wcs/resources/store/' + params.storeId + '/usercontext/@self/contextdata';
	};
	
	function getWishListItemsURL() {
		return '/wcs/resources/store/' + params.storeId + '/catalog/' + params.catalogId + '/saveditems/@self/count?nocache=' + new Date().getTime();
	};
	
    return {
    	
    	/***
    	 * Init header module with context params
    	 */
    	init: function(_params) {
    		if (_params) {
    			params = _params;
    		}
    	},
    	
    	/***
    	 * Get device type from screen size
    	 */
    	getDeviceType: function(width){

    		if(width < 414){
				$rootScope.deviceType = 'M'; //mobile
			}else if(width <= 1024){
				$rootScope.deviceType = 'T'; //tablet
			}else if(width > 1024){
				$rootScope.deviceType = 'D'; //desktop
			}
    	},
       
    	/***
         *  Get number of items in cart
         *  it calculates all items that are not warranty and lenses
         */
        getCartItems: function() {
    
        	var _defer = $q.defer();
        	
        	$http.get(getCartItemsURL())
			.then(function (response) {
				if (response && response.data.recordSetTotal > 0) {
					
					var items =  response.data.orderItem.filter(function(item){
						if(item.comments == 'EYE' || item.comments == 'SUN' || item.comments == 'LCON' || item.comments == 'RCON')
							return true;
						else
							return false;
					});
					
					_defer.resolve(items.length);
				} 
			}, function (error) {
				_defer.resolve(0);
			})
			
			return _defer.promise;
        },

    	/***
         *  Get number of items in wishlist
         */
        getWishListItems: function() {
        	
        	var _defer = $q.defer();
        	
        	$http.get(getWishListItemsURL())
        	.then(function (response) {
        		if (response && response.data.response) {
        			_defer.resolve(response.data.response);
        		} 
        	}, function (error) {
        		_defer.resolve(0);
        	})
        	
        	return _defer.promise;
        },
        
        /***
         *  Get user type
         */
        getUserType: function(){
    		var _defer = $q.defer();
        	
        	$http.get(getUserDataURL())
			.then(function (response) {
				if (response && response.data && response.data.basicInfo) {
					
					_defer.resolve(response);
				} 
			}, function (error) {
				_defer.resolve('G');
			})
			
			return _defer.promise;
        },

		/***
         *  Get user id
         */
		getUserId: function() {
			var _defer = $q.defer();
        	
        	$http.get(getUserDataURL())
			.then(function (response) {
				if (response && response.data) {
					
					_defer.resolve(response.data.basicInfo.callerId);
				} 
			}, function (error) {
				_defer.resolve(-1002);
			})
			
			return _defer.promise;
		},
    }
});;
app.controller("loginController", [
	"$scope",
	"$rootScope",
	"$http",
	"$window",
	"$log",
	"$loader",
	"$timeout",
	"$httpParamSerializer",
	function (
		$scope,
		$rootScope,
		$http,
		$window,
		$log,
		$loader,
		$timeout,
		$httpParamSerializer
	) {
		$scope.modalLogin = false;
		$scope.errorMember = false;
		$scope.errorGuest = false;
		$scope.errorMailMember = false;
		$scope.errorPswMember = false;
		$scope.errorMessageMember = false;
		$scope.isLoading = false;
		$scope.errorMessage = "";

		// repeat callback every delay ms until it succeeds, useful when callback has to
		// wait for objects loaded asyncronously
		function retryUntilSuccess(callback, delay) {
			delay = delay || 250;

			var interval = setInterval(function () {
				try {
					callback();
					// if successful stop repeating this function
					// window.alert("success");
					clearInterval(interval);
				} catch (error) {
					// do nothing
				}
			}, delay);
		}

		function gapiInit() {
			gapi.load("auth2", function () {
				// Retrieve the singleton for the GoogleAuth library and set up the client.
				auth2 = gapi.auth2.init({
					client_id:
						"533440147216-movcp87bjdk395bi3bi2aqmrm1tl91o1.apps.googleusercontent.com",
					// Request scopes in addition to 'profile' and 'email'
					//scope: 'additional_scope'
				});
				attachSignin(document.getElementById("customBtn"));
			});
		}

		function FBInit() {
			FB.Event.subscribe("auth.statusChange", function (response) {
				if (response.status === "connected") {
					$scope.loginFB(response);
				}
			});
			return true;
		}

		// gapi might not be loaded initially
		retryUntilSuccess(gapiInit);
		retryUntilSuccess(FBInit);

		function attachSignin(element) {
			console.log(element.id);
			auth2.attachClickHandler(
				element,
				{},
				function (googleUser) {
					$scope.loginGoogle(googleUser);
				},
				function (error) {
					obj = {
						id: "Error",
						Error_Source: "Server",
						Error_Code: "Login",
						Error_Message: "Login Request Failed with Google",
					};
					tealium_data2track.push(obj);
					console.log("Login error with Google");
				}
			);
		}

		$scope.logoutFB = function () {
			FB.logout(function (response) {
				console.log("User signed out - FB.");
			});
		};

		$scope.signOut = function () {
			var auth2 = gapi.auth2.getAuthInstance();
			auth2.signOut().then(function () {
				console.log("User signed out - Google.");
			});
		};

		$scope.loginFB = function (responseLogin) {
			FB.api("/me?fields=name,email", function (response) {
				var data = JSON.stringify({
					authorizationProvider: responseLogin.loginSource,
					accessToken: responseLogin.authResponse.accessToken,
					name: response.name,
					email: response.email,
					logonId: response.email,
				});
				//responseLogin.authResponse.userID
				$scope.loginBE(data);
			});
		};

		$scope.loginGoogle = function (googleUser) {
			var profile = googleUser.getBasicProfile();
			var access = googleUser.getAuthResponse();

			var data = JSON.stringify({
				authorizationProvider: access.idpId,
				accessToken: access.id_token,
				name: profile.getName(),
				email: profile.getEmail(),
				logonId: profile.getEmail(),
			});
			//getId
			$scope.loginBE(data);
		};

		$scope.loginBE = function (data) {
			$scope.url =
				"https://" +
				window.location.host +
				"/wcs/resources/store/" +
				storeId +
				"/loginidentity/oauth_validate?updateCookies=true";
			$scope.loginCheckout = document.getElementById("loginCheckout");
			$http({
				method: "POST",
				url: $scope.url,
				headers: {
					"Content-Type": "application/json",
				},
				data: data,
			}).then(
				function successCallback(response) {
					if ($scope.isCheckout) {
						$scope.afterLogin();
					} else if ($scope.loginCheckout != null) {
						location.reload();
					} else {
						window.location.href = response.data.redirectURL;
					}
				},
				function errorCallback(response) {
					obj = {
						id: "Error",
						Error_Source: "Server",
						Error_Code: "Login",
						Error_Message: "Login Request Failed with Social Login",
					};
					tealium_data2track.push(obj);
					$scope.errorMessageMember = true;
					$scope.errorMessage = "Error with social login";
					$scope.$digest();
				}
			);
		};

		$scope.openModalLogin = function () {
			$scope.userType = document.getElementById("userType").value;
			if (
				$scope.userType === "R" ||
				(sessionStorage.getItem("mail_checkout") &&
					sessionStorage.getItem("mail_checkout") !== "")
			) {
				$scope.goToCheckout();
			} else {
				document.querySelector(".nav-links").style.zIndex = "unset"; // header navigation fix
				$scope.modalLogin = true;
				$scope.toggleLockPageScroll(true);
				$scope.isCheckout = true;
			}
		};

		$scope.closeModalLogin = function () {
			$scope.modalLogin = false;
			$scope.toggleLockPageScroll(false);
			$scope.errorMember = false;
			$scope.errorGuest = false;
			$scope.errorMailMember = false;
			$scope.errorPswMember = false;
			$scope.errorMessageMember = false;
			$scope.loginGuestValue = "";
			$scope.errorMessage = "";
			$scope.loginMemberMailValue = "";
			$scope.loginMemberPswValue = "";
			document.querySelector(".nav-links").style.zIndex = 999; // header navigation fix
		};

		$scope.toggleLockPageScroll = function (lock) {
			document.querySelectorAll("html,body").forEach((elem) => {
				elem.style.overflow = lock ? "hidden" : "";
				elem.style.position = lock ? "fixed" : "";
				elem.style.height = lock ? "100%" : "";
			});
		};

		$scope.$watch("loginGuestValue", function () {
			if ($scope.errorGuest) {
				$scope.errorGuest = false;
			}
		});

		$scope.loginGuest = function () {
			$loader.show("login-guest");
			if (
				$scope.loginGuestValue &&
				$scope.validateEmail($scope.loginGuestValue)
			) {
				sessionStorage.setItem("mail_checkout", $scope.loginGuestValue);
				//$scope.closeModalLogin();
				$scope.goToCheckout();
			} else {
				$scope.errorGuest = true;
				$loader.hide();
			}
		};

		$scope.FBLoginCustom = function () {
			FB.login(function (response) {}, {
				scope: "public_profile,email",
			});
		};

		$scope.validateEmail = function (email) {
			const re =
				/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test(email);
		};

		$scope.$watch("loginMemberMailValue", function () {
			if ($scope.errorMailMember) {
				$scope.errorMailMember = false;
			} else if ($scope.errorMessageMember) {
				$scope.errorMessageMember = false;
			}
		});
		$scope.$watch("loginMemberPswValue", function () {
			if ($scope.errorPswMember) {
				$scope.errorPswMember = false;
			} else if ($scope.errorMessageMember) {
				$scope.errorMessageMember = false;
			}
		});

		$scope.loginMember = function () {
			if (
				!(
					$scope.loginMemberMailValue &&
					$scope.validateEmail($scope.loginMemberMailValue)
				) ||
				!$scope.loginMemberPswValue
			) {
				if (
					!(
						$scope.loginMemberMailValue &&
						$scope.validateEmail($scope.loginMemberMailValue)
					)
				)
					$scope.errorMailMember = true;
				if (!$scope.loginMemberPswValue) $scope.errorPswMember = true;
			} else {
				var f = $("#LogonFormModal");
				utag_data.form_name = "logon modal";
				utag_data.form_field = error_list;
				var optinEmail = false;

				var data = f.serializeArray(),
					newData = [],
					originalURL = null;

				// since this is a jsonp request, we always set the destination URL to a jsonp-compatible page
				for (var i = 0; i < data.length; i++) {
					var d = data[i];
					if (d["name"] == "receiveEmail" && d["value"] == "on") {
						d["value"] = true;
						optinEmail = true;
					}

					if (d["name"] == "URL") {
						originalURL = d["value"];

						newData.push({
							name: "URL",
							value: "LogonAjaxView",
						});
					} else {
						newData.push(d);
					}
				}
				
				if($scope.isLoading == false){
					$loader.show("login-member");
					$scope.isLoading = true;
				}

                $.ajax({
                    url: getAbsoluteURL(true) + 'LogonAjax',
                    data: newData,
                    type: 'POST',
                    dataType: 'json',
                    success: function(data) {
                    	if(data == null || (data.passwordExpired && data.passwordExpired == '1')) {
                    		$scope.errorMessageMember = true;
                    		$scope.errorMessage = 'Your password has expired. Please click below to receive an email with a link to reset your password.';
                            $scope.$digest();
                        	obj = {
                    			id: 'Error',
                    			Error_Source: "User",
                    			Error_Code: "Login",
                    			Error_Message: 'Your password has expired'
                    		}
                    		tealium_data2track.push(obj);
    					} else if (data.success) {
    						var User_Email_MD5 = '';
    						var User_Email_SHA256 = '';
    						var trimmedLowerMail = '';
    	    				
    	    				if(data.email){
    	    					trimmedLowerMail = data.email.trim().toLowerCase();
    	    					User_Email_MD5 = MD5(data.email);
    							User_Email_SHA256 = sha256(trimmedLowerMail);
    	    				}
    	    				
    	    				if(data.hasPrescriptions === 'true') {
    	    					sessionStorage.setItem('User_HasPrescription', '1');
    	    					utag_data.User_HasPrescription = "1";
    	    				} else {
    	    					sessionStorage.removeItem('User_HasPrescription');
    	    				}
    						
                            $scope.closeModalLogin();
                            sessionStorage.setItem('Events_UserAccountLogin', '1');
                            sessionStorage.setItem('Events_UserAccountLogin_userLogin', '1');
                            sessionStorage.setItem('User_Email_MD5', User_Email_MD5);
                            sessionStorage.setItem('User_Email_SHA256', User_Email_SHA256);
                            
                            if($scope.isCheckout) {
                                $scope.afterLogin();
                            }
                        } else if (data.errorMessage.includes('PSW_RST')) {
							//open modal update password (reset)
							var fromResetPassword = showLogonModal();
							if (!fromResetPassword) {
								//not from reset password procedure
								$(".header-update-reset-password-modal").css(
									"display",
									"block"
								);
							}
							if ($(".thank-you-page-overlay")) {
								$(".thank-you-page-overlay").removeClass("hidden");
							}
							$("#myaccount-rectangle > .backdrop").removeClass("hide");
							$(".header-sign-in-modal").css("display", "none");
							$("#myaccount-rectangle").removeClass("hide");
							$("#passwordUpdateEmailInput").val(
								data.errorMessage.split("PSW_RST:")[1]
							);
							$scope.closeModalLogin();
						} else {
							obj = {
								id: "Error",
								Error_Source: "User",
								Error_Code: "Form Filling Error - Login",
								Error_Details:
									"Wrong Email, Wrong Password - " + data.errorMessage,
								Error_Message:
									"We couldn’t find a member account associated with your email address. If you use this email with a social account, please use social login to proceed.",
							};
							tealium_data2track.push(obj);
							$scope.errorMessageMember = true;
							$scope.errorMessage =
								"We couldn’t find a member account associated with your email address. If you use this email with a social account, please use social login to proceed.";
							$scope.$digest();
						}
						$loader.hide();
						$scope.isLoading = false;
					},
					error: function (jqXHR, textStatus, errorThrown) {
						//unexpected error case - system error
						$scope.errorMessageMember = true;
						$scope.errorMessage = textStatus;
						$loader.hide();
						obj = {
							id: "Error",
							Error_Source: "Server",
							Error_Code: "Login",
							Error_Message: "Login Request Failed",
						};
						tealium_data2track.push(obj);
					},
				});
			}
		};

		$scope.afterLogin = function () {
			$scope.goToCheckout();
		};

		$scope.goToCheckout = function () {
			$scope.userType = document.getElementById("userType").value;
			$scope.nextStepURL = document.getElementById("nextStepURL").value;
			$scope.PhysicalStoreSelectionURL = document.getElementById(
				"PhysicalStoreSelectionURL"
			).value;
			$timeout(function () {
				if (
					CheckoutHelperJS.canCheckoutContinue($scope.userType) &&
					CheckoutHelperJS.updateShoppingCart(document.ShopCartForm, true)
				) {
					ShipmodeSelectionExtJS.guestShopperContinue(
						$scope.nextStepURL,
						$scope.PhysicalStoreSelectionURL
					);
				}
			}, 500);
		};

		$scope.loginFormSubmit = false;
		$scope.loginError = null;
		
		if (document.getElementsByClassName("login-error").length) {
			document.getElementsByClassName("login-error")[0].style.display = 'none';
		}
		
		$scope.passwordExpired;

		$scope.submitLoginForm = function () {
			// Trigger validation
			angular.forEach($scope.loginForm.$$controls, function (field) {
				field.$setTouched();
			});

			if (
				$scope.loginForm.$valid &&
				$scope.loginFormData &&
				!$scope.loginFormSubmit
			) {
				// Disable the submit button
				$scope.loginFormSubmit = true;
				// Reset the login error
				$scope.loginError = null;
				
				if (document.getElementsByClassName("login-error").length && document.getElementById("loginErrorHtml")) {
					document.getElementsByClassName("login-error")[0].style.display = 'none';
					document.getElementById("loginErrorHtml").innerHTML = "";
				}

				// Copy form data to avoid changes
				var loginFormDataCopy = angular.copy($scope.loginFormData);

				// Save the login URL to use it for redirect
				var originalURL = loginFormDataCopy.URL;

				// Callback for the registration command
				loginFormDataCopy.URL = getAbsoluteURL(true) + "LogonAjaxView";

				$http
					.post(
						getAbsoluteURL(true) + "LogonAjax",
						$httpParamSerializer(loginFormDataCopy),
						{
							headers: {
								"Content-Type": "application/x-www-form-urlencoded",
							},
							responseType: "json",
						}
					)
					.then(function (response) {
						$log.info(response);

						if (response.data) {
							if (
								response.data.passwordExpired &&
								response.data.passwordExpired == "1"
							) {
								if (document.getElementsByClassName("login-error").length && document.getElementById("loginErrorHtml")) {
									document.getElementsByClassName("login-error")[0].style.display = 'block';
									document.getElementById("loginErrorHtml").innerHTML = "Your password has expired. Please click below to receive an email with a link to reset your password.";
								}
								
								try {
									var obj = {
										id: "Error",
										Error_Source: "User",
										Error_Code: "Login",
										Error_Message: "Your password has expired",
									};

									tealium_data2track.push(obj);
								} catch (e) {
									$log.error(e);
								}
							} else if (loginFormDataCopy.fromSubmitReview) {
								$window.location = ReviewSuccessURL;
							} else if (response.data.success) {
								$log.info("insert eaactivity cookie from logonFormSubmit");
								document.cookie = "eaactivity=true; max-age=2592000; path=/";

								var User_Email_MD5 = '';
	    						var User_Email_SHA256 = '';
	    						var trimmedLowerMail = '';
	    	    				
	    	    				if($scope.loginFormData.logonId){
	    	    					trimmedLowerMail = $scope.loginFormData.logonId.trim().toLowerCase();
	    	    					User_Email_MD5 = MD5(trimmedLowerMail);
	    							User_Email_SHA256 = sha256(trimmedLowerMail);
	    	    				}
	    	    				
	    	    				if(response.data.hasPrescriptions === 'true') {
	    	    					sessionStorage.setItem('User_HasPrescription', '1');
	    	    				} else {
	    	    					sessionStorage.removeItem('User_HasPrescription');
	    	    				}
	    					
	                            $scope.closeModalLogin();
	                            sessionStorage.setItem('Events_UserAccountLogin', '1');
	                            sessionStorage.setItem('Events_UserAccountLogin_userLogin', '1');
	                            sessionStorage.setItem('User_Email_MD5', User_Email_MD5);
	                            sessionStorage.setItem('User_Email_SHA256', User_Email_SHA256);
	                            
	                            if($scope.isCheckout) {
	                                $scope.afterLogin();
	                            }
	                            
								// START Analytics Framework
								try {
									var utagData = {
										site_events: {
											authentication_complete: true,
										},
										authentication_status: "authenticated",
										registration_status: "registered",
									};

									callTrackAnalytics(utagData);
								} catch (e) {
									$log.error(e);
								}

								try {
									var obj = {
										id: "WCS-D-Login", // utag_data properties
									};

									tealium_data2track.push(obj);
								} catch (e) {
									$log.error(e);
								}
								// END Analytics Framework

								var nextUrl = originalURL;

								if (
									nextUrl.length &&
									nextUrl.charAt(nextUrl.length - 1) == "#"
								) {
									nextUrl = nextUrl.substring(0, x.length - 1);
								}

								$window.location = nextUrl;
							} else {
								if (
									response.data.errorMessage == "EXIST_IN_US"
								) {
									if (document.getElementsByClassName("login-error").length && document.getElementById("loginErrorHtml")) {
										document.getElementsByClassName("login-error")[0].style.display = 'block';
										document.getElementById("loginErrorHtml").innerHTML = MessageHelper.messages["ERR_MSG_DID_YOU_MEAN"] +
											"&nbsp;<a target='_blank' href='" + MessageHelper.messages["RediectHomePageURL"] + "'>" +
											MessageHelper.messages["LenscrafterUS"] + "</a>?";
									}
								} else if (
									response.data.errorMessage == "EXIST_IN_CA"
								) {
									if (document.getElementsByClassName("login-error").length && document.getElementById("loginErrorHtml")) {
										document.getElementsByClassName("login-error")[0].style.display = 'block';
										document.getElementById("loginErrorHtml").innerHTML = MessageHelper.messages["ERR_MSG_DID_YOU_MEAN"] +
											"&nbsp;<a target='_blank' href='" +	MessageHelper.messages["RediectHomePageURL"] + "'>" +
											MessageHelper.messages["LenscrafterCA"] + "</a>?";
									}
								} else if (
										response.data.errorMessage.includes('PSW_RST')
										) {
									//open modal update password (reset)
									var fromResetPassword=showLogonModal();
									if(!fromResetPassword){//not from reset password procedure
										$('.header-update-reset-password-modal').css('display', 'block');
									}
									if($(".thank-you-page-overlay")){
										$(".thank-you-page-overlay").removeClass('hidden');
									}
									$('#myaccount-rectangle > .backdrop').removeClass('hide');
									$('.header-sign-in-modal').css('display', 'none');
									$('#myaccount-rectangle').removeClass("hide");
									$("#passwordUpdateEmailInput").val(response.data.errorMessage.split('PSW_RST:')[1]);
								}							
								
								else {
									if(response.data.errorCode == "2030") {
										if (document.getElementsByClassName("login-error").length && document.getElementById("loginErrorHtml")) {
											document.getElementsByClassName("login-error")[0].style.display = 'block';
											document.getElementById("loginErrorHtml").innerHTML = "Your email and/or password is incorrect.<br>If you feel that this is an error, please contact customer service.";
										}
									} else {
										if (document.getElementsByClassName("login-error").length && document.getElementById("loginErrorHtml")) {
											document.getElementsByClassName("login-error")[0].style.display = 'block';
											document.getElementById("loginErrorHtml").innerHTML = response.data.errorMessage;
										}
									}
								}

								// START Analytics Framework
								try {
									var obj = {
										id: "Error",
										Error_Source: "User",
										Error_Code: "Login",
										Error_Message: "Wrong Email, Wrong Password",
									};

									tealium_data2track.push(obj);
								} catch (e) {
									$log.error(e);
								}
								// END Analytics Framework
							}
						} else {
							throw new Error();
						}
					})
					.catch(function (error) {
						$log.error(error);
						
						if (document.getElementsByClassName("login-error").length && document.getElementById("loginErrorHtml")) {
							document.getElementsByClassName("login-error")[0].style.display = 'block';
							document.getElementById("loginErrorHtml").innerHTML = "An error occurred while logging into the account";
						}
					})
					.finally(function () {
						// Re-enable the submit button
						$scope.loginFormSubmit = false;
					});
			}
		};
	},
]);
;
var lcActionsModule = angular.module('lcActionsModule', []);

lcActionsModule.factory('lcActionsModule', function($rootScope, $http, $httpParamSerializerJQLike, $q, $log, $cookies) {

	var actionsModule = {
		CALLERID_PDP: "PDP",
		CALLERID_CART: "CART",

		CLOSE_ACTION_CANCEL: "cancel",
		CLOSE_ACTION_SAVE: "save",
		CLOSE_ACTION_ADDTOCART: "addtocart",
		CLOSE_ACTION_APPLY: "apply",

		// modal visibility
		isVisible: false,

		// Add to cart
		isAddingToCart: false,

		// caller
		callerId: null,

		// selected perk code
		selectedPerkCode: null,

		/**
		 * @deprecated
		 */
		open: function (_params, _callerId, _context) {
			// event
			$rootScope.$broadcast("lenspanel:opened", _params, _callerId, _context);

			actionsModule.callerId = _callerId;
			actionsModule.isVisible = true;
		},

		/**
		 * @deprecated
		 */
		close: function (_action, _params) {
			actionsModule.isVisible = false;

			// event
			$rootScope.$broadcast(
				"lenspanel:closed",
				actionsModule.callerId,
				_action || actionsModule.CLOSE_ACTION_CANCEL,
				_params
			);

			actionsModule.callerId = null;
		},

		/**
		 * @deprecated
		 */
		addToCart: function (_params) {
			var _defer = $q.defer();

			if (actionsModule.isAddingToCart) {
				_defer.reject();
				return _defer;
			}

			actionsModule.isAddingToCart = true;

			$http
				.post(
					getAbsoluteURL() + "LCOrderItemAddGlassesCmd",
					$httpParamSerializerJQLike(_params),
					{
						headers: { "Content-Type": "application/x-www-form-urlencoded" },
					}
				)
				.then(
					function (response) {
						var _data = response.data;

						if (typeof _data === "string") {
							_data = _data ? _data.replace("/*", "").replace("*/", "") : {};
							_data = JSON.parse(_data);
						}

						actionsModule.isAddingToCart = false;

						if (_data.errorMessage) {
							_defer.reject(_data.errorMessage);
						} else {
							_defer.resolve(response.data);
						}
					},
					function (error) {
						$log.error(error);

						actionsModule.isAddingToCart = false;

						_defer.reject("Cannot add to cart");
					}
				);

			return _defer.promise;
		},

		/**
		 * External function for RXC to add to cart, it also handles the warranty
		 * @param {object} _selectedFrame
		 * @param {object} _selectedLens
		 * @param {object} _selectedWarranty
		 * @returns {Promise}
		 */
		genericAddToCart: function (
			_selectedFrame,
			_selectedLens,
			_selectedWarranty
		) {
			var _params = {
				frameCatentryId: _selectedFrame.catEntryId,
				lensColor: _selectedLens.lensPackage.color || "",
				lens: "" + _selectedLens.lensPackage.catEntryId,
				orderId: ".",
				URL: "",
				addOns: "",
				includeLens: true,
				tah: false,
			};

			$cookies.put('cookie_last_selected_lens', _selectedLens.lensPackage.upc, { path: '/' });
			
			if (_selectedLens.lensPackage.type) {
				const lensType = _selectedLens.lensPackage.type.toLowerCase().replaceAll(" ","_").replaceAll("-","_").trim();
				
				if (lensType === "non_prescription" || lensType === "frame_only") {
	            	$cookies.remove("prescriptionObject", { path: '/' } );
	            }
			}
			
			if (_selectedWarranty) {
				_params.warrantyCatentryId = _selectedWarranty.id;
				_params.addWarranty = true;
			}

			var _defer = $q.defer();

			if (actionsModule.isAddingToCart) {
				_defer.reject();
				return _defer;
			}

			actionsModule.isAddingToCart = true;

			$http
				.post(
					getAbsoluteURL() + "LCOrderItemAddGlassesCmd",
					$httpParamSerializerJQLike(_params),
					{
						headers: { "Content-Type": "application/x-www-form-urlencoded" },
					}
				)
				.then(
					function (response) {
						var _data = response.data;

						const PRESCRIPTIONOBJECT = "prescriptionObject";

						if (typeof _data === "string") {
							_data = _data ? _data.replace("/*", "").replace("*/", "") : {};
							_data = JSON.parse(_data);
						}
						
                        var orderItemId=_data.frameOrderItemId;
                        var baseurl = window.location.protocol + '//' +  window.location.hostname;
                        var url = baseurl + '/wcs/resources/store/' + constants.ajaxParams["storeId"] + '/rxc/prescription/insert/' + orderItemId;
                        var body = getCookie(PRESCRIPTIONOBJECT);
                        $cookies.remove( PRESCRIPTIONOBJECT , { path: '/' } );
   
                        if(body !== null && body !== undefined && body !== ""){
                        	$http.post(url, body).then(function (response) {
                        	//	console.log(response);
                        	}, function (response) {
                        		//  alert("Something gone wrong with your prescription");
                        	});
                        }
                        
                        actionsModule.isAddingToCart = false;

						if (_data.errorMessage) {
							_defer.reject(_data.errorMessage);
						} else {
							_defer.resolve(response.data);

							var _cartParams =
								"" +
								"storeId=" +
								constants.ajaxParams["storeId"] +
								"&catalogId=" +
								constants.ajaxParams["catalogId"] +
								"&langId=" +
								(constants.ajaxParams["langId"] || "-1") +
								"&URL=AjaxOrderItemDisplayView" +
								"&errorViewName=AjaxOrderItemDisplayView" +
								"&orderId=." +
								"&updatePrices=1" +
								"&calculationUsageId=-1" +
								"&chooseBenefit=false";

							window.location =
								getAbsoluteURL() + "OrderCalculate?" + _cartParams;
						}
					},
					function (error) {
						$log.error(error);

						actionsModule.isAddingToCart = false;
						
						var obj = {
								id: 'Error',
								Error_Source: 'Server',
								Error_Code: 'PDP',
								Error_Detail: 'Cannot add to cart'
						};
						_defer.reject("Cannot add to cart");
					}
				);

			return _defer.promise;
		},

		/**
		 * External function for RXC to save lens selection
		 * @param {object} _selectedFrame
		 * @param {object} _selectedLens
		 * @param {object} _selectedWarranty
		 * @param {object} _selectedFrameBrandImage
		 */
		genericSaveLensSelection: function (
			_selectedFrame,
			_selectedLens,
			_selectedWarranty,
			_selectedFrameBrandImage
		) {
			$rootScope.$apply(function () {
				$rootScope.rxc.selectedLens = _selectedLens;
				$rootScope.rxc.selectedWarranty = _selectedWarranty;
				$rootScope.rxc.selectedFrame = _selectedFrame;
				$rootScope.rxc.selectedFrameBrandImage = _selectedFrameBrandImage;
				$rootScope.genericCalculatePrices();
			});
			
			$cookies.put('cookie_last_selected_lens', _selectedLens.upc, { path: '/' });
		},

		/**
		 * External function for RXC to release widget
		 */
		genericExit: function () {
			
			const PRESCRIPTIONOBJECT="prescriptionObject";
			$cookies.remove( PRESCRIPTIONOBJECT , { path: '/' } );
			// workaround to hide cart header
			document.getElementById("header_wrapper").style.zIndex = "";
			document.querySelector(".nav-links").style.zIndex = "999";

			// Reset chat button position when closing RXC
			var chatButtonElem = document.getElementsByClassName('cx-side-button-group');

			if (chatButtonElem && chatButtonElem.length && !(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))) {
				chatButtonElem = chatButtonElem[0];
				chatButtonElem.style.setProperty('right', '0', 'important');
			}

			window.history.replaceState(null, "", window.location.pathname);
			
			$rootScope.$apply(function () {
				delete $rootScope.rxc.rxcWidget;

				window.history.go($rootScope.oldHistoryLength - history.length); // go back to last URL not in rxc
				// remove trash from browser history caused by rxc navigation
				// timeouts necessary because history API is rate limited
				setTimeout(function () { window.history.pushState(null, ""); }, 100); // push to history to erase following bro$
				setTimeout(function () { window.history.back(); }, 200); // go back one
			});
		},

		/**
		 * External function for RXC to save lens selection in cart
		 * @param {object} _selectedFrame
		 * @param {object} _selectedLens
		 * @param {object} _selectedWarranty
		 * @param {object} _cartData
		 */
		genericSaveEditFromCart: function (
			_selectedFrame,
			_selectedLens,
			_selectedWarranty,
			_cartData
		) {
			var params = {
				orderId: ".",
				lensCatentryId: "" + _selectedLens.lensPackage.catEntryId,
				lensColor: _selectedLens.lensPackage.color || "",
				lens: "" + _selectedLens.lensPackage.catEntryId,
				addOns: "",
				URL: "",
				includeLens: true,
				orderItemId: _cartData.orderItemId,
				fromPage: "ShopCart",
				addRxLenses: true,
			};
			
			const lensType = _selectedLens.lensPackage.type.toLowerCase().replaceAll(" ","_").replaceAll("-","_").trim();
            if (lensType === "non_prescription" || lensType === "frame_only") {
                    $cookies.remove("prescriptionObject", { path: '/' } );
            }

			if (_selectedWarranty) {
				params.addWarranty = true;
				params.warrantyCatentryId = _selectedWarranty.id;
			}
			/* to be fixed
		        else if (_params.warrantyCatentryIdToRemove){
					params.removeWarranty = true;
					params.warrantyCatentryId = _selectedWarranty.id;
				}*/

			$.ajax({
				//da cambiare in chiamata angular
				type: "POST",
				url: getAbsoluteURL() + "LCUpdateOrderItemLensDataCmd",
				traditional: true,
				data: params,
				success: function (data, textStatus, jqXHR) {
					var toCartParams = $.param({
						storeId: constants.ajaxParams["storeId"],
						catalogId: constants.ajaxParams["catalogId"],
						langId: constants.ajaxParams["langId"],
						URL: "AjaxOrderItemDisplayView",
						errorViewName: "AjaxOrderItemDisplayView",
						orderId: ".",
						updatePrices: "1",
						calculationUsageId: "-1",
					});
					 const PRESCRIPTIONOBJECT="prescriptionObject";
					 var orderItemId= _cartData.orderItemId;
                     var baseurl = window.location.protocol + '//' +  window.location.hostname;
                     var url = baseurl + '/wcs/resources/store/' + constants.ajaxParams["storeId"] + '/rxc/prescription/insert/' + orderItemId;
                     var body=getCookie(PRESCRIPTIONOBJECT);
                     $cookies.remove( PRESCRIPTIONOBJECT , { path: '/' });
                     
                     //Add prescription to frame
                     if(body !== null && body !== undefined && body !== ""){
                    	 $http.post(url, body).then(function (response) {
                     		//console.log(response);
                     	}, function (response) {
                     		//  alert("Something gone wrong with your prescription");
                     	});
                     }

					window.location = getAbsoluteURL() + "OrderCalculate?" + toCartParams;
				},
				error: function (xhr, text, error) {
					console.log(xhr);
				},
			});
		},
		/**
		 * 
		 * @param {string} contentName 
		 * @returns {Promise}
		 */
		loadContent: function (contentName) {
			var _defer = $q.defer();

			var urlPrefix = "";

			if (window.location.href.indexOf("127.0.0.1") != -1) {
				urlPrefix = "https://localhost:8000";
			}

			if ((contentName == 'DESK_PromoBanner' || contentName == 'MOB_PromoBanner') &&
				$rootScope.isGVPFrameAndLens) {
				contentName += '_GVP';
			}

			$http
				.get(
					urlPrefix +
						"/wcs/resources/store/" +
						constants.ajaxParams["storeId"] +
						"/espot/" +
						contentName
				)
				.then(function (res) {
					if (
						res.data.MarketingSpotData &&
						res.data.MarketingSpotData.length > 0 &&
						res.data.MarketingSpotData[0].baseMarketingSpotActivityData &&
						res.data.MarketingSpotData[0].baseMarketingSpotActivityData.length >
							0 &&
						res.data.MarketingSpotData[0].baseMarketingSpotActivityData[0]
							.marketingContentDescription &&
						res.data.MarketingSpotData[0].baseMarketingSpotActivityData[0]
							.marketingContentDescription.length > 0 &&
						res.data.MarketingSpotData[0].baseMarketingSpotActivityData[0]
							.marketingContentDescription[0].marketingText
					) {
						_defer.resolve(
							res.data.MarketingSpotData[0].baseMarketingSpotActivityData[0]
								.marketingContentDescription[0].marketingText
						);
					}
				});

			return _defer.promise;
		},
		/**
		 * 
		 * @param {string} contentName 
		 * @returns {Promise}
		 */
		loadLearnMoreContent: function (contentName) {
			return actionsModule.loadContent(contentName);
		},
	};

	return actionsModule;
});
;
app.factory("PromoPopupService", ["$timeout", "$http", "$httpParamSerializer", function ($timeout, $http, $httpParamSerializer) {
	service = {}
	
	function getCookieValueByName(name) {
		var matches = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
		if (matches) {
			return matches.pop();
		} else {
			return '';
		}
	}

	function getMininmizedCookie() {
		return getCookieValueByName("promo_minimized");
	}

	function setMininmizedCookie() {
		var cookie = (
			"promo_minimized=true;" +
			"max-age=86400;" + // 24 hours
			"path=/"
		);

		document.cookie = cookie;
	}

	function getPromoAcceptedCookie() {
		return getCookieValueByName("promo_accepted");
	}
	
	function getSubscribedCookie() {
		return getCookieValueByName("promo_subscribed");
	}

	function setPromoAcceptedCookie(code) {
		var cookie = (
			"promo_accepted=" + String(code) + ";" +
			"max-age=2592000;" + // 30 days should be enough
			"path=/"
		);

		document.cookie = cookie;

		updatePopupExists();
		updatePromoCodeIsValid();
	}
	
	function setSubscribedCookie(code) {
		var cookie = (
			"promo_subscribed=" + String(code) + ";" +
			"max-age=2592000;" + // 30 days should be enough
			"path=/"
		);

		document.cookie = cookie;

		updateSubscribed();
	}

	function updatePopupExists() {
		var acceptedCookieValue = getPromoAcceptedCookie();
		var eaactivity = getCookieValueByName("eaactivity");
		// check URL parameter promo != "eaccess"
		var promoParam = (new URLSearchParams(window.location.search)).get("promo");
		var cidParam = (new URLSearchParams(window.location.search)).get("cid");

		service.popupExists = (
			acceptedCookieValue !== "invalid" &&
			!eaactivity &&
			promoParam !== "eaccess" &&
			cidParam === null
			// TODO: add other conditions here
		);
	}

	function updatePromoCodeIsValid() {
		var acceptedCookieValue = getPromoAcceptedCookie();

		service.promoCodeIsValid = (
			acceptedCookieValue &&
			acceptedCookieValue !== "invalid"
		);
	};
	
	function updateSubscribed() {
		var subscribedCookieValue = getSubscribedCookie();
		
		service.alreadySubscribeIsValid = (
			subscribedCookieValue &&
			subscribedCookieValue !== "invalid"
		);
	}

	var steps = {
		form: "form",
		wait: "wait",
		success: "success",
		error: "error",
		exist: "exist",
	};


	// INIT
	updatePopupExists();
	updatePromoCodeIsValid();
	updateSubscribed();
	service.storeId = 10851;
	var host = window.location.href;
	
	if(host.indexOf('lenscrafters.com') !== -1 && host.indexOf('en-ca') === -1){
		service.storeId = 10851;
	}else if(host.indexOf('lenscrafters.ca') !== -1 || host.indexOf('en-ca') !== -1){
		service.storeId = 10852;
	}
	
	service.subscribe = {
		"preregister": true,
		"addressType": "M",
		"lcGeneralEmailOptIn": true,
		"ageCheck": true,
		"canAddOrigin": true,
		"optinStatus": true,
		"URL": "SuccessView",
		"storeId": service.storeId,
		"langId": "-1",
		"emailType": "PromoPopup",
		"showRegister": true,
	};
	
	service.popupOpen = false;
	service.waiting = false;
	service.promoCode = getPromoAcceptedCookie();
	service.promoCodeSub = getSubscribedCookie();
	service.promoMinimized = !!getMininmizedCookie();

	if (service.alreadySubscribeIsValid) {
		service.step = steps.exist;
		
		// open popup immediately if the page was refreshed after a success
		if (service.promoCodeSub === "refresh") {
			service.popupOpen = true;
			setSubscribedCookie("valid");
			setPromoAcceptedCookie("valid");
		}
	} else if (service.promoCodeIsValid) {
		service.step = steps.success;

		// open popup immediately if the page was refreshed after a success
		if (service.promoCode === "refresh") {
			service.popupOpen = true;
			setPromoAcceptedCookie("valid");
		}
	} else {
		service.step = steps.form;
	}
	
	var showNLPopupTriggered = false;
	function showNLPopupEventHandler() {
		if (!showNLPopupTriggered) {
			$timeout(function() {
				var rxcApp = document.getElementById("rxcApp");
				if(rxcApp!= undefined && rxcApp.hasChildNodes()){
					console.log("RXPANEL show")
				}else{
					console.log("RXPANEL not show")
					service.popupOpen = true;
					document.removeEventListener('scroll', showNLPopupEventHandler, true);
				}
			}, 3000);

			showNLPopupTriggered = true;
		}
	};

	// open popup after a 3s delay if:
	//     - popup should exist
	//     - there's no promo code cookie set
	//     - no popup minimized cookie exists

	if (service.popupExists && !service.promoCode && !service.promoMinimized /* && page != checkout? */) {
		$timeout(function() {
			document.addEventListener('scroll', showNLPopupEventHandler, true);
		}, 1000);
	}

	service.closePopup = function () {
		service.popupOpen = false;
		
		if (service.promoCode === "invalid") {
			setPromoAcceptedCookie("invalid");
		}
		
		if (!getMininmizedCookie()) {
			setMininmizedCookie();
			service.promoMinimized = true;
		}
	}

	service.removeMinimizedPopup = function () {
		setPromoAcceptedCookie("invalid");
	}

	service.show = function () {
		service.popupOpen = true;
	}

	window.showPromoPopup = function () {
		$timeout(service.show, 0);
	}

	service.submitData = function () {
		var submitURL = getAbsoluteURL() + 'LCEmailSubscription';
		service.errorMessage = "";

		if (!service.subscribe.enteredEmail) {
			return;
		}
		
		var data = {
			preregister: service.subscribe.preregister,
			addressType: service.subscribe.addressType,
			canAddOrigin: service.subscribe.canAddOrigin,
			optinStatus: service.subscribe.optinStatus,
			URL: service.subscribe.URL,
			storeId: service.subscribe.storeId,
			langId: service.subscribe.langId,
			emailType: service.subscribe.emailType,
			showRegister: service.subscribe.showRegister,
			email: service.subscribe.enteredEmail,
		};
		data['lcGeneralEmailOptIn_' + service.storeId + '_r_1'] = service.subscribe.lcGeneralEmailOptIn;
		data['ageCheck_' + service.storeId + '_r_1'] = service.subscribe.ageCheck;
		
		service.waiting = true;
		$http.post(submitURL, $httpParamSerializer(data), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
			.then(
				function (response) {
					if (response.status == 200 && response.data.status == 300) {
						console.log(response.data.message);
						service.registeredEmail = data.email;
						setSubscribedCookie("refresh");
						document.cookie = "eaactivity=true; max-age=2592000; path=/";
						location.reload();
						return;
						//service.errorMessage = 'The e-mail address you provided is already subscribed.';
					} else if (response.status == 200 && response.data.message == "Success") {
						
						var trimmedLowerMail = '';
	    				
	    				if(data.email){
	    					trimmedLowerMail = data.email.trim().toLowerCase();
	    				}
	    				
						tealium_data2track.push({
							id: 'SignupForm',
							User_Email_MD5: MD5(data.email), 
							User_Email_SHA256: sha256(trimmedLowerMail),
						});

						setPromoAcceptedCookie("refresh");
						document.cookie = "eaactivity=true; max-age=2592000; path=/";
						location.reload();
						return;
					} else if (service.subscribe.enteredEmail === undefined) {
						console.log(response.data.message);
						service.errorMessage = 'E-mail subscription error, try later';
					}

					service.waiting = false;
				}
			);
	}
	return service;
}]);

app.controller("PromoPopupController", ["PromoPopupService", "$scope", function (PromoPopupService, $scope) {
	$scope.PromoPopupService = PromoPopupService;

	$scope.$watch("PromoPopupService.popupOpen", function (value) {
		// lock scrolling when popup is open
		angular.element([document.body, document.documentElement])
			.css({"overflow": (value ? "hidden" : "")});
	});
}]);
;

var frameAdvisorModule = angular.module('frameAdvisorModule', ['ngCookies']);

frameAdvisorModule.factory('frameAdvisorFactory', function ($http, $rootScope, $log, $window, $timeout, $cookies) {
    function initConfig() {
        // TODO: cleanup
        const config = {
            locale: ($cookies.get("lcLocale") || "en_US").replace("_", "-"),
            // overrideTranslationsUrl: 'https://d5nhc6q3o19l2.cloudfront.net/frame-advisor/en-US/app-labels_en-US.json',
            facescanSource: 'FASA_LCCOM',
            facescanRegion: constants.ajaxParams.langId === '-1' ? 'US' : 'EU', // FASA-665 - CA is not allowed, use EU instead
            frameAdvAPICore: 'fa_catalog',
            frameAdvAPIStore: constants.ajaxParams.langId === '-1' ? 'LC@USA' : 'LC@CA',
            frameAdvKey: '22615c4d-cd81-4799-8cc2-206eff25eaed',
            enableSizeAdvisor: true,
            enableVideoMode: false,
            productTypes: ['sunglasses','eyeglasses'],
            // defaultProductType: 'SUNGLASSES', // defaultProductType must be chosen among the defined productTypes
            productRequestRowsLimit: 24,
            // productTypesMap: {
            // 	sunglasses: 'eyeware',
            // 	eyeglasses: 'glasses',
            // },
            facescanPrivacy: {
                privacyPolicy: "https://www.lenscrafters.com/lc-us/privacy-policy",
                termsAndConditions: "https://www.lenscrafters.com/lc-us/terms-and-conditions",
                // localizationText: '',
            },
            resetProfileDataCallback: userId => {
            	if (constants.ajaxParams.userId != '-1002') {
                	var userObj = {
                		'accessToken': null,
                        'refreshToken': null,
            			'userUUID': null,
            			'callerId': constants.ajaxParams.userId,
            			'storeId': constants.ajaxParams.storeId
        			};
                	
                	$http.post('/wcs/resources/frameAdvisorServices/saveUserProfile', userObj)
                        .then(function (response) {
                            
                        }, function (error) {
                            $log.error(error);
                        });
                }
            },
            saveProfileDataCallback: data => {
                if (constants.ajaxParams.userId == '-1002') {
                    window.location.href = $window.location.origin + '/' + (constants.ajaxParams.langId == -1 ? 'lc-us' : 'en-ca') + '/account';
                } else {
                	var userObj = {
                		'accessToken': data.accessToken,
                        'refreshToken': data.refreshToken,
            			'userUUID': data.userUUID,
            			'callerId': constants.ajaxParams.userId,
            			'storeId': constants.ajaxParams.storeId
        			};
                	
                	$http.post('/wcs/resources/frameAdvisorServices/saveUserProfile', userObj)
                        .then(function (response) {
                            openFrameAdvisor(false)
                        }, function (error) {
                            $log.error(error);
                        });
                }
            },
            getProfileDataCallback: () => {
                if (constants.ajaxParams.userId != '-1002') {
                	return new Promise(function (resolve, reject) {
            			$http.get('/wcs/resources/frameAdvisorServices/getUserProfile/' + constants.ajaxParams.userId)
            			    .then(function (response) {
			                	if(response.data.result != null){
			                		resolve({
				                		accessToken: response.data.result.accessToken,
				                		refreshToken: response.data.result.refreshToken,
				                		userUUID: response.data.result.userUUID
				                	});
			                	}
		    				}, function (error) {
		                        $log.error(error);
		                    });
    				});
                }
            },
        }

        return config
    }

    function setUtagFrameAdvisor() {
        faUserData = window.localStorage.getItem("fa-user-data")
        if (faUserData) {
            faUserData = JSON.parse(faUserData)

            const dataString = Object.entries(faUserData).map(
                ([key, value]) => {
                    // return a list of key=value pairs
                    switch (value.constructor) {
                        case String:
                            return `${key}=${value}`
    
                        case Array:
                            return value.map(v => `${key}=${v}`).join(',')
                            
                        case Object:
                        default:
                            return ''
                    }
                }
            ).filter(s => s.length > 0)
    
            utag_data['Page_UserStyle'] = dataString.join(',')
        }

        if ($("input[name=framePartNumber]").val()) { // it only exists if page is a PDP
            const upc = $("input[name=framePartNumber]").val()
            utag_data['Products'] = {}
            utag_data['Products'][upc] = {
                'Fg_BestMatch': '0' // TODO: best match???
            }
        }
        
        utag_data['Fg_Release'] = frameAdvisor.FrameAdvisorWidget.version()
    }

    function setUtagSizeAdvisor() {
        utag_data['Sg_Release'] = frameAdvisor.SizeAdvisorWidget.version()
    }

    function openFrameAdvisor(startMinimized) {
        const config = angular.merge({
            startMinimized: startMinimized,
            selector: '#frameadv-wrapper',
            resultCallback: data => {
                // save user data in local storage
                frameAdvisorWidget.getUserData().then(
                    data => window.localStorage.setItem("fa-user-data", JSON.stringify(data)))

                return new Promise(function (resolve, reject) {
                    const baseQueryParams = $.param({
                        storeId: constants.ajaxParams.storeId,
                        catalogId: constants.ajaxParams.catalogId,
                        langId: constants.ajaxParams.langId,
                        responseFormat: 'json',
                        currency: '',
                        profileName: 'RONA_findProductByPartNumber_Details'
                    }, true);

                    let productsMap = {};
                    let searchByUpcFirst = true
                    data.products.forEach(product => {
                        const key = product.moco ? product.moco.replaceAll('/', '_') : product.upc
                        searchByUpcFirst = (key === product.upc)
                        productsMap[key] = product;
                    })

                    let queryParams = baseQueryParams
                    for (const key of Object.keys(productsMap)) {
                        queryParams += '&partNumber=' + key;
                    };

                    function getAttributeValue(product, attribute) {
                        var value = "";
                        product["ad_attribute"].forEach((row, j) => {
                            row.split("/")[2] == attribute ? value = row.split("/")[12] : "";
                        });
                        return value;
                    }

                    const buildProducts = (productsData, productsMap) => {
                        const products = productsData.catalogEntryView.map(product => (
                            Object.assign({
                                brandName: getAttributeValue(product, 'BRAND'),
                                brandlogoUrl: 'https://assets.lenscrafters.com/extra/image/LensCrafters/brands/LC_' + getAttributeValue(product, 'BRAND') + '_Logo.png',
                                price: (product.price[1].value != '') ? '$'+Number(product.price[1].value).toFixed(2) : '',
                                priceFull: (product.price[0].value != '' && product.price[1].value != '' && product.price[1].value != product.price[0].value) ? '$ '+Number(product.price[0].value).toFixed(2) : '',
                                productName: getAttributeValue(product, 'MODEL_NAME'),
                                frameColor: getAttributeValue(product, 'FRONT_COLOR'),
                                lensColor: getAttributeValue(product, 'LENS_COLOR'),
                                rxAvailable: 'true',
                                imageUrl: 'https://assets.lenscrafters.com/is/image/LensCrafters/' + productsMap[product.partNumber].upc + '__002.png?imwidth=600',
                                url: $window.location.origin + '/' +
                                    (constants.ajaxParams.langId == -1 ? 'lc-us' : 'en-ca') + '/' +
                                    getAttributeValue(product, 'BRAND').toLowerCase().replaceAll(" ", "-") + '/' +
                                    productsMap[product.partNumber].upc
                            }, productsMap[product.partNumber])
                        ));

                        return products
                    }

                    const searchByMoco = (queryParams, productsMap) => {
                        $http.get('/search/resources/store/' + constants.ajaxParams.storeId + '/productview/byPartNumbers?' + queryParams)
                            .then(function (response) {
                                if (response.data && response.data.catalogEntryView) {
                                    resolve(buildProducts(response.data, productsMap)); // resolve the promise returning the products
                                } else {
                                    reject("No product were returned")
                                }
                            }, function (error) {
                                $log.error(error);
                            });
                    }

                    const searchByUpc = (queryParams, productsMap) => {
                        // make a search by UPC, for each one collect the moco
                        $http.get('/search/resources/store/' + constants.ajaxParams.storeId + '/productview/byPartNumbers?' + queryParams)
                            .then(function (response) {
                                if (response.data && response.data.catalogEntryView) {
                                    response.data.catalogEntryView.forEach(product => {
                                        let moco = getAttributeValue(product, "SKU").split(" ") // e.g. ["0RB2132", "52", "622"]
                                        moco = moco[0] + "__" + moco[2] // e.g. "0RB2132__622"
                                        // "rename" the key the product is associated to
                                        productsMap[product.partNumber] = Object.assign({upc: product.partNumber}, productsMap[product.partNumber])
                                        productsMap[moco] = productsMap[product.partNumber]
                                        delete productsMap[product.partNumber]
                                    })
                                    
                                    // now the keys in productsMap are all moco, rebuild the queryParams
                                    let queryParams = baseQueryParams
                                    for (const key of Object.keys(productsMap)) {
                                        queryParams += '&partNumber=' + key;
                                    };

                                    searchByMoco(queryParams, productsMap) // make a second search, this time using the moco
                                } else {
                                    reject("No product were returned")
                                }
                            }, function (error) {
                                $log.error(error);
                            });
                    }


                    searchByUpcFirst ? searchByUpc(queryParams, productsMap) : searchByMoco(queryParams, productsMap)
                })
            },
            addToBagCallback: product => {
                if (!window.location.href.includes(product.url)) {
                    window.sessionStorage.setItem('fa-add-to-bag-clicked', 'true')
                    window.location.href = product.url
                } else {
                    document.getElementsByClassName('fa__close-button')[0].click()
                    document.getElementsByClassName('add-to-cart')[0].click()
                }
            },
            openRXConfigurator: product => {
                if (!window.location.href.includes(product.url)) {
                    window.sessionStorage.setItem('fa-rxc-clicked', 'true')
                    window.location.href = product.url
                } else {
                    document.getElementsByClassName('fa__close-button')[0].click()
                    document.getElementsByClassName('select-edit-lens')[0].click()
                }
            },
        }, baseConfig);

        //init and render widget
        const frameAdvisorWidget = frameAdvisor.FrameAdvisorWidget.new(config);
        frameAdvisorWidget.render();

        window.frameAdvisorWidget = frameAdvisorWidget;
        oldUrl = '';

        window.onGetSuggestedSizes = e => {
            if (e) e.preventDefault()
            frameAdvisorWidget
                .getSuggestedSizes({ S: 128, M: 131, XL: 135 })
                .then(data => console.log(data))
                .catch(e => console.error(e))
        }

        document.body.addEventListener('fa-maximize', () => {
            oldUrl = window.location.href
            newUrl = window.location.href.slice(0, window.location.href.indexOf('#') + 1)
            window.history.replaceState({}, null, newUrl)
            $timeout(function () {
                state.fa.isOpen = true
            }, 0)
        })
        document.body.addEventListener('fa-minimize', () => {
            $timeout(function () {
                state.fa.isOpen = false
                window.history.replaceState({}, null, oldUrl)
            }, 0)
        })
        document.body.addEventListener('fa-close', () => {
            $timeout(function () {
                state.fa.isOpen = false
                document.body.style.overflow = ''
                document.body.style.height = ''
            }, 0)
            newUrl = window.location.href.slice(0, window.location.href.indexOf('#') + 1)
            window.history.replaceState({}, null, newUrl)
            frameAdvisorWidget.closeApp()
        })
    }

    function openSizeAdvisor() {
        const config = angular.merge({
            handleResults: data => {
                window.localStorage.setItem("sa-size-data", JSON.stringify(data))
                $timeout(function () {
                    state.sa.sizeData = data
                }, 0)
            },
            selector: '#sizeadv-wrapper',
        }, baseConfig);

        //init and render widget
        startingHistoryLength = window.history.length;
        const sizeAdvisorWidget = frameAdvisor.SizeAdvisorWidget.new(config);
        sizeAdvisorWidget.render();
        window.sizeAdvisorWidget = sizeAdvisorWidget;

        document.body.addEventListener('sa-close', () => {
            $timeout(function () {
                closingHistoryLength = window.history.length
                state.sa.isOpen = false
                if (startingHistoryLength-closingHistoryLength != 0) {
                    window.history.go(startingHistoryLength-closingHistoryLength)
                }
            }, 0)
        })

        state.sa.isOpen = true;
    }

    function init() {
        state.ready = true
        // get size advisor data to highlight recommended sizes
        // format: {label: "L", optimalHinge: 135, maxHinge: 139, minHinge: 132}
        const saSizeProfile = window.localStorage.getItem("sa-size-data")
        if (saSizeProfile)
            state.sa.sizeData = JSON.parse(saSizeProfile)
        
        pendingQueue.forEach(f => $timeout(f, 0)) // run all pending calls
    }

    function loadFrameAdvisorScripts(caller) {
        pendingQueue.add(caller)

        const scripts = [...document.querySelector('#frame-advisor-scripts').content.children]
        if(scripts.length == 0){
        	return;
        }
        scripts.at(-1).onload = init
        scripts.forEach(s => document.head.append(s))
    }

    const state = {
        ready: false, fa: {}, sa: {}
    };

    // buffer all calls made before the component was ready and execute them on init
    // each element is a reference to the called function
    const pendingQueue = new Set()
    
    const baseConfig = initConfig();

    $rootScope.$watch(function() {
        return state.fa.isOpen || state.sa.isOpen
    }, function (value) {
		// lock scrolling when popup is open
		angular.element([document.body, document.documentElement])
			.css({"overflow": (value ? "hidden" : "")});
	});

    return {
        state: state,
        openFrameAdvisor: function openFrameAdvisorWrapper() {
            if (!state.ready) {
                loadFrameAdvisorScripts(openFrameAdvisorWrapper)
                return
            }

            state.fa.isOpen = true;
            if (localStorage.getItem('fa-user-id')) {
                // TODO: check, is this even right?
                document.getElementsByClassName('fa__floating-button-button')[0].click();
            } else {
                openFrameAdvisor(false);
            }
        },
        openSizeAdvisor: function openSizeAdvisorWrapper() {
            if (!state.ready) {
                loadFrameAdvisorScripts(openSizeAdvisorWrapper)
                return
            }

            openSizeAdvisor()
        },
        setUtagFrameAdvisor: function setUtagFrameAdvisorWrapper() {
            if (!state.ready) {
                loadFrameAdvisorScripts(setUtagFrameAdvisorWrapper)
                return
            }
            setUtagFrameAdvisor()
        },
        setUtagSizeAdvisor: function setUtagSizeAdvisorWrapper(){
            if (!state.ready) {
                loadFrameAdvisorScripts(setUtagSizeAdvisorWrapper)
                return
            }

            setUtagSizeAdvisor()
        },
        openFrameAdvisorFAB: function openFrameAdvisorFABWrapper() {
            // if user has been profiled FAB should be shown in page
            if (!state.ready) {
                loadFrameAdvisorScripts(openFrameAdvisorFABWrapper)
                return
            }

            if (localStorage.getItem('fa-user-id')) {
                openFrameAdvisor(true);
            }
        },
        getSizeSuggestion: function(hingeWidthMap) {
            // TODO: pass dimension for all sizes of frame
            // hingeWidthMap = {S: 124, M: 130, L: 134, XL: 140}
            if (state.sa.sizeData)
                return frameAdvisor.SizeAdvisorWidget.getSuggestedSizes(
                    state.sa.sizeData.optimalHinge, hingeWidthMap)
        }
    }
});

frameAdvisorModule.directive("frameAdvisor", ['frameAdvisorFactory', '$cookies', function (frameAdvisorFactory, $cookies) {
    function frameAdvisorTemplate() {
        switch ($cookies.get('lcLocale')) {
            case 'fr_CA':
                return (
                    '<div ng-cloak class="underlay" ng-if="faState.fa.isOpen"> </div>' +
                    '<div ng-cloak id="frameadv-wrapper" data-analytics_available_call="0" class="fr" ng-class="faState.fa.isOpen ? \'frameadv-wrapper\' : \'hidden-wrapper\'"> </div>'
                );
            case 'es_US':
                return (
                    '<div ng-cloak class="underlay" ng-if="faState.fa.isOpen"> </div>' +
                    '<div ng-cloak id="frameadv-wrapper" data-analytics_available_call="0" class="es" ng-class="faState.fa.isOpen ? \'frameadv-wrapper\' : \'hidden-wrapper\'"> </div>'
                );
            default:
                return (
                    '<div ng-cloak class="underlay" ng-if="faState.fa.isOpen"> </div>' +
                    '<div ng-cloak id="frameadv-wrapper" data-analytics_available_call="0" ng-class="faState.fa.isOpen ? \'frameadv-wrapper\' : \'hidden-wrapper\'"> </div>'
                );
        }
    }

    return {
        restrict: 'E',
        scope: {},
        transclude: true,
        template: frameAdvisorTemplate(),
        controller: function ($scope, frameAdvisorFactory) {
            $scope.faState = frameAdvisorFactory.state
            //FA analytics
            if (localStorage.getItem('fa-user-id')) {
                frameAdvisorFactory.openFrameAdvisorFAB();
                frameAdvisorFactory.setUtagFrameAdvisor();
            }
        }
    }
}]);

frameAdvisorModule.directive("sizeAdvisor", ['frameAdvisorFactory', function (frameAdvisorFactory) {
    function sizeAdvisorTemplate() {
        return (
            '<div ng-cloak class="underlay" ng-if="faState.sa.isOpen"> </div>' +
            '<div ng-cloak id="sizeadv-wrapper" data-analytics_available_call="0" ng-class="faState.sa.isOpen ? \'frameadv-wrapper\' : \'hidden-wrapper\'"> </div>'
        );
    }

    return {
        restrict: 'E',
        scope: {},
        transclude: true,
        template: sizeAdvisorTemplate(),
        controller: function ($scope, frameAdvisorFactory) {
            $scope.faState = frameAdvisorFactory.state;

            var unregister = $scope.$watch('faState.ready', function(ready) {
                if (ready) {
                    unregister();

                    //SA analytics
                    frameAdvisorFactory.setUtagSizeAdvisor()
                }
            })
        }
    }
}]);
;
app.controller('scheduleExamController', function ($scope, $rootScope, lcActionsModule) {
	
	$rootScope.insuranceProviders = window.insuranceProviders;
	
	//selectize
    $rootScope.selectedInsurancesProvider = undefined;
    $rootScope.isUnselected = false;
    
    $scope.singleConfig = {
		openOnFocus: true,
		valueField: 'text',
		maxItems: 1,
		onChange: function(value) {
			$scope.selectizeIsFocused = false;
			$scope.insuranceProvider = value;
			$("#insurance-carrier").attr('value', $scope.insuranceProvider);
			$rootScope.isUnselected = value === "" ? true : false;
		},
		onDropdownOpen: function() {
			$scope.$apply(function() { $scope.selectizeIsFocused = true; });
		},
		onDropdownClose: function() {
			$scope.$apply(function() { $scope.selectizeIsFocused = false; });
		},
		plugins: {
			'no_results': {},
			'clear_button': {
				className: "selectize-clear-button",
				label: '<svg class="icon close"><use xlink:href="#clear-input"></use></svg>',
			},
		},
	}
    
    $scope.asyncSVGLoader = function(){
    	
    	var revision = 1;

    	var isLocalStorage = 'localStorage' in window && window['localStorage'] !== null,
    	request,
    	insertIT = function (data) {
    	    document.body.insertAdjacentHTML('beforeend', data);
    	},
    	insert = function (data) {
    	    if (document.body)
    	        insertIT(data);
    	    else
    	        document.addEventListener('DOMContentLoaded', insertIT);
    	};

    	/* disable localstorage for the moment
    	if (isLocalStorage && localStorage.getItem('inlineSVGrev') == revision) {
    	    data = localStorage.getItem('inlineSVGdata');
    	    if (data) {
    	        insert(data);
    	        return true;
    	    }
    	}
		*/
    	
    	lcActionsModule.loadContent('X_SVG_Icons').then(function (data) {
    	    insert(data);
    	    if (isLocalStorage) {
    	        localStorage.setItem('inlineSVGdata', data);
    	        localStorage.setItem('inlineSVGrev', revision);
    	    }

    	});
    }
});