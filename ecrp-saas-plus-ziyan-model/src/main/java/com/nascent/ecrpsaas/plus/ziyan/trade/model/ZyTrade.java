package com.nascent.ecrpsaas.plus.ziyan.trade.model;

import com.nascent.ecrpsaas.database.model.KdTrade;
import com.nascent.plugins.spring.SpringContext;
import com.nascent.plugins.sqlinxml.annotation.Param;
import com.nascent.plugins.sqlinxml.annotation.Select;
import com.nascent.utils.query.QueryInfo;

import java.util.List;

/**
 * @Describe: TODO  紫燕交易实体
 * @Author:   huangyuye
 * @Date:     2017-10-25
 */
@Select()
public class ZyTrade extends KdTrade{

    public static ZyTrade dao() {
        return SpringContext.me().getModel(ZyTrade.class);
    }

    /**
     * @Describe: TODO 获取时间段内交易状态完成的交易列表 (trade_status="TRADE_FINISHED") 且未被处理grouth_value_job_status = 0
     * @Date:     2017-10-25
     * @param     pageIndex 起始条数
     * @param     pageSize  查询条数
     * @return
     */
    public List<ZyTrade> queryTradeFinishedList(int pageIndex, int pageSize) {
        QueryInfo queryInfo = new QueryInfo("trade.zyTrade.queryTradeFinishedList");

        List<ZyTrade> zyTradeList = queryInfo.addParam("pageIndex", pageIndex)
            .addParam("pageSize", pageSize)
            .find(ZyTrade.class);

        return zyTradeList;
    }

    @Select(sql = "select integral_lock_code")
    public ZyTrade findLockCodeBySysTradeId(@Param("sys_trade_id") long sysTradeId) {
        return null;
    }

    @Select
    public ZyTrade loadTradeByOutTradeId(@Param("out_trade_id") String outTradeId) {
        //todo 入参加上shopCode
        return null;
    }

    /**
     * 根据店铺编码与外部子订单交易编码获取交易
     * @param outOrderId
     * @param shopCode
     * @return
     */
    public ZyTrade getTradeByOutOrderIdAndShop(String outOrderId, String shopCode) {
        QueryInfo queryInfo = new QueryInfo("trade.zyTrade.getTradeByOutOrderIdAndShop");
        return queryInfo.addParam("outOrderId", outOrderId)
                .addParam("shopCode", shopCode)
                .findOne(ZyTrade.class);
    }

    /**
     * 成长服务处理状态
     * column: grouth_value_job_status
     */
    public void setGrouthValueJobStatus(int status){
        set("grouth_value_job_status", status);
    }
    public int getGrouthValueJobStatus() {
        return get("grouth_value_job_status");
    }

    /**
     * 积分锁定编码
     * column: integral_lock_code
     */
    public void setIntegralLockCode(String integralLockCode){
        set("integral_lock_code", integralLockCode);
    }
    public String getIntegralLockCode(){
        return get("integral_lock_code");
    }
}
