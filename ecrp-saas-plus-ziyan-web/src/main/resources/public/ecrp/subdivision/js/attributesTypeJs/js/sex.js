//年龄维度
var sex = {
		Data:function(){
			var getValue ={};
			getValue.relation = "";
			getValue.condition ="equal";
			getValue.CDATA ="1";
			getValue.code ="sex";
			getValue.type ="-1";
			return getValue;

		},
	Xml:function(param){

		var data = eval(param);  
		var getXml = '<term >';
			for (var i = data.length-1; i >= 0; i--) {
					getXml +='<term >' +
					'<condition es_field="'+data[i].code+'" column="'+data[i].code+'" operator="'+data[i].condition+'">' +
					'<![CDATA['+data[i].CDATA+']]>' +
					'</condition>' +
					 '</term>';
			}
		return getXml+"</term>";
		
	},
	Sql:function(param){

		var getSqlJoin = "";
		var getSqlCondition = "";
		var data = eval(param);
		for (var i = data.length-1; i >= 0; i--) {
			getSqlCondition += " and kd_customer.sex =  '"+data[i].CDATA+"'";
		}
		return getSqlJoin+"|"+getSqlCondition;

	}
		
		
}
