/**!

 @license
 handlebars v4.0.6

Copyright (C) 2011-2016 by Yehuda Katz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/
/**!

 @license
 handlebars v4.0.6

Copyright (C) 2011-2016 by Yehuda Katz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/
/**!

 @license
 handlebars v4.0.6

Copyright (C) 2011-2016 by Yehuda Katz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Handlebars"] = factory();
	else
		root["Handlebars"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(1)['default'];

	exports.__esModule = true;

	var _handlebarsRuntime = __webpack_require__(2);

	var _handlebarsRuntime2 = _interopRequireDefault(_handlebarsRuntime);

	// Compiler imports

	var _handlebarsCompilerAst = __webpack_require__(24);

	var _handlebarsCompilerAst2 = _interopRequireDefault(_handlebarsCompilerAst);

	var _handlebarsCompilerBase = __webpack_require__(25);

	var _handlebarsCompilerCompiler = __webpack_require__(30);

	var _handlebarsCompilerJavascriptCompiler = __webpack_require__(31);

	var _handlebarsCompilerJavascriptCompiler2 = _interopRequireDefault(_handlebarsCompilerJavascriptCompiler);

	var _handlebarsCompilerVisitor = __webpack_require__(28);

	var _handlebarsCompilerVisitor2 = _interopRequireDefault(_handlebarsCompilerVisitor);

	var _handlebarsNoConflict = __webpack_require__(23);

	var _handlebarsNoConflict2 = _interopRequireDefault(_handlebarsNoConflict);

	var _create = _handlebarsRuntime2['default'].create;
	function create() {
	  var hb = _create();

	  hb.compile = function (input, options) {
	    return _handlebarsCompilerCompiler.compile(input, options, hb);
	  };
	  hb.precompile = function (input, options) {
	    return _handlebarsCompilerCompiler.precompile(input, options, hb);
	  };

	  hb.AST = _handlebarsCompilerAst2['default'];
	  hb.Compiler = _handlebarsCompilerCompiler.Compiler;
	  hb.JavaScriptCompiler = _handlebarsCompilerJavascriptCompiler2['default'];
	  hb.Parser = _handlebarsCompilerBase.parser;
	  hb.parse = _handlebarsCompilerBase.parse;

	  return hb;
	}

	var inst = create();
	inst.create = create;

	_handlebarsNoConflict2['default'](inst);

	inst.Visitor = _handlebarsCompilerVisitor2['default'];

	inst['default'] = inst;

	exports['default'] = inst;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	exports["default"] = function (obj) {
	  return obj && obj.__esModule ? obj : {
	    "default": obj
	  };
	};

	exports.__esModule = true;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireWildcard = __webpack_require__(3)['default'];

	var _interopRequireDefault = __webpack_require__(1)['default'];

	exports.__esModule = true;

	var _handlebarsBase = __webpack_require__(4);

	var base = _interopRequireWildcard(_handlebarsBase);

	// Each of these augment the Handlebars object. No need to setup here.
	// (This is done to easily share code between commonjs and browse envs)

	var _handlebarsSafeString = __webpack_require__(21);

	var _handlebarsSafeString2 = _interopRequireDefault(_handlebarsSafeString);

	var _handlebarsException = __webpack_require__(6);

	var _handlebarsException2 = _interopRequireDefault(_handlebarsException);

	var _handlebarsUtils = __webpack_require__(5);

	var Utils = _interopRequireWildcard(_handlebarsUtils);

	var _handlebarsRuntime = __webpack_require__(22);

	var runtime = _interopRequireWildcard(_handlebarsRuntime);

	var _handlebarsNoConflict = __webpack_require__(23);

	var _handlebarsNoConflict2 = _interopRequireDefault(_handlebarsNoConflict);

	// For compatibility and usage outside of module systems, make the Handlebars object a namespace
	function create() {
	  var hb = new base.HandlebarsEnvironment();

	  Utils.extend(hb, base);
	  hb.SafeString = _handlebarsSafeString2['default'];
	  hb.Exception = _handlebarsException2['default'];
	  hb.Utils = Utils;
	  hb.escapeExpression = Utils.escapeExpression;

	  hb.VM = runtime;
	  hb.template = function (spec) {
	    return runtime.template(spec, hb);
	  };

	  return hb;
	}

	var inst = create();
	inst.create = create;

	_handlebarsNoConflict2['default'](inst);

	inst['default'] = inst;

	exports['default'] = inst;
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	exports["default"] = function (obj) {
	  if (obj && obj.__esModule) {
	    return obj;
	  } else {
	    var newObj = {};

	    if (obj != null) {
	      for (var key in obj) {
	        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
	      }
	    }

	    newObj["default"] = obj;
	    return newObj;
	  }
	};

	exports.__esModule = true;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(1)['default'];

	exports.__esModule = true;
	exports.HandlebarsEnvironment = HandlebarsEnvironment;

	var _utils = __webpack_require__(5);

	var _exception = __webpack_require__(6);

	var _exception2 = _interopRequireDefault(_exception);

	var _helpers = __webpack_require__(10);

	var _decorators = __webpack_require__(18);

	var _logger = __webpack_require__(20);

	var _logger2 = _interopRequireDefault(_logger);

	var VERSION = '4.0.5';
	exports.VERSION = VERSION;
	var COMPILER_REVISION = 7;

	exports.COMPILER_REVISION = COMPILER_REVISION;
	var REVISION_CHANGES = {
	  1: '<= 1.0.rc.2', // 1.0.rc.2 is actually rev2 but doesn't report it
	  2: '== 1.0.0-rc.3',
	  3: '== 1.0.0-rc.4',
	  4: '== 1.x.x',
	  5: '== 2.0.0-alpha.x',
	  6: '>= 2.0.0-beta.1',
	  7: '>= 4.0.0'
	};

	exports.REVISION_CHANGES = REVISION_CHANGES;
	var objectType = '[object Object]';

	function HandlebarsEnvironment(helpers, partials, decorators) {
	  this.helpers = helpers || {};
	  this.partials = partials || {};
	  this.decorators = decorators || {};

	  _helpers.registerDefaultHelpers(this);
	  _decorators.registerDefaultDecorators(this);
	}

	HandlebarsEnvironment.prototype = {
	  constructor: HandlebarsEnvironment,

	  logger: _logger2['default'],
	  log: _logger2['default'].log,

	  registerHelper: function registerHelper(name, fn) {
	    if (_utils.toString.call(name) === objectType) {
	      if (fn) {
	        throw new _exception2['default']('Arg not supported with multiple helpers');
	      }
	      _utils.extend(this.helpers, name);
	    } else {
	      this.helpers[name] = fn;
	    }
	  },
	  unregisterHelper: function unregisterHelper(name) {
	    delete this.helpers[name];
	  },

	  registerPartial: function registerPartial(name, partial) {
	    if (_utils.toString.call(name) === objectType) {
	      _utils.extend(this.partials, name);
	    } else {
	      if (typeof partial === 'undefined') {
	        throw new _exception2['default']('Attempting to register a partial called "' + name + '" as undefined');
	      }
	      this.partials[name] = partial;
	    }
	  },
	  unregisterPartial: function unregisterPartial(name) {
	    delete this.partials[name];
	  },

	  registerDecorator: function registerDecorator(name, fn) {
	    if (_utils.toString.call(name) === objectType) {
	      if (fn) {
	        throw new _exception2['default']('Arg not supported with multiple decorators');
	      }
	      _utils.extend(this.decorators, name);
	    } else {
	      this.decorators[name] = fn;
	    }
	  },
	  unregisterDecorator: function unregisterDecorator(name) {
	    delete this.decorators[name];
	  }
	};

	var log = _logger2['default'].log;

	exports.log = log;
	exports.createFrame = _utils.createFrame;
	exports.logger = _logger2['default'];

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports.extend = extend;
	exports.indexOf = indexOf;
	exports.escapeExpression = escapeExpression;
	exports.isEmpty = isEmpty;
	exports.createFrame = createFrame;
	exports.blockParams = blockParams;
	exports.appendContextPath = appendContextPath;
	var escape = {
	  '&': '&amp;',
	  '<': '&lt;',
	  '>': '&gt;',
	  '"': '&quot;',
	  "'": '&#x27;',
	  '`': '&#x60;',
	  '=': '&#x3D;'
	};

	var badChars = /[&<>"'`=]/g,
	    possible = /[&<>"'`=]/;

	function escapeChar(chr) {
	  return escape[chr];
	}

	function extend(obj /* , ...source */) {
	  for (var i = 1; i < arguments.length; i++) {
	    for (var key in arguments[i]) {
	      if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
	        obj[key] = arguments[i][key];
	      }
	    }
	  }

	  return obj;
	}

	var toString = Object.prototype.toString;

	exports.toString = toString;
	// Sourced from lodash
	// https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
	/* eslint-disable func-style */
	var isFunction = function isFunction(value) {
	  return typeof value === 'function';
	};
	// fallback for older versions of Chrome and Safari
	/* istanbul ignore next */
	if (isFunction(/x/)) {
	  exports.isFunction = isFunction = function (value) {
	    return typeof value === 'function' && toString.call(value) === '[object Function]';
	  };
	}
	exports.isFunction = isFunction;

	/* eslint-enable func-style */

	/* istanbul ignore next */
	var isArray = Array.isArray || function (value) {
	  return value && typeof value === 'object' ? toString.call(value) === '[object Array]' : false;
	};

	exports.isArray = isArray;
	// Older IE versions do not directly support indexOf so we must implement our own, sadly.

	function indexOf(array, value) {
	  for (var i = 0, len = array.length; i < len; i++) {
	    if (array[i] === value) {
	      return i;
	    }
	  }
	  return -1;
	}

	function escapeExpression(string) {
	  if (typeof string !== 'string') {
	    // don't escape SafeStrings, since they're already safe
	    if (string && string.toHTML) {
	      return string.toHTML();
	    } else if (string == null) {
	      return '';
	    } else if (!string) {
	      return string + '';
	    }

	    // Force a string conversion as this will be done by the append regardless and
	    // the regex test will do this transparently behind the scenes, causing issues if
	    // an object's to string has escaped characters in it.
	    string = '' + string;
	  }

	  if (!possible.test(string)) {
	    return string;
	  }
	  return string.replace(badChars, escapeChar);
	}

	function isEmpty(value) {
	  if (!value && value !== 0) {
	    return true;
	  } else if (isArray(value) && value.length === 0) {
	    return true;
	  } else {
	    return false;
	  }
	}

	function createFrame(object) {
	  var frame = extend({}, object);
	  frame._parent = object;
	  return frame;
	}

	function blockParams(params, ids) {
	  params.path = ids;
	  return params;
	}

	function appendContextPath(contextPath, id) {
	  return (contextPath ? contextPath + '.' : '') + id;
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Object$defineProperty = __webpack_require__(7)['default'];

	exports.__esModule = true;

	var errorProps = ['description', 'fileName', 'lineNumber', 'message', 'name', 'number', 'stack'];

	function Exception(message, node) {
	  var loc = node && node.loc,
	      line = undefined,
	      column = undefined;
	  if (loc) {
	    line = loc.start.line;
	    column = loc.start.column;

	    message += ' - ' + line + ':' + column;
	  }

	  var tmp = Error.prototype.constructor.call(this, message);

	  // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
	  for (var idx = 0; idx < errorProps.length; idx++) {
	    this[errorProps[idx]] = tmp[errorProps[idx]];
	  }

	  /* istanbul ignore else */
	  if (Error.captureStackTrace) {
	    Error.captureStackTrace(this, Exception);
	  }

	  try {
	    if (loc) {
	      this.lineNumber = line;

	      // Work around issue under safari where we can't directly set the column value
	      /* istanbul ignore next */
	      if (_Object$defineProperty) {
	        Object.defineProperty(this, 'column', { value: column });
	      } else {
	        this.column = column;
	      }
	    }
	  } catch (nop) {
	    /* Ignore if the browser is very particular */
	  }
	}

	Exception.prototype = new Error();

	exports['default'] = Exception;
	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(8), __esModule: true };

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(9);
	module.exports = function defineProperty(it, key, desc){
	  return $.setDesc(it, key, desc);
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	var $Object = Object;
	module.exports = {
	  create:     $Object.create,
	  getProto:   $Object.getPrototypeOf,
	  isEnum:     {}.propertyIsEnumerable,
	  getDesc:    $Object.getOwnPropertyDescriptor,
	  setDesc:    $Object.defineProperty,
	  setDescs:   $Object.defineProperties,
	  getKeys:    $Object.keys,
	  getNames:   $Object.getOwnPropertyNames,
	  getSymbols: $Object.getOwnPropertySymbols,
	  each:       [].forEach
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(1)['default'];

	exports.__esModule = true;
	exports.registerDefaultHelpers = registerDefaultHelpers;

	var _helpersBlockHelperMissing = __webpack_require__(11);

	var _helpersBlockHelperMissing2 = _interopRequireDefault(_helpersBlockHelperMissing);

	var _helpersEach = __webpack_require__(12);

	var _helpersEach2 = _interopRequireDefault(_helpersEach);

	var _helpersHelperMissing = __webpack_require__(13);

	var _helpersHelperMissing2 = _interopRequireDefault(_helpersHelperMissing);

	var _helpersIf = __webpack_require__(14);

	var _helpersIf2 = _interopRequireDefault(_helpersIf);

	var _helpersLog = __webpack_require__(15);

	var _helpersLog2 = _interopRequireDefault(_helpersLog);

	var _helpersLookup = __webpack_require__(16);

	var _helpersLookup2 = _interopRequireDefault(_helpersLookup);

	var _helpersWith = __webpack_require__(17);

	var _helpersWith2 = _interopRequireDefault(_helpersWith);

	function registerDefaultHelpers(instance) {
	  _helpersBlockHelperMissing2['default'](instance);
	  _helpersEach2['default'](instance);
	  _helpersHelperMissing2['default'](instance);
	  _helpersIf2['default'](instance);
	  _helpersLog2['default'](instance);
	  _helpersLookup2['default'](instance);
	  _helpersWith2['default'](instance);
	}

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _utils = __webpack_require__(5);

	exports['default'] = function (instance) {
	  instance.registerHelper('blockHelperMissing', function (context, options) {
	    var inverse = options.inverse,
	        fn = options.fn;

	    if (context === true) {
	      return fn(this);
	    } else if (context === false || context == null) {
	      return inverse(this);
	    } else if (_utils.isArray(context)) {
	      if (context.length > 0) {
	        if (options.ids) {
	          options.ids = [options.name];
	        }

	        return instance.helpers.each(context, options);
	      } else {
	        return inverse(this);
	      }
	    } else {
	      if (options.data && options.ids) {
	        var data = _utils.createFrame(options.data);
	        data.contextPath = _utils.appendContextPath(options.data.contextPath, options.name);
	        options = { data: data };
	      }

	      return fn(context, options);
	    }
	  });
	};

	module.exports = exports['default'];

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(1)['default'];

	exports.__esModule = true;

	var _utils = __webpack_require__(5);

	var _exception = __webpack_require__(6);

	var _exception2 = _interopRequireDefault(_exception);

	exports['default'] = function (instance) {
	  instance.registerHelper('each', function (context, options) {
	    if (!options) {
	      throw new _exception2['default']('Must pass iterator to #each');
	    }

	    var fn = options.fn,
	        inverse = options.inverse,
	        i = 0,
	        ret = '',
	        data = undefined,
	        contextPath = undefined;

	    if (options.data && options.ids) {
	      contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]) + '.';
	    }

	    if (_utils.isFunction(context)) {
	      context = context.call(this);
	    }

	    if (options.data) {
	      data = _utils.createFrame(options.data);
	    }

	    function execIteration(field, index, last) {
	      if (data) {
	        data.key = field;
	        data.index = index;
	        data.first = index === 0;
	        data.last = !!last;

	        if (contextPath) {
	          data.contextPath = contextPath + field;
	        }
	      }

	      ret = ret + fn(context[field], {
	        data: data,
	        blockParams: _utils.blockParams([context[field], field], [contextPath + field, null])
	      });
	    }

	    if (context && typeof context === 'object') {
	      if (_utils.isArray(context)) {
	        for (var j = context.length; i < j; i++) {
	          if (i in context) {
	            execIteration(i, i, i === context.length - 1);
	          }
	        }
	      } else {
	        var priorKey = undefined;

	        for (var key in context) {
	          if (context.hasOwnProperty(key)) {
	            // We're running the iterations one step out of sync so we can detect
	            // the last iteration without have to scan the object twice and create
	            // an itermediate keys array.
	            if (priorKey !== undefined) {
	              execIteration(priorKey, i - 1);
	            }
	            priorKey = key;
	            i++;
	          }
	        }
	        if (priorKey !== undefined) {
	          execIteration(priorKey, i - 1, true);
	        }
	      }
	    }

	    if (i === 0) {
	      ret = inverse(this);
	    }

	    return ret;
	  });
	};

	module.exports = exports['default'];

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(1)['default'];

	exports.__esModule = true;

	var _exception = __webpack_require__(6);

	var _exception2 = _interopRequireDefault(_exception);

	exports['default'] = function (instance) {
	  instance.registerHelper('helperMissing', function () /* [args, ]options */{
	    if (arguments.length === 1) {
	      // A missing field in a {{foo}} construct.
	      return undefined;
	    } else {
	      // Someone is actually trying to call something, blow up.
	      throw new _exception2['default']('Missing helper: "' + arguments[arguments.length - 1].name + '"');
	    }
	  });
	};

	module.exports = exports['default'];

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _utils = __webpack_require__(5);

	exports['default'] = function (instance) {
	  instance.registerHelper('if', function (conditional, options) {
	    if (_utils.isFunction(conditional)) {
	      conditional = conditional.call(this);
	    }

	    // Default behavior is to render the positive path if the value is truthy and not empty.
	    // The `includeZero` option may be set to treat the condtional as purely not empty based on the
	    // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
	    if (!options.hash.includeZero && !conditional || _utils.isEmpty(conditional)) {
	      return options.inverse(this);
	    } else {
	      return options.fn(this);
	    }
	  });

	  instance.registerHelper('unless', function (conditional, options) {
	    return instance.helpers['if'].call(this, conditional, { fn: options.inverse, inverse: options.fn, hash: options.hash });
	  });
	};

	module.exports = exports['default'];

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;

	exports['default'] = function (instance) {
	  instance.registerHelper('log', function () /* message, options */{
	    var args = [undefined],
	        options = arguments[arguments.length - 1];
	    for (var i = 0; i < arguments.length - 1; i++) {
	      args.push(arguments[i]);
	    }

	    var level = 1;
	    if (options.hash.level != null) {
	      level = options.hash.level;
	    } else if (options.data && options.data.level != null) {
	      level = options.data.level;
	    }
	    args[0] = level;

	    instance.log.apply(instance, args);
	  });
	};

	module.exports = exports['default'];

/***/ },
/* 16 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;

	exports['default'] = function (instance) {
	  instance.registerHelper('lookup', function (obj, field) {
	    return obj && obj[field];
	  });
	};

	module.exports = exports['default'];

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _utils = __webpack_require__(5);

	exports['default'] = function (instance) {
	  instance.registerHelper('with', function (context, options) {
	    if (_utils.isFunction(context)) {
	      context = context.call(this);
	    }

	    var fn = options.fn;

	    if (!_utils.isEmpty(context)) {
	      var data = options.data;
	      if (options.data && options.ids) {
	        data = _utils.createFrame(options.data);
	        data.contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]);
	      }

	      return fn(context, {
	        data: data,
	        blockParams: _utils.blockParams([context], [data && data.contextPath])
	      });
	    } else {
	      return options.inverse(this);
	    }
	  });
	};

	module.exports = exports['default'];

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(1)['default'];

	exports.__esModule = true;
	exports.registerDefaultDecorators = registerDefaultDecorators;

	var _decoratorsInline = __webpack_require__(19);

	var _decoratorsInline2 = _interopRequireDefault(_decoratorsInline);

	function registerDefaultDecorators(instance) {
	  _decoratorsInline2['default'](instance);
	}

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _utils = __webpack_require__(5);

	exports['default'] = function (instance) {
	  instance.registerDecorator('inline', function (fn, props, container, options) {
	    var ret = fn;
	    if (!props.partials) {
	      props.partials = {};
	      ret = function (context, options) {
	        // Create a new partials stack frame prior to exec.
	        var original = container.partials;
	        container.partials = _utils.extend({}, original, props.partials);
	        var ret = fn(context, options);
	        container.partials = original;
	        return ret;
	      };
	    }

	    props.partials[options.args[0]] = options.fn;

	    return ret;
	  });
	};

	module.exports = exports['default'];

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _utils = __webpack_require__(5);

	var logger = {
	  methodMap: ['debug', 'info', 'warn', 'error'],
	  level: 'info',

	  // Maps a given level value to the `methodMap` indexes above.
	  lookupLevel: function lookupLevel(level) {
	    if (typeof level === 'string') {
	      var levelMap = _utils.indexOf(logger.methodMap, level.toLowerCase());
	      if (levelMap >= 0) {
	        level = levelMap;
	      } else {
	        level = parseInt(level, 10);
	      }
	    }

	    return level;
	  },

	  // Can be overridden in the host environment
	  log: function log(level) {
	    level = logger.lookupLevel(level);

	    if (typeof console !== 'undefined' && logger.lookupLevel(logger.level) <= level) {
	      var method = logger.methodMap[level];
	      if (!console[method]) {
	        // eslint-disable-line no-console
	        method = 'log';
	      }

	      for (var _len = arguments.length, message = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        message[_key - 1] = arguments[_key];
	      }

	      console[method].apply(console, message); // eslint-disable-line no-console
	    }
	  }
	};

	exports['default'] = logger;
	module.exports = exports['default'];

/***/ },
/* 21 */
/***/ function(module, exports) {

	// Build out our basic SafeString type
	'use strict';

	exports.__esModule = true;
	function SafeString(string) {
	  this.string = string;
	}

	SafeString.prototype.toString = SafeString.prototype.toHTML = function () {
	  return '' + this.string;
	};

	exports['default'] = SafeString;
	module.exports = exports['default'];

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireWildcard = __webpack_require__(3)['default'];

	var _interopRequireDefault = __webpack_require__(1)['default'];

	exports.__esModule = true;
	exports.checkRevision = checkRevision;
	exports.template = template;
	exports.wrapProgram = wrapProgram;
	exports.resolvePartial = resolvePartial;
	exports.invokePartial = invokePartial;
	exports.noop = noop;

	var _utils = __webpack_require__(5);

	var Utils = _interopRequireWildcard(_utils);

	var _exception = __webpack_require__(6);

	var _exception2 = _interopRequireDefault(_exception);

	var _base = __webpack_require__(4);

	function checkRevision(compilerInfo) {
	  var compilerRevision = compilerInfo && compilerInfo[0] || 1,
	      currentRevision = _base.COMPILER_REVISION;

	  if (compilerRevision !== currentRevision) {
	    if (compilerRevision < currentRevision) {
	      var runtimeVersions = _base.REVISION_CHANGES[currentRevision],
	          compilerVersions = _base.REVISION_CHANGES[compilerRevision];
	      throw new _exception2['default']('Template was precompiled with an older version of Handlebars than the current runtime. ' + 'Please update your precompiler to a newer version (' + runtimeVersions + ') or downgrade your runtime to an older version (' + compilerVersions + ').');
	    } else {
	      // Use the embedded version info since the runtime doesn't know about this revision yet
	      throw new _exception2['default']('Template was precompiled with a newer version of Handlebars than the current runtime. ' + 'Please update your runtime to a newer version (' + compilerInfo[1] + ').');
	    }
	  }
	}

	function template(templateSpec, env) {
	  /* istanbul ignore next */
	  if (!env) {
	    throw new _exception2['default']('No environment passed to template');
	  }
	  if (!templateSpec || !templateSpec.main) {
	    throw new _exception2['default']('Unknown template object: ' + typeof templateSpec);
	  }

	  templateSpec.main.decorator = templateSpec.main_d;

	  // Note: Using env.VM references rather than local var references throughout this section to allow
	  // for external users to override these as psuedo-supported APIs.
	  env.VM.checkRevision(templateSpec.compiler);

	  function invokePartialWrapper(partial, context, options) {
	    if (options.hash) {
	      context = Utils.extend({}, context, options.hash);
	      if (options.ids) {
	        options.ids[0] = true;
	      }
	    }

	    partial = env.VM.resolvePartial.call(this, partial, context, options);
	    var result = env.VM.invokePartial.call(this, partial, context, options);

	    if (result == null && env.compile) {
	      options.partials[options.name] = env.compile(partial, templateSpec.compilerOptions, env);
	      result = options.partials[options.name](context, options);
	    }
	    if (result != null) {
	      if (options.indent) {
	        var lines = result.split('\n');
	        for (var i = 0, l = lines.length; i < l; i++) {
	          if (!lines[i] && i + 1 === l) {
	            break;
	          }

	          lines[i] = options.indent + lines[i];
	        }
	        result = lines.join('\n');
	      }
	      return result;
	    } else {
	      throw new _exception2['default']('The partial ' + options.name + ' could not be compiled when running in runtime-only mode');
	    }
	  }

	  // Just add water
	  var container = {
	    strict: function strict(obj, name) {
	      if (!(name in obj)) {
	        throw new _exception2['default']('"' + name + '" not defined in ' + obj);
	      }
	      return obj[name];
	    },
	    lookup: function lookup(depths, name) {
	      var len = depths.length;
	      for (var i = 0; i < len; i++) {
	        if (depths[i] && depths[i][name] != null) {
	          return depths[i][name];
	        }
	      }
	    },
	    lambda: function lambda(current, context) {
	      return typeof current === 'function' ? current.call(context) : current;
	    },

	    escapeExpression: Utils.escapeExpression,
	    invokePartial: invokePartialWrapper,

	    fn: function fn(i) {
	      var ret = templateSpec[i];
	      ret.decorator = templateSpec[i + '_d'];
	      return ret;
	    },

	    programs: [],
	    program: function program(i, data, declaredBlockParams, blockParams, depths) {
	      var programWrapper = this.programs[i],
	          fn = this.fn(i);
	      if (data || depths || blockParams || declaredBlockParams) {
	        programWrapper = wrapProgram(this, i, fn, data, declaredBlockParams, blockParams, depths);
	      } else if (!programWrapper) {
	        programWrapper = this.programs[i] = wrapProgram(this, i, fn);
	      }
	      return programWrapper;
	    },

	    data: function data(value, depth) {
	      while (value && depth--) {
	        value = value._parent;
	      }
	      return value;
	    },
	    merge: function merge(param, common) {
	      var obj = param || common;

	      if (param && common && param !== common) {
	        obj = Utils.extend({}, common, param);
	      }

	      return obj;
	    },

	    noop: env.VM.noop,
	    compilerInfo: templateSpec.compiler
	  };

	  function ret(context) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    var data = options.data;

	    ret._setup(options);
	    if (!options.partial && templateSpec.useData) {
	      data = initData(context, data);
	    }
	    var depths = undefined,
	        blockParams = templateSpec.useBlockParams ? [] : undefined;
	    if (templateSpec.useDepths) {
	      if (options.depths) {
	        depths = context != options.depths[0] ? [context].concat(options.depths) : options.depths;
	      } else {
	        depths = [context];
	      }
	    }

	    function main(context /*, options*/) {
	      return '' + templateSpec.main(container, context, container.helpers, container.partials, data, blockParams, depths);
	    }
	    main = executeDecorators(templateSpec.main, main, container, options.depths || [], data, blockParams);
	    return main(context, options);
	  }
	  ret.isTop = true;

	  ret._setup = function (options) {
	    if (!options.partial) {
	      container.helpers = container.merge(options.helpers, env.helpers);

	      if (templateSpec.usePartial) {
	        container.partials = container.merge(options.partials, env.partials);
	      }
	      if (templateSpec.usePartial || templateSpec.useDecorators) {
	        container.decorators = container.merge(options.decorators, env.decorators);
	      }
	    } else {
	      container.helpers = options.helpers;
	      container.partials = options.partials;
	      container.decorators = options.decorators;
	    }
	  };

	  ret._child = function (i, data, blockParams, depths) {
	    if (templateSpec.useBlockParams && !blockParams) {
	      throw new _exception2['default']('must pass block params');
	    }
	    if (templateSpec.useDepths && !depths) {
	      throw new _exception2['default']('must pass parent depths');
	    }

	    return wrapProgram(container, i, templateSpec[i], data, 0, blockParams, depths);
	  };
	  return ret;
	}

	function wrapProgram(container, i, fn, data, declaredBlockParams, blockParams, depths) {
	  function prog(context) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    var currentDepths = depths;
	    if (depths && context != depths[0]) {
	      currentDepths = [context].concat(depths);
	    }

	    return fn(container, context, container.helpers, container.partials, options.data || data, blockParams && [options.blockParams].concat(blockParams), currentDepths);
	  }

	  prog = executeDecorators(fn, prog, container, depths, data, blockParams);

	  prog.program = i;
	  prog.depth = depths ? depths.length : 0;
	  prog.blockParams = declaredBlockParams || 0;
	  return prog;
	}

	function resolvePartial(partial, context, options) {
	  if (!partial) {
	    if (options.name === '@partial-block') {
	      var data = options.data;
	      while (data['partial-block'] === noop) {
	        data = data._parent;
	      }
	      partial = data['partial-block'];
	      data['partial-block'] = noop;
	    } else {
	      partial = options.partials[options.name];
	    }
	  } else if (!partial.call && !options.name) {
	    // This is a dynamic partial that returned a string
	    options.name = partial;
	    partial = options.partials[partial];
	  }
	  return partial;
	}

	function invokePartial(partial, context, options) {
	  options.partial = true;
	  if (options.ids) {
	    options.data.contextPath = options.ids[0] || options.data.contextPath;
	  }

	  var partialBlock = undefined;
	  if (options.fn && options.fn !== noop) {
	    options.data = _base.createFrame(options.data);
	    partialBlock = options.data['partial-block'] = options.fn;

	    if (partialBlock.partials) {
	      options.partials = Utils.extend({}, options.partials, partialBlock.partials);
	    }
	  }

	  if (partial === undefined && partialBlock) {
	    partial = partialBlock;
	  }

	  if (partial === undefined) {
	    throw new _exception2['default']('The partial ' + options.name + ' could not be found');
	  } else if (partial instanceof Function) {
	    return partial(context, options);
	  }
	}

	function noop() {
	  return '';
	}

	function initData(context, data) {
	  if (!data || !('root' in data)) {
	    data = data ? _base.createFrame(data) : {};
	    data.root = context;
	  }
	  return data;
	}

	function executeDecorators(fn, prog, container, depths, data, blockParams) {
	  if (fn.decorator) {
	    var props = {};
	    prog = fn.decorator(prog, props, container, depths && depths[0], data, blockParams, depths);
	    Utils.extend(prog, props);
	  }
	  return prog;
	}

/***/ },
/* 23 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/* global window */
	'use strict';

	exports.__esModule = true;

	exports['default'] = function (Handlebars) {
	  /* istanbul ignore next */
	  var root = typeof global !== 'undefined' ? global : window,
	      $Handlebars = root.Handlebars;
	  /* istanbul ignore next */
	  Handlebars.noConflict = function () {
	    if (root.Handlebars === Handlebars) {
	      root.Handlebars = $Handlebars;
	    }
	    return Handlebars;
	  };
	};

	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 24 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	var AST = {
	  // Public API used to evaluate derived attributes regarding AST nodes
	  helpers: {
	    // a mustache is definitely a helper if:
	    // * it is an eligible helper, and
	    // * it has at least one parameter or hash segment
	    helperExpression: function helperExpression(node) {
	      return node.type === 'SubExpression' || (node.type === 'MustacheStatement' || node.type === 'BlockStatement') && !!(node.params && node.params.length || node.hash);
	    },

	    scopedId: function scopedId(path) {
	      return (/^\.|this\b/.test(path.original)
	      );
	    },

	    // an ID is simple if it only has one part, and that part is not
	    // `..` or `this`.
	    simpleId: function simpleId(path) {
	      return path.parts.length === 1 && !AST.helpers.scopedId(path) && !path.depth;
	    }
	  }
	};

	// Must be exported as an object rather than the root of the module as the jison lexer
	// must modify the object to operate properly.
	exports['default'] = AST;
	module.exports = exports['default'];

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(1)['default'];

	var _interopRequireWildcard = __webpack_require__(3)['default'];

	exports.__esModule = true;
	exports.parse = parse;

	var _parser = __webpack_require__(26);

	var _parser2 = _interopRequireDefault(_parser);

	var _whitespaceControl = __webpack_require__(27);

	var _whitespaceControl2 = _interopRequireDefault(_whitespaceControl);

	var _helpers = __webpack_require__(29);

	var Helpers = _interopRequireWildcard(_helpers);

	var _utils = __webpack_require__(5);

	exports.parser = _parser2['default'];

	var yy = {};
	_utils.extend(yy, Helpers);

	function parse(input, options) {
	  // Just return if an already-compiled AST was passed in.
	  if (input.type === 'Program') {
	    return input;
	  }

	  _parser2['default'].yy = yy;

	  // Altering the shared object here, but this is ok as parser is a sync operation
	  yy.locInfo = function (locInfo) {
	    return new yy.SourceLocation(options && options.srcName, locInfo);
	  };

	  var strip = new _whitespaceControl2['default'](options);
	  return strip.accept(_parser2['default'].parse(input));
	}

/***/ },
/* 26 */
/***/ function(module, exports) {

	/* istanbul ignore next */
	/* Jison generated parser */
	"use strict";

	var handlebars = (function () {
	    var parser = { trace: function trace() {},
	        yy: {},
	        symbols_: { "error": 2, "root": 3, "program": 4, "EOF": 5, "program_repetition0": 6, "statement": 7, "mustache": 8, "block": 9, "rawBlock": 10, "partial": 11, "partialBlock": 12, "content": 13, "COMMENT": 14, "CONTENT": 15, "openRawBlock": 16, "rawBlock_repetition_plus0": 17, "END_RAW_BLOCK": 18, "OPEN_RAW_BLOCK": 19, "helperName": 20, "openRawBlock_repetition0": 21, "openRawBlock_option0": 22, "CLOSE_RAW_BLOCK": 23, "openBlock": 24, "block_option0": 25, "closeBlock": 26, "openInverse": 27, "block_option1": 28, "OPEN_BLOCK": 29, "openBlock_repetition0": 30, "openBlock_option0": 31, "openBlock_option1": 32, "CLOSE": 33, "OPEN_INVERSE": 34, "openInverse_repetition0": 35, "openInverse_option0": 36, "openInverse_option1": 37, "openInverseChain": 38, "OPEN_INVERSE_CHAIN": 39, "openInverseChain_repetition0": 40, "openInverseChain_option0": 41, "openInverseChain_option1": 42, "inverseAndProgram": 43, "INVERSE": 44, "inverseChain": 45, "inverseChain_option0": 46, "OPEN_ENDBLOCK": 47, "OPEN": 48, "mustache_repetition0": 49, "mustache_option0": 50, "OPEN_UNESCAPED": 51, "mustache_repetition1": 52, "mustache_option1": 53, "CLOSE_UNESCAPED": 54, "OPEN_PARTIAL": 55, "partialName": 56, "partial_repetition0": 57, "partial_option0": 58, "openPartialBlock": 59, "OPEN_PARTIAL_BLOCK": 60, "openPartialBlock_repetition0": 61, "openPartialBlock_option0": 62, "param": 63, "sexpr": 64, "OPEN_SEXPR": 65, "sexpr_repetition0": 66, "sexpr_option0": 67, "CLOSE_SEXPR": 68, "hash": 69, "hash_repetition_plus0": 70, "hashSegment": 71, "ID": 72, "EQUALS": 73, "blockParams": 74, "OPEN_BLOCK_PARAMS": 75, "blockParams_repetition_plus0": 76, "CLOSE_BLOCK_PARAMS": 77, "path": 78, "dataName": 79, "STRING": 80, "NUMBER": 81, "BOOLEAN": 82, "UNDEFINED": 83, "NULL": 84, "DATA": 85, "pathSegments": 86, "SEP": 87, "$accept": 0, "$end": 1 },
	        terminals_: { 2: "error", 5: "EOF", 14: "COMMENT", 15: "CONTENT", 18: "END_RAW_BLOCK", 19: "OPEN_RAW_BLOCK", 23: "CLOSE_RAW_BLOCK", 29: "OPEN_BLOCK", 33: "CLOSE", 34: "OPEN_INVERSE", 39: "OPEN_INVERSE_CHAIN", 44: "INVERSE", 47: "OPEN_ENDBLOCK", 48: "OPEN", 51: "OPEN_UNESCAPED", 54: "CLOSE_UNESCAPED", 55: "OPEN_PARTIAL", 60: "OPEN_PARTIAL_BLOCK", 65: "OPEN_SEXPR", 68: "CLOSE_SEXPR", 72: "ID", 73: "EQUALS", 75: "OPEN_BLOCK_PARAMS", 77: "CLOSE_BLOCK_PARAMS", 80: "STRING", 81: "NUMBER", 82: "BOOLEAN", 83: "UNDEFINED", 84: "NULL", 85: "DATA", 87: "SEP" },
	        productions_: [0, [3, 2], [4, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [13, 1], [10, 3], [16, 5], [9, 4], [9, 4], [24, 6], [27, 6], [38, 6], [43, 2], [45, 3], [45, 1], [26, 3], [8, 5], [8, 5], [11, 5], [12, 3], [59, 5], [63, 1], [63, 1], [64, 5], [69, 1], [71, 3], [74, 3], [20, 1], [20, 1], [20, 1], [20, 1], [20, 1], [20, 1], [20, 1], [56, 1], [56, 1], [79, 2], [78, 1], [86, 3], [86, 1], [6, 0], [6, 2], [17, 1], [17, 2], [21, 0], [21, 2], [22, 0], [22, 1], [25, 0], [25, 1], [28, 0], [28, 1], [30, 0], [30, 2], [31, 0], [31, 1], [32, 0], [32, 1], [35, 0], [35, 2], [36, 0], [36, 1], [37, 0], [37, 1], [40, 0], [40, 2], [41, 0], [41, 1], [42, 0], [42, 1], [46, 0], [46, 1], [49, 0], [49, 2], [50, 0], [50, 1], [52, 0], [52, 2], [53, 0], [53, 1], [57, 0], [57, 2], [58, 0], [58, 1], [61, 0], [61, 2], [62, 0], [62, 1], [66, 0], [66, 2], [67, 0], [67, 1], [70, 1], [70, 2], [76, 1], [76, 2]],
	        performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$
	        /**/) {

	            var $0 = $$.length - 1;
	            switch (yystate) {
	                case 1:
	                    return $$[$0 - 1];
	                    break;
	                case 2:
	                    this.$ = yy.prepareProgram($$[$0]);
	                    break;
	                case 3:
	                    this.$ = $$[$0];
	                    break;
	                case 4:
	                    this.$ = $$[$0];
	                    break;
	                case 5:
	                    this.$ = $$[$0];
	                    break;
	                case 6:
	                    this.$ = $$[$0];
	                    break;
	                case 7:
	                    this.$ = $$[$0];
	                    break;
	                case 8:
	                    this.$ = $$[$0];
	                    break;
	                case 9:
	                    this.$ = {
	                        type: 'CommentStatement',
	                        value: yy.stripComment($$[$0]),
	                        strip: yy.stripFlags($$[$0], $$[$0]),
	                        loc: yy.locInfo(this._$)
	                    };

	                    break;
	                case 10:
	                    this.$ = {
	                        type: 'ContentStatement',
	                        original: $$[$0],
	                        value: $$[$0],
	                        loc: yy.locInfo(this._$)
	                    };

	                    break;
	                case 11:
	                    this.$ = yy.prepareRawBlock($$[$0 - 2], $$[$0 - 1], $$[$0], this._$);
	                    break;
	                case 12:
	                    this.$ = { path: $$[$0 - 3], params: $$[$0 - 2], hash: $$[$0 - 1] };
	                    break;
	                case 13:
	                    this.$ = yy.prepareBlock($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0], false, this._$);
	                    break;
	                case 14:
	                    this.$ = yy.prepareBlock($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0], true, this._$);
	                    break;
	                case 15:
	                    this.$ = { open: $$[$0 - 5], path: $$[$0 - 4], params: $$[$0 - 3], hash: $$[$0 - 2], blockParams: $$[$0 - 1], strip: yy.stripFlags($$[$0 - 5], $$[$0]) };
	                    break;
	                case 16:
	                    this.$ = { path: $$[$0 - 4], params: $$[$0 - 3], hash: $$[$0 - 2], blockParams: $$[$0 - 1], strip: yy.stripFlags($$[$0 - 5], $$[$0]) };
	                    break;
	                case 17:
	                    this.$ = { path: $$[$0 - 4], params: $$[$0 - 3], hash: $$[$0 - 2], blockParams: $$[$0 - 1], strip: yy.stripFlags($$[$0 - 5], $$[$0]) };
	                    break;
	                case 18:
	                    this.$ = { strip: yy.stripFlags($$[$0 - 1], $$[$0 - 1]), program: $$[$0] };
	                    break;
	                case 19:
	                    var inverse = yy.prepareBlock($$[$0 - 2], $$[$0 - 1], $$[$0], $$[$0], false, this._$),
	                        program = yy.prepareProgram([inverse], $$[$0 - 1].loc);
	                    program.chained = true;

	                    this.$ = { strip: $$[$0 - 2].strip, program: program, chain: true };

	                    break;
	                case 20:
	                    this.$ = $$[$0];
	                    break;
	                case 21:
	                    this.$ = { path: $$[$0 - 1], strip: yy.stripFlags($$[$0 - 2], $$[$0]) };
	                    break;
	                case 22:
	                    this.$ = yy.prepareMustache($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0 - 4], yy.stripFlags($$[$0 - 4], $$[$0]), this._$);
	                    break;
	                case 23:
	                    this.$ = yy.prepareMustache($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0 - 4], yy.stripFlags($$[$0 - 4], $$[$0]), this._$);
	                    break;
	                case 24:
	                    this.$ = {
	                        type: 'PartialStatement',
	                        name: $$[$0 - 3],
	                        params: $$[$0 - 2],
	                        hash: $$[$0 - 1],
	                        indent: '',
	                        strip: yy.stripFlags($$[$0 - 4], $$[$0]),
	                        loc: yy.locInfo(this._$)
	                    };

	                    break;
	                case 25:
	                    this.$ = yy.preparePartialBlock($$[$0 - 2], $$[$0 - 1], $$[$0], this._$);
	                    break;
	                case 26:
	                    this.$ = { path: $$[$0 - 3], params: $$[$0 - 2], hash: $$[$0 - 1], strip: yy.stripFlags($$[$0 - 4], $$[$0]) };
	                    break;
	                case 27:
	                    this.$ = $$[$0];
	                    break;
	                case 28:
	                    this.$ = $$[$0];
	                    break;
	                case 29:
	                    this.$ = {
	                        type: 'SubExpression',
	                        path: $$[$0 - 3],
	                        params: $$[$0 - 2],
	                        hash: $$[$0 - 1],
	                        loc: yy.locInfo(this._$)
	                    };

	                    break;
	                case 30:
	                    this.$ = { type: 'Hash', pairs: $$[$0], loc: yy.locInfo(this._$) };
	                    break;
	                case 31:
	                    this.$ = { type: 'HashPair', key: yy.id($$[$0 - 2]), value: $$[$0], loc: yy.locInfo(this._$) };
	                    break;
	                case 32:
	                    this.$ = yy.id($$[$0 - 1]);
	                    break;
	                case 33:
	                    this.$ = $$[$0];
	                    break;
	                case 34:
	                    this.$ = $$[$0];
	                    break;
	                case 35:
	                    this.$ = { type: 'StringLiteral', value: $$[$0], original: $$[$0], loc: yy.locInfo(this._$) };
	                    break;
	                case 36:
	                    this.$ = { type: 'NumberLiteral', value: Number($$[$0]), original: Number($$[$0]), loc: yy.locInfo(this._$) };
	                    break;
	                case 37:
	                    this.$ = { type: 'BooleanLiteral', value: $$[$0] === 'true', original: $$[$0] === 'true', loc: yy.locInfo(this._$) };
	                    break;
	                case 38:
	                    this.$ = { type: 'UndefinedLiteral', original: undefined, value: undefined, loc: yy.locInfo(this._$) };
	                    break;
	                case 39:
	                    this.$ = { type: 'NullLiteral', original: null, value: null, loc: yy.locInfo(this._$) };
	                    break;
	                case 40:
	                    this.$ = $$[$0];
	                    break;
	                case 41:
	                    this.$ = $$[$0];
	                    break;
	                case 42:
	                    this.$ = yy.preparePath(true, $$[$0], this._$);
	                    break;
	                case 43:
	                    this.$ = yy.preparePath(false, $$[$0], this._$);
	                    break;
	                case 44:
	                    $$[$0 - 2].push({ part: yy.id($$[$0]), original: $$[$0], separator: $$[$0 - 1] });this.$ = $$[$0 - 2];
	                    break;
	                case 45:
	                    this.$ = [{ part: yy.id($$[$0]), original: $$[$0] }];
	                    break;
	                case 46:
	                    this.$ = [];
	                    break;
	                case 47:
	                    $$[$0 - 1].push($$[$0]);
	                    break;
	                case 48:
	                    this.$ = [$$[$0]];
	                    break;
	                case 49:
	                    $$[$0 - 1].push($$[$0]);
	                    break;
	                case 50:
	                    this.$ = [];
	                    break;
	                case 51:
	                    $$[$0 - 1].push($$[$0]);
	                    break;
	                case 58:
	                    this.$ = [];
	                    break;
	                case 59:
	                    $$[$0 - 1].push($$[$0]);
	                    break;
	                case 64:
	                    this.$ = [];
	                    break;
	                case 65:
	                    $$[$0 - 1].push($$[$0]);
	                    break;
	                case 70:
	                    this.$ = [];
	                    break;
	                case 71:
	                    $$[$0 - 1].push($$[$0]);
	                    break;
	                case 78:
	                    this.$ = [];
	                    break;
	                case 79:
	                    $$[$0 - 1].push($$[$0]);
	                    break;
	                case 82:
	                    this.$ = [];
	                    break;
	                case 83:
	                    $$[$0 - 1].push($$[$0]);
	                    break;
	                case 86:
	                    this.$ = [];
	                    break;
	                case 87:
	                    $$[$0 - 1].push($$[$0]);
	                    break;
	                case 90:
	                    this.$ = [];
	                    break;
	                case 91:
	                    $$[$0 - 1].push($$[$0]);
	                    break;
	                case 94:
	                    this.$ = [];
	                    break;
	                case 95:
	                    $$[$0 - 1].push($$[$0]);
	                    break;
	                case 98:
	                    this.$ = [$$[$0]];
	                    break;
	                case 99:
	                    $$[$0 - 1].push($$[$0]);
	                    break;
	                case 100:
	                    this.$ = [$$[$0]];
	                    break;
	                case 101:
	                    $$[$0 - 1].push($$[$0]);
	                    break;
	            }
	        },
	        table: [{ 3: 1, 4: 2, 5: [2, 46], 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 1: [3] }, { 5: [1, 4] }, { 5: [2, 2], 7: 5, 8: 6, 9: 7, 10: 8, 11: 9, 12: 10, 13: 11, 14: [1, 12], 15: [1, 20], 16: 17, 19: [1, 23], 24: 15, 27: 16, 29: [1, 21], 34: [1, 22], 39: [2, 2], 44: [2, 2], 47: [2, 2], 48: [1, 13], 51: [1, 14], 55: [1, 18], 59: 19, 60: [1, 24] }, { 1: [2, 1] }, { 5: [2, 47], 14: [2, 47], 15: [2, 47], 19: [2, 47], 29: [2, 47], 34: [2, 47], 39: [2, 47], 44: [2, 47], 47: [2, 47], 48: [2, 47], 51: [2, 47], 55: [2, 47], 60: [2, 47] }, { 5: [2, 3], 14: [2, 3], 15: [2, 3], 19: [2, 3], 29: [2, 3], 34: [2, 3], 39: [2, 3], 44: [2, 3], 47: [2, 3], 48: [2, 3], 51: [2, 3], 55: [2, 3], 60: [2, 3] }, { 5: [2, 4], 14: [2, 4], 15: [2, 4], 19: [2, 4], 29: [2, 4], 34: [2, 4], 39: [2, 4], 44: [2, 4], 47: [2, 4], 48: [2, 4], 51: [2, 4], 55: [2, 4], 60: [2, 4] }, { 5: [2, 5], 14: [2, 5], 15: [2, 5], 19: [2, 5], 29: [2, 5], 34: [2, 5], 39: [2, 5], 44: [2, 5], 47: [2, 5], 48: [2, 5], 51: [2, 5], 55: [2, 5], 60: [2, 5] }, { 5: [2, 6], 14: [2, 6], 15: [2, 6], 19: [2, 6], 29: [2, 6], 34: [2, 6], 39: [2, 6], 44: [2, 6], 47: [2, 6], 48: [2, 6], 51: [2, 6], 55: [2, 6], 60: [2, 6] }, { 5: [2, 7], 14: [2, 7], 15: [2, 7], 19: [2, 7], 29: [2, 7], 34: [2, 7], 39: [2, 7], 44: [2, 7], 47: [2, 7], 48: [2, 7], 51: [2, 7], 55: [2, 7], 60: [2, 7] }, { 5: [2, 8], 14: [2, 8], 15: [2, 8], 19: [2, 8], 29: [2, 8], 34: [2, 8], 39: [2, 8], 44: [2, 8], 47: [2, 8], 48: [2, 8], 51: [2, 8], 55: [2, 8], 60: [2, 8] }, { 5: [2, 9], 14: [2, 9], 15: [2, 9], 19: [2, 9], 29: [2, 9], 34: [2, 9], 39: [2, 9], 44: [2, 9], 47: [2, 9], 48: [2, 9], 51: [2, 9], 55: [2, 9], 60: [2, 9] }, { 20: 25, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 36, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 4: 37, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 39: [2, 46], 44: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 4: 38, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 44: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 13: 40, 15: [1, 20], 17: 39 }, { 20: 42, 56: 41, 64: 43, 65: [1, 44], 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 4: 45, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 5: [2, 10], 14: [2, 10], 15: [2, 10], 18: [2, 10], 19: [2, 10], 29: [2, 10], 34: [2, 10], 39: [2, 10], 44: [2, 10], 47: [2, 10], 48: [2, 10], 51: [2, 10], 55: [2, 10], 60: [2, 10] }, { 20: 46, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 47, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 48, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 42, 56: 49, 64: 43, 65: [1, 44], 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 33: [2, 78], 49: 50, 65: [2, 78], 72: [2, 78], 80: [2, 78], 81: [2, 78], 82: [2, 78], 83: [2, 78], 84: [2, 78], 85: [2, 78] }, { 23: [2, 33], 33: [2, 33], 54: [2, 33], 65: [2, 33], 68: [2, 33], 72: [2, 33], 75: [2, 33], 80: [2, 33], 81: [2, 33], 82: [2, 33], 83: [2, 33], 84: [2, 33], 85: [2, 33] }, { 23: [2, 34], 33: [2, 34], 54: [2, 34], 65: [2, 34], 68: [2, 34], 72: [2, 34], 75: [2, 34], 80: [2, 34], 81: [2, 34], 82: [2, 34], 83: [2, 34], 84: [2, 34], 85: [2, 34] }, { 23: [2, 35], 33: [2, 35], 54: [2, 35], 65: [2, 35], 68: [2, 35], 72: [2, 35], 75: [2, 35], 80: [2, 35], 81: [2, 35], 82: [2, 35], 83: [2, 35], 84: [2, 35], 85: [2, 35] }, { 23: [2, 36], 33: [2, 36], 54: [2, 36], 65: [2, 36], 68: [2, 36], 72: [2, 36], 75: [2, 36], 80: [2, 36], 81: [2, 36], 82: [2, 36], 83: [2, 36], 84: [2, 36], 85: [2, 36] }, { 23: [2, 37], 33: [2, 37], 54: [2, 37], 65: [2, 37], 68: [2, 37], 72: [2, 37], 75: [2, 37], 80: [2, 37], 81: [2, 37], 82: [2, 37], 83: [2, 37], 84: [2, 37], 85: [2, 37] }, { 23: [2, 38], 33: [2, 38], 54: [2, 38], 65: [2, 38], 68: [2, 38], 72: [2, 38], 75: [2, 38], 80: [2, 38], 81: [2, 38], 82: [2, 38], 83: [2, 38], 84: [2, 38], 85: [2, 38] }, { 23: [2, 39], 33: [2, 39], 54: [2, 39], 65: [2, 39], 68: [2, 39], 72: [2, 39], 75: [2, 39], 80: [2, 39], 81: [2, 39], 82: [2, 39], 83: [2, 39], 84: [2, 39], 85: [2, 39] }, { 23: [2, 43], 33: [2, 43], 54: [2, 43], 65: [2, 43], 68: [2, 43], 72: [2, 43], 75: [2, 43], 80: [2, 43], 81: [2, 43], 82: [2, 43], 83: [2, 43], 84: [2, 43], 85: [2, 43], 87: [1, 51] }, { 72: [1, 35], 86: 52 }, { 23: [2, 45], 33: [2, 45], 54: [2, 45], 65: [2, 45], 68: [2, 45], 72: [2, 45], 75: [2, 45], 80: [2, 45], 81: [2, 45], 82: [2, 45], 83: [2, 45], 84: [2, 45], 85: [2, 45], 87: [2, 45] }, { 52: 53, 54: [2, 82], 65: [2, 82], 72: [2, 82], 80: [2, 82], 81: [2, 82], 82: [2, 82], 83: [2, 82], 84: [2, 82], 85: [2, 82] }, { 25: 54, 38: 56, 39: [1, 58], 43: 57, 44: [1, 59], 45: 55, 47: [2, 54] }, { 28: 60, 43: 61, 44: [1, 59], 47: [2, 56] }, { 13: 63, 15: [1, 20], 18: [1, 62] }, { 15: [2, 48], 18: [2, 48] }, { 33: [2, 86], 57: 64, 65: [2, 86], 72: [2, 86], 80: [2, 86], 81: [2, 86], 82: [2, 86], 83: [2, 86], 84: [2, 86], 85: [2, 86] }, { 33: [2, 40], 65: [2, 40], 72: [2, 40], 80: [2, 40], 81: [2, 40], 82: [2, 40], 83: [2, 40], 84: [2, 40], 85: [2, 40] }, { 33: [2, 41], 65: [2, 41], 72: [2, 41], 80: [2, 41], 81: [2, 41], 82: [2, 41], 83: [2, 41], 84: [2, 41], 85: [2, 41] }, { 20: 65, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 26: 66, 47: [1, 67] }, { 30: 68, 33: [2, 58], 65: [2, 58], 72: [2, 58], 75: [2, 58], 80: [2, 58], 81: [2, 58], 82: [2, 58], 83: [2, 58], 84: [2, 58], 85: [2, 58] }, { 33: [2, 64], 35: 69, 65: [2, 64], 72: [2, 64], 75: [2, 64], 80: [2, 64], 81: [2, 64], 82: [2, 64], 83: [2, 64], 84: [2, 64], 85: [2, 64] }, { 21: 70, 23: [2, 50], 65: [2, 50], 72: [2, 50], 80: [2, 50], 81: [2, 50], 82: [2, 50], 83: [2, 50], 84: [2, 50], 85: [2, 50] }, { 33: [2, 90], 61: 71, 65: [2, 90], 72: [2, 90], 80: [2, 90], 81: [2, 90], 82: [2, 90], 83: [2, 90], 84: [2, 90], 85: [2, 90] }, { 20: 75, 33: [2, 80], 50: 72, 63: 73, 64: 76, 65: [1, 44], 69: 74, 70: 77, 71: 78, 72: [1, 79], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 72: [1, 80] }, { 23: [2, 42], 33: [2, 42], 54: [2, 42], 65: [2, 42], 68: [2, 42], 72: [2, 42], 75: [2, 42], 80: [2, 42], 81: [2, 42], 82: [2, 42], 83: [2, 42], 84: [2, 42], 85: [2, 42], 87: [1, 51] }, { 20: 75, 53: 81, 54: [2, 84], 63: 82, 64: 76, 65: [1, 44], 69: 83, 70: 77, 71: 78, 72: [1, 79], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 26: 84, 47: [1, 67] }, { 47: [2, 55] }, { 4: 85, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 39: [2, 46], 44: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 47: [2, 20] }, { 20: 86, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 4: 87, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 26: 88, 47: [1, 67] }, { 47: [2, 57] }, { 5: [2, 11], 14: [2, 11], 15: [2, 11], 19: [2, 11], 29: [2, 11], 34: [2, 11], 39: [2, 11], 44: [2, 11], 47: [2, 11], 48: [2, 11], 51: [2, 11], 55: [2, 11], 60: [2, 11] }, { 15: [2, 49], 18: [2, 49] }, { 20: 75, 33: [2, 88], 58: 89, 63: 90, 64: 76, 65: [1, 44], 69: 91, 70: 77, 71: 78, 72: [1, 79], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 65: [2, 94], 66: 92, 68: [2, 94], 72: [2, 94], 80: [2, 94], 81: [2, 94], 82: [2, 94], 83: [2, 94], 84: [2, 94], 85: [2, 94] }, { 5: [2, 25], 14: [2, 25], 15: [2, 25], 19: [2, 25], 29: [2, 25], 34: [2, 25], 39: [2, 25], 44: [2, 25], 47: [2, 25], 48: [2, 25], 51: [2, 25], 55: [2, 25], 60: [2, 25] }, { 20: 93, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 75, 31: 94, 33: [2, 60], 63: 95, 64: 76, 65: [1, 44], 69: 96, 70: 77, 71: 78, 72: [1, 79], 75: [2, 60], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 75, 33: [2, 66], 36: 97, 63: 98, 64: 76, 65: [1, 44], 69: 99, 70: 77, 71: 78, 72: [1, 79], 75: [2, 66], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 75, 22: 100, 23: [2, 52], 63: 101, 64: 76, 65: [1, 44], 69: 102, 70: 77, 71: 78, 72: [1, 79], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 75, 33: [2, 92], 62: 103, 63: 104, 64: 76, 65: [1, 44], 69: 105, 70: 77, 71: 78, 72: [1, 79], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 33: [1, 106] }, { 33: [2, 79], 65: [2, 79], 72: [2, 79], 80: [2, 79], 81: [2, 79], 82: [2, 79], 83: [2, 79], 84: [2, 79], 85: [2, 79] }, { 33: [2, 81] }, { 23: [2, 27], 33: [2, 27], 54: [2, 27], 65: [2, 27], 68: [2, 27], 72: [2, 27], 75: [2, 27], 80: [2, 27], 81: [2, 27], 82: [2, 27], 83: [2, 27], 84: [2, 27], 85: [2, 27] }, { 23: [2, 28], 33: [2, 28], 54: [2, 28], 65: [2, 28], 68: [2, 28], 72: [2, 28], 75: [2, 28], 80: [2, 28], 81: [2, 28], 82: [2, 28], 83: [2, 28], 84: [2, 28], 85: [2, 28] }, { 23: [2, 30], 33: [2, 30], 54: [2, 30], 68: [2, 30], 71: 107, 72: [1, 108], 75: [2, 30] }, { 23: [2, 98], 33: [2, 98], 54: [2, 98], 68: [2, 98], 72: [2, 98], 75: [2, 98] }, { 23: [2, 45], 33: [2, 45], 54: [2, 45], 65: [2, 45], 68: [2, 45], 72: [2, 45], 73: [1, 109], 75: [2, 45], 80: [2, 45], 81: [2, 45], 82: [2, 45], 83: [2, 45], 84: [2, 45], 85: [2, 45], 87: [2, 45] }, { 23: [2, 44], 33: [2, 44], 54: [2, 44], 65: [2, 44], 68: [2, 44], 72: [2, 44], 75: [2, 44], 80: [2, 44], 81: [2, 44], 82: [2, 44], 83: [2, 44], 84: [2, 44], 85: [2, 44], 87: [2, 44] }, { 54: [1, 110] }, { 54: [2, 83], 65: [2, 83], 72: [2, 83], 80: [2, 83], 81: [2, 83], 82: [2, 83], 83: [2, 83], 84: [2, 83], 85: [2, 83] }, { 54: [2, 85] }, { 5: [2, 13], 14: [2, 13], 15: [2, 13], 19: [2, 13], 29: [2, 13], 34: [2, 13], 39: [2, 13], 44: [2, 13], 47: [2, 13], 48: [2, 13], 51: [2, 13], 55: [2, 13], 60: [2, 13] }, { 38: 56, 39: [1, 58], 43: 57, 44: [1, 59], 45: 112, 46: 111, 47: [2, 76] }, { 33: [2, 70], 40: 113, 65: [2, 70], 72: [2, 70], 75: [2, 70], 80: [2, 70], 81: [2, 70], 82: [2, 70], 83: [2, 70], 84: [2, 70], 85: [2, 70] }, { 47: [2, 18] }, { 5: [2, 14], 14: [2, 14], 15: [2, 14], 19: [2, 14], 29: [2, 14], 34: [2, 14], 39: [2, 14], 44: [2, 14], 47: [2, 14], 48: [2, 14], 51: [2, 14], 55: [2, 14], 60: [2, 14] }, { 33: [1, 114] }, { 33: [2, 87], 65: [2, 87], 72: [2, 87], 80: [2, 87], 81: [2, 87], 82: [2, 87], 83: [2, 87], 84: [2, 87], 85: [2, 87] }, { 33: [2, 89] }, { 20: 75, 63: 116, 64: 76, 65: [1, 44], 67: 115, 68: [2, 96], 69: 117, 70: 77, 71: 78, 72: [1, 79], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 33: [1, 118] }, { 32: 119, 33: [2, 62], 74: 120, 75: [1, 121] }, { 33: [2, 59], 65: [2, 59], 72: [2, 59], 75: [2, 59], 80: [2, 59], 81: [2, 59], 82: [2, 59], 83: [2, 59], 84: [2, 59], 85: [2, 59] }, { 33: [2, 61], 75: [2, 61] }, { 33: [2, 68], 37: 122, 74: 123, 75: [1, 121] }, { 33: [2, 65], 65: [2, 65], 72: [2, 65], 75: [2, 65], 80: [2, 65], 81: [2, 65], 82: [2, 65], 83: [2, 65], 84: [2, 65], 85: [2, 65] }, { 33: [2, 67], 75: [2, 67] }, { 23: [1, 124] }, { 23: [2, 51], 65: [2, 51], 72: [2, 51], 80: [2, 51], 81: [2, 51], 82: [2, 51], 83: [2, 51], 84: [2, 51], 85: [2, 51] }, { 23: [2, 53] }, { 33: [1, 125] }, { 33: [2, 91], 65: [2, 91], 72: [2, 91], 80: [2, 91], 81: [2, 91], 82: [2, 91], 83: [2, 91], 84: [2, 91], 85: [2, 91] }, { 33: [2, 93] }, { 5: [2, 22], 14: [2, 22], 15: [2, 22], 19: [2, 22], 29: [2, 22], 34: [2, 22], 39: [2, 22], 44: [2, 22], 47: [2, 22], 48: [2, 22], 51: [2, 22], 55: [2, 22], 60: [2, 22] }, { 23: [2, 99], 33: [2, 99], 54: [2, 99], 68: [2, 99], 72: [2, 99], 75: [2, 99] }, { 73: [1, 109] }, { 20: 75, 63: 126, 64: 76, 65: [1, 44], 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 5: [2, 23], 14: [2, 23], 15: [2, 23], 19: [2, 23], 29: [2, 23], 34: [2, 23], 39: [2, 23], 44: [2, 23], 47: [2, 23], 48: [2, 23], 51: [2, 23], 55: [2, 23], 60: [2, 23] }, { 47: [2, 19] }, { 47: [2, 77] }, { 20: 75, 33: [2, 72], 41: 127, 63: 128, 64: 76, 65: [1, 44], 69: 129, 70: 77, 71: 78, 72: [1, 79], 75: [2, 72], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 5: [2, 24], 14: [2, 24], 15: [2, 24], 19: [2, 24], 29: [2, 24], 34: [2, 24], 39: [2, 24], 44: [2, 24], 47: [2, 24], 48: [2, 24], 51: [2, 24], 55: [2, 24], 60: [2, 24] }, { 68: [1, 130] }, { 65: [2, 95], 68: [2, 95], 72: [2, 95], 80: [2, 95], 81: [2, 95], 82: [2, 95], 83: [2, 95], 84: [2, 95], 85: [2, 95] }, { 68: [2, 97] }, { 5: [2, 21], 14: [2, 21], 15: [2, 21], 19: [2, 21], 29: [2, 21], 34: [2, 21], 39: [2, 21], 44: [2, 21], 47: [2, 21], 48: [2, 21], 51: [2, 21], 55: [2, 21], 60: [2, 21] }, { 33: [1, 131] }, { 33: [2, 63] }, { 72: [1, 133], 76: 132 }, { 33: [1, 134] }, { 33: [2, 69] }, { 15: [2, 12] }, { 14: [2, 26], 15: [2, 26], 19: [2, 26], 29: [2, 26], 34: [2, 26], 47: [2, 26], 48: [2, 26], 51: [2, 26], 55: [2, 26], 60: [2, 26] }, { 23: [2, 31], 33: [2, 31], 54: [2, 31], 68: [2, 31], 72: [2, 31], 75: [2, 31] }, { 33: [2, 74], 42: 135, 74: 136, 75: [1, 121] }, { 33: [2, 71], 65: [2, 71], 72: [2, 71], 75: [2, 71], 80: [2, 71], 81: [2, 71], 82: [2, 71], 83: [2, 71], 84: [2, 71], 85: [2, 71] }, { 33: [2, 73], 75: [2, 73] }, { 23: [2, 29], 33: [2, 29], 54: [2, 29], 65: [2, 29], 68: [2, 29], 72: [2, 29], 75: [2, 29], 80: [2, 29], 81: [2, 29], 82: [2, 29], 83: [2, 29], 84: [2, 29], 85: [2, 29] }, { 14: [2, 15], 15: [2, 15], 19: [2, 15], 29: [2, 15], 34: [2, 15], 39: [2, 15], 44: [2, 15], 47: [2, 15], 48: [2, 15], 51: [2, 15], 55: [2, 15], 60: [2, 15] }, { 72: [1, 138], 77: [1, 137] }, { 72: [2, 100], 77: [2, 100] }, { 14: [2, 16], 15: [2, 16], 19: [2, 16], 29: [2, 16], 34: [2, 16], 44: [2, 16], 47: [2, 16], 48: [2, 16], 51: [2, 16], 55: [2, 16], 60: [2, 16] }, { 33: [1, 139] }, { 33: [2, 75] }, { 33: [2, 32] }, { 72: [2, 101], 77: [2, 101] }, { 14: [2, 17], 15: [2, 17], 19: [2, 17], 29: [2, 17], 34: [2, 17], 39: [2, 17], 44: [2, 17], 47: [2, 17], 48: [2, 17], 51: [2, 17], 55: [2, 17], 60: [2, 17] }],
	        defaultActions: { 4: [2, 1], 55: [2, 55], 57: [2, 20], 61: [2, 57], 74: [2, 81], 83: [2, 85], 87: [2, 18], 91: [2, 89], 102: [2, 53], 105: [2, 93], 111: [2, 19], 112: [2, 77], 117: [2, 97], 120: [2, 63], 123: [2, 69], 124: [2, 12], 136: [2, 75], 137: [2, 32] },
	        parseError: function parseError(str, hash) {
	            throw new Error(str);
	        },
	        parse: function parse(input) {
	            var self = this,
	                stack = [0],
	                vstack = [null],
	                lstack = [],
	                table = this.table,
	                yytext = "",
	                yylineno = 0,
	                yyleng = 0,
	                recovering = 0,
	                TERROR = 2,
	                EOF = 1;
	            this.lexer.setInput(input);
	            this.lexer.yy = this.yy;
	            this.yy.lexer = this.lexer;
	            this.yy.parser = this;
	            if (typeof this.lexer.yylloc == "undefined") this.lexer.yylloc = {};
	            var yyloc = this.lexer.yylloc;
	            lstack.push(yyloc);
	            var ranges = this.lexer.options && this.lexer.options.ranges;
	            if (typeof this.yy.parseError === "function") this.parseError = this.yy.parseError;
	            function popStack(n) {
	                stack.length = stack.length - 2 * n;
	                vstack.length = vstack.length - n;
	                lstack.length = lstack.length - n;
	            }
	            function lex() {
	                var token;
	                token = self.lexer.lex() || 1;
	                if (typeof token !== "number") {
	                    token = self.symbols_[token] || token;
	                }
	                return token;
	            }
	            var symbol,
	                preErrorSymbol,
	                state,
	                action,
	                a,
	                r,
	                yyval = {},
	                p,
	                len,
	                newState,
	                expected;
	            while (true) {
	                state = stack[stack.length - 1];
	                if (this.defaultActions[state]) {
	                    action = this.defaultActions[state];
	                } else {
	                    if (symbol === null || typeof symbol == "undefined") {
	                        symbol = lex();
	                    }
	                    action = table[state] && table[state][symbol];
	                }
	                if (typeof action === "undefined" || !action.length || !action[0]) {
	                    var errStr = "";
	                    if (!recovering) {
	                        expected = [];
	                        for (p in table[state]) if (this.terminals_[p] && p > 2) {
	                            expected.push("'" + this.terminals_[p] + "'");
	                        }
	                        if (this.lexer.showPosition) {
	                            errStr = "Parse error on line " + (yylineno + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + expected.join(", ") + ", got '" + (this.terminals_[symbol] || symbol) + "'";
	                        } else {
	                            errStr = "Parse error on line " + (yylineno + 1) + ": Unexpected " + (symbol == 1 ? "end of input" : "'" + (this.terminals_[symbol] || symbol) + "'");
	                        }
	                        this.parseError(errStr, { text: this.lexer.match, token: this.terminals_[symbol] || symbol, line: this.lexer.yylineno, loc: yyloc, expected: expected });
	                    }
	                }
	                if (action[0] instanceof Array && action.length > 1) {
	                    throw new Error("Parse Error: multiple actions possible at state: " + state + ", token: " + symbol);
	                }
	                switch (action[0]) {
	                    case 1:
	                        stack.push(symbol);
	                        vstack.push(this.lexer.yytext);
	                        lstack.push(this.lexer.yylloc);
	                        stack.push(action[1]);
	                        symbol = null;
	                        if (!preErrorSymbol) {
	                            yyleng = this.lexer.yyleng;
	                            yytext = this.lexer.yytext;
	                            yylineno = this.lexer.yylineno;
	                            yyloc = this.lexer.yylloc;
	                            if (recovering > 0) recovering--;
	                        } else {
	                            symbol = preErrorSymbol;
	                            preErrorSymbol = null;
	                        }
	                        break;
	                    case 2:
	                        len = this.productions_[action[1]][1];
	                        yyval.$ = vstack[vstack.length - len];
	                        yyval._$ = { first_line: lstack[lstack.length - (len || 1)].first_line, last_line: lstack[lstack.length - 1].last_line, first_column: lstack[lstack.length - (len || 1)].first_column, last_column: lstack[lstack.length - 1].last_column };
	                        if (ranges) {
	                            yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]];
	                        }
	                        r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);
	                        if (typeof r !== "undefined") {
	                            return r;
	                        }
	                        if (len) {
	                            stack = stack.slice(0, -1 * len * 2);
	                            vstack = vstack.slice(0, -1 * len);
	                            lstack = lstack.slice(0, -1 * len);
	                        }
	                        stack.push(this.productions_[action[1]][0]);
	                        vstack.push(yyval.$);
	                        lstack.push(yyval._$);
	                        newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
	                        stack.push(newState);
	                        break;
	                    case 3:
	                        return true;
	                }
	            }
	            return true;
	        }
	    };
	    /* Jison generated lexer */
	    var lexer = (function () {
	        var lexer = { EOF: 1,
	            parseError: function parseError(str, hash) {
	                if (this.yy.parser) {
	                    this.yy.parser.parseError(str, hash);
	                } else {
	                    throw new Error(str);
	                }
	            },
	            setInput: function setInput(input) {
	                this._input = input;
	                this._more = this._less = this.done = false;
	                this.yylineno = this.yyleng = 0;
	                this.yytext = this.matched = this.match = '';
	                this.conditionStack = ['INITIAL'];
	                this.yylloc = { first_line: 1, first_column: 0, last_line: 1, last_column: 0 };
	                if (this.options.ranges) this.yylloc.range = [0, 0];
	                this.offset = 0;
	                return this;
	            },
	            input: function input() {
	                var ch = this._input[0];
	                this.yytext += ch;
	                this.yyleng++;
	                this.offset++;
	                this.match += ch;
	                this.matched += ch;
	                var lines = ch.match(/(?:\r\n?|\n).*/g);
	                if (lines) {
	                    this.yylineno++;
	                    this.yylloc.last_line++;
	                } else {
	                    this.yylloc.last_column++;
	                }
	                if (this.options.ranges) this.yylloc.range[1]++;

	                this._input = this._input.slice(1);
	                return ch;
	            },
	            unput: function unput(ch) {
	                var len = ch.length;
	                var lines = ch.split(/(?:\r\n?|\n)/g);

	                this._input = ch + this._input;
	                this.yytext = this.yytext.substr(0, this.yytext.length - len - 1);
	                //this.yyleng -= len;
	                this.offset -= len;
	                var oldLines = this.match.split(/(?:\r\n?|\n)/g);
	                this.match = this.match.substr(0, this.match.length - 1);
	                this.matched = this.matched.substr(0, this.matched.length - 1);

	                if (lines.length - 1) this.yylineno -= lines.length - 1;
	                var r = this.yylloc.range;

	                this.yylloc = { first_line: this.yylloc.first_line,
	                    last_line: this.yylineno + 1,
	                    first_column: this.yylloc.first_column,
	                    last_column: lines ? (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length : this.yylloc.first_column - len
	                };

	                if (this.options.ranges) {
	                    this.yylloc.range = [r[0], r[0] + this.yyleng - len];
	                }
	                return this;
	            },
	            more: function more() {
	                this._more = true;
	                return this;
	            },
	            less: function less(n) {
	                this.unput(this.match.slice(n));
	            },
	            pastInput: function pastInput() {
	                var past = this.matched.substr(0, this.matched.length - this.match.length);
	                return (past.length > 20 ? '...' : '') + past.substr(-20).replace(/\n/g, "");
	            },
	            upcomingInput: function upcomingInput() {
	                var next = this.match;
	                if (next.length < 20) {
	                    next += this._input.substr(0, 20 - next.length);
	                }
	                return (next.substr(0, 20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
	            },
	            showPosition: function showPosition() {
	                var pre = this.pastInput();
	                var c = new Array(pre.length + 1).join("-");
	                return pre + this.upcomingInput() + "\n" + c + "^";
	            },
	            next: function next() {
	                if (this.done) {
	                    return this.EOF;
	                }
	                if (!this._input) this.done = true;

	                var token, match, tempMatch, index, col, lines;
	                if (!this._more) {
	                    this.yytext = '';
	                    this.match = '';
	                }
	                var rules = this._currentRules();
	                for (var i = 0; i < rules.length; i++) {
	                    tempMatch = this._input.match(this.rules[rules[i]]);
	                    if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
	                        match = tempMatch;
	                        index = i;
	                        if (!this.options.flex) break;
	                    }
	                }
	                if (match) {
	                    lines = match[0].match(/(?:\r\n?|\n).*/g);
	                    if (lines) this.yylineno += lines.length;
	                    this.yylloc = { first_line: this.yylloc.last_line,
	                        last_line: this.yylineno + 1,
	                        first_column: this.yylloc.last_column,
	                        last_column: lines ? lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length };
	                    this.yytext += match[0];
	                    this.match += match[0];
	                    this.matches = match;
	                    this.yyleng = this.yytext.length;
	                    if (this.options.ranges) {
	                        this.yylloc.range = [this.offset, this.offset += this.yyleng];
	                    }
	                    this._more = false;
	                    this._input = this._input.slice(match[0].length);
	                    this.matched += match[0];
	                    token = this.performAction.call(this, this.yy, this, rules[index], this.conditionStack[this.conditionStack.length - 1]);
	                    if (this.done && this._input) this.done = false;
	                    if (token) return token;else return;
	                }
	                if (this._input === "") {
	                    return this.EOF;
	                } else {
	                    return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), { text: "", token: null, line: this.yylineno });
	                }
	            },
	            lex: function lex() {
	                var r = this.next();
	                if (typeof r !== 'undefined') {
	                    return r;
	                } else {
	                    return this.lex();
	                }
	            },
	            begin: function begin(condition) {
	                this.conditionStack.push(condition);
	            },
	            popState: function popState() {
	                return this.conditionStack.pop();
	            },
	            _currentRules: function _currentRules() {
	                return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
	            },
	            topState: function topState() {
	                return this.conditionStack[this.conditionStack.length - 2];
	            },
	            pushState: function begin(condition) {
	                this.begin(condition);
	            } };
	        lexer.options = {};
	        lexer.performAction = function anonymous(yy, yy_, $avoiding_name_collisions, YY_START
	        /**/) {

	            function strip(start, end) {
	                return yy_.yytext = yy_.yytext.substr(start, yy_.yyleng - end);
	            }

	            var YYSTATE = YY_START;
	            switch ($avoiding_name_collisions) {
	                case 0:
	                    if (yy_.yytext.slice(-2) === "\\\\") {
	                        strip(0, 1);
	                        this.begin("mu");
	                    } else if (yy_.yytext.slice(-1) === "\\") {
	                        strip(0, 1);
	                        this.begin("emu");
	                    } else {
	                        this.begin("mu");
	                    }
	                    if (yy_.yytext) return 15;

	                    break;
	                case 1:
	                    return 15;
	                    break;
	                case 2:
	                    this.popState();
	                    return 15;

	                    break;
	                case 3:
	                    this.begin('raw');return 15;
	                    break;
	                case 4:
	                    this.popState();
	                    // Should be using `this.topState()` below, but it currently
	                    // returns the second top instead of the first top. Opened an
	                    // issue about it at https://github.com/zaach/jison/issues/291
	                    if (this.conditionStack[this.conditionStack.length - 1] === 'raw') {
	                        return 15;
	                    } else {
	                        yy_.yytext = yy_.yytext.substr(5, yy_.yyleng - 9);
	                        return 'END_RAW_BLOCK';
	                    }

	                    break;
	                case 5:
	                    return 15;
	                    break;
	                case 6:
	                    this.popState();
	                    return 14;

	                    break;
	                case 7:
	                    return 65;
	                    break;
	                case 8:
	                    return 68;
	                    break;
	                case 9:
	                    return 19;
	                    break;
	                case 10:
	                    this.popState();
	                    this.begin('raw');
	                    return 23;

	                    break;
	                case 11:
	                    return 55;
	                    break;
	                case 12:
	                    return 60;
	                    break;
	                case 13:
	                    return 29;
	                    break;
	                case 14:
	                    return 47;
	                    break;
	                case 15:
	                    this.popState();return 44;
	                    break;
	                case 16:
	                    this.popState();return 44;
	                    break;
	                case 17:
	                    return 34;
	                    break;
	                case 18:
	                    return 39;
	                    break;
	                case 19:
	                    return 51;
	                    break;
	                case 20:
	                    return 48;
	                    break;
	                case 21:
	                    this.unput(yy_.yytext);
	                    this.popState();
	                    this.begin('com');

	                    break;
	                case 22:
	                    this.popState();
	                    return 14;

	                    break;
	                case 23:
	                    return 48;
	                    break;
	                case 24:
	                    return 73;
	                    break;
	                case 25:
	                    return 72;
	                    break;
	                case 26:
	                    return 72;
	                    break;
	                case 27:
	                    return 87;
	                    break;
	                case 28:
	                    // ignore whitespace
	                    break;
	                case 29:
	                    this.popState();return 54;
	                    break;
	                case 30:
	                    this.popState();return 33;
	                    break;
	                case 31:
	                    yy_.yytext = strip(1, 2).replace(/\\"/g, '"');return 80;
	                    break;
	                case 32:
	                    yy_.yytext = strip(1, 2).replace(/\\'/g, "'");return 80;
	                    break;
	                case 33:
	                    return 85;
	                    break;
	                case 34:
	                    return 82;
	                    break;
	                case 35:
	                    return 82;
	                    break;
	                case 36:
	                    return 83;
	                    break;
	                case 37:
	                    return 84;
	                    break;
	                case 38:
	                    return 81;
	                    break;
	                case 39:
	                    return 75;
	                    break;
	                case 40:
	                    return 77;
	                    break;
	                case 41:
	                    return 72;
	                    break;
	                case 42:
	                    yy_.yytext = yy_.yytext.replace(/\\([\\\]])/g, '$1');return 72;
	                    break;
	                case 43:
	                    return 'INVALID';
	                    break;
	                case 44:
	                    return 5;
	                    break;
	            }
	        };
	        lexer.rules = [/^(?:[^\x00]*?(?=(\{\{)))/, /^(?:[^\x00]+)/, /^(?:[^\x00]{2,}?(?=(\{\{|\\\{\{|\\\\\{\{|$)))/, /^(?:\{\{\{\{(?=[^\/]))/, /^(?:\{\{\{\{\/[^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=[=}\s\/.])\}\}\}\})/, /^(?:[^\x00]*?(?=(\{\{\{\{)))/, /^(?:[\s\S]*?--(~)?\}\})/, /^(?:\()/, /^(?:\))/, /^(?:\{\{\{\{)/, /^(?:\}\}\}\})/, /^(?:\{\{(~)?>)/, /^(?:\{\{(~)?#>)/, /^(?:\{\{(~)?#\*?)/, /^(?:\{\{(~)?\/)/, /^(?:\{\{(~)?\^\s*(~)?\}\})/, /^(?:\{\{(~)?\s*else\s*(~)?\}\})/, /^(?:\{\{(~)?\^)/, /^(?:\{\{(~)?\s*else\b)/, /^(?:\{\{(~)?\{)/, /^(?:\{\{(~)?&)/, /^(?:\{\{(~)?!--)/, /^(?:\{\{(~)?![\s\S]*?\}\})/, /^(?:\{\{(~)?\*?)/, /^(?:=)/, /^(?:\.\.)/, /^(?:\.(?=([=~}\s\/.)|])))/, /^(?:[\/.])/, /^(?:\s+)/, /^(?:\}(~)?\}\})/, /^(?:(~)?\}\})/, /^(?:"(\\["]|[^"])*")/, /^(?:'(\\[']|[^'])*')/, /^(?:@)/, /^(?:true(?=([~}\s)])))/, /^(?:false(?=([~}\s)])))/, /^(?:undefined(?=([~}\s)])))/, /^(?:null(?=([~}\s)])))/, /^(?:-?[0-9]+(?:\.[0-9]+)?(?=([~}\s)])))/, /^(?:as\s+\|)/, /^(?:\|)/, /^(?:([^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=([=~}\s\/.)|]))))/, /^(?:\[(\\\]|[^\]])*\])/, /^(?:.)/, /^(?:$)/];
	        lexer.conditions = { "mu": { "rules": [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44], "inclusive": false }, "emu": { "rules": [2], "inclusive": false }, "com": { "rules": [6], "inclusive": false }, "raw": { "rules": [3, 4, 5], "inclusive": false }, "INITIAL": { "rules": [0, 1, 44], "inclusive": true } };
	        return lexer;
	    })();
	    parser.lexer = lexer;
	    function Parser() {
	        this.yy = {};
	    }Parser.prototype = parser;parser.Parser = Parser;
	    return new Parser();
	})();exports.__esModule = true;
	exports['default'] = handlebars;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(1)['default'];

	exports.__esModule = true;

	var _visitor = __webpack_require__(28);

	var _visitor2 = _interopRequireDefault(_visitor);

	function WhitespaceControl() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	  this.options = options;
	}
	WhitespaceControl.prototype = new _visitor2['default']();

	WhitespaceControl.prototype.Program = function (program) {
	  var doStandalone = !this.options.ignoreStandalone;

	  var isRoot = !this.isRootSeen;
	  this.isRootSeen = true;

	  var body = program.body;
	  for (var i = 0, l = body.length; i < l; i++) {
	    var current = body[i],
	        strip = this.accept(current);

	    if (!strip) {
	      continue;
	    }

	    var _isPrevWhitespace = isPrevWhitespace(body, i, isRoot),
	        _isNextWhitespace = isNextWhitespace(body, i, isRoot),
	        openStandalone = strip.openStandalone && _isPrevWhitespace,
	        closeStandalone = strip.closeStandalone && _isNextWhitespace,
	        inlineStandalone = strip.inlineStandalone && _isPrevWhitespace && _isNextWhitespace;

	    if (strip.close) {
	      omitRight(body, i, true);
	    }
	    if (strip.open) {
	      omitLeft(body, i, true);
	    }

	    if (doStandalone && inlineStandalone) {
	      omitRight(body, i);

	      if (omitLeft(body, i)) {
	        // If we are on a standalone node, save the indent info for partials
	        if (current.type === 'PartialStatement') {
	          // Pull out the whitespace from the final line
	          current.indent = /([ \t]+$)/.exec(body[i - 1].original)[1];
	        }
	      }
	    }
	    if (doStandalone && openStandalone) {
	      omitRight((current.program || current.inverse).body);

	      // Strip out the previous content node if it's whitespace only
	      omitLeft(body, i);
	    }
	    if (doStandalone && closeStandalone) {
	      // Always strip the next node
	      omitRight(body, i);

	      omitLeft((current.inverse || current.program).body);
	    }
	  }

	  return program;
	};

	WhitespaceControl.prototype.BlockStatement = WhitespaceControl.prototype.DecoratorBlock = WhitespaceControl.prototype.PartialBlockStatement = function (block) {
	  this.accept(block.program);
	  this.accept(block.inverse);

	  // Find the inverse program that is involed with whitespace stripping.
	  var program = block.program || block.inverse,
	      inverse = block.program && block.inverse,
	      firstInverse = inverse,
	      lastInverse = inverse;

	  if (inverse && inverse.chained) {
	    firstInverse = inverse.body[0].program;

	    // Walk the inverse chain to find the last inverse that is actually in the chain.
	    while (lastInverse.chained) {
	      lastInverse = lastInverse.body[lastInverse.body.length - 1].program;
	    }
	  }

	  var strip = {
	    open: block.openStrip.open,
	    close: block.closeStrip.close,

	    // Determine the standalone candiacy. Basically flag our content as being possibly standalone
	    // so our parent can determine if we actually are standalone
	    openStandalone: isNextWhitespace(program.body),
	    closeStandalone: isPrevWhitespace((firstInverse || program).body)
	  };

	  if (block.openStrip.close) {
	    omitRight(program.body, null, true);
	  }

	  if (inverse) {
	    var inverseStrip = block.inverseStrip;

	    if (inverseStrip.open) {
	      omitLeft(program.body, null, true);
	    }

	    if (inverseStrip.close) {
	      omitRight(firstInverse.body, null, true);
	    }
	    if (block.closeStrip.open) {
	      omitLeft(lastInverse.body, null, true);
	    }

	    // Find standalone else statments
	    if (!this.options.ignoreStandalone && isPrevWhitespace(program.body) && isNextWhitespace(firstInverse.body)) {
	      omitLeft(program.body);
	      omitRight(firstInverse.body);
	    }
	  } else if (block.closeStrip.open) {
	    omitLeft(program.body, null, true);
	  }

	  return strip;
	};

	WhitespaceControl.prototype.Decorator = WhitespaceControl.prototype.MustacheStatement = function (mustache) {
	  return mustache.strip;
	};

	WhitespaceControl.prototype.PartialStatement = WhitespaceControl.prototype.CommentStatement = function (node) {
	  /* istanbul ignore next */
	  var strip = node.strip || {};
	  return {
	    inlineStandalone: true,
	    open: strip.open,
	    close: strip.close
	  };
	};

	function isPrevWhitespace(body, i, isRoot) {
	  if (i === undefined) {
	    i = body.length;
	  }

	  // Nodes that end with newlines are considered whitespace (but are special
	  // cased for strip operations)
	  var prev = body[i - 1],
	      sibling = body[i - 2];
	  if (!prev) {
	    return isRoot;
	  }

	  if (prev.type === 'ContentStatement') {
	    return (sibling || !isRoot ? /\r?\n\s*?$/ : /(^|\r?\n)\s*?$/).test(prev.original);
	  }
	}
	function isNextWhitespace(body, i, isRoot) {
	  if (i === undefined) {
	    i = -1;
	  }

	  var next = body[i + 1],
	      sibling = body[i + 2];
	  if (!next) {
	    return isRoot;
	  }

	  if (next.type === 'ContentStatement') {
	    return (sibling || !isRoot ? /^\s*?\r?\n/ : /^\s*?(\r?\n|$)/).test(next.original);
	  }
	}

	// Marks the node to the right of the position as omitted.
	// I.e. {{foo}}' ' will mark the ' ' node as omitted.
	//
	// If i is undefined, then the first child will be marked as such.
	//
	// If mulitple is truthy then all whitespace will be stripped out until non-whitespace
	// content is met.
	function omitRight(body, i, multiple) {
	  var current = body[i == null ? 0 : i + 1];
	  if (!current || current.type !== 'ContentStatement' || !multiple && current.rightStripped) {
	    return;
	  }

	  var original = current.value;
	  current.value = current.value.replace(multiple ? /^\s+/ : /^[ \t]*\r?\n?/, '');
	  current.rightStripped = current.value !== original;
	}

	// Marks the node to the left of the position as omitted.
	// I.e. ' '{{foo}} will mark the ' ' node as omitted.
	//
	// If i is undefined then the last child will be marked as such.
	//
	// If mulitple is truthy then all whitespace will be stripped out until non-whitespace
	// content is met.
	function omitLeft(body, i, multiple) {
	  var current = body[i == null ? body.length - 1 : i - 1];
	  if (!current || current.type !== 'ContentStatement' || !multiple && current.leftStripped) {
	    return;
	  }

	  // We omit the last node if it's whitespace only and not preceeded by a non-content node.
	  var original = current.value;
	  current.value = current.value.replace(multiple ? /\s+$/ : /[ \t]+$/, '');
	  current.leftStripped = current.value !== original;
	  return current.leftStripped;
	}

	exports['default'] = WhitespaceControl;
	module.exports = exports['default'];

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(1)['default'];

	exports.__esModule = true;

	var _exception = __webpack_require__(6);

	var _exception2 = _interopRequireDefault(_exception);

	function Visitor() {
	  this.parents = [];
	}

	Visitor.prototype = {
	  constructor: Visitor,
	  mutating: false,

	  // Visits a given value. If mutating, will replace the value if necessary.
	  acceptKey: function acceptKey(node, name) {
	    var value = this.accept(node[name]);
	    if (this.mutating) {
	      // Hacky sanity check: This may have a few false positives for type for the helper
	      // methods but will generally do the right thing without a lot of overhead.
	      if (value && !Visitor.prototype[value.type]) {
	        throw new _exception2['default']('Unexpected node type "' + value.type + '" found when accepting ' + name + ' on ' + node.type);
	      }
	      node[name] = value;
	    }
	  },

	  // Performs an accept operation with added sanity check to ensure
	  // required keys are not removed.
	  acceptRequired: function acceptRequired(node, name) {
	    this.acceptKey(node, name);

	    if (!node[name]) {
	      throw new _exception2['default'](node.type + ' requires ' + name);
	    }
	  },

	  // Traverses a given array. If mutating, empty respnses will be removed
	  // for child elements.
	  acceptArray: function acceptArray(array) {
	    for (var i = 0, l = array.length; i < l; i++) {
	      this.acceptKey(array, i);

	      if (!array[i]) {
	        array.splice(i, 1);
	        i--;
	        l--;
	      }
	    }
	  },

	  accept: function accept(object) {
	    if (!object) {
	      return;
	    }

	    /* istanbul ignore next: Sanity code */
	    if (!this[object.type]) {
	      throw new _exception2['default']('Unknown type: ' + object.type, object);
	    }

	    if (this.current) {
	      this.parents.unshift(this.current);
	    }
	    this.current = object;

	    var ret = this[object.type](object);

	    this.current = this.parents.shift();

	    if (!this.mutating || ret) {
	      return ret;
	    } else if (ret !== false) {
	      return object;
	    }
	  },

	  Program: function Program(program) {
	    this.acceptArray(program.body);
	  },

	  MustacheStatement: visitSubExpression,
	  Decorator: visitSubExpression,

	  BlockStatement: visitBlock,
	  DecoratorBlock: visitBlock,

	  PartialStatement: visitPartial,
	  PartialBlockStatement: function PartialBlockStatement(partial) {
	    visitPartial.call(this, partial);

	    this.acceptKey(partial, 'program');
	  },

	  ContentStatement: function ContentStatement() /* content */{},
	  CommentStatement: function CommentStatement() /* comment */{},

	  SubExpression: visitSubExpression,

	  PathExpression: function PathExpression() /* path */{},

	  StringLiteral: function StringLiteral() /* string */{},
	  NumberLiteral: function NumberLiteral() /* number */{},
	  BooleanLiteral: function BooleanLiteral() /* bool */{},
	  UndefinedLiteral: function UndefinedLiteral() /* literal */{},
	  NullLiteral: function NullLiteral() /* literal */{},

	  Hash: function Hash(hash) {
	    this.acceptArray(hash.pairs);
	  },
	  HashPair: function HashPair(pair) {
	    this.acceptRequired(pair, 'value');
	  }
	};

	function visitSubExpression(mustache) {
	  this.acceptRequired(mustache, 'path');
	  this.acceptArray(mustache.params);
	  this.acceptKey(mustache, 'hash');
	}
	function visitBlock(block) {
	  visitSubExpression.call(this, block);

	  this.acceptKey(block, 'program');
	  this.acceptKey(block, 'inverse');
	}
	function visitPartial(partial) {
	  this.acceptRequired(partial, 'name');
	  this.acceptArray(partial.params);
	  this.acceptKey(partial, 'hash');
	}

	exports['default'] = Visitor;
	module.exports = exports['default'];

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(1)['default'];

	exports.__esModule = true;
	exports.SourceLocation = SourceLocation;
	exports.id = id;
	exports.stripFlags = stripFlags;
	exports.stripComment = stripComment;
	exports.preparePath = preparePath;
	exports.prepareMustache = prepareMustache;
	exports.prepareRawBlock = prepareRawBlock;
	exports.prepareBlock = prepareBlock;
	exports.prepareProgram = prepareProgram;
	exports.preparePartialBlock = preparePartialBlock;

	var _exception = __webpack_require__(6);

	var _exception2 = _interopRequireDefault(_exception);

	function validateClose(open, close) {
	  close = close.path ? close.path.original : close;

	  if (open.path.original !== close) {
	    var errorNode = { loc: open.path.loc };

	    throw new _exception2['default'](open.path.original + " doesn't match " + close, errorNode);
	  }
	}

	function SourceLocation(source, locInfo) {
	  this.source = source;
	  this.start = {
	    line: locInfo.first_line,
	    column: locInfo.first_column
	  };
	  this.end = {
	    line: locInfo.last_line,
	    column: locInfo.last_column
	  };
	}

	function id(token) {
	  if (/^\[.*\]$/.test(token)) {
	    return token.substr(1, token.length - 2);
	  } else {
	    return token;
	  }
	}

	function stripFlags(open, close) {
	  return {
	    open: open.charAt(2) === '~',
	    close: close.charAt(close.length - 3) === '~'
	  };
	}

	function stripComment(comment) {
	  return comment.replace(/^\{\{~?\!-?-?/, '').replace(/-?-?~?\}\}$/, '');
	}

	function preparePath(data, parts, loc) {
	  loc = this.locInfo(loc);

	  var original = data ? '@' : '',
	      dig = [],
	      depth = 0,
	      depthString = '';

	  for (var i = 0, l = parts.length; i < l; i++) {
	    var part = parts[i].part,

	    // If we have [] syntax then we do not treat path references as operators,
	    // i.e. foo.[this] resolves to approximately context.foo['this']
	    isLiteral = parts[i].original !== part;
	    original += (parts[i].separator || '') + part;

	    if (!isLiteral && (part === '..' || part === '.' || part === 'this')) {
	      if (dig.length > 0) {
	        throw new _exception2['default']('Invalid path: ' + original, { loc: loc });
	      } else if (part === '..') {
	        depth++;
	        depthString += '../';
	      }
	    } else {
	      dig.push(part);
	    }
	  }

	  return {
	    type: 'PathExpression',
	    data: data,
	    depth: depth,
	    parts: dig,
	    original: original,
	    loc: loc
	  };
	}

	function prepareMustache(path, params, hash, open, strip, locInfo) {
	  // Must use charAt to support IE pre-10
	  var escapeFlag = open.charAt(3) || open.charAt(2),
	      escaped = escapeFlag !== '{' && escapeFlag !== '&';

	  var decorator = /\*/.test(open);
	  return {
	    type: decorator ? 'Decorator' : 'MustacheStatement',
	    path: path,
	    params: params,
	    hash: hash,
	    escaped: escaped,
	    strip: strip,
	    loc: this.locInfo(locInfo)
	  };
	}

	function prepareRawBlock(openRawBlock, contents, close, locInfo) {
	  validateClose(openRawBlock, close);

	  locInfo = this.locInfo(locInfo);
	  var program = {
	    type: 'Program',
	    body: contents,
	    strip: {},
	    loc: locInfo
	  };

	  return {
	    type: 'BlockStatement',
	    path: openRawBlock.path,
	    params: openRawBlock.params,
	    hash: openRawBlock.hash,
	    program: program,
	    openStrip: {},
	    inverseStrip: {},
	    closeStrip: {},
	    loc: locInfo
	  };
	}

	function prepareBlock(openBlock, program, inverseAndProgram, close, inverted, locInfo) {
	  if (close && close.path) {
	    validateClose(openBlock, close);
	  }

	  var decorator = /\*/.test(openBlock.open);

	  program.blockParams = openBlock.blockParams;

	  var inverse = undefined,
	      inverseStrip = undefined;

	  if (inverseAndProgram) {
	    if (decorator) {
	      throw new _exception2['default']('Unexpected inverse block on decorator', inverseAndProgram);
	    }

	    if (inverseAndProgram.chain) {
	      inverseAndProgram.program.body[0].closeStrip = close.strip;
	    }

	    inverseStrip = inverseAndProgram.strip;
	    inverse = inverseAndProgram.program;
	  }

	  if (inverted) {
	    inverted = inverse;
	    inverse = program;
	    program = inverted;
	  }

	  return {
	    type: decorator ? 'DecoratorBlock' : 'BlockStatement',
	    path: openBlock.path,
	    params: openBlock.params,
	    hash: openBlock.hash,
	    program: program,
	    inverse: inverse,
	    openStrip: openBlock.strip,
	    inverseStrip: inverseStrip,
	    closeStrip: close && close.strip,
	    loc: this.locInfo(locInfo)
	  };
	}

	function prepareProgram(statements, loc) {
	  if (!loc && statements.length) {
	    var firstLoc = statements[0].loc,
	        lastLoc = statements[statements.length - 1].loc;

	    /* istanbul ignore else */
	    if (firstLoc && lastLoc) {
	      loc = {
	        source: firstLoc.source,
	        start: {
	          line: firstLoc.start.line,
	          column: firstLoc.start.column
	        },
	        end: {
	          line: lastLoc.end.line,
	          column: lastLoc.end.column
	        }
	      };
	    }
	  }

	  return {
	    type: 'Program',
	    body: statements,
	    strip: {},
	    loc: loc
	  };
	}

	function preparePartialBlock(open, program, close, locInfo) {
	  validateClose(open, close);

	  return {
	    type: 'PartialBlockStatement',
	    name: open.path,
	    params: open.params,
	    hash: open.hash,
	    program: program,
	    openStrip: open.strip,
	    closeStrip: close && close.strip,
	    loc: this.locInfo(locInfo)
	  };
	}

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	/* eslint-disable new-cap */

	'use strict';

	var _interopRequireDefault = __webpack_require__(1)['default'];

	exports.__esModule = true;
	exports.Compiler = Compiler;
	exports.precompile = precompile;
	exports.compile = compile;

	var _exception = __webpack_require__(6);

	var _exception2 = _interopRequireDefault(_exception);

	var _utils = __webpack_require__(5);

	var _ast = __webpack_require__(24);

	var _ast2 = _interopRequireDefault(_ast);

	var slice = [].slice;

	function Compiler() {}

	// the foundHelper register will disambiguate helper lookup from finding a
	// function in a context. This is necessary for mustache compatibility, which
	// requires that context functions in blocks are evaluated by blockHelperMissing,
	// and then proceed as if the resulting value was provided to blockHelperMissing.

	Compiler.prototype = {
	  compiler: Compiler,

	  equals: function equals(other) {
	    var len = this.opcodes.length;
	    if (other.opcodes.length !== len) {
	      return false;
	    }

	    for (var i = 0; i < len; i++) {
	      var opcode = this.opcodes[i],
	          otherOpcode = other.opcodes[i];
	      if (opcode.opcode !== otherOpcode.opcode || !argEquals(opcode.args, otherOpcode.args)) {
	        return false;
	      }
	    }

	    // We know that length is the same between the two arrays because they are directly tied
	    // to the opcode behavior above.
	    len = this.children.length;
	    for (var i = 0; i < len; i++) {
	      if (!this.children[i].equals(other.children[i])) {
	        return false;
	      }
	    }

	    return true;
	  },

	  guid: 0,

	  compile: function compile(program, options) {
	    this.sourceNode = [];
	    this.opcodes = [];
	    this.children = [];
	    this.options = options;
	    this.stringParams = options.stringParams;
	    this.trackIds = options.trackIds;

	    options.blockParams = options.blockParams || [];

	    // These changes will propagate to the other compiler components
	    var knownHelpers = options.knownHelpers;
	    options.knownHelpers = {
	      'helperMissing': true,
	      'blockHelperMissing': true,
	      'each': true,
	      'if': true,
	      'unless': true,
	      'with': true,
	      'log': true,
	      'lookup': true
	    };
	    if (knownHelpers) {
	      for (var _name in knownHelpers) {
	        /* istanbul ignore else */
	        if (_name in knownHelpers) {
	          options.knownHelpers[_name] = knownHelpers[_name];
	        }
	      }
	    }

	    return this.accept(program);
	  },

	  compileProgram: function compileProgram(program) {
	    var childCompiler = new this.compiler(),
	        // eslint-disable-line new-cap
	    result = childCompiler.compile(program, this.options),
	        guid = this.guid++;

	    this.usePartial = this.usePartial || result.usePartial;

	    this.children[guid] = result;
	    this.useDepths = this.useDepths || result.useDepths;

	    return guid;
	  },

	  accept: function accept(node) {
	    /* istanbul ignore next: Sanity code */
	    if (!this[node.type]) {
	      throw new _exception2['default']('Unknown type: ' + node.type, node);
	    }

	    this.sourceNode.unshift(node);
	    var ret = this[node.type](node);
	    this.sourceNode.shift();
	    return ret;
	  },

	  Program: function Program(program) {
	    this.options.blockParams.unshift(program.blockParams);

	    var body = program.body,
	        bodyLength = body.length;
	    for (var i = 0; i < bodyLength; i++) {
	      this.accept(body[i]);
	    }

	    this.options.blockParams.shift();

	    this.isSimple = bodyLength === 1;
	    this.blockParams = program.blockParams ? program.blockParams.length : 0;

	    return this;
	  },

	  BlockStatement: function BlockStatement(block) {
	    transformLiteralToPath(block);

	    var program = block.program,
	        inverse = block.inverse;

	    program = program && this.compileProgram(program);
	    inverse = inverse && this.compileProgram(inverse);

	    var type = this.classifySexpr(block);

	    if (type === 'helper') {
	      this.helperSexpr(block, program, inverse);
	    } else if (type === 'simple') {
	      this.simpleSexpr(block);

	      // now that the simple mustache is resolved, we need to
	      // evaluate it by executing `blockHelperMissing`
	      this.opcode('pushProgram', program);
	      this.opcode('pushProgram', inverse);
	      this.opcode('emptyHash');
	      this.opcode('blockValue', block.path.original);
	    } else {
	      this.ambiguousSexpr(block, program, inverse);

	      // now that the simple mustache is resolved, we need to
	      // evaluate it by executing `blockHelperMissing`
	      this.opcode('pushProgram', program);
	      this.opcode('pushProgram', inverse);
	      this.opcode('emptyHash');
	      this.opcode('ambiguousBlockValue');
	    }

	    this.opcode('append');
	  },

	  DecoratorBlock: function DecoratorBlock(decorator) {
	    var program = decorator.program && this.compileProgram(decorator.program);
	    var params = this.setupFullMustacheParams(decorator, program, undefined),
	        path = decorator.path;

	    this.useDecorators = true;
	    this.opcode('registerDecorator', params.length, path.original);
	  },

	  PartialStatement: function PartialStatement(partial) {
	    this.usePartial = true;

	    var program = partial.program;
	    if (program) {
	      program = this.compileProgram(partial.program);
	    }

	    var params = partial.params;
	    if (params.length > 1) {
	      throw new _exception2['default']('Unsupported number of partial arguments: ' + params.length, partial);
	    } else if (!params.length) {
	      if (this.options.explicitPartialContext) {
	        this.opcode('pushLiteral', 'undefined');
	      } else {
	        params.push({ type: 'PathExpression', parts: [], depth: 0 });
	      }
	    }

	    var partialName = partial.name.original,
	        isDynamic = partial.name.type === 'SubExpression';
	    if (isDynamic) {
	      this.accept(partial.name);
	    }

	    this.setupFullMustacheParams(partial, program, undefined, true);

	    var indent = partial.indent || '';
	    if (this.options.preventIndent && indent) {
	      this.opcode('appendContent', indent);
	      indent = '';
	    }

	    this.opcode('invokePartial', isDynamic, partialName, indent);
	    this.opcode('append');
	  },
	  PartialBlockStatement: function PartialBlockStatement(partialBlock) {
	    this.PartialStatement(partialBlock);
	  },

	  MustacheStatement: function MustacheStatement(mustache) {
	    this.SubExpression(mustache);

	    if (mustache.escaped && !this.options.noEscape) {
	      this.opcode('appendEscaped');
	    } else {
	      this.opcode('append');
	    }
	  },
	  Decorator: function Decorator(decorator) {
	    this.DecoratorBlock(decorator);
	  },

	  ContentStatement: function ContentStatement(content) {
	    if (content.value) {
	      this.opcode('appendContent', content.value);
	    }
	  },

	  CommentStatement: function CommentStatement() {},

	  SubExpression: function SubExpression(sexpr) {
	    transformLiteralToPath(sexpr);
	    var type = this.classifySexpr(sexpr);

	    if (type === 'simple') {
	      this.simpleSexpr(sexpr);
	    } else if (type === 'helper') {
	      this.helperSexpr(sexpr);
	    } else {
	      this.ambiguousSexpr(sexpr);
	    }
	  },
	  ambiguousSexpr: function ambiguousSexpr(sexpr, program, inverse) {
	    var path = sexpr.path,
	        name = path.parts[0],
	        isBlock = program != null || inverse != null;

	    this.opcode('getContext', path.depth);

	    this.opcode('pushProgram', program);
	    this.opcode('pushProgram', inverse);

	    path.strict = true;
	    this.accept(path);

	    this.opcode('invokeAmbiguous', name, isBlock);
	  },

	  simpleSexpr: function simpleSexpr(sexpr) {
	    var path = sexpr.path;
	    path.strict = true;
	    this.accept(path);
	    this.opcode('resolvePossibleLambda');
	  },

	  helperSexpr: function helperSexpr(sexpr, program, inverse) {
	    var params = this.setupFullMustacheParams(sexpr, program, inverse),
	        path = sexpr.path,
	        name = path.parts[0];

	    if (this.options.knownHelpers[name]) {
	      this.opcode('invokeKnownHelper', params.length, name);
	    } else if (this.options.knownHelpersOnly) {
	      throw new _exception2['default']('You specified knownHelpersOnly, but used the unknown helper ' + name, sexpr);
	    } else {
	      path.strict = true;
	      path.falsy = true;

	      this.accept(path);
	      this.opcode('invokeHelper', params.length, path.original, _ast2['default'].helpers.simpleId(path));
	    }
	  },

	  PathExpression: function PathExpression(path) {
	    this.addDepth(path.depth);
	    this.opcode('getContext', path.depth);

	    var name = path.parts[0],
	        scoped = _ast2['default'].helpers.scopedId(path),
	        blockParamId = !path.depth && !scoped && this.blockParamIndex(name);

	    if (blockParamId) {
	      this.opcode('lookupBlockParam', blockParamId, path.parts);
	    } else if (!name) {
	      // Context reference, i.e. `{{foo .}}` or `{{foo ..}}`
	      this.opcode('pushContext');
	    } else if (path.data) {
	      this.options.data = true;
	      this.opcode('lookupData', path.depth, path.parts, path.strict);
	    } else {
	      this.opcode('lookupOnContext', path.parts, path.falsy, path.strict, scoped);
	    }
	  },

	  StringLiteral: function StringLiteral(string) {
	    this.opcode('pushString', string.value);
	  },

	  NumberLiteral: function NumberLiteral(number) {
	    this.opcode('pushLiteral', number.value);
	  },

	  BooleanLiteral: function BooleanLiteral(bool) {
	    this.opcode('pushLiteral', bool.value);
	  },

	  UndefinedLiteral: function UndefinedLiteral() {
	    this.opcode('pushLiteral', 'undefined');
	  },

	  NullLiteral: function NullLiteral() {
	    this.opcode('pushLiteral', 'null');
	  },

	  Hash: function Hash(hash) {
	    var pairs = hash.pairs,
	        i = 0,
	        l = pairs.length;

	    this.opcode('pushHash');

	    for (; i < l; i++) {
	      this.pushParam(pairs[i].value);
	    }
	    while (i--) {
	      this.opcode('assignToHash', pairs[i].key);
	    }
	    this.opcode('popHash');
	  },

	  // HELPERS
	  opcode: function opcode(name) {
	    this.opcodes.push({ opcode: name, args: slice.call(arguments, 1), loc: this.sourceNode[0].loc });
	  },

	  addDepth: function addDepth(depth) {
	    if (!depth) {
	      return;
	    }

	    this.useDepths = true;
	  },

	  classifySexpr: function classifySexpr(sexpr) {
	    var isSimple = _ast2['default'].helpers.simpleId(sexpr.path);

	    var isBlockParam = isSimple && !!this.blockParamIndex(sexpr.path.parts[0]);

	    // a mustache is an eligible helper if:
	    // * its id is simple (a single part, not `this` or `..`)
	    var isHelper = !isBlockParam && _ast2['default'].helpers.helperExpression(sexpr);

	    // if a mustache is an eligible helper but not a definite
	    // helper, it is ambiguous, and will be resolved in a later
	    // pass or at runtime.
	    var isEligible = !isBlockParam && (isHelper || isSimple);

	    // if ambiguous, we can possibly resolve the ambiguity now
	    // An eligible helper is one that does not have a complex path, i.e. `this.foo`, `../foo` etc.
	    if (isEligible && !isHelper) {
	      var _name2 = sexpr.path.parts[0],
	          options = this.options;

	      if (options.knownHelpers[_name2]) {
	        isHelper = true;
	      } else if (options.knownHelpersOnly) {
	        isEligible = false;
	      }
	    }

	    if (isHelper) {
	      return 'helper';
	    } else if (isEligible) {
	      return 'ambiguous';
	    } else {
	      return 'simple';
	    }
	  },

	  pushParams: function pushParams(params) {
	    for (var i = 0, l = params.length; i < l; i++) {
	      this.pushParam(params[i]);
	    }
	  },

	  pushParam: function pushParam(val) {
	    var value = val.value != null ? val.value : val.original || '';

	    if (this.stringParams) {
	      if (value.replace) {
	        value = value.replace(/^(\.?\.\/)*/g, '').replace(/\//g, '.');
	      }

	      if (val.depth) {
	        this.addDepth(val.depth);
	      }
	      this.opcode('getContext', val.depth || 0);
	      this.opcode('pushStringParam', value, val.type);

	      if (val.type === 'SubExpression') {
	        // SubExpressions get evaluated and passed in
	        // in string params mode.
	        this.accept(val);
	      }
	    } else {
	      if (this.trackIds) {
	        var blockParamIndex = undefined;
	        if (val.parts && !_ast2['default'].helpers.scopedId(val) && !val.depth) {
	          blockParamIndex = this.blockParamIndex(val.parts[0]);
	        }
	        if (blockParamIndex) {
	          var blockParamChild = val.parts.slice(1).join('.');
	          this.opcode('pushId', 'BlockParam', blockParamIndex, blockParamChild);
	        } else {
	          value = val.original || value;
	          if (value.replace) {
	            value = value.replace(/^this(?:\.|$)/, '').replace(/^\.\//, '').replace(/^\.$/, '');
	          }

	          this.opcode('pushId', val.type, value);
	        }
	      }
	      this.accept(val);
	    }
	  },

	  setupFullMustacheParams: function setupFullMustacheParams(sexpr, program, inverse, omitEmpty) {
	    var params = sexpr.params;
	    this.pushParams(params);

	    this.opcode('pushProgram', program);
	    this.opcode('pushProgram', inverse);

	    if (sexpr.hash) {
	      this.accept(sexpr.hash);
	    } else {
	      this.opcode('emptyHash', omitEmpty);
	    }

	    return params;
	  },

	  blockParamIndex: function blockParamIndex(name) {
	    for (var depth = 0, len = this.options.blockParams.length; depth < len; depth++) {
	      var blockParams = this.options.blockParams[depth],
	          param = blockParams && _utils.indexOf(blockParams, name);
	      if (blockParams && param >= 0) {
	        return [depth, param];
	      }
	    }
	  }
	};

	function precompile(input, options, env) {
	  if (input == null || typeof input !== 'string' && input.type !== 'Program') {
	    throw new _exception2['default']('You must pass a string or Handlebars AST to Handlebars.precompile. You passed ' + input);
	  }

	  options = options || {};
	  if (!('data' in options)) {
	    options.data = true;
	  }
	  if (options.compat) {
	    options.useDepths = true;
	  }

	  var ast = env.parse(input, options),
	      environment = new env.Compiler().compile(ast, options);
	  return new env.JavaScriptCompiler().compile(environment, options);
	}

	function compile(input, options, env) {
	  if (options === undefined) options = {};

	  if (input == null || typeof input !== 'string' && input.type !== 'Program') {
	    throw new _exception2['default']('You must pass a string or Handlebars AST to Handlebars.compile. You passed ' + input);
	  }

	  if (!('data' in options)) {
	    options.data = true;
	  }
	  if (options.compat) {
	    options.useDepths = true;
	  }

	  var compiled = undefined;

	  function compileInput() {
	    var ast = env.parse(input, options),
	        environment = new env.Compiler().compile(ast, options),
	        templateSpec = new env.JavaScriptCompiler().compile(environment, options, undefined, true);
	    return env.template(templateSpec);
	  }

	  // Template is only compiled on first use and cached after that point.
	  function ret(context, execOptions) {
	    if (!compiled) {
	      compiled = compileInput();
	    }
	    return compiled.call(this, context, execOptions);
	  }
	  ret._setup = function (setupOptions) {
	    if (!compiled) {
	      compiled = compileInput();
	    }
	    return compiled._setup(setupOptions);
	  };
	  ret._child = function (i, data, blockParams, depths) {
	    if (!compiled) {
	      compiled = compileInput();
	    }
	    return compiled._child(i, data, blockParams, depths);
	  };
	  return ret;
	}

	function argEquals(a, b) {
	  if (a === b) {
	    return true;
	  }

	  if (_utils.isArray(a) && _utils.isArray(b) && a.length === b.length) {
	    for (var i = 0; i < a.length; i++) {
	      if (!argEquals(a[i], b[i])) {
	        return false;
	      }
	    }
	    return true;
	  }
	}

	function transformLiteralToPath(sexpr) {
	  if (!sexpr.path.parts) {
	    var literal = sexpr.path;
	    // Casting to string here to make false and 0 literal values play nicely with the rest
	    // of the system.
	    sexpr.path = {
	      type: 'PathExpression',
	      data: false,
	      depth: 0,
	      parts: [literal.original + ''],
	      original: literal.original + '',
	      loc: literal.loc
	    };
	  }
	}

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(1)['default'];

	exports.__esModule = true;

	var _base = __webpack_require__(4);

	var _exception = __webpack_require__(6);

	var _exception2 = _interopRequireDefault(_exception);

	var _utils = __webpack_require__(5);

	var _codeGen = __webpack_require__(32);

	var _codeGen2 = _interopRequireDefault(_codeGen);

	function Literal(value) {
	  this.value = value;
	}

	function JavaScriptCompiler() {}

	JavaScriptCompiler.prototype = {
	  // PUBLIC API: You can override these methods in a subclass to provide
	  // alternative compiled forms for name lookup and buffering semantics
	  nameLookup: function nameLookup(parent, name /* , type*/) {
	    if (JavaScriptCompiler.isValidJavaScriptVariableName(name)) {
	      return [parent, '.', name];
	    } else {
	      return [parent, '[', JSON.stringify(name), ']'];
	    }
	  },
	  depthedLookup: function depthedLookup(name) {
	    return [this.aliasable('container.lookup'), '(depths, "', name, '")'];
	  },

	  compilerInfo: function compilerInfo() {
	    var revision = _base.COMPILER_REVISION,
	        versions = _base.REVISION_CHANGES[revision];
	    return [revision, versions];
	  },

	  appendToBuffer: function appendToBuffer(source, location, explicit) {
	    // Force a source as this simplifies the merge logic.
	    if (!_utils.isArray(source)) {
	      source = [source];
	    }
	    source = this.source.wrap(source, location);

	    if (this.environment.isSimple) {
	      return ['return ', source, ';'];
	    } else if (explicit) {
	      // This is a case where the buffer operation occurs as a child of another
	      // construct, generally braces. We have to explicitly output these buffer
	      // operations to ensure that the emitted code goes in the correct location.
	      return ['buffer += ', source, ';'];
	    } else {
	      source.appendToBuffer = true;
	      return source;
	    }
	  },

	  initializeBuffer: function initializeBuffer() {
	    return this.quotedString('');
	  },
	  // END PUBLIC API

	  compile: function compile(environment, options, context, asObject) {
	    this.environment = environment;
	    this.options = options;
	    this.stringParams = this.options.stringParams;
	    this.trackIds = this.options.trackIds;
	    this.precompile = !asObject;

	    this.name = this.environment.name;
	    this.isChild = !!context;
	    this.context = context || {
	      decorators: [],
	      programs: [],
	      environments: []
	    };

	    this.preamble();

	    this.stackSlot = 0;
	    this.stackVars = [];
	    this.aliases = {};
	    this.registers = { list: [] };
	    this.hashes = [];
	    this.compileStack = [];
	    this.inlineStack = [];
	    this.blockParams = [];

	    this.compileChildren(environment, options);

	    this.useDepths = this.useDepths || environment.useDepths || environment.useDecorators || this.options.compat;
	    this.useBlockParams = this.useBlockParams || environment.useBlockParams;

	    var opcodes = environment.opcodes,
	        opcode = undefined,
	        firstLoc = undefined,
	        i = undefined,
	        l = undefined;

	    for (i = 0, l = opcodes.length; i < l; i++) {
	      opcode = opcodes[i];

	      this.source.currentLocation = opcode.loc;
	      firstLoc = firstLoc || opcode.loc;
	      this[opcode.opcode].apply(this, opcode.args);
	    }

	    // Flush any trailing content that might be pending.
	    this.source.currentLocation = firstLoc;
	    this.pushSource('');

	    /* istanbul ignore next */
	    if (this.stackSlot || this.inlineStack.length || this.compileStack.length) {
	      throw new _exception2['default']('Compile completed with content left on stack');
	    }

	    if (!this.decorators.isEmpty()) {
	      this.useDecorators = true;

	      this.decorators.prepend('var decorators = container.decorators;\n');
	      this.decorators.push('return fn;');

	      if (asObject) {
	        this.decorators = Function.apply(this, ['fn', 'props', 'container', 'depth0', 'data', 'blockParams', 'depths', this.decorators.merge()]);
	      } else {
	        this.decorators.prepend('function(fn, props, container, depth0, data, blockParams, depths) {\n');
	        this.decorators.push('}\n');
	        this.decorators = this.decorators.merge();
	      }
	    } else {
	      this.decorators = undefined;
	    }

	    var fn = this.createFunctionContext(asObject);
	    if (!this.isChild) {
	      var ret = {
	        compiler: this.compilerInfo(),
	        main: fn
	      };

	      if (this.decorators) {
	        ret.main_d = this.decorators; // eslint-disable-line camelcase
	        ret.useDecorators = true;
	      }

	      var _context = this.context;
	      var programs = _context.programs;
	      var decorators = _context.decorators;

	      for (i = 0, l = programs.length; i < l; i++) {
	        if (programs[i]) {
	          ret[i] = programs[i];
	          if (decorators[i]) {
	            ret[i + '_d'] = decorators[i];
	            ret.useDecorators = true;
	          }
	        }
	      }

	      if (this.environment.usePartial) {
	        ret.usePartial = true;
	      }
	      if (this.options.data) {
	        ret.useData = true;
	      }
	      if (this.useDepths) {
	        ret.useDepths = true;
	      }
	      if (this.useBlockParams) {
	        ret.useBlockParams = true;
	      }
	      if (this.options.compat) {
	        ret.compat = true;
	      }

	      if (!asObject) {
	        ret.compiler = JSON.stringify(ret.compiler);

	        this.source.currentLocation = { start: { line: 1, column: 0 } };
	        ret = this.objectLiteral(ret);

	        if (options.srcName) {
	          ret = ret.toStringWithSourceMap({ file: options.destName });
	          ret.map = ret.map && ret.map.toString();
	        } else {
	          ret = ret.toString();
	        }
	      } else {
	        ret.compilerOptions = this.options;
	      }

	      return ret;
	    } else {
	      return fn;
	    }
	  },

	  preamble: function preamble() {
	    // track the last context pushed into place to allow skipping the
	    // getContext opcode when it would be a noop
	    this.lastContext = 0;
	    this.source = new _codeGen2['default'](this.options.srcName);
	    this.decorators = new _codeGen2['default'](this.options.srcName);
	  },

	  createFunctionContext: function createFunctionContext(asObject) {
	    var varDeclarations = '';

	    var locals = this.stackVars.concat(this.registers.list);
	    if (locals.length > 0) {
	      varDeclarations += ', ' + locals.join(', ');
	    }

	    // Generate minimizer alias mappings
	    //
	    // When using true SourceNodes, this will update all references to the given alias
	    // as the source nodes are reused in situ. For the non-source node compilation mode,
	    // aliases will not be used, but this case is already being run on the client and
	    // we aren't concern about minimizing the template size.
	    var aliasCount = 0;
	    for (var alias in this.aliases) {
	      // eslint-disable-line guard-for-in
	      var node = this.aliases[alias];

	      if (this.aliases.hasOwnProperty(alias) && node.children && node.referenceCount > 1) {
	        varDeclarations += ', alias' + ++aliasCount + '=' + alias;
	        node.children[0] = 'alias' + aliasCount;
	      }
	    }

	    var params = ['container', 'depth0', 'helpers', 'partials', 'data'];

	    if (this.useBlockParams || this.useDepths) {
	      params.push('blockParams');
	    }
	    if (this.useDepths) {
	      params.push('depths');
	    }

	    // Perform a second pass over the output to merge content when possible
	    var source = this.mergeSource(varDeclarations);

	    if (asObject) {
	      params.push(source);

	      return Function.apply(this, params);
	    } else {
	      return this.source.wrap(['function(', params.join(','), ') {\n  ', source, '}']);
	    }
	  },
	  mergeSource: function mergeSource(varDeclarations) {
	    var isSimple = this.environment.isSimple,
	        appendOnly = !this.forceBuffer,
	        appendFirst = undefined,
	        sourceSeen = undefined,
	        bufferStart = undefined,
	        bufferEnd = undefined;
	    this.source.each(function (line) {
	      if (line.appendToBuffer) {
	        if (bufferStart) {
	          line.prepend('  + ');
	        } else {
	          bufferStart = line;
	        }
	        bufferEnd = line;
	      } else {
	        if (bufferStart) {
	          if (!sourceSeen) {
	            appendFirst = true;
	          } else {
	            bufferStart.prepend('buffer += ');
	          }
	          bufferEnd.add(';');
	          bufferStart = bufferEnd = undefined;
	        }

	        sourceSeen = true;
	        if (!isSimple) {
	          appendOnly = false;
	        }
	      }
	    });

	    if (appendOnly) {
	      if (bufferStart) {
	        bufferStart.prepend('return ');
	        bufferEnd.add(';');
	      } else if (!sourceSeen) {
	        this.source.push('return "";');
	      }
	    } else {
	      varDeclarations += ', buffer = ' + (appendFirst ? '' : this.initializeBuffer());

	      if (bufferStart) {
	        bufferStart.prepend('return buffer + ');
	        bufferEnd.add(';');
	      } else {
	        this.source.push('return buffer;');
	      }
	    }

	    if (varDeclarations) {
	      this.source.prepend('var ' + varDeclarations.substring(2) + (appendFirst ? '' : ';\n'));
	    }

	    return this.source.merge();
	  },

	  // [blockValue]
	  //
	  // On stack, before: hash, inverse, program, value
	  // On stack, after: return value of blockHelperMissing
	  //
	  // The purpose of this opcode is to take a block of the form
	  // `{{#this.foo}}...{{/this.foo}}`, resolve the value of `foo`, and
	  // replace it on the stack with the result of properly
	  // invoking blockHelperMissing.
	  blockValue: function blockValue(name) {
	    var blockHelperMissing = this.aliasable('helpers.blockHelperMissing'),
	        params = [this.contextName(0)];
	    this.setupHelperArgs(name, 0, params);

	    var blockName = this.popStack();
	    params.splice(1, 0, blockName);

	    this.push(this.source.functionCall(blockHelperMissing, 'call', params));
	  },

	  // [ambiguousBlockValue]
	  //
	  // On stack, before: hash, inverse, program, value
	  // Compiler value, before: lastHelper=value of last found helper, if any
	  // On stack, after, if no lastHelper: same as [blockValue]
	  // On stack, after, if lastHelper: value
	  ambiguousBlockValue: function ambiguousBlockValue() {
	    // We're being a bit cheeky and reusing the options value from the prior exec
	    var blockHelperMissing = this.aliasable('helpers.blockHelperMissing'),
	        params = [this.contextName(0)];
	    this.setupHelperArgs('', 0, params, true);

	    this.flushInline();

	    var current = this.topStack();
	    params.splice(1, 0, current);

	    this.pushSource(['if (!', this.lastHelper, ') { ', current, ' = ', this.source.functionCall(blockHelperMissing, 'call', params), '}']);
	  },

	  // [appendContent]
	  //
	  // On stack, before: ...
	  // On stack, after: ...
	  //
	  // Appends the string value of `content` to the current buffer
	  appendContent: function appendContent(content) {
	    if (this.pendingContent) {
	      content = this.pendingContent + content;
	    } else {
	      this.pendingLocation = this.source.currentLocation;
	    }

	    this.pendingContent = content;
	  },

	  // [append]
	  //
	  // On stack, before: value, ...
	  // On stack, after: ...
	  //
	  // Coerces `value` to a String and appends it to the current buffer.
	  //
	  // If `value` is truthy, or 0, it is coerced into a string and appended
	  // Otherwise, the empty string is appended
	  append: function append() {
	    if (this.isInline()) {
	      this.replaceStack(function (current) {
	        return [' != null ? ', current, ' : ""'];
	      });

	      this.pushSource(this.appendToBuffer(this.popStack()));
	    } else {
	      var local = this.popStack();
	      this.pushSource(['if (', local, ' != null) { ', this.appendToBuffer(local, undefined, true), ' }']);
	      if (this.environment.isSimple) {
	        this.pushSource(['else { ', this.appendToBuffer("''", undefined, true), ' }']);
	      }
	    }
	  },

	  // [appendEscaped]
	  //
	  // On stack, before: value, ...
	  // On stack, after: ...
	  //
	  // Escape `value` and append it to the buffer
	  appendEscaped: function appendEscaped() {
	    this.pushSource(this.appendToBuffer([this.aliasable('container.escapeExpression'), '(', this.popStack(), ')']));
	  },

	  // [getContext]
	  //
	  // On stack, before: ...
	  // On stack, after: ...
	  // Compiler value, after: lastContext=depth
	  //
	  // Set the value of the `lastContext` compiler value to the depth
	  getContext: function getContext(depth) {
	    this.lastContext = depth;
	  },

	  // [pushContext]
	  //
	  // On stack, before: ...
	  // On stack, after: currentContext, ...
	  //
	  // Pushes the value of the current context onto the stack.
	  pushContext: function pushContext() {
	    this.pushStackLiteral(this.contextName(this.lastContext));
	  },

	  // [lookupOnContext]
	  //
	  // On stack, before: ...
	  // On stack, after: currentContext[name], ...
	  //
	  // Looks up the value of `name` on the current context and pushes
	  // it onto the stack.
	  lookupOnContext: function lookupOnContext(parts, falsy, strict, scoped) {
	    var i = 0;

	    if (!scoped && this.options.compat && !this.lastContext) {
	      // The depthed query is expected to handle the undefined logic for the root level that
	      // is implemented below, so we evaluate that directly in compat mode
	      this.push(this.depthedLookup(parts[i++]));
	    } else {
	      this.pushContext();
	    }

	    this.resolvePath('context', parts, i, falsy, strict);
	  },

	  // [lookupBlockParam]
	  //
	  // On stack, before: ...
	  // On stack, after: blockParam[name], ...
	  //
	  // Looks up the value of `parts` on the given block param and pushes
	  // it onto the stack.
	  lookupBlockParam: function lookupBlockParam(blockParamId, parts) {
	    this.useBlockParams = true;

	    this.push(['blockParams[', blockParamId[0], '][', blockParamId[1], ']']);
	    this.resolvePath('context', parts, 1);
	  },

	  // [lookupData]
	  //
	  // On stack, before: ...
	  // On stack, after: data, ...
	  //
	  // Push the data lookup operator
	  lookupData: function lookupData(depth, parts, strict) {
	    if (!depth) {
	      this.pushStackLiteral('data');
	    } else {
	      this.pushStackLiteral('container.data(data, ' + depth + ')');
	    }

	    this.resolvePath('data', parts, 0, true, strict);
	  },

	  resolvePath: function resolvePath(type, parts, i, falsy, strict) {
	    // istanbul ignore next

	    var _this = this;

	    if (this.options.strict || this.options.assumeObjects) {
	      this.push(strictLookup(this.options.strict && strict, this, parts, type));
	      return;
	    }

	    var len = parts.length;
	    for (; i < len; i++) {
	      /* eslint-disable no-loop-func */
	      this.replaceStack(function (current) {
	        var lookup = _this.nameLookup(current, parts[i], type);
	        // We want to ensure that zero and false are handled properly if the context (falsy flag)
	        // needs to have the special handling for these values.
	        if (!falsy) {
	          return [' != null ? ', lookup, ' : ', current];
	        } else {
	          // Otherwise we can use generic falsy handling
	          return [' && ', lookup];
	        }
	      });
	      /* eslint-enable no-loop-func */
	    }
	  },

	  // [resolvePossibleLambda]
	  //
	  // On stack, before: value, ...
	  // On stack, after: resolved value, ...
	  //
	  // If the `value` is a lambda, replace it on the stack by
	  // the return value of the lambda
	  resolvePossibleLambda: function resolvePossibleLambda() {
	    this.push([this.aliasable('container.lambda'), '(', this.popStack(), ', ', this.contextName(0), ')']);
	  },

	  // [pushStringParam]
	  //
	  // On stack, before: ...
	  // On stack, after: string, currentContext, ...
	  //
	  // This opcode is designed for use in string mode, which
	  // provides the string value of a parameter along with its
	  // depth rather than resolving it immediately.
	  pushStringParam: function pushStringParam(string, type) {
	    this.pushContext();
	    this.pushString(type);

	    // If it's a subexpression, the string result
	    // will be pushed after this opcode.
	    if (type !== 'SubExpression') {
	      if (typeof string === 'string') {
	        this.pushString(string);
	      } else {
	        this.pushStackLiteral(string);
	      }
	    }
	  },

	  emptyHash: function emptyHash(omitEmpty) {
	    if (this.trackIds) {
	      this.push('{}'); // hashIds
	    }
	    if (this.stringParams) {
	      this.push('{}'); // hashContexts
	      this.push('{}'); // hashTypes
	    }
	    this.pushStackLiteral(omitEmpty ? 'undefined' : '{}');
	  },
	  pushHash: function pushHash() {
	    if (this.hash) {
	      this.hashes.push(this.hash);
	    }
	    this.hash = { values: [], types: [], contexts: [], ids: [] };
	  },
	  popHash: function popHash() {
	    var hash = this.hash;
	    this.hash = this.hashes.pop();

	    if (this.trackIds) {
	      this.push(this.objectLiteral(hash.ids));
	    }
	    if (this.stringParams) {
	      this.push(this.objectLiteral(hash.contexts));
	      this.push(this.objectLiteral(hash.types));
	    }

	    this.push(this.objectLiteral(hash.values));
	  },

	  // [pushString]
	  //
	  // On stack, before: ...
	  // On stack, after: quotedString(string), ...
	  //
	  // Push a quoted version of `string` onto the stack
	  pushString: function pushString(string) {
	    this.pushStackLiteral(this.quotedString(string));
	  },

	  // [pushLiteral]
	  //
	  // On stack, before: ...
	  // On stack, after: value, ...
	  //
	  // Pushes a value onto the stack. This operation prevents
	  // the compiler from creating a temporary variable to hold
	  // it.
	  pushLiteral: function pushLiteral(value) {
	    this.pushStackLiteral(value);
	  },

	  // [pushProgram]
	  //
	  // On stack, before: ...
	  // On stack, after: program(guid), ...
	  //
	  // Push a program expression onto the stack. This takes
	  // a compile-time guid and converts it into a runtime-accessible
	  // expression.
	  pushProgram: function pushProgram(guid) {
	    if (guid != null) {
	      this.pushStackLiteral(this.programExpression(guid));
	    } else {
	      this.pushStackLiteral(null);
	    }
	  },

	  // [registerDecorator]
	  //
	  // On stack, before: hash, program, params..., ...
	  // On stack, after: ...
	  //
	  // Pops off the decorator's parameters, invokes the decorator,
	  // and inserts the decorator into the decorators list.
	  registerDecorator: function registerDecorator(paramSize, name) {
	    var foundDecorator = this.nameLookup('decorators', name, 'decorator'),
	        options = this.setupHelperArgs(name, paramSize);

	    this.decorators.push(['fn = ', this.decorators.functionCall(foundDecorator, '', ['fn', 'props', 'container', options]), ' || fn;']);
	  },

	  // [invokeHelper]
	  //
	  // On stack, before: hash, inverse, program, params..., ...
	  // On stack, after: result of helper invocation
	  //
	  // Pops off the helper's parameters, invokes the helper,
	  // and pushes the helper's return value onto the stack.
	  //
	  // If the helper is not found, `helperMissing` is called.
	  invokeHelper: function invokeHelper(paramSize, name, isSimple) {
	    var nonHelper = this.popStack(),
	        helper = this.setupHelper(paramSize, name),
	        simple = isSimple ? [helper.name, ' || '] : '';

	    var lookup = ['('].concat(simple, nonHelper);
	    if (!this.options.strict) {
	      lookup.push(' || ', this.aliasable('helpers.helperMissing'));
	    }
	    lookup.push(')');

	    this.push(this.source.functionCall(lookup, 'call', helper.callParams));
	  },

	  // [invokeKnownHelper]
	  //
	  // On stack, before: hash, inverse, program, params..., ...
	  // On stack, after: result of helper invocation
	  //
	  // This operation is used when the helper is known to exist,
	  // so a `helperMissing` fallback is not required.
	  invokeKnownHelper: function invokeKnownHelper(paramSize, name) {
	    var helper = this.setupHelper(paramSize, name);
	    this.push(this.source.functionCall(helper.name, 'call', helper.callParams));
	  },

	  // [invokeAmbiguous]
	  //
	  // On stack, before: hash, inverse, program, params..., ...
	  // On stack, after: result of disambiguation
	  //
	  // This operation is used when an expression like `{{foo}}`
	  // is provided, but we don't know at compile-time whether it
	  // is a helper or a path.
	  //
	  // This operation emits more code than the other options,
	  // and can be avoided by passing the `knownHelpers` and
	  // `knownHelpersOnly` flags at compile-time.
	  invokeAmbiguous: function invokeAmbiguous(name, helperCall) {
	    this.useRegister('helper');

	    var nonHelper = this.popStack();

	    this.emptyHash();
	    var helper = this.setupHelper(0, name, helperCall);

	    var helperName = this.lastHelper = this.nameLookup('helpers', name, 'helper');

	    var lookup = ['(', '(helper = ', helperName, ' || ', nonHelper, ')'];
	    if (!this.options.strict) {
	      lookup[0] = '(helper = ';
	      lookup.push(' != null ? helper : ', this.aliasable('helpers.helperMissing'));
	    }

	    this.push(['(', lookup, helper.paramsInit ? ['),(', helper.paramsInit] : [], '),', '(typeof helper === ', this.aliasable('"function"'), ' ? ', this.source.functionCall('helper', 'call', helper.callParams), ' : helper))']);
	  },

	  // [invokePartial]
	  //
	  // On stack, before: context, ...
	  // On stack after: result of partial invocation
	  //
	  // This operation pops off a context, invokes a partial with that context,
	  // and pushes the result of the invocation back.
	  invokePartial: function invokePartial(isDynamic, name, indent) {
	    var params = [],
	        options = this.setupParams(name, 1, params);

	    if (isDynamic) {
	      name = this.popStack();
	      delete options.name;
	    }

	    if (indent) {
	      options.indent = JSON.stringify(indent);
	    }
	    options.helpers = 'helpers';
	    options.partials = 'partials';
	    options.decorators = 'container.decorators';

	    if (!isDynamic) {
	      params.unshift(this.nameLookup('partials', name, 'partial'));
	    } else {
	      params.unshift(name);
	    }

	    if (this.options.compat) {
	      options.depths = 'depths';
	    }
	    options = this.objectLiteral(options);
	    params.push(options);

	    this.push(this.source.functionCall('container.invokePartial', '', params));
	  },

	  // [assignToHash]
	  //
	  // On stack, before: value, ..., hash, ...
	  // On stack, after: ..., hash, ...
	  //
	  // Pops a value off the stack and assigns it to the current hash
	  assignToHash: function assignToHash(key) {
	    var value = this.popStack(),
	        context = undefined,
	        type = undefined,
	        id = undefined;

	    if (this.trackIds) {
	      id = this.popStack();
	    }
	    if (this.stringParams) {
	      type = this.popStack();
	      context = this.popStack();
	    }

	    var hash = this.hash;
	    if (context) {
	      hash.contexts[key] = context;
	    }
	    if (type) {
	      hash.types[key] = type;
	    }
	    if (id) {
	      hash.ids[key] = id;
	    }
	    hash.values[key] = value;
	  },

	  pushId: function pushId(type, name, child) {
	    if (type === 'BlockParam') {
	      this.pushStackLiteral('blockParams[' + name[0] + '].path[' + name[1] + ']' + (child ? ' + ' + JSON.stringify('.' + child) : ''));
	    } else if (type === 'PathExpression') {
	      this.pushString(name);
	    } else if (type === 'SubExpression') {
	      this.pushStackLiteral('true');
	    } else {
	      this.pushStackLiteral('null');
	    }
	  },

	  // HELPERS

	  compiler: JavaScriptCompiler,

	  compileChildren: function compileChildren(environment, options) {
	    var children = environment.children,
	        child = undefined,
	        compiler = undefined;

	    for (var i = 0, l = children.length; i < l; i++) {
	      child = children[i];
	      compiler = new this.compiler(); // eslint-disable-line new-cap

	      var existing = this.matchExistingProgram(child);

	      if (existing == null) {
	        this.context.programs.push(''); // Placeholder to prevent name conflicts for nested children
	        var index = this.context.programs.length;
	        child.index = index;
	        child.name = 'program' + index;
	        this.context.programs[index] = compiler.compile(child, options, this.context, !this.precompile);
	        this.context.decorators[index] = compiler.decorators;
	        this.context.environments[index] = child;

	        this.useDepths = this.useDepths || compiler.useDepths;
	        this.useBlockParams = this.useBlockParams || compiler.useBlockParams;
	        child.useDepths = this.useDepths;
	        child.useBlockParams = this.useBlockParams;
	      } else {
	        child.index = existing.index;
	        child.name = 'program' + existing.index;

	        this.useDepths = this.useDepths || existing.useDepths;
	        this.useBlockParams = this.useBlockParams || existing.useBlockParams;
	      }
	    }
	  },
	  matchExistingProgram: function matchExistingProgram(child) {
	    for (var i = 0, len = this.context.environments.length; i < len; i++) {
	      var environment = this.context.environments[i];
	      if (environment && environment.equals(child)) {
	        return environment;
	      }
	    }
	  },

	  programExpression: function programExpression(guid) {
	    var child = this.environment.children[guid],
	        programParams = [child.index, 'data', child.blockParams];

	    if (this.useBlockParams || this.useDepths) {
	      programParams.push('blockParams');
	    }
	    if (this.useDepths) {
	      programParams.push('depths');
	    }

	    return 'container.program(' + programParams.join(', ') + ')';
	  },

	  useRegister: function useRegister(name) {
	    if (!this.registers[name]) {
	      this.registers[name] = true;
	      this.registers.list.push(name);
	    }
	  },

	  push: function push(expr) {
	    if (!(expr instanceof Literal)) {
	      expr = this.source.wrap(expr);
	    }

	    this.inlineStack.push(expr);
	    return expr;
	  },

	  pushStackLiteral: function pushStackLiteral(item) {
	    this.push(new Literal(item));
	  },

	  pushSource: function pushSource(source) {
	    if (this.pendingContent) {
	      this.source.push(this.appendToBuffer(this.source.quotedString(this.pendingContent), this.pendingLocation));
	      this.pendingContent = undefined;
	    }

	    if (source) {
	      this.source.push(source);
	    }
	  },

	  replaceStack: function replaceStack(callback) {
	    var prefix = ['('],
	        stack = undefined,
	        createdStack = undefined,
	        usedLiteral = undefined;

	    /* istanbul ignore next */
	    if (!this.isInline()) {
	      throw new _exception2['default']('replaceStack on non-inline');
	    }

	    // We want to merge the inline statement into the replacement statement via ','
	    var top = this.popStack(true);

	    if (top instanceof Literal) {
	      // Literals do not need to be inlined
	      stack = [top.value];
	      prefix = ['(', stack];
	      usedLiteral = true;
	    } else {
	      // Get or create the current stack name for use by the inline
	      createdStack = true;
	      var _name = this.incrStack();

	      prefix = ['((', this.push(_name), ' = ', top, ')'];
	      stack = this.topStack();
	    }

	    var item = callback.call(this, stack);

	    if (!usedLiteral) {
	      this.popStack();
	    }
	    if (createdStack) {
	      this.stackSlot--;
	    }
	    this.push(prefix.concat(item, ')'));
	  },

	  incrStack: function incrStack() {
	    this.stackSlot++;
	    if (this.stackSlot > this.stackVars.length) {
	      this.stackVars.push('stack' + this.stackSlot);
	    }
	    return this.topStackName();
	  },
	  topStackName: function topStackName() {
	    return 'stack' + this.stackSlot;
	  },
	  flushInline: function flushInline() {
	    var inlineStack = this.inlineStack;
	    this.inlineStack = [];
	    for (var i = 0, len = inlineStack.length; i < len; i++) {
	      var entry = inlineStack[i];
	      /* istanbul ignore if */
	      if (entry instanceof Literal) {
	        this.compileStack.push(entry);
	      } else {
	        var stack = this.incrStack();
	        this.pushSource([stack, ' = ', entry, ';']);
	        this.compileStack.push(stack);
	      }
	    }
	  },
	  isInline: function isInline() {
	    return this.inlineStack.length;
	  },

	  popStack: function popStack(wrapped) {
	    var inline = this.isInline(),
	        item = (inline ? this.inlineStack : this.compileStack).pop();

	    if (!wrapped && item instanceof Literal) {
	      return item.value;
	    } else {
	      if (!inline) {
	        /* istanbul ignore next */
	        if (!this.stackSlot) {
	          throw new _exception2['default']('Invalid stack pop');
	        }
	        this.stackSlot--;
	      }
	      return item;
	    }
	  },

	  topStack: function topStack() {
	    var stack = this.isInline() ? this.inlineStack : this.compileStack,
	        item = stack[stack.length - 1];

	    /* istanbul ignore if */
	    if (item instanceof Literal) {
	      return item.value;
	    } else {
	      return item;
	    }
	  },

	  contextName: function contextName(context) {
	    if (this.useDepths && context) {
	      return 'depths[' + context + ']';
	    } else {
	      return 'depth' + context;
	    }
	  },

	  quotedString: function quotedString(str) {
	    return this.source.quotedString(str);
	  },

	  objectLiteral: function objectLiteral(obj) {
	    return this.source.objectLiteral(obj);
	  },

	  aliasable: function aliasable(name) {
	    var ret = this.aliases[name];
	    if (ret) {
	      ret.referenceCount++;
	      return ret;
	    }

	    ret = this.aliases[name] = this.source.wrap(name);
	    ret.aliasable = true;
	    ret.referenceCount = 1;

	    return ret;
	  },

	  setupHelper: function setupHelper(paramSize, name, blockHelper) {
	    var params = [],
	        paramsInit = this.setupHelperArgs(name, paramSize, params, blockHelper);
	    var foundHelper = this.nameLookup('helpers', name, 'helper'),
	        callContext = this.aliasable(this.contextName(0) + ' != null ? ' + this.contextName(0) + ' : {}');

	    return {
	      params: params,
	      paramsInit: paramsInit,
	      name: foundHelper,
	      callParams: [callContext].concat(params)
	    };
	  },

	  setupParams: function setupParams(helper, paramSize, params) {
	    var options = {},
	        contexts = [],
	        types = [],
	        ids = [],
	        objectArgs = !params,
	        param = undefined;

	    if (objectArgs) {
	      params = [];
	    }

	    options.name = this.quotedString(helper);
	    options.hash = this.popStack();

	    if (this.trackIds) {
	      options.hashIds = this.popStack();
	    }
	    if (this.stringParams) {
	      options.hashTypes = this.popStack();
	      options.hashContexts = this.popStack();
	    }

	    var inverse = this.popStack(),
	        program = this.popStack();

	    // Avoid setting fn and inverse if neither are set. This allows
	    // helpers to do a check for `if (options.fn)`
	    if (program || inverse) {
	      options.fn = program || 'container.noop';
	      options.inverse = inverse || 'container.noop';
	    }

	    // The parameters go on to the stack in order (making sure that they are evaluated in order)
	    // so we need to pop them off the stack in reverse order
	    var i = paramSize;
	    while (i--) {
	      param = this.popStack();
	      params[i] = param;

	      if (this.trackIds) {
	        ids[i] = this.popStack();
	      }
	      if (this.stringParams) {
	        types[i] = this.popStack();
	        contexts[i] = this.popStack();
	      }
	    }

	    if (objectArgs) {
	      options.args = this.source.generateArray(params);
	    }

	    if (this.trackIds) {
	      options.ids = this.source.generateArray(ids);
	    }
	    if (this.stringParams) {
	      options.types = this.source.generateArray(types);
	      options.contexts = this.source.generateArray(contexts);
	    }

	    if (this.options.data) {
	      options.data = 'data';
	    }
	    if (this.useBlockParams) {
	      options.blockParams = 'blockParams';
	    }
	    return options;
	  },

	  setupHelperArgs: function setupHelperArgs(helper, paramSize, params, useRegister) {
	    var options = this.setupParams(helper, paramSize, params);
	    options = this.objectLiteral(options);
	    if (useRegister) {
	      this.useRegister('options');
	      params.push('options');
	      return ['options=', options];
	    } else if (params) {
	      params.push(options);
	      return '';
	    } else {
	      return options;
	    }
	  }
	};

	(function () {
	  var reservedWords = ('break else new var' + ' case finally return void' + ' catch for switch while' + ' continue function this with' + ' default if throw' + ' delete in try' + ' do instanceof typeof' + ' abstract enum int short' + ' boolean export interface static' + ' byte extends long super' + ' char final native synchronized' + ' class float package throws' + ' const goto private transient' + ' debugger implements protected volatile' + ' double import public let yield await' + ' null true false').split(' ');

	  var compilerWords = JavaScriptCompiler.RESERVED_WORDS = {};

	  for (var i = 0, l = reservedWords.length; i < l; i++) {
	    compilerWords[reservedWords[i]] = true;
	  }
	})();

	JavaScriptCompiler.isValidJavaScriptVariableName = function (name) {
	  return !JavaScriptCompiler.RESERVED_WORDS[name] && /^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(name);
	};

	function strictLookup(requireTerminal, compiler, parts, type) {
	  var stack = compiler.popStack(),
	      i = 0,
	      len = parts.length;
	  if (requireTerminal) {
	    len--;
	  }

	  for (; i < len; i++) {
	    stack = compiler.nameLookup(stack, parts[i], type);
	  }

	  if (requireTerminal) {
	    return [compiler.aliasable('container.strict'), '(', stack, ', ', compiler.quotedString(parts[i]), ')'];
	  } else {
	    return stack;
	  }
	}

	exports['default'] = JavaScriptCompiler;
	module.exports = exports['default'];

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	/* global define */
	'use strict';

	exports.__esModule = true;

	var _utils = __webpack_require__(5);

	var SourceNode = undefined;

	try {
	  /* istanbul ignore next */
	  if (false) {
	    // We don't support this in AMD environments. For these environments, we asusme that
	    // they are running on the browser and thus have no need for the source-map library.
	    var SourceMap = require('source-map');
	    SourceNode = SourceMap.SourceNode;
	  }
	} catch (err) {}
	/* NOP */

	/* istanbul ignore if: tested but not covered in istanbul due to dist build  */
	if (!SourceNode) {
	  SourceNode = function (line, column, srcFile, chunks) {
	    this.src = '';
	    if (chunks) {
	      this.add(chunks);
	    }
	  };
	  /* istanbul ignore next */
	  SourceNode.prototype = {
	    add: function add(chunks) {
	      if (_utils.isArray(chunks)) {
	        chunks = chunks.join('');
	      }
	      this.src += chunks;
	    },
	    prepend: function prepend(chunks) {
	      if (_utils.isArray(chunks)) {
	        chunks = chunks.join('');
	      }
	      this.src = chunks + this.src;
	    },
	    toStringWithSourceMap: function toStringWithSourceMap() {
	      return { code: this.toString() };
	    },
	    toString: function toString() {
	      return this.src;
	    }
	  };
	}

	function castChunk(chunk, codeGen, loc) {
	  if (_utils.isArray(chunk)) {
	    var ret = [];

	    for (var i = 0, len = chunk.length; i < len; i++) {
	      ret.push(codeGen.wrap(chunk[i], loc));
	    }
	    return ret;
	  } else if (typeof chunk === 'boolean' || typeof chunk === 'number') {
	    // Handle primitives that the SourceNode will throw up on
	    return chunk + '';
	  }
	  return chunk;
	}

	function CodeGen(srcFile) {
	  this.srcFile = srcFile;
	  this.source = [];
	}

	CodeGen.prototype = {
	  isEmpty: function isEmpty() {
	    return !this.source.length;
	  },
	  prepend: function prepend(source, loc) {
	    this.source.unshift(this.wrap(source, loc));
	  },
	  push: function push(source, loc) {
	    this.source.push(this.wrap(source, loc));
	  },

	  merge: function merge() {
	    var source = this.empty();
	    this.each(function (line) {
	      source.add(['  ', line, '\n']);
	    });
	    return source;
	  },

	  each: function each(iter) {
	    for (var i = 0, len = this.source.length; i < len; i++) {
	      iter(this.source[i]);
	    }
	  },

	  empty: function empty() {
	    var loc = this.currentLocation || { start: {} };
	    return new SourceNode(loc.start.line, loc.start.column, this.srcFile);
	  },
	  wrap: function wrap(chunk) {
	    var loc = arguments.length <= 1 || arguments[1] === undefined ? this.currentLocation || { start: {} } : arguments[1];

	    if (chunk instanceof SourceNode) {
	      return chunk;
	    }

	    chunk = castChunk(chunk, this, loc);

	    return new SourceNode(loc.start.line, loc.start.column, this.srcFile, chunk);
	  },

	  functionCall: function functionCall(fn, type, params) {
	    params = this.generateList(params);
	    return this.wrap([fn, type ? '.' + type + '(' : '(', params, ')']);
	  },

	  quotedString: function quotedString(str) {
	    return '"' + (str + '').replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\u2028/g, '\\u2028') // Per Ecma-262 7.3 + 7.8.4
	    .replace(/\u2029/g, '\\u2029') + '"';
	  },

	  objectLiteral: function objectLiteral(obj) {
	    var pairs = [];

	    for (var key in obj) {
	      if (obj.hasOwnProperty(key)) {
	        var value = castChunk(obj[key], this);
	        if (value !== 'undefined') {
	          pairs.push([this.quotedString(key), ':', value]);
	        }
	      }
	    }

	    var ret = this.generateList(pairs);
	    ret.prepend('{');
	    ret.add('}');
	    return ret;
	  },

	  generateList: function generateList(entries) {
	    var ret = this.empty();

	    for (var i = 0, len = entries.length; i < len; i++) {
	      if (i) {
	        ret.add(',');
	      }

	      ret.add(castChunk(entries[i], this));
	    }

	    return ret;
	  },

	  generateArray: function generateArray(entries) {
	    var ret = this.generateList(entries);
	    ret.prepend('[');
	    ret.add(']');

	    return ret;
	  }
	};

	exports['default'] = CodeGen;
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;

Handlebars.registerHelper('if_eq', function(v1, v2, options) {
	if(v1 === v2)
		return options.fn(this);

	return options.inverse(this);
});

Handlebars.registerHelper('if_fl_eq', function(v1, v2, options) {
	if(v1 == parseFloat(v2))
		return options.fn(this);

	return options.inverse(this);
});

Handlebars.registerHelper('if_neq', function(v1, v2, options) {
	if(v1 !== v2)
		return options.fn(this);

	return options.inverse(this);
});

Handlebars.registerHelper("inc", function(value, options){
    return parseInt(value) + 1;
});

Handlebars.registerHelper("setVar", function(varName, varValue, options) {
	options.data.root[varName] = varValue;
});

Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {
    switch (operator) {
        case '==':
            return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '!=':
            return (v1 != v2) ? options.fn(this) : options.inverse(this);
        case '!==':
            return (v1 !== v2) ? options.fn(this) : options.inverse(this);
        case '<':
            return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
            return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case '&&':
            return (v1 && v2) ? options.fn(this) : options.inverse(this);
        case '||':
            return (v1 || v2) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
});

Handlebars.registerHelper('ifLowerPrice', function(price1, price2VarName, options) {
    var price2 =  options.data.root[price2VarName];
    pricevar2 = parseFloat(price2);
    
    if(price1.indexOf('$') != -1)
    	price1 = price1.replace('$','');
    pricevar1 = parseFloat(price1);
    
    if(pricevar1 < pricevar2) 
    	return options.fn(this) 
    else
    	return options.inverse(this);
});
Handlebars.registerHelper('ifEqualPrice', function(price1VarName, price2, options) {
    var price1 =  options.data.root[price1VarName];
    pricevar1 = parseFloat(price1);
    pricevar2 = parseFloat(price2);
   
    if(pricevar1 == pricevar2) 
    	return options.fn(this) 
    else
    	return options.inverse(this);
});
Handlebars.registerHelper("setPrice", function(varName, price1, options) {
	if(price1.indexOf('$') != -1)
    	price1 = price1.replace('$','')

    options.data.root[varName] =  parseFloat(price1).toFixed(2);
});
Handlebars.registerHelper("inc", function(value, options)
{
    return parseInt(value) + 1;
});

Handlebars.registerHelper('ifSel', function(myIndex,options)
		{
			var nextInd=myIndex+1;
			if (typeof options.data.root.attributes.PRD_POWER[nextInd] != "undefined"){
				var currElem= parseFloat(options.data.root.attributes.PRD_POWER[myIndex]);
				var nextElem= parseFloat(options.data.root.attributes.PRD_POWER[nextInd]);
				if(currElem < 0 && nextElem >= 0) {
					return options.fn(this);
				}
			}
			return false;
		});

Handlebars.registerHelper('ifPerk', function(options) {
	var value= $.query.keys.selectedPerk;
	if(value !== undefined && value.length > 0){
		return options.fn(this);
	}
	else{return options.inverse(this); }
	
});

/* End HANDLEBARS */

/* global jQuery */

(function($) {

    if ((typeof window.LC2) === 'undefined') {
        window.LC2 = {};
    }

    var LC2 = window.LC2;

    LC2.filterOnlyDigitsInput = function(inputRef) {
        var start = inputRef.selectionStart,
            end = inputRef.selectionEnd;
        inputRef.value = inputRef.value.replace(/[^\d]/g, '');
        inputRef.setSelectionRange(start, end);
    };

    LC2.accordionMenus = function($ul) {
        var $accordions = $ul ? $ul : $('.accordion-menu');
        if (typeof($accordions.each) !== 'function') {
            $accordions = $($accordions);
        }

        $accordions.each(function() {
            var $this = $(this);
            if ($this.data('accordioned') === 'yes') {
                return true;
            }
            $this.data('accordioned', 'yes');
            var $links = $this.children('li').children('a');
            if ($links.length) {
                $links.each(function() {
                    var $this = $(this);
                    var $listItem = $this.parent();
                    var $sibling = $this.siblings().first();
                    if ($sibling.length) {
                        $this.on('click', function(e) {
                            e.preventDefault();
                            $listItem.toggleClass('expanded');
                            $this.toggleClass('expanded');
                            $links.not($this).next().stop().slideUp('fast').parent().removeClass('expanded');
                            $links.not($this).removeClass('expanded');
                            $sibling.removeClass('hide');
                            $sibling.stop().slideToggle('fast');
                        });
                    }
                });
            }
        });
    };

    LC2.submitStepData = function(functionPath, formData) {
        /* submits the form data invoking a function form its name,
        ** for the transition to the next checkout step
        ** @params:
            functionPath a string similar to: obj1.obj2.(...).objN.functionName
            [obj1 should be globally visible]
            formData: the form reference
        */
        var pathElems = functionPath.split('.');
        var pathElemsWithoutFunct = pathElems.slice(0, pathElems.length - 1);
        var functionToCall = pathElems[pathElems.length - 1];
        var currentScope = window;
        pathElemsWithoutFunct.forEach(function(singlePath) {
            currentScope = currentScope[singlePath];
        });
        currentScope[functionToCall].call(null, formData);
    };

    LC2.invokeAvalaraService = function(avalaraService, successHandler) {
        $.ajax({
            url: avalaraService,
            dataType: 'json',
            success: function(resp) {
                var resp_status = resp.resp_status;

                switch (resp_status) {
                    case 'error':
                        var dialogId = 'avalara-err-message';
                        var dialogHtml = '<div id="' + dialogId + '">' +
                            '<h2>' +
                            resp.error_title +
                            '</h2>' +
                            '<p>' +
                            resp.error_message +
                            '</p>' +
                            '</div>';
                        LC2.dynamicDialogCreation(dialogId, dialogHtml);
                        break;

                    case 'warning':
                        if (resp.warning_type === 'unrecognized') {
                            $('.address-validation-area').removeClass('hide');
                            $('body').animate({
                                scrollTop: $('.address-validation-area').offset().top
                            }, 200);
                        }
                        break;

                    case 'success':
                        successHandler();
                        break;
                }
            }
        });
    };

    LC2.initSlideshowListeners = function() {
        var viewsButtonsDOM = $('.item-image-options > .views-buttons > a');

        var viewsButtonsCircular = [];

        viewsButtonsDOM.each(function() {
            viewsButtonsCircular.push($(this)[0].id);
        });

        $('.product-images').find('.left-arrow, .right-arrow').on('click', function(e) {
            var viewsButtonsActive = viewsButtonsDOM.filter('.active')[0].id;
            var currentActiveIndex = viewsButtonsCircular.indexOf(viewsButtonsActive);
            var nextIndex;

            switch (e.currentTarget.className) {
                case 'left-arrow':
                    nextIndex = (--currentActiveIndex + viewsButtonsCircular.length) % viewsButtonsCircular.length;
                    break;
                case 'right-arrow':
                    nextIndex = (++currentActiveIndex + viewsButtonsCircular.length) % viewsButtonsCircular.length;
                    break;
                default:
                    break;
            }

            var nextViewsButtonActiveId = viewsButtonsCircular[nextIndex];
            var nextViewsButtonActive = viewsButtonsDOM.filter(function(index, value) {
                return value.id === nextViewsButtonActiveId;
            });
            nextViewsButtonActive.trigger('click');
        });
        
        $('.swipable').swipe( {
            swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
                var viewsButtonsActive = viewsButtonsDOM.filter('.active')[0].id;
                var currentActiveIndex = viewsButtonsCircular.indexOf(viewsButtonsActive);
                var nextIndex;

                switch (direction) {
                    case 'left':
                        nextIndex = (--currentActiveIndex + viewsButtonsCircular.length) % viewsButtonsCircular.length;
                        break;
                    case 'right':
                        nextIndex = (++currentActiveIndex + viewsButtonsCircular.length) % viewsButtonsCircular.length;
                        break;
                    case 'up':
                    	var t = parseFloat($(window).scrollTop());
                    	$('html,body').animate({scrollTop:t + 300 + 'px'},600);
                    	break;
                    case 'down':
                    	var t = parseFloat($(window).scrollTop());
                    	$('html,body').animate({scrollTop:t - 300 + 'px'},600);
                    	break;
                    default:
                        break;
                }

                var nextViewsButtonActiveId = viewsButtonsCircular[nextIndex];
                var nextViewsButtonActive = viewsButtonsDOM.filter(function(index, value) {
                    return value.id === nextViewsButtonActiveId;
                });
                nextViewsButtonActive.trigger('click');
            },
             threshold:0
        });
    };

    LC2.stickySidebar = function(target, options) {
        var defaults = {
            'containerSelector': '',
            'additionalMarginTop': 0,
            'additionalMarginBottom': 0,
            'updateSidebarHeight': true,
            'minWidth': 0,
            'disableOnResponsiveLayouts': true,
            'sidebarBehavior': 'modern'
        };
        options = $.extend(defaults, options);

        // Validate options
        options.additionalMarginTop = parseInt(options.additionalMarginTop, 10) || 0;
        options.additionalMarginBottom = parseInt(options.additionalMarginBottom, 10) || 0;

        tryInitOrHookIntoEvents(options, $(target));

        // Try doing init, otherwise hook into window.resize and document.scroll and try again then.
        function tryInitOrHookIntoEvents(options, $that) {
            var success = tryInit(options, $that);

            if (!success) {
                console.log('TSS: Body width smaller than options.minWidth. Init is delayed.');

                $(document).scroll(function(options, $that) {
                    return function(evt) {
                        var success = tryInit(options, $that);

                        if (success) {
                            $(target).unbind(evt);
                        }
                    };
                }(options, $that));
                $(window).resize(function(options, $that) {
                    return function(evt) {
                        var success = tryInit(options, $that);

                        if (success) {
                            $(target).unbind(evt);
                        }
                    };
                }(options, $that))
            }
        }

        // Try doing init if proper conditions are met.
        function tryInit(options, $that) {
            if (options.initialized === true) {
                return true;
            }

            if ($('body').width() < options.minWidth) {
                return false;
            }

            init(options, $that);

            return true;
        }

        // Init the sticky sidebar(s).
        function init(options, $that) {
            options.initialized = true;

            // Add CSS
            $('head').append($('<style>.theiaStickySidebar:after {content: ""; display: table; clear: both;}</style>'));

            $that.each(function() {
                var o = {};

                o.sidebar = $(target);

                // Save options
                o.options = options || {};

                // Get container
                o.container = $(o.options.containerSelector);
                if (o.container.length == 0) {
                    o.container = o.sidebar.parent();
                }

                // Create sticky sidebar
                o.sidebar.parents().css('-webkit-transform', 'none'); // Fix for WebKit bug - https://code.google.com/p/chromium/issues/detail?id=20574
                o.sidebar.css({
                    'position': 'relative',
                    'overflow': 'visible',
                    // The "box-sizing" must be set to "content-box" because we set a fixed height to target element when the sticky sidebar has a fixed position.
                    '-webkit-box-sizing': 'border-box',
                    '-moz-box-sizing': 'border-box',
                    'box-sizing': 'border-box'
                });

                // Get the sticky sidebar element. If none has been found, then create one.
                o.stickySidebar = o.sidebar.find('.theiaStickySidebar');
                if (o.stickySidebar.length == 0) {
                    // Remove <script> tags, otherwise they will be run again when added to the stickySidebar.
                    var javaScriptMIMETypes = /(?:text|application)\/(?:x-)?(?:javascript|ecmascript)/i;
                    o.sidebar.find('script').filter(function(index, script) {
                        return script.type.length === 0 || script.type.match(javaScriptMIMETypes);
                    }).remove();

                    o.stickySidebar = $('<div>').addClass('theiaStickySidebar').append(o.sidebar.children());
                    o.sidebar.append(o.stickySidebar);
                }

                // Get existing top and bottom margins and paddings
                o.marginBottom = parseInt(o.sidebar.css('margin-bottom'));
                o.paddingTop = parseInt(o.sidebar.css('padding-top'));
                o.paddingBottom = parseInt(o.sidebar.css('padding-bottom'));

                // Add a temporary padding rule to check for collapsable margins.
                var collapsedTopHeight = o.stickySidebar.offset().top;
                var collapsedBottomHeight = o.stickySidebar.outerHeight();
                o.stickySidebar.css('padding-top', 1);
                o.stickySidebar.css('padding-bottom', 1);
                collapsedTopHeight -= o.stickySidebar.offset().top;
                collapsedBottomHeight = o.stickySidebar.outerHeight() - collapsedBottomHeight - collapsedTopHeight;
                if (collapsedTopHeight == 0) {
                    o.stickySidebar.css('padding-top', 0);
                    o.stickySidebarPaddingTop = 0;
                } else {
                    o.stickySidebarPaddingTop = 1;
                }

                if (collapsedBottomHeight == 0) {
                    o.stickySidebar.css('padding-bottom', 0);
                    o.stickySidebarPaddingBottom = 0;
                } else {
                    o.stickySidebarPaddingBottom = 1;
                }

                // We use target to know whether the user is scrolling up or down.
                o.previousScrollTop = null;

                // Scroll top (value) when the sidebar has fixed position.
                o.fixedScrollTop = 0;

                // Set sidebar to default values.
                resetSidebar();

                o.onScroll = function(o) {
                    // Stop if the sidebar isn't visible.
                    if (!o.stickySidebar.is(':visible')) {
                        return;
                    }

                    // Stop if the window is too small.
                    if ($('body').width() < o.options.minWidth) {
                        resetSidebar();
                        return;
                    }

                    // Stop if the sidebar width is larger than the container width (e.g. the theme is responsive and the sidebar is now below the content)
                    if (o.options.disableOnResponsiveLayouts) {
                        var sidebarWidth = o.sidebar.outerWidth(o.sidebar.css('float') == 'none');

                        if (sidebarWidth + 50 > o.container.width()) {
                            resetSidebar();
                            return;
                        }
                    }

                    var scrollTop = $(document).scrollTop();
                    var position = 'static';

                    // If the user has scrolled down enough for the sidebar to be clipped at the top, then we can consider changing its position.
                    if (scrollTop >= o.sidebar.offset().top + (o.paddingTop - o.options.additionalMarginTop)) {
                        // The top and bottom offsets, used in various calculations.
                        var offsetTop = o.paddingTop + options.additionalMarginTop;
                        var offsetBottom = o.paddingBottom + o.marginBottom + options.additionalMarginBottom;

                        // All top and bottom positions are relative to the window, not to the parent elemnts.
                        var containerTop = o.sidebar.offset().top;
                        var containerBottom = o.sidebar.offset().top + getClearedHeight(o.container);

                        // The top and bottom offsets relative to the window screen top (zero) and bottom (window height).
                        var windowOffsetTop = 0 + options.additionalMarginTop;
                        var windowOffsetBottom;

                        var sidebarSmallerThanWindow = (o.stickySidebar.outerHeight() + offsetTop + offsetBottom) < $(window).height();
                        if (sidebarSmallerThanWindow) {
                            windowOffsetBottom = windowOffsetTop + o.stickySidebar.outerHeight();
                        } else {
                            windowOffsetBottom = $(window).height() - o.marginBottom - o.paddingBottom - options.additionalMarginBottom;
                        }

                        var staticLimitTop = containerTop - scrollTop + o.paddingTop;
                        var staticLimitBottom = containerBottom - scrollTop - o.paddingBottom - o.marginBottom;

                        var top = o.stickySidebar.offset().top - scrollTop;
                        var scrollTopDiff = o.previousScrollTop - scrollTop;

                        // If the sidebar position is fixed, then it won't move up or down by itself. So, we manually adjust the top coordinate.
                        if (o.stickySidebar.css('position') == 'fixed') {
                            if (o.options.sidebarBehavior == 'modern') {
                                top += scrollTopDiff;
                            }
                        }

                        if (o.options.sidebarBehavior == 'stick-to-top') {
                            top = options.additionalMarginTop;
                        }

                        if (o.options.sidebarBehavior == 'stick-to-bottom') {
                            top = windowOffsetBottom - o.stickySidebar.outerHeight();
                        }

                        if (scrollTopDiff > 0) { // If the user is scrolling up.
                            top = Math.min(top, windowOffsetTop);
                        } else { // If the user is scrolling down.
                            top = Math.max(top, windowOffsetBottom - o.stickySidebar.outerHeight());
                        }

                        top = Math.max(top, staticLimitTop);

                        top = Math.min(top, staticLimitBottom - o.stickySidebar.outerHeight());

                        // If the sidebar is the same height as the container, we won't use fixed positioning.
                        var sidebarSameHeightAsContainer = o.container.height() == o.stickySidebar.outerHeight();

                        if (!sidebarSameHeightAsContainer && top == windowOffsetTop) {
                            position = 'fixed';
                        } else if (!sidebarSameHeightAsContainer && top == windowOffsetBottom - o.stickySidebar.outerHeight()) {
                            position = 'fixed';
                        } else if (scrollTop + top - o.sidebar.offset().top - o.paddingTop <= options.additionalMarginTop) {
                            // Stuck to the top of the page. No special behavior.
                            position = 'static';
                        } else {
                            // Stuck to the bottom of the page.
                            position = 'absolute';
                        }
                    }

                    /*
                     * Performance notice: It's OK to set these CSS values at each resize/scroll, even if they don't change.
                     * It's way slower to first check if the values have changed.
                     */
                    if (position == 'fixed') {
                        var scrollLeft = $(document).scrollLeft();

                        o.stickySidebar.css({
                            'position': 'fixed',
                            'width': getWidthForObject(o.stickySidebar) + 'px',
                            'transform': 'translateY(' + top + 'px)',
                            'left': (o.sidebar.offset().left + parseInt(o.sidebar.css('padding-left'), 10) - scrollLeft) + 'px',
                            'top': '0px'
                        });
                    } else if (position == 'absolute') {
                        var css = {};

                        if (o.stickySidebar.css('position') != 'absolute') {
                            css.position = 'absolute';
                            css.transform = 'translateY(' + (scrollTop + top - o.sidebar.offset().top - o.stickySidebarPaddingTop - o.stickySidebarPaddingBottom) + 'px)';
                            css.top = '0px';
                        }

                        css.width = getWidthForObject(o.stickySidebar) + 'px';
                        css.left = '';

                        o.stickySidebar.css(css);
                    } else if (position == 'static') {
                        resetSidebar();
                    }

                    if (position != 'static') {
                        if (o.options.updateSidebarHeight == true) {
                            o.sidebar.css({
                                'min-height': o.stickySidebar.outerHeight() + o.stickySidebar.offset().top - o.sidebar.offset().top + o.paddingBottom
                            });
                        }
                    }

                    o.previousScrollTop = scrollTop;
                };

                // Initialize the sidebar's position.
                o.onScroll(o);

                // Recalculate the sidebar's position on every scroll and resize.
                $(document).scroll(function(o) {
                    return function() {
                        o.onScroll(o);
                    };
                }(o));
                $(window).resize(function(o) {
                    return function() {
                        o.stickySidebar.css({
                            'position': 'static'
                        });
                        o.onScroll(o);
                    };
                }(o));

                // Recalculate the sidebar's position every time the sidebar changes its size.
                if (typeof ResizeSensor !== 'undefined') {
                    new ResizeSensor(o.stickySidebar[0], function(o) {
                        return function() {
                            o.onScroll(o);
                        };
                    }(o));
                }

                // Reset the sidebar to its default state
                function resetSidebar() {
                    o.fixedScrollTop = 0;
                    o.sidebar.css({
                        'min-height': '1px'
                    });
                    o.stickySidebar.css({
                        'position': 'static',
                        'width': '',
                        'transform': 'none'
                    });
                }

                // Get the height of a div as if its floated children were cleared. Note that target function fails if the floats are more than one level deep.
                function getClearedHeight(e) {
                    var height = e.height();

                    e.children().each(function() {
                        height = Math.max(height, $(target).height());
                    });

                    return height;
                }
            });
        }

        function getWidthForObject(object) {
            var width;

            try {
                width = object[0].getBoundingClientRect().width;
            } catch (err) {}

            if (typeof width === "undefined") {
                width = object.width();
            }

            return width;
        }
    };

    LC2.dynamicDialogCreation = function(id, dialogHtml, openCb, closeCb, dialogWidth) {
        var $body = $('body');
        if (!$body.find('#' + id).length) {
            $body.append(dialogHtml);
        }
        dialogWidth = dialogWidth ? dialogWidth : ((window.screen.availWidth * 90 / 100));
        if (!isNaN(Number(dialogWidth))) {
            dialogWidth = dialogWidth + 'px';
        }

        $('#' + id).dialog({
            modal: true,
            resizeable: false,
            width: dialogWidth,
            open: function() {
                $('.ui-widget-overlay').addClass('black-overlay');
                $('.ui-dialog').attr('id', 'address-error-modal-popup');
                $('.ui-widget-overlay').attr('id', 'black-overlay-address-validator');
                
                if (openCb) {
                    openCb();
                }
               
                
        		
            },
            close: function() {
                if (closeCb) {
                    closeCb();
                }
            }
        });
    };

    LC2.initPdpUtils = function() {
        function cloneObj(objToClone) {
            var clonedObj;
            if (Object.assign) {
                clonedObj = Object.assign({}, objToClone);
            } else {
                //Explorer case
                clonedObj = $.extend(true, {}, objToClone);
            }
            return clonedObj;
        }

        function getConfirmationDialog(id) {
            return '<div id="' + id + '">' +
                '<div id="checkout-back-warning" class="back-warning black-overlay redesign2017">' +
                '<div>' +
                '<h2>' +
                'Are you sure you want to go back?' +
                '</h2>' +
                '<p>' +
                'If you go back now, you will lose your selections' +
                '</p>' +
                '</div>' +
                '<div class="warning-buttons vertical-buttons">' +
                '<a class="st-button st-button-outline no-response" href="#" tabindex="0">' +
                '<span aria-hidden="true"></span>CANCEL' +
                '</a>' +
                '<a href="#" class="st-button yes-response st-button-orange" tabindex="0">' +
                '<span aria-hidden="true"></span>Yes' +
                '</a>' +
                '</div>' +
                '</div>' +
                '</div>';
        }

        LC2.pdpUtils = {
            isLensJsonValid: function(jsonToCheck) {
                var isValid = true;
                if (!jsonToCheck || !Object.keys(jsonToCheck).length) {
                    isValid = false;
                } else {
                    if (jsonToCheck.lens_categories) {
                        if (!jsonToCheck.lens_categories.length) {
                            isValid = false;
                        } else {
                            // Verifies tha every lens has at least one skus object
                            jsonToCheck.lens_categories.forEach(function(category) {
                                category.lenses.forEach(function(lens_category) {
                                	lens_category.lens_color_categories.forEach(function(lens) {
                                        if (!lens.skus || !lens.skus.length) {
                                            isValid = false;
                                        }
                                    });
                                });
                            });
                        }
                    } else {
                        isValid = false;
                    }
                }
                return isValid;
            },
            openPupillaryDistance: function(id, dialogWidth) {
                var dialogHtml = '<div id="' + id + '">' +
                    '<h2>' +
                    'Pupillary Distance' +
                    '</h2>' +
                    '<img src="/wcsstore/LensCraftersStorefrontAssetStore/images/pupillary-distance.jpg" />' +
                    '</div>';
                LC2.dynamicDialogCreation(id, dialogHtml, null, null, dialogWidth);
            },
            openJsonInvalidModal: function(id, dialogWidth) {
                var dialogHtml = '<div id="' + id + '">' +
                    '<div id="checkout-back-warning" class="back-warning black-overlay">' +
                    '<div>' +
                    '<h2>' +
                    'Error' +
                    '</h2>' +
                    '<p>' +
                    'Drats! It looks like the glasses you picked can\'t be customized yet. We\'re working to fix that. For now, grab them as is by adding to your cart.' +
                    '</p>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
                LC2.dynamicDialogCreation(id, dialogHtml, dialogWidth);
            },
            checkoutStepBackConfirm: function(id, dialogWidth, callingObjRef) {
                var dialogHtml = getConfirmationDialog(id);
                var openCb = function() {
                    $('body').on('click', '#' + id + ' .yes-response', function(e) {
                        e.preventDefault();
                        window.location.replace(callingObjRef.href);
                    });

                    $('body').on('click', '#' + id + ' .no-response', function(e) {
                        e.preventDefault();
                        $('#' + id).dialog('close');
                    });
                };

                LC2.dynamicDialogCreation(id, dialogHtml, openCb, null, dialogWidth);
            },
            openExitingFromLensSelection: function(id, dialogWidth) {
                var dialogHtml = getConfirmationDialog(id);
                var openCb = function() {
                    $('body').on('click', '#' + id + ' .yes-response', function(e) {
                        e.preventDefault();
                        $('#' + id).dialog('close');
                        $('#lens-selection-area').data('bypassBeforeClose', true);
                        closeLensSelectionModal();
                    });

                    $('body').on('click', '#' + id + ' .no-response', function(e) {
                        e.preventDefault();
                        $('#' + id).dialog('close');
                    });
                };

                LC2.dynamicDialogCreation(id, dialogHtml, openCb, null, dialogWidth);
            },
            checkStepToBeHidden: function(hideFunction, lensSelected) {
                var counter = 0;
                $('.step-template-html').each(function() {
                    if ($(this).data('stepmounted')) {
                        counter++;
                    }
                });
                if (counter === 2) {
                    if (lensSelected) {
                        hideFunction();
                    }
                }
            },
            printLensInfoIntoMenu: function(info) {
                if (info.name && (info.listPrice || info.listPrice == 0)) {
					
					if ((RiaHelper.isInsuranceOn() || info.framePromoPrice) && info.originalPrice)
						$('.lens-section .price-value').html('$' + parseFloat(info.originalPrice).toFixed(2));
                	else
                		$('.lens-section .price-value').html('$' + parseFloat(info.listPrice).toFixed(2));

                    if (info.name == $('#planoName').val() || info.name =="Sin receta") {
                    	$('.lens-section').addClass('hide');
                    } else {
                    	$('.lens-section').removeClass('hide');
                        $('li.lens-subsection').addClass('selected');
                        $('li.lens-subsection .lens-material-container span').text(info.material);
                        for(var p in utag_data.Products) {
                        	var temp = utag_data.Products[p];
                        	temp.LensTechnology = info.material;
                        }
                    }
                    $('.lens-hidden-data > .lensCatentryId').val(info.lens_id);
                    $('.lens-hidden-data > .lensPrice').val(info.listPrice);
                    $('.lens-hidden-data > .framePromoPrice').val(info.framePromoPrice);
                    $('.lens-hidden-data > .lensSaving').val(info.offerPrice);
                    $('.lens-hidden-data > .lensUPC').val(info.UPC);
                }
            },
            printColor: function(info) {
                $('.lens-subsection .existing-lens-color span').text(info.color);
                if (info.lens_sku_code == $('#planoCodeSku').val()) {
                    $('.lens-subsection .existing-lens-color').hide();
                } else {
                    $('.lens-subsection .existing-lens-color').show();
                }
                $('.lens-hidden-data > .lensColor').val(info.color);
                $('.lens-hidden-data > .lens_sku_id').val(info.lens_sku_id);
            },
            getPropFromLensId: function(pdpLensInfo, prop, id_lens, id_sku) {
                var color;
                pdpLensInfo.lens_categories.forEach(function(category) {
                    category.lenses.forEach(function(lens) {
                        if (lens.lens_id == id_lens) {
                            if (id_sku) {
                                lens.lens_color_categories.forEach(function(color_category) {
										color_category.skus.forEach(function(sku) {
										if (sku.lens_sku_id == id_sku) {
											color = sku[prop];
										}
									});
                                });
                            } else {
                            	color = lens.lens_color_categories[0].skus[0][prop];
                            }
                        }
                    });
                });
                return color;
            },
            getPropFromLensProduct: function(pdpLensInfo, prop, id_lens) {
                var color;
                pdpLensInfo.lens_categories.forEach(function(category) {
                    category.lenses.forEach(function(lens) {
                        if (lens.lens_id == id_lens) {
                            color = lens[prop];
                        }
                    });
                });
                return color;
            },
            getPdpInfoSubset: function(pdpLensInfo, radioCategory, selectedLensId) {
                var subset;
                pdpLensInfo.lens_categories.forEach(function(category) {
                    if (category.name === radioCategory) {
                        category.lenses.forEach(function(lens) {
                            if (lens.lens_id.toString() === selectedLensId) {
                                subset = lens;
                            }
                        });
                    }
                });
                return subset;
            },
            formatJson: function(source1, source2, mobile) {
                return cloneObj({
                    selectedItem: source1,
                    addons: source2.addons,
                    mobile: !!mobile
                });
            },
            mountStepOnRadioClick: function(pdpLensInfo, templateSelector, appendSelector, selectedRadio, closeAction) {
                // check if step2 should be rendered
                var onlystep1 = false;
                if (selectedRadio) {
                    onlystep1 = selectedRadio.isOnlyStep1Radio();
                }

                if (onlystep1) {
                    setTimeout(closeAction, 100);
                } else {
                    LC2.pdpUtils.mountStep(pdpLensInfo, templateSelector, appendSelector);
                }
            },
            addInfoToObj: function(pdpLensInfo) {
                pdpLensInfo.lens_categories = pdpLensInfo.lens_categories.map(function(category) {
                    category.lenses.forEach(function(lens) {
                        var skuCount = 0;
                        lens.lens_color_categories.forEach(function(lens_color_category) {
							skuCount += lens_color_category.skus.length;
                        });
                        lens.lens_color_categories.forEach(function(lens_color_category) {
							lens_color_category.skus[0].onlyOneSkus = (skuCount === 1);
                        });
                        lens.onlyStep1 = (!pdpLensInfo.addons.length && skuCount === 1 && !lens.ehnancements);
                    });
                    return category;
                });
            },
            hideErrorMessages: function() {
                // hide the visible error messages, if they exist
                $('#lens-selection-area .required').hide();
            },
            mountStep: function(pdpLensInfo, templateSelector, appendSelector) {
                var modalSource,
                    template,
                    html;

                LC2.pdpUtils.hideErrorMessages();
                modalSource = $(templateSelector).html();
                template = Handlebars.compile(modalSource);
                html = template(pdpLensInfo);
                html = $("<span />", {
                    html: html
                }).html().replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&gt;/g, '>');
                $(appendSelector + ' > .step-template-html').data('stepmounted', true).html(html);
            },
            getSelectedProductInfo: function($inputRadio) {
                var info = {};
                info.name = $inputRadio.data('name');
				info.listPrice = $inputRadio.data("listprice");
                info.offerPrice = $inputRadio.data('offerprice');
                info.framePromoPrice = $inputRadio.data('framepromoprice');
                info.originalPrice = $inputRadio.data('price');
                info.lens_id = $inputRadio.attr('data-lensid');
                info.UPC = $inputRadio.data('lens-upc');
                info.material = $inputRadio.data('lens-material');
                return info;
            },
            getQueryStringParams: function(sParam) {
                var sPageURL = window.location.search.substring(1);
                var sURLVariables = sPageURL.split('&');
                for (var i = 0; i < sURLVariables.length; i++) {
                    var sParameterName = sURLVariables[i].split('=');
                    if (sParameterName[0] == sParam) {
                        return sParameterName[1];
                    }
                }
            },
            autoOpenLensSelection: function($openButton) {
                var lensPopup = LC2.pdpUtils.getQueryStringParams('lensPopup');
                lensPopup = parseInt(lensPopup, 10);
                if (lensPopup && $openButton) {
                    $openButton.trigger('click');
                }
            }
        };
    };

    $(document).ready(function() {
        // initialize all accordion menus
        LC2.accordionMenus();
        LC2.initSlideshowListeners();
        // Initialize selectBox plugin.
        // expire_year_1 is dynamically calculated
        $('.lc2 select').not('.dynamic-selectbox').selectBox({
            mobile: true
        });
    });

})(jQuery);

/**
 * @param {string} class1: class to be changed into class2;
 * @param {string} class2: class to be changed into class1;
 * @return: none;
 */
$.fn.toggleClasses = function(class1, class2) {
    if (this.hasClass(class1)) {
        this.removeClass(class1);
        this.addClass(class2);
    } else {
        this.removeClass(class2);
        this.addClass(class1);
    }
}

/**
 * Used for display or hide a DOM element associated with a radioButton's option.
 * Notice: the association between an option and a DOM element is based on the
 * rel attribute;
 *
 * @param {string} class1: class to be added or removed;
 * @return: none;
 */
$.fn.showOnlyCheckedRadio = function(class1) {

    this.each(function() {
        var $this = $(this);
        var associatedElemId = $this.attr('rel');
        var $associatedElem = $('#' + associatedElemId);
        $this.is(':checked') ? $associatedElem.removeClass(class1) : $associatedElem.addClass(class1);
    });

}

$.fn.getAssociatedRadios = function() {
    var radioGroupName = $(this).attr("name");
    return $("input[type=radio][name=" + radioGroupName + "]");
}

$.fn.getAssociatedCheckboxes = function() {
    var checkboxGroupName = $(this).attr("name");
    return $("input[type=checkbox][name=" + checkboxGroupName + "]");
}


$.fn.onSelectedChange = function() {
    var $radioGroup = $(this).getAssociatedRadios();
    $radioGroup.showOnlyCheckedRadio('closed');
    var $checkGroup = $(this).getAssociatedCheckboxes();
    $checkGroup.showOnlyCheckedRadio('closed');
}

$.fn.isGroupType = function(part_name) {
    var elementName = $(this).attr('name');
    return elementName && elementName.indexOf(part_name) > -1;
}

$.fn.getAssociatedGroupHiddenField = function(name_part) {
    var out = false;
    var groupName = $(this).attr('name');
    var stopPos = groupName.indexOf("_");
    if (stopPos) {
        var initalNamePortion = groupName.substr(0, stopPos);
        var associatedHiddenGroupName = initalNamePortion + name_part;
        var $associatedHiddenGroup = $('input[name=' + associatedHiddenGroupName + ']');
        out = $associatedHiddenGroup;
    }
    return out;
}

$.fn.getAssociatedGroupFields = function(part_name) {
    var $this = $(this);
    var out = false;
    if ($this.isGroupType(part_name)) {
        var elementName = $this.attr("name");
        var phoneFieldName = elementName.substr(0, elementName.length - 1);
        var $phoneGroup = $("[name^=" + phoneFieldName + "]");
        out = $phoneGroup
    }
    return out;
}

/*
$.fn.getAssociatedBDateGroupFields = function(part_name){
	  var $this = $(this);
	  var out = false;
	  if($this.isGroupType(part_name)){
	    var elementName = $this.attr("name");
	    var bdateFieldName = elementName.substr(0, 5);
	    var $bdateGroup = $("[name^=" + bdateFieldName + "]");
	    out = $bdateGroup;
	  }
	  return out;
}
*/
$.fn.areAllGroupFieldsValid = function(part_name) {
    var $group = $(this).getAssociatedGroupFields(part_name);
    var is_valid = true;
    if ($group) {
        $group.each(function() {
            if ($(this).hasClass("required")) {
                is_valid = false;
            }
        });
    }
    return is_valid;
}

// Functions copied from global.js

$.validator.addMethod("reg_exp", function(value) {
    var iChars = "!#";

    for (var i = 0; i < value.length; i++) {
        if (iChars.indexOf(value.charAt(i)) != -1) {
            return false;
        }
    }
    return true;
});

$.validator.addMethod("validCC", function(value) {
    var visa = /^4[0-9]{6,}$/;
    var mastercard = /^5[1-5][0-9]{5,}$/;
    var amex = /^3[47][0-9]{5,}$/;
    var discover = /^6[0245][0-9]{5,}$/;
	var jcb = /^(?:2131|1800|35[0-9]{3})[0-9]{11}$/;
	
    var isAmex = false;
    var ccToTest = [visa, mastercard, amex, discover, jcb];
    var counter = 0;
    var testRes = false;
    while (counter < ccToTest.length && !testRes) {
        testRes = ccToTest[counter].test(jQuery('#payment_hidden_card').val());
        if (testRes && counter == 2) {
            isAmex = true;
        }
        counter++;
    }
    var cardLength = jQuery('#payment_hidden_card').val().length;
    if ((isAmex && cardLength != 15) || (!isAmex && cardLength != 16)) {
        testRes = false;
    }
    return testRes;
});

$.validator.addMethod("dotPos_formatCheck", function(value) {
        var emailLength = value.length;
        var lastDotPos = value.lastIndexOf(".");
        if (emailLength - (lastDotPos + 1) >= 2) {
            return true;
        } else {
            return false;
        }

    },
    MessageHelper.messages["ERROR_EmailEmpty"]
);

$.validator.addMethod("specialCharacters", function(value) {
    var userInput = value;
    var valid = false;

    if (userInput.indexOf('!') == -1 && userInput.indexOf('#') == -1)
        valid = true;

    return valid;
}, '* invalid');

$.validator.addMethod("zipCode", function(value, element) {
    var valid = false;
    var userInput = value;
    var zipRegex;

    // If countryRegex is undefined
    // Check against both US/Canadian postal codes
    // Otherwise, check against the specific country type
    if (zipRegex == undefined) {
        var zipCodeRegex = /^\d{5}(-\d{4})?$/;
        regexp = new RegExp(zipCodeRegex);
        if (regexp.test(userInput)) {
            valid = true;
        }
    } else {
        regexp = new RegExp(zipRegex);

        if (regexp.test(userInput))
            valid = true;
        else
            valid = false;
    }
    return valid;
}, '* invalid');

$.validator.addMethod("validEmail", function(value, element) {
    if (value == '')
        return true;

    var temp1;
    temp1 = true;
    var ind = value.indexOf('@');
    var str2 = value.substr(ind + 1);
    var str3 = str2.substr(0, str2.indexOf('.'));
    if (str3.lastIndexOf('-') == (str3.length - 1) || (str3.indexOf('-') != str3.lastIndexOf('-')))
        return false;
    var str1 = value.substr(0, ind);
    if ((str1.lastIndexOf('_') == (str1.length - 1)) || (str1.lastIndexOf('.') == (str1.length - 1)) || (str1.lastIndexOf('-') == (str1.length - 1)))
        return false;
    str = /^([a-zA-Z0-9]+[\._-]??)*([a-zA-Z0-9]+[_]??)+@([a-zA-Z0-9]+[-]??)+(\.[a-zA-Z0-9]+)*(\.[a-zA-Z]{2,3})$/;
    temp1 = str.test(value);
    return temp1;
}, MessageHelper.messages["ERROR_EmailEmpty"]);

$.validator.addMethod(
    "expDateTest",
    function(value, element) {
        var expirationDateTest = /^((0[1-9])|(1[0-2]))\/([1-3][0-9])$/;
        return expirationDateTest.test(value);
    }
);

// ---------------------------------
// New added

/**
 * This function is used for the input groups. It checks that all the associatedElements
 * fields are simultaneously valid.
 */
var customGroupValidator = function(validator, element, part_name, ruleToExclude) {
    var out = true;
    var $element = $(element);
    var $associatedElements = $element.getAssociatedGroupFields(part_name);
    $associatedElements.each(function(index, item) {
        var $associatedElement = $(item);

        var rules = validator.settings.rules[$associatedElement.attr('name')];
        var filteredRules = {};
        Object.keys(rules).forEach(function(key) {
            if (key !== ruleToExclude) {
                filteredRules[key] = rules[key]
            }
        });

        Object.keys(filteredRules).forEach(function(key) {
            var elemValue = $associatedElement.val().replace(/\r/g, "");
            var isValid = $.validator.methods[key].call(validator, elemValue, item, filteredRules[key]);
            if (!isValid) {
                out = false;
            }
        });
    });

    return out;
}

var customBDateGroupValidator = function(validator, element, part_name, ruleToExclude) {
    var out = true;
    var $element = $(element);
    var $associatedElements = $element.getAssociatedBDateGroupFields(part_name);
    $associatedElements.each(function(index, item) {
        var $associatedElement = $(item);

        var rules = validator.settings.rules[$associatedElement.attr('name')];
        var filteredRules = {};
        Object.keys(rules).forEach(function(key) {
            if (key !== ruleToExclude) {
                filteredRules[key] = rules[key]
            }
        });

        Object.keys(filteredRules).forEach(function(key) {
            var elemValue = $associatedElement.val().replace(/\r/g, "");
            var isValid = $.validator.methods[key].call(validator, elemValue, item, filteredRules[key]);
            if (!isValid) {
                out = false;
            }
        });
    });

    return out;
}


$.validator.addMethod("lettersonly", function(value, element) {
    return this.optional(element) || /^[a-z]+$/i.test(value);
}, "Please enter letters only"); 

$.validator.addMethod("validFullTextPhoneValue", function(value, element){
	var validator = $(this)[0];  
	var insertedPhoneValue = $('input[name=shipping_phone1]').val();
	if (insertedPhoneValue.length === 0) return true;    
		    
	var cleaned = ('' + insertedPhoneValue).replace(/\D/g, '')
	var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
	if (match) {
		return '(' + match[1] + ') ' + match[2] + '-' + match[3]
	}
	return false;
});

$.validator.addMethod("validPhoneValue", function(value, element) {
    var validator = $(this)[0];
    return customGroupValidator(validator, element, '_phone_', 'validPhoneValue');
});

$.validator.addMethod("requiredIfSelected", function(value, element){
	if($('input[name="selectPrescription"]:checked').val() == 'callDoctor' && trim(value) ==  ''){
		return false;
	}
	return true;
});

$.validator.addMethod("require_from_group", function(value, element, options) {
    var numberRequired = options[0];
    var selector = options[1];
    var fields = $(selector, element.form);
    var filled_fields = fields.filter(function() {
        // it's more clear to compare with empty string
        return $(this).val() != "";
    });
    var empty_fields = fields.not(filled_fields);
    // we will mark only first empty field as invalid
    if (filled_fields.length < numberRequired) {
        return false;
    }
    return true;
    // {0} below is the 0th item in the options field
});

$.validator.addMethod("lettersonly", function(value, element) {
    return this.optional(element) || /^[a-zA-Z\s]+$/i.test(value);
});

$.validator.addMethod("validBirthDateValue", function(value, element) {
    var validationStatus = true;
    var today = new Date();

    var selectedMonth = parseInt($(element).closest('.checkout-step-2').find('.birthMonth').val());
    var selectedYear = parseInt($(element).closest('.checkout-step-2').find('.birthYear').val());
    var selectedDate = parseInt($(element).closest('.checkout-step-2').find('.birthDate').val());

    var dob = new Date(0);
    dob.setDate(selectedDate);
    dob.setMonth(selectedMonth - 1);
    dob.setYear(selectedYear);

    if (dob > today || (dob.getFullYear() != selectedYear || dob.getMonth() != selectedMonth - 1 || dob.getDate() != selectedDate)) {
        validationStatus = false;
        setTimeout(function() {
            scrollToElement($('input[name=prescription_firstName]'));
        }, 0);
    }
    
   
    
    
    return validationStatus;
});

$.validator.addMethod("validPrescrBirthDateValue", function(value, element) {
    var validationStatus = true;
    var today = new Date();

    var selectedMonth = parseInt($(element).closest('.date-parent').find('.birthMonth').val());
    var selectedYear = parseInt($(element).closest('.date-parent').find('.birthYear').val());
    var selectedDate = parseInt($(element).closest('.date-parent').find('.birthDate').val());

    var dob = new Date(0);
    dob.setDate(selectedDate);
    dob.setMonth(selectedMonth - 1);
    dob.setYear(selectedYear);

    if (dob > today || (dob.getFullYear() != selectedYear || dob.getMonth() != selectedMonth - 1 || dob.getDate() != selectedDate)) {
        validationStatus = false;
        setTimeout(function() {
            scrollToElement($('input[name=prescription_firstName]'));
        }, 0);
    }
    
   
    
    
    return validationStatus;
});



$.validator.addMethod("validDateValue", function(value, element) {
    var validator = $(this)[0];
    return customGroupValidator($(this)[0], element, '_expire_', 'validDateValue');
});

$.validator.addMethod("notPastDate", function(value, element) {
    var validationStatus = true;
    var today = new Date();
    var selectedMonth = parseInt(value);

    var selectedYear = $('select[name=payment_expire_2]').val();
    var currentYear = today.getFullYear();
    var currentMonth = parseInt(today.getMonth()) + 1;
    if (selectedYear == currentYear && selectedMonth < currentMonth) {
        validationStatus = false
    }
    return validationStatus;
});




$.validator.addMethod("adaptiveCvcLength", function(value, element) {
    var validationStatus = true;

    if ($('#card_type').val() == 'AMEX' && value.length != 4) {
        validationStatus = false;
    } else if ($('#card_type').val() != 'AMEX' && value.length != 3) {
        validationStatus = false;
    }
    return validationStatus;
});

$.validator.addMethod("validDoctorText", function(value, element) {
    var validator = $(this)[0];
    var insertedDoctorValue = $('input[name=text_doctorName]').val();
    var regExprCel = new RegExp(/^[a-zA-Z\s]*$/);
    return regExprCel.test(insertedDoctorValue);
});

$.validator.addMethod("validDoctorUpload", function(value, element) {
    var validator = $(this)[0];
    var insertedDoctorValue = $('input[name=upload_doctorName]').val();
    var regExprCel = new RegExp(/^[a-zA-Z\s]*$/);
    return regExprCel.test(insertedDoctorValue);
    
});

/*
globals $
LC2
*/

// ------------------------------- Config Objs -------------------------------

var PrescriptionValidationParams = {
    getRules: function() {
        return {
        	prescription_firstName: {
                required: true
            },
            prescription_lastName: {
                required: true
            },
            prescription_rxPupilDistance: {
                required: true
            },
            doctorName:{
          	  required: true
            },
            doctorState:{
          	  required: true
            },
            doctorPhone:{
          	  required: true
            }
        }
    },
    getMessages: function() {
        return {
            prescription_firstName: MessageHelper.messages["ERROR_FirstNameEmpty"],
            prescription_lastName: MessageHelper.messages["ERROR_LastNameEmpty"],
            prescription_rxPupilDistance: MessageHelper.messages["ERROR_PupillaryDistanceEmpty"]
        }
    },
    getGroups: function() {
        return {
        }
    }
}

var TextPrescriptionValidationParams = {
    getRules: function() {
        return {
            prescription_firstName: {
                required: true
            },
            prescription_lastName: {
                required: true
            },
            text_doctorName: {
                required: true,
                validDoctorText: true
            },
            text_phone_1: {
                required: true,
                minlength: 3,
                validPhoneValue: true
            },
            text_phone_2: {
                required: true,
                minlength: 3,
                validPhoneValue: true
            },
            text_phone_3: {
                required: true,
                minlength: 4,
                validPhoneValue: true
            }
        };
    },
    getMessages: function() {
        return {
            prescription_firstName: MessageHelper.messages["ERROR_FirstNameEmpty"],
            prescription_lastName: MessageHelper.messages["ERROR_LastNameEmpty"],
            text_doctorName: {
            	required: MessageHelper.messages["ERROR_DoctorsNameEmpty"],
            	validDoctorText: MessageHelper.messages["ERROR_DoctorsName"]
            },
            text_phone_1: {
                required: MessageHelper.messages["ERROR_DoctorsNumberEmpty"],
                validPhoneValue: MessageHelper.messages["ERROR_PhonenumberInvalid"],
                minlength: MessageHelper.messages["ERROR_PhonenumberInvalid"]
            },
            text_phone_2: {
                required: MessageHelper.messages["ERROR_DoctorsNumberEmpty"],
                validPhoneValue: MessageHelper.messages["ERROR_PhonenumberInvalid"],
                minlength: MessageHelper.messages["ERROR_PhonenumberInvalid"]
            },
            text_phone_3: {
                required: MessageHelper.messages["ERROR_DoctorsNumberEmpty"],
                validPhoneValue: MessageHelper.messages["ERROR_PhonenumberInvalid"],
                minlength: MessageHelper.messages["ERROR_PhonenumberInvalid"]
            }
        }
    },
    getGroups: function() {
        return {
            text_phone_group: "text_phone_1 text_phone_2 text_phone_3"
        }
    }
}

var UploadPrescriptionValidationParams = {
    getRules: function() {
        return {
            prescription_firstName: {
                required: true
            },
            prescription_lastName: {
                required: true
            },
            upload_emailAddress: {
                required: true,
                reg_exp: true,
                validEmail: true,
                dotPos_formatCheck: true,
                specialCharacters: true
            },
            upload_fileName: {
                required: $('input[name=upload_fileName]').hasClass('required')
            },
            upload_doctorName: {
                required: true,
                validDoctorUpload: true
            },
            upload_phone_1: {
                required: true,
                minlength: 3,
                validPhoneValue: true
            },
            upload_phone_2: {
                required: true,
                minlength: 3,
                validPhoneValue: true
            },
            upload_phone_3: {
                required: true,
                minlength: 4,
                validPhoneValue: true
            }
        }
    },
    getMessages: function() {
        return {
            prescription_firstName: MessageHelper.messages["ERROR_FirstNameEmpty"],
            prescription_lastName: MessageHelper.messages["ERROR_LastNameEmpty"],
            upload_emailAddress: {
                required: MessageHelper.messages["ERROR_EmailEmpty"],
                reg_exp: MessageHelper.messages["ERROR_InvalidEmail"],
                validEmail: MessageHelper.messages["ERROR_InvalidEmail"],
                dotPos_formatCheck: MessageHelper.messages["ERROR_InvalidEmail"],
                specialCharacters: MessageHelper.messages["ERROR_InvalidEmail"]
            },
            upload_fileName: MessageHelper.messages["ERROR_FileNotProvided"],
            upload_doctorName: {
            	required: MessageHelper.messages["ERROR_DoctorsNameEmpty"],
            	validDoctorUpload: MessageHelper.messages["ERROR_DoctorsName"]
            },
            upload_phone_1: {
                required: MessageHelper.messages["ERROR_DoctorsNumberEmpty"],
                validPhoneValue: MessageHelper.messages["ERROR_PhonenumberInvalid"],
                minlength: MessageHelper.messages["ERROR_PhonenumberInvalid"]
            },
            upload_phone_2: {
                required: MessageHelper.messages["ERROR_DoctorsNumberEmpty"],
                validPhoneValue: MessageHelper.messages["ERROR_PhonenumberInvalid"],
                minlength: MessageHelper.messages["ERROR_PhonenumberInvalid"]
            },
            upload_phone_3: {
                required: MessageHelper.messages["ERROR_DoctorsNumberEmpty"],
                validPhoneValue: MessageHelper.messages["ERROR_PhonenumberInvalid"],
                minlength: MessageHelper.messages["ERROR_PhonenumberInvalid"]
            }
        }
    },
    getGroups: function() {
        return {
            upload_phone_group: "upload_phone_1 upload_phone_2 upload_phone_3"
        }
    }
}

var CallPrescriptionValidationParams = {
    getRules: function() {
        return {
            prescription_firstName: {
                required: true
            },
            prescription_lastName: {
                required: true
            },
            call_doctorName: {
            	required: true,
                requiredIfSelected: true
            },
            call_phone_1: {
                required: true,
                minlength: 3,
                validPhoneValue: true
            },
            call_phone_2: {
                required: true,
                minlength: 3,
                validPhoneValue: true
            },
            call_phone_3: {
                required: true,
                minlength: 4,
                validPhoneValue: true
            },
            birth_month: {
                require_from_group: [3, "select[groupname=dobnorx]"],
                validPrescrBirthDateValue: true
            },
            birth_date: {
                require_from_group: [3, "select[groupname=dobnorx]"],
                validPrescrBirthDateValue: true
            },
            birth_year: {
                require_from_group: [3, "select[groupname=dobnorx]"],
                validPrescrBirthDateValue: true
            }
        }
    },
    getMessages: function() {
        return {
            prescription_firstName: MessageHelper.messages["ERROR_FirstNameEmpty"],
            prescription_lastName: MessageHelper.messages["ERROR_LastNameEmpty"],
            call_doctorName: MessageHelper.messages["ERROR_DoctorsNameEmpty"],
            call_phone_1: {
                required: MessageHelper.messages["ERROR_DoctorsNumberEmpty"],
                validPhoneValue: MessageHelper.messages["ERROR_PhonenumberInvalid"],
                minlength: MessageHelper.messages["ERROR_PhonenumberInvalid"]
            },
            call_phone_2: {
                required: MessageHelper.messages["ERROR_DoctorsNumberEmpty"],
                validPhoneValue: MessageHelper.messages["ERROR_PhonenumberInvalid"],
                minlength: MessageHelper.messages["ERROR_PhonenumberInvalid"]
            },
            call_phone_3: {
                required: MessageHelper.messages["ERROR_DoctorsNumberEmpty"],
                validPhoneValue: MessageHelper.messages["ERROR_PhonenumberInvalid"],
                minlength: MessageHelper.messages["ERROR_PhonenumberInvalid"]
            },
            birth_month: {
                require_from_group: MessageHelper.messages["ERROR_PrescrDOBRequired"],
                validPrescrBirthDateValue: MessageHelper.messages["ERROR_PrescrDOBInvalid"]
            },
            birth_date: {
                require_from_group: MessageHelper.messages["ERROR_PrescrDOBRequired"],
                validPrescrBirthDateValue: MessageHelper.messages["ERROR_PrescrDOBInvalid"]
            },
            birth_year: {
                require_from_group: MessageHelper.messages["ERROR_PrescrDOBRequired"],
                validPrescrBirthDateValue: MessageHelper.messages["ERROR_PrescrDOBInvalid"]
            }
        }
    },
    getGroups: function() {
        return {
            call_phone_group: "call_phone_1 call_phone_2 call_phone_3",
            date_of_birth_group: "birth_month birth_date birth_year"
        }
    }
}

var BillingValidationParams = {
    getRules: function() {
        return {
            billing_nickName: {
                required: true,
                reg_exp: true
            },
            billing_firstName: {
                required: true,
                reg_exp: true
            },
            billing_lastName: {
                required: true,
                reg_exp: true
            },
            billing_address1: {
                required: true,
                reg_exp: true
            },
            billing_city: {
                required: true,
                reg_exp: true
            },
            billing_state: {
                required: true
            },
            billing_zipCode: {
                required: true,
                zipCode: true
            },
            billing_phone_1: {
                required: true,
                minlength: 3,
                validPhoneValue: true
            },
            billing_phone_2: {
                required: true,
                minlength: 3,
                validPhoneValue: true
            },
            billing_phone_3: {
                required: true,
                minlength: 4,
                validPhoneValue: true
            },
            billing_email1: {
                required: true,
                reg_exp: true,
                validEmail: true,
                dotPos_formatCheck: true,
                specialCharacters: true
            },
            billing_addressValidation: {
                required: true
            }
        };
    },
    getMessages: function() {
        return {
            billing_nickName: {
                required: MessageHelper.messages["ERROR_RecipientEmpty"],
                reg_exp: MessageHelper.messages["ERROR_InvalidFieldChar"]
            },
            billing_firstName: {
                required: MessageHelper.messages["ERROR_FirstNameEmpty"],
                reg_exp: MessageHelper.messages["ERROR_InvalidFieldChar"]
            },
            billing_lastName: {
                required: MessageHelper.messages["ERROR_LastNameEmpty"],
                reg_exp: MessageHelper.messages["ERROR_InvalidFieldChar"]
            },
            billing_address1: {
                required: MessageHelper.messages["ERROR_AddressEmpty"],
                reg_exp: MessageHelper.messages["ERROR_InvalidFieldChar"]
            },
            billing_city: {
                required: MessageHelper.messages["ERROR_CityEmpty"],
                reg_exp: MessageHelper.messages["ERROR_InvalidFieldChar"]
            },
            billing_state: MessageHelper.messages["ERROR_StateEmpty"],
            billing_zipCode: MessageHelper.messages["ERROR_ZipCodeEmpty"],
            billing_phone_1: MessageHelper.messages["ERROR_PhonenumberEmpty"],
            billing_phone_2: MessageHelper.messages["ERROR_PhonenumberEmpty"],
            billing_phone_3: MessageHelper.messages["ERROR_PhonenumberEmpty"],
            billing_email1: {
                required: MessageHelper.messages["ERROR_EmailEmpty"],
                reg_exp: MessageHelper.messages["ERROR_InvalidEmail"],
                validEmail: MessageHelper.messages["ERROR_InvalidEmail"],
                dotPos_formatCheck: MessageHelper.messages["ERROR_InvalidEmail"],
                specialCharacters: MessageHelper.messages["ERROR_InvalidEmail"]
            },
            billing_addressValidation: MessageHelper.messages["ERROR_NoRadioSelected"]
        }
    },
    getGroups: function() {
        return {
            billing_phone_group: "billing_phone_1 billing_phone_2 billing_phone_3"
        }
    }
}


var ShippingValidationParams = {

    getRules: function() {
        return {
            shipping_firstName: {
                required: true,
                reg_exp: true,
                lettersonly: true
            },
            shipping_lastName: {
                required: true,
                reg_exp: true,
                lettersonly: true
            },
            shipping_email1: {
                required: true,
                reg_exp: true,
                validEmail: true,
                dotPos_formatCheck: true,
                specialCharacters: true
            },
           
            birth_month: {
                require_from_group: [3, "select[groupname=dobnorx]"],
                validBirthDateValue: true
            },
            birth_date: {
                require_from_group: [3, "select[groupname=dobnorx]"],
                validBirthDateValue: true
            },
            birth_year: {
                require_from_group: [3, "select[groupname=dobnorx]"],
                validBirthDateValue: true
            },
            shipping_address1: {
                required: true,
                reg_exp: true
            },
            shipping_city: {
                required: true,
                reg_exp: true
            },
            shipping_state: {
                required: true
            },
            shipping_zipCode: {
                required: true,
                zipCode: true
            },
            shipping_phone1:{
          	  validFullTextPhoneValue: true,
          	  required: true
            },
            

        }
    },
    getMessages: function() {
        return {
            shipping_nickName: {
                required: MessageHelper.messages["ERROR_RecipientEmpty"],
                reg_exp: MessageHelper.messages["ERROR_InvalidFieldChar"]
            },
            shipping_firstName: {
                required: MessageHelper.messages["ERROR_FirstNameEmpty"],
                reg_exp: MessageHelper.messages["ERROR_InvalidFieldChar"]
            },
            shipping_lastName: {
                required: MessageHelper.messages["ERROR_LastNameEmpty"],
                reg_exp: MessageHelper.messages["ERROR_InvalidFieldChar"]
            },
            shipping_email1: {
                required: MessageHelper.messages["ERROR_EmailEmpty"],
                reg_exp: MessageHelper.messages["ERROR_InvalidEmail"],
                validEmail: MessageHelper.messages["ERROR_InvalidEmail"],
                dotPos_formatCheck: MessageHelper.messages["ERROR_InvalidEmail"],
                specialCharacters: MessageHelper.messages["ERROR_InvalidEmail"]
            },
            shipping_phone1:{
              required: MessageHelper.messages["ERROR_PhonenumberRequired"],
          	  validFullTextPhoneValue: MessageHelper.messages["ERROR_PhonenumberInvalid"]
            },
            shipping_address1: {
                required: MessageHelper.messages["ERROR_AddressEmpty"],
                reg_exp: MessageHelper.messages["ERROR_InvalidFieldChar"]
            },
            shipping_city: {
                required: MessageHelper.messages["ERROR_CityEmpty"],
                reg_exp: MessageHelper.messages["ERROR_InvalidFieldChar"]
            },
            shipping_state: MessageHelper.messages["ERROR_StateEmpty"],
            shipping_zipCode: MessageHelper.messages["ERROR_ZipCodeEmpty"]
        }
    },
    getGroups: function() {
    	
        return {
            date_of_birth_group: "grpBirth birth_month birth_date birth_year"
        }
        
    }
}

var PaymentValidationParams = {
    getRules: function() {
        return {
            payment_card_1: {
                required: true,
                minlength: 18,
                validCC: true
            },

            name_card: {
                required: true,
                lettersonly: true
            },
            payment_expire_1: {
                required: true,
                reg_exp: true,
                notPastDate: true,
                validDateValue: true
            },
            payment_expire_2: {
                required: true,
                reg_exp: true,
                validDateValue: true
            },
            cc_cvc: {
                required: true,
                reg_exp: true,
                adaptiveCvcLength: true,
                minlength: 3
            },
            accept_terms: {
                required: true
            },
            recaptchaToken_1: {
                required: true
            }
        };
    },
    getMessages: function() {
        return {
            payment_card_1: {
                required: MessageHelper.messages["ERROR_CardNumber"],
                minlength: MessageHelper.messages["ERROR_CardNumber"],
                validCC: MessageHelper.messages["ERROR_CC_INVALID"]
            },
            name_card: {
                required: MessageHelper.messages["ERROR_CardNameRequired"],
                lettersonly: MessageHelper.messages["ERROR_CardNameLetters"]
            },
            payment_expire_1: {
                required: MessageHelper.messages["ERROR_CardDate"],
                validDateValue: MessageHelper.messages["ERROR_CardDate"],
                notPastDate: MessageHelper.messages["ERROR_CardDate"]
            },
            payment_expire_2: {
                required: MessageHelper.messages["ERROR_CardDate"],
                validDateValue: MessageHelper.messages["ERROR_CardDate"]
            },
            cc_cvc: {
                required: MessageHelper.messages["ERROR_CVV2Empty"],
                reg_exp: MessageHelper.messages["ERROR_InvalidFieldChar"],
                adaptiveCvcLength: MessageHelper.messages["ERROR_AMEXCvc"]
            },
            accept_terms: {
                required: MessageHelper.messages["ERROR_AcceptTermsRequired"]
            },
            recaptchaToken_1: {
                required: MessageHelper.messages["ERROR_NoRecaptchaChecked"]
            }
        }
    },
    getGroups: function() {
        return {
            payment_expire: "payment_expire_1 payment_expire_2"
        }
    }
}

var SigninValidationParams = {
    getRules: function() {
        return {
            logonId: {
                required: true,
                reg_exp: true,
                minlength: 4,
                validEmail: true
            },
            logonPassword: {
                required: true,
                minlength:8,
                atLeastOneLetterUpperAndLowerAndOneDigitAndSpecial: true
            },
            logonPasswordVerify: {
                required: true,
                equalTo: '#logonPassword_regModelField',
                atLeastOneLetterUpperAndLowerAndOneDigitAndSpecial: true
            },
            age: {
                required: true
            }
        };
    },
    getMessages: function() {
        return {
            logonId: {
                required: MessageHelper.messages["ERROR_EmailEmpty"],
                reg_exp: MessageHelper.messages["ERROR_InvalidEmail"],
                validEmail: MessageHelper.messages["ERROR_InvalidEmail"],
                dotPos_formatCheck: MessageHelper.messages["ERROR_InvalidEmail"],
                specialCharacters: MessageHelper.messages["ERROR_InvalidEmail"]
            },
            logonPassword: {
                required: MessageHelper.messages["ERROR_PasswordEmpty"],
                minlength:MessageHelper.messages["PASSWORD_UPDATE_INVALID_ERROR_NEW"],
                atLeastOneLetterUpperAndLowerAndOneDigitAndSpecial: MessageHelper.messages["PASSWORD_UPDATE_INVALID_ERROR_NEW"]
            },
            logonPasswordVerify: {
                required: MessageHelper.messages["ERROR_PasswordEmpty"],
                equalTo: MessageHelper.messages["ERROR_PASSWORD_MISMATCH"],
                atLeastOneLetterUpperAndLowerAndOneDigitAndSpecial: MessageHelper.messages["PASSWORD_UPDATE_INVALID_ERROR_NEW"]
            }
        };
    },
    getGroups: function() {}
}

function calculateTaxesEstimate(zipCode){
	  var _dlCopy = $.extend(true, {}, _dl);
	  _dlCopy.site_events = {"submit_estimated_taxes": "true"};    
	  callTrackAnalytics(_dlCopy);
	  CheckoutHelperJS.updateTaxCalculation(zipCode);
	  return false;
}

function validateZipCode(value){
	  var valid = false;
	  var userInput  = value;
	  var zipRegex;

	  // If countryRegex is undefined
	  // Check against both US/Canadian postal codes
	  // Otherwise, check against the specific country type
	  if (zipRegex == undefined)
	  {
	    var zipCodeRegex = /^\d{5}(-\d{4})?$/;
	    regexp = new RegExp(zipCodeRegex);
	    if( regexp.test(userInput) ) {
	      valid = true;
	    }
	  }
	  else
	  {
	    regexp = new RegExp (zipRegex);

	    if(regexp.test(userInput))
	      valid = true;
	    else
	      valid = false;
	  }
	  return valid;
}

function addMessageHelperMessages() {
    // LC: this adds new messages at the already existing MessageHelper obj
	MessageHelper.setMessage("ERROR_NoRecaptchaChecked", "Please check the captcha");
    MessageHelper.setMessage("ERROR_NoRadioSelected", "Select one of the options above");
    MessageHelper.setMessage("ERROR_DoctorsNameEmpty", "Please enter your doctor name");
    MessageHelper.setMessage("ERROR_DoctorsName", "Please enter a valid doctor name");
    MessageHelper.setMessage("ERROR_DoctorsNumberEmpty", "Please enter your doctor phone number");
    MessageHelper.setMessage("ERROR_PhonenumberInvalid", "Please enter a valid phone number");
    MessageHelper.setMessage("ERROR_PhonenumberRequired", "Please enter your phone number");
    MessageHelper.setMessage("ERROR_FirstNameEmpty", "Please enter your first name");
    MessageHelper.setMessage("ERROR_LastNameEmpty", "Please enter your last name");
    MessageHelper.setMessage("ERROR_EmailEmpty", "Please provide a valid email address.");
    MessageHelper.setMessage("ERROR_StateEmpty", "Please select a state.");
    MessageHelper.setMessage("ERROR_PupillaryDistanceEmpty", "Please enter your pupillary distance");
    MessageHelper.setMessage("ERROR_CardNumber", "Please enter your credit card number");
    MessageHelper.setMessage("ERROR_CardDate", "Please select a valid date");
    MessageHelper.setMessage("ERROR_InvalidEmail", "Please provide a valid email address.");
    MessageHelper.setMessage("ERROR_PasswordEmpty", "Please provide a valid password.");
    MessageHelper.setMessage("ERROR_Logon_modal_PasswordEmpty", "Please provide a valid password.");
    MessageHelper.setMessage("ERROR_Logon_PasswordFormat", "Please provide a valid password.");
    MessageHelper.setMessage("ERROR_Logon_PasswordFormat_Update", "Password does not meet minimum requirements.");
    MessageHelper.setMessage("Error_PasswordMinLength", "Please enter a password with at least 6 characters");
    MessageHelper.setMessage("ERROR_FileNotProvided", "Please upload a prescription file.");
    MessageHelper.setMessage("ERROR_ZipCodeEmpty", "Please provide a valid zip code.");
    MessageHelper.setMessage("ERROR_PhonenumberEmpty", "Please provide a valid phone number.");
    MessageHelper.setMessage("ERROR_RecipientEmpty", "The recipient field cannot be empty.");
    MessageHelper.setMessage("ERROR_InvalidFieldChar", "This field may not contain the characters \"!\" or \"#\".");
    MessageHelper.setMessage("ERROR_AMEXCvc", "Please enter a valid security code");
    MessageHelper.setMessage("ERROR_AddressEmpty", "Please provide a valid address.");
    MessageHelper.setMessage("ERROR_CityEmpty", "Please provide a valid city.");
    MessageHelper.setMessage("ERROR_CVV2Empty", "Please enter the security code");
    MessageHelper.setMessage("ERROR_PASSWORD_MISMATCH", "The passwords you entered do not match.");
    MessageHelper.setMessage("ERROR_CC_INVALID", "Your credit card information does not match a valid credit card.");
    MessageHelper.setMessage("PASSWORD_UPDATE_REQUIREMENTS_ERROR", "Your password must be at least 6 characters in length and include one letter.");
    MessageHelper.setMessage("ERROR_DOBInvalid", "Please enter a valid birth date");
    MessageHelper.setMessage("ERROR_DOBRequired", "Please enter your birth date");
    MessageHelper.setMessage("ERROR_CardNameRequired", "Please enter the name on card");
    MessageHelper.setMessage("ERROR_CardNameLetters", "Please enter only letters");
    MessageHelper.setMessage("ERROR_AcceptTermsRequired", "Please accept our Terms & Conditions And Privacy Policy");
    MessageHelper.setMessage("ERROR_PrescrDOBInvalid", "Please enter a valid patient birth date");
    MessageHelper.setMessage("ERROR_PrescrDOBRequired", "Please enter patient birth date");

}

// ------------------------------ End Config Objs -----------------------------

// ------------------------------ Config getters ------------------------------
var ignoreValues = [
                    ":hidden, .ignoreValidation", 
                    ":hidden:not(input[name=call_doctorName]), .ignoreValidation"
                   ];

$(document).ready(function() {
	if ($('input[name=selectPrescription]') != 'undefined') {
	    $('input[name=selectPrescription]').change(function() {
	        if($(this).val() == 'textPrescription' || $(this).val() == 'uploadPrescription') {
	            window.LCCheckoutValidator.settings.ignore = ignoreValues[0];
	        } else {
	            window.LCCheckoutValidator.settings.ignore = ignoreValues[1];
	        }
	    });
	}
});

function getBasicValidationConfig(rules, messages, groups, errorPlacement, submitHandler) {
    return {
        ignore: ignoreValues[0],
        onfocusout: false,
        onkeyup: false,
        onclick: false,
        errorClass: 'required',
        errorElement: 'span',
        rules: rules,
        messages: messages,
        groups: groups,
        submitHandler: function(form) {
            eval(form.action);
        },
        highlight: function(element, errorClass) {
            var $element = $(element);
            //$element.addClass("required");
     

            if ($element.attr('groupname')) {
                var groupname = $element.attr('groupname');
                if(groupname = 'dobnorx'){
   
	                $(".select_container").find("span").remove();
                	$('span[id^="sc123"]').remove();
                	 if( $('#date_of_birth_group-error').length ){
                		 $('#date_of_birth_group-error').remove();
             		$(".date-parent").append("<span id=\"sc123\" class=\"valid\" style=\"display: block; clear: left; color: #00a651;font-size: 12px; background:url(../../assets/lc2_sprite.gif); content=''\">Valid field</span>");
                	 }
                	 else
                		 $(".date-parent").append("<span id=\"sc123\" class=\"valid\" style=\"display: block; clear: left; color: #00a651;font-size: 12px; background:url(../../assets/lc2_sprite.gif); content=''\">Valid field</span>");
                	
                	
                }
                else{
                var $closestInputContainer = $('[groupname=' + groupname + ']').first().closest(".input-container, .select_container");
                $('[groupname=' + groupname + ']').addClass("error").removeClass("success");
                $closestInputContainer.children('span.valid').remove();
                $('[groupname=' + groupname + ']').closest(".input-container, .select_container").addClass("error").removeClass("success");
                }
            } else {
                var $closestInputContainer = $element.closest(".input-container, .select_container");
                $closestInputContainer.addClass("error").removeClass("success");
                $closestInputContainer.children('span.valid').remove();
            }
        },
        unhighlight: function(element, errorClass) {
            var $element = $(element);
            //$element.removeClass("required");
            if($element.attr("name") !== 'shipping_phone1'){
	            var valid_span = $('<span class="valid" style="display: block; clear: left">Valid field</span>');
	            if ($element.attr('groupname')) {
	                var groupname = $element.attr('groupname');
	                if(groupname = 'dobnorx'){

		                $(".select_container").find("span").remove();
	                	$('span[id^="sc123"]').remove();
	                	if( $('#date_of_birth_group-error').length ){
	                		
	                		$('#date_of_birth_group-error').remove();
	                		$(".date-parent").append("<span id=\"sc123\" class=\"valid\" style=\"display: block; clear: left; color: #00a651;font-size: 12px; background:url(../../assets/lc2_sprite.gif); content=''\">Valid field</span>");
		                	
	                	}
	                			
	                	 else
	                		 $(".date-parent").append("<span id=\"sc123\" class=\"valid\" style=\"display: block; clear: left; color: #00a651;font-size: 12px; background:url(../../assets/lc2_sprite.gif); content=''\">Valid field</span>");
	                	
	                	
	                }
	                else{
	                
	                
	                var $closestInputContainer = $('[groupname=' + groupname + ']').first().closest(".input-container, .select_container");
	                $('[groupname=' + groupname + ']').removeClass("error");
	                if (!$closestInputContainer.children('span.valid').length) {
	                    $closestInputContainer.append(valid_span);
	                    $('[groupname=' + groupname + ']').closest(".input-container, .select_container").addClass('success');
	                }

	                }
	            } else {
	                var $closestInputContainer = $element.closest(".input-container, .select_container");
	                if (!$closestInputContainer.children('span.valid').length)
	                    $closestInputContainer.addClass("success").removeClass("error").append(valid_span);
	            }
        	}
        },
        errorPlacement: function(element,error) {
        	
        	errorPlacement(element,error);
        	if( $('#date_of_birth_group-error').length )
       		 ;
       	 else
       		 $(".date-parent").append("<span id=\"sc123\" class=\"valid\" style=\"display: block; clear: left; color: #00a651;font-size: 12px; background:url(../../assets/lc2_sprite.gif); content=''\">Valid field</span>");
       	
        }


    };
}


function errorPlacementWithPhoneFields(error, element) {
    var elementName = element.attr('name');
    if (element.isGroupType('birth_')) {
    error.css("display", "block").attr('aria-live', 'rude');
    $('span[id^="sc123"]').remove();
    }
    
    if (element.isGroupType('_phone_')) {
        var lastPhoneFieldName = elementName.substr(0, elementName.length - 1) + "3";
        var $lastPhoneField = $("#checkoutContent [name=" + lastPhoneFieldName + "]");
        error.insertAfter($lastPhoneField);
    } else {
        if (element.hasClass('selectBox') && !$('.mobile').get(0)) {
            var visiblePartOfSelectBox = element.next("a");
            error.insertAfter(visiblePartOfSelectBox);
        } else if (element[0].id === 'text-prescription') {
            element.closest('.radio-required').append(error);
        } else if (element.isGroupType('birth_')) {
            element.parents(".date-parent").append(error);
        } else {
            error.insertAfter(element);
        }
    }


}

function errorPlacementWithCardFields(error, element) {
    var elementName = element.attr('name');
    error.css({
        "display": "block",
        "clear": "left"
    }).attr('aria-live', 'rude');

    if (element.isGroupType('_expire_')) {
        var $monthYearFields = $('.select_container');
        $monthYearFields.append(error);
    } else {
        var $inputContainer = element.closest(".input-container");
        $inputContainer.append(error);
    }
}

function errorPlacementStep5(error, element) {
    var elementName = element.attr('name');
    error.css("display", "block").attr('aria-live', 'rude');

    if (element.attr('name') === 'age') {
        element.parent().append(error);
    } else {
        error.insertAfter(element);
    }
}

function getStep1ValidationParams(submitHandler) {
    var rules = Object.assign({},
        PrescriptionValidationParams.getRules(),
        TextPrescriptionValidationParams.getRules(),
        UploadPrescriptionValidationParams.getRules(),
        CallPrescriptionValidationParams.getRules()
    );
    var messages = Object.assign({
            selectPrescription: MessageHelper.messages["ERROR_NoRadioSelected"]
        },
        PrescriptionValidationParams.getMessages(),
        TextPrescriptionValidationParams.getMessages(),
        UploadPrescriptionValidationParams.getMessages(),
        CallPrescriptionValidationParams.getMessages()
    );

    var groups = Object.assign({},
        UploadPrescriptionValidationParams.getGroups(),
        TextPrescriptionValidationParams.getGroups(),
        CallPrescriptionValidationParams.getGroups(),
        PrescriptionValidationParams.getGroups()
    );

    //var groups = Object.assign({}, PrescriptionValidationParams.getGroups());

    return getBasicValidationConfig(
        rules, messages, groups, errorPlacementWithPhoneFields, submitHandler);
}

function getStep2ValidationParams() {
    var rules = Object.assign({
        shipping_method: {
            required: true
        }
    }, BillingValidationParams.getRules(), ShippingValidationParams.getRules());
    var messages = Object.assign({}, BillingValidationParams.getMessages(), ShippingValidationParams.getMessages());

    var groups = Object.assign({}, ShippingValidationParams.getGroups());

    var submitHandler = function(form, successHandler) {
        var avalaraService = $(form).data('avalara-service');
        LC2.invokeAvalaraService(avalaraService, successHandler);
    };

    return getBasicValidationConfig(rules, messages, groups, errorPlacementWithPhoneFields, submitHandler);
}

function getStep3ValidationParams() {
    var rules = Object.assign({}, PaymentValidationParams.getRules());
    var messages = Object.assign({}, PaymentValidationParams.getMessages());
    var groups = Object.assign({}, PaymentValidationParams.getGroups());

    return getBasicValidationConfig(rules, messages, groups, errorPlacementWithCardFields);
}

function getStep5ValidationParams() {
    var rules = Object.assign({}, SigninValidationParams.getRules());
    var messages = Object.assign({}, SigninValidationParams.getMessages());
    var groups = Object.assign({}, SigninValidationParams.getGroups());


    return getBasicValidationConfig(rules, messages, groups, errorPlacementStep5);
}

// ---------------------------- End config getters -----------------------------

/* global jQuery */

//Used to fix console error, product undefined
var product = new Object();

(function($, LC2) {
    var pdpLensInfo;
    LC2.initPdpUtils();

    function initAccordionRelatedListeners() {
        var $accordionMenuLens = $('.accordion-menu-select-lens'),
            $addToCartButton = $('.add-to-cart'),
            $lensSelectionArea = $('#lens-selection-popup'),
            $mobileToggleAccordionButton = $('.accordion-menu-select-lens > li > a[rel=#select-a-lens-type]'),
            $mobileConfirmAccordionButton = $('#confirmAccordionButton'),
            $mobileAddToCartButton = $('.add-to-cart');

        var $popupMenuLens = $('#lens-selection-popup'),
	        $addToCartButton = $('.add-to-cart'),
	        $lensSelectionArea = $('#lens-selection-popup'),
	        $mobileToggleAccordionButton = $('.accordion-menu-select-lens > li > a[rel=#select-a-lens-type]'),
	        $mobileConfirmPopupButton = $('#confirmPopupButton'),
	        $mobileAddToCartButton = $('.add-to-cart'),
        	$mobileStep = $('.step-add-lens'),
        	$mobilePopupClose = $(".lens-selection-popup-header .close"),
        	$mobilePopupStepBack = $("#stepBackButton");
        
        
        var mobileRadioSelectedStep1 = '#select-a-lens-type input[type=radio][name=productId]',
            lensColorRadio = 'input[type=radio][name=lens]',
            stepBackButton = '#stepBackButton',
            step0Id = 'select-a-lens-step-0',
            step1Id = 'select-a-lens-type',
            step2Id = 'select-lens-step2',
            mobileSelectLensStep0 = '#' + step0Id,
            mobileSelectLensStep1 = '#' + step1Id,
            mobileSelectLensStep2 = '#' + step2Id;
        
        
        	$mobilePopupClose.on("click",function(){
        		
        		if($('input[name="onlyLastStepMounted"]').val() === "true") {
        			return false;
        		}
        		
	    	   	$("#lens-selection-popup").removeClass("show").addClass("hide");
	    	   	$("html, body").css("overflow-y", "scroll");
	    	   	$('.total-savings-ria').addClass('hide');
	    	    
	        	resetLensSelectionData();
    	   });

        var sourceUrl = $accordionMenuLens.data('sourceurl'),
            lensNotSelectedClass = 'lens-not-selected';
        console.log('LENS SERVICE', sourceUrl);
        $.ajax({
            url: sourceUrl,
            dataType: 'json',
            success: function(json) {
            	
            	pdpLensInfo = json;
                LC2.currentLenses = json;
                
                var validJson = LC2.pdpUtils.isLensJsonValid(pdpLensInfo);
                setAccordionButtonsListeners(validJson);
                if (validJson) {
                	
                	// MODAL INITIALIZATION
                    fillProductDL(json);
                    LC2.pdpUtils.addInfoToObj(pdpLensInfo);
                    
                    console.log('sourceUrl', sourceUrl);
                    console.log('pdpLensInfo', pdpLensInfo);
                    // MOUNT STEP 0
                    LC2.pdpUtils.mountStep(pdpLensInfo, '#lens-selection-area-template-0', '#lens-selection-area-0');
                    initAccordionTabs();
                    
                    var moreCategories = !(pdpLensInfo.lens_categories.length === 1 && pdpLensInfo.lens_categories[0].lenses.length === 1);
                    //LC2.pdpUtils.autoOpenLensSelection($mobileToggleAccordionButton);

                    if (moreCategories) {
                        
                    	$('a[rel=#select-a-lens-type]').removeClass('hide');
                    	
                    	// case step1 should be rendered
                        
                        pdpLensInfo.onlyStep1 = true;
                        LC2.pdpUtils.mountStep(pdpLensInfo, '#lens-selection-area-template', '#lens-selection-area');
                        LC2.accordionMenus();
                        initAccordionTabs();
                        
                        //$('#stepBackButton').removeClass("hide");
                        
                    } else {
                    	
                        var lens = pdpLensInfo.lens_categories[0].lenses[0];
                        
                   		$('#scrollBar .addToCart').removeClass('hide');
	
                    	
                        LC2.pdpUtils.printLensInfoIntoMenu({
                            name: lens.name,
                            listPrice: (RiaHelper.getInsuranceCookie() != "") ? lens.list_price : lens.current_price,
                            lens_id: lens.lens_id,
                            offerPrice: lens.saving,
                            UPC: lens.lens_color_categories[0].skus[0].lens_sku_code,
                            material: pdpLensInfo.lens_categories[0].name
                        });                        
                        if (!lens.onlyStep1) {
                            // case only step2 should be rendered
                            $('a[rel=#select-a-lens-type]').removeClass('hide');

                            var formattedJson = LC2.pdpUtils.formatJson(lens, pdpLensInfo, true);
                            formattedJson.onlySecondStep = true;
                            LC2.pdpUtils.mountStep(formattedJson, '#lens-selection-area-template-2', '#lens-selection-area-2');
                            showStep2($(mobileSelectLensStep1), $(mobileSelectLensStep2));
                            
                            // STEP DONE EXCEPT LAST ONE
                            $('.step-add-lens li').removeClass('active done').each(function(index) {
                            	if(index < $('.step-add-lens > li').length - 1) {
                            		$(this).addClass('done');
                            	} else {
                            		$(this).addClass('active');
                            	}
                            });
                            
                            // EMPTY STEP 0 IN CASE WAS MOUNTED
                            $('#select-a-lens-step-0').empty();
                            
                            // SET onlyLastStepMounted
                            $('input[name="onlyLastStepMounted"]').val(true);
                            
                            // Change text to CONTINUE button (from CONTINUE to APPLY)
                        	$('.button.apply').text('APPLY');
                        	
                        	// HIDE PICK YOUR LENS BUTTON
                        	$('a[rel="#select-a-lens-type"]').addClass('hide');
                            
                            initAccordionTabs();
                            var availableSkus = formattedJson.selectedItem.lens_color_categories[0].skus.length;
                            if (availableSkus === 1) {                                            	
                            	// in case of only one skus available, we want to be displayed the price and the button in edit mode justo on page's load
                                LC2.pdpUtils.printColor({
                                    color: pdpLensInfo.lens_categories[0].lenses[0].lens_color_categories[0].skus[0].color,
                                    lens_sku_id: pdpLensInfo.lens_categories[0].lenses[0].lens_color_categories[0].skus[0].lens_sku_id,
                                    lens_sku_code: pdpLensInfo.lens_categories[0].lenses[0].lens_color_categories[0].skus[0].lens_sku_code
                                });
                                //$mobileToggleAccordionButton.addClass('lens-selected');
                                //$mobileToggleAccordionButton.setAccordionButtonLabel();

                                //track apply lens
                                trackApplyLensToFrame(pdpLensInfo, lens.lens_id);

                                saveLensSelectionData(true);
                            }
                        } else {
                            // case no one step should be rendered
                            lensSelected = true;
                            $addToCartButton.addClass('st-button-orange').removeClass('lens-not-selected');
                            
                            LC2.pdpUtils.printColor({
                                color: pdpLensInfo.lens_categories[0].lenses[0].lens_color_categories[0].skus[0].color,
                                lens_sku_id: pdpLensInfo.lens_categories[0].lenses[0].lens_color_categories[0].skus[0].lens_sku_id,
                                lens_sku_code: pdpLensInfo.lens_categories[0].lenses[0].lens_color_categories[0].skus[0].lens_sku_code
                            });

                            //track apply lens
                            trackApplyLensToFrame(pdpLensInfo, lens.lens_id);

                            saveLensSelectionData(true, function(){
                            	$('.edit-lens').addClass('hide');	
                            });
                        }
                    }
                    
                    $(mobileSelectLensStep0).addClass('active-step');
                    // selection of Plano Lens logic
                    var planoCodeConfig = $('#planoCode').val();
                    var lensSelectedId = $.query.get("selectedLens");
                    var lensSelected = false;
                    if (!$('#lens-selection-area').hasClass('cart-lens-options') && !lensSelected) {
                        var planoFound = false;
                        var lensSelectedFound = false;
                        var autoSelectedLens = {};
                             
                        try {
                            jQuery.each(pdpLensInfo.lens_categories, function(i, lenscat) {
                                if(lensSelectedFound)
                                        return;
                                
                                jQuery.each(lenscat.lenses, function(j, lens) {
                                    if(lens.lens_id == lensSelectedId || lens.lens_code == planoCodeConfig){
                                    	
                                    	autoSelectedLens = lens;
                                    	autoSelectedLens['material'] = lenscat.name;
                                    	LC2.autoSelectedLens = autoSelectedLens;
                                    	
                                    	if (lens.lens_id == lensSelectedId) {
											lensSelectedFound = true;
											return false;
										}
                                    	
                                    	if (lens.lens_code == planoCodeConfig)
											planoFound = true;                                    	

                                        return false;
                                    }
                                });
                            });
                            
                            if (lensSelectedFound || planoFound) {
                            	
                            	LC2.pdpUtils.printLensInfoIntoMenu({
                            		name: autoSelectedLens.name,
									listPrice: autoSelectedLens.current_price,
									lens_id: autoSelectedLens.lens_id,
									offerPrice: autoSelectedLens.saving,
									originalPrice: autoSelectedLens.list_price,
									framePromoPrice: autoSelectedLens.framePromoPrice,
									material: autoSelectedLens.material,
									UPC: autoSelectedLens.lens_color_categories[0].skus[0].lens_sku_code
    							});
                                lensSelected = true;
                                $addToCartButton.addClass('st-button-orange').removeClass('lens-not-selected');

                                LC2.pdpUtils.printColor({
                                	color: autoSelectedLens.lens_color_categories[0].skus[0].color,
									lens_sku_id: autoSelectedLens.lens_color_categories[0].skus[0].lens_sku_id,
									lens_sku_code: autoSelectedLens.lens_color_categories[0].skus[0].lens_sku_code
    							});

                                //track apply lens
                                //trackApplyLensToFrame(pdpLensInfo, lens.lens_id);
                                
                                if (lensSelectedFound) {
                                	//LC2.pdpUtils.initLensSelectionSteps('prescription-lens', autoSelectedLens);
                                    $('.rx-lens-choice[data-lensid=' + autoSelectedLens.lens_id + ']').attr('checked', 'checked');
                                    $('.rx-lens-choice[data-lensid=' + autoSelectedLens.lens_id + ']').closest('.select-lens-type').addClass('active');
                                    lensSelected = true;
                                } else if (planoFound) {
                                	if (pdpLensInfo.lens_categories.length > 1 || pdpLensInfo.lens_categories[0].lenses.length > 1) {
                                        $(".lens-section .bold.existing-lens-name").css('display', 'none');
                                        $(".lens-section .existing-lens-color").css('display', 'none');
                                    } else {
                                        $(".lens-section .bold.existing-lens-name").text('Rx Not Available');
                                        $('.lens-section .existing-lens-name').show();
                                    }
                                }
                                
                                saveLensSelectionData();
                                
                                // RIA: make a call to RIA also if we have only the frame to check
                                if (RiaHelper.isInsuranceOn() && moreCategories && !planoFound && !lensSelectedFound){
                                    saveLensSelectionData(false, pdpLensInfo);
                                }

                               //_dl.products[0].applied_lenses[0].color = (pdpLensInfo.lens_categories[0].lenses[0].skus[0].color).toLowerCase();
                            	
                            }
                            
                        } catch (e) {
                            console.log("error: " + e.stack);
                        }
                        //saveLensSelectionData(true);

                    } else if (lensSelected && pdpLensInfo.lens_categories[0].lenses[0].lens_code == planoCodeConfig) {
                        //only plano mock lens available
                        $(".lens-section .bold.existing-lens-name").text('Rx Not Available');
                        $('.lens-section .existing-lens-name').show();
                    }
                    
                    // No prescription
                    $('.select-lens-type.plano-lens').on('click', function() {
                    	
                    	// Resets previuos selection
                    	$('#select-a-lens-step-0 .select-lens-type').removeClass('active').find('input[type="radio"]').prop('checked', false);
                    	
                    	// Plano lens selection state, check/uncheck radio option
                    	if(!$(this).hasClass('active')) {
                    		$(this).addClass('active').find('input[type="radio"]').prop('checked', true);
                    	} else {
                    		$(this).removeClass('active').find('input[type="radio"]').prop('checked', false);
                    	}
                    })
                    .on('keypress', function(e) {
				    	if(e.which === 13) {
				            $(this).trigger( 'click' );
				    	}
				    });
                    
                    // Single vision lens, check/uncheck radio option
                    $('#select-a-lens-step-0 .select-lens-type.single-vision-lens').on('click', function() {
                    	
                    	// Resets previuos selection
                    	$('.select-lens-type').removeClass('active').find('input[type="radio"]').prop('checked', false);
                    	
                    	// Single vision lens selection state
                    	if(!$(this).hasClass('active')) {
                    		$(this).addClass('active').find('input[type="radio"]').prop('checked', true);
                    	} else {
                    		$(this).removeClass('active').find('input[type="radio"]').prop('checked', false);
                    	}              	
                    })
                    .on('keypress', function(e) {
				    	if(e.which === 13) {
				            $(this).trigger( 'click' );
				    	}
				    });

                } else {
                    $('a[rel=#select-a-lens-type]').removeClass('hide');
                    fillProductDL();
                }
            },
            error: function(response) {
            	console.debug(response);
            }
        });
        
        $(document).on('click', '.lens-selection-modal-page .select-lens-type', function(e) {
            e.preventDefault();
            e.stopPropagation();
        	
        	// Resets previuos selection
        	$('#select-a-lens-type .select-lens-type').removeClass('active').find('input[type="radio"]').prop('checked', false);
        	
        	// Lens selection state, check/uncheck
        	if(!$(this).hasClass('active')) {
        		$(this).addClass('active').find('input[type="radio"]').prop('checked', true);
        	} else {
        		$(this).removeClass('active').find('input[type="radio"]').prop('checked', false);
        	}
        })
        .on('keypress', '.lens-selection-modal-page .select-lens-type', function(e) {
				    	if(e.which === 13) {
				            $(this).trigger( 'click' );
				    	}
				    });

        $lensSelectionArea.on('click', stepBackButton, function(e) {
            e.preventDefault();                        
            
            // If switching from PERFECT-YOUR-LENS to LENS-MATERIAL 
            if($('#lens-selection-popup .active-step').prop('id') === 'select-lens-step2') $('.button.apply').text('CONTINUE');
            
            if($('.lens-material-step').hasClass('active')) $mobilePopupStepBack.addClass("hide");            
            
            // In base a current step richiamo funzione
            if($('li.perfect-your-lens-step').hasClass('active')) {
            	toggleStep1Step2($(mobileSelectLensStep1), $(mobileSelectLensStep2));
            } else if($('li.lens-material-step').hasClass('active')) {
            	toggleStep1Step2($(mobileSelectLensStep0), $(mobileSelectLensStep1));
            }
            $mobileStep.find("li.active").removeClass("active").prev().prev().addClass("active").removeClass("done");        
           
        })
        .on('keypress', function(e) {
				    	if(e.which === 13) {
				            $(this).trigger( 'click' );
				    	}
				    });
/*
        $lensSelectionArea.on('click', lensColorRadio, function() {
            var $this = $(this);
            var $lensBoxToHightlight = $this.closest('.lens-holder.check-row');
            $lensBoxToHightlight.addClass('active');
            var $lensBoxToUnhiglight = $this.getAssociatedRadios().filter(':not(:checked)').closest('.lens-holder.check-row');
            $lensBoxToUnhiglight.removeClass('active');
        });
        */
        
        $lensSelectionArea.on('click', '.lens-holder', function(e) {
        	
        	e.preventDefault();
        	e.stopPropagation();
        	
        	// Uncheck all color radio, toggle active class
        	$('[id^="tab-color-"] input[name="lens"]').prop('checked', false);
        	$('[id^="tab-color-"] .lens-holder.check-row').removeClass('active');
        	
        	
        	// Check the selected one
            var $this = $(this);
            $this.find('input[name="lens"]').prop('checked', true);
            console.log('THIS', $this);
            $this.addClass('active');
        })
        .on('keypress', function(e) {
				    	if(e.which === 13) {
				            $(this).trigger( 'click' );
				    	}
				    });
        
        function setAccordionButtonsListeners(validJson) {
        	$mobileConfirmPopupButton.on('click', function(e) {
                e.preventDefault();
                if (validJson) {
                	
                    var $this = $(this);
    
                        var $currentStep = $('#lens-selection-popup .active-step');
                        var currentStepId = $currentStep.attr('id');
                        switch (currentStepId) {
                        	// FROM LENS-TYPE TO LENS-MATERIAL
                        	case step0Id:
                        		
                        		if($('input[name="lensType"]').val() && $('input[name="lensType"]:checked').val() === 'no-prescription') {
                        			
                        			resetLensSelectionData();
                        			
                        			// Close selecttion lens
                        			$("#lens-selection-popup").removeClass("show").addClass("hide");
                        			$("html, body").css("overflow-y", "scroll");           
                        			
                        			
                        		} else if($('input[name="lensType"]').val() && $('input[name="lensType"]:checked').val() === 'single-vision-lens') {
                        			
                        			$('.popup-table.current-price').hide();
                        			//check first tab RIA prices
                            		if (RiaHelper.isInsuranceOn()){
                            			
                            			var tabID = $('a[id^="t1-"].active').attr('id').substring(3);
                            			
                            			getRIAPricesForTab(tabID);
                        				$('a[id*="t1-"]').on('click', function(){
                        	    			var tabId = $(this).attr('id').substring(3);
                        	    			getRIAPricesForTab(tabId);
                        	    		});
                        	    	}else{
                        	    		$('.popup-table.current-price').show();
                        	    	}
                        			
                                	$('ul.step-add-lens > li').removeClass('active');               
                                	$('.lens-material-step').addClass('active');
                                	$('.lens-type-step').addClass('done');
                                	
                                	
                                    $('#stepBackButton').removeClass("hide");
                                	toggleStep1Step2($(mobileSelectLensStep0), $(mobileSelectLensStep1));
                                	
                                	_dl.site_events = {
                                    	"select_lens_material": "true"
                                    };
                                    callTrackAnalytics(_dl);
                        		}
                        	break;
                        	
                        	// FROM LENS-MATERIAL TO PERFECT-YOUR-LENS
                            case step1Id:
                            	
                            	var $checkedRadio = $('#' + step1Id + ' .select-lens-type input[name="productId"]:checked');
                            	var selectedLensType = $checkedRadio.val();
                            	
                                if(selectedLensType) {   

                                    var closeAction = function() {
                                        $("#lens-selection-popup").addClass("hide").removeClass("show");
                                        $("html, body").css("overflow-y", "scroll");
                                    };

                                    var productInfo = LC2.pdpUtils.getSelectedProductInfo($checkedRadio);
                                    LC2.pdpUtils.printLensInfoIntoMenu(productInfo);
                                    
                                    // Change text to CONTINUE button (from CONTINUE to APPLY)
                                	$('.button.apply').text('APPLY');
                                    
                                    var RIAEnhCount = 0;
                                    var formattedJson = {};
                                    
                                    if (!$checkedRadio.isOnlyStep1Radio()) {
                                        // Listeners for step2 required to be mounted
                                    	$mobileStep.find("li.active").addClass("done");
                                    	$mobileStep.find("li.active").removeClass("active").next().next().addClass("active");
                                    	
                                    	$mobilePopupStepBack.removeClass("hide");
                                        var selectedLensId = $checkedRadio.val();
                                        var radioContainerId = $checkedRadio.closest('.tab-pane').attr('id');
                                        var radioCategory = $('#lens-selection-modal-tabs a[href=#' + radioContainerId + ']').text();

                                        var pdpLensInfoSubset = LC2.pdpUtils.getPdpInfoSubset(pdpLensInfo, radioCategory, selectedLensId);
                                        formattedJson = LC2.pdpUtils.formatJson(pdpLensInfoSubset, pdpLensInfo, true);

                                        _dl.site_events = {
                                            "select_lens_tint": "true"
                                        };
                                        callTrackAnalytics(_dl);
                                        
                                        if (RiaHelper.isInsuranceOn()) {
                                        	var selectedLensEnh = pdpLensInfoSubset.ehnancements;
                                        	var selectedLensAddons = pdpLensInfoSubset.addons;
                                        	var selectedLensSkus = pdpLensInfoSubset.skus;
                                        	
                                        	if(typeof selectedLensEnh !== 'undefined' && selectedLensEnh.length > 0) {
                                        		
                                        		_dl.site_events = {
                                        		    "select_lens_enhancement": "true"
                                                };
                                                callTrackAnalytics(_dl);
                                        		
                                        		$.each(selectedLensEnh, function(index, elem) {
                                        			if (elem.isStepUpPackage == "false")
                                        				RIAEnhCount++;
                                        		});
                                        		
                                        		if (RIAEnhCount == 0 && (typeof selectedLensAddons == 'undefined' || selectedLensAddons.length == 0) &&
                                        			(typeof selectedLensSkus == 'undefined' || selectedLensSkus.length <= 1)) {
                                        			$checkedRadio.data('onlystep1', true);
                                        		}
                                        	}
                                        } else {
                                        	$('#lc-lens-enh-row').show();
                                        }
                                    }
                                    
                                    if (!$checkedRadio.isOnlyStep1Radio()) {
                                    	 LC2.pdpUtils.mountStepOnRadioClick(formattedJson, '#lens-selection-area-template-2',
                                    			 '#lens-selection-area-2', $checkedRadio, closeAction);
                                    	
                                    	if (RiaHelper.isInsuranceOn()) {
                        	            	if (RIAEnhCount > 0) {
                        	                	// Hide complete pair package enhancements when insurance on
                        	                	$('input[data-ispackage=true]').closest('.lc-lens-enh-item').hide();
                        	            	} else {
                        	        			// Hide enhancements row if none is RIA enabled
                        	        			$('#lc-lens-enh-row').hide();
                        	        		}
                        	            	$('.lc-lens-enh-price').hide();
                                    	}else{
                                    		$('.lc-lens-enh-price').show();
                                    	}
                                        
                                        toggleStep1Step2($(mobileSelectLensStep1), $(mobileSelectLensStep2));                
                                        initAccordionTabs();
                                        
                                        $('.lc-lens-enh-item label').on('click', function(e) {
                                        	
                                        	if (RiaHelper.isInsuranceOn()) {
                                                $('.calculate-price-enh').css('display', 'block');
                                                $('.ria-modal-calculated-price').hide();
                                            }
                                        	
                                            var div = $('.lc-lens-enh');
                                            $(this).closest('.lc-lens-enh-item').toggleClass('added');
                                            var input = $(this).find('input');
                                            var exclude = $(input).attr('data-excl').toString().split(',');

                                            if ($(this).closest('.lc-lens-enh-item').hasClass('added')) {
                                                $(exclude).each(function(index, element) {
                                                    var ele = $(div).find('input[data-pn="' + element + '"]');
                                                    $(ele).parent().hide();
                                                    $(ele).parent().parent().find('.lc-lens-enh-not-available').css('opacity', '0.5');
                                                    $(ele).parent().parent().find('.lc-lens-enh-not-available').show();
                                                    $(ele).closest('.lc-lens-enh-item').removeClass('added');
                                                    //$(ele).parent().find('span').text('Add enhancement');
                                                });
                                            } else {
                                                $(exclude).each(function(index, element) {
                                                    var ele = $(div).find('input[data-pn="' + element + '"]');
                                                    $(ele).parent().show();
                                                    $(ele).parent().parent().find('.lc-lens-enh-not-available').hide();
                                                });
                                            }
                                            return false;
                                        });
                                        
                                        $('.calculate-price-enh').on('click', function() {
                                        	getRIAPricesForEnhancements();
                                        });

                                        $("body").animate({
                                            scrollTop: $('#select-lens-step2').offset().top
                                        }, 200);
                                    } else {
                                        // Action to be triggered for no step2 case
                                        saveLensSelectionData();
                                        $addToCartButton.addClass('st-button-orange').removeClass('lens-not-selected');

                                        //track apply lens
                                        trackApplyLensToFrame(pdpLensInfo, $checkedRadio.attr('data-lensid'));

                                        var color = LC2.pdpUtils.getPropFromLensId(pdpLensInfo, 'color', $checkedRadio.val());
                                        var lens_sku_id = LC2.pdpUtils.getPropFromLensId(pdpLensInfo, 'lens_sku_id', $checkedRadio.attr('data-lensid'));
                                        var lens_sku_code = LC2.pdpUtils.getPropFromLensId(pdpLensInfo, 'lens_sku_code', $checkedRadio.attr('data-lensid'));
                                        
                                        if($('#planoCodeSku').val() != lens_sku_code){
                                        	$(".accordion-menu-select-lens").addClass("hide");
                                        	$('#scrollBar .addToCart').removeClass('hide');
                                        }else{
                                        	$(".accordion-menu-select-lens").removeClass("hide");
                                        }
                                        LC2.pdpUtils.printColor({
                                            color: color,
                                            lens_sku_id: lens_sku_id,
                                            lens_sku_code: lens_sku_code
                                        });
                                        closeAction();
                                    }
                                }
                            break;

                            // FROM PERFECT-YOUR-LENS TO PDP
                            case step2Id:
                                var $checkedLensColor = $(mobileSelectLensStep2).find('input[type=radio][name=lens]:checked');
                                if ($checkedLensColor.length) {
                                    var selectedLensId = $('.lens-hidden-data > .lensCatentryId').val();
                                    var selectedSkuId = $('.lens-color-actual').find('input[type=radio][name=lens]:checked').attr('data-skuid');
                                    var lens_sku_id = LC2.pdpUtils.getPropFromLensId(pdpLensInfo, 'lens_sku_id', selectedLensId, selectedSkuId);
                                    var color = LC2.pdpUtils.getPropFromLensId(pdpLensInfo, 'color', selectedLensId, selectedSkuId);
                                    var lens_sku_code = LC2.pdpUtils.getPropFromLensId(pdpLensInfo, 'lens_sku_code', selectedLensId, selectedSkuId);
                                    LC2.pdpUtils.printColor({
                                        color: color,
                                        lens_sku_id: lens_sku_id,
                                        lens_sku_code: lens_sku_code
                                    });

                                    //$mobileToggleAccordionButton.addClass('lens-selected');
                                    $(mobileSelectLensStep2).find('#lens-error').hide();
                                    //$mobileToggleAccordionButton.toggleOpenCloseAccordion();
                                    $popupMenuLens.addClass("hide");
                                    $("html, body").css("overflow-y", "scroll");
                                    anchoredPosition();
                                    $mobileAddToCartButton.removeClass(lensNotSelectedClass).addClass('st-button-orange').siblings('.select-lens-error-message').hide();
                                    $(".accordion-menu-select-lens").addClass("hide");
                                    $('#scrollBar .addToCart').removeClass('hide');
                                    //track apply lens
                                    trackApplyLensToFrame(pdpLensInfo, selectedLensId, selectedSkuId);

                                    saveLensSelectionData();
                                } else {
                                    $(mobileSelectLensStep2).find('#lens-error')
                                        .show()
                                        .prev()
                                        .scrollPageToMyPosition();
                                }
                                break;
                        }
 
                } else {
                	LC2.pdpUtils.openJsonInvalidModal('modal-json-error');
                }
            });
        }
    }

    function anchoredPosition() {
        $("body").scrollTop(0);
        $('body').animate({
            scrollTop: $('#productMainImage').offset().top
        }, 200);
    }

    function initializePdpListeners() {
        var lensNotSelectedMessage = 'select-lens-error-message';

        var $mobileAddToCartButton = $('.add-to-cart'),
            $mobileMainAddToCart = $('.product-options .add-to-cart, .product-options .add-to-cart-cl'),
            $mobileStickyAddToCart = $('.sticky-bottom');

//        if ($('.accordion-menu-select-lens').length > 0) {
//        	initAccordionRelatedListeners();
//        }

        $(window).on('scroll', function() {
            if ($mobileMainAddToCart) {
                var bottomLimit = $mobileMainAddToCart.offset() ? $mobileMainAddToCart.offset().top : null;
                if (bottomLimit) {
                    var topLimit = bottomLimit - screen.availHeight;

                    if (window.scrollY >= topLimit && window.scrollY <= bottomLimit) {
                        $mobileStickyAddToCart.addClass('hide');
                    } else {
                        $mobileStickyAddToCart.removeClass('hide');
                    }
                }
            }
        });
        
        /* START - PDP Perks logic */
        
		// perk box
		$('.info-dialog-pdp-mobile').each(function( index ) {
			var id = $(this).attr('id');
			var index = $(this).data('index');
			
			// perk box
			var titlePerk = $("#" + id + " .perk-espot > .perk-title-container>p").text();
			 $("#perk-accordion-title_"+index).text(titlePerk);
			var expiresPerk = $("#" + id + " .perk-espot .perk-content-container p:nth-child(2)").text();
			$("#perk-accordion-expires_" + index).text(expiresPerk.substr(6));
		});
		
		//perk accordion
		$(".perk-box").click(function(){
			$(this).find(".perk-check").toggleClass("perk-check-active");
			$(this).toggleClass("perk-box-active");
		});
		$(".perk-triangle").click(function(){
			$(".perk-accordion").toggle(300);
			$(this).toggleClass("perk-triangle-rotated");
		});
		// popup accordion
		$("[id*=more-info-dialog-mobile_]").dialog({
			autoOpen : false, 
			modal : true,
			open: function() {
					$(".ui-widget-overlay").addClass("black-overlay");
					$(".ui-dialog").addClass("st-dialog ui-corner-all perks-info-modal");
					}  
			});								  
		$("[class*=circle_]").click(function() {
			var counter = $(this).attr('class').substring(7);
		    $("[id*=more-info-dialog-mobile_"+counter+"]").dialog("open");
		    return false;
		 });		
        
       $('.perk-box').on('click', function() {
            var baseUrl = [location.protocol, '//', location.host, location.pathname].join('');
            var param = $.query.REMOVE("selectedPerkCode").REMOVE("selectedPerk");

            if ($(this).hasClass('perk-box-active'))
                var param = $.query.SET("selectedPerk", $(this).data('perkname')).SET("selectedPerkCode", $(this).children('.perk-check').data('perkcode'));
            
            var lens = $('.lens-hidden-data > .lensCatentryId').val();
			if(lens){
				$.query.REMOVE("selectedLens");
			    var param = $.query.SET("selectedLens", lens);
			}

            window.location.href = baseUrl + param.toString();
            return;
        });
        
        if($.query.get("selectedPerk") != ''){
        	var perkName = $.query.get("selectedPerk");
        	var $box = $(".perk-box[data-perkname="+perkName+"]")
        	$box.addClass('perk-box-active');
        	$box.children('.perk-check').addClass('perk-check-active');
        	$(".perk-triangle").click();
        }
        
        /* END - PDP Perks logic */

        $mobileAddToCartButton.on('click', function(e) {
            e.preventDefault();
            var $this = $(this);
            if (!lensSelected) {
                if (!$this.parent().find('.' + lensNotSelectedMessage).length) {
                    $this.parent().append(
                        '<span class="' + lensNotSelectedMessage + '">Please pick a lens before adding to cart<span>');
                }
            } else {
                ajaxAddGlassesToCart();
                $mobileAddToCartButton.text('Added To Bag');
                window.location = this.href;
            }
        });
    }

    $.fn.getRelatedLabel = function() {
        var $this = $(this);
        var checkedRadioId = $this.attr('id');
        return $this.parent().find('label[for=' + checkedRadioId + ']');
    };

    $.fn.renameRelatedLabel = function(newLabel) {
        var $this = $(this);
        var $relatedLabel = $this.getRelatedLabel();
        $relatedLabel.text(newLabel);
    };

    $.fn.scrollPageToMyPosition = function() {
        var position = $(this).offset().top;
        var offset = 100;
        window.scrollTo(0, position - offset);
    };

    $.fn.setAccordionButtonLabel = function() {
        var $this = $(this);
        if ($this.hasClass('expanded')) {
            $this.text('Add lenses');
        } else {
            $this.removeClass('st-button-orange');
            if ($this.hasClass('lens-selected')) {
                $this.text('Edit lens');
            } else {
                $this.text('Pick your lens');
            }
        }
    };

    $.fn.toggleOpenCloseAccordion = function(renameLabelHandler) {
        var $this = $(this);
        var $mobileAccordionSelectLens = $('.accordion-menu-select-lens .accordion');

        $mobileAccordionSelectLens.toggleClass('hide-accordion');
        $this.parent().toggleClass('expanded');
        $this.toggleClass('expanded');
        var $link = $('.accordion-menu-select-lens').children('li').children('a');
        $link.not($this).next().stop().slideUp('fast').parent().removeClass('expanded');
        $link.not($this).removeClass('expanded');
        var $sibling = $('.accordion-menu-select-lens').siblings().first();
        $sibling.removeClass('hide');
        $sibling.stop().slideToggle('fast');

        if ($this.hasClass('lens-selected')) {
            $('.product-images').scrollPageToMyPosition();
        }

        if (renameLabelHandler) {
            renameLabelHandler();
        } else {
            $this.setAccordionButtonLabel();
        }
    };

    $.fn.isOnlyStep1Radio = function() {
        return !!$(this).data('onlystep1');
    };

    function showStep($step) {
        $step.removeClass('hide').addClass('active-step');
    }

    function hideStep($step) {
        $step.addClass('hide').removeClass('active-step');
    }

    function showStep1($step1, $step2) {
        showStep($step1);
        hideStep($step2);
    }

    function showStep2($step1, $step2) {
        showStep($step2);
        hideStep($step1);
    }

    function toggleStep1Step2($step1, $step2) {
        if ($step1.hasClass('hide')) {
            showStep1($step1, $step2);
        } else {
            showStep2($step1, $step2);
        }
    }

    function renameLabelForOnlyStep1() {
        $('.accordion-menu-select-lens > li > a[rel=#select-a-lens-type]')
            .removeClass('st-button-orange')
            .text('Edit lens');
    }

    function initAccordionTabs() {
        var $mobileProductIdTabs = $('#lens-selection-modal-tabs > div.tab-panes > div'),
            $mobileProductIdTabsControllers = $('#lens-selection-modal-tabs > ul'),
            $mobileSelectLensStepTabsControllers = $('#select-a-lens-type > ul'),
            $mobileSelectLensStepTabs = $('#select-a-lens-type > .lens-selection-modal-page');

		var $mobileProductIdTabs = $('#lens-selection-modal-tabs > div.tab-panes > div');
		$.each($mobileProductIdTabs, function(index, value){
			if($(value).find('div.lenses').html().trim() == ''){
				var id = $(value).attr('id');
				$('a[href=#'+id+']').parent().remove();
				$(value).remove();
			}
		});
		var $mobileProductIdTabs = $('#lens-selection-modal-tabs > div.tab-panes > div');
		var $mobileProductIdTabsControllers = $('#lens-selection-modal-tabs > ul');
            
        $mobileProductIdTabsControllers.tabs($mobileProductIdTabs, {
            current: 'active',
	        initialIndex: 0, //$('#lens-selection-modal-tabs > ul > li >a.Poly').data('index') ? $('#lens-selection-modal-tabs > ul > li >a.Poly').data('index')-1 : 0, //LCDP-3732
            history: true
        });
        $mobileSelectLensStepTabsControllers.tabs($mobileSelectLensStepTabs);
        
        // LENS COLOR SELECTION
        var $mobileProductIdTabs2 = $('.lens-color-actual > div.tab-panes > div'),
	        $mobileProductIdTabsControllers2 = $('.lens-color-actual > ul');
	        // $mobileSelectLensStepTabsControllers = $('#select-a-lens-type > ul'),
	        // $mobileSelectLensStepTabs = $('#select-a-lens-type > .lens-selection-modal-page');
	    $mobileProductIdTabsControllers2.tabs($mobileProductIdTabs2, {
	        current: 'active',
	        history: true
	    });
	    //$mobileSelectLensStepTabsControllers.tabs($mobileSelectLensStepTabs);

        var dynamicWidth = parseInt($('#productMainImage').css('width'), 10);
        var dynamicHeight = parseInt($('#productMainImage').css('height'), 10);
        var s7_spinview = new s7viewers.SpinViewer({
            containerId: 's7_spinview',
            params: {
                asset: 'Lenscrafters/'+$('#pdp-frame-upc').val()+'_360',
                serverUrl: '//https://assets.lenscrafters.com/is/image/',
                contentRoot: '//https://assets.lenscrafters.com/is/skins/',
                stagesize: dynamicWidth + ',' + dynamicHeight,
                config: 'Scene7SharedAssets/Universal_HTML5_SpinSet_light'
            }
        });
        s7_spinview.setHandlers({
            initComplete: function() {
                $('#360View').removeClass('disabled').addClass('enabled');
                $('#s7_spinview').attr('style', 'display:none;');
                $('#360_scene7').removeClass('getout');
            }
        });
        s7_spinview.init();
        $(document).ready(function() {
            s7_spinview.handlers.initComplete();

        });
    }

    $(document).ready(function() {
        initializePdpListeners();

        
        var $selectEditLensButtons = $('.select-edit-lens, .edit-lens-link'),
        	$removeLensButtons = $('.remove-lens-link'),
        	step0Id = 'select-a-lens-step-0',
	        step1Id = 'select-a-lens-type',
	        step2Id = 'select-lens-step2',
	        mobileSelectLensStep0 = '#' + step0Id,
	        mobileSelectLensStep1 = '#' + step1Id,
	        mobileSelectLensStep2 = '#' + step2Id;
        
        // Sostituito da LensPanel Redesign 
//        $selectEditLensButtons.on('click', function(e) {
//           e.preventDefault();
//            if (LC2.pdpUtils.isLensJsonValid(pdpLensInfo)) {
//
//                LC2.pdpUtils.checkStepToBeHidden(showModalPage1, lensSelected);
//
//                _dl.site_events = {
//                    "select_lens_type": "true"
//                };
//                callTrackAnalytics(_dl);
//
//                /*$('.ui-widget-overlay').addClass('black-overlay');
//
//                openLensSelectionModal(false);*/
//                
//                $("#lens-selection-popup").addClass("show").removeClass("hide");
//                $('#scrollBar .addToCart').addClass('hide');
//
//                //check first tab RIA prices
//                if (RiaHelper.isInsuranceOn()) {
//
//                    var tabId = $('a[id^="t1-"].active').attr('id').substring(3);
//                    getRIAPricesForTab(tabId);
//                    $('a[id*="t1-"]').on('click', function() {
//                        var tabId = $(this).attr('id').substring(3);
//                        getRIAPricesForTab(tabId);
//                    });
//                }
//            }
//            if(!$("#select-a-lens-step-0").hasClass("active-step")){
//            	if ($(mobileSelectLensStep2).length == 1) {
//            		toggleStep1Step2($(mobileSelectLensStep0), $(mobileSelectLensStep2));
//            	} else {
//            		toggleStep1Step2($(mobileSelectLensStep0), $(mobileSelectLensStep1));
//            	}
//            	 $('.step-add-lens').find("li.active").removeClass("active");
//            	 $('.step-add-lens').find("li.done").removeClass("done");
//            	 $('.step-add-lens .lens-type-step').addClass("active");
//            	 $('.button.apply').text('CONTINUE');
//            	 $('#stepBackButton').addClass("hide");
//            }
//        });
        
//        $removeLensButtons.on('click', function(e){
//        	
//        	if($('input[name="onlyLastStepMounted"]').val() === "true") {
//    			return false;
//    		}
//        	$('#scrollBar .addToCart').addClass('hide');
//        	e.preventDefault();
//        	resetLensSelectionData();
//        	if($('#insurance-switch').hasClass('insurance-on')) $('#insurance-switch').click(); 
//        });
        
        
    });
    
    
    
})(jQuery, window.LC2);

/* global jQuery
getStep1ValidationParams
getStep2ValidationParams
getStep3ValidationParams
getStep5ValidationParams
addMessageHelperMessages
LC2
MessageHelper
 */

window.rightNowUrl = 'https://lenscrafters-ca--tst.custhelp.com/services/rest/connect/v1.3/contacts';
MessageHelper.setMessage(
    'ERROR_RN_AUTH',
    'There was an error while contacting our services');
MessageHelper.setMessage(
    'ERROR_RN_AJAX',
    'There was an error while contacting our services');
MessageHelper.setMessage(
    'ERROR_RN_GET_ATTACHMENTS',
    'There was an error while contacting our services');
MessageHelper.setMessage(
    'ERROR_RN_UPLOAD',
    'There was an error while uploading your prescription');
MessageHelper.setMessage(
    'ERROR_RN_FILESIZE',
    'The selected file is too big. Please select a smaller file');
MessageHelper.setMessage(
    'ERROR_RN_FILETYPE',
    'The selected file\'s type is not permitted. Please select a different file');
MessageHelper.setMessage(
    'ERROR_RN_REMOVE_ATTACHMENT',
    'There was an error while uploading your prescription');
MessageHelper.setMessage(
    'ERROR_RN_CONTACT',
    'There was an error while creating the contact');



(function($) {

    /**
     * Retreives the checkout form element.
     * It looks for the closest element with name 'step*'
     * or the first form with class 'checkout-form'.
     *
     * @param  {Object} el jquery element
     * @return {Object}    jquery element
     */
    function getClosestFormToSubmitButton(el) {
        var form = $(el).closest('form[name^="step"]');
        if (!form.length) {
            form = $('form.checkout-form').first();
        }
        return form;
    }


    function _fileBox(fileName, href) {
        var $prescriptionUploadMessage = $('#upload-form').find('.is-upload');
        var box_tmpl = '<div class="prescription-file">' +
            '<p class="inline-block file-uploaded">{{filename}}</p>' +
            '<a class="delete-link" tabindex="-1" ' +
            ' data-href="{{href}}">x Remove</a>' +
            '<p class="prescription-uploaded hide">' +
            '<span></span>Prescription uploaded</p>' +
            '<p class="prescription-notuploaded hide">' +
            '<span></span>Error uploading prescription, prescription not uploaded</p>' +
            '</div>';
        var box = box_tmpl
            .replace('{{filename}}', fileName).replace('{{href}}', href);
        $prescriptionUploadMessage.empty();
        $prescriptionUploadMessage.append(box);
    }

    /**
     * displayUploadedFileBoxes - Call the RightNow Api to get the list of attachments
     * and show a box for each of them. The box displays the file name and
     * a link to remove the attachment.
     */
    function displayUploadedFileBoxes() {
        var $prescriptionUploadMessage = $('#upload-form').find('.is-upload');
        $prescriptionUploadMessage.empty();
    }

    function displayFileBox(evt) {
        var f = evt.target.files[0];
        if (f) {
            _fileBox(f.name);
        }
    }

    function upload(f, fname, successHandler) {
        var reader = new FileReader(),
            maxFileSize = 1024 * 1024 * 5, // 5MB
            allowedContentTypes = [
                'image/png',
                'image/gif',
                'image/jpeg',
                'image/tiff',
                'image/bmp',
                'application/msword',
                'application/pdf',
                'application/x-iwork-pages-sffpages' // Apple iWork Pages
            ],
            prescription_file,
            $uploadLoader = $('.step-footer .lc-loader');

        $uploadLoader.show();
        if (f.size > maxFileSize) {
            $uploadLoader.hide();
            return showErrorMessage(window.MessageHelper.messages.ERROR_RN_FILESIZE);
        }
        if (allowedContentTypes.indexOf(f.type) === -1) {
            $uploadLoader.hide();
            return showErrorMessage(window.MessageHelper.messages.ERROR_RN_FILETYPE);
        }
        reader.onload = function(evt) {
            prescription_file = evt.target.result.split('base64,')[1];
            return rnGetContact()
                .pipe(rnGetAttachmentsList)
                .pipe(rnDeleteAttachments)
                .pipe(rnGetContact)
                .pipe(function(contact) {
                    return rnPostAttachment(
                        contact, prescription_file, fname);
                })
                .pipe(function() {
                    console.debug('Prescription uploaded');
                    $uploadLoader.hide();
                    successHandler();
                });
        };
        reader.readAsDataURL(f);
    }

    /**
     * handleFileUpload - this takes care of reading the file from the customer's
     * browser/os and start the upload process.
     *
     * @param {type} evt Description
     *
     */
    function handleFileUpload(successHandler) {
        var $fileField = $('#prescription'),
            f = $fileField[0].files[0],
            fname = f.name;
        return upload(f, fname, successHandler);
        // jQuery.apply(jQuery, jQuery.map($fileField, upload));
    }

    function handleFileRemove(evt) {
        evt.preventDefault();
        var href = $(evt.target).data().href;
        $(this).parent().remove();
        if (href !== undefined && href !== 'undefined') {
            rnDeleteAttachment(href);
        }
        $(evt.target).val('');
        $('input[name=upload_fileName]').val('')
    }


    function loadStepFunctions($button, mapStepInitializationCb) {
        var $formRef = getClosestFormToSubmitButton($button);
        var formName = $formRef.attr('name');
        var initCb;

        if (formName) {
            initCb = mapStepInitializationCb[formName];
        }
        if (initCb) {
            initCb();
        }
    }

    function initValidationPlugin($button, mapFormValidationParams) {
        var $formRef = getClosestFormToSubmitButton($button);
        var formName = $formRef.attr('name');

        var getValidationParams,
            submitHandler;

        if (formName) {
            getValidationParams = mapFormValidationParams[formName];
            if (formName === 'step1') {
                submitHandler = function(form, successHandler) {
                    handleFileUpload(successHandler);
                };
            }
        }
        if (getValidationParams) {
            return $formRef.validate(getValidationParams(submitHandler));
        }
        return false;
    }

    window.LCCheckoutValidator = null;

    function secureValidationPluginInit($button, mapFormValidationParams) {
        // Interval is necessary to avoid the function be triggered before MessageHelperInitialized
        // becames true. This might happen in case of discrepancy between jquery's ready CB and
        // dojo's addOnLoad one.

        // numChecks is supposed to make the function work even if the MessageHelperInitialized
        // variable gets never used by developers
        var numChecks = 0;
        var intervalDetachRef = setInterval(function() {
            if (window.MessageHelperInitialized || numChecks < 10) {
                window.LCCheckoutValidator = initValidationPlugin($button, mapFormValidationParams);
                clearInterval(intervalDetachRef);
            } else {
                numChecks++;
            }
        }, 100);

    }

    function initStep1Functions() {

        var $prescription = $('#checkoutContent input[type=radio][name=prescription]'),
        	$selectPrescription = $('#checkoutContent input[type=radio][name=selectPrescription]'),
            $twoDifferentPdLink = $('#ad_263473'),
            $popCartInfoLink = $('#pup-cart-info-link'),
            $selectRxPupilDistance = $('#rxPupilDistance').parent(),
            $popCartAccordion = $('#pup-cart-accordion'),
            $prescriptionUploadMessage = $('#upload-form').find('.is-upload'),
            $uploadLoader = $('.upload-prescription-form > .lc-loader');

        // LC: https://bitbucket.org/abstract-technology/lc.statictheme/issues/4/desktop-checkout-step-1-edit-mode
        // $selectRxPupilDistance.addClass('hide');

        var $doctorChoice = $('#doctor-info input[type=radio][name=searchDoctor]');
	    
	    $doctorChoice.on('change', function() {
        	var $doctorChoiceSelected = $('#doctor-info input[type=radio][name=searchDoctor]:checked').attr("rel");
            $("#"+ $doctorChoiceSelected +"").show();
            $("#"+ $doctorChoiceSelected +"").siblings(".doctor-info-choice").hide();
        });
        
        $('input[name=docInfoOrderItem]').each(function() {
            var $orderItemIdi = $(this).val();

            var $prescriptionUploadSection = $('#upload-form');
            var $prescriptionUploadButton = $prescriptionUploadSection.find('.upload-prescription');
            $prescriptionUploadField = $('#prescription-' + $orderItemIdi);
            $prescriptionUploadField.on('change', displayFileBox);

            $prescriptionUploadButton.on('click', function(e) {
                e.preventDefault();
                $prescriptionUploadField.click();

                _dl.site_events.submit_prescription_info = "true";
                callTrackAnalytics(_dl);

                // Bind the all the remove links for the uploaded prescriptions
                $prescriptionUploadMessage.on('click', '.prescription-file > a', handleFileRemove);
                $prescriptionUploadField.change();
            });

            //set space slicer formatter for phone fields
            var docPhoneInputTxt = $('.spaceTxtDocSlicedPhone-' + $orderItemIdi);
            docPhoneInputTxt.on('keyup change', function() {
                splitPhoneNumber(docPhoneInputTxt);
            });
            var docPhoneInputUpl = $('.spaceUplDocSlicedPhone-' + $orderItemIdi);
            docPhoneInputUpl.on('keyup change', function() {
                splitPhoneNumber(docPhoneInputUpl);
            });

            
            $prescription.add($selectPrescription).on('change', function() {

                var prescriptionMode = $('input[name=selectPrescription]:checked').val();

                if (prescriptionMode == 'uploadPrescription') {
                    _dl.site_events = {
                        "submit_prescription_info": "true"
                    };
                    delete _dl.site_events.add_prescription_view;
                    
                } else if (prescriptionMode == 'callDoctor') {
                	$('#search-doctor-name').click();
                } else {
                    delete _dl.site_events.submit_prescription_info;
                    _dl.site_events = {
                        "add_prescription_view": "true"
                    };
                }
                $(this).onSelectedChange();
            });


            $selectRxPupilDistance = $('#rxPupilDistance-' + $orderItemIdi).parent();
            //$popCartInfoLink = $('#pup-cart-info-link-'+$(this).val());
            $rxCheckbox = $('#rx-' + $orderItemIdi);

            //attach listeners to rx checkbox
            $rxCheckbox.change(function() {
                var $pdFieldsDiv = $('#pd-fields-box-' + $orderItemIdi);
                if (this.checked) {
                    $pdFieldsDiv.css("display", "block");
                    $popCartInfoLink.removeClass('hide');
                    $selectRxPupilDistance.removeClass('hide');
                } else {
                    $pdFieldsDiv.css("display", "none");
                    $popCartInfoLink.addClass('hide');
                    $selectRxPupilDistance.addClass('hide');
                }
            });
        });


        $twoDifferentPdLink.on('click', function(e) {
            e.preventDefault();
            $popCartAccordion.toggleClasses('closed', '');
        });

    }


    function initStep2Functions() {

        //check box refactoring
        var $checkboxBillingAddress = $('#checkoutContent input[type=checkbox][name=SameShippingAndBillingAddressCustom]');

        $checkboxBillingAddress
            .on('change', function() {
                $(this).onSelectedChange();

                if (_dl.site_events == undefined) {
                    _dl.site_events = {};
                }

                if ($('#checkoutContent input[type=radio][name=SameShippingAndBillingAddressCustom]:checked').val() != 'sameAsBilling') {
                    delete _dl.site_events.shipping_billing_view;
                    _dl.site_events.checkout_shipping_info = "true";
                } else {
                    delete _dl.site_events.shipping_billing_view;
                    _dl.site_events.checkout_shipping_info = "false";
                }

                callTrackAnalytics(_dl);
            });
    }

    function initStep3Functions() {

        var $allCardFields = $('.card-number input');
        $allCardFields.on('keyup keydown', function(e) {
            if (e.keyCode != 8) {
                LC2.filterOnlyDigitsInput(this);

                var blocks = $("input[name='payment_card_1']").val().replace(new RegExp(CheckoutPayments.cardSeparator, 'g'), '').match(/.{1,4}/g);
                $("input[name='payment_card_1']").val('');
                var newValue = $("input[name='payment_card_1']").val();
                if (blocks != null) {
                    var index = 0;
                    $.each(blocks, function(index, value) {
                        index++;
                        if (value.length == 4 && index < 4) {
                            value = value + CheckoutPayments.cardSeparator;
                        }
                        newValue = newValue + value;
                    });
                }

                $("input[name='payment_card_1']").val(newValue);

                var fullCardNumber = $("input[name='payment_card_1']").val().replace(new RegExp(CheckoutPayments.cardSeparator, 'g'), '');
                $('input[name=account]').val(fullCardNumber);

                var amex = /^3[47][0-9]{1,}$/;

                if ($('input[name=account]').val().length >= 4) {
                    if (amex.test(fullCardNumber)) {
                        $('#cvc_number').attr("placeholder", "1234");
                    } else {
                        $('#cvc_number').attr("placeholder", "123");
                    }
                }

                //getNextAssociatedField(this, e);
                verifyCC(fullCardNumber);
            } else if (e.keyCode == 8) {
                if ($("input[name='payment_card_1']").val().length == 1) {
                    $("#cardImageContainer span").removeClass("active");
                }
            }
        });

        initYearSelectbox();
    }

    function initYearSelectbox() {
        var $yearSelectbox = $('#expire_year_1');

        var today = new Date();
        var currentYear = today.getFullYear();
        var i;
        $yearSelectbox.append('<option value="">YYYY</option>');
        for (i = currentYear; i < (currentYear + 20); i++) {
            $yearSelectbox.append('<option value="' + i + '">' + i + '</option>');
        }
        $yearSelectbox.selectBox({
            mobile: true
        });
    }

    function verifyCC(cc) {
		
        var visa = /^4[0-9]{6,}$/;
        var mastercard = /^5[1-5][0-9]{5,}$/;
        var amex = /^3[47][0-9]{5,}$/;
        var discover = /^6[0245][0-9]{5,}$/;
    	var jcb = /^(?:2131|1800|35[0-9]{3})[0-9]{11}$/;


        $('#cardImageContainer span').removeClass('active');
        if (cc.length > 14) {
            if (visa.test(cc)) {
                $('#cardImageContainer .visa').addClass('active');
                $('#payMethodId_creditcard').val('Visa');
                $("#card_type").val("Visa");
                $("input[name=cc_brand]").val("Visa");
            }

            if (mastercard.test(cc)) {
                $('#cardImageContainer .mastercard').addClass('active');
                $('#payMethodId_creditcard').val('Master Card');
                $("#card_type").val("Master Card");
                $("input[name=cc_brand]").val("Master Card");
            }

            if (amex.test(cc)) {
                $('#cardImageContainer .amex').addClass('active');
                $('#payMethodId_creditcard').val('AMEX');
                $("#card_type").val("AMEX");
                $("input[name=cc_brand]").val("AMEX");
            }

            if (discover.test(cc)) {
                $('#cardImageContainer .discover').addClass('active');
                $('#payMethodId_creditcard').val('Discover');
                $("#card_type").val("Discover");
                $("input[name=cc_brand]").val("Discover");
            }

            if (jcb.test(cc)) {
            	$('#cardImageContainer .discover').addClass('active');
            	$('#payMethodId_creditcard').val('JCB');
            	$("#card_type").val("JCB");
            	$("input[name=cc_brand]").val("JCB");
            }
        }
    }

    function getNextAssociatedField(thisRef, triggeredEvent) {
        if ((!/[a-zA-Z]/.test(triggeredEvent.key) || !/[a-zA-Z]/.test(triggeredEvent.keyCode)) && thisRef.maxLength === thisRef.value.length) {
            var nextFieldName = thisRef.name.substr(0, thisRef.name.length - 1) + (parseInt(thisRef.name[thisRef.name.length - 1], 10) + 1);
            var $nextField = $('input[name=' + nextFieldName + ']');
            if ($nextField.get(0)) {
                $nextField.focus();
            }
        }
    }

    $(document).ready(function() {
        var $phone_1 = $('input[name$=phone_1]'),
            $phone_2 = $('input[name$=phone_2]'),
            $phone_3 = $('input[name$=phone_3]'),
            $resetFieldButton = $('#reset-all-field-button'),
            $submitStepButton = $('.go-to-the-next-step'),
            $footerBackButton = $('.step-footer .footer-back-btn'),
            $altSubmitLink = $('.checkout-submit-alt');

        $(document).on('click', '#submitZipCode', function(){
    		var insertedZipValue = $('.WC__ShoppingCartAddressEntryForm_step2_zipCode_1').val();
    		//zipcode validation
    		var validZip = validateZipCode(insertedZipValue);
    		if(validZip){
    			calculateTaxesEstimate(insertedZipValue);
    			$('#estimateTaxErrorSpan').css("display", "none");
    		}
    		else{
    			$('#estimateTaxErrorSpan').css("display", "inline-block");			
    		}
    	});
        
        // These maps are based on the step's main form's "name".
        var mapFormValidationParams = {
            step1: getStep1ValidationParams,
            step2: getStep2ValidationParams,
            step3: getStep3ValidationParams,
            step4: getStep5ValidationParams,
            step5: getStep1ValidationParams
        };

        var mapStepInitializationCb = {
            step1: initStep1Functions,
            step2: initStep2Functions,
            step3: initStep3Functions,
            step5: initStep1Functions
        };

        //initValidationPluginForTaxEstimate($estimateTaxesButton, mapFormValidationParams);

        // Initializations
        loadStepFunctions($submitStepButton, mapStepInitializationCb);
        secureValidationPluginInit($submitStepButton, mapFormValidationParams);
        addMessageHelperMessages();


        // Input skip on max length reached
        var $checkoutSkipInputs = $('.checkout-form input[maxlength]').not('input[type="hidden"]');

        $checkoutSkipInputs.on('keyup', function(e) {
            var $this = $(this);
            var maxLength = parseInt($this.attr("maxlength"), 10);
            var currentLength = $this.val().length;

            if ($this.attr('name') == 'payment_card_1') {
                var activeId = $('#cardImageContainer .active').attr('id');
                if (activeId != null && activeId == 'AMEX') {
                    maxLength = maxLength - 1;
                }
            }
            
            if ($this.attr('name') == 'shipping_phone1') {
            	return;
            }

            if (currentLength >= maxLength) {
                var $thisIndex = $checkoutSkipInputs.index($this);
                if ($thisIndex < ($checkoutSkipInputs.length - 1))
                    $checkoutSkipInputs[$thisIndex + 1].focus();
            }
        });

        $('.checkout-steps > ul > li > a').on('click', function(e) {
            e.preventDefault();
            LC2.pdpUtils.checkoutStepBackConfirm('checkout-step-back', null, this);
        });

        $altSubmitLink.on('click', function(evt) {
            evt.preventDefault();
            var $form = getClosestFormToSubmitButton(this);
            $form.submit();
        });

        $phone_1.add($phone_2).add($phone_3).on('input', function() {
            var $associatedHiddenPhone = $(this).getAssociatedGroupHiddenField('_phone_');
            if ($associatedHiddenPhone) {
                $associatedHiddenPhone.val($phone_1.val() + $phone_2.val() + $phone_3.val());
            }
        });

        $phone_1.add($phone_2).add($phone_3).on('keyup', function(e) {
            LC2.filterOnlyDigitsInput(this);
            getNextAssociatedField(this, e);
        });

        $resetFieldButton.on('click', function(e) {
            e.preventDefault();
            var $formToReset = getClosestFormToSubmitButton(this),
                validator = window.LCCheckoutValidator;

            if ($(".checkout-step-1").length > 0) {
                $.each($("form", ".checkout-step-1"), function(i, el) {
                    $(el)[0].reset();
                });
                $.each($("input:checked", ".checkout-step-1"), function(i, el) {
                    var el = "#" + $(el).attr("rel");
                    $(el).removeClass("closed");
                });
                $.each($("input:not(:checked)", ".checkout-step-1"), function(i, el) {
                    var el = "#" + $(el).attr("rel");
                    $(el).addClass("closed");
                });
            }

            if ($(".checkout-step-3").length > 0) {
                $("#cardImageContainer span").removeClass("active");
            }

            $formToReset[0].reset();

            if ($("#ShippingAddr").length > 0) {
                if (typeof $("#ShippingAddr input:checked").attr("rel") == "undefined") {
                    $("#ShippingAddr #shippingAddressForm ").addClass("closed");
                } else {
                    $("#ShippingAddr #shippingAddressForm ").removeClass("closed");
                }
            }

            var $selectBox = $('select.selectBox', $formToReset);

            if ($selectBox.length) {
                $selectBox.selectBox('refresh');
            }

            if (validator) {
                $formToReset.find('.error, .success').removeClass('error success');
                $formToReset.find('.input-container span.valid, .select_container span.valid').remove();
                validator.resetForm(); //remove error class on name elements and clear history
                validator.reset(); //remove all error and success data
            }

        });


        $('#checkout-back-warning .no-response').on('click', function(evt) {
            evt.preventDefault();
            $('.ui-dialog-titlebar-close').trigger('click');
        });
        
        $(document).on('click', 'dd.bv-rating-ratio-count', function() {
        	var  reviewsA = $('a[href="#reviews"]');        	
        	        	
        	if(!reviewsA.hasClass('expanded')) reviewsA.click();
        	
        	$('html, body').animate({ 
        		scrollTop: reviewsA.offset().top 
        	});
        });

    });
})(jQuery);


/* global jQuery, LC2
*/

function showIdmePromoCodes() {
	var $promo = $('.content-block-promoCodeIdme');
	var $toggle = $('#toggleIDMEPromoCode');
	var $toggleText = $toggle.text();
	if(!$promo.hasClass('showPromo')){
		$promo.addClass('showPromo');
		$promo.removeClass('hide');
		$toggle.text($toggleText.replace("+","-"));
		$toggle.attr("data-element-id","D_CartPage_IDme_Open");
		$(".idme-trigger-link.idme-unify-button").attr("data-element-id","D_CartPage_IDme_CTA");
	}else{
		$promo.removeClass('showPromo');
		$promo.addClass('hide');
		$toggle.text($toggleText.replace("-","+"));	
		$toggle.removeAttr("data-element-id");
		}
}

function showPromoCodes() {
	var $promo = $('.content-block-promoCode');
	var $toggle = $('#togglePromoCode');
	
	if(!$promo.hasClass('showPromo')){
		$promo.addClass('showPromo');
		$promo.removeClass('hide');
		$toggle.text('Do you have a promo code?');
		$toggle.attr("data-element-id","D_CartPage_PromoCode_Open");
	}else{
		$promo.removeClass('showPromo');
		$promo.addClass('hide');
		$toggle.text('Do you have a promo code?');
		$toggle.removeAttr("data-element-id");
	}
}

function initColorLensSelection(){
	$('.size-container.current').parent().parent().removeClass('hide');
	$('.sibling-container').click(function(){
		var color = $(this).data('color');
		$('.sibling-container').removeClass('current');
		$(this).addClass('current');
		$(".pdp-product-siblings-section.size").addClass('hide');
		$('#pdp-product-siblings-section-' + color).removeClass('hide');
	});
}

(function($){
  $( document ).ready(function() {
	  
    $('input[type=submit].form-submit-button').on('click', function(e){
      e.preventDefault();
      var form = $(this).closest('form');
      var callbackRef = $(form).data('callback');
      var callbackWrapper = function(){};

      if(callbackRef){
        callbackWrapper = function(){
          LC2.submitStepData(callbackRef, form);
        };
      }
      var avalaraService = $(form).data('avalara-service');
      if(avalaraService){
        LC2.invokeAvalaraService(avalaraService, callbackWrapper);
      }
      else{
        callbackWrapper();
      }
    });

    var $radioBillingAddress = $('#myInfo input[type=radio][name=SameShippingAndBillingAddressCustom]');
    $radioBillingAddress
      .on('change', function(){
        $(this).onSelectedChange();
    });
    
    $('.edit-addr').on('click', function(){
    	var formArea = $(this).closest('.form-area');
    	formArea.find('.data-addr').removeClass('hide');
    	formArea.find('.insert-manually').slideDown(200);
    	formArea.find('.address_summary').removeClass('show');
    });
    
    $(document).on("click", "#togglePromoCode", function(){
    	$("#togglePromoCode").toggleClass("open");
    	if ( $('#promotionCodeShowContent').is(':visible')){
    		var _dlCopy = $.extend(true, {}, _dl);
    		_dlCopy.site_events = {"expose_promo_code_form": "true"};	
    		callTrackAnalytics(_dlCopy);
    	}
    	showPromoCodes();
    })
    .on("keydown", "#togglePromoCode", function(e){
		if(e.keyCode == 13){
			$(this).trigger('click');
		}
    });
    
    $(document).on("click", "#toggleIDMEPromoCode", function(){
    	$("#toggleIDMEPromoCode").toggleClass("open");
    	if ( $('#promotionCodeIdmeShowContent').is(':visible')){
    		var _dlCopy = $.extend(true, {}, _dl);
    		_dlCopy.site_events = {"expose_promo_code_form": "true"};	
    		callTrackAnalytics(_dlCopy);
    	}
    	showIdmePromoCodes();
    })
    .on("keydown", "#toggleIDMEPromoCode", function(e){
		if(e.keyCode == 13){
			$(this).trigger('click');
		}
    });
    
    $("#processToPayment").on("click", function(){
        var _dlCopy = $.extend(true, {}, _dl);
        _dlCopy.site_events = {"submit_shipping_billing": "true"};    
      	callTrackAnalytics(_dlCopy);
    });
    
    $(".shoppingCartForward").on("click", function(){
        var _dlCopy = $.extend(true, {}, _dl);
        _dlCopy.site_events = {"edit_order_summary": "true"};    
      	callTrackAnalytics(_dlCopy);
    });
    
    $("#WC_ShippingAddressSelectSingle_link_1").on("click", function(){
        var _dlCopy = $.extend(true, {}, _dl);
        _dlCopy.site_events = {"edit_shipping_address": "true"};    
      	callTrackAnalytics(_dlCopy);
    });
    
	$(document).on("click", "#ShippingSigninLink", function(){
        var _dlCopy = $.extend(true, {}, _dl);
        _dlCopy.site_events = {"sign_in_click": "true"};   
        callTrackAnalytics(_dlCopy);
	});
	
    $(document).on("click", "#editShipping", function(){
        var _dlCopy = $.extend(true, {}, _dl);
        _dlCopy.site_events = {"edit_shipping_method": "true"};   
        callTrackAnalytics(_dlCopy);
    }); 
    
    $("#create-account").on("click", function(){
        var _dlCopy = $.extend(true, {}, _dl);
        _dlCopy.site_events = {"create_an_account_click": "true"};    
      	callTrackAnalytics(_dlCopy);
    });

    $("#sign-in").on("click", function(){
        var _dlCopy = $.extend(true, {}, _dl);
        _dlCopy.site_events = {"sign_in_click": "true"};    
      	callTrackAnalytics(_dlCopy);
    });
    
    $("#provide-prescription").on("click", function(){
        var _dlCopy = $.extend(true, {}, _dl);
        _dlCopy.site_events = {"submit_thank_you_page": "true"};    
      	callTrackAnalytics(_dlCopy);
    });
    
    
    $("#upload-prescription").on("click", function(){
        var _dlCopy = $.extend(true, {}, _dl);
        _dlCopy.site_events = {"select_prescrition_method": "true"};    
        _dlCopy.prescription_method = "upload";
        var indexEl = $("#currentItemIndex").val();
        if ( indexEl>=0 && _dl.products_in_cart != undefined && _dl.products_in_cart.length > indexEl ) {
        	_dlCopy.product = [_dl.products_in_cart[indexEl]];
        }
      	callTrackAnalytics(_dlCopy);
    });
    
    $("#diffPDClick").on("click", function(){
    	if ( $("#diffPDClick").hasClass('expanded') ){
	        var _dlCopy = $.extend(true, {}, _dl);
	        _dlCopy.site_events = {"pupillary_distance_different": "true"};    
	        var indexEl = $("#currentItemIndex").val();
	        if ( indexEl>=0 && _dl.products_in_cart != undefined && _dl.products_in_cart.length > indexEl ) {
	        	_dlCopy.product = [_dl.products_in_cart[indexEl]];
	        }
	        callTrackAnalytics(_dlCopy);
	    }
	});
    
    $("#call-doctor").on("click", function(){
        var _dlCopy = $.extend(true, {}, _dl);
        _dlCopy.site_events = {"select_prescrition_method": "true"};    
        _dlCopy.prescription_method = "call";
        var indexEl = $("#currentItemIndex").val();
        if ( indexEl>=0 && _dl.products_in_cart != undefined && _dl.products_in_cart.length > indexEl ) {
        	_dlCopy.product = [_dl.products_in_cart[indexEl]];
        }
      	callTrackAnalytics(_dlCopy);
    });  
    
    $("#text-prescription").on("click", function(){
        var _dlCopy = $.extend(true, {}, _dl);
        _dlCopy.site_events = {"select_prescrition_method": "true"};    
        _dlCopy.prescription_method = "text";
        var indexEl = $("#currentItemIndex").val();
        if ( indexEl>=0 && _dl.products_in_cart != undefined && _dl.products_in_cart.length > indexEl ) {
        	_dlCopy.product = [_dl.products_in_cart[indexEl]];
        }
      	callTrackAnalytics(_dlCopy);
    });  
    
    $('#ShipToAnotherAddress').on('change', function(){
    	if ($(this).prop('checked')){   
    		$('#billingCreateEditArea1').slideUp(200, function(){    			
    			$(this).addClass('closed');
    		});
    	}else{    		
    		$('#billingCreateEditArea1').removeClass('closed').hide().slideDown(200);
    	}
    });
    
    $('.toggle-summary, .summary-arrow').on('click', function(){
    	$(this).closest('.frame-recap').find('.cart-d').slideToggle(200, function(){
    		$('.toggle-summary').toggleClass('open');
    	});
    });
    
    $(".use-different").on("click", function(){
    	$(this).parent().addClass('hide');
    	var manually = $(this).closest('.form-area').find('.insert-manually');
    	manually.find('.data-addr').removeClass('hide');
    	manually.removeClass('hide').hide().slideDown(200)    	
    });
    
    if($('.view-state').length > 0){
    	$('.view-state').each(function(){        	
        	$(this).text(getStateTextFromIdExt($(this).text()));
        });
    } 
    
    initColorLensSelection();
  });
  
  $(document).on("keypress", "#total_breakdown .calculate-tax", function(e) {
  	if(e.which === 13) {
          $(".calculate").trigger( 'click' );
  	}
  });
  $(document).on("click", ".calculate", function() {
	    if (!$('.show-tax').is(':visible')) {
	        var _dlCopy = $.extend(true, {}, _dl);
	        _dlCopy.site_events = {
	            "toggle_estimated_taxes": "true"
	        };
	        callTrackAnalytics(_dlCopy);
	    }
	    $(".show-tax").slideToggle(200);
	    $(this).toggleClass("open");
	});

})(jQuery);

if (navigator.userAgent.match(/Android|IEMobile|BlackBerry/i)){
	$(document).on('focus', 'input', function() {
	    $(".progress-sticky").hide();
	}).on('blur', 'input', function() {
	    $(".progress-sticky").show();
	});
}

function splitPhoneNumber(phoneInputTF){

var insertedText = phoneInputTF.val().replace(/ /g,'');
var phone = insertedText;
if(insertedText.length > 3 && insertedText.length < 7 )
	phone = insertedText.replace(/(\d{3})(\d{3})/, '$1 $2');
if(insertedText.length >= 7)
	phone = insertedText.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');

phoneInputTF.val(phone);

}

function getStateTextFromIdExt(stateTextId){
	  var stateTextMap = [];
	  stateTextMap["AL"] = "Alabama";stateTextMap["AK"] = "Alaska";stateTextMap["AZ"] = "Arizona";stateTextMap["AR"] = "Arkansas";stateTextMap["CA"] = "California";stateTextMap["CO"] = "Colorado";stateTextMap["CT"] = "Connecticut";stateTextMap["DE"] = "Delaware";stateTextMap["DC"] = "District of Columbia";stateTextMap["FL"] = "Florida";stateTextMap["GA"] = "Georgia";stateTextMap["HI"] = "Hawaii";stateTextMap["ID"] = "Idaho";stateTextMap["IL"] = "Illinois";stateTextMap["IN"] = "Indiana";stateTextMap["IA"] = "Iowa";stateTextMap["KS"] = "Kansas";stateTextMap["KY"] = "Kentucky";stateTextMap["LA"] = "Louisiana";stateTextMap["ME"] = "Maine";stateTextMap["MD"] = "Maryland";stateTextMap["MA"] = "Massachusetts";stateTextMap["MI"] = "Michigan";stateTextMap["MN"] = "Minnesota";stateTextMap["MS"] = "Mississippi";stateTextMap["MO"] = "Missouri";stateTextMap["MT"] = "Montana";stateTextMap["NE"] = "Nebraska";stateTextMap["NV"] = "Nevada";stateTextMap["NH"] = "New Hampshire";stateTextMap["NJ"] = "New Jersey";stateTextMap["NM"] = "New Mexico";stateTextMap["NY"] = "New York";stateTextMap["NC"] = "North Carolina";stateTextMap["ND"] = "North Dakota";stateTextMap["OH"] = "Ohio";stateTextMap["OK"] = "Oklahoma";stateTextMap["OR"] = "Oregon";stateTextMap["PA"] = "Pennsylvania";stateTextMap["RI"] = "Rhode Island";stateTextMap["SC"] = "South Carolina";stateTextMap["SD"] = "SouthDakota";stateTextMap["TN"] = "Tennessee";stateTextMap["TX"] = "Texas";stateTextMap["UT"] = "Utah";stateTextMap["VT"] = "Vermont";stateTextMap["VA"] = "Virginia";stateTextMap["WA"] = "Washington";stateTextMap["WV"] = "West Virginia";stateTextMap["WI"] = "Wisconsin";stateTextMap["WY"] = "Wyoming";stateTextMap["AA"] = "Armed Forces Americas";stateTextMap["AE"] = "Armed Forces Europe";stateTextMap["AP"] = "Armed Forces Pacific";stateTextMap["AB"] = "Alberta";stateTextMap["BC"] = "British Columbia";stateTextMap["MB"] = "Manitoba";stateTextMap["NL"] = "Newfoundland and Labrador";stateTextMap["NB"] = "New Brunswick";stateTextMap["NT"] = "Northwest Territories";stateTextMap["NS"] = "Nova Scotia";stateTextMap["NU"] = "Nunavut";stateTextMap["ON"] = "Ontario";stateTextMap["PE"] = "Prince Edward Island";stateTextMap["QC"] = "Qu&#233;bec";stateTextMap["SK"] = "Saskatchewan";stateTextMap["YT"] = "Yukon Territory";
	  return stateTextMap[stateTextId.toUpperCase()];
}

$(document).on('keypress', 'label[for^=eighteen_older]', function(e) {
	if(e.which === 13) {
		var my_selector='#'+this.getAttribute('for');
        $(my_selector).trigger( 'click' );
	}
})

/*WCAG R2020.1*/
$(document).on('keypress','#shippingSelector>span', function(e) {
		if(e.which === 13) {
        $(this).trigger('click');
	}
})
.on('keypress','.plp-actions>div:not(.faceted_search).view>a', function(e) {
		if(e.which === 13) {
        $(this).trigger('click');
	}
});


function showFileDetails(itemId) {
	var $modal = $("#rx_modal_image");

    var req = new XMLHttpRequest();
     req.open("GET", '/wcs/resources/store/' + constants.ajaxParams['storeId'] + '/provideprescription/download/item/'+itemId, true);
     req.responseType = "blob";
     req.onload = function (event) {
        if(req.response.size > 0){
         	 var blob = req.response;
             $modal.find('.rx-image').attr('src', window.URL.createObjectURL(blob));
             $modal.toggleClass('hidden')
	         $('body').toggleClass('hidden-overflow')
         }   
	     
     };

     req.send();
}
