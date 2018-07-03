ALTER TABLE `zy_coupon_customer_ext`
	ADD COLUMN `customer_restrict` INT NOT NULL DEFAULT '0' COMMENT '0:注册会员才能使用。1：不限制' AFTER `sys_customer_id`;