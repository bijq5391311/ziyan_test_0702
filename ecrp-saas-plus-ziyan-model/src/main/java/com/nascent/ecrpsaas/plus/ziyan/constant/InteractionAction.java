package com.nascent.ecrpsaas.plus.ziyan.constant;

import java.util.LinkedHashMap;
import java.util.Map;

/**
 * @author jingyu.gao
 * @Date 2017/12/24
 * @功能 互动跳转路径:【/interaction/zyinteraction/interactionList/{key}】
 */
public class InteractionAction {

    public static Map<Integer, String> interactionActionMap = new LinkedHashMap<Integer, String>() {

        private static final long serialVersionUID = 1L;

        {
            /**
             * 互动运营
             */
            //签到
            put(1, "/shopmanage/app/sign");
            //完善信息
            put(2, "/shopmanage/app/perfectInfo");
            //打豆豆
            put(3, "/shopmanage/app/bean");
            //邀请关注
            put(4, "/shopmanage/app/forrow");
            //积分兑换礼品
            put(5, "/shopmanage/app/goods");
            //积分加钱购
            put(6, "/shopmanage/app/goodsExchange");
            //积分兑换优惠券
            put(7, "/shopmanage/app/coupon");
            //抽奖
            put(8, "/shopmanage/app/lottery");
            //待发礼品
            put(9, "/shopmanage/datacenter/goodsOrder");
            //活动看板
            put(10, "/shopmanage/datacenter/activityBoard");
            //微论坛
            put(11, "/shopmanage/app/forum");
            //H5领取优惠券
            put(31, "/shopmanage/app/pageCoupon");

            /**
             * 粉丝运营
             */
            //粉丝数据
            put(12, "/shopmanage/datacenter/follower");
            //红包任务
            put(13, "/shopmanage/datacenter/redpackTask");
            //模板消息任务
            put(14, "/shopmanage/datacenter/templateTask");

            /**
             * 会员卡
             */
            //会员卡设置
            put(15, "/shopmanage/shopmanage/vipConfig");
            //绑卡送积分
            put(16, "/shopmanage/shopmanage/vipSendIntegral");
            //权益管理
            put(17, "/shopmanage/shopmanage/rights");

            /**
             * 无线装修
             */
            //首页装修
            put(18, "/shopmanage/shopmanage/mobileIndexSet");
            //自定义菜单
            put(19, "/shopmanage/shopmanage/customMenu");

            /**
             * 互动首页
             */
            put(20, "/");

            /**
             * 互动系统设置
             */
            //基础设置
            put(21, "/shopmanage/shopmanage/sysSet");
            //会员积分说明
            put(22, "/shopmanage/shopmanage/explainConfig");
            //会员成长值说明
            put(23, "/shopmanage/shopmanage/explainConfig/growthExplain");
            //会员等级说明
            put(24, "/shopmanage/shopmanage/explainConfig/gradeExplain");
            //服务专员说明
            put(25, "/shopmanage/shopmanage/serviceSpecialistExplain");

            //积分兑换补签卡
            put(26, "/shopmanage/app/repairSign");
            //活动审核
            put(27, "/shopmanage/datacenter/reviewActivity");
            //试用商品
            put(28, "/shopmanage/app/trial");
            //积分兑换激活码
            put(29, "/shopmanage/app/videosVip");
            //权益说明
            put(30, "/shopmanage/shopmanage/explainConfig/rightsExplain");
            
            
            
            
        }
    };
}
