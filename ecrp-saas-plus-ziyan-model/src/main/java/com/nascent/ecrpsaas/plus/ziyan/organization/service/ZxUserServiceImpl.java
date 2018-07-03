package com.nascent.ecrpsaas.plus.ziyan.organization.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nascent.ecrpsaas.base.constat.SystemConstat;
import com.nascent.ecrpsaas.base.util.UtilMD5;
import com.nascent.ecrpsaas.base.util.UtilString;
import com.nascent.ecrpsaas.organization.model.SysUserDepartment;
import com.nascent.ecrpsaas.plus.ziyan.common.service.CommService;
import com.nascent.ecrpsaas.plus.ziyan.common.service.ZyUserService;
import com.nascent.ecrpsaas.plus.ziyan.organization.model.ZySysUser;
import com.nascent.ecrpsaas.plus.ziyan.vo.UserVo;
import com.nascent.utils.query.CommonResult;

@Service("hxUserService")
public class ZxUserServiceImpl implements ZyUserService{

    @Autowired
    private CommService commonService;

    @Transactional
    @Override
    public CommonResult saveOrUpdate(UserVo userVo, int groupId) {
        /* 操作结束信息 */
        String msg;
        ZySysUser sysUser = userVo.getSysUser();
        // 将岗位产品线赋值到用户的操作去除 20171208 add by hyy  这里考虑是否需要存入产品公司的信息？用户的部门岗位信息已有关系表存储

        if(!UtilString.isEmptyOrNullWildcard(sysUser.getpassword())){
            sysUser.setpassword(UtilMD5.getMD5(sysUser.getpassword()));
        }
        /* 保存/修改用户信息 */
        if(sysUser.getid() >0 ){
            sysUser.update();
            msg = SystemConstat.OperationMsg.UPDATE.getName();
        }else{
            sysUser.setGroupId(groupId);
            sysUser.save();
            msg = SystemConstat.OperationMsg.SAVE.getName();
        }
        /* 删除用户原部门岗位关系 */
        if(SysUserDepartment.dao().queryByUserIdCount(sysUser.getid()) > 0){
            SysUserDepartment.dao().deleteByUserId(sysUser.getid());
        }
        /* 新增用户部门岗位关系 */
        SysUserDepartment userDepartment = new SysUserDepartment();
        userDepartment.setGroupId(groupId);
        userDepartment.setDepartmentCode(userVo.getDepartmentCode());
        userDepartment.setPositionCode(userVo.getPositionCode());
        userDepartment.setUserId(sysUser.getid());
        userDepartment.save();

        return new CommonResult().setMsg(msg);
    }

    @Override
    public String getUserProductCompanyCode(String departmentCode) {
        String topDepartmentCode = commonService.loadTopDepartmentCode();

        if (topDepartmentCode.equals(departmentCode)) {
            // 集团权限
            return "0";
        }
        return departmentCode;
    }
}
