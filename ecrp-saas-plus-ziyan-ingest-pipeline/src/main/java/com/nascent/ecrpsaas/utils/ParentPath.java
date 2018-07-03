package com.nascent.ecrpsaas.utils;


import com.nascent.ecrpsaas.ingest.model.TestOrder;


public class ParentPath {
	
	public static void setParentPath(TestOrder kdGoodsCategory){
		int isParent = 1;
        if(Integer.parseInt(kdGoodsCategory.get("ParentCid").toString())!= 0){
            isParent = 0;
        }
        kdGoodsCategory.set("IsParent", isParent);
	}
}
