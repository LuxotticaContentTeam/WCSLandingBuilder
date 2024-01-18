var _dl = {};

function isUserAuthenticated(){
	var isAuthenticated = "not authenticated";
	if (constants.ajaxParams['loggedIn']){
		var match = document.cookie.match('WC_USERACTIVITY_');
		if(match != null){
			isAuthenticated = "authenticated";
		}
	}
	return isAuthenticated;
}
 
function getUserRegistrationStatus(){
	var isRegistered = 'undefined';
	if (constants.ajaxParams['loggedIn']){
		var match = document.cookie.match('WC_USERACTIVITY_');
		if(match != null){
			isRegistered = "registered";
		}
		else
			isRegistered = "not registered";
	}
	else {
		isRegistered = "not registered";
	}
	return isRegistered;
}

function getBasicDLObject(){
	_dl = {
			authentication_status : '',
			registration_status : '',		
			country: 'us',
			page_layout: "mobile",
			language: 'en',
			
		};
	_dl.site_events = {};
	_dl.authentication_status = isUserAuthenticated();
	_dl.registration_status = getUserRegistrationStatus();
	return _dl
}

function callTrackAnalytics(_data){
	try {
		console.log('Before event is fired.');
		var _dataCopy = $.extend(true, {}, _data);
		_trackAnalytics(_dataCopy);
		console.log('After event is fired.');
		} catch(err) {
			console.log('error');
		}
}

function fillProductDL(json){
	_dl.products=[];

	var glass = {};
	glass.price = {};
	/*glass.discounts = {};
	var orderItemCount = $('#tah-quantity-header').text().trim();
	
	//glass.id = productObj.id;
	glass.price.regular_unit_price = parseFloat($('.price-value span').text().replace('$','').trim()).toString();
	glass.price.current_unit_price = parseFloat($('.price-value span').text().replace('$','').trim()).toString();
	if($('.listPrice').length > 0){
		glass.price.regular_unit_price = $('.listPrice').text().replace('$','').trim();
		glass.price.unit_price_point = "sale";
	}else{
		glass.price.unit_price_point = "regular";
	}
	glass.category = $.trim(productObj.category).toLowerCase();
	glass.brand = $.trim(productObj.brand).toLowerCase();
	glass.frame_fit = $.trim(productObj.frame_fit).toLowerCase();
	glass.frame_shape = $.trim(productObj.frame_shape).toLowerCase();
	glass.model = $.trim(productObj.model).toLowerCase();
	glass.face_shape = ''+$.trim(($($(".face-shapes-list").find('li:not(".disabled") > span')).map(function() {return $.trim($(this).attr('aria-label')) }).get()).join(',')) +'';
	glass.color = $.trim(productObj.color).toLowerCase();
	glass.material = $.trim(productObj.material).toLowerCase();
	if($(".bv-rating span").text() != '')
		glass.rating = $(".bv-rating span").text();
	glass.product_available_online = productObj.product_available_online;
	//glass.eye_wear_protection = "";
	glass.product_lens_type_available = [];
	glass.product_lens_tint_available = [];
	
	if(json != undefined){
		$.each(json.lens_categories, function(i, categ) {
			glass.product_lens_type_available.push(categ.name);
			$.each(categ.lenses, function(y, lens) {
				var stringColor="";
				if(categ.name.toUpperCase() == 'SUN'){
					$.each(lens.skus, function(z, skus) {
						if(jQuery.inArray(skus.color, glass.product_lens_tint_available) == -1)
							glass.product_lens_tint_available.push(skus.color);
					});
	   			}
			});
		});
	}*/
	
	
	_dl.products.push(glass);
		
}

function fillLensInfo(lensEl){
	lens = {};
	_dl.products[0].applied_lenses = [];
	lens.id = ''+$(lensEl).data("lensid");
	lens.price = {};
	lens.price.regular_unit_price = ''+$(lensEl).data("listprice");
	if($($(lensEl).data("offerprice")).length > 0){
		lens.price.current_unit_price = ''+ parseInt($(lensEl).data("listprice")) - parseInt($(lensEl).data("offerprice")); 
		lens.price.unit_price_point = "sale";
	}else{
		lens.price.unit_price_point = "regular";
	}
        	
  	lens.category = $(lensEl).data("category");
  	lens.tint = "";
  	_dl.products[0].applied_lenses.push(lens);   
  	    
}

function trackApplyLensToFrame(pdpLensInfo, selectedLensId, selectedSkuId){
	
	var lens_sku_id = LC2.pdpUtils.getPropFromLensId(pdpLensInfo, 'lens_sku_id', selectedLensId, selectedSkuId);
    var color = LC2.pdpUtils.getPropFromLensId(pdpLensInfo, 'color', selectedLensId, selectedSkuId);
    var lens_sku_code = LC2.pdpUtils.getPropFromLensId(pdpLensInfo, 'lens_sku_code', selectedLensId, selectedSkuId);
   
    try{  
  	    var lens_saving = LC2.pdpUtils.getPropFromLensProduct(pdpLensInfo, 'saving', selectedLensId);
        var lens_listPrice = LC2.pdpUtils.getPropFromLensProduct(pdpLensInfo, 'list_price', selectedLensId);
        var lens_currentPrice = LC2.pdpUtils.getPropFromLensProduct(pdpLensInfo, 'current_price', selectedLensId);
        var lens_discounts = LC2.pdpUtils.getPropFromLensProduct(pdpLensInfo, 'discounts', selectedLensId);
  	  
	  	  _dl.products[0].applied_lenses = [];
	  	  var appliedLens = {};
	  	  _dl.products[0].applied_lenses.push(appliedLens);
	  	  appliedLens.id = lens_sku_code.toLowerCase();	
		  var pricePoint = 'regular';
		  appliedLens.discounts = [];
		  if(lens_saving != undefined && lens_saving > 0){
			  pricePoint = 'sale';
			  appliedLens.discounts = lens_discounts;
		  }else{
			  lens_listPrice = lens_currentPrice;
		  }
		  appliedLens.price = { 
		    regular_unit_price: lens_listPrice,
			current_unit_price: lens_currentPrice,
			unit_price_point: pricePoint 
		   };
		  //Analytics Framework
		  utag_data.Products[utag_data.product_id].Price = (parseFloat(utag_data.Products[utag_data.product_id].Price) + parseFloat(lens_currentPrice)).toFixed(2)+"";
		  //END Analytics Framework
		  appliedLens.category = (lens_sku_code == $('#planoCodeSku').val())? 'non-rx lens':'rx lens';
		  appliedLens.color = color.toLowerCase();
		  appliedLens.tint = color.toLowerCase();

	      _dl.site_events = {"add_lenses": "true"};
	      callTrackAnalytics(_dl);
    }catch (e) {
		console.log("error in apply lens: " + e.stack);
    }  
}
