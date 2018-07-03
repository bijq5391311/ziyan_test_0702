//获取节点下所有子节点的id
(function() {
	this.TreeUtil = class {
		//获取节点下所有子节点的id
		static getTreeChildIds(node) {
			 var rootIds = [];
			 var ids = [];
			 if(node.children){
				  for(var i = 0; i < node.children.length; i++){
					  ids = this.getTreeChildIds(node.children[i]);
					  ids.push(node.children[0].id);
					  rootIds = rootIds.concat(ids);
				  }
			  }
			 return rootIds;
		}
	}
	return TreeUtil;
})(this)