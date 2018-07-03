package com.nascent.ecrpsaas.open.ziyan.api.customer;

import com.nascent.ecrpsaas.open.core.API;
import com.nascent.ecrpsaas.open.utils.MapUtil;
import com.nascent.ecrpsaas.open.utils.StringUtil;
import com.nascent.ecrpsaas.open.ziyan.constant.ZyConstant;
import com.nascent.ecrpsaas.open.ziyan.model.GradeRuleDetailModel;
import com.nascent.ecrpsaas.open.ziyan.model.KdCustomerWeixinModel;
import com.nascent.ecrpsaas.open.ziyan.model.ZyConsumeValueLogModel;
import com.nascent.ecrpsaas.open.ziyan.model.vo.CustomizeFindVo;
import com.nascent.ecrpsaas.open.ziyan.model.vo.PageWithListVo;
import com.nascent.plugins.jfinal.activerecord.Record;
import com.nascent.utils.query.CommonResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;
import java.util.Map;

/**
 * 对内会员接口
 *
 * @author FeiXiang
 * @date 2017/12/20
 */
@API(check = API.Check.NULL)
@RequestMapping(path = "/api/ziyanapi")
public class CustomerApi {
    /**
     * 获取紫燕的会员等级规则
     */
    @RequestMapping(path = "/getGradeRulesApi/getAllGradeRules", method = {RequestMethod.GET, RequestMethod.POST})
    public CommonResult getAllGradeRules() {
        return new CommonResult(GradeRuleDetailModel.dao().findListByBrandId(ZyConstant.ZIYAN_BRAND_ID));
    }

    /**
     * 微互动-获取会员消费值统计和优惠券数量相关信息
     */
    @RequestMapping(path = "/getUserInfoApi/getUserInfo", method = {RequestMethod.GET, RequestMethod.POST})
    public CommonResult getUserInfo(String openId) {
        if (StringUtil.isEmpty(openId)) {
            return CommonResult.SUCCESS.setFailed().setMsg("会员openId不能为空！");
        }
        return new CommonResult(KdCustomerWeixinModel.dao().getCustomerInfoByOpenId(openId));
    }

    /**
     * 获取会员消费值日志
     */
    @RequestMapping(path = "/getUserGrouthValueLogApi/getUserGrouthValueLog", method = {RequestMethod.GET, RequestMethod.POST})
    public CommonResult getUserGrouthValueLog(CustomizeFindVo vo) {
        if (StringUtil.isEmpty(vo.getOpenId())) {
            return CommonResult.SUCCESS.setFailed().setMsg("会员openId不能为空！");
        }
        vo.setState(ZyConstant.ZY_CONSUME_VALUE_LOG_STATE_NORMAL.toString());   //未删除的消费值日志
        vo.setPageDefault();
        Map<String, Object> map = MapUtil.beanToMap(vo);
        long count = ZyConsumeValueLogModel.dao().getCount(map);
        List<Record> list = null;
        if (count > 0) {
            list = ZyConsumeValueLogModel.dao().findList(MapUtil.beanToMap(vo));
        }
        return new CommonResult(new PageWithListVo(vo.getPageNum(), vo.getPageSize(), count, list));
    }

}
