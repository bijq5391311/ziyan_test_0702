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

	module.exports = __webpack_require__(29);


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

/***/ 5:
/***/ function(module, exports) {

	module.exports = require("nui-js/lib/utils/dom");

/***/ },

/***/ 29:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _backTop = __webpack_require__(30);

	var _backTop2 = _interopRequireDefault(_backTop);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* istanbul ignore next */
	_backTop2.default.install = function (Vue) {
	  Vue.component(_backTop2.default.name, _backTop2.default);
	};

	exports.default = _backTop2.default;

/***/ },

/***/ 30:
/***/ function(module, exports, __webpack_require__) {

	var Component = __webpack_require__(3)(
	  /* script */
	  __webpack_require__(31),
	  /* template */
	  __webpack_require__(32),
	  /* styles */
	  null,
	  /* scopeId */
	  null,
	  /* moduleIdentifier (server only) */
	  null
	)

	module.exports = Component.exports


/***/ },

/***/ 31:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _dom = __webpack_require__(5);

	var prefixCls = 'el-back-top'; //
	//
	//
	//
	//
	//
	//
	//
	//

	exports.default = {
	  name: 'elBackTop',
	  props: {
	    height: {
	      type: Number,
	      default: 400
	    },
	    bottom: {
	      type: Number,
	      default: 30
	    },
	    right: {
	      type: Number,
	      default: 30
	    },
	    duration: {
	      type: Number,
	      default: 1000
	    }
	  },
	  data: function data() {
	    return {
	      backTop: false
	    };
	  },
	  mounted: function mounted() {
	    //            window.addEventListener('scroll', this.handleScroll, false);
	    //            window.addEventListener('resize', this.handleScroll, false);
	    (0, _dom.on)(window, 'scroll', this.handleScroll);
	    (0, _dom.on)(window, 'resize', this.handleScroll);
	  },
	  beforeDestroy: function beforeDestroy() {
	    //            window.removeEventListener('scroll', this.handleScroll, false);
	    //            window.removeEventListener('resize', this.handleScroll, false);
	    (0, _dom.off)(window, 'scroll', this.handleScroll);
	    (0, _dom.off)(window, 'resize', this.handleScroll);
	  },

	  computed: {
	    classes: function classes() {
	      var _ref;

	      return ['' + prefixCls, (_ref = {}, _ref[prefixCls + '__show'] = this.backTop, _ref)];
	    },
	    styles: function styles() {
	      return {
	        bottom: this.bottom + 'px',
	        right: this.right + 'px'
	      };
	    },
	    innerClasses: function innerClasses() {
	      return prefixCls + '__inner';
	    }
	  },
	  methods: {
	    handleScroll: function handleScroll() {
	      this.backTop = window.pageYOffset >= this.height;
	    },
	    back: function back() {
	      var sTop = document.documentElement.scrollTop || document.body.scrollTop;
	      (0, _dom.scrollTop)(window, sTop, 0, this.duration);
	      this.$emit('click');
	    }
	  }
	};

/***/ },

/***/ 32:
/***/ function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    class: _vm.classes,
	    style: (_vm.styles),
	    on: {
	      "click": _vm.back
	    }
	  }, [_vm._t("default", [_c('div', {
	    class: _vm.innerClasses
	  }, [_c('i', {
	    staticClass: "el-icon-arrow-up ivu-icon-chevron-up"
	  })])])], 2)
	},staticRenderFns: []}

/***/ }

/******/ });