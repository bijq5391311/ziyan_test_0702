package com.nascent.ecrpsaas.plus.ziyan.dispatch.service;

import java.util.List;

import com.nascent.ecrpsaas.plus.ziyan.dispatch.vo.GradeRuleDetailVo;
import com.nascent.ecrpsaas.plus.ziyan.dispatch.vo.KdBrandCustomeVo;
import com.nascent.utils.query.CommonResult;

/**
 * 描述： 会员升级定级规则校验<br>
 * 类名：RankCheckService<br>
 * 创建人：高景玉<br>
 * 创建时间：2017年8月15日 上午11:41:25<br>
 * 修改人：<br>
 * 修改时间：<br>
 * 修改描述：<br>
 */
public interface RankCheckService {
	//通过校验规则进行会员升级，定级操作
	/**
	 * @param sysCustomerId  //系统客户id
	 * @param isIncludeBlack //是否包含黑名单
	 * @param ruleDetail  //规则详情ss
	 * @param startTime  //交易开始时间            
	 * @param customerConsumerdate   // 客户消费统计的开始时间 
	 * @param customerBrands  //满足条件的会员
	 * @return
	 */
    public  CommonResult checkUpgrade(KdBrandCustomeVo customerBrand,Integer isIncludeBlack, List<GradeRuleDetailVo> ruleDetails) ;


}
