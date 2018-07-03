package com.nascent.ecrpsaas.utils;

import com.nascent.ecrpsaas.ingest.model.TestOrder;

public class SysItem {
	
    public static void getSysItemId(TestOrder arModel,String plat) {
    	String outItemId = arModel.get("OutItemId")==null?"":arModel.get("OutItemId").toString();
    	String SysItemId = plat + outItemId;
    	if(SysItemId.length()>18) {
			SysItemId.substring(0, 18);
		} else
			{
			  SysItemId = "";
			  int platLength = plat.length();
			  int length = outItemId.length();
			  for(int i=0;i<18-platLength-length;i++)
			  {
				  SysItemId +="0";
			  }
			  SysItemId = plat+SysItemId+outItemId;
		   }
		arModel.set("SysItemId", SysItemId);
	}
}
