module.exports =
/******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "/dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(125);


/***/ },

/***/ 125:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _directive = __webpack_require__(126);

	var _directive2 = _interopRequireDefault(_directive);

	var _prototype = __webpack_require__(129);

	var _prototype2 = _interopRequireDefault(_prototype);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  install: function install(Vue) {
	    Vue.use(_directive2.default);
	    Vue.prototype.$clipboard = _prototype2.default;
	  },

	  directive: _directive2.default,
	  proto: _prototype2.default
	};

/***/ },

/***/ 126:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _clipboard = __webpack_require__(127);

	var _clipboard2 = _interopRequireDefault(_clipboard);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var install = function install(Vue) {
	  Vue.directive('Clipboard', _clipboard2.default);
	};

	if (window.Vue) {
	  window.clipboard = _clipboard2.default;
	  Vue.use(install); // eslint-disable-line
	}

	_clipboard2.default.install = install;
	exports.default = _clipboard2.default;

/***/ },

/***/ 127:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	var Clipboard = __webpack_require__(128);
	if (!Clipboard) {
	  throw new Error('you shold npm install `clipboard` --save at first ');
	};

	exports.default = {
	  bind: function bind(el, binding) {
	    if (binding.arg === 'success') {
	      el._v_clipboard_success = binding.value;
	    } else if (binding.arg === 'error') {
	      el._v_clipboard_error = binding.value;
	    } else {
	      var clipboard = new Clipboard(el, {
	        text: function text() {
	          return binding.value;
	        },
	        action: function action() {
	          return binding.arg === 'cut' ? 'cut' : 'copy';
	        }
	      });
	      clipboard.on('success', function (e) {
	        var callback = el._v_clipboard_success;
	        callback && callback(e); // eslint-disable-line
	      });
	      clipboard.on('error', function (e) {
	        var callback = el._v_clipboard_error;
	        callback && callback(e); // eslint-disable-line
	      });
	      el._v_clipboard = clipboard;
	    }
	  },
	  update: function update(el, binding) {
	    if (binding.arg === 'success') {
	      el._v_clipboard_success = binding.value;
	    } else if (binding.arg === 'error') {
	      el._v_clipboard_error = binding.value;
	    } else {
	      el._v_clipboard.text = function () {
	        return binding.value;
	      };
	      el._v_clipboard.action = function () {
	        return binding.arg === 'cut' ? 'cut' : 'copy';
	      };
	    }
	  },
	  unbind: function unbind(el, binding) {
	    if (binding.arg === 'success') {
	      delete el._v_clipboard_success;
	    } else if (binding.arg === 'error') {
	      delete el._v_clipboard_error;
	    } else {
	      el._v_clipboard.destroy();
	      delete el._v_clipboard;
	    }
	  }
	};

/***/ },

/***/ 128:
/***/ function(module, exports) {

	module.exports = require("clipboard");

/***/ },

/***/ 129:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _clipboard = __webpack_require__(128);

	var _clipboard2 = _interopRequireDefault(_clipboard);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	if (!_clipboard2.default) {
	  throw new Error('you should npm install `clipboard` --save at first ');
	};
	var copytext = function copytext(_text) {
	  if (typeof Promise !== 'undefined') {
	    return new Promise(function (resolve, reject) {
	      // eslint-disable-line
	      var fake_el = document.createElement('button');
	      var clipboard = new _clipboard2.default(fake_el, {
	        text: function text() {
	          return _text;
	        },
	        action: function action() {
	          return 'copy';
	        }
	      });
	      clipboard.on('success', function (e) {
	        clipboard.destroy();
	        resolve(e);
	      });
	      clipboard.on('error', function (e) {
	        clipboard.destroy();
	        reject(e);
	      });
	      fake_el.click();
	    });
	  }
	};
	exports.default = copytext;

/***/ }

/******/ });