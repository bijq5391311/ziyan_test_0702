package com.nascent.ecrpsaas.plus.ziyan.common.service;

import org.springframework.transaction.annotation.Transactional;

import com.nascent.ecrpsaas.plus.ziyan.vo.UserVo;
import com.nascent.utils.query.CommonResult;

/**
 * @Describe: TODO 紫燕用户接口
 * @Author:   jingyu.gao
 * @Date:     2017-12-24
 */
public interface ZyUserService {

    /**
     *  新增或保存一个账户.
     * @param userVo
     * @param groupId
     * @return 用户id
     */
     @Transactional
     CommonResult saveOrUpdate(UserVo userVo, int groupId);

    /**
     * 根据部门编码获取产品公司编码
     * @param  departmentCode
     * @return 若员工所在部门层级为1，则返回对应互动标识的集团权限编码;若员工所在部门层级为2，则返回对应部门的编码
     */
     String getUserProductCompanyCode(String departmentCode);

}
