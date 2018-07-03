//累计购买数量
var buy_total_num = {
	Data : function(param1,param){
			param = "buy_total_num";
			var getValue ={};
			getValue.start = "";
        	getValue.end = "";
        	getValue.code =param;
        	getValue.query ="aggs";

			return getValue;

		},
	Xml : function (param){
		var data = eval(param);  
		var getXml = "";
		for (var i = data.length-1; i >= 0; i--) {
					getXml +='<group es_query="aggs" es_filter="aggs">' +
					'<condition es_aggs="sum" es_nested="customer_shop_rfm" es_field="customer_shop_rfm.'+data[i].code+'" operator="between">' +
					'<![CDATA['+data[i].start+'∝'+data[i].end+']]>' +
					'</condition>';
			}
		return getXml+"</group>";
		},

	Sql : function (param){
			var name = "buy_total_num";
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
