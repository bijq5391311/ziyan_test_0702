define(['jquery',"vue","nui"],function($,Vue,Nui){
	var template=`
    <el-form-grid>
        <el-row>
        <el-col :span="6">
                 <el-select  :filterable="filterable" ref="province" v-model="province" v-on:visible-change="" placeholder="" >
                    <el-option
                    v-for="item in provinces"
                    :key="item.id"
                    :label="item.label"
                    :value="item.id"
                    >
                    </el-option>
                </el-select>
        </el-col>
            <el-col  :span="1" style="text-align:center" >-</el-col>
        <el-col :span="4">
                <el-select  :filterable="filterable"  ref="city" v-model="city" placeholder="" >
                    <el-option
                    filterable
                    v-for="item in cities"
                    :key="item.id"
                    :label="item.label"
                    :value="item.id">
                    </el-option>
                 </el-select>
            </el-form-item>
        </el-col>
            <el-col  :span="1" style="text-align:center" >-</el-col>
        <el-col :span="4">
            <el-select   :filterable="filterable" ref="district" v-model="district" placeholder="" >
                    <el-option
                    filterable
                    v-for="item in districts"
                    :key="item.id"
                    :label="item.label"
                    :value="item.id">
                    </el-option>
                </el-select>
        </el-col>
        </el-row>
    </el-form-grid>
	`;
	Vue.component("ns-area", {
		template : template,
		props:{
			value:{
				type:Array,
				default:function(){
					return []
				}
			},
      filterable:{
        type: Boolean,
        default:function(){
          return true;
        }
      }
		},
		data:function(){
			return{
				province:'',
				city:'',
				district:'',
				provinces:[],
				cities:[],
				districts:[],
			}
		},
		created:function(){
				var that = this;
			    $.post("/base/common/findArea",{parentId:null})
			    .done((resp) =>{
			        if(resp.result){
			           that.provinces = resp.result;
			        }
			    })
		},
		watch:{
			"value":function(value){
				if(value.length == 0){
					this.province = "";
					this.city = "";
					this.district = "";
				}
			},
			"province":function(value){
		    	 var that = this;
			        if(value != ""){
			         $.post("/base/common/findArea",{parentId:value})
			                    .done((resp) =>{
			                        ResponseUtil.check(resp,that,"",()=>{
			                            that.cities = resp.result;
			                        })
			                    })
			        }
			        this.$emit("input",[value,"",""]);
		    },
		    "city":function(value){
		    	 var that = this;
			        if(value != ""){
			         $.post("/base/common/findArea",{parentId:value})
			                    .done((resp) =>{
			                        ResponseUtil.check(resp,that,"",()=>{
			                            that.districts = resp.result;
			                        })
			                    })
			        }
			        this.$emit("input",[that.province,value,""]);
		    },
		    "district":function(value){
		    	var that = this;
		    	 this.$emit("input",[that.province,that.city,value]);
		    }
		},
		methods : {
			getText:function(){
				if( this.province != '' && this.city !='' && this.district != ''){
					
					return this.$refs.province.getText() + "-" + 
					this.$refs.city.getText() + "-" + this.$refs.district.getText();
				}
			}
			
		},
	})
})
