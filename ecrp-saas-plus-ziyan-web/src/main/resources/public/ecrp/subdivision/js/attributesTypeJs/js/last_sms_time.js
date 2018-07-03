//短信营销休眠天数
var last_sms_time = {
	Data : function(param1,param){
			param = "last_sms_time";
			var getValue ={};
        	getValue.relation = "";
        	getValue.condition ="equal";
        	getValue.CDATA ="";
        	getValue.date ="";
        	getValue.oldday ="";
        	getValue.newday ="";
        	getValue.code =param;
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
							getXml +='<term es_nested="operate_customer"  relation="not">' +
								'<condition es_field="operate_customer.'+data[i].code+'"  operator="smaller">' +
								'<![CDATA['+dataL+']]>' +
								'</condition>' +
								'<condition es_field="operate_customer.'+data[i].code+'"  operator="larger">' +
								'<![CDATA['+dataF+']]>' +
								'</condition>' +
								'</term>';
						}else{
							getXml +='<term es_nested="operate_customer"  relation="'+data[i].relation+'">' +
								'<condition es_field="operate_customer.'+data[i].code+'" column="'+data[i].code+'" operator="'+data[i].condition+'">' +
								'<![CDATA['+date+']]>' +
								'</condition>' +
								'</term>';
						}

					}
					else{
						if(data[i].condition == "notEqual"){
							getXml +='<term es_nested="operate_customer"  relation="not">' +
								'<condition es_field="operate_customer.'+data[i].code+'"  operator="smaller">' +
								'<![CDATA['+dataL+']]>' +
								'</condition>' +
								'<condition es_field="operate_customer.'+data[i].code+'"  operator="larger">' +
								'<![CDATA['+dataF+']]>' +
								'</condition>' +
								'</term>';
						}else{
							getXml +='<term es_nested="operate_customer" >' +
								'<condition es_field="operate_customer.'+data[i].code+'" column="'+data[i].code+'" operator="'+data[i].condition+'">' +
								'<![CDATA['+date+']]>' +
								'</condition>' +
								'</term>';
						}

					}
					
				}
			return getXml+"</term>";
			},

	Sql : function (param){
			var name = "last_sms_time";
			var getSqlJoin = " left join kd_operate_customer on kd_operate_customer.sys_customer_id = kd_customer.sys_customer_id  ";
			var getSqlCondition = "";
			var data = eval(param);
			for (var i = data.length-1; i >= 0; i--) {
				if(data[i].relation == ""){
					data[i].relation = "and";
				}
				if(data[i].condition == "between"){
					getSqlCondition += " "+data[i].relation+" kd_operate_customer.last_sms_time  between  '"+commonFunction.GetDateStr(parseInt(data[i].newday))+"' and  '"+commonFunction.GetDateStr(parseInt(data[i].oldday))+"' ";
				}else if(data[i].condition == "equal"){
					getSqlCondition += " "+data[i].relation+" kd_operate_customer.last_sms_time = '"+data[i].date.split("T")[0]+"'";
				}else if(data[i].condition == "notEqual"){
					getSqlCondition += " "+data[i].relation+" kd_operate_customer.last_sms_time != '"+data[i].date.split("T")[0]+"'";
				}else if(data[i].condition == "largerEqual"){
					getSqlCondition += " "+data[i].relation+" kd_operate_customer.last_sms_time < '"+data[i].date.split("T")[0]+"'";
				}else if(data[i].condition == "smallerEqual"){
					getSqlCondition += " "+data[i].relation+" kd_operate_customer.last_sms_time > '"+data[i].date.split("T")[0]+"'";
				}
				
			}
			return getSqlJoin+"|"+getSqlCondition;
		}
	
}
