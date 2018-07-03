package com.nascent.ecrpsaas.open.ziyan.model;


import com.nascent.ecrpsaas.open.utils.MapUtil;
import com.nascent.plugins.jfinal.activerecord.Record;
import com.nascent.plugins.spring.SpringContext;
import com.nascent.plugins.sqlinxml.annotation.ArModel;
import com.nascent.plugins.sqlinxml.annotation.Select;
import com.nascent.plugins.sqlinxml.annotation.TableBind;
import com.nascent.utils.query.QueryInfo;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * @author FeiXiang
 * @date 2017/12/21
 * @describe
 */
@Component
@Select()
@TableBind(name = "zy_coupon_customer_ext", pk = "id")
public class ZyCouponCustomerExtModel extends ArModel<ZyCouponCustomerExtModel> {
    private static final long serialVersionUID = 1L;

    public static ZyCouponCustomerExtModel dao() {
        return SpringContext.me().getBean(ZyCouponCustomerExtModel.class);
    }

    public long getCount(Map<String, Object> params) {
        return new QueryInfo("zyCouponCustomerExt.getCount").addParams(params).count();
    }

    public List<Record> findList(Map<String, Object> params) {
        return new QueryInfo("zyCouponCustomerExt.findList").addParams(params).find();
    }

    public void save(ZyCouponCustomerExt ext) {
        new QueryInfo("zyCouponCustomerExt.save").addParams(MapUtil.beanToMap(ext)).execute();
    }

    public static class ZyCouponCustomerExt {
        private Integer id;
        private Integer state; //状态   0 有效 1 已失效 2已核销
        private Date updateTime;    //修改时间
        private Date createTime;    //创建时间
        private Long couponId;  //线下优惠券ID
        private String couponCode;  //优惠券编码
        private Long sysCustomerId; //系统内客户ID,由ECRM系统生成
        private Integer type;//0:ECRP系统兑换优惠券 1：页面领取优惠券

		private String price;//type=0:无值 type=1:存手机号
        private Date validTimeBegin;    //有效时间开始
        private Date validTimeEnd;  //有效时间结束
        private Integer purposeType;    //用途 0:未发放  1：营销发放  2：导出 3：互动端活动发放
        private Long exportIdentification;  //编码导出标识
        private String guid;//互动端活动编码
        private String activityTitle;//互动端活动名称

        public String getGuid() {
			return guid;
		}

		public void setGuid(String guid) {
			this.guid = guid;
		}

		public String getActivityTitle() {
			return activityTitle;
		}

		public void setActivityTitle(String activityName) {
			this.activityTitle = activityName;
		}

		public Integer getId() {
            return id;
        }

        public void setId(Integer id) {
            this.id = id;
        }

        public Integer getState() {
            return state;
        }

        public void setState(Integer state) {
            this.state = state;
        }

        public Date getUpdateTime() {
            return updateTime;
        }

        public void setUpdateTime(Date updateTime) {
            this.updateTime = updateTime;
        }

        public Date getCreateTime() {
            return createTime;
        }

        public void setCreateTime(Date createTime) {
            this.createTime = createTime;
        }

        public Long getCouponId() {
            return couponId;
        }

        public void setCouponId(Long couponId) {
            this.couponId = couponId;
        }

        public String getCouponCode() {
            return couponCode;
        }

        public void setCouponCode(String couponCode) {
            this.couponCode = couponCode;
        }

        public Long getSysCustomerId() {
            return sysCustomerId;
        }

        public void setSysCustomerId(Long sysCustomerId) {
            this.sysCustomerId = sysCustomerId;
        }
        public Integer getType() {
			return type;
		}

		public void setType(Integer type) {
			this.type = type;
		}

		public String getPrice() {
			return price;
		}

		public void setPrice(String price) {
			this.price = price;
		}

        public Date getValidTimeBegin() {
            return validTimeBegin;
        }

        public void setValidTimeBegin(Date validTimeBegin) {
            this.validTimeBegin = validTimeBegin;
        }

        public Date getValidTimeEnd() {
            return validTimeEnd;
        }

        public void setValidTimeEnd(Date validTimeEnd) {
            this.validTimeEnd = validTimeEnd;
        }

        public Integer getPurposeType() {
            return purposeType;
        }

        public void setPurposeType(Integer purposeType) {
            this.purposeType = purposeType;
        }

        public Long getExportIdentification() {
            return exportIdentification;
        }

        public void setExportIdentification(Long exportIdentification) {
            this.exportIdentification = exportIdentification;
        }
    }
}