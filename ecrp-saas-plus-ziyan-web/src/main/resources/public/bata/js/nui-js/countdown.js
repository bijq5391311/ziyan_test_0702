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

	module.exports = __webpack_require__(159);


/***/ },

/***/ 3:
/***/ function(module, exports) {

	/* globals __VUE_SSR_CONTEXT__ */

	// this module is a runtime utility for cleaner component module output and will
	// be included in the final webpack user bundle

	module.exports = function normalizeComponent (
	  rawScriptExports,
	  compiledTemplate,
	  injectStyles,
	  scopeId,
	  moduleIdentifier /* server only */
	) {
	  var esModule
	  var scriptExports = rawScriptExports = rawScriptExports || {}

	  // ES6 modules interop
	  var type = typeof rawScriptExports.default
	  if (type === 'object' || type === 'function') {
	    esModule = rawScriptExports
	    scriptExports = rawScriptExports.default
	  }

	  // Vue.extend constructor export interop
	  var options = typeof scriptExports === 'function'
	    ? scriptExports.options
	    : scriptExports

	  // render functions
	  if (compiledTemplate) {
	    options.render = compiledTemplate.render
	    options.staticRenderFns = compiledTemplate.staticRenderFns
	  }

	  // scopedId
	  if (scopeId) {
	    options._scopeId = scopeId
	  }

	  var hook
	  if (moduleIdentifier) { // server build
	    hook = function (context) {
	      // 2.3 injection
	      context = context || (this.$vnode && this.$vnode.ssrContext)
	      // 2.2 with runInNewContext: true
	      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
	        context = __VUE_SSR_CONTEXT__
	      }
	      // inject component styles
	      if (injectStyles) {
	        injectStyles.call(this, context)
	      }
	      // register component module identifier for async chunk inferrence
	      if (context && context._registeredComponents) {
	        context._registeredComponents.add(moduleIdentifier)
	      }
	    }
	    // used by ssr in case component is cached and beforeCreate
	    // never gets called
	    options._ssrRegister = hook
	  } else if (injectStyles) {
	    hook = injectStyles
	  }

	  if (hook) {
	    // inject component registration as beforeCreate hook
	    var existing = options.beforeCreate
	    options.beforeCreate = existing
	      ? [].concat(existing, hook)
	      : [hook]
	  }

	  return {
	    esModule: esModule,
	    exports: scriptExports,
	    options: options
	  }
	}


/***/ },

/***/ 159:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _countdown = __webpack_require__(160);

	var _countdown2 = _interopRequireDefault(_countdown);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* istanbul ignore next */
	_countdown2.default.install = function (Vue) {
	  Vue.component(_countdown2.default.name, _countdown2.default);
	};

	exports.default = _countdown2.default;

/***/ },

/***/ 160:
/***/ function(module, exports, __webpack_require__) {

	var Component = __webpack_require__(3)(
	  /* script */
	  __webpack_require__(161),
	  /* template */
	  __webpack_require__(162),
	  /* styles */
	  null,
	  /* scopeId */
	  null,
	  /* moduleIdentifier (server only) */
	  null
	)

	module.exports = Component.exports


/***/ },

/***/ 161:
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	//
	//
	//
	//
	//
	//
	//
	//

	exports.default = {
	  name: 'ElCountdown',
	  data: function data() {
	    return {
	      time: '',
	      clear: false
	    };
	  },

	  props: {
	    date: {
	      type: String
	    },
	    callback: {
	      type: Function,
	      default: ''
	    },
	    format: String,
	    type: String
	  },
	  mounted: function mounted() {
	    var _this = this;

	    var time = setInterval(function () {
	      if (_this.clear) {
	        clearInterval(time);
	      } else {
	        _this.timeDown();
	      }
	    }, 500);
	  },

	  methods: {
	    timeDown: function timeDown() {
	      var endTime = new Date(this.date);
	      var nowTime = new Date();
	      var remainingTime = parseInt((endTime.getTime() - nowTime.getTime()) / 1000, 10);
	      /* 倒计时结束，清除计时器 */
	      if (remainingTime <= 0) {
	        this.clear = true;
	        this._callback();
	      }
	      if (this.type === 'HMS') {
	        var h = void 0,
	            m = void 0,
	            s = void 0;
	        /* 小时 */
	        h = this.formatFun(parseInt(remainingTime / (60 * 60) % 24, 10));
	        /* 分钟 */
	        m = this.formatFun(parseInt(remainingTime / 60 % 60, 10));
	        /* 秒数 */
	        s = this.formatFun(parseInt(remainingTime % 60, 10));
	        if (remainingTime <= 0) {
	          h = m = s = '0' + 0;
	        }
	        if (this.format === 'HH:MM:SS') {
	          this.time = h + ':' + m + ':' + s;
	        } else {
	          this.time = h + '时' + m + '分' + s + '秒';
	        }
	      } else {
	        /* 秒数 */
	        var _s = remainingTime;
	        if (remainingTime <= 0) {
	          _s = 0;
	        }
	        if (this.format === 'SS') {
	          this.time = _s + 's';
	        } else {
	          this.time = _s + '秒';
	        }
	      }
	    },

	    /* 格式化时间，小于10的进行0的补位 */
	    formatFun: function formatFun(time) {
	      if (time >= 10) {
	        return time;
	      } else {
	        return '0' + time;
	      }
	    },
	    _callback: function _callback() {
	      this.callback();
	    }
	  }
	};

/***/ },

/***/ 162:
/***/ function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('span', {
	    staticClass: "el-countdown",
	    attrs: {
	      "callback": _vm.callback
	    }
	  }, [_vm._v("\n  " + _vm._s(_vm.time) + "\n")])
	},staticRenderFns: []}

/***/ }

/******/ });