var app = angular.module('TargetOpticalApp', ['angularMoment']);

app.config(['$httpProvider', function($httpProvider) {
    //initialize get if not there
    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};    
    }    
    $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
    $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
    $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
}]);

app.factory('$loader', function() {
	
	var _previousContent;
	var _container;
	
	function _create(element) {
		// create loader item
		var _div = document.createElement('div');
		_div.id = 'loader';
		_div.className = 'wait-loader hidden';
		_div.addEventListener("click", function(event) {
			event.preventDefault();
        	event.stopImmediatePropagation();
		});
		
		// add spinner
		var _spin = document.createElement('em');
		_spin.className = 'fa fa-spinner fa-spin';
		_div.appendChild(_spin);
		
		// add to container
		
		if(element == undefined)
			element = 'page-container';
		
		_container = document.getElementById(element);

		if (!angular.isUndefined(_container)) {
			if(_container.tagName == 'A'){
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
		
		show: function(element) {
						
			this._loader = _create(element);
			
			this._loader.classList.remove("hidden");	
		},
		
		hide: function() {
			if (this._loader == null) {					
				this._loader = _create();
			}
			
			this._loader.classList.add("hidden");	
			_container.classList.remove("no-underline");
			
			if(_previousContent != undefined)
				_container.innerHTML = _previousContent;
		}
	}
});