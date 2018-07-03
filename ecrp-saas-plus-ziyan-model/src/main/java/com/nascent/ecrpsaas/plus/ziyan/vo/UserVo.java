package com.nascent.ecrpsaas.plus.ziyan.vo;

import com.nascent.ecrpsaas.plus.ziyan.organization.model.ZySysUser;

public class UserVo {
    private String departmentCode;
    private String positionCode;
    private ZySysUser sysUser;

    public UserVo() {
    }

    public String getDepartmentCode() {
        return this.departmentCode;
    }

    public void setDepartmentCode(String departmentCode) {
        this.departmentCode = departmentCode;
    }

    public String getPositionCode() {
        return this.positionCode;
    }

    public void setPositionCode(String positionCode) {
        this.positionCode = positionCode;
    }

	public ZySysUser getSysUser() {
		return sysUser;
	}

	public void setSysUser(ZySysUser sysUser) {
		this.sysUser = sysUser;
	}


}

