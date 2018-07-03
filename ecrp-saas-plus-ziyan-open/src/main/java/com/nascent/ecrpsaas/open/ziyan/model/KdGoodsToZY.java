package com.nascent.ecrpsaas.open.ziyan.model;

import java.io.File;
import java.io.FileInputStream;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.transaction.annotation.Transactional;

import com.nascent.ecrpsaas.base.constat.ImportLogStatus;
import com.nascent.ecrpsaas.base.constat.SystemConstat;
import com.nascent.ecrpsaas.base.model.BaseModel;
import com.nascent.ecrpsaas.base.util.UtilExcel;
import com.nascent.ecrpsaas.base.vo.touch.SysBrandVo;
import com.nascent.ecrpsaas.database.constant.GoodsConstant;
import com.nascent.ecrpsaas.database.service.KdImportLogService;
import com.nascent.plugins.jfinal.activerecord.Record;
import com.nascent.plugins.spring.SpringContext;
import com.nascent.plugins.sqlinxml.annotation.Param;
import com.nascent.plugins.sqlinxml.annotation.Select;
import com.nascent.plugins.sqlinxml.annotation.TableBind;
import com.nascent.utils.model.UserSession;
import com.nascent.utils.query.QueryInfo;
import com.nascent.utils.query.TableRequest;
import com.nascent.utils.query.TableResponse;

@Select()
@TableBind(name="kd_goods", pk="id")
public class KdGoodsToZY extends BaseModel<KdGoodsToZY>{
	
	private static final long serialVersionUID = 1L;
	public static KdGoodsToZY dao() {
	    return SpringContext.me()
		    .getModel(KdGoodsToZY.class);
	}
	
	/**
	 * Title:获取购买商品中限定商品的数量
	 * name:zhimin.mo
	 * return:Integer
	 * describe:
	 * time:2017年12月23日
	 */
	public Long getGoodsCount(String sysGoodsIds, String outGoodsIds) {
        QueryInfo queryInfo = new QueryInfo("api.zyGoods.countGoods");
        Record goodsCount = queryInfo.addParam("goodsIds", sysGoodsIds)
        		.addParam("outerIds", outGoodsIds)
        		.findOne();
        if(null == goodsCount){
        	return 0L;
        }
         return goodsCount.getLong("count");
    }
	
	/** 
	*   
	*  column: id 
	*/
	public int getid(){
	    return get("id",-1);
	}
	public void setid(int id ){
	    set("id",id);
	}

	/** 
	*  1：正常  0 禁用 
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
	*  集团ID 
	*  column: group_id 
	*/
	public Integer getGroupId(){
	    return get("group_id",-1);
	}
	public void setGroupId(Integer groupId ){
	    set("group_id",groupId);
	}

	/** 
	*  系统内部商品ID 
	*  column: sys_goods_id 
	*/
	public long getSysGoodsId(){
	    return get("sys_goods_id");
	}
	public void setSysGoodsId(long sysGoodsId ){
	    set("sys_goods_id",sysGoodsId);
	}

	/** 
	*  商品标题 
	*  column: title 
	*/
	public String gettitle(){
	    return get("title");
	}
	public void settitle(String title ){
	    set("title",title);
	}

	/** 
	*  商家编码 
	*  column: outer_id 
	*/
	public String getOuterId(){
	    return get("outer_id");
	}
	public void setOuterId(String outerId ){
	    set("outer_id",outerId);
	}

	/** 
	*  图片URL 
	*  column: picture_url 
	*/
	public String getPictureUrl(){
	    return get("picture_url");
	}
	public void setPictureUrl(String pictureUrl ){
	    set("picture_url",pictureUrl);
	}

	/** 
	*  总销售量 
	*  column: sales_count 
	*/
	public int getSalesCount(){
	    return get("sales_count",-1);
	}
	public void setSalesCount(int salesCount ){
	    set("sales_count",salesCount);
	}

	/** 
	*  30天内总销量 
	*  column: thirty_sales_count 
	*/
	public int getThirtySalesCount(){
	    return get("thirty_sales_count",-1);
	}
	public void setThirtySalesCount(int thirtySalesCount ){
	    set("thirty_sales_count",thirtySalesCount);
	}

	/** 
	*  备注 
	*  column: remark 
	*/
	public String getremark(){
	    return get("remark");
	}
	public void setremark(String remark ){
	    set("remark",remark);
	}

	/** 
	*  商品分类ids，存放完整的目录 ：如 一级分类ID,二级分类ID;一级分类ID,二级分类ID,一个商品可以挂多个分类。 
	*  column: goods_cids 
	*/
	public String getGoodsCids(){
	    return get("goods_cids");
	}
	public void setGoodsCids(String goodsCids ){
	    set("goods_cids",goodsCids);
	}

	
	
	
	public int getBrandId(){
	    return get("brand_id",-1);
	}
	public void setBrandId(int brandId ){
	    set("brand_id",brandId);
	}
	public double getPrice(){
		return get("price");
	}
	public void setPrice(double price){
		set("price",price);
	}

}
