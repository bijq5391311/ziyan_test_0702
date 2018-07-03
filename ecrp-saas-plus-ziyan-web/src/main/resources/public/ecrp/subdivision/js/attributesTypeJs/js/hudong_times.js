//互动次数
var hudong_times = {
	Data : function(param1,param){
			param1 = "hudong_times";
			var getValue ={};
			getValue.start = "";
        	getValue.end = "";
	    	getValue.code =param1;
	    	getValue.query = "aggs";
	    	getValue.relation = "and";
			return getValue;

		},
	Xml : function (param){
		var data = eval(param);  
		var getXml = "";
		var result = "";
		for (var i = data.length-1; i >= 0; i--) {
			result += data[i].start+'∝'+data[i].end+'∝';
			}
			result = result.substring(0,result.length-1);
			getXml +='<group es_query="aggs" es_filter="aggs">' +
			'<condition es_aggs="sum" es_nested="customer_shop_rfm" es_field="customer_shop_rfm.interact_times" operator="between">' +
			'<![CDATA['+result+']]>' +
			'</condition></group>';
		return getXml;
		},

	Sql : function (param){
			var name = "hudong_times";
			var getSqlJoin = " left join kd_operate_customer on kd_operate_customer.sys_customer_id = kd_customer.sys_customer_id ";
			var getSqlCondition = "";
			var data = eval(param);
			for (var i = data.length-1; i >= 0; i--) {
				if(data[i].condition == "equal"){
					data[i].condition = "=";
				}else if(data[i].condition == "notEqual"){
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
				getSqlCondition += " and kd_operate_customer.interact_times  "+data[i].condition+" '"+data[i].CDATA+"'";
			}
			return getSqlJoin+"|"+getSqlCondition;
		}
	
}
