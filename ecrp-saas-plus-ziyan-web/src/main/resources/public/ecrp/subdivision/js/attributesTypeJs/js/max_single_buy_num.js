//最大单次购买数量
var max_single_buy_num = {
	Data : function(param1,param){
			param = "max_single_buy_num";
			var getValue ={};
        	getValue.relation = "";
        	getValue.condition ="equal";
        	getValue.CDATA ="";
        	getValue.code =param;


			return getValue;

		},
	Xml : function (param){
			var data = eval(param);  
			var getXml = "<term>";
			for (var i = data.length-1; i >= 0; i--) {
					if(data[i].relation != ""){
						getXml +='<term es_nested="customer_shop_rfm" relation="'+data[i].relation+'">' +
						'<condition es_field="customer_shop_rfm.'+data[i].code+'" column="'+data[i].code+'" operator="'+data[i].condition+'">' +
						'<![CDATA['+data[i].CDATA+']]>' +
						'</condition>' +
						 '</term>';
					}
					else{
						getXml +='<term es_nested="customer_shop_rfm">' +
						'<condition es_field="customer_shop_rfm.'+data[i].code+'" column="'+data[i].code+'" operator="'+data[i].condition+'">' +
						'<![CDATA['+data[i].CDATA+']]>' +
						'</condition>' +
						 '</term>';
					}
					
				}
				return getXml+"</term>";
			},

	Sql : function (param){
			var name = "max_single_buy_num";
			var getSqlJoin = " left join kd_customer_shop_rfm on kd_customer_shop_rfm.sys_customer_id = kd_customer.sys_customer_id ";
			var getSqlCondition = "";
			var data = eval(param);
			for (var i = data.length-1; i >= 0; i--) {
				if(data[i].relation == ""){
					data[i].relation = "and";
				} if(data[i].condition == "equal"){
					data[i].condition = "=";
				}else if(data[i].condition == "notEqual"){
					data[i].condition = "!=";
				}else if(data[i].condition == "larger"){
					data[i].condition = ">";
				}else if(data[i].condition == "largerEqual"){
					data[i].condition = ">=";
				}else if(data[i].condition == "smaller"){
					data[i].condition = "<";
				}else if(data[i].condition == "smallerEqual"){
					data[i].condition = "<=";
				}
				getSqlCondition += " "+data[i].relation+" kd_customer_shop_rfm.max_single_buy_num  "+data[i].condition+" '"+data[i].CDATA+"'";
			}
			return getSqlJoin+"|"+getSqlCondition;
		}
	
}
