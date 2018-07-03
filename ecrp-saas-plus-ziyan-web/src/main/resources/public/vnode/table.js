define(["vue", "nui", "dsl/core/grid-dsl", "dsl/plugins/table2", "dsl/core/util", "dsl/plugins/button", "dsl/plugins/quick-search", "dsl/plugins/extend-form", "dsl/plugins/top-bar", "dsl/plugins/tree", "dsl/plugins/chart"], 
		function(Vue, Nui, toSetting, createTable, Util, createButton, createQuickSearch, createExtendForm, createTopBar, createTree, createChart) {	
	/**
	 * 
	 * */
	function detected(setting) {
		if(!setting.table)
			throw new Error("找不到table的配置");
		
		var pluginMap = {};
		pluginMap.table = genTableOption(setting.table);
		
		var topBarOption = genTableTopBarOption(setting.button, setting.quickSearch, setting.extendForm, setting);
		if(topBarOption)
			pluginMap.topBar = topBarOption;
		
		var treeOption = genTreeOption(setting.tree);
		if(setting.tree && setting.tree.enable && treeOption) 
			pluginMap.tree = treeOption;
		
		if(setting.chart && setting.chart.enable) 
			pluginMap.chart = genChartOption(setting.chart);
		
		return pluginMap;
	}
	
	function genTableOption(setting) {
		return createTable(setting)
	}
	
	function genTableTopBarOption(buttonSetting, quickSearchSetting, extendFormSetting, setting) {
		return createTopBar(createButton(buttonSetting), createQuickSearch(quickSearchSetting), createExtendForm(extendFormSetting), setting);
	}
	
	function genTreeOption(setting) {
		return createTree(setting);
	}
	
	function genChartOption(setting) {
		return createChart(setting);
	}
	
	return function(dsl) {
		var setting = toSetting(dsl);
		var pluginMap = detected(setting);
		
		var dataFcs = []; // data function
		var methodFcs = [];
		Object.keys(pluginMap).map(function(key) {
			var plugin = pluginMap[key];
			if(plugin && plugin.data)
				dataFcs.push(plugin.data);
			if(plugin && plugin.method)
				methodFcs.push(plugin.method);
		});
		
		//创建数据，合并数据
		var data = function() {
			var _data = {
				form: {
					inputNodeMap: {},
					dslMap: {}
				}
			};
			dataFcs.map(function(dataFc) {
				_data = Util.merge(_data, dataFc())
			});
			return _data;
		}
		
		//合并方法
		var methods = {};
		methodFcs.map(function(methodFc) {
			methods = Util.merge(methods, methodFc());
		})
		
		var enableTree = false;
		if(pluginMap.tree) {
			enableTree = true;
		}
		
		var renderMainZone = function(vm) {
			return [pluginMap.table.render(vm)];
		};
		
		if(setting.chart && setting.chart.enable) {
			renderMainZone = function(vm) {
				var createElement = vm.$createElement;
				return [
					createElement("div", {
						directives: [{
							name: "show",
							value: vm.status.chartType === "table"
						}]
					}, [pluginMap.table.render(vm)]),
					createElement("div", {
						directives: [{
							name: "show",
							value: vm.status.chartType !== "table"
						}]
					}, [pluginMap.chart.render(vm)])
				]
			}
		}
		
		var render = function(createElement) {
			var content = [createElement("div", {
				staticClass: "template-layout-right"
			}, [
				pluginMap.topBar.render(this),
				createElement("div", {}, renderMainZone(this))
			])];
			
			if(enableTree)
				content.unshift(pluginMap.tree.render(this));
			
			return createElement("div", {
				staticClass: "template-layout"
			}, content);
		};
		
		return {
			data: data,
			methods: methods,
			render: render,
			directives: {
				"input-node": {
					bind: function(el, binding, vnode, oldvnode) {
						var vm = vnode._vm;
						var dsl = vnode._dsl;
						delete vnode._vm;
						delete vnode._dsl;
						vm.form.inputNodeMap[dsl.name] = vnode;
						vm.form.dslMap[dsl.name] = dsl;
					}
				}
			},
			mounted: function() {
				if(typeof this.$init === "function") {
					this.$init(this);
				} else if(this.options && this.options.$init 
						&& typeof this.options.$init === "function") {
					this.options.$init(this);
				} else {
					this.$reload();
				}
			}
		}
	}
});

