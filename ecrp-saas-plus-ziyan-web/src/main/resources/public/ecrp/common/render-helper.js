/**
 * 
 */
define([], function(){
	var helper = {};
	/**
	 * @param Array[Object] | Object
	 * 			-type dsl类型(form|table)
	 * 			-code dsl编码
	 * 			-subffix 组件后缀
	 * 			-dep 组件依赖
	 * @param opts 参数同异步组件的参数 https://cn.vuejs.org/v2/guide/components.html#异步组件
	 * @param resolver
	 * */
	function loadComponent(args, opts, resolver) {
		var sb = "";
		var compNameArr = [];
		if(Array.isArray(args)) {
			var codeArr = [];
			var subffixArr = [];
			var depArr = [];
			args.map(x=> {
				x.code ? codeArr.push(x.code) : codeArr.push("");
				x.subffix ? subffixArr.push(x.subffix) : subffixArr.push("");
				x.dep ? depArr.push(x.dep) : depArr.push("");
				var compName = x.type === "table" ? `ns-designer-table-${x.subffix}` : `ns-designer-form-${x.subffix}`;
				compNameArr.push(compName);
			})
			var codeStr = codeArr.join("$");
			var subffixStr = subffixArr.join("$");
			var depStr = depArr.join("$");
			sb = `code=${codeStr}&subffix=${subffixStr}&dep=${depStr}`;
		} else if(typeof args === "object") {
			var x = {};
			x.code = args.code ? args.push(args.code) : args.push("");
			x.subffix =  args.subffix ? args.push(args.subffix) : args.push("");
			x.dep = args.dep ? args.push(args.dep) : args.push(" ");
			sb = `code=${x.code}&subffix=${x.subffix}&dep=${x.dep}`;
			var compName = x.type === "table" ? `ns-designer-table-${x.subffix}` : `ns-designer-form-${x.subffix}`;
			compNameArr = [compName];
		} else {
			throw new Error("illegal arguments exception");
		}
		
		require(["/base/designer/renderTemplate?"+sb], function() {
			require(compNameArr,function(){
				resolver(opts);
			})
		})
	} 
	helper.loadComponent = loadComponent;
	
	return helper;
})