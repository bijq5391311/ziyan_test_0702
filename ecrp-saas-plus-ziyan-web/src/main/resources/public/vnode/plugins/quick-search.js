define(["vue", "nui", "dsl/core/util"], function(Vue, Nui, Util) {
	/**
	 * 
	 **/
	var JSONPath = Util.JSONPath;
	
	function getDirectModelInfo(model, path) {
		var paths = JSONPath.toPaths(path);
		var name = paths[paths.length - 1];
		return {
			name: paths[paths.length - 1],
			directModel: JSONPath.getAttr(model, paths.slice(0, paths.length - 1))
		}
	}
	
	/**
	 * 筛选出成为快速搜索的输入项
	 */
	function filter(inputs) {
		return inputs.filter(function(item, index) {
			return index === 0 && item.type === "text";
		});
	}
	
	function create(inputs, vm) {
		var createElement = vm.$createElement;
		return inputs.map(input => {
			return createTextWithSearch(input, vm, vm.model);
		});
	}
	
	/*<el-form-item v-show="status.expand === false">
		<el-input th:v-model="${'model.'+input.name}" th:placeholder="${input.placeholder}"  
			th:name=${input.name}
			icon="search"
			:on-icon-click="$quichSearchAction"
		></el-input>
	</el-form-item>*/
	function createTextWithSearch(input, vm, model) {
		var createElement = vm.$createElement;
		var path = input.name;
		var directModelInfo = getDirectModelInfo(model, path);
		
		var placeholder = input.placeholder;
		
		var input = createElement("el-input", {
			model: {
				value : (directModelInfo.directModel[directModelInfo.name]),
				callback : function($$v) {
					Vue.set(directModelInfo.directModel, directModelInfo.name, $$v)
				},
				expression : path
			},
			props: {
				placeholder: placeholder,
				icon: "search",
				"on-icon-click": function() {
					var model = {};
					model[directModelInfo.name] = vm.model[directModelInfo.name];
					vm.$queryList(Object.assign({searchMap: model}, vm.$getOtherParams()));
				}
			},
			directives: [{
				name: "show",
				value: !vm.status.expand
			}]
		});
		
		return createElement("el-form-item", {}, [input]);
	}
	
	return function(setting) {
		if(setting) {
			return {
				data: function() {
					return {};
				},
				method: function() {
					return {};
				},
				render: function(vm) {
					return create(setting.inputs, vm);
				}
			}
		} else {
			return {
				data: function() {return {}},
				method: function() {return {}},
				render: function() {return null}
			}
		}
		
	};
}); 