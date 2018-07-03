//等级梯度
var gradient = {
		Data:function(param1,param){

			param1 = "gradient";
			var getValue ={};
			getValue.relation = "";
			getValue.condition ="equal";
			getValue.CDATA ="";
			getValue.code =param1;
			return getValue;


		},
		
	Xml:function(param){
		
	},
	Sql:function(param){

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
			getSqlCondition += " and kd_customer.sex "+data[i].condition+" '"+data[i].CDATA+"'";
		}
		return getSqlJoin+"|"+getSqlCondition;

	}
	
}

