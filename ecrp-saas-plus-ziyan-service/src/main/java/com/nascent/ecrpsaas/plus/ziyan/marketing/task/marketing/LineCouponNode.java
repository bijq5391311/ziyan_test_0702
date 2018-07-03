package com.nascent.ecrpsaas.plus.ziyan.marketing.task.marketing;

import com.alibaba.fastjson.JSONObject;
import com.nascent.ecrpsaas.marketing.helper.EcrpConstant.XmlNodeTag;
import com.nascent.ecrpsaas.marketing.model.Marketing;
import com.nascent.ecrpsaas.marketing.task.BaseNode;
import com.nascent.ecrpsaas.marketing.task.NodeXmlTempleItem;
import org.springframework.stereotype.Component;

/**
 * ZY门店优惠券
 */
@Component
public class LineCouponNode extends BaseNode {

    @Override
    protected NodeXmlTempleItem setNodeOwnerData(JSONObject nodeData) {
        NodeXmlTempleItem templeItem = new NodeXmlTempleItem();
        templeItem.setXmlNodeTag(XmlNodeTag.SERVICE.getValue());

        //优惠券活动id
        templeItem.addField("lineCouponId", nodeData.getString("lineCouponId"));
        templeItem.addField("service",
                "@marketingLineCouponService.sendLineCoupon(#prev$,#InstanceId,#NodeId,#lineCouponId)");
        return templeItem;
    }

    @Override
    protected void setMarketing(JSONObject nodeData, Marketing model) {
        //优惠券
        model.setMarketingManner(35);
        model.setCouponId(nodeData.getLong("lineCouponId"));
    }
}
