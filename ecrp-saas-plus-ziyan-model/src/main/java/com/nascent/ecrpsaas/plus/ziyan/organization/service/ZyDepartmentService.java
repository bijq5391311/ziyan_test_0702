package com.nascent.ecrpsaas.plus.ziyan.organization.service;

import com.nascent.ecrpsaas.organization.model.SysDepartment;
import com.nascent.utils.query.CommonResult;

/**
 * @Describe: 紫燕组织架构管理接口
 * @author:   huangyuye
 * @Date:     2017-12-10
 */
public interface ZyDepartmentService {

    /**
     * 保存或更新部门
     * @param department
     * @param groupIdH
     * @return
     */
    CommonResult saveOrUpdate(SysDepartment department, int groupId);

    /**
     * 根据店铺编码获取产品公司编码 // 二级部门
     * @param shopCode
     * @return
     */
    String getProductCompanyCodeByShopCode(String shopCode);

}
