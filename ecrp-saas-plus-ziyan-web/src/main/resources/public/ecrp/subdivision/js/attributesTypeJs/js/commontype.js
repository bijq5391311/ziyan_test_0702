commonFunction = {
		
		GetDateStr:function (AddDayCount) {   
			   var dd = new Date();  
			   dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期  
			   var y = dd.getFullYear();   
			   var m = (dd.getMonth()+1)<10?"0"+(dd.getMonth()+1):(dd.getMonth()+1);//获取当前月份的日期，不足10补0  
			   var d = dd.getDate()<10?"0"+dd.getDate():dd.getDate();//获取当前几号，不足10补0  
			   return y+"-"+m+"-"+d;   
			} ,
		
		getEsDate:function(date){
			var esDate = '';
			$.ajax({
				url:"getEsDate",
				data:{dateTime:date},
				type:"post",
				async : false,
				success:function(resp){
					if(resp.success){
						esDate = resp.result;
					}
					
				}
				
			})
			return esDate;
		},
		

		getDateFormat:function(currentDate,fmt){
			            var o = {
			                "M+": currentDate.getMonth() + 1, //月份 
			                "d+": currentDate.getDate(), //日 
			                "h+": currentDate.getHours(), //小时 
			                "m+": currentDate.getMinutes(), //分 
			                "s+": currentDate.getSeconds(), //秒 
			                "q+": Math.floor((currentDate.getMonth() + 3) / 3), //季度 
			                "S": currentDate.getMilliseconds() //毫秒 
			            };
			            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (currentDate.getFullYear() + "").substr(4 - RegExp.$1.length));
			            for (var k in o)
			            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
			            return fmt;
			     }
			
	
		
}