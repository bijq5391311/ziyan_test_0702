package com.nascent.ecrpsaas.plus.ziyan.marketing.model;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.nascent.ecrpsaas.base.util.TreeNode;
import com.nascent.ecrpsaas.organization.model.OutShop;
import com.nascent.ecrpsaas.organization.model.SysShop;
import com.nascent.plugins.jfinal.activerecord.Record;
import com.nascent.plugins.spring.SpringContext;
import com.nascent.plugins.sqlinxml.annotation.Select;
import com.nascent.utils.query.QueryInfo;



/**
 * @author mozhimin
 * @date 2017年12月8日
 * @功能  
 */
@Select()
public class ZyOutShop extends OutShop {
	public static ZyOutShop dao() {
        return SpringContext.me().getModel(ZyOutShop.class);
    }
	
	/**
	 * 获取线下店铺树.
	 * @return
	 */
	public TreeNode  queryLineShopTree(){
		  List<OutShop> province = OutShop.dao().queryProvince();
		  List<OutShop> citys = OutShop.dao().queryCity();
		  List<OutShop> district = OutShop.dao().queryDistrict();
		  List<OutShop> shop = OutShop.dao().queryAllShop();
		  
		  List<SysShop> allShops = SysShop.dao().queryAllShop();
		  List<TreeNode> provs = new ArrayList<TreeNode>();
		  
		  //存放店铺 节点信息
		  Map<String,List<TreeNode>> shopMap = new HashMap<String,List<TreeNode>>();
		  for(OutShop dist:shop){
			  
			  List<TreeNode> distChildren = new ArrayList<TreeNode>();
			  
			  TreeNode shopNode = new TreeNode();
			  for(SysShop isShop:allShops){
					if(isShop.getname().equals(dist.getOutName())){
						shopNode.setDisabled(false);
						break;
					}
				}
			  shopNode.setId(String.valueOf(dist.getid()));
			  shopNode.setLabel(dist.getOutName());
			  shopNode.setExt1("0");
			  distChildren.add(shopNode);	
			  
			  if(!shopMap.containsKey(dist.getdistrict())){
				  shopMap.put(dist.getdistrict(),distChildren);
			  }else{
				  shopMap.get(dist.getdistrict()).add(shopNode);
			  }
			 
		  }
		  
		  for(OutShop prov:province){
			  TreeNode provNode = new TreeNode();
			
			  provNode.setId(prov.getprovince());
			  provNode.setLabel(prov.getprovince());
			  provNode.setExt1("1");
			  List<TreeNode> provChildren = new ArrayList<TreeNode>();
			  
			  for(OutShop city:citys){
				  TreeNode cityNode = new TreeNode();
				  cityNode.setId(city.getcity());
				  cityNode.setLabel(city.getcity());
				  cityNode.setExt1("1");
				  List<TreeNode> cityChildren = new ArrayList<TreeNode>();
				  if(city.getprovince().equals(prov.getprovince())){
					  provChildren.add(cityNode);
				  }
				 
				  for(OutShop dist:district){
					  TreeNode distNode = new TreeNode();
					 
					  distNode.setId(dist.getdistrict());
					  distNode.setLabel(dist.getdistrict());
					  distNode.setExt1("1");
					  distNode.setChildren(shopMap.get(dist.getdistrict()));
					  
					  if(dist.getcity().equals(city.getcity())){
						  cityChildren.add(distNode);
					  }
				  }
				  cityNode.setChildren(cityChildren);
				 
			  }
			  provNode.setChildren(provChildren);
			  provs.add(provNode);
		  }
		  
		  TreeNode root = new TreeNode();
		  root.setLabel("线下店铺");
		  root.setChildren(provs);
		  return root;
	}
	/**
	 * 根据ids查询店铺列表
	 * @param ids
	 * @return
	 */
	public String queryGoodsNameStr(String ids){
		QueryInfo queryInfo = new QueryInfo("marketing.sysCoupon.queryGoodsNameStr")
				.addParam("ids", ids);
		String kdItemVos = queryInfo.findOne().getStr("nameStr");
		return kdItemVos;
	}
	/**
	 * 根据ids查询店铺列表
	 * @param ids
	 * @return
	 */
	public String getShopCodeStr(String shopCodeStr){
		Record code = new QueryInfo("zyShop.sysShop.getShopCodeStr")
				.addParam("shopCode", shopCodeStr).findOne();
		if(null == code){
			return "0";
		}
		String codeStr = code.getStr("code");
		return codeStr;
	}
}