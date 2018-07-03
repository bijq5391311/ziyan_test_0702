package com.nascent.ecrpsaas.plus.ziyan.dispatch.serviceimpl;

import com.alibaba.fastjson.JSONObject;
import com.nascent.ecrpsaas.base.util.UtilDate;
import com.nascent.ecrpsaas.care.model.CareAutoNotify;
import com.nascent.ecrpsaas.care.service.CareAutoNotifyService;
import com.nascent.ecrpsaas.organization.model.SysBrand;
import com.nascent.ecrpsaas.plus.ziyan.dispatch.service.MemberGradeUpService;
import com.nascent.ecrpsaas.plus.ziyan.dispatch.service.RankCheckService;
import com.nascent.ecrpsaas.plus.ziyan.dispatch.service.ZyGraderuledetailService;
import com.nascent.ecrpsaas.plus.ziyan.dispatch.vo.CustomerBrandVo;
import com.nascent.ecrpsaas.plus.ziyan.dispatch.vo.GradeRuleDetailVo;
import com.nascent.ecrpsaas.plus.ziyan.dispatch.vo.GradeUpdetailVo;
import com.nascent.ecrpsaas.plus.ziyan.dispatch.vo.KdBrandCustomeVo;
import com.nascent.ecrpsaas.plus.ziyan.vip.model.ZyCustomerBrand;
import com.nascent.ecrpsaas.plus.ziyan.vip.model.ZyGradeLog;
import com.nascent.ecrpsaas.vip.model.GradeLog;
import com.nascent.ecrpsaas.vip.model.GradeRule;
import com.nascent.ecrpsaas.vip.model.KdCustomer;
import com.nascent.ecrpsaas.vip.model.KdCustomerBrand;
import com.nascent.ecrpsaas.vip.service.GradeLogService;
import com.nascent.plugins.spring.SpringContext;
import com.nascent.utils.query.CommonResult;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.MessageFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service("zymemberGradeUpService")
public class MemberGradeUpServiceImpl implements MemberGradeUpService {
	// 日志记录
	Logger logger = LoggerFactory.getLogger(MemberGradeUpServiceImpl.class);
	// 引入会员校验规则
	private RankCheckService rankCheckService = SpringContext.me().getBean(RankCheckService.class);
	// 等级规则服务
	@Autowired
	private ZyGraderuledetailService graderuledetailService;

	// 等级日志记录类
	private GradeLogService gradeLogService = SpringContext.me().getBean(GradeLogService.class);

	private CareAutoNotifyService careAutoNotifyService = SpringContext.me().getBean(CareAutoNotifyService.class);

	@Override
	public void processMemberGradeUp() {
		try {
			memberGradeUp();
		} catch (Exception e) {
			logger.error("会员升级失败", e);
			throw new RuntimeException(e.getMessage());
		}
	}

	// 会员升级服务业务逻辑
	private void memberGradeUp() {
		// 获取所有品牌
		List<SysBrand> sysBrands = SysBrand.dao().queryBrand();
		logger.info ("***发现总共[{}]个品牌，开始会员升级服务***",sysBrands.size ());
		int i = 1;
		for (SysBrand sysBrand : sysBrands) {
			// 根据品牌进行会员升级操作
			int brandId = sysBrand.getid();
			// 会员升级逻辑
			CommonResult flag = memberGradeUp(brandId);
			logger.info ("{}.品牌(id:{}，name:{})，目标会员升级{}", i++, sysBrand.getid (), sysBrand.getBrandName (), flag != null && flag.isSuccess () ? "成功" : "失败");
		}
		logger.info ("***品牌会员升级服务结束***");

	}

	// 根据品牌获取升级规则和升级会员
	private CommonResult memberGradeUp(Integer brandId) {
		try {
			return gradeUp(brandId);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		}
		return null;

	}

	// 具体升级业务处理
	/**
	 * 计算时间段内,存在付款的客户是否满足升级 <功能详细描述>
	 * 
	 * @param brandId
	 */
	@SuppressWarnings("deprecation")
	private synchronized CommonResult gradeUp(Integer brandId) {
		CommonResult flag = new CommonResult(true);
		// 获取升级体系规则
		GradeRule gradeRule = GradeRule.dao().getGradeRuleByBrandId(brandId);
		// 未开启客道自定义升级规则!
		if (null == gradeRule || gradeRule.getStatus() == 0 || gradeRule.getstate() == 0) {
			logger.info("未开启自定义升级规则!");
			return flag.setFailed();
		}
		// 获取规则详细
		List<GradeRuleDetailVo> gradeRuleDetail = graderuledetailService
				.queryGradeRuleDetailByRuleId(gradeRule.getId());
		// 未设置升级规则
		if (null == gradeRuleDetail || gradeRuleDetail.size() <= 0) {
			logger.info("未设置升级明细!");
			return flag.setFailed();
		}
		// 是否开启总的排除黑名单(默认开起)
		int isIncludeBlack = gradeRule.getIsIncludeBlack();
		// 分页获取会员信息
		for (int pageIndex = 1, pageSize = 100; ; pageIndex++) {
			List<KdBrandCustomeVo> customerBrands = KdBrandCustomeVo.dao ().queryCustomerBrandList (pageIndex, pageSize);
			if (customerBrands == null || customerBrands.isEmpty ()) {
				break;
			}
			// 批次处理有新交易的客户,是否满足升级
			logger.info (MessageFormat.format ("查询成交客户{0}条.", customerBrands.size ()));
			for (KdBrandCustomeVo customerBrand : customerBrands) {
				// 公用参数
				long sysCustomerId = customerBrand.getSysCustomerId ();
				// 调用会员是否升级
				flag = rankCheckService.checkUpgrade (customerBrand, isIncludeBlack, gradeRuleDetail);
				if (flag.isSuccess ()) {
					GradeUpdetailVo gradeUpdetailVo = (GradeUpdetailVo) flag.getResult ();
					KdCustomerBrand KdCustomerBrand = ZyCustomerBrand.dao ().loadCustomerBrand (sysCustomerId,
							gradeUpdetailVo.getNextGrade ());
					// 生成会员升级通知
					KdCustomer customer = KdCustomer.dao ().queryCustomerInfoByCustomerId (sysCustomerId);
					if (null == KdCustomerBrand && null != customer) {
						Date currentDate = UtilDate.parseDate (UtilDate.getCurrentDate ());
						int isSuccess = CustomerBrandVo.dao ().updateCustomerbrandGrade (currentDate,
								gradeUpdetailVo.getNextGrade (), sysCustomerId);
						logger.info (MessageFormat.format ("更新客户数据库等级：{0}", isSuccess > 0 ? "成功" : "失败"));
						GradeLog gradeLog = ZyGradeLog.dao ().loadGradeLogByGrade (sysCustomerId,
								gradeUpdetailVo.getMemberGrade (), gradeUpdetailVo.getNextGrade ());
						if (isSuccess > 0 && null == gradeLog) {
							String custName = customer.getCustomerName ();
							// 添加会员升级日志
							boolean t = gradeLogService.addGradeLog (UtilDate.now (), sysCustomerId,
									gradeUpdetailVo.getMemberGrade (), gradeUpdetailVo.getNextGrade (),
									MessageFormat.format ("{0} 从等级 [{1}]升级为等级[{2}],成为[{3}]",
											isSuccess > 0 ? "成功" : "失败", gradeUpdetailVo.getMemberGrade (),
											gradeUpdetailVo.getNextGrade (), gradeUpdetailVo.getNextGradeName ()),
									custName, gradeUpdetailVo.getGroupId (), gradeUpdetailVo.getBrandId ());
							if (t) {
								CareAutoNotify careAutoNotify = new CareAutoNotify ();
								CareAutoNotify autoNotify = CareAutoNotify.dao ()
										.queryNotify (customerBrand.getSysCustomerId (), "MemberUpgrade");
								Date notifyTime = new Date ();
								if (notifyTime.getHours () >= 21) {
									notifyTime = UtilDate.addHour (UtilDate.addDay (notifyTime, 1), 9);
								}
								if (notifyTime.getHours () < 9) {
									notifyTime = UtilDate.addHour (UtilDate.addDay (notifyTime, 1), 9);
								}
								Map<String, Object> vJson = new HashMap<String, Object> ();
								vJson.put ("{OldGrade}", gradeUpdetailVo.getMemberGrade ());
								vJson.put ("{NewGrade}", gradeUpdetailVo.getNextGrade ());
								vJson.put ("{Name}", customer.getCustomerName ());
								vJson.put ("{Nick}", customer.getCustomerName ());
								vJson.put ("{UpgradeTime}", UtilDate.formatDate (new Date ()));
								if (null == autoNotify) {
									if (null != customer) {
										careAutoNotify.setEmail (customer.getemail ());
										careAutoNotify.setMobile (customer.getmobile ());
										careAutoNotify.setOutNick (customer.getCustomerName ());
									}
									careAutoNotify.setEmailStatus (0);
									careAutoNotify.setGradeRuleDetailId (gradeUpdetailVo.getNextGrade ());
									careAutoNotify.setGroupId (gradeUpdetailVo.getGroupId ());
									careAutoNotify.setMobileStatus (0);
									careAutoNotify.setMark ("MemberUpgrade");
									careAutoNotify.setNotifyTime (notifyTime);
									careAutoNotify.setSysCustomerId (sysCustomerId);
									careAutoNotify.setValues (JSONObject.toJSONString (vJson));
									careAutoNotifyService.saveCareAutoNotify (careAutoNotify);
								} else {
									autoNotify.setNotifyTime (notifyTime);
									autoNotify.setSysCustomerId (sysCustomerId);
									autoNotify.setValues (JSONObject.toJSONString (vJson));
									autoNotify.setGradeRuleDetailId (gradeUpdetailVo.getNextGrade ());
									autoNotify.setUpdateTime (UtilDate.now ());
									careAutoNotifyService.saveCareAutoNotify (autoNotify);
								}

							}

						} else {
							logger.info (MessageFormat.format ("客户[{0,number,#}]等级修改失败 ！", sysCustomerId));
						}

					} else {
						continue;
					}

				}
			}
		}

		return CommonResult.SUCCESS;
	}

}
