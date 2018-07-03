package com.nascent.ecrpsaas.plus.ziyan.care;

import com.alibaba.fastjson.JSONObject;
import com.nascent.ecrpsaas.base.constat.*;
import com.nascent.ecrpsaas.base.service.YanShuService;
import com.nascent.ecrpsaas.base.util.UtilDate;
import com.nascent.ecrpsaas.base.util.UtilShortLink;
import com.nascent.ecrpsaas.base.util.UtilString;
import com.nascent.ecrpsaas.base.vo.organization.SysGroupVo;
import com.nascent.ecrpsaas.base.vo.yanshu.YsResultVo;
import com.nascent.ecrpsaas.care.model.CareAutoNotify;
import com.nascent.ecrpsaas.care.model.CareAutoPattern;
import com.nascent.ecrpsaas.care.model.CareAutoRecord;
import com.nascent.ecrpsaas.care.util.CareAutoUtil;
import com.nascent.ecrpsaas.database.service.KdOperationLogService;
import com.nascent.ecrpsaas.model.KdPointLog;
import com.nascent.ecrpsaas.organization.model.SysGroup;
import com.nascent.ecrpsaas.organization.model.SysShop;
import com.nascent.ecrpsaas.plus.ziyan.care.model.ZyCareAutoNotify;
import com.nascent.ecrpsaas.plus.ziyan.care.model.ZyCareAutoPattern;
import com.nascent.ecrpsaas.plus.ziyan.care.service.ZyRegisterConcernService;
import com.nascent.ecrpsaas.plus.ziyan.care.vo.CareRegisterVo;
import com.nascent.ecrpsaas.plus.ziyan.common.constant.ZyCareType;
import com.nascent.ecrpsaas.plus.ziyan.common.constant.ZyPointActionEnum;
import com.nascent.ecrpsaas.plus.ziyan.util.UtilZiYanCoupon;
import com.nascent.ecrpsaas.vip.model.KdCustomer;
import com.nascent.utils.model.UserSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;

/**
 * com.nascent.ecrpsaas.plus.ziyan.care
 *
 * @Author guiping.Qiu
 * @Date 2017/12/21
 */
@Service
public class ZyRegisterConcernServiceImpl implements ZyRegisterConcernService {

    private static final String CareTime = "CareTime";
    private static final String Integral = "Integral";
    private static final String SMSTemplate = "SMSTemplate";
    private static final String CouponID = "CouponID";
    private static final String CouponAmount = "CouponAmount";
    private static final String Name = "{Name}";
    private static final String CustomerCenterLinkPlaceHolder = "{CustomerCenterLink}";
    private static final String CustomerCenterLink = "http://hd.southinfo.net/shop105676179/wx62/home";

    private static Logger log = LoggerFactory.getLogger(ZyRegisterConcernServiceImpl.class);

    @Autowired
    private KdOperationLogService operationLogService;
    @Autowired
    private YanShuService yanShuService;

    @Override
    public String saveOrUpdateRegisterConcernSms(CareRegisterVo registerVo, UserSession userSession) {
        int groupId = userSession.getTenantId();
        CareAutoPattern careAutoPattern = registerVo.getCare();
        JSONObject jsonObject = new JSONObject();
        jsonObject.put(CareTime, registerVo.getCareTime());
        jsonObject.put(Integral, registerVo.getIntegral());
        jsonObject.put(SMSTemplate, registerVo.getSmsTemplate());
        jsonObject.put(CouponID, registerVo.getCouponID());
        jsonObject.put(CouponAmount, registerVo.getCouponAmount());
        careAutoPattern.setTypeMark(ZyCareType.RegisterConcern.getCode());
        careAutoPattern.setPatternString(jsonObject.toJSONString());
        careAutoPattern.setPatternType(MarketingTemplateConstat.MarketingManner.SMS.getValue());
        //优先级默认普通
        if (careAutoPattern.getOrderNum() <= 0) {
            careAutoPattern.setOrderNum(3);
        }
        careAutoPattern.setDepartmentCode(userSession.getDeptCode());
        String msg = "";
        if (careAutoPattern.getId() > 0) {
            CareAutoPattern oldPattern = CareAutoPattern.dao().loadById(careAutoPattern.getId());
            if (!JSONObject.parseObject(oldPattern.getPatternString())
                    .get(SMSTemplate).equals(registerVo.getSmsTemplate())) {
                careAutoPattern.setGuid(oldPattern.getGuid());
                msg = submitToYanshuPlatform(careAutoPattern);
                if (!UtilString.isBlank(msg)) {
                    log.error(msg);
                }
            }
            careAutoPattern.update();
            //保存操作日志
            operationLogService.addOperationLog(userSession.getUserCode()
                    , JSONObject.toJSONString(oldPattern), JSONObject.toJSONString(careAutoPattern)
                    , groupId, userSession.getDeptCode(), careAutoPattern.getId(), Integer.valueOf(SourceModelConstat.SourceModelEnum.getValue(careAutoPattern.getTypeMark())).intValue());
            msg = SystemConstat.OperationMsg.UPDATE.getName();
        } else {
            careAutoPattern.setIsValid(2);
            careAutoPattern.setSendSuccessCount(0);
            careAutoPattern.setSendTotalCount(0);
            careAutoPattern.setGuid(UUID.randomUUID().toString());
            careAutoPattern.setBeginTime(UtilDate.parseDateTime("0001-01-01 00:00:00"));
            careAutoPattern.setStopTime(UtilDate.parseDateTime("0001-01-01 00:00:00"));
            careAutoPattern.setGroupId(groupId);
            careAutoPattern.setType(0);
            careAutoPattern.setDepartmentName(userSession.getDeptName());
            careAutoPattern.setUserName(userSession.getUserName());
            careAutoPattern.save();
            msg = submitToYanshuPlatform(careAutoPattern);
            if (!UtilString.isBlank(msg)) {
                log.error(msg);
            }
            //保存操作日志
            operationLogService.addOperationLog(userSession.getUserCode(), "", JSONObject.toJSONString(careAutoPattern)
                    , groupId, userSession.getDeptCode(), careAutoPattern.getId()
                    , Integer.valueOf(SourceModelConstat.SourceModelEnum.getValue(careAutoPattern.getTypeMark())).intValue());
            msg = SystemConstat.OperationMsg.SAVE.getName();
        }
        return msg;
    }

    @Override
    public void registerCareServiceSms() {
        //查找出注册短信关怀
        List<CareAutoPattern> careAutoPatternList = ZyCareAutoPattern.dao()
                .queryValidatedAndEnableList(ZyCareType.RegisterConcern.getCode()
                        , MarketingTemplateConstat.MarketingManner.SMS.getValue());
        SysGroup group = SysGroup.dao().queryKdGroupInfo();
        if (careAutoPatternList != null && !careAutoPatternList.isEmpty()) {
            for (CareAutoPattern pattern : careAutoPatternList) {

                //查找出未发送的注册关怀通知
                List<ZyCareAutoNotify> notifyList = ZyCareAutoNotify.dao()
                        .queryCareNotifyList(0, ZyCareType.RegisterConcern.getCode());
                if (notifyList != null && !notifyList.isEmpty()) {
                    log.info("获取到的通知数：" + notifyList.size());
                    //处理关怀过程
                    dealRegSmsCareProcess(pattern, notifyList, group);
                }
            }
        }
    }

    /**
     * 处理短信注册关怀过程
     *
     * @param pattern
     * @param notifyList
     * @param group
     */
    private void dealRegSmsCareProcess(CareAutoPattern pattern, List<ZyCareAutoNotify> notifyList, SysGroup group) {

        for (ZyCareAutoNotify notify : notifyList) {
            String patternString = pattern.getPatternString();
            JSONObject jsonObject = JSONObject.parseObject(patternString);

                //通知时间加上延迟时间小于当前时间则发送关怀
                if (UtilDate.now().after(UtilDate.addMiunte(notify.getNotifyTime()
                        , jsonObject.getInteger(CareTime)))) {
                    //关怀结果
                    CareAutoRecord autoRecord = initCareAutoRecord(pattern, notify);
                    //发送手机号
                    String mobile = notify.getMobile();
                    if (UtilString.isBlank(mobile)) {
                        autoRecord.setContent("发送手机号不能为空");
                        autoRecord.save();
                        //发送失败
                        notify.setMobileStatus(2);
                        notify.update();
                        continue;
                    }
                    //替换短信模板占位符
                    String sendContent = replaceSmsTemplate(jsonObject
                            , pattern.getSmsSignature(), notify);
                    SysShop sysShop = SysShop.dao().loadByCode(notify.getShopCode());
                    if (sysShop == null) {
                        autoRecord.setContent("店铺为空");
                        autoRecord.save();
                        //发送失败
                        notify.setMobileStatus(2);
                        notify.update();
                        continue;
                    }
                    if (!CareAutoUtil.todayCanSendMessage(mobile)) {
                        autoRecord.setContent("此号码，今天短信已超过发送次数，抛弃");
                        autoRecord.save();
                        //发送失败
                        notify.setMobileStatus(2);
                        notify.update();
                        continue;
                    } else if (CareAutoUtil.hasTouchBlackExist(notify.getSysCustomerId(), mobile
                            , TouchType.SMS.getValue().intValue(), sysShop.getBrandId())) {
                        autoRecord.setContent("该客户是短信黑名单客户，抛弃");
                        autoRecord.save();
                        //发送失败
                        notify.setMobileStatus(2);
                        notify.update();
                        continue;
                    }
                    try {
                        //生成会员优惠券
                        generateCustomerCoupon(pattern, jsonObject, notify);
                    } catch (Exception e) {
                        e.printStackTrace();
                        autoRecord.setContent(UtilString.substring(e.getMessage(), 0, 2000));
                        autoRecord.save();
                        //发送失败
                        notify.setMobileStatus(2);
                        notify.update();
                        log.error(e.getMessage(), e);
                        continue;
                    }
                    //送积分
                    savePointLog(jsonObject.getBigDecimal(Integral), notify.getShopCode()
                            , sysShop.getBrandId(), notify.getSysCustomerId());
                    boolean sendStatus = false;
                    //发送短信
                    YsResultVo resultVo = sendSmsToYanShu(mobile, sendContent, pattern, group.getname());
                    if (resultVo != null) {
                        if (UtilString.toBoolean(resultVo.getIsOK())) {
                            sendStatus = true;
                            autoRecord.setContent(UtilString.substring(sendContent, 0, 2000));
                            //发送成功
                            autoRecord.setStatus(1);
                            autoRecord.setSendTime(new Date());
                            notify.setMobileStatus(1);
                        } else if (resultVo.getMessage() != null) {
                            log.error(resultVo.getMessage());
                            autoRecord.setContent(UtilString.substring("雁书发送结果：" + resultVo.getMessage(), 0, 2000));
                            //发送失败
                            autoRecord.setStatus(2);
                            notify.setMobileStatus(2);
                        }
                        autoRecord.save();
                        // 保存短信发送日志
                        CareAutoUtil.saveSmsSendLog(mobile, 0, notify.getSysCustomerId(),
                                notify.getOutNick(), UtilString.substring(sendContent, 0, 500), pattern.getId(),
                                UtilString.toInt(SourceModelConstat.SourceModelEnum.UNKOWN.getValue()), sendStatus ? 1 : 0,
                                resultVo.getMessage(), 0, pattern.getUserName(), pattern.getGroupId(), pattern.getSpId(),
                                pattern.getDepartmentCode(), 1, "", UUID.randomUUID().toString());

                    } else {
                        log.error("雁书返回结果为空");
                        autoRecord.setContent("雁书返回结果为空");
                        //发送失败
                        autoRecord.setStatus(2);
                        autoRecord.save();
                        notify.setMobileStatus(2);
                    }
                    notify.update();
                } else {
                    log.info("未到通知时间");
                }
        }
    }

    /**
     * 生成未发放的会员优惠券
     *
     * @param pattern
     * @param jsonObject
     * @param notify
     * @throws Exception
     */
    private void generateCustomerCoupon(CareAutoPattern pattern, JSONObject jsonObject, CareAutoNotify notify) throws Exception {
        Long sysCustomerID = notify.getSysCustomerId();
        //判断会员是否存在
        if (KdCustomer.dao().queryBySysCustomerId(sysCustomerID) != null) {
            int couponAmount = jsonObject.getIntValue(CouponAmount);
            Long couponId = jsonObject.getLong(CouponID);
            if (couponAmount > 0 && couponId != null) {
                for (int i = 0; i < couponAmount; ) {
                    //默认未发放
                    Map<String, Object> resultMap = UtilZiYanCoupon.createCouponCode(sysCustomerID, couponId, 1);
                    if ((boolean) resultMap.get(UtilZiYanCoupon.getIsOk())) {
                        i++;
                    } else {
                        throw new Exception((String) resultMap.get(UtilZiYanCoupon.getDESCRIPTION()));
                    }
                }

            } else {
                log.error("注册关怀规则数据保存错误,规则ID：" + pattern.getId());
            }
        } else {
            log.error("会员数据不存在，会员ID：" + sysCustomerID);
        }
    }

    /**
     * 发送短信
     *
     * @param receiverMobile
     * @param sendContent
     * @param pattern
     * @param shopName
     * @return
     */
    protected YsResultVo sendSmsToYanShu(String receiverMobile, String sendContent, CareAutoPattern pattern, String shopName) {
        // 雁书发送短信
        YsResultVo result = null;
        try {
            result = yanShuService.sendEcrpSms(shopName, sendContent, receiverMobile,
                    SourceModelConstat.SourceModelEnum.UNKOWN.getValue(), pattern.getSpId());
            // 失败重复发送
            if (!UtilString.toBoolean(result.getIsOK())) {
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    log.error(Thread.currentThread().getName() + "休眠失败！");
                }
                // 发送短信
                result = yanShuService.sendEcrpSms(shopName, sendContent, receiverMobile,
                        SourceModelConstat.SourceModelEnum.UNKOWN.getValue(), pattern.getSpId());
            }
        } catch (Exception e) {
            e.printStackTrace();
            log.error("调用雁书发送关怀短信出错,错误信息：", e);
        }

        return result;
    }


    /**
     * 替换模板占位符
     *
     * @param jsonPattern
     * @param smsSignature
     * @param notify
     * @return
     */
    private String replaceSmsTemplate(JSONObject jsonPattern, String smsSignature, CareAutoNotify notify) {
        String sendContent = jsonPattern.getString(SMSTemplate);
        String jsonValues = notify.getValues();
        if (UtilString.isNotEmpty(jsonValues)) {
            JSONObject json = JSONObject.parseObject(jsonValues);
            Set<String> properties = json.keySet();
            if (properties != null) {
                Iterator<String> iter = properties.iterator();
                while (iter.hasNext()) {
                    String name = iter.next();
                    String value = json.getString(name);
                    sendContent = sendContent.replace(name, value);
                }
            }
        }

        // 判断短信内容是否为空
        if (UtilString.isNotEmpty(sendContent)) {
            // 是否允许签名
            YsResultVo ysResultVo;
            boolean allowSignatrue = false;
            try {
                ysResultVo = yanShuService.getIsShopSignName();
                allowSignatrue = UtilString.toBoolean(ysResultVo.getValue());
            } catch (Exception e) {
                e.printStackTrace();
                log.error("调用雁书接口获取签名出错", e);
            }
            if (allowSignatrue) {
                if (UtilString.isNotEmpty(smsSignature)) {
                    // 添加签名
                    sendContent = sendContent + smsSignature;
                }
            }
        }
        return sendContent;
    }


    /**
     * 提交到雁书进行短信内容审核
     *
     * @param pattern
     */
    private String submitToYanshuPlatform(CareAutoPattern pattern) {
        YsResultVo ysResult = null;
        String msg = "";
        if (pattern != null) {
            JSONObject jsObject = JSONObject.parseObject(pattern.getPatternString());
            String strContent = "";
            if (jsObject.getDouble(CareTime) > 0) {
                strContent = "发送时间:延时" + jsObject.getDouble(CareTime) + "小时,内容:" + jsObject.get(SMSTemplate);
            } else {
                strContent = "发送时间:即时,内容:" + jsObject.get(SMSTemplate);
            }
            SysGroupVo groupVo = SysGroupVo.dao().queryGroupById(pattern.getGroupId());
            try {
                ysResult = yanShuService.submitSmsTemplateForCheck(groupVo.getName(), pattern.getTopic()
                        , pattern.getId(), pattern.getTypeMark(), strContent, pattern.getGuid(), pattern.getSpId());
            } catch (Exception e) {
                e.printStackTrace();
                log.error("关怀提交雁书平台失败，错误信息：", e);
                msg = e.getMessage();
            }
            if (ysResult != null && UtilString.toBoolean(ysResult.getIsOK())) {
                //已提交
                pattern.setIsValid(3);
                pattern.update();
            } else {
                if (ysResult != null) {
                    msg = ysResult.getMessage();
                } else {
                    msg = "雁书返回结果为空";
                }
            }
        }
        return msg;
    }

    @Override
    public void generateRegisterCareNotify(String mobile, String CustomerName
            , long sysCustomerId, String shopCode, String outNick, int groupId) {

        CareAutoNotify notify = new CareAutoNotify();
        notify.setGradeRuleDetailId(0);
        notify.setMark(ZyCareType.RegisterConcern.getCode());
        notify.setSysCustomerId(sysCustomerId);
        notify.setOutNick(outNick);
        notify.setNotifyStatus("");
        notify.setMobile(mobile);
        notify.setMobileStatus(0);
        notify.setEmailStatus(0);
        notify.setWxStatus(0);
        Date now = UtilDate.now();
        notify.setNotifyTime(now);
        notify.setUrgeId(0);
        notify.setShopCode(shopCode);
        notify.setGroupId(groupId);

        JSONObject jsonObject = new JSONObject();
        jsonObject.put(Name, CustomerName);
        //会员中心链接
        jsonObject.put(CustomerCenterLinkPlaceHolder, UtilShortLink.createShortLink(CustomerCenterLink));
        notify.setValues(jsonObject.toJSONString());
        notify.save();
    }

    /**
     * 初始化关怀结果
     *
     * @param pattern
     * @param notify
     * @return
     */
    private CareAutoRecord initCareAutoRecord(CareAutoPattern pattern, CareAutoNotify notify) {
        CareAutoRecord record = new CareAutoRecord();
        record.setShopCode(notify.getShopCode());
        record.setMark(notify.getMark());
        record.setSysCustomerId(notify.getSysCustomerId());
        record.setOutNick(notify.getOutNick());
        record.setSysTradeId(0);
        record.setOutTradeId("");
        record.setSendTime(new Date());
        record.setNotifyId(notify.getId());
        record.setPatternId(pattern.getId());
        record.setStatus(0);
        record.setGroupId(notify.getGroupId());
        return record;
    }


    /**
     * 保存积分日志：送积分
     *
     * @param integral
     * @param shopCode
     * @param brandId
     * @param sysCustomerId
     */
    private void savePointLog(BigDecimal integral, String shopCode, int brandId, long sysCustomerId) {
        KdPointLog kdPointLog = new KdPointLog();
        kdPointLog.setBrandId(brandId);
        kdPointLog.setaction(ZyPointActionEnum.REGISTER_POINT.getValue());
        kdPointLog.setShopCode(shopCode);
        //未知 ： 注册关怀活动类型：82
        kdPointLog.setActivityType(82);
        kdPointLog.setSysCustomerId(sysCustomerId);
        kdPointLog.setoperation(PointOperatorEnum.ADD.getValue());
        kdPointLog.setpoint(integral);
        kdPointLog.setTargetId(0);
        kdPointLog.setPointFromName(ZyPointActionEnum.REGISTER_POINT.getName());
        kdPointLog.setPointActivityId(0);
        kdPointLog.setremark(ZyPointActionEnum.REGISTER_POINT.getName());
        //未同步
        kdPointLog.setSynStatus(0);
        kdPointLog.setOutId(0);
        kdPointLog.setPointCreateTime(new Date());
        kdPointLog.save();
    }


}
