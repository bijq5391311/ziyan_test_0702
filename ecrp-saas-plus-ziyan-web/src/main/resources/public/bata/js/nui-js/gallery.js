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

	module.exports = __webpack_require__(228);


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

/***/ 228:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _gallery = __webpack_require__(229);

	var _gallery2 = _interopRequireDefault(_gallery);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* istanbul ignore next */
	_gallery2.default.install = function (Vue) {
	  Vue.component(_gallery2.default.name, _gallery2.default);
	};

	exports.default = _gallery2.default;

/***/ },

/***/ 229:
/***/ function(module, exports, __webpack_require__) {

	var Component = __webpack_require__(3)(
	  /* script */
	  __webpack_require__(230),
	  /* template */
	  __webpack_require__(231),
	  /* styles */
	  null,
	  /* scopeId */
	  null,
	  /* moduleIdentifier (server only) */
	  null
	)

	module.exports = Component.exports


/***/ },

/***/ 230:
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
	//
	//
	//
	//
	//
	//
	//
	//
	//

	/*
	 * 依赖插件：https://www.npmjs.com/package/blueimp-gallery
	 * 参考：https://github.com/RobinCK/vue-gallery
	*/
	//  import 'blueimp-gallery/css/blueimp-gallery.min.css';
	//  import 'blueimp-gallery/js/blueimp-gallery-fullscreen.js';
	//  import blueimp from 'blueimp-gallery/js/blueimp-gallery.js';

	exports.default = {
	  name: 'ElGallery',

	  props: {
	    images: {
	      type: Array,
	      default: function _default() {
	        return [];
	      }
	    },
	    options: {
	      type: Object,
	      default: function _default() {
	        return {};
	      }
	    },
	    carousel: {
	      type: Boolean,
	      default: false
	    },
	    controls: {
	      type: Boolean,
	      default: true
	    },
	    lightbox: {
	      type: Boolean,
	      default: false
	    },
	    index: {
	      type: Number
	    },
	    id: {
	      type: String,
	      default: 'blueimp-gallery'
	    }
	  },
	  data: function data() {
	    return {
	      instance: null
	    };
	  },

	  watch: {
	    index: function index(value) {
	      if (this.carousel) {
	        return;
	      }
	      if (value !== null) {
	        this.open(value);
	      } else {
	        if (this.instance) {
	          this.instance.close();
	        }
	        this.$emit('close');
	      }
	    }
	  },
	  mounted: function mounted() {
	    if (this.carousel) {
	      this.open();
	    }
	  },
	  destroyed: function destroyed() {
	    if (this.instance !== null) {
	      this.instance.close();
	      this.instance = null;
	    }
	  },

	  methods: {
	    open: function open() {
	      var _this = this;

	      var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

	      // 初始化
	      //        const instance = typeof blueimp.Gallery !== 'undefined' ? blueimp.Gallery : blueimp;
	      var options = Object.assign({
	        toggleControlsOnReturn: false,
	        toggleControlsOnSlideClick: false,
	        closeOnSlideClick: false,
	        carousel: this.carousel,
	        container: '#' + this.id,
	        index: index,
	        onopen: function onopen() {
	          return _this.$emit('onopen');
	        },
	        onopened: function onopened() {
	          return _this.$emit('onopened');
	        },
	        onslide: function onslide(index, slide) {
	          return _this.$emit('onslide', { index: index, slide: slide });
	        },
	        onslideend: function onslideend(index, slide) {
	          return _this.$emit('onslideend', { index: index, slide: slide });
	        },
	        onslidecomplete: function onslidecomplete(index, slide) {
	          return _this.$emit('onslidecomplete', { index: index, slide: slide });
	        },
	        onclose: function onclose() {
	          return _this.$emit('close');
	        },
	        onclosed: function onclosed() {
	          return _this.$emit('onclosed');
	        }
	      }, this.options);
	      if (this.carousel) {
	        options.container = this.$el;
	      }
	      //        this.instance = instance(this.images, options);
	      this.instance = this.$gallery(this.images, options);
	    }
	  }
	};

/***/ },

/***/ 231:
/***/ function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "blueimp-gallery",
	    class: {
	      'blueimp-gallery-carousel': _vm.carousel, 'blueimp-gallery-controls': _vm.controls
	    },
	    attrs: {
	      "id": _vm.id
	    }
	  }, [_c('div', {
	    staticClass: "slides"
	  }), _c('h3', {
	    staticClass: "title"
	  }), _c('a', {
	    staticClass: "prev"
	  }, [_vm._v("‹")]), _c('a', {
	    staticClass: "next"
	  }, [_vm._v("›")]), (!_vm.carousel) ? _c('a', {
	    staticClass: "close"
	  }, [_vm._v("×")]) : _vm._e(), (_vm.carousel) ? _c('a', {
	    staticClass: "play-pause"
	  }) : _vm._e(), (!_vm.carousel) ? _c('ol', {
	    staticClass: "indicator"
	  }) : _vm._e()])
	},staticRenderFns: []}

/***/ }

/******/ });