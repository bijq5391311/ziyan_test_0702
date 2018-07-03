define(["ns-tree"], function(_) {
	function createTree(setting, vm) {
		var createElement = vm.$createElement;
		var noop = function() {};
		
		return createElement("ns-tree", {
			staticClass: "template-left-tree",
			props: {
				"node-key": "id",
				"expand-on-click-node": false,
				"highlight-current": true,
				"url": setting.url,
				"defaultExpandAll": setting.expandAll,
				"showCheckbox": setting.showCheckbox,
				"load": function() {
					if(setting.methods.load)
						setting.methods.load.apply(vm, arguments);
				},
				"filterNodeMethod": function() {
					if(setting.methods.filterNodeMethod)
						setting.methods.filterNodeMethod.apply(vm, arguments);
				},
				"beforeAddNode": function() {
					if(setting.methods.beforeAddNode)
						setting.methods.beforeAddNode.apply(vm, arguments);
				},
				"saveNewData": function() {
					if(setting.methods.saveNewData)
						setting.methods.saveNewData.apply(vm, arguments);
				},
				"saveEditData": function() {
					if(setting.methods.saveEditData)
						setting.methods.saveEditData.apply(vm, arguments);
				},
				"beforeDeleteNode": function() {
					if(setting.methods.beforeDeleteNode)
						setting.methods.beforeDeleteNode.apply(vm, arguments);
				},
				"afterDeleteNode":function() {
					if(setting.methods.afterDeleteNode)
						setting.methods.afterDeleteNode.apply(vm, arguments);
				},
				"setCustomIcon": function() {
					if(setting.methods.setCustomIcon)
						setting.methods.setCustomIcon.apply(vm, arguments);
				}
			},
			on: {
				"node-click": function() {
					if(setting.methods.$nodeClick)
						setting.methods.$nodeClick.apply(vm, arguments);
				},
				"check-change": function() {
					if(setting.methods.$checkChange)
						setting.methods.$checkChange.apply(vm, arguments);
				},
				"node-expand": function() {
					if(setting.methods.$nodeExpand)
						setting.methods.$nodeExpand.apply(vm, arguments);
				},
				"node-collapse": function() {
					if(setting.methods.$nodeCollapse)
						setting.methods.$nodeCollapse.apply(vm, arguments);
				},
				"current-change": function() {
					if(setting.methods.$currentChange)
						setting.methods.$currentChange.apply(vm, arguments);
				}
			}
		}, []);
	}
	
	return function(setting) {
		return {
			data: function() {
				return {};
			},
			method: function() {
				return {};
			},
			render: function(vm) {
				var createElement = vm.$createElement;
				return createElement("div", {
					staticClass: "template-layout-left"
				}, [
					createElement("div", {
						staticClass: "template-left-tree"
					}, [createElement("el-scrollbar", {
						props: {
							"wrap-class": "template-layout__scroll"
						}
					}, [createTree(setting, vm)])])
				]);
			}
		}
	}
})