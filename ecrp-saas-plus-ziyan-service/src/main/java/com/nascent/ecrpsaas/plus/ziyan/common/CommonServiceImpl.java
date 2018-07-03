package com.nascent.ecrpsaas.plus.ziyan.common;

import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.commons.lang3.ArrayUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONObject;
import com.nascent.ecrpsaas.base.constat.SystemConstat;
import com.nascent.ecrpsaas.base.util.TreeNode;
import com.nascent.ecrpsaas.base.util.UtilDate;
import com.nascent.ecrpsaas.base.vo.organization.SysShopVo;
import com.nascent.ecrpsaas.base.web.BaseController;
import com.nascent.ecrpsaas.components.options.OptionItem;
import com.nascent.ecrpsaas.database.service.KdOperationLogService;
import com.nascent.ecrpsaas.plus.ziyan.common.constant.CacheConstant;
import com.nascent.ecrpsaas.plus.ziyan.common.constant.OperationLogEnum;
import com.nascent.ecrpsaas.plus.ziyan.common.service.CommService;
import com.nascent.ecrpsaas.plus.ziyan.marketing.model.ZySysShop;
import com.nascent.ecrpsaas.plus.ziyan.organization.model.ZySysDepartment;
import com.nascent.ecrpsaas.plus.ziyan.vip.model.ZyGradeRule;
import com.nascent.ecrpsaas.plus.ziyan.vip.model.ZyGradeRuleDetail;
import com.nascent.plugins.jfinal.activerecord.Record;
import com.nascent.plugins.sqlinxml.annotation.ArModel;
import com.nascent.utils.model.UserSession;
import com.nascent.utils.query.TableRequest;
import com.nascent.utils.query.TableResponse;

/*
 * 通用接口实现类
 */
@Service("commonService")
public class CommonServiceImpl implements CommService {

    private Logger log = LoggerFactory.getLogger(CommonServiceImpl.class);

    private final CacheManager cache;
    @Autowired
    private KdOperationLogService optLogService;

    private String[] defaultExclude = {"id", "state", "create_time", "update_time"};

    @Autowired
    public CommonServiceImpl(CacheManager cache) {
        this.cache = cache;
    }

    @Override
    public void addOperationLog(ArModel<?> newModel, ArModel<?> oldModel,
                                String[] columns, Boolean isExclude, int logType) {
        //确定排除或指定比较的属性
        Set<String> columnsSet = new HashSet<>();
        if (null != columns && isExclude) {
            columnsSet.addAll(Arrays.asList(columns));
            columnsSet.addAll(Arrays.asList(defaultExclude));
        } else if (null != columns) {
            columnsSet.addAll(Arrays.asList(columns));
        } else {
            columnsSet.addAll(Arrays.asList(defaultExclude));
        }

        if (null == oldModel) {
            log.error(OperationLogEnum.operationLogMap.get(logType) + "历史记录不存在!");
            return;
        }

        Map<String, Object> attrNames = newModel.getAttrsMap();
        //记录更新前数据
        Map<String, Object> beforeMap = new HashMap<>();
        //记录更新后数据
        Map<String, Object> updateMap = new HashMap<>();
        for (Map.Entry<String, Object> entry : attrNames.entrySet()) {
            if (null == oldModel.get(entry.getKey()) && null == entry.getValue()) {
                continue;
            }
            //特殊属性比较前预处理
            if ("decay_time".equals(entry.getKey())) {
                oldModel.set("decay_time", UtilDate.formatDateTime(oldModel.getDate("decay_time")));
            }
            if ("shop_ids_codes".equals(entry.getKey()) && null == oldModel.get(entry.getKey())) {
                oldModel.set("shop_ids_codes", "[]");
            }

            //指定属性排除比较
            if (isExclude && ArrayUtils.contains(columnsSet.toArray(), entry.getKey())) {
                continue;
            }
            //指定属性比较
            if (!isExclude && !ArrayUtils.contains(columnsSet.toArray(), entry.getKey())) {
                continue;
            }
            if (null == oldModel.get(entry.getKey())) {
                oldModel.put(entry.getKey(), "空");
            }
            if (!oldModel.get(entry.getKey()).equals(entry.getValue())) {
                updateMap.putIfAbsent(entry.getKey(), entry.getValue());
                beforeMap.putIfAbsent(entry.getKey(), oldModel.get(entry.getKey()));
            }
        }
        //没有修改则不增加操作日志
        if (updateMap.isEmpty()) {
            return;
        }
        UserSession session = BaseController.getSessionUser();
        String operator = session.getUserName();
        Integer targetId;
        if (logType == OperationLogEnum.pointRule) {
            targetId = oldModel.get("product_line_id");
        } else if (logType == OperationLogEnum.pointBank) {
            targetId = oldModel.get("product_company_code");
        } else {
            targetId = null == newModel.getInt("id") ? 0 : newModel.getInt("id");
        }
        //添加操作日志
        optLogService.addOperationLog(operator, JSONObject.toJSONString(beforeMap),
                JSONObject.toJSONString(updateMap), session.getTenantId(), session.getDeptCode(),
                targetId, logType);
    }

    @Override
    public TreeNode queryShopTree(Integer[] brandIds, String shopCodes) {
        TreeNode treeNode = SysShopVo.dao().loadShopTree(brandIds, shopCodes);
        return treeNode;
    }


    @Override
    public String loadTopDepartmentCode() {
        if (cache.getCache(SystemConstat.CacheSession).get(CacheConstant.TOP_DEPARTMENT_CODE) == null) {
            cache.getCache(SystemConstat.CacheSession).put(
                    CacheConstant.TOP_DEPARTMENT_CODE, ZySysDepartment.dao().loadDepartmentByParentId(0));
        }
        String topDepartmentCode= cache.getCache(SystemConstat.CacheSession).get(
                CacheConstant.TOP_DEPARTMENT_CODE, String.class);

        return topDepartmentCode;
    }

	@Override
	public ZyGradeRule loadZyGradeRule() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<ZyGradeRuleDetail> queryZyGradeRuleDetailList() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Map<Integer, String> getGradeRuleMap() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Map<String, String> getGoodsParentCategoryMap() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public TableResponse<Record> queryOperationLog(TableRequest request) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ZySysShop loadOfflineChannelCode() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<OptionItem> queryProductCompanyOption() {
		// TODO Auto-generated method stub
		return null;
	}


}
