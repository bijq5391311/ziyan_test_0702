//会员等级维度
var member_grade = {
		Data:function(data,param){
			var getXml = "";
			var getValue = new Object(); 
			                	getValue.relation = "";
			                	getValue.condition ="equal";
			                	getValue.CDATA = "";
			                	getValue.code = "member_grade";
					return getValue;

		},
		Xml:function(param){
			var data = eval(param);
			var gradeIDList = [];
			for (var k = 0; k < data.length; k++) {
				gradeIDList.push(data[k].CDATA);
			}
			 $.ajax({
		   		 url:"/base/common/queryGradeAndBrand",
		       	 data:{GradeIDList:gradeIDList},
		         type:"post",
		         async: false ,
//		         contentType: "application/json",
		   		 success:function(result){
		                if(result){
		                	for (var j = 0; j < data.length; j++) {
		                		for (var k = 0; k < result.result.length; k++) {
			                		if(result.result[k].gradeId == data[j].CDATA ){
			                			data[j].brand = result.result[k].brandId;
			                			data[j].grade = result.result[k].grade;
			                		}
								}
							}
		                }else{
		                	return null;
		                }
		   		 }
			 })
			 
			var getXml = '<term>';
				for (var i = data.length-1; i >= 0; i--) {
					if(data[i].relation != ""){
						if(typeof (data[i].grade) != 'undefined' && typeof (data[i].brand) != 'undefined'&&data[i].grade != data[i].CDATA){
                            getXml +='<term es_nested="customer_brand" relation="'+data[i].relation+'">' +
                                '<condition es_field="customer_brand.member_grade"  operator="'+data[i].condition+'">' +
                                '<![CDATA['+data[i].grade+']]>' +
                                '</condition>' +
                                '<condition es_field="customer_brand.brand_id"  operator="equal">' +
                                '<![CDATA['+data[i].brand+']]>' +
                                '</condition>' +
                                '</term>';
						}else{
                            getXml +='<term es_nested="customer_brand" relation="'+data[i].relation+'">' +
                                '<condition es_field="customer_brand.member_grade"  operator="'+data[i].condition+'">' +
                                '<![CDATA['+data[k].CDATA+']]>' +
                                '</condition></term>' ;
						}

					}
					else{
                        if(typeof (data[i].grade) != 'undefined' && typeof (data[i].brand) != 'undefined') {
                            getXml += '<term es_nested="customer_brand">' +
                                '<condition es_field="customer_brand.member_grade"  operator="' + data[i].condition + '">' +
                                '<![CDATA[' + data[i].grade + ']]>' +
                                '</condition>' +
                                '<condition es_field="customer_brand.brand_id"  operator="equal">' +
                                '<![CDATA[' + data[i].brand + ']]>' +
                                '</condition>' +
                                '</term>';
                        }else{
                            getXml +='<term es_nested="customer_brand">' +
                                '<condition es_field="customer_brand.member_grade"  operator="'+data[i].condition+'">' +
                                '<![CDATA['+data[k].CDATA+']]>' +
                                '</condition></term>' ;
                        }
					}
					
				}
			return getXml+"</term>";
			
		},
		Sql:function(param){

	   		var getSqlJoin = " left join kd_customer_brand on kd_customer.sys_customer_id = kd_customer_brand.sys_customer_id ";
	   		var getSqlCondition = "";
	   		var data = eval(param);
	   		for (var i = data.length-1; i >= 0; i--) {
	   			if(data[i].condition == "equal"){
	   				data[i].condition = "=";
	   			}else if(data[i].condition == "notEqual"){
	   				data[i].condition = "!=";
	   			}
	   			if(data[i].relation ==""){
					data[i].relation = "and";
				}
	   			getSqlCondition = " "+data[i].relation+" kd_customer_brand.member_grade  "+data[i].condition+" '"+data[0].CDATA[i]+"'";
	   		}
	   		return getSqlJoin+"|"+getSqlCondition;
	   	 
		}
		
}

