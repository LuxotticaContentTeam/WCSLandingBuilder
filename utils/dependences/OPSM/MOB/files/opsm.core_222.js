/*jslint forin: true, sloppy: true, unparam: true, vars: true, white: true */
/*global window, document, jQuery, log */

var opsm = window.opsm || {};

(function(window, document, $, opsm) {
	
	/**
	 * Some general JS functions
	 * 
	 * @author Finn Pröpper, Sapient GmbH <fproepper@sapient.com>
	 */
	opsm.core = (function () {
		
		var getViewportSize = function() {
			return $(window).width();
		};
		
		
		var _googleMapsApiKey = null;
		var setGoogleMapsApiKey = function(googleMapsApiKey) {
			_googleMapsApiKey = googleMapsApiKey;
		};
		
		var getGoogleMapsApiKey = function() {
			return _googleMapsApiKey;
		};
		
		var loadGoogleMapsAPI = function(callback, googleMapsApiKey) {
			if(!$('.getDirectionContainer').length){
				var apiScript = document.createElement("script");
				apiScript.type = "text/javascript";
				var url  = "//maps.google.com/maps/api/js?v=3.32&language=en&callback=" + callback;
				if (!googleMapsApiKey)
				{
					googleMapsApiKey = _googleMapsApiKey;
				}
				if (googleMapsApiKey)
				{
					url = url + "&key=" + googleMapsApiKey;
				}
				apiScript.src = url;
				document.body.appendChild(apiScript);
			}
		};
		
		var _countryCode = null;
		var setCountryCode = function(countryCode) {
			_countryCode = countryCode;
		}
		
		var getCountryCode = function() {
			return _countryCode;
		}

		/**
		 * Return public properties/methods
		 * 
		 * @see www.wait-till-i.com/2007/08/22/again-with-the-module-pattern-reveal-something-to-the-world/
		 */
		return {
			getViewportSize : getViewportSize,
			loadGoogleMapsAPI : loadGoogleMapsAPI,
			setGoogleMapsApiKey : setGoogleMapsApiKey,
			getGoogleMapsApiKey : getGoogleMapsApiKey,
			getCountryCode : getCountryCode,
			setCountryCode : setCountryCode
		};
		
	}());
	
}(window, document, jQuery, opsm));