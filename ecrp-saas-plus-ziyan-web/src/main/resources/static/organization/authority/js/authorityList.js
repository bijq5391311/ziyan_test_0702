require([ "vue", "nui", "jquery", 
	"/public/ecrp/common/common.js",
	"/public/ecrp/components/ns-tree.js",
	"/public/ecrp/components/ns-droptree.js",
	"/public/ecrp/common/response-util.js",
	"/public/ecrp/common/object-util.js"],
		function(Vue, Nui, $, common) {
			var data =  {
					tabs:"authority",
					authorityCate: "data",
					shopList: [],
					positionList:[],
					positionCode: "",
					//部门代码
					deptCode: "",
					channelCode: "",
					activeClass: "is-active",
					errorClass: "",
					oldCheckedShopCodeAll:[],
					originalCheckedShopCodes: [],
					originalMenuIds: [],
					//平台权限
					originalPlatfromIds: [],
					// 当前渠道下岗位已选择店铺code
					checkedShopCodes:[],
					// 当前渠道下所有店铺code
					checkedShopCodeAll: [],
					currentPage: 1,
					totalPage: 1,
					isIndeterminate: false,
					shopName:"",
					searchMap: {},
					pagination:{
						currPage: 1,
						currSize: 36,
						total:0,
					},
					//需要提交的Code
					shopCodes:[],
					order: {
                		orderKey: "s.create_time",
                		orderDir: "desc",
                	},
                	visible: false,
                	form:{
                		department:{
                    		text: "",
                    		value: ""
                    	},
                    	positionCode: "",
                    	positionList: [],
                    	menuIds: [],
                	},
                	rules:{
                		"department": [{
                	        type: "object",
                	        required: true,
                	        fields: {
                	            value: {
                	                type: "string",
                	                required: true,
                	                message: "请选择部门"
                	            }
                	        },
                	        trigger: "change"
                	    }],
                	    "positionCode": [{
                	    	required: true,
                    		message: "请选择岗位",
                    		trigger: "change"
                    	}]
                	},
                	currKey: "",//当前高亮节点
                	menuCurrParentId: "",
                	checkAll:""
                	
       	
				};
			var methods = {
					//关键词过滤店铺
					searchShop: function(){	
						that.searchMap = {
									code: that.channelCode,
									name: that.shopName,
									positionCode: that.positionCode == ''?'-1':that.positionCode,
						}
						var params = {
								searchMap: that.searchMap
						}
						that.queryShopList(params);
					},
					//查找店铺列表
					queryShopList: function(params){
						var params = Object.assign({},that.limit,that.order,params);
						$.post("/organization/authority/queryShopList",params)
							.done((resp)=>{
								that.$set(that,"shopList",resp.data);
								that.pagination.total = resp.recordsTotal;
							})
						
						
					},
					// 点击组织树节点
					deptHandleClick: function(data,node,store){

						if(data.ext1 === "position"){
                            that.deptCode = data.ext2;
                            this.positionSelected(data.code);
							// that.deptCode = data.code;
							// that.positionCode = "";
							// $.post("/organization/authority/getPositionInDept",{deptCode: data.code})
							// 	.done((resp)=>{
							// 		ResponseUtil.check(resp,that,"",()=>{
							// 			that.$set(that,"positionList",resp.result);
							// 			that.checkedShopCodes = [];
							// 			that.originalCheckedShopCodes = [];
							// 			that.handleCheckedShopsChange(that.checkedShopCodes);
							// 		},()=>{
							// 			throw new Error(resp.msg);
							// 		})
                            //
							// 	}).fail(()=>{
							// 		that.$message.error("请求失败");
							// 	})
                        }else{
                            that.deptCode = data.code;
                            that.positionCode = "";
						}
					},
					// 点击渠道树节点
					channelHandleClick: function(data,node,store){
						that.pagination.currPage = 1;
						that.channelCode = data.code;
						that.searchShop(that.searchMap);
					},
					// 选择岗位
					positionSelected: function(data){
						that.positionCode = data ? data : that.positionCode;
						if(that.authorityCate === 'data'){
							that.checkedShopCodeAll = [];
							that.pagination.currPage = 1;
							$.post("/organization/authority/getSelectedShopCodes",{positionCode: data})
							.done((resp)=>{
								ResponseUtil.check(resp,that,"",()=>{
									that.$set(that,"checkedShopCodes",resp.result);
									//设置初始岗位对应所拥有的权限
									that.$set(that,"originalCheckedShopCodes",[].concat(that.checkedShopCodes));
									that.pagination.currPage = 1;
									that.channelCode = '0000';
									that.searchShop(that.searchMap);
									that.handleCheckedShopsChange(that.checkedShopCodes);
								},()=>{
									throw new Error(resp.msg);
								})
							})
						}else if( that.authorityCate === 'func'){
							$.post("/organization/authority/queryMenuAuthorityList",{positionCode: data})
							.done((resp)=>{
								ResponseUtil.check(resp,that,"",()=>{
									that.$refs.menuTree.setCheckedKeys(resp.result);
									that.$set(that,'originalMenuIds',resp.result); 
								},()=>{
									throw new Error(resp.msg);
								})
							})
						}else if( that.authorityCate === 'platfrom'){
							$.post("/organization/authority/queryPlatfromAuthorityList",{positionCode: data})
							.done((resp)=>{
								ResponseUtil.check(resp,that,"",()=>{
									that.$refs.platfromTree.setCheckedKeys(resp.result);
									that.$set(that,'originalPlatfromIds',resp.result); 
								},()=>{
									throw new Error(resp.msg);
								})
							})
						}
					},
					// 当前页改变
					handleCurrentPageChange: function(val){
						that.pagination.currPage = val;
						that.searchShop();
						
					},
					// 店铺全选
					handleCheckAllChange(event) {
						if(event.target.checked){
							var set = new Set(that.checkedShopCodes.concat(that.checkedShopCodeAll)) //Set去重
							that.checkedShopCodes = Array.from(set);
						}else{
							that.checkedShopCodeAll.map((item)=>{
								that.checkedShopCodes.map((key,i)=>{
									if(item === key){
										that.checkedShopCodes.splice(i,1);
									}
								})
							})
						}
				        that.isIndeterminate = false;
				    },
				    //店铺选择
				    handleCheckedShopsChange(value) {
				    	 var  checkedCount = 0;
				    	if(value.length == 0){
				    		checkedCount = -1;
				    	}else{
				    	   checkedCount = that.oldCheckedShopCodeAll.length - value.length;
				    	}	
				       that.checkAll = checkedCount === that.shopList.length
				       that.isIndeterminate = checkedCount > 0 && checkedCount < that.shopList.length;
				    },
				    // 重置所选择店铺
				    resetCheckedShop: function(){
				    	debugger
				    	if(that.authorityCate === 'data'){
				    		that.$set(that,"checkedShopCodes",[].concat(that.originalCheckedShopCodes));
				    		//选择的店铺发生改变
				    		that.handleCheckedShopsChange(that.checkedShopCodes);
				    	}else if(that.authorityCate === 'func'){
				    		that.$refs.menuTree.setCheckedKeys(that.originalMenuIds);
				    	}else if(that.authorityCate === 'platfrom'){
				    		that.$refs.platfromTree.setCheckedKeys(that.originalPlatfromIds);
				    	}
				    },
				    //保存
				    save: function(){
				    	if(that.positionCode != "" && that.deptCode != ""){
					    	if(that.authorityCate === 'data'){
					    		// 保存岗位与店铺关系
					    		$.post("/organization/authority/saveOrUpateSysPositionShop",{
						    		positionCode: that.positionCode,
						    		deptCode: that.deptCode,
						    		shopCodes: that.checkedShopCodes
						    		}).done((resp)=>{
										ResponseUtil.check(resp,that,"修改");
									})
					    	}else if(that.authorityCate === 'func'){
					    		// 保存岗位对应功能权限
					    		var menuIds = that.$refs.menuTree.getCheckedKeys();
					    		$.post("/organization/authority/saveOrUpateSysPositionMenu",{
						    		positionCode: that.positionCode,
						    		deptCode: that.deptCode,
						    		menuIds: menuIds
						    		}).done((resp)=>{
										ResponseUtil.check(resp,that,"修改");
									})
					    	}else if(that.authorityCate === 'platfrom'){
					    		debugger
					    		// 保存岗位对应平台权限
					    		var platfromIds = that.$refs.platfromTree.getCheckedKeys();
					    		$.post("/organization/authority/saveOrUpateZySysPosition",{
						    		code: that.positionCode,
						    		platfromIds: platfromIds
						    		}).done((resp)=>{
										ResponseUtil.check(resp,that,"修改");
									})
					    	}
				    	}else{
				    		that.$message({
				    			type: "warning",
				    			message: "未选择岗位"
				    		})
				    	}
				    },
				    // //处理菜单选择改变
				    // menuCheckChange(data,checked,childCheck){
				    // 	if(checked){
				    // 		this.$refs.menuTree.setChecked(data.parentId,true);
				    // 	}
				    // 	//if(this.menuCurrParentId  !== data.parentId){
				    // 	//}
				    // },
				    //处理平台菜单选择改变
				    platfromCheckChange(data,checked,childCheck){
				    	if(checked){
				    		this.$refs.platfromTree.setChecked(data.parentId,true);
				    	}
				    	//if(this.menuCurrParentId  !== data.parentId){
				    	//}	    	
				    },
				    //关闭弹窗
				    closeDialog: function(){
				    	that.$set(that,"form",that.$options.data().form);
				    	that.$refs.form.resetFields();
				    },
				    //打开弹窗
				    openDialog: function(){
				    	that.visible = true;
				    	var menuIds = that.$refs.menuTree.getCheckedKeys();
				    	that.$set(that.form,"menuIds",menuIds);
				    },
				    //权限复制
				    authorityCopy: function(){
				    	if(that.form.menuIds.length > 0){
					    	that.$refs.form.validate((valid)=>{
					    		if(valid){
					    			var params = {
				    					positionCode: that.form.positionCode,
							    		deptCode: that.form.deptCode,
							    		menuIds: that.form.menuIds
					    			}
					    			$.post("/organization/authority/saveOrUpateSysPositionMenu",params)
					    				.done((resp)=>{
											if(resp.success){
												that.$message({
													type: "success",
													message: "复制成功"
												});
												that.visible = false;
											}else{
												that.$message.error("复制失败");
											}
										})
					    		}else{
					    			return false;
					    		}
					    	})
				    	}else{
				    		that.$message.warning("请选择功能");
				    	}
	
				    },
				    // 设置滚动区域高度
				    setScrollbarHeight (refName) {
				      this.$nextTick(() => {
				        // body视图高度 - （底部栏高度 offsetHeight+ 当前声明区域#example距离浏览器顶部高度offsetHeight + 当前滚动区域顶部距离父级结构的间距大小 offsetTop + tab页签高度
				        let leftLimitHeight = document.body.offsetHeight - (this.$el.offsetTop + this.$refs[refName].$el.offsetTop + 36 + 15)
				        // 高度固定
				        this.$refs[refName].$el.children[0].style.height = leftLimitHeight + 'px'
				        this.$refs[refName].$el.children[0].style.oveflowY = 'scroll'
				      })
				    }
			
			};
			var computed = {
				
				"limit": function(){
					return {
						start: (that.pagination.currPage-1)*that.pagination.currSize,
						length: that.pagination.currSize
					}
				}
			};
			var watch = {
					//店铺列表改变时
				"shopList": function(val){
					that.oldCheckedShopCodeAll = that.checkedShopCodeAll;
					that.checkedShopCodeAll = [];
					var checkedCodes = [];
					val.map((item)=>{
						that.checkedShopCodeAll.push(item.code);
						if(that.checkedShopCodes.length > 0){
							that.checkedShopCodes.map((code,j)=>{
								if(code === item.code){
									checkedCodes.push(code);
								}
							});
						}
					});
					that.$nextTick(function(){
							if( checkedCodes.length != 0 && checkedCodes.length == that.checkedShopCodeAll.length){
								that.checkAll = true;
								that.isIndeterminate = false;
							}else if(checkedCodes.length > 0){
								that.isIndeterminate = true;
							}else{
								that.isIndeterminate = false;
								that.checkAll = false;
							}
						})
				},
				//权限切换
				"authorityCate": function(val){
					if(that.positionCode !== ''){
						that.positionSelected(that.positionCode);
					}
				},
				//表单内选择完部门后
				"form.department.value": function(val){
					if(val !== ''){
						$.post("/organization/authority/queryPositionByDeptCode",{deptCode: val})
						.done((resp)=>{
							ResponseUtil.check(resp,that,"",()=>{
								if(resp.result.length > 0){
									that.$set(that.form,"positionList",resp.result);
									that.$set(that.form,"deptCode",resp.result[0].department_code);
									that.form.positionCode = "";
								}else{
									that.$set(that.form,"positionList",[]);
								}
							},()=>{
								throw new Error(resp.msg);
							})
						})
					}else{
						that.form.positionCode = "";
						that.$set(that.form,"positionList",[]);
					}
				}
			}
			var mounted = function(){
                this.$nextTick(() => {
                    // body视图高度 - （当前声明区域#example距离浏览器顶部高度offsetHeight + 当前滚动区域顶部距离父级结构的间距大小 offsetTop + tab页签高度
                    let leftScrollOrgHeight1 = document.body.offsetHeight - (this.$el.offsetTop + this.$refs.leftScrollOrg.$el.offsetTop + 3)
                    // 左侧栏“选择组织架构”高度固定：
                    this.$refs.leftScrollOrg.$el.children[0].style.height = leftScrollOrgHeight1 + 'px'
               		 // 选择渠道 树的最大高度： body视图高度 - (头部导航高度 + 当前滚动区域顶部距离父级结构的间距大小 offsetTop + tab页签标题高度及顶部间距 + 3)
                	this.$refs.channelTreeScroll.$el.children[0].style.maxHeight = document.body.offsetHeight - (this.$el.offsetTop + this.$refs.channelTreeScroll.$el.offsetTop + 46 + 3) + 'px'
                	// 选择店铺 店铺列表最大高度： body视图高度 - (头部导航高度 + 当前滚动区域顶部距离父级结构的间距大小 offsetTop + tab页签标题高度及顶部间距 + 保存与重置按钮高度 + 3)
                	this.$refs.shopListScroll.$el.children[0].style.maxHeight = document.body.offsetHeight - (this.$el.offsetTop + this.$refs.shopListScroll.$el.offsetTop + 46 + 40 + 3) + 'px'
					//选择功能权限
					this.$refs.permissionScroll.$el.children[0].style.maxHeight = document.body.offsetHeight - (this.$el.offsetTop + this.$refs.shopListScroll.$el.offsetTop + 46 + 40 + 3) + 'px'
                })
			};
			var that = new Vue({
				el: "#app",
				data: data,
				computed: computed,
				watch: watch,
				methods: methods,
				mounted: mounted
				
			})
		})
