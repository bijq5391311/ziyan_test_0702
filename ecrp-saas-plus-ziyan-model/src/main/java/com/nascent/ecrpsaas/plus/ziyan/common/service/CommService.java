package com.nascent.ecrpsaas.plus.ziyan.common.service;

import java.util.List;
import java.util.Map;

import com.nascent.ecrpsaas.base.util.TreeNode;
import com.nascent.ecrpsaas.components.options.OptionItem;
import com.nascent.ecrpsaas.plus.ziyan.marketing.model.ZySysShop;
import com.nascent.ecrpsaas.plus.ziyan.vip.model.ZyGradeRule;
import com.nascent.ecrpsaas.plus.ziyan.vip.model.ZyGradeRuleDetail;
import com.nascent.plugins.jfinal.activerecord.Record;
import com.nascent.plugins.sqlinxml.annotation.ArModel;
import com.nascent.utils.query.TableRequest;
import com.nascent.utils.query.TableResponse;


/**
 * 通用接口
 * @author ZRP/HYY
 */
public interface CommService {

    /**
     * (获取紫燕等级规则)
     */
    ZyGradeRule loadZyGradeRule();

    /**
     * TODO 查询紫燕的等级明细列表
     */
    List<ZyGradeRuleDetail> queryZyGradeRuleDetailList();

    /**
     * 查询会员等级id和等级名称的缓存
     *
     * @return 等级id和等级名称的(Map)
     */
    Map<Integer, String> getGradeRuleMap();


    /**
     * 查询商品一级分类cid和名称的缓存
     *
     * @return 商品分类cid和名称(Map)
     */
    Map<String, String> getGoodsParentCategoryMap();

    /**
     * 增加操作日志
     *
     * @param newModel  待保存的值
     * @param oldModel  历史记录
     * @param columns   指定的行
     * @param isExclude 是否排除指定的行
     * @param logType   日志类型
     */
    void addOperationLog(ArModel<?> newModel, ArModel<?> oldModel, String[] columns, Boolean isExclude, int logType);

    /**
     * 查询操作日志列表
     *
     * @param request 查表参数
     * @return 表格列表数据
     */
    TableResponse<Record> queryOperationLog(TableRequest request);

    /**
     * 紫燕查询商品下拉树
     *
     * @param brandIds  产品线id
     * @param shopCodes 权限店铺编码
     * @return
     */
    TreeNode queryShopTree(Integer[] brandIds, String shopCodes);

    /**
     * 查询线下渠道编码
     * @return
     */
    ZySysShop loadOfflineChannelCode();

    /**
     * 查询1级节点的部门编码
     * @return
     */
    String loadTopDepartmentCode();

    /**
     * 查询产品公司下拉框组件数据
     * @return
     */
    List<OptionItem> queryProductCompanyOption();
}
