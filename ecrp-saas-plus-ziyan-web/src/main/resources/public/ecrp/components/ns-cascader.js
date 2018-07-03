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
		props: {
			url: {
				type: String,
				default: function(){
					return "/base/common/queryGradeInBrand";
				}
			},
		    value: String,
		    placeholder: String,
		    disabled: Boolean,
		    clearable: {
		      type: Boolean,
		      default: true
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
		methods: {
			handleChange(currentVal){
				this.$emit('change', currentVal);
				this.$emit('input', currentVal[1]);
			},
		    handleActiveItemChange(value) {
		      this.$emit('active-item-change', value);
		    },
		    getText(format){
		    	return this.$refs.compCascader.getText(format);
		    },
		    setCurrentValue(val){
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
		    
		
		},
		
		created: function () {
			var _this = this;
			if (this.url) {
				loadOptions(_this, _this.options, _this.url);
			}
		},
		watch: {
			value(val){
				this.setCurrentValue(val);
			}
		}
	});

	// 异步加载下拉数据
	function loadOptions(_this, data, url) {
		$.ajax({
			url: ctx + url,
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
				if(_this.value && _this.value != ""){
					_this.setCurrentValue(_this.value);
				}
			},
			error: function () {
				throw new Error("数据请求出错");
			}
		});
	}
});