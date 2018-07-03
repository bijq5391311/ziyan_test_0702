package coupon;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;

import com.nascent.ecrpsaas.plus.ziyan.marketing.model.SysCoupon;
import com.nascent.ecrpsaas.plus.ziyan.util.UtilZiYanCoupon;

public class TestSaveCouponCode {

	@Test
	public void saveCoupon() {
		List<String> customerList = new ArrayList<String>();
		customerList.add("3");
		customerList.add("4");
		customerList.add("5");
		customerList.add("6");
		customerList.add("7");
		customerList.add("8");
		customerList.add("9");
		customerList.add("10");
		Long couponId = 1514106036711L;
		SysCoupon coupon = UtilZiYanCoupon.validateCoupon(couponId);
		if(null == coupon){
			System.out.println("优惠券不存在");
			return;
		}
		boolean state = UtilZiYanCoupon.createCouponCodeList(customerList,coupon);
		if(true == state){
			System.out.println("生成成功");
		}else{
			System.out.println("生成失败");
		}
		return;
	}

}
