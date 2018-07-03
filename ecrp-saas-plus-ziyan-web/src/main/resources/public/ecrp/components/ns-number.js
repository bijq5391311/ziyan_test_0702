define(["jquery", "vue", "nui"], function ($, Vue, Nui) {

	var $template = `
	<div>
	  <el-form-grid :size="size">
        <el-input type="number"  v-model="paymentStart" class="text-right"></el-input>
        </el-date-picker>
	    </el-form-grid>~
	    <el-form-grid :size="size">
	    <el-input type="number"  v-model="paymentEnd" class="text-right"></el-input>
	    </el-date-picker>
     </el-form-grid>
     </div>
	`;

	Vue.component("ns-number", {
		template: $template,
		props: {
			value:{
				type:Array,
				default:[]
			},
		    size:{
				type:String,
				default:'md'
			}
		},
		data: function () {
			return {
				paymentStart:'',
				paymentEnd: ''
			}
		},
		watch:{
			value:function(val){
				if(val.length==0){
					this.paymentStart = "";
					this.paymentEnd = "";
				}
			},
			paymentStart:function(val){
				this.$emit("input",[val,this.paymentEnd]);
			},
			paymentEnd:function(val){
				this.$emit("input",[this.paymentStart,val]);
			}
		},
		methods:{
			getText(){
				return this.paymentStart + "~" + this.paymentEnd;
			}
		}
	});
});