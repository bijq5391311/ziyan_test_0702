
define(["vue","nui"],function(Vue,Nui){
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
    
});		

