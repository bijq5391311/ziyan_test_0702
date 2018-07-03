ALTER TABLE `zy_coupon_customer_ext`
	ADD COLUMN `type` INT(11) NOT NULL DEFAULT '0' COMMENT '0:ECRP系统兑换优惠券 1：页面领取优惠券' AFTER `sys_customer_id`,
	ADD COLUMN `price` VARCHAR(50) NULL DEFAULT NULL COMMENT 'type=0:无值 type=1:存手机号' AFTER `type`;
