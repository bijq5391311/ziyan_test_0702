package com.nascent.ecrpsaas.plus.ziyan.organization.model;

import com.nascent.ecrpsaas.organization.model.SysUser;
import com.nascent.plugins.spring.SpringContext;
import com.nascent.plugins.sqlinxml.annotation.Param;
import com.nascent.plugins.sqlinxml.annotation.Select;
import com.nascent.utils.query.QueryInfo;

/**
 * @author zhourongping
 * @Date 2017/11/1
 * @功能
 */
@Select
public class ZySysUser extends SysUser {

    public static ZySysUser dao() {
        return SpringContext.me().getModel(ZySysUser.class);
    }

    @Select(sql = "select shop_id")
    public ZySysUser findShopByAccount(@Param("login_account") String loginAccount) {
        return null;
    }

    /**
     * todo   更新对应岗位的员工产品线信息
     * @param brandId
     * @param positionCode
     * @return
     */
    public int updateUserBrandByCodes(Integer brandId, String positionCode) {
        QueryInfo queryInfo = new QueryInfo("organization.zySysUser.updateUserBrandByCodes");
        return queryInfo.addParam("brandId",brandId).addParam("positionCode", positionCode).execute();
    }

    public int getShopId() {
        return (Integer) this.get("shop_id", Integer.valueOf(-1));
    }

    public void setShopId(int ShopId) {
        this.set("shop_id", ShopId);
    }

    /**
     * 品牌Id
     * column : brand_id
     */
    public Integer getBrandId() {
        return get("brand_id", 0);
    }
    public void setBrandId(Integer brandId) {
        set("brand_id", brandId);
    }

}
