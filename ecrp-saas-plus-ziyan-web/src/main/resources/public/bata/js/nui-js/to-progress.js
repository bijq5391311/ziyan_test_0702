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

	module.exports = __webpack_require__(443);


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

/***/ 105:
/***/ function(module, exports) {

	module.exports = require("vue");

/***/ },

/***/ 247:
/***/ function(module, exports) {

	module.exports = require("nui-js/lib/utils/merge");

/***/ },

/***/ 443:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _main = __webpack_require__(444);

	var _main2 = _interopRequireDefault(_main);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _main2.default;

/***/ },

/***/ 444:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _vue = __webpack_require__(105);

	var _vue2 = _interopRequireDefault(_vue);

	var _merge = __webpack_require__(247);

	var _merge2 = _interopRequireDefault(_merge);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ToProgressConstructor = _vue2.default.extend(__webpack_require__(445));
	var progress = 0;
	var instance = void 0;
	var defaults = {
	  height: '2px',
	  duration: 0.2,
	  position: 'top'
	};
	var ToProgress = function ToProgress(options, selector) {
	  if (_vue2.default.prototype.$isServer) return;
	  options = (0, _merge2.default)({}, defaults, options);
	  options.opacityDuration = options.duration * 3;
	  instance = new ToProgressConstructor({
	    data: options
	  });
	  instance.vm = instance.$mount();
	  // 判断是否有指定选择器，创建DOM结构
	  if (selector) {
	    var el = document.querySelector(selector);
	    if (el) {
	      if (el.hasChildNodes()) {
	        el.insertBefore(instance.vm.$el, el.firstChild);
	      } else {
	        el.appendChild(instance.vm.$el);
	      }
	      // 当定位到底部时，需要给selector添加 position = 'relative'
	      if (options.position === 'bottom') {
	        el.style.position = 'relative';
	      }
	    }
	  } else {
	    document.body.appendChild(instance.vm.$el);
	  }
	  instance.vm.visible = true;
	  instance.vm.setCss = {
	    'position': selector ? options.position === 'bottom' ? 'absolute' : 'relative' : 'fixed',
	    'top': options.position === 'top' ? '0' : 'auto',
	    'bottom': options.position === 'bottom' ? '0' : 'auto',
	    'left': '0',
	    'right': '0',
	    'background-color': options.color ? options.color : '',
	    'height': options.height,
	    'width': '0%',
	    'transition': 'width ' + options.duration + 's' + ', opacity ' + options.opacityDuration + 's',
	    '-moz-transition': 'width ' + options.duration + 's' + ', opacity ' + options.opacityDuration + 's',
	    '-webkit-transition': 'width ' + options.duration + 's' + ', opacity ' + options.opacityDuration + 's'
	  };
	  instance.dom = instance.vm.$el;
	  return instance.vm;
	};
	// 原生CSS动画回调事件
	function whichTransitionEvent() {
	  var t;
	  var el = document.createElement('fakeelement');
	  var transitions = {
	    'transition': 'transitionend',
	    'OTransition': 'oTransitionEnd',
	    'MozTransition': 'transitionend',
	    'WebkitTransition': 'webkitTransitionEnd',
	    'MsTransition': 'msTransitionEnd'
	  };

	  for (t in transitions) {
	    if (el.style[t] !== undefined) {
	      return transitions[t];
	    }
	  }
	};
	var transitionEvent = whichTransitionEvent();
	ToProgress.transit = function () {
	  _vue2.default.nextTick(function () {
	    instance.$el.style.width = progress + '%';
	  });
	};

	ToProgress.getProgress = function () {
	  return progress;
	};

	ToProgress.setProgress = function (prog, callback) {
	  this.show();
	  if (prog > 100) {
	    progress = 100;
	  } else if (prog < 0) {
	    progress = 0;
	  } else {
	    progress = prog;
	  }
	  this.transit();
	  callback && callback();
	};

	ToProgress.increase = function (toBeIncreasedProgress, callback) {
	  this.show();
	  this.setProgress(progress + toBeIncreasedProgress, callback);
	};

	ToProgress.decrease = function (toBeDecreasedProgress, callback) {
	  this.show();
	  this.setProgress(progress - toBeDecreasedProgress, callback);
	};

	ToProgress.finish = function (callback) {
	  var that = this;
	  this.setProgress(100, callback);
	  this.hide();
	  // CSS动画结束监听 事件
	  var listener = function EventListener() {
	    that.reset();
	    // 移除CSS动画结束监听
	    instance.$el.removeEventListener(transitionEvent, listener);
	  };
	  // 添加CSS动画结束监听
	  transitionEvent && instance.$el.addEventListener(transitionEvent, listener);
	};

	ToProgress.reset = function (callback) {
	  progress = 0;
	  this.transit();
	  callback && callback();
	};

	ToProgress.hide = function () {
	  instance.$el.style.opacity = '0';
	};

	ToProgress.show = function () {
	  instance.visible = true;
	  instance.$el.style.opacity = '1';
	};
	// 销毁
	ToProgress.destroy = function () {
	  instance.visible = false;
	};
	exports.default = ToProgress;

/***/ },

/***/ 445:
/***/ function(module, exports, __webpack_require__) {

	var Component = __webpack_require__(3)(
	  /* script */
	  __webpack_require__(446),
	  /* template */
	  __webpack_require__(447),
	  /* styles */
	  null,
	  /* scopeId */
	  null,
	  /* moduleIdentifier (server only) */
	  null
	)

	module.exports = Component.exports


/***/ },

/***/ 446:
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;
	//
	//
	//
	//
	//
	//

	exports.default = {
	  data: function data() {
	    return {
	      visible: false,
	      setCss: {}
	    };
	  }
	};

/***/ },

/***/ 447:
/***/ function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return (_vm.visible) ? _c('div', {
	    staticClass: "el-to-progress",
	    style: ([_vm.setCss])
	  }) : _vm._e()
	},staticRenderFns: []}

/***/ }

/******/ });