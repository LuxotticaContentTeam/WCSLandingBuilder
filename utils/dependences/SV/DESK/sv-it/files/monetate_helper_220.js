MonetateHelper = {
		
	pushTrackData : function() {
		 window.monetateQ.push(["trackData"]);
	},

    setPage : function(){
        window.monetateQ = window.monetateQ || [];
        let pageType = $('.monetate-page-type').val();
        if(!pageType || pageType.length == 0){
        	pageType = 'unavailable';
        }
        window.monetateQ.push(["setPageType",pageType]);
    },

    addProducts : function(type = 'all'){
        // addProducts Example:  products -> [{"productId": "pidString1","sku": "optionalSkuString1"},...]
    	let products = [];
    	if(type == 'all' || type == 'plp'){
    		$('.single-prod:not(.d-none) .monetate-product').each(function(){
        	    let obj = JSON.parse($(this).val());
        	    products.push(MonetateHelper.normalize(obj));
        	});
    	}
    	if(type == 'all'){
	    	$('.single-product:not(.d-none) .monetate-product').each(function(){
	    	    let obj = JSON.parse($(this).val());
	    	    products.push(MonetateHelper.normalize(obj));
	    	});
    	}
    	
    	if(products.length == 0){
    		products = 'unavailable';
    	}
        window.monetateQ = window.monetateQ || [];
        window.monetateQ.push(["addProducts", products]);
    },
    
    addProductDetails: function(){
    	let products = [];
    	$('.monetate-product-detail').each(function(){
    	    let obj = JSON.parse($(this).val());
    	    products.push(MonetateHelper.normalize(obj));
    	});
    	if(products.length == 0){
    		products = 'unavailable';
    	}
        window.monetateQ = window.monetateQ || [];
        window.monetateQ.push(["addProductDetails", products]);
    },
    
    addCategories : function(){
    	// addCategories Example -> ["penguin", "pelican", "swan", "albatross"]
    	let categories =[];
    	$('.monetate-category').each(function(){
    	    categories.push($(this).val());
    	});
    	if(categories.length == 0){
    		categories = 'unavailable';
    	}
    	window.monetateQ = window.monetateQ || [];
    	window.monetateQ.push(["addCategories", categories]);
    },
    
    addBreadcrumbs : function(){
    	// addBreadcrumbs Example -> ["home", "science", "animals"]
    	let breadcrumbs =[];
    	$('.monetate-breadcrumb').each(function(){
    		breadcrumbs.push($(this).val());
    	});
    	if(breadcrumbs.length == 0){
    		breadcrumbs = 'unavailable';
    	}
    	window.monetateQ = window.monetateQ || [];
    	window.monetateQ.push(["addBreadcrumbs", breadcrumbs]);
    },
    
    addCartRows : function(){
    	let cartRows = [];
    	$('.monetate-cart-row').each(function(){
    		let obj = JSON.parse($(this).val());
    		cartRows.push(MonetateHelper.normalize(obj));
    	});
    	if(cartRows.length == 0){
    		cartRows = 'unavailable';
    	}

    	window.monetateQ = window.monetateQ || [];
    	window.monetateQ.push(["addCartRows", cartRows]);
    },

    addPurchaseRows : function(){
        let purchaseRows = [];
        $('.monetate-purchase-row').each(function(){
            let obj = JSON.parse($(this).val());
            purchaseRows.push(MonetateHelper.normalize(obj));
        });
        if(purchaseRows.length == 0){
            purchaseRows = 'unavailable';
        }

        window.monetateQ = window.monetateQ || [];
        window.monetateQ.push(["addPurchaseRows", purchaseRows]);
    },

    reTrack : function(productType = 'all') {
        MonetateHelper.setPage();
        MonetateHelper.addProducts(productType);
        MonetateHelper.addProductDetails();
        MonetateHelper.addCategories();
        MonetateHelper.addBreadcrumbs();
        MonetateHelper.addCartRows();
        MonetateHelper.addPurchaseRows();
        MonetateHelper.pushTrackData();
    },
    
    normalize32Char : function(toNormalize){
    	if(toNormalize.length > 0){
    		return toNormalize.replace(' ','').substring(0,32);
    	}
    	return toNormalize;
    },
    
    normalize : function(obj){
    	if(Object.prototype.toString.call(obj) === "[object Object]"){
    		$.each( obj, function(key, val){
    		    obj[key] = MonetateHelper.normalize32Char(val);
    		    switch(key){
    		    	case 'quantity':
    		    		obj[key] = Number(obj[key]).toFixed(0);
    		    		break;
    		    	case 'unitPrice':
    		    		obj[key] = Number(obj[key]).toFixed(2);
    		    		break;
    		    }
    		});
    	}
    	return obj;
    }
    
    

}