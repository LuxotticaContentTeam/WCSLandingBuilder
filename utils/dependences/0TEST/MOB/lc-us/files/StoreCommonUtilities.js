//-----------------------------------------------------------------
// Licensed Materials - Property of IBM
//
// WebSphere Commerce
//
// (C) Copyright IBM Corp. 2009, 2011 All Rights Reserved.
//
// US Government Users Restricted Rights - Use, duplication or
// disclosure restricted by GSA ADP Schedule Contract with
// IBM Corp.
//-----------------------------------------------------------------


/** 
 * @fileOverview This file provides the common functions which are specific to the Madisons store.
 * This JavaScript file is used by StoreCommonUtilities.jspf.
 */

//Import the required Dojo libraries
//dojo.registerModulePath("wc", "../wc");
//	
//dojo.require("wc.service.common");
//dojo.require("dojo.io.iframe");
//dojo.require("dojo.io.script");
//
////Reloads widgets when parts of the page has been re-loaded from server
//dojo.require("dojo.parser");
//
////Category menu support
//dojo.require("dijit.form.Button");
//dojo.require("wc.widget.WCMenu");
//dojo.require("wc.widget.WCDialog");
//dojo.require("wc.widget.ScrollablePane");
//dojo.require("dijit.layout.TabContainer");
//dojo.require("dijit.layout.ContentPane");	
//dojo.require("dijit.Tooltip");
//dojo.require("wc.widget.WCDropDownButton");
//dojo.require("dijit.Dialog");
//dojo.require("dojo.dnd.Source");
//dojo.require("dojo.currency");
//dojo.require("dijit.Tree");
//dojo.require("dojo.back");
//dojo.require("dijit.form.DateTextBox");
//dojo.require("wc.widget.RefreshArea");
//dojo.require("wc.render.RefreshController");
//dojo.require("wc.render.Context");
//dojo.require("dojo.cookie");
//
//dojo.subscribe("ajaxRequestInitiated", "incrementNumAjaxRequest");
//dojo.subscribe("ajaxRequestCompleted", "decrementNumAjaxRequest");

/** This variable indicates whether the dropdown is shown or not. */
var showDropdown = false;

/** This variable stores the current dropdown dialog element. */
var dropDownDlg = null;

/** This variable is used to store the width of the mini shopping cart on page load. It is used when shopper's browser is IE6. */
var originalMiniCartWidth = 0;

/** This variable indicates whether the browser used is Internet Explorer or not. */
var isIE = (document.all) ? true : false;

/** Initializes the variable to false. **/
	var correctBrowser = false;

/** 
 * This variable indicates whether a request has been submitted or not.
 * The value is initialized to true and resets to false on full page load.
 */
var requestSubmitted = true;

/** 
 * This variable stores the id of the element (ex: button/link) which the user clicked.
 * This id is set when the user clicks an element which triggers an Ajax request.
 */
var currentId = "";

/** 
 * This variable keeps track of the number of active ajax requests currently running on the page 
 * The value is initialized to 0.
 */
var numAjaxRequests = 0;

/** 
 * This variable controls the timer handler before triggering the autoSuggest.  If the user types fast, intermittent requests will be cancelled.
 * The value is initialized to -1.
 */
var autoSuggestTimer = -1;

/** 
 * This variable controls the delay of the timer in milliseconds between the keystrokes before firing the search request.
 * The value is initialized to 250.
 */
var autoSuggestKeystrokeDelay = 250;

/** 
 * This variable indicates whether or not the user is hovering over the autoSuggest results popup display.
 * The value is initialized to false.
 */
var autoSuggestHover = false;

/** 
 * This variable stores the old search term used in the auto suggest search box
 * The value is initialized to empty string.
 */
var autoSuggestPreviousTerm = "";

/** 
 * This variable stores the URL of currently selected static autosuggest recommendation
 * The value is initialized to empty string.
 */
var autoSuggestURL = "";

/** 
 * This variable stores the index of the selected auto suggestion item when using up/down arrow keys.
 * The value is initialized to -1.
 */
var autoSelectOption = -1;

/** 
 * This variable stores the index offset of the first previous history term
 * The value is initialized to -1.
 */
var historyIndex = -1;

/** 
 * This variable indicates whether a the cached suggestions have been retrieved.
 * The value is initialized to false.
 */
var retrievedCachedSuggestions = false;

/** 
 * This variable sets the total number of static autosuggest recommendations used for each static category/grouping.
 * The value is initialized to 10.
 */
var TOTAL_SUGGESTED = 10;

/** 
 * This variable sets the total number of previous search history terms.
 * The value is initialized to 2.
 */
var TOTAL_HISTORY = 2;

/** 
 * This variable controls when to trigger the auto suggest box.  The number of characters greater than this threshold will trigger the auto suggest functionality.
 * The static/cached auto suggest will be performed if this threshold is exceeded.
 * The value is initialized to 1.
 */
var AUTOSUGGEST_THRESHOLD = 1;

/** 
 * This variable controls when to trigger the dynamic auto suggest.  The number of characters greater than this threshold will trigger the request for keyword search.
 * The static/cached auto suggest will be be displayed if the characters exceed the above config parameter, but exceeding this threshold will additionally perform the dynamic search to add to the results in the static/cached results.
 * This value should be greater or equal than the AUTOSUGGEST_THRESHOLD, as the dynamic autosuggest is secondary to the static/cached auto suggest.
 * The value is initialized to 1.
 */
var DYNAMIC_AUTOSUGGEST_THRESHOLD = 1;

/** 
 * This variable is an internal constant used in the element ID's generated in the autosuggest content.
 * The value is initialized to 1000.
 */
var CACHED_AUTOSUGGEST_OFFSET = 1000;

/** 
 * Sends back focus to the first focusable element on tabbing from the last focusable element.
 */
function focusSetter(){  
	if($("#MiniCartFocusReceiver1")[0])
		$("#MiniCartFocusReceiver1").focus();
	else
		$("#MiniCartFocusReceiver2").focus();
}

/** 
 * Sends back focus to the last focusable element on reverse tabbing from the first focusable element.
 * 
 * @param {object} event The event triggered from user actions
 */
function determineFocus(event) {
		if(event.shiftKey && event.keyCode == 9)
		{
			if(event.srcElement)
			{
				if(event.srcElement.id=="MiniCartFocusReceiver1")
				{
					if($("#WC_MiniShopCartDisplay_link_5")[0])
					{
						$("#WC_MiniShopCartDisplay_link_5").focus();
					}
					event.preventDefault();
				}
				else if(event.srcElement.id=="MiniCartFocusReceiver2")
				{
					$("#MiniCartFocusReceiver2").focus();
					event.preventDefault();
				}
			}
			else
			{
				if(event.target.id=="MiniCartFocusReceiver1")
				{
					if($("#WC_MiniShopCartDisplay_link_5")[0])
					{
						$("#WC_MiniShopCartDisplay_link_5").focus();
					}
					event.preventDefault();
				}
				else if(event.target.id=="MiniCartFocusReceiver2")
				{
					$("#MiniCartFocusReceiver2").focus();
					event.preventDefault();
				}
			}
		}
}

/**
 * Destroys the existing dialogs with outdated data.
 */
function destroyDialog(){
	//If data has changed, then we should destroy the quick_cart_container dialog and recreate it with latest data
	dojo.query('.dijitDialog', document).forEach(function(tag) {
		if (dijit.byNode(tag).id == 'quick_cart_container') 
			dijit.byNode(tag).destroyRecursive();// or dijit.getEnclosingWidget(tag).destroyRecursive();
	 });
	 dropDownDlg = null;
}

/**
 * Displays the dropdown content of the mini shopping cart when keyboard keys are used to expand/collapse the dropdown.
 *
 * @param {object} event The event to retrieve the input keyboard key
 * @param {string} relativeId The id of a placeholder element to position the dropdown relatively
 * @param {string} contentId The id of the content pane containing the mini shopping cart dropdown contents
 * @param {string} contentType The content that will be shown in the expanded mini shopping cart dropdown.
 */
function showMiniShopCartDropDown1(event,relativeId,contentId,contentType){
	console.debug(event.keyCode);
	if(event.keyCode == dojo.keys.DOWN_ARROW){
		showMiniShopCartDropDown(relativeId,contentId,contentType);
	}
	else if(event.shiftKey && event.keyCode == dojo.keys.ENTER){
		showMiniShopCartDropDown(relativeId,contentId,contentType);
		dojo.stopEvent(event);
	}
}

/**
 * Displays the dropdown content of the mini shopping cart when the user hovers over the 
 * mini shopping cart or uses keyboard keys to expand the dropdown.
 *
 * @param {object} event The event triggered from user actions
 * @param {string} relativeId The id of a placeholder element to position the dropdown relatively
 * @param {string} contentId The id of the content pane containing the mini shopping cart dropdown contents
 * @param {string} contentType The content that will be shown in the expanded mini shopping cart dropdown.
 */
function showMiniShopCartDropDown(relativeId,contentId,contentType){

	//Calculate the X and Y co-ordinates for the dialog. We don't want it to be at the center of the screen.
	var t = dojo.byId(relativeId);
	var c = dojo.coords(t,true);
	var x1 = c.x; 
	var y1 = c.y;
	
    /*By default, the content of the mini shop cart will be displayed immediately after the mini shop cart title.
     *But we want the content to display under the mini shop cart title. So we'll need to get the width
     *of the shop cart and then shift it*/
	var cartWidth =dojo.coords(dojo.byId('MiniShoppingCart'),true).w;
	
	if(dojo.isIE == 8){			
		cartWidth = dojo.coords(dojo.byId('outerCartContainer'),true).w
	}else if (dojo.isIE>=7 && dojo.isIE<8) {
		cartWidth =dojo.coords(dojo.byId('miniShopCartBody'),true).w;
	}else if(dojo.isIE < 7){
		cartWidth = originalMiniCartWidth;
		if(dojo.locale == 'iw-il' || dojo.locale=='ar-eg'){
			cartWidth = dojo.coords(dojo.byId('outerCartContainer'),true).w
		}
	}
	
	dojo.style(dojo.byId("quick_cart"), "width", cartWidth+'px');
	
	/* If the Dialog is already created, then just set the X and Y co-ordinates for this dialog. Sometimes,
	if the browser is resized, the (x,y) co-ordinates will change from the initial values. So every time before calling Dialog.show() method reset the (x,y) co-ordinates. 
	The Dialog.show() method will internally call _rePosition() method which repositions the dialog.
	*/
    var dlgX=x1; //this value is good for ff3, IE8 & languages
    
    if(dojo.isIE){
    	dlgX = x1 + dojo.contentBox(dojo.byId(relativeId)).w-cartWidth;
    }
    
    //work around for bidirectional languages
    if (dojo.locale == 'iw-il' || dojo.locale=='ar-eg') {
    	if (dojo.isIE<8) {
    		var leftX = dojo.coords(dojo.byId('miniShopCartLeftCorner')).x;
    		var rightX = dojo.coords(dojo.byId('miniShopCartRightCorner')).x;
    		if (rightX > leftX) {
    			dlgX  = leftX
    		}else {
    			dlgX  = rightX
    		}
    	}
    }
    
	if(dropDownDlg){
			dropDownDlg.y = y1;
			dropDownDlg.x = dlgX;
	}

	/* Dialog is not yet created..Create one */
	if(!dropDownDlg){
		var pane = document.getElementById(contentId);
		dropDownDlg = new wc.widget.WCDialog({relatedSource: relativeId, x:x1,y:y1},pane);
		dropDownDlg.x=dlgX;
	}

	if(dojo.isOpera!=0 && dojo.isOpera!=null)
	{
		dropDownDlg.x = dropDownDlg.x + window.pageXOffset;
		dropDownDlg.y = dropDownDlg.y + window.pageYOffset;
	}

	if(contentType == 'orderItemsList'){
		dojo.byId("MiniShopCartProductsList").style.display = "block";
		dojo.byId("MiniShopCartProductAdded").style.display = "none";
	}
	else if(contentType == 'orderItemAdded'){
		dojo.byId("MiniShopCartProductsList").style.display = "none";
		dojo.byId("MiniShopCartProductAdded").style.display = "block";
	}
	if(dojo.isIE < 7)
	{	
		document.getElementById("quick_cart_container").style.display = "block";
	}
	setTimeout(dojo.hitch(dropDownDlg,"show",null),5);
	setTimeout(dojo.hitch(this,"hideUnderlayWrapper",""),5);
}

/**
 * Hides the DialogUnderlayWrapper component, the component that grays out the screen behind,
 * as we do not want the background to be greyed out.
 */
function hideUnderlayWrapper(){
//	dojo.query('.dijitDialogUnderlayWrapper', document).forEach(function(tag) {		
//		tag.style.display='none';
//	});	
}

/**
 * Loads the specified URL.
 *
 * @param {string} url The URL of the page to be loaded.
 */
function loadLink(url){
	document.location.href=url;
	try {
		if (window.top._ceaCollabDialog!=undefined && window.top._ceaCollabDialog!=null) {
			window.top._ceaCollabDialog.topCategoryClicked(url);
		}		
	}catch (err) {
		console.log(err);
	}
	

}

/**
 * Clears the Search term string displayed in Simple Search field.
 */
function clearSearchField() {
	var searchInput = document.getElementById("SimpleSearchForm_SearchTerm");
	searchText = searchInput.value;
	if(searchText == document.getElementById("searchTextHolder").innerHTML.trim()){
		document.getElementById("SimpleSearchForm_SearchTerm").value = "";
		$('#SimpleSearchForm_SearchTerm').removeClass('blur');
	}
	else{
		document.getElementById("SimpleSearchForm_SearchTerm").select();
		showAutoSuggestIfResults();
		autoSuggestHover = false;
	}
	// check if mobile and open suggestions on input focus 
	if(searchInput.classList.contains('mobile'))
		console.log("OKKKK")
}

/**
 * Displays the Search term string in Simple Search field.
 */
function fillSearchField() {
	if (document.getElementById("SimpleSearchForm_SearchTerm").value == "") {
		document.getElementById("SimpleSearchForm_SearchTerm").value = document.getElementById("searchTextHolder").innerHTML.trim();
		$('#SimpleSearchForm_SearchTerm').addClass ('blur');
	}
	// hide the search box results
	if(!autoSuggestHover) {
		showAutoSuggest(false);
	}
}

/**
 * Displays the top dropdown menu, including the category dropdowns and the mini shopping cart.
 */
function showDropDownMenu(){
	var showMenu = document.getElementById("header_menu_dropdown");
	if(document.getElementById("header_menu_dropdown")!=null && document.getElementById("header_menu_dropdown")!='undefined'){
		showMenu.style.display = "block";
	}
	if(document.getElementById("outerCartContainer")!=null && document.getElementById("outerCartContainer")!='undefined'){
		var outershopcart = document.getElementById("outerCartContainer");
		outershopcart.style.display = "block";
	}
}

/**
 * Initializes the mini shopping cart object and subscribes dojo actions on this object.
 */
function initShopcartTarget(){
				
//	dojo.subscribe("/dnd/drop", function(source, nodes, copy, target){
//		if (source != target) {
//			target.deleteSelectedNodes();
//		}
//		var actionListScroll = new popupActionProperties(); 
//		actionListScroll.showProductCompare = showProductCompare;
//
//		if(target.parent.id=='miniShopCart_dndTarget'){
//			if(dojo.cookie('coShoppingDisableDnd')!=undefined && dojo.cookie('coShoppingDisableDnd') == 'true') {
//				ceadojo.publish("/wc/collaboration/dndDisabled",[]);
//				return;
//			}
//			var indexOfIdentifier = source.parent.id.indexOf("_",0);
//			if ( indexOfIdentifier >= 0) {
//				//remove the prefix including the "underscore"
//				source.parent.id = source.parent.id.substring(indexOfIdentifier+1);					
//			}
//			
//			var dndType = source.node.getAttribute('dndType');
//			
//			if(dndType=='item' || dndType=='package' || dndType=='dynamicKit') {
//				categoryDisplayJS.AddItem2ShopCartAjax(source.parent.id ,1, {catalogEntryType: dndType});
//			} else if(dndType=='product' || dndType=='bundle') {
//				showPopup(source.parent.id,function(e){return e;},'miniShopCart_dndTarget',null,actionListScroll);
//			}
//		}
//	});
}

/**
 * Displays the progress bar dialog to indicate a request is currently running.
 * There are certain cases where displaying the progress bar causes problems in Opera,
 * the optional parameter "checkForOpera" is passed to specifically check if the browser used is Opera,
 * if so, do not display the progress bar in these cases.
 *
 * @param {boolean} checkForOpera Indicates whether to check if the browser is Opera or not.
 */
function cursor_wait(checkForOpera) {
	var showPopup = true;	

	//Since dijit does not support Opera
	//Some progress bar dialog will be blocked in Opera to avoid error
	if(checkForOpera == true){
		if($.browser.opera){
			showPopup = false;
		}
	}
	
	//For all other browsers and pages that work with Opera
	//Display the progress bar dialog
	if(showPopup){
		//Delay the progress bar from showing up
		setTimeout('showProgressBar()',500);
	}
}

/**
 * Helper method for cursor_wait() to display the progress bar pop-up.
 * Displays progress bar, next to the element if the element id was specified in currentId,
 * or defaults to the center of the page if currentId is empty.
 * Progress bar will only be displayed if the submitted request has not been completed.
 * This method is only called implicitly by the cursor_wait() method, which is triggered before a request is submitted.
 */
function showProgressBar(){
	//After the delay, if the request is still not finished
	//Then continue and show the progress bar
	//Otherwise, do not execute the following code
	if(!requestSubmitted){
		return;
	}
	
	displayProgressBar();
	
}


/**
 * Helper method for showProgressBar() to display the progress bar pop-up.
 * It can also be forced to show the progress bar directly in special cases.
 * The function also displays the progress bar next to the element if the element id was specified in currentId,
 * or defaults to the center of the page if currentId is empty.
 * This method can be called implicitly by the cursor_wait() method or explicitly by itself.
 */
function displayProgressBar(){
//	var dialog = dijit.byId('progress_bar_dialog');
//	
//	//Make sure the dialog is created
//	if(dialog != null){
//			
//		//Hide the header for the close button
//		dialog.closeButtonNode.style.display='none';		
//		
//		var progressBar = document.getElementById('progress_bar');
//		progressBar.style.display = 'block';	
//				
//		//Check whether or not an element ID is provided
//		//If yes, point the progress bar to this element
//		//Otherwise, show the progress bar in a dialog
//		if(this.currentId != ""){
//			var element = document.getElementById(this.currentId);	
//			var pos = dijit.placeOnScreenAroundElement(progressBar,element,{'TR':'TL'});	
//		} else {
//			dialog.containerNode.innerHTML == "";
//			progressBar.style.left = '';
//			progressBar.style.top = '';
//			dialog.containerNode.appendChild(progressBar);
//			dialog.show();		
//		}
//		
//		//Make sure the progress bar dialog goes away after 30 minutes
//		//and does not hang if server calls does not return
//		//Assuming the longest server calls return before 30 minutes
//		setTimeout("cursor_clear()",1800000);
//	}
}

/**
 * Stores the id of the element (ex: button/link) that triggered the current submitted request.
 * Store the new element id only when no request is currently running.
 *
 * @param {string} id The id of element triggering the submitted request.
 */
function setCurrentId(id){
	//If there is no request already submitted, update the id
	if(!requestSubmitted && this.currentId == ""){
		this.currentId = id;
	}
}

/**
 * This function trims the spaces from the pased in word.
 * Delete all pre and trailing spaces around the word.
 * 
 * @param {string} inword The word to trim.
 */
function trim(inword)
{
	word = inword.toString();
	var i=0;
	var j=word.length-1;
	while(word.charAt(i) == " ") i++;
	while(word.charAt(j) == " ") j=j-1;
	if (i > j) {
		return word.substring(i,i);
	} else {
		return word.substring(i,j+1);
	}
}

/**
 * Hides the progress bar dialog when the submitted request has completed.
 * Set the visibility of the progress bar dialog to hide from the page.
 */
function cursor_clear() {
//		//Reset the flag 
		requestSubmitted = false;
//
//		//Hide the progress bar dialog
//		var dialog = dijit.byId('progress_bar_dialog');
//		var progressBar = document.getElementById('progress_bar');
//		if(dialog != null){
//			if(progressBar != null){
//				progressBar.style.display = 'none';
//			}
//			dialog.hide();
//			this.currentId="";
//		}
}	

/**
 * Checks whether a request can be submitted or not.
 * A new request may only be submitted when no request is currently running.
 * If a request is already running, then the new request will be rejected.
 *
 * @return {boolean} Indicates whether the new request was submitted (true) or rejected (false).
 */
function submitRequest() {
	if(!requestSubmitted) {
		requestSubmitted  = true;
		return true;
	}
	return false;
}
 
/**
 * Set the current page to a new URL.
 * Takes a new URL as input and set the current page to it, executing the command in the URL.
 * Used for Non-ajax calls that requires multiple clicks handling.
 * 
 * @param {string} newPageLink The URL of the new page to redirect to.
 */
function setPageLocation(newPageLink) {
	//For Handling multiple clicks
	if(!submitRequest()){
		return;
	}
			
	document.location.href = newPageLink;
}

/**
 * Submits the form parameter.
 * Requires a form element to be passed in and submits form with its inputs.
 * Used for Non-ajax calls that requires multiple clicks handling.
 *
 * @param {element} form The form to be submitted.
 */
function submitSpecifiedForm(form) {
	if(!submitRequest()){
		return;
	}
//	if(form.name.indexOf('CatalogSearchForm') == 0){
//		form.searchTerm.value = form.searchTerm.value.replaceAll(' ','_');
//		form.searchTerm.style.fontSize = '0px'
//	}
	form.submit();
}


/**
 * Parses a Dojo widget.
 * Pass in the id of a dojo widget or a HTML container element containing a dojo widget, such as a div,
 * and this method will parse that widget, or all the widgets within that HTML container element.
 * 
 * @param {string} id The id of a dojo widget or a HTML container of a dojo widget to be parsed.
 */
function parseWidget(id)
{
	/*
	var node;
	var widget = dijit.byId(id);
	
	if (widget == null || widget == undefined)
	{
		if (id == null || id == undefined)
		{	
			node = dojo.body();
		}
		else
		{
			node = dojo.byId(id);
		}
		
		if (node != null && node != undefined)
		{
			if (node.getAttribute("dojoType") != null && node.getAttribute("dojoType") != undefined)
			{
				dojo.parser.instantiate([node]);
			}
			else
			{
				dojo.parser.parse(node);
			}
		}
	}*/
}
/**
 * Parses the co-shopping Dojo widget.
 * @param {string} id The id of a coshopping dojo widget or a HTML container of a dojo widget to be parsed.
 */
function parseWCCEAWidget(id)
{
	var node;
	var widget = ceadijit.byId(id);
	
	if (widget == null || widget == undefined)
	{
		if (id == null || id == undefined)
		{	
			node = ceadojo.body();
		}
		else
		{
			node = ceadojo.byId(id);
		}
		
		if (node != null && node != undefined)
		{
			if (node.getAttribute("ceadojoType") != null && node.getAttribute("ceadojoType") != undefined)
			{
				ceadojo.parser.instantiate([node]);
			}
			else
			{
				ceadojo.parser.parse(node);
			}
		}
	}
}

/**
 * Parses the header menu.
 * The header menu is only parsed when the user hovers over it to improve the performance of the store loading.
 *
 * @param {string} id The id of the menu item which the user hovers over to initialize the progress bar next to that item.
 */
function parseHeader(id)
{
	var node = dojo.byId("progress_bar_dialog");
	var showMenu = document.getElementById("header_menu_loaded");
	var hideMenu = document.getElementById("header_menu_overlay");
	
	if(currentId.length == 0 && document.getElementById("header_menu_loaded")!=null && document.getElementById("header_menu_loaded")!='undefined' && document.getElementById("header_menu_overlay")!=null && document.getElementById("header_menu_overlay")!='undefined' && document.getElementById("header_menu_loaded").style.display == 'none')
	{
		setCurrentId((id != null && id != undefined)?id:hideMenu.id);
		submitRequest();
		cursor_wait();
		hideMenu.style.display = "none";
		parseWidget("header_menu_loaded");
		showMenu.style.display = "block";
		cursor_clear();
		
		//the headers are parsed now. Connect _onDropDownClick to Coshopping's topCategoryClicked
		try {
			if (window.top._ceaCollabDialog!=undefined || window.top._ceaCollabDialog!=null) {
				dijit.registry.byClass("wc.widget.WCDropDownButton").forEach(function(w){
					dojo.connect(w, '_onDropDownClick', dojo.hitch(window.top._ceaCollabDialog, "topCategoryClicked", w.getURL()));
					dojo.connect(w, 'onKeyPress', window.top._ceaCollabDialog, function(e) {
						if (e.keyCode == dojo.keys.ENTER) {
							window.top._ceaCollabDialog.topCategoryClicked(w.getURL());
						}
					}); 
				});			
			}
		}catch(err) {
			console.log(err);
		}
	}
}


 /**
  * This function is used to hide an element with the specified id.
  * @param {string} elementId The id of the element to be hidden.
  */

  function hideElementById(elementId){
		$('#' + elementId).css('display', 'none');
 }

/**
  * This function is used to display an element with the specified id.
  * @param {string} elementId The id of the element to be displayed.
  */

   function showElementById(elementId){
		$('#' + elementId).css('display', 'block');
}

/**
  * This function is used to hide the background image of an element.
  * @param {DomNode} element The node whose background image is to be hidden.
  */
    function hideBackgroundImage(element){
		element.style.backgroundImage='none';
}

/**
  * This function is used to display the background image of a product onhover.
  * @param {DomNode} element The node for which the product hover background image is to be displayed.
  */

	 function showBackgroundImage(element){
		element.style.backgroundImage='url('+getImageDirectoryPath()+getStyleDirectoryPath()+'product_hover_background.png)';
}
	/**
	* checkIE8Browser checks to see if the browser is IE 8 or less. It then sets correctBrowser to true if it is.
	*
	**/
	
	function checkIE8Browser() { 
       if( $.browser.msie && parseInt($.browser.version) <= 8){
    	    correctBrowser = true
       }
   } 
 
	/**
	* ApprovalToolLink provides the appropriate URL if the browser is correct, otherwise displays a message.
	*
	* @param {String} idTag Used to identify the id tag in the jsp that is calling it.
	* @param {String} approvalToolLinkURL This is a URL which is passed from the calling jsp.
	*
	**/
   
	function ApprovalToolLink(idTag, approvalToolLinkURL) { 
		
		//checks if the browser is IE 8 or less.
		checkIE8Browser();
		
		if (correctBrowser) {
    	  RFQwindow=window.open(approvalToolLinkURL);
		}
		else {      
    	  MessageHelper.formErrorHandleClient(idTag,MessageHelper.messages["ERROR_INCORRECT_BROWSER"]); return;
    	}
	}  


/**
 * Updates view (image/detailed) and starting index of pagination of product display in SetCurrencyPreferenceForm when currency is changed from the drop-down menu. 
 * These are later passed as url parameters.
 */

function updateViewAndBeginIndexForCurrencyChange(){
	if(document.getElementById('fastFinderResultControls')!=null && document.getElementById('fastFinderResultControls')!='')
	{	
		if(document.SetCurrencyPreferenceForm.pageView!=null){
			document.SetCurrencyPreferenceForm.pageView.value = document.FastFinderForm.pageView.value;
		}
		if(document.SetCurrencyPreferenceForm.beginIndex!=null){
			document.SetCurrencyPreferenceForm.beginIndex.value = document.FastFinderForm.beginIndex.value;
		}
	}
	else if(document.getElementById('CategoryDisplay_Widget')!=null && document.getElementById('CategoryDisplay_Widget')!='')
	{
		if(wc.render.getContextById('CategoryDisplay_Context').properties['pageView']!='' && document.SetCurrencyPreferenceForm.pageView!=null){
			document.SetCurrencyPreferenceForm.pageView.value = wc.render.getContextById('CategoryDisplay_Context').properties['pageView'];
		}
		if(wc.render.getContextById('CategoryDisplay_Context').properties['beginIndex']!='' && document.SetCurrencyPreferenceForm.beginIndex!=null){
			document.SetCurrencyPreferenceForm.beginIndex.value = wc.render.getContextById('CategoryDisplay_Context').properties['beginIndex'];
		}
	}
	else if(document.getElementById('Search_Result_Summary')!=null && document.getElementById('Search_Result_Summary')!='')
	{
		if(wc.render.getContextById('catalogSearchResultDisplay_Context').properties['searchResultsView']!='' && document.SetCurrencyPreferenceForm.pageView!=null){
			document.SetCurrencyPreferenceForm.pageView.value = wc.render.getContextById('catalogSearchResultDisplay_Context').properties['searchResultsView'];
		}
		if(wc.render.getContextById('catalogSearchResultDisplay_Context').properties['searchResultsPageNum']!='' && document.SetCurrencyPreferenceForm.beginIndex!=null){
			document.SetCurrencyPreferenceForm.beginIndex.value=wc.render.getContextById('catalogSearchResultDisplay_Context').properties['searchResultsPageNum']
		}
	}
	else if(document.getElementById('Search_Result_Summary2')!=null && document.getElementById('Search_Result_Summary2')!='')
	{
		if(wc.render.getContextById('contentSearchResultDisplay_Context').properties['searchResultsView']!='' && document.SetCurrencyPreferenceForm.pageView!=null){
			document.SetCurrencyPreferenceForm.pageView.value = wc.render.getContextById('contentSearchResultDisplay_Context').properties['searchResultsView'];
		}
		if(wc.render.getContextById('contentSearchResultDisplay_Context').properties['searchResultsPageNum']!='' && document.SetCurrencyPreferenceForm.beginIndex!=null){
			document.SetCurrencyPreferenceForm.beginIndex.value=wc.render.getContextById('contentSearchResultDisplay_Context').properties['searchResultsPageNum']
		}
	}
	
	//allow coshopper to change currency. Only used for coshopping
	try {
		if (window.top._ceaCollabDialog!=undefined || window.top._ceaCollabDialog!=null) {	
			$('#SetCurrencyPreferenceForm')[0].URL.value= 
					$('SetCurrencyPreferenceForm')[0].URL.value + "&coshopChangeCurrency=" +
					$('#currencySelection')[0].options[$('#currencySelection')[0].selectedIndex].value;
		}
	}catch(err) {
		console.log(err);
	}
}


/**
 * Updates view (image/detailed) and starting index of pagination of product display in LanguageSelectionForm when language is changed from the drop-down menu.
 * These are later passed as url parameters.
 */

function updateViewAndBeginIndexForLanguageChange(){
	if(document.getElementById('fastFinderResultControls')!=null && document.getElementById('fastFinderResultControls')!='')
	{
		if(document.LanguageSelectionForm.pageView!= null){
			document.LanguageSelectionForm.pageView.value = document.FastFinderForm.pageView.value;
		}
		if(document.LanguageSelectionForm.beginIndex!= null){
			document.LanguageSelectionForm.beginIndex.value = document.FastFinderForm.beginIndex.value;
		}
	}
	else if(document.getElementById('CategoryDisplay_Widget')!=null && document.getElementById('CategoryDisplay_Widget')!='')
	{
		if(wc.render.getContextById('CategoryDisplay_Context').properties['pageView']!='' && document.LanguageSelectionForm.pageView!= null){
			document.LanguageSelectionForm.pageView.value = wc.render.getContextById('CategoryDisplay_Context').properties['pageView'];
		} 
		if(wc.render.getContextById('CategoryDisplay_Context').properties['beginIndex']!='' && document.LanguageSelectionForm.beginIndex!= null){
			document.LanguageSelectionForm.beginIndex.value = wc.render.getContextById('CategoryDisplay_Context').properties['beginIndex'];
		} 
	}
	else if(document.getElementById('Search_Result_Summary')!=null && document.getElementById('Search_Result_Summary')!='')
	{
		if(wc.render.getContextById('catalogSearchResultDisplay_Context').properties['searchResultsView']!='' && document.LanguageSelectionForm.pageView!= null){
			document.LanguageSelectionForm.pageView.value = wc.render.getContextById('catalogSearchResultDisplay_Context').properties['searchResultsView'];
		}
		if(wc.render.getContextById('catalogSearchResultDisplay_Context').properties['searchResultsPageNum']!='' && document.LanguageSelectionForm.beginIndex!= null){
			document.LanguageSelectionForm.beginIndex.value = wc.render.getContextById('catalogSearchResultDisplay_Context').properties['searchResultsPageNum'];
		}
	}
	else if(document.getElementById('Search_Result_Summary2')!=null && document.getElementById('Search_Result_Summary2')!='')
	{
		if(wc.render.getContextById('contentSearchResultDisplay_Context').properties['searchResultsView']!='' && document.LanguageSelectionForm.pageView!= null){
			document.LanguageSelectionForm.pageView.value = wc.render.getContextById('contentSearchResultDisplay_Context').properties['searchResultsView'];
		}
		if(wc.render.getContextById('contentSearchResultDisplay_Context').properties['searchResultsPageNum']!='' && document.LanguageSelectionForm.beginIndex!= null){
			document.LanguageSelectionForm.beginIndex.value = wc.render.getContextById('contentSearchResultDisplay_Context').properties['searchResultsPageNum'];
		}
	}
	
	//appending landId to the URL. Only used for coshopping
	try {
		if (window.top._ceaCollabDialog!=undefined || window.top._ceaCollabDialog!=null) {	
			$('#LanguageSelectionForm')[0].action= 
				$('#LanguageSelectionForm')[0].action + "&langId=" +
				$('#languageSelection')[0].options[$('#languageSelection')[0].selectedIndex].value;
		}
	}catch(err) {
		console.log(err);
	}
}

/**
 * Displays the header links in two lines.
 */
function showHeaderLinksInTwoLines(){
//	if($('header_links1').length > 0){
//		if(dojo.contentBox(document.getElementById("header_links")).w > 750){
//			$('#header_links1').show();
//			$('#headerHomeLink').hide();
//			$('#headerShopCartLink').hide();
//		}
//		$('#header_links').css('visibility', 'visible');
//	}
}

/**
  * Displays the header links in one line.
  */
function showLinksInOneLine(){
	$('#header_links').css('visibility', 'visible');
}

/**
 * Validates if the input value is a non-negative integer using regular expression.
 *
 * @param {String} value The value to validate.
 * 
 * @return {Boolean} Indicates if the given value is a non-negative integer. 
 */
function isNonNegativeInteger(value){
	var regExpTester = new RegExp(/^\d*$/);
	return (value != null && value != "" && regExpTester.test(value));
}

/**
* Validates if the input value is a positive integer.
*
* @param {String} value The value to validate.
* 
* @return {Boolean} Indicates if the given value is a positive integer. 
*/
function isPositiveInteger(value){
	return (isNonNegativeInteger(value) && value != 0);
}

/**
 * This function closes all dijit.dialogs on the page. 
 */
function closeAllDialogs(){
//	dijit.registry.byClass("dijit.Dialog").forEach(function(w){w.hide()});
}
 
/**
 * This function store a error key in the cookie. The error key will be used to retrieve error messages. 
 * @param {String} errorKey  The key used to retrieve error/warning messages. 
 */
function setWarningMessageCookie(errorKey) {
	$.cookie("signon_warning_cookie",errorKey);
}
/**
* This function removes a cookie
* @param {String} name the name of the cookie to be removed. 
*/
function removeCookie(name) {
	$.cookie(name, null, {expires: -1,path:"/"});
}
/**
* This function gets a cookie
* @param {String} c the name of the cookie to be get.
*/
function getCookie(c) {
	return $.cookie(c);
}

/**
 * checks if the store is in preview mode
 * @param {String} contextPathUsed The context path being used by the Store. 
 * @param {String} criteria criteria used to check if contextPathUsed is the preview context. 
 */
function isStorePreview(contextPathUsed,criteria) {
	if(contextPathUsed.indexOf(criteria)>-1) {
		return true;
	}
	return false;
}

/**
 * checks hides the ESpot info popup window
 * @param {String} The id of the popup dialog
 * @param {String} The browser event
 */
function hideESpotInfoPopup(id,event) { 
	if(event!=null && event.type=="keypress" && event.keyCode!="27") {
		return;
	}
	else {
		var quickInfo = dijit.byId(id);
		if(quickInfo != null) {
			quickInfo.hide();
		}
	}
}

/**
 * checks shows the ESpot info popup window
 * @param {String} The id of the popup dialog
 * @param {String} The browser event
 */
function showESpotInfoPopup(id,event) { 
	if(event!=null && event.type=="keypress" && event.keyCode!="13") {
		return;
	}
	else {
		var quickInfo = dijit.byId(id);
		if(quickInfo != null) {
			quickInfo.show();
		}
	}
}  
/**
* This function increments the numAjaxRequests counter by 1. 
*/
function incrementNumAjaxRequest(){
	if(numAjaxRequests != 'undefined'){
		numAjaxRequests++;
	}
}

/**
* This function decrements the numAjaxRequests counter by 1. 
*/
function decrementNumAjaxRequest(){
	if(numAjaxRequests != 'undefined'){
		if(numAjaxRequests != 0){
			numAjaxRequests--;
		}
	}
}

function doDynamicAutoSuggest(url, searchTerm, showHeader) {
	// if pending autosuggest triggered, cancel it.
	if(autoSuggestTimer != -1) {
		clearTimeout(autoSuggestTimer);
		autoSuggestTimer = -1;
	}

	// call the auto suggest
	autoSuggestTimer = setTimeout(function() {
		var params = {};
		params['term'] = encodeURI(searchTerm);
		params['showHeader'] = showHeader;
		params['catalogId'] = $('#CatalogSearchForm [name=catalogId]').val();
		params['storeId'] = $('#CatalogSearchForm [name=storeId]').val();
		params['brandCount'] = $('#autoSuggest_Container [id^=autoSuggestStatic] [id^=suggestionItem]').length;
		
		if($('[id^=usefulHeader]').length > 0){
			$('[id^=usefulHeader]').remove();
		}
		
		$.ajax({
			url: url,
			data: params,
			dataType: 'html',
			type: 'post',
			complete: function(response){
				if (response == null || response.responseText == null){
					document.getElementById("autoSuggestDynamic_Result_div").innerHTML = "";
					obj = {
							'id' : 'Error', 
							'Error_Source' : 'Client', 
							'Error_Code' : 'Search',
							'Error_Details' : 'Unable to search for products'
					}
					tealium_data2track.push(obj);
				}else{
					var $body = angular.element(document.body);
					var $rootScope = $body.scope().$root;
					if(typeof $rootScope !== 'undefined' && $rootScope.wrapAngular != undefined && typeof $rootScope.wrapAngular === 'function'){
						$rootScope.wrapAngular($('#autoSuggestDynamic_Result_div').html(response.responseText));
						$rootScope.wrapAngular($('#autoSuggestDynamic_Result_div .square'));
                        obj = {
                                'id' : 'SearchPageReady', 
                                'Search_ResultItemsQnt' : document.getElementById("totalProductCount").value, 
                                'Search_Keyword' : searchTerm,
                                'Search_KeyActual' : searchTerm,
                                'Search_Type' : 'text',
                                'Search_View' : 'SERB'
                        }
                        tealium_data2track.push(obj);
					}
					if($('[id^=usefulHeader]').length == 0)
						$('#usefulHeader').insertAfter($('#autoSuggestDynamic_Result_div'));
				}
				showAutoSuggestIfResults();
			}, error: function(){
				obj = {
					'id' : 'Error', 
					'Error_Source' : 'Client', 
					'Error_Code' : 'Search',
					'Error_Details' : 'Unable to search for products'
				}
				tealium_data2track.push(obj);
			}
		});
		autoSuggestTimer = -1;
		
	}, autoSuggestKeystrokeDelay);
}


function showAutoSuggest(display) {
	var autoSuggest_Result_div = document.getElementById("autoSuggest_Result_div");
	var search_results_suggestions = document.getElementById("search_results_suggestions");
	if ($.browser.msie && parseInt($.browser.version)  < 7){
		var autoSuggest_content_div = document.getElementById("autoSuggest_content_div");
		var autoSuggestDropDownIFrame = document.getElementById("autoSuggestDropDownIFrame");
	}
	
	$('#autoCompleteContainer').html('');
	if(autoSuggest_Result_div != null && autoSuggest_Result_div != 'undefined') {
		if(display) {
			autoSuggest_Result_div.style.display = "block";
			search_results_suggestions.style.display = "none";
			if ($.browser.msie && parseInt($.browser.version)  < 7) {
				autoSuggestDropDownIFrame.style.height = autoSuggest_content_div.scrollHeight;
				autoSuggestDropDownIFrame.style.display = "block";
			}
			
			var searchTerm = $('#SimpleSearchForm_SearchTerm').val();
			if (searchTerm.length > 0){
				var searchTermStripped = searchTerm.replace(' ', '').replace('-', '').toLowerCase();
				var autoSuggestResults = $('.autoSuggest_wrapper [id^="autoSelectOption"]').map(function(){
					return $(this).find('.product-brand').text() + "/" + $(this).find('.product-name').text();
				});
				
				var foundMatch = false;
				for (var i = 0; i < autoSuggestResults.length; i++){ 
					var result = autoSuggestResults[i].split("/");
					for(var j = 0; j<result.length;j++){
						var resultStripped = result[j].replace(' ', '').replace('-', '');
						if (resultStripped.toLowerCase().indexOf(searchTermStripped) == 0){
							if(!foundMatch){
								result[j]=result[j].replace(/(.*?) &.*/i, "$1");
								if(CheckSpecialCharacter(searchTerm) == true && CheckSpecialCharacter(result[j]) == true ){
									$('#autoCompleteContainer').html('<span class="full"><span class="no-visible">'+searchTerm+'</span><span class="show">' + result[j].substring(searchTerm.length)+'</span></span>');
								}
								else if(CheckSpecialCharacter(searchTerm) == true && CheckSpecialCharacter(result[j]) == false){
									$('#autoCompleteContainer').html('<span class="full"><span class="no-visible">'+searchTerm+'</span><span class="show">' + result[j].substring(searchTerm.length)+'</span></span>');	
								}
								else if(CheckSpecialCharacter(searchTerm) == false && CheckSpecialCharacter(result[j]) == true){
									var specialCharData =CheckSpecialCharacterIndex(result[j]);
									if(searchTerm.length > specialCharData){
										$('#autoCompleteContainer').html('<span class="full"><span class="no-visible">'+searchTerm+'</span><span class="show">' + result[j].substring(searchTerm.length+1)+'</span></span>');
									}else{
										$('#autoCompleteContainer').html('<span class="full"><span class="no-visible">'+searchTerm+'</span><span class="show">' + result[j].substring(searchTerm.length)+'</span></span>');
									}
								}else {
									$('#autoCompleteContainer').html('<span class="full"><span class="no-visible">'+searchTerm+'</span><span class="show">' + result[j].substring(searchTerm.length)+'</span></span>');
								}
								foundMatch = true;
							}
						}
					}
				}
			}
			
		}
		else {
			if ($.browser.msie && parseInt($.browser.version)  < 7) {
				autoSuggestDropDownIFrame.style.display = "none";
				autoSuggestDropDownIFrame.style.height = 0;
			}
//			autoSuggest_Result_div.style.display = "none";
		}
	}
}

function showAutoSuggestIfResults() {
	// if no results, hide the autosuggest box
	if(typeof(staticContent) != "undefined" && document.getElementById(staticContentSectionDiv[0]).innerHTML == "" && document.getElementById("autoSuggestHistory").innerHTML == "" && document.getElementById("dynamicAutoSuggestTotalResults") == null) {
		//showAutoSuggest(false);
	}
	else 
	if(document.getElementById("SimpleSearchForm_SearchTerm").value.length <= AUTOSUGGEST_THRESHOLD) {
		showAutoSuggest(false);
	}
	else {
		showAutoSuggest(true);
	}
}

function selectAutoSuggest(term) {
	var searchBox = document.getElementById("SimpleSearchForm_SearchTerm");
	searchBox.value = term;
	searchBox.focus();
	autoSuggestPreviousTerm = term;
	submitSpecifiedForm(document.CatalogSearchForm)
}

function highLightSelection(state, index) {
	var selection = document.getElementById("autoSelectOption_" + index);
	if(selection != null && selection != 'undefined') {
		if(state) {
			selection.className = "autoSuggestSelected";
			var searchBox = document.getElementById("SimpleSearchForm_SearchTerm");
			searchBox.setAttribute("aria-activedescendant", "suggestionItem_" + index);
			var totalDynamicResults = document.getElementById("dynamicAutoSuggestTotalResults");
			if((totalDynamicResults != null && totalDynamicResults != 'undefined' && index < totalDynamicResults.value) || (index >= historyIndex)) {
				searchBox.value = selection.title;
				autoSuggestPreviousTerm = selection.title;
				autoSuggestURL = "";
			}
			else {
				autoSuggestURL = selection.href;
			}
		}
		else {
			selection.className = "";
		}
		return true;
	}
	else {
		return false;
	}
}

function enableAutoSelect(index) {
	highLightSelection(false, autoSelectOption);
	var item = document.getElementById('autoSelectOption_' + index);
	item.className = "autoSuggestSelected";
	autoSelectOption = index;
}

function resetAutoSuggestKeyword() {
	var originalKeyedSearchTerm = document.getElementById("autoSuggestOriginalTerm");
	if(originalKeyedSearchTerm != null && originalKeyedSearchTerm != 'undefined') {
		var searchBox = document.getElementById("SimpleSearchForm_SearchTerm");
		searchBox.value = originalKeyedSearchTerm.value;
		autoSuggestPreviousTerm = originalKeyedSearchTerm.value;
	}
}

function clearAutoSuggestResults() {
	// clear the static search results.
	for (var i = 0; i < staticContent.length; i++) {
		document.getElementById(staticContentSectionDiv[i]).innerHTML = "";
	}
	autoSuggestPreviousTerm = "";
	autoSuggestURL = "";
	// clear the dynamic search results;
	document.getElementById("autoSuggestDynamic_Result_div").innerHTML = "";
	showAutoSuggest(false);
}

function doAutoSuggest(event, url, searchTerm) {
	$('#autoCompleteContainer').text('');
	
	if(searchTerm.length <= AUTOSUGGEST_THRESHOLD ) {
		showAutoSuggest(false);
	}

	// enter key
	if(event.keyCode == 13) {
		return;
	}

	// tab key
	if(event.keyCode == 9) {
		autoSuggestHover = true;
		return;
	}
	
	// escape key
	if(event.keyCode == 27) {
		showAutoSuggest(false);
		return;
	}

	// up arrow
	if(event.keyCode == 38) {
		var totalDynamicResults = document.getElementById("dynamicAutoSuggestTotalResults");
		if(highLightSelection(true, autoSelectOption-1)) {
			highLightSelection(false, autoSelectOption);
			if(autoSelectOption == historyIndex) {
				resetAutoSuggestKeyword();
			}
			autoSelectOption--;
		}
		else if(autoSelectOption == CACHED_AUTOSUGGEST_OFFSET && totalDynamicResults != null && totalDynamicResults != 'undefined') {
			highLightSelection(false, CACHED_AUTOSUGGEST_OFFSET);		
			autoSelectOption = totalDynamicResults.value-1;
			highLightSelection(true, autoSelectOption);
		}
		else {
			// up arrow back to the very top
			highLightSelection(false, autoSelectOption);
			autoSelectOption = -1;
			var originalKeyedSearchTerm = document.getElementById("autoSuggestOriginalTerm");
			resetAutoSuggestKeyword();
		}
		return;
	}

	// down arrow
	if(event.keyCode == 40) {
		if(highLightSelection(true, autoSelectOption+1)) {
			highLightSelection(false, autoSelectOption);
			autoSelectOption++;
		}
		else if(autoSelectOption < CACHED_AUTOSUGGEST_OFFSET && highLightSelection(true, CACHED_AUTOSUGGEST_OFFSET)) {
			// down arrow into the cached autosuggest section
			highLightSelection(false, autoSelectOption);
			autoSelectOption = CACHED_AUTOSUGGEST_OFFSET;
			resetAutoSuggestKeyword();
		}
		return;
	}

	if(searchTerm.length > AUTOSUGGEST_THRESHOLD && searchTerm == autoSuggestPreviousTerm) {
		return;
	}
	else {
		autoSuggestPreviousTerm = searchTerm;
	}

	if(searchTerm.length <= AUTOSUGGEST_THRESHOLD) {
		return;
	};

	// cancel the dynamic search if one is pending
	if(autoSuggestTimer != -1) {
		clearTimeout(autoSuggestTimer);
		autoSuggestTimer = -1;
	}

	if(searchTerm != "") {
		// delete \ from string to avoid errors
		if(searchTerm.endsWith("\\")) {
			backslashIndex = searchTerm.indexOf("\\");
			searchTerm = searchTerm.slice(0, backslashIndex);
		}

		autoSelectOption = -1;
		var hasResults = doStaticAutoSuggest(searchTerm);
		if(searchTerm.length > DYNAMIC_AUTOSUGGEST_THRESHOLD) {
			var showHeader = true; // hasResults;
			doDynamicAutoSuggest(url, searchTerm, showHeader);
		}else {
			// clear the dynamic results
			document.getElementById("autoSuggestDynamic_Result_div").innerHTML = "";
		}
	}
	else {
		clearAutoSuggestResults();
	}
}

function doStaticAutoSuggest(searchTerm) {
	var resultList = ["", "", "", ""];
	var resultListMatchBegin = ["", "", "", ""];
	var resultListMatchMiddle = ["", "", "", ""];
	var emptyCell = 0;
	var searchTermLower = searchTerm.toLowerCase().replace(' ', '').replace('-', '');
	var listCount = CACHED_AUTOSUGGEST_OFFSET;
	var found = false;

	for(var i = 0; i < staticContent.length; i++) {
		var count = 0;
		for(var j = 0; j < staticContent[i].length; j++) {
			var searchName = staticContent[i][j][0];
			var searchURL = staticContent[i][j][1];
			var displayName = staticContent[i][j][2];
			var searchNameLower = searchName.toLowerCase(); 
			var index = searchNameLower.indexOf(searchTermLower);
			if(index > -1) {
				var displayIndex = index + displayName.length - searchName.length;
				
				var resultHTML = "<li id='suggestionItem_" + listCount + "' role='listitem' tabindex='-1'>" +
				"<a id='autoSelectOption_" + listCount + "' title='" + displayName + "' onmouseout='this.className=\"\"; autoSuggestURL=\"\";' onmouseover='enableAutoSelect(" + listCount + "); autoSuggestURL=this.href;' href=\"" + searchURL + "\">" +
				'<span class="name-holder"><span class="product-brand">' + displayName + '</span></span>'	// insert the image
				displayName.substr(0, displayIndex) + "<strong>" + displayName.substr(displayIndex, searchTerm.length) + "</strong>" + displayName.substr(displayIndex + searchTerm.length) + "</a></li>";

				if(index == 0 && !found) {
					resultListMatchBegin[i] = resultHTML + resultListMatchBegin[i];
					found = true;
				} else if(index == 0) {	
					resultListMatchBegin[i] = resultListMatchBegin[i] + resultHTML;
				} else {
					resultListMatchMiddle[i] = resultListMatchMiddle[i] + resultHTML;
				}
				count++;
				listCount++;
				if(count >= TOTAL_SUGGESTED) {
					break;
				}
			}
		}
	}
	
	for(var i = 0; i < count; i++) {
		if(typeof resultListMatchBegin[i] != "undefined" && resultListMatchBegin[i] != "") {
			resultList[0] = resultList[0] + resultListMatchBegin[i];
		}
	}
	
	for(var i = 0; i < count; i++) {
		if(typeof resultListMatchMiddle[i] != "undefined" && resultListMatchMiddle[i] != "") {
			resultList[0] = resultList[0] + resultListMatchMiddle[i];
		}
	}
	
	for (var i = 0; i < staticContent.length; i++) {
		document.getElementById(staticContentSectionDiv[i]).innerHTML = "";
		if(resultList[i] != "") {
			document.getElementById(staticContentSectionDiv[emptyCell]).innerHTML = "<div class='results col-3'><div class='heading'>" + staticContentHeaders[i] + "</div><ul>" + resultList[i] + "</ul></div>";
			emptyCell++;
		}
	}

	var historyList = "";
	var searchHistorySection = document.getElementById("autoSuggestHistory");
	searchHistorySection.innerHTML = "";
	var historyArray = new Array();
	historyIndex = listCount;

	var searchHistoryCookie = getCookie("searchTermHistory");

	if(historyList != "") {
		searchHistorySection.innerHTML = "<div class='results'><div class='heading'>" + staticContentHeaderHistory + "</div><ul>" + historyList + "</ul></div>";
		emptyCell++;
	}

	if(emptyCell > 0) {
		showAutoSuggest(true);
		return true;
	}

	return false;
}

function retrieveCachedSuggestions(url) {
	if(!retrievedCachedSuggestions) {
		$.ajax({
			url: url,
			dataType: 'html',
			type: 'post',
			complete: function(resp){
				var response = resp.responseText;
				
				$('#autoSuggestCachedSuggestions_div').html(response);
				retrievedCachedSuggestions = true;
                var searchTerm = document.getElementById("SimpleSearchForm_SearchTerm").value;
                if(searchTerm.length > AUTOSUGGEST_THRESHOLD) {
                       doStaticAutoSuggest(searchTerm);
                }
                
			}
		});
		//Analytics Framework
		try{
		   var obj = {
		      id : 'WCS-D-Search-PageReady' // utag_data properties
		   };
		    
		}catch(err){
		    var obj = {
		        id: 'WCS-D-Search-PageReady-Error',
		        Error_Source: 'Server',
		        Error_Code: 'utag_data syntax - '+err.message
		    };
		    tealium_data2track.push(obj);
		}
		//END Analytics Framework
	}
}



function onKeyPressFunctions(event){
	
	  if(event.keyCode==13)
	  {
		  var searchText = $('.search-txt').val();
		  if(searchText.length == 0 || searchText == 'Search LensCrafters.com') {
			  event.preventDefault();
			  return false;
		  }
		  
		  //Check if autocomplete is not nonsense
		  var autoCompleteText = trim($('#autoCompleteContainer').text());
		  if(autoCompleteText.length == 0){
			  $('.search-txt').val(trim(searchText) ); 
		  }else{
			  $('.search-txt').val(autoCompleteText);
		  }

		  //Check if search text doesn't end with a unaccepted character
		if (searchText.includes(".")) {
		$('.search-txt').val(searchText.replaceAll('.', ''));
		} else if (searchText.includes("/")) {
			$('.search-txt').val(searchText.replaceAll('/', ''));
		}

		  try {
			  document.CatalogSearchForm.submit();
		  } catch (e) {
				obj = {
					id: 'Error',
					Error_Source: "Client",
					Error_Code: "Search",
					Error_Message: 'Unable to search for product'
				}
				tealium_data2track.push(obj);
		  }
	  }
}

function popupClose(wishlistPopupClose)
{
	$('#AddedWishlistDialogDiv').css('display', 'none').attr('aria-hidden', 'true');
	$('#content_wrapper_box').customShow();
} 


	
function CheckSpecialCharacter(string){
	var specialChars = "<>@!#$%^&*()_+[]{}?:;|'\"\\,./~`-="
    for(i = 0; i < specialChars.length;i++){
        if(string.indexOf(specialChars[i]) > -1){
            return true
        }
    }
    return false;
}

function CheckSpecialCharacterIndex(string){
	var specialChars = "<>@!#$%^&*()_+[]{}?:;|'\"\\,./~`-="
    for(i = 0; i < specialChars.length;i++){
        if(string.indexOf(specialChars[i]) > -1){
            return string.indexOf(specialChars[i]);
        }
    }
    return false;
}

function affirmInitiateCheckout(affirmInitiateCheckoutURL,affirmAuthorizeURL) {
	$('#affirm-loading-icon-checkout').removeClass('hidden');
	$(".affirm-overlay").show();
	if(!affirmAuthorizeURL.includes(window.location.hostname)) {
		affirmAuthorizeURL = [window.location.protocol, '//', window.location.hostname, affirmAuthorizeURL].join('');
	}
	$.ajax({
		  type: "POST",
		  url: affirmInitiateCheckoutURL,
		  data: {
			  "affirmAuthorizeURL" : affirmAuthorizeURL
		  },
		  success: function(res) {
			  if (res.affirmToken != undefined) {
				  affirm.checkout({
					  "checkoutAri": res.affirmToken,
					  "metadata": {
					  	"mode":"modal"
					  }
				  });
				  affirm.ui.ready(function() {
			        affirm.ui.error.on("close",function() {
			            console.log("Affirm modal closed");
						location.href = decodeURIComponent(res.affirmErrorURL);
			        });
				  });
				  affirm.checkout.open({
					  onFail: function(a){
						  console.log(a)
							obj = {
								id: 'Error',
								Error_Source: "Server",
								Error_Code: "Checkout - Payment",
								Error_Message: 'Affirm Checkout'
							}
							tealium_data2track.push(obj);
						  if(a.reason.indexOf("canceled") == -1){
							  setPageLocation(decodeURIComponent(res.affirmErrorURL));
						  }else{
							  location.reload();
						  }
					  },
					  onSuccess: function(a){
						  setPageLocation(affirmAuthorizeURL+"&affirmToken="+res.affirmToken+"&requestID="+res.requestID+"&requestToken="+res.requestToken);
					  }
				  });
			  } else {
				  obj = {
						id: 'Error',
						Error_Source: "Server",
						Error_Message: 'Affirm Checkout'
					}
					tealium_data2track.push(obj);
				  setPageLocation(decodeURIComponent(res.affirmErrorURL));
			  }
		  },
		  error: function(res) {
			  obj = {
				  id: 'Error',
				  Error_Source: "Server",
				  Error_Code: "Checkout - Payment",
				  Error_Message: 'Affirm Checkout'
			  }
			  tealium_data2track.push(obj);
			  //setPageLocation(window.location.href+(window.location.href.indexOf("?") > -1 ? "&" : "?")+"cart=true&affirmError=true");
			  location.search="catalogId="+getUrlParameter('catalogId')+"&storeId="+getUrlParameter('storeId')+"&mode=payment&affirmError=true";//catalogId=17003&langId=-1&storeId=10851&mode=payment
		  },
		  dataType: "json"
		});
	}

	function getUrlParameter(sParam) {
	    var sPageURL = window.location.search.substring(1),
	        sURLVariables = sPageURL.split('&'),
	        sParameterName,
	        i;

	    for (i = 0; i < sURLVariables.length; i++) {
	        sParameterName = sURLVariables[i].split('=');

	        if (sParameterName[0] === sParam) {
	            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
	        }
	    }
	};			

function callAfterpay(currentOrderId, shippingAddressId, billingAddressId, sameAddress, storeConfigLocale, AfterpayAuthorizeURL){
	$('#afterpay-loading-icon-checkout').removeClass('hidden');
	var params = {};

	params['orderId'] = currentOrderId;
	params['shippingAddressId'] = shippingAddressId;
	params['billingAddressId'] = billingAddressId;
	params['isSameShippingAndBillingAddress'] = sameAddress;
	params['country'] = storeConfigLocale;
	if(!AfterpayAuthorizeURL.includes(window.location.hostname)) {
		AfterpayAuthorizeURL = [window.location.protocol, '//', window.location.hostname, AfterpayAuthorizeURL].join('');
	}
	params['redirectConfirmUrl'] = AfterpayAuthorizeURL;

	wc.service.invoke('InitiateAfterpayPayment', params);
}

function getKlarnaToken(orderId,storeId,catalogId,shippingAddressId,billingAddressId){
	
	var params = {};
	
	params['orderId'] = orderId;
	params['storeId'] = storeId;
	params['catalogId'] = catalogId;
	params['shippingAddressId'] = shippingAddressId;
	params['billingAddressId'] = billingAddressId;

	wc.service.invoke('KlarnaForward', params);
}

function getKlarnaParamsUpdateSession(orderId,storeId,catalogId,shippingAddressId,billingAddressId,requestId,klarnaToken,updateLanguage){
	var params = {};
	
	params['orderId'] = orderId;
	params['storeId'] = storeId;
	params['catalogId'] = catalogId;
	params['shippingAddressId'] = shippingAddressId;
	params['billingAddressId'] = billingAddressId;
	params['requestId'] = requestId;
	params['klarnaToken'] = klarnaToken;
	params['updateLanguage'] = updateLanguage;

	//command priority
	$("#WC_commandPriorityKlarnaUpdate").val("true");

	if($('#WC_Klarna_Session_Client_token').val() && $('#WC_Klarna_Session_Client_requestid').val()){
        $('#loader_klarna').removeClass('hidden');
        wc.service.invoke('KlarnaUpdateSession', params);
	}
}

function callKlarna(storeId,catalogId,orderId,shippingAddressId,billingAddressId,klarnaCancelledURL){
	Klarna.Credit.authorize({}, function (res) {
	    var auth_token = res["authorization_token"];
	    var isApproved = res["approved"];
	    var show_form = res["show_form"];
	    if (!auth_token || auth_token.length == 0 || !isApproved || isApproved.length == 0) {
	        MessageHelper.displayErrorMessage("There was an error with Authorize Klarna Payment.");
			setPageLocation(decodeURIComponent(klarnaCancelledURL));
		} else {
	        // Note: we need to pass the token store in auth_token to authorize against it.
			var params = {};
			params['preapprovalToken'] = auth_token;
			params['storeId'] = storeId;
			params['catalogId'] = catalogId;
			params['orderId'] = orderId;
			params['shippingAddressId'] = shippingAddressId;
			params['billingAddressId'] = billingAddressId;

			wc.service.invoke('AuthorizeKlarnaPayment', params);
	    }
	});
}

