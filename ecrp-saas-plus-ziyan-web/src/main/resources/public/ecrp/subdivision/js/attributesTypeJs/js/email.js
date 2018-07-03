//Email
var email = {
	Data : function(param1,param){
			param1 = "email";
			var getValue ={};
			getValue.relation = "";
        	getValue.condition ="equal";
        	getValue.CDATA ="";
        	getValue.code =param1;
        	getValue.result ="";
			return getValue;

		},
	Xml : function (param){
			var data = eval(param);  
			var getXml = '<term>';
				for (var i = data.length-1; i >= 0; i--) {
					if(data[i].relation != ""){
						getXml +='<term relation="'+data[i].relation+'">' +
						'<condition es_field="email" column="email" operator="'+data[i].condition+'">' +
						'<![CDATA['+data[i].CDATA+']]>' +
						'</condition>' +
						 '</term>';
						if(data[i].condition == "isNull"){
							getXml += '<term relation="or"><condition es_field="email"  operator="equal"><![CDATA[]]></condition></term>';
							getXml += '<term relation="or"><condition es_field="email"  operator="equal"><![CDATA[NULL]]></condition></term>';
						}else if(data[i].condition == "isNotNull"){
							getXml += '<term relation="and"><condition es_field="email"  operator="notEqual"><![CDATA[]]></condition></term>';
							getXml += '<term relation="and"><condition es_field="email"  operator="notEqual"><![CDATA[NULL]]></condition></term>';
						}
					}
					else{
						getXml +='<term >' +
						'<condition es_field="email" column="email" operator="'+data[i].condition+'">' +
						'<![CDATA['+data[i].CDATA+']]>' +
						'</condition>' +
						 '</term>';
						if(data[i].condition == "isNull"){
							getXml += '<term relation="or"><condition es_field="email"  operator="equal"><![CDATA[]]></condition></term>';
							getXml += '<term relation="or"><condition es_field="email"  operator="equal"><![CDATA[NULL]]></condition></term>';
						}else if(data[i].condition == "isNotNull"){
							getXml += '<term relation="and"><condition es_field="email"  operator="notEqual"><![CDATA[]]></condition></term>';
							getXml += '<term relation="and"><condition es_field="email"  operator="notEqual"><![CDATA[NULL]]></condition></term>';
						}
					}
					
				}
			return getXml+"</term>";
			},

	Sql : function (param){
			var name = "email";
			var getSqlJoin = "";
			var getSqlCondition = "";
			var data = eval(param);
			for (var i = data.length-1; i >= 0; i--) {
				if(data[i].relation ==""){
					data[i].relation = "and";
				}
				if(data[i].condition == "postLike"){
					getSqlCondition += " "+data[i].relation+" kd_customer.email like '%"+data[i].CDATA+"' ";
				}else if(data[i].condition == "notPostLike"){
					getSqlCondition += " "+data[i].relation+" kd_customer.email not like '%"+data[i].CDATA+"' ";
				}else if(data[i].condition == "isNotNull"){
					getSqlCondition += " "+data[i].relation+" kd_customer.email is not null ";
				}else if(data[i].condition == "isNull"){
					getSqlCondition += " "+data[i].relation+" kd_customer.email is null ";
				}
			}
			return getSqlJoin+"|"+getSqlCondition;
		}
	
}
