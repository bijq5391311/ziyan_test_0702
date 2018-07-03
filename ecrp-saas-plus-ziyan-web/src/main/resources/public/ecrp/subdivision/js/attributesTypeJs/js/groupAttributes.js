//集团属性维度拼接xml和sql
var GroupAndBrand = {
	Xml : function (param,allNot){
			var data = eval(param);  
			var getXml = '';
			for (var i = data.length-1; i >= 0; i--) {
				if(data[i].type == "4"){
					 var propertydata = data[i].CDATA.length > 0 ?data[i].CDATA[0]:"";
					if(data[i].CDATA.length >1){
						for (var ll = 1; ll < data[i].CDATA.length; ll++) {
							propertydata = propertydata+"|"+data[i].CDATA[ll];
						}
					}
					data[i].CDATA = propertydata;
				}else if(data[i].type == "2"){
					data[i].CDATA = commonFunction.getDateFormat(new Date(data[i].CDATA),"yyyy-MM-dd");
				}
				if(!allNot){
						if(data[i].relation != ""){
							getXml +='<term es_filter="aggs" es_table="customer_property_value"  relation="'+data[i].relation+'">' +
							'<condition es_field="property_value" column="property_value" operator="'+data[i].condition+'">' +
							'<![CDATA['+data[i].CDATA+']]>' +
							'</condition>' +
							'<condition es_field="customer_property_id"  operator="'+data[i].condition+'">'+
							'<![CDATA['+data[i].id+']]></condition></term>';
						}
						else{
							getXml +='<term es_filter="aggs" es_table="customer_property_value"  >' +
							'<condition es_field="property_value" column="property_value" operator="'+data[i].condition+'">' +
							'<![CDATA['+data[i].CDATA+']]>' +
							'</condition>' +
							'<condition es_field="customer_property_id"  operator="'+data[i].condition+'">'+
							'<![CDATA['+data[i].id+']]></condition></term>';
						}
					}else if(allNot){
						if(data[i].relation != ""){
							getXml +='<term es_filter="aggs"  es_table="customer_property_value"  relation="'+data[i].relation+'">' +
							'<condition es_field="property_value" column="property_value" operator="equal">' +
							'<![CDATA['+data[i].CDATA+']]>' +
							'</condition>' +
							'<condition es_field="customer_property_id"  operator="equal">'+
							'<![CDATA['+data[i].id+']]></condition></term>';
						}
						else{
							getXml +='<term es_filter="aggs"  es_table="customer_property_value">' +
							'<condition es_field="property_value" column="property_value" operator="equal">' +
							'<![CDATA['+data[i].CDATA+']]>' +
							'</condition>' +
							'<condition es_field="customer_property_id"  operator="equal">'+
							'<![CDATA['+data[i].id+']]></condition></term>';
						}
					
					}
					
					
					
				}
			return getXml;
			},

	Sql : function (param){
			var getSqlJoin = " left join kd_customer_property_value on kd_customer_property_value.sys_customer_id = kd_customer.sys_customer_id";
			var getSqlCondition = "  ";
			var data = eval(param);
			for (var i = data.length-1; i >= 0; i--) {
				if(data[i].condition == "equal"){
					data[i].condition = "=";
				}if(data[i].condition == "notEqual"){
					data[i].condition = "!=";
				}
				if(data[i].relation == ""){
					data[i].relation = "and"
				}
				if(data[i].type == '2'){
					data[i].CDATA = data[i].CDATA.split("T")[0];
				}
				
				getSqlCondition += " "+data[i].relation+" kd_customer_property_value.property_value  "+data[i].condition+" '"+data[i].CDATA+"' and kd_customer_property_value.source="+data[i].source+" and kd_customer_property_value.target="+data[i].target+" ";
			}
			return getSqlJoin+"|"+getSqlCondition;
		}
	
}
