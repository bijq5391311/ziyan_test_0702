define(["vue", "nui", "dsl/core/util"], function(Vue, Nui, Util) {
	var JSONPath = Util.JSONPath;
	var createElement = null;
	function getDirectModelInfo(model, path) {
		var paths = JSONPath.toPaths(path);
		var name = paths[paths.length - 1];
		return {
			name: paths[paths.length - 1],
			directModel: JSONPath.getAttr(model, paths.slice(0, paths.length - 1))
		}
	}
	
	/*<el-form-item th:label="${label}" th:class = "${class}">
	<el-form-grid size="xmd">
		<el-form-item th:prop = "${name}" >
			<el-input v-showRequired th:type="${type}"
				th:v-model = "${preffix + item.name}" 
				th:placeholder="${item.placeholder}">
			</el-input>
		</el-form-item>
	</el-form-grid>
</el-form-item>*/
	
	function createFormItem(inputDsl, vm, inputNode) {
		var createElement = vm.$createElement;
		var nestedFormItem = createElement("el-form-item", {
			props: {
				prop: inputDsl.name
			},
			attrs: {
				prop: inputDsl.name
			}
		}, [inputNode]);
		
		var formGrid = createElement("el-form-grid", {
			props: {
				size: "xmd"
			}
		}, [nestedFormItem]);
		
		var label = (inputDsl.text) + "：";
		var inline = inputDsl.inline;
		var outsideFormItem = createElement("el-form-item", {
			class: {
				"el-inline-block": inline
			},
			props: {
				label: label
			}
		}, [formGrid]);
		
		return outsideFormItem;
	}
	
	/**
	 * 单行文本框
	 * */
	function createText(dsl, vm, model, option) {
		var createElement = vm.$createElement;
		var subType = dsl.type;
		var placeholder = dsl.placeholder;
		
		var path = dsl.name;
		var directModelInfo = getDirectModelInfo(model, path);
		
		var node = createElement("el-input", {
			props: {
				type: subType,
				placeholder: placeholder
			},
			attrs: {
				placeholder: placeholder
			},
			model: {
				value : (directModelInfo.directModel[directModelInfo.name]),
				callback : function($$v) {
					if(subType === "number")
						$$v = Number($$v);
					Vue.set(directModelInfo.directModel, directModelInfo.name, $$v)
				},
				expression : path
			},
			directives: [{
				name: "input-node"
			}]
		});
		
		node._vm = vm;
		node._dsl = dsl;
		
		return createFormItem(dsl, vm, node);
	}
	
	/**
	 * 密码框
	 */
	function createPassword(dsl, vm, model, option) {
		return createText(dsl, vm, model, option);
	}
	
	/**
	 * 数字
	 */
	function createNumber(dsl, vm, model, option) {
		return createText(dsl, vm, model, option);
	}
	
	/**
	 * 多行文本框
	 */
	function createTextarea(dsl, vm, model, option) {
		return createText(dsl, vm, model, option);
	}
	
	/**
	 * 下拉框 el-select
	 */
	function createElSelect(dsl, vm, model, option) {
		var createElement = vm.$createElement;
		var path = dsl.name;
		var directModelInfo = getDirectModelInfo(model, path);
		var placeholder = dsl.placeholder;
		
		var props = {
			props: {
				filterable: true,
				clearable: true,
				multiple: dsl.control && dsl.control.isMutil,
				url: dsl.control && dsl.control.url
			},
			model: {
				value : (directModelInfo.directModel[directModelInfo.name]),
				callback : function($$v) {
					Vue.set(directModelInfo.directModel, directModelInfo.name, $$v)
				},
				expression : path
			},
			directives: [{
				name: "input-node"
			}]
		};
		
		var node = null;
		if(dsl.control && dsl.control.url && !/^\s*$/g.test(dsl.control && dsl.control.url)) {
			node = createElement("ns-select", props);
		} else {
			node = createElement("el-select", props, [
				createOptions(dsl.control && dsl.control.options, vm, function(createElement, option) {
					return createElement("el-option", {
						props: {
							label: option.k,
							value: option.v
						}
					});
				})
			]);
		}
		
		node._vm = vm;
		node._dsl = dsl;
		
		return createFormItem(dsl, vm, node);
	}
	
	/**
	 * 创建选项
	 */
	function createOptions(options, vm, create) {
		if(!options)
			return [];
		
		var createElement = vm.$createElement;
		function getValue(value) {
			var type = typeof value;
			
			if(type === "number")
				return value;
			
			if(type === "string") {
				if(value.startsWith("#"))
					return Number(value.substr(1));
				else
					return value;
			}
			
			throw new Error("暂不支持"+ type +"类型");
		}
		
		return options.map(option => {
			return create(createElement, {
				k: option.k,
				v: getValue(option.v)
			});
		});
	}
	
	/**
	 * 创建单选
	 */
	function createRadio(dsl, vm, model, option) {
		var createElement = vm.$createElement;
		var path = dsl.name;
		var directModelInfo = getDirectModelInfo(model, path);
		var placeholder = dsl.placeholder;
		
		var props = {
			model: {
				value : (directModelInfo.directModel[directModelInfo.name]),
				callback : function($$v) {
					Vue.set(directModelInfo.directModel, directModelInfo.name, $$v)
				},
				expression : path
			},
			directives: [{
				name: "input-node"
			}]
		};
		
		var node = null;
		node = createElement("el-radio-group", props, [
			createOptions(dsl.control.options, vm, function(createElement, option) {
				return createElement("el-radio", {
					props: {
						label: option.v
					}
				}, [option.k]);
			})
		]);
		
		node._vm = vm;
		node._dsl = dsl;
		
		return createFormItem(dsl, vm, node);
	}
	
	/**
	 * 创建日期时间
	 */
	function createDatetime(dsl, vm, model, option) {
		//使用带范围的时间控件
		if(dsl && dsl.control && dsl.control.isRange) 
			return createDatetimeRange(dsl, vm, model, option);
		
		var createElement = vm.$createElement;
		var subType = dsl.type;
		var placeholder = dsl.placeholder;
		
		var path = dsl.name;
		var directModelInfo = getDirectModelInfo(model, path);
		
		var node = createElement("el-date-picker", {
			props: {
				type: subType,
				placeholder: placeholder
			},
			attrs: {
				placeholder: placeholder
			},
			model: {
				value : (directModelInfo.directModel[directModelInfo.name]),
				callback : function($$v) {
					var value = $$v;
					if(value instanceof Date) {
						if(subType === "datetime")
							value = value.format("yyyy-MM-dd hh:mm:ss");
						else if(subType === "date")
							value = value.format("yyyy-MM-dd");
					}
					Vue.set(directModelInfo.directModel, directModelInfo.name, value)
				},
				expression : path
			},
			directives: [{
				name: "input-node"
			}]
		});
		
		node._vm = vm;
		node._dsl = vm;
		
		return createFormItem(dsl, vm, node);
	}
	
	/**
	 * 创建范围日期时间
	 */
	function createDatetimeRange(dsl, vm, model, option) {
		var createElement = vm.$createElement;
		var subType = dsl.type;
		var placeholder = dsl.placeholder;
		
		var path = dsl.name;
		var directModelInfo = getDirectModelInfo(model, path);
		
		var node = createElement("el-date-picker", {
			props: {
				type: subType + "range",
				placeholder: placeholder
			},
			attrs: {
				placeholder: placeholder
			},
			model: {
				value : (directModelInfo.directModel[directModelInfo.name]),
				callback : function($$v) {
					//var value = $$v;
					function toString(value) {
						if(value instanceof Date) {
							if(subType === "datetime")
								value = value.format("yyyy-MM-dd hh:mm:ss");
							else if(subType === "date")
								value = value.format("yyyy-MM-dd");
						}
						
						return value;
					}
					var value = [];
					if($$v instanceof Array) {
						value = $$v.map(function(item) {
							return toString(item);
						})
					}
					
					Vue.set(directModelInfo.directModel, directModelInfo.name, value)
				},
				expression : path
			},
			directives: [{
				name: "input-node"
			}]
		});
		
		node._vm = vm;
		node._dsl = vm;
		
		return createFormItem(dsl, vm, node);
	}
	
	/**
	 * 创建时间
	 */
	function createDate(dsl, vm, model, option) {
		return createDatetime(dsl, vm, model, option);
	}
	
	/**
	 * 创建隐藏文本
	 */
	function createHidden(dsl, vm, model, option) {
		var createElement = vm.$createElement;
		var path = dsl.name;
		var directModelInfo = getDirectModelInfo(model, path);
		var node = createElement("input", {
			directives: [{
				name: "model",
				value: (directModelInfo.directModel[directModelInfo.name])
			}],
			attrs: {
				type: "hidden"
			},
			domProps: {
				value: (directModelInfo.directModel[directModelInfo.name])
			},
			on: {
				"input":function($event){
					if($event.target.composing)
						return;
					directModelInfo.directModel[directModelInfo.name]=$event.target.value
				}
			},
			model: {
				value : (directModelInfo.directModel[directModelInfo.name]),
				callback : function($$v) {
					Vue.set(directModelInfo.directModel, directModelInfo.name, $$v)
				},
				expression : path
			},
			directives: [{
				name: "input-node"
			}]
		});
		
		node._vm = vm;
		node._dsl = dsl;
		
		return node;
	}
	
	/**
	 * 自定义
	 * {
	 * 	type: "custom",
	 * 	template: "<div>{{ 1 + 1 }} .... </div>" //规定: template仅且有且一个根
	 * }
	 */
	function createCustom(dsl, vm, model, option) {
		var template = dsl.template;
		
		var craeteFunc = Vue.compile(template, undefined, vm).render;
		var node = craeteFunc.call(vm);
		
		if(node.componentInstance) {
			vm.form.inputNodeMap[dsl.name] = node.componentInstance;
		}
		
		node._vm = vm;
		node._dsl = dsl;
		
		return node;
	}
	
	var typeMap = {
		"text": createText,
		"password": createPassword,
		"textarea": createTextarea,
		"droplist": createElSelect,
		"radio": createRadio,
		"date": createDate,
		"datetime": createDatetime,
		"hidden": createHidden,
		"number": createNumber,
		"custom": createCustom
	}
	
	return function(dsl, vm, model, option) {
		var _dsl = dsl;
		if(option && option.placeholder === "remove")
			_dsl = Util.merge(dsl, {placeholder: ""});
		var type = dsl.type;
		return (typeMap[type])(_dsl, vm, model, option);
	}
});