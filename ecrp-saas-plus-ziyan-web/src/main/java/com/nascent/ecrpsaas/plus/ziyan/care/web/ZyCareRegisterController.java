package com.nascent.ecrpsaas.plus.ziyan.care.web;

import com.alibaba.fastjson.JSONObject;
import com.nascent.ecrpsaas.base.constat.SystemConstat;
import com.nascent.ecrpsaas.base.vo.touch.SmsSignaturesVo;
import com.nascent.ecrpsaas.base.vo.touch.YsConfigInfoVo;
import com.nascent.ecrpsaas.care.model.CareAutoPattern;
import com.nascent.ecrpsaas.care.web.CareAutoController;
import com.nascent.ecrpsaas.plus.ziyan.care.service.ZyRegisterConcernService;
import com.nascent.ecrpsaas.plus.ziyan.care.vo.CareRegisterVo;
import com.nascent.ecrpsaas.plus.ziyan.common.constant.ZyCareType;
import com.nascent.ecrpsaas.plus.ziyan.marketing.model.SysCoupon;
import com.nascent.utils.model.Authorize;
import com.nascent.utils.query.CommonResult;
import com.nascent.utils.query.TableRequest;
import com.nascent.utils.query.TableResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * com.nascent.ecrpsaas.plus.ziyan.care
 *
 * @Author guiping.Qiu
 * @Date 2017/12/20
 */
@Authorize
@Controller
public class ZyCareRegisterController extends CareAutoController{

    @Autowired
    private ZyRegisterConcernService registerConcernService;

    /**
     * 注册关怀功能页
     */
    @Authorize(order = 0)
    public  void careRegisterList(){

    }


    /**
     * 查询注册关怀列表
     * @param request
     * @return
     */
    @Authorize(order = 1)
    @ResponseBody
    public TableResponse<CareAutoPattern> getRegisterConcernList(TableRequest request) {
        return queryCareAutoPattern(ZyCareType.RegisterConcern.getCode(), request);
    }


    @Authorize(order = 3)
    @ResponseBody
    public  CommonResult saveOrUpdateRegCare(CareRegisterVo careRegisterVo){
        CommonResult result = new CommonResult();
        result.setMsg(registerConcernService
                .saveOrUpdateRegisterConcernSms(careRegisterVo,getCurrentUser()));
        return result;
    }

    /**
     * 获取下拉数据
     * @return
     */
    @Authorize(order = 1)
    @ResponseBody
    public CommonResult getDropdownData(){
        CommonResult result = new CommonResult();
        JSONObject jsonObject =  new JSONObject();
        jsonObject.put("smsSpList", YsConfigInfoVo.dao()
                .getOptions(SystemConstat.YanShuType.SMS.getValue(), getCurrentUser().getDeptCode()));
        jsonObject.put("signatureList", SmsSignaturesVo.getOptions());
        jsonObject.put("couponList", SysCoupon.dao().queryAvailableCouponList());
        return result.setResult(jsonObject);
    }
}
