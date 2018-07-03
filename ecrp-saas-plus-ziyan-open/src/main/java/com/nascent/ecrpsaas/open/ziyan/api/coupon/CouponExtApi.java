package com.nascent.ecrpsaas.open.ziyan.api.coupon;

import com.nascent.ecrpsaas.open.core.API;
import com.nascent.ecrpsaas.open.utils.MapUtil;
import com.nascent.ecrpsaas.open.utils.StringUtil;
import com.nascent.ecrpsaas.open.ziyan.constant.ZyConstant;
import com.nascent.ecrpsaas.open.ziyan.model.ZyCouponCustomerExtModel;
import com.nascent.ecrpsaas.open.ziyan.model.vo.CustomizeFindVo;
import com.nascent.ecrpsaas.open.ziyan.model.vo.PageWithListVo;
import com.nascent.ecrpsaas.open.ziyan.service.CouponService;
import com.nascent.plugins.jfinal.activerecord.Record;
import com.nascent.utils.query.CommonResult;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * @author FeiXiang
 * @date 2017/12/21
 * @describe
 */
@API(check = API.Check.NULL)
@RequestMapping(path = "/api/ziyanapi/couponext")
public class CouponExtApi {
	Logger logger = LoggerFactory.getLogger(CouponExtApi.class);
    @Autowired
    private CouponService couponService;

    /**
     * 客户拥有的优惠券列表查询
     */
    @RequestMapping(method = {RequestMethod.GET, RequestMethod.POST})
    public CommonResult findCouponExtList(CustomizeFindVo vo) {
        if (StringUtil.isEmpty(vo.getOpenId())) {
            return CommonResult.SUCCESS.setFailed().setMsg("会员openId不能为空！");
        }
        if (StringUtil.isEmpty(vo.getState())) {
            return CommonResult.SUCCESS.setFailed().setMsg("优惠券状态不能为空！");
        }
        if (ZyConstant.SYS_COUPON_STATE_INVALID.toString().equals(vo.getState())) {
            //已过期的优惠券查询条件：1：未使用；2：有效期已超出当前时间
            vo.setState(ZyConstant.SYS_COUPON_STATE_VALID.toString());
            vo.setEndTimeLater(new Date());
        } else if (ZyConstant.SYS_COUPON_STATE_VALID.toString().equals(vo.getState())) {
            //可用的优惠券条件查询：有效期未超出当前时间
            vo.setEntTimeBefore(new Date());
        }
        vo.setPageDefault();    //设置默认分页
        Map<String, Object> map = MapUtil.beanToMap(vo);
        long count = ZyCouponCustomerExtModel.dao().getCount(map);
        List<Record> list = null;
        if (count > 0) {
            list = ZyCouponCustomerExtModel.dao().findList(MapUtil.beanToMap(vo));
        }
        return new CommonResult(new PageWithListVo(vo.getPageNum(), vo.getPageSize(), count, list));
    }

    /**
     * 给客户发放一张优惠券
     */
    @RequestMapping(method = {RequestMethod.GET, RequestMethod.POST})
    public CommonResult sendCouponExt(CustomizeFindVo vo) {
        if (StringUtil.isEmpty(vo.getCouponId())) {
            return CommonResult.SUCCESS.setFailed().setMsg("优惠券id不能为空！");
        }
        if (StringUtil.isEmpty(vo.getOpenId())) {
            return CommonResult.SUCCESS.setFailed().setMsg("会员openId不能为空！");
        }
        return couponService.sendCouponExt(vo);
    }
    /**
     * 页面领取优惠券->给客户发放一张优惠券
     */
    @RequestMapping(method = {RequestMethod.GET, RequestMethod.POST})
    public CommonResult sendPageReceiveCoupon(CustomizeFindVo vo) {
    	logger.info("页面领取优惠券->优惠券ID："+vo.getCouponId()+"   手机号："+vo.getMobile());
        if (StringUtil.isEmpty(vo.getCouponId())) {
        	logger.info("优惠券id不能为空！");
            return CommonResult.SUCCESS.setFailed().setMsg("网络异常").setResult(null);
        }
        if (StringUtil.isEmpty(vo.getMobile())) {
        	logger.info("手机号不能为空不能为空！");
            return CommonResult.SUCCESS.setFailed().setMsg("网络异常").setResult(null);
        }
        return couponService.sendPageReceiveCoupon(vo);
    }
}
