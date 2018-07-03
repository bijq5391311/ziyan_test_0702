define(["vue", "nui", "jquery"], function(Vue, Nui, $) {
	
	/***
	 * [{
			type: "bar",
			row: {name: "Code", label: "类型"},
			cols: [{name: "ID", label: "类1"}]
		},{
			type: "line",
			row: {name: "Code", label: "类型"},
			cols: [{name: "ID", label: "类1"}]
		},{
			type: "pie",
			row: {name: "Code", label: "类型"},
			cols: [{name: "ID", label: "类1"}]
		}]
	 */
	//创建图形选项
	function mergeChartOption(type, row, cols, data) {
		var x = [];
		var y = {};
		cols.forEach(col => {
			y[col.name] = [];
		});
		var colNames = Object.keys(y);
		
		var labelMap = {};
		[].concat([row]).concat(cols).forEach(item => {
			labelMap[item.name] = item.label;
		});
		
		data.forEach(item => {
			x.push(item[row.name]);
			colNames.map(key => {
				y[key].push(item[key] ? item[key] : 0);
			});
		});
		
		var legend = {
			data: cols.map(item => item.label)
		};
		
		var xAxis = [{
			type: "category",
			data: x
		}];
		
		var series = null;
		if(type == "bar" || type == "line") {
			series = Object.keys(y).map((curr, index, arr) => {
				return {
					name: labelMap[curr],
					type: type,
					data: y[curr]
				}
			});
		} else if(type == "pie") {
			series = Object.keys(y).map((curr, index, arr) => {
				return {
					name: labelMap[curr],
					type: type,
					data: y[curr].map((value, index) => {
						return {
							name: x[index],
							value: value
						};
					})
				}
			});
		}
		
		return {
			legend,
			xAxis,
			series
		}
	};
	window.mergeChartOption = mergeChartOption;
	
	//表格vue选项合并方法
	function mergeTableOption(opt) {
		/*var iTemplate = ``;
		var methods = {};

		var treeOption = treeOption = {
				enable: false,
				showCheckbox: false,
				expandAll: false,
				methods: {}
		};

		var tableOption = {
			url: '',
			quickSearchName: '',
			model: {},
			rules: {},
			state: {},
			rowButtons: [],
			operateButtons: [],
			methods: {}
		};*/
		var template = opt.template;
		var tableOption = opt.tableOption;
		var treeOption = opt.treeOption;
		
		return (function(template, tableOption, treeOption) {
			var methods = {};
			
			if(treeOption && treeOption.enable == true) {
				if(!treeOption.url) {
					throw new Error("树url未配置");
				};
				treeOption.enable = treeOption.enable || false;
				treeOption.showCheckbox = treeOption.showCheckbox || false;
				treeOption.expandAll = treeOption.expandAll || false;
				Object.assign(methods, treeOption.methods);
			} else {
				treeOption= {
					enable: false,
					showCheckbox: false,
					expandAll: false
				}
			}
			
			if(!tableOption) {
				throw new Error("tableOption未配置");
			} else {
				Object.assign(methods, tableOption.methods);
			}
				
			/***
			 * 树的相关配置
			 */
			var tree_mixin = {
				props: {
					load: Function,
					filterNodeMethod: Function,
					beforeAddNode: Function,
					saveNewData: Function,
					saveEditData: Function,
					beforeDeleteNode: Function,
					afterDeleteNode: Function,
					setCustomIcon: Function
				},
				methods: {
					nodeClick: function (nodeData, node, instance) {
						this.$emit("node-click", nodeData, node, instance);
					},
					checkChange: function (nodeData, node, instance) {
						this.$emit("check-change", nodeData, node, instance);
					},
					nodeExpand: function (nodeData, node, instance) {
						this.$emit("node-expand", nodeData, node, instance);
					},
					nodeCollapse: function (nodeData, node, instance) {
						this.$emit("node-collapse", nodeData, node, instance);
					},
					currentChange: function (nodeData, node) {
						this.$emit("current-change", nodeData, node);
					}
				}
			}
			
			var option = {
				mixins: [tree_mixin],
				props: {
					$buildTemplate: Function, /** 构建template模版接口 */
					$handleParams: {
						type: Function,
						default: function(params, vm) {return params}
					},
					$formatText: {
						type: Function,
						default: function(model, nameMap) {
							var labels = [];
							
							function hasGetText(instance) {
								return instance != null && instance != undefined && typeof instance.getText === "function";
							}
							
							Object.keys(model).map(key => {
								var value = model[key];
								if(value !== undefined && value !== null && value !== "") {
									if(hasGetText(nameMap[key] && nameMap[key].instance)) {
										var instance = nameMap[key].instance;
										labels.push({
											name: key,
											text: instance.getText(),
											label: nameMap[key].text
										});
									}
								}
							})
							
							return labels;
						}
					},
					$handleRemove: {
						type: Function,
						default: function(name, model, oldParams, vm) {
							model[name] = null;
						}
					},
					$resetInput: {
						type: Function,
						default: function(model, vm) {
							vm.model = vm.$options.data().model;
						}
					},
					charts: {
						type: [Array], // [{type: "line", row: {name: "type", "label": "类型"}}, cols: [{name: "t1", "label": "类1"}]]
					},
					buttonRatio: {
						type: Number,
						default: function() {
							return 16;
						}
					},
					inputRatio: {
						type: Number,
						default: function() {
							return 8;
						}
					},
					chartTabRatio: {
						type: Number,
						default: function() {
							return 5;
						}
					},
					chartMap: { //通过该配置项，开发人员可以自定义需要展示的图形选项卡
						type: Object,
						default: function() {
							return {
								"bar": {
									type: "bar", class: "bui-zhuzhuangtu", name: "柱状图"
								},
								"pie": {
									type: "pie", class: "bui-bingzhuangtu", name: "饼状图"
								},
								"line": {
									type: "line", class: "bui-bingzhuangtu", name: "折线图"
								}
							}
						}
					},
					$handleChart: {
						type: Function,
						default: function(dom, type, data, requestInfo, vm) {
							var chart = echarts.getInstanceByDom(dom);
							var propLabel = vm.$getColumns();
							if(chart == null)
								chart = echarts.init(dom);
							else {
								chart.dispose();
								chart = echarts.init(dom);
							}
							var option = null;
							
							//var row = {name: "type", label: "类型"};
							//var cols = [{name: "value1", label: "类1"}, {name: "value", label: "类2"}];
							var row = null;
							var cols = null;
							this.charts.forEach(item => {
								if(item.type === type) {
									row = item.row;
									cols = item.cols;
								}
							});
							
							var opt = mergeChartOption(type, row, cols, data);
							if(type == "pie") {
								option = {
							            tooltip : {
									        trigger: 'axis'
									    },
							            legend: opt.legend,
							            series: opt.series
							        };
							} else {
								option = {
						            tooltip : {
								        trigger: 'axis'
								    },
						            legend: opt.legend,
						            xAxis: opt.xAxis,
						            yAxis: {},
						            series: opt.series
						        };
							}
							
							chart.setOption(option);
						}
					},
					$init: {
						type: Function,
						default: function(vm) {
							var limit = vm.$getLimit();
							var searchMap = vm.$getModel();
							limit.searchMap = searchMap;
							vm.$queryList(limit);
						}
					},
					$removeFilter: {
						type: Function,
						default: function(name) {
							this.$resetPage();
							this.$handleRemove(name, this.model, this.paramCache.params, this);
							this.$searchAction(this);
						}
					},
					$editAction: {
						type: Function,
						default: function() {
							this.status.searched = false;
							this.status.showCondition = false;
						}
					},
					$clearAction: {
						type: Function,
						default: function() {
							this.$editAction();
							this.status.expand = false;
							var vm = this;
							Object.keys(this.model).map(name => {
								vm.$handleRemove(name, vm.model, vm.paramCache.params, vm);
							});
						}
					},
					$resetAction: {
						type: Function,
						default: function() {
							this.$resetInput(this.model, this);
							this.$editAction();
						}
					},
				},
				data: function() {
					return {
						vm: null,
						nameMap: {},
						quickSearchName: tableOption.quickSearchName,
						url: tableOption.url,
						model: $.extend(true, {}, tableOption.model),
						quickSearchModel: {},
						rules: {},
						labels: [],
						tree: treeOption,
						table: {
							data: [],
							rowButtons: tableOption.rowButtons, //行按钮配置信息
							operateButtons: tableOption.operateButtons
						},
						paramCache: {
							lastParams: null,
							lastQuichSearchParams: null,
							params: null
						},
						status: {
							loadingtable: false,
							custom: 'custom',
							trigger: null, // 触发查询的方式, 'action', 'size', 'page'
							expand: false,
							searched: false,
							showCondition: false,
							searching: false,
							pivotType: "table"
						},
						order: {
							orderDir: null,
							orderKey: null
						},
						pagination: {
							enable: true,
							size: 15,
							page: 1,
							sizeOpts: [15, 25, 50, 100],
							total: 0
						}
					}
				},
				computed: {
					tabText: function() {
						var expand = this.status.expand;
						//return expand ? "收缩滤选" : "展开滤选";
						return expand ? "收缩条件" : "更多条件";
					}
				},
				methods: (function() {
					return Object.assign({
						$queryList: function(params) {
							var that = this;
							that.status.loadingtable = true;
							return $.post(this.url, this.$handleParams(params, this)).done(function(resp, ts, xhr) {
								if(resp.success !== false)
									that.$handleResponse(resp);
							}).fail(function(xhr, ts, err) {
								var typeNum = Math.floor(xhr.status / 100);
								if(typeNum === 4) { //客户端/请求错误
									that.$message.error(xhr.responseJSON.status +","+xhr.responseJSON.message || "请求数据失败，请请重试！");
								} else if(typeNum === 5) { //服务器错误
									that.$message.error(xhr.responseJSON.status +","+xhr.responseJSON.message || "系统错误，请联系管理员！");
								} else { 
									console.error("未知类型，待实现");
								}
							}).complete(function(xhr, ts) {
								that.status.searching = false;
								that.status.loadingtable = false;
								that = null;
							});
						},
						$pageChange: function(page) {
							this.pagination.page = page;
							if(this.status.searching == false)
								this.$limitChange();
						},
						$sizeChange: function(size) {
							this.pagination.size = size;
							this.$limitChange();
						},
						$sortChange: function({column, prop, order}) {
							var sortMap = {ascending: "asc", descending: "desc"};
							if(column) {
								this.order.orderKey = column.dbcolumn;
								this.order.orderDir = sortMap[order];
							} else {
								this.order.orderKey = null;
								this.order.orderDir = null;
							}
							this.$limitChange();
						},
						$limitChange: function() {
							var params = $.extend(true, {}, this.paramCache.params);
							var limit = this.$getLimit();
							return this.$queryList(Object.assign(params, limit));
						},
						$searchAction: function(vm) {
							var vm = this;
							this.$resetPage();
							var limit = this.$getLimit();
							var searchMap = this.$getModel();
							limit.searchMap = searchMap ? searchMap : {};
							this.paramCache.params = limit;
							return this.$queryList(limit).done(function() {
								vm.labels = vm.$formatText(vm.model,vm.nameMap);
							}).done(function() {
								vm.status.searched = false;
								vm.status.expand = false;
								if(searchMap) {
									var keys = Object.keys(searchMap);
									for(var i = 0; i < keys.length; i++) {
										if(searchMap[keys[i]]) {
											vm.status.searched = true;
											vm.status.expand = true
											break;
										}
									}
								};
							});
						},
						$quichSearchAction: function() {
							this.$resetPage();
							var vm = this;
							var limit = this.$getLimit();
							var searchMap = this.$getModel();
							limit.searchMap = {};
							limit.searchMap[this.quickSearchName] = searchMap[this.quickSearchName];
							this.paramCache.params = limit;
							return this.$queryList(limit);
						},
						$handleTabClick: function() {
							if(this.status.expand) {
								if(this.status.searched)
									this.status.showCondition = !this.status.showCondition;
								else {
									this.status.expand = false;
								}
							} else {
								this.status.expand = true;
							}
						},
						$resetPage: function() {
							this.status.searching = true;
							this.pagination.page = 1;
						},
						$handleResponse: function(resp) {
							this.table.data = resp.data;
							this.pagination.total = resp.recordsTotal;
						},
						$getParam: function() {
							return null;
						},
						$getModel: function() {
							return $.extend(true, {}, this.model);
						},
						$getLastModel: function() {
						},
						$getQuichSearchModel: function() {
						},
						$getLastQuickSearchModel: function() {
						},
						$getLimit: function() { //start, length, order
							return {
								start: (this.pagination.page - 1) * this.pagination.size,
								length: this.pagination.size,
								orderKey: this.order.orderKey,
								orderDir: this.order.orderDir
							};
						},
						$pivotChange: function(pivotType) {
							if(pivotType != 'table') {
								var dom = this.$el.querySelector(".pivot_chart_zone");
								this.$handleChart(dom, pivotType, this.table.data, {
										params: this.paramCache.params, 
										url: this.url,
									},
									this
								);
							}
						},
						$getColumns: function() {
							var map = {};
							this.$refs.table.columns.map(column => {
								if(column.type === "default") {
									if(column.property && column.label) {
										map[column.property] = column.label;
									}
								}
							});
							return map;
						},
						$getSelectionsOfCurrPage: function() {
				            return this.$refs.table.store.states.selection;
				        },
				        $reload: function() {
				        	var vm = this;
							var limit = this.$getLimit();
							var searchMap = this.$getModel();
							limit.searchMap = searchMap ? searchMap : {};
							this.paramCache.params = limit;
							return this.$queryList(limit);
				        }
					},methods);
				})(),
				created: function() {
					this.vm =this;
					//如果有构建模版方法，使用构建方法生成模版
					if(typeof this.$buildTemplate === "function")
						this.$options.template = this.$buildTemplate(template);
					else
						this.$options.template = template.template;
				},
				mounted: function() {
					this.$init(this);
					this.$nextTick(() => {
						if(this.$refs.layoutLeftScroll) {
					    	 let leftLimitHeight = document.body.offsetHeight - (60 + 46 + 23);
						     this.$refs.layoutLeftScroll.$el.children[0].style.height = leftLimitHeight + 'px';
					     }
					})
					
					if(this.$refs.table_filter_form.$el) {
						this.$refs.table_filter_form.$el.onkeyup = function(event) {
							if(event.keyCode === 13) {
								vm.$searchAction$();
							}
						}
					}
					
					if(this.$refs.quickText && this.$refs.quickText.$el) {
						this.$refs.quickText.$el.onkeyup = function(event) {
							if(event.keyCode === 13) {
								vm.$quickSearchAction$(event);
							}
						}
						
						this.$refs.quickText.$el.onkeydown = function(event) {
							if(event.keyCode === 13) {
								return false;
							}
						}
					}
				}
			};
			return option;
		})(template, tableOption, treeOption);
	};
	
	window.mergeTableOption = mergeTableOption;
	
	/**
	 * 创建表格顶部按钮组件
	 * */
	(function() {
		function createDropItems(createElement, context, btnOpts) {
			var dropMenu = btnOpts.map((item, index, arr) => {
				return createElement("el-dropdown-item", {
					"nativeOn": {
						click: function($event) {
							item.func.call(context);
						}
					}
				}, [item.name])
			});
			
			var dropWrapper = createElement("el-form-grid", [createElement("el-dropdown", {
				props: {
					"trigger": "click",
					"menu-align": "end"
				}
			}, [createElement("el-button",{
				props: {
					"type": "primary"
				}
			}, ["更多菜单", createElement("i", {"class": "el-icon-caret-bottom el-icon--right"})]) /*更多*/, 
				createElement("el-dropdown-menu", {
					"slot": "dropdown"
				}, dropMenu) /*下拉选项*/
			])]);
			
			return dropWrapper;
		}
		
		
		Vue.component("nns-table-operate-button", {
			props: {
				"context": {
					type: Object,
					default: function() {
						return new Object();
					}
				},
				"buttons": Array
			},
			render: function(createElement) {
				var PRENUM = 5;
				//var context = this;
				var parentContext = this.context;
				//筛选出被授权的按钮
				var btns = this.buttons.filter(x => {
					return isAuthorize(x.auth, x.code);
				});
				
				var content = [];
				
				content = btns.slice(0,PRENUM).map(x => {
					return createElement("el-form-grid", [createElement("el-button", {
						props: {
							"type": "primary"
						},
						class: "mb-sm",
						nativeOn: {
							click: function($event) {
								x.func.call(parentContext);
							}
						}
					}, [createElement("i", {
						"class": x.icon
					}), x.name])]);
				})
				
				var others = btns.slice(PRENUM);
				content = content.concat([" "]);
				content = content.concat(
					others.length > 0 
						? createDropItems(createElement, parentContext, btns.slice(PRENUM), {label:"更多菜单"})
						: []
				)
				return createElement("div",{class: 'template-table-buttons'}, content);
			}
		})
		
		
	})();
	
	/**
	 * 创建表格行操作按钮组件
	 * */
	(function() {
		function createDropItems(createElement, context, btnOpts,prop) {
			var dropMenu = btnOpts.map((item, index, arr) => {
				return createElement("el-dropdown-item", {
					"nativeOn": {
						click: function($event) {
							item.func.call(context,prop);
						}
					}
				}, [item.name])
			});
			
			var dropWrapper = createElement("el-dropdown", {
				props: {
					"trigger": "click",
					"menu-align": "end"
				}
			}, [createElement("span",{
				"class": "el-dropdown-link"
			}, ["更多", createElement("i", {"class": "el-icon-caret-bottom el-icon--right"})]) /*更多*/, 
				createElement("el-dropdown-menu", {
					"slot": "dropdown"
				}, dropMenu) /*下拉选项*/
			]);
			
			return dropWrapper;
		}
		
		function createBtns(createElement, context, btnOpts, prop) {
			return btnOpts.map(x => createElement("el-button", {
				props: {
					"type": "text" //按钮类型： text
				},
				domProps: {
					"innerHTML": x.name //按钮名称
				},
				on: {
					click: function() {
						return x.func.call(context,prop)
					} || function(){}
				}
			}));
		}
		
		Vue.component("nns-table-column-operate-button", {
			props: {
				"prop": {
					type: Object,
					default: function() {
						return new Object();
					}
				},
				"context": Object,
				"buttons": Array
			},
			render: function(createElement){
				var btns = this.buttons;
				var prop = this.prop;
				var content = this.context;
				
				function compute(expression) {
					if(expression === undefined || expression === null)
						return true;
					if(typeof expression === "string" && expression.trim() === "")
						return true;
					with(Object.assign({}, content, {scope: prop})) {
						return eval(expression);
					}
				}
				
				//筛选出被授权并且允许显示的按钮
				var shown = btns.filter(x => {
					return isAuthorize(x.auth, x.code) && compute(x.visible);
				})
				
				var btnLength = shown.length;
				if(btnLength > 1) {
					if(btnLength === 2) {
						content = createBtns(createElement, content, shown, prop);
						content.splice(1, 0, " | ");
					} else {
						var firstBtn = createBtns(createElement, content, [shown[0]], prop);
						var others = createDropItems(createElement, content, shown.slice(1), prop);
						content = [].concat(firstBtn).concat([" | "]).concat(others);
					}
				} else {
					content = createBtns(createElement, content, shown, prop);
				}
				
				var wrapper = createElement("div", {
					"class": "tmp-cell__buttons"
				}, content)
				
				return wrapper;
			}
		})
	})();
	
})