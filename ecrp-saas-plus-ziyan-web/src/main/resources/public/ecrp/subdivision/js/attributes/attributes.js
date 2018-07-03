 define(['vue','moment',
	 "/public/ecrp/components/ns-shoplist-select.js",
	 "/public/ecrp/subdivision/components/ns-cascader.js","/public/ecrp/subdivision/components/ns-tradesubdivision-select.js"],function(Vue,moment){
	var methods = {
			// 点击属性列表设置右侧对应属性
			setPropertyChoose:function(name,text,sender,that){ // 判断  中的值是否有与name对应，有的话替换对应位置，没有的话，在memberChoose后面增加一条
//			      if($.inArray(name, this.memberChoose) == -1){
//			    	  this.memberChoose.push(name);
//			      }
				this.CustomerNum = "";
				this.$refs.name;
			      var html = "html";
			      var sql = "sql";
			      var xml = "xml";
			      var A0  = []; 
			      //获取组件的数据
			      var data = sender.condition_json;
			      var param = "html";
			      var  getValue1 =  eval('('+sender.col_name+".Data()"+')');
			      getValue1.con_name = sender.con_name;
			      if(typeof(getValue1.type)!='undefinded'&&getValue1.type == '-1'){
			    	  for (var i = 0; i < this.A1.length; i++) {
			    		  if(this.A1[i].key == text){
			    			  for (var j = 0; j < this.A1[i].value.length; j++) {
								if(this.A1[i].value[j].key == getValue1.code && this.A1[i].value[j].value.length >0){
									return ;
								}
							}
			    			  
			    		  }
					}
			    	  let oldClassName = document.getElementById(sender.col_name).className;
						document.getElementById(sender.col_name).className =  oldClassName.concat(' is-disabled');
//			    	    document.getElementById(sender.col_name).href ="javascript:volid(0);"; 
			      }else{
			    	  let oldClassName = document.getElementById(sender.col_name).className
						document.getElementById(sender.col_name).className =  oldClassName.concat(' is-selected');
			      }
			      
			      for ( var propertymenu in this.A1) {
			    	  var flag = true;
					if(this.A1[propertymenu].key == text){
					   for ( var propertys in this.A1[propertymenu].value) {
						   if(this.A1[propertymenu].value[propertys].key == getValue1.code){
							   if(this.A1[propertymenu].value[propertys].value.length > 0){
								  this.A1[propertymenu].value[propertys].value[this.A1[propertymenu].value[propertys].value.length-1].relation = "and";
							   }
							   Vue.set(this.A1[propertymenu].value[propertys].value, this.A1[propertymenu].value[propertys].value.length, getValue1);
//							   this.footerArray.push({getValue1.col_name:});
							   flag = false;
					    	     break;
						   }
					}
					   if(flag){
						   Vue.set(A0, A0.length, getValue1); 
						      Vue.set(this.A1[propertymenu].value, this.A1[propertymenu].value.length, {key:sender.col_name,value:A0});
						      Vue.set(this.A1[propertymenu],"name", name);
						      break;
				    	}
					}
					if(!flag){
						break;
					}
					if(flag&&this.A1[propertymenu].key != text&&propertymenu == this.A1.length-1){
						 Vue.set(A0, A0.length, getValue1); 
						  var temp = [];
					      Vue.set(temp, 0, {key:sender.col_name,value:A0});
					      Vue.set(this.A1, this.A1.length, {key:text,value:temp,name:name}); 
					}
					 
			      }
			      if(this.A1.length == 0){
			    	  Vue.set(A0, A0.length, getValue1); 
				      var temp = [];
				      Vue.set(temp, 0, {key:sender.col_name,value:A0});
				      Vue.set(this.A1, this.A1.length, {key:text,value:temp,name:name}); 
			      }
			     
			      this.showNumOfProP();
			      this.setChoose(name);
			},
			
			/**
			 * 修改各个属性选择的个数
			 */
			showNumOfProP:function(){
				 for (var k = 0; k < this.A1.length; k++) {
					 for ( var key in this.propNum) {
						 if(this.A1[k].name == key){
							 var Sum = 0;
							 for (var j = 0; j < this.A1[k].value.length; j++) {
								Sum += this.A1[k].value[j].value.length;
							}
							 Vue.set(this.propNum,key,Sum);
						}
					}
					}     
			},
			/**
		     * 点击增加按钮增加维度
		     */
		    addSubdivisionCondition:function(item,key){
		    	this.CustomerNum = "";
		    	var obj = {};
		    	obj.condition_json = "";
		    	obj.col_name = key;
		    	if(item.name!="brand"&&item.name!="group"){
		    		this.setPropertyChoose(item.name,item.key,obj,this);
		    	}else{
		    		for (var i = 0; i < item.value.length; i++) {
		    			if(item.value[i].key == key){
				    		this.setcustomerPropertyChoose(item.name,item.key,item.value[i].value[0],this,0);
				    	}
					}
		    	}
		    },
			setChoose:function (name) {
			      // 判断 memberChoose 中的值是否有与name对应，有的话替换对应位置，没有的话，在memberChoose后面增加一条
			      let chooseNames = this.memberChoose.slice(0);
			      let index = chooseNames.indexOf(name);
			      

			      if (index > -1) {
			        chooseNames.splice(index, 1);
//			        this.memberChoose.unshift(name);
			      } else {
//			        this.memberChoose.push(name);
			    	this.memberChoose.unshift(name);
			      }

			      // 如果原来页面中其他元素有 is-focus 类名，将其去除
			      let focus = document.getElementsByClassName('is-focus');
			      for (var i = 0; i < focus.length; i++) {
			        if (focus.length > 0) {
			          document.getElementsByClassName('is-focus')[i].className = focus[i].className.replace(/ is-focus/, '');
			        }
			      }
			      this.$nextTick(function(){
			        // 添加 is-focus 类名
			    	  console.log(this.A1);
			        let oldClassName = document.getElementById(name).className;
			        if (oldClassName.indexOf('is-focus') < 0) {
			          document.getElementById(name).className = oldClassName.concat(' is-focus');
			        }
			      })
			    },
			//自定义会员属性
			setcustomerPropertyChoose:function(name,text,items,that,propertyNo){
				this.CustomerNum = "";
				var A0=[];
				var sender = $.extend({},items);
				sender.uuid = this.uuid();
			    	  let oldClassName = document.getElementById(sender.id).className
						document.getElementById(sender.id).className =  oldClassName.concat(' is-selected');
			      
			    for ( var propertymenu in this.A1) {
			    	  var flag = true;
					if(this.A1[propertymenu].key == text){
					   for ( var propertys in this.A1[propertymenu].value) {
						   if(this.A1[propertymenu].value[propertys].key == sender.id){
							   if(this.A1[propertymenu].value[propertys].value.length > 0){
								   this.A1[propertymenu].value[propertys].value[this.A1[propertymenu].value[propertys].value.length-1].relation = "and";
							   }
							   Vue.set(this.A1[propertymenu].value[propertys].value, this.A1[propertymenu].value[propertys].value.length, sender);
					    	   flag = false;
					    	     break;
						   }
					}
					   if(flag){
						   Vue.set(A0, A0.length, sender); 
						      Vue.set(this.A1[propertymenu].value, this.A1[propertymenu].value.length, {key:sender.id,value:A0});
						      Vue.set(this.A1[propertymenu],"name", name);
						      break;
				    	}
					}
						if(!flag){
							break;
						}
						if(flag&&this.A1[propertymenu].key != text&&propertymenu == this.A1.length-1){
							 Vue.set(A0, A0.length, sender); 
							  var temp = [];
						      Vue.set(temp, 0, {key:sender.id,value:A0});
						      Vue.set(this.A1, this.A1.length, {key:text,value:temp,name:name}); 
						}
					
					 
			      }
			      if(this.A1.length == 0){
			    	  Vue.set(A0, A0.length, sender); 
				      var temp = [];
				      Vue.set(temp, 0, {key:sender.id,value:A0});
				      Vue.set(this.A1, this.A1.length, {key:text,value:temp,name:name}); 
			      }
				
			      this.showNumOfProP();
			      this.setChoose(name);
				
			},
			//删除
			deleteSubdivisionCondition:function(dataindex,itemindex,data,item,index){
				var that =this;
					let oldClassName = document.getElementById(data.key).className
				if(data.value[0].type == '-1'){
					document.getElementById(data.key).className =  oldClassName.replace(/ is-disabled/, '');
//					document.getElementById(data.key).href ="#"; 
//					document.getElementById(data.key).className =  oldClassName.replace(/ is-selected/, '');
				}else{
					if(data.value.length == 0){
						document.getElementById(data.key).className =  oldClassName.replace(/ is-selected/g, '');
					}else if(data.key=="tradeData" && data.value.length == 1){
						document.getElementById(data.key).className =  oldClassName.replace(/ is-selected/g, '');
					}else{
						document.getElementById(data.key).className =  oldClassName.replace(/ is-selected/, '');
					}
					
				}
//				that.A1[index].value[itemindex].value[dataindex]
				if(that.A1[index].value[itemindex].key == data.key){
					that.A1[index].value[itemindex].value.splice(dataindex, 1);
//					if(that.A1[index].value[itemindex].value.length == 0){
//						if(that.A1[index].key == item.key){
//							that.A1[index].value.splice(itemindex, 1);
//						}
						for (var i = 0; i < that.A1[index].value.length; i++) {
							if(that.A1[index].value[i].value.length != 0){
								break;
							}
							if(that.A1[index].value[i].value.length == 0&&i==that.A1[index].value.length-1){
								Vue.set(that.A1[index],"value",[]);
							}
							
						}
//					}
					
					
				}
			
				 this.showNumOfProP();
			},
			//初始化会员自定义属性
			initUserPropertys:function(callBack){
				var that = this;
				$.ajax({
              		 url:"/subdivision/subdivision/getCustomerPropertys",
	               	 data:{},
                    type:"post",
              		 success:function(result4personal){
                           if(result4personal.success){
                        	     that.$set(that,"UserPropertys",result4personal.result);
                        	     for (var n in that.UserPropertys) {
                        	     for (var i = 0; i < that.UserPropertys[n].length; i++) {
                        	    		Vue.set(that.UserPropertys[n][i],"condition","equal");
                        				Vue.set(that.UserPropertys[n][i],"relation","");
                        				if(that.UserPropertys[n][i].type ==1||that.UserPropertys[n][i].type ==3||that.UserPropertys[n][i].type ==4){
                        					Vue.set(that.UserPropertys[n][i],"result",that.UserPropertys[n][i].value.split("|"));
                        					if(that.UserPropertys[n][i].type ==4){
                        						Vue.set(that.UserPropertys[n][i],"CDATA",[that.UserPropertys[n][i].value.split("|")[0]]);
                        					}else{
                        						Vue.set(that.UserPropertys[n][i],"CDATA",that.UserPropertys[n][i].value.split("|")[0]);
                        					}
                        				}else{
                        					Vue.set(that.UserPropertys[n][i],"CDATA",that.UserPropertys[n][i].value);
                        				}
								}
                        	     }
                        	     that.$set(that,"groupPropertys",that.UserPropertys.groupProperty); 
                        	     delete result4personal.result.groupProperty
                        	     for(var i in result4personal.result){
                        	    	 for (var j = 0; j < result4personal.result[i].length; j++) {
                        	    		 Vue.set(result4personal.result[i][j],"brandName",i);
                        	    		 Vue.set(result4personal.result[i][j],"condition","equal");
                        	    		 Vue.set(result4personal.result[i][j],"relation","");
									}
                        	     }
                        	     that.$set(that,"brandPropertys",result4personal.result);
                        	     
                        	     for(var i in result4personal.result){
                        	    	 if(result4personal.result[i] != null){
                            	    	 that.$set(that,"brandRadio",i);
                            	    	 break;
                            	     }
                        	     }
                        	     
                           }else{
//                                that.$message.error('数据错误！');
                           }
                           
                           //回调
                           if(typeof callBack =="function")
                           {
                        	   callBack(); 
                            }
              		 }
              	 
              	 });
			},
			//初始化会员基本属性
			initCustomerBasicPropertys:function(callBack){
				var that = this;
				$.ajax({
             		 url:"/base/common/setValue",
	               	 data:{},
                   type:"post",
             		 success:function(result){
                          if(result.success){
                       	     that.$set(that,"SubdivisionPropertys",result.result);
                       	     //动态添加
                       	     $('body').append(that.getJsUrl("js"));
                       	     $('body').append(that.getJsUrl("jsonobject"));
                          }else{
//                               that.$message.error('数据错误！');
                          }
                          
                          //回调
                          if(typeof callBack =="function")
                          {
                       	   	 callBack(); 
                           }
             		 }
             	 
             	 });
			},
			/**
			 * 获取压缩js的url
			 */
			"getJsUrl":function(key){
				return $("<script src='/base/common/getAttributesJS?key=/&url=public/ecrp/subdivision/js/attributesTypeJs/"+key+" ' charset='utf-8'></script>");
			},
			/**
			 * 店铺选择组件方法
			 * 
			 */
            doBrandMultilayer: function(opts){
				var that = this;
				that.$set(that,"shopCodes",opts.data);
				if(opts.data.length > 0){
					var codes = opts.data[0];
					for (var i = 1; i < opts.data.length; i++) {
						codes = codes+","+opts.data[i];
					}
					if(this.A1[this.propIndex].key == "会员基本属性"){
						if(this.A1[this.propIndex].value[this.shopschooseIndex].key == "shopChoose"){
							this.A1[this.propIndex].value[this.shopschooseIndex].value[this.shopchooseIndex].CDATA=codes;
						}
					}
				}
				Vue.set(this.A1[this.propIndex].value[this.shopschooseIndex].value[this.shopchooseIndex],"array",opts.data);
				that.$refs[that.A1[this.propIndex].value[this.shopschooseIndex].key][this.shopchooseIndex].validate(function(valid){
					
				})
				
			},
        shopCallBack: function(opt){
			var opts = opt.data;
            var that = this;
            that.$set(that,"shopCodes",opts);
            if(opts.length > 0){
                var codes = opts[0];
                for (var i = 1; i < opts.length; i++) {
                    codes = codes+","+opts[i];
                }
                if(this.A1[this.propIndex].key == "会员基本属性"){
                    if(this.A1[this.propIndex].value[this.shopschooseIndex].key == "shopChoose"){
                        this.A1[this.propIndex].value[this.shopschooseIndex].value[this.shopchooseIndex].CDATA=codes;
                    }
                }
            }
            Vue.set(this.A1[this.propIndex].value[this.shopschooseIndex].value[this.shopchooseIndex],"array",opts);
            that.$refs[that.A1[this.propIndex].value[this.shopschooseIndex].key][this.shopchooseIndex].validate(function(valid){

            })

        },
			//打开选择店铺
        openShopSelect: function(i,j,k){
			    var that = this;
			    var args = {
			        defaultCheckedKeys: []
			    }
			     args.defaultCheckedKeys = that.A1[i].value[j].value[k].array;
			    // if(that.userId == ""){
			    // 	that.brand4shopurl = "/base/common/getSysBrandArray4Shop";
			    // }else{
			    // 	 that.brand4shopurl = "/base/common/getSysBrandShopListByUserId?id="+that.userId;
			    // }
			    that.$nextTick(function(){
			    	 that.$root.$refs.brandTrees.open(args);
					    that.shopchooseIndex = k;
					    that.shopschooseIndex = j;
					    that.propIndex = i;
			    });
			   
			},
			
			/**
			 *  生成sql条件
			 */
			loadSqlWhere(conditions){
				var shopCodeString = "";
				var shopCodeArray = [];
				var customerSql = "select kd_customer.sys_customer_id from kd_customer  ";
				var countSql = "select count(kd_customer.sys_customer_id) from kd_customer ";
				var sqlJoin = "";
				var sqlJoinArray = [" left join kd_customer_shop on kd_customer_shop.sys_customer_id = kd_customer.sys_customer_id "];
				
				var sqlCondition = shopCodeString==""?"":" and kd_customer_shop.shop_code in ("+shopCodeString+") ";
				var customerXml ="" 
				for (var i = 0; i < conditions.length; i++) {
					for (var j = 0; j < conditions[i].value.length; j++) {
						var sqlfunction = conditions[i].value[j].key+".Sql";
						var xmlfunction = conditions[i].value[j].key+".Xml";
						if(conditions[i].name=="brand" ||conditions[i].name=="group"){
							sqlfunction = "GroupAndBrand.Sql";
							xmlfunction = "GroupAndBrand.Xml";
						}
						if(conditions[i].name=="trade"){
							sqlfunction = "trade.Sql";
							xmlfunction = "trade.Xml";
						}
						var array_element = conditions[i].value[j].value;
						var param = JSON.stringify(array_element);
						var sql = eval('('+sqlfunction+"("+param+")"+')').split("|");
						customerXml += eval('('+xmlfunction+"("+param+")"+')'); 
						if($.inArray(sql[0], sqlJoinArray) == -1){
							sqlJoinArray.push(sql[0]);
						}
						sqlCondition += sql[1];
					}
				}
				for (var i = 0; i < sqlJoinArray.length; i++) {
					sqlJoin += sqlJoinArray[i];
				}
				customerSql += sqlJoin +" where 1=1 "+sqlCondition;
				countSql += sqlJoin +" where 1=1 "+sqlCondition;
				customerXml = "<root><group>"+customerXml+"</group>";
				customerXml.replace("<term></term>", "");
				return {customerSql: customerSql,countSql:countSql,customerXml:customerXml};
			},
			//切换省市区
			changeCity(index,key){	
				var that = this;
				for (var i = 0; i < that.A1.length; i++) {
					if(that.A1[i].name == "base"){
						for (var j = 0; j < that.A1[i].value.length; j++) {
							if(that.A1[i].value[j].key == "city"){
								if(key == "province"){
										Vue.set(that.A1[i].value[j].value[index],"shi","");
										Vue.set(that.A1[i].value[j].value[index],"district","");
								}else if(key == "shi"){
										Vue.set(that.A1[i].value[j].value[index],"district","");
								}
								that.A1[i].value[j].value[index].provinceValue =that.$refs.province[index].getText();
								that.A1[i].value[j].value[index].shiValue =that.A1[i].value[j].value[index].shi!=""?that.$refs.shi[index].getText():"";
								that.A1[i].value[j].value[index].districtValue =that.A1[i].value[j].value[index].district!=""?that.$refs.district[index].getText():"";
								break;
								
								
							}
						}
					}
				}
				
				
			}
		};
	var mounted = function(){
//		 this.$nextTick(() => {
//		      // body视图高度 - （当前声明区域#example距离浏览器顶部高度offsetHeight + 当前滚动区域顶部距离父级结构的间距大小 offsetTop + 底部栏与内容区域的margin值 + tab页签高度（46）  + 当前滚动区域父级结构上边距10 + 底部间距20
//		      let rightLimitHeight = document.body.offsetHeight - (this.$el.offsetTop + this.$refs.memberChooseScroll.$el.offsetTop + 10 + 46 + 20);
//		      // 右侧分层属性类型区域最高高度（决定滚动区域）
//		      this.$refs.memberChooseScroll.$el.children[0].style.maxHeight = rightLimitHeight + 'px'
//		    })
	};

	var data ={
			SubdivisionPropertys:{
				customerBasicPropertys:[],
				rfmPropertys:[],
				hudongPropertys:[],
				marketingPropertys:[]
			},
			customerBasicPropertys:[],
			A1:[],
			footerArray:[],
			shopCodes:[],            //筛选的店铺
			brand4shopurl: "/base/common/getSysBrandShopListByUserId?id=0",
			shopchooseIndex:0,        //店铺选择所在集合的下标
			shopschooseIndex:0,       //所有的店铺选择所在的所有基本属性集合中的下标
			propIndex:0,     		  //单独属性所在的所有属性集合中的下标
			propNum:{
				base:0,
				group:0,
				rfm:0,
				trade:0,
				hudong:0,
				marker:0,
				brand:0
				
			},
			sex: "nan",
			 userId:"",
			unsub: "yes",
			hudongVisible:false,
			levelrule: "",
			logic:"",
			dates: "d1",
			level: "",
			length:"",
			date1: "",
			objectIsOk:false,
			CustomerNum:"",
			description:"",
			basedata:[],
			UserPropertys:[],
			ManyPropertys:[],
			levelchance: "and",
			memberProperty: "base",
			memberChoose: [],
			graderulelist:[],
			texts:[],
			array:[],
			dataofradio:'',
			json0:{},
			model:{
				subdivision_name:''	
			},
			parent_id:0,
			id:0,
			customer_sql:'',
			trade_sql:'',
			json1:{},
			json2:{},
			subdivision:{},
			parentId:"",
			user_count:0,
			items:[],
			groupPropertys:[],
			brandRadio:"",
			brandPropertys:{},
			birthdayVali : function(rule, value, callback){
		        if (!value) {
		          return callback(new Error('请输入日期'));
		        }
		         else {
		              callback();
		            }
		      },
			birthdayFirstDay:function(rule, value, callback){
				var nowDate = new Date().format("MM-dd");
				var firstDate = "01-01";
				var aDate  =  nowDate.split("-")
				var oDate1  =  new  Date(aDate[0]  +  '-'  +  aDate[1])
				aDate  =  firstDate.split("-")
				var oDate2  =  new  Date(aDate[0]  +  '-'  +  aDate[1])
				var iDays  =  parseInt(Math.abs(oDate1  -  oDate2)  /  1000  /  60  /  60  /24);
				if(!value){
					return callback(new Error('请输入天数'));
				}else if(parseInt(value)<0){
					return callback(new Error('请输入正数'));
				}else if(iDays < parseInt(value)){
					return callback(new Error('天数超过限制'));
				}else{
					callback();
				}
			},
			birthdayLastDay:function(rule, value, callback){
				var nowDate = new Date().format("MM-dd");
				var firstDate = "12-31";
				var aDate  =  nowDate.split("-")
				var oDate1  =  new  Date(aDate[0]  +  '-'  +  aDate[1])
				aDate  =  firstDate.split("-")
				var oDate2  =  new  Date(aDate[0]  +  '-'  +  aDate[1])
				var iDays  =  parseInt(Math.abs(oDate2  -  oDate1)  /  1000  /  60  /  60  /24);
				if(!value){
					return callback(new Error('请输入天数'));
				}else if(parseInt(value)<0){
					return callback(new Error('请输入正数'));
				}else if(iDays < parseInt(value)){
					return callback(new Error('天数超过限制'));
				}else{
					callback();
				}
			},
		      subdivisionNameVali:function(rule, value, callback){
				  if (!value) {
			          return callback(new Error('请输入分组名称'));
			        }else if(value.length > 10){
			        	return callback(new Error('已超过可输入长度'));
			        }
			         else {
			              callback();
			            }
			},
			
			ChinaShenVali : function(rule, value, callback){
			  		var that = this;
			        if (!value.toString()) {
			          return callback(new Error('请选择省级地区名'));
			        }
			         else {
			              callback();
			            }
			      },
			   //店铺筛选的验证
		  shopChooseVali:function(rule, value, callback){
		  		var that = this;
		        if (value.length == 0) {
		          return callback(new Error('请选择店铺'));
		        }
		         else {
		              callback();
		            }
		      },
		    //数值验证
		  	commonValueReg : (rule, value, callback) => {
    			var val = $.trim(value);
    			var regex = /^(([0-9][0-9]*))$/; 
    			var len = val.length;
				if(len > 5){
					return callback(new Error('请输入五位以内的数值'));
				}
    			if (!val) {
    				return callback(new Error('请输入数值'));
    			}
    			else if(!regex.test(val)){
    				return callback(new Error('请输入正整数数字'));
    			}
    			else {
    				callback();
    			}
		    },
		    //金额验证
		    commonMoneyReg : (rule, value, callback) => {
    			var val = $.trim(value);
    			var regex = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/; 
    			var len = val.length;
				if(len > 7){
					return callback(new Error('请输入七位以内的数字(包含小数点)'));
				}
    			if (!val) {
    				return callback(new Error('请输入数值'));
    			}
    			else if(!regex.test(val)){
    				return callback(new Error('请输入至多保留两位小数的数'));
    			}
    			else {
    				callback();
    			}
		    },
		   //手机号验证
		   mobilePhoneReg : function(rule, value, callback){
			   var val = $.trim(value);
			   var regex = /^(([0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]))$/; 
			   if(!val.match("^((13[0-9])|(15[^4])|(18[0-9])|(17[0-8])|(147))\\d{8}$")){
				   return callback(new Error('请输入正确格式的手机号'));
			   }if(!regex.test(val)){
   				return callback(new Error('请输入正整数数字'));
			   }else{
				   callback();
			   }
		   },
		  //前后缀3个字符验证
		  threeWordReg : function(rule, value, callback){
			  var val = $.trim(value);
			  if(val.length > 15){
				   return callback(new Error('前后缀匹配不超过15位'));
			   }else if(!val){
				   return callback(new Error('请输入数字'));
			   }else{
				   callback();
			   }
		  },
		  //年龄验证
		  ageReg : function(rule, value, callback){
			  var regex = /^(([0-9][0-9]*))$/; 
			  if(parseInt(value) > 100 || parseInt(value) < 0){
				   return callback(new Error('请在0~100范围内'));
			   }else if(!value){
				   return callback(new Error('请输入年龄'));
			   }else if(!regex.test(value)){
   				return callback(new Error('请输入正整数数字'));
   				}{
				   callback();
			   }
		  }
	}
	
	var util = {
		$methods: methods,
		$data:data,
		$mounted:mounted
	}
	return util;
})