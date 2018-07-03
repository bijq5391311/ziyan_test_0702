package com.nascent.ecrpsaas.utils;

import java.util.regex.Pattern;

import com.taobao.api.internal.util.StringUtils;

public class ConverterUtils {
     /*
	 * 转换out_item_id
	 * @param str
	 * @return
	 */
	public  static long toConverterLong(String str) {
		if(!StringUtils.isEmpty(str)) {
			Pattern pattern = Pattern.compile("[0-9]*");   
		    if(pattern.matcher(str).matches()) {
		    	return Long.parseLong(str);
		    }else
		    {
		    	return 0;
		    }
		} else {
			return 0;
		}
	}
}
