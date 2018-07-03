define(["dsl/plugins/input-node", "dsl/core/util"], function(createInputNode, Util) {
	
	function createInputNodeFunc(setting) {
		return function(vm) {
			return setting.inputs.map(function(dsl) {
				return createInputNode(dsl, vm, vm.model, {placeholder: "remove"});
			})
		}
	}
	
	function createForm(vm, inputNodes) {
		var createElement = vm.$createElement;
		return createElement("el-form", {
			props: {
				inline: true,
				placement: "right",
				"label-width": "90px"
			}
		}, inputNodes);
	}
	
	return function(setting) {
		if(setting && setting.enable) {
			var inputNodeCreateor =  createInputNodeFunc(setting);
			return {
				data: function() {
					return {
						model: Util.merge({}, setting.model || {}),
						originModel: Util.merge({}, setting.model || {}) //用于重置表单使用
					};
				},
				method: function() {
					return {};
				},
				render: function(vm) {
					 return createForm(vm, inputNodeCreateor(vm));
				}				
			}
		} else {
			return {
				data: function() {return {};},
				method: function() {return {};},
				render: function() {return null;}
			}
		}
		
	}
});