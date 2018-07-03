define([],function(){
	var fac = {};
	/**
	 * 检测字符中是否包含UN-ASCII码
	 * @return {bool} false:不包含，true:包含
	 */
	function isContailUNASCII() {
	    var isSuccess = false;
	    $(":text,textarea").each(function (index, domEle) {
	        var currentValue = $(domEle).val();
	        if (currentValue == "" || currentValue == null)
	            return true;
	        var currentChar = "";
	        for (var i = 0; i < currentValue.length; i++) {
	            currentChar = currentValue[i].charCodeAt();//字符转ASCII码
	            if ((currentChar == 0x9) || (currentChar == 0xA) || (currentChar == 0xD)
	                || ((currentChar >= 0x20) && (currentChar <= 0xD7FF))
	                || ((currentChar >= 0xE000) && (currentChar <= 0xFFFD))
	                || ((currentChar >= 0x10000) && (currentChar <= 0x10FFFF))) {
	                continue;
	            }
	            isSuccess = true;
	            $(domEle).focus();
	            return isSuccess;
	        }
	        isSuccess = false;
	    });
	    return isSuccess;
	}

	//URL编码
	function UrlEncode(sStr) {
	    return encodeURIComponent(sStr);
	}

	//URL解码
	function UrlDecode(str) {
	    if (str == null || str == undefined || str == NaN) {
	        return "";
	    }
	    var ret = "";
	    for (var i = 0; i < str.length; i++) {
	        var chr = str.charAt(i);
	        if (chr == "+") {
	            ret += " ";
	        } else {
	            ret += chr;
	        }
	    }
	    return decodeURIComponent(ret);
	}

	//解码html
	function htmlDecode(str) {
	    if (str == null || str == undefined || str == NaN) {
	        return "";
	    }
	    var s = "";
	    if (str != undefined) {
	        if (str.length == 0) return "";
	        s = str.replace(/&amp;/g, "&");
	        s = s.replace(/&lt;/g, "<");
	        s = s.replace(/&gt;/g, ">");
	        s = s.replace(/&#39;/g, "\'");
	        s = s.replace(/&quot;/g, "\"");
	    }
	    return s;
	}

	//编码html
	function htmlEncode(str) {
	    if (str == null || str == undefined || str == NaN) {
	        return "";
	    }
	    var s = "";
	    if (str != undefined) {
	        if (str.length == 0) return "";
	        s = str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, '&#39;').replace(/"/g, "&quot;");
	    }
	    return s;
	}

	//异步AJAX
	function ajaxDone(url, data, callback) {
	    $.ajax({
	        type: 'POST',
	        url: url,
	        data: data,
	        dataType: "json",
	        cache: false,
	        success: callback
	    });
	}

	//同步AJAX
	function ajaxDoneNoAsync(url, data, callback) {
	    $.ajax({
	        type: 'POST',
	        url: url,
	        data: data,
	        dataType: "json",
	        cache: false,
	        async: false,
	        success: callback
	    });
	}

	//半角转全角 SBC-全角，DBC-半角
	function getSBCFromDBC(str) {
	    var i;
	    var result = '';
	    for (i = 0; i < str.length; i++) {
	        code = str.charCodeAt(i); // “65281”是“！”，“65373”是“｝”
	        if (code >= 65281 && code < 65373)//  “65248”是转换码距
	            result += String.fromCharCode(str.charCodeAt(i) - 65248);
	        else
	            result += str.charAt(i);
	    }
	    return result;
	}

	// *** 保存Cookies ***
	function writeCookie(name, value) {
	    var exp = new Date();
	    exp.setTime(exp.getTime() + (86400 * 1000 * 30));
	    document.cookie = name + "=" + value + "; expires=" + exp.toGMTString() + "; path=/";
	}

	// *** 读取Cookies ***
	function readCookie(name) {
	    var search, rval;
	    search = name + "=";
	    offset = document.cookie.indexOf(search);
	    if (offset != -1) {
	        offset += search.length;
	        end = document.cookie.indexOf(";", offset);
	        if (end == -1) {
	            end = document.cookie.length;
	        }
	        rval = document.cookie.substring(offset, end);
	    }
	    //if (rval=="" || isNaN(rval)) rval = 0;
	    return rval;
	}

	//比较日期大小
	function CompareDate(date1, date2) {
	    var re = /^(\d{1,4})\-(\d{1,2})\-(\d{1,2})$/;
	    re.exec(date1);
	    var val1 = RegExp.$1 * 10000 + RegExp.$2 * 100 + RegExp.$3;
	    re.exec(date2);
	    var val2 = RegExp.$1 * 10000 + RegExp.$2 * 100 + RegExp.$3;
	    if (val1 - val2 > 0)
	        return true;
	    else
	        return false;
	}

	//比较时间大小
	function CompareTime(time1, time2) {
	    var re = /^(\d{1,4})\-(\d{1,2})\-(\d{1,2})\ (\d{1,2})\:(\d{1,2})\:(\d{1,2})$/;
	    re.exec(time1);
	    var val1 = RegExp.$1 * 24 * 60 * 60 * 31 * 12 + RegExp.$2 * 24 * 60 * 60 * 31 + RegExp.$3 * 24 * 60 * 60 + RegExp.$4 * 60 * 60 + RegExp.$5 * 60 + RegExp.$6;
	    re.exec(time2);
	    var val2 = RegExp.$1 * 24 * 60 * 60 * 31 * 12 + RegExp.$2 * 24 * 60 * 60 * 31 + RegExp.$3 * 24 * 60 * 60 + RegExp.$4 * 60 * 60 + RegExp.$5 * 60 + RegExp.$6;
	    if (val1 - val2 > 0)
	        return true;
	    else
	        return false;
	}

	//字符串转换为时间
	function stringToDateTime(dateChar) {
	    var date = dateChar.replace('-', '/').replace('-', '/');
	    var newDate = new Date(date);
	    return newDate;
	}

	//日期格式化
	Date.prototype.format = function (format) //author: meizz
	{
	    var o = {
	        "M+": this.getMonth() + 1, //month
	        "d+": this.getDate(),    //day
	        "h+": this.getHours(),   //hour
	        "m+": this.getMinutes(), //minute
	        "s+": this.getSeconds(), //second
	        "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
	        "S": this.getMilliseconds() //millisecond
	    };
	    if (/(y+)/.test(format))
	        format = format.replace(RegExp.$1,
	            (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	    for (var k in o)
	        if (new RegExp("(" + k + ")").test(format))
	            format = format.replace(RegExp.$1,
	                RegExp.$1.length == 1 ? o[k] :
	                    ("00" + o[k]).substr(("" + o[k]).length));
	    return format;
	};

	//计算短信长度
	function CalculateSmsNumNew(src, e, isContainHoldPlace, isbyte, smsSignature, kedaoSignLength, oneSmsLength, mulSmsLenght) {
	    ///<summary>计算短信长度</summary>
	    ///<param name="src">验证控件对象</param>
	    ///<param name="e">接收提醒信息对象ID名称</param>
	    ///<param name="isContainHoldPlace">是否包含占位符（true:包含，false:不包含）</param>
	    ///<param name="isbyte">是否双字节</param>
	    ///<param name="smsSignature">装载短信签字对象ID名称</param>
	    ///<returns></returns>    
	    var desc = GetSmsLenDescNew($(src).val(), $.trim($("#" + smsSignature).val()), isContainHoldPlace, isbyte, kedaoSignLength, oneSmsLength, mulSmsLenght);
	    $("#" + e).html(desc).show();
	}

	function GetSmsLenDescNew(content, smsSignature, isContainHoldPlace, isbyte,kedaoSignLength,oneSmsLength,mulSmsLenght) {
	    ///<summary>生成短信长度描述</summary>
	    ///<param name="content">短信内容</param>
	    ///<param name="smsSignature">短信签名</param>
	    ///<param name="isContainHoldPlace">是否包含占位符（true:包含，false:不包含）</param>
	    ///<param name="isbyte">是否双字节</param>
	    ///<returns></returns>

	    if (typeof (content) == 'undefined') {
	        content = "";
	    }   
	    if (typeof (oneSmsLength) == 'undefined') {
	        oneSmsLength = 70;
	    }
	    if (typeof (mulSmsLenght) == 'undefined') {
	        mulSmsLenght = 67;
	    }

	    var signLen = 0;
	    var strlen = 0;
	    if (smsSignature != undefined && smsSignature != null && smsSignature != "") {
	        signLen = GetStringLen($.trim(smsSignature), isbyte);
	    }
	    if (content != undefined && content != null && content != "") {
	        strlen = GetStringLen(content,isContainHoldPlace,isbyte);
	    }
	    var totalCount = strlen + signLen;

	    if (typeof (kedaoSignLength) != 'undefined') {
	        totalCount += parseInt(kedaoSignLength);
	    }

	    var smsCount = 1;
	    var desc = "";
	    var countToll = oneSmsLength;
	    var fontColor = "#f48c12";
	    if (totalCount > oneSmsLength) {
	        smsCount = Math.ceil(totalCount / mulSmsLenght);
	        fontColor = "#f48c12";
	        countToll = mulSmsLenght;
	    }
	    desc = "您已录入<labl style='color:" + fontColor + ";font-weight:bold;display:inline-block;'>&nbsp;" + totalCount + "&nbsp;</labl>个字符(含店铺签名";
	    if (typeof (kedaoSignLength) != 'undefined' && kedaoSignLength > 0) {
	        desc += ",通道签名";
	    }
	    desc += ")，将被做为<labl style='color:" + fontColor + ";font-weight:bold;display:inline-block;'>&nbsp;" + smsCount + "&nbsp;</labl>条短信发送，";
	    desc += "每条按<labl style='color:" + fontColor + "'>" + countToll + "</labl>字计价。";
	    return desc;
	}

	function GetStringLen(str, isbyte) {
	    ///<summary>返回字符串长度</summary>
	    ///<param name="str">要计算的字符串</param>
	    ///<param name="isbyte">是否按字节计算(true:是，false:否)</param>
	    ///<returns>返回字符串的长度</returns>
	    if (str == undefined || str == "") {
	        return 0;
	    }
	    if (isbyte)
	        return str.replace(/[^\x00-\xff]/g, "**").length;
	    else
	        return str.length;
	}

	function GetStringLen(str, isContainHoldPlace, isbyte) {
	    ///<summary>返回字符串长度</summary>
	    ///<param name="str">要计算的字符串</param>
	    ///<param name="isContainHoldPlace">是否包含占位符</param>
	    ///<param name="isbyte">是否按字节计算(true:是，false:否)</param>
	    ///<returns>返回字符串的长度</returns>
	    if (str == undefined || str == "") {
	        return 0;
	    }
	    if (isContainHoldPlace) {
	        str = ReplacePlaceholder(isContainHoldPlace, str);
	    }
	    if (isbyte) {
	        return str.replace(/[^\x00-\xff]/g, "**").length;
	    }
	    else {
	        return str.length;
	    }
	}

	//#region ECRP系统占位符默认字数替换
	function ReplacePlaceholder(isReplace, content) {
	    if (isReplace) {
	        var replaceContent = content.replace(/{Name}/g, "qqq")   //客户姓名,预设字数3
	            .replace(/{TradeId}/g, "qqqqqqqqqqqqqqq")    //订单编号,预设字数15
	            .replace(/{Nick}/g, "qqqqqqqq")   //客户昵称,预设字数8
	            .replace(/{ItemNum/g, "q")      //商品购买数量,预设字数1   
	            .replace(/{Payment}/g, "qqqqq")  //付款金额,预设字数5   
	            .replace(/{PostFee}/g, "qqq")    //邮费,预设字数3   
	            .replace(/{Created}/g, "qqqqqqqqqqqqqqqqqqq")    //订单成交时间,预设字数19     
	            .replace(/{PayTime}/g, "qqqqqqqqqqqqqqqqqqq")    //付款时间,预设字数19
	            .replace(/{ConsignTime}/g, "qqqqqqqqqqqqqqqqqqq")    //卖家发货时间,预设字数19
	            .replace(/{EndTime}/g, "qqqqqqqqqqqqqqqqqqq")        //交易成功时间,预设字数19
	            .replace(/{BuyerAlipayNo}/g, "qqqqqqqqqqq")  //买家支付宝账号,预设字数11
	            .replace(/{Phone}/g, "qqqqqqqqqqq")      //手机号,预设字数11
	            .replace(/{Email}/g, "qqqqqqqqqqqqqqqqqq")   //邮箱,预设字数18
	            .replace(/{ReceiverName}/g, "qqq")   //客户姓名,预设字数3
	            .replace(/{MemberGrade}/g, "qqqq")   //会员等级,预设字数4
	            .replace(/{CompanyName}/g, "qqqq")   //物流公司,预设字数4
	            .replace(/{OutSid}/g, "qqqqqqqqqqqqq")   //运单号,预设字数13
	            .replace(/{LogisticTrack}/g, "qqqqqqqqqqqqqqqqqqqqqqqqq")    //物流查询,预设字数25
	            .replace(/{LocalTime}/g, "qqqqqqqqqqqqqqqqqqq")  //到达时间,预设字数19
	            .replace(/{LocalCity}/g, "qqq")  //到达城市,预设字数3
	            .replace(/{ReceiveTime}/g, "qqqqqqqqqqqqqqqqqqq")   //签收时间,预设字数19
	            .replace(/{RefundFee}/g, "qqqqq")  //退款金额,预设字数5  
	            .replace(/{RefundTime}/g, "qqqqqqqqqqqqqqqqqqq")    //退款时间,预设字数19
	            .replace(/{NewGrade}/g, "qqqq")      //新会员等级,预设字数4
	            .replace(/{OldGrade}/g, "qqqq")      //老会员等级,预设字数4
	            .replace(/{UpgradeTime}/g, "qqqqqqqqqqqqqqqqqqq")   //升级时间,预设字数19
	            .replace(/{IntegralNum}/g, "qqq")   //积分赠额,预设字数3
	            .replace(/{QuestionnaireName}/g, "qqqqqqqqqq")   //问卷名称,预设字数10
	            .replace(/{EleCode}/g, "qqqqqqqqq")   //电子优惠码,预设字数9
	            .replace(/{ShopName}/g,"qqqqqqqqqq");
	        
	        return replaceContent;
	    }
	    return content;
	}

	/**
	 *表单序列化
	 **/
	function form_serialize(formId){
		var dataJson = $('#'+formId).serializeArray();
		var returnData="";
		if(dataJson){
			for(var i=0;i<dataJson.length;i++){
				if(i==0){
					returnData += dataJson[i].name+"=" + dataJson[i].value.replace(/(^\s*)|(\s*$)/g,'');
				}else{
					returnData += "&"+dataJson[i].name+"=" + dataJson[i].value.replace(/(^\s*)|(\s*$)/g,'');
				}
			}
		}
		return returnData;
	}

	/**
	 *验证手机号码(返回true则不是正规号码)
	 **/
	function validateTelPhone(str){
	    //号码长度验证及号码段输入验证
		if(str.length!=11 || !str.match(/^1[3|4|5|7|8][0-9]\d{4,8}$/)){
			return true;
		}else{
			return false;
		}
	}

	//得到n天前的日期yyyy-MM-dd
	function getBeforeNDay(date,n){    
		var yesterday_milliseconds=date-1000*60*60*24*n;     
		var yesterday = new Date();     
		    yesterday.setTime(yesterday_milliseconds);     
		  
		var strYear = yesterday.getFullYear();  
		var strDay = yesterday.getDate();  
		var strMonth = yesterday.getMonth()+1;
		if(parseInt(strMonth)<10)  
		{  
			strMonth="0"+strMonth;  
		} 
		if(parseInt(strDay)<10)  
		{  
			strDay="0"+strDay;  
		}  
		datastr = strYear+"-"+strMonth+"-"+strDay;
		return datastr;
	  }
	
	/**
	 * 判断值是否不为空和可见字符
	 * @return 
	 */
	function notNullAndVisible(value){
		if(value != null && value !="" && !/^\s*$/.test(value)){
			return true;
		}else{
			return false;
		}
	}
	
	/**
	 * 获取节点下所有子节点的id
	 * @Param 节点信息,空数组
	 * @return id数组
	 */

	function getTreeChildIds(node,ids) {

		 if(node.children){
			  for(var i = 0; i < node.children.length; i++){
				  ids.push(node.children[i].id);
				  ids.concat(this.getTreeChildIds(node.children[i],ids));
			  }
		  }
		 return ids;
	}
	
	/**
	 * 浮点型数字的精确度格式化
	 * @param num 数字
	 * @param digits 精确度(digits >= 0)
	 * @param rounding 四舍五入
	 * @returns string
	 */
	function toFixed(num, digits, rounding) {
		if(rounding) {
			return Number(num).toFixed(digits);
		} else {
			var parts = num.toString().split(".");
			if(digits === 0)
				return parts[0];
			else if(digits > 0) {
				return parts[0] + "." + (function(f, digits) {
					if(f === undefined || f === null) {
						f = "";
					}
					
					if(f.length == digits)
						return f;
					else if(f.length > digits)
						return f.substring(0, digits);
					else {
						var needed = digits - f.length;
						return f + (function(needed){
							var str = "";
							for(var i=0; i< needed; i++)
								str += "0";
							return str;
						})(needed)
					}
				})(parts[1], digits);
			} else {
				throw new Error("toFixed() digits argument must be between 0 and 20");
			}
		}
	}

    /**
	 * 判断是否数值类型
     * @param data
     * @param digit
     * @returns {boolean}
     */
	 function isNumber(data,digit){
        if(typeof(digit) === 'undefined' ) {
            return /^\d*$/.test(data);
        }else if(typeof(digit) === 'number'){
			if(digit > 0){
                var patt = new RegExp("^[1-9]\\d*(\.\\d{1," + digit + "})?$");
                return patt.test(data);
			}else{
                return /^\d*$/.test(data);
			}
		}else{
			throw new Error("第二个参数请传入Number类型或者不传此参数");
		}
	 }

    /**
     * 限制输入，只能输入数字与小数点，
     * digit：小数点后面的位数
     */
    function limitInputDecimal(data,digit){
        var val = data.charAt(data.length-1);
        val = /[\d\.]/g.test(val) ? val : "";
        var index = data.indexOf('.');
        var limitDigit = false;
        if(index != -1){
            data = data.substring(0,index+1) + data.substr(index+1,digit);
            val = data.substr(index+1,digit).indexOf('.') != -1 ? "" : val;
			if(data.substr(index+1,digit).length == digit){
                limitDigit = true;
			}
        }
        return limitDigit ? data : data.substr(0,data.length-1) + val;
    }

    /**
     * 只允许输入整数
     */
    function limitInputInteger(data){
    	var val = data.charAt(data.length-1);
        val = /[\d]/.test(val) ? val : "";
        return data.substr(0,data.length-1) + val;
    }
	
		return {
			isContailUNASCII,
			UrlEncode,
			UrlDecode,
			htmlDecode,
			ajaxDone,
			ajaxDoneNoAsync,
			getSBCFromDBC,
			writeCookie,
			readCookie,
			CompareDate,
			CompareTime,
			stringToDateTime,
			CalculateSmsNumNew,
			GetSmsLenDescNew,
			GetStringLen,
			ReplacePlaceholder,
			form_serialize,
			validateTelPhone,
			getBeforeNDay,
			notNullAndVisible,
			getTreeChildIds,
			toFixed,
            isNumber,
            limitInputInteger,
            limitInputDecimal,
		};
})