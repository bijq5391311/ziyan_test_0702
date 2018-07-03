package com.nascent.ecrpsaas.plus.ziyan.vip.model;

import com.nascent.ecrpsaas.vip.model.KdCustomerBrand;
import com.nascent.plugins.sqlinxml.annotation.Param;
import com.nascent.plugins.sqlinxml.annotation.Select;

/**
 * @author jingyu.gao
 * @Date 2017/11/18
 * @功能
 */
@Select
public class ZyCustomerBrand extends KdCustomerBrand {
	
	private static ZyCustomerBrand customerBrand =  new ZyCustomerBrand();

    public static ZyCustomerBrand dao() {
        return customerBrand;
    }

    public void saveOrUpdate(ZyCustomerBrand obj) {
        if (obj.getId() > 0L) {
            obj.update();
        } else {
            obj.save();
        }
    }
    
    

    @Override
    public long getId() {
        return this.get("id", -1);
    }

	public int getConsumeTotal(){
	    return get("consume_total",-1);
	}
	public void setConsumeTotal(int consumeTotal ){
	    set("consume_total",consumeTotal);
	}
    @Select()
    public KdCustomerBrand queryCustomerBrand(@Param("sys_customer_id") long customerId,
                                              @Param("brand_id") Integer brandId) {
        return null;
    }
    
    @Select()
    public KdCustomerBrand loadCustomerBrand(@Param("sys_customer_id") long customerId,
                                              @Param("member_grade") Integer membeGrade) {
        return null;
    }

    /**
     * 根据用户Id查找对应品牌黑名单信息
     *
     * @param sysCustomerId
     * @param isRightBlack
     * @return
     */
    @Select(limit = "limit 1")
    public KdCustomerBrand loadBlackBrandCustomerByCustomerId(@Param("sys_customer_id") long sysCustomerId,
                                                              @Param("is_right_black") Integer isRightBlack) {
        return null;
    }
}
