//会员类型
var user_type = {
	Data : function(param1,param){
			param1 = "user_type";
			var getValue ={};
        	getValue.result="";
        	getValue.relation = "";
        	getValue.condition ="equal";
        	getValue.CDATA =1;
        	getValue.code =param1;
        	var obj={}
			return getValue;

		},
	Xml : function (param){
			var data = eval(param);  
			var getXml = "<term>";
				for (var i = data.length-1; i >= 0; i--) {
						getXml +='<term>' +
						'<condition es_field="'+data[i].code+'" column="'+data[i].code+'" operator="'+data[i].condition+'">' +
						'<![CDATA['+data[i].CDATA+']]>' +
						'</condition>' +
						 '</term>';
				}
			return getXml+"</term>";
			},

	Sql : function (param){
			var name = "user_type";
			var getSqlJoin = "";
			var getSqlCondition = "";
			var data = eval(param);
			for (var i = data.length-1; i >= 0; i--) {
				if(data[i].condition == "equal"){
					data[i].condition = "=";
				}else if(data[i].condition == "notEqual"){
					data[i].condition = "!=";
				}
				getSqlCondition += " and kd_customer."+name+"  "+data[i].condition+" '"+data[i].CDATA+"'";
			}
			return getSqlJoin+"|"+getSqlCondition;
		}
	
}
