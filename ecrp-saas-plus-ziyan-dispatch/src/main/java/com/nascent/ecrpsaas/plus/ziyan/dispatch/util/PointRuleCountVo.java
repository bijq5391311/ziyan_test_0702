package com.nascent.ecrpsaas.plus.ziyan.dispatch.util;

import java.math.BigDecimal;
import java.text.DecimalFormat;

import com.nascent.ecrpsaas.base.util.UtilString;
import com.nascent.ecrpsaas.model.KdPointRule;

/**
 * 
 * @author jingyu.gao
 *用于计算积分
 */
public class PointRuleCountVo {
	
	public  double  calculatingPoint(KdPointRule kdPointRule,double orderPayment){
		// 记录积变量
		double tempPointcount = 0;
	    double totalPointcount = 0;
	    //获取多少元兑换1积分
	    BigDecimal   pointPrice =  kdPointRule.getPointPrice();
	    //计算送的积分
	    tempPointcount = orderPayment/pointPrice.longValue();
	    //获取积分取整规则,0想上取整,1向下取整,2四舍5入,3保留两位小数默认为0
	    int pointRound = kdPointRule.getPointRound();
		// 取整
		switch (pointRound) {
		// 向上取整
		case 0:
			totalPointcount = Math.ceil(tempPointcount);
			break;
		// 向下取整
		case 1:
			totalPointcount = Math.floor(tempPointcount);
			break;
		// 四舍五入
		case 2:
			totalPointcount = Math.round(tempPointcount);
			break;
		// 最小精度
		case 3:
			DecimalFormat decimalFormat = new DecimalFormat("#.##");
			totalPointcount =UtilString.toLong(decimalFormat.format(tempPointcount));
			break;
		default:
			break;
		}
		return totalPointcount;
		
		
	}

}
