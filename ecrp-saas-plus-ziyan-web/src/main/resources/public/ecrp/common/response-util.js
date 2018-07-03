(function() {
	//请求成功
	var checkSuccess = function (resp,vue,info,successFun){
		vue.$message({
			type: "success",
			message: resp.msg || info+"成功"
		}); 
		if(successFun)
			successFun();
	}
	//请求失败
	var checkFail = function (resp,vue,info,failFun){
		vue.$message.error(resp.msg || info+"失败");
		if(failFun)
			failFun();
	}
	
	this.ResponseUtil = class {
		/**
		 * 检查是否成功响应
		 * resp 返回的CommonResult对象
		 * vue 
		 * info 提示信息， info == "" 不弹出提示信息
		 * resp.success为true 时，执行successFun函数，否则执行failFun函数
		 * 		 */
		static check(resp,vue,info,successFun,failFun) {
			//是否成功
			if(resp.success){
				if( successFun && info == ""){
					successFun();
				}else if(successFun && !(successFun instanceof Function))			
					throw new Error("第4个参数必须为Funciton类型或者不传此参数！");
				else if(!info || info != "")
					checkSuccess(resp,vue,info,successFun);	
			}else{
				if(failFun && info == ""){
					failFun();
				}else if(failFun && !(failFun instanceof Function))
					throw new Error("第5个参数必须为Funciton类型或者不传此参数！");
				else if(!info || info != "")
					checkFail(resp,vue,info,failFun);
			}			
		}
	}
	return ResponseUtil;
})(this)
