'use strict';

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var opsm = window.opsm || {}; //window.monetateQ = window.monetateQ || [];

(function (window, document, $, opsm) {
  if (window.mnttrc) {
    var buildProductsPLP = function buildProductsPLP() {
      var products = []; //		$('a.product.card li.product--color-item').data('data-product-partnumber')

      if ($('a.product.card li.product--color-item').length) {
        $('a.product.card li.product--color-item').each(function () {
          if ($(this).data('product-partnumber')) products.push(String($(this).data('product-partnumber')));
        });
      } else {
        $('a.product.card .analyticsHelpItem.analyticsItemSKU').each(function () {
          if ($(this).val()) products.push($(this).val());
        });
      }

      return products;
    };

    var getCartAjax = function getCartAjax() {
      var cartRows = [];
      $.ajax({
        method: 'GET',
        url: window.location.origin + '/MiniShopCartDisplayView?storeId=' + WCParamJS.storeId + '&doAjax=true',
        dataType: 'json',
        async: false,
        success: function success(cartDATA) {
          buildCartRows(cartDATA);
        },
        error: function error(xhr, ajaxOptions, thrownError) {
          console.log(xhr.responseText);
        }
      });
    };

    var isEmptyCart = function isEmptyCart(cart) {
      cart = cart || {};
      return !(JSON.stringify(cart) !== JSON.stringify({}) && cart && cart.recordSetTotal > 0);
    };

    var getOrderItemDiscount = function getOrderItemDiscount(oItemRow) {
      if (!oItemRow || !oItemRow.adjustment) {
        return "0.00";
      }

      var adjustment = oItemRow.adjustment.filter(function (obj) {
        return (
          /*obj.usage && obj.usage.toLowerCase().indexOf('shipping')<0 && */
          obj.displayLevel === 'OrderItem'
        );
      });
      var totalItemDiscount = 0;
      adjustment.forEach(function (i) {
        totalItemDiscount += Number(parseFloat(i.amount).toFixed(2));
      });
      return totalItemDiscount; //this is the total lineItemDiscount, must be divided by quantity
    };

    var getOrderTotalDiscount = function getOrderTotalDiscount(cart) {
      var totalItemDiscount = 0;

      if (cart && cart.adjustment) {
        var adjustment = cart.adjustment.filter(function (obj) {
          return (
            /*obj.usage && obj.usage.toLowerCase().indexOf('shipping')<0 && */
            obj.displayLevel === 'Order' && obj.usage !== 'Shipping Adjustment'
          );
        });
        adjustment.forEach(function (discItem) {
          discItem.amount = Number(parseFloat(discItem.amount).toFixed(2));
          totalItemDiscount += discItem.amount;
        });
      }

      return totalItemDiscount;
    };

    var getOrderTotalDiscountRow = function getOrderTotalDiscountRow(cart) {
      return MonetateHelper.buildAddCartRow('disc_' + cart.orderId, 1, String(getOrderTotalDiscount(cart)), cart.totalAdjustmentCurrency);
    };

    var buildCartRows = function buildCartRows(cart) {
      cart = cart || {};

      if (isEmptyCart(cart)) {
        return [];
      }

      var cartRows = [];
      var purchaseRows = [];
      var oID = cart.orderId;
      cart.orderItem.forEach(function (oItem) {
        var discount = getOrderItemDiscount(oItem) / oItem.quantity; //is negative
        //add a row for discount or calculate net price

        var unitPrice = (parseFloat(oItem.unitPrice) + discount).toFixed(2);
        cartRows.push(MonetateHelper.buildAddCartRow(oItem.partNumber, oItem.quantity, unitPrice, oItem.currency));
      });

      try {
        if (getOrderTotalDiscount(cart) != 0) {
          cartRows.push(getOrderTotalDiscountRow(cart));
        }
      } catch (ex) {
        console.log("MonHelp#getOrderTotalDiscountRow: ERR");
      } //build and store purchaseRows for use in thankyou page


      cartRows.forEach(function (cartRow) {
        purchaseRows.push(MonetateHelper.buildAddPurchaseRow(oID, cartRow.productId, cartRow.quantity, cartRow.unitPrice, cartRow.currency, cartRow.sku));
      });
      sessionStorage.setItem('_' + oID + '_purch_rows', JSON.stringify(purchaseRows));
      monetateFiller.cartRows = cartRows;
      return cartRows;
    };

    var monetatePageScan = function monetatePageScan(isPageView) {
    //OPSMD-5195 : variable name is missing
	  var searchTerm = '';
	  if (isPageView === false) {
        monetateFiller.isPageView = false;
      }
      if ('HomePage' === $('meta[name="pageIdentifier"]').attr('content')) {
        monetateFiller.onHomePage(); //BET funnel
      } else if ($(location).attr('pathname').indexOf('AppointmentChooseStore') > -1 || $(location).attr('pathname').indexOf('book-an-eye-test') > -1) {
        monetateFiller.onChooseStore();
      } else if ($(location).attr('pathname').indexOf('AppointmentDetails') > -1) {
        monetateFiller.onBookingBET();
      } else if ($('.eye-test-confirm--summary .row.eye-test-confirm--summary-list').length) {
        monetateFiller.onAptConfirmBET(); //END BET funnel
        //CHECKOUT FUNNEL
      } else if ($('#cartpage').length) {
        monetateFiller.onCartPage();
      } else if ($('#checkout-order-billing-shipping').length) {
        monetateFiller.onShippingAndBilling();
      } else if ($('#main.checkout-confirmation').length) {
        var orderID = $('#analyticsCheckoutOrderId').val() || '';

        var _purchaseRows = void 0;

        if (sessionStorage.getItem('_' + orderID + '_purch_rows') !== null) {
          _purchaseRows = $.parseJSON(sessionStorage.getItem('_' + orderID + '_purch_rows'));
        }

        _purchaseRows = _purchaseRows || [];

        if (orderID) {
          MonetateHelper.clearSessionStorage();
        }

        monetateFiller.onCheckoutThankYou(_purchaseRows); //END CHECKOUT FUNNEL
        //PLP search results page
      } else if ($('input#analyticsSearchRecordSetTotal').length) {
        //			facetsAndSearchTerm = $('input#teliumFacetListVal').val().split('|');
    	  if (WCParamJS && WCParamJS.searchTerm) {
          searchTerm = 'searchTerm=' + WCParamJS.searchTerm;
        }

        searchTerm = searchTerm || '';
        var facetsAndSearchTerm = [];
        facetsAndSearchTerm.push(searchTerm);
        monetateFiller.onSearchPLP(buildProductsPLP(), facetsAndSearchTerm); //PLP brand w/o category
      } else if ($('input#analyticsManufacturer').val() && !$('input#topCategoryName').val()) {
        var brand = $('input#analyticsManufacturer').val(); //			facets = $('input#teliumFacetListVal').val().split('|');
        //todo facet/cookies -> categories

        var facets = [];
        facets.push(brand);
        monetateFiller.onBrandPagePLP(brand, buildProductsPLP(), facets); //PLP category
      } else if ($('input#topCategoryName').val()) {
        var topCat = $('input#topCategoryName').val();
        var childCat = $('input#categoryName').val() || '';

        var _brand = $('input#analyticsManufacturer').val() || ''; //build array to pass additional info


        var categories = [];
        categories.push(topCat, childCat, _brand); //			facets = $('input#teliumFacetListVal').val().split('|');
        //			categories = categories.concat(facets);
        //todo facet/cookies -> categories
        //uncommet to enable distinct pages
        //			if(topCat.replace(/[^a-zA-Z]/g, '').match(/^contactlenses$/i)){
        //				monetateFiller.onPLP(buildProductsPLP(), 'index', categories);
        //			} else if(topCat.replace(/[^a-zA-Z]/g, '').match(/(^glasses$|^frames$)/i)){
        //				monetateFiller.onPLP(buildProductsPLP(), 'index', categories);
        //			} else if(topCat.replace(/[^a-zA-Z]/g, '').match(/(^sunglasses$)/i)){
        //				monetateFiller.onPLP(buildProductsPLP(), 'index', categories);
        //			} else if(topCat.replace(/[^a-zA-Z]/g, '').match(/^accessories[a-zA-Z]*contactlenses$/i)){
        //				monetateFiller.onPLP(buildProductsPLP(), 'index', categories);
        //			} 
        //gift-card PLP is disabled

        monetateFiller.onPLP(buildProductsPLP(), 'category', categories); //other PLPs (eg /sales)
      } else if (typeof $('input#analyticsPLPTotal').val() !== 'undefined') {
        monetateFiller.onPLP(buildProductsPLP(), 'category'); //PDP
      } else if ($('meta[property="og:type"]').length && $('meta[property="og:type"]').attr('content') === 'product') {
        //topCategory = $('#analyticsPDPCategory').val() || '';  //$('#analyticsPDPSection1').val()
        var upc = $('#analyticsPDPUpc').val() || $('button.product--favourite').data('analytics-sku') || '';
        upc = String(upc).replace(/_000$/, ''); //offerPrice = $('#analyticsPDPOfferPrice').val() || '';
        //fullPrice = $('#analyticsPDPFullPrice').val() || '';
        //$('#modelName').val() //$500 //$('#analyticsPDPName')

        monetateFiller.onPDP(upc, 'product'
        /*,categories*/
        );
      } else {
        monetateFiller.onPage('landing');
      }
    }; //	headerCartObserver.observe(targetNode, config);


    var retrack = function retrack() {
      getCartAjax();
      monetatePageScan(false);
    };

    var MonetateHelper = function () {
      function MonetateHelper() {
        _classCallCheck(this, MonetateHelper);
      }

      _createClass(MonetateHelper, null, [{
        key: 'setIdString',

        /*
         * string is a JavaScript typeof string that cannot be empty.
         * idString is a string with no spaces.
         * pidString is an idString less than 33 characters long.
         * quantityString is an idString made up of numbers only. The number must be greater than zero and less than one billion.
         * priceString is an idString made up of any amount of numbers followed by an optional period and by one or two optional numbers.
         * currencyString is an idString that must adhere to the ISO 4217 format (three capital letters and no spaces).
         */
        value: function setIdString(theString) {
          theString = theString || '';
          return String(theString).replace(/ /g, '');
        }
      }, {
        key: 'setPidString',
        value: function setPidString(theString) {
          theString = theString || '';
          theString = String(theString).replace(/ /g, ''); //check and shorten

          var exceed = theString.length - 32;

          if (exceed > 0) {
            var replace = '~';
            var initPos = Math.floor(theString.length / 2) - 1 - Math.ceil(replace.length / 2);
            var endPos = initPos + replace.length + exceed;
            theString = theString.substring(0, initPos) + replace + theString.substring(endPos);
          }

          return theString;
        }
      }, {
        key: 'setQuantity',
        value: function setQuantity(quantity) {
          quantity = quantity || 0;

          try {
            return String(parseInt(quantity));
          } catch (e) {
            return quantity;
          }
        }
      }, {
        key: 'setUnitPrice',
        value: function setUnitPrice(unitPrice) {
          unitPrice = unitPrice || '0.00';

          try {
            return String(parseFloat(unitPrice).toFixed(2));
          } catch (e) {
            console.log("MonHelp#setUnitPrice: ERR", unitPrice);
            return unitPrice;
          }
        }
      }, {
        key: 'setCurrency',
        value: function setCurrency(currency) {
          currency = currency || currencyCode || '';
          return String(currency).toUpperCase();
        }
      }, {
        key: 'normalizeProdutDetailsElement',
        value: function normalizeProdutDetailsElement(productDetails, index) {
          if (productDetails === Object(productDetails)) {
            if (productDetails.productId) {
              //added to uniform pId for CL to non generic_skus
              productDetails.productId = String(productDetails.productId).replace(/_000$/, '');
              this[index].productId = MonetateHelper.setPidString(productDetails.productId);
            }

            if (productDetails.sku) {
              this[index].sku = MonetateHelper.setPidString(productDetails.sku);
            }
          } else {
            //added to uniform pId for CL to non generic_skus
            productDetails = String(productDetails).replace(/_000$/, '');
            this[index] = MonetateHelper.setPidString(productDetails);
          }
        }
      }, {
        key: 'buildAddCartRow',
        value: function buildAddCartRow(productId, quantity, unitPrice, currency, sku) {
          if (!productId || typeof quantity === 'undefined' || typeof unitPrice === 'undefined' || typeof currency === 'undefined') {
            console.log("MonHelp#buildAddCartRow: ERR", productId, quantity, unitPrice, currency);
            return {};
          } //added to uniform pId for CL to non generic_skus


          productId = String(productId).replace(/_000$/, '');
          var addCartRow = {}; //required

          addCartRow.productId = MonetateHelper.setPidString(productId); //pidString

          addCartRow.quantity = MonetateHelper.setQuantity(quantity);
          addCartRow.unitPrice = MonetateHelper.setUnitPrice(unitPrice); //optional

          addCartRow.currency = MonetateHelper.setCurrency(currency);

          if (sku) {
            addCartRow.sku = MonetateHelper.setPidString(sku); //pidString
          }

          return addCartRow;
        }
      }, {
        key: 'buildAddPurchaseRow',
        value: function buildAddPurchaseRow(purchaseId, productId, quantity, unitPrice, currency, sku) {
          if (!purchaseId) {
            console.log("MonHelp#buildAddPurchaseRow: ERR", purchaseId);
            return {};
          }

          var addProductDetails = MonetateHelper.buildAddCartRow(productId, quantity, unitPrice, currency, sku);

          if (JSON.stringify(addProductDetails) === JSON.stringify({})) {
            console.log("MonHelp#buildAddPurchaseRow: ERR");
            return {};
          }

          addProductDetails.purchaseId = purchaseId;
          return addProductDetails;
        }
      }, {
        key: 'arrayRemoveSpacesEmptiesAndDuplicates',
        value: function arrayRemoveSpacesEmptiesAndDuplicates(array) {
          var uniques = [];

          if (Object.prototype.toString.call(array) === '[object Array]') {
            array.forEach(function (cat, idx) {
              this[idx] = String(cat).replace(/ /g, '');
            }, array);
            array = array.filter(function (i) {
              return String(i).length > 0;
            });
            $.each(array, function (i, el) {
              if ($.inArray(el, uniques) === -1) uniques.push(el);
            });
          }

          return uniques;
        }
      }, {
        key: 'prepareCategories',
        value: function prepareCategories(arrayCat) {
          return MonetateHelper.arrayRemoveSpacesEmptiesAndDuplicates(arrayCat);
        }
      }, {
        key: 'prepareProducList',
        value: function prepareProducList(productListArr) {
          productListArr.forEach(function (prd, idx) {
            //added to uniform pId for CL to non generic_skus
            prd = String(prd).replace(/_000$/, '');
            this[idx] = MonetateHelper.setPidString(prd);
          }, productListArr);
          productListArr = MonetateHelper.arrayRemoveSpacesEmptiesAndDuplicates(productListArr);
          return productListArr;
        }
      }, {
        key: 'clearSessionStorage',
        value: function clearSessionStorage() {
          var n = sessionStorage.length;

          while (n--) {
            var key = sessionStorage.key(n);

            if (/_purch_rows/.test(key)) {
              sessionStorage.removeItem(key);
            }
          }
        }
      }]);

      return MonetateHelper;
    }(); //init


    window.monetateQ = window.monetateQ || [];
    /* Inner APIs */

    var monetateFiller = {
      cartRows: [],
      isPageView: true,

      /* BASE METHODS */
      //			initMonetate: function(){ 
      //				window.monetateQ = window.monetateQ || [];
      //			},
      setPageType: function setPageType(pageType) {
        if (pageType) {
          //idString
          window.monetateQ.push(["setPageType", MonetateHelper.setIdString(pageType).toLowerCase()]);
        }
      },
      setCategories: function setCategories(categories) {
        categories = MonetateHelper.prepareCategories(categories);
        window.monetateQ.push(["addCategories", categories]);
      },
      sendMonetate: function sendMonetate(isPushCart) {
        //act only if false
        isPushCart = isPushCart || true;

        if (String(isPushCart) === 'true') {
          this.pushCart();
        }

        if (this.isPageView) {
          window.monetateQ.push(["trackData"]);
        } else {
          window.monetateQ.push(["trackData", {
            "nonPageView": true
          }]);
        }
      },
      pushCart: function pushCart() {
        window.monetateQ.push(["addCartRows", this.cartRows]);
      },
      onPage: function onPage(pageType, categories, isPushCart) {
        if (!pageType) {
          return;
        }

        window.monetateQ = window.monetateQ || [];
        this.setPageType(String(pageType));
        this.setCategories(categories);
        this.sendMonetate(isPushCart); //isPushCart def TRUE
      },
      onPLP: function onPLP(productList, pageType, categories, isPushCart) {
        //				if (!pageType) { return; }
        if (Object.prototype.toString.call(productList) !== '[object Array]') {
          productList = [];
        }

        productList = MonetateHelper.prepareProducList(productList);
        window.monetateQ.push(["addProducts", productList]);
        this.onPage(pageType, categories, isPushCart); //isPushCart def TRUE);
      },

      /* PAGE SPECIFIC EVENTS */
      onHomePage: function onHomePage(categories, isPushCart) {
        this.onPage("home", categories, isPushCart);
      },
      onChooseStore: function onChooseStore(categories, isPushCart) {
        categories = categories || [];
        categories.push('aptChooseStore');
        this.onPage("bet", categories, isPushCart);
      },
      onChooseBET: function onChooseBET(categories, isPushCart) {
        categories = categories || [];
        categories.push('aptCalendar');
        this.onPage("bet", categories, isPushCart);
      },
      onBookingBET: function onBookingBET(categories, isPushCart) {
        categories = categories || [];
        categories.push('aptBooking');
        this.onPage("bet", categories, isPushCart);
      },
      onAptConfirmBET: function onAptConfirmBET(categories, isPushCart) {
        categories = categories || [];
        categories.push('aptConfirmation');
        this.onPage("bet", categories, isPushCart);
      },
      onCartPage: function onCartPage(categories, isPushCart) {
        this.onPage("cart", categories, isPushCart);
      },
      onShippingAndBilling: function onShippingAndBilling(categories, isPushCart) {
        this.onPage("checkout", categories, isPushCart);
      },
      //if needed 
      //			onPayOrder: function(){
      //				
      //			},
      onCheckoutThankYou: function onCheckoutThankYou(addPurchaseRows, categories, isPushCart) {
        if (Object.prototype.toString.call(addPurchaseRows) !== '[object Array]') {
          addPurchaseRows = [];
        } //TODO add check method


        window.monetateQ.push(["addPurchaseRows", addPurchaseRows]);
        this.onPage("checkout", categories, isPushCart); //monetate best practice purchase
      },
      onSearchPLP: function onSearchPLP(productList, categories, isPushCart) {
        this.onPLP(productList, 'search', categories, isPushCart);
      },
      onBrandPagePLP: function onBrandPagePLP(brand, productList, categories, isPushCart) {
        brand = brand || 'unk';
        categories = categories || [];
        categories.push(brand); //				this.onPLP(productList, `index-${brand}`, categories, isPushCart);

        this.onPLP(productList, 'category', categories, isPushCart);
      },
      //			onSunglassesPLP: function(productList, categories, isPushCart){
      //				
      //			},
      //			onGlassesPLP: function(productList, categories, isPushCart){
      //				
      //			},
      //			onContactsPLP: function(productList, categories, isPushCart){ 
      //				
      //			},
      //			onCLAccessoriesPLP: function(productList, categories, isPushCart){ 
      //				
      //			},
      onPDP: function onPDP(productDetails, pageType, categories, isPushCart) {
        //productDetails: ["pidString", "pidString", "pidString"]
        //productDetails: [{productId: "pidString", sku: "skuString"},{productId: "pidString", sku: "skuString"}]
        if (!productDetails) {
          productDetails = [];
        }

        pageType = pageType || 'product';

        if (Object.prototype.toString.call(productDetails) !== '[object Array]') {
          productDetails = [String(productDetails)];
        }

        productDetails.forEach(MonetateHelper.normalizeProdutDetailsElement, productDetails);
        productDetails = MonetateHelper.arrayRemoveSpacesEmptiesAndDuplicates(productDetails);
        window.monetateQ.push(["addProductDetails", productDetails]);
        this.onPage(pageType, categories, isPushCart); //isPushCart def TRUE);
      }
    };

    var AjaxDocChangedObs = function () {
      function AjaxDocChangedObs(mutationType, callback) {
        _classCallCheck(this, AjaxDocChangedObs);

        MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
        this.elementObserver = new MutationObserver(function (mutationList, observer) {
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = mutationList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var mutation = _step.value;

              if (mutation.type === mutationType && mutation.removedNodes.length) {
                callback.apply();
              } //	        else if (mutation.type === 'attributes') {
              //	            //console.log('The ' + mutation.attributeName + ' attribute was modified.');
              //	        }

            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }
        });
      } // define what element should be observed by the observer
      // and what types of mutations trigger the callback


      _createClass(AjaxDocChangedObs, [{
        key: 'observe',
        value: function observe(targetNodeId, config) {
          var targetNode = document.getElementById(targetNodeId);
          this.elementObserver.observe(targetNode, config);
        }
      }]);

      return AjaxDocChangedObs;
    }();

    getCartAjax();
    $(document).ready(function () {
      //add listener for cart changes
      if ($('#btn-cart').length) {
        var cartChangeObserver = new AjaxDocChangedObs('childList', retrack);
        cartChangeObserver.observe('btn-cart', {
          characterData: false,
          attributes: false,
          childList: true,
          subtree: true
        });
      } //add listener for PLPs item-list changes


      if ($('#products-listing-list').length) {
        var PLPChangeObserver = new AjaxDocChangedObs('childList', retrack); //same configs are valid here

        PLPChangeObserver.observe('products-listing-list', {
          characterData: false,
          attributes: false,
          childList: true,
          subtree: false
        });
      } //start page scan on ready


      monetatePageScan();
    });
  }
})(window, document, jQuery, opsm);