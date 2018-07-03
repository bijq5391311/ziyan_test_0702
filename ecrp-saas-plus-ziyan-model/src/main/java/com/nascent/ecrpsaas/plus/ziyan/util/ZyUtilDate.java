package com.nascent.ecrpsaas.plus.ziyan.util;

import java.util.Calendar;
import java.util.Date;

/**
 * @author zhourongping
 * @Date 2017/10/31
 * @功能
 */
public class ZyUtilDate {

    private ZyUtilDate() {
        // 防止外部创建实例
    }

    /**
     * 获取某年某月的第一天
     *
     * @param year  年
     * @param month 月
     * @return 某年某月的第一天0点0分0秒
     */
    public static Date getMonthFirst(int year, int month) {
        Calendar cal = Calendar.getInstance();
        //设置年份
        cal.set(Calendar.YEAR, year);
        //设置月份
        cal.set(Calendar.MONTH, month - 1);
        //获取某月最小天数
        int firstDay = cal.getActualMinimum(Calendar.DAY_OF_MONTH);
        //设置日历中月份的最小天数
        cal.set(Calendar.DAY_OF_MONTH, firstDay);
        //设置为当天的0点0分0秒
        cal.set(Calendar.HOUR_OF_DAY, 0);
        cal.set(Calendar.MINUTE, 0);
        cal.set(Calendar.SECOND, 0);
        return cal.getTime();
    }

    /**
     * 获取某年某月的最后一天
     *
     * @param year  年
     * @param month 月
     * @return 某年某月的最后一天23点59分59秒
     */
    public static Date getMonthLast(int year, int month) {
        Calendar cal = Calendar.getInstance();
        cal.clear();
        //设置年份
        cal.set(Calendar.YEAR, year);
        //设置月份
        cal.set(Calendar.MONTH, month - 1);
        //获取某月最大天数
        int lastDay = cal.getActualMaximum(Calendar.DATE);
        //设置日历中月份的最大天数
        cal.set(Calendar.DAY_OF_MONTH, lastDay);
        //设置为当天的23点59分59秒
        cal.set(Calendar.HOUR_OF_DAY, 23);
        cal.set(Calendar.MINUTE, 59);
        cal.set(Calendar.SECOND, 59);
        return cal.getTime();
    }

    /**
     * 获取某天凌晨0点0分0秒
     *
     * @return 获取某天凌晨0点0分0秒
     */
    public static Date getStartOfDay(Date startDate) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(null == startDate ? new Date() : startDate);
        cal.set(Calendar.HOUR_OF_DAY, 0);
        cal.set(Calendar.MINUTE, 0);
        cal.set(Calendar.SECOND, 0);
        return cal.getTime();
    }

    /**
     * 获取某天晚上23点59分59秒
     *
     * @return 某天晚上23点59分59秒
     */
    public static Date getEndOfDay(Date endDate) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(null == endDate ? new Date() : endDate);
        calendar.set(Calendar.HOUR_OF_DAY, 23);
        calendar.set(Calendar.MINUTE, 59);
        calendar.set(Calendar.SECOND, 59);
        return calendar.getTime();
    }

    public static int getDayBetween(Date fDate, Date oDate) {
        if (null == fDate || null == oDate) {
            return -1;
        }
        long intervalMilli = oDate.getTime() - fDate.getTime();
        return (int) (intervalMilli / (24 * 60 * 60 * 1000L));
    }
}
