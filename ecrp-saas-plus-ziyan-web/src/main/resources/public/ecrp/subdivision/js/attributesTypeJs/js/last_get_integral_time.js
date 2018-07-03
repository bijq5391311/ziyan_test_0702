//最后互动时间
var last_get_integral_time = {
	Data : function(param1,param){
			param1 = "last_get_integral_time";
			var getValue ={};
        	getValue.relation = "";
        	getValue.condition ="equal";
        	getValue.CDATA ="";
        	getValue.date ="";
        	getValue.oldday ="";
        	getValue.newday ="";
        	getValue.code =param1;
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
								'<condition es_field="customer_shop_rfm.last_interact_time"  operator="larger">' +
								'<![CDATA['+dataL+']]>' +
								'</condition></term>' +
								'<term es_nested="customer_shop_rfm"  relation="or"><condition es_field="customer_shop_rfm.last_interact_time"  operator="smaller">' +
								'<![CDATA['+dataF+']]>' +
								'</condition></term>' +
								'<term es_nested="customer_shop_rfm"  relation="or"><condition es_field="customer_shop_rfm.last_interact_time"  operator="isNull">' +
								'<![CDATA[]]>' +
								'</condition>' +
								'</term>';
						}else{
							getXml +='<term term es_nested="customer_shop_rfm" relation="'+data[i].relation+'">' +
								'<condition es_field="customer_shop_rfm.last_interact_time" operator="'+data[i].condition+'">' +
								'<![CDATA['+date+']]>' +
								'</condition>' +
								'</term>';
						}

					}else{
						if(data[i].condition == "notEqual"){
							getXml +='<term es_nested="customer_shop_rfm"  >' +
								'<condition es_field="customer_shop_rfm.last_interact_time"  operator="larger">' +
								'<![CDATA['+dataL+']]>' +
								'</condition></term>' +
								'<term es_nested="customer_shop_rfm"  relation="or"><condition es_field="customer_shop_rfm.last_interact_time"  operator="smaller">' +
								'<![CDATA['+dataF+']]>' +
								'</condition></term>' +
								'<term es_nested="customer_shop_rfm"  relation="or"><condition es_field="customer_shop_rfm.last_interact_time"  operator="isNull">' +
								'<![CDATA[]]>' +
								'</condition>' +
								'</term>';
						}else{
							getXml +='<term  es_nested="customer_shop_rfm">' +
								'<condition es_field="customer_shop_rfm.last_interact_time" operator="'+data[i].condition+'">' +
								'<![CDATA['+date+']]>' +
								'</condition>' +
								'</term>';
						}

					}
					
				}
			 return getXml+"</term>";
			},

	Sql : function (param){
			var name = "last_get_integral_time";
			var getSqlJoin = "";
			var getSqlCondition = "";
			var data = eval(param);
			for (var i = data.length-1; i >= 0; i--) {
//				if(data[i].relation == ""){
//					data[i].relation = "and";
//				}
//				if(data[i].condition == "between"){
//					getSqlCondition += " "+data[i].relation+" kd_operate_customer."+data[i].result.k+"  between  '"+commonFunction.GetDateStr(parseInt(data[i].newday))+"' and  '"+commonFunction.GetDateStr(parseInt(data[i].oldday))+"' ";
//				} if(data[i].condition == "equal"){
//					getSqlCondition += " "+data[i].relation+" kd_operate_customer."+data[i].result.k+" = '"+data[i].date.split("T")[0]+"'";
//				}else if(data[i].condition == "notEqual"){
//					getSqlCondition += " "+data[i].relation+" kd_operate_customer."+data[i].result.k+" != '"+data[i].date.split("T")[0]+"'";
//				}else if(data[i].condition == "largerEqual"){
//					getSqlCondition += " "+data[i].relation+" kd_operate_customer."+data[i].result.k+" < '"+data[i].date.split("T")[0]+"'";
//				}else if(data[i].condition == "smallerEqual"){
//					getSqlCondition += " "+data[i].relation+" kd_operate_customer."+data[i].result.k+" > '"+data[i].date.split("T")[0]+"'";
//				}else if(data[i].condition == "isNull"){
//					getSqlCondition += " "+data[i].relation+" kd_operate_customer."+data[i].result.k+"  is null";
//				}else if(data[i].condition == "isNotNull"){
//					getSqlCondition += " "+data[i].relation+" kd_operate_customer."+data[i].result.k+"  is not null";
//				}
				
			}
			return getSqlJoin+"|"+getSqlCondition;
		}
	
}
