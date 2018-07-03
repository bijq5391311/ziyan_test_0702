//付款休眠天数
var sleep_pay_days = {
	Data : function(param1,param){
			param = "sleep_pay_days";
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
				var data = eval(param);  
				var getXml = "<term>";
					for (var i = data.length-1; i >= 0; i--) {
						var date = commonFunction.GetDateStr(-parseInt(data[i].CDATA));
						if(data[i].condition == "equal"){
							date = date+"T00:00:00+08:00∝"+date+"T23:59:59+08:00";
							data[i].condition = "between"
						}else if(data[i].condition != "" && data[i].condition != "notEqual"){
							date = date+"T00:00:00+08:00";
						}if(data[i].condition == "smallerEqual"){
							date = commonFunction.GetDateStr(-parseInt(data[i].CDATA))+"T23:59:59+08:00";
						}else if(data[i].condition == "largerEqual"){
							date = commonFunction.GetDateStr(-parseInt(data[i].CDATA))+"T00:00:00+08:00";
						}else if(data[i].condition == "larger"){
							date = commonFunction.GetDateStr(-parseInt(data[i].CDATA))+"T23:59:59+08:00";
						}
						if(data[i].relation != ""){
							if(data[i].condition == "notEqual"){
								getXml +='<term es_nested="customer_shop_rfm"  relation="'+data[i].relation+'">' +
								'<condition es_field="customer_shop_rfm.last_pay_time"  operator="larger">' +
								'<![CDATA['+date+'T23:59:59+08:00]]>' +
								'</condition></term><term relation="or" es_nested="customer_shop_rfm">' +
								'<condition es_field="customer_shop_rfm.last_pay_time"  operator="smaller">' +
								'<![CDATA['+date+'T00:00:00+08:00]]>' +
									'</condition></term>' +
									'<term es_nested="customer_shop_rfm"  relation="or"><condition es_field="customer_shop_rfm.last_pay_time"  operator="isNull">' +
									'<![CDATA[]]>' +
								'</condition>' +
								 '</term>';
							}else{
								getXml +='<term es_nested="customer_shop_rfm"  relation="'+data[i].relation+'">' +
								'<condition es_field="customer_shop_rfm.last_pay_time"  operator="'+data[i].condition+'">' +
								'<![CDATA['+date+']]>' +
								'</condition>' +
								 '</term>';
							}
						}
						else{
							if(data[i].condition == "notEqual"){
								getXml +='<term es_nested="customer_shop_rfm">' +
								'<condition es_field="customer_shop_rfm.last_pay_time"  operator="larger">' +
								'<![CDATA['+date+'T23:59:59+08:00]]>' +
								'</condition></term><term relation="or" es_nested="customer_shop_rfm">' +
								'<condition es_field="customer_shop_rfm.last_pay_time"  operator="smaller">' +
								'<![CDATA['+date+'T00:00:00+08:00]]>' +
									'</condition></term>' +
									'<term es_nested="customer_shop_rfm"  relation="or"><condition es_field="customer_shop_rfm.last_pay_time"  operator="isNull">' +
									'<![CDATA[]]>' +
								'</condition>' +
								 '</term>';
							}else{
							getXml +='<term es_nested="customer_shop_rfm" >' +
							'<condition es_field="customer_shop_rfm.last_pay_time"  operator="'+data[i].condition+'">' +
							'<![CDATA['+date+']]>' +
							'</condition>' +
							 '</term>';
							}
						}
						
					}
				 return getXml+"</term>";
				}
			// return getXml+"</term>";
			return "";
			},

	Sql : function (param){
			var name = "sleep_pay_days";
        var getSqlJoin = " left join kd_customer_shop_rfm on kd_customer_shop_rfm.sys_customer_id = kd_customer.sys_customer_id ";
        var getSqlCondition = "";
        var data = eval(param);
        for (var i = data.length-1; i >= 0; i--) {
            data[i].CDATA = commonFunction.GetDateStr(-parseInt(data[i].CDATA));
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
            getSqlCondition += " "+data[i].relation+" DATE_FORMAT(kd_customer_shop_rfm.last_pay_time,'%Y-%m-%d')  "+data[i].condition+" '"+data[i].CDATA+"'";
        }
        return getSqlJoin+"|"+getSqlCondition;
		}
	
}
