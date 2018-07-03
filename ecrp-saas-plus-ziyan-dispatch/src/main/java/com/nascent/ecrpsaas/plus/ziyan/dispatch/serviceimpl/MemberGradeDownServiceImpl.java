package com.nascent.ecrpsaas.plus.ziyan.dispatch.serviceimpl;

import com.nascent.ecrpsaas.base.util.UtilDate;
import com.nascent.ecrpsaas.organization.model.SysBrand;
import com.nascent.ecrpsaas.plus.ziyan.dispatch.service.MemberGradeDownService;
import com.nascent.ecrpsaas.plus.ziyan.dispatch.service.ZyGraderuledetailService;
import com.nascent.ecrpsaas.plus.ziyan.dispatch.vo.GradeRuleDetailVo;
import com.nascent.ecrpsaas.plus.ziyan.dispatch.vo.KdBrandCustomeVo;
import com.nascent.ecrpsaas.plus.ziyan.vip.model.ZyCustomer;
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
import java.util.List;

@Service("zymemberGradeDownService")
public class MemberGradeDownServiceImpl implements MemberGradeDownService {
	Logger logger = LoggerFactory.getLogger(MemberGradeDownServiceImpl.class);
	@Autowired
	private ZyGraderuledetailService graderuledetailService;

	// 等级日志记录类
	private GradeLogService gradeLogService = SpringContext.me().getBean(GradeLogService.class);

	@Override
	public synchronized CommonResult processMemberGradeDown() {
		CommonResult flag = new CommonResult(true);
		// 获取升级体系规则
		// 获取所有品牌
		List<SysBrand> sysBrands = SysBrand.dao().queryBrand();
		for (SysBrand sysBrand : sysBrands) {
			GradeRule gradeRule = GradeRule.dao().getGradeRuleByBrandId(sysBrand.getid());
			// 未开启客道自定义升级规则!
			if (null == gradeRule || gradeRule.getStatus() == 0 || gradeRule.getstate() == 0) {
				logger.info("未开启自定义降级规则!");
				return flag.setFailed();
			}
			// 获取规则详细
			List<GradeRuleDetailVo> ruleDetails = graderuledetailService
					.queryGradeRuleDetailByRuleId(gradeRule.getId());
			// 未设置升级规则
			if (null == ruleDetails || ruleDetails.size() <= 0) {
				logger.info("未设置降级明细!");
				return flag.setFailed();
			}
			// 分页获取会员信息
			for (int pageIndex = 1, pageSize = 100; ; pageIndex++) {
				List<KdBrandCustomeVo> customerBrands = KdBrandCustomeVo.dao ().queryCustomerBrandList (pageIndex, pageSize);
				if (customerBrands == null || customerBrands.isEmpty ()) {
					break;
				}
				// 批次处理有新交易的客户,是否满足升级
				logger.info (MessageFormat.format ("查询会员{0}条.", customerBrands.size ()));
				for (KdBrandCustomeVo customerBrand : customerBrands) {
					// 公用参数
					long sysCustomerId = customerBrand.getSysCustomerId ();
					KdCustomer customer = ZyCustomer.dao ().loadCustomerInfoByCustId (sysCustomerId);
					// 获取会员的消费值
					int consumeTotal = customerBrand.getConsumeTotal ();
					// 获取当前会员的等级
					int memberGrade = customerBrand.getMemberGrade ();
					int temp = 0;
					// 下个等级
					int nextGrade = 0;
					String tempName = null;
					// 下个等级中文名称
					String nextGradeName = null;
					String tempGradeName = null;
					// 判断是否降级
					boolean isUp = false;
					for (int i = 0; i < ruleDetails.size (); i++) {
						// 下个等级
						nextGrade = ruleDetails.get (i).getGrade ();
						// 下个等级中文名称
						nextGradeName = ruleDetails.get (i).getGradeName ();
						if (consumeTotal >= 0 && consumeTotal <= ruleDetails.get (0).getZyConsume () && temp == 1) {
							isUp = true;
							// 下个等级
							temp = ruleDetails.get (0).getGrade ();
							// 下个等级中文名称
							tempGradeName = ruleDetails.get (0).getGradeName ();
							continue;
						} else if (consumeTotal >= ruleDetails.get (0).getZyConsume ()
								&& consumeTotal <= ruleDetails.get (1).getZyConsume ()) {
							isUp = true;
							// 下个等级等级信息
							temp = ruleDetails.get (0).getGrade ();
							tempGradeName = ruleDetails.get (0).getGradeName ();
							continue;
						} else if (consumeTotal >= ruleDetails.get (i).getZyConsume ()) {
							if (i < ruleDetails.size () - 1) {
								if (null != ruleDetails.get (i + 1)
										&& consumeTotal <= ruleDetails.get (i + 1).getZyConsume ()) {
									isUp = true;
									// 下个等级等级信息
									temp = ruleDetails.get (i).getGrade ();
									tempGradeName = ruleDetails.get (i).getGradeName ();
									continue;
								}
							} else if (i == ruleDetails.size () - 1) {
								if (null != ruleDetails.get (i)
										&& consumeTotal >= ruleDetails.get (i).getZyConsume ()) {
									isUp = true;
									// 下个等级等级信息
									temp = ruleDetails.get (i).getGrade ();
									tempGradeName = ruleDetails.get (i).getGradeName ();
									continue;
								}
							}
						}

					}
					if (isUp && temp != memberGrade) {
						KdCustomerBrand brandCust = ZyCustomerBrand.dao ().loadCustomerBrand (sysCustomerId, temp);
						String name = "";
						if (null == brandCust) {
							if (null != customer) {
								name = customer.getCustomerName ();
							}
							// 修改会员的等级
							int size = KdBrandCustomeVo.dao ().updateCustomerBrandGrade (sysCustomerId, temp);
							GradeLog gradeLog = ZyGradeLog.dao ().loadGradeLogByGrade (sysCustomerId, memberGrade, temp);
							if (0 < size && null == gradeLog) {
								boolean t = gradeLogService.addGradeLog (UtilDate.now (), sysCustomerId, memberGrade,
										temp,
										MessageFormat.format ("{0} 从等级 [{1}]降级为等级[{2}],成为[{3}]",
												size > 0 ? "成功" : "失败", memberGrade, temp, tempGradeName),
										name, customerBrand.getGroupId (), customerBrand.getBrandId ());
							}
						}

					}
				}
			}

		}
		return flag;

	}

}
