/**
 * 商品选择组件
 *
 * */
define(['jquery', 'vue', 'nui'], function ($, Vue, nui) {

	var $template = `
	 <!-- 选择商品弹窗结构 -->
          <el-dialog title="选择商品" v-model="chooseGoodsVisible"  content-min-height="475px" size="middle" :modal-append-to-body="false" :close-on-click-modal="false" class="g-wrapper" custom-class="condition-dialog" :vetically="true" @close="goodsClose" nesting>
            <div v-loading="goodsLoading" 
                    element-loading-text="拼命加载中">
            <el-row class="tmp-choose__condition"  :gutter="20">
              <el-col :span="15"  class="condition-left" ref="conditionItem">
                <el-form :inline="true" :model="model" ref="goodsForm" >
                  <el-form-item label="商品名称：">
                    <el-form-grid  width="163">
                      <el-input v-model="model.title" placeholder="请输入商品名称"></el-input>
                    </el-form-grid>
                  </el-form-item>
                  <el-form-item label="商家编码：" style="margin-right: 0px;">
                    <el-form-grid  width="163">
                      <el-input v-model="model.outerId" placeholder="请输入商家编码"></el-input>
                    </el-form-grid>
                  </el-form-item>
                  <el-form-item label="商品分类：">
                    <el-form-grid  width="163">
                      <el-popover ref="goodspopover"
											v-model="cateDropTreeVisible"
											:width="droptreeWidth"
											placement="bottom-start"
											trigger="click"
											@show="showPopover"
											@hide="hidePopover"
											popper-class="tmp-droptree-popover">
									<el-input class="tmp-droptree-search" placeholder="输入关键字进行过滤" v-model="goodsFilter" ></el-input>
									<el-scrollbar wrap-class="tmp-droptree-scroll"
												  view-class="template-form-list">
										<el-tree ref="cateDropTreeInGoods"
										:data="dropTreeList" 
										show-checkbox
										node-key="code"
										:expand-on-click-node="false"
										 :filter-node-method="filterNode"
										  class="tmp-droptree-tree"></el-tree>
									</el-scrollbar>
									<div class="tmp-droptree-footer">
										<el-button size="mini" type="text" @click="cateDropTreeVisible=false">取消</el-button>
										<el-button type="primary" size="mini" @click="confirmCheck('cateDropTreeInGoods')">确定</el-button>
									</div>
								</el-popover>
								<el-input ref="goodsDropTreeInput" v-model="model.cateName"  readonly 
								@click.native="handleGoodsShowDropTree"  :icon="model.cateName? 'circle-close':''"
								:on-icon-click="handleIconClick"
								placeholder="请选择" 
								class="tmp-droptree-input" v-popover:goodspopover></el-input>
                    </el-form-grid>
                  </el-form-item>
                  <el-form-item label="商品价格：" style="margin-right: 0px;" prop="price" :rules="[{ validator: goodsPriceValid,trigger:'blur'}]">
                    <el-form-grid  width="163">
                      <el-row>
                        <el-col :span="11">
                          <el-input v-model="model.minPrice" placeholder="最小价格" @keyup.native="limitInput('minPrice')"  class="text-right"></el-input>
                        </el-col>
                        <el-col :span="2" style="text-align:center">~</el-col>
                        <el-col :span="11">
                          <el-input v-model="model.maxPrice" placeholder="最大价格"  @keyup.native="limitInput('maxPrice')"  class="text-right"></el-input>
                        </el-col>
                      </el-row>
                    </el-form-grid>
                  </el-form-item>
                  <el-form-item class="el-block condition-control">
                    <el-form-grid>
                      <el-button type="primary" @click="ns_search">搜索</el-button>
                      <el-button @click="ns_reset">重置</el-button>
                    </el-form-grid>
                  </el-form-item>
                </el-form>
                <el-table ref="goodsTable" :data="goodsData"  @select="selectRow" @select-all="selectAll" :key="ns_pagination.currPage" v-loading="tableLoading"  
                    element-loading-text="拼命加载中">
                  <el-table-column type="selection" width="40" align="center" ></el-table-column>
                  <el-table-column prop="title" label="商品名称" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="outerId" label="商家编码"show-overflow-tooltip width="120"></el-table-column>
                  <el-table-column label="操作" width="60" align="center">
                    <template scope="scope">
                    <el-popover
						  placement="bottom"
						  width="110"
						  trigger="click" >
						  <el-table  :data="goodsSku" :show-header="false" >
                  				<el-table-column label="sku"  width="110">
                  				<template scope="scope"> 					
                  					{{scope.row.skuId}}<br>
                  					库存：{{scope.row.stock}} 价格：{{scope.row.price}}
						  		</template>
						  		</el-table-column>
			          	  </el-table>
						   <el-button 	@click="handleDetails(scope.row)" type="text" slot="reference">SKU筛选</el-button>
						</el-popover>
                    </template>
                  </el-table-column>
                </el-table>
                <el-pagination v-if="ns_pagination.enable"
                  class="template-table-pagination"
                  layout="prev, pager, next"
                  :page-size="ns_pagination.currSize"
                  :current-page="ns_pagination.currPage"
                  :total="ns_pagination.total"
                  @current-change="pageChange">
                </el-pagination>
                </template>
              </el-col>
              <el-col :span="9" class="condition-right">
                <div class="tmp-choose__result">
                  <p class="title">已选择了{{goodsSelectedData.length}}件商品</p>
                  <el-scrollbar ref="tmpChooseScroll"
                                wrap-class="tmp-choose__scroll">
                    <ul class="tmp-choose__goods">
                      <li v-for="(goods,index) in goodsSelectedData">
                        <span class="g-name">{{goods.title}}</span>
                        <a @click="deleteSelectedGoods('goodsSelectedData',index,goods.id)"><i class="g-delete bui-delete"></i></a>
                      </li>
                    </ul>
                  </el-scrollbar>
                </div>
              </el-col>
            </el-row>
            </div>
            <div slot="footer" class="dialog-footer">
              <el-button @click="()=>{ this.chooseGoodsVisible = false}">取 消</el-button>
              <el-button type="primary" @click="saveGoods">确 定</el-button>
            </div>
          </el-dialog>
          <!-- /end 选择商品弹窗结构 -->

	`;

	// 分页对象
	var ns_pagination = {
		enable: true,
		total: 0,
		currPage: 1,
		currSize: 10
	};
	// 排序
	
	var ns_order = {
		orderKey: "create_time",
		orderDir: "desc"
	};


	


	/**
	 * 表格固定方法
	 *
	 */
	var built_in_methods = {
		
		//表格页数条数改变
		sizeChange: function (val) {
			this.ns_pagination.currSize = val;
			this.ns_pagination.currPage = 1;
			this.reload();
		},
		//当前页改变
		pageChange: function (val) {
			this.tableLoading = true;
			this.ns_pagination.currPage = val;
			this.reload();
		},
		//重置分页信息
		resetPagination: function(){
			this.ns_pagination = {
					enable: false,
					total: 0,
					currPage: 1,
					currSize: 10
				};
		},
		search: function (params) {
			this.ns_pagination.currPage = 1;
			this.searchMap = Object.assign({}, params);
			this.reload();
		},
		reload: function () {
			var limit = this.ns_limit;
			var order = this.ns_order;
			var params = Object.assign({}, limit, order, this.searchMap);
			this.ns_table_ajax(params);
		},
		ns_table_ajax: function (params) {
			var _this = this;
			$.post(_this.goodsTableUrl,params).done(function (resp) {
				if (resp.success && resp.result.data.length > 0){
					_this.goodsData = resp.result.data;
					_this.$set(_this.ns_pagination,"total",resp.result.recordsTotal);
					_this.$set(_this.ns_pagination,"enable",true);
				} else {
					_this.goodsData = [];
					_this.$set(_this.ns_pagination,"enable",false);
				}
				_this.$nextTick(function(){
					setTimeout(()=>{				
						_this.goodsLoading = false;
					},200)
					_this.toggleSelection(_this.goodsSelectedData,_this.goodsData);
				})
				_this.tableLoading = false;
				
			}).fail(function (resp) {
				console.log(resp);
				_this.$nextTick(function(){
					setTimeout(()=>{
						_this.goodsLoading = false;
					
					},200)
				})
				_this.tableLoading = false;
			});
		},
		ns_search: function () {
			var params = {
				searchMap: {
					title: this.model.title,
					outerId: this.model.outerId,
					minPrice: this.model.minPrice,
					maxPrice: this.model.maxPrice,
					cate: this.model.cate
				}
			}
			this.search(params);
		},
		// 重置查询条件
		ns_reset: function () {
			this.$set(this,"model",this.$options.data().model);
			this.searchMap = {};
			this.reload();
		},
	}

	/**
	 * 数据对象
	 *
	 */
	var $data = function(){
		return {
			goodsData: [],//商品列表数据
			chooseGoodsVisible: false, 
			model:{
				title: "",
				outerId: "",
				cate:"",
				cateName: "",
				minPrice: null,
				maxPrice: null
			},
			goodsFilter: "", //商品分类下拉树过滤文本
			goodsSelectedData: [], // 选中的商品表格数据
			confirmGoodsData: [], //确认选择的商品数据
			ns_pagination: ns_pagination, // 分页参数
			ns_order: ns_order, // 排序
			custom: "custom",
			searchMap: {},
			goodsTableUrl: ctx + "/base/common/queryKdGoodsList",
			goodsCategoryUrl: ctx+"/base/common/loadGoodsCategoryTree",
			goodsDetailsUrl: ctx+ "/base/common/queryGoodsSkuList",
			goodsSku: [],
			// 下拉树配置项：
			cateDropTreeVisible: false,
			dropTreeList: [],
			droptreeWidth: '',
			// 下拉树配置项/end
			goodsLoading: true,
			tableLoading: false,
		}
	};
	
	var props = {
		goods: {
			type: Array,
			default: function(){
				return []
			}
		},
		goodsMaxCount: {
			type: Number,
			default: function(){
				return 500;
			}
		}
	};

	/**
	 * 自定义方法
	 * 
	 */
	var $methods = {
		//删除已选择商品
		deleteSelectedGoods: function($dataName,index,id){
			this.$data[$dataName].splice(index,1);
			//表格是否渲染
			if(this.$refs.goodsTable){
				for(var i = 0; i < this.goodsData.length; i++ ){
					if(id === this.goodsData[i].id){
						this.$refs.goodsTable.toggleRowSelection(this.goodsData[i],false);
						break;
					}
				}
			}
		},
		//外部调用删除
		deleteGoods: function(data){
			this.deleteSelectedGoods('goodsSelectedData',data);
			this.$set(this,'confirmGoodsData',this.goodsSelectedData);
		},
		//显示浮层时触发
		showPopover(){
			if(this.model.cate && this.model.cate != '')
				this.$refs.cateDropTreeInGoods.setCheckedKeys(String(this.model.cate).split(','));
		},
		//隐藏浮层
		hidePopover(){
			if(this.model.cate && this.model.cate != '')
				this.$refs.cateDropTreeInGoods.setCheckedKeys([]);
		},
		//价格验证
    	 goodsPriceValid(rule,val,callback){
    		 if(parseInt(this.model.minPrice) > parseInt(this.model.maxPrice)){
     			callback(new Error(" "));
     			this.$notify.warning("最小价格不能大于最大价格");
     		}
     		else
     			callback();
    	 },
    	 //价格限制输入
    	 limitInput(name){
    		 this.model[name]= this.LimitInputNumber(this.model[name]);	
    	 },
    	 //输入大于零小数点只有两位得数字
    	 LimitInputNumber(data){
    		 data = data.replace(/[^\d\.]/g,'');
    		 var index = data.indexOf('.');
    		 if(index != -1){
    			 data = data.substring(0,index+1)+data.substr(index+1,2).replace(/[^\d]/g,'');
    		 }
    		 return data;
    	 },
		// tree 方法
		filterNode: function (value, data) {
			if (!value) {
				return true;
			}
			if (data.label) {
				return data.label.indexOf(value) !== -1;
			}
			return false;
		},
		//打开选择商品弹窗
		showChooseGoods: function(){
			this._init();
			this.chooseGoodsVisible = true;
			this.$set(this,'goodsSelectedData',[].concat(this.confirmGoodsData));
		},
		open: function(){
			this.showChooseGoods();
		},
		// 初始化方法
		_init: function () {
			this.ns_search();
			this.resetPagination();
			this.initDropTree();
			this.$set(this,"searchMap",{});
		},
		
		/**
		 * 关闭
		 */
		goodsClose: function () {
			this.$set(this,"model",this.$options.data().model);
			this.$data.goodsVisible = false;
			this.goodsLoading =true;
		},
		//保存商品
		saveGoods: function(){
			var goods = this.$data.goodsSelectedData
			if(goods.length > this.goodsMaxCount){
				this.$notify.warning("最多选择"+this.goodsMaxCount+"件商品");
			}else{
				this.$set(this,'confirmGoodsData',goods);
				this.callback();
				this.$data.chooseGoodsVisible = false;
			}
		},
		/**
		 * 回调
		 */
		callback: function () {
			var opts = {
				goods: this.handleGoodsData(this.confirmGoodsData),
			};
			this.$emit('callback', opts);
		},
		// 选择商品下拉树 
		handleGoodsShowDropTree: function () {
			this.droptreeWidth = this.$refs.goodsDropTreeInput.$el.clientWidth;
		},
		//下拉树确定选中
		confirmCheck: function(dropTree){
			var checkArr = [];
			checkArr = this.$refs[dropTree].getCheckedNodes();
			var checkArrLabel = [];
			var checkArrCode = [];
			for (var i = 0; i < checkArr.length; i++) {
				checkArrLabel.push(checkArr[i].label);
				checkArrCode.push(checkArr[i].code);
			}
			var cate=checkArrCode.join(',');
			this.model.cateName = checkArrLabel.join(',');
			this.model.cate = cate; 
			this.cateDropTreeVisible = false;
		},
		// 初始化商品分类下拉树
		initDropTree: function () {
			var _this = this;
			$.post(_this.goodsCategoryUrl).done(function (resp) {
				if (resp.success && resp.result) {
					_this.dropTreeList = resp.result;
				} else {
					_this.dropTreeList = [];
				}
			}).fail(function (resp) {
				console.log(resp);
			});
		},
		//点击下拉树输入框图标触发
	   	 handleIconClick(){
	   		 this.model.cateName = '';
	   		 this.model.cate = '';
	   	 },
		//商品详情
		handleDetails: function(data){
			var _this = this;
			$.post(_this.goodsDetailsUrl,{sysItemId: data.sysItemId,outerId: data.outerId,title: data.title}).done(function (resp) {
				if (resp.success && resp.result.length> 0) {
					_this.$set(_this,"goodsSku",resp.result);
				} else {
					console.log(resp);
				}
			}).fail(function (resp) {
				console.log(resp);
			});
		},
	
		//数组去重
		uniqueArray: function (array){ 
			var r = []; 
			for(var i = 0, l = array.length; i < l; i++) { 
				for(var j = i + 1; j < l; j++) 
					if (array[i].id === array[j].id)
						j = ++i; 
						r.push(array[i]); 
			} 
			return r; 
		},
	
		//处理返回的商品数据
		handleGoodsData: function(data){
			var goods = [];
			data.map((item,index)=>{
				goods.push({
					id:item.id,
					title:item.title,
					price:item.price,
					pictureUrl:item.pictureUrl
				});
			})
			return goods;
		},
		resetData: function(){
			this.$set(this,"goodsSelectedData",this.$options.data().goodsSelectedData);
			this.$set(this,"confirmGoodsData",this.$options.data().confirmGoodsData);
			this.callback();
		},
		toggleSelection: function(selected,rows){
			for(var i = 0; i<rows.length; i++){
				for(var j = 0; j<selected.length; j++){
					if(rows[i].id == selected[j].id ){
						this.$refs.goodsTable.toggleRowSelection(rows[i],true);
						break;
					}
				}
			}
		},
		//选中某行
		selectRow: function(selected,row){
			var showSelectedList = this.goodsSelectedData;
			var check = false;
			for(var i = 0; i< selected.length; i++){
				if(selected[i].id == row.id){
					check = true;
					break;
				}
			}
			if(check){
				showSelectedList.push(row);
			}else{
				//删除未勾选商品数据
				for(var j = 0; j < showSelectedList.length; j++){
					if(showSelectedList[j].id == row.id){
						this.deleteSelectedGoods('goodsSelectedData',j,showSelectedList[j].id);
						break;
					}
				}
			}
		},
		//表格选择所有
		selectAll: function(selected){
			var goodsList = this.goodsData;
			var selectList = this.goodsSelectedData;
			if(selected.length == 0){
				for(var i = 0; i< goodsList.length; i++)
					this.selectRow(selected,goodsList[i]);
			}else{
				this.goodsSelectedData =this.uniqueArray(this.goodsSelectedData.concat(selected));
			}
		},
	};
	var computed = {
			"ns_limit": function(){
				return {
					start: (this.ns_pagination.currPage-1)*this.ns_pagination.currSize,
					length: this.ns_pagination.currSize
				}
			}
		};
	var watch = {
		"goodsFilter": function(val){
			this.$refs.cateDropTreeInGoods.filter(val);
		},
		
		"goods": function(val){
			if(val instanceof Array){
				this.$set(this,"goodsSelectedData",[].concat(val));
				this.$set(this,"confirmGoodsData",[].concat(val));
			}else{
				throw new Error("商品数据类型初始化错误");
			}
			
		}
		
		

	};
	// 商品选择组件定义
	Vue.component("ns-goods-select", {
		template: $template,
		data: $data,
		methods: Object.assign(built_in_methods, $methods),
		props: props,
		computed: computed,
		watch: watch
	});

});