package com.nascent.ecrpsaas.plus.ziyan.dispatch.util;

public class StrUtil {
	
	public  static String  findJHS(String orderFrom){
	  String [] str = 	orderFrom.split(",");
	  String is_jhs = "";
	  if(str.length >0){
		  for (String id : str) {
			if("JHS".equals(id)){
				is_jhs = "JHS";
			}
		}
	  }
		return is_jhs;
	}

}
