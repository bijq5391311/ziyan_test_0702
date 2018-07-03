require(["vue","nui","jquery","point",ctx +'/public/ecrp/components/ns-goods-conditions-select.js', 
         ctx+"/public/ecrp/common/form-helper.js",
         "moment",	ctx+"/public/ecrp/common/response-util.js",
         ctx +'/public/ecrp/components/ns-shoplist-select.js' ],function(Vue,Nui,$,table,form,goods,helper,moment,response,select){
	new Vue({
	   el: "#app",
		data : function data() {
        	return{
        		pointVisible:false,
		        dialogTitle:"",
		    	shopKeys : [], // 店铺代码
		    	resultMultilayer:0,
		    	brandIds:[],
        	}
		},

		mounted : function() {
			var  that = this;
			that.initBrands();
		},
		watch : {
			"shopKeys" : function(val) {
				if (val) {
					 this.$refs.pointForm.model.resultMultilayer = val.length;
				} else {
					 this.$refs.pointForm.model.resultMultilayer = 0;
				}
			}
		},
		methods: {
		"openDialog":function (data){
		var that = this;
		that.pointVisible = true;
		that.dialogTitle = "新增积分活动";
		},
		save : function(form) {
			this.$refs[form].save();
		},
		
		"initBrands" : function() {
			var that = this;
			$.ajax({
			url : "/marketing/kdpointactivity/loadBrandids", // 获取到拥有品牌
			data : "",
			async : false,
			type : "post",
			success : function(resp) {
				var ids = resp.result;
				var brandId = ids.split(",");
				if (brandId) {
					Vue.set(that,"brandIds",[]);
					for (var m = 0; m < brandId.length; ++m) {
						that.brandIds.push(brandId[m]);
					}
				}
			}
			})
			
		},
		
		/**
		 * 品牌店铺的打开
		 * 
		 */
		handlerBrandMultilayer : function(tableRef) {
			debugger
			var that = this;
		     that.initBrands();
		     var ids = [];
		 	if(that.$refs.pointForm.model.shop_ids){
		 		if(isArray(that.$refs.pointForm.model.shop_ids)){
		 			ids = that.$refs.pointForm.model.shop_ids;
		 		}else{
		 			ids = that.$refs.pointForm.model.shop_ids.split(",");
		 		}
			}
			var args = {
        defaultCheckedKeys: ids
			}
			that.$refs.brandMultiSelect.open(args);

		},
		/**
		 * 品牌店铺的回调
		 * 
		 */
		doBrandMultilayer : function(opts) {
			debugger
			var data = opts.data;
			var ids = "";
			for(var i = 0;i<data.length;++i){
				ids += data[i];
				ids +=",";
			}
			debugger
			var  text = ids.substring(0,ids.length-1) ;
		     this.$refs.pointForm.model.shop_ids =  text;
			this.shopKeys = opts.data;
		},

		closeDialog : function(visible) {
			this.$data[visible] = false;
		},
		closeAfter : function(form) {
			this.$refs[form].resetForm();
			this.$refs.brandMultiSelect.resetData();
		},
		
		/**
		 * 店铺自定义验证
		 * 
		 * @param rule
		 * @param value
		 * @param callback
		 */
		validateShop : function(rule, value, callback) {
			if ( this.$refs.pointForm.model.shop_ids.length == 0) {
				callback(new Error('请选择店铺'));
			} else {
				callback();
			}
		},
		
		// /选择商品
		callback : function(opts) {
			var orgoods = "";
			if (opts.goods.length > 0) {
				orgoods = opts.goods[0].id;
			}
			for (var i = 1; i < opts.goods.length; i++) {
				orgoods = orgoods + "," + opts.goods[i].id;
			}
			 this.$refs.pointForm.model.goods_condition = opts.goods;
			 this.$refs.pointForm.model.sys_item_ids = orgoods;
			 this.$refs.pointForm.model.sys_item_condition = opts.conditions;
		},

		"changeStatus":function (params){
			
	 		var that = this;
	 	      var info = params.row.activityStatus ==0?"是否确定禁用该活动?":"是否确定启用该活动?";
	 	                that.$confirm(info, "提示", {
	 	                	 confirmButtonText: "确定",
	 	                     cancelButtonText: "取消",
	 	                     type: "warning"
	 	                }).then(function() {
	 	                	
	 	               	var data = JSON.stringify({id:params.row.id,activityStatus:params.row.activityStatus});
	 	               	 $.ajax({
	 	               		 url:"/marketing/kdpointactivity/updatePointactivity",
	 	              		 data:data,
	 	               		 type:"post",
	 	               		contentType : "application/Json",
	 	               		 success:function(result){
	 	                            if(result.success){
	 	                                that.$message({
	 	                                     message: '修改成功!',
	 	                                     type: 'success'
	 	                                   });
	 	                            }else{
	 	                                 that.$message.error('修改失败！');
	 	                            }
	 	               		 }
	 	               	 
	 	               	 });
	 	                }).catch(() => {  
	 	                	params.row.activityStatus =  params.row.activityStatus ==1 ? 0:1; 
	 	                    }); 		var that = this;
	 	                   var info = params.row.activityStatus ==0?"是否确定禁用该活动?":"是否确定启用该活动?";
	 	                  that.$confirm(info, "提示", {
	 	                  	 confirmButtonText: "确定",
	 	                       cancelButtonText: "取消",
	 	                       type: "warning"
	 	                  }).then(function() {
	 	                 	var data = JSON.stringify({id:params.row.id,activityStatus:params.row.activityStatus});
	 	                 	 $.ajax({
	 	                 		 url:"/marketing/kdpointactivity/updatePointactivity",
	 	                 		 data:data,
	 	                 		 type:"post",
	 	                 		contentType : "application/Json",
	 	                 		 success:function(result){
	 	                              if(result.success){
	 	                                  that.$message({
	 	                                       message: '修改成功!',
	 	                                       type: 'success'
	 	                                     });
	 	                              }else{
	 	                                   that.$message.error('修改失败！');
	 	                              }
	 	                 		 }
	 	                 	 
	 	                 	 });
	 	                  }).catch(() => {  
	 	                	 params.row.activityStatus =  params.row.activityStatus ==1 ? 0:1; 
	 	                      });
			
		}
		}
	})
})
function isArray(arr){
	return Object.prototype.toString.call(arr)=='[object Array]';
}
