/**
 * 会员详情弹框 hx备份
 * 
 *
 *	activeName2:"first",activeName3:"1",
 *
 */

define(['jquery', 'vue', 'nui', "utilbuild/main"], function ($, Vue, nui) {
	
	var vueEvent = require("vue-event");
	function httpPost(url, data, options, $this) {
		$.ajax({
			url: url,
			data: data,
			type: "post",
			dataType: options && options.type || "json",
			success: function(data,ts,xhr) {
				 if(options && options.success && typeof options.success === "function") {
				 	options.success(data, ts, xhr, $this);
				 }
			},
			error: function(xhr, ts, error) {
				if(options && options.error && typeof options.error === "function") {
				 	options.error(xhr, ts, error, $this);
				}
			},
			complete: function(xhr, ts) {
				if(options && options.complete && typeof options.complete === "function") {
				 	options.complete(data, ts, $this);
				 }
			}
		})
	}
	var tree_mixin = {};
	
	var table_mixin = {
		data: function() {
			var that = this;
			
			return {
				model: {},
				rules: {},
				state: {},
				nameMap: {},
				textToShow: {},
				_queryConfig: {
                	expand: false,
                	searched: false
                },
                _table: {
                	quickSearchNames: [],
                	searchMap: null,
                	quickSearchMap: {},
                	quickSearchModel: {},
                	data: [],
                	loadingtable: false,
                	_CUSTOM_: "custom",
                	table_buttons: [],
                	operate_buttons: []
                },
                _pagination: {
                	enable: true,
                	size: 15,
                	sizeOpts: [15, 50, 100, 200],
                	page: 1,
                	total: 0
                },
                _order: {
                	orderDir: undefined,
                	orderKey: undefined
                }
			}
		},
		computed: {
			"collapseText": function() {
				var preText = this._data._queryConfig.expand ? "收缩" : "展开";
				var subText = this._data._queryConfig.searched ? "结果" : "滤选";
				return `${preText}${subText}`;
			}
		},
		methods: {
			
			
			customSelect: function(){
				this.change(4, 2);
			},
			
			$queryList$: function(params) {
				var that = this;
				var tableConfig = this._data._table;
				tableConfig.loadingtable = true;
				httpPost(this.url, params, {
					success: function(resp) {
						that._data._table.data = resp.data;
						that._data._pagination.total = resp.recordsTotal;
						tableConfig.loadingtable = false;
					},
					error: function(xhr) {
						that.$message.error(xhr.responseJSON.status +","+xhr.responseJSON.message || "网络异常，获取数据失败！");
						tableConfig.loadingtable = false;
					},
					complete: function() {
						
					}
				}, this)
			},
			$searchAction$: function() {
				this._data._table.searchMap = $.extend(true, {}, this.model); //记录搜索的条件
				
				var prePage = this._data._pagination.page;
				
				//页码变更会触发reload动作
				this._data._pagination.page = 1;
				if(prePage === 1) 
					this.$reload();
					
				
				this.$formatTextToShow$();
				this._data._queryConfig.searched = true;
			},
			$getModelForSearch$: function() {
				function isBlank(value) {
					if(value === null || value === undefined)
						return true;
					if(/^\s*$/.test(value))
						return true;
					return false;
				}
				
				function isEmpty(value) {
					if(value.length === 0)
						return true;
					else
						return false;
				}
				
				function hasKey(obj) {
					if(obj === null || obj === undefined)
						return false;
					if(Object.keys(obj).length === 0)
						return false;
					return true;
				}
				
				function getType(o) {
					if(o === null || o === undefined)
						return null;
					return o.constructor.name;
				}
				
				function excluded(model) {
					var oModel = {};
					var keys = Object.keys(model);
					for(var i = 0; i < keys.length; i++) {
						var key = keys[i];
						var value = model[key];
						switch(getType(value)) {
							case null: ;break;
							case "String": isBlank(value) ? null : oModel[key] = value;break;
							case "Object": !hasKey(value) ? null : oModel[key] = value;break;
							case "Array": isEmpty(value) ? null : oModel[key] = value;break;
							default: oModel[key] = value;break;
						}
					}
					
					return oModel;
				}
				return excluded(this.model);
			},
			$formatTextToShow$: function() {
				function isBlank(value) {
					if(value === null || value === undefined)
						return true;
					if(/^\s*$/.test(value))
						return true;
					return false;
				}
			
				function convert(model, nameMap) {
					var keys = Object.keys(model);
					var textToShow = {};
					for(var i = 0; i < keys.length; i++) {
						if(keys[i] in nameMap) {
							var info = nameMap[keys[i]];
							if(typeof info.instance.getText === "function") {
								var text = info.instance.getText();
								if(!isBlank(text)) {
									textToShow[keys[i]] = {
										label: info.text,
										text: info.instance.getText()
									};
								}
							} else {
								if(model[keys[i]]) {
									textToShow[keys[i]] = {
										label: info.text,
										text: model[keys[i]]
									}
								}
							}
						}
					}
					return textToShow;
				} 
				
				var textToShow = convert(this.$getModelForSearch$(), this.nameMap);
				this.$set(this, 'textToShow', textToShow);
				if(Object.keys(textToShow).length === 0) {
					this._data._queryConfig.searched = false;
					this._data._queryConfig.expand = false;
				}
			},
			$resetInputAction$: function() {
				this.$resetInput$();
			},
			$resetInput$: function() {
				var model = this.$getOriginModel$();
				var keys = Object.keys(model);
				for(var i = 0; i < keys.length; i++) {
					this.model[keys[i]] = model[keys[i]];
				}
			},
			$editInputAction$: function() {
				this._data._queryConfig.searched = false;
			},
			$clearInputAction$: function() {
				this._data._queryConfig.searched = false;
				this.$resetInput$();
				this.$set(this._data._table, "searchMap", {});
			},
			$removeFilter$: function(name) {
				this.$delete(this._data._table.searchMap, name);
				this.model[name] = this.$getOriginModel$()[name];
				
				this.$formatTextToShow$();
				this.$reload();
			},
			$getOriginModel$: function() {
				return this.$options.data().model;
			},
			$pageChange$: function(page) {
				var _pagination = this._data._pagination;
				this._data._pagination.page = page;
				this.$reload();
			},
			$sizeChange$: function(size) {
				var pagination = this._data._pagination;
				
				pagination.size = size;
				if(pagination.page === 1) {
					this.$reload();
				} else {
					pagination.page = 1; //page的值改变会触发$pageChange$函数
				}
			},
			$orderChange$: function({column, prop, order}) {
				var dir = order === "ascending" 
					? "asc" : (order === "descending") ? "desc" : undefined;
				if(dir) {
					this._data._order.orderDir = dir;
					this._data._order.orderKey = column.dbcolumn;
				} else {
					this._data._order.orderDir = undefined;
					this._data._order.orderKey = undefined;
				}
				this.$reload();
			},
			$generateParams$: function() {
				var order = this._data._order;
				
				var pagination = this._data._pagination;
				var limit = {
					start: (pagination.page - 1) * pagination.size,
					length: pagination.size
				}
				var searchMap = $.extend(true, {}, this._data._table.searchMap);
				var params = $.extend(true, {}, order, limit, {searchMap: searchMap});
				if(typeof this.$handleParams === "function")
					return this.$handleParams(params);
				return params;
			},
			$quickSearchAction$: function($event) {
				var name = $event.path[1].__vue__.name;
				this._data._table.quickSearchMap[name] = this.quickSearchModel[name];
				this.$quickSearch$();
			},
			$quickSearch$: function() {
				this._data._table.searchMap = $.extend(true, {}, this._data._table.quickSearchMap);
				this.$reload();
			},
			$handleParams: function(params) { return params},
			$reload: function() {
				this.$queryList$(this.$generateParams$());
			},
			$search: function(params) {
				this._data._table.searchMap = $.extend(true, this._data._table.searchMap, params.searchMap);
				this.$reload();
			},
			$refresh: function() {
	            this.$refs.tree.refresh();
	        },
	        $getSelectionsOfCurrPage: function() {
	            return this.$refs.table.store.states.selection;
	        },
			"$select":$.noop,
			"$selectAll":$.noop,
			"$selectionChange":$.noop,
			"$cellMouseEnter":$.noop,
			"$cellMouseLeave":$.noop,
			"$cellClick":$.noop,
			"$cellDbclick":$.noop,
			"$rowClick":$.noop,
			"$rowContextmenu":$.noop,
			"$rowDbclick":$.noop,
			"$headerClick":$.noop,
			"$filterChange":$.noop,
			"$currentChange":$.noop,
			"$headerDragend":$.noop,
			"$expend":$.noop,
		},
		
	}
	
	var $template = `
<!-- 弹窗开始 -->
	<el-dialog :modal-append-to-body=false title="会员详情" custom-class="userinfo" 
		   :visible.sync="customerdialog"  :close-on-click-modal="false"
		   :before-close="closeDialog"  :vetically="true"   size="large" >
	<el-tabs v-model="activeName2" type="card" @tab-click="fromClick">
		<el-tab-pane label="会员详情" name="first">
			<el-form >
				<el-row  :gutter="20">
					<!--  左边会员头像 -->
					<el-col :span="12" >
						<div class="tmp-userinfo__sidebar">
							<div class="tmp-userinfo__header text-center">
							 	<p><a><img class="img-cirlce avatar" src='/public/user.png' width="32" height="32" /><span class="name">{{userInfo.customer_name}}</span></a></p>		
							</div>
							<div class="tmp-userinfo__content">
								<el-form ref="usetInfo" class="tmp-userinfo__form" label-width="90px" >
									<el-row>
										<el-col :span="12" v-model="userInfo">
											<el-form-item label="会员ID：">
												<el-tooltip effect="dark" :content="userInfo.sys_customer_id" placement="top-start" >
													<div class="show_hide">{{userInfo.sys_customer_id}}</div>
												</el-tooltip>
											</el-form-item>
											<el-form-item label = "会员等级：">
												<el-tooltip effect="dark" :content="userInfo.gradeName" placement="top-start" >
													<div class="show_hide">{{userInfo.gradeName}}</div>
												</el-tooltip>
											</el-form-item>
											<el-form-item label = "成长值：">
												<el-tooltip effect="dark" :content="userInfo.total_grouth_value" placement="top-start" >
													<div class="show_hide">{{userInfo.total_grouth_value}}</div>
												</el-tooltip>
											</el-form-item>
											<el-form-item label="性别：">
														<div style="padding-top: 1px;" v-if="userInfo.sex===1">男</div>
														<div style="padding-top: 1px;" v-if="userInfo.sex===0">女</div>
														<div style="padding-top: 1px;" v-if="userInfo.sex===-1">保密</div>
											</el-form-item>
											<el-form-item label="生日：">
												<el-tooltip effect="dark" :content="userInfo.birthday" placement="top-start" >
													<div class="show_hide">{{userInfo.birthday}}</div>
												</el-tooltip>
											</el-form-item>
											<el-form-item label="手机：">
												<el-tooltip effect="dark" :content="mobile" placement="top-start" >
													<div class="show_hide">{{mobile}}</div>
												</el-tooltip>
													<!--显示正常手机号  -->
											</el-form-item>
											<el-form-item label="QQ：">
													{{userInfo.qq=='NULL'?"":userInfo.qq}}
											</el-form-item>
											<el-form-item label="地区：">
												 <el-tooltip effect="dark" :content="zone.value" placement="top-start" >	
			                                  		<div class="show_hide">
			                                  			<span v-for="val in zone.value">{{val}}</span>
			                                  		</div>
			                                  	 </el-tooltip>
											</el-form-item>

										</el-col>

										<el-col :span="12" >
											<el-form-item label="会员姓名：">
													{{userInfo.customer_name}}
											</el-form-item>
											<el-form-item label="会员卡号："> 
												<el-tooltip effect="dark" :content="userInfo.member_card+''" placement="top-start">
										  			<div class="show_hide">{{userInfo.member_card=="NULL"?"":userInfo.member_card}}</div>
										  		</el-tooltip>
											</el-form-item>
											<el-form-item label = "可用积分：">
												{{userInfo.score}}
											</el-form-item>
											<el-form-item label="会员状态："> {{userInfo.is_activate==0?"未激活":"激活"}}
											</el-form-item>
											<el-form-item label="身份证：" >
												<el-tooltip effect="dark" :content="userInfo.idcard+''" placement="top-start">
										    		<div class="show_hide">{{userInfo.idcard=="NULL"?"":userInfo.idcard}}</div>
										    	</el-tooltip>
											</el-form-item>
											<el-form-item label="固定电话：">
												<el-tooltip effect="dark" :content="userInfo.telphone+''" placement="top-start">
										    		<div class="show_hide">{{userInfo.telphone}}</div>
										    	</el-tooltip>
											</el-form-item>
											<el-form-item label="Email：">
												<el-tooltip effect="dark" :content="userInfo.email" placement="top-start">
										    		<div class="show_hide">{{userInfo.email}}</div>
										    	</el-tooltip>
											</el-form-item>
											<el-form-item label = "权益黑名单：">
												<el-switch disabled v-model="right" :on-value="true" :off-value="false"
														   :width="45" on-text="开" off-text="关">
												</el-switch>
											</el-form-item>
										</el-col>

									</el-row>
									<el-form-item label="详细地址：">
										<el-form-grid>
											<el-tooltip  slot="" effect="dark" :content="userInfo.address" placement="top-start" >
									    		<el-form-grid  width="360" class="ellipsis">{{userInfo.address}}</el-form-grid>
									    	</el-tooltip>
										</el-form-grid>
									</el-form-item>
								</el-form>
							</div>
						</div>
					</el-col>
					<!--  右边会员属性 -->
					<el-col :span="12" class="userinfo-content" >

						<el-scrollbar  wrap-class="tmp-userinfo__scrollbar" outsider >
							<el-collapse @change="change" v-model="activeName3" class="userinfo-collapse" accordion>
								<el-collapse-item  title="品牌属性" name="1">
									<div style="margin-left: 10px;">
										<!-- 	开始	 						 2017年7月28日11:36:19 -->
										<el-table class="tmp-userinfo__table" :data="userinfoMassage" >

											<el-table-column prop="brand" label="品牌"></el-table-column>

<!--												<el-table-column prop="vip" label="VIP"  width="60"> </el-table-column>
											<el-table-column prop="score" label="可用积分"> </el-table-column>
											<el-table-column prop="right"  width="90" align="center" label="权益黑名单">
												<template scope="scope">{{userinfoTable[scope.$index]}}
													<el-switch   v-model="userinfoMassage[scope.$index].right"
															   @change="handleSwitch(scope.$index, scope)"
															   :width="45" on-text="开" off-text="关">
													</el-switch>
												</template>
											</el-table-column>-->
											<el-table-column prop="touchState"  width="120" align="center" label="触达黑名单">
												<template scope="scope">
													<el-switch disabled v-model="userinfoMassage[scope.$index].touchState"
															   @change="handleSwitch(scope.$index, userinfoMassage)"
															   :width="45" on-text="开" off-text="关">
													</el-switch>
												</template>
											</el-table-column>
										</el-table>
									</div>
								</el-collapse-item>
								<!-- 	结束	 						 2017年7月28日11:36:54 -->
								<el-collapse-item title="集团属性" name="2">
									<div style="margin-left: 10px;">
										<el-form class="tmp-userinfo__form" label-width="100px">
											<!-- 			                            <span style="height:20px; line-height:20px; text-align:center; display:block;" v-if="groupProperties=='' || typeof(groupProperties)==='undefined'"> 暂无数据</span> -->
											<span style="height:20px; line-height:20px; text-align:center; display:block;" v-if="groupAttributes==[] || typeof(groupAttributes)==='undefined'"> 暂无数据</span>

											<template v-else>
												<el-form >
													<template scope="scope">
														<el-row>
															<el-col :span="12" v-for="(item, index) in groupAttributes">
																<!--文本-->
													            <el-form-item v-if="item.type==0"  label-width="90px" class="mt-sm mb-sm" >
													            	 <el-tooltip slot="label" effect="light" placement="top" :content="item.NAME" :disabled="!(item.NAME.length > 6)">
																	        <span v-text="(item.NAME.length > 6 ) ? item.NAME.substring(0,6) + '：' : item.NAME + '：'"></span>
																	  </el-tooltip>	
													            	{{item.model}}
													            </el-form-item>
	
																 <!--下拉-->
													            <el-form-item v-if="item.type==1" label-width="90px" class="mt-sm mb-sm" >
														            <el-tooltip slot="label" effect="light" placement="top" :content="item.NAME" :disabled="!(item.NAME.length > 6)">
																        <span v-text="(item.NAME.length > 6 ) ? item.NAME.substring(0,6) + '：' : item.NAME + '：'"></span>
																 			
																  </el-tooltip>
													            	 	{{item.model}}
													            </el-form-item>
	
																 <!--日期-->
													            <el-form-item v-if="item.type==2"  label-width="90px"  class="mt-sm mb-sm" >
													            	 <el-tooltip slot="label"  effect="light" placement="top" :content="item.NAME" :disabled="!(item.NAME.length > 6)">
																        <span v-text="(item.NAME.length > 6 ) ? item.NAME.substring(0,6) + '：' : item.NAME + '：'"></span>
																 			
																  </el-tooltip>
													            	{{item.model}}
													            </el-form-item>
	
																 <!--单选-->
												            	<el-form-item v-if="item.type==3"  label-width="90px"  class="mt-sm mb-sm" >
													            	 <el-tooltip slot="label" effect="light" placement="top" :content="item.NAME" :disabled="!(item.NAME.length > 6)">
																	        <span v-text="(item.NAME.length > 6 ) ? item.NAME.substring(0,6) + '：' : item.NAME + '：'"></span>
																	 			
																	  </el-tooltip>
												            		 	{{item.model}}
	
													            </el-form-item>
	
																 <!--多选-->
													            <el-form-item  v-if="item.type==4" label-width="90px"  :label="item.NAME" class="mt-sm mb-sm" >
													            
														            <el-tooltip slot="label" effect="light" placement="top" :content="item.NAME" :disabled="!(item.NAME.length > 6)">
																        <span v-text="(item.NAME.length > 6 ) ? item.NAME.substring(0,6) + '：' : item.NAME + '：'"></span>
																 			
																  </el-tooltip>
														            {{item.showValue}}
													            </el-form-item>
															</el-col>
														</el-row>
													</template>

												</el-form>

											</template>
										</el-form>
									</div>
								</el-collapse-item>
								<el-collapse-item title="RFM属性" name="3" >
									<div style="margin-left: 10px;">
										<el-form-grid  size="sm">
											<el-select @change="selectChange(selectOne,one)" v-model="selectOne"  placeholder="请选择">
												<el-option
														v-for="(item, index) in selectInfo"
														:label="item.label"
														:key="item.value"
														:value="item.value">
												</el-option>
											</el-select>
										</el-form-grid>


										<el-form-grid size="xmd">
											<ns-droptree v-show="selectOne==2"  v-model="label"
														 url = "/base/common/loadDeptTree"
														 :show-checkbox="false" @current-change="aclicka" >
											</ns-droptree>
											<!-- 											/base/common/loadChannelTree -->
											<ns-droptree v-show="selectOne==3" v-model="channelabel"
														 url = '/base/common/loadChannelTree' @current-change="aclicka"
														 :show-checkbox="false" >
											</ns-droptree>

											<el-select v-if="secondType!==1 " @change="selectChange(selectTow,tow)" v-model="selectTow" placeholder="请选择">
												<!-- 			                                     	获取品牌 -->
												<el-option v-if="selectOne==1"
														   v-for="(item, index) in userinfoMassage"
														   :label="item.brand"
														   :key="item.group_id"
														   :value="item.brand_id">
												</el-option>
											</el-select>


											<!-- 			                                 <el-tree v-if="secondType==1" :data="selectTow"  @node-click="handleNodeClick"></el-tree> -->
										</el-form-grid>



										<el-form class="tmp-userinfo__form" label-width="100px">
											<el-row>
												<el-col :span="12">
													<el-form-item label="付款金额:" >
														<el-form-grid>{{rfmInfo.pay_amount}}</el-form-grid>
													</el-form-item>
													<el-form-item label="成功付款金额:" >
														<el-form-grid>{{rfmInfo.trade_amount}}</el-form-grid>
													</el-form-item>
													<el-form-item label="退款金额:" >
														<el-form-grid>{{rfmInfo.refund_amount}}</el-form-grid>
													</el-form-item>
													<el-form-item label="客单价:" >
														<el-form-grid>{{rfmInfo.price_unit}}</el-form-grid>
													</el-form-item>
													<el-form-item label="最后付款时间:">
														<el-form-grid>{{rfmInfo.last_pay_time}}</el-form-grid>
													</el-form-item>
												</el-col>
												<el-col :span="12">
													<el-form-item label="付款次数:" >
														<el-form-grid>{{rfmInfo.pay_times}}</el-form-grid>
													</el-form-item>
													<el-form-item label="成功次数:" >
														<el-form-grid>{{rfmInfo.trade_times}}</el-form-grid>
													</el-form-item>
													<el-form-item label="退款次数:" >
														<el-form-grid>{{rfmInfo.refund_times}}</el-form-grid>
													</el-form-item>
													<el-form-item label="客件数:" >
														<el-form-grid>{{rfmInfo.item_unit}}</el-form-grid>
													</el-form-item>
													<el-form-item label="付款休眠天数:">
														<el-form-grid>{{rfmInfo.dormant_day}}</el-form-grid>
													</el-form-item>
												</el-col>
											</el-row>
										</el-form>
									</div>
								</el-collapse-item>
								<el-collapse-item @change="aa()" title="自定义属性" name="4">
									<!-- 								 	 <span style="height:20px; line-height:20px; text-align:center; display:block;" v-if="brandInfo==''"> 暂无数据</span> -->


									<span style="height:20px; line-height:20px; text-align:center; display:block;" v-if="brandList==[]"> 暂无数据</span>
									<div v-else>
										<template>
											<el-select size=mini @change="customSelect()" v-model="brandValue" placeholder="请选择">
												<el-option  v-for="item in brandList" :key="item.id"  :label="item.brand_name"  :value="item.id">
												</el-option>
											</el-select>
										</template>
										<br/>
										<template>
											<el-form >
												<template scope="scope">
													<el-row>
														<el-col :span="12" v-for="(item, index) in CustomProperties">
															<!--文本-->
												            <el-form-item v-if="item.type==0"  label-width="90px"  class="mt-sm mb-sm" >
													            <el-tooltip slot="label" effect="light" placement="top" :content="item.NAME" :disabled="!(item.NAME.length > 6)">
																        <span v-text="(item.NAME.length > 6 ) ? item.NAME.substring(0,6) + '：' : item.NAME + '：'"></span>
																 			
																  </el-tooltip>
												            	 	{{item.model}}
												            </el-form-item>
	
															 <!--下拉-->
												            <el-form-item v-if="item.type==1" label-width="90px"   class="mt-sm mb-sm" >
													            <el-tooltip slot="label" effect="light" placement="top" :content="item.NAME" :disabled="!(item.NAME.length > 6)">
															        <span v-text="(item.NAME.length > 6 ) ? item.NAME.substring(0,6) + '：' : item.NAME + '：'"></span>
															 			
															  </el-tooltip>
												            	 {{item.model}}
												            </el-form-item>
	
															 <!--日期-->
												            <el-form-item v-if="item.type==2"  label-width="90px"   class="mt-sm mb-sm" >
													            <el-tooltip slot="label" effect="light" placement="top" :content="item.NAME" :disabled="!(item.NAME.length > 6)">
																        <span v-text="(item.NAME.length > 6 ) ? item.NAME.substring(0,6) + '：' : item.NAME + '：'"></span>
																 			
																  </el-tooltip>
												            	 	{{item.model}}
												            </el-form-item>
	
															 <!--单选-->
											            	<el-form-item v-if="item.type==3"  label-width="90px" class="mt-sm mb-sm" >
											            	 <el-tooltip slot="label" effect="light" placement="top" :content="item.NAME" :disabled="!(item.NAME.length > 6)">
															        <span v-text="(item.NAME.length > 6 ) ? item.NAME.substring(0,6) + '：' : item.NAME + '：'"></span>
															 			
															  </el-tooltip>
											            		 	{{item.model}}
	
												            </el-form-item>
	
															 <!--多选-->
												            <el-form-item  v-if="item.type==4" label-width="90px"  class="mt-sm mb-sm" >
													            <el-tooltip slot="label" effect="light" placement="top" :content="item.NAME" :disabled="!(item.NAME.length > 6)">
															        <span v-text="(item.NAME.length > 6 ) ? item.NAME.substring(0,6) + '：' : item.NAME + '：'"></span>
															 			
															  </el-tooltip>
												            	 	{{item.showValue}}
												            </el-form-item>
														</el-col>
													
													</el-row>
												</template>

											</el-form>

										</template>

									</div>
									<!-- 			                        <el-button v-for="(checkData, index) in brandInfo" v-popover:operation type="primary" class="userinfo-button" :class="selected === 'checkData.brand_naem' ? 'userinfo-button-select' : ''" @click="selectType($event)">{{checkData.brand_naem}}</el-button> -->
								</el-collapse-item>
						</el-collapse>
						</el-scrollbar>
					</el-col>
				</el-row>
			</el-form>


		</el-tab-pane>

		<!-- 					积分 -->
		<el-tab-pane label="积分" name="second">
			<el-form>
				<el-row>
<!--						<el-col :span="6" >
						<el-select @change="selectChange(selectTree, three)" v-model="selectTree" placeholder="请选择">
							<el-option
									v-for="(item, index) in userinfoMassage"
									:label="item.brand"
									:key="item.brand_id"
									:value="item.brand_id">
							</el-option>
						</el-select>
					</el-col>-->
					  <el-col :span="4" >
						 <el-form-item  label="总生成积分:"><span style="color:#f39a00">{{userInfo.total_score}}</span></el-form-item>
					  </el-col>
				</el-row>
			</el-form>
			<el-form-grid>
				<!-- 积分表 -->
				<el-table
						height="250"
						:data="integralTable" border
						style="width: 100%">
					<el-table-column
							prop="data_time" label="积分日期" width="150">
					</el-table-column>
					<el-table-column
							prop="brand_name" label="所属品牌" width="150">
					</el-table-column>
					<el-table-column
							prop="stype" label="来源类型" width="150">
					</el-table-column>
					<el-table-column
							prop="activity_name" label="活动名称"  width="150">
					</el-table-column>
					<el-table-column
							prop="integral_behavior"  label="积分动作" width="150">
					</el-table-column>
					<el-table-column
							prop="integral_number" label="积分值" width="150">
					</el-table-column>
				</el-table>
			</el-form-grid>
		</el-tab-pane>


		<!-- 					购物行为 -->
		<el-tab-pane label="购物行为" name="eight">
			<el-collapse v-model="activeName1" accordion=""> 
		      <el-collapse-item title="购物概况" name="1"> 
		       <el-form-grid> 
		        <el-table :data="shoopTableData" border="" style="width: 100%"> 
		         <el-table-column prop="plat_from_type" label="平台" width="120"> 
		         </el-table-column> 
		         <el-table-column prop="order_times" label="下单次数" width="150"> 
		         </el-table-column> 
		         <el-table-column prop="pay_times" label="付款次数" width="150"> 
		         </el-table-column> 
		         <el-table-column prop="pay_amount" label="付款总额" width="180"> 
		         </el-table-column> 
		         <el-table-column prop="trade_amount" label="成交金额" width="150"> 
		         </el-table-column> 
		         <el-table-column prop="price_unit" label="客户单价" width="150"> 
		         </el-table-column> 
		        </el-table> 
		       </el-form-grid> 
		      </el-collapse-item> 
		      <el-collapse-item title="交易明细" name="2" @order-dateils="opdiaog"> 
		       <el-form-grid> 
		        <el-table :data="tradeTable" border="" style="width: 100%"> 
		         <el-table-column prop="sysTradeId" label="交易信息" width="299"> 
		         </el-table-column> 
		         <el-table-column prop="payTime" label="时间" width="192"> 
		         </el-table-column> 
		         <el-table-column prop="num" label="件数" width="227"> 
		         </el-table-column> 
		         <el-table-column prop="payment" label="金额" width="152"> 
		         </el-table-column> 
		        </el-table> 
		       </el-form-grid> 
		      </el-collapse-item> 
		      <el-collapse-item title="购物轨迹" name="3"> 
		      <div class="el-collapse-item__wrap" data-old-padding-top=""
					data-old-padding-bottom="" data-old-overflow="hidden"
					style="overflow: hidden;">
					<div class="el-collapse-item__content">
						<ul class="cbp_tmtimeline"  >
							<li><time class="cbp_tmtime">
									<span>现在</span>
								</time>
								<div class="cbp_tmicon timeline-bg-success">
									<i class="bui-send"></i>
								</div>
								<div class="cbp_tmlabel" v-if="shoopPatch.length>0">
									无动态
								</div>
								<div class="cbp_tmlabel" v-else>
									暂无数据
								</div>
							</li>
						
				<!--评价模板 -->
							<li v-for="resultList in shoopPatch"><time class="cbp_tmtime">
								<span>{{resultList.created}}</span> <span>购物轨迹</span>
							</time>
							<div class="cbp_tmicon timeline-bg-success">
								<i class="bui-send"></i>
							</div>
							<div class="cbp_tmlabel">
								<p class="contrail-content">
									<span>渠道：{{resultList.channelSource}}</span> <span>账号：{{resultList.out_nick}}</span> <span>交易号：{{resultList.sysTradeId}}</span>
								</p>
								<p class="contrail-content">
									<span>付款总金额：{{resultList.payment}}</span> <span>总件数：{{resultList.num}}</span>
								</p>
								<div class="contrail-card">
									<div class="contrail-card__photo">
										<img  :src="resultList.pic_path" width="120">
									</div>
									<div class="contrail-card__property">
										<p class="contrail-content">
											<label>下单时间：</label> <span>{{resultList.created}}</span>
										</p>
										<p class="contrail-content">
											<label>付款时间：</label> <span>{{resultList.payTime}}</span>
										</p>
										<p class="contrail-content">
											<label>商品名称：</label> <span><a href="">{{resultList.title}}</a></span>
										</p>
										<p class="contrail-content">
											<label>买家留言：</label> <span>{{resultList.buyer_message}}</span>
										</p>
										<p class="contrail-content">
											<label>卖家留言：</label> <span>{{resultList.sellerMemo}}</span>
										</p>
									</div>
								</div>
							</div></li>



						</ul>
					</div>
				</div>
		      </el-collapse-item> 
		     </el-collapse> 	
		</el-tab-pane>

		<!-- 					互动行为 -->
		<el-tab-pane label="互动行为" name="third">
			<el-collapse v-model="activeName5" accordion=""> 
		      <el-collapse-item title="互动概况" name="1"> 
		       <el-form-grid> 
		        <el-table :data="interactTable" border="" style="width: 100%"> 
		         <!--								<el-table-column
											prop="play_type"  label="渠道"  width="183">
									</el-table-column>--> 
		         <el-table-column prop="interact_times" label="互动次数" width="180"> 
		         </el-table-column> 
		         <el-table-column prop="add_point" label="总获取积分" width="180"> 
		         </el-table-column> 
		         <el-table-column prop="del_point" label="总消耗积分" width="180"> 
		         </el-table-column> 
		         <el-table-column prop="last_interact_time" label="最近一次互动" width="180"> 
		         </el-table-column> 
		         <el-table-column prop="first_interact_time" label="最早一次互动" width="180"> 
		         </el-table-column> 
		        </el-table> 
		       </el-form-grid> 
		      </el-collapse-item> 
		     </el-collapse> 
		</el-tab-pane>

		<!-- 					触达记录 -->
		<el-tab-pane label="触达记录" name="six">
			<el-collapse v-model="activeName4" accordion > 
		      <el-collapse-item title="触达概况" name="1"> 
		       <el-form-grid> 
		        <el-table :data="tatchTable" border="" style="width: 100%"> 
		         <el-table-column prop="sms_times" label="短信次数" width="220"> 
		         </el-table-column> 
		         <el-table-column prop="email_times" label="邮件次数" width="220"> 
		         </el-table-column> 
		         <el-table-column prop="last_sms_time" label="最后一次触达" width="220"> 
		         </el-table-column> 
		         <el-table-column prop="create_time" label="最早一次触达" width="240"> 
		         </el-table-column> 
		        </el-table> 
		       </el-form-grid> 
		      </el-collapse-item> 
		     </el-collapse> 
		</el-tab-pane>

		<!-- 					客户声音 -->
		<el-tab-pane label="客户声音" name="fourth">
			<el-collapse ref="collapse" v-model="activeName6" accordion style="height:250px"> 
		      <el-collapse-item title="客户声音概况" name="1"> 
		       <el-form-grid> 
		        <el-table :data="viceTableData" border="" style="width: 100%"> 
		         <el-table-column prop="countNum" label="次数" width="220"> 
		         </el-table-column> 
		         <el-table-column prop="last_content" label="最后一次内容" width="220"> 
		         </el-table-column> 
		         <el-table-column prop="last_time" label="最近一次" width="220"> 
		         </el-table-column> 
		         <el-table-column prop="first_time" label="最早一次" width="220"> 
		         </el-table-column> 
		        </el-table> 
		       </el-form-grid> 
		      </el-collapse-item> 
		     </el-collapse> 
		</el-tab-pane>


		<!-- 					地址管理 -->
		<el-tab-pane label="地址管理" name="five">
		
				<el-table :data="tableData" border style="width: 100%">
					<el-table-column
							prop="plat_from_type" label="平台" width="100">
					</el-table-column>
					<el-table-column
							prop="out_nick" label="账号" width="94">
					</el-table-column>
					<el-table-column
							prop="mobile" label="手机号" width="154">
					</el-table-column>
					<el-table-column
							prop="particular_ass" label="详细地址">
					</el-table-column>
					<el-table-column
							prop="use_times" label="使用次数" width="82">
					</el-table-column>
					<el-table-column
							prop="last_use_time" label="最近一次" width="190">
					</el-table-column>
				</el-table>
		</el-tab-pane>

	</el-tabs>
	<!-- 				弹窗右下角关闭 -->
	<div slot="footer" class="dialog-footer">
		<el-button @click="closeDialog">关闭</el-button>
	</div>
</el-dialog>
<!-- 弹窗结束 -->	
	`;
	
	// 分页对象
	var ns_pagination = {
		enable: true,
		total: 0,
		currPage: 1,
		currSize: 10
	};
	
	var $methods = {
			
			
			
		change:function(data, type){
			var that = this;
			//点击发生改变的时候加载数据 , 需要再需要一个参数来控制 是不是要请求后台 loadGroupProperties(customerId,type 1[集团]|2[品牌])
			if(data != ''){
				switch(data){
					//加载集团属性	
					case '2': 
						if(that.userInfoCollapse[0]){
							//获取属性值
		    				$.ajax({
		    					url:"/vip/kdcustomer/queryaAttributesValue",
		    					type:"GET",
		    					async:false,
		    					data:{brand_id:that.brandValue, sys_customer_id:that.userInfo.sys_customer_id, source:1},
		    					success:function(data){
		    						if(data.success){
		    							that.attributesValue = data.result;
		    						}
		    					}
		    				});
							
							//获取所有集团属性
							$.ajax({
								url:'/vip/kdcustomer/queryGroupAttributes',
								async:false, 
								type:"get",
								success:function(data){
									if(data.success && data.result != ''){

		    							that.groupAttributes = data.result;
		    							
		    							var arr = that.groupAttributes;
		    	            			for(var i=0; i<arr.length; i++){
		    	            				
		    	            				for(var j = 0; j < that.attributesValue.length; j++){
		    	            					if(that.attributesValue[j].pid == arr[i].id){
		    	            						arr[i].model = that.attributesValue[j].property_value;
		    	            						arr[i].vid = that.attributesValue[j].id;
		    	            					}
		    	            				}
		    	            				
		    	            				if(arr[i].type == 1 || arr[i].type == 3 || arr[i].type == 4 ){
		    	            					that.groupAttributes[i].value =  arr[i].value.split("|");
		    	            					if(arr[i].type == 1 || arr[i].type == 3){
		    	            						
//		    	            						that.set(that.groupAttributes[i], "model", "")
		    	            					}else if(arr[i].type == 4){
		    	            						var newArr = [];
		    	            						if(that.groupAttributes[i].model != null){
		    	            							that.groupAttributes[i].showValue = that.groupAttributes[i].model;
		    	            							that.groupAttributes[i].model = that.groupAttributes[i].model.split(',');
		    	            						}else{
		    	            							that.groupAttributes[i].model = new Array();
		    	            							that.groupAttributes[i].showValue = '';
		    	            						}
//		    	            						that.set(that.groupAttributes[i], "model", [])
		    	            					}
		    	            				}else{
//		    	            					that.set(that.groupAttributes[i], "model", "")
		    	            				}
		    	            			}
		    							
		    						
									}
									
								}
							});
						}
						break;
					//加载rfm属性
					case '3':
					
						break;
					//加载自定义属性 loadGroupProperties(customerId,type 1[集团]|2[品牌])
					case '4':
						if(that.userInfoCollapse[2]){
							//获取当前人的品牌, 需要过滤
		    				
							if(type != 2){
								
								$.ajax({
									url:"/marketing/activities/queryBrandByCustomerId",
									type:"GET",
									async:false,
									success:function(data){
										if(data.success){
											that.brandList = data.result;
											if(that.brandList.length>0){
												that.brandValue = that.brandList[0].id;
											}
										}
									}
								});
							}
		    				//获取属性值
		    				$.ajax({
		    					url:"/vip/kdcustomer/queryaAttributesValue",
		    					type:"GET",
		    					async:false,
		    					data:{brand_id:that.brandValue, sys_customer_id:that.userInfo.sys_customer_id, source:2},
		    					success:function(data){
		    						if(data.success){
		    							that.attributesValue = data.result;
		    						}
		    					}
		    				});
		    				
		    				//根据品牌id获取所有品牌属性
		            		$.ajax({
		    					url:"/vip/kdcustomer/queryaAttributes",
		    					type:"GET",
		    					async:false,
		    					data:{brand_id:that.brandValue, source:2},
		    					success:function(data){
		    						if(data.success){
		    							that.CustomProperties = data.result;
		    							
		    							var arr = that.CustomProperties;
		    	            			for(var i=0; i<arr.length; i++){
		    	            				
		    	            				for(var j = 0; j < that.attributesValue.length; j++){
		    	            					if(that.attributesValue[j].pid == arr[i].id){
		    	            						arr[i].model = that.attributesValue[j].property_value;
		    	            						arr[i].vid = that.attributesValue[j].id;
		    	            					}
		    	            				}
		    	            				
		    	            				if(arr[i].type == 1 || arr[i].type == 3 || arr[i].type == 4 ){
		    	            					that.CustomProperties[i].value =  arr[i].value.split("|");
		    	            					if(arr[i].type == 1 || arr[i].type == 3){
		    	            						
//		    	            						that.set(that.CustomProperties[i], "model", that.CustomProperties[i].model)
		    	            					}else if(arr[i].type == 4){
		    	            						var newArr = [];
		    	            						if(that.CustomProperties[i].model != null){
		    	            							that.CustomProperties[i].showValue = that.CustomProperties[i].model;
		    	            							that.CustomProperties[i].model = that.CustomProperties[i].model.split(',');
		    	            						}else{
		    	            							that.CustomProperties[i].model = new Array();
		    	            							that.CustomProperties[i].showValue = '';
		    	            						}
		    	            						
		    	            						
//		    	            						that.set(that.CustomProperties[i], "model", [])
		    	            					}
		    	            				}else{
//		    	            					that.set(that.CustomProperties[i], "model", that.CustomProperties[i].model)
		    	            				}
		    	            			}
		    							
		    						}
		    					}
		    				})
						}
						break;
				}
			
			
			}
			
			
		},
		//点击就出来了呀!  --打开窗口
		showCustomer: function(customerID){
			this.customerID = customerID;
			this._init();
//			是不是要加载会员数据?
			this.loadingUserInfo(customerID);
			this.loadingBrandMssage(customerID)
			this.customerdialog = true;
//			this.$set(this,'goodsSelectedData',this.$data.confirmGoodsData);
			
		},
		
		loadingBrandMssage:function(customerID){
			var that = this;
			
			//加载积分信息
			$.ajax({
	             type: "GET",
	             async: false,
	             url: "/vip/kdcustomer/queryBrandMssage",
	             data: {customer_id:customerID},
	             dataType: "json",
	             success: function(data){
	            	 that.userinfoMassage=data.result;
		            	if(that.userinfoMassage.length >0){
	                         that.right = that.userinfoMassage[0].right === 1;
	                    }
	                    for(var i=0;i<that.userinfoMassage.length;i++){
	                        that.userinfoMassage[i].touchState = that.userinfoMassage[i].touchState === 1;
	                    }  
                       for(var i=0;i<that.userinfoMassage.length;i++){
                    	   that.userinfoMassage[i].right = that.userinfoMassage[i].right == 1?true:false;
                    	   that.userinfoMassage[i].touchState = that.userinfoMassage[i].touchState == 1?true:false;
						}
                       
                       if(data.result.length==1){
                    	   that.customerIntegral = data.result["0"];
                       }
                 }
	         });
		},
		aclicka:function(data, node){
			var that = this;
			$.ajax({
				url:"/vip/kdcustomer/laodRFMbyShopCode",
				type:"get",
				data:{shopCode:data.code},
				ansy:false,
				success:function(json){
					if(json.success && json.result != null){
            		 	that.rfmInfo = json.result;
            			 var time = new Date();
            			 if(that.rfmInfo.last_pay_time != null ){
            				 var endTime = new Date(that.rfmInfo.last_pay_time);
            				 that.rfmInfo.dormant_day = parseInt((time.getTime() -  endTime.getTime())/(24 * 60 * 60 * 1000));
            			 }
	            	 }else{
	            		 that.rfmInfo = "";
	            	 }
            	 }
			})
		},
		loadingUserInfo:function(customerID){
			var that = this
			//异步加载会员信息
			$.ajax({
	             type: "GET",
	             async: false,
	             url: "/vip/kdcustomer/loadCustomerInfoById",
	             data: {customer_id:customerID},
	             dataType: "json",
	             success: function(data){
	            	 if(data.success){
	            		//将异步加载的数据作为弹窗数据
	 	                that.userInfo=data.result; 
	 	               that.zone.value[0] = that.userInfo.province;
                       that.zone.value[1] = that.userInfo.city;
                       that.zone.value[2] = that.userInfo.district;
	            	 }else{
	            		 console.log("Failed to obtain member information!!")
	            	 }
	            	 
	            	 
	            }
	         });
		},
		loadingUserInfo:function(customerID){
			var that = this
			//异步加载会员信息
			$.ajax({
				type: "GET",
				async: false,
				url: "/vip/kdcustomer/loadCustomerInfoById",
				data: {customer_id:customerID},
				dataType: "json",
				success: function(data){
					if(data.success){
						//将异步加载的数据作为弹窗数据
						that.userInfo=data.result; 
						if(that.userInfo.birthday != null){
                            that.userInfo.birthday = that.userInfo.birthday.substring(0, 10);
                        }
                        that.zone.value[0] = that.userInfo.province;
                        that.zone.value[1] = that.userInfo.city;
                        that.zone.value[2] = that.userInfo.district;
                        that.oldValue = that.userInfo;
                        console.log(that.oldValue)
                        that.mobile = that.userInfo.mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
					}else{
						console.log("Failed to obtain member information!!")
					}
					
					
				}
			});
		},
		//自定义属性点击
		"selectType":function(button) {
			this.selected = button.currentTarget.getElementsByTagName('span')[0].innerText
		},
		opdiaog:function(){
			
		},
		//下拉框值改变
		"selectChange":function(data, type){
			var that = this;
			//第一选择框的值修改第二选择框属性集合 secondInfo  from RFM
			if(type=="one"){
				this.secondType = 0;
				this.selectTow = '';
				if(data === "2"){
					this.secondType = 1;
//					this.url = "/base/common/loadDeptTree"
				}
				if(data==="3"){
					this.secondType = 1;
//					this.url = "/base/common/loadChannelTree"
					
				}
//				
			}
			//第二框的值修改frm属性集合  frmInfo from RFM
			if(type=="tow"){
				 $.ajax({
		             type: "GET",
		             url: "/vip/kdcustomer/laodRFMbyCustomerId",
		             data: {customerId:that.userInfo.sys_customer_id, brandId:data},
		             dataType: "json",
		             success: function(data){
		            	 if(data.success && typeof(data.result) != 'undefined' && data.result != ''){
		            		 	that.rfmInfo = data.result;
		            			 var time = new Date();
		            			 if(that.rfmInfo.last_pay_time != null ){
		            				 var endTime = new Date(that.rfmInfo.last_pay_time);
		            				 that.rfmInfo.dormant_day = parseInt((time.getTime() -  endTime.getTime())/(24 * 60 * 60 * 1000));
		            			 }
		            	 }	
	             }
		         });
			}
			
			//积分下拉框
			if(type=="three"){
				for(var i=0;i<this.userinfoMassage.length;i++){
					 if(this.userinfoMassage[i].brand_id == data){
						this.customerIntegral = this.userinfoMassage[i];
						break;
					 }
				}								
			}
			
			
		},
		closeDialog:function(){
			this.customerdialog = false;
		},
		//队友误伤 --打开窗口
		open: function(customerID){
			if(customerID != null && typeof(customerID)!= 'undefined'){
				this.showCustomer(customerID);
			}
		},
		
		fromClick:function(tab, event){
			var that = this ;
			var num = tab.index;
			var customerID = this.userInfo.sys_customer_id ;
			switch(num){
				case "0": //会员详情
					
				 	break;
				case "1": //积分
					$.ajax({
			             type: "GET",
			             url: "/vip/kdcustomer/queryBrandMssage",
			             data: {customer_id:customerID},
			             async:false, 
			             dataType: "json",
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
						url: "/vip/kdcustomer/queryPointInfo",
						data: {customer_id:customerID},
						async:false, 
						dataType: "json",
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
                   that.activeName1 = '1',
					 $.ajax({
			             type: "GET",
			             url: "/vip/kdcustomer/queryShoppingByCustomerId",
			             data: {customerId:customerID},
			             dataType: "json",
			             success: function(data){
			            	 that.shoopTableData = data.data;
			             }
			         });
                     $.ajax({
			             type: "GET",
			             url: "/vip/kdcustomer/loadTradeByCustomerId",
			             data: {customerId:customerID},
			             async:false, 
			             dataType: "json",
			             success: function(data){
			            	 if(typeof(data.recordsTotal)!== 'undefined' && data.recordsTotal >0){
			            		 that.tradeTable = data.data;
			            		 that.shoopPatch = that.tradeTable;
			            		 console.log(that.shoopPatch);
			            	 }
			             }
			         });
				 	break;
				case "3"://互动行为
					$.ajax({
			             type: "GET",
			             url: "/vip/kdcustomer/loadOutActivities",
			             data: {customerId:customerID},
			             dataType: "json",
			             success: function(data){
			            	 if(data.success){
			            		 this.tableData = data.result;
			            	 }
			             }
			         });
				 	break;
				case "4"://触达记录
					$.ajax({
			             type: "GET",
			             url: "/vip/kdcustomer/laodAddessByCustomerID",
			             data: {customerId:customerID},
			             dataType: "json",
			             success: function(data){
			            	 this.tableData = data.data;
//			                 that.$set(that, "lsitResult", data.result)
			             }
			         });
//					this.$refs.touchtable.$search({searchMap:{customer_id:customerID}});
				 	break;
				case "5"://客户声音
					$.ajax({
			             type: "GET",
			             url: "/voice/evaluate/laodCustomerVoice",
			             async:false, 
			             data: {customerId:customerID},
			             dataType: "json",
			             success: function(data){
			            	 if(data.success){
			            		 that.viceTableData = data.restule;
			            	 }
			             }
			         });
//					this.$refs.voicetable.$search({searchMap:{customer_id:customerID}});
				 	break;
				case "6": //地址管理
					
					$.ajax({
			             type: "GET",
			             url: "/vip/kdcustomer/laodAddessByCustomerID",
			             data: {customerId:customerID},
			             async:false, 
			             dataType: "json",
			             success: function(data){
			            	 if(typeof(data.data) !== 'undefined' && data.data.length>0){
			            		 that.tableData = data.data;
			            		 for (var int = 0; int < that.tableData.length; int++) {
			            			 var reg = /^(\d{3})\d{4}(\d{4})$/;
			            			 that.tableData[int].mobile = that.tableData[int].mobile.replace(reg, "$1****$2");
								}
			            	 }
			            	 
//			                 that.$set(that, "lsitResult", data.result)
			             }
			         });
//					this.$refs.addresstable.$search({searchMap:{customer_id:customerID}});
				 	break;
			}
			
		},
		
		
		// 初始化呀
		_init: function () { 
//			this.ns_search();
			this.resetPagination();
			//this.$set(this,"searchMap",{});
		},

		//  你可以回去了. 
		customerClose: function () {
//			this.$set(this,"model",this.$options.data().model);
			this.$data.customerdialog = false;
			this.goodsLoading =true;
		},
		
		
		//你是谁啊
		toggleSelection: function(selected,rows){
			for(var i = 0; i<rows.length; i++){
				for(var j = 0; j<selected.length; j++){
					if(rows[i].id == selected[j].id ){
						this.$refs.goodsTable.toggleRowSelection(rows[i],true);
						break;
					}
				}
			}
		},
		
	}
	
	/**
	 * 表格固定方法
	 *
	 */
	var built_in_methods = {
		
		//表格页数条数改变
		sizeChange: function (val) {
			this.ns_pagination.currSize = val;
			this.ns_pagination.currPage = 1;
			this.reload();
		},
		//当前页改变
		pageChange: function (val) {
			this.tableLoading = true;
			this.ns_pagination.currPage = val;
			this.reload();
		},
		//重置分页信息
		resetPagination: function(){
			this.ns_pagination = {
					enable: false,
					total: 0,
					currPage: 1,
					currSize: 10
				};
		},
		search: function (params) {
			this.ns_pagination.currPage = 1;
			this.searchMap = Object.assign({}, params);
			this.reload();
		},
		reload: function () {
			var limit = this.ns_limit;
			var order = this.ns_order;
			var params = Object.assign({}, limit, order, this.searchMap);
			this.ns_table_ajax(params);
		},
		ns_table_ajax: function (params) {
			var _this = this;
			$.post(_this.goodsTableUrl,params).done(function (resp) {
				if (resp.success && resp.result.data.length > 0){
					_this.goodsData = resp.result.data;
					_this.$set(_this.ns_pagination,"total",resp.result.recordsTotal);
					_this.$set(_this.ns_pagination,"enable",true);
				} else {
					_this.goodsData = [];
					_this.$set(_this.ns_pagination,"enable",false);
				}
				_this.$nextTick(function(){
					setTimeout(()=>{				
						_this.goodsLoading = false;
					},200)
					_this.toggleSelection(_this.goodsSelectedData,_this.goodsData);
				})
				_this.tableLoading = false;
				
			}).fail(function (resp) {
				console.log(resp);
				_this.$nextTick(function(){
					setTimeout(()=>{
						_this.goodsLoading = false;
					
					},200)
				})
				_this.tableLoading = false;
			});
		},
		ns_search: function () {
			var params = {
				searchMap: {
					title: this.model.title,
					outerId: this.model.outerId,
					minPrice: this.model.minPrice,
					maxPrice: this.model.maxPrice,
					cate: this.model.cate
				}
			}
			this.search(params);
		},
		// 重置查询条件
		ns_reset: function () {
			this.$set(this,"model",this.$options.data().model);
			this.searchMap = {};
			this.reload();
		},
	}
	
	
	var computed = {
			"ns_limit": function(){
				return {
					start: (this.ns_pagination.currPage-1)*this.ns_pagination.currSize,
					length: this.ns_pagination.currSize
				}
			}
		};
	var mounted = function () {
		
	};
	var created = function () {
	};
	/**
	 * 数据对象
	 *
	 */
	var $data = function(){
		return {
			selected:"",
			searchMap: {},
			activeName1:"1",
			activeName4:"1",
			activeName5:"1",
			activeName2:"first",
			activeName3:"1",
			activeName6:"1",
			customerdialog:false,
			customerID:"",
			one:"one",
			tow:"tow",
			three:"three",
			brandInfo:[],//获取自定义属性
			label:"",
			mobile:"",
			model:{
				title: "",
			},
			selectTow:"",//selectTow frm属性的第二个选择
			secondType:"",//第二选择类型  1 树, 0 非树
			channelabel:{ 
				"text":"",
				"value":""
			},
			right:false,
			selectTree:"",//积分选择
			customerIntegral:'',//会员积分
			userinfoMassage:[],
			tableData:[],
			shoopPatch:[],
			tableData:[],
			userinfoTable:"",
			selectInfo:[{"label":"品牌","value":"1"},{"label":"部门","value":"2"},{"label":"渠道","value":"3"}],
			userInfo:{
			},
			userInfoCollapse:[true,true,true],//会员页面的折叠面板数据加载控制 , userInfoCollapse[0]是否异步加载集团属性, userInfoCollapse[1]是否异步加载rfm属性,userInfoCollapse[2]是否异步加载自定义属性,
			tradeTable:[],
			shoopTableData:[],
			integralTable:[],
			groupAttributes:[],
			brandList:[],
			interactTable:[],
			viceTableData:[],
			tatchTable:[],
			brandValue:"",
			CustomProperties:[],
			rfmInfo:{
			},
			 zone: {
	                'label': '地区',
	                'value': ['', '', ''],
	                'style': 'cascader',
	                'type': 'text',
	                'edit': false,
	                'options': []
	            },
			selectOne:"",
			groupProperties:[],//集团属性
			ns_pagination: ns_pagination, // 分页参数
		
		}
	};
	// 会员详情组件
	Vue.component("ns-customer-details", {
		mixins: [table_mixin,tree_mixin,vueEvent],
		template: $template,// 弹窗结构
		data: $data,		//数据
		methods: Object.assign(built_in_methods, $methods), //加入方法
		created:created,	
		mounted: mounted,
		computed: computed,
	});
	
})