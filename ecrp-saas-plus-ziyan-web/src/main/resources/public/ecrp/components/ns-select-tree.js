//TODO 未加入form-item 需要修改
define(["vue","nui"],function(Vue,Nui){
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
        },
	    getText(format){
	    	return this.$refs.droptreeInput.getText(format);
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
	
})