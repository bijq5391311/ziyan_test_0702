package com.nascent.ecrpsaas.plus.ziyan.util;

import com.nascent.ecrpsaas.base.util.UtilDate;
import com.nascent.plugins.spring.SpringContext;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;

import java.text.SimpleDateFormat;
import java.util.*;

/**
 * com.nascent.ecrpsaas.plus.ziyan.util
 *
 * @Author guiping.Qiu
 * @Date 2017/12/26
 */
public class ZyHdUtil {

    public static final String PROVINCE = "上海";
    public static final String CITY = "上海市";
    public static final String DISTRICT = "上海紫燕食品有限公司";

    /**
     * 任务调度线程池
     */
    public static final String POINT_LOG_DOWNLOAD_SCHEDULER = "point_log_download_scheduler";
    public static final String POINT_LOG_SYN_SCHEDULER = "point_log_syn_scheduler";
    public static final String INTEGRAL_CHANGE_SCHEDULER = "integral_change_scheduler";
    public static final String CUSTOMER_SYN_SYSTEM_SCHEDULER = "customer_syn_system_scheduler";

    /**
     * 已激活
     */
    public static final int ACTIVATED = 1;
    /**
     * 未激活
     */
    public static final int NO_ACTIVATED = 0;

    /**
     * 未同步
     */
    public static final int NO_SYN = 0;
    /**
     * 已同步
     */
    public static final int SYN = 1;
    /**
     * 同步更新
     */
    public static final int SYN_UPDATE = 2;
    /**
     * 同步更新
     */
    public static final int MOBILE_UPDATE = 3;

    public static final String START_TIME = "startTime";
    public static final String END_TIME = "endTime";

    public static final String WHD = "whd001";
    public static final String AHD = "ahd001";


    /**
     * 通过spring获取指定调度任务
     * @param schedulerId
     * @return
     */
    public static ThreadPoolTaskScheduler getScheduler(String schedulerId){
        return (ThreadPoolTaskScheduler) SpringContext.me().getBean(schedulerId);
    }

    /**
     * 时间按天分割
     * @param startDate
     * @param endDate
     * @return
     */
    public static List<String> dateSplitByDay(Date startDate, Date endDate, int day){
        List<String> returnList = new ArrayList<String>();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Calendar canlandarStart = Calendar.getInstance();
        //开始时间
        Calendar canlandarEnd = Calendar.getInstance();
        //结束时间
        canlandarStart.setTime(startDate);
        canlandarEnd.setTime(endDate);
        while(canlandarStart.compareTo(canlandarEnd) < 1){
            returnList.add(sdf.format(canlandarStart.getTime()));
            canlandarStart.add(Calendar.DATE, day);
        }
        return returnList;
    }

    /**
     * 获取互动店铺
     * @return
     */
    public static Map<String,String> getHdShop(){
        Map<String,String> map = new HashMap<>();
        map.put("whd001","微互动");
        map.put("ahd001","爱互动");
        return map;
    }

    /**
     * @param fDate
     * @param oDate
     * @return int
     * @throws @description <br>
     *                      <p>
     *                      <pre>
     *                                                                                                                               业务逻辑描述：oDate-fDate
     *                                                                                                                                           </pre>
     * @title 比较两个日期相差的天数
     */
    public static int daysOfTwo(Date fDate, Date oDate) {
        if (null == fDate || null == oDate) {
            return -1;
        }
        long intervalMilli = oDate.getTime() - fDate.getTime();
        return (int) (intervalMilli / (24 * 60 * 60 * 1000L));
    }

    /**
     * 根据当前时间分割时间范围
     * @param date
     * @param startDate
     * @param endDate
     * @return
     */
    public static Map<String,String> splitTimeRange(String date,Date startDate,Date endDate){
        int res = ZyHdUtil.daysOfTwo(startDate, endDate);
        String startTime = "";
        String endTime = "";
        // 开始结束时间相差超过1天
        if (res != 0) {
            String tempStart = UtilDate.format(startDate, UtilDate.DATE_PATTERN.YYYY_MM_DD);
            String tempEnd = UtilDate.format(endDate, UtilDate.DATE_PATTERN.YYYY_MM_DD);
            if (date.equals(tempStart)) {
                startTime = UtilDate.formatDateTime(startDate);
            } else {
                startTime = date + " 00:00:00";
            }
            if (date.equals(tempEnd)) {
                endTime = UtilDate.formatDateTime(endDate);
            } else {
                endTime = date + " 23:59:59";
            }
        } else {
            startTime = UtilDate.formatDateTime(startDate);
            endTime = UtilDate.formatDateTime(endDate);
        }
        Map<String,String> map = new HashMap<>();
        map.put(START_TIME,startTime);
        map.put(END_TIME,endTime);
        return map;
    }


}
