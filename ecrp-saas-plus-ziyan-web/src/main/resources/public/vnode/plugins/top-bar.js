define(["vue", "nui", "dsl/core/util"], function(Vue, Nui, Util) {
	/**
	 * 创建按钮，快速搜索栏
	 */
	function createRowBar(vm, buttonNodes/*array<vnode>*/, quickSearchNode/*vnode*/, chartRadioNode, showExpandButton, option) {
		var createElement = vm.$createElement;
		
		var btnCol = createElement("el-col", {
			props: {
				span: 16
			},
			staticClass: "template-table-buttons"
		}, [].concat(buttonNodes));
		
		var formItemNodes = [].concat(quickSearchNode);
		if(showExpandButton) {
			formItemNodes = formItemNodes.concat([createElement("el-form-item", {
				
			}, [
				createElement("el-button", {
					props: {
						type: "text"
					},
					on: {
						click: function click($event) {
							expandAction.call(vm, vm);
						}
					}
				}, [(vm.status.expand ? "收缩" : "展开") + "滤选", createElement("i", {
					staticClass: "el-icon--right",
					class: {
						"el-icon-arrow-down": !vm.status.expand,
						"el-icon-arrow-up": vm.status.expand
					}
				})])
			])])
		}
		
		var inputCol = createElement("el-col", {
			props: {
				span: 8
			}
		}, [createElement("el-form", {
			staticClass: "pull-right",
			props: {
				model: vm.model, //TODO 表单model待确定
				inline: true
			}
		}, formItemNodes)]);
		
		return createElement("div", {
			staticClass: "template-table-bar"
		}, [
			createElement("el-row", {
				props: {
					type: "flex"
				}
			}, [btnCol, chartRadioNode, inputCol])
		]);
	}
	
	function isSuccess(resp) {
		if(resp && resp.data instanceof Array) {
			return true;
		} else
			return false;
	}
	
	var chartMap = {
		"pie": {
			name: "饼图",
			class: "bui-biaoge"
		},
		"table": {
			name: "表格",
			class: "bui-biaoge"
		},
		"bar": {
			name: "表格",
			class: "bui-biaoge"
		},
		"line": {
			name: "表格",
			class: "bui-biaoge"
		}
	}
	
//	<el-col v-if="charts" :span="chartTabRatio">
//    <div class="tmp-analysistab-select text-center">
//        <el-radio-group v-model="status.pivotType" @change="$pivotChange">
//          <el-radio-button label="table"><i class="bui-biaoge"></i>表格</el-radio-button>
//          <template v-for="(item, index) in charts">
//          	<el-radio-button :label="item.type"><i :class="chartMap[item.type].class"></i>{{chartMap[item.type].name}}</el-radio-button>
//          </template>
//        </el-radio-group>
//    </div>
//</el-col>
	function createCharTag(vm, setting) {
		var show = setting && setting.chart && setting.chart.enable;
		if(show) {
			var charts = setting.chart.charts;
			var createElement = vm.$createElement;
			var radios = charts.map(function(chart) {
				return createElement("el-radio-button", {
					props: {
						label: chart.type
					}
				}, [createElement("i", {
					staticClass: chartMap[chart.type].class
				}, [chartMap[chart.type].name])])
			})
			
			radios.unshift(createElement("el-radio-button", {
				props: {
					label: "table"
				}
			}, [createElement("i", {
				staticClass: chartMap["table"].class
			}, [chartMap["table"].name])]));
			
			var radioGroup = createElement("el-radio-group", {
				model: {
					value: (vm.status.chartType),
					callback : function($$v) {
						Vue.set(vm.status, "chartType", $$v)
					},
				},
				on: {
					change: function($event) {
						var type = vm.status.chartType;
						if(type !== "table") {
							var el = vm.$el.querySelector(".pivot_chart_zone");
							var chartMap = {};
							charts.map(function(chart) {
								chartMap[chart.type] = chart;
							})
							vm.$handleChartChange(el, type, vm.data, chartMap[type], vm);
						}
					}
				}
			}, radios)
			
			return createElement("el-col", {}, [
				createElement("div", {
					staticClass: "tmp-analysistab-select text-center"
				}, [radioGroup])
			]);
		}
		return null;
	}
	
	
	/**
	 * 创建展开区域
	 */
	function createExpandZoneNode(vm, expandFormNode, conditionNode, option) {
		var createElement = vm.$createElement;
		return createElement("div", {
			staticClass: "template-table-search",
			directives: [{
				name: "show",
				value: (vm.status.expand)
			}]
		}, [
			createExpandFormZoneNode(vm, expandFormNode), 
			createConditionZoneNode(vm, createTextNodes(vm))
		]);
	}
	
	/**
	 * 创建表单区域节点
	 */
	function createExpandFormZoneNode(vm, formNode, option) {
		var createElement = vm.$createElement;
		
		var btnNode = createElement("div", {
			staticClass: "template-table-control"
		}, [
			createElement("el-button", {
				props: {
					type: "primary"
				},
				on: {
					click: function(event) {
						searchAction.call(vm, vm, vm.$queryList, vm.$getOtherParams);
					}
				}
			}, ["搜索"]), 
			createElement("el-button", {
				on: {
					click: function(event) {
						resetAction.call(vm, vm, vm.$queryList, vm.$getOtherParams);
					}
				}
			}, ["重置"])]) ;
		
		return createElement("div", {
			staticClass: "template-table-filter",
			directives: [{
				name: "show",
				value: (!vm.status.showCondition)
			}]
		}, [
			createElement("el-row", {}, [
				createElement("el-col", {
					staticClass: "template-table-plat",
					props: {
						span: 20
					}
				}, [formNode, btnNode])
			])
		]);
	}
	
	/**
	 * 创建条件区域节点
	 */
	function createConditionZoneNode(vm, textNodes, option) {
		var createElement = vm.$createElement;
		var btnNode = createElement("div", {
			staticClass: "control"
		}, [
			createElement("el-button", {
				props: {
					type: "primary"
				},
				on: {
					click: function(event) {
						editAction.call(vm, vm, vm.model);
					}
				}
			}, ["修改"]),
			createElement("el-button", {
				on: {
					click: function(event) {
						clearAction.call(vm, vm, vm.model);
					}
				}
			}, ["清空"])
		])
		
		var content = [createElement("span", {staticClass: "rule-label"}, ["滤选条件："])];
		content = content.concat(textNodes).concat(btnNode);
		
		return createElement("div", {
			staticClass: "template-table-result",
			directives: [{
				name: "show",
				value: (vm.status.showCondition)
			}]
		}, [createElement("div", {
			staticClass: "rule"
		}, content)]);
	}
	
	function createTextNodes(vm) {
		var createElement = vm.$createElement;
		return vm.status.labelText.map(function(item, index) {
			return createElement("el-tag", {
				props: {
					type: "primary",
					closable: true
				},
				on: {
					close: function() {
						removeAction.call(vm, vm, item.name, vm.model);
					}
				}
			}, [item.label, "：", item.text]);
		})
	}
	
	//data 
	function createData(setting) {
		return {
			model: Util.merge({}, setting.model || {}),
			status: {
				showCondition: false,
				expand: false,
				searched: false,
				labelText: [],
				chartType: "table"
			},
			cache: {
				queryParams: null
			}
		}
	}
	
	function resolve(vm, methodName, args, defaultMethod) {
		if(typeof vm[methodName] === "function")
			return vm[methodName].apply(vm, args);
		
		if(vm.hasOwnProperty("options") && typeof vm.options[methodName] === "function")
			return vm.options[methodName].apply(vm, args);
		
		return defaultMethod.apply(vm, args)
	}
	
	//搜索按钮操作
	function searchAction(vm, query, getParams) {
		var model = Util.merge({}, vm.model);
		return resolve(vm, "$searchAction", [vm, query, getParams, model], function(vm, query, getParams, model) {
			return vm.$doSearch(function(vm, query, getParams) {
				var params = getParams();
				params.searchMap = model;
				return query(params);
			})
		}).done(function(resp) {
			var labelText = formatLabelText.call(vm, vm);
			Vue.set(vm.status, "labelText", labelText);
			if(isSuccess(resp)) {
				if(labelText.length > 0) {
					vm.status.expand = true;
					vm.status.searched = true;
				} else { //如果滤选条件为空， 直接收缩展开区域
					vm.status.expand = false;
					vm.status.searched = false;
					vm.status.showCondition = false;
				}
			}
		});
	}
	
	/*
	 * @return array<tag>
	 * tag: {
	 * 	name: name,
	 * 	label: label,
	 * 	text: text
	 * } 
	 * */
	function formatLabelText(vm) {
		var model = vm.model;
		var inputDslMap = vm.form.dslMap;
		var inputInstanceMap = vm.form.inputNodeMap;
		return resolve(vm, "$formatLabelText", [vm, model, inputDslMap, inputInstanceMap], function(vm, model, inputDslMap, inputInstanceMap) {
			var labelText = [];
			Object.keys(model).map(function(name) {
				var o = genLabelText(name, model, inputDslMap, inputInstanceMap);
				if(o)
					labelText.push(o);
			})
			
			return labelText;
		});
	}
	
	function genLabelText(name, model, dslMap, inputNodeMap) {
		var value = model[name];
		if(value === null || value === undefined || /^\s*$/g.test(value))
			return null;
		
		if(value instanceof Array || value.length === 0) 
			return null;
		
		var text = value;
		var vnode = inputNodeMap[name];
		if(vnode && vnode.componentInstance 
				&& typeof vnode.componentInstance.getText === "function")
			text = vnode.componentInstance.getText();
		
		return {
			name: name,
			text: text,
			label: dslMap[name] && dslMap[name].text 
		};
	}
	
	//重置按钮操作
	function resetAction(vm, model) {
		function getOriginModel() {
			return Util.merge({}, vm.originModel);
		}
		
		var result = resolve(vm, "$resetAction", [vm, model, getOriginModel], function(vm, model, getOriginModel) {
			Vue.set(vm, "model", getOriginModel());
			vm.status.searched = false;
			vm.status.showCondition = false;
		});
		
		if(result !== undefined) {
			Vue.set(vm, "model", result);
		}
	}
	
	//编辑按钮操作
	function editAction(vm, model) {		
		resolve(vm, "$editAction", [vm, model], function(vm, model) {
			vm.status.searched = false;
			vm.status.showCondition = false;
		});
	}
	
	//清除按钮操作
	function clearAction(vm, model) {
		resolve(vm, "$clearAction", [vm, model], function(vm, model) {
			Vue.set(vm, "model", Util.merge({}, vm.originModel));
			vm.status.searched = false;
			vm.status.showCondition = false;
		});
	}
	
	//展开按钮操作
	function expandAction(vm) {
		var expand = vm.status.expand;
		var searched = vm.status.searched;
		var showCondition = vm.status.showCondition;
		if(expand) {
			if(searched === true) {
				if(showCondition === false) {
					vm.status.showCondition = true; 
				} else {
					vm.status.showCondition = false;
				}
			} else {
				vm.status.expand = false;
				vm.status.showCondition = false;
				vm.status.searched = false;
			}
		} else {
			vm.status.expand = true;
			vm.status.showCondition = false;
			vm.status.searched = false;
		}
	}
	
	//移除事件操作
	function removeAction(vm, name, model) {
		resolve(vm, "$removeAction", [vm, name, model], function(vm, name, model) {
			vm.model[name] = null;
		});
		searchAction.call(vm, vm, vm.$queryList, vm.$getOtherParams);
	}
	
	return function(buttonOption, quickOption, expandFormOption, setting) {
		var dataFcs = []; // data function
		var methodFcs = [];

		dataFcs.push(buttonOption.data, quickOption.data, expandFormOption.data);
		methodFcs.push(buttonOption.method, quickOption.method, expandFormOption.method)
		
		
		var data = function() {
			var _data = createData(setting);
			
			dataFcs.map(function(dataFc) {
				_data = Util.merge(_data, dataFc())
			});
			return _data;
		}
		
		var methods = {};
		methodFcs.map(function(methodFc) {
			methods = Util.merge(methods, methodFc());
		})
		
		var showExpandButton = setting.extendForm && setting.extendForm.enable || false;
		var render = function(vm) {
			var createElement = vm.$createElement;
			return createElement("div", {}, [
				createRowBar(vm, buttonOption.render(vm), quickOption.render(vm), createCharTag(vm, setting), showExpandButton),
				createExpandZoneNode(vm, expandFormOption.render(vm), []/*滤选条件节点*/)
			]);
		};
		
		return {
			data: function() {
				return data();
			},
			method: function() {
				return methods;
			},
			render: render
		};
	}
});