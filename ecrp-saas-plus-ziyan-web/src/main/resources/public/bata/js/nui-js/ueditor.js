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

	module.exports = __webpack_require__(471);


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

/***/ 471:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _ueditor = __webpack_require__(472);

	var _ueditor2 = _interopRequireDefault(_ueditor);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* istanbul ignore next */
	_ueditor2.default.install = function (Vue) {
	  Vue.component(_ueditor2.default.name, _ueditor2.default);
	};

	exports.default = _ueditor2.default;

/***/ },

/***/ 472:
/***/ function(module, exports, __webpack_require__) {

	var Component = __webpack_require__(3)(
	  /* script */
	  __webpack_require__(473),
	  /* template */
	  __webpack_require__(474),
	  /* styles */
	  null,
	  /* scopeId */
	  null,
	  /* moduleIdentifier (server only) */
	  null
	)

	module.exports = Component.exports


/***/ },

/***/ 473:
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	//
	//
	//

	exports.default = {
	  name: 'ElUeditor',
	  props: {
	    ueditorPath: {
	      // UEditor 代码的路径
	      type: String,
	      default: 'dll/js/'
	    },
	    ueditorConfig: {
	      // UEditor 配置项
	      type: Object,
	      default: function _default() {
	        return {};
	      }
	    }
	  },
	  data: function data() {
	    return {
	      // 为了避免麻烦，每个编辑器实例都用不同的 id
	      randomId: 'editor_' + Math.random() * 100000000000000000,
	      instance: null,
	      // scriptTagStatus -> 0:代码未加载，1:两个代码依赖加载了一个，2:两个代码依赖都已经加载完成
	      scriptTagStatus: 0
	    };
	  },
	  created: function created() {
	    if (window.UE !== undefined) {
	      // 如果全局对象存在，说明编辑器代码已经初始化完成，直接加载编辑器
	      this.scriptTagStatus = 2;
	      this.initEditor();
	    } else {
	      // 如果全局对象不存在，说明编辑器 代码还没有加载完成，需要加载编辑器代码
	      this.insertScriptTag();
	    }
	  },
	  beforeDestroy: function beforeDestroy() {
	    // 组件销毁的时候，要销毁 UEditor 实例
	    if (this.instance !== null && this.instance.destroy) {
	      this.instance.destroy();
	    }
	  },
	  mounted: function mounted() {},


	  methods: {
	    insertScriptTag: function insertScriptTag() {
	      var _this = this;

	      var editorScriptTag = document.getElementById('editorScriptTag');
	      var configScriptTag = document.getElementById('configScriptTag');

	      // 如果这个tag不存在，则生成相关代码tag以加载代码
	      if (editorScriptTag === null) {
	        configScriptTag = document.createElement('script');
	        configScriptTag.type = 'text/javascript';configScriptTag.src = this.ueditorPath + 'ueditor.config.js';configScriptTag.id = 'configScriptTag';

	        editorScriptTag = document.createElement('script');
	        editorScriptTag.type = 'text/javascript';editorScriptTag.src = this.ueditorPath + 'ueditor.all.js';editorScriptTag.id = 'editorScriptTag';
	        var s = document.getElementsByTagName('head')[0];
	        s.appendChild(configScriptTag);
	        s.appendChild(editorScriptTag);
	      }

	      // 等待代码加载完成后初始化编辑器
	      if (configScriptTag.loaded) {
	        this.scriptTagStatus++;
	      } else {
	        configScriptTag.addEventListener('load', function () {
	          _this.scriptTagStatus++;
	          configScriptTag.loaded = true;
	          _this.initEditor();
	        });
	      }

	      if (editorScriptTag.loaded) {
	        this.scriptTagStatus++;
	      } else {
	        editorScriptTag.addEventListener('load', function () {
	          _this.scriptTagStatus++;
	          editorScriptTag.loaded = true;
	          _this.initEditor();
	        });
	      }

	      this.initEditor();
	    },
	    initEditor: function initEditor() {
	      var _this2 = this;

	      // scriptTagStatus 为 2 的时候，说明两个必需引入的 js 文件都已经被引入，且加载完成
	      if (this.scriptTagStatus === 2 && this.instance === null) {
	        // Vue 异步执行 DOM 更新，这样一来代码执行到这里的时候可能 template 里面的 script 标签还没真正创建
	        // 所以，我们只能在 nextTick 里面初始化 UEditor
	        this.$nextTick(function () {
	          _this2.instance = window.UE.getEditor(_this2.randomId, _this2.ueditorConfig);
	          // 绑定事件，当 UEditor 初始化完成后，将编辑器实例通过自定义的 ready 事件交出去
	          _this2.instance.addListener('ready', function () {
	            _this2.$emit('ready', _this2.instance);
	          });
	        });
	      }
	    }
	  }
	};

/***/ },

/***/ 474:
/***/ function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('script', {
	    attrs: {
	      "id": _vm.randomId,
	      "name": "content",
	      "type": "text/plain"
	    }
	  })
	},staticRenderFns: []}

/***/ }

/******/ });