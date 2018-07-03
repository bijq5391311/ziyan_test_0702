package com.nascent.ecrpsaas.plus.ziyan.marketing.vo;


import java.util.List;

import javax.management.Query;

import com.nascent.ecrpsaas.base.constat.PlatFromType;
import com.nascent.plugins.jfinal.activerecord.Record;
import com.nascent.plugins.jfinal.activerecord.Table;
import com.nascent.utils.query.QueryInfo;
import com.nascent.utils.query.TableRequest;
import com.nascent.utils.query.TableResponse;

public class KdGoodsVo {

	/**
	 * 商品id
	 */
	private int id;

	/**
	 * 商品名称
	 */
	private String title;


	/**
	 * 商品价格
	 */
	private double price;

	/**
	 * 系统商品编码
	 */
	private long sysGoodsId;
	
	/**
	 * 图片url
	 */
	private String pictureUrl;
	
	private String outerId;
	
	
	private static final KdGoodsVo GOODS_VO = new KdGoodsVo();

	public static KdGoodsVo dao(){
		return GOODS_VO;
	}

	
	
	/**
	 * 根据ids查询商品列表
	 * @param ids
	 * @return
	 */
	public List<KdGoodsVo> queryGoodsByIds(String ids){
		QueryInfo queryInfo = new QueryInfo("marketing.sysCoupon.queryKdGoodsList")
				.addParam("ids", ids);
		List<KdGoodsVo> kdgoodsVos = queryInfo.findT(KdGoodsVo.class);
		return kdgoodsVos;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}



	public long getSysGoodsId() {
		return sysGoodsId;
	}



	public void setSysGoodsId(long sysGoodsId) {
		this.sysGoodsId = sysGoodsId;
	}



	public String getPictureUrl() {
		return pictureUrl;
	}



	public void setPictureUrl(String pictureUrl) {
		this.pictureUrl = pictureUrl;
	}



	public String getOuterId() {
		return outerId;
	}



	public void setOuterId(String outerId) {
		this.outerId = outerId;
	}
	
}
