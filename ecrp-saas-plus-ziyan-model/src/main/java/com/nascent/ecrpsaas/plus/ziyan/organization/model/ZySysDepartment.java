package com.nascent.ecrpsaas.plus.ziyan.organization.model;

import com.nascent.ecrpsaas.components.options.OptionItem;
import com.nascent.ecrpsaas.organization.model.SysDepartment;
import com.nascent.plugins.jfinal.activerecord.Record;
import com.nascent.plugins.spring.SpringContext;
import com.nascent.plugins.sqlinxml.annotation.Param;
import com.nascent.plugins.sqlinxml.annotation.Select;
import com.nascent.utils.query.QueryInfo;

import java.util.ArrayList;
import java.util.List;

/**
 * @Describe: 紫燕部门管理
 * @author:   huangyuye
 * @Date:     2017-12-08
 */
@Select
public class ZySysDepartment extends SysDepartment{

    public static ZySysDepartment dao(){
        return SpringContext.me().getModel(ZySysDepartment.class);
    }

    /**
     * 根据父节点id查询部门
     * @param parentId
     * @return
     */
    @Select(limit = "limit 1")
    public ZySysDepartment loadDepartmentByParentId(@Param("parent_id$EQ") Integer parentId){
        return null;
    }

    /**
     * 根据部门编码查询二级部门
     * @param code 指定任意二级部门编码 code传null则查询所有
     * @return
     */
    @Select(id="organization.zyDepartment.querySecondLevelDepartment" )
    public List<ZySysDepartment> querySecondLevelDepartment(@Param("code")String code){
        return null;
    }

    /**
     * 查询产品公司简单下拉
     * @return
     */
    public List<OptionItem> queryProductCompanyOptions(){
        List<ZySysDepartment> zySysDepartments = dao().querySecondLevelDepartment(null);
        List<OptionItem> optionItems = new ArrayList<>();
        zySysDepartments.forEach(zySysDepartment -> {
            OptionItem item = new OptionItem();
            item.setK(zySysDepartment.getname());
            item.setV(zySysDepartment.getcode());
            optionItems.add(item);
        });
        return optionItems;
    }

    /**
     * 根据部门编码获取对应产品公司部门编码
     * @param code 部门编码
     * @return (传入1级/2级部门编码则直接返回, 传入2级以下节点则查询到对应的2级节点部门编码) 若传入的部门编码找不到对应产品公司则返回null
     */
    public String getProductCompanyCodeByCode(String code){
        QueryInfo queryInfo = new QueryInfo("organization.zyDepartment.getProductCompanyCodeByCode");
        Record record = queryInfo.addParam("code", code).findOne();
        if (null != record) {
            return record.getStr("deptCode");
        }
        return null;
    }





}
