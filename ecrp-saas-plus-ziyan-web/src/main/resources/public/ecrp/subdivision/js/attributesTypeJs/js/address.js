//地址
var address = {
	Data : function(param1,param){
			param = "address";
			var getValue={};
        	getValue.result = "";
        	getValue.relation = "";
        	getValue.condition ="like";
        	getValue.CDATA ="";
        	getValue.code =param;
			return getValue;

		},
	Xml : function (param){
			var data = eval(param);  
			var getXml = "<term>";
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
			return getXml+"</term>";
			},

	Sql : function (param){
			var name = "address";
			var getSqlJoin = "";
			var getSqlCondition = "";
			var data = eval(param);
			for (var i = data.length-1; i >= 0; i--) {
				if(data[i].condition == "like"){
					data[i].condition =" like ";
				}else if(data[i].condition == "notLike"){
					data[i].condition =" not like ";
				}
				if(data[i].relation==""){
					data[i].relation="and";
				}
				getSqlCondition += " "+data[i].relation+" kd_customer."+name+"  "+data[i].condition+"  '%"+data[i].CDATA+"%'";
			}
			return getSqlJoin+"|"+getSqlCondition;
		}
	
}
