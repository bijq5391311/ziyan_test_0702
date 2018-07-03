//地区
var city = {
	Data : function(){
			param1 = "city";
			var parent_id=0;
			var getValue ={};
			getValue.result = ChinaCties;
        	getValue.relation = "";
        	getValue.valueAndKey = {};
        	getValue.condition ="equal";
        	getValue.CDATA ="";
        	getValue.province ="";
        	getValue.shi ="";
        	getValue.district ="";
        	getValue.provinceValue ="";
        	getValue.shiValue ="";
        	getValue.districtValue ="";
        	getValue.code ="city";

			return getValue;

		},
	Xml : function (param){
			var data = eval(param);
			var getXml = "<term>";
			var showValueArray =[];
			var districts = [];
			for (var i = data.length-1; i >= 0; i--) {
				var tValue = "";
				if(data[i].provinceValue != ""){
					tValue += data[i].provinceValue+",";
					if(data[i].shiValue != ""){
						tValue += data[i].shiValue+",";
						if(data[i].district != ""){
							tValue += data[i].district;
						}
					}
					showValueArray.push(tValue);
				}
				for(var k = 0 ;k < data[i].result.length;k++){
					if(data[i].result[k].parent_id == 110100 && data[i].result[k].tb_id != data[i].district){
						districts.push(data[i].result[k].tb_name);
					}
				}
				console.log(districts.length);
				var Like = 'like'
				if(data[i].condition == 'notEqual'){
                    // data[i].relation = 'not'
                    Like = 'notLike'
				}
					if(data[i].relation != "" ){
                        // data[i].condition = 'equal';
						if(data[i].province == 1){
							getXml +='<term relation="'+data[i].relation+'">' +
							'<condition es_field="province" column="province" operator="'+Like+'">' +
							'<![CDATA[]]>' +
							'</condition>' +
							 '</term>';
						}else if(data[i].province !=  '' && data[i].shiValue == '' && data[i].district == ''){
							getXml +='<term relation="'+data[i].relation+'">' +
							'<condition es_field="province" column="province" operator="'+data[i].condition+'">' +
							'<![CDATA['+data[i].provinceValue+']]>' +
							'</condition>' +
							 '</term>';
						}else if(data[i].province !=  '' && data[i].shiValue != '' && data[i].district == ''){
							getXml +='<term relation="'+data[i].relation+'">' +
							'<condition es_field="province" column="province" operator="'+data[i].condition+'">' +
							'<![CDATA['+data[i].provinceValue+']]>' +
							'</condition>' +
							'<condition es_field="city" column="city" operator="'+data[i].condition+'">' +
							'<![CDATA['+data[i].shiValue+']]>' +
							'</condition>' +
							 '</term>';
						}else if(data[i].province !=  '' && data[i].shiValue != '' && data[i].district != ''){
							if(data[i].provinceValue ==  "北京" && data[i].condition=="notEqual"){
								getXml +='<term relation="'+data[i].relation+'">' +
									'<condition es_field="province" column="province" operator="'+data[i].condition+'">' +
									'<![CDATA['+data[i].provinceValue+']]>' +
									'</condition>' +
									'<condition es_field="city" column="city" operator="'+data[i].condition+'">' +
									'<![CDATA['+data[i].shiValue+']]>' +
									'</condition>' +
									'<condition es_field="district" column="district" operator="'+data[i].condition+'">' +
									'<![CDATA['+data[i].districtValue+']]>' +
									'</condition>' +
									'</term>';
								for(var j = 0; j < districts.length;j++){
									getXml += '<term relation="or">' +
										'<condition es_field="city" column="city" operator="equal">' +
										'<![CDATA['+districts[j]+']]></condition></term>';
								}
							}else{
								getXml +='<term relation="'+data[i].relation+'">' +
									'<condition es_field="province" column="province" operator="'+data[i].condition+'">' +
									'<![CDATA['+data[i].provinceValue+']]>' +
									'</condition>' +
									'<condition es_field="city" column="city" operator="'+data[i].condition+'">' +
									'<![CDATA['+data[i].shiValue+']]>' +
									'</condition>' +
									'<condition es_field="district" column="district" operator="'+data[i].condition+'">' +
									'<![CDATA['+data[i].districtValue+']]>' +
									'</condition>' +
									'</term>';
							}

						}
						
					}
					else{
						if(data[i].province == 1){
							getXml +='<term >' +
							'<condition es_field="province" column="province" operator="'+Like+'">' +
							'<![CDATA[]]>' +
							'</condition>' +
							 '</term>';
						}else if(data[i].province !=  '' && data[i].shiValue == '' && data[i].district == ''){
							getXml +='<term >' +
							'<condition es_field="province" column="province" operator="'+data[i].condition+'">' +
							'<![CDATA['+data[i].provinceValue+']]>' +
							'</condition>' +
							 '</term>';
						}else if(data[i].province !=  '' && data[i].shiValue != '' && data[i].district == ''){
							getXml +='<term >' +
							'<condition es_field="province" column="province" operator="'+data[i].condition+'">' +
							'<![CDATA['+data[i].provinceValue+']]>' +
							'</condition>' +
							'<condition es_field="city" column="city" operator="'+data[i].condition+'">' +
							'<![CDATA['+data[i].shiValue+']]>' +
							'</condition>' +
							 '</term>';
						}else if(data[i].province !=  '' && data[i].shiValue != '' && data[i].district != ''){

							if(data[i].provinceValue ==  "北京" && data[i].condition=="notEqual") {
								getXml +='<term >' +
									'<condition es_field="province" column="province" operator="'+data[i].condition+'">' +
									'<![CDATA['+data[i].provinceValue+']]>' +
									'</condition>' +
									'<condition es_field="city" column="city" operator="'+data[i].condition+'">' +
									'<![CDATA['+data[i].shiValue+']]>' +
									'</condition>' +
									'<condition es_field="district" column="district" operator="'+data[i].condition+'">' +
									'<![CDATA['+data[i].districtValue+']]>' +
									'</condition>' +
									'</term>';
								for(var j = 0; j < districts.length;j++){
									getXml += '<term relation="or">' +
										'<condition es_field="city" column="city" operator="equal">' +
										'<![CDATA['+districts[j]+']]></condition></term>';
								}
							}else{
								getXml +='<term >' +
									'<condition es_field="province" column="province" operator="'+data[i].condition+'">' +
									'<![CDATA['+data[i].provinceValue+']]>' +
									'</condition>' +
									'<condition es_field="city" column="city" operator="'+data[i].condition+'">' +
									'<![CDATA['+data[i].shiValue+']]>' +
									'</condition>' +
									'<condition es_field="district" column="district" operator="'+data[i].condition+'">' +
									'<![CDATA['+data[i].districtValue+']]>' +
									'</condition>' +
									'</term>';
							}

						}
						
					}
					
				}
			return getXml+"</term>";
			},

	Sql : function (param){
			var name = "city";
			var getSqlJoin = "";
			var getSqlCondition = "";
			var data = eval(param);
			for (var i = data.length-1; i >= 0; i--) {
				if(data[i].condition == "equal"){
					data[i].condition = "=";
				}else if(data[i].condition == "notEqual"){
					data[i].condition = "!=";
				}
				if(data[i].relation == ""){
					data[i].relation = "and";
				}
				if(data[i].province == 1){
					getSqlCondition += " "+data[i].relation+"  kd_customer.province  like '%%'";
				}else if(data[i].province !=  '' && data[i].city == '' && data[i].district == ''){
					getSqlCondition += " "+data[i].relation+"  kd_customer.province "+data[i].condition+" '"+data[i].provinceValue+"' " +
					" and kd_customer.city  like '%%'  " +
					" and kd_customer.district  like '%%'  ";
				}else if(data[i].province !=  '' && data[i].city != '' && data[i].district == ''){
					getSqlCondition += " "+data[i].relation+"  kd_customer.province  "+data[i].condition+" '"+data[i].provinceValue+"' " +
					" and kd_customer.city  "+data[i].condition+" '"+data[i].shiValue+"'  " +
					" and kd_customer.district  like '%%' ";
				}else if(data[i].province !=  '' && data[i].city != '' && data[i].district != ''){
					getSqlCondition += " "+data[i].relation+"  kd_customer.province  "+data[i].condition+" '"+data[i].provinceValue+"' " +
					" and kd_customer.city  "+data[i].condition+" '"+data[i].shiValue+"'  " +
					" and kd_customer.district  "+data[i].condition+" '"+data[i].districtValue+"'  ";
				}
				
			}
			return getSqlJoin+"|"+getSqlCondition;
		}
	
}
