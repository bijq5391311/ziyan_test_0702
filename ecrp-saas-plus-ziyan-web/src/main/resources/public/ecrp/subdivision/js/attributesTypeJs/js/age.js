//年龄维度
var age = {
		Data:function(){
		param1 = "age";
		var getValue ={};
    	getValue.relation = "";
    	getValue.condition ="equal";
    	getValue.CDATA ="";
    	getValue.code =param1;
		return getValue;
	},
	Xml:function  (param){
		var data = eval(param);  
		var getXml = "<term>";
			for (var i = data.length-1; i >= 0; i--) {
				data[i].CDATA = new Date().getFullYear() - data[i].CDATA+1;
				if(data[i].condition == "equal"){
					data[i].CDATA = data[i].CDATA;
					data[i].CDATA = data[i].CDATA+"-01-01∝"+data[i].CDATA+"-12-31";
					data[i].condition = "between";
				}else if(data[i].condition == "largerEqual"){
					data[i].CDATA = data[i].CDATA-1;
					data[i].CDATA = data[i].CDATA+"-12-31";
				}else if(data[i].condition == "larger"){
					data[i].CDATA = data[i].CDATA;
					data[i].CDATA = data[i].CDATA+"-12-31";
				}else if(data[i].condition == "smallerEqual"){
					data[i].CDATA = data[i].CDATA + 1;
					data[i].CDATA = data[i].CDATA+"-01-01";
				}else if(data[i].condition == "smaller"){
					data[i].CDATA = data[i].CDATA+"-01-01";
				}
				
				if(data[i].relation != ""){
					if(data[i].condition == "notEqual"){
							getXml +='<term relation="not">' +
							'<condition es_field="birthday"  operator="smaller">' +
							'<![CDATA['+data[i].CDATA+'-12-31]]>' +
							'</condition>' +
							'<condition es_field="birthday"  operator="larger">' +
							'<![CDATA['+data[i].CDATA+'-01-01]]>' +
							'</condition>' +
							 '</term>';
					}else{
						getXml +='<term relation="'+data[i].relation+'">' +
						'<condition es_field="birthday"  operator="'+data[i].condition+'">' +
						'<![CDATA['+data[i].CDATA+']]>' +
						'</condition>' +
						 '</term>';
					}
					
				}
				else{if(data[i].condition == "notEqual"){
					getXml +='<term relation="not">' +
					'<condition es_field="birthday"  operator="smaller">' +
					'<![CDATA['+data[i].CDATA+'-12-31]]>' +
					'</condition>' +
					'<condition es_field="birthday"  operator="larger">' +
					'<![CDATA['+data[i].CDATA+'-01-01]]>' +
					'</condition>' +
					 '</term>';
				}else{
				getXml +='<term >' +
				'<condition es_field="birthday" column="birthday" operator="'+data[i].condition+'">' +
				'<![CDATA['+data[i].CDATA+']]>' +
				'</condition>' +
				 '</term>';
				}
					
				}
				
			}
		return getXml+"</term>";
		},

	Sql:function (param){
		var getSqlJoin = "";
		var getSqlCondition = "";
		var data = eval(param);
		for (var i = data.length-1; i >= 0; i--) {
			data[i].CDATA = new Date().getFullYear() - data[i].CDATA+1;
			if(data[i].condition == "equal"){
				data[i].CDATA = data[i].CDATA;
				data[i].CDATA = data[i].CDATA+"-01-01' and '"+data[i].CDATA+"-12-31";
				data[i].condition = "between";
			}else if(data[i].condition == "notEqual"){
				data[i].CDATA = data[i].CDATA;
				data[i].CDATA = ""+data[i].CDATA+"-01-01' or  kd_customer.birthday >'"+data[i].CDATA+"-12-31";
				data[i].condition = "<";
			}else if(data[i].condition == "larger"){
				data[i].CDATA = data[i].CDATA;
				var minYear = new Date().getFullYear() - 100;
				data[i].CDATA = data[i].CDATA+"-12-31";
				data[i].condition = ">";
			}else if(data[i].condition == "smaller"){
				data[i].CDATA = data[i].CDATA;
				data[i].CDATA = data[i].CDATA+"-01-01";
				data[i].condition = "<";
			}else if(data[i].condition == "largerEqual"){
				data[i].CDATA = data[i].CDATA;
				var minYear = new Date().getFullYear() - 100;
				data[i].CDATA = data[i].CDATA+"-01-01";
				data[i].condition = ">=";
			}else if(data[i].condition == "smallerEqual"){
				data[i].CDATA = data[i].CDATA;
				data[i].CDATA = data[i].CDATA+"-12-31";
				data[i].condition = "<=";
			}
			if(data[i].relation ==""){
				data[i].relation = "and";
			}
			getSqlCondition += " "+data[i].relation+" kd_customer.birthday "+data[i].condition+" '"+data[i].CDATA+"'";
		}
		return getSqlJoin+"|"+getSqlCondition;
	}
}
