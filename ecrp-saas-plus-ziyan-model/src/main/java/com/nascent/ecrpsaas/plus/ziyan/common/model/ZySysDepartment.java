package com.nascent.ecrpsaas.plus.ziyan.common.model;

import java.util.ArrayList;
import java.util.List;

import com.nascent.ecrpsaas.components.options.OptionItem;
import com.nascent.ecrpsaas.organization.model.SysDepartment;
import com.nascent.plugins.spring.SpringContext;
import com.nascent.plugins.sqlinxml.annotation.Param;
import com.nascent.plugins.sqlinxml.annotation.Select;

/**
 * @Describe:  紫燕部门管理
 * @author:   jingyu.gao
 * @Date:     2017-12-29
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
    @Select(id="organization.hxDepartment.querySecondLevelDepartment" )
    public List<ZySysDepartment> querySecondLevelDepartment(@Param("code")String code){
        return null;
    }

    /**
     * 查询产品公司简单下拉
     * @return
     */
    public List<OptionItem> queryProductCompanyOptions(){
        List<ZySysDepartment> hxSysDepartments = dao().querySecondLevelDepartment(null);
        List<OptionItem> optionItems = new ArrayList<>();
        hxSysDepartments.forEach(hxSysDepartment -> {
            OptionItem item = new OptionItem();
            item.setK(hxSysDepartment.getname());
            item.setV(hxSysDepartment.getcode());
            optionItems.add(item);
        });
        return optionItems;
    }



}
