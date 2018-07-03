
require(['vue','nui','jquery',"moment","dataDictionary",
         'render-helper','/public/ecrp/common/area.js',
         '/static/vip/kdcustomer/js/scrollLoadmoreListener.js',
         "/public/ecrp/components/ns-select.js",
         "/public/ecrp/components/ns-droptree.js",
         '/public/ecrp/components/ns-table.js',
		'/public/ecrp/components/ns-shoplist-select.js'
         ], function(Vue,Nui,$,moment,dataDictionary,helper,area, addScrollListener){
	Vue.component('business-form-edit', {
		data () {
		    return {
		      editStatus: false,
		      oldValue: '',
		      
		    }
		  },
		  
		  props: {
		    value: [String, Number, Object, Array, Boolean, Date],
		    editable: {
		      type: Boolean,
		      default: true
		    },
		    type: String
		  },
		computed: {
// 						this.model = vue.userInfor;
		    model: {
		      get () {
		        return this.value
		      },
		      set (val) {
		        this.$emit('input', val)
		      }
		    }
		  },
		  methods: {
		    // 信息编辑
		    handleFormItemEdit (oldValue) {
		    	this.oldValue = oldValue;
		        this.editStatus = true;
		        vue.is_edit = false;
		        this.$emit('edit', this.model);
		    },
		    // 信息编辑 保存结果
		    handleFormItemEditSave (userInfo) {
		    	vue.is_edit = true;
		    	this.$emit('edit-save', this.model);
		    	this.editStatus = false;
		      //获取输入框的值
//		      var obj = this.$children[0].$children[0].$data.currentValue;
 			var obj = this.model;
		    //调用保存方法
		      vue.editsave(obj, this.type);
		    },
		    // 信息编辑 取消
		    handleFormItemEditCancel (oldValue) {
		    	vue.is_edit = true;
		    	this.model = this.oldValue;
		        this.editStatus = false;
		        this.$emit('edit-cancel', this.oldValue);
		    }
		  },
		template: '<span v-if="!editStatus" class="bus-form__edit is-status">' +
		  '<slot name="content"></slot>' +
  	  '<span class="bus-form__edit-control">' +
		  '<a title="编辑" class="bus-form__edit-icon is-noedit" @click="handleFormItemEdit(value)" v-if="editable"><i class="el-icon-edit"></i></a>' +
		  '</span>' +
  	  '</span>' +
		  '<span v-else="editStatus" class="bus-form__edit" >' +
		  '<slot name="edit"></slot>' +
		  '<span class="bus-form__edit-control">' +
		  '<a title="保存" class="bus-form__edit-icon" @click="handleFormItemEditSave()"><i class="el-icon-circle-check"></i></a> ' +
		  '<a title="取消" class="bus-form__edit-icon"  @click="handleFormItemEditCancel(oldValue)"><i class="el-icon-circle-cross"></i></a>' +
		  '</span>' +
		  '</span>'
	});
	var xmll = "";
	var customer_id = "";
	
	var rules = {
			 content:[
			        {
			            required: true,
			            message: "请输入短信内容",
			            trigger: "blur,change"
			        }
			    ],
			    smsSignature:[
			        {
			            required: true,
			            message: "请选择签名",
			            trigger: "change"
			        }
			    ],
			    spId:[{
			            required: true,
			            message: "请选择通道",
			            trigger: "change"
			        }]
	}
	var vue = new Vue({
		el:"#app",
// 					component:{}
		data:{
			tableParam: {
               class: 'si-ddddd',
               border: true
           },
           //页面条数事件
	      	pageSize(sizePage){
	           	vue.paginationParam.pageSize = sizePage;
	           	//前端分页方法! 切割数组>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
	           	vue.loadTable(0);
	      	},
           //页数改变	
           pageChange(page){
	      		vue.loadTable(page);
           },
			//分页条数
    	     paginationParam: {
    	         currentPage: 1,
    	         total: 0,
    	         'page-count': 0,
    	         pageSize: 15,
    	         pageSizes: [15, 25, 50, 100]
    	       },
			//列表字段
        	transactionCustomerFields:[
        	   {  key: 'outTradeId', label:'交易号', width:"300"  },
        	   {  key: 'payTime', label:'付款时间', width:"220" },
        	   {  key: 'num', label: '件数', width:"220" },
        	   {  key: 'payment', label: '金额', width:"218" },
        	],
			attributesValue:[],//属性值
			groupAttributes:[],//集团所有属性
			is_type:"",
			is_edit:true,
			birthday:'',//生日
			mobile:'',//手机
			props: {
	          label:'label',
	          value:'label',
	          children: 'children'
		    },
			qq:'',//qq
			area:[],
			mobile:"",
			tableData:[],
			html:"",
			userInfo:"",
			
			selectOne:"1",//selectOne frm属性的第一个选择
			one:"one",
			selectTow:"",//selectTow frm属性的第二个选择
			tow:"tow",
			secondInfo:"",//frm属性的第二选择框的option集合
			secondType:"",//第二选择类型  1 树, 0 非树
			url:"", //第二选择框为树的url
			customerIntegral:"",//会员积分
			ditchInfo:"", //渠道列表
			rfmInfo:"",//rfm列表
			//rfm下拉书对象
			label:{ 
				"text":"",
				"value":""
			},
			channelabel:{ 
				"text":"",
				"value":""
			},
			brandList:[],//品牌列表
			inputdialog:false,
			brandValue:"",//自定义属性选择
			CustomProperties:[],
			three:"three",
			selectTree:"",//积分选择
			tatchTable:[],//触达表格
			frmInfo:"",
			userInfo12:"",
			customer_name:"",
			selected:"",
			userinfoTable:"",
			customerdialog:false,
			selectInfo:[{"label":"品牌","value":"1"},{"label":"部门","value":"2"},{"label":"渠道","value":"3"}],
			activeName1:"1",
			activeName2:"first",
			activeName3:"1",
			activeName4:'1',
			activeName5:'1',
			activeName6:'1',
			pathAll:[],//轨迹所有的数据
			pathNum:0,//分页处理数
			loadingTip:"",//提示
			brandInfo:[],
			tradeTable:[],
		      oldValue: '',
			shoopPatch:[],
			checklist:"",
			loadingTip: '没有更多啦！',
			show_dialog:false,
			as:[{"name":"1"},{"name":"2"},{"name":"3"},{"name":"4"}],
			userinfoMassage: [],//会员全部品牌信息
			zone: {
			        'label': '地区',
			        'value': ['福建省', '厦门市', '思明区'],
			        'style': 'cascader',
			        'type': 'text',
			        'edit': false,
			        'options': []
			      },
			areaInf:"",
			shoopTableData:[],//购物
			interactTable:[],//积分
			viceTableData:[],//声音
			integralTable:[],//积分表
			sendSmsVisible: false,
			show_zone:"",//提供悬浮使用
			smsModel:{
				templateId:"",
				content: "",
				smsSignature: "",
				spId: "",
				normalMobiles:[]
			},
			state:{
				smsOneLength: 70,
				contentLength: 0,
				smsQuantity: 1
			},
			rules:rules,
			//所有收信人
			allReceiver:[],
			normalReceiver:[],
			blackReceiver:[]
		},
		components: {
		    "inputform":function(resolver, reject) {
		    	require(["/static/vip/kdcustomer/js/inputform.js"], function(Config) {
		    		resolver(Config);
		    	})
		    },
		},
		watch:{
			"smsModel.templateId": function(value){
		        var that = this;
		        if(value != ""){
		         $.post("/base/common/getMarketingTemplateById",{id: value})
		                    .done((resp) =>{
		                        ResponseUtil.check(resp,that,"",()=>{
		                        	that.smsModel.content = resp.result.template;
		                        },()=>{
		                            new Error(resp.msg);
		                        })
		                    })
		        }else{
		        	that.smsModel.content = "";
		        }
		    },
		    "smsModel.content": function(value){
		    	 this.smsCount(value);
		    },
		    "smsModel.smsSignature": function(val){
		    	 this.smsCount(this.smsModel.content);
		    }
		},
		mounted:function(){
            this.zone.options = area.result;
            var that = this;
            that.area = area.result;
            that.$refs.customertable.model.area = that.area;
        },
		methods: {
			
			loadTable:function(page){

//   	         currentPage: 1,
//   	         total: 30,
//   	         'page-count': 0,
//   	         pageSize: 15,
//   	         pageSizes: [15, 25, 50, 100]
				
				var pageSize = vue.paginationParam.pageSize;
				page = page>0?page-1:0; 
				 vue.tradeTable = vue.pathAll.slice(page*pageSize,page*pageSize+pageSize);
			},
			
			saveUpEx:function(){
				this.$refs.inputfrom.save();
			},
			
			"aa":function(activeNames, type){
				var that = this;
				if(activeNames == 4){
					//获取当前人的品牌, 需要过滤
					if(type != 2){
						that.brandList = [];
						$.ajax({
							url:"/base/common/queryBrandList",
							type:"GET",
							async:false,
							success:function(data){
								if(data.success){
									var list = data.result;
									if(list.length>0){
										that.brandValue = list[0].v;
										for ( var item in list) {
											var obj = new Object();
											obj.brand_id = list[item].v;
											obj.brand = list[item].k;
											that.brandList.push(obj);
										}
									}
								}
							}
						});
					}
    				//获取属性值
    				$.ajax({
    					url:"queryaAttributesValue",
    					type:"GET",
    					async:false,
    					data:{brand_id:that.brandValue, sys_customer_id:vue.userInfo.sys_customer_id, source:2},
    					success:function(data){
    						if(data.success){
    							vue.attributesValue = data.result;
    						}
    					}
    				});
    				
    				//根据品牌id获取所有品牌属性
            		$.ajax({
    					url:"queryaAttributes",
    					type:"GET",
    					async:false,
    					data:{brand_id:that.brandValue, source:2},
    					success:function(data){
    						if(data.success){
    							that.CustomProperties = data.result;
    							
    							var arr = that.CustomProperties;
    	            			for(var i=0; i<arr.length; i++){
    	            				
    	            				for(var j = 0; j < vue.attributesValue.length; j++){
    	            					if(vue.attributesValue[j].pid == arr[i].id){
    	            						arr[i].model = vue.attributesValue[j].property_value;
    	            						arr[i].vid = vue.attributesValue[j].id;
    	            					}
    	            				}
    	            				
    	            				if(arr[i].type == 1 || arr[i].type == 3 || arr[i].type == 4 ){
    	            					that.CustomProperties[i].value =  arr[i].value.split("|");
    	            					if(arr[i].type == 1 || arr[i].type == 3){
    	            						
//    	            						Vue.set(that.CustomProperties[i], "model", that.CustomProperties[i].model)
    	            					}else if(arr[i].type == 4){
    	            						var newArr = [];
    	            						if(vue.CustomProperties[i].model != null){
    	            							vue.CustomProperties[i].showValue = vue.CustomProperties[i].model;
    	            							vue.CustomProperties[i].model = vue.CustomProperties[i].model.split(',');
    	            						}else{
    	            							vue.CustomProperties[i].model = new Array();
    	            							vue.CustomProperties[i].showValue = '';
    	            						}
    	            					}
    	            				}
    	            			}
    							
    						}
    					}
    				})
				}
			},
			"shopCallback":function(opts){
				var that = this;
				that.$refs.customertable.model.shopCount = 0;
				that.$refs.customertable.model.shopCount = opts.data.length;
				that.$refs.customertable.model.defaultCheckedKeys = opts.data;
				that.$refs.customertable.model.shop_codes = opts.data.join(",");
			},
			
			"selectType":function(button) {
// 						      this.selected = button.currentTarget.getElementsByTagName('span')[0].innerText
			},
			handleSwitch:function(val, data){
				var inputData = data;
				var oldDate = {};
//				var id = typeObj == 'object'?inputData.row.sys_customer_id:data[0].sys_customer_id;
				var id = typeof(data.length)!='undefined'?data[val].sys_customer_id:inputData.row.sys_customer_id;
				var target = typeof(data.length)!='undefined'?'touch':"rigth";
				//加载积分信息
				$.ajax({
		             type: "GET",
		             url: "queryBrandMssage",
		             data: {customer_id:id},
		             async:false, 
		             success: function(data){
	                       oldData=data.result;
	                       
	                       for(var i=0;i<oldData.length;i++){
	                    	   oldData[i].right = oldData[i].right == 1?true:false;
	                    	   oldData[i].touchState = oldData[i].touchState == 1?true:false;
							}
	                       if(data.result.length==1){
	                    	   vue.customerIntegral = data.result[val];
	                    	   vue.brandList = [];
	                    	   vue.brandList.push(data.result[val]);
	                       }
                     }
		         });
				
				if(target==='touch'){ //触达
					var url = '';
					var parm = {};
					if(!inputData[val].touchState){ //取消黑名单
						url = 'deleteTouchBlack';
						parm = {customer_id:inputData[val].sys_customer_id, brand_id:inputData[val].brand_id};
					}else{//添加黑名单
						url = 'addTouchBlack';
						parm = {customer_id:inputData[val].sys_customer_id, brandId:inputData[val].brand_id, mobile:vue.userInfo.mobile};
					}
					
					
					$.ajax({
			             type: "GET",
			             url: url,
			             data: parm,
			             async:false, 
			             success: function(data){
			            	 console.log("操作成功.");
	                     },
	                     error:function(){
	                    	 console.log("操作失败.");
	                     }
					})
				}else if(target==='rigth'){
					var url = '';
					var parm = {};
					if(!inputData.row.right){ //取消黑名单
						url = 'deleteRightBlack';
						parm = {customer_id:inputData.row.sys_customer_id, brand_id:inputData.row.brand_id};
					}else{//添加黑名单
						url = 'addRightBlack';
						parm = {customer_id:inputData.row.sys_customer_id, brandId:inputData.row.brand_id, customeName:vue.userInfo.customer_name};
					}
					
					
					$.ajax({
			             type: "GET",
			             url: url,
			             data:parm,
			             async:false, 
			             success: function(data){
			            	 console.log("success");
	                     },
	                     error: function(data){
	                    	 console.log("error");
	                     },
					})
					
				}
				console.log(this.brandList);
				console.log(this.userinfoMassage)
			},
			 
		    "editsave":function(inputData, type){
		    	
		    	if(typeof(type) != 'undefined' && type!=''){//是否传入修改对应的字段
		    		var arr = type.split('.');
		    		if(arr.length > 1){//大于1是userInfo数据
		    			editObj = {};
		    			if(arr[1] == 'birthday'){//修改时间 if
		    				var date = moment(inputData).format('YYYY-MM-DD')
		    				editObj[arr[1]] = date;
		    				vue.userInfo.birthday = date.substring(0,10);
		    			}else if( arr[1] == 'value'){//修改地区
		    				if(inputData.length > 0){
//		    					vue.zone.value[0] = vue.userInfo.province;
//			                       vue.zone.value[1] = vue.userInfo.city;
//			                       vue.zone.value[2] = vue.userInfo.district;
		    					editObj.province = inputData[0];
		    					editObj.city = inputData[1];
		    					editObj.district = inputData[2];
		    				}
		    			}else{					//修改时间 else
		    				editObj[arr[1]] = inputData;
		    			}
		    			editObj.id = vue.userInfo.id;
		    			//保存方法
 						$.ajax({
 				             type: "GET",
 				             url: "editCustomer",
 				             data: editObj,
 				             async:false, 
 				             success: function(data){
 							   vue.oldValue = vue.userInfo;
 				             }
 				         });
		    		}else{//暂时是属性
		    			switch (vue.activeName3){
		    				case '2'://集团属性
		    					var inputValue = vue.groupAttributes[type];
		    					var parmObj = {};
		    					if(typeof(inputValue.vid) !== 'undefined'){//更新
		    						parmObj.id = inputValue.vid
		    					}else{ //添加
		    						parmObj.customer_property_id = inputValue.id;
		    						//parmObj.id = inputValue.id
			    					parmObj.source = 1;
			    					parmObj.sys_customer_id = vue.userInfo.sys_customer_id;
			    					parmObj.is_jingling = 0;
		    					}
		    					
		    					switch (inputValue.type){
									case 2:
										parmObj.property_value = moment(inputValue.model).format('YYYY-MM-DD');
										vue.groupAttributes[type].model = moment(inputValue.model).format('YYYY-MM-DD');
									break;
									case 4:
										vue.groupAttributes[type].showValue = parmObj.property_value;
										parmObj.property_value = "";
										for(var i=0; i<inputValue.model.length; i++){
											
											if(inputValue.model[i] != ''){
												parmObj.property_value += inputValue.model[i];
												if(i != inputValue.model.length - 1){
													parmObj.property_value += ',';
												}
											}
											
										}
										vue.groupAttributes[type].showValue = parmObj.property_value;
									break;
									default:
										parmObj.property_value = inputValue.model;
									break;
								}
		    					
		    					$.ajax({
									url:"editBrandAttributes",
									data:parmObj,
									async:false,
									type:"post",
									success:function(data){
										
									}
		    					});
		    				break;
		    				case '4'://自定义属性
		    					var brandId = vue.brandValue;//品牌id
		    					var inputValue = vue.CustomProperties[type];
		    					var parmObj = {};
		    					
		    					if(typeof(inputValue.vid)!='undefined' && inputValue.vid!=''){//是不是更新>>>> 是
		    						parmObj.id = inputValue.vid
		    					}else{		//是不是更新   >>>>否
		    						parmObj.customer_property_id = inputValue.id;
		    						//parmObj.id = inputValue.id
			    					parmObj.source = 2;
			    					parmObj.sys_customer_id = vue.userInfo.sys_customer_id;
			    					parmObj.is_jingling = 0;
		    					}
		    					
		    					
		    					vue.CustomProperties[type].showValue = parmObj.property_value;
		    					switch (inputValue.type){
									case 2:
										parmObj.property_value = moment(inputValue.model).format('YYYY-MM-DD');
										vue.CustomProperties[type].model = moment(inputValue.model).format('YYYY-MM-DD');
									break;
									case 4:
										parmObj.property_value = "";
										for(var i=0; i<inputValue.model.length; i++){
											
											if(inputValue.model[i] != ''){
												parmObj.property_value += inputValue.model[i];
												if(i != inputValue.model.length - 1){
													parmObj.property_value += ',';
												}
											}
											
										}
										vue.CustomProperties[type].showValue = parmObj.property_value;
									break;
									default:
										parmObj.property_value = inputValue.model;
									break;
								}
		    					$.ajax({
									url:"editBrandAttributes",
									data:parmObj,
									async:false,
									type:"post",
									success:function(data){
										
									}
		    					});
		    					
		    				break;
		    			}
		    		}
		    	}
		    	
 						
				//重新加载会员信息
				$.ajax({
		             type: "GET",
		             url: "loadCustomerInfoById",
		             data: {customer_id:vue.userInfo.sys_customer_id},
		             async:false,
		             success: function(data){
		            	 //将异步加载的数据作为弹窗数据
		            	 		vue.oldValue=data.result;
		            	 		 if(vue.userInfo.birthday != null){
		            	 			var date =  moment(vue.userInfo.birthday ).format('YYYY-MM-DD');
		            	 			date = date.substring(0, 10);
									vue.userInfo.birthday = date;
		                       }
		                       vue.mobile = vue.userInfo.mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
		                      }
		         });
			},
			"fromClick":function(tab, event){
				var that = this;
				
				var num = tab.index;
				var customerID = vue.userInfo.sys_customer_id ;
				switch(num){
					case "0": //会员详情
						
					 	break;
					case "1": //积分
						$.ajax({
				             type: "GET",
				             url: "queryBrandMssage",
				             data: {customer_id:customerID},
				             async:false, 
				             success: function(data){
				            	 if(data.success && data.result.length>0){
				            		 that.selectTree = data.result[0].brand_id;
				            		 that.customerIntegral = data.result[0];
				            		 that.customerIntegral.count_score = that.customerIntegral.interaction_total_score + that.customerIntegral.trade_total_score
				            	 }
				             }
				         });
						$.ajax({
							type: "GET",
							url: "queryPointInfo",
							data: {customer_id:customerID},
							async:false, 
							success: function(data){
								if(data.success && data.result.length>0){
									that.integralTable = data.result;
								}else{
									that.integralTable = [];
								}
							}
						});
					 	break;
					case "2": //购物行为
                       var that = vue;
                       vue.pushAll = [];
                       vue.shoopTableData = [];
                       vue.shoopPatch = [];
                       vue.activeName1 = '1',
                       vue.loadingTip='没有更多啦！';
						 $.ajax({
				             type: "GET",
				             url: "queryShoppingByCustomerId",
				             data: {customerId:customerID},
				             async:false, 
				             success: function(data){
				            	 vue.shoopTableData = data.data;
				             }
				         });
						 $.ajax({
				             type: "GET",
				             url: "loadTradeByCustomerId",
				             data: {customerId:customerID},
				             async:false, 
				             success: function(data){
				            	 if(data.data.length>0){
				            		 vue.tradeTable = data.data.slice(0,15);
				            		 vue.paginationParam.total = data.data.length;
				            		 vue.pathAll = data.data;
				            		 vue.shoopPatch = data.data.slice(0,10);
				            		 console.log(vue.shoopPatch);
				            	 }
				             }
				         });
					 	break;
					case "3"://互动行为
						vue.pushAll = [];
	                    vue.shoopPatch = [];
	                    vue.interactTable = [];
						that.activeName5 = '1';
						vue.paginationParam.total = 0;
						that.loadingTip='没有更多啦！';
						$.ajax({
				             type: "GET",
				             url: "loadOutActivities",
				             data: {customerId:customerID},
				             async:false, 
				             success: function(data){
				            	 if(data.success){
				            		 vue.interactTable = data.result;
				            	 }
				             }
				         });
						$.ajax({
							type: "GET",
							url: "loadOutActivitiesPath",
							data: {customerId:customerID},
							async:false, 
							success: function(data){
								if(data.success){
									vue.pathAll = data.result;
									vue.shoopPatch = data.result.slice(0,10);
									console.log(vue.shoopPatch);
								}
							}
						});
						
					 	break;
					case "4"://触达记录
						vue.pushAll = [];
	                    vue.shoopPatch = [];
	                    vue.tatchTable = [];
						that.activeName4 = '1';
						vue.paginationParam.total = 0;
						$.ajax({
				             type: "GET",
				             url: "loadTouchByCustomerId",
				             async:false, 
				             data: {customerId:customerID},
				             success: function(data){
				            	 if(data.success){
				            		 vue.tatchTable = data.result;
				            	 }
				             }
				         });
						$.ajax({
							type: "GET",
							url: "loadTouchPath",
							async:false, 
							data: {customerId:customerID},
							success: function(data){
								if(data.success){
									 vue.pathAll = data.result;
				            		 vue.shoopPatch = data.result.slice(0,10);
				            		 console.log(vue.shoopPatch);
								}
							}
						});
					 	break;
					case "5"://客户声音
						vue.pushAll = [];
	                       vue.shoopPatch = [];
	                       vue.viceTableData = [];
	                       vue.paginationParam.total = 0;
						that.activeName6 = '1';
						$.ajax({
				             type: "GET",
				             url: "/voice/evaluate/laodCustomerVoice",
				             async:false, 
				             data: {customerId:customerID},
				             success: function(data){
				            	 if(data.success){
				            		 vue.viceTableData = data.restule;
				            	 }
				             }
				         });
//						this.$refs.voicetable.$search({searchMap:{customer_id:customerID}});
					 	break;
					case "6": //地址管理
						vue.pushAll = [];
	                       vue.shoopPatch = [];
	                       vue.tableData=[];
						$.ajax({
				             type: "GET",
				             url: "laodAddessByCustomerID",
				             data: {customerId:customerID},
				             async:false, 
				             success: function(data){
				            	 if(typeof(data.data) !== 'undefined' && data.data.length>0){
				            		 vue.tableData = data.data;
				            		 for (var int = 0; int < vue.tableData.length; int++) {
				            			 var reg = /^(\d{3})\d{4}(\d{4})$/;
				            			 vue.tableData[int].mobile = vue.tableData[int].mobile.replace(reg, "$1****$2");
									}
				            	 }
				            	 
//				                 that.$set(that, "lsitResult", data.result)
				             }
				         });
						
//						this.$refs.addresstable.$search({searchMap:{customer_id:customerID}});
					 	break;
				}
				
			},
			"handleNodeClick":function(data){
				
			},
			//积分查询
			"loadIntegral":function(data){
			},
			//下拉框值改变
			"selectChange":function(data, type){
				
				//第一选择框的值修改第二选择框属性集合 secondInfo  from RFM
				if(type=="one" && data!== null && data !== ''){
					vue.secondType = 0;
					vue.selectTow = '';
					if(data === "2"){
						vue.secondType = 1;
						vue.url = "/base/common/loadDeptTree"
					}
					if(data==="3"){
						vue.secondType = 1;
						vue.url = "/base/common/loadChannelTree"
						
					}
//					
				}
				//第二框的值修改rfm属性集合  frmInfo from RFM
				if(type=="tow" && data!== null && data !== ''){
					 $.ajax({
			             type: "GET",
			             url: "laodRFMbyCustomerId",
			             data: {customerId:vue.userInfo.sys_customer_id, brandId:data},
			             async:false, 
			             success: function(data){
			            	 if(data.success && typeof(data.result) != 'undefined' && data.result != ''){
			            		 	vue.rfmInfo = data.result;
			            			 var time = new Date();
			            			 if(vue.rfmInfo.last_pay_time != null ){
			            				 var endTime = new Date(vue.rfmInfo.last_pay_time);
			            				 vue.rfmInfo.dormant_day = parseInt((time.getTime() -  endTime.getTime())/(24 * 60 * 60 * 1000));
			            			 }
			            	 }	
			             }
			         });
				}
				
				//积分下拉框
				if(type=="three"){
					var that = this;
					for(var i=0;i<vue.userinfoMassage.length;i++){
						 if(vue.userinfoMassage[i].brand_id == data){
							vue.customerIntegral = vue.userinfoMassage[i];
							that.customerIntegral.count_score = that.customerIntegral.interaction_total_score + that.customerIntegral.trade_total_score;
							break;
						 }
					}								
				}
				
				
			},
			
			customSelect:function(number){
				vue.aa(4, 2);
				
				/*var brandId  = this.brandValue;
				//根据品牌id获取所有品牌属性
        		$.ajax({
					url:"/marketing/activities/queryCustomPropertiesByBrandId",
					type:"GET",
					async:false,
					data:{id:brandId},
					success:function(data){
						if(data.success){
							that.CustomProperties = data.result;
							
							var arr = that.CustomProperties;
	            			for(var i=0; i<arr.length; i++){
	            				
	            				if(arr[i].type == 1 || arr[i].type == 3 || arr[i].type == 4 ){
	            					that.CustomProperties[i].value =  arr[i].value.split("|");
	            					if(arr[i].type == 1 || arr[i].type == 3){
	            						
	            						Vue.set(that.CustomProperties[i], "model", "")
	            					}else if(arr[i].type == 4){
	            						Vue.set(that.CustomProperties[i], "model", [])
	            					}
	            				}else{
	            					Vue.set(that.CustomProperties[i], "model", "")
	            				}
	            			}
							
						}
					}
				})*/
			},
			"dateils":function(data){
				debugger
				this.zone.options = area.result;
				var that = this;
				  that.area = area.result;
	              that.$refs.customertable.model.area = that.area;
				vue.show_dialog = true;
				//每次点击之前清空数据
				vue.customerIntegral ="";
				vue.userinfoMassage=[];
				vue.brandInfo=[];
				vue.activeName3="1",
				vue.rfmInfo = '';
				vue.selectOne="1";
				vue.show_zone="";
				//赋值名称
				 vue.xmll=data;
				 vue.oldValue = data;
				this.customer_name = data.customer_name;
				
//				赋值id
				var customer_id = data.sys_customer_id;
				//重新加载会员信息
				$.ajax({
		             type: "GET",
		             url: "loadCustomerInfoById",
		             data: {customer_id:customer_id},
		             async:false,
		             success: function(data){
		            	 //将异步加载的数据作为弹窗数据
		                       vue.userInfo=data.result;
		                       //检查是否存在字段  导致无法修改数据
		                       if(vue.userInfo.birthday != null){
									vue.userInfo.birthday = vue.userInfo.birthday.substring(0, 10);
		                       }
		                       vue.zone.value[0] = vue.userInfo.province;
		                       vue.zone.value[1] = vue.userInfo.city;
		                       vue.zone.value[2] = vue.userInfo.district;
		                       vue.oldValue = vue.userInfo;
		                       vue.show_zone = vue.userInfo.province + vue.userInfo.city + vue.userInfo.district;
		                       vue.mobile = vue.userInfo.mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
		                      }
		         });
				//打开弹窗
				this.customerdialog = true;
				vue.userInfo.rule = 2;
				
				//加载积分信息
				$.ajax({
		             type: "GET",
		             url: "queryBrandMssage",
		             data: {customer_id:customer_id},
		             async:false, 
		             success: function(data){
	                       vue.userinfoMassage=data.result;
	                       if(vue.userinfoMassage.length > 0){
	                    	   vue.selectTow = vue.userinfoMassage[0].brand_id;
	                    	   vue.brandList = data.result;
	                    	   vue.brandValue = data.result[0].brand_id;
	                    	   
	                    	   vue.selectChange(vue.selectTow,'tow');
	                       }
	                       
	                       for(var i=0;i<vue.userinfoMassage.length;i++){
	                    	   vue.userinfoMassage[i].right = vue.userinfoMassage[i].right == 1?true:false;
	                    	   vue.userinfoMassage[i].touchState = vue.userinfoMassage[i].touchState == 1?true:false;
							}
	                       
	                       if(data.result.length==1){
	                    	   vue.customerIntegral = data.result["0"];
	                       }
                     }
		         });
				//加载会员品牌
				$.ajax({
		             type: "GET",
		             url: "loadBrand",
		             data: {customer_id:customer_id},
		             async:false, 
		             success: function(data){
		                       vue.ditchInfo=data.result;
		                      }
		         });
				//获取属性值
				$.ajax({
					url:"queryaAttributesValue",
					type:"GET",
					async:false,
					data:{brand_id:that.brandValue, sys_customer_id:vue.userInfo.sys_customer_id, source:1},
					success:function(data){
						if(data.success){
							vue.attributesValue = data.result;
						}
					}
				});
				//加载集团属性
				$.ajax({
		             type: "GET",
		             url: "queryGroupAttributes",
		             data: {customer_id:customer_id},
		             async:false, 
		             success: function(data){
		            	 if(data.success && data.result != ''){

 							vue.groupAttributes = data.result;
 							
 							var arr = vue.groupAttributes;
 	            			for(var i=0; i<arr.length; i++){
 	            				
 	            				for(var j = 0; j < vue.attributesValue.length; j++){
 	            					if(vue.attributesValue[j].pid == arr[i].id){
 	            						arr[i].model = vue.attributesValue[j].property_value;
 	            						arr[i].vid = vue.attributesValue[j].id;
 	            					}
 	            				}
 	            				
 	            				if(arr[i].type == 1 || arr[i].type == 3 || arr[i].type == 4 ){
 	            					vue.groupAttributes[i].value =  arr[i].value.split("|");
 	            					if(arr[i].type == 1 || arr[i].type == 3){
 	            						
// 	            						Vue.set(vue.groupAttributes[i], "model", "")
 	            					}else if(arr[i].type == 4){
 	            						var newArr = [];
 	            						if(vue.groupAttributes[i].model != null){
 	            							vue.groupAttributes[i].showValue = vue.groupAttributes[i].model;
 	            							vue.groupAttributes[i].model = vue.groupAttributes[i].model.split(',');
 	            						}else{
 	            							vue.groupAttributes[i].model = new Array();
 	            							vue.groupAttributes[i].showValue = '';
 	            						}
 	            					}
 	            				}
 	            			}
							}
		             }
		         });
				
				that.$nextTick(() => {
			        // 购物轨迹 监听滚动变化 工具类
					addScrollListener.addScrollListener(this.$refs.trail.$el.children[0], this.lineLoadMore)
			      })
			},
			
			
			// 购物轨迹，滚动加载更多(后台工程使用require模式，请查看core首页 )
		    lineLoadMore () {
		      this.loadingTip = '努力加载中...';
		      
		    	  
//		      let lastValue = vue.pathAll[this.scrollData.length - 1].name;
		      if ((vue.pathAll.length/10)>vue.pathNum) {
		    	  vue.pathNum += 1;
		        console.log('----加载中----')
		        setTimeout(() => {
		        	
		        	var lastValue = vue.pathAll.slice(10*vue.pathNum, 10*vue.pathNum+10);
		        	for (var int = 0; int < lastValue.length; int++) {
		        		vue.shoopPatch.push(lastValue[int]);
					}
		        	 console.log(vue.shoopPatch.length);
		          console.log('----加载完成----')
		        }, 1000)
		      } else {
		        console.log('--没有更多啦--');
		        this.loadingTip = '没有更多啦！';
		      }
		    },
			"closeDialog":function(){
				this.customerdialog = false;
				this.activeName2="first";
				this.inputdialog = false;
			},
			"opdiaog":function(){
			},
			"aclicka":function(data, node){
				$.ajax({
					url:"/vip/kdcustomer/laodRFMbyShopCode",
					type:"get",
					data:{shopCode:data.code},
					ansy:false,
					success:function(json){
						if(json.success && json.result != null){
	            		 	vue.rfmInfo = json.result;
	            			 var time = new Date();
	            			 if(vue.rfmInfo.last_pay_time != null ){
	            				 var endTime = new Date(vue.rfmInfo.last_pay_time);
	            				 vue.rfmInfo.dormant_day = parseInt((time.getTime() -  endTime.getTime())/(24 * 60 * 60 * 1000));
	            			 }
	            	 }else{
	            		 vue.rfmInfo = '';
	            	 }
					}
					
				})
			},
			"aclick":function(data, node, element){
			},
			hideName:function(value){
				if(typeof(value) !== 'undefined'){
					
					return value.substr(0,1) + "*" + value.substr(2,value.length-1);
				}
			},
			//发送短信表单
		    sendSmsForm(data){
				var that = this;
				var mobiles = [];
				data.map((item)=>{
					mobiles.push(item.mobile);
					that.allReceiver.push({mobile:item.mobile
						,name:item.customer_name});
				})
				this.queryReceiver(mobiles);
		    	this.sendSmsVisible = true;
		    },
		    customerExportForm(){
		    	
		    },
		    
		    //弹窗关闭
		    closeForm(model){
		    	this.normalReceiver = [];
		    	this.blackReceiver = [];
		    	this.allReceiver = [];
		    	this.$set(this,model,this.$options.data()[model]);
		    	this.$refs.smsForm.resetFields();
		    },
		    //短信发送
		    sendSMS(){
		    	let that = this;
		    	that.$refs.smsForm.validate((valid)=>{
		    		if(valid){
		    			$.post("/vip/kdcustomer/batchSendSms",that.smsModel).done((resp)=>{
		    				if(resp.success){
		    					that.$message.success(resp.msg);
		    					that.sendSmsVisible = false;
		    				}else{
		    					that.$message.error(resp.msg);
		    				}
		    			}).fail(()=>{
		    				that.$message.error("请求失败");
		    			})
		    		}
		    	})
		    },
		    //查询含有的黑名单成员
			queryReceiver(value){
				var that = this;
		    	$.post("/vip/kdcustomer/querySmsTouchBlack",{mobiles: value})
                .done((res) =>{
                	if(res.success){
                		 var black = res.result.black;
                         var normal = res.result.normal;
                         var allReceiver = that.allReceiver;
                         that.smsModel.mobiles = normal;
                         for(var i=0;i<allReceiver.length;i++){
                         	for(var j=0;j<normal.length;j++){
                         		if(allReceiver[i].mobile == normal[j]){
                 			        that.normalReceiver.push({receiver: that.hideName(allReceiver[i].name)+"("+ that.hideMobile(allReceiver[i].mobile) + ")"});
                         		}
                         	}
                         	for(var k=0; k < black.length;k++){
                         		if(allReceiver[i].mobile == black[k]){
                 			        that.blackReceiver.push({receiver:that.hideName(allReceiver[i].name)+"("+ that.hideMobile(allReceiver[i].mobile) +")"});
                         		}
                         	}
                         	
                         }
                	}else{
                		  that.$message.error(resp.msg);
                	}
                }).fail(()=>{
                	that.$message.error("请求失败");
                })
			},
			//计算短信内容
			smsCount: function(value){
				 this.state.contentLength = value.length + this.smsModel.smsSignature.length;
			        if(this.state.contentLength > 70){
			            this.state.smsQuantity = parseInt(this.state.contentLength/67) +1;
			        }else{
			              this.state.smsQuantity = 1;
			        }
			        if(this.state.smsQuantity > 1 || this.state.contentLength == 67){
			            this.state.smsOneLength = 67;
			        }else{
			             this.state.smsOneLength = 70;
			        }
			}
		}
	
	})
})
		
		