/**
 * 树组件
 *
 * @author Adolph
 */
define(["jquery", "vue", "nui"], function ($, Vue, Nui) {

	var $template = `<el-tree-extra ref="store"
						:data="treeData"
						:empty-text="emptyText" 
						:node-key="nodeKey" 
						:props="props"
						:load="load" 
						:icon-add="iconAdd"
						:icon-edit="iconEdit"
						:icon-delete="iconDelete"
						:render-content="renderContent"
						:highlight-current="highlightCurrent"
						:current-node-key="currentNodeKey"
						:default-expand-all="defaultExpandAll"
						:expand-on-click-node="expandOnClickNode"
						:auto-expand-parent="autoExpandParent"
						:default-expanded-keys="defaultExpandedKeys"
						:show-checkbox="showCheckbox"
						:check-strictly="checkStrictly"
						:default-checked-keys="defaultCheckedKeys"
						:filter-node-method="filterNodeMethod"
						:accordion="accordion"
						:indent="indent"
						:show-icon="showIcon"
						:maxlength="maxlength"
						:before-add-node="beforeAddNode"
						:save-new-data="saveNewData"
						:before-edit-node="beforeEditNode"
						:save-edit-data="saveEditData"
						:set-custom-icon="setCustomIcon"
						:before-delete-node="beforeDeleteNode"
						:after-delete-node="afterDeleteNode"
						@node-click="nodeClickHandle"
						@check-change="checkChangeHandle"
						@current-change="currentChangeHandle"
						@node-expand="nodeExpandHandle"
						@node-collapse="nodeCollapseHandle">
					 </el-tree-extra>
					`;

	Vue.component("ns-tree", {
		template: $template,
		data: function () {
			return {
				treeData: this.data
			}
		},
		props: {
			url: String,
			data: {
				type: Array,
				default: function () {
					return [];
				}
			},
			emptyText: {
				type: String,
				default: function () {
					return "暂无数据";
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
			showIcon: Boolean,
			defaultCheckedKeys: Array,
			defaultExpandedKeys: Array,
			renderContent: Function,
			showCheckbox: {
				type: Boolean,
				default: false
			},
			maxlength: {
				type: Number
			},
			props: {
				default: function () {
					return {
						children: 'children',
						label: 'label',
						icon: 'icon'
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
			beforeAddNode: Function,
			saveNewData: Function,
			beforeEditNode: Function,
			saveEditData: Function,
			setCustomIcon: Function,
			beforeDeleteNode: Function,
			afterDeleteNode: Function,
			iconAdd: {
				type: String,
				default: function () {
					return "bui-add";
				}
			},
			iconEdit: {
				type: String,
				default: function () {
					return "bui-edit";
				}
			},
			iconDelete: {
				type: String,
				default: function () {
					return "bui-delete";
				}
			}
		},
		computed: {},
		watch: {
			defaultCheckedKeys: function (newVal) {
				this.$refs.store.defaultCheckedKeys = newVal;
				this.$refs.store.setDefaultCheckedKey(newVal);
			},
			defaultExpandedKeys: function (newVal) {
				this.$refs.store.defaultExpandedKeys = newVal;
				this.$refs.store.setDefaultExpandedKeys(newVal);
			},
			data: function(newVal){
				this.$set(this,"treeData",newVal);
			}
			
		},
		methods: {
			filter: function (value) {
				if (!this.filterNodeMethod) {
					throw new Error('[Tree] filterNodeMethod is required when filter');
				}
				this.$refs.store.filter(value);
			},
			getNodeKey: function (node, index) {
				const nodeKey = this.nodeKey;
				if (nodeKey && node) {
					return node.data[nodeKey];
				}
				return index;
			},

			getCheckedNodes: function (leafOnly) {
				return this.$refs.store.getCheckedNodes(leafOnly);
			},
			getCheckedKeys: function (leafOnly) {
				return this.$refs.store.getCheckedKeys(leafOnly);
			},
			setCheckedNodes: function (nodes, leafOnly) {
				if (!this.nodeKey) {
					throw new Error('[Tree] nodeKey is required in setCheckedNodes');
				}
				this.$refs.store.setCheckedNodes(nodes, leafOnly);
			},
			setCheckedKeys: function (keys, leafOnly) {
				if (!this.nodeKey) {
					throw new Error('[Tree] nodeKey is required in setCheckedNodes');
				}
				this.$refs.store.setCheckedKeys(keys, leafOnly);
			},
			setChecked: function (data, checked, deep) {
				this.$refs.store.setChecked(data, checked, deep);
			},
			nodeClickHandle: function (nodeData, node, instance) {
				this.$emit("node-click", nodeData, node, instance);
			},
			checkChangeHandle: function (nodeData, node, instance) {
				this.$emit("check-change", nodeData, node, instance);
			},
			nodeExpandHandle: function (nodeData, node, instance) {
				this.$emit("node-expand", nodeData, node, instance);
			},
			nodeCollapseHandle: function (nodeData, node, instance) {
				this.$emit("node-collapse", nodeData, node, instance);
			},
			currentChangeHandle: function (nodeData, node) {
				this.$emit("current-change", nodeData, node);
			},
			// 新增方法
			/**
			 * 刷新树
			 */
			refresh: function() {
				var _url = this.url;
				if (_url) {
					this.treeData = [];
					loadTreeData(this.treeData, _url);
				}
			}
		},
		created: function () {
			// 如果url不为空，做异步加载数据
			if (this.url) {
				loadTreeData(this.treeData, this.url);
			}
		}
	});

	// 异步加载tree数据
	function loadTreeData(data, url) {
		// 清空数据，在异步请求数据
		$.ajax({
			url: ctx + url,
			async: true,
			dataType: "json",
			success: function (json) {
				var result = json.result;
				// 顶级节点为空，直接从子节点中获取
				if (result instanceof Object && !result.hasOwnProperty("id") && !result.hasOwnProperty("label") && result.hasOwnProperty("children")) {
					$.each(result.children, function (i, val) {
						data.push(val);
					});
				} else if (result instanceof Object && result.hasOwnProperty("id") && result.hasOwnProperty("label")) {
					// 顶级节点不为空
					data.push(result);
				} else if (Array.isArray(result)) {
					// 直接返回多个节点
					$.each(result, function (i, val) {
						data.push(val);
					});
				} else {
					throw new Error("数据类型错误");
				}
			},
			error: function () {
				throw new Error("数据请求出错");
			}
		});
	}

});