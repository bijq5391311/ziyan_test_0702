//店铺筛选
var shopChoose = {
	Data : function(param1,param){
			param1 = "shopChoose";
			var getValue ={};
        	getValue.relation = "";
        	getValue.condition ="equal";
        	getValue.CDATA ="";
        	getValue.array =[];
        	getValue.channel ="";
        	getValue.code =param1;
			                	

			return getValue;

		},
	Xml : function (param){
			var data = eval(param);  
			var getXml = "<term>";
				for (var i = data.length-1; i >= 0; i--) {
					var Shopcodes = data[i].CDATA.replace(/,/g,"∝");
					if(data[i].condition == "equal"){
						data[i].condition = "in";
					}else if(data[i].condition == "notEqual"){
                        data[i].condition = "in";
                        data[i].relation = "not";
					}
					if(data[i].relation != "" || data[i].condition == "notEqual"){
						getXml +='<term es_nested="customer_shop" relation="'+data[i].relation+'">' +
						'<condition es_field="customer_shop.shop_code"  operator="'+data[i].condition+'">' +
						'<![CDATA['+Shopcodes+']]>' +
						'</condition>' +
						 '</term>';
					}
					else{
						getXml +='<term es_nested="customer_shop">' +
						'<condition es_field="customer_shop.shop_code"  operator="'+data[i].condition+'">' +
						'<![CDATA['+Shopcodes+']]>' +
						'</condition>' +
						 '</term>';
					}
					
				}
			return getXml+"</term>";
			},

	Sql : function (param){
			var name = "shopChoose";
			var getSqlJoin = " left join kd_customer_shop on kd_customer_shop.sys_customer_id = kd_customer.sys_customer_id ";
			var getSqlCondition = "";
			var data = eval(param);
			for (var i = 0; i < data.length; i++) {
				if(data[i].condition == "equal"){
					data[i].condition = " in ";
				}else if(data[i].condition == "notEqual"){
					data[i].condition = " not in ";
				}
				if(data[i].relation == ""){
					data[i].relation = "and";
				}
				getSqlCondition += " "+data[i].relation+"  kd_customer_shop.shop_code  "+data[i].condition+"  ("+data[i].CDATA+") ";
			}
			return getSqlJoin+"|"+getSqlCondition;
		}
	
}
