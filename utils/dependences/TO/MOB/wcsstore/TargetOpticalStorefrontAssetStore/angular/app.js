/*! lux-b2c-targetoptical - v0.0.1 - 2022-11-11 */var app = angular.module('TargetOpticalApp', [
	'ngSidebarJS',
	'ngCookies',
	'angularMoment',
	'angularMask',
	'vcRecaptcha',
	'ngMagnify',
	'toInsuranceModule',
	'toPrescriptionModule',
	'toActionsModule',
	'headerModule'
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


app.run(function() {
	window.rxcTranslations = {
		en_US: {
			steps: {
				addOns: {
					confirmedTitle: 'Finishings',
				},
		        gvpTreatment: {
		            title: 'Choose your More To See Package',
		            subtitle: 'Choose your lens type.'
		        },
				treatments: {
					subtitle: 'Add transitions lens technology for a light-responsive tint that darkens with greater light exposure, helping your eyes comfortably adjust to varying amounts of light.'
				},
				type: {
					subtitle: ''
				},
				advancedPrescription : {
					manual: {
						alerts : {
							pdValueWarning: "<span>The selected PD is smaller than average, we suggest double checking your prescription. If you don’t have the PD <a href=\"javascript:document.getElementsByClassName('PupillaryDistance__titleContainer__link')[0].click();\">here how to measure it</a>.</span>"
						}
					}
				}
			},
			price: {
				framePlusLenses: 'Frame + Lenses ',
				framePlusLensesAt: 'Frame + Lenses at ',
			},
		},
	};
})

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

/* PDP-LENSPANEL INTEGRATION */

// tealium
var tealium_data2track = tealium_data2track || [];

// Bottone apertura modale LensPanel
var _lensPanelLensSelectDirective = function (_name, _template) {

	app.directive(_name, function ($rootScope, toActionsModule, toInsurance, toPrescription) {

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
				scope.isGVP = attrs.isgvp;
				scope.currentOrderId = attrs.currentorderid;
				scope.partType = attrs.parttype;
				scope.isSunglasses = attrs.sunglasses == 'true';
				scope.isBuyable = attrs.buyable == 'true';
				scope.warrantyPrice = attrs.warrantyprice || '0.00';
				scope.warrantyId = attrs.warrantyid || null;
				scope.isAffirmEnabled = attrs.isaffirmenabled;
				scope.isAfterpayEnabled = attrs.isafterpayenabled;

				// open modal
				scope.open = function () {
					if (scope.isLoadingLens || scope.isLoadingInsurance)
						return;

						var frameRXValues = null;

						if (toPrescription) {
							frameRXValues = toPrescription.getFrameRXValues(scope.frameMinTotalPower, scope.frameMaxTotalPower);
						}

						var paymentInstallmentTypes = ['afterpay', 'affirm'];
						var multiplePaymentInstallmentValue = true;
						if(!scope.isAfterpayEnabled){
							paymentInstallmentTypes = ['affirm'];
							multiplePaymentInstallmentValue = false;
						}
						
						// Load RXC
						var config = {
							selector: '#rxcApp',
							brand: 'targetoptical',
							insuranceModule: toInsurance,
							prescriptionModule: toPrescription,
							actionsModule: toActionsModule,
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
									brandImageUrl: 'https://assets.targetoptical.com/extra/image/TargetOptical/brands/TO_' + scope.frameBrand.replace(' ', '_') + '_Logo.png',
									rxValues: frameRXValues,
								},
								frameOnlyLensUPC: scope.frameOnlyLensUPC,
								showFrameOnly: true,
							},
							learnMoreBaseEndpoint: "/wcs/resources/store/12001/espot/",
							linksData: {
								warrantyLearnMore: '/to-us/worry-free-protection-plan'
							},
							paymentInstallment: {
								type: 'afterpay',
								installments: 4,
								multiplePaymentInstallment: multiplePaymentInstallmentValue,
								types: paymentInstallmentTypes,
								contentIdentifier: "X_PDP_Installments"

							}
						};

						$rootScope.rxc.rxcWidget = RXC.rxcWidget.new(config);
						$rootScope.rxc.rxcWidget.render();
				}
			}
		}
	});
}

var _tmplDesktop = ''
	+ '<a href="#" class="st-button st-button-small select-edit-lens new-lens-selection-text edit-lens-selection lp-font-medium"'
	+ ' data-parttype="{{partType}}"'
	+ ' data-catentryid="{{frameId}}"'
	+ ' data-rxable="true" rel="#select-a-lens-type"'
	+ ' data-productname="{{frameName}}"'
	+ ' data-price="{{frameOfferPrice}}"'
	+ ' data-is_sunglasses="{{isSunglasses}}"'
	+ ' data-element-id="X_Pdp_Prod_AddLens"'
	+ ' data-description="{{framePartNumber}}"'
	+ ' ng-show="isBuyable"'
	+ ' ng-click="open()">'
	+ ' <div class="loadingLenses" ng-show="isLoadingLens"></div>'
	+ ' {{title}}'
	+ '</a>';

var _tmplMobile = ''
	+ '<a href="#" class="st-button st-button-big lens-selection-popup lp-font-medium"'
	+ ' rel="#select-a-lens-type" tabindex="0"'
	+ ' data-element-id="X_Pdp_Prod_AddLens"'
	+ ' data-description="{{framePartNumber}}"'
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
})
;
app.controller('CartController', ['$scope', '$rootScope', '$http', '$window', '$log', '$compile', '$location', '$anchorScroll', 'moment', '$loader', '$timeout',
    function($scope, $rootScope, $http, $window, $log, $compile, $location, $anchorScroll, moment, $loader, $timeout) {

        $rootScope.stores = [];

        $scope.isMobile = false;
        $scope.isGeoLocate = false;
        $scope.bossError = {
            'not-selected': false,
            'not-found': false,
            'disabled': false
        };
        $scope.isSafari = false;
        $scope.isProgressive = false;

        // Valori utilizzati per edit lenti da carrello
        $scope.lensInfo = {
            catentryId: '',
            color: '',
            addOns: ''
        }

        var userAgent = window.navigator.userAgent;

        if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i)) {
            $scope.isSafari = true;
        }

        $scope.confirmStore = function(bossID) {
            $scope.bossError['not-selected'] = false;
            $loader.show('confirm-boss-store');

            $scope.bossStore = $scope.tempBossStore;

            $scope.singleShipmentShippingMode = bossID;

            var data = {
                'value': $scope.singleShipmentShippingMode,
                'bossStore': $scope.bossStore,
                'nickName': $scope.nickName
            };

            CheckoutHelperJS.updateShipModeForAllItemsCartBOSS(data, $scope.currentOrderId);
            document.documentElement.classList.remove('hidden-overflow');
        }

        $scope.$watch('singleShipmentShippingMode', function(newValue, oldValue) {
            if (newValue != undefined && newValue != oldValue && newValue != $scope.bossShipModeID) {
                $scope.removeBossSelection();
                $('.location-entry-container').find("input").css('border', '');
                
                var data = {
                    'value': newValue,
                    'bossStore': $scope.bossStore,
                    'nickName': $scope.nickName
                };

                CheckoutHelperJS.updateShipModeForAllItemsCartBOSS(data, $scope.currentOrderId);
            }
            if ($scope.isProgressive) {
                angular.element(document.querySelectorAll('.shipping-type-container input.ng-pristine.Collect.in.store')).click();
            }
        });

        $scope.analyticsSeeOfficeHours = function(event) {
            tealium_data2track.push({
                id: 'Click',
                Click_FocusElement: event,
                data_description: 'X_CartPage_FindStoreOverlay_OpeningHours',
                Tracking_Type: 'link'
            });
        }

        $scope.analyticsSelectAStoreError = function() {
            obj = {
                id: 'Error',
                Error_Source: "Server",
                Error_Message: 'utag_data syntax - ' + 'Select a store to proceed to checkout'
            }
            tealium_data2track.push(obj);
        }

        $scope.analyticsNoStoreFoundError = function() {
            obj = {
                id: 'Error',
                Error_Source: "Server",
                Error_Message: 'utag_data syntax - ' + 'No store found for this keyword'
            }
            tealium_data2track.push(obj);
        }

        $scope.displayStoreDetail = function(key) {
            $scope.mobSelectedStore = true;
            $scope.currentStore = $rootScope.stores[key];
        }

        $scope.getDirections = function(selectedStore) {
            var directionsUrl = 'https://www.google.com/maps/dir/?api=1&destination=';


            if (selectedStore) {
                directionsUrl += encodeURIComponent(selectedStore.addressLine[0].trim() +
                    ',' + selectedStore.city.trim() + ',' + selectedStore.stateOrProvinceName.trim() + ',' + selectedStore.postalCode.trim());

                $window.open(directionsUrl, '_blank');
            }
        };

        $scope.removeBossSelection = function() {
            $scope.bossError['disabled'] = false;
            $scope.bossStore = undefined;
        }

        $scope.analyticsCartPageDelivery = function(event) {
            //var dataElementId = 'D_CartPage_Delivery_' + event.target.attributes['data-description'].value;
            var dataElementId = 'X_X_Delivery_Standard';
            tealium_data2track.push({
                id: 'Click',
                Click_FocusElement: event,
                data_description: event.target.attributes['data-description'].value,
                Tracking_Type: 'link',
                data_element_id: dataElementId
            });
        }

        $scope.wcagClick = function(id) {
            document.getElementById(id).click()
        }

        $rootScope.validateBossSelection = function(isMobile) {
            var isValid = true;

            if (isMobile) {
                if ($scope.bossStore != undefined && $scope.bossStore == -1) {
                    $scope.bossError['disabled'] = true;
                    $scope.scrollToShipMethodError();

                    isValid = false;
                } else if ($scope.singleShipmentShippingMode == $scope.bossShipModeID && $scope.bossStore == undefined) {
                    $scope.bossError['not-selected'] = true;
                    $scope.scrollToShipMethodError();
                    $('.boss-find-store .to-input-text').focus();
                    $scope.analyticsSelectAStoreError();

                    isValid = false;
                } else if ($scope.isStoreBossEnabled == 'false') {
                    $scope.bossError['not-selected'] = true;
                    $scope.scrollToShipMethodError();

                    isValid = false;
                }
            } else {
                if ($scope.bossStore != undefined && $scope.bossStore == -1) {
                    $scope.bossError['disabled'] = true;
                    $scope.scrollToShipMethodError();

                    isValid = false;
                } else if ($scope.shippingTab == 'tab2' && $scope.bossStore == undefined) {
                    $scope.bossError['not-selected'] = true;
                    $scope.scrollToShipMethodError();
                    $('.boss-find-store .to-input-text').focus();
                    $scope.analyticsSelectAStoreError();

                    isValid = false;
                } else if ($scope.isStoreBossEnabled == 'false') {
                    $scope.bossError['not-selected'] = true;
                    $scope.scrollToShipMethodError();

                    isValid = false;
                }
            }

            return isValid;
        }

        $scope.scrollToShipMethodError = function() {
            $location.hash('shippingMethodError');
            $anchorScroll.yOffset = 100;
            $anchorScroll();
        }

        $scope.resetErrors = function() {
            $scope.bossError['not-selected'] = false;
            $scope.bossError['not-found'] = false;
            $scope.bossError['disabled'] = false;
            $('.location-entry-container').find("input").css('border', '');
        }

        $scope.findStores = function(form) {

            $scope.resetErrors();

            if (($scope.currentLocationEntry == undefined || $scope.currentLocationEntry.length == 0) && !$scope.isGeoLocate) {
                $scope.bossError['not-selected'] = true;
                $('.location-entry-container').find("input").css('border', 'solid 0.8px #cc0000');

                $scope.analyticsSelectAStoreError();

            } else {
                $loader.show('find-boss-store');

                $scope.resetStores();

                if ($scope.currentLocation == null) {
                    $rootScope.geoLocate = false;

                    $scope.performGeocode(function(response, status) {

                        if (status == 'OK' && response.length) {
                            $scope.currentLocation = new google.maps.LatLng({
                                lat: response[0].geometry.location.lat(),
                                lng: response[0].geometry.location.lng()
                            });

                            $scope.loadStores();
                        } else {
                            $scope.$apply(function() {
                                $scope.bossError['not-found'] = true;
                                $scope.analyticsNoStoreFoundError();
                                $('.location-entry-container').find("input").css('border', 'solid 0.8px #cc0000');
                                $loader.hide();
                            });
                        }
                    });
                } else {
                    $('.wrongCountryError').addClass('hide');
                    sessionStorage.setItem('Store_Search_Type', 'geolocalized');
                    sessionStorage.setItem('Store_Search_Keyword', 'geolocalized');
                    $rootScope.geoLocate = true;
                    $scope.loadStores();
                }
            }

        }

        $scope.performGeocode = function(callback) {
            if (callback && typeof(callback) == 'function') {
                var geocoder = new google.maps.Geocoder();

                geocoder.geocode({
                    address: $scope.currentLocationEntry
                }, callback);
            }
        }

        $scope.resetStores = function() {
            $scope.offset = 0;
            $scope.totalCount = 0;
            $rootScope.stores.length = 0;
        }


        $scope.loadStores = function() {
            $scope.storesLoading = true;

            $scope.params = {
                'storeId': 12001,
                'pageSize': 10
            };

            $scope.offset = 0;

            var data = {
                selectedOpeningFilters: [],
                selectedInsuranceFilters: [],
                selectedLanguageFilters: [],
                selectedStatusFilters: ['O'],
                bossEnabled: ['1']
            };

            $http.post('/wcs/resources/store/' + $scope.params.storeId + '/storelocator/filtered/latitude/' +
                    $scope.currentLocation.lat() + '/longitude/' + $scope.currentLocation.lng() + '?pageSize=50&offset=0&radius=' + $scope.storeDistanceRadius, data)
                .then(function(response) {
                    if (response.data.PhysicalStore != undefined) {
                        var stores = angular.copy($rootScope.stores);

                        // Populate stores
                        $scope.favouriteStoresAdded = 0;
                        for (var i = 0; i < response.data.PhysicalStore.length; i++) {
                            var physicalStore = response.data.PhysicalStore[i];

                            // add schedule URL
                            physicalStore.scheduleURL = decodeURIComponent($scope.scheduleBaseURL).replace('#storeNumber#', physicalStore.storeName);

                            // Add parsed store hours
                            physicalStore.storeHours = $scope.getStoreHours(physicalStore);

                            physicalStore.storeStatusClass = $scope.getStoreStatusClass(physicalStore);

                            stores.push(physicalStore);
                        }

                        $rootScope.stores = angular.copy(stores);


                        $scope.totalCount = response.data.recordSetTotal;
                        sessionStorage.setItem('Store_Search_ResultItemsQnt', $scope.totalCount);

                        $scope.noResults = false;
                        $scope.storesLoading = false;

                        if (!$scope.isMobile) {
                            document.documentElement.classList.add('hidden-overflow');
                        }
                        
                        $scope.currentStore = $rootScope.stores[0];
                        $scope.bossOpenModal = true;

                        $scope.lastLocation = $scope.currentLocation;
                        $scope.currentLocation = null;
                    } else {
                        $scope.currentLocation = null;
                        $scope.bossError['not-found'] = true;
                        $('.location-entry-container').find("input").css('border', 'solid 0.8px #cc0000');
                    }

                    $loader.hide();

                }, function(error) {
                    $log.error(error);
                });
        }
        
        $scope.$watch('bossOpenModal', function() {
        	// Auto-select first store on opening
            if ($scope.bossOpenModal) {
            	$timeout(function() { 
            		angular.element(document.getElementById("boss-store-" + $scope.currentStore.storeName)).click();
            	});
            }
        });

        $scope.getStoreHours = function(store) {
            var storeHours = [];

            if (store) {
                angular.forEach(store.Attribute, function(value, key) {
                    if (value.displayName == 'StoreHours') {
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
        }

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
        }

        $rootScope.wrapAngular = function(elementFunc) {
            $compile(elementFunc)($scope);
        }

        $scope.geolocate = function() {
            var geolocation = navigator.geolocation;

            if (geolocation) {
                $scope.resetStores();

                $rootScope.geolocateWatchId = geolocation.getCurrentPosition(function(position) {
                    $scope.currentLocation = new google.maps.LatLng({
                        lat: parseFloat(position.coords.latitude),
                        lng: parseFloat(position.coords.longitude)
                    });

                    $scope.isGeoLocate = true;
                    $scope.findStores();
                }, function(error) {
                    switch (error.code) {
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
        var lens = document.querySelectorAll('.lens-type');
        for (var i = 0; i < lens.length; i++) {
            if (lens[i].innerText.includes('Progressive') && document.querySelectorAll('.shipping-type-container input.ng-pristine.Collect.in.store').length !== 0 && !isTrueProgressive) {
                //mobile
                $scope.isProgressive = true;
            }

            if (lens[i].innerText.includes('Progressive') && document.querySelectorAll('.shipping-type-container input.ng-pristine.Collect.in.store').length !== 0) {
                var element = angular.element(document.querySelectorAll('.shipping-type-container input.ng-pristine:not(.Collect)'));
                element.on('click', function() {
                    $scope.isProgressive = false;
                    document.cookie = 'isTrueProgressive=true';
                });
                angular.element(document.querySelectorAll('.shipping-type-container input.ng-pristine.Collect.in.store')).on('click', function() {
                    $scope.isProgressive = true;
                    document.cookie = 'isTrueProgressive=false';
                });
            }
        }
    }
]);


app.controller('cartCheckoutController', function ($scope, $rootScope, $http, $timeout, $log, toActionsModule, toInsurance, toPrescription, headerModule) {

	// RXC integration object
	$scope.prexImageurl= "";

	$rootScope.rxc = {};

	$scope.frameRXValues = null;

	$scope.init = function (_params) {
		try {
			$scope.params = _params;
	        var enabledFlows = new Array();
	        
	        if($scope.params.isManualEnabled === "true"){
	        	enabledFlows.push('MANUAL')
	        }
	        if($scope.params.isCmdEnabled  === "true"){
	        	enabledFlows.push('CMD')
	        }
	        if($scope.params.isUploadEnabled === "true"){
	           enabledFlows.push('UPLOAD')
	        }
	        
			// Initialize prescription module if prescription is enabled
			if (toPrescription && $scope.params.isPrescriptionEnabled) {
				toPrescription.init($scope.params.storeId, $scope.params.catalogId, enabledFlows, $scope.params.isPrismEnabled);
			}
	
			var baseurl = window.location.protocol + '//' +  window.location.hostname;
			$scope.prexImageurl = baseurl + '/wcs/resources/store/' + $scope.params.storeId + '/rxc/prescription/download/preview/' ;
			
			$scope.initCheckoutComponent();
		} catch (error) {
			tealium_data2track.push({
				'id': 'Error',
				'Error_Code': 'Cart Loading Error',
				'Error_Source': 'Server'
			});
		}
	}
	
	$scope.EyewearProtectionPlanLoaderVisible = false;

	$scope.deleteLoaderVisible = false;
	$scope.undoItem = false;
	$scope.showPrescriptionTooltip = false;
	$scope.showPrescriptionPreview = false;
	
	/*
	$scope.removeItemFromCart = function (orderItemId) {
        setTimeout(function(){
        	if(!$scope.undoItem){
				angular.element(document.querySelectorAll('#delete-item-' + orderItemId)[0])[0].click();
				angular.element(document.querySelectorAll('.item-container-' + orderItemId)[0]).addClass('hidden');
        	} else {
        		$scope.undoItem = false;
        	}
        }, 5000);
	}
	*/
	
	$scope.togglePrescriptionTooltip = function (showPrescriptionTooltip) {
		$scope.showPrescriptionTooltip = showPrescriptionTooltip;
	}

	$scope.togglePrescriptionPreview = function (showPrescriptionPreview) {
		$scope.showPrescriptionPreview = showPrescriptionPreview;
	}
	
	$scope.editLens = function (frameId, lensesAddonsIds, orderId, orderItemId, orderItemIndex) {
		$scope.callerId = toActionsModule.CALLERID_CART + '_' + orderItemId;
		$scope.params.frameId = frameId;
		$scope.params.orderItemId = orderItemId;
		var lensId= lensesAddonsIds[0];

		if (!lensId) {
			var errorMessage = 'Undefined Lens Id';
			tealium_data2track.push({
				'id': 'Error',
				'Error_Code': errorMessage,
				'Error_Source': 'Client'
			});
			$log.error(errorMessage);
			return;
		}
		
		var paymentInstallmentTypes = ['afterpay', 'affirm'];
		var multiplePaymentInstallmentValue = true;
		if(!$scope.params.isAfterpayEnabled){
			paymentInstallmentTypes = ['affirm'];
			multiplePaymentInstallmentValue = false;
		}
		var _config ={};
		var frameData={};
		var mapPrices = new Map();
        var mapAttributes = new Map();
		
		// Call to the productView by Id
		$http.get('/wcs/resources/store/' + $scope.params.storeId + '/productview/byId/'+frameId)
			.then(function (response) {
				if (response && response.data && response.statusText == 'OK' && response.status == 200) {
					frameData.buyable = response.data.CatalogEntryView[0].buyable;
		            frameData.keyword = response.data.CatalogEntryView[0].keyword;
		            frameData.manufacturer = response.data.CatalogEntryView[0].manufacturer;
		            frameData.name = response.data.CatalogEntryView[0].name;
		            frameData.parentCategoryID = response.data.CatalogEntryView[0].parentCategoryID;
		            frameData.parentProductID = response.data.CatalogEntryView[0].parentProductID;
		            frameData.partNumber = response.data.CatalogEntryView[0].partNumber;
		            frameData.productType = response.data.CatalogEntryView[0].productType;
		            frameData.storeID = response.data.CatalogEntryView[0].storeID;
		            frameData.uniqueID = response.data.CatalogEntryView[0].uniqueID;
		            response.data.CatalogEntryView[0].Attributes.forEach((attribute) => {
		                mapAttributes.set(attribute.name.toUpperCase(), attribute.Values[0].values);
		            });            
		            response.data.CatalogEntryView[0].Price.forEach((price) => {
		                mapPrices.set(price.priceUsage.toUpperCase(), price.priceValue);
		            });
		            frameData.attributes = mapAttributes;
		            frameData.prices = mapPrices;
					
					$scope.frameRXValues = {};
			        if (frameData && frameData.attributes.get("RXC_FRAME_MIN_TOTAL_POWER") != undefined && frameData.attributes.get("RXC_FRAME_MIN_TOTAL_POWER") != null) {
			        	$scope.frameRXValues.powerCombinedMin = frameData.attributes.get("RXC_FRAME_MIN_TOTAL_POWER");
			        } else {
			        	$scope.frameRXValues.powerCombinedMin = "-99";
			        }
			        if (frameData && frameData.attributes.get("RXC_FRAME_MAX_TOTAL_POWER") != undefined && frameData.attributes.get("RXC_FRAME_MAX_TOTAL_POWER") != null) {
			        	$scope.frameRXValues.powerCombinedMax = frameData.attributes.get("RXC_FRAME_MAX_TOTAL_POWER");
			        } else {
			        	$scope.frameRXValues.powerCombinedMax = "99";
			        }
			        var frameCategory = '';
			        if (frameData.attributes.get("TYPE").toUpperCase().indexOf('SUNGLASSES') >-1) {
			            frameCategory = 'SUNGLASSES';
			        } else {
			            frameCategory = 'EYEGLASSES';
			        }
			        
			        var offerPrice = parseFloat(frameData.prices.get("OFFER")).toFixed(2);
			        var listPrice = offerPrice;        
			        if(frameData.listPrice != undefined && frameData.listPrice != null){
			            listPrice = frameData.listPrice;
			        }
			        var skumodel= frameData.attributes.get("MODEL");
			        var imgUrl = "https://assets.targetoptical.com/is/image/TargetOptical/" + frameData.partNumber + "__002.png?width=600";
			        var _config = {
			    			selector: '#rxcApp',
			    			insuranceModule: toInsurance,
			    			prescriptionModule: $scope.params.isPrescriptionEnabled ? toPrescription : null,
			    			actionsModule: toActionsModule,
			    			lensesData: $scope.params.lensData,
			    			data: {
			    				langId: $scope.params.langId,
			    				frame: {
			    					catEntryId: $scope.params.frameId,
			    					name: frameData.name,
			    					upc: frameData.partNumber,
			    					model: $scope.params.frameModel ? $scope.params.frameModel : skumodel,
			    					color: $scope.params.frameColor ? $scope.params.frameColor : '0',
			    					listPrice: listPrice,
			    					offerPrice: offerPrice,
			    					brand: frameData.attributes.get("BRAND"),
			    					category: $scope.params.frameCategory ? $scope.params.frameCategory : frameCategory,
			    					imageUrl: imgUrl,
			    					brandImageUrl: 'https://assets.targetoptical.com/extra/image/TargetOptical/brands/TO_' + frameData.attributes.get("BRAND").replace(/ /g, '_') + '_Logo.png',
			    					rxValues: $scope.frameRXValues,
			    				},
			    				frameOnlyLensUPC: $scope.params.frameOnlyLensUPC,
			    				lens: {
			    					catEntryId: lensId
			    				}
			    			},
			    			learnMoreBaseEndpoint: "/wcs/resources/store/12001/espot/",
			    			linksData: {
			    				warrantyLearnMore: '/to-us/purchase-care/details'
			    			},
			    			paymentInstallment: {
			    				type: 'afterpay',
			    				installments: 4,
			    				multiplePaymentInstallment: multiplePaymentInstallmentValue,
			    				types: paymentInstallmentTypes,
			    				contentIdentifier: "X_PDP_Installments"

			    			},
			    			brand: 'targetoptical'
			    		};

			    		if (angular.element(document.getElementById('warranty_' + $scope.params.orderItemId)).attr('checked') == 'checked') {
			    			_config.data.warranty = {
			    				catEntryId: angular.element(document.getElementById('warranty_' + $scope.params.orderItemId)).val()
			    			};
			    		}
			            
			    		document.cookie = 'prexOI=' + $scope.params.orderItemId;
			    		// Call RXC lens service
			    		$http.get('/wcs/resources/store/' + $scope.params.storeId + '/catalog/' + $scope.params.catalogId +
			    			'/rxc/frameId/' + $scope.params.frameId + '/lenses')
			    			.then(function (response) {
			    				if (response && response.data && response.data.response && response.data.response.status == 'ok') {
			    					_config.lensesData = response.data.response.data;
			    					_config.cartMode = {
			    						orderItemId: orderItemId,
			    						orderIndex: orderItemIndex
			    					};

			    					// Disable warranty for STELLA products
			    					if ($scope.params.isStellaProduct) {
			    						_config.lensesData.warrantyOptions = null;
			    					}

			    					$scope.genericEditLens(_config);
			    				} else {
			    					$scope.hasLenses = false;
			    				}
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
			        
			        
				} else {
					return null;
				}
			}, function (error) {
				$log.error(error);
				tealium_data2track.push({
					'id': 'Error',
					'Error_Code': 'Error while retrieving frame data',
					'Error_Source': 'Client'
				});

				return null;
			});
	
	}

	$scope.$on('lenspanel:closed', function (event, callerId, action, lens) {
		if ($scope.callerId != callerId)
			return;

		showHiddenElement();

		// workaround to hide cart header
		// var _header = document.getElementById('header_wrapper');
		// _header.style.zIndex = '';

		var _el = document.getElementById('skipToMainContent');
		if (_el) _el.style.display = '';

		if (!action || action == lpModalService.CLOSE_ACTION_CANCEL)
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
			var paymentInstallmentTypes = ['afterpay', 'affirm'];
			var multiplePaymentInstallmentValue = true;
			if(!$scope.params.isAfterpayEnabled){
				paymentInstallmentTypes = ['affirm'];
				multiplePaymentInstallmentValue = false;
			}
			var _config = {
				selector: '#rxcApp',
				brand: 'targetoptical',
				insuranceModule: toInsurance,
				prescriptionModule: $scope.params.isPrescriptionEnabled ? toPrescription : null,
				actionsModule: toActionsModule,
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
						brandImageUrl: 'https://assets.targetoptical.com/extra/image/TargetOptical/brands/TO_' + $scope.params.frameBrand.replace(/ /g, '_') + '_Logo.png',
						rxValues: $scope.frameRXValues,
					},
					frameOnlyLensUPC: $scope.params.frameOnlyLensUPC,
				},
				learnMoreBaseEndpoint: "/wcs/resources/store/12001/espot/",
				linksData: {
					warrantyLearnMore: '/to-us/our-guarantee?section=protectionPlan'
				},
				paymentInstallment: {
					type: 'afterpay',
					installments: 4,
					multiplePaymentInstallment: multiplePaymentInstallmentValue,
					types: paymentInstallmentTypes,
					contentIdentifier: "X_PDP_Installments"

				}
			};

			if ($rootScope.rxc.selectedLens) {
				_config.data.lens = {
					catEntryId: $rootScope.rxc.selectedLens.catEntryId
				}
			}

			if ($rootScope.rxc.selectedWarranty) {
				_config.data.warranty = {
					catEntryId: $rootScope.rxc.selectedWarranty.id
				}
			}
		}

		// workaround to hide cart header
		// document.getElementById('header_wrapper').style.zIndex = '30';
		// document.querySelector(".nav-links").style.zIndex = "0";

		// Move chat button to center when opening RXC
		var chatButtonElem = document.getElementsByClassName('cx-side-button-group');

		if (chatButtonElem && chatButtonElem.length && !$scope.isMobile) {
			chatButtonElem = chatButtonElem[0];
			chatButtonElem.style.setProperty('right', '50%', 'important');
		}

		$rootScope.oldHistoryLength = window.history.length;
		$rootScope.rxc.rxcWidget = RXC.rxcWidget.new(_config);
		$rootScope.rxc.rxcWidget.render();
	}
	
	/*
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
			if (lens[i].innerText.includes('Progressive') && document.getElementsByClassName('to-tabs-header hide').length < 1 && !isTrueProgressive){
					document.getElementById('tab2').click();
			}
	
			if (lens[i].innerText.includes('Progressive') && document.getElementsByClassName('to-tabs-header hide').length < 1) {
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
	*/
	
	//OK
	$scope.initCheckoutComponent = function () {
		
		if(!$rootScope.checkoutCartComponentRendered){
			if($('#onBehalfBar').length > 0){
				var onBehalfSession = true;
			}else{
				var onBehalfSession = false;
			}
			window.tealium_data2track = [];
			
			
			//configurator object
			var config = {
		        selector: '#root-checkout',
		        langUrl: $scope.params.jsAssetsDir +'javascript/en_us_checkout_label.js',
		        lang: 'en',
		        country: 'US',
		        linkPrivacyPolicy: '/to-us/privacy-policy',
		        linkTermCondition: '/to-us/terms-and-conditions',
		        linkHome: '/',
		        linkEyeGlasses: '/to-us/eyeglasses',
		        linkSunGlasses: '/to-us/sunglasses',
		        linkConditionUseSale: '/to-us/terms-and-conditions',
		        linkPrivacyNotice: '/to-us/privacy-policy',
		        linkCookieAndInternetAdvertising: '/to-us/privacy-policy#ct_q13',
		        linkContinueShopping: '/',
		        mockRequests: false,
		        hostname: 'https://' + window.location.hostname,
		        pagesUrl: {
		        	cart: $scope.params.cart,
		        	prescription: $scope.params.prescription,
		            shipping: $scope.params.shipping,
		            payment: $scope.params.payment,
		            typ: $scope.params.typ,
		            prescriptionTyp: $scope.params.prescriptionTyp,
		        },
		        orderId: $scope.params.orderId,
		        email: $scope.params.email,
		   		enabledShippingModes: ['Ground', '2nd Day Air', 'Next Day Air', 'Ship to store'], //insert here 'shipModeCode' of the enabled shipping modes
		        brand: 'TO',
		        storeId: '12001',
		        catalogId: '12751',
		        langId: '-1',
		        loggedUserEmail: $scope.params.loggedUserEmail,
				userId: $scope.params.userId,
		        starsEnablement: {
		            checkStars: true,
		            productNumber: 1,
		            orderItemType: 'stars',
		        },
		        insurance: {
		            rxInsurable: true, 
		            frameOnlyInsurable: true, 
		            clInsurable: true,
		            noPrescriptionInsurable: false, 
		        },
		        autocomplete: 'on',
		        onBehalfSession: onBehalfSession,
		        callFromComponentToGl: {
		            onLogin: () => {
		            	openSignInDirectly();
		            },
		            onCreateAccount: () => {
		            	openCreateModal();
		            },
		            showCartServices: (value) => {
		            	if (value){
		                    if(document.getElementsByClassName("x-cart-services") != null &&document.getElementsByClassName("x-cart-services").length > 0){
		                    	document.getElementsByClassName("x-cart-services")[0].classList.remove("hide");
		                    }
		            	} else {
		                    if(document.getElementsByClassName("x-cart-services") != null &&document.getElementsByClassName("x-cart-services").length > 0){
		                    	document.getElementsByClassName("x-cart-services")[0].classList.add("hide");
		                    }
		            	}
		            },
		            hideHeaderFooter: value => {
		                if (value){
		                	if(document.getElementById("header_wrapper") != null){
		    					document.getElementById("header_wrapper").style.display = "none";
		    					document.getElementById("header_wrapper").classList.remove('d-md-block');
		                	}
		                	if(document.getElementsByClassName("promo-stripe ct-strip") != null && document.getElementsByClassName("promo-stripe ct-strip").length > 0){
		                		document.getElementsByClassName("promo-stripe ct-strip")[0].style.display = "none";
		                	}
		                    if (document.getElementById("footer_wrapper") != null){                        
		                        document.getElementById("footer_wrapper").style.display = "none";
		                    } else if (document.getElementById("SiteFooter") != null && document.getElementById("SiteFooter").length > 0){
		                        document.getElementById("SiteFooter").style.display = "none";
		                    }
		                    if(document.getElementsByClassName("header-mobile-responsive") != null && document.getElementsByClassName("header-mobile-responsive").length > 0){
		                    	document.getElementsByClassName("header-mobile-responsive")[0].style.display = "none";
		                    }
						} else {
							if(document.getElementById("header_wrapper") != null){
								document.getElementById("header_wrapper").style.display = "block";
							}
		                    if (document.getElementById("footer_wrapper") != null){                        
		                        document.getElementById("footer_wrapper").style.display = "block";
		                    } else if (document.getElementById("SiteFooter") != null){
		                        document.getElementById("SiteFooter").style.display = "block";
		                    }
		                    if(document.getElementsByClassName("header-mobile-responsive") != null &&document.getElementsByClassName("header-mobile-responsive").length > 0){
		                    	document.getElementsByClassName("header-mobile-responsive")[0].style.display = "block";
		                    }
						}
		            },
		            editOrderItem: (frameId, lensesAddonsIds, orderId, orderItemId, orderItemIndex) => {
		                $scope.editLens(frameId, lensesAddonsIds, orderId, orderItemId, orderItemIndex);
		            },
		            onInsuranceOpening: () => {
	            		if(RiaHelper.getCookie('json_insurance') != ''){
			            	RiaHelper.toggleInsurance(true);
		            		applyInsurance(true);
		            		window.globalMethods.onInsuranceClosing('add_success'); 
	            		}else{
		            		showInsuranceModal();
	            		}
		            },
		            onRecalculateInsurance: () => {
		            	if(RiaHelper.getCookie('ria_0') != ''){
		            		RiaHelper.toggleInsurance(true);
		            		applyInsurance(true);
		            	}else if(RiaHelper.getCookie('json_insurance') != ''){
		            		RiaHelper.toggleInsurance(false);
		            		applyInsurance(false);
		            	}
		            },
		            calculateInsuranceOnLoading: () => {
		       			if(RiaHelper.getCookie('json_insurance') != '' && document.cookie.indexOf('ria_0=') === -1){
		       				RiaHelper.toggleInsurance(true);
		       				applyInsurance(true);
		       			} else if(RiaHelper.getCookie('json_insurance')){
		       				RiaHelper.toggleInsurance(false);
		       				applyInsurance(false);
		       			}
		            },
			  	    resetHeaderCartItems: function() {
			  	    	$(".headerCartItemsCounter").css("display","none");
			  	    },
		        },
		        IDMe: {
		            dataScope: 'government,hospital_employee,medical,military,nurse,responder,teacher',
		            dataClientId: $scope.params.idme_client_id,
		            dataRedirect: $scope.params.idme_redirect_url,
		        },
		        reCaptcha: {
		            siteKey: $scope.params.reCaptchaClientKey, //public recaptcha key of the site
		            theme: 'dark', //dark, light
		            size: 'invisible', //compact, normal or invisible
		            enabled: $scope.params.reCaptchaEnabled, //true, false
		        },
		        paypal: {
		            clientKey: $scope.params.ppClient,
		            locale: 'en_US',
		            enabled: $scope.params.isPaypalEnabled,
		            PAYPAL_EXPRESS_CHECKOUT_URL:
		                '/webapp/wcs/stores/servlet/PayPalSetExpressCheckoutTO?catalogId={{0}}&langId={{1}}&storeId={{2}}&orderId={{3}}&cartMode=true',
		            PAYPAL_CHECKOUT_URL:
		                '/webapp/wcs/stores/servlet/PayPalSetExpressCheckoutTO?catalogId={{0}}&langId={{1}}&storeId={{2}}&orderId={{3}}&URL=CheckoutSingleShipmentSummaryView',
		            PAYPAL_RETURN_URL_CART:
		                '/webapp/wcs/stores/servlet/PayPalGetExpressCheckoutDetailsAddressUpdateCartTO?orderId={{0}}&catalogId={{1}}&storeId={{2}}&token={{3}}',
		            PAYPAL_RETURN_URL:
		                '/webapp/wcs/stores/servlet/PayPalGetExpressCheckoutDetailsAddressUpdateTO?orderId={{0}}&catalogId={{1}}&storeId={{2}}&token={{3}}',
		            learnMoreLink: 'https://www.paypal.com/us/digital-wallet/how-paypal-works',
		        },
		        affirm: {
		            apiKey: $scope.params.apiKey,
		            script: $scope.params.affirmScript,
		            enabled: $scope.params.isAffirmEnabled == "true",
		            totalThresholdVal: $scope.params.affirmTotalThreshold,
		            initiateCheckoutTemplateURL:
		                '/webapp/wcs/stores/servlet/AffirmCreateSessionTO?catalogId={{0}}&langId={{1}}&storeId={{2}}&orderId={{3}}',
		            authorizeTemplateURL:
		                '/webapp/wcs/stores/servlet/AffirmProcessOrderTO?catalogId={{0}}&langId={{1}}&storeId={{2}}&orderId={{3}}',
		            learnMoreLink: '/to-us/affirm',
		        	showLearnMoreLink: true
		        },
				afterpay: {
					apiScript: $scope.params.afterpayApi,
					afterpayInstallmentDefaultNo: $scope.params.afterpayInstallmentNo,
					enabled: $scope.params.isAfterpayEnabled,
					script: $scope.params.afterpayScript,
					afterpayThresholdMaxUs: $scope.params.afterpayMax,
					afterpayThresholdMinUs: $scope.params.afterpayMin,
					initiateCheckoutTemplateURL:
						'/webapp/wcs/stores/servlet/InitiateAfterpayPayment',
					storeConfigLocale: $scope.params.storeConfigLocale,
					authorizeTemplateURL:
						'/webapp/wcs/stores/servlet/AfterpayAuthorizeTO?catalogId={{0}}&langId={{1}}&storeId={{2}}&orderId={{3}}&billingAddressId={{4}}',
					clickHereLink: 'https://www.afterpay.com/en-US/installment-agreement',
		            learnMoreLink: 'https://www.afterpay.com/en-US/installment-agreement',
				},
		        klarna: {
		        	enabled: false
		        },
		        onCart: () => {},
		        onCheckout: () => {},
		        onTyp: () => {},
		        onExpressCheckout: () => {}, //quando utente clicca su express
		        assetsUrl: 'https://assets.targetoptical.com/is/image/TargetOptical/',
		        assetsUrlContact: 'https://assets.targetoptical.com/extra/image/TargetOptical/contacts/',
		        numOfBoxCL: 12,
		        timeToWait: 20,
		        showLoginOnSecureCheckout: $scope.params.showLoginCheckoutEnabled,
		        socialLogin: {
		            googleClientId: $scope.params.googleClientId,
		            facebookAppId: $scope.params.fbAppId,
		        },
		        forgotPasswordLink: '/to-us/signup',
		        warrantyPrice:$scope.params.warrantyPrice,
		        authToken: $scope.params.authToken,
		        pd: {
		        	singleMin: 51,
		        	singleMax: 77,
		        	doubleMin: 25,
		        	doubleMax: 38,
		        },
		        actions: {
		  	      /* add to cart functions */
	        	addToBagFrameLens: function(params) {
			    	  
			    	  if(params.lens == '' || params.lens == undefined){
			    		  toActionsModule.getPlanoLens(params.frameCatentryId).then(function(planoLensId){
			    			  if(planoLensId != '' && planoLensId != undefined) {
			    				  params.lens = planoLensId;
			    				  toActionsModule.addToCartFromSavedItems(params).then(function(response){
			    					  
									});
			    			  }
			    		  }) 
			    	  } else {
				        // wcs handles the logic, returns promise for async operation
				    	toActionsModule.addToCartFromSavedItems(params).then(function(response){
				
						});
			    	  }
			        return Promise();
			      },
		  	      addToBagContacts: function(params) {
		  	        // wcs handles the logic, returns promise for async operation
		      	    toActionsModule.addToCartCLFromSavedItems(params).then(function(response){
		  				if(response.status == 'ok'){
		  					
		  				}
		  			});
		  	        return Promise();
		  	      },
		  	      toggleFindAndTryInStore: function(params) {
		  	        // for LC only - for frame only
		  	        // wcs handles the logic, returns promise for async operation 
		  	        return Promise();
		  	      },
		  	      updateSavedItemsCount: function() {
		  	    	// Retrieve wish list quantity from headerModule
		  			headerModule.getWishListItems().then(function(response){
		  				$rootScope.wishlistItems = response.catentries;
		  			});
		  	      },
		  	    }
		    };
			//init and render widget
			$('document').ready(function(){
				var checkoutWidget = TargetOptical.checkoutWidget.new(config);
				checkoutWidget.render();
				$rootScope.checkoutCartComponentRendered = true;
				console.log('checkoutwidget rendered');
			});	
		}
		
	}
		
	 //FAQ
    $scope.$timeout = $timeout;

	$scope.qnaInitializer = function () {
		jsonElements = document.querySelectorAll('[type="application/ld+json"]');
		for (var i = 0; i < jsonElements.length; i++) {
			try {
				if(jsonElements[i].innerHTML != null) {
					qnasObj = JSON.parse(jsonElements[i].innerHTML);
					console.log(qnasObj);
					if(qnasObj[0]["@type"] != null && qnasObj[0]["@type"] == "FAQPage") {
						if(qnasObj[0].mainEntity.length > 0)
							$scope._qnas = qnasObj;
							break;
					}
				}
			} catch (error) {
				console.error("Json does not contain faq");
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
	
	$scope.showAnswer = function($event) {
		$scope.showAnswer = function($event, isAlwaysOpen) {
			if(!isAlwaysOpen) {
				questions = document.getElementsByClassName("plp_q");
				answers = document.getElementsByClassName("plp_a");
				plusIcons = document.getElementsByClassName("plus-icon");
				minusIcons = document.getElementsByClassName("minus-icon");

				index = Array.prototype.indexOf.call(questions, $event.currentTarget);
				if(answers[index].style.height == "0px") {
					answers[index].style.height = "100%";
					answers[index].style.maxHeight = "300px";
				} else {
					answers[index].style.height = "0px";
					answers[index].style.maxHeight = "0px";
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
});

function showInsuranceModal(){
	var jsonInsurance = JSON.parse($.cookie('json_insurance'));
	if(jsonInsurance == null){
		insuranceController.openHoverigPanel();
	}
}

function applyInsurance(insuranceChosen) {
    var jsonInsurance = RiaHelper.loadJsonInsurance();
    if(jsonInsurance != null)
    {	
        var params = [];	
        params.riaInsuranceInformation = jsonInsurance.riaInsuranceInformation;
        params.chooseBenefit = insuranceChosen;	
        params.storeId = constants.ajaxParams['storeId'];
        params.catalogId = constants.ajaxParams['catalogId'];
        params.langId = constants.ajaxParams['langId'];
        params.URL="";
        params.updatePrices = "1";
        
        params.orderId = ".";
        params.calculationUsageId = "-1";
        
        wc.service.invoke("AjaxOrderCalculate", params);
    }
};
app.controller('GuestOrderTrackerController', ['$scope', '$rootScope', '$http', '$window', '$log', '$timeout', '$filter', '$loader',
    function($scope, $rootScope, $http, $window, $log, $timeout, $filter, $loader) {

        // global variables
		$scope.params = {
			storeId: 12001,
			langId: -1, 
			catalogId: 12751,
			framesImageURL: '',
			contactsImageURL: ''
		};
		
		$scope.switchOrderOnline = true;
		$scope.orderData = undefined;
		$scope.orderDataStore = undefined;
		$scope.data = {
			orderId: '',
			email : '',
			lastName: '',
		};

		function formValidOnline() {
			return !!$scope.data.orderId && !!$scope.data.email
		}
		
		function formValidStore() {
			return !!$scope.data.orderId && !!$scope.data.lastName
		}
		
		//I assign a number(step) for each value
		$scope.status = [
			'Order Received',		//Step 0
			'In Process',			//Step 1
			'Shipped',				//Step 2
			'Ready for Pickup',		//Step 3
			'Dispensed'				//Step 4
		];
		$scope.statusError = 'Please call the Store';

		orderNotFound = 'Oops! No order found. Please check your data and try again.'

		// errors global
		$scope.errors = {
			'trackOrderError' : {
				'msg' : orderNotFound,
				'value': false
			}
		};
		
		$scope.initGuest = function() {
			var url_string = window.location.href
			var url = new URL(url_string);
			var lastName = url.searchParams.get("lastName");
			var orderId = url.searchParams.get("orderId");
			if (orderId && orderId != ''  && lastName && lastName != '') {
				$scope.data = {
					orderId: orderId,
					email : '',
					lastName: lastName,
				};
				$scope.switchOrderOnline = false;
				$scope.callAPIOrderInStore();
			}
		}
		
		$scope.callAPIOrderInStore = function() {
			
			$scope.errors.trackOrderError.value=false;
			
			$scope.retreiveOrderURL = '/wcs/resources/store/' + $scope.params.storeId + '/ordersInStore/byOrderIdLastName?orderId=' + $scope.data.orderId + '&lastName=' + encodeURIComponent($scope.data.lastName);
			$http.get($scope.retreiveOrderURL)
            .then(function(response) {
                if (response.data && response.data.orderId &&  response.status == 200) {
                	$scope.orderDataStore = response.data;
                	$scope.orderDateShow = $scope.getDateFormat($scope.orderDataStore.orderDate);
					$scope.orderPromiseDateShow = $scope.orderDataStore.promiseDate ? $scope.getDateFormat($scope.orderDataStore.promiseDate) : '-';
        			$scope.finalStep = 0;
        			
        			Object.entries($scope.orderDataStore.all_status).forEach(statusElement => {
        				$scope.orderDataStore.all_status[statusElement[0]] = $scope.getDateHoursFormat(statusElement[1]);
        				//Find the bigger status in all_status
        				if($scope.status.indexOf(statusElement[0]) >  $scope.finalStep){
        					$scope.finalStep = $scope.status.indexOf(statusElement[0]);
        				}	
        			});
        			
        			console.log('test: ' + $scope.orderDataStore.storeInfo.address);
        			$scope.errorCallStore = false;
        			
        			if ($scope.orderDataStore.order_status.toUpperCase() === $scope.statusError.toUpperCase()) {
        				//Error Please call the Store
        				$scope.errorCallStore = true;				
        			} else {
        				//Regular step
        				switch($scope.orderDataStore.order_status.toUpperCase()) {
        					case $scope.status[0].toUpperCase():
        						$scope.currentStep = 0;
        						break;
        					case $scope.status[1].toUpperCase():
        						$scope.currentStep = 1;
        						break;
        					case $scope.status[2].toUpperCase():
        						$scope.currentStep = 2;
        						break;
        					case $scope.status[3].toUpperCase():
        						$scope.currentStep = 3;
        						break;
        					case $scope.status[4].toUpperCase():
        						$scope.currentStep = 4;
        						break;
        					deafult: 
        						$scope.errors.trackOrderError.value = true;
        						$scope.orderDataStore = undefined;
								sendErrorAnalytics($scope.errors.trackOrderError.msg)
        						break;
        				}
        			}
        			
                } else if(response.data && (response.status == 404 || response.data.orderId == null)) {
                	$scope.errors.trackOrderError.value=true;
                	$scope.errors.trackOrderError.msg=orderNotFound;
					sendErrorAnalytics($scope.errors.trackOrderError.msg)
                } else {
                    $log.error('Error getting order item data from service');
					sendErrorAnalytics('Error getting order item data from service')
                }
                

            }, function(error) {
                $log.error('Error getting order item data from service.\n' + error);
				sendErrorAnalytics('Error getting order item data from service')
                
                $scope.errors.trackOrderError.value=true;
				$scope.errors.trackOrderError.msg='Error getting order item data from service';
            });
		}
       
		$scope.retreiveOrderInStore = function() {
			if (formValidStore()) {
				$loader.show('search-order');
				
				$scope.callAPIOrderInStore();
				
				$loader.hide('search-order');
			} else {
				$scope.errors.trackOrderError.msg = "Please fill out the form"
				$scope.errors.trackOrderError.value = true
			}
		};
		
		/*
		 * Input:  date string
		 * Output: date string in format MM/DD/YY HH:MM AM   
		 * Ex.07/03/21 06:30 AM
		 */
		$scope.getDateHoursFormat = function(date) {
			$scope.dateFromat =  new Date(date);
			$scope.dateMonth = ($scope.dateFromat.getMonth()+1 < 10 ? '0'+($scope.dateFromat.getMonth()+1) : ($scope.dateFromat.getMonth()+1));
			$scope.dateDay = ($scope.dateFromat.getDate() < 10 ? '0'+$scope.dateFromat.getDate() : $scope.dateFromat.getDate());
			$scope.dateYear = ($scope.dateFromat.getFullYear()+'').substring(2,4);
			$scope.dateHours = $scope.dateFromat.toLocaleString('en-US', { timeZone: 'UTC', hour: 'numeric', minute: 'numeric', hour12: true })
			$scope.dateHours = $scope.dateHours.split(':')[0] < 10 ? '0'+$scope.dateHours : $scope.dateHours;
			return $scope.dateMonth + '/' + $scope.dateDay + '/' + $scope.dateYear + ' ' + $scope.dateHours;
		}
		
		/*
		 * Input:  date string
		 * Output: date string in format Month Day, Year   
		 * Ex.May 7, 2022
		 */
		$scope.getDateFormat = function(date) {
			$scope.dateFromat =  new Date(date);
			$scope.dateMonth = $scope.dateFromat.toLocaleString('en-us', { month: 'long' });
			$scope.dateDay = $scope.dateFromat.getDate();
			$scope.dateYear = $scope.dateFromat.getFullYear();
			return $scope.dateMonth + ' ' + $scope.dateDay + ', ' + $scope.dateYear;
		}
		
        $scope.retreiveOrder = function(){
			if (formValidOnline()) {
				$loader.show('search-order');
				$scope.errors.trackOrderError.value=false;
				$scope.retreiveOrderURL = '/wcs/resources/store/' + $scope.params.storeId + '/ordercst/guest/' + $scope.data.orderId + '?email=' + encodeURIComponent($scope.data.email.toLowerCase());
				$http.get($scope.retreiveOrderURL)
					.then(function(response) {
						if (response.data && response.status == 200) {
							$scope.orderData = response.data;
							
							angular.forEach($scope.orderData.orderItem, function(value, key){
								
								var productViewURL = '/wcs/resources/store/' + $scope.params.storeId + '/productview/' + value.partNumber + '?catalogId='+ $scope.params.catalogId;
								
								$http.get(productViewURL)
								.then(function(response) {
									if (response.data && response.status == 200) {
										
										if((value.comments == 'SUN' || value.comments == 'EYE' || value.comments == 'LENS') && value.partNumber != '99' ){
											$scope.orderData.orderItem[key]['productview'] = response.data;
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
							$scope.errors.trackOrderError.msg=orderNotFound;
							$scope.errors.trackOrderError.value=true;
							sendErrorAnalytics($scope.errors.trackOrderError.msg)
						} else {
							$log.error('Error getting order item data from service');
							sendErrorAnalytics('Error getting order item data from service')
						}

					}, function(error) {
						$log.error('Error getting order item data from service.\n' + error);
						sendErrorAnalytics('Error getting order item data from service')
						$scope.errors.trackOrderError.msg='Error getting order item data from service';
						$scope.errors.trackOrderError.value=true;
						
						$loader.hide('search-order');
					});
			} else {
				$scope.errors.trackOrderError.msg = "Please fill out the form"
				$scope.errors.trackOrderError.value = true
			}
        }

		function sendErrorAnalytics(msg) {
			tealium_data2track.push({
				id: 'Error',
				Error_Source: "User",
				Error_Code: "Form Filling Error",
				Error_Message: msg,
				Error_Details: msg
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
]);;
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
	$scope.eyeExamInTexas = -1;
	$scope.eyeExamInOklahoma = -1;
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
		} else if (window.getParameterByName("zipCode")) {
			locationEntry = window.getParameterByName("zipCode");
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

		var cookieLocationEntry = $cookies.get('to_location_entry');

		if (cookieLocationEntry && cookieLocationEntry !== '') {
			locationEntry = cookieLocationEntry;
		}

		return locationEntry;
	};

	$scope.setLocationEntryCookie = function(locationEntry) {
		$cookies.put('to_location_entry', locationEntry);
	};

	$scope.clearLocationEntryCookie = function() {
		$cookies.remove('to_location_entry');	
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
			
			geocoder.geocode({
				address : $scope.currentLocationEntry
			}, callback);
		}
	};

	$scope.resetStores = function() {
		$scope.offset = 0;
		$scope.totalCount = 0;
		$rootScope.stores.length = 0;
	};

	$scope.findStores = function(form, event) {
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
		if (event) {
			event.preventDefault();
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
			if (response.data.PhysicalStore != undefined) {
				var stores = angular.copy($rootScope.stores);

				// Populate stores
				$scope.favouriteStoresAdded = 0;
				for (var i = 0; i < response.data.PhysicalStore.length; i++) {
					var physicalStore = response.data.PhysicalStore[i];

					// add schedule URL
					physicalStore.scheduleURL = decodeURIComponent($scope.scheduleBaseURL).replace('#storeNumber#', physicalStore.storeName);
					physicalStore.scheduleURL = physicalStore.scheduleURL.replace('www.targetoptical.com', 'www.examappts.com');
					
					// add e-appointmnet availability
					physicalStore.eyeExamOnline = $scope.isOnlineExamAvailable(physicalStore);

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
			} else {
				$scope.currentLocation = null;
				$scope.noResults = true;
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
					$rootScope.stores[storeIndex].x_userId = response.data.response["user"];

					$scope.storeFavouriteLoading = -1;
					$scope.favouriteStoresAdded++;
					if ($scope.favouriteStoresAdded > 3) {
						$scope.favouriteStoresAdded--;
						$scope.findStores();
					}
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
    
    $scope.setEyeExamInTexasIndex = function(index) {
    	$scope.eyeExamInTexas = index;	
    };
    
    $scope.setEyeExamInOklahomaIndex = function(index) {
    	$scope.eyeExamInOklahoma = index;	
    };

    $scope.EyeExamInCaliforniaRedirect = function() {
    	var californiaURL = document.getElementsByName('californiaURL')[0].value;
    	$window.open(californiaURL);	
    	$scope.setEyeExamInCaliforniaIndex(-1);
    };
    
    $scope.EyeExamInTexasRedirect = function() {
    	var texasURL = document.getElementsByName('texasURL')[0].value;
    	$window.open(texasURL);	
    	$scope.setEyeExamInTexasIndex(-1);
    	$scope.setEyeExamInOklahomaIndex(-1);
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
			currUrl = currUrl.concat('lc-ca/eye-exam').replace('.com', '.ca');
			errorText= 'Did you mean to go to <a href="'+currUrl+'">LensCrafters.ca</a>?'
    	}else{
    		currUrl = window.location.href.substring(0,window.location.href.indexOf('lc-ca'));
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
app.controller('FrameAdvisorController', ['$scope', '$rootScope', '$compile', '$window', '$http', '$log', '$timeout', '$httpParamSerializer',
    function ($scope, $rootScope, $compile, $window, $http, $log, $timeout, $httpParamSerializer, headerModule) {

        $scope.products = [];
        $scope.productsRunningIndex = 0;
        $scope.productsBlockCount = 50;

        $scope.productList = [];

        $scope.moreCount = 0;

        $scope.showLoadMore = false;
        
        if(document.querySelector('.promo-stripe').offsetHeight > 0 ){
        	document.querySelector('#frameadv-ui').classList.add("navigation-promo");;
        }

        $scope.showStartPage = window.sessionStorage["showStartPage"] == "false" ? false : true;
        $scope.showFrameFinder = !$scope.showStartPage;

        $rootScope.wishlistItems = [];

        // headerModule.getWishListItems().then(function (response) {
        //     $rootScope.wishlistItems = response.catentryIds;
        // });

        $scope.baseUrl = window.location.origin;
        //$scope.marketCode = window.location.pathname.indexOf("/lc-ca/") > 0 ? "/lc-ca/" : "/lc-us/";
        $scope.marketCode = window.location.pathname.indexOf("/to-ca/") > 0 ? "/to-ca/" : "/to-us/";
        
        
     // When the user scrolls the page, execute myFunction
        window.onscroll = function() {myFunction()};

        // Get the navbar
        

        // Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
        function myFunction() {
        	var navbar = document.getElementsByClassName("glass-filters")[0];
        	var navbarToCheck = document.getElementsByClassName("glass-filters-wrapper")[0];

            // Get the offset position of the navbar  TODO
        	if(navbar){
        		var sticky = navbarToCheck.offsetTop + 80;
            	if (window.pageYOffset >= sticky) {
            		//navbar.classList.add("sticky")
            		if(!$('.sticky').length)
            			$( ".glass-filters" ).wrap( "<div class='sticky'></div>" );
            	} else {
            		if($('.sticky').length)
            			$('.glass-filters').unwrap();	
            		//navbar.classList.remove("sticky");
            	}	
        	}
        }
        
        
        $scope.initAnalytics = function () {
            const cns = [
                'card__facescan',
                'card__survey',
                'card__step-2b-quiz-man',
                'card__step-2b-quiz-woman',
                'card__step-2c-quiz-angular',
                'card__step-2c-quiz-rounded',
                'card__step-2d-quiz-square-title',
                'card__step-2d-quiz-triangle-title',
                'card__step-2d-quiz-rectangle-title',
                'card__step-2d-quiz-round-title',
                'card__step-2d-quiz-oval-title',
                'card card__step-2-quiz-sun',
                'card card__step-2-quiz-eye'
            ];
            const d2t = [
                'Facescan',
                'Survey',
                'Masculine',
                'Feminine',
                'More angular',
                'More round',
                'Square',
                'Triangular',
                'Rectangular',
                'Circular',
                'Oval',
                'Sunglasses',
                'Eyeglasses'
            ];
            function track_Connection_Select(sel) {
                window.sessionStorage.setItem("FrameAdv_Connection_Select", sel);
                tealium_data2track.push({
                    id: 'FrameAdv',
                    FrameAdv_Connection_Select: window.sessionStorage.getItem("FrameAdv_Connection_Select")
                });
            }
            function track_Gender_Select(sel) {
                window.sessionStorage.setItem("FrameAdv_Gender_Select", sel);
                tealium_data2track.push({
                    id: 'FrameAdv',
                    FrameAdv_Gender_Select: window.sessionStorage.getItem("FrameAdv_Gender_Select")
                });
            }
            function track_Jawline_Select(sel) {
                window.sessionStorage.setItem("FrameAdv_Jawline_Select", sel);
                tealium_data2track.push({
                    id: 'FrameAdv',
                    FrameAdv_Jawline_Select: window.sessionStorage.getItem("FrameAdv_Jawline_Select")
                });
            }
            function track_Faceshape_Select(sel) {
                window.sessionStorage.setItem("FrameAdv_Faceshape_Select", sel);
                tealium_data2track.push({
                    id: 'FrameAdv',
                    FrameAdv_Faceshape_Select: window.sessionStorage.getItem("FrameAdv_Faceshape_Select")
                });
            }
            function track_Frametype_Select(sel) {
                window.sessionStorage.setItem("FrameAdv_Frametype_Select", sel);
                tealium_data2track.push({
                    id: 'FrameAdv',
                    FrameAdv_Frametype_Select: window.sessionStorage.getItem("FrameAdv_Frametype_Select")
                });
            }
            const d2tf = [
                track_Connection_Select,
                track_Connection_Select,
                track_Gender_Select,
                track_Gender_Select,
                track_Jawline_Select,
                track_Jawline_Select,
                track_Jawline_Select,
                track_Jawline_Select,
                track_Jawline_Select,
                track_Faceshape_Select,
                track_Faceshape_Select,
                track_Frametype_Select,
                track_Frametype_Select
            ];
            /*document.querySelector('#frameadv-ui').addEventListener("click", function (e) {
                let target = e.target;
                while (target.tagName.toLowerCase() != 'a') {
                    target = target.parentNode;
                }
                let cn = target.className;
                if (cn == undefined) {
                    return;
                }
                for (let i = 0; i < cns.length; i++) {
                    if (cn.indexOf(cns[i]) > 0) {
                        d2tf[i](d2t[i]);
                    }
                }
            });*/
        }
        
        $scope.initAnalytics();

        $scope.initLoadingSpinner = function () {
            document.querySelector('body').addEventListener('fa-loading', function (e) {
                $('.spinner-content').html('<lottie-player src="https://cdn-prod.fluidconfigure.com/static/assets/prod/prod/customers/c1581/configureHtml/etc/assets/lib/loader/loader.json"  background="transparent"  speed="1"  style="width: 150px; height: 150px; filter:invert(1);"  loop autoplay></lottie-player>');
            }, false);
            document.querySelector('body').addEventListener('fa-loaded', function (e) {
                $('.frame-advisor-capture-overlay-loading').css('opacity', 0);
            }, false);
            document.querySelector('body').addEventListener('onFACaptureLoading', function () {
                $('.loading-spinner-container').html('<lottie-player src="https://cdn-prod.fluidconfigure.com/static/assets/prod/prod/customers/c1581/configureHtml/etc/assets/lib/loader/loader.json"  background="transparent"  speed="1"  style="filter:invert(1);width:150px;height:150px" loop autoplay></lottie-player>');
                $('.frame-advisor-capture-overlay-loading').css('opacity', 1);
            }); 
            document.querySelector('body').addEventListener('onFACaptureComplete', function () {
                $('.frame-advisor-capture-overlay-loading').css('opacity', 0);
            });
        }

        $scope.initLoadingSpinner();
        
        //const frameAdvAPIStore = window.location.pathname.indexOf("/to-ca/") > 0 ? "LC@CA" : "LC@USA";
        const frameAdvAPIStore = "TO@USA";
        const privacyPolicy = $scope.baseUrl + $scope.marketCode + "privacy-policy";
        const termsAndConditions = $scope.baseUrl + $scope.marketCode + "privacy-policy#insurance";

        const config = {
            selector: "#frameadv-ui",
            locale: "en-US",
            overrideTranslationsUrl: "https://assets.targetoptical.com/extra/image/TargetOptical/projects/202112-frameadvisor/translateFA.json",
            //overrideTranslationsUrl: "https://d5nhc6q3o19l2.cloudfront.net/frame-advisor/en-CA/ml-labels_en-CA.json",
            facescanSource: 'B2C_TOCOM',
            facescanRegion: 'US',
            frameAdvAPICore: 'fa_catalog',
            frameAdvAPIStore: frameAdvAPIStore,
            facescanPrivacy: {
                privacyPolicy: privacyPolicy,
                termsAndConditions: termsAndConditions,
                localizationText: '',
            },
            resultCallback: function (data) {
                window.sessionStorage.setItem("products", JSON.stringify(data.products));
                window.sessionStorage.setItem("productsRunningIndex", "0");
                window.document.getElementsByClassName('btn-load-more')[0].click();
                
                //add style.display to manage when I use "try/take with a picture" component function
                document.getElementsByClassName('try-with-a-picture__link')[0].addEventListener("click", function() {
                	document.getElementById('products').style.display = "none";
                });
            },
        };
        const frameAdvisorWidget =
            frameAdvisor.FrameAdvisorWidget.new(config);
        
        if(window.sessionStorage.getItem('showStartPage') === 'false'){
        	frameAdvisorWidget.render();
        }
        
        $scope.start = function () {
            $scope.showStartPage = false;
            $scope.showFrameFinder = true;
            window.sessionStorage.setItem("showStartPage", "false");
            window.sessionStorage.setItem("FrameAdv_Start", "Start");
            /*tealium_data2track.push({
                id: 'FrameAdv',
                FrameAdv_Start: 'Start'
            });*/
            frameAdvisorWidget.render();
        }

        $scope.loadStep = function () {

            if ($scope.moreCount < 12 && $scope.productsRunningIndex < $scope.products.length) {

                var moreProducts = $scope.products.slice($scope.productsRunningIndex, $scope.productsRunningIndex + $scope.productsBlockCount);

                var queryText = moreProducts.map(function (p) { return 'partNumber=' + p.upc }).join('&');

                //$http.get('/search/resources/store/10851/productview/byPartNumbers?' + queryText)
                $http.get('/search/resources/store/12001/productview/byPartNumbers?' + queryText)
                    .then(function (response) {

                        if (response.data) {

                            var catalog = response.data['catalogEntryView'];

                            if (catalog.length) {

                                moreProducts.forEach(function (el) {

                                    if ($scope.moreCount < 12) {

                                        var catalogEntry = catalog.filter(function (ci) { return ci['partNumber'] == el['upc'] });

                                        if (catalogEntry.length) {

                                            var catEntry = catalogEntry[0];

                                            $log.log(catEntry);
                                            if(catEntry.buyable === 'true') {
                                            	
	                                            var priceDisplayValue = parseFloat(catEntry["price"].filter(function (p) { return p.usage == "Display" })[0].value);
	                                            var priceOfferValue = catEntry["price"].filter(function (p) { return p.usage == "Offer" })[0] !== null && catEntry["price"].filter(function (p) { return p.usage == "Offer" })[0] !== undefined ? parseFloat(catEntry["price"].filter(function (p) { return p.usage == "Offer" })[0].value) : 0;
	                                            var showPriceOffer = !isNaN(priceOfferValue) && (priceOfferValue > 0) && !isNaN(priceDisplayValue) && (priceDisplayValue > 0);
	                                            var priceDisplay = (!isNaN(priceDisplayValue) && priceDisplayValue > 0) ? ("$" + priceDisplayValue.toFixed(2)) : ((!isNaN(priceOfferValue) && priceOfferValue > 0) ? ("$" + priceOfferValue.toFixed(2)) : "");
	                                            var priceOffer = showPriceOffer ? ("$" + priceOfferValue.toFixed(2)) : "";
	                                            var priceDiscountValue = showPriceOffer ? Math.round(100 * (1 - parseFloat(priceOfferValue) / parseFloat(priceDisplayValue))) : 0;
	                                            var priceDiscount = showPriceOffer ? (priceDiscountValue + "%") : "";
	                                            //var mostPopular = catEntry["ad_attribute"].map(function (e) { return e.indexOf('/BEST_SELLER/') > 0 && e.indexOf('/YES/') > 0 ? 1 : 0; }).reduce(function (acc, val) { return acc + val; }, 0) > 0 ? 'MOST POPULAR' : '';
	
	                                            $scope.productList.push({
	                                                upc: el.upc,
	                                                brandName: catEntry['manufacturer'],
	                                                productName: catEntry['name'],
	                                                framePicture: 'https://assets.targetoptical.com/is/image/TargetOptical/' + catEntry['partNumber'] + '_noshad_fr.png?imwidth=600',
	                                                priceDisplay: priceDisplay,
	                                                priceOffer: priceOffer,
	                                                priceDiscount: priceDiscount,
	                                                showPriceOffer: showPriceOffer,
	                                                bridge: '',
	                                                //mostPopular: mostPopular,
	                                                favourite: true,
	                                                partNumber: catEntry['partNumber'],
	                                                itemID: catEntry['uniqueID'],
	                                                pdpUrl: $scope.baseUrl + $scope.marketCode + el.upc + '?frameadvisor=true',
	                                                number: $scope.moreCount+1
	                                            });
	                                            $scope.moreCount += 1;
                                            }
                                        }
                                        $scope.productsRunningIndex += 1;
                                    }
                                });
                            } else {
                                $scope.productsRunningIndex += $scope.productsBlockCount;
                            }
                        } else {
                            $scope.productsRunningIndex += $scope.productsBlockCount;
                        }

                        window.sessionStorage.setItem("productsRunningIndex", String($scope.productsRunningIndex));

                        $scope.loadStep();

                    }, function (error) {
                        $log.error(error);
                    });
            }
        }

        $scope.loadMore = function () {

            $scope.products = JSON.parse(window.sessionStorage['products']);
            $scope.productsRunningIndex = parseInt(window.sessionStorage['productsRunningIndex']);

            if ($scope.productsRunningIndex == 0) {
                $scope.productList = [];
            }

            $scope.moreCount = 0;
            
            //add style.display to manage when I use "try/take with a picture" component function
            $scope.showLoadMore = true;
            document.getElementById('products').style.display = "block";

            $scope.loadStep();
        }

        $scope.addFavFA = function (partNumber, itemID) {
            categoryDisplayJS.addItemToWishListAjax(itemID, 'frame');
            $(this).toggleClass('addtowish');
            utag.link({ link_name: 'faveAdd', product_id: [partNumber] });
            return false;
        }
    }
]);
app.factory("PromoPopupService", ["$timeout", "$http", "$httpParamSerializer", function ($timeout, $http, $httpParamSerializer) {
	service = {}
	
	function getCookieValueByName(name) {
		return document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || '';
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
	
	function updatePopupExists() {
		var acceptedCookieValue = getPromoAcceptedCookie();
		var eaactivity = getCookieValueByName("eaactivity");
		// check URL parameter promo != "eaccess"
		var promoParam = (new URLSearchParams(window.location.search)).get("promo");
		var cidParam = (new URLSearchParams(window.location.search)).get("cid");
	
		service.popupExists = (
			acceptedCookieValue !== "invalid" &&
			// !eaactivity &&
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
	
	var steps = {
		form: "form",
		wait: "wait",
		success: "success",
		error: "error",
	};
	
	// INIT
	updatePopupExists();
	updatePromoCodeIsValid();
	
	service.subscribe = {
		"preregister": true,
		"addressType": "M",
		"ageCheck": true,
		"canAddOrigin": true,
		"optinStatus": true,
		"URL": "SuccessView",
		"storeId": "12001",
		"langId": "-1",
		"emailType": "PromoPopup",
		"showRegister": true,
	};
	service.popupOpen = false;
	service.waiting = false;
	service.promoCode = getPromoAcceptedCookie();
	service.promoMinimized = !!getMininmizedCookie();
	
	if (service.promoCodeIsValid) {
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
				service.popupOpen = true;
				document.removeEventListener('scroll', showNLPopupEventHandler, true);
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

	window.openNLPopup = function() {
		$timeout(service.show, 0)
	}
	
	service.submit = function () {
		var submitURL = getAbsoluteURL() + "TOEmailSubscription";
		service.errorMessage = "";
	
		if (!service.subscribe.enteredEmail) return;
	
		var data = {
			preregister: service.subscribe.preregister,
			addressType: service.subscribe.addressType,
			ageCheck_12001_r_1: service.subscribe.ageCheck,
			canAddOrigin: service.subscribe.canAddOrigin,
			optinStatus: service.subscribe.optinStatus,
			URL: service.subscribe.URL,
			storeId: service.subscribe.storeId,
			langId: service.subscribe.langId,
			emailType: service.subscribe.emailType,
			showRegister: service.subscribe.showRegister,
			newsletterinput: service.subscribe.enteredEmail,
		};
	
		service.waiting = true;
	
		$http
			.post(submitURL, $httpParamSerializer(data), {
				headers: { "Content-Type": "application/x-www-form-urlencoded" },
			})
			.then(function (response) {
				if (response.status == 200 && response.data.status == 300) {
					console.log(response.data.message);
					service.registeredEmail = data.newsletterinput;
					service.errorMessage = "Sorry, this email already exists";
				} else if (response.status == 200 && response.data.message == 'Success') {
					setPromoAcceptedCookie("refresh");
					document.cookie = "eaactivity=true; max-age=2592000; path=/";
					location.reload();
					return;
				} else if (service.subscribe.enteredEmail !== undefined) {
					console.log(response.data.message);
					service.errorMessage = "Email subscription error, try later";
				}
	
				service.waiting = false;
			});
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
app.controller('MyPaymentMethodsController', ['$scope', '$rootScope', '$http', '$log', function ($scope, $rootScope, $http, $log) {
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
					"cc_cvc":$scope.ccinfo.securityCode
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
		var discover = /^6(?:011|5[0-9]{2})[0-9]{3,}$/;
		var diners = /^3(?:0[0-59]|[689][0-9])[0-9]{11}$/;
		
		var cardBrand;
		
		if (visa.test(cardNum)) {
			cardBrand = 'Visa';
		}else if (mastercard.test(cardNum)) {
			cardBrand = 'Master Card';
		}else if (amex.test(cardNum)) {
			cardBrand = 'Amex';
		}else if (discover.test(cardNum)) {
			cardBrand = 'Discover';
		}else if (diners.test(cardNum)) {
			cardBrand = 'Diners';
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
					$rootScope.removingPayment = false;
					$log.info('Payment method removed');
					
				}else{
					$rootScope.removingPayment = false;
					$log.warn('Unable to remove the payment method');
				}
			}, function(error) {
				$rootScope.removingPayment = false;
				$log.error('Unable to remove the payment method:' + error);
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
app.controller('HeaderController', ['$scope', '$rootScope', '$http', 'headerModule', 'toActionsModule', '$q',
    function ($scope, $rootScope, $http, headerModule, toActionsModule, $q) {
	
		$scope.storeId = null;
		$scope.langId = null;
		$scope.catalogId = null;
		$scope.shoppingCartUrl = null;
		
		$scope.userId = null;
		$scope.wishlist = null;
		$rootScope.wishlistItems = [];

		$scope.mixedItemsCart = false;
		
		var ORDER_URL = '/wcs/resources/store/12001/cart/@self';
		var SAVED_ITEMS_URL = '/wcs/resources/store/12001/catalog/12751/saveditems/@self?pageSize=1&pageNumber=1';
		
		$scope.init = function(params) {
	    	$scope.storeId = params.storeId;
	    	$scope.langId = params.langId;
			$scope.catalogId = params.catalogId;
			$scope.shoppingCartUrl = params.shoppingCartUrl;
			
			headerModule.getUserId()
			.then(function(userId) {
				$scope.userId = userId;
			})
			
			$scope.checkWishlist();
			
			// Retrieve wish list quantity from headerModule
			headerModule.getWishListItems().then(function(response){
				if(response.success == false){
					$rootScope.wishlistItems = "";
				} else {
					$rootScope.wishlistItems = response.catentries;
				}
			});
			
			$scope.config = {
		        selector: '#minicartComponent',
		        langUrl: '',
		        lang: 'en',
		        country: 'US',
		        mockRequests: false,
		        hostname: '',
		        brand: 'TO',
		        storeId: $scope.storeId,
		        catalogId: $scope.catalogId,
		        langId: $scope.langId,
		        callFromComponentToTO: {},
		        storeUniqueID: $scope.storeId,
		        assetsUrl: 'https://assets.targetoptical.com/is/image/TargetOptical/',
		        assetsUrlContact: 'https://assets.targetoptical.com/extra/image/TargetOptical/contacts/',
		        pagesUrl: {
		        	cartUrl: $scope.shoppingCartUrl,
		        	browseAllSavedItemsUrl: '/to-us/saved-items'
		        },
		        actions: {
		  	      /* minicart functions */
	        	   onOpenMinicart: function() {
	        		   $([document.body, document.documentElement]).css({"overflow": "hidden"});
                     },
                     onCloseMinicart: function() {
                    	 $([document.body, document.documentElement]).css({"overflow": ""});
                     },
                     showAffirmAfterpayModal: function() {
                    	 showAffirmAfterpayModal();
                     },
                     addToBagFrameLens: function(params) {
	   			    	  if(params.lens == '' || params.lens == undefined){
	   			    		  toActionsModule.getPlanoLens(params.frameCatentryId).then(function(planoLensId){
	   			    			  if(planoLensId != '' && planoLensId != undefined) {
	   			    				  params.lens = planoLensId;
	   			    				  toActionsModule.addToCartFromSavedItems(params).then(function(response){
	   			    					  
	   									});
	   			    			  }
	   			    		  }) 
	   			    	  } else {
	   				        // wcs handles the logic, returns promise for async operation
	   				    	toActionsModule.addToCartFromSavedItems(params).then(function(response){
	   				
	   						});
	   			    	  }
	   			    	  return Promise();
   			      	},
	   			    addToBagContacts: function(params) {
	   			        // wcs handles the logic, returns promise for async operation
	   		    	    toActionsModule.addToCartCLFromSavedItems(params).then(function(response){
	   						
	   					});
	   			        return Promise();
	   			    },
                    
		  	    }
			};
			
			var minicartWidget = MinicartComponent.minicartWidget.new($scope.config);
	        minicartWidget.render();
	        window.openPDPMinicart = function (){
	        	$scope.openPDPMinicart();
	        };
	    };
	    
	    $scope.openPDPMinicart = function() {
	    	var url = ORDER_URL;
            $http.get(url)
            .then(function (response) { 
                if (response && response.data.recordSetTotal > 0) {
                    if (response.data.orderItem) {
                        $scope.cartOrderItems = response.data.orderItem;
                        $scope.cartOrderItems.forEach(function(orderItem, orderItemIndex) {
                            if(orderItem.comments != "RCON" && orderItem.comments != "LCON"){
                                $scope.mixedItemsCart = true;
                                window.location.href = $scope.shoppingCartUrl;
                            }
                        });
                        if($scope.mixedItemsCart == false){
                            window.globalMinicartMethods.initMinicart({ 
                                mode: 'cart',
                                cart: response.data,
                                wishlist: null
                            });
                        }           
                    }
                }
            }, function (error) {
                window.globalMinicartMethods.initMinicart({ 
                    mode: 'cart',
                    cart: null,
                    wishlist: null
                });
            })
	    };
	    
	    
	    $scope.openMinicart = function(isCart) {
	    	if(isCart){
		    	if(window.location.pathname.indexOf('CartView') < 0){ //AjaxOrderItemDisplayView
			    	var url = ORDER_URL;
		    		
					$http.get(url)
					.then(function (response) {	
						if (response && response.data.recordSetTotal > 0) {		
							window.location.href = $scope.shoppingCartUrl;										
						} else{
							$scope.checkWishlist().then(function(ret){
								$scope.initMinicart('cart',null,$scope.wishlist);
							})
						}
					}, function (error) {
						//empty cart, let's check wishlist
						$scope.checkWishlist().then(function(ret){
							$scope.initMinicart('cart',null,$scope.wishlist);
						})
					})
		    	}else{
		    		window.location.href = window.location.href;	
		    	}
	    	}else{
	    		if($scope.wishlistTotalCount > 0 || ($rootScope.wishlistItems && $rootScope.wishlistItems.length > 0)){
	    			//$scope.checkWishlist().then($scope.initMinicart('wishlist',null,$scope.wishlist));
	    			window.location.href = window.location.protocol + '//' + window.location.hostname + '/to-us/saved-items';
	    		}else{
	    			$scope.checkWishlist().then(function(ret){
	    				$scope.initMinicart('wishlist',null,null);
	    			})
	    		}
	    	}
	    };
	    
	    $scope.openSavedItemsMobile = function() {
	    	$scope.checkWishlist().then(function(ret){
	    		if($scope.wishlistTotalCount > 0 || ($rootScope.wishlistItems && $rootScope.wishlistItems.length > 0)){
	    			window.location.href = window.location.protocol + '//' + window.location.hostname + '/to-us/saved-items';
	    		}else{
	    			$scope.initMinicart('wishlist',null,null);
	    		}
			});
	    };
	    
	    
		$scope.checkWishlist = function() {
			var _defer = $q.defer();
		
			$http.get(SAVED_ITEMS_URL)
			.then(function (responseWishlist) {	
				if (responseWishlist){
					if(responseWishlist.data.response.totalCount > 0) {
						$scope.wishlist = responseWishlist.data.response;
						$scope.wishlistTotalCount = responseWishlist.data.response.totalCount;
						_defer.resolve(responseWishlist.data.response);
					}else{
						$scope.wishlist = null;
						$scope.wishlistTotalCount = 0;
						_defer.resolve(0);	
					}
					
				}else{
					$scope.wishlist = null;
					$scope.wishlistTotalCount = 0;
					_defer.resolve(0);
				}
			}, function (error) {
				$scope.wishlist = null;
				$scope.wishlistTotalCount = responseWishlist.data.response.totalCount;
				_defer.resolve(0);
			})
		
			return _defer.promise;
		}
		
		$scope.initMinicart = function(mode,cartContent,responseWishlist) {
			window.globalMinicartMethods.initMinicart({ 
				mode: mode,
				cart: cartContent,
				wishlist: responseWishlist
			});
		}
	}    
]);
app.controller('InsuranceStepsCtrl', ['$scope', '$rootScope', '$timeout',
	function ($scope, $rootScope, $timeout) {
		selectize = undefined;
		label = $("select#insurance-provider ~ label");

		function initSelectize() {
			$("select#insurance-provider").selectize({
				options: Object.values(window.insuranceProviders),
				labelField: "text",
				valueField: "text",
				openOnFocus: false,
				maxItems: 1,
				plugins: {
					"no_results" : {},
					"clear_button": {
						className: "clear-input",
						label: "",
					},
				},
				onInitialize: function() {
					selectize = this;
					selectize.$control.on("click", function () {
						this.ignoreFocusOpen = true;
						setTimeout(function () {
							this.ignoreFocusOpen = false;
						}, 50);
					});
				},
				onBlur: function () {
					if (!$rootScope.selectedInsurancesProvider)
						label.removeClass("focus")
				},
				onFocus: function () {
					if (!this.ignoreFocusOpen) {
						this.open();
						label.addClass("focus")
					}
				},
				onChange: function(value) {
					var provider = "";
					if (value) {
						provider = Object.values(window.insuranceProviders).find(function(p) {
							return p.text === value;
						}).key;
					}

					$timeout(function() {
						$rootScope.selectedInsurancesProvider = provider;
					}, 0)
				},
			});
		}

		$scope.setProvider = function(provider) {
			$rootScope.selectedInsurancesProvider = provider;
			selectize.setValue($rootScope.insuranceProviders[provider].text);
			label.addClass("focus");
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

				favoriteProviders = ["Eyemed", "Aetna", "Humana Vision", "United Health Care"]

				$rootScope.favoriteProviders = Object.values($rootScope.insuranceProviders)
					.filter(v => favoriteProviders.indexOf(v.text) != -1)
					.reduce((m, p) => {
						m[p.text] = p.key
						return m
					}, {})
				
				initSelectize();
			}
		});
    }
]);;
app.controller('PLPController', ['$scope', '$rootScope', '$window', '$cookies', '$http', '$compile', '$timeout', '$sce', 'headerModule', 
    function ($scope, $rootScope, $window, $cookies, $http, $compile, $timeout, $sce, headerModule) {
	
		// redesign variables
		$scope.storeId = null;
		$scope.langId = null;
		$scope.catalogId = null;
		$scope.categoryId = null;
	
		$scope.openFilters = null;
		$scope.openPrescriptionFilter = null;
		$scope.currentFilters = {};
		$scope.initialFilters = {};
		$scope.baseFiltersURL = location.pathname;
		$rootScope.brandText = '';
		$scope.contactsPLP = false;
		$scope.suggestedFilters = {};
		$scope.searchTerm = null;
		$scope.inputValue = "";
		$scope.contactSearchEntries = null;
		$scope.hrefURLSearchButton = null;

		$scope.$watch(
			function () {
				try { 
					return discountedPricesManager;
				}catch (err){
					
				}	
			},
			function (newVal, oldVal) {
				$scope.DISCOUNTS = newVal;
			}
		);
		
		// endpoints
		var FILTERS_GENERATE_URL = '/search/resources/store/#storeId#/productview/bySearchTerm/*?storeId=#storeId#&catalogId=#catalogId#&responseFormat=json&langId=#langId#&pageNumber=1&pageSize=1';
		var CL_SEARCH_GENERATE_URL = '/search/resources/store/#storeId#/productview/bySearchTerm/*?categoryId=82862&searchType=1&searchSource=E&catalogId=#catalogId#&pageNumber=1&storeId=#storeId#&profileName=TO_CL_findProductsBySearchTerm&responseFormat=json';
		var CL_SEARCH_ENTRIES_URL = '/to-us/SearchDisplay?storeId=#storeId#&catalogId=#catalogId#&searchSource=Q&sType=SimpleSearch&showResultsPage=true&pageView=image&searchTerm=*';
		
		if (window.location.href.indexOf('-sku') > -1 || window.location.href.indexOf('searchType=101') > -1){
		    FILTERS_GENERATE_URL = '/search/resources/store/#storeId#/productview/bySearchTerm/*?storeId=#storeId#&catalogId=#catalogId#&searchType=101&responseFormat=json&langId=#langId#&pageNumber=1&pageSize=1';
		}

		$scope.filterApplied = window.location.href.includes("facet");
		
		$scope.mobileTwoColumns = !!JSON.parse($window.localStorage.getItem("plpTwoColumns"));
		$scope.setMobileTwoColumns = function(value) {
			$scope.mobileTwoColumns = !!value;
			$window.localStorage.setItem("plpTwoColumns", $scope.mobileTwoColumns);

			// $timeout(function() {
			// 	// might need to show a loader because there are many slick instances on the page
			// 	window.dispatchEvent(new Event('resize'));
			// 	angular.element(document.querySelectorAll('.slick-slider')).slick('refresh');
			// }, 0); // delay refresh until next digest cycle
		};

		$scope.setShowFiltersMob = function (value) {
			$scope.showFilters = value;
			$("html,body").css("overflow", value ? "hidden" : "");
		}
    	
        const errorMessage = 'ERROR while retrieving prescription data';
        
        $rootScope.wrapAngular = function(elementFunc){
  		    $compile(elementFunc)($scope);
  		}
        
        $scope.init = function(params) {
        	
        	$scope.storeId = params.storeId;
        	$scope.langId = params.langId;
    		$scope.catalogId = params.catalogId;
        	$scope.categoryId = params.categoryId;
        	$scope.lifecycleFacet = params.lifecycleFacet;
			$scope.inStoreOnlyFacet = params.inStoreOnlyFacet;
        	$scope.openFilters = false;
        	$scope.openPrescriptionFilter = false;
        	$scope.contactsPLP = params.contactsPLP ? params.contactsPLP : false;
        	$scope.brandPLP = params.isBrandPLP ? params.isBrandPLP : false;
        	$scope.genderPLP = (window.location.href.indexOf("glasses/kids") > -1 || window.location.href.indexOf("glasses/mens") > -1 || window.location.href.indexOf("glasses/womens") > -1);
        	$scope.genderFacet="";
        	$scope.searchTerm = params.searchTerm;
        	$scope.paramValuesFacet = params.paramValuesFacet ? params.paramValuesFacet : '';
        	
        	$scope.currentAppliedFacets = $scope.getUrlFacets($scope.getInternalFacets()) || [];
        	$scope.initialAppliedFacets = $scope.getUrlFacets($scope.getInternalFacets()) || [];
        	$scope.getFilters(true);
        	$scope.getFavouriteItems();
         

			// Hovering slick-arrows, make the color always visible
			/*
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
				}
			});
			*/
			/*
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
			*/
			/*
			if(window.localAppliedFilters && window.localAppliedFilters['ELECTRONICS'] && window.localAppliedFilters['ELECTRONICS'].length > 0 && window.localAppliedFilters['Glasses']){
				var electronicsFacetEntry = window.localAppliedFilters['ELECTRONICS'][0];
				window.localAppliedFilters['Glasses'].push(electronicsFacetEntry);
				window.localAppliedFilters['ELECTRONICS'].splice(0,1);
			}
			*/
        };
        
        
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
        
        $scope.getDynamicSearchResultsCL = function(event){
    		var url = CL_SEARCH_GENERATE_URL.replaceAll('#storeId#', $scope.storeId).replace('#catalogId#', $scope.catalogId);
    		var contactSearchEntries = [];
    		var hrefURLSearchButton;
    		$scope.inputValue = event.target.value;
    		
    		if ($scope.inputValue && $scope.inputValue != '' && $scope.inputValue.length > 2) {
        		url = url.replaceAll('bySearchTerm/*','bySearchTerm/'+ $scope.inputValue.replaceAll(' ', '_')) + '&searchTerm=' + $scope.inputValue.replaceAll(' ', '_');
        		hrefURLSearchButton = CL_SEARCH_ENTRIES_URL.replaceAll('#storeId#', $scope.storeId).replace('#catalogId#', $scope.catalogId);
        		hrefURLSearchButton = hrefURLSearchButton.replaceAll('searchTerm=*','searchTerm='+ $scope.inputValue.replaceAll(' ', '_'));
        		
	    		$http.get(url)
				.then(function (response) {
					if (response && response.data.recordSetTotal > 0) {
						
						$scope.currentContacts = response.data;
						
						$scope.currentContacts.catalogEntryView.forEach(function(catEntry, catalogEntryView) {
							hrefUrl = CL_SEARCH_ENTRIES_URL.replaceAll('#storeId#', $scope.storeId).replace('#catalogId#', $scope.catalogId);
							hrefUrl = hrefUrl.replaceAll('searchTerm=*','searchTerm='+ (catEntry.name).replaceAll(' ', '_'));
							hrefUrl = hrefUrl.replaceAll('®', '');
							hrefUrl = $scope.removeLastPartFromStr(hrefUrl);
							catEntry.name = (catEntry.name).charAt(0).toUpperCase() + (catEntry.name).substr(1).toLowerCase();
							if(contactSearchEntries.length < 6){
								contactSearchEntries.push({name: catEntry.name, url: hrefUrl});
							}
						});
						
						//Define scope variables
						$scope.contactSearchEntries = contactSearchEntries;
						$scope.hrefURLSearchButton = hrefURLSearchButton;
						
					}
				}, function (error) {
					$scope.currentContacts = {};
				})
    		}
    		
    		if ($scope.inputValue.length <= 2) {
    			$scope.contactSearchEntries = [];
    		}
    	}
        
        $scope.removeLastPartFromStr = function(str) {
		  const lastIndexOfFor = str.toLowerCase().lastIndexOf('_for_');
		  const lastIndexOfWith = str.toLowerCase().lastIndexOf('_with_');
		  const lastIndexOfDash = str.toLowerCase().lastIndexOf('_-_');
		  
		  if (lastIndexOfFor === -1 && lastIndexOfWith === -1 && lastIndexOfDash === -1) {
			  return str;
		  }else if(lastIndexOfFor != -1 && lastIndexOfWith === -1 && lastIndexOfDash === -1){
			  return str.substr(0, lastIndexOfFor);
		  }else if(lastIndexOfFor === -1 && lastIndexOfWith != -1 && lastIndexOfDash === -1){
			  return str.substr(0, lastIndexOfWith);
		  }else if(lastIndexOfFor === -1 && lastIndexOfWith === -1 && lastIndexOfDash != -1){
			  return str.substr(0, lastIndexOfDash);
		  }
		}
        
        $scope.highlightSearchResults = function(text, search) {
            if (!search) {
                return $sce.trustAsHtml(text);
            }
            return $sce.trustAsHtml(text.replace(new RegExp(search, 'gi'), '<span class="highlightedText">$&</span>'));
        };
        
        $scope.clearSearchResultsCL = function(){
        	$scope.inputLargeWidth = true;
        	$scope.contactSearchEntries = null;
        	$scope.inputValue = "";
        	$("#ID5_InPageSearch").focus();
        }
        
        $scope.blurSearchResultsCL = function(){
        	$scope.inputLargeWidth = false;
        	$scope.contactSearchEntries = null;
        	$scope.inputValue = "";
        	$("#ID5_InPageSearch").focusout();
        }
        
        $scope.mobileClearSearchResultsCL = function(){
        	$scope.contactSearchEntries = null;
        	$scope.inputValue = "";
        	$scope.searchMobileOpened = false;
        	$('html, body').css({ overflow: 'auto',height: 'auto'});
        	$('.promo-stripe').css({display: 'block'});
        }
        
        $scope.mobileOpenSearchCL = function(){
        	$scope.searchMobileOpened = true;
        	$('html, body').css({ overflow: 'hidden',height: '100%'});
        	setTimeout(function() { $('input[name="ID5_InPageSearch_mob"]').focus() }, 500);
        	$('.promo-stripe').css({display: 'none'});
        }
        
        
        $scope.getFavouriteItems = function(){
        	
        	$rootScope.favouriteItems = {};
        	
        	headerModule.getWishListItems().then(function(response) {
        		if (response && response.catentries.length>0) {
        			$rootScope.favouriteItems = response.catentries;
        			$rootScope.favouriteItems.forEach(function(itemUpc, index) {
        				var elem = document.getElementById("favoriteItem_"+itemUpc);
						if(elem){
							elem.classList.add("favorited");	
						}
        			});	
        		}	
        	}, function (error) {
        		$rootScope.favouriteItems = {};
        	});
		}
        
        
        $scope.getFilters = function(firstGetFiltersCall){
        	var url = FILTERS_GENERATE_URL.replaceAll('#storeId#', $scope.storeId).replace('#langId#', $scope.langId).replace('#catalogId#', $scope.catalogId);
        	
        	if ($scope.searchTerm && $scope.searchTerm!= '') {
        		url = url.replaceAll('bySearchTerm/*','bySearchTerm/'+$scope.searchTerm)
        			+ '&searchTerm=' + $scope.searchTerm;
        	}
        	
			if($scope.categoryId != null && $scope.categoryId != ''){
        		url = url + '&categoryId=' + $scope.categoryId;
        	}
			
			var profileNameVal = $scope.contactsPLP ? 'TO_CL_findProductsBySearchTerm' : 'TO_findProductsBySearchTerm';
        	url = url + '&profileName=' + profileNameVal;
			
			var searchType = $scope.contactsPLP ? 1 : 100;
			url = url + '&searchType=' + searchType;
        	
        	if ($scope.lifecycleFacet && !$scope.contactsPLP) {
        		url = url + '&facet=' + $scope.lifecycleFacet + '%3A1';
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
						'TYPE': 'Product Type',
						'BRAND': 'Brand', 
						'FRAME_SHAPE_FACET': 'Shape', 
						'FRAME_MATERIAL_FACET': 'Frame material',
						'COLOR': 'Frame color',
						'OfferPrice_USD': 'Price',
						'OfferPrice_CAD': 'Price',
						'FIT': 'Size',
						'CONTACT_BRAND': 'Brand',
						'CONTACT_MANUFACTURER': 'Manufacturer', 
						'CONTACT_CATEGORY': 'Category',
						'CONTACT_LENS_TYPE': 'Lens Type',
						'VM_ENABLED': 'Virtual Mirror',
						'HIGH_PRESCRIPTION': 'High prescription',
						'POLARIZED': 'Polarized',
						'FRAME_LENS_TREATMENT_FACET': 'Lens treatment',
						'Percentage_USD' : '% Promo',
						'LENS_COLOR_FACET': 'Lens color',
						'FRAME_TYPE' : 'Frame Type',
						'GEOFIT' : 'Fit & nosepads'
					}

					var filtersDescriptions = {
						'FIT': 'Find a frame that fits you right, depending on your face type and size.',
						'FRAME_TYPE' : 'Choose between various types of frame structures, depending on your needs and style preferences.',
						'GEOFIT' : '“Universal fit” offers secure and comfortable fit for most face shapes. “Adjustable nosepads” can be widened or narrowed to fit your unique nose shape.'
					}
					
					var binaryFilters = ['VM_ENABLED','HIGH_PRESCRIPTION','EXCLUSIVE','IS_NEW','POLARIZED'];
					
					
					//sort by attrsequence
					$scope.currentFilters.facetView.sort(function(facet1, facet2) {
						// OfferPrice_USD facet doesn't have an associated attribute
						if (facet1.name == 'OfferPrice_USD' || facet1.name == 'OfferPrice_CAD') facet1.extendedData.attrsequence = '4.0';
						else if (facet2.name == 'OfferPrice_USD' || facet2.name == 'OfferPrice_CAD') facet2.extendedData.attrsequence = '4.0';

						if (facet1.name == 'Percentage_USD') facet1.extendedData.attrsequence = '99.0';
						else if (facet2.name == 'Percentage_USD') facet2.extendedData.attrsequence = '99.0';

						
						
						if(facet1.extendedData.attrsequence == null)
							facet1.extendedData.attrsequence = '99.0';
						if(facet2.extendedData.attrsequence == null)
							facet2.extendedData.attrsequence = '99.0';
				        return parseFloat(facet1.extendedData.attrsequence) - parseFloat(facet2.extendedData.attrsequence);
				    });
					
					var productTypeFilterOn = false;
					var genderFilterOn = true;
					var brandFilterOn = true;
					var glassesIndex = -1;
					var genderIndex = -1;
					var electronicsEntry = null;
					var polarizedFilterOn = true;
					var highPrescriptionFilterOn = true;
					var kidsEntry = null;
					var vmFilterOn = true;
					
					if ($scope.genderPLP){
						genderFilterOn = false;
					}
					
					if(window.location.href.indexOf('/brands/') > -1 || ($scope.brandPLP == 'true' || $scope.brandPLP == true)  || window.location.href.indexOf('/eyewear-all') > -1 || window.location.href.indexOf('/SearchDisplay') > -1){
						productTypeFilterOn = true;
					}
					
					$scope.currentFilters.facetView.forEach(function(facetView, indexFacetView) {
						if(filtersLabels[facetView.extendedData.attridentifier] != undefined){
							$scope.currentFilters.facetView[indexFacetView].label = filtersLabels[facetView.extendedData.attridentifier];
							$scope.currentFilters.facetView[indexFacetView].description = filtersDescriptions[facetView.extendedData.attridentifier];
							if(facetView.name.toUpperCase() == 'BRAND'){
								if(window.location.href.indexOf('/brands/') > -1 || $scope.brandPLP == 'true'){
									brandFilterOn = false;
								}else{
									facetView.entry.sort(function(a, b){
										if(a.label < b.label) { return -1; }
										if(a.label > b.label) { return 1; }
										return 0;
									})
								}
							}
							
							if(facetView.name.toUpperCase() == 'MANUFACTURER'){
								facetView.entry.sort(function(a, b){
									if(a.label < b.label) { return -1; }
									if(a.label > b.label) { return 1; }
									return 0;
								})	
							}
							
							if(facetView.name.toUpperCase() == 'GENDER' ){
								$scope.genderFacet=facetView.value;
							}
							
							if(facetView.name.toUpperCase() == 'TYPE'){
								if(facetView.entry.length < 2){
									productTypeFilterOn = false;
								}
								
								facetView.entry.forEach(function(facetViewEntry, indexFacetViewEntry) {
									$scope.currentFilters.facetView[indexFacetView].entry[indexFacetViewEntry].label = facetViewEntry.label.charAt(0).toUpperCase() + facetViewEntry.label.substr(1).toLowerCase();
								})
							}
							
							if(facetView.name.toUpperCase() == 'POLARIZED' ){
								if((facetView.entry.length == 1 && (facetView.entry[0].label.toLowerCase() == 'false' || facetView.entry[0].label.toLowerCase() == 'no')) &&  
								$scope.currentAppliedFacets != undefined && 
								($scope.currentAppliedFacets[facetView.value] == undefined || 
									($scope.currentAppliedFacets[facetView.value] != undefined && $scope.currentAppliedFacets[facetView.value].length < 0))
								){
									polarizedFilterOn = false;
								}
								facetView.entry = facetView.entry.filter(function(facetViewEntry, index){
									if(facetViewEntry.label.toLowerCase() == 'yes' ){ 
										return true;
									}
									return false;
								});
							}
							if(facetView.name.toUpperCase() == 'HIGH_PRESCRIPTION'){
								if((facetView.entry.length == 1 && (facetView.entry[0].label.toLowerCase() == 'false' || facetView.entry[0].label.toLowerCase() == 'no')) &&  
								$scope.currentAppliedFacets != undefined && 
								($scope.currentAppliedFacets[facetView.value] == undefined || 
									($scope.currentAppliedFacets[facetView.value] != undefined && $scope.currentAppliedFacets[facetView.value].length < 0))
								){
									highPrescriptionFilterOn = false;
								}
								facetView.entry = facetView.entry.filter(function(facetViewEntry, index){
									if(facetViewEntry.label.toLowerCase() == 'yes' || facetViewEntry.label.toLowerCase() == 'true'){ 
										return true;
									}
									return false;
								});
							}
							if(facetView.name.toUpperCase() == 'VM_ENABLED'){
								if((facetView.entry.length == 1 && (facetView.entry[0].label.toLowerCase() == 'false' || facetView.entry[0].label.toLowerCase() == 'no')) &&  
								$scope.currentAppliedFacets != undefined && 
								($scope.currentAppliedFacets[facetView.value] == undefined || 
									($scope.currentAppliedFacets[facetView.value] != undefined && $scope.currentAppliedFacets[facetView.value].length < 0))
								){
									vmFilterOn = false;
								}
								facetView.entry = facetView.entry.filter(function(facetViewEntry, index){
									if(facetViewEntry.label.toLowerCase() == 'yes' || facetViewEntry.label.toLowerCase() == 'true'){ 
										return true;
									}
									return false;
								});
							}
							
							if(facetView.name.toUpperCase() == 'FIT'){
								
								facetView.entry.sort(function(a, b){
									if (a.label === 'Kids' || b.label === 'Extra Large' || (a.label === 'Extra Small' && b.label === 'Small') || (a.label === 'Extra Small' && b.label === 'Standard') || (a.label === 'Extra Small' && b.label === 'Large') || (a.label === 'Small' && b.label === 'Standard') || (a.label === 'Small' && b.label === 'Large') || (a.label === 'Standard' && b.label === 'Large')){
										return -1;
									}
									else if(a.label === 'Extra Large' || b.label === 'Kids' || (b.label === 'Large' && a.label === 'Extra Small') || (b.label === 'Small' && a.label === 'Extra Small') || (b.label === 'Standard' && a.label === 'Extra Small')  || (b.label === 'Large' && a.label === 'Small') || (b.label === 'Extra Small' && a.label === 'Small') || (b.label === 'Standard' && a.label === 'Small') || (b.label === 'Large' && a.label === 'Standard') || (b.label === 'Extra Small' && a.label === 'Standard') || (b.label === 'Small' && a.label === 'Standard') || (b.label === 'Extra Small' && a.label === 'Large') || (b.label === 'Small' && a.label === 'Large') || (b.label === 'Standard' && a.label === 'Large') ){
										return 1;
									}
									return 0;
								})
							}
							
							
							
							
						}else{
							$scope.currentFilters.facetView[indexFacetView].label = filtersLabels[facetView.name];
							if(facetView.name == 'OfferPrice_USD' || facetView.name == 'OfferPrice_CAD'){
								facetView.entry.forEach(function(facetViewEntry, indexFacetViewEntry) {
									if(facetViewEntry.label == '({* 99} 100)'){
										$scope.currentFilters.facetView[indexFacetView].entry[indexFacetViewEntry].label = 'Under $99.99';
									}else if(facetViewEntry.label == '({100 149} 150)'){
										$scope.currentFilters.facetView[indexFacetView].entry[indexFacetViewEntry].label = '$100 - $149.99';
									}else if(facetViewEntry.label == '({150 *})'){
										$scope.currentFilters.facetView[indexFacetView].entry[indexFacetViewEntry].label = '$150 and up';
									}
								});
							}

							if(facetView.name == 'Percentage_USD'){	
								facetView.entry = facetView.entry.filter(function(facetView, index){
									if(facetView.label != '0'){ 
										return true;
									}
									return false;
								});
								facetView.entry.forEach(function(facetViewEntry, indexFacetViewEntry) {
										$scope.currentFilters.facetView[indexFacetView].entry[indexFacetViewEntry].label = facetViewEntry.label + "%";
								});
								
							}
							
							
						}

						if ((facetView.extendedData.attridentifier == "HIGH_PRESCRIPTION" || 
								facetView.extendedData.attridentifier == "VM_ENABLED" ||
								facetView.extendedData.attridentifier == "POLARIZED") && facetView.entry.length == 1) {
							facetView.isToggle = true;
						}
					});
					
					if(firstGetFiltersCall){
						$scope.initialFilters = $scope.currentFilters;
						if(Object.keys($scope.currentAppliedFacets).length > 0){
							$scope.sendAnalytics();
						}
					}
					
					$scope.initialFilters.facetView.forEach(function(facetViewInitial, indexFacetViewInitial) {
						$scope.currentFilters.facetView.forEach(function(facetViewCurrent, indexFacetViewCurrent) {
							if(facetViewInitial.name == facetViewCurrent.name){
								facetViewInitial.entry.forEach(function(entryInitial, indexEntryInitial) {
									var facetViewValueFound = false;
									for(var facetViewIndexCurrent in facetViewCurrent.entry){
						        			if(facetViewCurrent.entry[facetViewIndexCurrent].value === entryInitial.value && facetViewCurrent.entry[facetViewIndexCurrent].count != 0){
						        				facetViewValueFound = true;
						        				break;
						        			}
					        		}
									if(!facetViewValueFound){
										$scope.initialFilters.facetView[indexFacetViewInitial].entry[indexEntryInitial].disabled = true;
									}else{
										$scope.initialFilters.facetView[indexFacetViewInitial].entry[indexEntryInitial].disabled = false;
									}
								});
							}
						});
					});
					
					var enabledFilters = [];
					if($scope.contactsPLP){
						enabledFilters = ['CONTACT_BRAND','CONTACT_CATEGORY','CONTACT_LENS_TYPE','CONTACT_MANUFACTURER'];
					}else{
						enabledFilters = [
							'FIT',
							'OfferPrice_USD',
							'OfferPrice_CAD',
							'FRAME_SHAPE_FACET',
							'FRAME_MATERIAL_FACET',
							'Percetage_USD',
							'COLOR',
							'FRAME_LENS_TREATMENT_FACET',
							'GEOFIT',
							'LENS_COLOR_FACET',
							'FRAME_TYPE'
						];
						if(genderFilterOn) enabledFilters.push('GENDER');
						if(productTypeFilterOn) enabledFilters.push('TYPE');
						if(polarizedFilterOn) enabledFilters.push('POLARIZED');
						if(brandFilterOn) enabledFilters.push('BRAND');
						if(vmFilterOn) enabledFilters.push('VM_ENABLED');
						if(highPrescriptionFilterOn) enabledFilters.push('HIGH_PRESCRIPTION');
						
					}
					
					$scope.currentFilters.facetView = response.data.facetView.filter(function(facetView, index){
						if (enabledFilters.indexOf(facetView.extendedData.attridentifier) >= 0 &&
								(binaryFilters.indexOf(facetView.extendedData.attridentifier) >= 0 || facetView.entry.length > 0)){
							return true;
						}
						if(facetView.name == 'OfferPrice_USD' && !$scope.contactsPLP){ // to include prices
							return true;
						}
						if((facetView.name == 'Percentage_USD' && facetView.entry.length > 0 && !$scope.contactsPLP)){ // to include percentage discount
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
								if(facetView.name == "Percentage_USD"){
									facetName = 'percentage_USD';
								}
								if(facetView.label == "Gender"){
                                    facetName = appFilterName;
								}
								if(facetName == appFilterNameMapped){
									facetView.entry.forEach(function(entry, indexEntry) {
										$scope.currentAppliedFacets[appFilterName].forEach(function(appFilterValue, appFilterIndex) {
											var facetValue = entry.value.split('%3A')[1].replaceAll("%22", "").replaceAll("\"", "");
											appFilterValue = appFilterValue.replaceAll("%22", "").replaceAll("\"", "");
											if(facetValue == appFilterValue){
												$scope.currentFilters.facetView[indexFacetView].entry[indexEntry].selected = true;
												if(firstGetFiltersCall){
													$scope.initialFilters.facetView[indexFacetView].entry[indexEntry].applied = true;
												}
												$scope.currentFilters.appliedCount++;
											}
										});
									});
								}
							});
						}
					});
					
				} 
			}, function (error) {
				$scope.currentFilter = {};
			})
		}
		
		$scope.updateFilter = function(facet, entry){
			var filter = entry.value.split('%3A');
			entry.selected = !entry.selected;
			
			if(entry.value.indexOf('price') != -1){
				filter = entry.value.split('%3A');
			}
			
			var filterName = filter[0];
			var filterValue = filter[1];
			
			if($scope.currentAppliedFacets[filterName] == undefined){
				$scope.currentAppliedFacets[filterName] = [];
			}

			var found = false;
			var countDeletedFacets = 0;
			var originalArray = JSON.parse(JSON.stringify($scope.currentAppliedFacets));
			
			var facetName = facet.name;
			if(facet.name == "OfferPrice_USD" || facet.name == "OfferPrice_CAD"){
				facetName = 'Price';
			}
			if($scope.currentAppliedFacets[filterName] != undefined){
				$scope.currentAppliedFacets[filterName].forEach(function (appFilter, i) {
					var facetValue = entry.value.split('%3A')[1].replaceAll("%22", "").replaceAll("\"", "");
					var appFilterCleaned= appFilter.replaceAll("%22", "").replaceAll("\"", "");
					if(appFilterCleaned == facetValue){
						found = true;
						originalArray[filterName].splice(i - countDeletedFacets,1);
						countDeletedFacets = countDeletedFacets + 1;
					}
				});
			}
			
			if(!found){
				originalArray[filterName].push(filterValue);
			}
			
			$scope.currentAppliedFacets = originalArray;
			
			$scope.getFilters(false);
		}
        
        $scope.seeResults = function(){
			$scope.applyingFilter = true;

        	var urlElements = window.location.href.split('?')
            var baseURL = urlElements[0];
            var params = [];
            if(urlElements.length > 1){
				var params = urlElements[1].split('&');
            }
            
            $scope.alreadyAppliedFilters = [];
			var parameters = 'page=1&'; // applying a filter resets navigation to page 1
            angular.forEach(params, function (param, i) {
            	if (!param.startsWith('facet') && !param.startsWith('page')) {
					parameters = parameters + param + '&';
            	}
            });

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
        	
        	utag_data.Events_SearchFiltering = "1";
        	utag_data.Search_ResultItemsQnt = $scope.currentFilters.recordSetTotal;
        	sessionStorage.setItem("resultItemsQntUtag", utag_data.Search_ResultItemsQnt);
        		
        	angular.forEach($scope.currentAppliedFacets, function (facetValue, facetName) {
        		var facetDisplayName ="";
        		for(var facetViewIndex in $scope.currentFilters.facetView){
        			if($scope.currentFilters.facetView[facetViewIndex].value === facetName){
        				facetDisplayName = $scope.currentFilters.facetView[facetViewIndex].label;
        				break;
        			}
        		}
        		angular.forEach(facetValue, function (singleFacetValue, i) {
        			if(singleFacetValue.includes("%22") || singleFacetValue.includes("%29")){
	        			if(!$scope.alreadyAppliedFilters.includes(singleFacetValue.replaceAll("%22", "").replaceAll("\"", "").replaceAll("%20", " "))) {
	        				$scope.alreadyAppliedFilters.push(singleFacetValue.replaceAll("%22", "").replaceAll("\"", "").replaceAll("%20", " "));
	        				newUrl = newUrl + 'facet=' + facetName + '%3A' + singleFacetValue + '&';
						}
        			}
        		});
        		
    			if(utag_data.Search_FacetValues_String==""){
    				sessionStorage.setItem("filtersUtag", facetDisplayName + '=' + facetValue);
    				utag_data.Search_FacetValues_String = sessionStorage.getItem('filtersUtag');
    			} else{
    				sessionStorage.setItem("filtersUtag", utag_data.Search_FacetValues_String + '|' + facetDisplayName + '=' + facetValue);
    				utag_data.Search_FacetValues_String = sessionStorage.getItem('filtersUtag');
    			}
        	});
        	
        	$window.location = newUrl.slice(0, -1); // remove the "&"" at the end of the url
        }
        
        $scope.refreshAppliedResults = function(isApplied){
        	if(isApplied == true){
        		$scope.applyingFilter = true;

            	var urlElements = window.location.href.split('?')
                var baseURL = urlElements[0];
                var params = [];
                if(urlElements.length > 1){
    				var params = urlElements[1].split('&');
                }
                
                $scope.alreadyAppliedFilters = [];
    			var parameters = 'page=1&'; // applying a filter resets navigation to page 1
                angular.forEach(params, function (param, i) {
                	if (!param.startsWith('facet') && !param.startsWith('page')) {
    					parameters = parameters + param + '&';
                	}
                });

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
            	
            	utag_data.Events_SearchFiltering = "1";
            	utag_data.Search_ResultItemsQnt = $scope.currentFilters.recordSetTotal;
            	sessionStorage.setItem("resultItemsQntUtag", utag_data.Search_ResultItemsQnt);
            		
            	angular.forEach($scope.currentAppliedFacets, function (facetValue, facetName) {
            		var facetDisplayName ="";
            		for(var facetViewIndex in $scope.currentFilters.facetView){
            			if($scope.currentFilters.facetView[facetViewIndex].value === facetName){
            				facetDisplayName = $scope.currentFilters.facetView[facetViewIndex].label;
            				break;
            			}
            		}
            		angular.forEach(facetValue, function (singleFacetValue, i) {
            			if(singleFacetValue.includes("%22") || singleFacetValue.includes("%29")){
    	        			if(!$scope.alreadyAppliedFilters.includes(singleFacetValue.replaceAll("%22", "").replaceAll("\"", "").replaceAll("%20", " ")) && $scope.initialAppliedFacets[facetName].includes(singleFacetValue)) {
    	        				$scope.alreadyAppliedFilters.push(singleFacetValue.replaceAll("%22", "").replaceAll("\"", "").replaceAll("%20", " "));
    	        				newUrl = newUrl + 'facet=' + facetName + '%3A' + singleFacetValue + '&';
    						}
            			}
            		});
            		
        			
        			if(utag_data.Search_FacetValues_String==""){
        				sessionStorage.setItem("filtersUtag", facetName + '=' + facetDisplayName);
        				utag_data.Search_FacetValues_String = sessionStorage.getItem('filtersUtag');
        			} else{
        				sessionStorage.setItem("filtersUtag", utag_data.Search_FacetValues_String + '|' + facetName + '=' + facetDisplayName);
        				utag_data.Search_FacetValues_String = sessionStorage.getItem('filtersUtag');
        			}
            	});
            	
            	$window.location = newUrl.slice(0, -1); // remove the "&"" at the end of the url
        	}
			
        }

		$scope.clearFilter = function(facet) {
			delete $scope.currentAppliedFacets[facet.value]
			
			$scope.initialFilters.facetView.forEach(function(facetViewInitial, indexFacetViewInitial) {
				if(facetViewInitial.name == facet.name){
					facetViewInitial.entry.forEach(function(entryInitial, indexEntryInitial) {
						if(entryInitial.selected == true){
							entryInitial.selected = false;
						}
					});
				}
			});
			
			$scope.getFilters(false)

			if ($window.location.href.includes(facet.value)) $scope.seeResults()
		}
        
        $scope.clearFilters = function() {
			$scope.currentAppliedFacets = {};
        	$scope.seeResults();
        }
        
        $scope.clearUnappliedFilter = function(facet, openedFilter) {
			
			if(openedFilter != facet.label && openedFilter != facet.name){
				//click on the opened filter button
				
				//clean currentapplied facets and reset them just with the initial applied
				for(var appliedFacet in $scope.currentAppliedFacets){
					if(appliedFacet == facet.value){
						delete $scope.currentAppliedFacets[appliedFacet]
						if($scope.initialAppliedFacets[appliedFacet]){
							$scope.currentAppliedFacets[appliedFacet] = $scope.initialAppliedFacets[appliedFacet];
						}
					}
				}
				
				//reset selected and disabled frontend filter options
				$scope.currentFilters.facetView.forEach(function(facetView, index) {
					if(facetView.name == facet.name){
						facetView.entry.forEach(function(entryView, indexEntryView) {
							if(entryView.selected == true){
								entryView.selected = false;
								entryView.disabled = false;
							}
						});
					}
				});
				
				//reset selected and disabled frontend filter options
				$scope.initialFilters.facetView.forEach(function(facetViewInitial, indexFacetViewInitial) {
					if(facetViewInitial.name == facet.name){
						facetViewInitial.entry.forEach(function(entryInitial, indexEntryInitial) {
							if(entryInitial.selected == true && (!entryInitial.applied || entryInitial.applied == false)){
								entryInitial.selected = false;
								entryInitial.disabled = false;
							}else if(entryInitial.selected == false && entryInitial.applied == true){
								entryInitial.selected = true;
							}
							if(entryInitial.count > 0 && entryInitial.disabled == true){
								entryInitial.disabled = false;
							}
						});
					}
				});
				
				$scope.getFilters(false)

			}else{
				
				//click out of the filter box or on a different filter button
				
				//clean currentapplied facets and reset them just with the initial applied
				for(var appliedFacet in $scope.currentAppliedFacets){
					if(appliedFacet != facet.value){
						delete $scope.currentAppliedFacets[appliedFacet]
						if($scope.initialAppliedFacets[appliedFacet]){
							$scope.currentAppliedFacets[appliedFacet] = $scope.initialAppliedFacets[appliedFacet];
						}
					}
				}
				
				//reset selected and disabled frontend filter options different from the one opened
				$scope.currentFilters.facetView.forEach(function(facetView, index) {
					if(facetView.name != facet.name){
						facetView.entry.forEach(function(entryView, indexEntryView) {
							if(entryView.selected == true){
								entryView.selected = false;
								entryView.disabled = false;
							}
						});
					}
				});
				
				//reset selected and disabled frontend filter options different from the one opened
				$scope.initialFilters.facetView.forEach(function(facetViewInitial, indexFacetViewInitial) {
					if(facetViewInitial.name != facet.name){
						facetViewInitial.entry.forEach(function(entryInitial, indexEntryInitial) {
							if(entryInitial.selected == true && (!entryInitial.applied || entryInitial.applied == false)){
								entryInitial.selected = false;
								entryInitial.disabled = false;
							}else if(entryInitial.selected == false && entryInitial.applied == true){
								entryInitial.selected = true;
							}
							if(entryInitial.count > 0 && entryInitial.disabled == true){
								entryInitial.disabled = false;
							}
						});
					}
				});
				
				$scope.getFilters(false)
			}
			
		}

		$scope.countAppliedFilters = function() {
			var facetValuesArray = [];
			var priceInserted = false;
			
			angular.forEach($scope.currentAppliedFacets, function (facet, facetName) {
        		angular.forEach(facet, function (facetValue, i) {
        			if(facetName != 'price_USD'){
        				if(facetName != $scope.genderFacet || !$scope.genderPLP){
        					var facetValue = facetValue.replaceAll("%22", "").replaceAll("\"", "");
    	        			facetValuesArray.push(facetValue);
    	        			facetValuesArray = facetValuesArray.filter((el, i, a) => i === a.indexOf(el))
        				}	
        			}else if(facetName == 'price_USD' && priceInserted == false){
        				facetValuesArray.push(facetValue);
        				priceInserted = true;
        			}
	        	});  
        	});
			
			return facetValuesArray.length;
			
			
		}
        
		$scope.getInternalFacets = function() {
            var params = {};
            var paramFacets = $scope.paramValuesFacet.replaceAll(" ","+").replaceAll("\"","%22").replaceAll("&", "%26").split(";");
            angular.forEach(paramFacets, function (paramFacet) {
            	if (paramFacet != "" && paramFacet.indexOf("%3A") > -1){
            		var facet = paramFacet.split("%3A");
                    if(params[facet[0]] == undefined){
                    	params[facet[0]] = [];
                    }
                    params[facet[0]].push(facet[1]);	
            	}
            		
            });
            return params;
        }
		
		
        $scope.getUrlFacets = function(params) {
            var i = 1;
            var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
                if (key.includes('facet')) {
                	var facet = value.split("%3A");
                    if(params[facet[0]] == undefined){
                    	params[facet[0]] = [];
                    }
                    if(params[facet[0]].indexOf(facet[1]) <0 && facet[1] != undefined){
                    	params[facet[0]].push(facet[1]);	
                    }
                    
                }
                i++;
            });
            return params;
        }
        
        $scope.refreshResultsFilters = function(isContactLenses){
        	$scope.contactsPLP = isContactLenses;
        	$scope.currentAppliedFacets = {};
        	$scope.getFilters(false);
        }
       
        $scope.sendAnalytics = function(){
        	var windowUrl = $window.location.href;
        	var orderByPart = '';
        	var searchFiltering = "0";
        	utag_data.Search_ResultItemsQnt = sessionStorage.getItem('resultItemsQntUtag');
        	
        	if(utag_data.Search_FacetValues_String == undefined){
        		utag_data.Search_FacetValues_String = "";
        	}
        	
        	if(utag_data.Search_ResultItemsQnt == null || utag_data.Search_ResultItemsQnt == undefined){
        		utag_data.Search_ResultItemsQnt = ($scope.currentFilters.recordSetTotal).toString();
        	}
        	
        	angular.forEach($scope.currentAppliedFacets, function (facetValue, facetName) {
        		var facetDisplayName = "";
        		for(var facetViewIndex in facetValue){
        			facetDisplayName = facetValue[facetViewIndex].replaceAll("%22", "").replaceAll("\"", "");
        		}

        		angular.forEach($scope.initialFilters.facetView, function (facetViewInitial, indexFacetViewInitial) {
        			angular.forEach(facetViewInitial.entry, function (entryInitial, indexEntryInitial) {
        				if(entryInitial.label ==  facetDisplayName.replace(/[+]/g, ' ')){
        					facetName = facetViewInitial.name;
        				}
    				});
    			});
        		// Replace '+' with spaces
				facetDisplayName = facetDisplayName.replace(/[+]/g, '');

    			
    			if(utag_data.Search_FacetValues_String==""){
    				sessionStorage.setItem("filtersUtag", facetName + '=' + facetDisplayName);
    				utag_data.Search_FacetValues_String = sessionStorage.getItem('filtersUtag');
    			} else{
    				sessionStorage.setItem("filtersUtag", utag_data.Search_FacetValues_String + '|' + facetName + '=' + facetDisplayName);
    				utag_data.Search_FacetValues_String = sessionStorage.getItem('filtersUtag');
    			}
        	});
        	
        	if(windowUrl.includes('orderBy')){
        		var orderByNumber = windowUrl.split('orderBy')[1].slice(1,2);
        		if(utag_data.Search_FacetValues_String != undefined && utag_data.Search_FacetValues_String != null && utag_data.Search_FacetValues_String != ""){
        			orderByPart = '|orderBy=' + orderByNumber;
        		}else{
        			orderByPart = 'orderBy=' + orderByNumber;
        		}
        	}else{
        		if(utag_data.Search_FacetValues_String != undefined && utag_data.Search_FacetValues_String != null && utag_data.Search_FacetValues_String != ""){
        			orderByPart = '|orderBy=1';
        		}else{
        			orderByPart = 'orderBy=1';
        		}
        	}
        	
        	if(utag_data.Search_FacetValues_String=="" && !windowUrl.includes('orderBy')){
        		searchFiltering = "0";
			} else{
				searchFiltering = "1";
			}
            	
    		//START Analytics Framework
        	try{
        	   var obj = {
        	      //id : "OrderBy=" + sortName
        		  id: 'SearchFilterUpdated',
        		  Search_FacetValues_String : utag_data.Search_FacetValues_String + orderByPart,
            	  Search_ResultItemsQnt : utag_data.Search_ResultItemsQnt,
            	  Events_SearchFiltering : searchFiltering
        	   };
        	}catch(err){
        	    var obj = {
        	        id: 'SearchFilterUpdated',
        	        Error_Source: 'Search',
        	        Error_Code: 'sortBy - '+err.message
        	    };
        	    tealium_data2track.push(obj);
        	}
        	finally{
        	    //obj.id = "OrderBy=" + sortName;
        		obj.id = 'SearchFilterUpdated';
        	    tealium_data2track.push(obj);
        	}
        	//END Analytics Framework
        	
        	sessionStorage.setItem("filtersUtag", '');
        	utag_data.Search_FacetValues_String = '';
        }
        
      //FAQ
        $scope.$timeout = $timeout;

		$scope.qnaInitializer = function () {
			jsonElements = document.querySelectorAll('[type="application/ld+json"]');
			for (var i = 0; i < jsonElements.length; i++) {
				try {
					if(jsonElements[i].innerHTML != null) {
						qnasObj = JSON.parse(jsonElements[i].innerHTML);
						console.log(qnasObj);
						if(qnasObj[0]["@type"] != null && qnasObj[0]["@type"] == "FAQPage") {
							if(qnasObj[0].mainEntity.length > 0)
								$scope._qnas = qnasObj;
								break;
						}
					}
				} catch (error) {
					console.error("Json does not contain faq");
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
		
		$scope.showAnswer = function($event) {
			$scope.showAnswer = function($event, isAlwaysOpen) {
				if(!isAlwaysOpen) {
					questions = document.getElementsByClassName("plp_q");
					answers = document.getElementsByClassName("plp_a");
					plusIcons = document.getElementsByClassName("plus-icon");
					minusIcons = document.getElementsByClassName("minus-icon");

					index = Array.prototype.indexOf.call(questions, $event.currentTarget);
					if(answers[index].style.height == "0px") {
						answers[index].style.height = "100%";
						answers[index].style.maxHeight = "300px";
					} else {
						answers[index].style.height = "0px";
						answers[index].style.maxHeight = "0px";
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
    }
]);
/*
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

*/	

app.controller('PLPItemController', ["$scope", "$rootScope", 
	function ($scope, $rootScope) {
		
		$scope.changeColor = function ($event, offset) {
			$event.stopPropagation();
			$event.preventDefault();

			$scope.imageLoaded = false;
			$scope.currentSibling = ($scope.siblings.length + $scope.currentSibling + offset) % $scope.siblings.length;
			data = $scope.siblings[$scope.currentSibling];

			$scope.url = data.url;
			$scope.color = data.color;
			$scope.partnumber = data.partnumber;
			$scope.badges = data.badges;
			$scope.listPrice = data.listPrice;
			$scope.offerPrice = data.offerPrice;
		}

		$scope.initColors = function (siblings) {
			function parseBadges(badgesStr) {
				var badgeLabels = {
					'BADGE_EXCLUSIVE': 'Exclusive',
					'AVANT_PREMIER': 'Find it here first',
					'BADGE_NEW_ARRIVAL': 'New', 
					'BADGE_BEST_SELLER': 'Best Seller', 
					'LIMITED_EDITION': 'Limited Edition',
					'POLARIZED': 'Polarized',
					'GEOFIT': 'Universal Fit',
					'FRAME_LENS_TREATMENT': 'Transition',
					'SUSTAINABILITY_CLAIM': 'Sustainable',
					'ELECTRONICS': 'Smart Glasses',
					'BADGE_KIDS': 'Kids'
				}

				// badgesStr format: <ID>-<priority>-<position>:<ID>-<priority>-<position>:...
				badges = badgesStr.split(":")
					.filter(s => s.length)
					.map(s => s.split("-")) // format: [[ID, priority, position], [...], ...]
					.sort((a, b) => {
						// smart glasses always go in front of everything
						if (a[0] == 'ELECTRONICS')
							return -1
						else if (b[0] == 'ELECTRONICS')
							return 1
						else
							return a[1] - b[1]
					})
				
				primary = badges.filter(b => +b[2] < 2).slice(0, 1).map(b => badgeLabels[b[0]])
				secondary = badges.filter(b => +b[2] >= 2).slice(0, 2).map(b => badgeLabels[b[0]])
				if (secondary[0] == badgeLabels['ELECTRONICS'])
					secondary = [badgeLabels['ELECTRONICS']] // only display smart glasses
				
				return { primary: primary, secondary: secondary }
			}

			$scope.siblings =
				siblings.split(";")
					.filter(s => s.length)
					.map(s => s.split(","))
					.map(s => {
						return {
							partnumber: s[0],
							color: s[1],
							url: s[2],
							listPrice: s[3],
							offerPrice: s[4],
							badges: parseBadges(s[5])
						}
					});
			
			$scope.currentSibling = 0;
			$scope.url = $scope.siblings[0].url;
			$scope.color = $scope.siblings[0].color;
			$scope.partnumber = $scope.siblings[0].partnumber;
			$scope.badges = $scope.siblings[0].badges;
			$scope.listPrice = $scope.siblings[0].listPrice;
			$scope.offerPrice = $scope.siblings[0].offerPrice;
		}
	}
]);


app.controller('PLPItemControllerCL', ["$scope", "$rootScope", 
 	function ($scope, $rootScope) {
	
		$scope.initDiscounts = function(params) {
	    	
	    	if (window['DISCOUNTS_MAP'])   
	    	{
	    		discountedPricesManager.init(window['DISCOUNTS_MAP']);
	    	} 
	    	var valuesArray = discountedPricesManager.findLastUnitPrice(params.partNumberToDiscount);
	    	if(valuesArray){
	    		$scope.unitPrice = valuesArray[1];
		    	$scope.thresholdPrice = valuesArray[2];
		    	$scope.retailPrice = valuesArray[3];
		    	$scope.percentageDiscount = valuesArray[4];	
	    	}
	    	
	    	
		}
	}
]);
;
var toActionsModule = angular.module('toActionsModule', []);

toActionsModule.

factory('toActionsModule', function($rootScope, $http, $httpParamSerializerJQLike, $q, $log, $cookies) {

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

		open: function (_params, _callerId, _context) {
			// event
			$rootScope.$broadcast("lenspanel:opened", _params, _callerId, _context);

			actionsModule.callerId = _callerId;
			actionsModule.isVisible = true;
		},

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

		addToCart: function (_params) {
			var _defer = $q.defer();

			if (actionsModule.isAddingToCart) {
				_defer.reject();
				return _defer;
			}

			actionsModule.isAddingToCart = true;

			$http
				.post(
					getAbsoluteURL() + "OrderItemAddGlassesCmd",
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
		 */
		genericAddToCart: function (
			_selectedFrame,
			_selectedLens,
			_selectedWarranty,
			_reviewObject,
			_imagery,
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
		        rxcReviewObject: JSON.stringify(_reviewObject),
		        rxcImagery: JSON.stringify(_imagery)
			};

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
					getAbsoluteURL() + "OrderItemAddGlassesCmd",
					$httpParamSerializerJQLike(_params),
					{
						headers: { "Content-Type": "application/x-www-form-urlencoded" },
					}
				)
				.then(
					function (response) {
						var _data = response.data;
						const PRESCRIPTIONOBJECT="prescriptionObject";

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
                        		console.log(response);
                        	}, function (response) {
                        		console.log(response);
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
		 * add to bag from savedForLater
		 */
		addToCartFromSavedItems: function (_params ) {
			
			var _defer = $q.defer();
			actionsModule.isAddingToCart = true;
			var baseurl = window.location.protocol + '//' +  window.location.hostname;
			var url =  baseurl + '/wcs/resources/store/' + storeId + '/cart/addFrame';
			_params.includeLens = true;
			if(_params.lensColor == null || _params.lensColor == undefined){
				_params.lensColor = '';
			}
			var jsonString = JSON.stringify(_params);
			$http
				.post(
					url,
					jsonString,
					{
						headers: { "Content-Type": "application/json" },
					}
				)
				.then(
					function (response) {
						if(response.status==200 && response.data.response.status == 'ok'){
							
							 window.location.href = baseurl + '/CartView';
							
							_defer.resolve();
						} 
					}
				)
			return _defer.promise;
		},

		getPlanoLens: function (frameCatentryId ) {
			
			var _defer = $q.defer();
			actionsModule.isAddingToCart = true;
			var baseurl = window.location.protocol + '//' +  window.location.hostname;
			var url =  baseurl + '/wcs/resources/store/' + constants.ajaxParams["storeId"] + '/catalog/'+constants.ajaxParams["catalogId"]+'/rxc/frameId/'+frameCatentryId+'/lenses';
			//var jsonString = JSON.stringify(_params);
			//wcs/resources/store/12001/catalog/12751/rxc/frameId/18882180/lenses
			$http
				.get(
					url,
					//jsonString,
					{
						headers: { "Content-Type": "application/json" },
					}
				)
				.then(
					function (response) {
						if(response.data.response.status == 'ok'){
							var planoLens = "";
							response.data.response.data.packages.forEach(function(lensPackage, index){
                                if(lensPackage.lensPackage.productUPC.toLowerCase() == 'plano' ){
                                   planoLens = lensPackage.lensPackage.catEntryId;
                                }
                            });
							
							_defer.resolve(planoLens);
						} 
					}
				)
			return _defer.promise;
		},
		/**
		 * add to bag from savedForLater
		 */
		addToCartCLFromSavedItems: function (_params ) {

			var _defer = $q.defer();
			actionsModule.isAddingToCart = true;
			var baseurl = window.location.protocol + '//' +  window.location.hostname;
			var url =  baseurl + '/wcs/resources/store/' + constants.ajaxParams["storeId"] + '/cart/addContactLenses';
			var jsonString = JSON.stringify(_params);
			$http
				.post(
					url,
					jsonString,
					{
						headers: { "Content-Type": "application/json" },
					}
				)
				.then(
					function (response) {
						if(response.status==200 && response.data.response.status == 'ok'){
							
							 window.location.href = baseurl + '/CartView';
							
							_defer.resolve();
						} 
					}
				)
			return _defer.promise;
		},
		
		/**
		 * External function for RXC to save lens selection
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
		},

		/**
		 * External function for RXC to release widget
		 */
		genericExit: function () {
			
			const PRESCRIPTIONOBJECT="prescriptionObject";
			$cookies.remove( PRESCRIPTIONOBJECT , { path: '/' } );

			window.history.replaceState(null, "", window.location.pathname);
			
			$rootScope.$apply(function () {
				delete $rootScope.rxc.rxcWidget;

				window.history.go($rootScope.oldHistoryLength - history.length); // go back to last URL not in rxc
				// remove trash from browser history caused by rxc navigation
				// timeouts necessary because history API is rate limited
				setTimeout(function () { window.history.pushState(null, ""); }, 100); // null push to history to erase all the RXC states
				setTimeout(function () { window.history.back(); }, 200); // go back one
			});
		},

		/**
		 * External function for RXC to save lens selection in cart
		 */
		genericSaveEditFromCart: function (
			_selectedFrame,
			_selectedLens,
			_selectedWarranty,
			_cartData,
			_reviewObject,
			_imagery
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
		        rxcReviewObject: JSON.stringify(_reviewObject),
		        rxcImagery: JSON.stringify(_imagery)
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

			$.ajax({
				//da cambiare in chiamata angular
				type: "POST",
				url: getAbsoluteURL() + "UpdateOrderItemLensDataCmd",
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

		loadLearnMoreContent: function (contentName) {
			return actionsModule.loadContent(contentName);
		},
	};

	return actionsModule;
});
;
var headerModule = angular.module('headerModule', []);

headerModule.factory('headerModule', function ($rootScope, $location, $http, $httpParamSerializerJQLike, $q, $cookies, $log) {

	var CART_ITEMS_URL = '/wcs/resources/store/12001/cart/@self';
	var USER_DATA_URL = '/wcs/resources/store/12001/usercontext/@self/contextdata';
	var WISHLIST_ITEMS_URL = '/wcs/resources/store/12001/catalog/12751/saveditems/@self/count';
	var CREATE_USER_URL = '/wcs/resources/store/12001/guestidentity?updateCookies=true';

    return {
    	
    	
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
        	
        	$http.get(CART_ITEMS_URL)
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
        	
        	$http.get(WISHLIST_ITEMS_URL)
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
        	
        	$http.get(USER_DATA_URL)
			.then(function (response) {
				if (response && response.data) {
					
					_defer.resolve(response.data.basicInfo.registerType);
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
        	
        	$http.get(USER_DATA_URL)
			.then(function (response) {
				if (response && response.data) {
					
					_defer.resolve(response.data.basicInfo.callerId);
				} 
			}, function (error) {
				_defer.resolve(-1002);
			})
			
			return _defer.promise;
		},
		/***
         *  Create user post
         */
		createUser: function() {
        	var _defer = $q.defer();
        	
        	$http.post(CREATE_USER_URL, {})
        	.then(function (response) {
        		if (response && response.data) {
        			_defer.resolve(response.data);
        		} 
        	}, function (error) {
        		_defer.resolve(0);
        	})
        	
        	return _defer.promise;

		},
    }
});;
var toInsuranceModule = angular.module('toInsuranceModule', []);

toInsuranceModule.factory('toInsurance', function ($rootScope, $location, $http, $httpParamSerializerJQLike, $q, $cookies, $log) {

    var isLogged = false;
    var isEnabled = false;
    var isLoginLoading = false;
    var isDiscountLoading = false;

    var INSURANCE_LOGIN_URL = 'jsonpInsuranceAjax.jsp';
    var INSURANCE_DISCOUNT_URL = '/wcs/resources/store/12001/catalog/22701/ria/benefitpricing';
    var INSURANCE_ENABLED_COOKIE = 'json_insurance';
    var INSURANCE_DISABLED_COOKIE = 'ria_0';
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

    function setInsuranceCookie(json) {
        var now = new Date();
        var time = now.getTime() + 1800 * 1000;
        now.setTime(time);

        // Comma in cookie - Safari fix
        if (json.riaInsuranceInformation) {
            var riaInsuranceInformation = JSON.parse(json.riaInsuranceInformation);
            if (riaInsuranceInformation.planName) {
                riaInsuranceInformation.planName = riaInsuranceInformation.planName.replace(',', '');
                json.riaInsuranceInformation = JSON.stringify(riaInsuranceInformation);
            }
        }

        var jsonStr = JSON.stringify(json);

        if (getCookie(INSURANCE_DISABLED_COOKIE)) {
            document.cookie = INSURANCE_DISABLED_COOKIE + '=' + jsonStr + '; path=/; expires=' + now.toUTCString() + ';';
        } else {
            document.cookie = INSURANCE_ENABLED_COOKIE + '=' + jsonStr + '; path=/; expires=' + now.toUTCString() + ';';
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

    // // init, check if json_insurance is set while ria_1 and ria_0 are unset
    // var insuranceJSON = getCookie(INSURANCE_COOKIE_TO);
    // if (insuranceJSON && !getCookie(INSURANCE_ENABLED_COOKIE) && !getCookie(INSURANCE_DISABLED_COOKIE)) {
    //     var now = new Date();
    //     now.setTime(now.getTime() + 1800 * 1000);

    //     document.cookie = INSURANCE_ENABLED_COOKIE + '=' + insuranceJSON + '; path=/; expires=' + now.toUTCString() + ';';

    //     console.log("\n\n\n\nset insurance cookie\n\n\n\n\n");
    // }

    var insuranceModule = {
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
         * 
         * @returns {Promise} - Login promise
         */
        login: function (data) {
        	
            var _defer = $q.defer();
    		document.cookie = "ria_0=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    		
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
         * @returns {boolean} success
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
         */
        isLoading: function () {
            return isLoginLoading || isDiscountLoading;
        },

        /**
         * Check if user is logged
         */
        isLogged: function () {
            return (getCookie(INSURANCE_ENABLED_COOKIE) || getCookie(INSURANCE_DISABLED_COOKIE)) ? true : false;
        },

        /**
         * Check if insurance is enabled
         */
        isEnabled: function () {
            return getCookie(INSURANCE_ENABLED_COOKIE) && !getCookie(INSURANCE_DISABLED_COOKIE);
        },

        /**
         * Get insurance JSON
         */
        getInsuranceJSON: function () {
            var insuranceJSON = getCookie(INSURANCE_ENABLED_COOKIE, true);
            return insuranceJSON ? insuranceJSON : getCookie(INSURANCE_DISABLED_COOKIE, true);
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

                if (insuranceJSON && insuranceJSON.token && insuranceJSON.riaInsuranceInformation) {
                    if (!data.orderId) {
                        data.orderId = '.';
                    }

                    data['__RIA_SYNC_TOKEN'] = insuranceJSON.token;
                    data['__RIA_SYNC_INFO'] = insuranceJSON.riaInsuranceInformation;
                    data['__PRICING_ENTRY'] = [];

                    angular.forEach(data.pricingEntries, function (value, key) {
                        data['__PRICING_ENTRY'].push(JSON.stringify({ frame: value.frame, lens: value.lens }));
                    });

                    delete data.pricingEntries;

                    $http({ method: 'POST', url: INSURANCE_DISCOUNT_URL, params: data })
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
         * Get insurance discounts for configurator
         */
        getInsuranceDiscounts: function (_selectedFrame, _selectedPackage) {
            var _defer = $q.defer();

            var _pricingEntries = [];

            angular.forEach(_selectedPackage, function (currentPackage) {
                if (currentPackage.lensPackage.insPrice == null) {
                    const pricingEntry = {
                        frame: {
                            price: _selectedFrame.listPrice,
                            quantity: '1',
                            type: 'f',
                            upc: _selectedFrame.upc || _selectedFrame.partNumber,
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
                storeId: 12001,
                catalogId: 12651,
                langId: '-1',
                pricingEntries: _pricingEntries,
            };

            insuranceModule.getDiscounts(data).then(function (response) {
                if (response) {
                    try {
                        var updatedPackages = [];

                        angular.forEach(_selectedPackage, function (currentPackage) {
                            var tempPackage = JSON.parse(JSON.stringify(currentPackage));

                            for (let i = 0; i < response.length; i++) {
                                let insPackage = response[i];

                                if (tempPackage.lensPackage.upc == insPackage.lens.upc) {
                                    tempPackage.frame.insPrice = Math.max(((parseFloat(_selectedFrame.listPrice) < parseFloat(tempPackage.frame.offerPrice) ? parseFloat(tempPackage.frame.offerPrice) : parseFloat(_selectedFrame.listPrice)) - insPackage.frameDiscount).toFixed(2), 0.0);
                                    tempPackage.lensPackage.insPrice = Math.max((parseFloat(tempPackage.lensPackage.listPrice) - insPackage.lensDiscount).toFixed(2), 0.0);

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
            	_defer.reject(INSURANCE_ERRORS.INSURANCE_SERVICE_ERROR)

            });

            return _defer.promise;
        },

        toggleInsurance: function () {
            if (!this.isLogged()) {
                window.insuranceController.openFromToggle();
                return;
            }

            var now = new Date();
            var time = now.getTime() + 1800 * 1000;
            now.setTime(time);

            $("#cart-insurance-warning").toggleClass("hidden");
            
            if (this.isEnabled()) {
                document.cookie = INSURANCE_DISABLED_COOKIE + '=true; path=/; expires=' + now.toUTCString() + ';';
                
                $cookies.remove('ria_1', { path: '/' });

                $rootScope.$broadcast(INSURANCE_EVENTS.INSURANCE_DISABLED);
                window.dispatchEvent(new CustomEvent(INSURANCE_EVENTS.INSURANCE_DISABLED));
            } else {
                $cookies.remove(INSURANCE_DISABLED_COOKIE, { path: '/' });

                $rootScope.$broadcast(INSURANCE_EVENTS.INSURANCE_ENABLED);
                window.dispatchEvent(new CustomEvent(INSURANCE_EVENTS.INSURANCE_ENABLED));
            }
        },

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

        checkAllBenefits: function () {
            var benefitsAvailable = false;

            if (this.isLogged()) {
                var insuranceJSON = getInsuranceJSON();

                if (insuranceJSON) {
                    var i = 0;
                    var insuranceJSONKeys = Object.keys(insuranceJSON);

                    while (i < insuranceJSONKeys.length && !benefitsAvailable) {
                        var insuranceCategory = insuranceJSONKeys[i];

                        if (insuranceJSON[insuranceCategory][0].available == true) {
                            benefitsAvailable = true;
                        }
                    }
                }
            }

            return benefitsAvailable;
        },

        checkSingleBenefit: function (category) {
            var benefitAvailable = false;

            if (this.isLogged()) {
                var insuranceJSON = getInsuranceJSON();

                if (insuranceJSON) {
                    var i = 0;
                    var insuranceJSONKeys = Object.keys(insuranceJSON);

                    while (i < insuranceJSONKeys.length && !benefitAvailable) {
                        var insuranceCategory = insuranceJSONKeys[i];

                        if (insuranceCategory == category) {
                            benefitsAvailable = insuranceJSON[insuranceCategory][0].available;
                        }
                    }
                }
            }

            return benefitAvailable;
        },

        getEvents: function () {
            return angular.copy(INSURANCE_EVENTS);
        },

        getErrors: function () {
            return angular.copy(INSURANCE_ERRORS);
        },
        openInsurancePanel: function () {
            window.insuranceController.openFromToggle();
        },
        removeInsuranceBenefits: function() {
        	removeInsuranceCookie();
            removeTentativeCookie();
        }

    };
    
    return insuranceModule;
});;
var toPrescriptionModule = angular.module("toPrescriptionModule", []);

toPrescriptionModule.factory(
	"toPrescription",
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
			fileExtensions: ["png", "gif", "jpeg", "tiff", "bmp", "word", "pdf"],
			maxFileSize: 10,

			init: function (_storeId, _catalogId, _prescriptionFlows, _prismEnabled) {
				/* Needed for checkAvailableFrames call */
				if (!isInit) {
					storeId = _storeId;
					catalogId = _catalogId;
					isInit = true;
				} 
				this.prescriptionFlows = _prescriptionFlows;
				this.hideMoreOptions = (_prismEnabled.toLowerCase() === 'false');

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

			loadPrescription: function () {
				var _prescriptionObject = null;

				return new Promise(function (resolve, reject) {
					var value = $cookies.get(PRESCRIPTION_COOKIE);

					if (value) {
						try {
							_prescriptionObject = JSON.parse(value);

							// validation is run by the configuration agains the return object
							resolve(_prescriptionObject);
						} catch (e) {
							$log.log(e);
							reject();
						}
					} else {
						resolve(null);
					}
				});
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
							orderitemid;
						$http.get(url).then(
							function (response) {
								document.cookie =
									PRESCRIPTION_COOKIE +
									"=" +
									encodeURIComponent(JSON.stringify(response.data)) +
									"; path=/";
								if (
									response.data.prescriptionFlow !== null &&
									response.data.prescriptionFlow.length > 0
								) {
									resolve(response.data);
								} else {
									reject(null);
								}
							},
							function (response) {
								reject(null);
							}
						);
						//document.cookie = 'prexOI' + "=" + orderitemid +  ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
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

			savePrescription: function (_prescriptionObject) {
				document.cookie =
					PRESCRIPTION_COOKIE +
					"=" +
					encodeURIComponent(JSON.stringify(_prescriptionObject)) +
					"; path=/";

				return true;
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
		};
	}
);
;
app.controller('PrescriptionPageController', ['$scope', '$rootScope', '$http', '$window', '$cookies', '$log', '$timeout', '$filter', 'moment', '$anchorScroll',
    function($scope, $rootScope, $http, $window, $cookies, $log, $timeout, $filter, moment,$anchorScroll) {

        // global variables
        $scope.params = {
            storeId: 12001,
            userId: 0,
            langId: -1,
            catalogId: 12651,
            framesImageURL: '',
            contactsImageURL: '',
            orderId: '',
            nextStepUrl: ''
        };

        $scope.states = ['AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID',
         'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NM',
          'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'];

        // rest services urls
        $scope.providePrescriptionBaseURL = '/wcs/resources/store/' + $scope.params.storeId + '/provideprescription';
        $scope.setupURL = $scope.providePrescriptionBaseURL + '/setup';
        $scope.searchDoctorURL = $scope.providePrescriptionBaseURL + '/searchdoctor';
        $scope.prescriptionUploadURL = $scope.providePrescriptionBaseURL + '/upload';
        $scope.prescriptionSubmitURL = $scope.providePrescriptionBaseURL + '/submit';
        $scope.downloadImageURL = $scope.providePrescriptionBaseURL + '/download/';

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
                'subMsg': 'We accept: pdf/png/gif/jpeg/tiff/doc/bmp/pages'
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
        for(i = 51; i <= 77; i++){
            $scope.singlePDProvider.push({text:i, value:i});
        }
        $scope.doublePDProvider = [];
        for(i = 25; i <= 38; i++){
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
                            var dob = prescriptionData.dob_p.split('-'); // string in ISO format
                            dob = [dob[1], dob[2], dob[0]].join("/"); // transform in en_US format

                            $scope.items[itemId].prescriptionData.patient = {
                                'firstName': prescriptionData.firstName,
                                'lastName': prescriptionData.lastName,
                                'dateOfBirth': dob
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
               
            $scope.projectImageUrl = $scope.params.projectImagesUrl+'202005-rxreview/';
            
            //prescriptions setup
            $http.get($scope.setupURL + '/' + $scope.params.orderId)
                .then(function(response) {
                    if (response.data && response.data.response.data.status == 'Success') {
                        $scope.prescriptions  = response.data.response.data.dataContent.rxDataContent; // map returned by setup service with {rxId : rxData} format
                        $scope.items = response.data.response.data.dataContent.itemNamesMap;
                        var itemIndex = 1;
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
                            
                        	if ($scope.currentItemId == 0) {
                        		$scope.currentItemId = itemId;
                                $scope.currentlyEditing = itemData.itemType;
							}
							if (itemData.itemType == 'frame') {
								itemData.itemUrl = $scope.params.framesImageURL.replace('{0}', itemData.itemUPC).replace('{1}', '_002').replace('{2}', '200');
								
								if(itemData.gridModel && itemData.gridColor && itemData.itemLensAttributes[1] && itemData.itemLensAttributes[3] && itemData.itemLensAttributes[4]){
									
									var cartImageURL = 'https://assets.targetoptical.com/extra/image/rxc/frames/{0}__{1}__RXP__FRAME__qt.png?impolicy={4}&Lenses=https://assets.targetoptical.com/extra/image/rxc/lenses/{0}__RXP__{2}__qt.png';
									var cartImageLogoURL = '&Logo=https://assets.targetoptical.com/extra/image/rxc/logo/{0}__RXP__{3}__qt.png';
									
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
                            window.location.href = "AjaxOrderItemDisplayView?storeId=" + $scope.params.storeId + "&catalogId=" + $scope.params.catalogId + "&langId=-1&URL=AjaxOrderItemDisplayView1&orderId=.";	
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
                if ($scope.allowedContentTypes.indexOf($scope.items[$scope.currentItemId].prescriptionData.uploadFileInput.files[0].type) != -1) {//file format check
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
								&& Object.keys(chosenDoctor).length === 0 && Object.keys(uploadedFile).length === 0) {
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

                        submitParams.rx = "doctor";
                        submitParams.prescriptionMode = $scope.items[$scope.currentItemId].prescriptionData.prescriptionMode;

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
                            
                            if ($scope.pupillaryDistance) {
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
								   'Order_PrescriptionMethod': analyticsMethod
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
app.controller('loginController', ['$scope', '$rootScope', '$window', '$cookies', '$http', '$compile', '$timeout',
    function($scope, $rootScope, $window, $cookies, $http, $compile, $timeout) {

        $scope.modalLogin = false;
        $scope.errorMember = false;
        $scope.errorGuest = false;
        $scope.errorMailMember = false;
        $scope.errorPswMember = false;
        $scope.errorMessageMember = false;
        $scope.errorMessage = "";
        $scope.isMobile = false;

        // repeat callback every delay ms until it succeeds, useful when callback has to
        // wait for objects loaded asyncronously
        function retryUntilSuccess(callback, delay) {
            delay = delay || 250;

            var interval = setInterval(function() {
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
            gapi.load('auth2', function() {
                // Retrieve the singleton for the GoogleAuth library and set up the client.
                auth2 = gapi.auth2.init({
                    client_id: '369460781255-2um3cre5chaq41q42ot5b754130ccitu.apps.googleusercontent.com',
                    // Request scopes in addition to 'profile' and 'email'
                    //scope: 'additional_scope'
                    plugin_name: 'TO - Credentials'
                });
                attachSignin(document.getElementById('customBtn'));
            });
        }
        
        function  FBInit() {        	
        	FB.Event.subscribe('auth.statusChange', function(response) {
                if (response.status === 'connected') {
                    $scope.loginFB(response);
                }
            });
        	return true
        }
        

        // gapi might not be loaded initially
        retryUntilSuccess(gapiInit);
        retryUntilSuccess(FBInit);
        
        function attachSignin(element) {
            console.log(element.id);
            auth2.attachClickHandler(element, {},
                function(googleUser) {
                    $scope.loginGoogle(googleUser);
                },
                function(error) {
                	obj = {
            			id: 'Error',
            			Error_Source: "Server",
            			Error_Code: "Login",
            			Error_Message: 'Login Request Failed with Google'
            		}
            		tealium_data2track.push(obj);
                    console.log('Login error with Google');
                });
        }

        $scope.logoutFB = function() {
            FB.logout(function(response) {
                console.log('User signed out - FB.');
            });
        }

        $scope.signOut = function() {
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function() {
                console.log('User signed out - Google.');
            });
        }

        $scope.loginFB = function(responseLogin) {
            FB.api('/me?fields=name,email', function(response) {
                var data = JSON.stringify({
                    "authorizationProvider": responseLogin.loginSource,
                    "accessToken": responseLogin.authResponse.accessToken,
                    "name": response.name,
                    "email": response.email,
                    "logonId": response.email,
                    "isMobile": $scope.isMobile
                });
                //responseLogin.authResponse.userID
                $scope.loginBE(data);
            });
        }

        $scope.loginGoogle = function(googleUser) {
            var profile = googleUser.getBasicProfile();
            var access = googleUser.getAuthResponse();

            var data = JSON.stringify({
                "authorizationProvider": access.idpId,
                "accessToken": access.id_token,
                "name": profile.getName(),
                "email": profile.getEmail(),
                "logonId": profile.getEmail(),
                "isMobile": $scope.isMobile
            });
            //getId
            $scope.loginBE(data);
        }

        $scope.loginBE = function(data) {
        	$scope.url = 'https://' + window.location.host + '/wcs/resources/store/' + storeId + '/loginidentity/oauth_validate?updateCookies=true';
        	$scope.loginCheckout = document.getElementById('loginCheckout');
        	$http({
                method: 'POST',
                url: $scope.url,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            }).then(function successCallback(response) {
            	if($scope.isCheckout){
                    $scope.afterLogin();
            	} else if ($scope.loginCheckout != null) {
            		location.reload();
            	} else {
                    window.location.href = response.data.redirectURL;
            	}
            }, function errorCallback(response) {
            	obj = {
        			id: 'Error',
        			Error_Source: "Server",
        			Error_Code: "Login",
        			Error_Message: 'Login Request Failed with Social Login'
        		}
        		tealium_data2track.push(obj);
            	$scope.errorMessageMember = true;
                $scope.errorMessage = 'Error with social login';
                $scope.$digest();
            });
        }

        $scope.openModalLogin = function() {
            $scope.userType = document.getElementById("userType").value;
            if ($scope.userType === 'R' || (sessionStorage.getItem('mail_checkout') && sessionStorage.getItem('mail_checkout') !== '')) {
                $scope.goToCheckout();
            } else {
                document.querySelector('.nav-links').style.zIndex = 'unset'; // header navigation fix
                $scope.modalLogin = true;
                $scope.toggleLockPageScroll(true);
                $scope.isCheckout = true;
            }
        }

        $scope.closeModalLogin = function() {
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
            document.querySelector('.nav-links').style.zIndex = 999; // header navigation fix
        }

        $scope.toggleLockPageScroll = function(lock) {
            document.querySelectorAll('html,body').forEach(elem => {
                elem.style.overflow = lock ? 'hidden' : '';
                elem.style.position = lock ? 'fixed' : '';
                elem.style.height = lock ? '100%' : '';
            });
        }


        $scope.$watch('loginGuestValue', function() {
            if ($scope.errorGuest) {
                $scope.errorGuest = false;
            }
        });

        $scope.loginGuest = function() {
            $loader.show('login-guest');
            if ($scope.loginGuestValue && $scope.validateEmail($scope.loginGuestValue)) {
                sessionStorage.setItem('mail_checkout', $scope.loginGuestValue);
                //$scope.closeModalLogin();
                $scope.goToCheckout();
            } else {
                $scope.errorGuest = true;
                $loader.hide();
            }
        }
        
        $scope.FBLoginCustom = function (){
        	FB.login(function(response) {
            }, {
                scope: 'public_profile,email'
            });
        }

        $scope.validateEmail = function(email) {
            const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }

        $scope.$watch('loginMemberMailValue', function() {
            if ($scope.errorMailMember) {
                $scope.errorMailMember = false;
            } else if ($scope.errorMessageMember) {
                $scope.errorMessageMember = false;
            }
        });
        $scope.$watch('loginMemberPswValue', function() {
            if ($scope.errorPswMember) {
                $scope.errorPswMember = false;
            } else if ($scope.errorMessageMember) {
                $scope.errorMessageMember = false;
            }
        });

        $scope.loginMember = function() {
            if (!($scope.loginMemberMailValue && $scope.validateEmail($scope.loginMemberMailValue)) ||
                !($scope.loginMemberPswValue)) {
                if (!($scope.loginMemberMailValue && $scope.validateEmail($scope.loginMemberMailValue)))
                    $scope.errorMailMember = true;
                if (!($scope.loginMemberPswValue))
                    $scope.errorPswMember = true;
            } else {

                var f = $('#LogonFormModal');
                utag_data.form_name = "logon modal";
                utag_data.form_field = error_list;
                var optinEmail = false;

                var data = f.serializeArray(),
                    newData = [],
                    originalURL = null;

                // since this is a jsonp request, we always set the destination URL to a jsonp-compatible page
                for (var i = 0; i < data.length; i++) {
                    var d = data[i];
                    if (d['name'] == 'receiveEmail' && d['value'] == 'on') {
                        d['value'] = true;
                        optinEmail = true;
                    }

                    if (d['name'] == 'URL') {
                        originalURL = d['value'];

                        newData.push({
                            name: 'URL',
                            value: 'LogonAjaxView'
                        });
                    } else {
                        newData.push(d);
                    }
                }

                $loader.show('login-member');

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
                            $scope.closeModalLogin();
                            if($scope.isCheckout) {
                                $scope.afterLogin();
                            }
                        } else if (data.errorMessage.includes('PSW_RST')) {
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
							$("#passwordUpdateEmailInput").val(data.errorMessage.split('PSW_RST:')[1]);
							 $scope.closeModalLogin();
						} else {
                        	obj = {
                    			id: 'Error',
                    			Error_Source: "User",
                    			Error_Code: "Form Filling Error - Login",
                    			Error_Details: 'Wrong Email, Wrong Password - ' + data.errorMessage,
                    			Error_Message: 'We couldn’t find a member account associated with your email address. If you use this email with a social account, please use social login to proceed.',
                    		}
                    		tealium_data2track.push(obj);
                            $scope.errorMessageMember = true;
                            $scope.errorMessage = 'We couldn’t find a member account associated with your email address. If you use this email with a social account, please use social login to proceed.';
                            $scope.$digest();
                        }
                        $loader.hide();
                    },
                    error: function(jqXHR, textStatus, errorThrown) { //unexpected error case - system error
                        $scope.errorMessageMember = true;
                        $scope.errorMessage = textStatus;
                        $loader.hide();
                        obj = {
                			id: 'Error',
                			Error_Source: "Server",
                			Error_Code: "Login",
                			Error_Message: 'Login Request Failed'
                		}
                        tealium_data2track.push(obj);
                    }
                });
            }
        }

        $scope.afterLogin = function() {
        	$scope.goToCheckout();
        }
        
        $scope.goToCheckout = function() {
        	$scope.userType = document.getElementById("userType").value;
            $scope.nextStepURL = document.getElementById("nextStepURL").value;
            $scope.PhysicalStoreSelectionURL = document.getElementById("PhysicalStoreSelectionURL").value;
            $timeout(function() {
                if (CheckoutHelperJS.canCheckoutContinue($scope.userType) && CheckoutHelperJS.updateShoppingCart(document.ShopCartForm, true)) {
                    ShipmodeSelectionExtJS.guestShopperContinue($scope.nextStepURL, $scope.PhysicalStoreSelectionURL);
                }
            }, 500);
        }
    }
]);;
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
		    	$(element).on('lazyLoaded', function(e,slick) {
                    $(e.target).closest('div[data-ng-cloak-inner]').removeAttr('data-ng-cloak-inner');
                    $(e.target).find('div[data-ng-cloak-inner]').removeAttr('data-ng-cloak-inner');
                });

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

					// disable analytics for arrow and dots clicks
					$(e.target).find('.slick-arrow').attr( "data-analytics_available_call", "0" );
					$(e.target).find('.slick-dots button').attr( "data-analytics_available_call", "0" );
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

app.directive('ngOnload', function() {
	return {
		scope: {
			ngOnload: "&"
		},
		link: function (scope, element, attrs) {
			var handler = function() {
				scope.ngOnload({elem: element[0]});
			}
			if (!element[0].complete)
				element[0].addEventListener("load", handler);
			else
				handler();
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
				
				// only for header
				var lastScrollTop = 0;
				var isHeader = (options != undefined && options.header) ? true : false;
				
				if(!isHeader) element.addClass("stickable");
				
				angular.element($window).bind('resize', function(){
					if(element.hasClass('sticky')){
						element.removeClass('sticky');
						moreResizeHappened = true;
					}
					
					sticky = 0;
					var pElement = element;
					elementHeight = element[0].offsetHeight;
	
					while(pElement) {
						sticky += angular.element(pElement)[0].offsetTop;
						pElement = angular.element(pElement)[0].offsetParent;
					}

					if(window.innerWidth < 414){
						scope.deviceType = 'M'; //mobile
					}else if(window.innerWidth <= 1024){
						scope.deviceType = 'T'; //tablet
					}else if(window.innerWidth > 1024){
						scope.deviceType = 'D'; //desktop
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
					var promoStrip = document.querySelector(".promo-stripe");
					
					if (window.pageYOffset >= sticky) {
						element.addClass("sticky").removeClass('top-auto'); 
						element.parent()[0].style.paddingTop = (parseInt(containerPadding) + elementHeight) + 'px';
						if (promoStrip){
							element[0].style.marginTop = promoStrip.clientHeight + 'px';
						}
					} else {
						element.removeClass("sticky").addClass('top-auto'); 
						element.parent()[0].style.paddingTop = parseInt(containerPadding) + 'px';
						if (promoStrip){
							element[0].style.marginTop = '';
						}
					}
					
					if(isHeader){
						if (st > lastScrollTop && st > elementHeight){
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

app.directive('lazyNgSrc', function(){
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			attrs.$observe('lazyNgSrc', function(v) {
				if (!element[0].classList.contains("lazy"))
					element[0].src = v // only if image already lazy loaded
			})
		}
	}
});

app.directive('onLoad', function($timeout){
	return {
		restrict: 'A',
		scope: {
			"onLoad": "&"
		},
		link: function(scope, element, attrs) {
			function loadHandler() {
				$timeout(scope.onLoad, 0)
				// scope.$apply()
			}

			if (element[0].src && element[0].complete) {
				// image was cached or it loaded before the js ran
				loadHandler()
			}

			element.on('load', loadHandler)
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
				} catch {}

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


app.directive("toDatepicker", function () {
	function calendarTemplate() {
		var template = (
			'<div ng-transclude></div>'+ // children HTML elements go here
			'<button type="button" ng-show="showToggle" class="calendar-toggle" ng-click="toggleCalendar()">Toggle calendar</button>'+
			'<div class="underlay" ng-show="showCalendar" ng-click="toggleCalendar()"></div>'+
			'<div class="to-datepicker" ng-show="showCalendar" ng-switch on="currentPage">'+
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

app.directive('espot', function($window, $timeout, $http, $compile) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var STOREID = '#STOREID#';
            var ESPOTNAME = '#ESPOTNAME#';
            var setup = scope.$eval(attrs.espot);
            var ESPOT_URL = '/wcs/resources/store/' + setup.storeId + '/espot/' + setup.espotName;
           
            if (setup.categoryId){
            	ESPOT_URL = ESPOT_URL + '/category/' + setup.categoryId;
            }

            $timeout(function() {
                $http.get(ESPOT_URL)
                    .then(function(response) {
                        if (response.data.MarketingSpotData &&
                            response.data.MarketingSpotData.length > 0 &&
                            response.data.MarketingSpotData[0].baseMarketingSpotActivityData &&
                            response.data.MarketingSpotData[0].baseMarketingSpotActivityData.length > 0 &&
                            response.data.MarketingSpotData[0].baseMarketingSpotActivityData[0].marketingContentDescription &&
                            response.data.MarketingSpotData[0].baseMarketingSpotActivityData[0].marketingContentDescription.length > 0 &&
                            response.data.MarketingSpotData[0].baseMarketingSpotActivityData[0].marketingContentDescription[0].marketingText) {
                            var html = response.data.MarketingSpotData[0].baseMarketingSpotActivityData[0].marketingContentDescription[0].marketingText;
                            var e = $compile(html)(scope);
                            element.replaceWith(e);
                        }
                    }, function(error) {
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


app.directive("toSplitSelect", function ($compile) {
	function optionsTemplate() {
		return (
			'<div class="split-select__container">'+
				'<div class="split-select__underlay" ng-show="show" ng-click="close($event)"></div>' +
				
				'<div class="split-select__dropdown" ng-show="show">' +
					'<div class="split-select__header">' +
						'<div>-</div>' +
						'<div>+</div>' +
					'</div>' +
					
					'<div class="split-select__options">' +
						'<div class="split-select__optionsMinus">' +
							'<div class="split-select__option" ng-class="{selected: value == o}" ng-repeat="o in optionsMinus" ng-click="onSelect(o, $event)">{{o | number:2}}</div>' +
						'</div>' +

						'<div class="split-select__optionsPlus">' +
							'<div class="split-select__option" ng-class="{selected: value == o}" ng-repeat="o in optionsPlus" ng-click="onSelect(o, $event)">+{{o | number:2}}</div>' +
						'</div>' +
					'</div>' +
						
					'<div class="split-select__scrollbar">' +
						'<div class="split-select__thumb" ng-style="thumb"></div>' +
					'</div>' +
				'</div>' +
			'</div>'
		);
	}

	return {
		restrict: 'A',
		scope: {},
		link: function ($scope, elem, attr) {
			let options = []
			
			const parseOptions = () => {
				$scope.value = elem.val()
				// get all valid options in select
				options = Array.from(elem.find("option"))
				.filter(o => !!o.value)
				
				$scope.optionsMinus = options.map(o => +o.value).filter(o => o < 0).reverse()
				$scope.optionsPlus = options.map(o => +o.value).slice($scope.optionsMinus.length)
			}
			
			const scrollHandler = (e) => {
				$scope.$apply(() => {
					$scope.thumb = {
						"top": `${100 * e.target.scrollTop / e.target.scrollHeight}%`,
						"height": `${100 * e.target.clientHeight / e.target.scrollHeight}%`
					}
				})
			}

			$scope.onSelect = (o, e) => {
				e.preventDefault()
				e.stopPropagation()
				elem.val(o).change()
				$scope.value = o
				options.find(opt => opt.value == o).selected = true

				$scope.show = false
			}

			const dropdown = angular.element(optionsTemplate())
			dropdown.find(".split-select__options").on("scroll", scrollHandler)
			$compile(dropdown)($scope)
			elem.after(dropdown)

			$scope.close = (e) => {
				e.preventDefault()
				e.stopPropagation()
				$scope.show = false;
			}

			// block native dropdown from opening when clicking no label
			if (elem[0].parentElement.tagName == "LABEL") {
				$(elem[0].parentElement).on("click", (e) => {
					e.preventDefault()
					e.stopPropagation()
				})
			}
			// open custom dropdown on click
			$(elem).on("mousedown", (e) => {
				e.preventDefault()
				e.stopPropagation()

				if (!$scope.show) {
					$scope.$apply(() => {
						parseOptions();
						$scope.show = true
						dropdown.find(".split-select__options")[0].scroll(0, 0.1)
					})
				} else {
					$scope.show = false
				}
			})
		},
	}
});

app.filter('percentage', ['$filter', function ($filter) {
	return function (input, decimals) {
		return $filter('number')(input * 100, decimals || 0) + '%';
	};
}]);
;
// MY SAVED ITEMS CONTROLLER
app.controller('MySavedItemsCtrl', ['$scope', '$rootScope', '$timeout', '$q', '$log', '$http', 'headerModule', 'toActionsModule', 
	function ($scope, $rootScope, $timeout, $q, $log, $http, headerModule, toActionsModule) {

		// Initialization
		$scope.init = function (params) {
			$scope.params = params;
			
		    //configurator object	    	
			$scope.config = {
				selector: '#savedItemsWidgetRoot',
			    langUrl: '/data/langUrl_label.json',
			    lang: $scope.params.lang,
			    mockRequests: $scope.params.mockRequests,
			    country: $scope.params.countryName,
			    brand: 'TO',
			    hostname: 'https://' + window.location.hostname,
			    storeId: $scope.params.storeId,
			    catalogId: $scope.params.catalogId,
			    langId: $scope.params.langId,
			    warrantyPrice: $scope.params.warrantyPrice,
			    /* external pages */
			    pagesUrl: {
			    	 warrantyUrl: '/to-us/our-guarantee?section=protectionPlan',
				     cartUrl: '/CartView',
				     cartLearnMoreUrl: '/read-mode',
			    },
			    /* paths to services endpoints */
			    endpoints: {
			      getSavedItem: '/wcs/resources/store/{storeId}/catalog/{catalogId}/saveditems/@self',
			      removeSavedItem: '/wcs/resources/store/{storeId}/catalog/{catalogId}/saveditems/@self/byId/',
			      updateSavedItemQuantityContact: '/wcs/resources/store/{storeId}/catalog/{catalogId}/saveditems/@self/byId/',
			      updateSavedItemWarranty: '/wcs/resources/store/{storeId}/catalog/{catalogId}/saveditems/@self/byId/{savedItemId}/warranty',
			    },
			    /* actions handled by WCS (e.g. add to bag) */
			    actions: {
			      /* add to cart functions */
			      addToBagFrameLens: function(params) {
			    	  
			    	  if(params.lens == '' || params.lens == undefined){
			    		  toActionsModule.getPlanoLens(params.frameCatentryId).then(function(planoLensId){
			    			  if(planoLensId != '' && planoLensId != undefined) {
			    				  params.lens = planoLensId;
			    				  toActionsModule.addToCartFromSavedItems(params).then(function(response){
			    					  
									});
			    			  }
			    		  }) 
			    	  } else {
				        // wcs handles the logic, returns promise for async operation
				    	toActionsModule.addToCartFromSavedItems(params).then(function(response){
				
						});
			    	  }
			        return Promise();
			      },
			      addToBagContacts: function(params) {
			        // wcs handles the logic, returns promise for async operation
		    	    toActionsModule.addToCartCLFromSavedItems(params).then(function(response){
						
					});
			        return Promise();
			      },
			      toggleFindAndTryInStore: function(params) {
			        // for LC only - for frame only
			        // wcs handles the logic, returns promise for async operation 
			        return Promise();
			      },
			      updateSavedItemsCount: function() {
			    	// Retrieve wish list quantity from headerModule
					headerModule.getWishListItems().then(function(response){
						$rootScope.wishlistItems = response.catentries;
					});
			      },
			    }
			};
		    //init and render widget
		
			var myWidget = SavedItemsCompoent.savedItemsWidget.new($scope.config);
			myWidget.render();// this is the call to the render function
		};
	}
])