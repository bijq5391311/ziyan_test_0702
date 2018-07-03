//积分
var hx_score = {
	Data : function(param1,param){
			param1 = "hx_score";
			var getValue ={};
						getValue.result = "";
			        	getValue.relation = "";
			        	getValue.condition ="equal";
			        	getValue.CDATA ="";
			        	getValue.code =param1;

			return getValue;

		},
	Xml : function (param){
			var data = eval(param);  
			var getXml = "<term>";
				for (var i = data.length-1; i >= 0; i--) {
					data[i].CDATA = data[i].CDATA.split(".")[0];
					if(data[i].relation != ""){
						getXml +='<term es_nested="customer_brand"  relation="'+data[i].relation+'">' +
						'<condition es_field="customer_brand.score"  operator="'+data[i].condition+'">' +
						'<![CDATA['+data[i].CDATA+']]>' +
						'</condition>' +
						 '</term>';
					}
					else{
						getXml +='<term es_nested="customer_brand">' +
						'<condition es_field="customer_brand.score"  operator="'+data[i].condition+'">' +
						'<![CDATA['+data[i].CDATA+']]>' +
						'</condition>' +
						 '</term>';
					}
					
				}
			return getXml+"</term>";
			},

	Sql : function (param){
			var name = "score";
			var getSqlJoin = " left join kd_customer_brand on kd_customer.sys_customer_id = kd_customer_brand.sys_customer_id ";
			var getSqlCondition = "";
			var data = eval(param);
			for (var i = data.length-1; i >= 0; i--) {
				if(data[i].condition == "equal"){
					data[i].condition = "=";
				} if(data[i].condition == "notEqual"){
					data[i].condition = "!=";
				}else if(data[i].condition == "larger"){
					data[i].condition = ">";
				}else if(data[i].condition == "smaller"){
					data[i].condition = "<";
				}else if(data[i].condition == "largerEqual"){
					data[i].condition = ">=";
				}else if(data[i].condition == "smallerEqual"){
					data[i].condition = "<=";
				}
				if(data[i].relation == ""){
					data[i].relation = "and";
				}
				getSqlCondition += " "+data[i].relation+" kd_customer_brand.interaction_total_score  "+data[i].condition+" '"+data[i].CDATA+"'";
                getSqlCondition += " and kd_customer_brand.brand_id = '"+data[i].brand+"' ";
			}
			return getSqlJoin+"|"+getSqlCondition;
		}
	
}
