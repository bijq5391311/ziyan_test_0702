
define(['jquery',"vue","nui","/public/ecrp/components/business-form-edit.js"],function($,Vue,Nui){
           //交易订单详情组件封装
    var template = `    
	    <el-dialog title="交易详情" v-model="orderDetailDialog" :vetically="true" :modal-append-to-body="false" :close-on-click-modal="false" response-limit>
		    
		     <el-form label-width="110px">
		      <el-row >
		        <el-col :span="12">
		          <el-form-item label="平台编码：" class="">
		            <el-form-grid>{{model.outTradeId}}</el-form-grid>
		          </el-form-item>
		        </el-col>
		        <el-col :span="12">
		          <el-form-item label="客户昵称：" class=" ">
		            <el-form-grid>{{model.outNick==""?"-":model.outNick}}</el-form-grid>
		          </el-form-item>
		        </el-col>
		        <el-col :span="12">
		          <el-form-item label="下单时间：" class=" ">
		          <el-form-grid>{{model.created}}</el-form-grid>
		          </el-form-item>
		        </el-col>
		        <el-col :span="12">
		          <el-form-item label="付款时间：" class="">
		            <el-form-grid>{{model.payTime}} </el-form-grid>
		          </el-form-item>
		        </el-col>
		        <el-col :span="12">
		          <el-form-item label="实付款：" >
		              <el-form-grid>{{model.payment}}</el-form-grid>
		          </el-form-item>
		        </el-col>
		        <el-col :span="12">
		          <el-form-item label="交易状态：" class=" ">
		          <el-form-grid>
		              
		            {{model.tradeStatus}}
					 </el-form-grid> 
					 
		          </el-form-item>
		        </el-col>
		        <el-col :span="12">
		          <el-form-item label="买家备注：" style="margin-bottom: 0;">
		            <el-form-grid>{{model.buyerMessage}}</el-form-grid>
		          </el-form-item>
		        </el-col>
		        
		        
		        <el-col :span="12">
		        <el-form-item label="卖家备注："  style="margin-bottom: 0;">
		        	<template v-if="model.platFromType == 1">
	                  <business-form-edit  @edit-save="editSave" @edeit="edit" @input="input">
		                  <el-form-grid slot="content">{{sellerMemo}}</el-form-grid>
		                  <el-form-grid size="xmd" slot="edit">
		                    <el-input type="text" :value="sellerMemo"></el-input>
		                  </el-form-grid>
	                   </business-form-edit>
	              </template>
	              <template v-else >
		        	 <el-form-grid >{{sellerMemo}}</el-form-grid>
		        	</template>
              </el-form-item>
		       </el-col>
              
		        
		        
		        <el-col :span="24">
		        <el-form-item label="备注旗帜："  class=" ">
		          <el-form-grid>
		            <el-radio-group v-model="model.remarkSign">
		              <el-radio :label="-1">不限</el-radio>
		              <el-radio :label="0"><i class="bui-flag text-gray"></i></el-radio>
		              <el-radio :label="1"><i class="bui-flag text-danger"></i></el-radio>
		              <el-radio :label="2"><i class="bui-flag text-warning"></i></el-radio>
		              <el-radio :label="3"><i class="bui-flag text-success"></i></el-radio>
		              <el-radio :label="4"><i class="bui-flag text-info"></i></el-radio>
		              <el-radio :label="5"><i class="bui-flag text-purple"></i></el-radio>
		            </el-radio-group>
		          </el-form-grid>
		        </el-form-item>
		        </el-col>
		      </el-row>
		      <el-form-item></el-form-item>
		    </el-form>
		   
		    
		    
		    <el-table
            :data="goodsList"
            class="template-table">
            <el-table-column
              align="center"
              label="商品图片"
              width="80">
            <template scope="scope">
			      <template v-if="scope.row.picPath && scope.row.picPath != ''">
			
			      <img :src="scope.row.picPath" width="60" height="60">
					</template>
					<template v-else>
					<img src="#{nui}+'images/defaultImage.gif'"  width="60" height="60"/>
			
			     </template>
            </template>
              
            </el-table-column>
            <el-table-column
              prop="address"
              label="属性">
              <template scope="scope">
                <div>{{scope.row.skuProperties}}</div>
                <div>标题：{{scope.row.title}}</div>
                <div>商家编码：{{scope.row.outId}}</div>
              </template>
            </el-table-column>
            
            <el-table-column
              prop="price"
              align="right"
            	  width="130"
              label="单价">
              <template scope="scope">{{scope.row.price.toFixed(2)}}</template>
            </el-table-column>
            <el-table-column
            prop="ordStatus,"
            	align="center"
            	width="130"
            	label="状态">
            <template scope="scope">
            	<div>{{scope.row.ordStatus}}</div>
            </template>
            </el-table-column>
            <el-table-column
              prop="number"
              align="right"
            	  width="130"
              label="数量">
              <template scope="scope">{{scope.row.number.toFixed(3)}}</template>
            </el-table-column>

          </el-table>
		    
		    
		    <div slot="footer" class="dialog-footer">
		      <el-button @click="orderDetailDialog=false">取  消</el-button>
		      <el-button @click="submit" type="primary">确  定</el-button>
		    </div>
	  </el-dialog>
	`
	
	
	Vue.component("ns-trade-detail",{
	    template:template,
	    data:function(){
		return {
			orderDetailDialog:false,
			 sellerMemo:"",
			//订单详情
			model:{
				 shopName:"", 
				 outNick:"",
				 tradeId:"",
				 tradeStatus:"",
//				 created:new Date("month dd,yyyy hh:mm:ss") ,
				 created:"" ,
				 payTime:"",
				 num:0.00,
				 totalFee:0.00,
				 receiverName:"",
				 receiverMobile:"",
				 shopCode:"",
//				 sellerMemo:"",
				 buyerMessage:"",
				 outTradeId:"",
				 remarkSign:-1,
				 payment:0.00,
				 picPath:"",
				 title:"",
				 outerId:"",
				 //只有淘宝平台的店铺可以修改备注，为1时显示修改备注组件
				 platFromType:0,
				 
			},
//			 buyerMessage:"-",
			 
			 goodsList:[{
				 picPath:"-",
				 skuProperties:"-",
				 sysItemId:"",
				 price:0.00,
				 number:0, 
			 }]
		}
	    },
	    props:{
	    	//系统交易订单号
			sysTradeId:String
	    },
	    methods:{
	    	//打开弹框
	    	openDialog:function(tradeId){
	    		var that = this;
	    		this.queryDetail(tradeId);
//	    		this.orderDetailDialog = true;
	    	},
	    	editSave:function(remark){
//	    		this.model.sellerMemo = remark;
	    		this.sellerMemo = remark;
	    	},
	    	edit:function(data){
	    		
	    	},
	    	input:function(data){
	    		
	    	},
	    	
	    	//根据订单号获取详情
	    	queryDetail:function(tradeId){
	    		var that = this;
	    		this.tradeId = tradeId;
	    		$.when($.post("/base/common/queryTradeDetailById",{sysTradeId:tradeId}),
	    				$.post("/base/common/queryGoodsListBysySTradeId",{sysTradeId:tradeId}))
	    				.done(function(resDet,resList){
	    					var resDetail = resDet[0];
	    					var resGoods = resList[0];
    					 if(resDetail.success && resDetail.result != undefined){
    						 that.$set(that._data,"model",resDetail.result);
    						 that.model.platFromType = resDetail.result.platFromType;
    						 that.model.created = !resDetail.result.created ? "" : resDetail.result.created;
    						 that.model.payTime = !resDetail.result.payTime ? "" : resDetail.result.payTime;
    						 that.sellerMemo = !resDetail.result.sellerMemo ? "" : resDetail.result.sellerMemo;
    						 that.orderDetailDialog = true;
    					 }else{
    						 that.$message.error("查询不到该订单信息");
    						 that.orderDetailDialog = false;
    					 }
	    					
	   					 if(resGoods.success && resGoods.result.data !=null ){
							 that.$set(that._data,"goodsList",resGoods.result.data);
						 }else{
							 that.$message.error("获取商品列表失败");
						 }
//	   					that.orderDetailDialog = true;
	      			}).fail(function (res) {
	          			 that.$message.error("请求失败");
	          			 
	       			});
	    	},
	    	
	    	submit:function(){
	    		var that = this;
	    		var data = {
	    				remarkSign:that.model.remarkSign,
//	    				sellerMemo:that.model.sellerMemo
	    				sellerMemo:that.sellerMemo
	    		}
	    		$.post("/database/kdtrade/updateTradeDetail",{
    				remarkSign:that.model.remarkSign,
    				sellerMemo:that.sellerMemo,
    				sysTradeId:that.tradeId
	    			}).done(function(res){
						 if(res.success ){
							 that.$message({
								 type:'success',
								 message:res.msg
							 })
							 that.orderDetailDialog = false ;
						 }else{
							 that.$message.error(res.msg);
						 }
	     			}).fail(function (res) {
	     				that.$message.error("修改失败");
	      		});
	    	},
	       
	    },
	    created:function(){
	     
	    },
	    mounted:function(){
	    	
	    }
	});
	
});		

