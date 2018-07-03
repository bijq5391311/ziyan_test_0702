//手机号
var Mobile = {
	Data : function(param1,param){
			param1 = "Mobile";
			var getValue ={};
        	getValue.relation = "";
        	getValue.condition ="equal";
        	getValue.CDATA ="";
        	getValue.code =param1;
			return getValue;

		},
	Xml : function (param){
			var data = eval(param);  
			var getXml = "<term>";
				for (var i = data.length-1; i >= 0; i--) {
					if(data[i].relation != ""){
						getXml +='<term relation="'+data[i].relation+'">' +
						'<condition es_field="mobile" column="mobile" operator="'+data[i].condition+'">' +
						'<![CDATA['+data[i].CDATA+']]>' +
						'</condition>' +
						 '</term>';
						if(data[i].condition == "isNull"){
							getXml += '<term relation="or"><condition es_field="mobile"  operator="equal"><![CDATA[]]></condition></term>';
							getXml += '<term relation="or"><condition es_field="mobile"  operator="equal"><![CDATA[NULL]]></condition></term>';
						}else if(data[i].condition == "isNotNull"){
							getXml += '<term relation="and"><condition es_field="mobile"  operator="notEqual"><![CDATA[]]></condition></term>';
							getXml += '<term relation="and"><condition es_field="mobile"  operator="notEqual"><![CDATA[NULL]]></condition></term>';
						}
					}
					else{
						getXml +='<term >' +
						'<condition es_field="mobile" column="mobile" operator="'+data[i].condition+'">' +
						'<![CDATA['+data[i].CDATA+']]>' +
						'</condition>' +
						 '</term>';
						if(data[i].condition == "isNull"){
							getXml += '<term relation="or"><condition es_field="mobile"  operator="equal"><![CDATA[]]></condition></term>';
							getXml += '<term relation="or"><condition es_field="mobile"  operator="equal"><![CDATA[NULL]]></condition></term>';
						}else if(data[i].condition == "isNotNull"){
							getXml += '<term relation="and"><condition es_field="mobile"  operator="notEqual"><![CDATA[]]></condition></term>';
							getXml += '<term relation="and"><condition es_field="mobile"  operator="notEqual"><![CDATA[NULL]]></condition></term>';
						}
					}
					
				}
			return getXml+"</term>";
			},

	Sql : function (param){
			var name = "mobile";
			var getSqlJoin = "";
			var getSqlCondition = "";
			var data = eval(param);
			for (var i = 0; i < data.length; i++) {
				if(data[i].condition == "equal"){
					data[i].condition = "=";
				}else if(data[i].condition == "notEqual"){
					data[i].condition = "!=";
				}
				if(data[i].condition == "preLike"){
					data[i].condition = " like ";
					data[i].CDATA = ""+data[i].CDATA.substr(0, 3)+"%";
				}else if(data[i].condition == "notPreLike"){
					data[i].condition = " not like ";
					data[i].CDATA = ""+data[i].CDATA.substr(0, 3)+"%";
				}else if(data[i].condition == "isNull"){
					data[i].condition = " is null or kd_customer.mobile = ";
					data[i].CDATA = "";
				}else if(data[i].condition == "isNotNull"){
					data[i].condition = " is not null or kd_customer.mobile !=";
					data[i].CDATA = "";
				}
				if(data[i].relation ==""){
					data[i].relation = "and";
				}
				getSqlCondition += " "+data[i].relation+" kd_customer."+name+"  "+data[i].condition+"  '"+data[i].CDATA+"'";
			}
			return getSqlJoin+"|"+getSqlCondition;
		}
	
}
