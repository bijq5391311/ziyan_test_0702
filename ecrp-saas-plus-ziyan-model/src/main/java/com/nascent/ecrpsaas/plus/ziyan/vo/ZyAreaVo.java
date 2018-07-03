package com.nascent.ecrpsaas.plus.ziyan.vo;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.nascent.ecrpsaas.base.constat.AreaTypeEnum;
import com.nascent.ecrpsaas.base.util.TreeNode;
import com.nascent.ecrpsaas.base.util.UtilString;
import com.nascent.ecrpsaas.base.util.UtilTree;
import com.nascent.utils.query.QueryInfo;


public class ZyAreaVo {

	private static final ZyAreaVo AREA_VO = new ZyAreaVo();
	
	public static ZyAreaVo dao(){
		return AREA_VO;
	}
	/**
	 * 获取每一级地区.
	 * @param parentId
	 * @return
	 */
	public List<ZyAreaVo> queryArea(String parentId){
		QueryInfo qInfo;
		if(UtilString.areNotEmpty(parentId)){
			qInfo = new QueryInfo("zybase.area.queryAreaTree").addParam("parent_id", parentId);
		}else{
			qInfo = new QueryInfo("zybase.area.queryAreaTree").addParam("tb_type", AreaTypeEnum.PROVINCE.getValue());
		}
		
		List<ZyAreaVo> areaVo = qInfo.findT(ZyAreaVo.class);
		if (areaVo != null && areaVo.size() > 0) {
			return areaVo;
		}
		return null;
	}
	/**
	 * 标准行政区域代码
	 */
	private String id;
	/**
	 * 地域名城管
	 */
	private String label;
	/**
	 * 父节点区域标识
	 */
	private String parentId;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getLabel() {
		return label;
	}

	public void setLabel(String label) {
		this.label = label;
	}

	public String getParentId() {
		return parentId;
	}

	public void setParentId(String parentId) {
		this.parentId = parentId;
	}
	
}
