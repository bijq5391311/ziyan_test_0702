require(["vue", "nui", "jquery",
         "/public/dslParser/grid/gridPlugin.js",
         "utilbuild/main","moment",
     	"/static/marketing/tbdirectfavorable/js/ns-item-conditions-select.js",
     	"/public/ecrp/components/ns-goods-conditions-select.js",
     	"/public/ecrp/common/response-util.js",
     	"/static/plus/base/shop/js/ns-shoplist-select.js"
     	/*"/static/organization/shop/js/ns-shoplist-select.js"*/
     	],function(Vue, Nui, $, mixin, t, moment) {
    [#th:block th:with="grid = ${__#{render.grid.get('#ctx', offlineCouponList_table)}__}"]
    	var tableOption = [#th:block th:insert="../public/ecrp/render2/grid::render(${grid})"][/th:block]
    [/th:block]

    Vue.component("offlineCouponList_table", tableOption);
    /*var model =  {
            "end_time": "",
            "start_time": "",
	};*/
    var rules={
		"activityName":[{
            required: true,
            message: "请输入活动名称",
            trigger: "blur",
		},{
            min:0,
            max:50,
            message:"已超过可输入长度",
            trigger:"blur,change"
		}],
		"denomination":[{
			validator: (rules,val,callback)=>{
                var form = vue.getCurrForm();
                if(vue.$data[form.model].condition== 1){
                     var patt=new RegExp("^[1-9]\\d*$");
                     if(val==""){
                          callback(new Error("请输入金额"));
                     }else{
                          if(patt.test(val)){
                              callback();
                          }else{
                              callback(new Error("格式不正确，请输入正整数值"));
                          }
                     }
                }
           },
           trigger: "blur"
		}],
		"productionQuantity":[{
			validator: (rules,val,callback)=>{
                 var patt=new RegExp("^[1-9]\\d*$");
                 if(val==""){
                      callback(new Error("请输入数量"));
                 }else{
                      if(patt.test(val)){
                          callback();
                      }else{
                          callback(new Error("格式不正确，请输入正整数值"));
                      }
                 }
           },
           trigger: "blur"
		}],
		"coefficient":[{
			validator: (rules,val,callback)=>{
				debugger   
                 var patt=new RegExp("^((([1-9]\\d{0,5})|0)(\\.[0-9])?)$");
                 if(val==""){
                      callback(new Error("请输入紫燕承担金额"));
                 }else{
                      if(patt.test(val)){
                          callback();
                      }else{
                          callback(new Error("格式错误，请输入大于0.0且小于1000000的数值"));
                      }
                 }
           },
           trigger: "blur"
		}],
		"discount":[{
			validator: (rules,val,callback)=>{
                var form = vue.getCurrForm();
                if(vue.$data[form.model].condition== 2){
                     var patt=new RegExp("^((0\.[1-9]{1})|(([1-9]{1})(\.\\d{1})?))$");
                     if(val==""){
                          callback(new Error("请输入折扣"));
                     }else{
                          if(patt.test(val)){
                              callback();
                          }else{
                              callback(new Error("格式不正确，最多小数点后一位"));
                          }
                     }
                }
           },
           trigger: "blur"
		}],
		"giveCondition":[{ 
      	  validator: (rule,val,callback)=>{
             var patt=new RegExp("^[1-9]\\d*|0$");
            	 if(val==""){
                     callback(new Error("请输入金额"));
                }else{
                     if(patt.test(val)){
                         callback();
                     }else{
                         callback(new Error("格式不正确，请输入正整数值"));
                     }
                }
      	  },
      	  trigger: "blur"
  	   }],
  	   "relativeTime":[{ 
     	  validator: (rule,val,callback)=>{
     		 /*var value = this.relative_time;*/ 
             var patt=new RegExp("^[1-9]\\d*$");
           	 if(val==""){
                    callback(new Error("请输入天数"));
               }else{
                    if(patt.test(val)){
                        callback();
                    }else{
                        callback(new Error("输入错误，请输入正整数天数"));
                    }
               }
     	  },
     	  trigger: "blur"
 	   }],
  	   "onLineTreeNode":[{ 
  		   validator: (rule, value, callback)=>{
  			   debugger
                if(this.lineShopCount === 0){
                	vue.$message({
                    message: '请至少选择一家店铺',
                    type: 'warning'
                    });
                }else{
                    callback();
                }
            },
            trigger: "change",
        }],
	    "activityTime":[{
			required: true,
			type: "array",
			message: "请选择固定有效时间",
			trigger: "change",
		}],
		"description":[{
			min:0,
			max:500,
			message:"已超过可输入长度",
			trigger:"blur,change"
		}],
		"title":[{
			min:0,
			max:500,
			message:"已超过可输入长度",
			trigger:"blur,change"
		}],
    };
    var methods = {
    	/*	// /选择商品
		callback: function (opts) {
		},*/
		//商品回调
		goodsCall(opts,form){
			var orGoods = "";
			if (opts.goods.length > 0) {
				orGoods = opts.goods[0].id;
			}
			for (var i = 1; i < opts.goods.length; i++) {
				orGoods = orGoods + "," + opts.goods[i].id;
			}
			console.log(orGoods);
			this.$data[form].itemIdStr = orGoods;
		},
		setModel: function(model){
			this.$set(this,"exports",model);
		},
		resetForm : function() {
			debugger
		    this.setModel(this.$options.data().exports);
		    this.$refs.exportForm.resetFields();
		},
		//获取当前表单的ref与表单model名称
		getCurrForm(){
			var form={};
			var model = "";
			var ref = "";
			if(this.favorType == "1"){
				model = "favorCash";
				ref = "cashForm";
			}else if(this.favorType == "2"){
				model = "favorDiscount";
				ref = "discountForm";
			}else if(this.favorType == "3"){
				model = "favorGift";
				ref = "giftForm";
			}
			form.model = model;
			form.ref = ref;
			return form;
		},
		/**
		 * 关闭新增优惠券
		 */
	    closeDialog() {
			this.$data.favorVisible = false;
		},
		saveEduit:function(){
			this.$refs["exportForm"].validate((valid)=>{
				if(valid){
					debugger
		    		var obj = this.exports;
		    		var that = this;
		    		$.ajax({
		    			  type: 'POST',
		    			  url: "/marketing/zyofflinecoupon/exportCoupon",
		    			  async: true,
		    			  data: {couponName:obj.couponName,couponId:obj.couponId,customerRestrict:obj.customerRestrict,couponAmouet:obj.exportCount},
		    			  /*success: function(data){
		    			  },*/
					});
		    		setTimeout(function(){
		    			that.$message.success('导出任务创建成功，请到下载中心查看');
						that.$root.ecportCoupons = false;
						that.$root.$refs.couponTable.$reload();
                    },2000);
				}
			});
    	},
    	//导出取消
		closeDialogExport:function(){
			debugger
			this.resetForm();
    		this.ecportCoupons=false;
    	},
		selectLineShop:function(){
			debugger
			var form = this.getCurrForm().model;
			var that = this.$data[form];
			vue.type = "0";
    		var args = {
				type:"0",//线下
				defaultCheckedKeys: that.lineCheckedKey,
    		};
    		this.$refs.shopTree.open(args);
    	},
    	doBrandMultilayer: function(opts){
    		debugger
    		var form = this.getCurrForm().model;
			var that = this.$data[form];
    		var shopIds = [];
    		that.lineCheckedKey = [];
    		that.lineShopCount = 0;
    		console.log(opts);
    		var param = opts.data;
    		console.log(param);
    		var treeNode = [{}];
    		for(var i=0;i<param.length;i++){
    			debugger
    			console.log(param[i]);
    			that.lineCheckedKey.push(param[i]);//已选择店铺（包括平台）
				that.lineShopCount+=1;
				treeNode.push(param[i]);
				shopIds.push(param[i]);
    		}
    		that.shopIdStr = shopIds.join(",");
    	},
    	//优惠券保存
		favorSave(){
			var form = this.getCurrForm();
			var params = $.extend(true,{},this.$data[form.model]);
			this.validateAndSubmit(params,form.ref);
		},
		//处理活动请求参数
		handleActivityParams(params){
			if(params.time == 0){
				params.beginTime = moment(params.activityTime[0]).format("YYYY-MM-DD HH:mm:ss");
				params.endTime =  moment(params.activityTime[1]).format("YYYY-MM-DD HH:mm:ss");
			}
			delete params.activityTime;
			return params;
		},
		//表单校验并提交
		validateAndSubmit(params,form){
			var that = this;
			that.$refs[form].validate((valid)=>{
				if(valid){
					params = this.handleActivityParams(params);
					$.post("/marketing/zyofflinecoupon/saveCoupon",params)
						.done((resp)=>{
							ResponseUtil.check(resp,that,"新增",()=>{
								that.$refs.couponTable.$reload();
								that.favorVisible = false;
							},()=>{});
						}).fail((resp)=>{
							that.$message.error(resp.msg);
						})
				}
			});

		},
		"checkExportCount":function(rule, val, callback) {
    		debugger
    		var obj = this.exports;
    		if(1 == obj.type){
		    	callback(new Error("已有优惠券导出，请稍后"));
		    	return;
		    }
		    if(1 == obj.state){
		    	callback(new Error("优惠券已失效，禁止导出"));
		    	return;
		    }
		    /*if(0 == obj.validTimeType && ( moment().valueOf() < moment(obj.beginTime).valueOf())){
		    	callback(new Error("优惠券待生效，禁止导出"));
		    	return;
		    }*/
		    if(0 == obj.validTimeType && ( moment().valueOf() > moment(obj.endTime).valueOf())){
		    	callback(new Error("优惠券已过期，禁止导出"));
		    	return;
		    }
            var patt=new RegExp("^[1-9]\\d*$");
    		if(!patt.test(val)){
           		callback(new Error("输入错误，请输入正整数数量"));
           		return;
           	}
      	 	if(val=="" || val == 0){
      	 		callback(new Error("请输入导出数量"));
            }else{
            	debugger
	       	    var couponCount = vue.$data.exports.couponAmouet;
	       	    var exports = vue.$data.exports.exportAmount;
	       	    
	       	    if(couponCount == -1){
                   callback();
	       	    }else{
            	   if(val <= exports){
            		   callback();
	               }else{
	            	   callback(new Error("输入错误，必须小于可导出数量"));
	               }
	       	    }
            }
		}
    }
    var watch= {
       "favorCash.productionQuantityType":function(val){
    	   var form = this.getCurrForm().model;
		   var that = this.$data[form];
		   if(val == 0){
			   that.productionQuantity = -1;
			   vue.isProductionQuantity = true;
       	   }else{
       		   that.productionQuantity = 0;
			   vue.isProductionQuantity = false;
       	   }
	    },
	    "favorDiscount.productionQuantityType":function(val){
	       var form = this.getCurrForm().model;
		   var that = this.$data[form];
	       if(val == 0){
	    	   that.productionQuantity = -1;
			   vue.isProductionQuantity = true;
       	   }else{
       		   that.productionQuantity = 0;
			   vue.isProductionQuantity = false;
       	   }
	    },
	   "favorCash.condi":function(val){
		   if(val == 0)
			   vue.isDepreciation = true;
		   else
			   vue.isDepreciation = false;
	    },
	    "favorCash.time":function(val){
		   if(val == 0)
			   vue.isTime = true;
		   else
			   vue.isTime = false;
	    },
	    "favorDiscount.condi":function(val){
		   if(val == 0)
			   vue.isDepreciation = true;
		   else
			   vue.isDepreciation = false;
	    },
	    "favorDiscount.time":function(val){
		   if(val == 0)
			   vue.isTime = true;
		   else
			   vue.isTime = false;
	    }
    }
    var favorForm={
		//活动名称
		activityName:"",
		//满足条件开关
		condi:0,
		//数量状态
		productionQuantityType:1,
		//折扣
		discount:"",
		//面额
		denomination:"",
		//生成数量
		productionQuantity:"",
		//经销商系数
		coefficient:"",
		//商品
		shopCode:"",
		//订单满足金额
		giveCondition: "",
		/*activityType: 1,*/
		itemIdStr:'',
    	//已选择店铺的数量
    	lineShopCount:0,
    	//已选择店铺（包括平台）
    	lineCheckedKey:[],
    	//线下店铺
    	shopIdStr:"",
    	//0：绝对时间 1：相对时间
    	time:0,
    	//有效天数
		relativeTime:"",
		//限制时间
    	activityTime:"",
    	//说明
		description:"",
		//优惠券备注
		title:""
	}
    var vue = new Vue({
        el: '#app',
        data : function data() {
        	return{
        		favorTitle:'',
        		favorVisible:false,
        		//详情表单
        		detailVisible:false,
        		//优惠详情
    			favorDetail:{},
        		favorType:"1",
        		//满减或者不限
        		rules:rules,
        		required:false,
        		//满减输入框开关
            	isDepreciation: true,
            	//数量输入开关
            	isProductionQuantity:false,
            	//有效时间开关
            	isTime: true,
            	checkedKey:[],
            	//限制店铺
            	shopCount:0,
            	//导出页面显示
            	ecportCoupons:false,
            	//导出form
            	exports:{
	        		couponId:"",
	        		couponName:"",
	        		couponAmouet:0,
	        		sentAmount:0,
	        		exportAmount:0,
	        		//是否仅注册会员可用   0是  1否
	        		customerRestrict:0,
	        		//导出数量
	    			exportCount:'',
	    			validTimeType:0,
	    			endTime:"",
	    			beginTime:"",
	    			state:0,
	    			type:0
	        	},
	        	//现金
        		favorCash: Object.assign({
        			condition:1
				},favorForm),
				//折扣
				favorDiscount: Object.assign({
        			condition:2
				},favorForm),
				//礼品
				favorGift: Object.assign({
        			condition:3
				},favorForm),
        	}
        },
        watch:watch,
		methods: methods,
	    mounted: function(){}
    });
})