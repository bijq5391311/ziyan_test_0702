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

	module.exports = __webpack_require__(292);


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

/***/ 111:
/***/ function(module, exports) {

	module.exports = require("nui-js/lib/locale");

/***/ },

/***/ 139:
/***/ function(module, exports) {

	module.exports = require("nui-js/lib/transitions/collapse-transition");

/***/ },

/***/ 247:
/***/ function(module, exports) {

	module.exports = require("nui-js/lib/utils/merge");

/***/ },

/***/ 292:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _tree = __webpack_require__(293);

	var _tree2 = _interopRequireDefault(_tree);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* istanbul ignore next */
	_tree2.default.install = function (Vue) {
	  Vue.component(_tree2.default.name, _tree2.default);
	};

	exports.default = _tree2.default;

/***/ },

/***/ 293:
/***/ function(module, exports, __webpack_require__) {

	var Component = __webpack_require__(3)(
	  /* script */
	  __webpack_require__(294),
	  /* template */
	  __webpack_require__(302),
	  /* styles */
	  null,
	  /* scopeId */
	  null,
	  /* moduleIdentifier (server only) */
	  null
	)

	module.exports = Component.exports


/***/ },

/***/ 294:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _treeStore = __webpack_require__(295);

	var _treeStore2 = _interopRequireDefault(_treeStore);

	var _locale = __webpack_require__(111);

	var _emitter = __webpack_require__(20);

	var _emitter2 = _interopRequireDefault(_emitter);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  name: 'ElMulti',

	  mixins: [_emitter2.default],

	  components: {
	    ElMultiNode: __webpack_require__(298)
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
	      default: true
	    },
	    showSelectall: {
	      type: Boolean,
	      default: true
	    },
	    showTooltip: {
	      type: Boolean,
	      default: true
	    },
	    props: {
	      default: function _default() {
	        return {
	          children: 'children',
	          label: 'label',
	          icon: 'icon',
	          mark: 'mark',
	          appoint: 'appoint',
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
	    accordion: {
	      type: Boolean,
	      default: true
	    },
	    indent: {
	      type: Number,
	      default: 15
	    },
	    cols: {
	      type: Number,
	      default: 3
	    },
	    setChildTop: {
	      type: Number,
	      default: 36
	    },
	    setPosition: {
	      type: Number,
	      default: 46
	    },
	    setIcon: {
	      type: String,
	      default: 'el-icon-menu'
	    },
	    leafCheckLimit: {
	      type: Boolean,
	      default: false
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
	      this.broadcast('ElMultiNode', 'multi-node-expand', node);
	      this.$emit('node-expand', nodeData, node, instance);
	    },
	    getRootLeafNodes: function getRootLeafNodes() {
	      return this.root.isLeafNodes;
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
	  },
	  mounted: function mounted() {
	    var _this = this;

	    this.$nextTick(function () {
	      // TODO 此功能项可能会有问题
	      //        console.log(this.$children);
	      //        let nodeHeight = this.$el.getElementsByClassName('el-multi-node-1')[0].childNodes[0].clientHeight;
	      for (var i = 0; i < _this.$children.length; i++) {
	        if (i > 0 && i <= 2) {
	          //            console.log(this.$children[i].setChildTop);
	          _this.$children[i].setChildTop = _this.setChildTop * 1;
	        } else if (i > 2 && i <= 5) {
	          _this.$children[i].setChildTop = _this.$children[i].setChildTop * 2;
	        } else if (i > 5 && i <= 8) {
	          _this.$children[i].setChildTop = _this.$children[i].setChildTop * 3;
	        } else if (i > 8 && i <= 11) {
	          _this.$children[i].setChildTop = _this.$children[i].setChildTop * 4;
	        } else if (i > 11 && i <= 14) {
	          _this.$children[i].setChildTop = _this.$children[i].setChildTop * 5;
	        } else if (i > 14 && i <= 17) {
	          _this.$children[i].setChildTop = _this.$children[i].setChildTop * 6;
	        } else if (i > 17 && i <= 20) {
	          _this.$children[i].setChildTop = _this.$children[i].setChildTop * 7;
	        } else if (i > 20 && i <= 23) {
	          _this.$children[i].setChildTop = _this.$children[i].setChildTop * 8;
	        } else if (i > 23 && i <= 26) {
	          _this.$children[i].setChildTop = _this.$children[i].setChildTop * 9;
	        } else if (i > 26 && i <= 29) {
	          _this.$children[i].setChildTop = _this.$children[i].setChildTop * 10;
	        } else if (i > 29 && i <= 32) {
	          _this.$children[i].setChildTop = _this.$children[i].setChildTop * 10;
	        } else if (i > 32 && i <= 35) {
	          _this.$children[i].setChildTop = _this.$children[i].setChildTop * 10;
	        } else if (i > 35 && i <= 38) {
	          _this.$children[i].setChildTop = _this.$children[i].setChildTop * 10;
	        } else if (i > 38 && i <= 41) {
	          _this.$children[i].setChildTop = _this.$children[i].setChildTop * 10;
	        }
	      }
	    });
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

/***/ },

/***/ 295:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _node = __webpack_require__(296);

	var _node2 = _interopRequireDefault(_node);

	var _util = __webpack_require__(297);

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
	    if (nodeKey) this.nodesMap[node.key] = node;
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
	    var _this3 = this;

	    var leafOnly = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	    var checkedKeys = arguments[2];

	    var allNodes = this._getAllNodes();
	    allNodes.sort(function (a, b) {
	      return b.level - a.level;
	    });

	    var keys = Object.keys(checkedKeys);
	    allNodes.forEach(function (node) {
	      var checked = keys.indexOf(node.data[key] + '') > -1;
	      if (!node.disabled) {
	        if (!node.isLeaf) {
	          if (!_this3.checkStrictly) {
	            var childNodes = node.childNodes;

	            var all = true;
	            var none = true;

	            for (var i = 0, j = childNodes.length; i < j; i++) {
	              var child = childNodes[i];
	              if (child.checked !== true || child.indeterminate) {
	                all = false;
	              }
	              if (child.checked !== false || child.indeterminate) {
	                none = false;
	              }
	            }

	            if (all) {
	              node.setChecked(true, !_this3.checkStrictly);
	            } else if (!all && !none) {
	              checked = checked ? true : 'half';
	              node.setChecked(checked, !_this3.checkStrictly && checked === true);
	            } else if (none) {
	              node.setChecked(checked, !_this3.checkStrictly);
	            }
	          } else {
	            node.setChecked(checked, false);
	          }

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
	        } else {
	          node.setChecked(checked, false);
	        }
	      }
	    });
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
	    var _this4 = this;

	    keys = keys || [];
	    this.defaultExpandedKeys = keys;

	    keys.forEach(function (key) {
	      var node = _this4.getNode(key);
	      if (node) node.expand(null, _this4.autoExpandParent);
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

/***/ 296:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _merge = __webpack_require__(247);

	var _merge2 = _interopRequireDefault(_merge);

	var _util = __webpack_require__(297);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var reInitChecked = function reInitChecked(node) {
	  var siblings = node.childNodes;

	  var all = true;
	  var none = true;

	  for (var i = 0, j = siblings.length; i < j; i++) {
	    var sibling = siblings[i];
	    if (!node.disabled) {
	      if (sibling.checked !== true || sibling.indeterminate) {
	        all = false;
	      }
	      if (sibling.checked !== false || sibling.indeterminate) {
	        none = false;
	      }
	    }
	  }

	  if (all) {
	    node.setChecked(true);
	  } else if (!all && !none) {
	    node.setChecked('half');
	  } else if (none) {
	    node.setChecked(false);
	  }
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
	    return '';
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

	    this.number = 0; // 子节点选中数量
	    this.lastLeaf = false; // 是否显示最后一层数据
	    this.isLeafNodes = []; // 最后一层数据
	    this.isLeafChecks = 0; // 子节点选中节点为最后一层节点数量
	    this.isLeafChecksLimit = 0; // 最后一层节点中仅选择条件为 appoint的数据
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
	      this.setLeafNum(); // 设置最后一层数据
	      if (store.defaultExpandAll) {
	        this.expanded = true;
	      };
	    } else if (this.level > 0 && store.lazy && store.defaultExpandAll) {
	      this.expand();
	    }

	    if (!this.data) return;
	    var defaultExpandedKeys = store.defaultExpandedKeys;
	    var key = store.key;
	    if (key && defaultExpandedKeys && defaultExpandedKeys.indexOf(this.key) !== -1) {
	      this.expand(null, store.autoExpandParent);
	    }

	    if (key && store.currentNodeKey && this.key === store.currentNodeKey) {
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

	  Node.prototype.setChecked = function setChecked(value, deep) {
	    var _this3 = this;

	    this.setNumber(); // 设置number的值，显示选中子节点的数量
	    this.indeterminate = value === 'half';
	    this.checked = value === true;

	    var handleDescendants = function handleDescendants() {
	      if (deep) {
	        var childNodes = _this3.childNodes;
	        for (var i = 0, j = childNodes.length; i < j; i++) {
	          var child = childNodes[i];
	          //  当节点中有 disabled 时，那个节点将无法选择
	          if (!child.disabled) {
	            child.setChecked(value !== false, deep);
	          }
	        }
	      }
	    };

	    if (!this.store.checkStrictly && this.shouldLoadData()) {
	      // Only work on lazy load data.
	      this.loadData(function () {
	        handleDescendants();
	      }, {
	        checked: value !== false
	      });
	    } else {
	      handleDescendants();
	    }

	    var parent = this.parent;
	    if (!parent || parent.level === 0) return;

	    if (!this.store.checkStrictly && !parent.disabled) {
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

	    if (this.store.lazy === true && this.store.load && !this.loaded && !this.loading) {
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

	  // 设置number的值


	  Node.prototype.setNumber = function setNumber() {
	    var handleDes = function handleDes(childNodes, resultArr) {
	      for (var i = 0, j = childNodes.length; i < j; i++) {
	        var child = childNodes[i];
	        // 判断是否有勾选，新数据累加其id
	        if (child.checked) {
	          resultArr.push(child.id);
	        }
	        // 如果还有子集，再做遍历
	        if (child.childNodes.length > 0) {
	          handleDes(child.childNodes, resultArr);
	        }
	      };
	      return resultArr;
	    };
	    var newNumlist = [];
	    handleDes(this.childNodes, newNumlist);
	    this.number = newNumlist.length;
	    // console.log(newNumlist);
	    // console.log(this.isLeafNodes);
	    // 将最后一层节点的id拼装成新的数组
	    var leafNodesId = [];
	    var leafNodesAppointId = [];
	    for (var i = 0; i < this.isLeafNodes.length; i++) {
	      leafNodesId.push(this.isLeafNodes[i].id);
	      // 当根节点有(指定)限制属性时，选中的数量为：
	      if (this.isLeafNodes[i].appoint) {
	        // leafNodesSelect.push({
	        //   id: this.isLeafNodes[i].id,
	        //   appoint: this.isLeafNodes[i].appoint
	        // });
	        leafNodesAppointId.push(this.isLeafNodes[i].id);
	      }
	    }
	    // console.log(this.filterArray(newNumlist, leafNodesId));
	    // 比较选中的数组与根节点数组相同的id,获取选中根节点的数量
	    this.isLeafChecks = this.filterArray(newNumlist, leafNodesId).length;
	    this.isLeafChecksLimit = this.filterArray(newNumlist, leafNodesAppointId).length;
	  };

	  // 最后一层叶子节点的数据


	  Node.prototype.setLeafNum = function setLeafNum() {
	    var handleDes = function handleDes(childNodes, resultArr) {
	      for (var i = 0, j = childNodes.length; i < j; i++) {
	        var child = childNodes[i];
	        // 判断是子集合有数据，如果没有数据，数组累加
	        if (child.childNodes === 'undefined' || child.childNodes.length === 0 || child.childNodes === 'null') {
	          resultArr.push({
	            id: child.id,
	            label: child.label,
	            mark: child.mark,
	            appoint: child.appoint
	          });
	        }
	        // 如果还有子集，再做遍历
	        if (child.childNodes.length > 0) {
	          handleDes(child.childNodes, resultArr);
	        }
	      };
	      return resultArr;
	    };
	    var newNumlist = [];
	    handleDes(this.childNodes, newNumlist);
	    this.isLeafNodes = newNumlist;
	  };

	  // 比较两个数组


	  Node.prototype.filterArray = function filterArray(a, b) {
	    // 循环判断数组a里的元素在b里面有没有，有的话就放入新建立的数组中
	    var result = [];
	    var c = b.toString();
	    for (var i = 0; i < a.length; i++) {
	      if (c.indexOf(a[i].toString()) > -1) {
	        for (var j = 0; j < b.length; j++) {
	          if (a[i] === b[j]) {
	            result.push(a[i]);
	            break;
	          }
	        }
	      }
	    }
	    return result;
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
	    // 节点的checkbox设置为 disabled

	  }, {
	    key: 'disabled',
	    get: function get() {
	      return getPropertyFromData(this, 'disabled');
	    }
	    // 标记

	  }, {
	    key: 'mark',
	    get: function get() {
	      return getPropertyFromData(this, 'mark');
	    }
	    // 根节点显示数量（最后一层节点数check选中数量）为指定的字段 appoint

	  }, {
	    key: 'appoint',
	    get: function get() {
	      return getPropertyFromData(this, 'appoint');
	    }
	  }, {
	    key: 'key',
	    get: function get() {
	      var nodeKey = this.store.key;
	      if (this.data) return this.data[nodeKey];
	      return null;
	    }
	  }]);

	  return Node;
	}();

	exports.default = Node;

/***/ },

/***/ 297:
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

/***/ 298:
/***/ function(module, exports, __webpack_require__) {

	var Component = __webpack_require__(3)(
	  /* script */
	  __webpack_require__(299),
	  /* template */
	  __webpack_require__(301),
	  /* styles */
	  null,
	  /* scopeId */
	  null,
	  /* moduleIdentifier (server only) */
	  null
	)

	module.exports = Component.exports


/***/ },

/***/ 299:
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
	  name: 'ElMultiNode',

	  componentName: 'ElMultiNode',

	  mixins: [_emitter2.default],

	  props: {
	    node: {
	      default: function _default() {
	        return {};
	      }
	    },
	    props: {},
	    renderContent: Function
	  },
	  computed: {},
	  components: {
	    ElCheckbox: _checkbox2.default,
	    CollapseTransition: _collapseTransition2.default,
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
	          { 'class': this.node.disabled === true ? 'el-multi-node__label is-disabled' : 'el-multi-node__label' },
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
	      showSelectall: false,
	      showTooltip: false,
	      expandOnClickNode: false,
	      oldChecked: null,
	      oldIndeterminate: null,
	      setExpandedHeight: '',
	      oldCheckNumbers: 0,
	      setChildTop: 36, // 第二级以上层级定位(目前元素高度为36px)
	      setPosition: 0, // 层级高度配置值
	      setIcon: null, // 设置图标（显示最后一层级的）
	      expandTips: '展开',
	      control: {
	        tips: '显示店铺',
	        status: '' // 最后一层级显示时，子级是否已展开状态
	      }
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
	    childStyles: function childStyles() {
	      return {};
	    },
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
	    handleUserClick: function handleUserClick() {
	      if (this.node.indeterminate) {
	        this.node.setChecked(this.node.checked, !this.tree.checkStrictly);
	      }
	    },
	    handleCheckChange: function handleCheckChange(ev) {
	      if (!this.node.indeterminate) {
	        this.node.setChecked(ev.target.checked, !this.tree.checkStrictly);
	      }
	    },
	    handleChildNodeExpand: function handleChildNodeExpand(nodeData, node, instance) {
	      this.broadcast('ElMultiNode', 'multi-node-expand', node);
	      this.tree.$emit('node-expand', nodeData, node, instance);
	    },
	    handleExpandIconClick: function handleExpandIconClick(value) {
	      var _this = this;

	      if (this.node.isLeaf) return;
	      if (this.expanded) {
	        this.expandTips = '展开';
	        this.tree.$emit('node-collapse', this.node.data, this.node, this);
	        this.node.collapse();
	        switch (this.node.level) {
	          case 1:
	            this.handleExpandAll();
	            break;
	        }
	        if (this.node.lastLeaf) {
	          this.node.lastLeaf = false;
	        }
	      } else {
	        this.expandTips = '折叠';
	        this.node.expand();
	        this.$emit('node-expand', this.node.data, this.node, this);
	        this.$nextTick(function () {
	          // 设置一级节点的高度(赋于 子节点的内容区高度)
	          switch (_this.node.level) {
	            case 1:
	              _this.setExpandedHeight = _this.$el.lastChild.clientHeight + _this.setPosition + 'px';
	              break;
	            case 2:
	              _this.$parent.$el.lastChild.style.height = _this.$el.lastChild.clientHeight + 'px';
	              _this.$parent.setExpandedHeight = _this.$el.lastChild.clientHeight + _this.setPosition + 'px';
	              break;
	            case 3:
	              _this.$parent.$el.lastChild.style.height = _this.$el.lastChild.clientHeight + 'px';
	              _this.$parent.$parent.$el.lastChild.style.height = _this.$el.lastChild.clientHeight + 'px';
	              _this.$parent.$parent.setExpandedHeight = _this.$el.lastChild.clientHeight + _this.setPosition + 'px';
	              break;
	            case 4:
	              _this.$parent.$el.lastChild.style.height = _this.$el.lastChild.clientHeight + 'px';
	              _this.$parent.$parent.$el.lastChild.style.height = _this.$el.lastChild.clientHeight + 'px';
	              _this.$parent.$parent.$parent.$el.lastChild.style.height = _this.$el.lastChild.clientHeight + 'px';
	              _this.$parent.$parent.$parent.setExpandedHeight = _this.$el.lastChild.clientHeight + _this.setPosition + 'px';
	              break;
	            case 5:
	              _this.$parent.$el.lastChild.style.height = _this.$el.lastChild.clientHeight + 'px';
	              _this.$parent.$parent.$el.lastChild.style.height = _this.$el.lastChild.clientHeight + 'px';
	              _this.$parent.$parent.$parent.$el.lastChild.style.height = _this.$el.lastChild.clientHeight + 'px';
	              _this.$parent.$parent.$parent.$parent.$el.lastChild.style.height = _this.$el.lastChild.clientHeight + 'px';
	              _this.$parent.$parent.$parent.$parent.setExpandedHeight = _this.$el.lastChild.clientHeight + _this.setPosition + 'px';
	              break;
	            default:
	              break;
	          }
	        });
	      }
	    },

	    // 关闭全部子级
	    handleExpandAll: function handleExpandAll() {
	      this.$el.style.height = 'auto';
	      var x = this.$el.getElementsByClassName('el-multi-node__children');
	      for (var i = 0; i < x.length; i++) {
	        x[i].style.height = 'auto';
	      }
	      this.node.lastLeaf = false;
	      var confirmChild = function confirmChild(childNodes) {
	        for (var _i = 0, j = childNodes.length; _i < j; _i++) {
	          var child = childNodes[_i];
	          child.expanded = false;
	          child.lastLeaf = false;
	          // 如果还有子集，再做遍历
	          if (child.childNodes.length > 0) {
	            confirmChild(child.childNodes);
	          }
	        };
	      };
	      confirmChild(this.node.childNodes);
	      /*  if(this.node.childNodes.length > 0) {
	          this.node.childNodes.forEach(function(e){
	            e.expanded = false;
	            e.lastLeaf = false;
	            if(e.childNodes.length>0){
	              e.childNodes.forEach(function(f){
	                f.expanded = false;
	                f.lastLeaf = false;
	                if(f.childNodes.length>0){
	                  f.childNodes.forEach(function(g){
	                    g.expanded = false;
	                    g.lastLeaf = false;
	                    if(g.childNodes.length>0){
	                      g.childNodes.forEach(function(h){
	                        h.expanded = false;
	                        h.lastLeaf = false;
	                      })
	                    }
	                  })
	                }
	              })
	            }
	          })
	        }*/
	    },

	    // 面包屑层级折叠
	    handleExpand1: function handleExpand1() {
	      var _this2 = this;

	      this.node.collapse();
	      this.$nextTick(function () {
	        switch (_this2.node.level) {
	          case 2:
	            _this2.$parent.$el.lastChild.style.height = 'auto';
	            _this2.$parent.setExpandedHeight = _this2.$parent.$el.lastChild.clientHeight + _this2.setPosition + 'px';
	            break;
	          case 3:
	            _this2.$parent.$el.lastChild.style.height = 'auto';
	            _this2.$parent.$parent.$el.lastChild.style.height = _this2.$parent.$el.lastChild.clientHeight + 'px';
	            _this2.$parent.$parent.setExpandedHeight = _this2.$parent.$el.lastChild.clientHeight + _this2.setPosition + 'px';
	            break;
	          case 4:
	            _this2.$parent.$el.lastChild.style.height = 'auto';
	            _this2.$parent.$parent.$el.lastChild.style.height = _this2.$parent.$el.lastChild.clientHeight + 'px';
	            _this2.$parent.$parent.$parent.$el.lastChild.style.height = _this2.$parent.$el.lastChild.clientHeight + 'px';
	            _this2.$parent.$parent.$parent.setExpandedHeight = _this2.$parent.$el.lastChild.clientHeight + _this2.setPosition + 'px';
	            break;
	          case 5:
	            _this2.$parent.$el.lastChild.style.height = 'auto';
	            _this2.$parent.$parent.$el.lastChild.style.height = _this2.$parent.$el.lastChild.clientHeight + 'px';
	            _this2.$parent.$parent.$parent.$el.lastChild.style.height = _this2.$parent.$el.lastChild.clientHeight + 'px';
	            _this2.$parent.$parent.$parent.$parent.$el.lastChild.style.height = _this2.$parent.$el.lastChild.clientHeight + 'px';
	            _this2.$parent.$parent.$parent.$parent.setExpandedHeight = _this2.$parent.$el.lastChild.clientHeight + _this2.setPosition + 'px';
	            break;
	          default:
	            break;
	        }
	      });
	    },
	    handleExpand2: function handleExpand2() {
	      var _this3 = this;

	      this.node.collapse();
	      this.$parent.node.collapse();
	      this.expanded = false;
	      this.childNodeRendered = false;
	      this.$nextTick(function () {
	        switch (_this3.node.level) {
	          case 3:
	            ;
	            _this3.$parent.$el.lastChild.style.height = 'auto';
	            _this3.$parent.$parent.$el.lastChild.style.height = 'auto';
	            _this3.$parent.$parent.setExpandedHeight = _this3.$parent.$parent.$el.lastChild.clientHeight + _this3.setPosition + 'px';
	            break;
	          case 4:
	            _this3.$parent.$el.lastChild.style.height = 'auto';
	            _this3.$parent.$parent.$el.lastChild.style.height = 'auto';
	            _this3.$parent.$parent.$parent.$el.lastChild.style.height = _this3.$parent.$parent.$el.lastChild.clientHeight + 'px';
	            _this3.$parent.$parent.$parent.setExpandedHeight = _this3.$parent.$parent.$parent.$el.lastChild.clientHeight + _this3.setPosition + 'px';
	            break;
	          case 5:
	            _this3.$parent.$el.lastChild.style.height = 'auto';
	            _this3.$parent.$parent.$el.lastChild.style.height = 'auto';
	            _this3.$parent.$parent.$parent.$el.lastChild.style.height = 'auto';
	            _this3.$parent.$parent.$parent.$parent.$el.lastChild.style.height = _this3.$parent.$parent.$parent.$el.lastChild.clientHeight + 'px';
	            _this3.$parent.$parent.$parent.$parent.setExpandedHeight = _this3.$parent.$parent.$parent.$parent.$el.lastChild.clientHeight + _this3.setPosition + 'px';
	            break;
	          default:
	            break;
	        }
	      });
	    },
	    handleExpand3: function handleExpand3() {
	      var _this4 = this;

	      this.node.collapse();
	      this.$parent.node.collapse();
	      this.$parent.$parent.node.collapse();
	      this.expanded = false;
	      this.childNodeRendered = false;
	      this.$nextTick(function () {
	        switch (_this4.node.level) {
	          case 4:
	            _this4.$parent.$el.lastChild.style.height = 'auto';
	            _this4.$parent.$parent.$el.lastChild.style.height = 'auto';
	            _this4.$parent.$parent.$parent.$el.lastChild.style.height = 'auto';
	            _this4.$parent.$parent.$parent.setExpandedHeight = _this4.$parent.$parent.$parent.$el.lastChild.clientHeight + _this4.setPosition + 'px';
	            break;
	          case 5:
	            _this4.$parent.$el.lastChild.style.height = 'auto';
	            _this4.$parent.$parent.$el.lastChild.style.height = 'auto';
	            _this4.$parent.$parent.$parent.$el.lastChild.style.height = 'auto';
	            _this4.$parent.$parent.$parent.$parent.$el.lastChild.style.height = _this4.$parent.$parent.$parent.$el.lastChild.clientHeight + 'px';
	            _this4.$parent.$parent.$parent.$parent.setExpandedHeight = _this4.$parent.$parent.$parent.$parent.$el.lastChild.clientHeight + _this4.setPosition + 'px';
	            break;
	          default:
	            break;
	        }
	      });
	    },
	    handleExpand4: function handleExpand4() {
	      var _this5 = this;

	      this.node.collapse();
	      this.$parent.node.collapse();
	      this.$parent.$parent.node.collapse();
	      this.$parent.$parent.$parent.node.collapse();
	      this.expanded = false;
	      this.childNodeRendered = false;
	      this.$nextTick(function () {
	        switch (_this5.node.level) {
	          case 5:
	            _this5.$parent.$el.lastChild.style.height = 'auto';
	            _this5.$parent.$parent.$el.lastChild.style.height = 'auto';
	            _this5.$parent.$parent.$parent.$el.lastChild.style.height = 'auto';
	            _this5.$parent.$parent.$parent.$parent.$el.lastChild.style.height = 'auto';
	            _this5.$parent.$parent.$parent.$parent.setExpandedHeight = _this5.$parent.$parent.$parent.$parent.$el.lastChild.clientHeight + _this5.setPosition + 'px';
	            break;
	          default:
	            break;
	        }
	      });
	    },

	    // 显示店铺功能：确认显示全部时，子级是否已经展开
	    confirmNextLevelIsShow: function confirmNextLevelIsShow(nextLevel) {
	      // 根节点才需要做判断
	      if (this.node.level === 1) {
	        if (this.expanded) {
	          nextLevel = true; //展开过
	        } else {
	          nextLevel = false; //未展开过
	        }
	      }
	      return nextLevel;
	    },

	    // 显示店铺功能：显示最后一层级的节点数据
	    showLastLeafNodes: function showLastLeafNodes(value) {
	      var _this6 = this;

	      this.control.status = this.confirmNextLevelIsShow();
	      if (this.node.lastLeaf) {
	        // 关闭
	        this.handleClostlastLeaf();
	        this.control.tips = "显示店铺";
	        this.expandTips = "展开";
	      } else {
	        // 显示
	        this.node.lastLeaf = true;
	        this.control.tips = "关闭店铺";
	        if (this.control.status) {
	          this.$nextTick(function () {
	            _this6.$el.lastChild.style.height = 'auto';
	            _this6.setExpandedHeight = _this6.$el.lastChild.clientHeight + _this6.setPosition + 'px';
	          });
	        } else {
	          this.handleExpandIconClick();
	        }
	      }
	      this.tree.$emit('last-leaf-click', this.node.isLeafNodes); // 点击事件获取本数据的最后一层节点
	    },

	    // 显示店铺功能：关闭显示最后一层级的节点数据
	    handleClostlastLeaf: function handleClostlastLeaf() {
	      var _this7 = this;

	      this.node.lastLeaf = false;
	      this.$nextTick(function () {
	        switch (_this7.node.level) {
	          case 1:
	            if (_this7.expanded) {
	              _this7.node.collapse();
	            }
	            _this7.$nextTick(function () {
	              _this7.$el.lastChild.style.height = 'auto';
	              _this7.setExpandedHeight = _this7.$el.lastChild.clientHeight + _this7.setPosition + 'px';
	            });
	            break;
	          default:
	            _this7.handleExpand1(); // 其他level时，默认返回上一级数据
	            break;
	        }
	      });
	    }
	  },
	  created: function created() {
	    var _this8 = this;

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
	      _this8.node.updateChildren();
	    });

	    this.showCheckbox = tree.showCheckbox;
	    this.showSelectall = tree.showSelectall;
	    this.showTooltip = tree.showTooltip;
	    this.expandOnClickNode = tree.expandOnClickNode;

	    //      this.setChildTop = tree.setChildTop;
	    this.setPosition = tree.setPosition;
	    this.setIcon = tree.setIcon;

	    this.leafCheckLimit = tree.leafCheckLimit; // 最后一层节点选中数量限制

	    if (this.node.expanded) {
	      this.expanded = true;
	      this.childNodeRendered = true;
	    }

	    if (this.tree.accordion) {
	      this.$on('multi-node-expand', function (node) {
	        if (_this8.node !== node) {
	          _this8.node.collapse();
	          _this8.handleExpandAll(); // 关闭全部子集
	          _this8.node.lastLeaf = false;
	        }
	      });
	    }
	  },
	  mounted: function mounted() {
	    //      this.$nextTick(() => {
	    //        if (this.node.level == 1) {
	    //         this.setChildTop = this.$parent.$el.getElementsByClassName('el-multi-node-1')[0].clientHeight;
	    //        }
	    //      })
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

/***/ },

/***/ 300:
/***/ function(module, exports) {

	module.exports = require("nui-js/lib/checkbox");

/***/ },

/***/ 301:
/***/ function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.node.visible),
	      expression: "node.visible"
	    }],
	    staticClass: "el-multi-node",
	    class: ['el-multi-node-' + _vm.node.level, {
	      'is-expanded': _vm.childNodeRendered && _vm.expanded,
	      'is-current': _vm.tree.store.currentNode === _vm.node,
	      'is-hidden': !_vm.node.visible,
	    }],
	    style: ({
	      'height': _vm.expanded && _vm.node.level === 1 ? _vm.setExpandedHeight : 'auto',
	      'width': _vm.node.level === 1 ? 100 / 3 + '%' : 100 / _vm.tree.cols + '%'
	    }),
	    on: {
	      "click": function($event) {
	        $event.stopPropagation();
	        _vm.handleClick($event)
	      }
	    }
	  }, [_c('div', {
	    staticClass: "el-multi-node__content",
	    style: ({
	      'padding-left': _vm.tree.indent + 'px'
	    })
	  }, [(_vm.showCheckbox) ? _c('el-checkbox', {
	    attrs: {
	      "disabled": _vm.node.disabled === true ? true : false,
	      "indeterminate": _vm.node.indeterminate
	    },
	    on: {
	      "change": _vm.handleCheckChange
	    },
	    nativeOn: {
	      "click": function($event) {
	        $event.stopPropagation();
	        _vm.handleUserClick($event)
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
	    staticClass: "el-multi-node__loading-icon el-icon-loading"
	  }) : _vm._e(), (_vm.showTooltip) ? _c('el-tooltip', {
	    attrs: {
	      "content": _vm.node.label,
	      "placement": "top",
	      "effect": "light",
	      "popper-options": {
	        boundariesPadding: 30
	      }
	    }
	  }, [_c('node-content', {
	    attrs: {
	      "node": _vm.node
	    }
	  })], 1) : _c('node-content', {
	    attrs: {
	      "node": _vm.node
	    }
	  }), (!_vm.node.isLeaf) ? _c('el-badge', {
	    attrs: {
	      "value": _vm.leafCheckLimit ? _vm.node.isLeafChecksLimit : _vm.node.isLeafChecks
	    }
	  }) : _vm._e(), _c('span', {
	    staticClass: "el-multi-node__expand-icon el-icon-arrow-down",
	    class: {
	      'is-leaf': _vm.node.isLeaf, expanded: !_vm.node.isLeaf && _vm.expanded
	    },
	    on: {
	      "click": function($event) {
	        $event.stopPropagation();
	        _vm.handleExpandIconClick()
	      }
	    }
	  }), (!_vm.showCheckbox && !_vm.expandOnClickNode && !_vm.node.isLeaf) ? _c('i', {
	    class: [_vm.setIcon, 'el-multi-node__lastleaf-icon', {
	      'is-clicked': _vm.node.lastLeaf
	    }],
	    on: {
	      "click": function($event) {
	        $event.stopPropagation();
	        _vm.showLastLeafNodes()
	      }
	    }
	  }) : _vm._e()], 1), (_vm.node.lastLeaf) ? _c('div', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.expanded),
	      expression: "expanded"
	    }],
	    staticClass: "el-multi-node__children",
	    style: ({
	      'width': '100%',
	      'position': 'absolute',
	      'top': _vm.node.level < 2 ? _vm.setChildTop + 'px' : 0,
	      'left': 0,
	      'z-index': _vm.node.level + 1
	    })
	  }, [_c('div', {
	    staticClass: "el-multi-node__lastleaf"
	  }, [_c('div', {
	    staticClass: "el-multi-node__lastleaf-back"
	  }, [_c('el-breadcrumb', {
	    staticClass: "el-multi-node__breadcrumb",
	    style: ({
	      'padding-left': _vm.tree.indent + 'px'
	    })
	  }, [_c('el-breadcrumb-item', {
	    nativeOn: {
	      "click": function($event) {
	        _vm.handleClostlastLeaf()
	      }
	    }
	  }, [_vm._v(_vm._s(_vm.node.data.label) + " "), _c('span', {
	    staticClass: "el-multi-node__expand-icon el-icon-arrow-up"
	  }), _c('i', {
	    staticClass: "el-icon-menu el-multi-node__lastleaf-icon is-clicked"
	  })]), _c('el-breadcrumb-item', [_vm._v(" 全部店铺")])], 1)], 1), _vm._l((_vm.node.isLeafNodes), function(list) {
	    return (!_vm.node.isLeaf) ? _c('div', {
	      staticClass: "el-multi-node__lastleaf-item",
	      style: ({
	        'width': 100 / _vm.tree.cols + '%'
	      })
	    }, [(list.mark) ? _c('span', {
	      staticClass: "el-multi-node__lastleaf-mark"
	    }, [_vm._v("独")]) : _vm._e(), _c('span', {
	      staticClass: "el-multi-node__lastleaf-value"
	    }, [_vm._v(_vm._s(list.label))])]) : _vm._e()
	  })], 2)]) : _c('div', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.expanded),
	      expression: "expanded"
	    }],
	    staticClass: "el-multi-node__children",
	    style: ({
	      'width': '100%',
	      'position': 'absolute',
	      'top': _vm.node.level < 2 ? _vm.setChildTop + 'px' : 0,
	      'left': 0,
	      'z-index': _vm.node.level + 1
	    })
	  }, [(_vm.node.level > 1 && _vm.expanded) ? _c('el-breadcrumb', {
	    staticClass: "el-multi-node__breadcrumb",
	    style: ({
	      'padding-left': _vm.tree.indent + 'px'
	    }),
	    attrs: {
	      "separator": ">"
	    }
	  }, [(_vm.node.level > 4) ? _c('el-breadcrumb-item', {
	    nativeOn: {
	      "click": function($event) {
	        _vm.handleExpand4($event)
	      }
	    }
	  }, [_vm._v(_vm._s(this.$parent.$parent.$parent.$parent.node.data.label))]) : _vm._e(), (_vm.node.level > 3) ? _c('el-breadcrumb-item', {
	    nativeOn: {
	      "click": function($event) {
	        _vm.handleExpand3($event)
	      }
	    }
	  }, [_vm._v(_vm._s(this.$parent.$parent.$parent.node.data.label))]) : _vm._e(), (_vm.node.level > 2) ? _c('el-breadcrumb-item', {
	    nativeOn: {
	      "click": function($event) {
	        _vm.handleExpand2($event)
	      }
	    }
	  }, [_vm._v(_vm._s(this.$parent.$parent.node.data.label))]) : _vm._e(), _c('el-breadcrumb-item', {
	    nativeOn: {
	      "click": function($event) {
	        _vm.handleExpand1($event)
	      }
	    }
	  }, [_vm._v(_vm._s(this.$parent.node.data.label))]), _c('el-breadcrumb-item', [_vm._v(_vm._s(_vm.node.data.label))])], 1) : _vm._e(), (_vm.node.childNodes.length > 0 && _vm.showSelectall) ? _c('div', {
	    staticClass: "el-multi-select-all",
	    style: ({
	      'padding-left': _vm.tree.indent + 'px',
	      'width': 100 / _vm.tree.cols + '%'
	    })
	  }, [_c('el-checkbox', {
	    attrs: {
	      "disabled": _vm.node.disabled === true ? true : false,
	      "indeterminate": _vm.node.indeterminate
	    },
	    on: {
	      "change": _vm.handleCheckChange
	    },
	    nativeOn: {
	      "click": function($event) {
	        $event.stopPropagation();
	        _vm.handleUserClick($event)
	      }
	    },
	    model: {
	      value: (_vm.node.checked),
	      callback: function($$v) {
	        _vm.node.checked = $$v
	      },
	      expression: "node.checked"
	    }
	  }, [_vm._v("全选\n          ")]), (!_vm.node.isLeaf) ? _c('el-badge', {
	    attrs: {
	      "value": _vm.leafCheckLimit ? _vm.node.isLeafChecksLimit : _vm.node.isLeafChecks
	    }
	  }) : _vm._e()], 1) : _vm._e(), _vm._l((_vm.node.childNodes), function(child) {
	    return _c('el-multi-node', {
	      key: _vm.getNodeKey(child),
	      attrs: {
	        "render-content": _vm.renderContent,
	        "node": child
	      },
	      on: {
	        "node-expand": _vm.handleChildNodeExpand
	      }
	    })
	  })], 2)])
	},staticRenderFns: []}

/***/ },

/***/ 302:
/***/ function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "el-multi",
	    class: {
	      'el-multi--highlight-current': _vm.highlightCurrent
	    }
	  }, [_vm._l((_vm.root.childNodes), function(child, index) {
	    return _c('el-multi-node', {
	      key: _vm.getNodeKey(child),
	      attrs: {
	        "node": child,
	        "props": _vm.props,
	        "render-content": _vm.renderContent
	      },
	      on: {
	        "node-expand": _vm.handleNodeExpand
	      }
	    })
	  }), (!_vm.root.childNodes || _vm.root.childNodes.length === 0) ? _c('div', {
	    staticClass: "el-multi__empty-block"
	  }, [_c('span', {
	    staticClass: "el-multi__empty-text"
	  }, [_vm._v(_vm._s(_vm.emptyText))])]) : _vm._e()], 2)
	},staticRenderFns: []}

/***/ }

/******/ });