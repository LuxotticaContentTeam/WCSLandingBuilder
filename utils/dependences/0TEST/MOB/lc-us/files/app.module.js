/*
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
});