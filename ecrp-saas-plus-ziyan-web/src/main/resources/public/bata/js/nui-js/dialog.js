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

	module.exports = __webpack_require__(200);


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

/***/ 6:
/***/ function(module, exports) {

	module.exports = require("nui-js/lib/utils/popup");

/***/ },

/***/ 20:
/***/ function(module, exports) {

	module.exports = require("nui-js/lib/mixins/emitter");

/***/ },

/***/ 96:
/***/ function(module, exports) {

	module.exports = require("nui-js/lib/utils/resize-event");

/***/ },

/***/ 200:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _component = __webpack_require__(201);

	var _component2 = _interopRequireDefault(_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* istanbul ignore next */
	_component2.default.install = function (Vue) {
	  Vue.component(_component2.default.name, _component2.default);
	};

	exports.default = _component2.default;

/***/ },

/***/ 201:
/***/ function(module, exports, __webpack_require__) {

	var Component = __webpack_require__(3)(
	  /* script */
	  __webpack_require__(202),
	  /* template */
	  __webpack_require__(203),
	  /* styles */
	  null,
	  /* scopeId */
	  null,
	  /* moduleIdentifier (server only) */
	  null
	)

	module.exports = Component.exports


/***/ },

/***/ 202:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _popup = __webpack_require__(6);

	var _popup2 = _interopRequireDefault(_popup);

	var _emitter = __webpack_require__(20);

	var _emitter2 = _interopRequireDefault(_emitter);

	var _resizeEvent = __webpack_require__(96);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  name: 'ElDialog',

	  mixins: [_popup2.default, _emitter2.default],

	  props: {
	    title: {
	      type: String,
	      default: ''
	    },

	    type: String,
	    modal: {
	      type: Boolean,
	      default: true
	    },

	    modalAppendToBody: {
	      type: Boolean,
	      default: true
	    },

	    lockScroll: {
	      type: Boolean,
	      default: true
	    },

	    closeOnClickModal: {
	      type: Boolean,
	      default: true
	    },

	    closeOnPressEscape: {
	      type: Boolean,
	      default: true
	    },
	    showTitle: {
	      type: Boolean,
	      default: true
	    },
	    showClose: {
	      type: Boolean,
	      default: true
	    },

	    size: {
	      type: String,
	      default: 'middle'
	    },

	    width: String,
	    height: String,
	    ContentHeight: String,
	    ContentMinHeight: String,
	    customClass: {
	      type: String,
	      default: ''
	    },

	    top: {
	      type: String,
	      default: '5%'
	    },
	    bottom: String,
	    beforeClose: Function,
	    nesting: {
	      type: Boolean,
	      default: false
	    },
	    // 内容区域自适应高度，不超出一屏高度
	    responseLimit: {
	      type: Boolean,
	      default: false
	    },
	    // 是否显示横向滚动条
	    showScrollX: {
	      type: Boolean,
	      default: true
	    },
	    // 弹窗是否垂直居中
	    vetically: {
	      type: Boolean,
	      default: false
	    }
	  },

	  watch: {
	    visible: function visible(val) {
	      var _this = this;

	      this.$emit('update:visible', val);
	      var maxHeight = void 0;
	      var height = void 0;
	      if (val) {
	        this.$emit('open');
	        this.$el.addEventListener('scroll', this.updatePopper);
	        this.$nextTick(function () {
	          _this.$refs.dialog.scrollTop = 0;
	          if (_this.bottom || _this.responseLimit || _this.height) {
	            // 设置内容区域高度
	            maxHeight = document.body.clientHeight + 17 - ((_this.$refs.header !== undefined ? _this.$refs.header.offsetHeight : 0) + (_this.$refs.footer !== undefined ? _this.$refs.footer.offsetHeight : 0) + 2 * (_this.$refs.dialogScroll.$el.offsetTop - (_this.$refs.header !== undefined ? _this.$refs.header.offsetHeight : 0)));
	            height = _this.$refs.dialog.clientHeight + 17 - ((_this.$refs.header !== undefined ? _this.$refs.header.offsetHeight : 0) + (_this.$refs.footer !== undefined ? _this.$refs.footer.offsetHeight : 0) + 2 * (_this.$refs.dialogScroll.$el.offsetTop - (_this.$refs.header !== undefined ? _this.$refs.header.offsetHeight : 0)));
	            //              if (this.responseLimit) {
	            //                this.$refs.dialogScroll.$el.firstChild.style.maxHeight = maxHeight + 'px';
	            //              }
	            //              if (this.height || this.bottom) {
	            //                this.$refs.dialogScroll.$el.firstChild.style.height = height + 'px';
	            //              }
	            _this.wrapMaxHeight = maxHeight;
	            _this.wrapHeight = height;
	            // 隐藏横向滚动条
	            if (!_this.showScrollX) {
	              if (_this.$refs.dialogScroll.$el.children[1]) {
	                _this.$refs.dialogScroll.$el.children[1].style.opacity = '0';
	              }
	            }
	            // 监听滚动条
	            _this.$refs.dialogScroll.$el.children[0].addEventListener('scroll', _this.scrollEvent);
	            //              this.$refs.dialogScroll.$el.children[0].addEventListener('scroll', (() => {
	            //                console.log(this.$refs.dialogScroll.$el.scrollTop);
	            //                console.log(this.$refs.dialogScroll.$el.children[0].scrollTop);
	            //              }));
	          }
	          // 设置内容区高度
	          if (_this.ContentHeight) {
	            _this.$refs.contentBody.style.height = _this.ContentHeight;
	          }
	          // 设置内容区最小高度
	          if (_this.ContentMinHeight) {
	            _this.$refs.contentBody.style.minHeight = _this.ContentMinHeight;
	          }
	          (0, _resizeEvent.addResizeListener)(_this.$refs.dialog, _this.setTopValue);
	        });
	      } else {
	        this.$el.removeEventListener('scroll', this.updatePopper);
	        //          this.setTop = '';
	        maxHeight = 0;
	        height = 0;
	        this.$emit('close');
	        this.wrapMaxHeight = '';
	        this.wrapHeight = '';
	      }
	    }
	  },

	  data: function data() {
	    return {
	      contentHeight: '',
	      showScroll: false,
	      setTop: '',
	      wrapMaxHeight: '',
	      wrapHeight: ''
	    };
	  },

	  computed: {
	    sizeClass: function sizeClass() {
	      return 'el-dialog--' + this.size;
	    },
	    style: function style() {
	      return this.size === 'full' ? {} : { 'top': this.veticallyStatus ? this.setTop : this.top };
	    },
	    setBottom: function setBottom() {
	      return this.size === 'full' ? {} : { 'bottom': this.veticallyStatus ? '' : this.bottom };
	    },

	    // 设置是否垂直居中的状态
	    veticallyStatus: function veticallyStatus() {
	      if (this.bottom) {
	        return false;
	      } else {
	        return this.vetically;
	      }
	    }
	  },

	  methods: {
	    handleWrapperClick: function handleWrapperClick() {
	      if (!this.closeOnClickModal) return;
	      this.handleClose();
	    },
	    handleClose: function handleClose() {
	      if (typeof this.beforeClose === 'function') {
	        this.beforeClose(this.hide);
	      } else {
	        this.hide();
	      }
	    },
	    hide: function hide(cancel) {
	      if (cancel !== false) {
	        this.$emit('update:visible', false);
	        this.$emit('visible-change', false);
	      }
	    },
	    updatePopper: function updatePopper() {
	      this.broadcast('ElSelectDropdown', 'updatePopper');
	      this.broadcast('ElDropdownMenu', 'updatePopper');
	    },
	    setTopValue: function setTopValue() {
	      if (document.body.clientHeight > this.$refs.dialog.clientHeight) {
	        this.setTop = (document.body.clientHeight - this.$refs.dialog.clientHeight) / 2 + 'px';
	      } else {
	        this.setTop = '20px';
	        if (this.$refs.dialogScroll && this.responseLimit) {
	          this.$refs.dialogScroll.$el.firstChild.style.maxHeight = this.$refs.dialogScroll.$el.firstChild.clientHeight - 20 + 'px';
	        }
	      }
	    },
	    scrollEvent: function scrollEvent() {
	      this.$emit('scroll-change', this.$refs.dialogScroll.$el.children[0].scrollTop);
	    }
	  },

	  mounted: function mounted() {
	    if (this.visible) {
	      this.rendered = true;
	      this.open();
	    }
	  }
	}; //
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

/***/ },

/***/ 203:
/***/ function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('transition', {
	    attrs: {
	      "name": "dialog-fade"
	    }
	  }, [_c('div', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.visible),
	      expression: "visible"
	    }],
	    staticClass: "el-dialog__wrapper",
	    on: {
	      "click": function($event) {
	        if ($event.target !== $event.currentTarget) { return null; }
	        _vm.handleWrapperClick($event)
	      }
	    }
	  }, [_c('div', {
	    ref: "dialog",
	    staticClass: "el-dialog",
	    class: [_vm.sizeClass, _vm.customClass],
	    style: ([_vm.style, _vm.setBottom, {
	      'width': _vm.width,
	      'height': _vm.height,
	      'margin-bottom': this.bottom ? '0' : ''
	    }])
	  }, [(_vm.showTitle) ? _c('div', {
	    ref: "header",
	    staticClass: "el-dialog__header",
	    class: [_vm.type ? 'el-dialog--' + _vm.type : '']
	  }, [_vm._t("title", [_c('span', {
	    staticClass: "el-dialog__title"
	  }, [_vm._v(_vm._s(_vm.title))])]), (_vm.showClose) ? _c('button', {
	    staticClass: "el-dialog__headerbtn",
	    attrs: {
	      "type": "button",
	      "aria-label": "Close"
	    },
	    on: {
	      "click": _vm.handleClose
	    }
	  }, [_c('i', {
	    staticClass: "el-dialog__close el-icon el-icon-close"
	  })]) : _vm._e()], 2) : _vm._e(), (_vm.rendered) ? _c('div', {
	    ref: "body",
	    staticClass: "el-dialog__body"
	  }, [(this.bottom || this.responseLimit || this.height) ? _c('el-scrollbar', {
	    ref: "dialogScroll",
	    staticClass: "el-dialog__scrollbar",
	    attrs: {
	      "wrap-style": (_vm.height || _vm.bottom ? 'height:' + _vm.wrapHeight + 'px;' : '') + (_vm.responseLimit ? 'maxHeight:' + _vm.wrapMaxHeight + 'px;' : ''),
	      "outsider": "",
	      "wrap-class": "el-dialog__wrap",
	      "view-class": "el-dialog__view"
	    }
	  }, [_c('div', {
	    ref: "content",
	    staticClass: "el-dialog__content"
	  }, [_vm._t("default")], 2)]) : _c('div', {
	    ref: "contentBody",
	    staticClass: "el-dialog__content"
	  }, [_vm._t("default")], 2)], 1) : _vm._e(), (_vm.$slots.footer) ? _c('div', {
	    ref: "footer",
	    staticClass: "el-dialog__footer"
	  }, [_vm._t("footer")], 2) : _vm._e()])])])
	},staticRenderFns: []}

/***/ }

/******/ });