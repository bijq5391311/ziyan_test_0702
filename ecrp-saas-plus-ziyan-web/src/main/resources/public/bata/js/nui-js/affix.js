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
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _affix = __webpack_require__(2);

	var _affix2 = _interopRequireDefault(_affix);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* istanbul ignore next */
	_affix2.default.install = function (Vue) {
	  Vue.component(_affix2.default.name, _affix2.default);
	};

	exports.default = _affix2.default;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Component = __webpack_require__(3)(
	  /* script */
	  __webpack_require__(4),
	  /* template */
	  __webpack_require__(7),
	  /* styles */
	  null,
	  /* scopeId */
	  null,
	  /* moduleIdentifier (server only) */
	  null
	)

	module.exports = Component.exports


/***/ },
/* 3 */
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
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _dom = __webpack_require__(5);

	var _popup = __webpack_require__(6);

	//
	//
	//
	//
	//
	//
	//

	function getScroll(target, top) {
	  var prop = top ? 'pageYOffset' : 'pageXOffset';
	  var method = top ? 'scrollTop' : 'scrollLeft';

	  var ret = target[prop];

	  if (typeof ret !== 'number') {
	    ret = window.document.documentElement[method];
	  }

	  return ret;
	}

	function getOffset(element) {
	  var rect = element.getBoundingClientRect();

	  var scrollTop = getScroll(window, true);
	  var scrollLeft = getScroll(window);

	  var docEl = window.document.body;
	  var clientTop = docEl.clientTop || 0;
	  var clientLeft = docEl.clientLeft || 0;

	  return {
	    top: rect.top + scrollTop - clientTop,
	    left: rect.left + scrollLeft - clientLeft
	  };
	}

	exports.default = {
	  name: 'ElAffix',
	  props: {
	    offsetTop: {
	      type: Number,
	      default: 0
	    },
	    offsetBottom: {
	      type: Number
	    }
	  },
	  data: function data() {
	    return {
	      affix: false,
	      styles: {}
	    };
	  },

	  computed: {
	    offsetType: function offsetType() {
	      var type = 'top';
	      if (this.offsetBottom >= 0) {
	        type = 'bottom';
	      }

	      return type;
	    },
	    fixedStyles: function fixedStyles() {
	      if (this.affix) {
	        return {
	          'position': 'fixed',
	          'zIndex': _popup.PopupManager.nextZIndex()
	        };
	      }
	    }
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

	  methods: {
	    handleScroll: function handleScroll() {
	      var affix = this.affix;
	      var scrollTop = getScroll(window, true);
	      var elOffset = getOffset(this.$el);
	      var windowHeight = window.innerHeight;
	      var elHeight = this.$el.getElementsByTagName('div')[0].offsetHeight;

	      // Fixed Top
	      if (elOffset.top - this.offsetTop < scrollTop && this.offsetType === 'top' && !affix) {
	        this.affix = true;
	        this.styles = {
	          top: this.offsetTop + 'px',
	          left: elOffset.left + 'px',
	          width: this.$el.offsetWidth + 'px'
	        };

	        this.$emit('on-change', true);
	      } else if (elOffset.top - this.offsetTop > scrollTop && this.offsetType === 'top' && affix) {
	        this.affix = false;
	        this.styles = null;

	        this.$emit('on-change', false);
	      }

	      // Fixed Bottom
	      if (elOffset.top + this.offsetBottom + elHeight > scrollTop + windowHeight && this.offsetType === 'bottom' && !affix) {
	        this.affix = true;
	        this.styles = {
	          bottom: this.offsetBottom + 'px',
	          left: elOffset.left + 'px',
	          width: this.$el.offsetWidth + 'px'
	        };

	        this.$emit('on-change', true);
	      } else if (elOffset.top + this.offsetBottom + elHeight < scrollTop + windowHeight && this.offsetType === 'bottom' && affix) {
	        this.affix = false;
	        this.styles = null;

	        this.$emit('change', false);
	      }
	    }
	  }
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("nui-js/lib/utils/dom");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("nui-js/lib/utils/popup");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', [_c('div', {
	    staticClass: "el-affix",
	    style: ([_vm.fixedStyles, _vm.styles])
	  }, [_vm._t("default")], 2)])
	},staticRenderFns: []}

/***/ }
/******/ ]);