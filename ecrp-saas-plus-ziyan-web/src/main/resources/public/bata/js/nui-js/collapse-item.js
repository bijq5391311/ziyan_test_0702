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

	module.exports = __webpack_require__(136);


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

/***/ 136:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _collapseItem = __webpack_require__(137);

	var _collapseItem2 = _interopRequireDefault(_collapseItem);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* istanbul ignore next */
	_collapseItem2.default.install = function (Vue) {
	  Vue.component(_collapseItem2.default.name, _collapseItem2.default);
	};

	exports.default = _collapseItem2.default;

/***/ },

/***/ 137:
/***/ function(module, exports, __webpack_require__) {

	var Component = __webpack_require__(3)(
	  /* script */
	  __webpack_require__(138),
	  /* template */
	  __webpack_require__(140),
	  /* styles */
	  null,
	  /* scopeId */
	  null,
	  /* moduleIdentifier (server only) */
	  null
	)

	module.exports = Component.exports


/***/ },

/***/ 138:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _collapseTransition = __webpack_require__(139);

	var _collapseTransition2 = _interopRequireDefault(_collapseTransition);

	var _emitter = __webpack_require__(20);

	var _emitter2 = _interopRequireDefault(_emitter);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

	exports.default = {
	  name: 'ElCollapseItem',

	  componentName: 'ElCollapseItem',

	  mixins: [_emitter2.default],

	  components: { ElCollapseTransition: _collapseTransition2.default },

	  data: function data() {
	    return {
	      contentWrapStyle: {
	        height: 'auto',
	        display: 'block'
	      },
	      contentHeight: 0,
	      //        switchMenu: false,
	      switchDefault: true
	    };
	  },


	  props: {
	    title: String,
	    name: {
	      type: [String, Number],
	      default: function _default() {
	        return this._uid;
	      }
	    },
	    contentSwitch: {
	      type: Boolean,
	      default: false
	    },
	    beforeClickGroup: Function,
	    beforeClickMenu: Function
	  },
	  computed: {
	    isActive: function isActive() {
	      return this.$parent.activeNames.indexOf(this.name) > -1;
	    },
	    isMenuCheck: function isMenuCheck() {
	      return this.$parent.activeNames.indexOf(this.name) > -1;
	    },
	    switchMenu: function switchMenu() {
	      var menu = void 0;
	      if (this.$parent.activeNames.indexOf(this.name) > -1 && !this.switchDefault) {
	        menu = true;
	      } else if (!(this.$parent.activeNames.indexOf(this.name) > -1) && this.switchDefault) {
	        menu = false;
	      }
	      return menu;
	    }
	  },

	  watch: {
	    'isActive': function isActive(value) {}
	  },

	  created: function created() {
	    this.collapsedOnClickHeader = this.$parent.collapsedOnClickHeader;
	  },


	  methods: {
	    handleHeaderClick: function handleHeaderClick() {
	      this.dispatch('ElCollapse', 'item-click', this);
	    },

	    // 点击“caret”图标是否有回调
	    handleClickGroup: function handleClickGroup() {
	      var _this = this;

	      if (typeof this.beforeClickGroup === 'function') {
	        var call = function call() {
	          _this.clickGroup();
	        };
	        this.beforeClickGroup(call, this);
	      } else {
	        this.clickGroup();
	      }
	      this.$emit('click-group');
	    },

	    // 点击“menu”图标是否有回调
	    handleClickMenu: function handleClickMenu() {
	      var _this2 = this;

	      if (typeof this.beforeClickMenu === 'function') {
	        var call = function call() {
	          _this2.clickMenu();
	        };
	        this.beforeClickMenu(call, this);
	      } else {
	        this.clickMenu();
	      }
	      this.$emit('click-menu');
	    },
	    clickGroup: function clickGroup() {
	      this.switchDefault = true;
	      this.switchMenu = false;
	      this.handleHeaderClick();
	    },
	    clickMenu: function clickMenu() {
	      if (this.switchMenu) {
	        this.switchMenu = false;
	        this.handleHeaderClick();
	      } else {
	        this.switchMenu = true;
	        this.switchDefault = false;
	        if (!this.isActive) {
	          this.handleHeaderClick();
	        }
	      }
	    }
	  },

	  mounted: function mounted() {}
	};

/***/ },

/***/ 139:
/***/ function(module, exports) {

	module.exports = require("nui-js/lib/transitions/collapse-transition");

/***/ },

/***/ 140:
/***/ function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "el-collapse-item",
	    class: {
	      'is-active': _vm.isActive
	    }
	  }, [(_vm.collapsedOnClickHeader) ? _c('div', {
	    staticClass: "el-collapse-item__header is-handle",
	    on: {
	      "click": _vm.handleHeaderClick
	    }
	  }, [_c('i', {
	    staticClass: "el-collapse-item__header__arrow el-icon-arrow-right"
	  }), _vm._t("title", [_vm._v(_vm._s(_vm.title))])], 2) : _c('div', {
	    staticClass: "el-collapse-item__header"
	  }, [_c('i', {
	    staticClass: "el-collapse-item__header__arrow el-icon-arrow-right",
	    on: {
	      "click": _vm.handleHeaderClick
	    }
	  }), _vm._t("title", [_vm._v(_vm._s(_vm.title))]), (_vm.contentSwitch) ? _c('i', {
	    staticClass: "el-collapse-item__header__caret el-icon-caret-top",
	    on: {
	      "click": function($event) {
	        _vm.handleClickGroup.call()
	      }
	    }
	  }) : _vm._e(), (_vm.contentSwitch) ? _c('i', {
	    staticClass: "el-collapse-item__header__menu el-icon-menu",
	    class: {
	      'is-clicked': _vm.switchMenu
	    },
	    on: {
	      "click": function($event) {
	        _vm.handleClickMenu.call()
	      }
	    }
	  }) : _vm._e()], 2), _c('el-collapse-transition', [_c('div', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.isActive),
	      expression: "isActive"
	    }],
	    staticClass: "el-collapse-item__wrap"
	  }, [_c('div', {
	    staticClass: "el-collapse-item__content"
	  }, [(_vm.switchDefault) ? _vm._t("default") : _vm._e(), (_vm.switchMenu) ? _vm._t("menu") : _vm._e()], 2)])])], 1)
	},staticRenderFns: []}

/***/ }

/******/ });