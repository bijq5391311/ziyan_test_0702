package com.nascent.ecrpsaas.plus.ziyan.dispatch.serviceimpl;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.nascent.ecrpsaas.plus.ziyan.dispatch.service.RankCheckService;
import com.nascent.ecrpsaas.plus.ziyan.dispatch.vo.GradeRuleDetailVo;
import com.nascent.ecrpsaas.plus.ziyan.dispatch.vo.GradeUpdetailVo;
import com.nascent.ecrpsaas.plus.ziyan.dispatch.vo.KdBrandCustomeVo;
import com.nascent.utils.query.CommonResult;

/**
 * 描述： 会员Vip升级服务<br>
 * 类名：RankCheckServiceImpl<br>
 * 创建人：高景玉<br>
 * 创建时间：2017年8月23日 上午9:00:25<br>
 * 修改人：<br>
 * 修改时间：<br>
 * 修改描述：<br>
 */
@Service("zyrankCheckService")
public class RankCheckServiceImpl implements RankCheckService {
	// 日志记录
	Logger logger = LoggerFactory.getLogger(RankCheckServiceImpl.class);

	@Override
	public CommonResult checkUpgrade(KdBrandCustomeVo customerBrand, Integer isIncludeBlack,
			List<GradeRuleDetailVo> ruleDetails) {
		// 根据设置,找到符合的升级等级进行判断
		CommonResult commonResult = new CommonResult(true);
		// 如果开启总的黑名单过滤 则黑名单用户不进行升级
		if (isIncludeBlack == 1) {
			if (customerBrand.getIsRightBlack() == 1) {
				// 是黑名单用户
				logger.info("客户:" + customerBrand.getSysCustomerId() + "黑名单客户不进行升级操作");
				return commonResult.setFailed();
			}
		}
		// 客户当前等级
		int memberGrade = customerBrand.getMemberGrade();
		// 获取会员消费值
		int consumeTotal = customerBrand.getConsumeTotal();
		// 下个等级
		int nextGrade = 0;
		// 下个等级中文名称
		String nextGradeName = null;
		int temp = 1;
		String tempGradeName = null;
		// 判断是否升级
		boolean isUp = false;
		for (int i = 0; i < ruleDetails.size(); i++) {
			// 下个等级
			nextGrade = ruleDetails.get(i).getGrade();
			if (nextGrade>memberGrade) {
				// 下个等级中文名称
				nextGradeName = ruleDetails.get(i).getGradeName();
				if (consumeTotal >= 0 && consumeTotal <= ruleDetails.get(0).getZyConsume() && temp == 1) {
					isUp = true;
					// 下个等级
					temp = ruleDetails.get(0).getGrade();
					// 下个等级中文名称
					tempGradeName = ruleDetails.get(0).getGradeName();
					continue;
				} else if (consumeTotal >= ruleDetails.get(0).getZyConsume()
						&& consumeTotal <= ruleDetails.get(1).getZyConsume()) {
					isUp = true;
					// 下个等级等级信息
					temp = ruleDetails.get(0).getGrade();
					tempGradeName = ruleDetails.get(0).getGradeName();
					continue;
				} else if (consumeTotal >= ruleDetails.get(i).getZyConsume()) {
					if (i  < ruleDetails.size()- 1 ) {
						if (null != ruleDetails.get(i + 1) && nextGrade > memberGrade
								&& consumeTotal <= ruleDetails.get(i + 1).getZyConsume()) {
							isUp = true;
							// 下个等级等级信息
							temp = ruleDetails.get(i).getGrade();
							tempGradeName = ruleDetails.get(i).getGradeName();
							continue;
						}
					}else if(i  == ruleDetails.size()- 1){
						if (null != ruleDetails.get(i) && nextGrade > memberGrade
								&& consumeTotal >= ruleDetails.get(i).getZyConsume()) {
							isUp = true;
							// 下个等级等级信息
							temp = ruleDetails.get(i).getGrade();
							tempGradeName = ruleDetails.get(i).getGradeName();
							continue;
						}
					}
				}
			} else {
				continue;
			}

		}
		if (isUp) {
			if (temp != memberGrade && temp > memberGrade) {
				GradeUpdetailVo data = new GradeUpdetailVo();
				data.setBrandId(customerBrand.getBrandId());
				data.setGroupId(customerBrand.getGroupId());
				data.setMemberGrade(memberGrade);
				data.setNextGrade(temp);
				data.setNextGradeName(nextGradeName);
				commonResult.setResult(data);
				return commonResult;
			}
		}

		return commonResult.setFailed();
	}
}
