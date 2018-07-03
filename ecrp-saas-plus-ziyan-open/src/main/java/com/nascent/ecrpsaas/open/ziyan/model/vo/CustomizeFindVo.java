package com.nascent.ecrpsaas.open.ziyan.model.vo;

import org.springframework.stereotype.Component;

import java.util.Date;

/**
 * @author FeiXiang
 * @date 2017/12/21
 * @describe 自定义列表查询条件
 */
@Component
public class CustomizeFindVo {
    private String openId;  //会员openId
    private String state;   //状态
    private String couponId;  //优惠券Id
    private Date entTimeBefore;  //过期时间前
    private Date endTimeLater;  //过期时间后
    private Integer pageNum;
    private Integer pageSize;
    private Integer pageStart;
    private Integer limit;
    private String mobile;
    private String guid;//互动端活动编码
	private String activityName;//互动端活动名称
    public String getGuid() {
		return guid;
	}

	public void setGuid(String guid) {
		this.guid = guid;
	}

	public String getActivityName() {
		return activityName;
	}

	public void setActivityName(String activityName) {
		this.activityName = activityName;
	}
    public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getOpenId() {
        return openId;
    }

    public void setOpenId(String openId) {
        this.openId = openId;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getCouponId() {
        return couponId;
    }

    public void setCouponId(String couponId) {
        this.couponId = couponId;
    }

    public Date getEntTimeBefore() {
        return entTimeBefore;
    }

    public void setEntTimeBefore(Date entTimeBefore) {
        this.entTimeBefore = entTimeBefore;
    }

    public Date getEndTimeLater() {
        return endTimeLater;
    }

    public void setEndTimeLater(Date endTimeLater) {
        this.endTimeLater = endTimeLater;
    }

    public Integer getPageNum() {
        return pageNum;
    }

    public void setPageNum(Integer pageNum) {
        this.pageNum = pageNum;
    }

    public Integer getPageStart() {
        return pageStart;
    }

    public void setPageStart(Integer pageStart) {
        this.pageStart = pageStart;
    }

    public Integer getPageSize() {
        return pageSize;
    }

    public void setPageSize(Integer pageSize) {
        this.pageSize = pageSize;
    }

    public Integer getLimit() {
        return limit;
    }

    public void setLimit(Integer limit) {
        this.limit = limit;
    }

    public void setPageDefault() {
        if (pageNum == null) {
            pageNum = 1;
        }
        if (pageSize == null) {
            pageSize = 10;
        }
        pageStart = (pageNum > 1 ? pageNum - 1 : 0) * pageSize;
    }
}
