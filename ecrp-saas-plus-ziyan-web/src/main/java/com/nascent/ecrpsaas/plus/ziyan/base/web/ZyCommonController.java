package com.nascent.ecrpsaas.plus.ziyan.base.web;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ResponseBody;

import com.nascent.ecrpsaas.base.vo.organization.SysShopVo;
import com.nascent.ecrpsaas.base.web.BaseController;
import com.nascent.ecrpsaas.plus.vo.ZySysShopVo;
import com.nascent.ecrpsaas.plus.ziyan.vo.ZyAreaVo;
import com.nascent.utils.query.CommonResult;


@Controller
public class ZyCommonController extends BaseController {
	/**
     * 选择店铺集合通过codes
     */
    @ResponseBody
    public CommonResult querySysShopsList(String  codes) {
        return new CommonResult()
                .setResult(ZySysShopVo.dao().queryListByIsShop(codes));
    }
    /**
     * 获取地区
     * Title:ZyCommonController.java
     * name:zhimin.mo
     * return:CommonResult
     * describe:
     * time:2018年2月4日
     */
    @ResponseBody
    public CommonResult findArea(String parentId){
    	 List<ZyAreaVo> area = ZyAreaVo.dao().queryArea(parentId);
    	 return new CommonResult().setResult(area);
    }
}

