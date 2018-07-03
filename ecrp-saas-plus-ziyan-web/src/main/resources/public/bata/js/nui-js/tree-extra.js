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

	module.exports = __webpack_require__(467);


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

/***/ 111:
/***/ function(module, exports) {

	module.exports = require("nui-js/lib/locale");

/***/ },

/***/ 139:
/***/ function(module, exports) {

	module.exports = require("nui-js/lib/transitions/collapse-transition");

/***/ },

/***/ 243:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _input = __webpack_require__(244);

	var _input2 = _interopRequireDefault(_input);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* istanbul ignore next */
	_input2.default.install = function (Vue) {
	  Vue.component(_input2.default.name, _input2.default);
	};

	exports.default = _input2.default;

/***/ },

/***/ 244:
/***/ function(module, exports, __webpack_require__) {

	var Component = __webpack_require__(3)(
	  /* script */
	  __webpack_require__(245),
	  /* template */
	  __webpack_require__(248),
	  /* styles */
	  null,
	  /* scopeId */
	  null,
	  /* moduleIdentifier (server only) */
	  null
	)

	module.exports = Component.exports


/***/ },

/***/ 245:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _emitter = __webpack_require__(20);

	var _emitter2 = _interopRequireDefault(_emitter);

	var _calcTextareaHeight = __webpack_require__(246);

	var _calcTextareaHeight2 = _interopRequireDefault(_calcTextareaHeight);

	var _merge = __webpack_require__(247);

	var _merge2 = _interopRequireDefault(_merge);

	var _getText2 = __webpack_require__(23);

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

	exports.default = {
	  name: 'ElInput',

	  componentName: 'ElInput',

	  mixins: [_emitter2.default],

	  data: function data() {
	    return {
	      currentValue: this.value,
	      textareaCalcStyle: {}
	    };
	  },


	  props: {
	    value: [String, Number],
	    placeholder: String,
	    size: String,
	    resize: String,
	    readonly: Boolean,
	    autofocus: Boolean,
	    icon: String,
	    disabled: Boolean,
	    type: {
	      type: String,
	      default: 'text'
	    },
	    name: String,
	    autosize: {
	      type: [Boolean, Object],
	      default: false
	    },
	    rows: {
	      type: Number,
	      default: 2
	    },
	    autoComplete: {
	      type: String,
	      default: 'off'
	    },
	    form: String,
	    maxlength: Number,
	    minlength: Number,
	    max: {},
	    min: {},
	    step: {},
	    validateEvent: {
	      type: Boolean,
	      default: true
	    },
	    onIconClick: Function
	  },

	  computed: {
	    validating: function validating() {
	      return this.$parent.validateState === 'validating';
	    },
	    textareaStyle: function textareaStyle() {
	      return (0, _merge2.default)({}, this.textareaCalcStyle, { resize: this.resize });
	    }
	  },

	  watch: {
	    'value': function value(val, oldValue) {
	      this.setCurrentValue(val);
	    }
	  },

	  methods: {
	    handleBlur: function handleBlur(event) {
	      this.$emit('blur', event);
	      if (this.validateEvent) {
	        this.dispatch('ElFormItem', 'el.form.blur', [this.currentValue]);
	      }
	    },
	    inputSelect: function inputSelect() {
	      this.$refs.input.select();
	    },
	    resizeTextarea: function resizeTextarea() {
	      if (this.$isServer) return;
	      var autosize = this.autosize,
	          type = this.type;

	      if (type !== 'textarea') return;
	      if (!autosize) {
	        this.textareaCalcStyle = {
	          minHeight: (0, _calcTextareaHeight2.default)(this.$refs.textarea).minHeight
	        };
	        return;
	      }
	      var minRows = autosize.minRows;
	      var maxRows = autosize.maxRows;

	      this.textareaCalcStyle = (0, _calcTextareaHeight2.default)(this.$refs.textarea, minRows, maxRows);
	    },
	    handleFocus: function handleFocus(event) {
	      this.$emit('focus', event);
	    },
	    handleInput: function handleInput(event) {
	      var value = event.target.value;
	      this.$emit('input', value);
	      this.setCurrentValue(value);
	      this.$emit('change', value);
	    },
	    handleIconClick: function handleIconClick(event) {
	      if (this.onIconClick) {
	        this.onIconClick(event);
	      }
	      this.$emit('click', event);
	    },
	    setCurrentValue: function setCurrentValue(value) {
	      var _this = this;

	      if (value === this.currentValue) return;
	      this.$nextTick(function (_) {
	        _this.resizeTextarea();
	      });
	      this.currentValue = value;
	      if (this.validateEvent) {
	        this.dispatch('ElFormItem', 'el.form.change', [value]);
	      }
	    },

	    // 转换或获得文本框的文本 event
	    getText: function getText(format) {
	      return (0, _getText2.getText)(this.value, this.value, format);
	    }
	  },

	  created: function created() {
	    this.$on('inputSelect', this.inputSelect);
	  },
	  mounted: function mounted() {
	    this.resizeTextarea();
	  }
	};

/***/ },

/***/ 246:
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports.default = calcTextareaHeight;
	var hiddenTextarea = void 0;

	var HIDDEN_STYLE = '\n  height:0 !important;\n  visibility:hidden !important;\n  overflow:hidden !important;\n  position:absolute !important;\n  z-index:-1000 !important;\n  top:0 !important;\n  right:0 !important\n';

	var CONTEXT_STYLE = ['letter-spacing', 'line-height', 'padding-top', 'padding-bottom', 'font-family', 'font-weight', 'font-size', 'text-rendering', 'text-transform', 'width', 'text-indent', 'padding-left', 'padding-right', 'border-width', 'box-sizing'];

	function calculateNodeStyling(targetElement) {
	  var style = window.getComputedStyle(targetElement);

	  var boxSizing = style.getPropertyValue('box-sizing');

	  var paddingSize = parseFloat(style.getPropertyValue('padding-bottom')) + parseFloat(style.getPropertyValue('padding-top'));

	  var borderSize = parseFloat(style.getPropertyValue('border-bottom-width')) + parseFloat(style.getPropertyValue('border-top-width'));

	  var contextStyle = CONTEXT_STYLE.map(function (name) {
	    return name + ':' + style.getPropertyValue(name);
	  }).join(';');

	  return { contextStyle: contextStyle, paddingSize: paddingSize, borderSize: borderSize, boxSizing: boxSizing };
	}

	function calcTextareaHeight(targetElement) {
	  var minRows = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
	  var maxRows = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

	  if (!hiddenTextarea) {
	    hiddenTextarea = document.createElement('textarea');
	    document.body.appendChild(hiddenTextarea);
	  }

	  var _calculateNodeStyling = calculateNodeStyling(targetElement),
	      paddingSize = _calculateNodeStyling.paddingSize,
	      borderSize = _calculateNodeStyling.borderSize,
	      boxSizing = _calculateNodeStyling.boxSizing,
	      contextStyle = _calculateNodeStyling.contextStyle;

	  hiddenTextarea.setAttribute('style', contextStyle + ';' + HIDDEN_STYLE);
	  hiddenTextarea.value = targetElement.value || targetElement.placeholder || '';

	  var height = hiddenTextarea.scrollHeight;
	  var result = {};

	  if (boxSizing === 'border-box') {
	    height = height + borderSize;
	  } else if (boxSizing === 'content-box') {
	    height = height - paddingSize;
	  }

	  hiddenTextarea.value = '';
	  var singleRowHeight = hiddenTextarea.scrollHeight - paddingSize;

	  if (minRows !== null) {
	    var minHeight = singleRowHeight * minRows;
	    if (boxSizing === 'border-box') {
	      minHeight = minHeight + paddingSize + borderSize;
	    }
	    height = Math.max(minHeight, height);
	    result.minHeight = minHeight + 'px';
	  }
	  if (maxRows !== null) {
	    var maxHeight = singleRowHeight * maxRows;
	    if (boxSizing === 'border-box') {
	      maxHeight = maxHeight + paddingSize + borderSize;
	    }
	    height = Math.min(maxHeight, height);
	  }
	  result.height = height + 'px';

	  return result;
	};

/***/ },

/***/ 247:
/***/ function(module, exports) {

	module.exports = require("nui-js/lib/utils/merge");

/***/ },

/***/ 248:
/***/ function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    class: [
	      _vm.type === 'textarea' ? 'el-textarea' : 'el-input',
	      _vm.size ? 'el-input--' + _vm.size : '', {
	        'is-disabled': _vm.disabled,
	        'el-input-group': _vm.$slots.prepend || _vm.$slots.append,
	        'el-input-group--append': _vm.$slots.append,
	        'el-input-group--prepend': _vm.$slots.prepend
	      }
	    ]
	  }, [(_vm.type !== 'textarea') ? [(_vm.$slots.prepend) ? _c('div', {
	    staticClass: "el-input-group__prepend"
	  }, [_vm._t("prepend")], 2) : _vm._e(), _vm._t("icon", [(_vm.icon) ? _c('i', {
	    staticClass: "el-input__icon",
	    class: [
	      'el-icon-' + _vm.icon,
	      _vm.onIconClick ? 'is-clickable' : ''
	    ],
	    on: {
	      "click": _vm.handleIconClick
	    }
	  }) : _vm._e()]), (_vm.type !== 'textarea') ? _c('input', _vm._b({
	    ref: "input",
	    staticClass: "el-input__inner",
	    attrs: {
	      "autocomplete": _vm.autoComplete
	    },
	    domProps: {
	      "value": _vm.currentValue
	    },
	    on: {
	      "input": _vm.handleInput,
	      "focus": _vm.handleFocus,
	      "blur": _vm.handleBlur
	    }
	  }, 'input', _vm.$props)) : _vm._e(), (_vm.validating) ? _c('i', {
	    staticClass: "el-input__icon el-icon-loading"
	  }) : _vm._e(), (_vm.$slots.append) ? _c('div', {
	    staticClass: "el-input-group__append"
	  }, [_vm._t("append")], 2) : _vm._e()] : _c('textarea', _vm._b({
	    ref: "textarea",
	    staticClass: "el-textarea__inner",
	    style: (_vm.textareaStyle),
	    domProps: {
	      "value": _vm.currentValue
	    },
	    on: {
	      "input": _vm.handleInput,
	      "focus": _vm.handleFocus,
	      "blur": _vm.handleBlur
	    }
	  }, 'textarea', _vm.$props))], 2)
	},staticRenderFns: []}

/***/ },

/***/ 300:
/***/ function(module, exports) {

	module.exports = require("nui-js/lib/checkbox");

/***/ },

/***/ 457:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _tree = __webpack_require__(458);

	var _tree2 = _interopRequireDefault(_tree);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* istanbul ignore next */
	_tree2.default.install = function (Vue) {
	  Vue.component(_tree2.default.name, _tree2.default);
	};

	exports.default = _tree2.default;

/***/ },

/***/ 458:
/***/ function(module, exports, __webpack_require__) {

	var Component = __webpack_require__(3)(
	  /* script */
	  __webpack_require__(459),
	  /* template */
	  __webpack_require__(466),
	  /* styles */
	  null,
	  /* scopeId */
	  null,
	  /* moduleIdentifier (server only) */
	  null
	)

	module.exports = Component.exports


/***/ },

/***/ 459:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _treeStore = __webpack_require__(460);

	var _treeStore2 = _interopRequireDefault(_treeStore);

	var _locale = __webpack_require__(111);

	var _emitter = __webpack_require__(20);

	var _emitter2 = _interopRequireDefault(_emitter);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  name: 'ElTree',

	  mixins: [_emitter2.default],

	  components: {
	    ElTreeNode: __webpack_require__(463)
	  },

	  data: function data() {
	    return {
	      store: null,
	      root: null,
	      currentNode: null
	    };
	  },


	  props: {
	    data: {
	      type: Array
	    },
	    emptyText: {
	      type: String,
	      default: function _default() {
	        return (0, _locale.t)('el.tree.emptyText');
	      }
	    },
	    nodeKey: String,
	    checkStrictly: Boolean,
	    defaultExpandAll: Boolean,
	    expandOnClickNode: {
	      type: Boolean,
	      default: true
	    },
	    autoExpandParent: {
	      type: Boolean,
	      default: true
	    },
	    defaultCheckedKeys: Array,
	    defaultExpandedKeys: Array,
	    renderContent: Function,
	    showCheckbox: {
	      type: Boolean,
	      default: false
	    },
	    props: {
	      default: function _default() {
	        return {
	          children: 'children',
	          label: 'label',
	          icon: 'icon',
	          disabled: 'disabled'
	        };
	      }
	    },
	    lazy: {
	      type: Boolean,
	      default: false
	    },
	    highlightCurrent: Boolean,
	    currentNodeKey: [String, Number],
	    load: Function,
	    filterNodeMethod: Function,
	    accordion: Boolean,
	    indent: {
	      type: Number,
	      default: 16
	    },
	    type: {
	      type: String,
	      default: 'default'
	    }
	  },

	  computed: {
	    children: {
	      set: function set(value) {
	        this.data = value;
	      },
	      get: function get() {
	        return this.data;
	      }
	    }
	  },

	  watch: {
	    defaultCheckedKeys: function defaultCheckedKeys(newVal) {
	      this.store.defaultCheckedKeys = newVal;
	      this.store.setDefaultCheckedKey(newVal);
	    },
	    defaultExpandedKeys: function defaultExpandedKeys(newVal) {
	      this.store.defaultExpandedKeys = newVal;
	      this.store.setDefaultExpandedKeys(newVal);
	    },
	    currentNodeKey: function currentNodeKey(newVal) {
	      this.store.setCurrentNodeKey(newVal);
	      this.store.currentNodeKey = newVal;
	    },
	    data: function data(newVal) {
	      this.store.setData(newVal);
	    }
	  },

	  methods: {
	    filter: function filter(value) {
	      if (!this.filterNodeMethod) throw new Error('[Tree] filterNodeMethod is required when filter');
	      this.store.filter(value);
	    },
	    getNodeKey: function getNodeKey(node, index) {
	      var nodeKey = this.nodeKey;
	      if (nodeKey && node) {
	        return node.data[nodeKey];
	      }
	      return index;
	    },
	    getCheckedNodes: function getCheckedNodes(leafOnly) {
	      return this.store.getCheckedNodes(leafOnly);
	    },
	    getCheckedKeys: function getCheckedKeys(leafOnly) {
	      return this.store.getCheckedKeys(leafOnly);
	    },
	    setCheckedNodes: function setCheckedNodes(nodes, leafOnly) {
	      if (!this.nodeKey) throw new Error('[Tree] nodeKey is required in setCheckedNodes');
	      this.store.setCheckedNodes(nodes, leafOnly);
	    },
	    setCheckedKeys: function setCheckedKeys(keys, leafOnly) {
	      if (!this.nodeKey) throw new Error('[Tree] nodeKey is required in setCheckedNodes');
	      this.store.setCheckedKeys(keys, leafOnly);
	    },
	    setChecked: function setChecked(data, checked, deep) {
	      this.store.setChecked(data, checked, deep);
	    },
	    handleNodeExpand: function handleNodeExpand(nodeData, node, instance) {
	      this.broadcast('ElTreeNode', 'tree-node-expand', node);
	      this.$emit('node-expand', nodeData, node, instance);
	    }
	  },

	  created: function created() {
	    this.isTree = true;

	    this.store = new _treeStore2.default({
	      key: this.nodeKey,
	      data: this.data,
	      lazy: this.lazy,
	      props: this.props,
	      load: this.load,
	      currentNodeKey: this.currentNodeKey,
	      checkStrictly: this.checkStrictly,
	      defaultCheckedKeys: this.defaultCheckedKeys,
	      defaultExpandedKeys: this.defaultExpandedKeys,
	      autoExpandParent: this.autoExpandParent,
	      defaultExpandAll: this.defaultExpandAll,
	      filterNodeMethod: this.filterNodeMethod
	    });

	    this.root = this.store.root;
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

/***/ },

/***/ 460:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _node = __webpack_require__(461);

	var _node2 = _interopRequireDefault(_node);

	var _util = __webpack_require__(462);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var TreeStore = function () {
	  function TreeStore(options) {
	    var _this = this;

	    _classCallCheck(this, TreeStore);

	    this.currentNode = null;
	    this.currentNodeKey = null;

	    for (var option in options) {
	      if (options.hasOwnProperty(option)) {
	        this[option] = options[option];
	      }
	    }

	    this.nodesMap = {};

	    this.root = new _node2.default({
	      data: this.data,
	      store: this
	    });

	    if (this.lazy && this.load) {
	      var loadFn = this.load;
	      loadFn(this.root, function (data) {
	        _this.root.doCreateChildren(data);
	        _this._initDefaultCheckedNodes();
	      });
	    } else {
	      this._initDefaultCheckedNodes();
	    }
	  }

	  TreeStore.prototype.filter = function filter(value) {
	    var filterNodeMethod = this.filterNodeMethod;
	    var traverse = function traverse(node) {
	      var childNodes = node.root ? node.root.childNodes : node.childNodes;

	      childNodes.forEach(function (child) {
	        child.visible = filterNodeMethod.call(child, value, child.data, child);

	        traverse(child);
	      });

	      if (!node.visible && childNodes.length) {
	        var allHidden = true;

	        childNodes.forEach(function (child) {
	          if (child.visible) allHidden = false;
	        });

	        if (node.root) {
	          node.root.visible = allHidden === false;
	        } else {
	          node.visible = allHidden === false;
	        }
	      }

	      if (node.visible && !node.isLeaf) node.expand();
	    };

	    traverse(this);
	  };

	  TreeStore.prototype.setData = function setData(newVal) {
	    var instanceChanged = newVal !== this.root.data;
	    this.root.setData(newVal);
	    if (instanceChanged) {
	      this._initDefaultCheckedNodes();
	    }
	  };

	  TreeStore.prototype.getNode = function getNode(data) {
	    var key = (typeof data === 'undefined' ? 'undefined' : _typeof(data)) !== 'object' ? data : (0, _util.getNodeKey)(this.key, data);
	    return this.nodesMap[key];
	  };

	  TreeStore.prototype.insertBefore = function insertBefore(data, refData) {
	    var refNode = this.getNode(refData);
	    refNode.parent.insertBefore({ data: data }, refNode);
	  };

	  TreeStore.prototype.insertAfter = function insertAfter(data, refData) {
	    var refNode = this.getNode(refData);
	    refNode.parent.insertAfter({ data: data }, refNode);
	  };

	  TreeStore.prototype.remove = function remove(data) {
	    var node = this.getNode(data);
	    if (node) {
	      node.parent.removeChild(node);
	    }
	  };

	  TreeStore.prototype.append = function append(data, parentData) {
	    var parentNode = parentData ? this.getNode(parentData) : this.root;

	    if (parentNode) {
	      parentNode.insertChild({ data: data });
	    }
	  };

	  TreeStore.prototype.appendBefore = function appendBefore(data, parentData) {
	    var parentNode = parentData ? this.getNode(parentData) : this.root;

	    if (parentNode) {
	      parentNode.insertChild({ data: data }, 0);
	    }
	  };

	  TreeStore.prototype._initDefaultCheckedNodes = function _initDefaultCheckedNodes() {
	    var _this2 = this;

	    var defaultCheckedKeys = this.defaultCheckedKeys || [];
	    var nodesMap = this.nodesMap;

	    defaultCheckedKeys.forEach(function (checkedKey) {
	      var node = nodesMap[checkedKey];

	      if (node) {
	        node.setChecked(true, !_this2.checkStrictly);
	      }
	    });
	  };

	  TreeStore.prototype._initDefaultCheckedNode = function _initDefaultCheckedNode(node) {
	    var defaultCheckedKeys = this.defaultCheckedKeys || [];

	    if (defaultCheckedKeys.indexOf(node.key) !== -1) {
	      node.setChecked(true, !this.checkStrictly);
	    }
	  };

	  TreeStore.prototype.setDefaultCheckedKey = function setDefaultCheckedKey(newVal) {
	    if (newVal !== this.defaultCheckedKeys) {
	      this.defaultCheckedKeys = newVal;
	      this._initDefaultCheckedNodes();
	    }
	  };

	  TreeStore.prototype.registerNode = function registerNode(node) {
	    var key = this.key;
	    if (!key || !node || !node.data) return;

	    var nodeKey = node.key;
	    if (nodeKey !== undefined) this.nodesMap[node.key] = node;
	  };

	  TreeStore.prototype.deregisterNode = function deregisterNode(node) {
	    var key = this.key;
	    if (!key || !node || !node.data) return;

	    delete this.nodesMap[node.key];
	  };

	  TreeStore.prototype.getCheckedNodes = function getCheckedNodes() {
	    var leafOnly = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

	    var checkedNodes = [];
	    var traverse = function traverse(node) {
	      var childNodes = node.root ? node.root.childNodes : node.childNodes;

	      childNodes.forEach(function (child) {
	        if (!leafOnly && child.checked || leafOnly && child.isLeaf && child.checked) {
	          checkedNodes.push(child.data);
	        }

	        traverse(child);
	      });
	    };

	    traverse(this);

	    return checkedNodes;
	  };

	  TreeStore.prototype.getCheckedKeys = function getCheckedKeys() {
	    var leafOnly = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

	    var key = this.key;
	    var allNodes = this._getAllNodes();
	    var keys = [];
	    allNodes.forEach(function (node) {
	      if (!leafOnly || leafOnly && node.isLeaf) {
	        if (node.checked) {
	          keys.push((node.data || {})[key]);
	        }
	      }
	    });
	    return keys;
	  };

	  TreeStore.prototype._getAllNodes = function _getAllNodes() {
	    var allNodes = [];
	    var nodesMap = this.nodesMap;
	    for (var nodeKey in nodesMap) {
	      if (nodesMap.hasOwnProperty(nodeKey)) {
	        allNodes.push(nodesMap[nodeKey]);
	      }
	    }

	    return allNodes;
	  };

	  TreeStore.prototype._setCheckedKeys = function _setCheckedKeys(key) {
	    var leafOnly = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	    var checkedKeys = arguments[2];

	    var allNodes = this._getAllNodes().sort(function (a, b) {
	      return b.level - a.level;
	    });
	    var cache = Object.create(null);
	    var keys = Object.keys(checkedKeys);
	    allNodes.forEach(function (node) {
	      return node.setChecked(false, false);
	    });
	    for (var i = 0, j = allNodes.length; i < j; i++) {
	      var node = allNodes[i];
	      var nodeKey = node.data[key].toString();
	      var checked = keys.indexOf(nodeKey) > -1;
	      if (!checked) {
	        if (node.checked && !cache[nodeKey]) {
	          node.setChecked(false, false);
	        }
	        continue;
	      }

	      var parent = node.parent;
	      while (parent && parent.level > 0) {
	        cache[parent.data[key]] = true;
	        parent = parent.parent;
	      }

	      if (node.isLeaf || this.checkStrictly) {
	        node.setChecked(true, false);
	        continue;
	      }
	      node.setChecked(true, true);

	      if (leafOnly) {
	        (function () {
	          node.setChecked(false, false);
	          var traverse = function traverse(node) {
	            var childNodes = node.childNodes;
	            childNodes.forEach(function (child) {
	              if (!child.isLeaf) {
	                child.setChecked(false, false);
	              }
	              traverse(child);
	            });
	          };
	          traverse(node);
	        })();
	      }
	    }
	  };

	  TreeStore.prototype.setCheckedNodes = function setCheckedNodes(array) {
	    var leafOnly = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	    var key = this.key;
	    var checkedKeys = {};
	    array.forEach(function (item) {
	      checkedKeys[(item || {})[key]] = true;
	    });

	    this._setCheckedKeys(key, leafOnly, checkedKeys);
	  };

	  TreeStore.prototype.setCheckedKeys = function setCheckedKeys(keys) {
	    var leafOnly = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	    this.defaultCheckedKeys = keys;
	    var key = this.key;
	    var checkedKeys = {};
	    keys.forEach(function (key) {
	      checkedKeys[key] = true;
	    });

	    this._setCheckedKeys(key, leafOnly, checkedKeys);
	  };

	  TreeStore.prototype.setDefaultExpandedKeys = function setDefaultExpandedKeys(keys) {
	    var _this3 = this;

	    keys = keys || [];
	    this.defaultExpandedKeys = keys;

	    keys.forEach(function (key) {
	      var node = _this3.getNode(key);
	      if (node) node.expand(null, _this3.autoExpandParent);
	    });
	  };

	  TreeStore.prototype.setChecked = function setChecked(data, checked, deep) {
	    var node = this.getNode(data);

	    if (node) {
	      node.setChecked(!!checked, deep);
	    }
	  };

	  TreeStore.prototype.getCurrentNode = function getCurrentNode() {
	    return this.currentNode;
	  };

	  TreeStore.prototype.setCurrentNode = function setCurrentNode(node) {
	    this.currentNode = node;
	  };

	  TreeStore.prototype.setCurrentNodeKey = function setCurrentNodeKey(key) {
	    var node = this.getNode(key);
	    if (node) {
	      this.currentNode = node;
	    }
	  };

	  return TreeStore;
	}();

	exports.default = TreeStore;
	;

/***/ },

/***/ 461:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.getChildState = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _merge = __webpack_require__(247);

	var _merge2 = _interopRequireDefault(_merge);

	var _util = __webpack_require__(462);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var getChildState = exports.getChildState = function getChildState(node) {
	  var all = true;
	  var none = true;
	  var allWithoutDisable = true;
	  for (var i = 0, j = node.length; i < j; i++) {
	    var n = node[i];
	    if (n.checked !== true || n.indeterminate) {
	      all = false;
	      if (!n.disabled) {
	        allWithoutDisable = false;
	      }
	    }
	    if (n.checked !== false || n.indeterminate) {
	      none = false;
	    }
	  }

	  return { all: all, none: none, allWithoutDisable: allWithoutDisable, half: !all && !none };
	};

	var reInitChecked = function reInitChecked(node) {
	  var _getChildState = getChildState(node.childNodes),
	      all = _getChildState.all,
	      none = _getChildState.none,
	      half = _getChildState.half;

	  if (all) {
	    node.checked = true;
	    node.indeterminate = false;
	  } else if (half) {
	    node.checked = false;
	    node.indeterminate = true;
	  } else if (none) {
	    node.checked = false;
	    node.indeterminate = false;
	  }

	  var parent = node.parent;
	  if (!parent || parent.level === 0) return;

	  if (!node.store.checkStrictly) {
	    reInitChecked(parent);
	  }
	};

	var initLazyLoadChild = function initLazyLoadChild(node) {
	  var childNodes = node.childNodes;
	  if (node.checked) {
	    for (var i = 0, j = childNodes.length; i < j; i++) {
	      var child = childNodes[i];
	      if (!child.disabled) {
	        child.checked = true;
	      }
	    }
	  }

	  var parent = node.parent;
	  if (!parent || parent.level === 0) return;
	  reInitChecked(parent);
	};

	var getPropertyFromData = function getPropertyFromData(node, prop) {
	  var props = node.store.props;
	  var data = node.data || {};
	  var config = props[prop];

	  if (typeof config === 'function') {
	    return config(data, node);
	  } else if (typeof config === 'string') {
	    return data[config];
	  } else if (typeof config === 'undefined') {
	    var dataProp = data[prop];
	    return dataProp === undefined ? '' : dataProp;
	  }
	};

	var nodeIdSeed = 0;

	var Node = function () {
	  function Node(options) {
	    _classCallCheck(this, Node);

	    this.id = nodeIdSeed++;
	    this.text = null;
	    this.checked = false;
	    this.indeterminate = false;
	    this.data = null;
	    this.expanded = false;
	    this.parent = null;
	    this.visible = true;

	    for (var name in options) {
	      if (options.hasOwnProperty(name)) {
	        this[name] = options[name];
	      }
	    }

	    // internal
	    this.level = 0;
	    this.loaded = false;
	    this.childNodes = [];
	    this.loading = false;

	    if (this.parent) {
	      this.level = this.parent.level + 1;
	    }

	    var store = this.store;
	    if (!store) {
	      throw new Error('[Node]store is required!');
	    }
	    store.registerNode(this);

	    var props = store.props;
	    if (props && typeof props.isLeaf !== 'undefined') {
	      var isLeaf = getPropertyFromData(this, 'isLeaf');
	      if (typeof isLeaf === 'boolean') {
	        this.isLeafByUser = isLeaf;
	      }
	    }

	    if (store.lazy !== true && this.data) {
	      this.setData(this.data);

	      if (store.defaultExpandAll) {
	        this.expanded = true;
	      }
	    } else if (this.level > 0 && store.lazy && store.defaultExpandAll) {
	      this.expand();
	    }

	    if (!this.data) return;
	    var defaultExpandedKeys = store.defaultExpandedKeys;
	    var key = store.key;
	    if (key && defaultExpandedKeys && defaultExpandedKeys.indexOf(this.key) !== -1) {
	      this.expand(null, store.autoExpandParent);
	    }

	    if (key && store.currentNodeKey !== undefined && this.key === store.currentNodeKey) {
	      store.currentNode = this;
	    }

	    if (store.lazy) {
	      store._initDefaultCheckedNode(this);
	    }

	    this.updateLeafState();
	  }

	  Node.prototype.setData = function setData(data) {
	    if (!Array.isArray(data)) {
	      (0, _util.markNodeData)(this, data);
	    }

	    this.data = data;
	    this.childNodes = [];

	    var children = void 0;
	    if (this.level === 0 && this.data instanceof Array) {
	      children = this.data;
	    } else {
	      children = getPropertyFromData(this, 'children') || [];
	    }

	    for (var i = 0, j = children.length; i < j; i++) {
	      this.insertChild({ data: children[i] });
	    }
	  };

	  Node.prototype.insertChild = function insertChild(child, index) {
	    if (!child) throw new Error('insertChild error: child is required.');

	    if (!(child instanceof Node)) {
	      (0, _merge2.default)(child, {
	        parent: this,
	        store: this.store
	      });
	      child = new Node(child);
	    }

	    child.level = this.level + 1;

	    if (typeof index === 'undefined' || index < 0) {
	      this.childNodes.push(child);
	    } else {
	      this.childNodes.splice(index, 0, child);
	    }

	    this.updateLeafState();
	  };

	  Node.prototype.insertBefore = function insertBefore(child, ref) {
	    var index = void 0;
	    if (ref) {
	      index = this.childNodes.indexOf(ref);
	    }
	    this.insertChild(child, index);
	  };

	  Node.prototype.insertAfter = function insertAfter(child, ref) {
	    var index = void 0;
	    if (ref) {
	      index = this.childNodes.indexOf(ref);
	      if (index !== -1) index += 1;
	    }
	    this.insertChild(child, index);
	  };

	  Node.prototype.removeChild = function removeChild(child) {
	    var index = this.childNodes.indexOf(child);

	    if (index > -1) {
	      this.store && this.store.deregisterNode(child);
	      child.parent = null;
	      this.childNodes.splice(index, 1);
	    }

	    this.updateLeafState();
	  };

	  Node.prototype.removeChildByData = function removeChildByData(data) {
	    var targetNode = null;
	    this.childNodes.forEach(function (node) {
	      if (node.data === data) {
	        targetNode = node;
	      }
	    });

	    if (targetNode) {
	      this.removeChild(targetNode);
	    }
	  };

	  Node.prototype.expand = function expand(callback, expandParent) {
	    var _this = this;

	    var done = function done() {
	      if (expandParent) {
	        var parent = _this.parent;
	        while (parent.level > 0) {
	          parent.expanded = true;
	          parent = parent.parent;
	        }
	      }
	      _this.expanded = true;
	      if (callback) callback();
	    };

	    if (this.shouldLoadData()) {
	      this.loadData(function (data) {
	        if (data instanceof Array) {
	          initLazyLoadChild(_this);
	          done();
	        }
	      });
	    } else {
	      done();
	    }
	  };

	  Node.prototype.doCreateChildren = function doCreateChildren(array) {
	    var _this2 = this;

	    var defaultProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	    array.forEach(function (item) {
	      _this2.insertChild((0, _merge2.default)({ data: item }, defaultProps));
	    });
	  };

	  Node.prototype.collapse = function collapse() {
	    this.expanded = false;
	  };

	  Node.prototype.shouldLoadData = function shouldLoadData() {
	    return this.store.lazy === true && this.store.load && !this.loaded;
	  };

	  Node.prototype.updateLeafState = function updateLeafState() {
	    if (this.store.lazy === true && this.loaded !== true && typeof this.isLeafByUser !== 'undefined') {
	      this.isLeaf = this.isLeafByUser;
	      return;
	    }
	    var childNodes = this.childNodes;
	    if (!this.store.lazy || this.store.lazy === true && this.loaded === true) {
	      this.isLeaf = !childNodes || childNodes.length === 0;
	      return;
	    }
	    this.isLeaf = false;
	  };

	  Node.prototype.setChecked = function setChecked(value, deep, recursion, passValue) {
	    var _this3 = this;

	    this.indeterminate = value === 'half';
	    this.checked = value === true;

	    var _getChildState2 = getChildState(this.childNodes),
	        all = _getChildState2.all,
	        allWithoutDisable = _getChildState2.allWithoutDisable;

	    if (this.childNodes.length && !all && allWithoutDisable) {
	      this.checked = false;
	      value = false;
	    }

	    var handleDescendants = function handleDescendants(lazy) {
	      if (deep && !lazy) {
	        var childNodes = _this3.childNodes;
	        for (var i = 0, j = childNodes.length; i < j; i++) {
	          var child = childNodes[i];
	          passValue = passValue || value !== false;
	          var isCheck = child.disabled ? child.checked : passValue;
	          child.setChecked(isCheck, deep, true, passValue);
	        }

	        var _getChildState3 = getChildState(childNodes),
	            half = _getChildState3.half,
	            _all = _getChildState3.all;

	        if (!_all) {
	          _this3.checked = _all;
	          _this3.indeterminate = half;
	        }
	      }
	    };

	    if (!this.store.checkStrictly && this.shouldLoadData()) {
	      // Only work on lazy load data.
	      this.loadData(function () {
	        handleDescendants(true);
	      }, {
	        checked: value !== false
	      });
	    } else {
	      handleDescendants();
	    }

	    var parent = this.parent;
	    if (!parent || parent.level === 0) return;

	    if (!this.store.checkStrictly && !recursion) {
	      reInitChecked(parent);
	    }
	  };

	  Node.prototype.getChildren = function getChildren() {
	    // this is data
	    var data = this.data;
	    if (!data) return null;

	    var props = this.store.props;
	    var children = 'children';
	    if (props) {
	      children = props.children || 'children';
	    }

	    if (data[children] === undefined) {
	      data[children] = null;
	    }

	    return data[children];
	  };

	  Node.prototype.updateChildren = function updateChildren() {
	    var _this4 = this;

	    var newData = this.getChildren() || [];
	    var oldData = this.childNodes.map(function (node) {
	      return node.data;
	    });

	    var newDataMap = {};
	    var newNodes = [];

	    newData.forEach(function (item, index) {
	      if (item[_util.NODE_KEY]) {
	        newDataMap[item[_util.NODE_KEY]] = { index: index, data: item };
	      } else {
	        newNodes.push({ index: index, data: item });
	      }
	    });

	    oldData.forEach(function (item) {
	      if (!newDataMap[item[_util.NODE_KEY]]) _this4.removeChildByData(item);
	    });

	    newNodes.forEach(function (_ref) {
	      var index = _ref.index,
	          data = _ref.data;

	      _this4.insertChild({ data: data }, index);
	    });

	    this.updateLeafState();
	  };

	  Node.prototype.loadData = function loadData(callback) {
	    var _this5 = this;

	    var defaultProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	    if (this.store.lazy === true && this.store.load && !this.loaded && (!this.loading || Object.keys(defaultProps).length)) {
	      this.loading = true;

	      var resolve = function resolve(children) {
	        _this5.loaded = true;
	        _this5.loading = false;
	        _this5.childNodes = [];

	        _this5.doCreateChildren(children, defaultProps);

	        _this5.updateLeafState();
	        if (callback) {
	          callback.call(_this5, children);
	        }
	      };

	      this.store.load(this, resolve);
	    } else {
	      if (callback) {
	        callback.call(this);
	      }
	    }
	  };

	  _createClass(Node, [{
	    key: 'label',
	    get: function get() {
	      return getPropertyFromData(this, 'label');
	    }
	  }, {
	    key: 'icon',
	    get: function get() {
	      return getPropertyFromData(this, 'icon');
	    }
	  }, {
	    key: 'key',
	    get: function get() {
	      var nodeKey = this.store.key;
	      if (this.data) return this.data[nodeKey];
	      return null;
	    }
	    // 节点的checkbox设置为 disabled

	  }, {
	    key: 'disabled',
	    get: function get() {
	      return getPropertyFromData(this, 'disabled');
	    }
	  }]);

	  return Node;
	}();

	exports.default = Node;

/***/ },

/***/ 462:
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	var NODE_KEY = exports.NODE_KEY = '$treeNodeId';

	var markNodeData = exports.markNodeData = function markNodeData(node, data) {
	  if (data[NODE_KEY]) return;
	  Object.defineProperty(data, NODE_KEY, {
	    value: node.id,
	    enumerable: false,
	    configurable: false,
	    writable: false
	  });
	};

	var getNodeKey = exports.getNodeKey = function getNodeKey(key, data) {
	  if (!key) return data[NODE_KEY];
	  return data[key];
	};

/***/ },

/***/ 463:
/***/ function(module, exports, __webpack_require__) {

	var Component = __webpack_require__(3)(
	  /* script */
	  __webpack_require__(464),
	  /* template */
	  __webpack_require__(465),
	  /* styles */
	  null,
	  /* scopeId */
	  null,
	  /* moduleIdentifier (server only) */
	  null
	)

	module.exports = Component.exports


/***/ },

/***/ 464:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _collapseTransition = __webpack_require__(139);

	var _collapseTransition2 = _interopRequireDefault(_collapseTransition);

	var _checkbox = __webpack_require__(300);

	var _checkbox2 = _interopRequireDefault(_checkbox);

	var _emitter = __webpack_require__(20);

	var _emitter2 = _interopRequireDefault(_emitter);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  name: 'ElTreeNode',

	  componentName: 'ElTreeNode',

	  mixins: [_emitter2.default],

	  props: {
	    node: {
	      default: function _default() {
	        return {};
	      }
	    },
	    props: {},
	    renderContent: Function,
	    type: String
	  },

	  components: {
	    ElCollapseTransition: _collapseTransition2.default,
	    ElCheckbox: _checkbox2.default,
	    NodeContent: {
	      props: {
	        node: {
	          required: true
	        }
	      },
	      render: function render(h) {
	        var parent = this.$parent;
	        var node = this.node;
	        var data = node.data;
	        var store = node.store;
	        return parent.renderContent ? parent.renderContent.call(parent._renderProxy, h, { _self: parent.tree.$vnode.context, node: node, data: data, store: store }) : h(
	          'span',
	          { 'class': this.node.disabled === true ? 'el-tree-node__label is-disabled' : 'el-tree-node__label' },
	          [this.node.label, ' ']
	        );
	      }
	    }
	  },

	  data: function data() {
	    return {
	      tree: null,
	      expanded: false,
	      childNodeRendered: false,
	      showCheckbox: false,
	      oldChecked: null,
	      oldIndeterminate: null
	    };
	  },


	  watch: {
	    'node.indeterminate': function nodeIndeterminate(val) {
	      this.handleSelectChange(this.node.checked, val);
	    },
	    'node.checked': function nodeChecked(val) {
	      this.handleSelectChange(val, this.node.indeterminate);
	    },
	    'node.expanded': function nodeExpanded(val) {
	      this.expanded = val;
	      if (val) {
	        this.childNodeRendered = true;
	      }
	    }
	  },

	  methods: {
	    getNodeKey: function getNodeKey(node, index) {
	      var nodeKey = this.tree.nodeKey;
	      if (nodeKey && node) {
	        return node.data[nodeKey];
	      }
	      return index;
	    },
	    handleSelectChange: function handleSelectChange(checked, indeterminate) {
	      if (this.oldChecked !== checked && this.oldIndeterminate !== indeterminate) {
	        this.tree.$emit('check-change', this.node.data, checked, indeterminate);
	      }
	      this.oldChecked = checked;
	      this.indeterminate = indeterminate;
	    },
	    handleClick: function handleClick() {
	      var store = this.tree.store;
	      store.setCurrentNode(this.node);
	      this.tree.$emit('current-change', store.currentNode ? store.currentNode.data : null, store.currentNode);
	      this.tree.currentNode = this;
	      if (this.tree.expandOnClickNode) {
	        this.handleExpandIconClick();
	      }
	      this.tree.$emit('node-click', this.node.data, this.node, this);
	    },
	    handleExpandIconClick: function handleExpandIconClick() {
	      if (this.node.isLeaf) return;
	      if (this.expanded) {
	        this.tree.$emit('node-collapse', this.node.data, this.node, this);
	        this.node.collapse();
	      } else {
	        this.node.expand();
	        this.$emit('node-expand', this.node.data, this.node, this);
	      }
	    },
	    handleCheckChange: function handleCheckChange(ev) {
	      this.node.setChecked(ev.target.checked, !this.tree.checkStrictly);
	    },
	    handleChildNodeExpand: function handleChildNodeExpand(nodeData, node, instance) {
	      this.broadcast('ElTreeNode', 'tree-node-expand', node);
	      this.tree.$emit('node-expand', nodeData, node, instance);
	    }
	  },

	  created: function created() {
	    var _this = this;

	    var parent = this.$parent;

	    if (parent.isTree) {
	      this.tree = parent;
	    } else {
	      this.tree = parent.tree;
	    }

	    var tree = this.tree;
	    if (!tree) {
	      console.warn('Can not find node\'s tree.');
	    }

	    var props = tree.props || {};
	    var childrenKey = props['children'] || 'children';

	    this.$watch('node.data.' + childrenKey, function () {
	      _this.node.updateChildren();
	    });

	    this.showCheckbox = tree.showCheckbox;

	    if (this.node.expanded) {
	      this.expanded = true;
	      this.childNodeRendered = true;
	    }

	    if (this.tree.accordion) {
	      this.$on('tree-node-expand', function (node) {
	        if (_this.node !== node) {
	          _this.node.collapse();
	        }
	      });
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
	//
	//
	//
	//
	//

/***/ },

/***/ 465:
/***/ function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.node.visible),
	      expression: "node.visible"
	    }],
	    staticClass: "el-tree-node",
	    class: {
	      'is-expanded': _vm.childNodeRendered && _vm.expanded,
	        'is-current': _vm.tree.store.currentNode === _vm.node,
	        'is-hidden': !_vm.node.visible
	    },
	    on: {
	      "click": function($event) {
	        $event.stopPropagation();
	        _vm.handleClick($event)
	      }
	    }
	  }, [_c('div', {
	    staticClass: "el-tree-node__content",
	    style: ({
	      'padding-left': _vm.type === 'line' ? '' : (_vm.node.level - 1) * _vm.tree.indent + 'px'
	    })
	  }, [_c('span', {
	    class: [{
	      'is-leaf': _vm.node.isLeaf,
	      expanded: !_vm.node.isLeaf && _vm.expanded
	    }, _vm.type === 'line' ? 'el-tree-node__toggle-icon' : 'el-tree-node__expand-icon'],
	    on: {
	      "click": function($event) {
	        $event.stopPropagation();
	        _vm.handleExpandIconClick($event)
	      }
	    }
	  }), (_vm.showCheckbox) ? _c('el-checkbox', {
	    attrs: {
	      "indeterminate": _vm.node.indeterminate,
	      "disabled": !!_vm.node.disabled
	    },
	    on: {
	      "change": _vm.handleCheckChange
	    },
	    nativeOn: {
	      "click": function($event) {
	        $event.stopPropagation();
	      }
	    },
	    model: {
	      value: (_vm.node.checked),
	      callback: function($$v) {
	        _vm.node.checked = $$v
	      },
	      expression: "node.checked"
	    }
	  }) : _vm._e(), (_vm.node.loading) ? _c('span', {
	    staticClass: "el-tree-node__loading-icon el-icon-loading"
	  }) : _vm._e(), _c('node-content', {
	    attrs: {
	      "node": _vm.node
	    }
	  })], 1), _c('el-collapse-transition', [_c('div', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.expanded),
	      expression: "expanded"
	    }],
	    staticClass: "el-tree-node__children"
	  }, _vm._l((_vm.node.childNodes), function(child) {
	    return _c('el-tree-node', {
	      key: _vm.getNodeKey(child),
	      attrs: {
	        "render-content": _vm.renderContent,
	        "node": child,
	        "type": _vm.type
	      },
	      on: {
	        "node-expand": _vm.handleChildNodeExpand
	      }
	    })
	  }))])], 1)
	},staticRenderFns: []}

/***/ },

/***/ 466:
/***/ function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "el-tree",
	    class: [{
	      'el-tree--highlight-current': _vm.highlightCurrent
	    }, 'el-tree__' + _vm.type]
	  }, [_vm._l((_vm.root.childNodes), function(child) {
	    return _c('el-tree-node', {
	      key: _vm.getNodeKey(child),
	      attrs: {
	        "node": child,
	        "props": _vm.props,
	        "render-content": _vm.renderContent,
	        "type": _vm.type
	      },
	      on: {
	        "node-expand": _vm.handleNodeExpand
	      }
	    })
	  }), (!_vm.root.childNodes || _vm.root.childNodes.length === 0) ? _c('div', {
	    staticClass: "el-tree__empty-block"
	  }, [_c('span', {
	    staticClass: "el-tree__empty-text"
	  }, [_vm._v(_vm._s(_vm.emptyText))])]) : _vm._e()], 2)
	},staticRenderFns: []}

/***/ },

/***/ 467:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _treeExtra = __webpack_require__(468);

	var _treeExtra2 = _interopRequireDefault(_treeExtra);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* istanbul ignore next */
	_treeExtra2.default.install = function (Vue) {
	  Vue.component(_treeExtra2.default.name, _treeExtra2.default);
	};

	exports.default = _treeExtra2.default;

/***/ },

/***/ 468:
/***/ function(module, exports, __webpack_require__) {

	var Component = __webpack_require__(3)(
	  /* script */
	  __webpack_require__(469),
	  /* template */
	  __webpack_require__(470),
	  /* styles */
	  null,
	  /* scopeId */
	  null,
	  /* moduleIdentifier (server only) */
	  null
	)

	module.exports = Component.exports


/***/ },

/***/ 469:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; //
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

	var _index = __webpack_require__(457);

	var _index2 = _interopRequireDefault(_index);

	var _index3 = __webpack_require__(243);

	var _index4 = _interopRequireDefault(_index3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//  let count = 99999;
	exports.default = {
	  name: 'ElTreeExtra',

	  components: {
	    ElTree: _index2.default,
	    ElInput: _index4.default
	  },

	  data: function data() {
	    return {
	      addStatus: false,
	      showAdd: {
	        type: Boolean,
	        default: false
	      },
	      showDelete: {
	        type: Boolean,
	        default: false
	      },
	      showEdit: {
	        type: Boolean,
	        default: false
	      }
	    };
	  },


	  props: {
	    data: {
	      type: Array
	    },
	    emptyText: {
	      type: String,
	      default: '暂无数据'
	    },
	    nodeKey: String,
	    checkStrictly: Boolean,
	    defaultExpandAll: Boolean,
	    expandOnClickNode: {
	      type: Boolean,
	      default: true
	    },
	    defaultCheckedKeys: Array,
	    defaultExpandedKeys: Array,
	    autoExpandParent: {
	      type: Boolean,
	      default: true
	    },
	    showCheckbox: {
	      type: Boolean,
	      default: false
	    },
	    props: {
	      default: function _default() {
	        return {
	          children: 'children',
	          label: 'label',
	          icon: 'icon',
	          disabled: 'disabled'
	        };
	      }
	    },
	    lazy: {
	      type: Boolean,
	      default: false
	    },
	    highlightCurrent: Boolean,
	    currentNodeKey: [String, Number],
	    load: Function,
	    filterNodeMethod: Function,
	    accordion: Boolean,
	    indent: {
	      type: Number,
	      default: 16
	    },
	    maxlength: {
	      type: Number,
	      default: 10
	    },
	    nodeClick: {
	      type: Function
	    },
	    currentChange: {
	      type: Function
	    },
	    nodeExpand: {
	      type: Function
	    },
	    nodeCollapse: {
	      type: Function
	    },
	    iconAdd: {
	      type: String,
	      default: 'el-icon-plus' // 增加图标类名
	    },
	    iconEdit: {
	      type: String,
	      default: 'el-icon-edit' // 编辑图标类名
	    },
	    iconDelete: {
	      type: String,
	      default: 'el-icon-delete' // 删除图标类名
	    },
	    showIcon: {
	      type: Boolean,
	      default: false
	    },
	    type: {
	      type: String,
	      default: 'default'
	    },
	    beforeDeleteNode: Function,
	    afterDeleteNode: Function,
	    beforeAddNode: Function, // 设置新增节点初始数据，必须包含id和children
	    saveNewData: Function, // 保存新增节点的最终数据，输入框失去焦点 -- 新增
	    afterAddNode: Function,
	    beforeEditNode: Function, // 设置编辑节点前事件
	    saveEditData: Function, // 保存编辑节点的最终数据，输入框失去焦点 -- 编辑
	    afterEditNode: Function,
	    setCustomIcon: Function // 自定义图标
	  },

	  computed: {},

	  watch: {},

	  methods: {
	    // 节点点击事件
	    handleNodeClick: function handleNodeClick(data, node, elements) {
	      //        if (this.nodeClick) {
	      //          this.nodeClick(data, node, elements);
	      //        }
	      this.$emit('node-click', data, node, elements);
	    },

	    // 	节点被点击时的回调
	    handleCheckChange: function handleCheckChange(data, checked, indeterminate) {
	      //        if (this.checkChange) {
	      //          this.checkChange(data, checked, indeterminate);
	      //        }
	      this.$emit('check-change', data, checked, indeterminate);
	    },
	    handleCurrentChange: function handleCurrentChange(data, node) {
	      //        if (this.currentChange) {
	      //          this.currentChange(data, node);
	      //        }
	      this.$emit('current-change', data, node);
	    },
	    handleNodeExpand: function handleNodeExpand(data, node, element) {
	      //        if (this.nodeExpand) {
	      //          this.nodeExpand(data, node, element);
	      //        }
	      this.$emit('node-expand', data, node, element);
	    },
	    handleNodeCollapse: function handleNodeCollapse(data, node, element) {
	      //        if (this.nodeCollapse) {
	      //          this.nodeCollapse(data, node, element);
	      //        }
	      this.$emit('node-collapse', data, node, element);
	    },

	    // 设置名称显示
	    setLableName: function setLableName(h, _ref) {
	      var data = _ref.data,
	          node = _ref.node,
	          store = _ref.store;

	      var that = this;
	      return h('span', {
	        class: ['el-tree__extra-name', data.mark ? 'is-mark' : ''],
	        attrs: {
	          id: data.id
	        }
	      }, [h('span', {
	        class: 'name-loader'
	      }), that.setNodeIcon(h, { data: data, node: node, store: store }), that.setNameValue(h, { data: data, node: node, store: store }), h('input', {
	        class: ['el-tree__extra-edit'],
	        domProps: {
	          value: data.label
	        },
	        attrs: {
	          maxlength: that.maxlength
	        },
	        style: {
	          //   display: 'none' // data.editable ? 'inline-block' : 'none'
	        },
	        on: {
	          click: function click(event) {
	            event.stopPropagation();
	            event.preventDefault();
	          },
	          input: function input(event) {
	            //                data.label = document.getElementById(data.id).value
	            //                data.label = document.getElementById(data.id).value;
	          },
	          focus: function focus() {
	            that.editFocusNode(data, node, store);
	          },
	          blur: function blur() {
	            that.editBlurNode(data, node, store);
	          }
	        }
	      })]);
	    },
	    setNodeIcon: function setNodeIcon(h, _ref2) {
	      var data = _ref2.data,
	          node = _ref2.node,
	          store = _ref2.store;

	      if (this.showIcon) {
	        return h('i', {
	          class: ['el-tree__extra-icon', data.icon]
	        });
	      } else {
	        return;
	      }
	    },
	    setNameValue: function setNameValue(h, _ref3) {
	      var data = _ref3.data,
	          node = _ref3.node,
	          store = _ref3.store;

	      if (data.label && data.label.length > 10) {
	        return h('el-tooltip', {
	          attrs: {
	            content: data.label,
	            placement: 'top',
	            effect: 'light'
	          }
	        }, [h('span', {
	          domProps: {
	            innerHTML: data.label
	          },
	          class: ['name-value', data.disabled ? 'is-disabled' : '']
	        })]);
	      } else {
	        return h('span', {
	          domProps: {
	            innerHTML: data.label
	          },
	          class: ['name-value', data.disabled ? 'is-disabled' : '']
	        });
	      }
	    },

	    // 设置“添加”
	    setAddIcon: function setAddIcon(h, _ref4) {
	      var _this = this;

	      var data = _ref4.data,
	          node = _ref4.node,
	          store = _ref4.store;

	      return h(
	        'i',
	        { style: { display: data.showAdd ? 'inline-block' : 'none' }, 'class': this.iconAdd, on: {
	            'click': function click(event) {
	              return _this.addNode.call(_this, data, node, store, event);
	            }
	          }
	        },
	        []
	      );
	    },

	    // 设置“编辑”
	    setEditIcon: function setEditIcon(h, _ref5) {
	      var _this2 = this;

	      var data = _ref5.data,
	          node = _ref5.node,
	          store = _ref5.store;

	      return h(
	        'i',
	        { style: { display: data.showEdit ? 'inline-block' : 'none' }, 'class': this.iconEdit, on: {
	            'click': function click(event) {
	              return _this2.editNode(data, node, store, event);
	            }
	          }
	        },
	        []
	      );
	    },

	    // 设置“删除”
	    setDeleteIcon: function setDeleteIcon(h, _ref6) {
	      var _this3 = this;

	      var data = _ref6.data,
	          node = _ref6.node,
	          store = _ref6.store;

	      return h(
	        'i',
	        { style: { display: data.showDelete ? 'inline-block' : 'none' }, 'class': this.iconDelete, on: {
	            'click': function click(event) {
	              return _this3.deleteNode.call(_this3, data, node, store, event);
	            }
	          }
	        },
	        []
	      );
	    },
	    setSlotIcon: function setSlotIcon(h, _ref7) {
	      var data = _ref7.data,
	          node = _ref7.node,
	          store = _ref7.store;

	      if (typeof this.setCustomIcon !== 'function') {
	        return;
	      }
	      return this.setCustomIcon(h, { data: data, node: node, store: store });
	    },

	    // 编辑节点
	    editNode: function editNode(data, node, store, event) {
	      var _this4 = this;

	      event.stopPropagation();
	      if (typeof this.beforeEditNode === 'function') {
	        var call = function call() {
	          _this4.$nextTick(function () {
	            var oldClassName = document.getElementById(data.id).className;
	            if (oldClassName.indexOf('is-edit') < 0) {
	              document.getElementById(data.id).className = oldClassName.concat(' is-edit');
	            }
	            // 获取当前节点的输入框焦点
	            document.getElementById(data.id).lastChild.focus();
	          });
	        };
	        this.beforeEditNode(call, data, node, store);
	      } else {
	        this.$nextTick(function () {
	          var oldClassName = document.getElementById(data.id).className;
	          if (oldClassName.indexOf('is-edit') < 0) {
	            document.getElementById(data.id).className = oldClassName.concat(' is-edit');
	          }
	          // 获取当前节点的输入框焦点
	          document.getElementById(data.id).lastChild.focus();
	        });
	      }
	    },

	    // 输入框获取焦点事件
	    editFocusNode: function editFocusNode(data, node, store) {
	      //        data.editId = data.editId;
	      this.$nextTick(function () {
	        //          document.getElementById(data.id).previousSibling.style.display = 'none';
	        //          document.getElementById(data.id).parentNode.nextSibling.style.display = 'none';
	      });
	    },

	    // 输入框失去焦点事件，即保存节点方法
	    editBlurNode: function editBlurNode(data, node, store) {
	      var newValue = document.getElementById(data.id).lastChild.value; // 存储输入框的值
	      var oldClassName = document.getElementById(data.id).className;
	      if (oldClassName.indexOf('is-saving') < 0) {
	        document.getElementById(data.id).className = oldClassName.concat(' is-saving'); // 失去焦点添加“保存中状态”
	      }
	      document.getElementById(data.id).lastChild.setAttribute('disabled', 'disabled');
	      if (this.addStatus) {
	        this.beforeSaveNewData.call(this, data, node, store, newValue);
	      } else {
	        this.beforeSaveEditData.call(this, data, node, store, newValue);
	      }
	    },

	    // 输入框失去焦点保存新增节点数据前
	    beforeSaveNewData: function beforeSaveNewData(data, node, store, newValue) {
	      if (typeof this.saveNewData !== 'function') {
	        alert('未配置saveNewData方法,节点未保存');
	        store.remove(data);
	        return;
	      }
	      var that = this;
	      function call(result, newData) {
	        that.addStatus = false;
	        if ((typeof newData === 'undefined' ? 'undefined' : _typeof(newData)) !== 'object') {
	          alert('saveNewData的返回值错误');
	          return;
	        }
	        if (result) {
	          var _ret = function () {
	            // data.editable = false;  // 输入框编辑状态设置为false
	            //            Object.assign(data, newData);
	            var keys = Object.keys(newData);
	            var $set = that.$set;
	            keys.map(function (x) {
	              $set(data, x, newData[x]);
	            });
	            that.$nextTick(function () {
	              var oldClassName = document.getElementById(data.id).className;
	              if (oldClassName.indexOf('is-edit  is-saving') > 0) {
	                document.getElementById(data.id).className = oldClassName.replace(/ is-edit is-saving/, '');
	              }
	              document.getElementById(data.id).lastChild.removeAttribute('disabled');
	            });

	            // after
	            if (typeof that.afterAddNode === 'function') {
	              that.afterAddNode(data, node, store);
	            }
	            return {
	              v: void 0
	            };
	          }();

	          if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	        } else {
	          //            store.remove(data); // 如果输入框值为空，则删除节点
	          //            that.$message({
	          //              message: '节点名称为空,将无法保存',
	          //              type: 'warning'
	          //            });
	          node.parent.data.children.splice(0, 1);
	          if (node.parent !== null) {
	            that.noChildrenDelete(data, node, store);
	          }
	          //     node.parent.data.children.splice(0, 1);
	          return;
	        }
	      }
	      // 获取新增数据最新值事件
	      this.saveNewData(call, data, node, store, newValue);
	    },

	    // 输入框失去焦点保存编辑节点数据前
	    beforeSaveEditData: function beforeSaveEditData(data, node, store, newValue) {
	      var that = this;
	      var oldLabel = data.label; // 存储原来的label值
	      that.addStatus = false;
	      if (typeof that.saveEditData !== 'function') {
	        alert('未配置saveEditData方法,节点未保存');
	        data.label = oldLabel;
	        return;
	      }
	      function call(result, newData) {
	        if ((typeof newData === 'undefined' ? 'undefined' : _typeof(newData)) !== 'object') {
	          alert('saveEditData的返回值错误');
	          return;
	        }
	        if (result) {
	          Object.assign(data, newData);
	          //            let keys = Object.keys(newData);
	          //            let $set = that.$set;
	          //            keys.map(x => {
	          //              $set(data, x, newData[x]);
	          //            });
	          that.$nextTick(function () {
	            var oldClassName = document.getElementById(data.id).className;
	            if (oldClassName.indexOf('is-edit is-saving') > 0) {
	              document.getElementById(data.id).className = oldClassName.replace(/ is-edit is-saving/, '');
	            }
	            document.getElementById(data.id).lastChild.removeAttribute('disabled');
	          });

	          // after
	          if (typeof that.afterEditNode === 'function') {
	            that.afterEditNode(data, node, store);
	          }
	          return;
	        } else {
	          Object.assign(data, newData);
	          that.$nextTick(function () {
	            var oldClassName = document.getElementById(data.id).className;
	            if (oldClassName.indexOf('is-edit is-saving') > 0) {
	              document.getElementById(data.id).className = oldClassName.replace(/ is-edit is-saving/, '');
	            }
	            document.getElementById(data.id).lastChild.value = oldLabel;
	            document.getElementById(data.id).lastChild.removeAttribute('disabled');
	          });
	          return;
	        }
	      }
	      // 获取编辑数据最新值事件
	      this.saveEditData(call, data, node, store, newValue);
	    },
	    addNode: function addNode(data, node, store, event) {
	      event.stopPropagation();
	      if (typeof this.beforeAddNode !== 'function') {
	        alert('未配置beforeAddNode方法');
	        return;
	      };
	      var that = this;
	      if (that.addStatus) {
	        that.$message({
	          message: '子节点新增中，暂时无法新增',
	          type: 'warning'
	        });
	        return;
	      }
	      function call(newData) {
	        that.addStatus = true;
	        if ((typeof newData === 'undefined' ? 'undefined' : _typeof(newData)) !== 'object') {
	          alert('beforeAddNode的返回值错误');
	          return;
	        }
	        store.appendBefore(newData, data);
	        if (node.data.children === 'undefined' || node.data.children === undefined || node.data.children === null || node.data.children === 'NULL') {
	          node.data.children = [];
	        }
	        node.data.children.splice(0, 0, newData); // node 里面的data子节点数据加1(根节点必须要配置children)
	        if (!node.expanded) {
	          node.expand();
	        }
	        that.$nextTick(function () {
	          node = store.currentNode;
	          var oldClassName = document.getElementById(newData.id).className;
	          if (oldClassName.indexOf('is-edit') < 0) {
	            document.getElementById(newData.id).className = oldClassName.concat(' is-edit');
	          }
	          document.getElementById(newData.id).lastChild.focus();
	        });
	      }
	      this.beforeAddNode(call, data, node, store);
	    },
	    deleteNode: function deleteNode(data, node, store, event) {
	      event.preventDefault();
	      //        let e = window.event || event;
	      //        if (document.all) {  // 只有ie识别
	      //          e.cancelBubble = true;
	      //        } else {
	      //          e.stopPropagation();
	      //        }
	      // before
	      if (typeof this.beforeDeleteNode !== 'function') {
	        alert('未配置beforeDeleteNode方法');
	        return;
	      };
	      var that = this;
	      function call(result) {
	        if (result) {
	          store.remove(data);
	          if (node.parent !== null) {
	            node.parent.data.children.forEach(function (child, index) {
	              var cId = child.id;
	              if (cId === data.id) {
	                node.parent.data.children.splice(index, 1);
	              }
	            });
	            that.noChildrenDelete(data, node, store);
	          }
	          // after
	          that.afterDeleteNode && that.afterDeleteNode.call(that, data, node, store);
	        } else {
	          return;
	        }
	      }
	      this.beforeDeleteNode(call, data, node, store);
	    },
	    noChildrenDelete: function noChildrenDelete(data, node, store) {
	      node.parent.childNodes.forEach(function (childNode, index) {
	        var cnId = childNode.data.id;
	        if (cnId === data.id) {
	          node.parent.childNodes.splice(index, 1);
	        }
	      });
	      if (node.parent.childNodes.length === 0) {
	        node.parent.isLeaf = true;
	        node.parent.expanded = false;
	      }
	    },
	    renderContentEx: function renderContentEx(h, _ref8) {
	      var data = _ref8.data,
	          node = _ref8.node,
	          store = _ref8.store;

	      var that = this;
	      return h('span', {
	        'class': ['el-tree__extra-label']
	      }, [that.setLableName(h, { data: data, node: node, store: store }), h('span', {
	        'class': ['el-tree__extra-control']
	      }, [that.setAddIcon(h, { data: data, node: node, store: store }), that.setEditIcon(h, { data: data, node: node, store: store }), that.setDeleteIcon(h, { data: data, node: node, store: store }), that.setSlotIcon.call(that, h, { data: data, node: node, store: store })])]);
	    },
	    filter: function filter(value) {
	      return this.$refs.extra.filter(value);
	    },
	    getNodeKey: function getNodeKey(node, index) {
	      return this.$refs.extra.getNodeKey(node, index);
	    },
	    getCheckedNodes: function getCheckedNodes(leafOnly) {
	      return this.$refs.extra.getCheckedNodes(leafOnly);
	    },
	    getCheckedKeys: function getCheckedKeys(leafOnly) {
	      return this.$refs.extra.getCheckedKeys(leafOnly);
	    },
	    setCheckedNodes: function setCheckedNodes(nodes, leafOnly) {
	      return this.$refs.extra.setCheckedNodes(nodes, leafOnly);
	    },
	    setCheckedKeys: function setCheckedKeys(keys, leafOnly) {
	      return this.$refs.extra.setCheckedKeys(keys, leafOnly);
	    },
	    setChecked: function setChecked(data, checked, deep) {
	      return this.$refs.extra.setChecked(data, checked, deep);
	    }
	  },
	  mounted: function mounted() {},
	  created: function created() {}
	};

/***/ },

/***/ 470:
/***/ function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('el-tree', {
	    ref: "extra",
	    staticClass: "el-tree__extra",
	    attrs: {
	      "data": _vm.data,
	      "empty-text": _vm.emptyText,
	      "node-key": _vm.nodeKey,
	      "check-strictly": _vm.checkStrictly,
	      "default-expand-all": _vm.defaultExpandAll,
	      "expand-on-click-node": _vm.expandOnClickNode,
	      "auto-expand-parent": _vm.autoExpandParent,
	      "default-checked-keys": _vm.defaultCheckedKeys,
	      "default-expanded-keys": _vm.defaultExpandedKeys,
	      "render-content": _vm.renderContentEx,
	      "show-checkbox": _vm.showCheckbox,
	      "props": _vm.props,
	      "lazy": _vm.lazy,
	      "highlight-current": _vm.highlightCurrent,
	      "current-node-key": _vm.currentNodeKey,
	      "load": _vm.load,
	      "filter-node-method": _vm.filterNodeMethod,
	      "accordion": _vm.accordion,
	      "indent": _vm.indent,
	      "maxlength": _vm.maxlength,
	      "type": _vm.type
	    },
	    on: {
	      "node-click": _vm.handleNodeClick,
	      "check-change": _vm.handleCheckChange,
	      "current-change": _vm.handleCurrentChange,
	      "node-expand": _vm.handleNodeExpand,
	      "node-collapse": _vm.handleNodeCollapse
	    }
	  })
	},staticRenderFns: []}

/***/ }

/******/ });