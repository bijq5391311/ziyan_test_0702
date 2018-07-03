//open_id
var open_id = {
	Data : function(param1,param){
			param1 = "open_id";
			var getValue ={};
        	getValue.relation = "";
        	getValue.condition ="equal";
        	getValue.code =param1;
        	getValue.CDATA ="";
			return getValue;

		},
	Xml : function (param){
			var data = eval(param);  
			var getXml = "<term>";
				for (var i = data.length-1; i >= 0; i--) {
					if(data[i].relation != ""){
						getXml +='<term es_nested="customer_weixin" relation="'+data[i].relation+'">' +
						'<condition es_field="customer_weixin.'+data[i].code+'" column="'+data[i].code+'" operator="'+data[i].condition+'">' +
						'<![CDATA['+data[i].CDATA+']]>' +
						'</condition>' +
						 '</term>';
						if(data[i].condition == "isNull"){
							getXml += '<term relation="or"><condition es_field="customer_weixin.'+data[i].code+'" operator="equal"><![CDATA[]]></condition></term>';
							getXml += '<term relation="or"><condition es_field="customer_weixin.'+data[i].code+'"  operator="equal"><![CDATA[NULL]]></condition></term>';
						}else if(data[i].condition == "isNotNull"){
							getXml += '<term relation="and"><condition es_field="customer_weixin.'+data[i].code+'"  operator="notEqual"><![CDATA[]]></condition></term>';
							getXml += '<term relation="and"><condition es_field="customer_weixin.'+data[i].code+'"  operator="notEqual"><![CDATA[NULL]]></condition></term>';
						}
					}
					else{
						getXml +='<term es_nested="customer_weixin" >' +
						'<condition es_field="customer_weixin.'+data[i].code+'" column="'+data[i].code+'" operator="'+data[i].condition+'">' +
						'<![CDATA['+data[i].CDATA+']]>' +
						'</condition>' +
						 '</term>';
						if(data[i].condition == "isNull"){
							getXml += '<term relation="or"><condition es_field="customer_weixin.'+data[i].code+'"  operator="equal"><![CDATA[]]></condition></term>';
							getXml += '<term relation="or"><condition es_field="customer_weixin.'+data[i].code+'"  operator="equal"><![CDATA[NULL]]></condition></term>';
						}else if(data[i].condition == "isNotNull"){
							getXml += '<term relation="and"><condition es_field="customer_weixin.'+data[i].code+'"  operator="notEqual"><![CDATA[]]></condition></term>';
							getXml += '<term relation="and"><condition es_field="customer_weixin.'+data[i].code+'"  operator="notEqual"><![CDATA[NULL]]></condition></term>';
						}
					}
					
				}
			return getXml+"</term>";
			},

	Sql : function (param){
			var name = "open_id";
			var getSqlJoin = " left join kd_customer_weixin on kd_customer_weixin.sys_customer_id = kd_customer.sys_customer_id ";
			var getSqlCondition = "";
			var data = eval(param);
			for (var i = data.length-1; i >= 0; i--) {
				if(data[i].condition == "equal"){
					data[i].condition = "=";
				}else if(data[i].condition == "notEqual"){
					data[i].condition = "!=";
				}else if(data[i].condition == "isNull"){
                    data[i].condition = " is null or kd_customer_weixin.open_id = ";
                    data[i].CDATA = "";
				}else if(data[i].condition == "isNotNull"){
                    data[i].condition = "is not null or kd_customer_weixin.open_id = ";
                    data[i].CDATA = "";
				}
				getSqlCondition += " and kd_customer_weixin."+name+"  "+data[i].condition+" '"+data[i].CDATA+"'";
			}
			return getSqlJoin+"|"+getSqlCondition;
		}
	
}
