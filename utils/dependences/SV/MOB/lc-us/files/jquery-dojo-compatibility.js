// mimic dojo with a jquery implementation
dojo = {
	// internal properties, used to maintain the pub/sub model
	channels: {},
	channelContexts: {},
	
	// external methods
	addClass: function(el, val){
		if (typeof el == 'string'){
			$('#' + el).addClass(val);
		}else{
			$(el).addClass(val);
		}
	},
	addOnLoad:  function(f){
		$(document).ready(f);
	},
	attr: function(el, attrName, value){
		var $el;
		if (typeof el == 'string'){
			$el = $('#' + el); 
		}else{
			$el = $(el);
		}
		
		return $el.attr.apply($el, [attrName, value]);
	},
	back: {
		init: function(){},
		setInitialState : function(){}
	},
	byId: function(id){
		if (typeof id == 'string'){
			return document.getElementById(id);
		}else{
			return $(id)[0]; 
		}
	},
	connect: function(el, eventType, callback){
		var $el = null,
			eventType = eventType.replace('on', '');
		if (typeof el == 'string'){
			$el = $('#' + el);
		}else{
			$el = $(el);
		}
		$el.bind(eventType, callback);
	},
	cookie: function(){
		return $.cookie.apply(window, arguments);
	},
	dnd: {
		Moveable: function(){return {};},
		Source: function(){
			var obj = {
				copyOnly: false,
				setItem: function(){}
			}
			return obj;
		}
	},
	isArray: function(obj){
		return $.isArray(obj);
	},
	keys: {"BACKSPACE":8,"TAB":9,"CLEAR":12,"ENTER":13,"SHIFT":16,"CTRL":17,"ALT":18,"META":224,"PAUSE":19,"CAPS_LOCK":20,"ESCAPE":27,"SPACE":32,"PAGE_UP":33,"PAGE_DOWN":34,"END":35,"HOME":36,"LEFT_ARROW":37,"UP_ARROW":38,"RIGHT_ARROW":39,"DOWN_ARROW":40,"INSERT":45,"DELETE":46,"HELP":47,"LEFT_WINDOW":91,"RIGHT_WINDOW":92,"SELECT":93,"NUMPAD_0":96,"NUMPAD_1":97,"NUMPAD_2":98,"NUMPAD_3":99,"NUMPAD_4":100,"NUMPAD_5":101,"NUMPAD_6":102,"NUMPAD_7":103,"NUMPAD_8":104,"NUMPAD_9":105,"NUMPAD_MULTIPLY":106,"NUMPAD_PLUS":107,"NUMPAD_ENTER":108,"NUMPAD_MINUS":109,"NUMPAD_PERIOD":110,"NUMPAD_DIVIDE":111,"F1":112,"F2":113,"F3":114,"F4":115,"F5":116,"F6":117,"F7":118,"F8":119,"F9":120,"F10":121,"F11":122,"F12":123,"F13":124,"F14":125,"F15":126,"NUM_LOCK":144,"SCROLL_LOCK":145,"copyKey":17},
	parser: {
		instantiate: function(){}
	},
	publish: function(channel, params){
		// get the associated function and execute it
		var c = this.channels[channel],
			cc = this.channelContexts[channel]; 
		
		if (c == null){
			c = [];
			cc = [];
		}
		
		if (params == null){
			params = [];
		}
		
		for (var i = 0; i < c.length; i++){
			var fn = c[i],
				ctx = cc[i];
			
			if (typeof fn == 'function'){
				fn.apply(ctx, params);
			}else if (window[fn]){				
				window[fn].apply(ctx, params);
			}else{
				ctx[fn].apply(ctx, params);
			}
		}
	},
	query: function(selector, el){
		var results = [];
		if (el == null){
			results = $(selector).toArray();
		}else if ((typeof el) == 'string'){
			results = $(selector, '#' + el).toArray();
		}else if ((typeof el) == 'object'){
			results = $(selector, el).toArray();
		}
		
		results.forEach = function(fn){
			$.each(results, function(index, element){
				fn.apply(element, [element, index]);
			});
		}
		
		return results;
	},
	registerModulePath: function(){},
	removeClass: function(el, val){
		if (typeof el == 'string'){
			$('#' + el).removeClass(val);
		}else{
			$(el).removeClass(val);
		}
	},
	require: function(){},
	style: function(id, prop, value){
		$('#' + id).css(prop, value);
	},
	subscribe: function(channel, ctx, fn){
		// map the channel to the given function
		var c = this.channels[channel],
			cc = this.channelContexts[channel]; 
		
		if (c == null){
			this.channels[channel] = [];
			this.channelContexts[channel] = [];
			
			c = this.channels[channel];
			cc = this.channelContexts[channel];
		}
		
		if (fn == null){
			// if fn is null, then then ctx (context) is really the callback
			c.push(ctx);
			cc.push(window);
		}else{
			// the user provided a context
			c.push(fn);
			cc.push(ctx);
		}
	},
	trim: function(val){
		return $.trim(val);
	}
};

// a class to represent a service
function WCService(properties){
	this.actionId = properties.actionId;
	this.failureHandler = properties.failureHandler;
	this.formId = properties.formId;
	this.id = properties.id;
	this.initProperties = properties.initProperties;
	this.successHandler = properties.successHandler;
	this.url = properties.url;
	this.validateForm = properties.validateForm;
	this.validateParameters = properties.validateParameters;
}

// a class to represent a widget
function WCWidget(id, controllerId, widgetId){
	this.id = id;
	this.controllerId = controllerId;
	this.widgetId = widgetId;
	this.objectId = $('#' + this.id).attr('objectid');
	
	this.controller = wc.render.getRefreshControllerById(controllerId);
	
	this.refresh = function(params){
		if (params == null){
			params = {}; 
		}
		// call the associated refresh controller's refresh method
		this.controller.refresh(this, params);
	}
}

// a class to represent a context
function WCContext(id, properties, url){
	this.id = id;
	this.properties = properties || {};
	this.url = url;
	this.contextChangedEventName = id + "/RenderContextChanged";
	
	/**
	 * When a context is updated, make an ajax request to the associated URL
	 * Aftewards, publish the "RenderContextChanged" and "modelchanged" events,
	 * which will force all subscribed controllers to make their necessary updates 
	 */
	this.update = function(updates){
		if (this.url) {
			for (var key in updates){
				if (updates[key]){
					this.properties[key] = updates[key];
				}else{
					delete this.properties[key];
				}
			}
			
			
			dojo.publish("ajaxRequestInitiated");
			
			var promise = $.ajax({
				url: this.url,
				data: properties,
				dataType: 'json',
				type: 'post',
				context: this});
			
			promise.done(function(data){
				if ($.isArray(data.renderContextChanges)) {
					for (var i = 0; i < data.renderContextChanges.length; i++) {
						var name = data.renderContextChanges[i];
						request.properties[name] = data[name];
					}
					
					dojo.publish(this.contextChangedEventName, [data]);
				}
			});
			promise.always(function(){
				dojo.publish("ajaxRequestCompleted");
			})
		}
		else {
			console.debug("wc.render.updateContext - url not specified");
			
			// local render context
			var data = {
				renderContextChanges: []
			};
			for (var name in updates) {
				var value = updates[name];
				if (value != this.properties[name]) {
					data.renderContextChanges.push(name);
					//wd-todo
					if (typeof value == "undefined")  {
						delete this.properties[name];
					}
					else {
						this.properties[name] = value;
						data[name] = value;
						console.debug("updating render context: " + name + " = " + value);
					}
				}
			}
			console.debug("publishing " + this.contextChangedEventName + " event")
			dojo.publish(this.contextChangedEventName, [data]);
		}
	}
}

// a function to represent a controller
function WCController(properties){
	this.id = properties.id;
	this.renderContext = properties.renderContext;
	this.url = properties.url;
	this.formId = properties.formId;
	this.modelChangedHandler = properties.modelChangedHandler;
	this.renderContextChangedHandler = properties.renderContextChangedHandler;
	this.postRefreshHandler = properties.postRefreshHandler;
	this.currentRCProperties = {};
	
	
	// set up internal events
	this.getWidgets = function(){
		var domElements = $('[controllerId="' + this.id + '"]');
		
		var widgets = domElements.map(function(){
			var $this = $(this);
			return new WCWidget(this.id, $this.attr('controllerId'), $this.attr('widgetId'));
		});
		
		return widgets.toArray(); 
	}
	this.renderContextChanged = function(message){
		var widgets = this.getWidgets();
		
		for (var i in widgets){
			this.renderContextChangedHandler(message, widgets[i]);
		}
		
		this.syncRCProperties();
	}
	this.modelChanged = function(message){
		// when a context changes, the associated controller's modelChanged mehtod is called
		// this method will get all the controller's widgets and refresh them
		var widgets = this.getWidgets();
		
		for (var i in widgets){
			this.modelChangedHandler(message, widgets[i]);
		}
	}
	this.syncRCProperties = function() {
		// summary: Synchronize the local copy of the render context properties with the current
		//		render context properties.
		if (this.renderContext) {
			var properties = {};
			var rc = this.renderContext.properties
			for (var prop in rc) {
				properties[prop] = rc[prop];
			}
			this.currentRCProperties = properties;
		}	
	},
	this.testForChangedRC = function(propertyNames) {
		// summary: Test for changes to the render context.
		var change = false;
		for (var i = 0; i < propertyNames.length; i++) {
			var prop = propertyNames[i];
			if (this.currentRCProperties[prop] != this.renderContext.properties[prop]) {
				change = true;
				break;
			}
		}
		return change;
	}
	this.refresh = function(widget, parameters){
		
		// this method will refresh a rendering area by making a call to this controller's url, using the given parameters
		// when that returns, the content in the associated widgets will be updated with the ajax response contents 
		
		if (!parameters){
			parameters = {};
		}
		
		// update parameters with form data
		var formNode = null;
		if (this.formId){
			var formData = $('#' + this.formId).serializeArray();
			for (var i = 0; i < formData.length; i++){
				var d = formData[i];
				parameters[d.name] = d.value;
			}
			formNode = document.getElementById(this.formId);
		}		
		
		if (!parameters.requesttype) {
			parameters.requesttype = 'ajax';
		}
		
		//Remove all instances of "amp;" in the URL which was added on the JSP by c:out
		this.url = this.url.replace(/amp;/g, "");
		
		dojo.publish("ajaxRequestInitiated");
		var promise = $.ajax({
			url: this.url,
			data: parameters,
			dataType: 'text',
			type: 'post',
			context: this});
		
		promise.done(function(data){
			function getIds(idType, controllerURL) {
				var myId = "";
				if (parameters && parameters[idType]) {
					myId = parameters[idType];
				}
				if (myId == "" && formNode != null && formNode[idType]) {
					myId = formNode[idType];
					if (formNode[idType].value != null) {
						myId = formNode[idType].value;
					}
				}
				if (myId == "" && controllerURL) {
					var temp = controllerURL;
					if (temp.indexOf(idType) != -1) {
						temp = temp.substring(temp.indexOf(idType));
						var tokens = temp.split("&");
						var tokens2 = tokens[0].split("=");
						myId = tokens2[1];
					}
				}
				return myId;
			}

			// determine storeId, catalogId and langId to use in our redirect url
			var storeId = getIds("storeId", this.url);
			var catalogId = getIds("catalogId", this.url);
			var langId = getIds("langId", this.url);

			var errorCodeBegin = data.indexOf('errorCode');
			if (errorCodeBegin != -1) {
				// get error code   
				var errorCodeEnd = data.indexOf(',', errorCodeBegin);
				var errorCodeString = data.substring(errorCodeBegin, errorCodeEnd);

				console.debug('error condition encountered - error code: ' + errorCodeString);
				// error code: ERR_DIDNT_LOGON
				// This error code is returned in the scenario where logon is required and user is not logged on
				if (errorCodeString.indexOf('2550') != -1) {
					console.debug('error type: ERR_DIDNT_LOGON - the customer did not log on to the system.');
					console.debug("redirecting to URL: " + "AjaxLogonForm?storeId=" + storeId + "&catalogId=" + catalogId + "&langId=" + langId + '&myAcctMain=1');	
					document.location.href = "AjaxLogonForm?storeId=" + storeId + "&catalogId=" + catalogId + "&langId=" + langId + '&myAcctMain=1';
				}
				// error code: ERR_SESSION_TIMEOUT
				// This error code is returned in the scenario where user's logon session has timed out
				else if (errorCodeString.indexOf('2510') != -1) {
					//redirect to a full page for sign in
					console.debug('error type: ERR_SESSION_TIMEOUT - use session has timed out');
					console.debug('redirecting to URL: ' + 'Logoff?URL=ReLogonFormView&storeId='+storeId);	
					document.location.href = 'Logoff?URL=ReLogonFormView&storeId='+storeId;	

				// error code: ERR_PROHIBITED_CHAR
				// This error code is returned in the scenario where user has entered prohibited character(s) in the request
				} else if (errorCodeString.indexOf('2520') != -1) {
					console.debug('error type: ERR_PROHIBITED_CHAR - detected prohibited characters in request');
					console.debug("redirecting to URL: " + "ProhibitedCharacterErrorView?storeId=" + storeId + "&catalogId=" + catalogId + "&langId=" + langId);	
					document.location.href = "ProhibitedCharacterErrorView?storeId=" + storeId + "&catalogId=" + catalogId + "&langId=" + langId;
				
				// error code: ERR_CSRF
				// This error code is returned in the scenario where a cross-site request forgery attempt was caught
				} else if (errorCodeString.indexOf('2540') != -1) {
					console.debug('error type: ERR_CSRF - cross site request forgery attempt was detected');
					console.debug("redirecting to URL: " + "CrossSiteRequestForgeryErrorView?storeId=" + storeId + "&catalogId=" + catalogId + "&langId=" + langId);
					document.location.href = "CrossSiteRequestForgeryErrorView?storeId=" + storeId + "&catalogId=" + catalogId + "&langId=" + langId;

				// error code: _ERR_INVALID_COOKIE
				// This error code is returned in the scenario where a cookie error occurs
				} else if (errorCodeString.indexOf('CMN1039E') != -1) {
					console.debug('error type: _ERR_INVALID_COOKIE - cookie error was detected');
					console.debug("redirecting to URL: " + "CookieErrorView?storeId=" + storeId + "&catalogId=" + catalogId + "&langId=" + langId);
					document.location.href = "CookieErrorView?storeId=" + storeId + "&catalogId=" + catalogId + "&langId=" + langId;
				}

			} else {
				var controller = widget.controller;
				console.debug("RefreshController.refresh - calling refreshHandler for " + widget);
				
				
				var $body = angular.element(document.body);  	
				var $rootScope = $body.scope().$root;	
				// refresh the area	
				if(typeof $rootScope !== 'undefined' && $rootScope.wrapAngular != undefined && typeof $rootScope.wrapAngular === 'function')	
					$rootScope.wrapAngular($('#' + widget.id).html(data));	
				else	
					$('#' + widget.id).html(data)
				
				if (controller.postRefreshHandler != null) {
					console.debug("RefreshController.refresh - calling postRefreshHandler for " + widget);
					controller.postRefreshHandler(widget);
				}
			}
		});
		promise.always(function(){
			dojo.publish("ajaxRequestCompleted");
		});

	}
	
	// subscribe the controller to the context
	if ($.isFunction(this.renderContextChangedHandler)) {
		if (this.renderContext){
			dojo.subscribe(this.renderContext.contextChangedEventName, this, "renderContextChanged");
		}
	}
	
	if ($.isFunction(this.modelChangedHandler)){
		dojo.subscribe("modelChanged", this, "modelChanged");
	}
}

wc = {
	service : {
		servicesMap: {}, 
			
		declare: function(properties){
			var s = new WCService(properties);
			this.servicesMap[s.id] = s;
			
			return s;
		},
		getServiceById: function(serviceId){
			return this.servicesMap[serviceId]; 
		},
		invoke: function(serviceId, parameters){
			// parameters should be a hash of kvp
			var service = this.servicesMap[serviceId];
			var promise = null;
			if (service){
				// get the submit parameters
				var data = parameters;
				if (parameters instanceof Array){
					data = {};
					for (var key in parameters){
						data[key] = parameters[key];
					}
				}else if (parameters == null){
					data = {};
				}
				
				// get data from the associated form, if any
				if (service.formId && service.formId != ''){
					var formData = $('#' + service.formId).serializeArray();
					for (var i = 0; i < formData.length; i++){
						var d = formData[i];
						data[d.name] = d.value;
					}
				}
				
				promise = $.ajax({
					url: service.url,
					data: data,
					dataType: 'text',
					traditional: true, // handle arrays
					type: 'post'
				});
				
				// attach the success and failure handlers; 
				// set the "this" keyword to be ServiceDeclarationJS while inside the success/fail handler
				promise.done(function(response){
					var serviceResponse = filterAjaxResponse(response);
					
					// if successful, call the success method
					if (serviceResponse == null || (!serviceResponse.errorMessage && !serviceResponse.errorMessageKey)){
						if (service.successHandler){
							service.successHandler.apply(ServicesDeclarationJS, [serviceResponse]);

							var modelChangedMessage = $.extend(true, {}, serviceResponse);
							modelChangedMessage.actionId = service.actionId;
							modelChangedMessage.serviceId = service.serviceId;
							
							dojo.publish("modelChanged", [modelChangedMessage]);
							if (service.actionId) {
								console.debug("success: publishing modelChanged/" + service.actionId + " event");
								dojo.publish("modelChanged/" + service.actionId, [modelChangedMessage]);
							}
						}
					}else{
						// HANDLE LOGON AND PASSWORD ERRORS
						// determine storeId, catalogId and langId to use in our redirect url
						var storeId = ServicesDeclarationJS.storeId;
						var catalogId = ServicesDeclarationJS.catalogId;
						var langId = ServicesDeclarationJS.langId;

						// error code: ERR_USER_NOT_LOGGED_ON
						// This error code is returned in the scenario where logon is required and user is not logged on
						if (serviceResponse.errorCode == '2500') {
							var myURL = serviceResponse.originatingCommand;
							myURL = myURL.replace('?', '%3F');
							myURL = myURL.replace(/&amp;/g, '%26');						
							myURL = myURL.replace(/&/g, '%26');
							myURL = myURL.replace(/=/g, '%3D');

							myURL = 'LogonForm?nextUrl=' + myURL + "&storeId=" + storeId + "&catalogId=" + catalogId + "&langId=" + langId + '&myAcctMain=1';
							console.debug('error type: ERR_USER_NOT_LOGGED_ON - only registered user can invoke the command');
							console.debug('redirecting to URL: ' + myURL);	
							document.location.href = myURL;
						// error code: ERR_DIDNT_LOGON
						// This error code is returned in the scenario where logon is required and user is not logged on
						} else if (serviceResponse.errorCode == '2550') {
							var myURL = serviceResponse.originatingCommand;
							myURL = myURL.replace('?', '%3F');
							myURL = myURL.replace(/&amp;/g, '%26');
							myURL = myURL.replace(/&/g, '%26');
							myURL = myURL.replace(/=/g, '%3D');
							myURL = 'AjaxLogonForm?nextUrl=' + myURL + "&storeId=" + storeId + "&catalogId=" + catalogId + "&langId=" + langId + '&myAcctMain=1';
							console.debug('error type: ERR_DIDNT_LOGON - the customer did not log on to the system.');
							console.debug('redirecting to URL: ' + myURL);	
							document.location.href = myURL;								
						// error code: ERR_PASSWORD_REREQUEST 
						// This error code is returned in the scenario where password is required to proceed
						} else if (serviceResponse.errorCode == '2530') {
							var myURL = serviceResponse.originatingCommand;
							myURL = myURL.replace('?', '%3F');
							myURL = myURL.replace(/&amp;/g, '%26');
							myURL = myURL.replace(/&/g, '%26');
							myURL = myURL.replace(/=/g, '%3D');
							myURL = 'PasswordReEnterErrorView?nextUrl=' + myURL + "&storeId=" + storeId + "&catalogId=" + catalogId + "&langId=" + langId;
							console.debug('error type: ERR_PASSWORD_REREQUEST - password is required');
							console.debug('redirecting to URL: ' + myURL);	
							document.location.href = myURL;

						// error code: ERR_SESSION_TIMEOUT
						// This error code is returned in the scenario where user's logon session has timed out
						} else if (serviceResponse.errorCode == '2510') {
							//redirect to a full page for sign in
							console.debug('error type: ERR_SESSION_TIMEOUT - use session has timed out');
							console.debug('redirecting to URL: ' + 'Logoff?URL=ReLogonFormView&storeId=' + storeId);
							document.location.href = 'Logoff?URL=ReLogonFormView&storeId=' + storeId;	
							
						// error code: ERR_PROHIBITED_CHAR
						// This error code is returned in the scenario where user has entered prohibited character(s) in the request
						} else if (serviceResponse.errorCode == '2520') {
							console.debug('error type: ERR_PROHIBITED_CHAR - detected prohibited characters in request');
							console.debug("redirecting to URL: " + "ProhibitedCharacterErrorView?storeId=" + storeId + "&catalogId=" + catalogId + "&langId=" + langId);	
							document.location.href = "ProhibitedCharacterErrorView?storeId=" + storeId + "&catalogId=" + catalogId + "&langId=" + langId;
						
						// error code: ERR_CSRF
						// This error code is returned in the scenario where a cross-site request forgery attempt was caught
						} else if (serviceResponse.errorCode == '2540') {
							console.debug('error type: ERR_CSRF - cross site request forgery attempt was detected');
							console.debug("redirecting to URL: " + "CrossSiteRequestForgeryErrorView?storeId=" + storeId + "&catalogId=" + catalogId + "&langId=" + langId);
							document.location.href = "CrossSiteRequestForgeryErrorView?storeId=" + storeId + "&catalogId=" + catalogId + "&langId=" + langId;
							
						// error code: _ERR_INVALID_COOKIE
						// This error code is returned in the scenario where a cookie error occurs
						} else if (serviceResponse.errorCode == 'CMN1039E') {
							console.debug('error type: _ERR_INVALID_COOKIE - cookie error was detected');
							console.debug("redirecting to URL: " + "CookieErrorView?storeId=" + storeId + "&catalogId=" + catalogId + "&langId=" + langId);
							document.location.href = "CookieErrorView?storeId=" + storeId + "&catalogId=" + catalogId + "&langId=" + langId;
							
						} else {
							console.debug('calling service.failureHandler');
							service.failureHandler(serviceResponse);
						}
					}
				});
				promise.fail(function(response){
					var serviceResponse = filterAjaxResponse(response);
					if (service.failureHandler){
						service.failureHandler.apply(ServicesDeclarationJS, [serviceResponse]);
					}
				});
				promise.always(function(){
					// mark the ajax request complete
					dojo.publish("ajaxRequestCompleted");
				});
			}
			
			return promise;
		}		
	},
	
	// functions for backwards compatibility
	render: {
		contexts: {},
		controllers: {},
		
		declareRefreshController: function(properties){
			var controller = new WCController(properties);
			this.controllers[controller.id] = controller;
			return controller;
		},
		getRefreshControllerById: function(id){
			return this.controllers[id];
		},
		declareContext: function(id, properties, updateContextURL){
			if(this.contexts[id] != null && this.contexts[id] != ""){
				//console.debug("Render context with id =  " + id + " already exits.Please use a different id");		
				return;
			}
			
			this.contexts[id] = new WCContext(id, properties, updateContextURL); 
			return this.contexts[id];
		},
		getContextById: function(id){
			return this.contexts[id];
		},
		updateContext: function(id, updates){
			this.contexts[id].update(updates);
		}
	}
}

// maintain backwards compatibility by providing a dummy dijit object
dijit = {
	byNode: function(){return {};},
	byId: function(){},
	registry: {
		byClass: function(){
			var obj = {
				forEach: function(){}
			};
			return obj;
		}
	},
	Tooltip: function(){}
}

// dojo-reliant classes
CommonControllersDeclarationJS =  {
	setControllerURL : function(){}
}


/**
 *  Convert a "dojo-filtered" ajax json response into a normal ajax response. Ideally this would
 *  be done using $.ajaxSetup, but that is not working
 */
function filterAjaxResponse(responseText){
	var resp = responseText;
	try{
		resp = $.parseJSON(resp.replace(/^\s*\/\*/, "").replace(/\*\/\s*$/, ""));
	}catch(e){
		console.debug(e);
	}
	
	return resp;
}

function parseWidget(){}