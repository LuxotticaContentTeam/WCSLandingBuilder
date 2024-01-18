// OOC-3431 - GTM Implementation

/*Javascript file to trigger all the gtm call  */

function gtmBETChooseStoreTracking(zipPostCode){
	 dataLayer = [{
		 'event': 'choose-store',
		 'postcode': zipPostCode
		 }];
}

function gtmBETAppointmentDateTracking(date,block,store,postcode) {
	dataLayer.push({
		 'event': 'choose-date',
		 'date': date,
		 'block': block,
		 'store': store,
		 'postcode': postcode
		 });
}

function gtmBETChooseAppointmentTracking (store,postcode) {
	 dataLayer = [{
	 'event': 'choose-appointment',
	 'store': store,
	 'postcode': postcode,
	 'availability': 'yes'
	 }];
}

function gtmBETAppointmentDateTimeTracking(date,blockTime,time,storeName,postCode){
	dataLayer.push({
		 'event': 'choose-time',
		 'date': date,
		 'block': blockTime,
		 'store': storeName,
		 'time': time,
		 'postcode': postCode
		 });
}

function gtmCheckoutSectionOne(products) {
	var jsonProducts = JSON.parse(decodeURIComponent(products));
	dataLayer.push({
		'event': 'checkout',
		'ecommerce': {
			'checkout': { 'actionField': {'step': 2, 'option': 'Welcome'},
			'products': jsonProducts}
		}
	});
}

function gtmCheckoutSectionTwo(products) {
	var jsonProducts = JSON.parse(decodeURIComponent(products));
	dataLayer.push({
		'event': 'checkout',
		'ecommerce': {
			'checkout': { 'actionField': {'step': 3, 'option': 'Your Details'},
			'products': jsonProducts}
		}
	});
}

function gtmCheckoutSectionThree(products) {
	var jsonProducts = JSON.parse(decodeURIComponent(products));
	dataLayer.push({
		'event': 'checkout',
		'ecommerce': {
			'checkout': { 'actionField': {'step': 4, 'option': 'Contact Lenses'},
			'products': jsonProducts}
		}
	});
}

function gtmCheckoutSectionFour(products) {
	var jsonProducts = JSON.parse(decodeURIComponent(products));
	dataLayer.push({
		'event': 'checkout',
		'ecommerce': {
			'checkout': { 'actionField': {'step': 5, 'option': 'Review & Payment'},
			'products': jsonProducts}
		}
	});
}

function gtmAddToCart(manufacturerName, articleNumber, price, brand, category, variant, quantity, currency) {
	dataLayer.push({
		'event': 'addToCart',
		'ecommerce': {
			'currencyCode': ''+currency+'',
			'add': {
				'products': [{ 'name': ''+manufacturerName+'', 'id': ''+articleNumber+'', 'price': ''+price+'', 'brand': ''+brand+'', 'category': ''+category+'', 'variant': ''+variant+'', 'quantity': quantity
				}]
			}
		}
	});
}

function gtmRemoveProduct(manufacturerName, articleNumber, price, brand, category, variant, quantity) {
	dataLayer.push({
		'event': 'removeFromCart',
		'ecommerce': {
			'remove': {
				'products': [{ 'name': ''+manufacturerName+'', 'id': ''+articleNumber+'', 'price': ''+price+'', 'brand': ''+brand+'', 'category': ''+category+'', 'variant': ''+variant+'', 'quantity': quantity
				}]
			}
		}
	});
}

function gtmSearchProductClickImpression(product) {
	var productList = product.split(':');
    var productDetails = {};
     productDetails['name']=productList[0];
     productDetails['id']=productList[1];
     productDetails['price']=productList[2];
     productDetails['brand']=productList[3];
     productDetails['category']=productList[4];
     productDetails['variant']=productList[5];
     productDetails['list']=productList[6];
     productDetails['position']=productList[7];
      dataLayer.push({
            'event': 'productClick',
            'ecommerce': {
            'click': {
            'actionField': {'list': 'Search Results'},
            'products': [productDetails]
            }
            }
      });
}

function gtmShowMoreProducts(products) {
	if(countryCode == 'AU')
		currencyCode = 'AUD';
	else
		currencyCode = 'NZD';
	var jsonProducts = JSON.parse(decodeURIComponent(products));
	dataLayer.push({
		'ecommerce': {
			'currenyCode': currencyCode,
			'impressions': jsonProducts}
		});
	dataLayer.push({'event': 'showMoreProducts'});
}

function gtmProductClickImpression(product,obj,list) {
	dataLayer.push({
		 'event': 'productClick',
		 'ecommerce': {
		 'click': {
		 'actionField': {'list': list},
		 'products': [product]
		 }
		}
	});
	document.location = $(obj).attr('href');
}

function gtmProductView(manufacturerName, articleNumber, price, brand, category, variant, currency) {
	dataLayer.push({
	 'ecommerce': {
		 'detail': {
		 'actionField': {'list': 'Search Results'},
		 'products': [{ 'name': ''+manufacturerName+'', 'id': ''+articleNumber+'', 'price': ''+price+'', 'brand': ''+brand+'', 'category': ''+category+'', 'variant': ''+variant+'' 
		   }]
		 }
	   }
	});
}