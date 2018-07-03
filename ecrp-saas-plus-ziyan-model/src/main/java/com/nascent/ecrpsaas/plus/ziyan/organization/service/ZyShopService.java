package com.nascent.ecrpsaas.plus.ziyan.organization.service;

/**
 * 
 * @ClassName: ZyShopService
 * @Description: (紫燕店铺接口)
 * @author yuye.huang
 * @date 2017年10月20日 上午7:45:11
 * todo 2017-12-15注释部分无用代码 7天后不还原可直接删除 add by hyy 20171215
 *
 */
public interface ZyShopService {

//	/**
//	 *
//	 * @Description: (查询选中店铺)
//	 * @param  positionCode
//	 * @return List<ZySysShop>    返回与岗位关联的虚拟店铺（包含产品线与数据来源）
//	 */
//	SysPositionShopVo getSelectedShopCodes(String positionCode) ;
	
//	/**
//	 * @Description: (获取权限配置模块的初始化信息，包括：1、虚拟店铺列表 2、产品线店铺列表(虚拟+常规) 3、产品线id列表  4、数据来源code列表)
//	 */
//	InitAuthorityInfo initAuthorityInfo() ;

//	/**
//	 * 保存或更新岗位关联的权限店铺id
//	 * @param brandId
//	 * @param shopCodes
//	 * @param positionCode
//	 * @param deptCode
//	 * @param groupId
//	 * @return 返回保存/更新提示信息msg
//	 */
//	CommonResult saveOrUpateSysPositionShop(Integer brandId,
//		String[] shopCodes, String positionCode, String deptCode, int groupId) throws ParameterException;

//	/**
//	 * 紫燕新增产品线，同时生成对应产品线下的虚拟店铺,或修改产品线名称，同时修改虚拟店铺名称
//	 * @param sysBrand
//	 */
//	void saveOrUpdateBrandFictiousShop(SysBrand sysBrand);

	/**
	 * 查询所有店铺codes字符串
	 * @return
	 */
	String queryAllShopCodes();

	/**
	 * 20171213
	 * 获取商城店铺编码
	 * @return
	 */
	String getZyMallShopCode();
	
}
