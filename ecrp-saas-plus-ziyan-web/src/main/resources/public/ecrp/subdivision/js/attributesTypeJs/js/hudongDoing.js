//互动行为维度拼接xml和sql
var hudongDoing = {
	Xml : function (param){
			var data = eval(param);  
			var getXml = "<term>";
				for (var i = data.length-1; i >= 0; i--) {
					if(data[i].hudongTimeType == "1"){
						data[i].condition = "between";
						// data[i].hudongDateBefore = data[i].date.split("T")[0];
						// data[i].hudongDateAfter = data[i].date.split("T")[0];
						data[i].CDATA = (data[i].hudongDateBefore+" 00:00:00").replace(" ","T").replace("Z","")+"+08:00∝"+(data[i].hudongDateAfter.split(" ")[0]+" 23:59:59").replace(" ","T").replace("Z","")+"+08:00";
					}else{
						data[i].hudongDayBefore =parseInt(data[i].hudongDayBefore)<0?commonFunction.GetDateStr(parseInt(data[i].hudongDayBefore)):commonFunction.GetDateStr(-parseInt(data[i].hudongDayBefore));
						data[i].hudongDayAfter = parseInt(data[i].hudongDayAfter)<0?commonFunction.GetDateStr(parseInt(data[i].hudongDayAfter)):commonFunction.GetDateStr(-parseInt(data[i].hudongDayAfter));
						data[i].CDATA = data[i].hudongDayAfter+"T00:00:00+08:00∝"+data[i].hudongDayBefore+"T23:59:59+08:00";
						data[i].condition = "between";
					}
					if(data[i].relation != ""){
						getXml +='<term es_table="behavior" relation="'+data[i].relation+'">' +
						'<condition es_field="point_create_time"  operator="'+data[i].condition+'">' +
						'<![CDATA['+data[i].CDATA+']]>' +
						'</condition>' +
						'<condition es_field="point_create_time"  operator="equal">' +
						'<![CDATA['+data[i].hudongType+']]>' +
						'</condition>' +
						 '</term>';
						
					
					}
					else{
						getXml +='<term es_table="behavior">' +
						'<condition es_field="point_create_time"  operator="'+data[i].condition+'">' +
						'<![CDATA['+data[i].CDATA+']]>' +
						'</condition>' +
						'<condition es_field="activity_type"  operator="equal">' +
						'<![CDATA['+data[i].hudongType+']]>' +
						'</condition>' +
						 '</term>';
					}
					
				}
			 return getXml+"</term>";
			},

	Sql : function (param){
		 var getSqlJoin = " left join kd_operate_customer on kd_operate_customer.sys_customer_id = kd_customer.sys_customer_id ";
		 	var getSqlCondition = " ";
		// 	var data = eval(param);
		// 	for (var i = data.length-1; i >= 0; i--) {
		// 		if(data[i].relation == ""){
		// 			data[i].relation = "and"
		// 		}
		// 		if(data[i].hudongType == "1"){
		// 			getSqlCondition += " "+data[i].relation+" kd_operate_customer.update_time  between  '"+data[i].date.split("T")[0];+"' and  '"+ data[i].date.split("T")[0]+"' ";
		// 		}else if(data[i].hudongType == "0"){
		// 			getSqlCondition += " "+data[i].relation+" kd_operate_customer.update_time  between  '"+commonFunction.GetDateStr(parseInt(data[i].newday))+"' and  '"+commonFunction.GetDateStr(parseInt(data[i].oldday))+"' ";
		// 		}
		// 	}
		 	return getSqlJoin+"|"+getSqlCondition;
		}
		//
}
