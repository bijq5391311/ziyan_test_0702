//回访黑名单
var is_callback_black = {
	Data : function(param1,param){
			param1 = "is_callback_black";
			var getValue ="";
				 $.ajax({
			   		 url:"/base/common/getSubdivisionControl",
			       	 data:{code:param1},
			         type:"post",
			         async: false ,
			   		 success:function(result){
			                if(result.success){
			                	getValue = result.result;
			                	getValue.relation = "";
			                	getValue.condition ="";
			                	getValue.CDATA ="";
			                }else{
			                	return null;
			                }
			   		 }
				 })


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
			var name = "is_callback_black";
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
