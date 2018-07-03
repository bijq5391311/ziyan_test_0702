//退款总额
var refund_amount = {
	Data : function(param1,param){
			param = "refund_amount";
			var getValue ={};
			getValue.start = "";
        	getValue.end = "";
        	getValue.code =param;
        	getValue.query ="aggs";
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
			'<condition es_aggs="sum" es_nested="customer_shop_rfm" es_field="customer_shop_rfm.refund_amount" operator="between">' +
			'<![CDATA['+result+']]>' +
			'</condition></group>';
		return getXml;
		},

	Sql : function (param){
			var name = "refund_amount";
        var getSqlJoin = " left join kd_customer_shop_rfm on kd_customer_shop_rfm.sys_customer_id = kd_customer.sys_customer_id ";
        var getSqlCondition = "";
        var data = eval(param);
        for (var i = data.length-1; i >= 0; i--) {
            if(i == data.length-1){
                data[i].relation = "";
            }else if(data[i].relation == "and"){
                data[i].relation = "or";
            }

            getSqlCondition += " "+data[i].relation+" result between '"+data[i].start+"' and '"+data[i].end+"'";
        }
        return getSqlJoin+"|"+getSqlCondition;
		}
	
}
