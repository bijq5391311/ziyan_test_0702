//积分
var score = {
	Data : function(param1,param){
			param1 = "score";
			var getValue ={};
			$.ajax({
				url:"getBrand",
				data:"",
				type:"post",
				async:false,
				success:function(result){
					if(result.success){
						getValue.result = "";
			        	getValue.relation = "";
			        	getValue.condition ="equal";
			        	getValue.CDATA ="";
			        	getValue.code =param1;
			        	getValue.brand = result.result.length>0?result.result[0].v:"";
			        	getValue.brands = result.result;
					}
				}
			});
        	

			return getValue;

		},
	Xml : function (param){
			var data = eval(param);  
			var getXml = "<term>";
				for (var i = data.length-1; i >= 0; i--) {
					if(data[i].relation != ""){
						getXml +='<term  es_nested="customer_brand" relation="'+data[i].relation+'">' +
						'<condition es_field="customer_brand.'+data[i].code+'" column="'+data[i].code+'" operator="'+data[i].condition+'">' +
						'<![CDATA['+data[i].CDATA+']]>' +
						'</condition>' +
						'<condition es_field="customer_brand.brand_id" column="brand_id" operator="equal">' +
						'<![CDATA['+data[i].brand+']]>' +
						'</condition>' +
						 '</term>';
					}
					else{
						getXml +='<term es_nested="customer_brand">' +
						'<condition es_field="customer_brand.'+data[i].code+'" column="'+data[i].code+'" operator="'+data[i].condition+'">' +
						'<![CDATA['+data[i].CDATA+']]>' +
						'</condition>' +
						'<condition es_field="customer_brand.brand_id" column="brand_id" operator="equal">' +
						'<![CDATA['+data[i].brand+']]>' +
						'</condition>' +
						 '</term>';
					}
					
				}
			return getXml+"</term>";
			},

	Sql : function (param){
			var name = "score";
			var getSqlJoin = " left join kd_customer_brand on kd_customer.sys_customer_id = kd_customer_brand.sys_customer_id ";
			var getSqlCondition = "";
			var data = eval(param);
			for (var i = data.length-1; i >= 0; i--) {
				if(data[i].condition == "equal"){
					data[i].condition = "=";
				} if(data[i].condition == "notEqual"){
					data[i].condition = "!=";
				}else if(data[i].condition == "larger"){
					data[i].condition = ">";
				}else if(data[i].condition == "smaller"){
					data[i].condition = "<";
				}else if(data[i].condition == "largerEqual"){
					data[i].condition = ">=";
				}else if(data[i].condition == "smallerEqual"){
					data[i].condition = "<=";
				}
				if(data[i].relation == ""){
					data[i].relation = "and";
				}
				getSqlCondition += " "+data[i].relation+" kd_customer_brand.interaction_total_score  "+data[i].condition+" '"+data[i].CDATA+"'";
                getSqlCondition += " and kd_customer_brand.brand_id = '"+data[i].brand+"' ";
			}
			return getSqlJoin+"|"+getSqlCondition;
		}
	
}
