define(["vue","nui", "jquery", "utilbuild/main", "/public/renderEngine3.0/helper.js"],
		 function( Vue, Nui, $, _, {vueEvent,httpPost,tree_mixin,table_mixin,form_mixin}){
		tree_mixin={
			methods:{
				
					"$saveNewData":function(call, data, node, store, newValue){
    
    this.$emit("add-node",call, data, node, store, newValue);
   
},
					"$beforeAddNode":function(call, data, node, store) {
    this.$emit("before-add-node",call, data, node, store);
   
},
					"$afterDeleteNode":function(data, node, store){
    
    this.$emit("after-del-node",data, node, store);
   
},
					"$nodeClick":function(data, node, element){
    this.$emit("click-node",data, node, element);
},
					"$beforeDeleteNode":function(call, data, node, store){
    
    this.$emit("before-del-node",call, data, node, store);
   
},
					"$saveEditData":function(call, data, node, store, newValue){
    
    this.$emit("edit-node",call, data, node, store, newValue);
   
},
				
			},
			mounted: function() {
				this.$nextTick(() => {
				      // body视图高度 - （底部栏高度 offsetHeight+ 当前声明区域#example距离浏览器顶部高度offsetHeight + 当前滚动区域顶部距离父级结构的间距大小 offsetTop + tab页签高度
				      let leftLimitHeight = document.getElementsByTagName('footer') > 0 ? 
				    		  document.body.offsetHeight - (document.getElementsByTagName('footer')[0].offsetHeight + this.$el.offsetTop + this.$refs.layoutLeftScroll.$el.offsetTop + 36) : document.body.offsetHeight;
				      // 右侧栏高度固定
				      if(this.$refs.layoutLeftScroll) {
				      	this.$refs.layoutLeftScroll.$el.children[0].style.maxHeight = leftLimitHeight + 'px'
				      	this.$refs.layoutLeftScroll.$el.children[0].style.oveflowY = 'scroll'
				      }
				})
			}
		}
	
	

			
	var template = `
	<div class="template-layout" style="margin-left:0px">
		
		
			
	        <el-scrollbar ref="layoutRightScroll"
	                      wrap-class="template-layout__scroll" outsider>
	          <el-row>
	            <el-col :span="24">
	              <div class="tmp-filter">
	                <div class="template-table-bar">
	                  <el-row type="flex">
	                    <el-col :span="20">
	                      <a class="el-button el-button--primary" v-if="!isShare && deptCodes.length > 0" @click="addNewSubdivision()" >新增分组</a>
	                    </el-col>
	                    <el-col :span="15">
	                      <div class="pull-right">
	                        <!-- 单条件表单 -->
	                        <el-form :inline="true" class="pull-right">
	                          <el-form-item style="width:469px">
	                          <el-form-grid>
	                          <el-select v-model="deptCode" ref="createDept" placeholder="请选择创建部门" class="is-gray" @change="change4getDept(deptCode)">
		                        <el-option
		                          v-for="(item,index) in deptCodes"
		                          :key="index"
		                          :label="item.departmentName"
		                          :value="item.departmentCode">
		                        </el-option>
		                      </el-select>
		                      </el-form-grid>
		                      <el-form-grid>
		                      <el-select v-if="deptCode != '' && isShare" disabled  value="" placeholder="请选择"></el-select>
		                      <ns-droptree @node-click="$nodeClick" v-if="deptCode == item.departmentCode && !isShare" v-model="subdivisionNode" ref="dropTree" v-for="(item,index) in deptCodes" :name="item.departmentName" :key="index"
		                   			:url="'/subdivision/subdivision/LoadSubdivisionTree?name=&code='+deptCode"
		                   			placeholder="请选择" :show-checkbox="false">
		                      </ns-droptree>
		                      </el-form-grid>
		                      <el-form-grid>
		                      <el-input placeholder="请输入分组名称" v-model="subdivisionName" icon="search"  @click="searchSubdivisionName(subdivisionName,subdivisionNode)">
		                      </el-input>
		                      </el-form-grid>
	                            
	                          </el-form-item>
	                        </el-form>
	                        <!-- end/单条件表单 -->
	                      </div>
	                    </el-col>
	                  </el-row>
	                </div>
	              </div>
	              <ul class="division-list">
	                <li v-for="(list, index) in _data._table.data">
	                  <el-panel type="gray" border
	                            :title="list.subdivision_name" >
	                    <template slot="actions" >
	                      <el-dropdown @command="handleCommand">
	                      <span class="el-dropdown-link">
	                        操作<i class="el-icon-caret-bottom el-icon--right"></i>
	                      </span>
	                        <el-dropdown-menu slot="dropdown">
	                          <el-dropdown-item  :command="{'k':'show-subdivision','v':list}">查看</el-dropdown-item>
	                          <el-dropdown-item v-if="!isShare" :command="{'k':'edit-subdivision','v':list}">编辑</el-dropdown-item>
	                          <el-dropdown-item v-if="!isShare" :command="{'k':'del-subdivision','v':list}">删除</el-dropdown-item>
	                          <el-dropdown-item v-if="!isShare" :command="{'k':'analy-subdivision','v':list}">属性分析</el-dropdown-item>
	                          <el-dropdown-item v-if="!isShare" :command="{'k':'change-customer-property','v':list}">修改分组属性</el-dropdown-item>
	                          <el-dropdown-item  :command="{'k':'copy-subdivision','v':list}">复制</el-dropdown-item>
	                          <el-dropdown-item v-if="list.is_public == 0 && !isShare" :command="{'k':'share-subdivision','v':list}">共享其他部门</el-dropdown-item>
	                          <el-dropdown-item v-if="list.is_public == 1 && !isShare" :command="{'k':'share-subdivision','v':list}">解除共享其他部门</el-dropdown-item>
	                        </el-dropdown-menu>
	                      </el-dropdown>
	                    </template>
	                    <div class="division-list__data">
	                      <div class="control-item">
	                        <label class="control-label">分组人数约：</label>
	                        <div class="control-content">
	                          <bus-refresh v-model="list.user_count" @click="handleRefreshUserCount(list.id,index)"></bus-refresh>
	                          <el-tooltip :content="'上次统计时间'+list.update_time+'，点击数字更新统计获取最新人数'"
	                                      placement="right"
	                                      effect="light">
	                            <i class="bui-question-fill"></i>
	                          </el-tooltip>
	                        </div>
	                      </div>
	                      <div class="control-item">
	                        <label class="control-label">营销使用次数：</label>
	                        <div class="control-content">
	                          <bus-refresh v-model="list.market_user_count" @click="handleRefreshMarketUserCount(list.id,index)"></bus-refresh>
	                        </div>
	                      </div>
	                    </div>
	                    <div class="division-list__footer">
	                      <el-tag class="cate-tag" type="gray">{{JSON.parse(list.remark)==null?"":JSON.parse(list.remark)[0].k}}{{JSON.parse(list.remark)==null?"":JSON.parse(list.remark)[0].v}}</el-tag>
	                      <el-popover placement="bottom" width="600">
	                        <el-form label-width="36px" >
	                          <el-form-item class="form-text" label-width="100px" v-for="(item,index) in JSON.parse(list.remark)" :key="index" :label="item.k">	
	                          <el-scrollbar ref="layoutLeftScroll" 
	                        	  wrap-class="template-layout__scroll"  
	                        		  wrap-style="max-height:200px;">
	                          			<el-form-grid>{{ item.v}}
	                        		  </el-form-grid>
	                        		  </el-scrollbar>
	                        		  </el-form-item>
	                        </el-form>
	                        <el-button slot="reference" class="cate-more" size="mini">…</el-button>
	                      </el-popover>
	                      
	                    </div>
	                  </el-panel>
	                </li>
	              </ul>
	            </el-col>
	          </el-row>
	        </el-scrollbar>
	     
	     
	</div>
`;
			Vue.component("ns-designer-table-sudivision", {
				mixins: [table_mixin,tree_mixin,vueEvent],
				template: template,
				data: function() {
					var pagination = {
	                	enable: true,
	                	size: 150,
	                	sizeOpts: [15,25,50,100],
	                	page: 1,
	                	total: 0,
	                }
					
	                var table_buttons = [
	                	
							{
								"func": function(data) {
    this.$emit("show-subdivision",data.row);
},
								"icon": "$.noop",
								"name": "\u67E5\u770B",
								"auth": ``,
								"visible":`  `,
								},
							{
								"func": function(data) {
    var that = this;
    if(data.row.mark == 1){
           that.$message.warning("此分组无法编辑！");
    }else{
        this.$emit("edit-subdivision",data.row);
    }
   
},
								"icon": "$.noop",
								"name": "\u7F16\u8F91",
								"auth": ``,
								"visible":`  `,
								},
							{
								"func": function(data) {
    this.$emit("copy-subdivision",data.row);
},
								"icon": "$.noop",
								"name": "\u590D\u5236",
								"auth": ``,
								"visible":`  `,
								},
							{
								"func": function(data) {
    this.$emit("analy-subdivision",data.row);
},
								"icon": "$.noop",
								"name": "\u5C5E\u6027\u5206\u6790",
								"auth": ``,
								"visible":`  `,
								},
							{
								"func": function(data) {
   
    this.$emit("change-customer-property",data.row);
},
								"icon": "$.noop",
								"name": "\u4FEE\u6539\u5BA2\u6237\u5C5E\u6027",
								"auth": ``,
								"visible":`  `,
								},
							{
								"func": function(data){
this.$emit("del-subdivision",data.row);
},
								"icon": "$.noop",
								"name": "\u5220\u9664",
								"auth": ``,
								"visible":`  `,
								},
							{
								"func": function(data) {
                                    this.$emit("share-subdivision",data.row);
},
								"icon": "$.noop",
								"name": "共享其他部门",
								"auth": ``,
								"visible":`scope.row.is_public ==0`,
								},
								{
									"func": function(data) {
	    var _this = this;
	    data.row.is_public = data.row.is_public==1?0:1;
	    delete data.row.department;
	$.ajax({
	                url:"/subdivision/subdivision/createOrUpdateSubdivision",
	                data:data.row,
//			       async:false,
	                 type:"post",
	                success:function(result){
	                    if(result.success){
	                        _this.$message.success("解除共享成功！");
	                    }else{
	                        _this.$message.error('数据错误！');
	                    }
	                }
	            
	            });
	},
									"icon": "$.noop",
									"name": "解除共享其他部门",
									"auth": ``,
									"visible":`scope.row.is_public ==1`,
									},
								
							 
						
	                ]
	                
	                var operate_buttons = [
	                	
							{
								"func": function(){
    this.$emit("add-subdivision");
   
},
								"icon": "fa-plus-square",
								"name": "\u65B0\u589E\u5206\u7EC4",
								"auth": ``,
								"visible":`  `,
								},
							{
								"func":  function(data){
   this.$emit("batch-delete-subdivision",this.$getSelectionsOfCurrPage());
            },
								"icon": "fa-trash-o",
								"name": "\u6279\u91CF\u5220\u9664",
								"auth": ``,
								"visible":`  `,
								},
							 
						
	                ]
				
					var quickInput = [];
					var quickSearchNames = quickInput.map(x => x.name);
					var quickSearchModel = {};
					var model = Object.assign({}, {}, {});
					var that = this;
					
					quickInput.map(item => {
						Object.defineProperty(quickSearchModel, item.name, {
							get: function() {
								return model[item.name];
							},
							set: function(val) {
								model[item.name] = val;
								//TODO 由于特殊需求导致下列写法
								if(item.type === "radio") {
									that._data._table.quickSearchMap[item.name] = val;
									that.$quickSearch$();
								}
							},
							enumerable: true
						})
					});
					
					return {
						shareNodes:[],
						deptCodes:[],
						UniqueCode:"",
						deptCode:"",
						pID:"",
						subdivisionNode:{
							text:"",
							value:""
						},
						subdivisionName:"",
						activeName:0,
                        ownDept:"",
						chooseDept:"",
						isShare:false,
						model: model,
						quickSearchModel: quickSearchModel,
						rules: Object.assign({}, {}, {}),
						state: {},
						url: "/subdivision/subdivision/findSubdivisionList",
						_pagination: pagination,
						_table: {
							table_buttons: table_buttons,
							operate_buttons: operate_buttons,
							quickSearchNames: quickSearchNames,
							quickSearchMap: {},
						}
					};
				},
				mounted: function() {
                    this.getOwnDept();
					this.getUserDept();

				},
				computed: {},
				watch:{
                    subdivisionNode:function(newValue){

					}
				},
				methods: 
	
		{
            /**
             * 获取当前用户部门
             */
            "getOwnDept":function(){
                var that = this;
                $.ajax({
                    url:"getOwnDept",
                    data:"",
                    type:"post",
                    async:false,
                    success:function(result){
                        if(result.success){
                            Vue.set(that,"ownDept",result.result);
                        }else{

                        }

                    }

                });
            },
				"getUserDept":function(){
					var that = this;
					$.ajax({
						url:"/subdivision/subdivision/getDeptHasTree",
						date:"",
						type:"post",
						async: false,
						success:function(resp){
							if(resp.success){
								that.$set(that,"deptCodes",resp.result);
								that.deptCode = that.ownDept;
								that.getShareNode(that.deptCodes);
							}
						}
					});
					
				},
				"searchSubdivisionName":function(subdivisionName,subdivisionNode){
					this.$search({searchMap:{id$EQ:subdivisionNode.value,subdivisionName$EQ:subdivisionName,is_category$EQ:0}});
				},
				"addNewSubdivision":function(){
					 this.$emit("add-subdivision");
				},
				 handleCommand(command) {
					  this.$emit(command.k,command.v);
			      },

			     //刷新分组人数
			    "handleRefreshUserCount":function(subdivision_id,index){
			    	var that = this;
					$.ajax({
						url:"/base/common/getEsDataById",
						data:{id:subdivision_id,start:1,length:1},
						type:"post",
						async: false,
						success:function(resp){
							if(resp.success){
								that.$set(that._data._table.data[index],"user_count",JSON.parse(resp.result).total);
								$.ajax({
				             		 url:"/subdivision/subdivision/createOrUpdateSubdivision",
					               	 data:that._data._table.data[index],
					               	type:"post",
				             		 success:function(result){
				                          if(result.success){ 
				                        	  
				                        	  }
				                          }
								})
							}
						}
					});
			    },
			    //刷新营销分组人数时间
			    "handleRefreshMarketUserCount":function(subdivision_id,index){
			    	var that = this;
			    	$.ajax({
						url:"/subdivision/subdivision/getSubdivsionMarketingTime",
						data:{subdivisionId:subdivision_id},
						type:"post",
						async: false,
						success:function(resp){
							if(resp.success){
								that.$set(that._data._table.data[index],"market_user_count",resp.result);
								$.ajax({
				             		 url:"/subdivision/subdivision/createOrUpdateSubdivision",
					               	 data:that._data._table.data[index],
					               	type:"post",
				             		 success:function(result){
				                          if(result.success){ 
				                        	  
				                        	  }
				                          }
								})
							}
						}
					});
			    },
				"getShareNode":function(deptCodes){
					var that = this;
					var deptcodes = "";
					for(var j in deptCodes){
                        deptcodes += deptCodes[j].departmentCode +",";
                    }
                    deptcodes =  deptcodes.substring(0,deptcodes.length-1)
					$.ajax({
						url:"/subdivision/subdivision/getShareSudivision",
						data:{deptCodes:deptcodes},
						type:"post",
						async: false,
						success:function(resp){
							var shareMap = {};
							if(resp.success){
								for(var i in resp.result){
									for(var j in resp.result[i]){
										if(resp.result[i][j].department_code != that.ownDept){
                                            that.shareNodes.push(resp.result[i][j].department_code);
                                            // that.deptCodes = Object.assign(that.deptCodes,{(i),(resp.result[i][j].department_code)});
										}

									}
									that.deptCodes.push({"departmentName":i,"departmentCode":resp.result[i][0].department_code});
								}


							}
						}
					});
					
				},
            /**
			 * 切换创建部门触发方法
             * @param code
             */
				"change4getDept":function(code){
					var that = this;
					if(that.UniqueCode == "" || that.UniqueCode != code){
						that.UniqueCode = code;
						if(typeof(code) == 'object'){
							that.isShare = true;
							Vue.set(that._data._table,"data",code);
						}else{
							if($.inArray(code,that.shareNodes) == -1 ){
								Vue.set(that,"chooseDept",code);
								if(that.pID == ""){
									that.$nextTick(function(){
										that.$search({searchMap:{dept$EQ:that.chooseDept,id$EQ:0,is_category$EQ:0}});
									});
								}
								that.isShare = false;
							}else {
								that.isShare = true;
								$.ajax({
									url:"getPublicSudivisionBydept",
									data:{deptCodes:code},
									type:"post",
									async: false,
									success:function(resp){
										if(resp.success){
											if(that._data._table.data.length <=0){
												that.$nextTick(function(){
													that.$set(that._data._table,"data",resp.result);
												});
											}
											that.$set(that._data._table,"data",resp.result);
										}
									}
								});

							}

						}

						that.pID = "";
						that.subdivisionNode = {
							text:"",
							value:""
						};
					}

					
				},
			
				"delelte": function(data){
this.$emit("del-subdivision",data.row);
},
				"show": function(data) {
    this.$emit("show-customers",data.row);
},
				"edit": function(data) {
    this.$emit("edit-subdivision",data.row);
},
				"propertyAnalysis": function(data) {
    this.$emit("analy-subdivision",data.row);
},
				"changeCustomerProperty": function(data) {
    this.$emit("change-customer-property",data.row);
},
				"$handleParams": function(params) {

  var obj = params.searchMap;
    if(typeof(obj) === 'undefined'){
    params.searchMap={'is_category$EQ':0}
  }else{
    var is_category$EQ = obj.is_category$EQ;
    var id = obj.id$EQ;
    var dept = obj.dept$EQ;
    var share = obj.isPublic$EQ;
    params.searchMap={"is_category$EQ":is_category$EQ,"id$EQ":id,"dept$EQ":dept,"isPublic$EQ":1}
    if(id == 0){
    	delete params.searchMap.id$EQ;
    }
    if(share == 0 || typeof (share) == 'undefined'){
    	delete params.searchMap.isPublic$EQ;
    }
  }
  if(this.deptCode == ""){
	  params.searchMap={"is_category$EQ":0}  
  }
  if(obj.subdivisionName$EQ!="" && typeof(obj.subdivisionName$EQ)!='undefined'){
	  params.searchMap={"subdivisionName$EQ":obj.subdivisionName$EQ,"is_category$EQ":0,"id$EQ":id};
  }
  return params;
},
			
		}
	

			});
			Vue.component('bus-refresh', {
				  data () {
				    return {
				      showShade: false
				    }
				  },
				  props: {
				    value: [String, Number]
				  },
				  computed: {
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
				    handleClick () {
				      if (!this.showShade) {
				        this.showShade = true
				        setTimeout(() => {
				          this.showShade = false
				        }, 3000)
				        this.$emit('click')
				      } else {
				      }
				    }
				  },
				  template: '<strong class="cate-number" @click="handleClick" :class="{ \'is-refreshing\': this.showShade}"><span class="cate-shade" v-show="showShade"><i class="bui-refresh"></i></span>' +
				  '{{value}}' +
				  '</strong>'
				})
			
		})
		

