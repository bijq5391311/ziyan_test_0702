//交易维度
var trade = {
	Xml:function  (param){
		var data = eval(param);  
		var getXml = "";
		var aggsXml = "";
		var allNotManZu = false;
		for (var j = 0; j < data.length; j++) {
			var num = 0;
			if(data[j].manzu == "1"){
				num++;
			}
			if(num == data.length){
				allNotManZu = true;
			}
		}
			for (var i = data.length-1; i >= 0; i--) {
				if(data[i].manzu == "0"){
					if(i == data.length-1){
						getXml += '<term>';
					}else{
						getXml += '<term relation="'+data[i].relation+'">';
					}
				}else if(data[i].manzu == "1"){
					getXml += '<term relation="not">';
				}else{
					getXml += '<term>';
				}
				if(data[i].timetype == "1"){
					//下单时间
					getXml += trade.AppendDateXml(data[i].orderdatebegin,data[i].orderdateend,"created","trade");
					//付款时间
					getXml += trade.AppendDateXml(data[i].paydatebegin,data[i].paydateend,"pay_time","trade");
					//发货时间
					getXml += trade.AppendDateXml(data[i].deliverydatebegin,data[i].deliverydateend,"consign_time","trade");
					//结束时间
					getXml += trade.AppendDateXml(data[i].finaldatebegin,data[i].finaldateend,"end_time","trade");
				}else if(data[i].timetype == "2"){
					//下单天数
					getXml += trade.AppendDayXml(data[i].orderdaybegin,data[i].orderdayend,"created","trade");
					//付款天数
					getXml += trade.AppendDayXml(data[i].paydaybegin,data[i].paydayend,"pay_time","trade");
					//发货天数
					getXml += trade.AppendDayXml(data[i].deliverydaybegin,data[i].deliverydayend,"consign_time","trade");
					//结束天数
					getXml += trade.AppendDayXml(data[i].finaldaybegin,data[i].finaldayend,"end_time","trade");
				}
				
				//单件订单金额
				getXml += trade.AppendNumXml(data[i].trademoneybegin,data[i].trademoneyend,"payment","trade");
				//单件订单件数	
				getXml += trade.AppendNumXml(data[i].tradepiecebegin,data[i].tradepieceend,"num","trade");
				if(data[i].orderdatebegin != ''||data[i].orderdateend != '' || data[i].orderdaybegin != '' || data[i].orderdayend != ''){
                    if(data[i].timesbegin != '' || data[i].timesend != ''){
                        aggsXml += '<group es_query="aggs" es_table="trade">' +
                            '<condition es_aggs="value_count" es_field="created" operator="between"><![CDATA['+data[i].timesbegin+'∝'+data[i].timesend+']]></condition>' +
                            '</group>';
                    }
                    if(data[i].piecebegin != '' || data[i].pieceend != ''){
                        aggsXml += '<group es_query="aggs" es_table="trade">' +
                            '<condition es_aggs="sum"  es_field="num"><![CDATA['+data[i].piecebegin+'∝'+data[i].pieceend+']]></condition>' +
                            '</group>';
                    }
                    if(data[i].moneybegin != '' || data[i].moneyend != ''){
                        aggsXml += '<group es_query="aggs" es_table="trade">' +
                            '<condition es_aggs="sum"  es_field="payment"><![CDATA['+data[i].moneybegin+'∝'+data[i].moneyend+']]></condition>' +
                            '</group>';
                    }
                    if(data[i].moneybegin != '' || data[i].moneyend != ''||data[i].piecebegin != '' || data[i].pieceend != ''||data[i].timesbegin != '' || data[i].timesend != ''){
                        aggsXml += '<group es_query="aggs" es_table="trade"><condition es_aggs="date_histogram" es_field="created" es_terms="interval=day"></condition></group>';
					}
				}else if(data[i].piecebegin != '' || data[i].pieceend != ''){
					aggsXml += '<group es_query="aggs" es_table="trade">' +
						'<condition es_aggs="sum"  es_field="num" operator="between"><![CDATA['+data[i].piecebegin+'∝'+data[i].pieceend+']]></condition>' +
						'</group>';
					aggsXml += '<group es_query="aggs" es_table="trade"><condition es_aggs="date_histogram" es_field="created" es_terms="interval=day"></condition></group>';
					aggsXml += '<group><term  es_filter="aggs" es_table="trade"><condition es_field="created" operator="isNotNull"><![CDATA[]]></condition></term></group>';
				}else if(data[i].moneybegin != '' || data[i].moneyend != ''){
					aggsXml += '<group es_query="aggs" es_table="trade">' +
						'<condition es_aggs="sum"  es_field="payment" operator="between"><![CDATA['+data[i].moneybegin+'∝'+data[i].moneyend+']]></condition>' +
						'</group>';
					aggsXml += '<group es_query="aggs" es_table="trade"><condition es_aggs="date_histogram" es_field="created" es_terms="interval=day"></condition></group>';
					aggsXml += '<group><term  es_filter="aggs" es_table="trade"><condition es_field="payment" operator="isNotNull"><![CDATA[]]></condition></term></group>';
				}else if(data[i].timesbegin != '' || data[i].timesend != ''){
					aggsXml += '<group es_query="aggs" es_table="trade"><condition es_aggs="date_histogram" es_field="created" es_terms="interval=day;time_zone=GMT+08:00"></condition></group>';
					aggsXml += '<group es_query="aggs" es_table="trade">' +
						'<condition es_aggs="value_count" es_field="created" operator="between"><![CDATA['+data[i].timesbegin+'∝'+data[i].timesend+']]></condition>' +
						'</group>';
					aggsXml += '<group es_query="aggs" es_table="trade"><condition es_aggs="cardinality" es_field="created" es_terms="precision_threshold=1000"></condition></group>';
					aggsXml += '<group><term  es_filter="aggs" es_table="trade"><condition es_field="created" operator="isNotNull"><![CDATA[]]></condition></term></group>';
				}




				if(data[i].tradetype != ""){
					if(data[i].tradetype == '1'){
						getXml +='<term es_table="trade"><condition  es_field="trade_type"  operator="like"><![CDATA[]]></condition></term>';
					}else{
						getXml +='<term es_table="trade"><condition  es_field="trade_type"  operator="equal"><![CDATA['+data[i].tradetype+']]></condition></term>';
					}
					} if(data[i].tradestatelist.length>0){   //
					getXml += "<term>";
					for (var j = 0; j < data[i].tradestatelist.length; j++) {
						var tempcondition = "";
						if(j != 0){
						getXml +='<term es_table="trade"  relation="or"><condition es_field="trade_status"  operator="equal"><![CDATA['+data[i].tradestatelist[j]+']]></condition></term>';
						}else{
						getXml +='<term es_table="trade" ><condition es_field="trade_status"  operator="equal"><![CDATA['+data[i].tradestatelist[j]+']]></condition></term>';
						}
					}
					getXml += "</term>";
				}
				if(data[i].tradetype == "step"){
					var stepcondition = "";
					 if(data[i].reservetype.length>0){
							for (var j = 0; j < data[i].reservetype.length; j++) {
								var tempcondition = data[i].reservetype[j]=="定金未付，尾款未付"?"FRONT_NOPAID_FINAL_NOPAID":"";
								tempcondition = data[i].reservetype[j]=="定金已付，尾款未付"?"FRONT_PAID_FINAL_NOPAID":tempcondition;
								tempcondition = data[i].reservetype[j]=="定金已付，尾款已付"?"FRONT_PAID_FINAL_PAID":tempcondition;
								stepcondition += tempcondition+"∝";
							}
						 stepcondition=(stepcondition.slice(stepcondition.length-1)==',')?stepcondition.slice(0,-1):stepcondition;
						 getXml += '<term es_table="trade"  relation="and"><condition es_field="step_trade_status"  operator="in"><![CDATA['+stepcondition+']]></condition></term>';

					 }else{
						 getXml += '<term es_table="trade"  relation="and"><condition es_field="step_trade_status"  operator="like"><![CDATA[]]></condition></term>';
					 }


				}
				//拼接邮费xml和sql
				if(data[i].postage == '1'){
					data[i].timesbegin = data[i].postagebegin==""?"0":data[i].postagebegin;
					data[i].timesend = data[i].postageend==""?"100000000":data[i].postageend;
					getXml +='<term es_table="trade" ><condition es_field="post_fee" column="post_fee" operator="between"><![CDATA['+data[i].postagebegin+'∝'+data[i].postageend+']]></condition></term>';
				}
				//拼接优惠卷金额
				if(data[i].coupon == "1"){
					var templist = data[i].couponmoney.split(";");
					if(templist.length > 0){
					getXml += "<term>";
					for (var j = 0; j < templist.length; j++) {
						if(j != 0){
							getXml +='<term es_table="trade"   relation="or"><condition es_field="discount_fee" column="discount_fee" operator="equal"><![CDATA['+templist[j]+']]></condition></term>';
						}else{
							getXml +='<term es_table="trade" ><condition es_field="discount_fee" column="discount_fee" operator="equal"><![CDATA['+templist[j]+']]></condition></term>';
						}
						
						}
					getXml += "</term>";
					}
				}else if(data[i].coupon == "0"){
					getXml +='<term es_table="trade" es_nested="order" ><condition es_field="order.discount_fee" column="discount_fee" operator="isNotNull"><![CDATA[]]></condition></term>';
				}
				
				//拼接插旗
				if(data[i].markflag !=""){
					if(data[i].markflag == "-1"){
						getXml +='<term es_table="trade" ><condition es_field="remark_sign" column="remark_sign" operator="isNotNull"><![CDATA[]]></condition></term>';
					}else if(data[i].markflag == "0"){
						getXml +='<term es_table="trade" ><condition es_field="remark_sign" column="remark_sign" operator="equal"><![CDATA['+data[i].markflag+']]></condition></term>';
					}else{
						getXml +='<term es_table="trade" ><condition es_field="remark_sign" column="remark_sign" operator="equal"><![CDATA['+data[i].markflag+']]></condition></term>';
					}
					
				}
				//拼接订单备注
				if(data[i].trademark != ""){
				 getXml +='<term es_table="trade" ><condition es_field="buyer_message"  operator="equal"><![CDATA['+data[i].trademark+']]></condition></term>';
				}
				//拼接订单渠道来源
				if(data[i].tradechannelbrand.length > 0 ){
					for (var k = 0; k < data[i].tradechannelbrand.length; k++) {
						if(k != 0){
							getXml +='<term es_table="trade" relation="or"><condition es_field="shop_code" column="shop_code" operator="equal"><![CDATA['+data[i].tradechannelbrand[k]+']]></condition></term>';
						}else{
						getXml +='<term es_table="trade" ><condition es_field="shop_code" column="shop_code" operator="equal"><![CDATA['+data[i].tradechannelbrand[k]+']]></condition></term>';
						}
					}
				}
				//拼接终端
				if(data[i].tagend.length > 0){
					var tagends = data[i].tagend;
					for (var j = 0; j < tagends.length; j++) {
						if(j != 0){
							getXml +='<term es_table="trade" relation="or"><condition es_field="app_entrance" column="app_entrance" operator="equal"><![CDATA['+tagends[j]+']]></condition></term>';
						}else{
						getXml +='<term es_table="trade" ><condition es_field="app_entrance" column="app_entrance" operator="equal"><![CDATA['+tagends[j]+']]></condition></term>';
					}
					}
				}
				//拼接订单商品
				if(data[i].goods_ids.length>0){
					for (var j = 0; j < data[i].goods_ids.length; j++) {
						if(j != 0){
						getXml +='<term es_table="trade" relation="or" es_nested="order"><condition  es_field="order.sys_item_id"  operator="equal"><![CDATA['+data[i].goods_ids[j].id+']]></condition></term>';
						}else{
							getXml +='<term es_table="trade" es_nested="order"><condition es_field="order.sys_item_id"  operator="equal"><![CDATA['+data[i].goods_ids[j].id+']]></condition></term>';
						}

					}
				}
				getXml += '</term>';
			}
		return {getXml:getXml,aggsXml:aggsXml};
		},

	Sql:function (param){
		var getSqlJoin = " left join kd_trade on kd_trade.sys_customer_id = kd_customer.sys_customer_id " +
						 "	left join kd_customer_plat_rec_list on kd_customer_plat_rec_list.sys_customer_id = kd_customer.sys_customer_id " +
						 "  left join kd_order on kd_order.sys_customer_id = kd_customer.sys_customer_id " +
						 "  left join kd_trade_ext on kd_trade_ext.sys_trade_id = kd_trade.sys_trade_id";
		var getSqlCondition = "";
		var data = eval(param);
		for (var i = data.length-1; i >= 0; i--) {
			if(data[i].timetype == "1"){
				if(data[i].orderdatebegin.length>0){
					getSqlCondition += " and kd_trade.created  between  '"+data[i].orderdatebegin[0]+"' and  '"+data[i].orderdatebegin[1]+"' ";
				}if(data[i].paydatebegin.length>0){
					getSqlCondition += " and kd_trade.pay_time  between  '"+data[i].paydatebegin[0]+"' and  '"+data[i].paydatebegin[1]+"' ";
				}if(data[i].deliverydatebegin.length>0){
					getSqlCondition += " and kd_trade.consign_time  between  '"+data[i].deliverydatebegin[0]+"' and  '"+data[i].deliverydatebegin[1]+"' ";
				}if(data[i].finaldatebegin.length>0){
					getSqlCondition += " and kd_trade.end_time  between  '"+data[i].finaldatebegin[0]+"' and  '"+data[i].finaldatebegin[1]+"' ";
				}
			}
			else if(data[i].timetype == "2"){
				data[i].orderdaybegin = data[i].orderdaybegin==""?"0":data[i].orderdaybegin;
				data[i].orderdayend = data[i].orderdayend==""?"100000000":data[i].orderdayend;
				data[i].paydaybegin = data[i].paydaybegin==""?"0":data[i].paydaybegin;
				data[i].paydayend = data[i].paydayend==""?"100000000":data[i].paydayend;
				data[i].deliverydaybegin = data[i].deliverydaybegin=="0"?"":data[i].deliverydaybegin;
				data[i].deliverydayend = data[i].deliverydayend==""?"100000000":data[i].deliverydayend;
				data[i].finaldaybegin = data[i].finaldaybegin==""?"0":data[i].finaldaybegin;
				data[i].finaldayend = data[i].finaldayend==""?"100000000":data[i].finaldayend;
				getSqlCondition += " and kd_trade.created  between  '"+commonFunction.GetDateStr(parseInt(data[i].orderdaybegin))+"' and  '"+commonFunction.GetDateStr(parseInt(data[i].orderdayend))+"' ";
				getSqlCondition += " and kd_trade.pay_time  between  '"+commonFunction.GetDateStr(parseInt(data[i].paydaybegin))+"' and  '"+commonFunction.GetDateStr(parseInt(data[i].paydayend))+"' ";
				getSqlCondition += " and kd_trade.consign_time  between  '"+commonFunction.GetDateStr(parseInt(data[i].deliverydaybegin))+"' and  '"+commonFunction.GetDateStr(parseInt(data[i].deliverydayend))+"' ";
				getSqlCondition += " and kd_trade.end_time  between  '"+commonFunction.GetDateStr(parseInt(data[i].finaldaybegin))+"' and  '"+commonFunction.GetDateStr(parseInt(data[i].finaldayend))+"' ";
			}
			data[i].timesbegin = data[i].timesbegin==""?"0":data[i].timesbegin;
			data[i].timesend = data[i].timesend==""?"100000000":data[i].timesend;
			data[i].piecebegin = data[i].piecebegin==""?"0":data[i].piecebegin;
			data[i].pieceend = data[i].pieceend==""?"100000000":data[i].pieceend;
			data[i].moneybegin = data[i].moneybegin==""?"0":data[i].moneybegin;
			data[i].moneyend = data[i].moneyend==""?"100000000":data[i].moneyend;
			data[i].trademoneybegin = data[i].trademoneybegin==""?"0":data[i].trademoneybegin;
			data[i].trademoneyend = data[i].trademoneyend==""?"100000000":data[i].trademoneyend;
			data[i].tradepiecebegin = data[i].tradepiecebegin==""?"0":data[i].tradepiecebegin;
			data[i].tradepieceend = data[i].tradepieceend==""?"100000000":data[i].tradepieceend;

			getSqlCondition += " and kd_trade.num  between  '"+data[i].piecebegin+"' and  '"+data[i].pieceend+"' ";
			
			getSqlCondition += " and kd_trade.payment  between  '"+data[i].moneybegin+"' and  '"+data[i].moneyend+"' ";
			
			getSqlCondition += " and kd_customer_plat_rec_list.pay_times  between  '"+data[i].timesbegin+"' and  '"+data[i].timesend+"' ";
//单件订单金额			getXml +='<term><condition es_field="payment" column="payment" operator="between"><![CDATA['+commonFunction.GetDateStr(parseInt(data[i].moneybegin))+'∝'+commonFunction.GetDateStr(parseInt(data[i].moneyend))+']]></condition></term>';
//单件订单件数			getXml +='<term><condition es_field="payment" column="payment" operator="between"><![CDATA['+commonFunction.GetDateStr(parseInt(data[i].moneybegin))+'∝'+commonFunction.GetDateStr(parseInt(data[i].moneyend))+']]></condition></term>';
			
			if(data[i].tradetype != ""){
				getSqlCondition += " and kd_trade_ext.trade_type  =  '"+data[i].tradetype+"' ";
			}
			if(data[i].tradestatelist.length>0){   //
				getSqlCondition += " and kd_order.order_status  in  ('"+data[i].tradestatelist.toString()+"') ";
			}
			if(data[i].tradetype != "104" && data[i].tradetype != ""){
				getSqlCondition += " and kd_trade.step_trade_status  = 1";
//无字段				getSqlCondition += " and kd_order.order_status  in  ('"+data[i].reservetype.toString()+"') ";
			}
			//拼接邮费xml和sql
			if(data[i].postage == '1'){
				data[i].timesbegin = data[i].postagebegin==""?"0":data[i].postagebegin;
				data[i].timesend = data[i].postageend==""?"100000000":data[i].postageend;
				getSqlCondition += " and kd_trade.post_fee  between  '"+data[i].postagebegin+"' and  '"+data[i].postageend+"' ";
			}
			//拼接优惠卷金额
			if(data[i].coupon == '1'){
				getSqlCondition += " and kd_order.discount_fee  in  ('"+data[i].couponmoney+"') ";
			}
			
			//拼接插旗
			var sign = parseInt(data[i].markflag)-1;
			getSqlCondition += " and kd_trade.remark_sign  = '"+sign+"' ";
			//拼接订单备注
			if(data[i].trademark != ""){
				getSqlCondition += " and kd_trade_ext.seller_memo  = '"+data[i].trademark+"' ";
			}
			//拼接订单渠道来源
			if(data[i].tradechannelbrand != ""){
				getSqlCondition += " and kd_trade.trade_from  = '"+data[i].tradechannelbrand+"' ";
			}
			//拼接终端
			if(data[i].tagend != ""){
			getSqlCondition += " and kd_trade.app_entrance  = '"+data[i].tagend+"' ";
			}
			//拼接订单商品
			if(data[i].goods_ids.length>0){
				var tempGoodsIds = data[i].goods_ids[0].id;
				for (var j = 0; j < data[i].goods_ids.length; j++) {
					tempGoodsIds = tempGoodsIds +","+data[i].goods_ids[j].id;
				}
				getSqlCondition += " and kd_order.sys_item_id  in ('"+tempGoodsIds+"') ";
			}
		}
		return getSqlJoin+"|"+getSqlCondition;
	},
	"AppendDateXml":function(first,last,field,table){
		var xml = '';
		if(first != "" && last != ""){
			xml = '<term es_table="'+table+'"><condition es_field="'+field+'" operator="between"><![CDATA['+first.replace(" ","T").replace("Z","")+'+08:00∝'+(last.split(" ")[0]+" 23:59:59").replace(" ","T").replace("Z","")+'+08:00]]></condition></term>';
		}else if(first != "" && last == ""){
			xml = '<term es_table="'+table+'"><condition es_field="'+field+'" operator="larger"><![CDATA['+first.replace(" ","T").replace("Z","")+'+08:00]]></condition></term>';
		}else if(first == "" && last != ""){
			xml = '<term es_table="'+table+'"><condition es_field="'+field+'" operator="smaller"><![CDATA['+last.replace(" ","T").replace("Z","")+'+08:00]]></condition></term>';
		}else if(first == "" && last == ""){
			xml = '';
		}
		
		return xml;
	},
	"AppendDayXml":function(first,last,field,table){
		var xml = '';
		if(first != "" && last != ""){
			xml = '<term es_table="'+table+'"><condition es_field="'+field+'" operator="between"><![CDATA['+commonFunction.GetDateStr(-parseInt(last))+'T00:00:00+08:00:00∝'+commonFunction.GetDateStr(-parseInt(first))+'T23:59:59+08:00:00]]></condition></term>';
		}else if(first != "" && last == ""){
			xml = '<term es_table="'+table+'"><condition es_field="'+field+'" operator="smaller"><![CDATA['+commonFunction.GetDateStr(-parseInt(first))+'T00:00:00+08:00:00]]></condition></term>';
		}else if(first == "" && last != ""){
			xml = '<term es_table="'+table+'"><condition es_field="'+field+'" operator="larger"><![CDATA['+commonFunction.GetDateStr(-parseInt(last))+'T23:59:59+08:00:00]]></condition></term>';
		}else if(first == "" && last == ""){
			xml = '';
		}
		
		return xml;
	},
	"AppendNumXml":function(first,last,field,table){
		var xml = '';
		if(first != "" && last != ""){
			xml = '<term es_table="'+table+'"><condition es_field="'+field+'" operator="between"><![CDATA['+first+'∝'+last+']]></condition></term>';
		}else if(first != "" && last == ""){
			xml = '<term es_table="'+table+'"><condition es_field="'+field+'" operator="larger"><![CDATA['+first+']]></condition></term>';
		}else if(first == "" && last != ""){
			xml = '<term es_table="'+table+'"><condition es_field="'+field+'" operator="smaller"><![CDATA['+last+']]></condition></term>';
		}else if(first == "" && last == ""){
			xml = '';
		}
		
		return xml;
	}
}
