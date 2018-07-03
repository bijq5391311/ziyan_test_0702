package com.nascent.ecrpsaas.plus.ziyan.organization.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.nascent.ecrpsaas.base.constat.SystemConstat;
import com.nascent.ecrpsaas.base.model.BaseModel;
import com.nascent.ecrpsaas.base.util.TreeNode;
import com.nascent.ecrpsaas.base.util.UtilString;
import com.nascent.ecrpsaas.base.util.UtilTree;
import com.nascent.plugins.jfinal.activerecord.Record;
import com.nascent.plugins.spring.SpringContext;
import com.nascent.plugins.sqlinxml.annotation.Param;
import com.nascent.plugins.sqlinxml.annotation.Select;
import com.nascent.plugins.sqlinxml.annotation.TableBind;
import com.nascent.utils.query.QueryInfo;

@Select
@TableBind(name = "zy_platfrom",pk="id")
public class ZyPlatfrom extends BaseModel<ZyPlatfrom>{
	
	private static final long serialVersionUID = 1L;
	public static ZyPlatfrom dao() {
	    return SpringContext.me().getModel(ZyPlatfrom.class);
	}
	/**
	 * 生成平台功能权限树
	 * Title:ZyPlatfrom.java
	 * name:zhimin.mo
	 * return:TreeNode
	 * describe:
	 * time:2018年1月18日
	 */
	public TreeNode loadPlatfromTree(){
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("state", SystemConstat.STATE_1);
		UtilTree tree = new UtilTree("organization.ZyPlatfrom.loadPlatfromTree",map);
		return tree.getTree();
	}
	/**
	 * 获取平台值，按，号分隔
	 * Title:ZyPlatfrom.java
	 * name:zhimin.mo
	 * return:String
	 * describe:
	 * time:2018年1月19日
	 */
	public String loadPlatfromValueStr(String platfromIdStr) {
		Record platfromValue = new QueryInfo("organization.ZyPlatfrom.loadPlatfromValueStr")
				.addParam("idStr", platfromIdStr).findOne();
		if(null == platfromIdStr){
			return null;
		}
		if(UtilString.isEmpty(platfromValue.getStr("platfromValue"))){
			return null;
		}
		return platfromValue.getStr("platfromValue");
	}
	
	/**
	 * 通过平台获取对象
	 * Title:ZyPlatfrom.java
	 * name:zhimin.mo
	 * return:List<ZyPlatfrom>
	 * describe:
	 * time:2018年1月18日
	 */
	public List<ZyPlatfrom> queryPlatfromByValue(String value) {
		QueryInfo info = new QueryInfo("");
		if(UtilString.isEmpty(value)){
			return null;
		}
		String sql = "select * from zy_platfrom p where 1=1 and value in ("+value+") ";
		info.setQuery(sql);
		return info.find(ZyPlatfrom.class);
	}
	/**
	 * 通过节点ID获取对象
	 * Title:ZyPlatfrom.java
	 * name:zhimin.mo
	 * return:List<ZyPlatfrom>
	 * describe:
	 * time:2018年1月18日
	 * 0：公司   1：平台
	 */
	@Select()
	public List<ZyPlatfrom> queryPlatfromByParentId(@Param("parent_id") Integer parentId) {
		return null;
	}
	/**
	 * 获取平台单选数据
	 * @param type
	 * @return
	 */
	public List<Map<String, String>> getPlatfromOptions(){
		List<Map<String, String>> list = new ArrayList<>();
		List<ZyPlatfrom> zyPlatfromList = ZyPlatfrom.dao().queryPlatfromByParentId(1);
		if(null != zyPlatfromList){
			for(ZyPlatfrom ZyPlatfrom : zyPlatfromList){
				Map<String, String> map = new HashMap<>();
				map.put("k",ZyPlatfrom.getName());
				map.put("v",ZyPlatfrom.getValue());
				list.add(map);
			}
		}
		return list;
	}
	
	/** 
	*   
	*  column: id 
	*/
	public long getid(){
	    return get("id",-1L);
	}
	public void setid(long id ){
	    set("id",id);
	}

	/** 
	*  0:删除 1：正常 
	*  column: state 
	*/
	public int getstate(){
	    return get("state",-1);
	}
	public void setstate(int state ){
	    set("state",state);
	}

	/** 
	*  创建时间 
	*  column: create_time 
	*/
	public Date getCreateTime(){
	    return get("create_time");
	}
	public void setCreateTime(Date createTime ){
	    set("create_time",createTime);
	}

	/** 
	*  更新时间 
	*  column: update_time 
	*/
	public Date getUpdateTime(){
	    return get("update_time");
	}
	public void setUpdateTime(Date updateTime ){
	    set("update_time",updateTime);
	}

	/** 
	*  平台名称 
	*  column: name 
	*/
	public String getName(){
	    return get("name");
	}
	public void setName(String name ){
	    set("name",name);
	}
	/** 
	*  平台值
	*  column: value 
	*/
	public String getValue(){
	    return get("value");
	}
	public void setValue(String value ){
	    set("value",value);
	}
	/** 
	*  节点值
	*  column: value 
	*/
	public Integer getParentId(){
	    return get("parent_id");
	}
	public void setParentId(Integer parentId ){
	    set("parent_id",parentId);
	}
}
