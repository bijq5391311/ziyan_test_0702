//成功休眠天数
var LastTradeTime_Now = {
	Data : function(param1,param){
			param = "LastTradeTime_Now";
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
				var date = commonFunction.GetDateStr(-parseInt(data[i].CDATA));
				if(data[i].condition == "equal"){
					date = date+"T00:00:00+08:00∝"+date+"T23:59:59+08:00";
					data[i].condition = "between"
				}else if(data[i].condition != "" && data[i].condition != "notEqual"){
					date = date+"T00:00:00+08:00";
				}
				if(data[i].relation != ""){
					if(data[i].condition == "notEqual"){
						getXml +='<term es_nested="customer_shop_rfm"  relation="'+data[i].relation+'">' +
						'<condition es_field="customer_shop_rfm.last_trade_time"  operator="between">' +
						'<![CDATA['+date+'T23:59:59+08:00∝]]>' +
						'</condition></term><term relation="or">' +
						'<condition es_field="customer_shop_rfm.last_trade_time"  operator="between">' +
						'<![CDATA[∝'+date+'T00:00:00+08:00]]>' +
							'</condition></term>' +
							'<term es_nested="customer_shop_rfm"  relation="or"><condition es_field="customer_shop_rfm.last_trade_time"  operator="isNull">' +
							'<![CDATA[]]>' +
						'</condition>' +
						 '</term>';
					}else{
						getXml +='<term es_nested="customer_shop_rfm"  relation="'+data[i].relation+'">' +
						'<condition es_field="customer_shop_rfm.last_trade_time"  operator="'+data[i].condition+'">' +
						'<![CDATA['+date+']]>' +
						'</condition>' +
						 '</term>';
					}
				}
				else{
					if(data[i].condition == "notEqual"){
						getXml +='<term es_nested="customer_shop_rfm">' +
						'<condition es_field="customer_shop_rfm.last_trade_time"  operator="between">' +
						'<![CDATA['+date+'T23:59:59+08:00∝]]>' +
						'</condition></term><term relation="or">' +
						'<condition es_field="customer_shop_rfm.last_trade_time"  operator="between">' +
						'<![CDATA[∝'+date+'T00:00:00+08:00]]>' +
							'</condition></term>' +
							'<term es_nested="customer_shop_rfm"  relation="or"><condition es_field="customer_shop_rfm.last_trade_time"  operator="isNull">' +
							'<![CDATA[]]>' +
						'</condition>' +
						 '</term>';
					}else{
					getXml +='<term es_nested="customer_shop_rfm" >' +
					'<condition es_field="customer_shop_rfm.last_trade_time"  operator="'+data[i].condition+'">' +
					'<![CDATA['+date+']]>' +
					'</condition>' +
					 '</term>';
					}
				}
				
			}
			return getXml+"</term>";
			},

	Sql : function (param){
			var name = "LastTradeTime_Now";
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
				getSqlCondition += " "+data[i].relation+" kd_customer_shop_rfm.LastTradeTime_Now  "+data[i].condition+" '"+data[i].CDATA+"'";
			}
			return getSqlJoin+"|"+getSqlCondition;
		}
	
}
