/**
 * 级联选择器
 *
 * @author Adolph
 */
define(["jquery", "vue", "nui"], function ($, Vue, Nui) {

	var $template = `
		<el-cascader
		  ref="compCascader"
		  :options="options"
		  :props="defalutProps"
		  v-model="currentValue"
		  :empty-text="emptyText"
		  :placeholder="placeholder"
		  :disabled="disabled"
		  :clearable="clearable"
		  :change-on-select="changeOnSelect"
		  :popper-class="popperClass"
		  :expand-trigger="expandTrigger"
		  :filterable="filterable"
		  :size="size"
		  :show-all-levels="showAllLevels"
		  :debounce="debounce"
		  :before-filter="beforeFilter"
		  @change="handleChange"
		  @active-item-change="handleActiveItemChange"
		></el-cascader>
	`;

	Vue.component("ns-cascader", {
		template: $template,
		data: function () {
			return {
				options: [],
				// 双向绑定值-必须
				currentValue: [],
				defalutProps: {
					children: 'children',
			          label: 'label',
			          value: 'value',
			          disabled: 'disabled'
				},
				emptyText:"暂无数据"
			}
		},
		props: {
			url: {
				type: String,
				default: function(){
					return "/base/common/queryGradeInBrand";
				}
			},
			value: {
				type: String
		      
		    },
		    placeholder: String,
		    disabled: Boolean,
		    clearable: {
		      type: Boolean,
		      default: false
		    },
		    changeOnSelect: Boolean,
		    popperClass: String,
		    expandTrigger: {
		      type: String,
		      default: 'click'
		    },
		    filterable: Boolean,
		    size: String,
		    showAllLevels: {
		      type: Boolean,
		      default: true
		    },
		    debounce: {
		      type: Number,
		      default: 300
		    },
		    beforeFilter: {
		      type: Function,
		      default: () => (() => {})
		    }
		},
		methods: {
			handleChange(currentVal){
				this.$emit('change', currentVal)
			},
		    handleActiveItemChange(value) {
		      this.$emit('active-item-change', value);
		    },
		    getText(format){
		    	return this.$refs.compCascader.getText(format);
		    }
		
		},
		created: function () {
			var _this = this;
			if (this.url) {
				loadOptions(_this, _this.options, _this.url);
			}
		},
		watch: {
			currentValue: function (val) {
				this.$emit('input', val[1]);
			},
			value: function (val) {
				//this.currentValue = val;
				var hasValue = false;
				for(var i = 0; i < this.options.length ;i++){
					var child = this.options[i].children ? this.options[i].children : []
					for(var j = 0; j < child.length ;j++){
						if(child[j].value == val){
							this.currentValue = [this.options[i].value,val];
							var hasValue = true;
							break;
						}	
					}
				}
				if(!hasValue){
					this.currentValue = [];
				}
			}
		}
	});

	// 异步加载下拉数据
	function loadOptions(_this, data, url) {
		$.ajax({
			url: url,
			async: true,
			success: function (resp) {
				if(resp.success){
					var result = resp.result;
					if (Array.isArray(result)) {
						// 直接返回多个节点
						$.each(result, function (i, val) {
							data.push(val);
						});
					} else {
						throw new Error("数据类型错误");
					}
				}else{
					throw new Error("数据请求出错");
				}	
			},
			error: function () {
				throw new Error("数据请求出错");
			}
		});
	}
});