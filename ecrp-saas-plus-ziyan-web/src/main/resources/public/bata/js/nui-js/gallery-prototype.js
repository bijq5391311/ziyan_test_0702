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

	module.exports = __webpack_require__(232);


/***/ },

/***/ 105:
/***/ function(module, exports) {

	module.exports = require("vue");

/***/ },

/***/ 232:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _prototype = __webpack_require__(233);

	var _prototype2 = _interopRequireDefault(_prototype);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* istanbul ignore next */
	exports.default = {
	  install: function install(Vue) {
	    Vue.prototype.$gallery = _prototype2.default;
	  },

	  Proto: _prototype2.default
	};

/***/ },

/***/ 233:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	__webpack_require__(234);

	__webpack_require__(235);

	var _blueimpGallery = __webpack_require__(236);

	var _blueimpGallery2 = _interopRequireDefault(_blueimpGallery);

	var _vue = __webpack_require__(105);

	var _vue2 = _interopRequireDefault(_vue);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	if (!_blueimpGallery2.default) {
	  throw new Error('you should npm install `blueimp-gallery` --save at first ');
	};
	// 用于Vue.prototype 上的一个全局方法 $gallery
	// 使用时需要 再放置空标签<el-gallery></el-gallery>
	var gallery = function gallery(links, options) {
	  if (_vue2.default.prototype.$isServer) return;
	  var instance = typeof _blueimpGallery2.default.Gallery !== 'undefined' ? _blueimpGallery2.default.Gallery : _blueimpGallery2.default;
	  return instance(links, options);
	};
	exports.default = gallery;

/***/ },

/***/ 234:
/***/ function(module, exports) {

	module.exports = require("blueimp-gallery/css/blueimp-gallery.min.css");

/***/ },

/***/ 235:
/***/ function(module, exports) {

	module.exports = require("blueimp-gallery/js/blueimp-gallery-fullscreen.js");

/***/ },

/***/ 236:
/***/ function(module, exports) {

	module.exports = require("blueimp-gallery/js/blueimp-gallery.js");

/***/ }

/******/ });