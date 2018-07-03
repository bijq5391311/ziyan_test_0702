define([], function() {
	/***
	  * 创建表格顶部操作按钮node
	  */
	function createButtonVnode(btns, vm) {
		/**
		 * 创建下拉按钮
		 */
		function createDropButton(btns, vm) {
			var createElement = vm.$createElement;
			var dropItems = btns.map(function (item, index, arr) {
				return createElement("el-dropdown-item", {
					"nativeOn": {
						click: function click($event) {
							var func = item.func || item.action;
							func.call(vm);
						}
					}
				}, [item.name || item.text]);
			});

			var dropWrapper = createElement("el-form-grid", [createElement("el-dropdown", {
				props: {
					"trigger": "click",
					"menu-align": "end"
				}
			}, [createElement("el-button", {
				props: {
					"type": "primary"
				}
			}, ["更多菜单", createElement("i", { "class": "el-icon-caret-bottom el-icon--right" })]) /*更多*/
			, createElement("el-dropdown-menu", {
				"slot": "dropdown"
			}, dropItems) /*下拉选项*/
			])]);

			return dropWrapper;
		}

		//筛选按钮
		function filter(btns) {
			return btns.filter(function(btn) {
				return btn.visible.call(this);
			});
		}

		var availableBtns = filter(btns);
		var createElement = vm.$createElement;

		var content = [];
		var show = 5;
		if (btns.length > 5) show = 4;

		content = availableBtns.slice(0, show).map(function (x) {
			return createElement("el-form-grid", [createElement("el-button", {
				props: {
					"type": "primary"
				},
				class: "mb-sm",
				nativeOn: {
					click: function click($event) {
						var func = x.func || x.action;
						func.call(vm);
					}
				}
			}, [createElement("i", {
				"class": x.icon
			}), x.name || x.text])]);
		});

		var others = availableBtns.slice(show);
		content = content.concat([" "]);
		content = content.concat(others.length > 0 ? createDropButton(others, vm) : []);

		//return createElement("div", { staticClass: 'template-table-buttons' }, content);
		return content;
	};
	
	
	return function(setting) {
		return {
			data: function() {
				return {};
			},
			method: function() {
				return {};
			},
			render: function(vm) {
				if(!setting)
					return [];
				
				if(setting.buttons && setting.buttons.length > 0)
					return createButtonVnode(setting.buttons, vm);
				else 
					return [];
			}
		}
	}
});