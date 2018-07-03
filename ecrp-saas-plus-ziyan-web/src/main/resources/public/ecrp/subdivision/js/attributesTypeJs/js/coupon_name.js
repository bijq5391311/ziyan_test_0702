//优惠券名称
var coupon_name = {
	Data : function(param1,param){
			param1 = "coupon_name";
			var getValue ={};
			debugger
			$.ajax({
				url:"getTaoShopLIstByUserId",
				data:"",
				type:"post",
				async:false,
				success:function(result){
					if(result.success){
						getValue.result = "";
			        	getValue.relation = "";
			        	getValue.condition ="like";
			        	getValue.CDATA ="";
			        	getValue.code =param1;
			        	getValue.shop = result.result.length>0?result.result[0].v:"";
			        	getValue.shops = result.result;
					}
				}
			});
			var shopCodes = getValue.shops.length>0?getValue.shops[0].v:"";
			if(getValue.shops.length>1){
				for (var k = 0; k < getValue.shops.length; k++) {
					shopCodes = shopCodes+","+getValue.shops[k].v;
				}
			}
			$.ajax({
				url:"getCouponByShopCode",
				data:{shopCodes:shopCodes},
				type:"post",
				async:false,
				success:function(result){
					if(result.success){
						
			        	getValue.coupons = result.result;
					}
				}
			});
			return getValue;

		},
	Xml : function (param){
			var data = eval(param);  
			var getXml = "<term>";
				for (var i = data.length-1; i >= 0; i--) {
					if(data[i].relation != ""){
						getXml +='<term relation="'+data[i].relation+'"><term es_nested="marketing_coupon_send_record" >' +
						'<condition es_field="marketing_coupon_send_record.coupon_id"  operator="'+data[i].condition+'">' +
						'<![CDATA['+data[i].CDATA+']]>' +
						'</condition>' +
						 '</term>';
						getXml +='<term es_nested="coupon" >' +
						'<condition es_field="coupon.coupon_id"  operator="'+data[i].condition+'">' +
						'<![CDATA['+data[i].CDATA+']]>' +
						'</condition>' +
						 '</term></term>';
					}
					else{
						getXml +='<term><term es_nested="marketing_coupon_send_record">' +
						'<condition es_field="marketing_coupon_send_record.coupon_id"   operator="'+data[i].condition+'">' +
						'<![CDATA['+data[i].CDATA+']]>' +
						'</condition>' +
						 '</term>';
						getXml +='<term es_nested="coupon" >' +
						'<condition es_field="coupon.coupon_id"  operator="'+data[i].condition+'">' +
						'<![CDATA['+data[i].CDATA+']]>' +
						'</condition>' +
						 '</term></term>';
					}
					
				}
			// return getXml+"</term>";
			return "";
			},

	Sql : function (param){
			var name = "coupon_name";
			var getSqlJoin = "";
			var getSqlCondition = "";
			var data = eval(param);
			for (var i = data.length-1; i >= 0; i--) {
				if(data[i].condition == "like"){
					data[i].condition = "like";
				}else if(data[i].condition == "notLike"){
					data[i].condition = "not like";
				}
				if(data[i].relation==""){
					data[i].relation="and";
				}
//				getSqlCondition += " and kd_customer."+name+"  "+data[i].condition+" '"+data[i].CDATA+"'";
			}
			return getSqlJoin+"|"+getSqlCondition;
		}
	
}
