define(["jquery", "vue", "nui"], function ($, Vue, Nui) {
	(function(){
	       //-------------------------------------多选树组件封装
	    var template = `    
	    		 <div class="template-multi">
				                <div class="template-multi-header">
				                  <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">{{label}}</el-checkbox>
				                </div>
				                <div class="template-multi-content">
				                  <el-multi
				                    :data="nodes"
				                    accordion
				                    node-key="id"
				                    :default-checked-keys="defaultCheckedKeys"
				                    @check-change="handleCheckChange"
				                    ref="node"
				                    :cols="4"
				                    :show-Selectall="false"
				                    :props="nodesProps">
				                  </el-multi>
				                </div>
				            
				              </div>
			              `
		Vue.component("ns-mutil-select",{
		    template:template,
		    data:function(){
			return {
			    nodesProps: {
				          children: 'children',
				          label: 'label'
			    },
			    checkAll: false, // 线上是否全选
			    isIndeterminate: false,
			}
		    },
		    props:{
		    	nodes:{
	                      type: Array,
	                      default: function () {
	                        return [];
	                      }
		    	},
				label:{
						 type: String,
	                      default: function () {
	                       return'';
	                      }
				},
				defaultCheckedKeys:{
					type:Array,
					  default:function(){
					   return [];
				       }
				},
				defaultCheckedAll:{
					type:Array,
				  default:function(){
				   return [];
			       }
				}

		    },
		    methods:{
		    	// 显示多层级店铺选择器窗口
		        handerlMultilayerVisible () {
		          this.dialogMultilyaerVisible = true;
		          //  需要在body内重新加一层结构
		          document.body.appendChild(this.$refs.dialogMultilyaer.$el);
		        },
		        handleCheckAllChange (event) {
		            this.$refs.node.setCheckedKeys(event.target.checked ? this.defaultCheckedAll : []);
		            this.isIndeterminate = false;
		            this.$emit("input", this.$refs.node.getCheckedNodes());
		          },
		         handleCheckChange (value) {		        	
		            let checkedCount = this.$refs.node.getCheckedNodes().length;
		            this.checkAll = checkedCount === this.defaultCheckedAll.length;
		            this.isIndeterminate = checkedCount > 0 && checkedCount < this.defaultCheckedAll.length;
		            this.$emit("input", this.$refs.node.getCheckedNodes());
		          },
		       
		        getCheckedKeys(){
		            return  this.$refs.node.getCheckedKeys(true);
		        },
		        setCheckedKeys(nodes){
		              this.$refs.node.setCheckedKeys(nodes);
		        }
		       
		    },
		    created:function(){
		     foreachNodes(this.nodes,this.defaultCheckedAll,this.defaultCheckedKeys);
		    	this.isIndeterminate = this.defaultCheckedKeys.length > 0
		    },
		    mounted:function(){
		    	
		    }
		});
			              
		   //遍历所有节点的id
	       function foreachNodes(nodes,nodeKeys,checkedNodes){
	    	   for(var i=0;i<nodes.length;i++){
	    		   nodeKeys.push(nodes[i].id);	     
	    		   if(nodes[i].check && nodes[i].check == true ){
	    			   checkedNodes.push(nodes[i].id);
	    		   }
	    		   if(nodes[i].children&&nodes[i].children.length>0){
	    			   foreachNodes(nodes[i].children,nodeKeys,checkedNodes);
	    		   }
		       
		   		}
	       }
	       
	    
			              
	       
	      
	       
	       //-------------------------------------店铺选择封装
	       var template2 =  `
	       	   <el-form-item label="渠道来源" >
		       <el-form-grid>
		             <el-button type="primary" @click="handerlMultilayerVisible()">选择店铺</el-button>
		       </el-form-grid>
		       <el-form-grid>已选择<b class="text-danger"> {{resultMultilayer}}</b> 家店铺  </el-form-grid>
		  
		   <el-dialog v-cloak title="选择平台" v-model="dialogMultilyaerVisible" @close="dialogMultilyaerVisible=false" ref="dialogMultilyaer" size="small" custom-class="no-padding">
		        <div class="template-multi" v-for="(item,index) in mutlis">        
			      <ns-mutil-select  ref="nodeCheck" v-model="checkedNodes" :label="item.label" :nodes="item.children" ></ns-mutil-select>	
			   </div>
		              <div slot="footer" class="dialog-footer">
					            <el-button @click="dialogMultilyaerVisible = false">取 消</el-button>
					            <el-button type="primary" @click="saveMultilayerSelect">确 定</el-button>
					   </div>
		 </el-dialog>
		        </el-form-item>
	       `
	       
	       Vue.component('ns-shop-select-dialog',{
		    template:template2,
		    data:function(){
			return {
				resultChecks:[],//选择完的所有节点数组
				dialogMultilyaerVisible:false,
				mutlis:[],
				defaultCheckedAll:[], // 全部选中的项
				defaultCheckedKeys:[],
				checkedNodes:[],
				resultMultilayer:''
				}
		    },
		    props:{
		    	
			dataUrl:{
			    type:String,
			    default:function(){
				return '';
			    }
			   }
		    
		    },
		    methods:{
			dialogOpen(){
			    var  nodeChecks = this.$refs.nodeCheck;
			    for(var i=0;i<nodeChecks.length;i++){
				  nodeChecks[i].setCheckedKeys(this.$root.getModel(this.modelName));
			    }
			  
			},
			dialogClose(){
			      var nodeCheckRefs = this.$refs.nodeCheck;
			      var arr = [];
			          for(var i=0;i<nodeCheckRefs.length;i++){
			           arr =  arr.concat(nodeCheckRefs[i].getCheckedKeys());
			          }
			   //  this.$root.setModel(this.modelName,arr);
			       this.resultChecks= arr;
			       this.resultMultilayer = this.resultChecks.length 
			},
			
			      // 显示多层级店铺选择器窗口
			        handerlMultilayerVisible () {
			          this.dialogMultilyaerVisible = true
			          //  需要在body内重新加一层结构
			          document.body.appendChild(this.$refs.dialogMultilyaer.$el)
			        },
			          // 保存选中结果
			        saveMultilayerSelect () {
			         this.dialogClose();
			         // this.resultMultilayer = this.$refs.online.getCheckedNodes().length
			          this.dialogMultilyaerVisible = false;
			          this.$emit('input',this.checkedNodes);
			 
			        },
			       /* setResult(){
			          var nodeCheckRefs = this.$refs.nodeCheck;
			          for(var i=0;i<nodeCheckRefs.length;i++){
			           this.resultChecks =  this.resultChecks.concat(nodeCheckRefs[i].getCheckedkeys());
			          }
			        },*/
			       
		    },
		    created:function(){
			var that = this;
			if(this.dataUrl.length!=0){
			    getNodeData(this.dataUrl).done(function(resp){
			    	that.mutlis = resp.result
			    	        			
			    	           		
			    }).fail(function(resp){
				console.log('节点数据查询失败');
			    });
			}else{
			    throw new Error('dataUrl没赋值');
			}
				for(var i = 0 ; i<this.mutlis.length ;i++){
					foreachNodes(this.mutlis[i].children,this.defaultCheckedAll,this.defaultCheckedKeys);
				}
		    },
		  
		    mounted:function(){ 	
		    	this.resultMultilayer = this.defaultCheckedKeys.length

		    },
		  
		 
	       });
	       
	       function getNodeData(url){
		   var defer =  $.Deferred();
		   $.ajax({url:url,async:false,dataType:"json"}).done(
			   function(resp){
			       defer.resolve(resp);
			   }
		   ).fail(
			    function(resp){
			       defer.reject(resp);
			   }
		   );
		   return defer;
	       }
	})();
	
	(function(){
		var template = `
			<el-form-item :label="label">  
	          <el-form-grid size="xmd">
	          <el-form-item>
	             <el-popover  ref="droptreepopover"
	               v-model="dropTreeVisible"
	                :width="droptreeWidth"
	                placement="bottom-start"
	                trigger="click"
	                popper-class="tmp-droptree-popover">
				   <el-scrollbar
				   wrap-class="tem-droptree-scroll"
				   view-class="template-form-list">
				   <el-tree :data="data"
				   :expand-on-click-node="false"
				   @node-click="handleSelectValue"
				   class="tmp-droptree-tree"></el-tree>
				   </el-scrollbar>
				   </el-popover>
				   <el-input ref="droptreeinput"  v-model="dropTreeValue" readonly  :placeholder="placeholder" v-popover:droptreepopover class="tmp-droptree-input"></el-input>
				   </el-form-item>
				   </el-form-grid>		        
			 </el-form-item>

		`;
		
		var props = {
		
			data:{
			   type: Array
			},
			label: {
				type: String,
				default: '下拉树'
			},
			placeholder:{
				type: String,
				default: '点击选择'
			}
		}
		
		var methods = {
	        handleSelectValue (data) {
	        	this.dropTreeVisible = false
	        	this.dropTreeValue = data.label;
	        	this.$emit("input",this.dropTreeValue);
	        }
		}
		
		Vue.component("ns-select-tree",{
			template:template,
			data:function(){
				return {
			       dropTreeValue:'',
	     	       dropTreeVisible: false,
		           droptreeWidth: ''
				}
			},
			props:props,
			methods:methods,
			mounted:function(){
				
			},
			watch:{
				
			}
		})
	})();
	
	(function(){
		var template = `
			<el-select v-model="currentValue"  ref="nsselect"
						:placeholder="placeholder" 
						:size="size" 
						:disabled="disabled" 
						:multiple="multiple" 
						:multiple-limit="multipleLimit"
						:filterable="filterable"
					   v-on:change="changeHandle" v-on:visible-change="visibleChangeHandle">
				<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
		  	</el-select>
		`;

		Vue.component("ns-select", {
			template: template,
			data: function () {
				return {
					options: [],
					// 双向绑定值-必须
					currentValue: this.value
				}
			},
			props: {
				url: {
					type: String,
					default: ""
				},
				value: {},
				multiple: {
					type: Boolean,
					default: function () {
						return false;
					}
				},
				multipleLimit: {
					type: Number,
					default: function () {
						return 0;
					}
				},
				name: String,
				placeholder: String,
				filterable: {
					type: Boolean,
					default: false
				},
				size: {
					type: String,
					default: ""
				},
				disabled: {
					type: Boolean,
					default: false
				}
			},
			methods: {
				/**
				 * 选中值发生变化时触发
				 * @param val
				 */
				changeHandle: function (val) {
					this.$emit("change", val);
				},
				/**
				 * 下拉框出现/隐藏时触发
				 * @param val
				 */
				visibleChangeHandle: function (val) {
					this.$emit("visible-change", val);
				},
				getText(fun){
			        return this.$refs.nsselect.getText(fun);
				}
			},
			created: function () {
				var _this = this;
				if (this.url) {
					loadOptions(_this, _this.options, _this.url);
				}
			},
			watch: {
				currentValue: function (val) {
					this.$emit('input', val);
				},
				value: function (val) {
					this.currentValue = val;
				}
			}
		});

		// 异步加载下拉数据
		function loadOptions(_this, data, url) {
			$.ajax({
				url: ctx + url,
				async: true,
				success: function (json) {
					var items = json.result;
					if (Array.isArray(items)) {
						var option = {};
						for (var i = 0; i < items.length; i++) {
							var optionItem = items[i];
							if ((optionItem instanceof Object) && optionItem.hasOwnProperty("k") && optionItem.hasOwnProperty("v")) {
								option = {};
								option.value = String(optionItem.v);
								option.label = String(optionItem.k);
								data.push(option);
							} else {
								continue;
							}
						}
						_this.currentValue = _this.value;
					} else {
						throw new Error("数据类型不匹配");
					}
				},
				error: function () {
					throw new Error("数据请求出错");
				}
			});
		}
	})();
	
	(function(){

		// 模板
		var $template = `<el-popover ref="droptreepopover" 
									 v-model="dropTreeVisible"
									 :width="droptreeWidth" 
									 placement="bottom-start" 
									 trigger="click"
									 popper-class="tmp-droptree-popover" 
									 @hide="popoverHideHandle">
							<el-input class="tmp-droptree-search" placeholder="输入关键字进行过滤" v-model="filterText" ></el-input>
							<el-scrollbar wrap-class="tmp-droptree-scroll">
								<el-tree ref="treeStore" class="tmp-droptree-tree"
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
							<div class="tmp-droptree-footer">
								<el-button size="mini" type="text" @click="dropTreeVisible=false">取消</el-button>
								<el-button type="primary" size="mini" @click="hideDroptreeHandle">确定</el-button>
							</div>
							<el-input slot="reference" ref="droptreeInput" v-model="showText" :readonly="inputReadOnly" class="tmp-droptree-input" :icon="showText ? 'circle-close' : ''" :placeholder="placeholder"
									:on-icon-click="cleanClickHandle" @click.native="showDropTreeHandle"></el-input>
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
				accordion: Boolean,
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
				value: function (val){
					this.showText = val.text;
					if (val.value) {
						this.$refs.treeStore.setCheckedKeys(String(val.value).split(','));
					}
				}
			},
			created: function () {
				if (this.url) {
					loadTreeData(this, this.treeData, this.url);
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
				showDropTreeHandle: function () {
					this.droptreeWidth = this.$refs.droptreeInput.$el.clientWidth;
				},
				hideDroptreeHandle: function () {
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
						this.dropTreeVisible = false;
						this.showText = nodeData.label;
						this.dropValue = nodeData.id;
						this.dropText = nodeData.label;
					}
					var obj = {
							value: this.dropValue,
							text: this.dropText
						};
					this.$emit('input', obj);
					this.$emit("node-click", nodeData, node, instance);
				},
				checkChangeHandle: function (nodeData, node, instance) {
					if (this.showCheckbox) {
						var checkArr = this.$refs.treeStore.getCheckedNodes();
						var checkArrLable = [];
						var checkArrId = [];
						for (var i = 0; i < checkArr.length; i++) {
							checkArrLable.push(checkArr[i].label);
							checkArrId.push(checkArr[i].id);
						}
						this.showText = checkArrLable.join(',');
						this.dropValue = checkArrId.join(',');
						this.dropText = checkArrLable.join(',');
					}
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
				},//刷新下拉树
				refresh: function(){
					if (this.url && this.url != '' ) {
						
						loadTreeData(this, this.treeData, this.url);
					}
				},
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
	})();
})