define(["jquery", "vue", "nui","moment"], function ($, Vue, Nui,moment) {

	var $template = `
	<div>
	  <el-form-grid :size="size">
        <el-date-picker :type="dateType" :placeholder="startPlaceholder" v-model="startDate">
        </el-date-picker>
	    </el-form-grid>~
	    <el-form-grid :size="size">
	    <el-date-picker :type="dateType" :placeholder="endPlaceholder" v-model="endDate">
	    </el-date-picker>
     </el-form-grid>
     </div>
	`;

	Vue.component("ns-datetime", {
		template: $template,
		props: {
			value:{
				type:Array,
				default:[]
			},
		    size:{
				type:String,
				default:'md'
			},
			dateType: {
		      type: String,
		      default: 'datetime'
		    },
		    startPlaceholder:{
		      type: String,
		      default: '请输入开始时间'
		    },
		    endPlaceholder:{
			      type: String,
			      default: '请输入结束时间'
			}
		},
		data: function () {
			return {
				startDate:'',
			    endDate: ''
			}
		},
		watch:{
			value:function(val){
				if(val.length==0){
					this.startDate = "";
					this.endDate = "";
				}
			},
			startDate:function(val){
				var endDate_ = this.endDate!=''?moment(this.endDate).format('YYYY-MM-DD HH:mm:ss'):'';
				this.$emit("input",[moment(this.startDate).format('YYYY-MM-DD HH:mm:ss'),endDate_]);
			},
			endDate:function(val){
				var startDate_ = this.endDate!=''?moment(this.startDate).format('YYYY-MM-DD HH:mm:ss'):'';
				this.$emit("input",[startDate_,moment(this.endDate).format('YYYY-MM-DD HH:mm:ss')]);
			}
		},
		methods:{
			getText(){
				var endDate_ = this.endDate!=''?moment(this.endDate).format('YYYY-MM-DD HH:mm:ss'):'';
				var startDate_ = this.endDate!=''?moment(this.startDate).format('YYYY-MM-DD HH:mm:ss'):'';
				return startDate_+"~"+endDate_;
			}
		}
	});
});