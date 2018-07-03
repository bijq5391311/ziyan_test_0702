//最后付款时间
var last_pay_time = {
	Data : function(param1,param){
			param = "last_pay_time";
			var getValue ={};
        	getValue.relation = "";
        	getValue.condition ="equal";
        	getValue.CDATA ="";
        	getValue.code =param;
        	getValue.date ="";
        	getValue.oldday ="";
        	getValue.newday ="";

			return getValue;

		},
	Xml : function (param){
			var data = eval(param);  
			var getXml = "<term>";
			for (var i = data.length-1; i >= 0; i--) {
                if(data[i].condition == "equal"){
                    data[i].condition = "between";
                    var date = commonFunction.getDateFormat(new Date(data[i].date),"yyyy-MM-dd hh:mm:ss").replace(" ","T").replace("Z","")+"+08:00∝"+(commonFunction.getDateFormat(new Date(data[i].date),"yyyy-MM-dd ")+"23:59:59").replace(" ","T").replace("Z","")+"+08:00";
                }else if(data[i].condition == "earlierNow"){
                    var date  = data[i].newday+"∝"+data[i].oldday;
                }else if(data[i].condition == "largerEqual"){
                    var date = (commonFunction.getDateFormat(new Date(data[i].date),"yyyy-MM-dd ")+"00:00:00").replace(" ","T").replace("Z","")+"+08:00";
                }else if(data[i].condition == "smallerEqual"){
                    var date = (commonFunction.getDateFormat(new Date(data[i].date),"yyyy-MM-dd ")+"23:59:59").replace(" ","T").replace("Z","")+"+08:00";
                }else if(data[i].condition == "notEqual"){
                    var dataF = commonFunction.getDateFormat(new Date(data[i].date),"yyyy-MM-dd hh:mm:ss").replace(" ","T").replace("Z","")+"+08:00";
                    var dataL = (commonFunction.getDateFormat(new Date(data[i].date),"yyyy-MM-dd ")+"23:59:59").replace(" ","T").replace("Z","")+"+08:00";
                }
				
				if(data[i].relation != ""){
                    if(data[i].condition == "notEqual"){
                        getXml +='<term es_nested="customer_shop_rfm"  relation="'+data[i].relation+'">' +
                            '<condition es_field="customer_shop_rfm.'+data[i].code+'"  operator="larger">' +
                            '<![CDATA['+dataL+']]>' +
                            '</condition></term>' +
                            '<term es_nested="customer_shop_rfm"  relation="or"><condition es_field="customer_shop_rfm.'+data[i].code+'"  operator="smaller">' +
                            '<![CDATA['+dataF+']]>' +
							'</condition></term>' +
							'<term es_nested="customer_shop_rfm"  relation="or"><condition es_field="customer_shop_rfm.'+data[i].code+'"  operator="isNull">' +
							'<![CDATA[]]>' +
                            '</condition>' +
                            '</term>';
                    }else{
                        getXml +='<term  es_nested="customer_shop_rfm"  relation="'+data[i].relation+'">' +
                            '<condition es_field="customer_shop_rfm.'+data[i].code+'" column="'+data[i].code+'" operator="'+data[i].condition+'">' +
                            '<![CDATA['+date+']]>' +
                            '</condition>' +
                            '</term>';
					}

				}
				else{
                    if(data[i].condition == "notEqual"){
                        getXml +='<term es_nested="customer_shop_rfm"  relation="'+data[i].relation+'">' +
                            '<condition es_field="customer_shop_rfm.'+data[i].code+'"  operator="larger">' +
                            '<![CDATA['+dataL+']]>' +
                            '</condition></term>' +
                            '<term es_nested="customer_shop_rfm"  relation="or"><condition es_field="customer_shop_rfm.'+data[i].code+'"  operator="smaller">' +
                            '<![CDATA['+dataF+']]>' +
							'</condition></term>' +
							'<term es_nested="customer_shop_rfm"  relation="or"><condition es_field="customer_shop_rfm.'+data[i].code+'"  operator="isNull">' +
							'<![CDATA[]]>' +
                            '</condition>' +
                            '</term>';
                    }else{
                        getXml +='<term es_nested="customer_shop_rfm" >' +
                            '<condition es_field="customer_shop_rfm.'+data[i].code+'" column="'+data[i].code+'" operator="'+data[i].condition+'">' +
                            '<![CDATA['+date+']]>' +
                            '</condition>' +
                            '</term>';
					}

				}
				
			}
			return getXml+"</term>";
			},

	Sql : function (param){
			var name = "last_pay_time";
        var getSqlJoin = " left join kd_customer_shop_rfm on kd_customer_shop_rfm.sys_customer_id = kd_customer.sys_customer_id ";
        var getSqlCondition = "";
        var data = eval(param);
        for (var i = data.length-1; i >= 0; i--) {
            if(data[i].relation == ""){
                data[i].relation = "and";
            }
            data[i].date = commonFunction.getDateFormat(new Date(data[i].date),"yyyy-MM-dd");
            if(data[i].condition == "earlierNow"){
                data[i].condition = "between";
                data[i].date = commonFunction.GetDateStr(-parseInt(data[i].newday))+"' and  '"+commonFunction.GetDateStr(-parseInt(data[i].oldday));
            }else if(data[i].condition == "equal"){
                data[i].condition = "=";
            }else if(data[i].condition == "notEqual"){
                data[i].condition = "!=";
            }else if(data[i].condition == "largerEqual"){
                data[i].condition = ">=";
            }else if(data[i].condition == "smallerEqual"){
                data[i].condition = "<=";
            }
            getSqlCondition += " "+data[i].relation+" DATE_FORMAT(kd_customer_shop_rfm.last_pay_time,'%Y-%m-%d') "+data[i].condition+" '"+data[i].date+"'";
        }
        return getSqlJoin+"|"+getSqlCondition;
		}
	
}
