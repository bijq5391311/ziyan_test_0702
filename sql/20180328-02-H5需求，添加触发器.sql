CREATE DEFINER=`root`@`%` TRIGGER `out_customer_info_after_insert` AFTER UPDATE ON `out_customer_info` FOR EACH ROW BEGIN
	if  NEW.sys_customer_id is not null && NEW.sys_customer_id>0 && NEW.mobile is not null && NEW.mobile != '' THEN
		UPDATE zy_coupon_customer_ext SET sys_customer_id=NEW.sys_customer_id WHERE  type=1 and price = NEW.mobile;
	END if;	
END