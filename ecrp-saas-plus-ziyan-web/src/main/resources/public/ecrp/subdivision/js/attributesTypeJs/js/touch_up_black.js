//触达黑名单
var touch_up_black = {
	Data : function(param1,param){
			param1 = "touch_up_black";
			var getValue={};
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
			        	getValue.CDATA ="0";
			        	getValue.code =param1;
			        	getValue.type ='-1';
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
						getXml +='<term es_nested="customer_brand" relation="'+data[i].relation+'">' +
						'<condition es_field="customer_brand.is_touch_black" column="is_touch_black" operator="'+data[i].condition+'">' +
						'<![CDATA['+data[i].CDATA+']]>' +
						'</condition>' +
						'<condition es_field="customer_brand.brand_id" column="brand_id" operator="equal">' +
						'<![CDATA['+data[i].brand+']]>' +
						'</condition>' +
						 '</term>';
					}
					else{
						getXml +='<term es_nested="customer_brand">' +
						'<condition es_field="customer_brand.is_touch_black" column="is_touch_black" operator="'+data[i].condition+'">' +
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
			var name = "touch_up_black";
			var getSqlJoin = " left join kd_customer_brand on kd_customer_brand.sys_customer_id = kd_customer.sys_customer_id ";
			var getSqlCondition = "";
			var data = eval(param);
			for (var i = data.length-1; i >= 0; i--) {
				if(data[i].relation==""){
					data[i].relation="and";
				}
				getSqlCondition += " "+data[i].relation+" kd_customer_brand.is_touch_black  =  "+data[i].CDATA+"";
				getSqlCondition += " and kd_customer_brand.brand_id = '"+data[i].brand+"'";
			}
			return getSqlJoin+"|"+getSqlCondition;
		}
	
}
