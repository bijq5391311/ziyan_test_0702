//优惠券状态
var coupon_status = {
	Data : function(param1,param){
			param1 = "coupon_status";
			var getValue ={};
        	getValue.relation = "";
        	getValue.condition ="like";
        	getValue.CDATA ="0";
        	getValue.code =param1;
        	getValue.type ='-1';

			return getValue;

		},
	Xml : function (param){
			var data = eval(param);  
			var getXml = "<term>";
				for (var i = data.length-1; i >= 0; i--) {
					if(data[i].relation != ""){
						getXml +='<term relation="'+data[i].relation+'">' +
						'<condition es_field="'+data[i].code+'" column="'+data[i].code+'" operator="'+data[i].condition+'">' +
						'<![CDATA['+data[i].CDATA+']]>' +
						'</condition>' +
						 '</term>';
					}
					else{
						getXml +='<term >' +
						'<condition es_field="'+data[i].code+'" column="'+data[i].code+'" operator="'+data[i].condition+'">' +
						'<![CDATA['+data[i].CDATA+']]>' +
						'</condition>' +
						 '</term>';
					}
					
				}
			// return getXml+"</term>";
			return "";
			},

	Sql : function (param){
			var name = "coupon_status";
			var getSqlJoin = " left join marketing_coupon_send_record mcsr on mcsr.sys_customer_id = kd_customer.sys_customer_id ";
			var getSqlCondition = "";
			var data = eval(param);
			for (var i = data.length-1; i >= 0; i--) {
//				getSqlCondition += " and kd_customer."+name+"  "+data[i].condition+" '"+data[i].CDATA+"'";
			}
			return getSqlJoin+"|"+getSqlCondition;
		}
	
}
