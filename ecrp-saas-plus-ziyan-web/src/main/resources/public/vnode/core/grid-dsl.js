define(["dsl/core/util"], function(Util) {
	function isBlank(str) {
		if(str === undefined || str === null)
			return true;
		
		return /^\s*$/g.test(str);
	}
//	 "name": "删除",
//     "icon": null,
//     "text": "删除",
//	"auth": null,
//    "code": null,
//    "visible": true,
	function parseButton(buttonDsl) {
		var t = {
			name: buttonDsl.name,
			icon: buttonDsl.icon,
			text: buttonDsl.text,
			func: buttonDsl.func
		}
		
		function createFunc(str) {
			if(isBlank(str))
				return Function("return true;");
			else
				return Function("with(this) {return " + str +"}");
		}
		
		t.visible = createFunc(buttonDsl.visible);
		return t;
	}
	
	/**
	 * 解析dsl
	 * */
	function parse(dsl) {
		if(!dsl) throw new Error("参数dsl错误");
		
		var setting = {};
		
		var columns = dsl.columns.map(function(column) {
			if(column.type === "action") {
				var btns = column.template;
				column.template = btns.filter(function(button) {
					if(AUTH && AUTH[button.auth] === false) {
						return false;
					}
					
					if(CODEACL && CODEACL[button.code] === false) {
						return false;
					}
					
					return true;
				}).map(function(button) {
					return parseButton(button);
				});
			}
			
			return column;
		})
		
		
		setting.table = {
			enable: true,
			url: dsl.url,
			columns: columns,
			methods: {}
		}
		setting.pagination = {
			enable: true,
			size: 15,
			sizeOpts: [15, 25, 50, 100]
		}
		var page = dsl.pagination;
		if(page) {
			if(page.hasOwnProperty("enable")) {
				setting.pagination.enable = page.enable;
			}
			if(page.hasOwnProperty("size")) {
				setting.pagination.size = page.size;
			}
			if(page.hasOwnProperty("sizeOpts")) {
				setting.pagination.sizeOpts = page.sizeOpts;
			}
		}
		
		//表格需要使用分页组件
		setting.table.pagination = setting.pagination;
		
		dsl.methods && dsl.methods.map(function(method) {
			setting.table.methods[method.name] = method.func;
		});
		
		if(dsl.tree && dsl.tree.enable) {
			setting.tree = {
				enable: true,
				url: dsl.tree.url,
				showCheckbox: dsl.tree.showCheckbox,
				expandAll: dsl.tree.expandAll,
				methods: {}
			}
			
			dsl.tree.methods.map(function(method) {
				setting.tree.methods[method.name] = method.func;
			});
		}
		
		
		if(dsl.buttons && dsl.buttons.length) {
			setting.button = {
				enable: true,
				//1. 过滤筛选按钮, 2.编译
				buttons: dsl.buttons.filter(function(button) {
					if(AUTH && AUTH[button.auth] === false) {
						return false;
					}
					
					if(CODEACL && CODEACL[button.code] === false) {
						return false;
					}
					
					return true;
				}).map(function(button) {
					return parseButton(button);
				})
			}
		}
		
		//所有input
		var inputs = Util.merge([], dsl.inputs || []);
		dsl.regions && dsl.regions.map(function(region, index) {
			region.inputs.map(function(input, index) {
				inputs.push(input);
			});
		});
		
		var _model = {};
		inputs.map(function(input) {
			_model[input.name] = input.value;
		})
		
		if(inputs.length > 0) {
			if(inputs[0].type === "text") {
				setting.quickSearch = {
					enable: true,
					inputs: [inputs[0]],
					model: Util.merge(_model, dsl.model || {})
				}
			}
			
			setting.extendForm = {
				enable: false,
				inputs: inputs,
				model: Util.merge(_model, dsl.model || {})
			}
			if(inputs.length > 1 || (inputs.length === 1 && inputs[0].type !== "text")) {
				setting.extendForm.enable = true;
			}
		}
		
		setting.model = Util.merge(_model, dsl.model || {});
		if(dsl.chart && dsl.chart.enable) {
			setting.chart = dsl.chart;
		}
		
		return setting;
	}
	
	return parse;
});