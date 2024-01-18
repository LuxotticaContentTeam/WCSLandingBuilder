/*
This  file holds the auto complete implementation using jquery UI 1.10.0

Dependecny 
 <link rel="stylesheet" href="${jsAssetsDir}css/jquery-ui.css"></link>
  <script type="text/javascript" src="/wcsstore/OPSMStorefrontAssetStore/javascript/vendor/jquery-1.8.0.min.js"></script>
  <script type="text/javascript" src="/wcsstore/OPSMStorefrontAssetStore/javascript/vendor/jquery-ui-1.10.0.js"></script>
  
Make url as Ajax in wcf url so that proper http/https value is picked up
<wcf:url var="addressValidationResults" value="AddressValidationResultsView" type="Ajax"  >
           <wcf:param name="langId" value="${langId}" />
           <wcf:param name="storeId" value="${storeId}" />
           <wcf:param name="catalogId" value="${catalogId}" />
		</wcf:url>

sample call

$('#addressSuggest').autocomplete({
		    
  //fetch the address data
  source: getAddressData,
    
  // This function is executed when a suggestion is selected
  select: setSelectedValue,
  // This function is executed when the users focuses on a item with the mouse
  // or keyboard
  focus: setSelectedValue
   
}).data("uiAutocomplete")._renderItem = renderAddressValue;


*/


$(document).ready(function() {
	// Check for the addressSuggest field
	if($('input#addressSuggest').length){
		$('#addressSuggest').autocomplete({

			//fetch the address data
			source: getAddressData,

			// This function is executed when a suggestion is selected
			select: setSelectedValue,
			// This function is executed when the users focuses on a item with the mouse
			// or keyboard
			focus: setSelectedValue,
			
			open : function(){
				$(".ui-autocomplete:visible").css({top:"-=1"});
				$(".ui-autocomplete").css({"max-height":"14.5em","overflow-y":"auto"});
	    	}

		}).data("uiAutocomplete")._renderItem = renderAddressValue;
	}
	
	if($('#suburbSuggest-bet').length){
		
		$('#suburbSuggest-bet').autocomplete({
			
			//fetch the address data
			source: getAddressData,

			// This function is executed when a suggestion is selected
			select: setSelectedBetValue,
			// This function is executed when the users focuses on a item with the mouse
			// or keyboard
			focus: setSelectedBetValue,
			
			open : function(){
				
				$(".ui-autocomplete:visible").css({top:"-=1"});
				$(".ui-autocomplete").css({"max-height":"14.5em"});
				$(".ui-autocomplete").niceScroll({
					cursoropacitymax: 0
				});
			}

		}).data("uiAutocomplete")._renderItem = renderBETAddressValue;
	}
	
	if($('#addressSuggest-bet').length){
		$('#addressSuggest-bet').autocomplete({

			//fetch the address data
			source: getAddressData,

			// This function is executed when a suggestion is selected
			select: setSelectedCheckoutValue,
			// This function is executed when the users focuses on a item with the mouse
			// or keyboard
			focus: setSelectedCheckoutValue,
			
			open : function(){
				$(".ui-autocomplete:visible").css({top:"-=1"});
				$(".ui-autocomplete").css({"max-height":"14.5em","overflow-y":"auto"});
	    	}

		}).data("uiAutocomplete")._renderItem = rendeCheckoutAddressValue;
	}
	
	if($('#billingAddressSuggest').length){
		$('#billingAddressSuggest').autocomplete({

			//fetch the address data
			source: getAddressDataBilling,

			// This function is executed when a suggestion is selected
			select: setSelectedBillingValue,
			// This function is executed when the users focuses on a item with the mouse
			// or keyboard
			focus: setSelectedBillingValue,
			
			open : function(){
				$(".ui-autocomplete:visible").css({top:"-=1"});
				$(".ui-autocomplete").css({"max-height":"14.5em","overflow-y":"auto"});
	    	}

		}).data("uiAutocomplete")._renderItem = rendeCheckoutAddressValue;
	}
	
	
	var autoComplete = $('input#addressSuggest1').val();
	if(typeof(autoComplete) != "undefined"){
		$('#addressSuggest1').autocomplete({
			
			//fetch the address data
			source: getAddressDataBilling,

			// This function is executed when a suggestion is selected
			select: setSelectedValue,
			// This function is executed when the users focuses on a item with the mouse
			// or keyboard
			focus: setSelectedValue,
			
			open : function(){
				$(".ui-autocomplete:visible").css({top:"-=1"});
				$(".ui-autocomplete").css({"max-height":"14.5em","overflow-y":"auto"});
	    	}

		}).data("uiAutocomplete")._renderItem = renderAddressValue;
	}
	if($('#addressSuggest-shipping').length){
		$('#addressSuggest-shipping').autocomplete({

			//fetch the address data
			source: getAddressData,

			// This function is executed when a suggestion is selected
			select: setSelectedValue,
			// This function is executed when the users focuses on a item with the mouse
			// or keyboard
			focus: setSelectedValue,
			
			open : function(){
				$(".ui-autocomplete:visible").css({top:"-=1"});
				$(".ui-autocomplete").css({"max-height":"14.5em","overflow-y":"auto"});
	    	}

		}).data("uiAutocomplete")._renderItem = renderAddressValue;
	}
	
	if($('input#addressSuggest-billing').length){
		$('#addressSuggest-billing').autocomplete({
			
			//fetch the address data
			source: getAddressDataBilling,

			// This function is executed when a suggestion is selected
			select: setSelectedValue,
			// This function is executed when the users focuses on a item with the mouse
			// or keyboard
			focus: setSelectedValue,
			
			open : function(){
				$(".ui-autocomplete:visible").css({top:"-=1"});
				$(".ui-autocomplete").css({"max-height":"14.5em","overflow-y":"auto"});
	    	}

		}).data("uiAutocomplete")._renderItem = renderAddressValue;
	}
	
	
		
});

/* THESE ARE SHARED METHODS useb by:
 * 
 * add a new address
 * BET
 * checkout
 * ....
*/
var addressSuggestionList = new Array();

/* Fetches the response  JSON  via Ajax call 
 * Make sure you declare the url as ajax time to get away from http/https issues
 * You can set type="Ajax" in wcf:url
 * */
function getAddressData(request, response){
	
	var addressValidationResults = "";  
	
   	addressValidationResults = $('#addressValidationResults').val()+'&term='+request.term;
  
    //Get the ajax url
   
	if($('#addressValidationResults').length >0){
		var deviceWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;            
        if(deviceWidth <= 500 && $('#addressSuggest-bet').length && $('#addressSuggest-bet').val().length < 3) {                                                      
             return;
        }
        if(deviceWidth <= 500 && $('#suburbSuggest-bet').length && $('#suburbSuggest-bet').val().length < 3) {                                                      
            return;
       }
       
		$.ajax({
            type: "POST",
            url: addressValidationResults,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
				response(data);
            },
            error: function (data) {
            	response(data);
            	//hide the ul completely
            	$('.ui-autocomplete').hide();
            }
        });
	}
}
function getAddressDataBilling(request, response){
	
	var addressValidationResults = "";     //${countryCode}
	var selectedCountryCode =$('#countryAddressSuggest').val();
   if(selectedCountryCode == 'AU' || selectedCountryCode == 'NZ'){
	   addressValidationResults = $('#addressValidationResults').val()+'&term='+request.term+'&selectedCountryCode='+selectedCountryCode;
    }else{
    	addressValidationResults = $('#addressValidationResults').val()+'&term='+request.term;
    }
	//Get the ajax url
	if($('#addressValidationResults').length >0){
	
		$.ajax({
            type: "POST",
            url: addressValidationResults,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
				response(data);
            },
            error: function (data) {
            	response(data);
            	//hide the ul completely
            	$('.ui-autocomplete').hide();
            }
        });
	
	}
	
}

/* sets the selected  to the text box*/
function setSelectedValue(event, ui) {
    // Sets the text of the input textbox to the title of the object referenced
    // by the selected list item
    $(this).val(ui.item.value);

   //update  city,state  and address
    var addressParts = ui.item.value.split(",");
    if(addressParts != undefined && addressParts.length == 3){
    	if($('#city').length > 0){
    		$('#city').val($.trim(addressParts[0]));
    	}
    	if($('#state').length > 0){
    		$('#state').val($.trim(addressParts[1]));
    	}
    	if($('#zipCode').length > 0){
    		$('#zipCode').val($.trim(addressParts[2]));
    	}
    	
    }
    return false;
  }

//used by myaccount - add an address, update
function setSelectedAccountValue(event, ui) {
    // Sets the text of the input textbox to the title of the object referenced
    // by the selected list item
	$this = $(this);

	//update  city,state  and address
	//NZ: "Helensville, AUK, 0875, Auckland"
	//AU: "Barangaroo, NSW, 2000, city"
    var addressParts = ui.item.value.split(",");
    var countryCode = $("#countryCode").val();
    if(addressParts != undefined && (addressParts.length == 3 || addressParts.length == 4)){
    	var suburb = $.trim(addressParts[0]);
        var state = $.trim(addressParts[1]);
        var postcode = $.trim(addressParts[2]);
        
        //don't know why it is resetted, hence storing the text to show
        $(event.target).data("futureVal", suburb);
    	if($('#city').length > 0){
    		$('#city').val($.trim(suburb));
    		//input to div to prevent browsers' autocomplete
    		opsm.utils.setContent($('#addressSuggest-Account'), suburb);
    	}
    	if($('#complete-details').length >0 ){
    		//don't know why it is resetted
    		opsm.utils.setContent($('#addressSuggest-AccountDiv'), suburb);
    		$('input#addressSuggest-Send').val($.trim(ui.item.label));
    	}
    	if($('#fromCheckout').length >0 ){
    		$('#addressSuggest_state').val($.trim(state));
    	}
    	else{
	      	if($('#state').length > 0){
	      		$('#state').val($.trim(state));
	      		if(countryCode == 'AU')
	      			$('#addressSuggest_state').val($.trim(state));
	      		else
	      			$("#addressSuggest_state").val($.trim(state));
	      		}
    	}

    	if($('#zipCode').length > 0){
    			$('#zipCode').val($.trim(postcode));
        		$('#addressSuggest_postcode').val($.trim(postcode));
    	}
    }
    return false;
  }

//used by registration - complete profile
function setSelectedCompleteRgstValue(event, ui) {
	setSelectedAccountValue(event, ui);
  }

  
 /* render the address list with all values.
  * WARN state should be not rendered for NZ ??? */
  function renderAddressValue(ul, item) {
	  // ul is the unordered suggestion list
	  // item is a object in the data object that was send to the response function
	  // after the JSON request
	  // We append a custom formatted list item to the suggestion list
	  // The search term is bolded out
	 
	  var result = ul;
	  if(item != undefined && item.term != undefined ){
		  ul.show();
		  var termPosn = item.value.indexOf(item.term);
		  var countryCode = $("#countryCode").val();
		  var itemDisplayString =""
		  //Splitting the address to remove the city from the display string
	  	   if(termPosn != -1){
				  var split = item.value.split(",");
				  /*itemDisplayString = "<a>" + item.value.substring(0,termPosn) + "<b>" + item.term + "</b>" 
				  + item.value.substring(termPosn + item.term.length ) + "</a>";*/
				  
				  itemDisplayString = "<a>" + item.value.substring(0,termPosn) + "<b>" + item.term + "</b>"
				  itemDisplayString = itemDisplayString + item.value.substring(termPosn + item.term.length ) + "</a>";
				  if(countryCode == 'AU'){
					  var itemDisplayStringSplit = itemDisplayString.split(",");
					  itemDisplayString = itemDisplayStringSplit[0]+","+itemDisplayStringSplit[1]+","+itemDisplayStringSplit[2];
					  item.value = split[0]+","+split[1]+","+split[2];
				  }
				  if(countryCode == 'NZ'){
					  var itemDisplayStringSplit = itemDisplayString.split(",");
					  itemDisplayString = itemDisplayStringSplit[0]+","+itemDisplayStringSplit[1]+","+itemDisplayStringSplit[2];
					  item.value = split[0]+","+split[1]+","+split[2];
				  }
			  }

		  //Store the last suggestion list for validation
		  addressSuggestionList.push(item.value);
		  result = $("<li></li>").data("ui-autocomplete-item", item).append(
				  itemDisplayString).appendTo(ul);
	  }
	  return result;
  }
  
  /* render the address list */
  function renderBETAddressValue(ul, item) {
	  // ul is the unordered suggestion list
	  // item is a object in the data object that was send to the response function
	  // after the JSON request
	  // We append a custom formatted list item to the suggestion list
	  // The search term is bolded out
	
	  var result = ul;
	  if(item != undefined && item.term != undefined ){
		  ul.show();
		  var termPosn = item.value.indexOf(item.term);
		  var countryCode = $("#searchCountryCode").val();
		
		  var itemDisplayString =""
		  //Splitting the address to remove the city from the display string
			  if(termPosn != -1){
				  var split = item.value.split(",");
				  /*itemDisplayString = "<a>" + item.value.substring(0,termPosn) + "<b>" + item.term + "</b>" 
				  + item.value.substring(termPosn + item.term.length ) + "</a>";*/
				  itemDisplayString = "<a>" + item.value.substring(0,termPosn) + "<b>" + item.term + "</b>"
				  itemDisplayString = itemDisplayString + item.value.substring(termPosn + item.term.length ) + "</a>";
				  if(countryCode == 'AU'){
					  var itemDisplayStringSplit = itemDisplayString.split(",");
					  itemDisplayString = itemDisplayStringSplit[0]+","+itemDisplayStringSplit[1]+","+itemDisplayStringSplit[2];
					  item.value = split[0]+","+split[1]+","+split[2];
				  }
				  if(countryCode == 'NZ'){
					  var replaceString = split[1];
					  if(!($('#fromCheckout').length >0) ){
						  itemDisplayString = itemDisplayString.replace(replaceString,split[3]);
					  }
					  var itemDisplayStringSplit = itemDisplayString.split(",");
					  itemDisplayString = itemDisplayStringSplit[0]+","+itemDisplayStringSplit[1]+","+itemDisplayStringSplit[2];
					  //item.value = split[0]+","+split[1]+","+split[2];
				  }
			  }

		  //Store the last suggestion list for validation
		  addressSuggestionList.push(item.value);
		  result = $("<li></li>").data("ui-autocomplete-item", item).append(
				  itemDisplayString).appendTo(ul);
	  }
	  return result;
  }
  
  /* render the address list */
  function rendeCheckoutAddressValue(ul, item) {
	  // ul is the unordered suggestion list
	  // item is a object in the data object that was send to the response function
	  // after the JSON request
	  // We append a custom formatted list item to the suggestion list
	  // The search term is bolded out
	
	  var result = ul;
	  if(item != undefined && item.term != undefined ){
		  ul.show();
		  var termPosn = item.value.indexOf(item.term);
		  var countryCode = $("#countryCode").val();
		
		  var itemDisplayString =""
		  //Splitting the address to remove the city from the display string
			  if(termPosn != -1){
				  var split = item.value.split(",");
				  /*itemDisplayString = "<a>" + item.value.substring(0,termPosn) + "<b>" + item.term + "</b>" 
				  + item.value.substring(termPosn + item.term.length ) + "</a>";*/
				  itemDisplayString = "<a>" + item.value.substring(0,termPosn) + "<b>" + item.term + "</b>"
				  itemDisplayString = itemDisplayString + item.value.substring(termPosn + item.term.length ) + "</a>";
				  if(countryCode == 'AU'){
					  var itemDisplayStringSplit = itemDisplayString.split(",");
					  itemDisplayString = itemDisplayStringSplit[0]+","+itemDisplayStringSplit[1]+","+itemDisplayStringSplit[2];
					  item.value = split[0]+","+split[1]+","+split[2];
				  }
				  if(countryCode == 'NZ'){
					  var replaceString = split[1];
					  if(!($('#fromCheckout').length >0) ){
						  itemDisplayString = itemDisplayString.replace(replaceString,split[3]);
					  }
					  var itemDisplayStringSplit = itemDisplayString.split(",");
					  itemDisplayString = itemDisplayStringSplit[0]+","+itemDisplayStringSplit[1]+","+itemDisplayStringSplit[2];
					  //item.value = split[0]+","+split[1]+","+split[2];
				  }
			  }

		  //Store the last suggestion list for validation
		  addressSuggestionList.push(item.value);
		  result = $("<li></li>").data("ui-autocomplete-item", item).append(
				  itemDisplayString).appendTo(ul);
	  }
	  return result;
  }
  
  /* sets the selected  to the text box*/
  function setSelectedCheckoutValue(event, ui) {
      // Sets the text of the input textbox to the title of the object referenced
      // by the selected list item
      $(this).val(ui.item.value);

     //update  city,state  and address
      var addressParts = ui.item.value.split(",");
      var countryCode = $("#countryCode").val();
      if(addressParts != undefined && (addressParts.length == 3 || addressParts.length == 4)){
          if($('#city').length > 0){
              $('#city').val($.trim(addressParts[0]));
                  $('#addressSuggest-bet').val(addressParts[0]);              
          }
          if($('#fromCheckout').length >0 ){
              $('#addressSuggest_state').val($.trim(addressParts[1]));
          }
          else{
              if($('#state').length > 0){
                  $('#state').val($.trim(addressParts[1]));
                  if(countryCode == 'AU')
                      $('#addressSuggest_state').val($.trim(addressParts[1]));
                  else
                      $("#addressSuggest_city").val($.trim(addressParts[3]));
                  }
          }
          
          if($('#zipCode').length > 0){
                  $('#zipCode').val($.trim(addressParts[2]));
                  $('#addressSuggest_postcode').val($.trim(addressParts[2]));
                  
              
          }
          
      }
      return false;
    }
  
  /* sets the selected  to the text box*/
  function setSelectedBetValue(event, ui) {
      // Sets the text of the input textbox to the title of the object referenced
      // by the selected list item
      $(this).val(ui.item.value);

     //update  city,state  and address
      var addressParts = ui.item.value.split(",");
      var countryCode = $("#countryCode").val();
     
      if(addressParts != undefined && (addressParts.length == 3 || addressParts.length == 4)){
      	/*if($('#city').length > 0){
      		$('#city').val($.trim(addressParts[0]));
      			$('#addressSuggest-bet').val(addressParts[0]);      		
      	}
      	if($('#fromCheckout').length >0 ){
      		$('#addressSuggest_state').val($.trim(addressParts[1]));
      	}
      	else{
	      	if($('#state').length > 0){
	      		$('#state').val($.trim(addressParts[1]));
	      		if(countryCode == 'AU')
	      			$('#addressSuggest_state').val($.trim(addressParts[1]));
	      		else
	      			$("#addressSuggest_city").val($.trim(addressParts[3]));
	      		}
      	}*/
      	
      	if($('#suburbSuggest-bet').length > 0){
      		
      			$('#zipCode').val($.trim(addressParts[2]));
      			//$('#townSuburb').val($.trim(addressParts[0]));
      			
          		$('#suburbSuggest-bet').val($.trim(ui.item.value));
      	}
      	
      }
      return false;
    }
  
 if($('#addressSuggest-updateAddress').length){
		$('#addressSuggest-updateAddress').autocomplete({

			//fetch the address data
			source: getAddressDataBilling,

			// This function is executed when a suggestion is selected
			select: setSelectedUpdateAccountValue,
			// This function is executed when the users focuses on a item with the mouse
			// or keyboard
			focus: setSelectedUpdateAccountValue,
			
			open : function(){
				$(".ui-autocomplete:visible").css({top:"-=1"});
				$(".ui-autocomplete").css({"max-height":"14.5em","overflow-y":"auto"});
	    	}

		}).data("uiAutocomplete")._renderItem = renderAccountAddressValue;
	}

//used by myaccount - update an address
function setSelectedUpdateAccountValue(event, ui) {
    // Sets the text of the input textbox to the title of the object referenced
    // by the selected list item
	$this = $(this);
	//input to div to prevent browsers' autocomplete
	opsm.utils.setContent($this,ui.item.value);

   //update  city,state  and address
    var addressParts = ui.item.value.split(",");
    var countryCode = $("#countryCode").val();
    if(addressParts != undefined && (addressParts.length == 3 || addressParts.length == 4)){
    	if($('#city').length > 0){
    		$('#city').val($.trim(addressParts[0]));
    		opsm.utils.setContent($('#addressSuggest-updateAddress'), addressParts[0]);  		
    	}
    	if($('#fromCheckout').length >0 ){
    		$('#addressSuggest_state_updateAddress').val($.trim(addressParts[1]));
    	}
    	else{
	      	if($('#state').length > 0){
	      		$('#state').val($.trim(addressParts[1]));
	      		if(countryCode == 'AU')
	      			$('#addressSuggest_state_updateAddress').val($.trim(addressParts[1]));
	      		else
	      			$("#addressSuggest_state_updateAddress").val($.trim(addressParts[1]));
	      		}
    	}
    	
    	if($('#zipCode').length > 0){
    			$('#zipCode').val($.trim(addressParts[2]));
        		$('#addressSuggest_postcode_updateAddress').val($.trim(addressParts[2]));
    			
    		
    	}
    	
    }
    return false;
  }



function setSelectedBillingValue(event, ui) {
$(this).val(ui.item.value);

     //update  city,state  and address
      var addressParts = ui.item.value.split(",");
      var countryCode = $("#countryCode").val();
      if(addressParts != undefined && (addressParts.length == 3 || addressParts.length == 4)){
      	if($('#billingCity').length > 0){
      		$('#billingCity').val($.trim(addressParts[0]));
      			$('#billingAddressSuggest').val(addressParts[0]);      		
      	}
      	if($('#fromCheckout').length >0 ){
      		$('#billingAddress_state').val($.trim(addressParts[1]));
      	}
      	else{
	      	if($('#billingState').length > 0){
	      		$('#billingState').val($.trim(addressParts[1]));
	      		if(countryCode == 'AU')
	      			$('#billingAddress_state').val($.trim(addressParts[1]));
	      		else
	      			$("#addressSuggest_city").val($.trim(addressParts[3]));
	      		}
      	}
      	
      	if($('#billingZipCode').length > 0){
      			$('#zipCode').val($.trim(addressParts[2]));
          		$('#billingAddress_postcode').val($.trim(addressParts[2]));
      			
      		
      	}
      	
      }
      return false;
    }

/* render the address list without state for NZ*/

function renderAccountAddressValue(ul, item) {
	  // ul is the unordered suggestion list
	  // item is a object in the data object that was send to the response function
	  // after the JSON request
	  // We append a custom formatted list item to the suggestion list
	  // The search term is bolded out
	 
	  var result = ul;
	  if(item != undefined && item.term != undefined ){
		  ul.show();
		  var termPosn = item.value.indexOf(item.term);
		  var countryCode = $("#countryCode").val();
		  var itemDisplayString =""
		  //Splitting the address to remove the city from the display string
			  if(termPosn != -1){
				  var split = item.value.split(",");
				  /*itemDisplayString = "<a>" + item.value.substring(0,termPosn) + "<b>" + item.term + "</b>" 
				  + item.value.substring(termPosn + item.term.length ) + "</a>";*/
				  itemDisplayString = "<a>" + item.value.substring(0,termPosn) + "<b>" + item.term + "</b>"
				  itemDisplayString = itemDisplayString + item.value.substring(termPosn + item.term.length ) + "</a>";
				  if(countryCode == 'AU'){
					  var itemDisplayStringSplit = itemDisplayString.split(",");
					  itemDisplayString = itemDisplayStringSplit[0]+","+itemDisplayStringSplit[1]+","+itemDisplayStringSplit[2];
					  item.value = split[0]+","+split[1]+","+split[2];
				  }
				  if(countryCode == 'NZ'){
					  var itemDisplayStringSplit = itemDisplayString.split(",");
					  itemDisplayString = itemDisplayStringSplit[0]+","+itemDisplayStringSplit[1]+","+itemDisplayStringSplit[2];
					  //item.value = split[0]+","+split[1]+","+split[2];
				  }
			  }

		  //Store the last suggestion list for validation
		  addressSuggestionList.push(item.value);
		  result = $("<li></li>").data("ui-autocomplete-item", item).append(
				  itemDisplayString).appendTo(ul);
	  }
	  return result;
}


if($('#addressSuggest_account').length){
		$('#addressSuggest_account').autocomplete({

			//fetch the address data
			source: getAddressDataBilling,

			// This function is executed when a suggestion is selected
			select: setSelectedAddNewCardBillingValue,
			// This function is executed when the users focuses on a item with the mouse
			// or keyboard
			focus: setSelectedAddNewCardBillingValue,
			
			open : function(){
				$(".ui-autocomplete:visible").css({top:"-=1"});
				$(".ui-autocomplete").css({"max-height":"14.5em","overflow-y":"auto"});
	    	}

		}).data("uiAutocomplete")._renderItem = renderAccountAddressValue;
	}

function setSelectedAddNewCardBillingValue(event, ui) {
    // Sets the text of the input textbox to the title of the object referenced
    // by the selected list item
    $(this).val(ui.item.value);

   //update  city,state  and address
    var addressParts = ui.item.value.split(",");
    var countryCode = $("#countryCode").val();
    if(addressParts != undefined && (addressParts.length == 3 || addressParts.length == 4)){
    	if($('#city').length > 0){
    		$('#city').val($.trim(addressParts[0]));
    			$('#addressSuggest_account').val(addressParts[0]);      		
    	}
    	if($('#state').length > 0){
    		$('#state').val($.trim(addressParts[1]));
    		$('#addressSuggest_state').val($.trim(addressParts[1]));
    	}
    	if($('#zipCode').length > 0){
    			$('#zipCode').val($.trim(addressParts[2]));
        		$('#addressSuggest_postcode').val($.trim(addressParts[2]));			
    	}
    	
    }
    return false;
  }