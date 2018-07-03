package com.nascent.ecrpsaas.plus.ziyan.vip;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.nascent.api.ApiException;
import com.nascent.api.domain.BrandShop;
import com.nascent.api.domain.Customer;
import com.nascent.api.domain.IntegralUpdateResponse;
import com.nascent.api.request.SaveCustomerRequest;
import com.nascent.api.response.SaveCustomerResponse;
import com.nascent.ecrpsaas.base.constat.SystemConstat;
import com.nascent.ecrpsaas.base.model.KdServiceShopPro;
import com.nascent.ecrpsaas.base.util.UtilCollection;
import com.nascent.ecrpsaas.base.util.UtilDate;
import com.nascent.ecrpsaas.base.util.UtilMemberAdopt;
import com.nascent.ecrpsaas.base.util.UtilString;
import com.nascent.ecrpsaas.base.util.taobao.UtilTBApi;
import com.nascent.ecrpsaas.base.vo.organization.KdBrandAuthorizeVo;
import com.nascent.ecrpsaas.base.vo.organization.SysShopVo;
import com.nascent.ecrpsaas.organization.model.OutShop;
import com.nascent.ecrpsaas.plus.ziyan.care.service.ZyRegisterConcernService;
import com.nascent.ecrpsaas.plus.ziyan.common.constant.ZyServiceType;
import com.nascent.ecrpsaas.plus.ziyan.util.ZyHdUtil;
import com.nascent.ecrpsaas.plus.ziyan.vip.service.ZyHuDongCustomerService;
import com.nascent.ecrpsaas.vip.model.*;
import com.nascent.ecrpsaas.vip.service.CustomerShopRfmService;
import com.nascent.ecrpsaas.vip.service.vo.CustomerTempVo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author Qiuguiping
 */
@Service
public class ZyHuDongCustomerServiceImpl implements ZyHuDongCustomerService {

    @Autowired
    private CustomerShopRfmService customerShopRfmService;

    @Autowired
    private ZyRegisterConcernService zyRegisterConcernService;

    private static final Logger log = LoggerFactory.getLogger(ZyHuDongCustomerServiceImpl.class);

    private static final String TRUE = "true";
    private static final Map<Integer, String> SHOP_WX_APPKEY_MAP = new HashMap<Integer, String>();
    private static final Map<String, String> HD_SHOP_CODE = new HashMap<>();

    @Override
    public void customerDownloadWork() {
        List<KdBrandAuthorizeVo> brandAuthorizeVos = KdBrandAuthorizeVo.dao()
                .queryBrandAuthorizeList();
        if (brandAuthorizeVos == null || brandAuthorizeVos.isEmpty()) {
            return;
        }
        for (KdBrandAuthorizeVo brandAuthorizeVo : brandAuthorizeVos) {
            // 判断是否有授权信息
            if (UtilString.isBlank(brandAuthorizeVo.getAppKey())
                    || UtilString.isBlank(brandAuthorizeVo.getAccessToken())
                    || UtilString.isBlank(brandAuthorizeVo.getAppSecret())) {
                continue;
            }
            List<SysShopVo> shopList = UtilCollection.createArrayList();
            Map<String, String> hdShopMap = ZyHdUtil.getHdShop();
            for (String key : hdShopMap.keySet()) {
                String outCode = key;
                // 根据code获取外部店铺
                OutShop outShop = OutShop.dao().queryOutShopByParams(outCode, null);
                SysShopVo shop = null;
                if (outShop == null) {
                    // 获取配置文件信息
                    String province = ZyHdUtil.PROVINCE;
                    String city = ZyHdUtil.CITY;
                    String district = ZyHdUtil.DISTRICT;
                    outShop = new OutShop();
                    outShop.setprovince(province);
                    outShop.setcity(city);
                    outShop.setdistrict(district);
                    outShop.setGroupId(brandAuthorizeVo.getGroupId());
                    outShop.setOutName(hdShopMap.get(key));
                    outShop.setOutCode(outCode);
                    outShop.save();
                } else if (outShop.getIsRelated() == 1) {
                    // 获取已关联店铺
                    shop = SysShopVo.dao().queryShopByOutSid(outShop.getid());

                }
                // 店铺未关联
                if (shop != null) {
                    shopList.add(shop);
                    HD_SHOP_CODE.put(key, shop.getShopCode());
                }
            }
            if (shopList.isEmpty()) {
                log.error("没有配置互动店铺");
                continue;
            }
            // 获取服务进度
            KdServiceShopPro serviceShopPro = KdServiceShopPro.dao().getServiceProgress(
                    brandAuthorizeVo.getBrandId(),
                    0, ZyServiceType.ZY_HUDONG_CUSTOMER_DOWNLOAD.getName(), "",
                    ZyServiceType.ZY_HUDONG_CUSTOMER_DOWNLOAD.getValue());
            Date start = serviceShopPro.getLastScanTime();
            Date end = UtilDate.addSecond(UtilDate.now(), -10);
            // 判断开始时间大于结束时间直接返回
            if (start.compareTo(end) > 0) {
                return;
            }
            int timeRangeLoadData = 0;
            try {
                do {
                    Date endTemp = UtilDate.addHour(start, 1);
                    if (endTemp.compareTo(end) > 0) {
                        endTemp = end;
                    }

                    log.info("下载开放平台会员开始时间：" + UtilDate.formatDateTime(start));
                    timeRangeLoadData += download(UtilDate.formatDateTime(start), UtilDate.formatDateTime(endTemp),
                            brandAuthorizeVo);
                    log.info("下载开放平台会员结束时间：" + UtilDate.formatDateTime(endTemp));
                    endTemp = UtilDate.addSecond(endTemp, 1);
                    serviceShopPro.setLastScanTime(endTemp);
                    start = endTemp;
                } while (start.compareTo(end) < 0);
                //时间段获取的数据大于0，更新时间
                if (timeRangeLoadData > 0) {
                    serviceShopPro.update();
                }
            } catch (Exception e) {
                log.error("开放平台品牌：" + brandAuthorizeVo.getOutName() + "会员信息下载失败", e);
                try {
                    Thread.sleep(100);
                } catch (InterruptedException e1) {
                    e1.printStackTrace();
                }
            }


        }
    }

    @Override
    public void customerSynWork() {

        int limit = 200;
        // 获取未同步的客户信息
        List<KdCustomerSyn> customerSyns = KdCustomerSyn.dao().queryList(ZyHdUtil.NO_SYN, limit);
        if (customerSyns != null && !customerSyns.isEmpty()) {
            for (KdCustomerSyn customerSyn : customerSyns) {
                syn(customerSyn);
            }
        } else {
            log.info("未同步会员为：0");
        }

    }

    /**
     * 根据时间从开发平台下载会员信息
     *
     * @param startTime
     * @param endTime
     */
    private int download(String startTime, String endTime, KdBrandAuthorizeVo brandAuthorizeVo)
            throws Exception {
        //当前时间范围内下载数
        int timeRangeLoadData = 0;
        int pageNo = 1;
        int pageSize = 200;
        int count;
        do {
            count = 0;
            // 获取时间范围内有信息变动的会员
            List<Customer> cusList = UtilTBApi.getCustomerList(startTime, endTime, pageNo, pageSize,
                    brandAuthorizeVo.getAccessToken(), brandAuthorizeVo.getAppKey(),
                    brandAuthorizeVo.getAppSecret());
            if (null != cusList && cusList.size() > 0) {
                count = cusList.size();
                saveOutCustomerInfo(cusList, brandAuthorizeVo);
            }
            timeRangeLoadData += count;
            pageNo++;
            // 上次扫描最大ID
        } while (count == pageSize);
        return timeRangeLoadData;
    }


    /**
     * 保存到外部会员表
     *
     * @param cusList
     * @param brandAuthorizeVo
     * @throws Exception
     */
    @Transactional(rollbackFor = Exception.class)
    public void saveOutCustomerInfo(List<Customer> cusList, KdBrandAuthorizeVo brandAuthorizeVo) throws Exception {
        List<OutCustomerInfo> saveCustomerList = UtilCollection.createArrayList();
        List<OutCustomerInfo> updateCustomerList = UtilCollection.createArrayList();
        for (Customer customer : cusList) {
            log.info("开放平台会员ID:" + customer.getCustomerID() + "，会员姓名：" + customer.getUserName());
            String shopCode = HD_SHOP_CODE.get(customer.getFirstSource());
            if (shopCode == null) {
                log.info("没有找到对应的互动店铺");
                continue;
            }
            // 保存会员
            long outCustomerId = Long.valueOf(customer.getCustomerID());
            OutCustomerInfo outCustomerInfo = OutCustomerInfo.dao().queryByOutCustomerId(
                    outCustomerId);
            boolean isSave = true;
            if (outCustomerInfo != null) {
                isSave = false;
            } else {
                outCustomerInfo = new OutCustomerInfo();
            }
            outCustomerInfo.setaddress(customer.getAddress());
            outCustomerInfo.setbirthday(UtilDate.parseDate(customer.getBirthday()));
            outCustomerInfo.setcity(customer.getCity());
            outCustomerInfo.setprovince(customer.getProvince());
            outCustomerInfo.setdistrict(customer.getArea());
            outCustomerInfo.setcountry("中国");
            outCustomerInfo.setCustomerName(customer.getUserName());
            outCustomerInfo.setemail(customer.getEmail());
            outCustomerInfo
                    .setDevelopTime(UtilDate.parseDateTime(customer.getCreateTime()));
            outCustomerInfo.setMemberCard(customer.getLifeCard());
            outCustomerInfo.setqq(customer.getQq());
            outCustomerInfo.setsex(customer.getSex() != null ? customer.getSex() : -1);
            outCustomerInfo.setGroupId(brandAuthorizeVo.getGroupId());
            outCustomerInfo.settelphone("");
            outCustomerInfo.setAppKey(customer.getFirstSource());
            outCustomerInfo.setKdOpenId(customer.getWeChatID());
            outCustomerInfo.setWxNick(customer.getWeChat());
            outCustomerInfo.setBrandId(brandAuthorizeVo.getBrandId());
            outCustomerInfo.setShopCode(shopCode);
            outCustomerInfo.setOutNick(customer.getRealNick());
            outCustomerInfo.setidcard("");
            outCustomerInfo.setOpenId(customer.getShopWeChatID());
            outCustomerInfo.setOutCustomerId(outCustomerId);
            int platFromType = UtilString.toInt(customer.getSourceType());
            outCustomerInfo.setPlatFromType(platFromType);
            String mobile = "";
            boolean getMobileSuccess = true;
            try {
                // 根据会员ID获取手机号
                mobile = UtilTBApi.getMobileByCustomerID(UtilString.toString(outCustomerId),
                        brandAuthorizeVo.getAccessToken(), brandAuthorizeVo.getAppKey(),
                        brandAuthorizeVo.getAppSecret());
            } catch (ApiException e) {
                if (!"565".equals(e.getErrCode())) {
                    getMobileSuccess = false;
                } else {
                    log.error(e.getErrMsg());
                }
            }
            //获取失败重试
            if (!getMobileSuccess) {
                int retryTimes = 3;
                // 重试3次
                for (int i = 0; i < retryTimes; i++) {
                    try {
                        Thread.sleep(200);
                    } catch (InterruptedException interrup) {
                        interrup.printStackTrace();
                    }
                    try {
                        mobile = UtilTBApi
                                .getMobileByCustomerID(UtilString.toString(outCustomerId),
                                        brandAuthorizeVo.getAccessToken(),
                                        brandAuthorizeVo.getAppKey(),
                                        brandAuthorizeVo.getAppSecret());
                        break;
                    } catch (ApiException e) {
                        if (!"565".equals(e.getErrCode()) && i == retryTimes) {
                            throw new ApiException(e.getMessage());
                        } else {
                            log.error(e.getErrMsg());
                        }
                    }
                }
            }
            log.info("开放平台会员ID:" + customer.getCustomerID() + "，会员手机号：" + mobile);
            // 判断是否绑定的会员
            if (UtilString.isBlank(mobile)) {
                outCustomerInfo.setIsActivate(ZyHdUtil.NO_ACTIVATED);
            } else {
                outCustomerInfo.setIsActivate(ZyHdUtil.ACTIVATED);
            }
            if (isSave) {
                outCustomerInfo.setSysCustomerId(UtilString.toLong(customer.getEcrpID()));
                outCustomerInfo.setSynStatus(ZyHdUtil.NO_SYN);
                outCustomerInfo.setmobile(mobile);
                outCustomerInfo.setCreateTime(UtilDate.now());
                outCustomerInfo.setUpdateTime(UtilDate.now());
                saveCustomerList.add(outCustomerInfo);
            } else {
                outCustomerInfo.setmobile(mobile);
                boolean changeBinding = !UtilString.isBlank(outCustomerInfo.getmobile())
                        && !outCustomerInfo.getmobile().equals(mobile) && !UtilString
                        .isBlank(mobile);
                if (changeBinding) {
                    //  绑定信息有变化
                    outCustomerInfo.setSynStatus(ZyHdUtil.MOBILE_UPDATE);
                } else {
                    // 已同步，信息有变化
                    outCustomerInfo.setSynStatus(ZyHdUtil.SYN_UPDATE);
                }
                outCustomerInfo.setUpdateTime(UtilDate.now());
                updateCustomerList.add(outCustomerInfo);
            }
        }
        if(saveCustomerList.size() > 0) {
            for(OutCustomerInfo outCustomerInfo : saveCustomerList){
                outCustomerInfo.save();
            }
        }
        if(updateCustomerList.size() > 0){
            for(OutCustomerInfo outCustomerInfo : updateCustomerList){
                outCustomerInfo.update();
            }
        }

    }

    /**
     * 将本地会员信息同步至开放平台
     *
     * @param customerSyn
     */
    private void syn(KdCustomerSyn customerSyn) {
        // 查询需要推送的会员信息
        CustomerTempVo customerTempVo = CustomerTempVo.dao().queryCustomerTempVo(
                customerSyn.getSysCustomerId());
        if (customerTempVo == null) {
            return;
        }
        // 获取品牌授权信息
        KdBrandAuthorizeVo brandAuthorizeVo = KdBrandAuthorizeVo.dao().queryByBrandId(
                customerTempVo.getBrandId());
        if (brandAuthorizeVo != null) {
            String session = brandAuthorizeVo.getAccessToken();
            String appkey = brandAuthorizeVo.getAppKey();
            String secret = brandAuthorizeVo.getAppSecret();

            if (UtilString.isEmpty(session) || UtilString.isEmpty(appkey) || UtilString
                    .isEmpty(secret)) {
                return;
            }
            log.info("开始上传ecrp会员：" + customerSyn.getSysCustomerId());
            customerTempVo.setOutCustomerId(customerSyn.getOutCustomerId());
            customerTempVo = toSynCustomer(customerTempVo, session, appkey, secret);
            // 首次调用失败
            if (customerTempVo.getSynStatus() != ZyHdUtil.SYN) {
                int retryTimes = 3;
                // 重试3次
                for (int i = 0; i < retryTimes; i++) {
                    try {
                        Thread.sleep(1000);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                    customerTempVo = toSynCustomer(customerTempVo, session, appkey, secret);
                    // 重试成功
                    if (customerTempVo.getSynStatus() == ZyHdUtil.SYN) {
                        customerSyn.setSynStatus(ZyHdUtil.SYN);
                        customerSyn.setOpenPlatId(customerTempVo.getOpenPlatId());
                        customerSyn.update();
                        log.info("重试" + i + "次ECRP会员上传成功，会员ID：" + customerSyn.getSysCustomerId() + ",开放平台会员ID:" + customerTempVo.getOpenPlatId());
                        break;
                    }
                }
            } else {
                // 设置上传同步状态
                customerSyn.setSynStatus(ZyHdUtil.SYN);
                customerSyn.setOpenPlatId(customerTempVo.getOpenPlatId());
                customerSyn.update();
                log.info("ECRP会员上传成功，会员ID：" + customerSyn.getSysCustomerId() + ",开放平台会员ID:" + customerTempVo.getOpenPlatId());
            }
        } else {
            log.info("获取品牌授权信息失败");
            return;
        }

    }

    /**
     * 调用开放平台接口推送会员信息
     *
     * @param customerTempVo
     * @param session
     * @param appkey
     * @param secret
     */
    private CustomerTempVo toSynCustomer(CustomerTempVo customerTempVo, String session,
                                         String appkey, String secret) {
        SaveCustomerRequest req = new SaveCustomerRequest();
        req.setCustomerID(customerTempVo.getOutCustomerId().intValue());
        req.setECRPID(String.valueOf(customerTempVo.getSysCustomerId()));
        // 会员等级
        req.setGrade(customerTempVo.getGrade());
        req.setMarkType(6);
        req.setMarkNick(UtilString.toString(customerTempVo.getSysCustomerId()));
        SaveCustomerResponse response;
        customerTempVo.setSynStatus(ZyHdUtil.NO_SYN);
        try {
            response = UtilTBApi.toSynCustomer(req, session, appkey, secret);
            if (response != null) {
                if (TRUE.equals(response.getIsOK())) {
                    String data = UtilString
                            .toString(JSONObject.parseObject(response.getBody()).get("Data"));
                    customerTempVo.setSynStatus(ZyHdUtil.SYN);
                    customerTempVo
                            .setOpenPlatId(JSONObject.parseObject(data).getLongValue("CustomerID"));
                }
            }
        } catch (ApiException e) {
            log.error(e.getMessage(), e);
        }
        return customerTempVo;

    }

    /**
     * 保存外部会员变动积分
     *
     * @param authorizeVo
     * @param startTime
     * @param endTime
     */
    @Override
    public void saveOutCustomerIntegral(KdBrandAuthorizeVo authorizeVo, String startTime,
                                        String endTime)
            throws Exception {
        int currPage = 1;
        int limit = 200;
        int listSize;
        do {
            List<IntegralUpdateResponse> integralUpdateResponses;
            // 获取时间范围内有变动的积分
            integralUpdateResponses = UtilTBApi.getPointChange(startTime, endTime, currPage, limit,
                    authorizeVo.getAccessToken(), authorizeVo.getAppKey(),
                    authorizeVo.getAppSecret());
            if (integralUpdateResponses == null || integralUpdateResponses.isEmpty()) {
                break;
            }
            for (IntegralUpdateResponse integralUpdateResponse : integralUpdateResponses) {
                log.info("开放平台会员ID：" + integralUpdateResponse.getCustomerID() + ",积分变动 ：" + integralUpdateResponse.getAvailableIntegral());
                // 获取有效积分
                BigDecimal score = integralUpdateResponse.getAvailableIntegral();
                Long outCustomerId = Long.valueOf(integralUpdateResponse.getCustomerID());
                OutCustomerIntegral outCustomerIntegral = OutCustomerIntegral.dao().queryByOutCid(
                        outCustomerId);
                if (outCustomerIntegral == null) {
                    outCustomerIntegral = new OutCustomerIntegral();
                    outCustomerIntegral.setBrandId(authorizeVo.getBrandId());
                    outCustomerIntegral.setGroupId(authorizeVo.getGroupId());
                    outCustomerIntegral.setOutCustomerId(outCustomerId);
                    //未同步
                    outCustomerIntegral.setSynStatus(ZyHdUtil.NO_SYN);
                    outCustomerIntegral.setIntegral(score);
                    outCustomerIntegral.save();
                } else {
                    if (outCustomerIntegral.getSynStatus() == ZyHdUtil.SYN) {
                        //信息有变动
                        outCustomerIntegral.setSynStatus(ZyHdUtil.SYN_UPDATE);
                    }
                    outCustomerIntegral.setIntegral(score);
                    outCustomerIntegral.update();
                }

            }
            listSize = integralUpdateResponses.size();
            currPage++;
        } while (listSize == limit);

    }


    @Transactional
    @Override
    public void updateCustomerIntegral(Long sysCustomerId, Integer brandId, BigDecimal score)
            throws Exception {

        KdCustomerBrand customerBrand = KdCustomerBrand.dao()
                .queryCustomerBrandByCustomerIdAndBrandId(
                        sysCustomerId, brandId);
        customerBrand.setscore(score);
        customerBrand.update();
        log.info("变动的会员：" + sysCustomerId + "积分：" + score);
        // 修改客户信息表更新时间
        KdCustomer.dao().changeUpdateTime(sysCustomerId);
    }

    @Transactional
    @Override
    public void saveOrUpdateCustomerInfo(OutCustomerInfo outCustomerInfo)
            throws Exception {

        String mobile = outCustomerInfo.getmobile();
        int sex = outCustomerInfo.getsex();
        String memberCard = outCustomerInfo.getMemberCard();
        Date birthday = outCustomerInfo.getbirthday();
        String name = outCustomerInfo.getCustomerName();
        String address = outCustomerInfo.getaddress();
        String city = outCustomerInfo.getcity();
        String province = outCustomerInfo.getprovince();
        String district = outCustomerInfo.getdistrict();
        String qq = outCustomerInfo.getqq();
        String wxNick = outCustomerInfo.getWxNick();
        String shopOpenId = outCustomerInfo.getOpenId();
        long outCustomerID = outCustomerInfo.getOutCustomerId();
        String email = outCustomerInfo.getemail();
        String kdOpenId = outCustomerInfo.getKdOpenId();
        Date developTime = outCustomerInfo.getDevelopTime();
        String telphone = outCustomerInfo.gettelphone();
        int groupId = outCustomerInfo.getGroupId();
        String shopCode = outCustomerInfo.getShopCode();
        String outNick = outCustomerInfo.getOutNick();
        int platFromType = outCustomerInfo.getPlatFromType();
        int brandID = outCustomerInfo.getBrandId();
        String target = "";
        if (ZyHdUtil.WHD.equals(outCustomerInfo.getAppKey())) {
            target = platFromType + "_" + kdOpenId;
        } else if (ZyHdUtil.AHD.equals(outCustomerInfo.getAppKey())) {
            target = platFromType + "_" + outNick;
        }
        long sysCustomerId = SysCustomerIdRule.dao().getSysCustomerIdByMark(target, mobile);
        // 判断该会员是否已存在kd_customer
        KdCustomer kdCustomer = KdCustomer.dao().queryCustomerInfoByCustomerId(sysCustomerId);
        if (kdCustomer == null) {
            log.info("新增会员sys_customer_id: " + sysCustomerId);
            // 客户基本信息
            kdCustomer = new KdCustomer();
            kdCustomer.setaddress(address);
            kdCustomer.setbirthday(birthday);
            kdCustomer.setcity(city);
            kdCustomer.setKdOpenId(kdOpenId);
            kdCustomer.setprovince(province);
            kdCustomer.setdistrict(district);
            kdCustomer.setcountry(outCustomerInfo.getcountry());
            kdCustomer.setIsActivate(ZyHdUtil.ACTIVATED);
            kdCustomer.setCustomerName(name);
            kdCustomer.setemail(email);
            kdCustomer.setDevelopTime(developTime);
            if (null != memberCard) {
                kdCustomer.setMemberCard(memberCard);
            }
            kdCustomer.setmobile(mobile);
            kdCustomer.setqq(qq);
            kdCustomer.setsex(sex);
            kdCustomer.setidcard("");
            kdCustomer.setzip("");
            kdCustomer.setSysCustomerId(sysCustomerId);
            kdCustomer.setGroupId(groupId);
            kdCustomer.settelphone(telphone);
            // 意向客户
            kdCustomer.setUserType(1);
            kdCustomer.save();
            zyRegisterConcernService.generateRegisterCareNotify(mobile, outCustomerInfo.getCustomerName()
                    , sysCustomerId, shopCode, outNick, groupId);
        } else {
            log.info("该会员已存在kd_customer，sys_customer_id：" + sysCustomerId);
            outCustomerInfo.setSysCustomerId(sysCustomerId);
            if (!UtilString.isBlank(name)) {
                kdCustomer.setCustomerName(name);
            }
            kdCustomer.setsex(sex);
            if (UtilString.isBlank(kdCustomer.gettelphone()) && !UtilString.isBlank(telphone)) {
                kdCustomer.settelphone(telphone);
            }
            if (birthday != null) {
                kdCustomer.setbirthday(birthday);
            }
            if (!UtilString.isBlank(mobile)) {
                kdCustomer.setmobile(mobile);
            }
            if (!UtilString.isBlank(mobile) && (UtilString.isBlank(kdCustomer.getmobile())
                    || ZyHdUtil.MOBILE_UPDATE == outCustomerInfo.getSynStatus())) {
                kdCustomer.setmobile(mobile);
            }
            if (!UtilString.isBlank(memberCard)) {
                kdCustomer.setMemberCard(memberCard);
            }
            if (!UtilString.isBlank(email)) {
                kdCustomer.setemail(email);
            }
            if (kdCustomer.getDevelopTime() == null && developTime != null) {
                kdCustomer.setDevelopTime(developTime);
            }
            if (!UtilString.isBlank(qq)) {
                kdCustomer.setqq(qq);
            }
            if (!UtilString.isBlank(district)) {
                kdCustomer.setdistrict(district);
            }
            if(!UtilString.isBlank(city)){
                kdCustomer.setcity(city);
            }
            if(!UtilString.isBlank(province)){
                kdCustomer.setprovince(province);
            }
            if (!UtilString.isBlank(address)) {
                kdCustomer.setaddress(address);
            }
            if (!UtilString.isBlank(outCustomerInfo.getKdOpenId())) {
                kdCustomer.setKdOpenId(kdOpenId);
            }
            kdCustomer.setIsActivate(ZyHdUtil.ACTIVATED);
            kdCustomer.update();
        }
        // 保存会员品牌信息
        if (KdCustomerBrand.dao().countBySysCidAndBid(sysCustomerId, brandID) == 0) {
            KdCustomerBrand customerBrand = new KdCustomerBrand();
            customerBrand.setstate(SystemConstat.STATE_1);
            customerBrand.setSysCustomerId(sysCustomerId);
            customerBrand.setMemberGrade(1);
            customerBrand.setBrandId(brandID);
            customerBrand.setGroupId(groupId);
            customerBrand.save();
        }
        // kd_customer_syn
        if (KdCustomerSyn.dao().countBySysCustomerId(sysCustomerId) == 0) {
            KdCustomerSyn customerSyn = new KdCustomerSyn();
            customerSyn.setSysCustomerId(sysCustomerId);
            customerSyn.setOutCustomerId(outCustomerInfo.getOutCustomerId());
            customerSyn.setShopCode(outCustomerInfo.getShopCode());
            customerSyn.setOpenPlatId(0L);
            customerSyn.setSynStatus(ZyHdUtil.NO_SYN);
            customerSyn.setGroupId(outCustomerInfo.getGroupId());
            customerSyn.save();
        }
        if (UtilString.isBlank(outNick)) {
            outNick = platFromType + "_" + mobile;
        }
        if (KdCustomerShop.dao().countByShopCodeAndOutNick(shopCode, outNick) == 0) {
            KdCustomerShop customerShop = new KdCustomerShop();
            customerShop.setSysCustomerId(sysCustomerId);
            customerShop.setOutId(outCustomerID);
            customerShop.setPlatFromType(platFromType);
            customerShop.setmobile(mobile);
            customerShop.setOutNick(outNick);
            customerShop.setGroupId(groupId);
            customerShop.setShopCode(shopCode);
            customerShop.setEncryptionMobile(UtilMemberAdopt.getEncryptionMobile(mobile));
            customerShop.save();
        }
        // kd_customer_weixin
        // 判断是否爱互动微信客户
        if (!UtilString.isBlank(shopOpenId)) {
            JSONArray jsonArray = UtilString.isBlank(outCustomerInfo.getOpenId()) ? new JSONArray()
                    : JSONObject.parseArray(outCustomerInfo.getOpenId());
            if (jsonArray.size() > 0) {
                JSONObject jsonObject = jsonArray.getJSONObject(0);
                String openId = jsonObject.getString("OpenID");
                Integer shopId = jsonObject.getInteger("ShopID");
                if (!UtilString.isBlank(openId)) {
                    // 判断店铺公众号Id是否存在
                    if (UtilString.isBlank(SHOP_WX_APPKEY_MAP.get(shopId))) {
                        // 根据品牌获取品牌授权信息
                        KdBrandAuthorizeVo brandAuthorizeVo = KdBrandAuthorizeVo.dao()
                                .queryByBrandId(
                                        outCustomerInfo
                                                .getBrandId());
                        if (brandAuthorizeVo == null) {
                            return;
                        }
                        // 获取品牌下的店铺信息
                        List<BrandShop> brandShops = UtilTBApi
                                .getBrandShopList(brandAuthorizeVo.getAppKey(),
                                        brandAuthorizeVo.getAppSecret(),
                                        brandAuthorizeVo.getAccessToken());
                        if (brandShops != null && brandShops.size() > 0) {
                            for (BrandShop brandShop : brandShops) {
                                SHOP_WX_APPKEY_MAP.put(brandShop.getId(), brandShop.getMark());
                            }
                        } else {
                            log.error("获取开放平台品牌下的店铺信息记录为：0条，品牌ID:" + outCustomerInfo.getBrandId());
                        }
                    }
                    String appKey = SHOP_WX_APPKEY_MAP.get(shopId);
                    // 此客户微信与公众号关系是否存在
                    if (KdCustomerWeixin.dao().countCustomerWxByCidAndAppKey(sysCustomerId, appKey)
                            <= 0) {
                        KdCustomerWeixin customerWeixin = new KdCustomerWeixin();
                        customerWeixin.setAppKey(appKey);
                        customerWeixin.setOpenId(openId);
                        customerWeixin.setUserNick(wxNick);
                        customerWeixin.setSysCustomerId(sysCustomerId);
                        customerWeixin.setGroupId(groupId);
                        customerWeixin.save();
                    }
                }
            }
        }
        // kd_customer_shop_rfm
        if (!customerShopRfmService.hasShopRfmByIdAndShopCode(sysCustomerId, shopCode)) {
            // 保存会员店铺rfm
            customerShopRfmService.saveCustomerShopRfm(sysCustomerId, shopCode);
        }
        outCustomerInfo.setSynStatus(ZyHdUtil.SYN);
        // 保存ecrp系统id
        outCustomerInfo.setSysCustomerId(sysCustomerId);
        outCustomerInfo.update();
    }

}
