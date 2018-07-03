package com.nascent.ecrpsaas.plus.ziyan.common.web;

import com.alibaba.fastjson.JSONObject;
import com.nascent.ecrpsaas.plus.ziyan.marketing.model.SysCoupon;
import com.nascent.ecrpsaas.plus.ziyan.organization.model.ZyPlatfrom;
import com.nascent.utils.query.CommonResult;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * @author SHI ZH
 */
@Controller
@RequestMapping("/common/dropdown/")
public class DropDownController {

    /**
     * 店铺下拉列表
     */
    @ResponseBody
    @RequestMapping("/querySysCouponList")
    public CommonResult querySysCouponList() {

        List<SysCoupon> sysCoupons = SysCoupon.dao().findAvailableAndValidCouponList();
        List<JSONObject> list = new ArrayList<JSONObject>();
        for (SysCoupon shopVo : sysCoupons) {
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("k", shopVo.getCouponName());
            jsonObject.put("v", shopVo.getCouponId());
            list.add(jsonObject);
        }
        return new CommonResult().setResult(list);
    }
    /**
	 * 获取品牌列表.
	 */
	@ResponseBody
	public CommonResult queryBrandList() {
		return new CommonResult().setResult(ZyPlatfrom.dao().getPlatfromOptions());
	}
}
