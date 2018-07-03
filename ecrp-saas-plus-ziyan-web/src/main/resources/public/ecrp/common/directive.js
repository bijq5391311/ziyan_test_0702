require(["vue", "nui"], function(Vue) {

	/**
	 * 权限检查指令
	 * <el-button v-auth auth="/module/controller/action"></el-button>
	 * */
	Vue.directive("auth", {
		bind: function(el,binding,vnode,oldVnode) {
			vnode.componentInstance.$el.classList.add(isAuthorize(el.getAttribute("auth"), el.getAttribute("code")) ? "auth" : "hidden")
		}
	})
	
	
	Vue.directive("showRequired",  {
		update: function(el,binding, vnode, oldVnode) {
			var instance = vnode.componentInstance;
			var input = instance;
			var el_form_item_pre; /** vnode最靠近el-form的el-form-item */
			var el_form_item_near;/** vnode最靠近当前元素的el-form-item */
			
			var nameMap = null;
			if(vnode.context && typeof vnode.context.nameMap === "object") {
				nameMap = vnode.context.nameMap;
			}
			
			while(instance.$parent) {
				instance = instance.$parent;
				if(instance.$options && instance.$options.componentName === "ElFormItem") {
					if(!el_form_item_near) {
						el_form_item_near = instance;
					}
					el_form_item_pre = instance;
				}
				if(instance.$options && instance.$options.componentName === "ElForm") {
					el_form_item_pre.isRequired = el_form_item_near.isRequired; //配置必填图标
					//收集格式化需要的信息 (表格)
					if(nameMap) {
						var expression = vnode.data.model.expression;
						var subffix = "model.";
						if(expression && expression.startsWith(subffix)) {
							var name = expression.substr(subffix.length);
							var text = el_form_item_pre.label;
							text = (text.endsWith("：") || text.endsWith("：")) ? text.substr(0,text.length-1) : text;
							var instance = input;
							
							if(!nameMap[name]) {
								nameMap[name] = {};
							}
							/** 仅用于存放信息，不考虑响应式更新 */
							nameMap[name].text = text;
							nameMap[name].name = name;
							nameMap[name].instance = input;
						}
					}
					
					return ;
				}
			}
		}
	})
})