define(["dsl/core/form-dsl", "dsl/core/util","dsl/plugins/input-node", "jquery"], function(parse, Util,createInputNode, $) {
	var JSONPath = Util.JSONPath;
	
	var buildInMethods = {
		$validAndSubmit: function(options) {
			var $this = this;
			this.$refs.form.validate(function(state){
				if(state)
					$this.$submit(options);
			})
		},
		
		$submit: function(options) {
			var $this = this;
			function resolver(params) {
				$.ajax({
					url: options && options.url || $this.url,
					data: params,
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
					complete:function(xhr, ts) {
						if(options && options.complete && typeof options.complete === "function") {
						 	options.complete(data, ts, $this);
						 }
					}
				})
			}
		
			var params = $.extend(true,{},this.model);
			
			if(options && options.handleParams && typeof options.handleParams === "function") {
				resolver(options.handleParams(params));
			} else {
				resolver(params);
			}
		},
		
		$resetFields: function() {
			this.$refs.form.resetFields();
		},
		
		$setModel: function(model) {
			if(typeof model !== "object") {
				throw new Error("illegal arguments, 'model' must be object");
			}
			this.$set(this, "model", model);
		},
		
		$getModel: function() {
			return $.extend(true, {}, this.model);
		}
	}
	
	
	function createInputNodes(inputDsls, vm, option) {
		var modelPath = option && option.modelPath || "model";
		var model = JSONPath.getAttr(vm, modelPath);
		return inputDsls.map(function(dsl) {
			return createInputNode(dsl, vm, model, option);
		});
	}
	
	function createSimpleFormBuilder(setting, option) {
		//var model = JSONPath.getAttr(vm, "model");
		//<el-form ref="form" placement="right" label-width="120px" :model="model" :rules="rules">
		var inputDsls = [];
		setting.regions.map(function(region) {
			inputDsls = inputDsls.concat(region.inputs);
		});
		
		return function(vm) {
			var createElement = vm.$createElement;
			var inputNodes = createInputNodes(inputDsls, vm, option);
			return createElement("el-form", {
				props: {
					placement: "right",
					"label-width": "120px",
					model: vm.model,
					rules: vm.rules
				},
				ref: "form"
			}, inputNodes);
		}
	}
	
	function createRules(vm, rules) {
		var _rules = {};
		Object.keys(rules).map(function(key) {
			 _rules[key] = rules[key].map(function(rule) {
				if(rule.hasOwnProperty("validator")) {
					var fc = rule.validator;
					var f = function() {
						return fc.apply(vm, Array.from(arguments).concat(vm));
					}
					rule.validator = f;
				}
				return rule;
			})
		})
		
		return _rules;
	}
	
	return function(dsl, option) {
		var setting = parse(dsl);
		//当且仅当配置option.simple=false才使用多区域表单配置
		var simple = !(option && option.simple === false);
		var builder = createSimpleFormBuilder(setting, option);
		var model = setting.model;
		var rules = setting.rules;
		var methods = setting.methods;
		
		if(simple) {
			return {
				mixins: [{methods: buildInMethods}],
				data: function() {
					return {
						model: model,
						rules: createRules(this, rules)
					};
				},
				render: function() {
					return builder(this);
				},
				methods: methods,
				directives: {
					"input-node": {
						bind: function(el,binding, vnode, oldvnode) {
							delete vnode._dsl;
							delete vnode._vm;
						}
					}
				}
			};
		} else {
			
			var components = {};
			setting.regions.map(function(region) {
				components[region.name] = {
					render: function() {
						var vm = this.$vnode.context;
						var createElement = vm.$createElement;
						return createElement("div",{}, createInputNodes(region.inputs, vm, option))
					}
				}
			})
			
			return {
				data: function() {
					return {
						model: model,
						rules: createRules(this, rules)
					}
				},
				methods: methods,
				directives: {
					"input-node": {
						bind: function(el,binding, vnode, oldvnode) {
							delete vnode._dsl;
							delete vnode._vm;
						}
					}
				},
				components: components
			}
		}
		
	}
})