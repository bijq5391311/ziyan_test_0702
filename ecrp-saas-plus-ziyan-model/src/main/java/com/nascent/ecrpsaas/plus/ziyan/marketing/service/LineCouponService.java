package com.nascent.ecrpsaas.plus.ziyan.marketing.service;

import java.util.Map;

import com.nascent.ecrpsaas.base.model.KdServiceShopPro;
import com.nascent.ecrpsaas.database.model.KdExportLog;
import com.nascent.ecrpsaas.plus.ziyan.marketing.model.SysCoupon;
import com.nascent.ecrpsaas.plus.ziyan.marketing.vo.CouponVo;
import com.nascent.utils.model.UserSession;
import com.nascent.utils.query.TableRequest;

/**
 * @author mozhimin
 * @date 2017年12月16日
 * @功能  线下优惠券服务层
 */
public interface LineCouponService {
	/**
	 * Title:导出优惠券发放日志
	 * name:zhimin.mo
	 * return:void
	 * describe:
	 * time:2017年12月16日
	 */
	public void exportCouponAnalyzeLog(TableRequest request, UserSession session);
	/**
	 * Title:保存优惠券
	 * name:zhimin.mo
	 * return:Map<String,Object>
	 * describe:
	 * time:2017年12月16日
	 */
	Map<String, Object> saveLineCoupon(CouponVo couponVo, UserSession userSession);
	
	/**
	 * Title:导出优惠券，且生产优惠券编码
	 * name:zhimin.mo
	 * return:Map<String,Object>
	 * describe:
	 * time:2017年12月20日
	 */
	Map<String, Object> exportCoupon(SysCoupon coupon, Long couponId, Integer couponAmouet, UserSession userSession, KdExportLog exportLog);
	
	/**
	 * Title:生成导出日志
	 * name:zhimin.mo
	 * return:KdExportLog
	 * describe:
	 * time:2017年12月21日
	 */
	public KdExportLog initExportLog(UserSession userSession);
}
