define([], function() {
	function parse(dsl) {
		var url = dsl.url;
		var model = dsl.model || {};
		var rules = dsl.rules || {};
		var methods = {};
		var buttons = [];
		var regions = [];
		
		dsl.methods && dsl.methods.map(function(method) {
			methods[method.name] = method.func;
		});
		
		regions = dsl.regions || [];
		var _model = {};
		regions.map(function(region) {
			region.inputs.map(function(input) {
				if(input && input.name && input.value !== undefined) {
					_model[input.name] = input.value;
				}
			})
		})
		
		model = Object.assign(_model, model);
		
		return {
			url: url,
			model: model,
			methods: methods,
			buttons: buttons,
			regions: regions,
			rules: rules
		}
	}
	
	return function(dsl) {
		return parse(dsl);
	}
});