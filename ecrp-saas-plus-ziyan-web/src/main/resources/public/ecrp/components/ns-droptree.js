
/**
 * 下拉树
 *
 * @author Adolph Zheng
 */
define(["jquery", "vue", "nui"], function ($, Vue, Nui) {

	// 模板
	var $template = `<el-popover ref="droptreepopover" 
								 v-model="dropTreeVisible"
								 :width="droptreeWidth" 
								 placement="bottom-start" 
								 trigger="click"
								 :disabled="inputDisabled"
								 popper-class="tmp-droptree-popover" 
								 @show="popoverShowHandle"
								 @hide="popoverHideHandle">
						<el-input class="tmp-droptree-search" placeholder="输入关键字进行过滤" v-model="filterText" ></el-input>
						<el-scrollbar wrap-class="tmp-droptree-scroll">
							<el-tree v-show="dropTreeVisible" ref="treeStore" class="tmp-droptree-tree"
								:data="treeData"
								:empty-text="emptyText" 
								:node-key="nodeKey" 
								:props="props" 
								:load="load" 
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
								:filter-node-method="filterNode"
								:accordion="accordion"
								:indent="indent"
								@node-click="nodeClickHandle"
								@check-change="checkChangeHandle"
								@current-change="currentChangeHandle"
								@node-expand="nodeExpandHandle"
								@node-collapse="nodeCollapseHandle">
							</el-tree>
						</el-scrollbar>
						<el-input type="hidden" style="display: none;" v-model="dropValue"></el-input>
						<el-input type="hidden" style="display: none;" v-model="dropText"></el-input>
						<div  class="tmp-droptree-footer">
							<el-button v-if="showCheckbox" size="mini" type="text" @click="dropTreeVisible=false">取消</el-button>
							<el-button  v-if="showCheckbox" type="primary" size="mini" @click="hideDroptreeHandle">确定</el-button>
						</div>
						<el-input slot="reference" ref="droptreeInput" v-model="showText" :readonly="inputReadOnly" class="tmp-droptree-input" :icon="showText && !inputDisabled ? 'circle-close' : ''" :placeholder="placeholder"
								:disabled="inputDisabled" :on-icon-click="cleanClickHandle" @click.native="showDropTreeHandle"></el-input>
					 </el-popover>`;

	// 下拉树组件
	Vue.component("ns-droptree", {
		template: $template,
		data: function () {
			return {
				filterText: '',
				showText: '',
				dropValue: '',
				dropText: '',
				dropTreeVisible: false,
				droptreeWidth: ''
			}; 
		},
		props: {
			url: String,
			value: {},
	      validateEvent: {
	        type: Boolean,
	        default: true
	      },
			data: {
				type: Array,
				default: function () {
					return [];
				}
			},
			placeholder: {
				type: String,
				default: function () {
					return "请选择";
				}
			},
			emptyText: {
				type: String,
				default: function () {
					return "";
				}
			},
			nodeKey: {
				type: String,
				default: function () {
					return "id";
				}
			},
			inputDisabled:{
				type: Boolean,
				default: function () {
					return false;
				}
			},
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
            accordion:{
                type: Boolean,
                default: true
            },
			indent: {
				type: Number,
				default: 16
			},
			inputReadOnly: {
				type: Boolean,
				default: true
			}
		},
		computed: {
			"treeData": function(){
				return this.data;
			}
		},
        mounted:function(){
            if (this.url) {
                loadTreeData(this, this.treeData, this.url);
            }
		},
		watch: {
			defaultCheckedKeys: function (newVal) {
				this.$refs.treeStore.defaultCheckedKeys = newVal;
				this.$refs.treeStore.setDefaultCheckedKey(newVal);
			},
			defaultExpandedKeys: function (newVal) {
				this.$refs.treeStore.defaultExpandedKeys = newVal;
				this.$refs.treeStore.setDefaultExpandedKeys(newVal);
			},
			currentNodeKey: function (newVal) {
				this.$refs.treeStore.setCurrentNodeKey(newVal);
				this.$refs.treeStore.currentNodeKey = newVal;
			},
			data: function (newVal) {
				this.$data.data = newVal;
			},
			filterText: function (val) {
				this.$refs.treeStore.filter(val);
			},
			dropValue: function (val) {
				var obj = {
					value: val,
					text: this.dropText
				};
				this.$emit('input', obj);
			},
			dropText: function (val) {
				var obj = {
					value: this.dropValue,
					text: val
				};
				this.$emit('input', obj);
			},
			value: function (){
				this.showText = this.value.text;
				if (this.value.value) {
					this.$refs.treeStore.setCheckedKeys(String(this.value.value).split(','));
				}else{
					this.$refs.treeStore.setCheckedKeys([]);
				}
			}
		},
		created: function () {
			if (this.url) {
//				loadTreeData(this, this.treeData, this.url);
			}
		},
		
		methods: {
			// 清空选择
			cleanClickHandle: function () {
				this.showText = '';
				this.dropValue = "";
				this.dropText = "";
				this.value.value = "";
				this.value.text = "";
				this.$nextTick(function () {
					this.$refs.treeStore.setCheckedKeys([]);
				});
			},
			//刷新下拉树
			refresh: function(){
				if (this.url && this.url != '' ) {
					loadTreeData(this, this.treeData, this.url);
				}
			},
			popoverShowHandle:function(){

			},
			showDropTreeHandle: function () {
				this.droptreeWidth = this.$refs.droptreeInput.$el.clientWidth;
			},
			//确定选择
			hideDroptreeHandle: function () {
				if (this.showCheckbox) {
					var checkArr = this.$refs.treeStore.getCheckedNodes();
					var checkArrLable = [];
					var checkArrId = [];
					for (var i = 0; i < checkArr.length; i++) {
						//设置是否可以选择，特殊场景
						if(!checkArr[i].disabled){
							checkArrLable.push(checkArr[i].label);
							checkArrId.push(checkArr[i][this.nodeKey]);
						}
					}
					this.showText = checkArrLable.join(',');
					this.dropValue = checkArrId.join(',');
					this.dropText = checkArrLable.join(',');
				}
				this.dropTreeVisible = false;
			},
			// tree 方法
			filterNode: function (value, data) {
				if (!value) {
					return true;
				}
				if (data.label) {
					return data.label.indexOf(value) !== -1;
				}
				return false;
			},
			popoverHideHandle: function () {
				var _this = this;
				setTimeout(function () {
					_this.filterText = '';
				}, 200);
			},
			filter: function (value) {
				if (!this.filterNodeMethod) {
					throw new Error('[Tree] filterNodeMethod is required when filter');
				}
				this.$refs.treeStore.filter(value);
			},
			getNodeKey: function (node, index) {
				const nodeKey = this.nodeKey;
				if (nodeKey && node) {
					return node.data[nodeKey];
				}
				return index;
			},
			getCheckedNodes: function (leafOnly) {
				return this.$refs.treeStore.getCheckedNodes(leafOnly);
			},
			getCheckedKeys: function (leafOnly) {
				return this.$refs.treeStore.getCheckedKeys(leafOnly);
			},
			setCheckedNodes: function (nodes, leafOnly) {
				if (!this.nodeKey) {
					throw new Error('[Tree] nodeKey is required in setCheckedNodes');
				}
				this.$refs.treeStore.setCheckedNodes(nodes, leafOnly);
			},
			setCheckedKeys: function (keys, leafOnly) {
				if (!this.nodeKey) {
					throw new Error('[Tree] nodeKey is required in setCheckedNodes');
				}
				this.$refs.treeStore.setCheckedKeys(keys, leafOnly);
			},
			setChecked: function (data, checked, deep) {
				this.$refs.treeStore.setChecked(data, checked, deep);
			},
			nodeClickHandle: function (nodeData, node, instance) {
				if (!this.showCheckbox && !nodeData.disabled) {
					this.showText = nodeData.label;
					this.dropValue = nodeData[this.nodeKey];
					this.dropText = nodeData.label;
					this.dropTreeVisible = false;
				}
				var obj = {
						value: this.dropValue,
						text: this.dropText
					};
				this.$emit('input', obj);
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
		    getText(format){
		    	return this.$refs.droptreeInput.getText(format);
		    }
		}
	});

	// 加载tree数据
	function loadTreeData(_this, data, url) {
		$.ajax({
			url: ctx + url,
			async: true,
			success: function (json) {
				data.splice(0);
				var result = json.result;
				// 顶级节点为空，直接从子节点中获取
				if (result instanceof Object && !result.hasOwnProperty(_this.nodeKey) && !result.hasOwnProperty("label") && result.hasOwnProperty("children")) {
					$.each(result.children, function (i, val) {
						data.push(val);
					});
				} else if (result instanceof Object && result.hasOwnProperty(_this.nodeKey) && result.hasOwnProperty("label")) {
					// 顶级节点不为空
					data.splice(0,1,result);
				} else if (Array.isArray(result)) {
					// 直接返回多个节点
					$.each(result, function (i, val) {
						data.push(val);
					});
				} else {
					throw new Error("数据类型错误");
				}
				if (_this.value && _this.value.hasOwnProperty('text') && _this.value.hasOwnProperty('value')) {
					_this.showText = _this.value.text;
					if (_this.value.value) {
						_this.$nextTick(function () {
							var keys = String(_this.value.value).split(',');
							_this.$refs.treeStore.setCheckedKeys(keys);
						});
					}
				} else {
					throw new Error("数据初始化值类型错误");
				}
			},
			error: function () {
				throw new Error("数据请求出错");
			}
		});
	}

});
