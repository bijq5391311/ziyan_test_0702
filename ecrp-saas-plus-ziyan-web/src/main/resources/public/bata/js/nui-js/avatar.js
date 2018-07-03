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

	module.exports = __webpack_require__(25);


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

/***/ 25:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.Avatar = undefined;

	var _Avatar = __webpack_require__(26);

	var _Avatar2 = _interopRequireDefault(_Avatar);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.Avatar = _Avatar2.default;
	exports.default = _Avatar2.default;

/***/ },

/***/ 26:
/***/ function(module, exports, __webpack_require__) {

	var Component = __webpack_require__(3)(
	  /* script */
	  __webpack_require__(27),
	  /* template */
	  __webpack_require__(28),
	  /* styles */
	  null,
	  /* scopeId */
	  null,
	  /* moduleIdentifier (server only) */
	  null
	)

	module.exports = Component.exports


/***/ },

/***/ 27:
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	//
	//
	//
	//
	//
	//

	exports.default = {
	  name: 'avatar',
	  props: {
	    username: {
	      type: String,
	      required: true
	    },
	    initials: {
	      type: String
	    },
	    backgroundColor: {
	      type: String
	    },
	    color: {
	      type: String
	    },
	    customStyle: {
	      type: Object
	    },
	    size: {
	      type: Number,
	      default: 50
	    },
	    src: {
	      type: String
	    },
	    rounded: {
	      type: Boolean,
	      default: true
	    },
	    lighten: {
	      type: Number,
	      default: 80
	    }
	  },

	  data: function data() {
	    return {
	      backgroundColors: ['#F44336', '#FF4081', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', /* '#FFEB3B' , */'#FFC107', '#FF9800', '#FF5722', '#795548', '#9E9E9E', '#607D8B']
	    };
	  },
	  mounted: function mounted() {
	    this.$emit('avatar-initials', this.username, this.userInitial);
	  },


	  computed: {
	    background: function background() {
	      return this.backgroundColor || this.randomBackgroundColor(this.username.length, this.backgroundColors);
	    },
	    fontColor: function fontColor() {
	      return this.color || this.lightenColor(this.background, this.lighten);
	    },
	    isImage: function isImage() {
	      return Boolean(this.src);
	    },
	    style: function style() {
	      var style = {
	        width: this.size + 'px',
	        height: this.size + 'px',
	        borderRadius: this.rounded ? '50%' : 0,
	        textAlign: 'center',
	        verticalAlign: 'middle'
	      };

	      var imgBackgroundAndFontStyle = {
	        background: 'transparent url(' + this.src + ') no-repeat scroll 0% 0% / ' + this.size + 'px ' + this.size + 'px content-box border-box'
	      };

	      var initialBackgroundAndFontStyle = {
	        backgroundColor: this.background,
	        font: Math.floor(this.size / 3) + 'px/100px Helvetica, Arial, sans-serif',
	        fontWeight: 'bold',
	        color: this.fontColor,
	        lineHeight: this.size + Math.floor(this.size / 20) + 'px'
	      };

	      var backgroundAndFontStyle = this.isImage ? imgBackgroundAndFontStyle : initialBackgroundAndFontStyle;

	      Object.assign(style, backgroundAndFontStyle);

	      return style;
	    },
	    userInitial: function userInitial() {
	      var initials = this.initials || this.initial(this.username);
	      return initials;
	    }
	  },

	  methods: {
	    /*
	    *  initial
	    *  函数说明：取用户名首字母，如超过三个时，只显示前三个
	    *  传入参数：username 用户传入的用户名
	    *  传出参数：initials 计算后要显示的首字母
	    * */
	    initial: function initial(username) {
	      var parts = username.split(/[ -]/);
	      var initials = '';

	      for (var i = 0; i < parts.length; i++) {
	        initials += parts[i].charAt(0);
	      }

	      if (initials.length > 3 && initials.search(/[A-Z]/) !== -1) {
	        initials = initials.replace(/[a-z]+/g, '');
	      }

	      initials = initials.substr(0, 3).toUpperCase();

	      return initials;
	    },


	    /*
	     *  randomBackgroundColor
	     *  函数说明：未设置背景色时，根据用户名的长短决定背景色（取余方法）
	     *  传入参数：seed 用户传入的用户名长度； colors 已定义的背景颜色数组
	     *  传出参数：colors[seed % (colors.length)] 取得的背景颜色
	     * */
	    randomBackgroundColor: function randomBackgroundColor(seed, colors) {
	      return colors[seed % colors.length];
	    },


	    /*
	     *  lightenColor
	     *  函数说明：未定义字体颜色时，根据背景色及定义的色差值计算出字体颜色
	     *  传入参数：this.background 设置的背景颜色； this.lighten 定义的色差，取值[-100, 100]
	     *  传出参数：(usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16) 计算后的字体颜色
	     *  方法来源：From https://css-tricks.com/snippets/javascript/lighten-darken-color/
	     * */
	    lightenColor: function lightenColor(hex, amt) {
	      var usePound = false;
	      if (hex[0] === '#') {
	        hex = hex.slice(1);
	        usePound = true;
	      }
	      var num = parseInt(hex, 16);
	      var r = (num >> 16) + amt;
	      if (r > 255) r = 255;else if (r < 16) r = 16;
	      var b = (num >> 8 & 0x00FF) + amt;
	      if (b > 255) b = 255;else if (b < 16) b = 16;
	      var g = (num & 0x0000FF) + amt;
	      if (g > 255) g = 255;else if (g < 16) g = 16;
	      return (usePound ? '#' : '') + (g | b << 8 | r << 16).toString(16);
	    }
	  }
	};

/***/ },

/***/ 28:
/***/ function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "vue-avatar--wrapper",
	    style: ([_vm.style, _vm.customStyle])
	  }, [(!this.src) ? _c('span', [_vm._v(_vm._s(_vm.userInitial))]) : _vm._e()])
	},staticRenderFns: []}

/***/ }

/******/ });