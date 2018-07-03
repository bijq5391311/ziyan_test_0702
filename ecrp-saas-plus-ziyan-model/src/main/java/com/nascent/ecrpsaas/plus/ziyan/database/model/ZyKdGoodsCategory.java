package com.nascent.ecrpsaas.plus.ziyan.database.model;

import java.util.List;
import java.util.Map;

import com.nascent.ecrpsaas.base.util.OptionUtil;
import com.nascent.ecrpsaas.base.util.TreeNode;
import com.nascent.ecrpsaas.base.util.UtilTree;
import com.nascent.ecrpsaas.components.options.OptionItem;
import com.nascent.ecrpsaas.database.model.KdGoodsCategory;
import com.nascent.plugins.spring.SpringContext;
import com.nascent.plugins.sqlinxml.annotation.Select;

/**
 * @author ZRP
 */
@Select()
public class ZyKdGoodsCategory extends KdGoodsCategory {
	
	private static final long serialVersionUID = 1L;
	
	public static ZyKdGoodsCategory dao() {
	    return SpringContext.me()
		    .getModel(ZyKdGoodsCategory.class);
	}
	/**
	 * 查询商品分类中的一级分类
	 * @return
	 */
	public List<OptionItem> queryParentCategory(){
		return OptionUtil.queryOptions("ziyan.KdGoodsCategory.queryParentCategory");
	}
	
	/**
	 * 获取商品有根分类树.
	 * @return
	 */
	public TreeNode loadCateGoryRootTree(Map<String, Object> map){
		UtilTree categoryTree = new UtilTree("ziyan.KdGoodsCategory.queryTreeList",map);
		return categoryTree.getTree();
	}
	
	/**
	 * （公共商品组件）生成商品分类无根下拉树
	 * @return
	 */
	public List<TreeNode> loadCategoryTree(Map<String, Object> map){
		UtilTree utilTree = new UtilTree("ziyan.KdGoodsCategory.loadCategoryTree",map);
		return utilTree.getNoRootTree();
	}

}
