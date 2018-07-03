package com.nascent.ecrpsaas.plus.ziyan.integral;

import com.nascent.api.ApiException;
import com.nascent.api.domain.IntegralLog;
import com.nascent.api.response.IntegralDirectSendResponse;
import com.nascent.api.response.IntegralDirectWithholdResponse;
import com.nascent.ecrpsaas.base.constat.DataDictionaryType;
import com.nascent.ecrpsaas.base.util.UtilDate;
import com.nascent.ecrpsaas.base.util.UtilString;
import com.nascent.ecrpsaas.base.util.taobao.UtilTBApi;
import com.nascent.ecrpsaas.base.vo.database.DataDictionaryVo;
import com.nascent.ecrpsaas.base.vo.organization.KdBrandAuthorizeVo;
import com.nascent.ecrpsaas.base.vo.vip.KdCustomerVo;
import com.nascent.ecrpsaas.model.KdPointLog;
import com.nascent.ecrpsaas.model.OutPointLog;
import com.nascent.ecrpsaas.plus.ziyan.Integral.service.ZyPointLogService;
import com.nascent.ecrpsaas.vip.service.CustomerShopRfmService;
import com.nascent.ecrpsaas.vo.PointLogVo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Service("zyPointLogService")
public class ZyPointLogServiceImpl implements ZyPointLogService {

	private static final Logger log = LoggerFactory.getLogger(Logger.class);
	private static final String ECRP_MARK = "ECRP_";

	private Map<String,String> hdShopCodeMap;

	@Autowired
	private CustomerShopRfmService customerShopRfmService;

	@Override
	public void pointLogDownloadWork(KdBrandAuthorizeVo authorizeVo, String startTime,
                                     String endTime, Map<String,String> hdShopCodeMap) throws  Exception{
		this.hdShopCodeMap = hdShopCodeMap;
		doDownloadPointLog(authorizeVo, startTime, endTime);
	}

	@Override
	public void pointLogSynWork(List<PointLogVo> list, KdBrandAuthorizeVo authorizeVo) {

		String session = authorizeVo.getAccessToken();
		String appkey = authorizeVo.getAppKey();
		String secret = authorizeVo.getAppSecret();
		if (UtilString.isEmpty(session) || UtilString.isEmpty(appkey) || UtilString.isEmpty(secret)) {
			return;
		}

		for (PointLogVo pointLogVo : list) {

			// 积分日志类型
			if (pointLogVo.getAction() == 1) {
				pointLogVo.setTheWay("ECRP_交易活动送积分");
				pointLogVo.setActivityType(27);
			} else if (pointLogVo.getAction() == 2) {
				pointLogVo.setTheWay("ECRP_营销活动送积分");
				pointLogVo.setActivityType(28);
			} else {
				pointLogVo.setTheWay(pointLogVo.getPointFromName());
				pointLogVo.setActivityType(pointLogVo.getActivityType());
			}
			// 设置PC端
			pointLogVo.setClientType(1);
			int synStatus = toSynPointLog(pointLogVo, session, appkey, secret);
			boolean flag = false;
			// 同步成功
			if (synStatus == 1) {

				flag = true;
			} else if (synStatus == 2 || synStatus == 0) {
				// 同步失败重试3次
				for (int i = 0; i < 3; i++) {
					try {
						Thread.sleep(100);
						// 休眠0.1秒
					} catch (InterruptedException e) {
						e.printStackTrace();
					}
					if (synStatus == 2) {
						long newCustomerId = 0L;
						try {
							// 获取最新客户ID
							newCustomerId = UtilTBApi.getNewCustomerInfo(String.valueOf(pointLogVo.getSysCustomerId()),
									session, appkey, secret);
						} catch (ApiException e) {
							log.error(e.getMessage(), e);
						}
						if (newCustomerId > 0) {
							pointLogVo.setOutCustomerId(newCustomerId);
						}
					}
					synStatus = toSynPointLog(pointLogVo, session, appkey, secret);
					// 重试成功
					if (synStatus == 1) {
						flag = true;
						break;
					}
				}
			}
			// 同步成功
			if (flag) {
				log.info("成功-->同步会员ID:" + pointLogVo.getSysCustomerId() +",积分日志ID：" + pointLogVo.getId());
				KdPointLog pointLog = new KdPointLog();
				pointLog.setid(pointLogVo.getId());
				pointLog.setPointCreateTime(UtilDate.now());
				pointLog.setSynStatus(1);
				pointLog.update();
			}else{
				log.info("失败-->同步会员ID:" + pointLogVo.getSysCustomerId() +",积分日志ID：" + pointLogVo.getId());
			}

		}

	}

	/**
	 * 调用开放平台接口
	 *
	 * @param pointLogVo
	 * @param session
	 * @param appkey
	 * @param secret
	 * @return
	 */
	private static int toSynPointLog(PointLogVo pointLogVo, String session, String appkey, String secret) {
		// 同步状态 1 成功 0失败 2 未找到会员信息
		int synStatus = 0;
		Date startDate = UtilDate.now();

		if (pointLogVo.getOperation() == 1) {
			// 发放积分
			IntegralDirectSendResponse response;
			try {
				// 直接发放同步积分
				response = UtilTBApi.integralDirectSend(pointLogVo.getOutCustomerId(), pointLogVo.getSysCustomerId(),
						pointLogVo.getPoint(), pointLogVo.getActivityType(), pointLogVo.getClientType(),
						pointLogVo.getTheWay(), ECRP_MARK + pointLogVo.getId(), null, session, appkey, secret);
				if (UtilString.toBoolean(response.getIsOK())) {
					synStatus = 1;
				} else if ("503".equals(response.getCode())) {
					// 未找到用户信息
					synStatus = 2;
				}else{
					//积分日志同步失败
					synStatus = 3;
					log.info(response.getMessage());
				}
			} catch (ApiException e) {
				log.error(e.getMessage(), e);
			}
		} else if (pointLogVo.getOperation() == 2){
			//直接扣除积分
			IntegralDirectWithholdResponse withholdResponse;
			try {
				withholdResponse = UtilTBApi.integralDirectWithhold(pointLogVo.getOutCustomerId(),
						pointLogVo.getSysCustomerId(), pointLogVo.getPoint(), pointLogVo.getActivityType(),
						pointLogVo.getClientType(), pointLogVo.getTheWay(), ECRP_MARK + pointLogVo.getId(), null,
						session, appkey, secret);
				if (UtilString.toBoolean(withholdResponse.getIsOK())) {
					synStatus = 1;
				} else if ("503".equals(withholdResponse.getCode())) {
					// 未找到用户信息
					synStatus = 2;
				}else{
					//积分日志同步失败
					synStatus = 3;
					log.info(withholdResponse.getMessage());
				}
			} catch (ApiException e) {
				log.error(e.getMessage(), e);
			}
		}
		Date endDate = UtilDate.now();
		log.info("积分接口调用耗时" + (endDate.getTime() - startDate.getTime()) + "|| id:" + pointLogVo.getId());
		return synStatus;
	}

	/**
	 * 下载积分日志
	 *
	 * @param authorizeVo
	 * @param startTime
	 * @param endTime
	 * @throws ApiException
	 */
	private void doDownloadPointLog(KdBrandAuthorizeVo authorizeVo, String startTime, String endTime)
			throws Exception {

		int currPage = 1;
		int limit = 200;
		// 调用接口获取积分日志
		Map<String, Object> map = UtilTBApi.getIntegralLog(startTime, endTime, currPage, limit,
				authorizeVo.getAccessToken(), authorizeVo.getAppKey(), authorizeVo.getAppSecret());
		// 下载积分日志总页数
		int pageCount = (int) map.get("pageCount");
		if (pageCount <= 0) {
			return;
		}
		for (int i = 1; i <= pageCount; i++) {
			Map<String, Object> mapRecord = UtilTBApi.getIntegralLog(startTime, endTime, currPage, limit,
					authorizeVo.getAccessToken(), authorizeVo.getAppKey(), authorizeVo.getAppSecret());
			@SuppressWarnings("unchecked")
			List<IntegralLog> pointLogList = (List<IntegralLog>) mapRecord.get("record");
			if (pointLogList != null) {
				if (pointLogList.isEmpty()) {
					continue;
				}
				doSaveOutPointLog(pointLogList, authorizeVo);
				currPage++;
			}
		}

	}

	/**
	 * 保存下载的积分日志
	 *
	 * @param list
	 * @param authorizeVo
	 */
	private void doSaveOutPointLog(List<IntegralLog> list, KdBrandAuthorizeVo authorizeVo) {
		for (IntegralLog integralLog : list) {
			OutPointLog outPointLog = null;
			long outIdLong = 0;
			Date date = null;
			long sysCustomerId = 0;
			String shopCode = hdShopCodeMap.get(integralLog.getSource());
			if (shopCode == null) {
				log.info("没有找到对应的互动店铺");
				continue;
			}
			// 扩展id
			Integer outId = integralLog.getId().intValue();
			if (outId != null) {
				outIdLong = outId.intValue();
				outPointLog = OutPointLog.dao().queryByOutId(outIdLong);
			}
			Integer customerId = integralLog.getCustomerID();
			if (customerId == null || customerId <= 0) {
				continue;
			}
			String extendId = integralLog.getExtendId();
			// 判断是否为上传日志
			if (!UtilString.isBlank(extendId) && extendId.contains(ECRP_MARK)) {
				continue;
			}
			// 判断日志是否存在
			if (outPointLog != null) {
				outPointLog.setSysCustomerId(sysCustomerId);
				outPointLog.setOutCustomerId(customerId);
				outPointLog.update();
				continue;
			}

			outPointLog = new OutPointLog();

			outPointLog.setOutId(integralLog.getId());
			// 未同步
			outPointLog.setSynStatus(0);
			outPointLog.setShopCode(shopCode);

			// 积分增加
			if (integralLog.getChangeType() != null && integralLog.getChangeType() == 0) {
				outPointLog.setoperation(1);
			}
			// 积分减少
			if (integralLog.getChangeType() != null && integralLog.getChangeType() == 1) {
				outPointLog.setoperation(2);
			}
			// 日志生成时间
			if (!UtilString.isEmpty(integralLog.getGetTime())) {
				try {
					date = UtilDate.parseDateTime(integralLog.getGetTime());
				} catch (Exception e) {
					e.printStackTrace();
				}
			} else {
				date = new Date();
			}

			// Integer activityType = integralLog.getActivityType();
			// 开发平台积分类型如果为0（未知），则从the_way解析类型与ecrp积分类型对应起来，如果与ecrp积分类型关联不起来，则为ecrp未知
			// Integer ecrpPointType = activityType;
			// 积分
			BigDecimal point = new BigDecimal(0);
			BigDecimal tempPoint = integralLog.getChangeValue();
			DecimalFormat df = new DecimalFormat("0.00");
			if (tempPoint != null) {
				point = BigDecimal.valueOf(Double.valueOf(df.format(tempPoint)));
			}
			DataDictionaryVo dataDictionaryVo = DataDictionaryVo.dao().queryDataDictionaryByTypeAndCode(
					DataDictionaryType.INTERACTTYPE.getValue(), UtilString.toString(integralLog.getActivityType()));
			if (dataDictionaryVo == null) {
				outPointLog.setPointFromName(String.valueOf(integralLog.getActivityType()));
			} else {
				outPointLog.setPointFromName(dataDictionaryVo.getName());
			}
			// 来源说明
			outPointLog.setremark(integralLog.getTheWay());
			outPointLog.setpoint(point);
			outPointLog.setActivityType(integralLog.getActivityType());
			outPointLog.setSysCustomerId(sysCustomerId);
			outPointLog.setPointActivityId(0);
			outPointLog.setBrandId(authorizeVo.getBrandId());
			outPointLog.setTargetId(0);
			//6：互动
			outPointLog.setaction(6);
			outPointLog.setCreateTime(date);
			outPointLog.setUpdateTime(date);
			outPointLog.setGetTime(date);
			outPointLog.setOutCustomerId(customerId);
			outPointLog.setIsInteraction(integralLog.getIsInteraction());
			outPointLog.save();
		}

	}

	@Override
	public void outPointLogSynWork() {

		int limit = 500;
		List<OutPointLog> outPointLogs = OutPointLog.dao().querySynOutLog(0, limit);
		for (OutPointLog outPointLog : outPointLogs) {

			KdCustomerVo customerVo = KdCustomerVo.dao().queryByOutCustomerID(outPointLog.getOutCustomerId());
			if (customerVo == null) {
				continue;
			}
			long sysCustomerId = customerVo.getSysCustomerId();
			if (sysCustomerId > 0) {
                log.info("同步外部积分日志：{},会员ID：{}");
				// 将激活会员的积分日志记录放入kd_point_log表
				KdPointLog kdPointLog = new KdPointLog();
				kdPointLog.setremark(outPointLog.getremark());
				kdPointLog.setActivityType(outPointLog.getActivityType());
				kdPointLog.setSynStatus(1);
				kdPointLog.setPointActivityId(0);
				kdPointLog.setShopCode(outPointLog.getShopCode());
				kdPointLog.setSysCustomerId(sysCustomerId);
				kdPointLog.setPointFromName(outPointLog.getPointFromName());
				kdPointLog.setOutId(outPointLog.getOutId());
				// 互动
				kdPointLog.setaction(6);
				// 设置为已同步
				kdPointLog.setSynStatus(1);
				kdPointLog.setpoint(outPointLog.getpoint());
				kdPointLog.setoperation(outPointLog.getoperation());
				kdPointLog.setBrandId(outPointLog.getBrandId());
				kdPointLog.setCreateTime(new Date());
				kdPointLog.setUpdateTime(new Date());
				kdPointLog.setPointCreateTime(outPointLog.getGetTime());
				kdPointLog.save();
				// 设置状态为已同步
				outPointLog.setSynStatus(1);
				outPointLog.setSysCustomerId(sysCustomerId);
				outPointLog.update();
				// 统计互动次数
				if (customerShopRfmService.hasShopRfmByIdAndShopCode(sysCustomerId, outPointLog.getShopCode())) {
					customerShopRfmService.updateInteractRfm(outPointLog.getSysCustomerId(), outPointLog.getShopCode());
				} else {
					log.error("数据出现异常，该会员不存在，ID：" + outPointLog.getSysCustomerId());
				}
				// 更新会员互动rfm

			} else {
				log.info("开放平台会员ID：" + outPointLog.getOutCustomerId() + "，ecrp未找到该会员,积分日志不同步");
			}

		}

	}


}
