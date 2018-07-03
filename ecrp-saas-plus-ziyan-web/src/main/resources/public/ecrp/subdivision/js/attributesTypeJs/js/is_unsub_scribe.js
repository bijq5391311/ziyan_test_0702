//短信退订会员
var is_unsub_scribe = {
	Data : function(param1,param){
			param1 = "is_unsub_scribe";
			var getValue ={};
        	getValue.relation = "";
        	getValue.condition ="equal";
        	getValue.CDATA ="0";
        	getValue.code =param1;
			return getValue;

		},
	Xml : function (param){
			var data = eval(param);  
			var getXml = "";
			if(data.length >1){
				for (var i = data.length-1; i >= 0; i--) {
					if(data[i].relation != ""){
						getXml +='<term relation="'+data[i].relation+'">' +
						'<condition es_field="'+data[i].code+'" column="'+data[i].code+'" operator="'+data[i].condition+'">' +
						'<![CDATA['+data[i].CDATA+']]>' +
						'</condition>' +
						 '</term>';
					}
					else{
						getXml +='<term >' +
						'<condition es_field="'+data[i].code+'" column="'+data[i].code+'" operator="'+data[i].condition+'">' +
						'<![CDATA['+data[i].CDATA+']]>' +
						'</condition>' +
						 '</term>';
					}
					
				}
			}else{
				getXml +='<term>' +
				'<condition es_field="'+data[0].code+'" column="'+data[0].code+'" operator="'+data[0].condition+'">' +
				'<![CDATA['+data[0].CDATA+']]>' +
				'</condition>' +
				'</term>';
			}
			return getXml;
			},

	Sql : function (param){
			var name = "is_unsub_scribe";
			var getSqlJoin = "";
			var getSqlCondition = "";
			var data = eval(param);
			for (var i = data.length-1; i >= 0; i--) {
				if(data[i].condition == "larger"){
					data[i].condition = ">";
				}else if(data[i].condition == "smaller"){
					data[i].condition = "<";
				}else if(data[i].condition == "largerEqual"){
					data[i].condition = ">=";
				}else if(data[i].condition == "smallerEqual"){
					data[i].condition = "<=";
				}
//				getSqlCondition += " and kd_customer."+name+"  "+data[i].condition+" '"+data[i].CDATA+"'";
			}
			return getSqlJoin+"|"+getSqlCondition;
		}
	
}
