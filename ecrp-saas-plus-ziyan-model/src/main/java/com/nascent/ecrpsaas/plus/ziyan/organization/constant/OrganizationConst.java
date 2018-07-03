package com.nascent.ecrpsaas.plus.ziyan.organization.constant;

/**
 * @Describe: 紫燕店铺编码常量
 * @author:   huangyuye
 * @Date:     2017-11-08
 */
public class OrganizationConst {

    /**
     * 店铺类型 0常规店铺 1商城店铺
     */
    public enum ShopType{
        Common(0, "常规店铺"),
        ZyMall(1, "商城店铺");
        private Integer value;
        private String name;
        ShopType(Integer value, String name){
            this.value = value;
            this.name = name;
        }
        public Integer getValue() {
            return value;
        }
        public String getName() {
            return name;
        }
    }

    /**
     * 部门编码
     */
    public enum DepartmentCode{

    }

}
