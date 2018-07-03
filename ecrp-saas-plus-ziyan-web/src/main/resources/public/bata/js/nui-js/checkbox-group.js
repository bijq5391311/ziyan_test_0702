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

	module.exports = __webpack_require__(121);


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

/***/ 20:
/***/ function(module, exports) {

	module.exports = require("nui-js/lib/mixins/emitter");

/***/ },

/***/ 23:
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports.getText = getText;
	/**
	 * 获取表单组件文本框、复选框、单选框、下拉等组件的选中后文本（输入框显示的文本）
	 */
	function getText(text, value, format) {
	  if (typeof format === 'function') {
	    return format(text, value);
	  } else {
	    return text;
	  }
	  // if (format) format();
	};

/***/ },

/***/ 121:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _checkboxGroup = __webpack_require__(122);

	var _checkboxGroup2 = _interopRequireDefault(_checkboxGroup);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* istanbul ignore next */
	_checkboxGroup2.default.install = function (Vue) {
	  Vue.component(_checkboxGroup2.default.name, _checkboxGroup2.default);
	};

	exports.default = _checkboxGroup2.default;

/***/ },

/***/ 122:
/***/ function(module, exports, __webpack_require__) {

	var Component = __webpack_require__(3)(
	  /* script */
	  __webpack_require__(123),
	  /* template */
	  __webpack_require__(124),
	  /* styles */
	  null,
	  /* scopeId */
	  null,
	  /* moduleIdentifier (server only) */
	  null
	)

	module.exports = Component.exports


/***/ },

/***/ 123:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _emitter = __webpack_require__(20);

	var _emitter2 = _interopRequireDefault(_emitter);

	var _getText2 = __webpack_require__(23);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  name: 'ElCheckboxGroup',

	  componentName: 'ElCheckboxGroup',

	  mixins: [_emitter2.default],

	  props: {
	    value: {},
	    min: Number,
	    max: Number,
	    size: String,
	    fill: String,
	    textColor: String
	  },

	  watch: {
	    value: function value(_value) {
	      this.dispatch('ElFormItem', 'el.form.change', [_value]);
	    }
	  },
	  methods: {
	    // 转换或获得文本框的值 event
	    getText: function getText(format) {
	      var _this = this;

	      var currentText = [];
	      this.value.forEach(function (value) {
	        _this.$children.forEach(function (child) {
	          if (child.label === value) {
	            if (child.$el.innerText !== undefined) {
	              currentText.push(child.$el.innerText);
	            } else {
	              // 火狐浏览器兼容
	              currentText.push(child.$el.textContent);
	            }
	          }
	        });
	      });
	      return (0, _getText2.getText)(currentText.join(','), this.value, format);
	    }
	  }
	};

/***/ },

/***/ 124:
/***/ function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "el-checkbox-group"
	  }, [_vm._t("default")], 2)
	},staticRenderFns: []}

/***/ }

/******/ });