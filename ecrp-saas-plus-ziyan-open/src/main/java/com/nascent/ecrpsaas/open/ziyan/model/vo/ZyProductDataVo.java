package com.nascent.ecrpsaas.open.ziyan.model.vo;

/**
 * @author FeiXiang
 * @date 2017/12/20
 * @describe 会员信息查询接口vo
 */
public class ZyProductDataVo {
	//数量
	private String quantity;
	//商品ID
	private String productId;
	//价格
	private String productUnitPrice;
	//商品名称
	private String productName;
	
	public String getQuantity() {
		return quantity;
	}
	public void setQuantity(String quantity) {
		this.quantity = quantity;
	}
	public String getProductId() {
		return productId;
	}
	public void setProductId(String productId) {
		this.productId = productId;
	}
	public String getProductUnitPrice() {
		return productUnitPrice;
	}
	public void setProductUnitPrice(String productUnitPrice) {
		this.productUnitPrice = productUnitPrice;
	}
	public String getProductName() {
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}
	@Override
	public String toString() {
		return "ZyProductDataVo [quantity=" + quantity + ", productId=" + productId + ", productUnitPrice="
				+ productUnitPrice + ", productName=" + productName + "]";
	}
	
}
