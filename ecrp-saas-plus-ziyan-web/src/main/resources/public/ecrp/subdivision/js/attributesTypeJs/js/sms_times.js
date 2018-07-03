//短信营销次数
var sms_times = {
	Data : function(param1,param){
			param1 = "sms_times";
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
					if(data[i].relation != ""){
						if(data[i].condition == "notEqual"){
							getXml +='<term es_nested="operate_customer" relation="not">' +
								'<condition es_field="operate_customer.'+data[i].code+'" column="'+data[i].code+'" operator="equal">' +
								'<![CDATA['+data[i].CDATA+']]>' +
								'</condition>' +
								'</term>';
						}else{
							getXml +='<term es_nested="operate_customer" relation="'+data[i].relation+'">' +
								'<condition es_field="operate_customer.'+data[i].code+'" column="'+data[i].code+'" operator="'+data[i].condition+'">' +
								'<![CDATA['+data[i].CDATA+']]>' +
								'</condition>' +
								'</term>';
						}

						}
					else{
						if(data[i].condition == "notEqual"){
							getXml +='<term es_nested="operate_customer" relation="not" >' +
								'<condition es_field="operate_customer.'+data[i].code+'" column="'+data[i].code+'" operator="equal">' +
								'<![CDATA['+data[i].CDATA+']]>' +
								'</condition>' +
								'</term>';
						}else{
							getXml +='<term es_nested="operate_customer">' +
								'<condition es_field="operate_customer.'+data[i].code+'" column="'+data[i].code+'" operator="'+data[i].condition+'">' +
								'<![CDATA['+data[i].CDATA+']]>' +
								'</condition>' +
								'</term>';
						}

					}
				}
			return getXml+"</term>";
			},

	Sql : function (param){
			var name = "sms_times";
			var getSqlJoin = " left join kd_operate_customer on kd_operate_customer.sys_customer_id = kd_customer.sys_customer_id  ";
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
				getSqlCondition += " "+data[i].relation+" kd_operate_customer.sms_times  "+data[i].condition+" '"+data[i].CDATA+"'";
			}
			return getSqlJoin+"|"+getSqlCondition;
		}
	
}
