//最近关怀时间
var LatestCallOnTime = {
	Data : function(param1,param){
			param1 = "LatestCallOnTime";
			var getValue ={};
        	getValue.result = recentCareTime;
        	getValue.relation = "";
        	getValue.condition ="equal";
        	getValue.CDATA ="";
        	getValue.oldday ="";
        	getValue.newday ="";
        	getValue.date ="";
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
                            getXml +='<term es_nested="operate_customer"  relation="'+data[i].relation+'">' +
                                '<condition es_field="operate_customer.'+data[i].CDATA+'"  operator="larger">' +
                                '<![CDATA['+dataL+']]>' +
                                '</condition>' +
                                '<condition es_field="operate_customer.'+data[i].CDATA+'"  operator="smaller">' +
                                '<![CDATA['+dataF+']]>' +
                                '</condition>' +
                                '</term>';
						}else{
                            getXml +='<term es_nested="operate_customer"  relation="'+data[i].relation+'">' +
                                '<condition es_field="operate_customer.'+data[i].CDATA+'"  operator="'+data[i].condition+'">' +
                                '<![CDATA['+date+']]>' +
                                '</condition>' +
                                '</term>';
						}

						
					}
					else{
						if(data[i].condition == "notEqual"){
                            getXml +='<term es_nested="operate_customer"  relation="'+data[i].relation+'">' +
                                '<condition es_field="operate_customer.'+data[i].CDATA+'"  operator="larger">' +
                                '<![CDATA['+dataL+']]>' +
                                '</condition>' +
                                '<condition es_field="operate_customer.'+data[i].CDATA+'"  operator="smaller">' +
                                '<![CDATA['+dataF+']]>' +
                                '</condition>' +
                                '</term>';
						}else{
                            getXml +='<term es_nested="operate_customer" >' +
                                '<condition es_field="operate_customer.'+data[i].CDATA+'" operator="'+data[i].condition+'">' +
                                '<![CDATA['+date+']]>' +
                                '</condition>' +
                                '</term>';
						}
					}
					
				}
			return getXml+"</term>";
			},

	Sql : function (param){
			var name = "LatestCallOnTime";
			var getSqlJoin = " left join kd_operate_customer on kd_operate_customer.sys_customer_id = kd_customer.sys_customer_id ";
			var getSqlCondition = "";
			var data = eval(param);
			for (var i = data.length-1; i >= 0; i--) {
				if(data[i].relation == ""){
					data[i].relation = "and";
				}
				if(data[i].condition == "earlierNow"){
					getSqlCondition += " "+data[i].relation+" DATE_FORMAT(kd_operate_customer."+data[i].CDATA+" ,'%Y-%m-%d') between  '"+commonFunction.GetDateStr(-parseInt(data[i].newday))+"' and  '"+commonFunction.GetDateStr(-parseInt(data[i].oldday))+"' ";
				}else if(data[i].condition == "equal"){
					getSqlCondition += " "+data[i].relation+" DATE_FORMAT(kd_operate_customer."+data[i].CDATA+" ,'%Y-%m-%d') = '"+data[i].date.split("T")[0]+"'";
				}else if(data[i].condition == "notEqual"){
					getSqlCondition += " "+data[i].relation+" DATE_FORMAT(kd_operate_customer."+data[i].CDATA+" ,'%Y-%m-%d') != '"+data[i].date.split("T")[0]+"'";
				}else if(data[i].condition == "largerEqual"){
					getSqlCondition += " "+data[i].relation+" DATE_FORMAT(kd_operate_customer."+data[i].CDATA+" ,'%Y-%m-%d') < '"+data[i].date.split("T")[0]+"'";
				}else if(data[i].condition == "smallerEqual"){
					getSqlCondition += " "+data[i].relation+" DATE_FORMAT(kd_operate_customer."+data[i].CDATA+" ,'%Y-%m-%d') > '"+data[i].date.split("T")[0]+"'";
				}else if(data[i].condition == "isNull"){
					getSqlCondition += " "+data[i].relation+" DATE_FORMAT(kd_operate_customer."+data[i].CDATA+" ,'%Y-%m-%d') is null or kd_operate_customer."+data[i].CDATA+" = '' ";
				}else if(data[i].condition == "isNotNull"){
					getSqlCondition += " "+data[i].relation+" DATE_FORMAT(kd_operate_customer."+data[i].CDATA+" ,'%Y-%m-%d')  is not null or  kd_operate_customer."+data[i].CDATA+" = ''";
				}
				
			}
			return getSqlJoin+"|"+getSqlCondition;
		}
	
}
