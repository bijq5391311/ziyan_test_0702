//会员等级维度
function menbergrade(data,param){
	var getXml = "";
	var getValue = new Object(); 
		 $.ajax({
	   		 url:"/vip/graderuledetail/getList",
	       	 data:{},
	         type:"post",
	         async: false ,
	   		 success:function(result){
	                if(result){
	                	getValue.value = result;
	                	getValue.relation = "";
	                	getValue.condition ="equal";
	                	getValue.CDATA = [];
	                	
	                }else{
	                	return null;
	                }
	   		 }
		 })
			return getValue;
}
		 function menbergradeXml(param){
				var data = eval(param);  
				var getXml = "";
				if(data[0].CDATA.length >1){
					for (var i = 0; i < data[0].CDATA.length; i++) {
						if(data[0].relation != ""){
							getXml +='<term relation="'+data[0].relation+'">' +
							'<condition es_field="menbergrade" column="member_grade" operator="=">' +
							'<![CDATA['+data[0].CDATA[i]+']]>' +
							'</condition>' +
							 '</term>';
						}
						else{
							getXml +='<term >' +
							'<condition es_field="menbergrade" column="member_grade" operator="=">' +
							'<![CDATA['+data[0].CDATA[i]+']]>' +
							'</condition>' +
							 '</term>';
						}
						
					}
				}else{
					getXml +='<term>' +
					'<condition es_field="menbergrade" column="member_grade" operator="=">' +
					'<![CDATA['+data[0].CDATA[0]+']]>' +
					'</condition>' +
					'</term>';
				}
				return getXml;
				}

   	 function menbergradeSql(param){
   		var getSqlJoin = " left join kd_customer_brand ON kd_customer.sys_customer_id = kd_customer_brand.sys_customer_id ";
   		var getSqlCondition = "";
   		var data = eval(param);
   		for (var i = 0; i < data[0].CDATA.length; i++) {
//   			if(data[i].condition == "larger"){
//   				data[i].condition = ">";
//   			}else if(data[i].condition == "smaller"){
//   				data[i].condition = "<";
//   			}else if(data[i].condition == "largerEqual"){
//   				data[i].condition = ">=";
//   			}else if(data[i].condition == "smallerEqual"){
//   				data[i].condition = "<=";
//   			}
   			getSqlCondition = " and kd_customer_brand.member_grade in ('"+data[0].CDATA[i]+"')";
   		}
   		return getSqlJoin+"|"+getSqlCondition;
   	 }
   	

