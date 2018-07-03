/**
 * 下拉组件二次封装
 *
 * @author Adolph
 */
define(["jquery", "vue", "nui"], function ($, Vue, Nui) {

	var template = `
		<el-select v-model="currentValue" ref="nsselect"
					:placeholder="placeholder" 
					:size="size" 
					:disabled="disabled" 
					:multiple="multiple" 
					:multiple-limit="multipleLimit"
					:filterable="filterable"
					:clearable="clearable"
				   v-on:change="changeHandle" v-on:visible-change="visibleChangeHandle">
			<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
	  	</el-select>
	`;

	Vue.component("ns-select", {
		template: template,
		data: function () {
			return {
				options: [],
				// 双向绑定值-必须
				currentValue: this.value
			}
		},
		props: {
			url: {
				type: String,
				default: ""
			},
			value: {},
			multiple: {
				type: Boolean,
				default: function () {
					return false;
				}
			},
			clearable: {
				type: Boolean,
				default: function () {
					return false;
				}
			},
			multipleLimit: {
				type: Number,
				default: function () {
					return 0;
				}
			},
			name: String,
			placeholder: String,
			filterable: {
				type: Boolean,
				default: false
			},
			size: {
				type: String,
				default: ""
			},
			disabled: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			/**
			 * 选中值发生变化时触发
			 * @param val
			 */
			changeHandle: function (val) {
				this.$emit("change", val);
			},
			/**
			 * 下拉框出现/隐藏时触发
			 * @param val
			 */
			visibleChangeHandle: function (val) {
				this.$emit("visible-change", val);
			},
		    getText(format){
		    	return this.$refs.nsselect.getText(format);
		    },
			refresh(){
				var _this = this;
				if (this.url) {
					loadOptions(_this, _this.options, _this.url);
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
			currentValue: function (val) {
				this.$emit('input', val);
			},
			value: function (val) {
				this.currentValue = val;
			}
		}
	});

	// 异步加载下拉数据
	function loadOptions(_this, data, url) {
		data.splice(0);
		$.ajax({
			url: ctx + url,
			async: true,
			success: function (json) {
				var items = json.result;
				if (Array.isArray(items)) {
					var option = {};
					for (var i = 0; i < items.length; i++) {
						var optionItem = items[i];
						if ((optionItem instanceof Object) && optionItem.hasOwnProperty("k") && optionItem.hasOwnProperty("v")) {
							option = {};
							option.value = String(optionItem.v);
							option.label = String(optionItem.k);
							data.push(option);
						} else {
							continue;
						}
					}
					_this.currentValue = _this.value;
				} else {
					throw new Error("数据类型不匹配");
				}
			},
			error: function () {
				throw new Error("数据请求出错");
			}
		});
	}
});
