//生日
var birthday = {
	Data : function(param1,param){
			param1 = "birthday";
			var getValue ={};
        	getValue.result = "";
        	getValue.relation = "";
        	getValue.condition ="equal";
        	getValue.date ="";
        	getValue.oldday ="";
        	getValue.newday ="";
        	getValue.code ="birthday";
			return getValue;

		},
	Xml : function (param){
			var data = eval(param);  
			var getXml = "<term>";
				for (var i = data.length-1; i >= 0; i--) {
					if(data[i].condition == "equal" || data[i].condition == "notEqual" || data[i].condition == "larger" || data[i].condition == "smaller"){
						data[i].CDATA = commonFunction.getDateFormat(new Date(data[i].date),"yyyy-MM-dd").replace(new Date().getFullYear()+"-","");
					}else if(data[i].condition == "earlierNow"){
						data[i].CDATA = ""+commonFunction.GetDateStr(-data[i].newday).replace(new Date().getFullYear()+"-","")+"∝"+commonFunction.GetDateStr(-data[i].oldday).replace(new Date().getFullYear()+"-","")+"";
					}else if(data[i].condition == "laterNow"){
						data[i].CDATA = ""+commonFunction.GetDateStr(parseInt(data[i].oldday)).replace(new Date().getFullYear()+"-","")+"∝"+commonFunction.GetDateStr(parseInt(data[i].newday)).replace(new Date().getFullYear()+"-","")+"";
					}else{
						data[i].CDATA = "";
					}
					
					if(data[i].relation != ""){
						if(data[i].condition == "earlierNow" || data[i].condition == "laterNow"){
							getXml +='<term relation="'+data[i].relation+'">' +
							'<condition es_field="birthday_month_day" operator="between">' +
							'<![CDATA['+data[i].CDATA+']]>' +
							'</condition>' +
							 '</term>';
						}else{
							getXml +='<term relation="'+data[i].relation+'">' +
							'<condition es_field="birthday_month_day" operator="'+data[i].condition+'">' +
							'<![CDATA['+data[i].CDATA+']]>' +
							'</condition>' +
							 '</term>';
						}
						if(data[i].condition == "isNull"){
							getXml += '<term relation="or"><condition es_field="birthday_month_day"  operator="equal"><![CDATA[]]></condition></term>';
							getXml += '<term relation="or"><condition es_field="birthday_month_day"  operator="equal"><![CDATA[NULL]]></condition></term>';
						}else if(data[i].condition == "isNotNull"){
							getXml += '<term relation="and"><condition es_field="birthday_month_day"  operator="notEqual"><![CDATA[]]></condition></term>';
							getXml += '<term relation="and"><condition es_field="birthday_month_day"  operator="notEqual"><![CDATA[NULL]]></condition></term>';
						}
					}
					else{
						if(data[i].condition == "earlierNow" || data[i].condition == "laterNow"){
							getXml +='<term>' +
							'<condition es_field="birthday_month_day" operator="between">' +
							'<![CDATA['+data[i].CDATA+']]>' +
							'</condition>' +
							 '</term>';
						}else{
							getXml +='<term>' +
							'<condition es_field="birthday_month_day" operator="'+data[i].condition+'">' +
							'<![CDATA['+data[i].CDATA+']]>' +
							'</condition>' +
							 '</term>';
						}
						if(data[i].condition == "isNull"){
							getXml += '<term relation="or"><condition es_field="birthday_month_day"  operator="equal"><![CDATA[]]></condition></term>';
							getXml += '<term relation="or"><condition es_field="birthday_month_day"  operator="equal"><![CDATA[NULL]]></condition></term>';
						}else if(data[i].condition == "isNotNull"){
							getXml += '<term relation="and"><condition es_field="birthday_month_day"  operator="notEqual"><![CDATA[]]></condition></term>';
							getXml += '<term relation="and"><condition es_field="birthday_month_day"  operator="notEqual"><![CDATA[NULL]]></condition></term>';
						}
					}
					
				}
			return getXml+"</term>";
			},

	Sql : function (param){
			var name = "birthday";
			var getSqlJoin = "";
			var getSqlCondition = "";
			var data = eval(param);
			for (var i = data.length-1; i >= 0; i--) {
				if(data[i].condition == "equal"){
					getSqlCondition += " and  DATE_FORMAT(kd_customer.birthday,'%m-%d') = '"+data[i].date.split("T")[0].replace(new Date().getFullYear()+"-","")+"'  ";
				}if(data[i].condition == "notEqual"){
					getSqlCondition += " and  DATE_FORMAT(kd_customer.birthday,'%m-%d') != '"+data[i].date.split("T")[0].replace(new Date().getFullYear()+"-","")+"' ";
				}else if(data[i].condition == "larger"){
					getSqlCondition += " and  DATE_FORMAT(kd_customer.birthday,'%m-%d') > '"+data[i].date.split("T")[0].replace(new Date().getFullYear()+"-","")+"'  ";
				}else if(data[i].condition == "smaller"){
					getSqlCondition += " and  DATE_FORMAT(kd_customer.birthday,'%m-%d') <'"+data[i].date.split("T")[0].replace(new Date().getFullYear()+"-","")+"'  ";
				}else if(data[i].condition == "isNull"){
					getSqlCondition += " and   kd_customer.birthday is null or kd_customer.birthday = ''";
				}else if(data[i].condition == "isNotNull"){
					getSqlCondition += " and   kd_customer.birthday is not null or kd_customer.birthday != ''";
				}else if(data[i].condition == "laterNow"){
					getSqlCondition += " and  DATE_FORMAT(DATE_SUB(CURDATE(),INTERVAL "+data[i].oldday+" DAY),'%m/%d')  < DATE_FORMAT(kd_customer.birthday,'%m/%d') < DATE_FORMAT(DATE_SUB(CURDATE(),INTERVAL "+data[i].newday+" DAY),'%m/%d')   ";
				}else if(data[i].condition == "earlierNow"){
					getSqlCondition += " and  DATE_FORMAT(DATE_ADD(CURDATE(),INTERVAL "+data[i].oldday+" DAY),'%m/%d')  < DATE_FORMAT(kd_customer.birthday,'%m/%d') < DATE_FORMAT(DATE_ADD(CURDATE(),INTERVAL "+data[i].newday+" DAY),'%m/%d')   ";
				}
				
//				getSqlCondition += " and kd_customer."+name+"  "+data[i].condition+" '"+data[i].CDATA+"'";
			}
			return getSqlJoin+"|"+getSqlCondition;
		}
	
}
