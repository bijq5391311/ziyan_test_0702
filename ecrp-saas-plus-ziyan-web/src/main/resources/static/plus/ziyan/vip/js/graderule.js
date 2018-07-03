require([ "vue", "nui", "jquery", 'vuedraggable',
          "/public/ecrp/components/ns-goods-conditions-select.js",
          "/public/ecrp/common/common.js"],
  function(Vue, Nui, $ , busdraggable,common,moment) {
	var vue = new Vue({
		el : "#vipgraderule",
		 components: {
			 busdraggable
			  },
		data : {
			activeName : "0",
			radio_type:"1",
			graderule:{},
			showconditionsselect:!0,
			graderules:[],
			items:[],
			isOr:!0,
			brands:[],
			draggablelist:[],
			ruleCheck:[],
			ratingNameInputValue:"",
			isOverflow:"",
			editdetail:true,
			ratingInputVisible: !1,
			graderuledetail:{},
			ratingTabsValue:"",
			currentName:'',
			zy_consume:0,
			rule:"",
			graderuledetaillist:[],
			ratingInputValue:"",
			memberRuleCheckData:[], // 所有条件
			GradeRulse:[],
			ratingSort: !1,				
			ratingDataSort:[],
			ratingTabsShow: !0,
			goods: [],
			conditions:{},
			gradeIndex:0,
			detailIndex:0,
			and_goods_ids:[],
			and_goods_condition:{},
			or_goods_ids:[],
			or_goods_condition:{},
			brandVipData:{},
			isAbleSave:true,
		    showBtn: false,
		    edit: false,
		    options: {
		        group: {
		          name: 'people',
		          pull: 'clone',
		          put: 'false'
		        },
		        disabled: true
		      },
			checksubdays : (rule, value, callback) => {
				var reg=/(^[1-9]{1}[0-9]*$)|(^[0-9]*\$)/;
		        if (!value) {
		          return callback(new Error('天数不能为空'));
		        }
		        else if(!reg.test(value)){
		        	return callback(new Error('请输入大于0且为整数'));
		        }
		         else {
		              callback();
		            }
		      },
		      checkdaysbetween : (rule, value, callback) => {
					var reg=/(^[1-9]{1}[0-9]*$)|(^[0-9]*\$)/;
			        if (!value) {
			          return callback(new Error('天数不能为空'));
			        }
			        else if(!reg.test(value)){
			        	return callback(new Error('请输入大于0的整数'));
			        }
			         else {
			              callback();
			            }
			      },
			  zyConsume:(rule, value, callback) => {
					var val = $.trim(value);
	    			var regex = /^[0-9]*[1-9][0-9]*$/; 
	    			var len = val.length;
					if (val == 0){
						callback();
					}else if(len > 4){
						return callback(new Error('请输入三位以内的数字'));
					}else if(!regex.test(val)){
	    				return callback(new Error('请输入正整数'));
	    			}
	    			else {
	    				callback();
	    			}
				  
			  },
			  commonMoneyReg : (rule, value, callback) => {
				  debugger
		    			var val = $.trim(value);
		    			var regex = /^(([0-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/; 
		    			var len = val.length;
						if(len > 4){
							return callback(new Error('请输入三位以内的数字(包含小数点)'));
						}
						if(val > 10){
							return callback(new Error('请输10以内的数字'));
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
				    }
		},
	
		methods : {
			/**
			 * 初始化GradeRule与 数据
			 */
			"initGradeRule" : function() {
				debugger
				var that = this;
				$.ajax({
					url : "/vip/graderule/initGradeRule",          // 获取到拥有品牌下的规则
					data : "",
					async: false ,
					type : "post",
					success : function(result) {
						if(result.success){
						that.$set(that,"graderules",result.result);
						var flag = false;
						for (var i = 0; i < that.graderules.length; i++) {
							$.ajax({
								url : "/vip/graderule/getBrandById",             // 获取品牌名称显示
								data :{id:that.graderules[i].brand_id},
								async: false ,
								type : "post",
								success : function(resp) {
									that.graderules[i].brand_name = resp.result.brandName;
								}
							});
							that.initGradeRuleDetail(that.graderules[i].id,i);
						}
						Vue.set(that,"ratingDataSort",that.graderules[0].graderuledetaillist);
						}
					}

				})
			},
			
		    /* 点击编辑按钮事件 */
		    "showEditBtn":function () {
		      this.showBtn = true;
		      this.options.disabled = false;
		    },
		    // 保存修改
		    "saveEdit":function () {
		      var that = this;
				// 获取当前的grade并验证
				if(!that.valiRules(that.graderules,that.gradeIndex)){
					return false;
				}
				 that.showBtn = false;
				 that.options.disabled = true;
		    },
		    // 隐藏编辑按钮
		    "hideEditBtn":function () {
		      this.showBtn = false;
		      this.options.disabled = true;
		    },
			/**
			 * 初始化GradeRuleDetial数据
			 */
			"initGradeRuleDetail" : function(id,index){
				debugger
				var that = this;
				$.ajax({
					url : "/vip/graderuledetail/getList",         // 获取规则详情
					data : {grade_rule_id : id},
					async: false ,
					type : "post",
					success : function(result) {
						if(result.success){
							Vue.set(that.graderules[index],"graderuledetaillist",[]);
						for (var i = 0; i < result.result.length; i++) {
							debugger
							Vue.set(that.graderules[index].graderuledetaillist, i, result.result[i]);
							Vue.set(that.graderules[index].graderuledetaillist[i], "GradeRulse", JSON.parse(result.result[i].grade_rule_condition_code));
							Vue.set(that.graderules[index].graderuledetaillist[i], "and_goods_ids", typeof(result.result[i].and_goods_ids)=='undefined'?[]:JSON.parse(result.result[i].and_goods_ids));
							Vue.set(that.graderules[index].graderuledetaillist[i], "and_goods_condition", typeof(result.result[i].and_goods_condition)=='undefined'?{"title":[],"outerId":[],"cate":[],"price":[]}:JSON.parse(result.result[i].and_goods_condition));
							Vue.set(that.graderules[index].graderuledetaillist[i], "or_goods_ids", typeof(result.result[i].or_goods_ids)=='undefined'?[]:JSON.parse(result.result[i].or_goods_ids));
							Vue.set(that.graderules[index].graderuledetaillist[i], "or_goods_condition", typeof(result.result[i].or_goods_condition)=='undefined'?{"title":[],"outerId":[],"cate":[],"price":[]}:JSON.parse(result.result[i].or_goods_condition));
							Vue.set(that.graderules[index].graderuledetaillist[i], "show", false);
							Vue.set(that.graderules[index].graderuledetaillist[i], "popover", false);
							Vue.set(that.graderules[index].graderuledetaillist[i], "zy_consume", result.result[i].zy_consume);
						
						}
						if(result.result.length<1){
							Vue.set(that.graderules[index],"graderuledetaillist",[]);
						}
							
						var id = "";
						if(result.result.length > 0){
							// 第一个规则详情被选中并显示条件
							if(typeof(that.graderules[that.gradeIndex].graderuledetaillist)!='undefined'){
								if(that.graderules[that.gradeIndex].graderuledetaillist.length != 0){
								that.ratingTabsValue =  that.graderules[that.gradeIndex].graderuledetaillist[0].grade_name;
								if(typeof(that.graderules[0].graderuledetaillist[0].GradeRulse)!='undefined'){
									for (var j = 0; j <  that.graderules[0].graderuledetaillist[0].GradeRulse.length; j++) {
										if($.inArray(that.graderules[0].graderuledetaillist[0].GradeRulse[j].name,that.ruleCheck) == -1){
											that.ruleCheck.push(that.graderules[0].graderuledetaillist[0].GradeRulse[j].name);
										}
										}
								}
									
							}
							}
							that.showGoodsChoose(index,0);
							that.detailIndex = 0;
							
						}
						Vue.set(that,"brandVipData",$.extend(true,{},that.graderules[that.gradeIndex]));
					}
					}
				});
				},
				
		/**
		 * 初始化规则条件
		 */
		"initGradeCondition":function(){
			var that = this;
			$.ajax({
				url : "/vip/graderulecondition/findConditionList",
				data :'',
				async: false ,
				type : "post",
				success : function(resp) {
					if(resp.success){
					for (var i = 0; i < resp.result.length; i++) {
						resp.result[i].value = 0; 
						Vue.set(that.memberRuleCheckData, i, resp.result[i]);
					}
					}
				}

			});
		},
		
		/**
		 * 回显选择商品
		 */
		"showGoodsChoose":function(i,j){
			var that = this;
		},
		/*
		 * 切换tab的时候
		 */
			"clickTab":function(t,name){
				var that = this;
				Vue.set
				this.ruleCheck=[];
				for (var j = 0; j <  that.graderules[this.gradeIndex].graderuledetaillist[t].GradeRulse.length; j++) {
				Vue.set(this.ruleCheck, j, that.graderules[this.gradeIndex].graderuledetaillist[t].GradeRulse[j].name);
				}
				that.showGoodsChoose(this.gradeIndex,t);
				that.ratingTabsValue = name;
				var id = that.ratingTabsValue;
				var grade_name = that.ratingTabsValue;
				this.detailIndex = t;
				
		
			},
			/*
			 * 切换品牌tab的时候
			 */
			"clickbrandTab":function(t){
				var that = this;
				var index = that.gradeIndex;
				var oldname = that.graderules[that.gradeIndex].brand_name;
				var gradeId = that.graderules[that.gradeIndex].id;
				var flag = false;
				if(JSON.stringify(that.brandVipData) !== JSON.stringify(that.graderules[that.gradeIndex])){
					that.$confirm(oldname+"品牌的vip规则已经改动，是否保存修改?","提示",
							{
								confirmButtonText: "确定",
								cancelButtonText: "取消",
								type: "warning"
							}).then(function(){
								flag = true;
								that.saveData(index);
								that.initGradeRule();
							}).catch(() => {
								that.initGradeRule();
								if(typeof(that.graderules[that.gradeIndex].graderuledetaillist)!='undefined'){
									if(that.graderules[that.gradeIndex].graderuledetaillist.length != 0){
									that.ratingTabsValue =  that.graderules[that.gradeIndex].graderuledetaillist[0].grade_name;
									if(typeof(that.graderules[that.gradeIndex].graderuledetaillist[0].GradeRulse)!='undefined'){
										for (var j = 0; j <  that.graderules[that.gradeIndex].graderuledetaillist[0].GradeRulse.length; j++) {
											if($.inArray(that.graderules[that.gradeIndex].graderuledetaillist[0].GradeRulse[j].name,that.ruleCheck) == -1){
												that.ruleCheck.push(that.graderules[that.gradeIndex].graderuledetaillist[0].GradeRulse[j].name);
											}
											}
									}
										
								}
								}
							});
				}
				that.activeName = that.graderules[t].brand_name;
				that.activeName = t;
				that.ratingTabsValue="";
				if(that.graderules[t].graderuledetaillist.length > 0){
					that.ratingTabsValue =that.graderules[t].graderuledetaillist[0].grade_name;
				}
// that.showGoodsChoose(t,0);
				console.log(that.gradeIndex);
				that.gradeIndex = t;
				console.log(that.gradeIndex);
				that.detailIndex = 0;		
				that.ruleCheck = [];
				if(typeof(that.graderules[t].graderuledetaillist)!='undefined'&&typeof(that.graderules[t].graderuledetaillist[0])!='undefined'&&typeof(that.graderules[t].graderuledetaillist[0].GradeRulse)!='undefined'){
					for (var j = 0; j <  that.graderules[t].graderuledetaillist[0].GradeRulse.length; j++) {
						Vue.set(this.ruleCheck, j, that.graderules[t].graderuledetaillist[0].GradeRulse[j].name);
						}
				}
				if(!flag){
					Vue.set(that,"brandVipData",$.extend(true,{},that.graderules[t]));
				}
				Vue.set(that,"ratingDataSort",that.graderules[t].graderuledetaillist);	
				
				
				
			},
				
			/**
			 * 删除会员等级tab页签
			 */
			"removeRatingTab" : function(t){
					var that = this; 
					var name = t;
					var id = that.graderules[that.gradeIndex].id;
// var name = that.graderuledetail.name;
					this.$confirm("此操作将删除会员等级"+t+", 是否继续?","提示",
							{
								confirmButtonText: "确定",
								cancelButtonText: "取消",
								type: "warning"
							}).then(function(){
					$.ajax({						
						url : "/vip/graderuledetail/deleteGradeRuleDetailByName",						
						data : {grade_name:name,grade_rule_id:id},						
						type : "post",
						async: false ,
					success : function(data){
						  if(data.success){
	                            that.$message({
	                                 message: '删除成功!',
	                                 type: 'success'
	                               });
	                            for (var i = 0; i < that.graderules[that.gradeIndex].graderuledetaillist.length; i++) {
	                            	
									if(that.graderules[that.gradeIndex].graderuledetaillist[i].grade_name == t){
										that.graderules[that.gradeIndex].graderuledetaillist.splice(i,1);
									}
								}
	                            that.ratingTabsValue = that.graderules[that.gradeIndex].graderuledetaillist.length>0?that.graderules[that.gradeIndex].graderuledetaillist[0].grade_name:"";
	                            that.showGoodsChoose(that.gradeIndex,0);
	                            that.ruleCheck = [];
	                            Vue.set(that,"ratingDataSort",that.graderules[that.gradeIndex].graderuledetaillist);
	                            
	                        }else{
	                        }
							}
					})
					
					})
// this.initGradeRule();
				},
			/**
			 * 点击增加会员等级
			 */
			"showRatingInput" : function(index){
				var that=this;
				that.graderules[index].graderuledetaillist.length>4?this.$message({
					type: "warning",
					message: "会员等级设置不能超出5个"
				}): (this.ratingInputVisible=!0,
				this.$nextTick(function(){
					that.$refs.saveTagInput[index].$refs.input.focus();
				}))
				
			},
			/**
			 * 写入新增的会员等级
			 */
			"handleInputConfirm" : function(t){
				var that = this;
				if(that.ratingInputValue == ""){
					this.$message({
						type: "warning",
						message: "等级名称不能为空!"
					})
					this.ratingInputVisible=!1
					return;
				}
				if(that.ratingInputValue.length > 50){
					this.$message({
						type: "warning",
						message: "已超过可输入长度!"
					})
					this.ratingInputVisible=!1;
					that.ratingInputValue="";
					return;
				}
				for(var i = 0;i<this.graderules[t].graderuledetaillist.length;i++){
					if(that.ratingInputValue == this.graderules[t].graderuledetaillist[i].grade_name){
						this.$message({
							type: "warning",
							message: "此等级名称已存在，请重新输入!"
						}),
						this.ratingInputVisible=!0,
						this.$nextTick(function(){
							that.$refs.saveTagInput[index].$refs.input.focus();
						})
						return;
					}
				}
				var length = this.graderules[t].graderuledetaillist.length;
				var tempdata = {};
				Vue.set(tempdata,"and_goods_ids",[]);
				Vue.set(tempdata,"and_goods_condition",{"title":[],"outerId":[],"cate":[],"price":[]});
				Vue.set(tempdata,"or_goods_ids",[]);
				Vue.set(tempdata,"or_goods_condition",{"title":[],"outerId":[],"cate":[],"price":[]});
				tempdata.show = !1;
				tempdata.discount = 0;
				tempdata.send_reward_type = 0;
				tempdata.reward_points = 0;
				tempdata.grade_name = that.ratingInputValue;
				this.initGradeCondition();
				tempdata.grade_rule_condition_code = this.memberRuleCheckData[0];
				tempdata.grade_rule_id = this.graderules[t].id;
				tempdata.GradeRulse = [this.memberRuleCheckData[0]];
				that.graderules[t].graderuledetaillist.push(tempdata);
				
				that.ratingTabsValue = that.graderules[t].graderuledetaillist[that.graderules[t].graderuledetaillist.length-1].grade_name;
				that.showGoodsChoose(t,that.graderules[t].graderuledetaillist.length-1);
				that.ratingInputValue = "";
				that.ruleCheck = [];
				for (var j = 0; j < tempdata.GradeRulse.length; j++) {
					Vue.set(that.ruleCheck, j, tempdata.GradeRulse[j].name);
				}
				
				this.ratingInputVisible=!1
				 Vue.set(that,"ratingDataSort",that.graderules[t].graderuledetaillist);
				
			},
		
			/**
			 * 修改vip规则
			 */
			"handleRatingConfirm" : function(t,e,f,g){
						var that=this;
						var no = 0;
						for (var i = 0; i < g; i++) {
							no += that.graderules[i].graderuledetaillist.length;
						}
						no += t;
						if(that.$refs.ratingNameInput[no].$refs.input.value == ""&&that.$refs.ratingNameInput[no].$refs.input.value == ""){
							this.$message({
								type: "warning",
								message: "等级名称不能为空!"
							})
							this.ratingInputVisible=!1
							this.isAbleSave = false;
							this.$refs.ratingNameInput[no].$refs.input.focus();
							return;
						}
						if(that.$refs.ratingNameInput[no].$refs.input.value.length > 50){
							this.$message({
								type: "warning",
								message: "已超过可输入长度!"
							})
							this.ratingInputVisible=!1
							this.isAbleSave = false;
							that.ratingInputValue="";
							that.$refs.ratingNameInput[no].$refs.input.focus();
							return;
						}
						for(var i = 0;i<that.graderules[g].graderuledetaillist.length;i++){
							if(i !== f&&that.$refs.ratingNameInput[no].$refs.input.value == that.graderules[g].graderuledetaillist[i].grade_name){
								this.$message({
									type: "warning",
									message: "此等级名称已存在，请重新输入!"
								}),
								this.isAbleSave = false;
								this.$nextTick(function(){
									this.$refs.ratingNameInput[no].$refs.input.focus();
									this.$refs.ratingNameInput[no].$refs.input.value = e;
								});
								return;
							}
						}
						var newName = this.$refs.ratingNameInput[no].$refs.input.value;
						var gradeRule = that.graderules[g].graderuledetaillist[f].grade_name = newName;
						
						that.graderules[g].graderuledetaillist[f].show = false;
// that.$refs.ratingNameInput[no].name = newName;
					},
			
			/**
			 * 删除升降级条件
			 */
			"memberRuleDelete" : function(grade,gradedetail,param){
				console.log(param);
				var that = this;
				console.log(this.ruleCheck);
				console.log(this.GradeRulse);
				if(param == 0){
					Vue.set(this.graderules[grade].graderuledetaillist[gradedetail].GradeRulse[param+1],"logic", '0');	
				}
				
				this.graderules[grade].graderuledetaillist[gradedetail].GradeRulse.splice(param,1);
				
				that.ruleCheck = [];
				for (var j = 0; j <  that.graderules[grade].graderuledetaillist[gradedetail].GradeRulse.length; j++) {
					that.ruleCheck.push(that.graderules[grade].graderuledetaillist[gradedetail].GradeRulse[j].name);
					}
				
			},
			/**
			 * 修改会员等级排序
			 */
			ratingSortSave : function(t,index){
				var that = this;
				var grade = that.graderules[index];
				var array = t;
				var temp = [];
				for (var j = 0; j < array.length; j++) {
					Vue.set(that.graderules[index].graderuledetaillist, j, array[j]);
				}
				this.ruleCheck=[];
				for (var j = 0; j <  that.graderules[index].graderuledetaillist[0].GradeRulse.length; j++) {
					
					Vue.set(this.ruleCheck, j, that.graderules[index].graderuledetaillist[0].GradeRulse[j].name);
					}
				that.ratingTabsValue =  that.graderules[index].graderuledetaillist[0].grade_name;
				
			},
			/**
			 * 选择‘或’商品
			 */
			 callback: function(opts){
             	 if(opts.goods.length>0){
            		 var orgoods = opts.goods[0].id;
             	 }
            	 for (var i = 1; i < opts.goods.length; i++) {
            		  orgoods = orgoods+","+opts.goods[i].id;
				}
            	this.graderules[this.gradeIndex].graderuledetaillist[this.detailIndex].or_goods_ids = opts.goods;
            	this.graderules[this.gradeIndex].graderuledetaillist[this.detailIndex].or_goods_condition = opts.conditions;
			 },
			 /**
				 * 选择‘且’商品
				 */
             andcallback: function(opts){
            	 if(opts.goods.length>0){
            		var  andgoods = opts.goods[0].id;
            	 for (var i = 1; i < opts.goods.length; i++) {
            		 andgoods = andgoods+","+opts.goods[i].id;
				}
            	 }
            	 this.graderules[this.gradeIndex].graderuledetaillist[this.detailIndex].and_goods_ids = opts.goods;
            	this.graderules[this.gradeIndex].graderuledetaillist[this.detailIndex].and_goods_condition = opts.conditions;
             
             },
             selectGoods: function(){
         		this.$refs.choosegoods[0].dialogGoodsVisible =true;
         	},
         	openDialog: function(){
        		// this.visible = true;
        		this.$refs.choosegoods[0].open();
        	},
        	/**
			 * 控制条件多选框
			 */
			"memberRuleSaveCheck" : function(t,n,indexOfGrade,indexDetial){
					var that=this;
					if("cancle"===t){
						that.ruleCheck=[]
						for (var i = 0; i < that.graderules[indexOfGrade].graderuledetaillist[indexDetial].GradeRulse.length; i++) {
							Vue.set(that.ruleCheck, i, that.graderules[indexOfGrade].graderuledetaillist[indexDetial].GradeRulse[i].name);
						}
						that.graderules[indexOfGrade].graderuledetaillist[indexDetial].popover = false;
					}else if("confirm"===t){
					var temp = [];
					if(that.ruleCheck.length == 0){
						for (var j = 0; j <  that.graderules[indexOfGrade].graderuledetaillist[indexDetial].GradeRulse.length; j++) {
						Vue.set(that.ruleCheck, j, that.graderules[indexOfGrade].graderuledetaillist[indexDetial].GradeRulse[j].name);
						}
						that.$message.warning("升降级条件不能为空！");
						return;
					}
						var ArrayTemp = [];
						for (var m = 0; m < that.graderules[indexOfGrade].graderuledetaillist[indexDetial].GradeRulse.length; m++) {
							for (var n = 0; n < that.ruleCheck.length; n++) {
								if(that.graderules[indexOfGrade].graderuledetaillist[indexDetial].GradeRulse[m].name == that.ruleCheck[n] ){
									break;
								}else if(n==that.ruleCheck.length-1){
									ArrayTemp.push(that.graderules[indexOfGrade].graderuledetaillist[indexDetial].GradeRulse[m]);
								}
							}
						}
						for (var r = 0; r < ArrayTemp.length; r++) {
							that.graderules[indexOfGrade].graderuledetaillist[indexDetial].GradeRulse.splice($.inArray(ArrayTemp[r], that.graderules[indexOfGrade].graderuledetaillist[indexDetial].GradeRulse), 1);
						}
						for (var j = 0; j < that.graderules[indexOfGrade].graderuledetaillist[indexDetial].GradeRulse.length; j++) {
							for (var k = 0; k < that.ruleCheck.length; k++) {
									if(that.graderules[indexOfGrade].graderuledetaillist[indexDetial].GradeRulse[j].name == that.ruleCheck[k]){
										that.ruleCheck.splice(k,1);
									}
							}
						}
						for (var i = 0; i < that.memberRuleCheckData.length; i++) {
							for (var j = 0; j < that.ruleCheck.length; j++) {
								if(that.ruleCheck.length >0){
									if(that.memberRuleCheckData[i].name == that.ruleCheck[j] ){
										temp.push(that.memberRuleCheckData[i]);
									}
								}
								
							}
							
						}
// }
// that.graderules[indexOfGrade].graderuledetaillist[indexDetial].GradeRulse =
// that.graderules[indexOfGrade].graderuledetaillist[indexDetial].GradeRulse.concat(temp);
					for (var pu = 0; pu < temp.length; pu++) {
						that.graderules[indexOfGrade].graderuledetaillist[indexDetial].GradeRulse.push(temp[pu]);
					}
					for (var i = 0; i < that.graderules[indexOfGrade].graderuledetaillist[indexDetial].GradeRulse.length; i++) {
						Vue.set(that.ruleCheck, i, that.graderules[indexOfGrade].graderuledetaillist[indexDetial].GradeRulse[i].name);
					}
					}
					that.initGradeCondition();
					that.graderules[indexOfGrade].graderuledetaillist[indexDetial].popover = false;
					
					},
			/**
			 * 转换条件格式
			 */
			"blurCondition":function(i,t,n,m){
				if(m == "元"){
					n = n.replace(/[^\d\.]/g,'')==""?'0.00':n;
					
					this.ToDecimal('conditions',n,t,this.gradeIndex,i);
				}else{
					 if(n < 0){
						 n = -1*n;
					 }
					 
					n = n.replace(/[^\d]/g,'')==""?0:n;
					Vue.set(this.graderules[this.gradeIndex].graderuledetaillist[t].GradeRulse[i],"value",parseInt(n));
					 
				}
				
				
			},
			/**
			 * 点击编辑图标显示
			 */
			"handleRatingEdit" : function(t,n){
				var that = this;
				var no = 0;
				for (var i = 0; i < n; i++) {
					no += that.graderules[i].graderuledetaillist.length;
				}
				no += t;
				that.graderules[n].graderuledetaillist[t].show= true,
				that.ratingNameInputValue = that.graderules[n].graderuledetaillist[t].grade_name;
				that.$nextTick(function() {
					 that.$refs.ratingNameInput[no].$refs.input.focus();
				      })
				
				
			},
			/**
			 * 提交保存
			 */
			"saveData" : function(t){
				debugger
				var that = this;
				if(!that.valiRules(that.graderules,that.gradeIndex)){
					return false;
				}
				if(this.options.disabled == true){
				that.$refs.gradeForm[t].validate(function(valid){
			          if (!valid) {
			        	  that.$message({
					            message: '有品牌规则数据不全!',
						            type: 'warning'});
			        	  return false;
			          }else if(!that.isAbleSave){
			        	  that.handleRatingConfirm();
			        	  return false;
			          }else{
				console.log(that.graderule);
				console.log(that.ratingTabsValue);
				console.log(that.andgoods);
					// 删除表数据
					$.ajax({
						url : "/vip/graderuledetail/deleteGradeRuleDetailByGradeid",
						data :{grade_rule_id:that.graderules[t].id},
						type : "post",
						async: false ,
						success : function(resp){
							if(resp.success){
							}else{
								return false;
							}
							
						}
				  	})
					if(typeof(that.graderules[t].graderuledetaillist)!='undefined'){
					if(that.graderules[t].graderuledetaillist.length >0){
						var graderuledetail = that.graderules[t].graderuledetaillist;
						for (var ii = 0; ii < graderuledetail.length; ii++) {
							graderuledetail[ii].id = -1;
						}
						var createJsonArray = [];
						var createJson = {};
						if(graderuledetail.length >=1){
							
							for (var k = 1; k <= graderuledetail.length; k++) {
								var FAndNum = 0;
								var SAndNum = 0;
								createJsonArray = [];
								createJson = {};
								var less = "";
								var OObbj ={
										paymentname:"",
										paymentlarge:"",
										paymentless:"",
										paymentlogic:"0",
										tradeCountname:"",
										tradeCountlarge:"",
										tradeCountless:"",
										tradeCountlogic:"0",
										oncePaymentname:"",
										oncePaymentlarge:"",
										oncePaymentless:"",
										oncePaymentlogic:"0",
										interactTimesname:"",
										interactTimeslarge:"",
										interactTimesless:"",
										interactTimeslogic:"0"
								};
								var flag = false;
								for (var v = 0; v < graderuledetail[k-1].GradeRulse.length; v++) {
									if(graderuledetail[k-1].GradeRulse[v].logic == 1){
										flag = true;
										break;
									}
								}
								for (var q = 0; q < graderuledetail[k-1].GradeRulse.length; q++) {
									if(graderuledetail.length > k ){
										for (var m = 0; m < graderuledetail[k].GradeRulse.length; m++) {
											if(graderuledetail[k-1].GradeRulse[q].id == graderuledetail[k].GradeRulse[m].id){
												if(parseInt(graderuledetail[k-1].GradeRulse[q].value) <= parseInt(graderuledetail[k].GradeRulse[m].value) && graderuledetail[k-1].GradeRulse[q].logic ==graderuledetail[k].GradeRulse[m].logic){
													Vue.set(graderuledetail[k-1].GradeRulse[q],"less",graderuledetail[k].GradeRulse[m].value==""||typeof(graderuledetail[k].GradeRulse[m].value)=='undefined'?"100000000":graderuledetail[k].GradeRulse[m].value);
													break;
												}
											}else if(m == graderuledetail[k].GradeRulse.length-1){
												Vue.set(graderuledetail[k-1].GradeRulse[q],"less","100000000");
											}
										}
									}else{
										Vue.set(graderuledetail[k-1].GradeRulse[q],"less","100000000");
									}
									
									
								if(graderuledetail[k-1].GradeRulse[q].id == 1){
									OObbj.paymentlarge=graderuledetail[k-1].GradeRulse[q].value;
// OObbj.paymentless=graderuledetail[k-1].GradeRulse[q].less;
									OObbj.paymentless="100000000";
									OObbj.paymentname="payment";
// OObbj.paymentlogic= (graderuledetail[k-1].GradeRulse.length-1 ==
// q)?"0":(graderuledetail[k-1].GradeRulse[q].logic==1)?"1":(graderuledetail[k-1].GradeRulse.length==1)?"1":(q
// ==0)?graderuledetail[k-1].GradeRulse[q].logic:graderuledetail[k-1].GradeRulse[q-1].logic;
									OObbj.paymentlogic = (graderuledetail[k-1].GradeRulse.length-1==0)?"1":(q==0 && flag)?"1":graderuledetail[k-1].GradeRulse[q].logic;
									}
								if(graderuledetail[k-1].GradeRulse[q].id == 2){
									OObbj.tradeCountlarge=graderuledetail[k-1].GradeRulse[q].value;
									OObbj.tradeCountless="100000000";
									OObbj.tradeCountname="tradeCount",
									OObbj.tradeCountlogic=(graderuledetail[k-1].GradeRulse.length-1==0)?"1":(q==0 && flag)?"1":graderuledetail[k-1].GradeRulse[q].logic;
								}
										
								if(graderuledetail[k-1].GradeRulse[q].id == 3){
									
								OObbj.oncePaymentlarge=graderuledetail[k-1].GradeRulse[q].value;
								OObbj.oncePaymentless="100000000";
								OObbj.oncePaymentname="oncePayment",
								OObbj.oncePaymentlogic=(graderuledetail[k-1].GradeRulse.length-1==0)?"1":(q==0 && flag)?"1":graderuledetail[k-1].GradeRulse[q].logic;
									}
										
								if(graderuledetail[k-1].GradeRulse[q].id == 4){
									
									OObbj.interactTimeslarge=graderuledetail[k-1].GradeRulse[q].value;
									OObbj.interactTimesless="100000000";
									OObbj.interactTimesname="interactTimes",
									OObbj.interactTimeslogic = (graderuledetail[k-1].GradeRulse.length-1==0)?"1":(q==0 && flag)?"1":graderuledetail[k-1].GradeRulse[q].logic;
// OObbj.interactTimeslogic = graderuledetail[k-1].GradeRulse.length-1 ==
// q?"1":graderuledetail[k-1].GradeRulse[q].logic;
											/*
											 * createJson =
											 * {name:'interactTimes',large:graderuledetail[k-1].GradeRulse[q].value,less:graderuledetail[k-1].GradeRulse[q].less,logic:graderuledetail[k-1].GradeRulse.length-1 ==
											 * q?"0":graderuledetail[k-1].GradeRulse[q].logic}
											 * createJsonArray.push(createJson); }
											 * else{ createJson =
											 * {name:'interactTimes',large:"",less:"",logic:"0"};
											 * createJsonArray.push(createJson); }
											 */
								}
								}
								
							  	$.ajax({
		        					url : "/vip/graderuledetail/addOrUpdateDetail",
		        					data : {grade_name:graderuledetail[k-1].grade_name,
		        						grade_rule_id:that.graderules[t].id,
		        						id:typeof(graderuledetail[k-1].id)=='undefined'?-1:graderuledetail[k-1].id,
		        						discount:graderuledetail[k-1].discount,
		        						send_reward_type:graderuledetail[k-1].send_reward_type,
		        						reward_points:graderuledetail[k-1].reward_points,
		        						code:JSON.stringify(graderuledetail[k-1].GradeRulse),
		        						code2:JSON.stringify(OObbj),
		        						and_goods_ids:JSON.stringify(graderuledetail[k-1].and_goods_ids),
		        						goods_ids:JSON.stringify(graderuledetail[k-1].or_goods_ids),
		        						and_goods_condition:JSON.stringify(graderuledetail[k-1].and_goods_condition),
		        						or_goods_condition:JSON.stringify(graderuledetail[k-1].or_goods_condition),
		        						zy_consume:graderuledetail[k-1].zy_consume
		        						},
		        					type : "post",
		        					async: false ,
		        					success : function(resp){
		        						debugger
		        						if(resp.success){
		        							createJsonArray =[];
		        						}
		        						
		        					}
							  	})
								}
							}
						
						}
				}
						
					
						var gradeData = {};
						gradeData.allow_sub_grade = that.graderules[t].allow_sub_grade;
						gradeData.brand_id = that.graderules[t].brand_id;
						gradeData.create_time = that.graderules[t].create_time;
						gradeData.create_user_account = that.graderules[t].create_user_account;
						gradeData.days_between = that.graderules[t].days_between;
						gradeData.group_id = that.graderules[t].group_id;
						gradeData.status = that.graderules[t].status;
						gradeData.is_grading = that.graderules[t].status;
						gradeData.id = that.graderules[t].id;
						gradeData.time_type = that.graderules[t].time_type;
						gradeData.is_include_black = that.graderules[t].is_include_black;
						gradeData.is_activate = that.graderules[t].is_activate;
						gradeData.state = that.graderules[t].state;
						gradeData.sub_days = that.graderules[t].sub_days;
						gradeData.update_time = that.graderules[t].update_time;
						that.$refs.gradeForm[t].validate(function(valid){
					          if (valid) {
					        	  $.ajax({
										url : "/vip/graderule/saveGradeRule",
										data : gradeData,
										type : "post",
										async: false ,
										success : function(result){
											  if(result.success){
												  that.$message({
											            message: '保存成功!',
											            type: 'success'});
												  
												  
											  }
										}
									})
						          } else {
						        	  that.$message({
							            message: '有品牌规则数据不全!',
								            type: 'warning'});
						            return false;
						          }
						        });
									that.initGradeRule();
			            }
				})
				}else{
					  that.$message({message: '等级排序不正确，请检查!',type: 'warning'});
			            return false;
				}
		},
		"valiRules":function(graderules,i){
			debugger
			var that = this;
			var flag = true;
				if(typeof(graderules[i].graderuledetaillist) == 'undefined'){
				}
				for (var j = 0; j < graderules[i].graderuledetaillist.length-1; j++) {
					if(parseInt(graderules[i].graderuledetaillist[j].discount)<parseInt(graderules[i].graderuledetaillist[j+1].discount)){
						that.$message.warning('检测当前'+graderules[i].graderuledetaillist[j+1].grade_name+'等级的折扣力度比'+graderules[i].graderuledetaillist[j].grade_name+'条件小，请检查！');
						flag = false;
						return false;
					}
					
					
					if(parseInt(graderules[i].graderuledetaillist[j].zy_consume)>parseInt(graderules[i].graderuledetaillist[j+1].zy_consume)){
						that.$message.warning('检测当前'+graderules[i].graderuledetaillist[j+1].grade_name+'等级的消费值'+graderules[i].graderuledetaillist[j].grade_name+'条件小，请检查！');
						flag = false;
						return false;
					}
					
				
			
				}
				
			return flag;
		},
		// 规避中文在金额和次数上
		ToDecimal:function (n,x,i,j,k) {  
			debugger
			x = x.toString();
			if(x > 1){
				   if(n == "conditions"){
			        	Vue.set(this.graderules[j].graderuledetaillist[i].GradeRulse[k],"value",x);  
			        }else if(n == "discount"){
			        	Vue.set(this.graderules[j].graderuledetaillist[i],n,x);  
			        	
			        }else {
			        	Vue.set(this.graderules[j].graderuledetaillist[i],n,x);  
			        }
			}else if(x<0) {
				x = 1.0;
				Vue.set(this.graderules[j].graderuledetaillist[i],n,x);  
			}
	     
	       
	    },
	    limitDay:function(key,item,i){
	    	item = item.toString().replace(/[^\d]/g,'')==""?'0':item;
	    	Vue.set(this.graderules[i],key,item);  
		}
	    
		},
		mounted : function() {
			this.initGradeCondition();
			this.initGradeRule();
		}
		
	})
})
