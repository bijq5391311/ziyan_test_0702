/**
 * 商品选择组件
 *
 * */
define(['jquery', 'vue', 'nui'], function ($, Vue, nui) {

	
	var $busTogglesTemplate = `<div class="tmp-toggles">
    <div class="tmp-choose__content"  ref="toggleContent">
      <slot></slot>
    </div>
    <div class="tmp-toggles__footer" v-show="isOverflow"
         @click="handleToggleFooter"
         @mouseenter="hovering = true"
         @mouseleave="hovering = false">
      <transition name="arrow-slide">
        <i :class="[toggleIconClass, { 'hovering': hovering }]"></i>
      </transition>
      <transition name="text-slide">
        <span v-show="hovering">{{ controlText }}</span>
      </transition>
    </div>
  </div>`
		
	Vue.component("bus-toggles",{
		template: $busTogglesTemplate,
		data () {
		      return {
//		        isExpanded: false,
		    	//商品选择完成后默认展开 
		    	isExpanded: true,
		        isOverflow: false,
		        hovering: false,
		        contentHeight: 0
		      }
		    },
		    props: {
		      maxHeight: {
		        type: Number,
		        default: 180
		      }
		    },
		    watch: {
		        contentHeight (val) {
		        	// 监听内容高度变化，对其是否显示“展开收缩按钮”
		          this.showToggleModel()
		        }
		    },
		    computed: {
		      // 选择商品 列表展开收缩切换结构 状态值
		      toggleIconClass () {
		        return this.isExpanded ? 'el-icon-caret-top' : 'el-icon-caret-bottom'
		      },
		      controlText () {
		        return this.isExpanded ? '收缩' : '展开'
		      }
		      // 选择商品 列表展开收缩切换结构 状态值/end
		    },
		    methods: {
		      showToggleModel () {
		    	  this.$nextTick(function(){

				        if (this.contentHeight > this.maxHeight) {
				          // 设置内容区域高度超出隐藏
				          this.$refs.toggleContent.style.overflow = 'hidden'
				          this.$refs.toggleContent.style.maxHeight = this.maxHeight + 'px'
				          // 显示底部
				          this.isOverflow = true
				        }
		    	  })
		      },
		      handleToggleFooter () {
		        this.isExpanded = !this.isExpanded
		        if (this.isExpanded) {
		          this.$refs.toggleContent.removeAttribute('style')
		        } else {
		          this.$refs.toggleContent.style.overflow = 'hidden'
		          this.$refs.toggleContent.style.maxHeight = this.maxHeight + 'px'
		        }
		      }
		    },
		    mounted () {
		      this.showToggleModel()
		      this.contentHeight = Number(this.$refs.toggleContent.clientHeight)
		    }
	})
	
	
	
	var $template = `
					<!-- 选择商品结果列表 列表展开收缩切换结构-->
					<div>
                        <bus-toggles :max-height="180" :class="isOr? 'is-double or': 'is-double'" v-if="showConditionsSelect" ref="togglesElement">
                          <el-row class="tmp-choose" :gutter="20" >
                            <el-col :span="12">
                              <div class="tmp-choose__title"><el-button type="primary" @click="showChooseGoods"><i class="bui-select-goods"></i>选择商品</el-button><span  class="total">已选择{{confirmGoodsData.length}}个商品</span></div>
                              <ul class="tmp-choose__goods">
                                <li v-for="(goods,index) in confirmGoodsData" :key="index" >
                                  <span class="g-name">{{goods.title}}</span>
                                  <i class="g-delete bui-delete" @click="()=>{deleteSelectedGoods('confirmGoodsData',index,goods.id); callback()}"></i>
                                </li>
                                <li v-if="confirmGoodsData.length==0">对不起，查阅不到相关数据！</li>
                              </ul>
                            </el-col>
                            <el-col :span="12">
                              <div class="tmp-choose__title"><el-button type="primary" @click="showChooseCondition"><i class="bui-select-condition"></i>选择条件</el-button><span  class="total">已选择{{conditionLength}}个条件</span></div>
                              <ul class="tmp-choose__goods">
                                <li v-if="confirmConditionData.title.length==0&&confirmConditionData.outerId.length==0&&confirmConditionData.price.length==0&&confirmConditionData.cate.length==0">对不起，查阅不到相关数据！</li>
                                <li v-for="(item,index) in confirmConditionData.title" :key="index"  v-if="item.value != ''">
                                  <span class="g-name" >商品名称包含“{{item.value}}”关键字</span>
                                  <i class="g-delete bui-delete"  @click="()=>{deleteCondition('title',index);callback();}"></i>
                                </li>
                                <li v-for="(item,index) in confirmConditionData.outerId" :key="index" v-if="item.value != ''">
                                  <span class="g-name">商家编码包含“{{item.value}}”关键字</span>
                                  <i class="g-delete bui-delete"  @click="()=>{deleteCondition('outerId',index);callback();}"></i>
                                </li>
                                <li v-for="(item,index) in confirmConditionData.price" :key="index"  v-if="item.minPrice != '' || item.maxPrice != ''">
                                  <span class="g-name" v-if="item.minPrice != '' && item.maxPrice == ''"> 
                              			商品单价大于{{item.minPrice}}元</span>
                              	<span class="g-name" v-else-if="item.minPrice == '' && item.maxPrice != ''"> 
                                  	商品单价不小于{{item.maxPrice}}元</span>
                                  <span class="g-name"	 v-else-if="item.minPrice != '' && item.maxPrice != ''">商品单价位于{{item.minPrice}}到{{item.maxPrice}}元之间
                                  </span>
                                  <i class="g-delete bui-delete"  @click="()=>{deleteCondition('price',index);callback()}"></i>
                                </li>
                                <li v-for="(item,index) in confirmConditionData.cate" :key="index" v-if="item.cateName != '' && item.cid != ''">
                                  <span class="g-name">商品所属分类：{{item.cateName}}</span>
                                  <i class="g-delete bui-delete"  @click="()=>{deleteCondition('cate',index);callback();}"></i>
                                </li>
                              </ul>
                            </el-col>
                          </el-row>
                        </bus-toggles>
                        <bus-toggles :max-height="180" v-else ref="togglesElement">
                          <el-row class="tmp-choose" >
                            <el-col :span="24">
                              <div class="tmp-choose__title"><el-button type="primary" @click="showChooseGoods"><i class="bui-select-goods"></i>选择商品</el-button><span  class="total">已选择{{confirmGoodsData.length}}个商品</span></div>
                              <ul class="tmp-choose__goods">
                                <li v-for="(goods,index) in confirmGoodsData" :key="index">
                                  <span class="g-name">{{goods.title}}</span>
                                  <i class="g-delete bui-delete" @click="()=>{deleteSelectedGoods('confirmGoodsData',index,goods.id);callback()}"></i>
                                </li>
                              </ul>
                            </el-col>
                          </el-row>
                        </bus-toggles>
                        <!-- /end 选择商品结果列表 列表展开收缩切换结构-->
                        <!-- 选择商品弹窗结构 -->
          <el-dialog title="选择商品" v-model="chooseGoodsVisible" size="middle" :modal-append-to-body="false"  class="g-wrapper" custom-class="condition-dialog"  :close-on-click-modal="false" @close="goodsClose" content-min-height="475px" nesting>
           <div  v-loading="goodsLoading"  
                    element-loading-text="拼命加载中">
            <el-row class="tmp-choose__condition"  :gutter="20">
              <el-col :span="15"  class="condition-left" ref="conditionItem">
                <el-form :inline="true" :model="model" ref="goodsForm" >
                  <el-form-item label="商品名称：">
                    <el-form-grid width="156">
                      <el-input v-model="model.title" placeholder="请输入商品名称"></el-input>
                    </el-form-grid>
                  </el-form-item>
                  <el-form-item label="商家编码：" style="margin-right:0;">
                    <el-form-grid width="156">
                      <el-input v-model="model.outerId" placeholder="请输入商家编码"></el-input>
                    </el-form-grid>
                  </el-form-item>
                  <el-form-item label="商品分类：">
                    <el-form-grid  width="156">
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
								@click.native="handleGoodsShowDropTree" :icon="model.cateName? 'circle-close':''"
								:on-icon-click="handleIconClick"  placeholder="请选择" 
								class="tmp-droptree-input" v-popover:goodspopover></el-input>
                    </el-form-grid>
                  </el-form-item>
                  <el-form-item label="商品价格：" style="margin-right:0;" prop="price" :rules="[{ validator: goodsPriceValid,trigger:'blur'}]">
                    <el-form-grid  width="156">
                      <el-row>
                        <el-col :span="11">
                          <el-input  v-model="model.minPrice" placeholder="最小价格" @keyup.native="limitInput('minPrice')" class="text-right"></el-input>
                        </el-col>
                        <el-col :span="2" style="text-align:center">~</el-col>
                        <el-col :span="11">
                          <el-input  v-model="model.maxPrice" placeholder="最大价格"  @keyup.native="limitInput('maxPrice')" class="text-right"></el-input>
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
                <el-table ref="goodsTable" :data="goodsData" 
                  @select="selectRow" 
                  @select-all="selectAll" 
                 :key="ns_pagination.currPage"
                 	v-loading="tableLoading"  
                    element-loading-text="拼命加载中">
                 <el-table-column  type="selection" width="40" align="center"> </el-table-column>
                  <el-table-column property="title" label="商品名称" show-overflow-tooltip></el-table-column>
                  <el-table-column property="outerId" label="商家编码" show-overflow-tooltip width="120"></el-table-column>
                  <el-table-column label="操作" width="100" align="center">
                    <template scope="scope">
                    <el-popover
						  placement="bottom"
						  width="110"
						  trigger="click" >
						  <el-table :data="goodsSku" :show-header="false">
                  				<el-table-column label="sku">
                  				<template scope="scope"> 					
                  					{{scope.row.skuId}}<br>
                  					库存：{{scope.row.stock}}<br>
                  					价格：{{scope.row.price}}
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
                                wrap-class="tmp-choose__scroll"
                                outsider>
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
          
            <!-- 选择条件弹窗结构 -->
          <el-dialog title="选择条件"  v-model="chooseConditionVisible" content-min-height="475px"  size="middle" :modal-append-to-body="false" :vetically="true" :close-on-click-modal="false"  @close="conditionClose" nesting  class="r-wrapper" custom-class="condition-dialog">
             <div  v-loading="conditionLoading"  
                    element-loading-text="拼命加载中">
            <el-row class="tmp-choose__condition rules"  :gutter="20">
              <div   class="condition-left" ref="conditionItem2" >
                <el-form  ref="conditionForm" label-width="70px" :model="chooseCondition">
                  <el-form-item label="商品名称：" v-for="(name, index) in chooseCondition.title" :key="index">
                    <el-form-grid size="md">
                      <el-input placeholder="请输入商品名称" v-model="name.value"></el-input>
                    </el-form-grid>
                    <el-form-grid size="xxs" v-show="index !== chooseCondition.title.length - 1">
                      <el-select  placeholder="选择"  v-model="name.condition" class="is-gray">
                        <el-option label="并且" value="and"></el-option>
                        <el-option label="或者" value="or"></el-option>
                      </el-select>
                    </el-form-grid>
                    <el-form-grid v-show="index !== chooseCondition.title.length - 1"><el-button @click="deleteItem(chooseCondition.title, index)" type="icon"><i class="bui-delete"></i></el-button></el-form-grid>
                    <el-form-grid v-show="index === chooseCondition.title.length - 1"><el-button @click="addItem(chooseCondition.title,'title',index)" type="icon"><i class="bui-add"></i></el-button></el-form-grid>
                  </el-form-item>
                  <el-form-item label="商家编码：" v-for="(code, index) in chooseCondition.outerId" :key="index">
                    <el-form-grid size="md">
                      <el-input placeholder="请输入商家编码" v-model="code.value"></el-input>
                    </el-form-grid>
                    <el-form-grid size="xxs" v-show="index !== chooseCondition.outerId.length - 1">
                      <el-select  placeholder="选择"  v-model="code.condition" class="is-gray">
                        <el-option label="并且" value="and"></el-option>
                        <el-option label="或者" value="or"></el-option>
                      </el-select>
                    </el-form-grid>
                    <el-form-grid v-show="index !== chooseCondition.outerId.length - 1"><el-button @click="deleteItem(chooseCondition.outerId, index)" type="icon"><i class="bui-delete"></i></el-button></el-form-grid>
                    <el-form-grid v-show="index === chooseCondition.outerId.length - 1"><el-button @click="addItem(chooseCondition.outerId,'outerId',index)" type="icon"><i class="bui-add"></i></el-button></el-form-grid>
                  </el-form-item>
                  <el-form-item label="商品价格：" v-for="(item, index) in chooseCondition.price"  :key="index" prop="price"  :rules="[{ validator: (rule,val,callback)=>{conditionPriceValid(rule,val,callback,index)},trigger:'blur'}]" >
                    <el-form-grid size="md">
                      <el-row>
                        <el-col :span="11">
                          <el-input  placeholder="最小价格" @keyup.native="conditionLimitInput('minPrice',index)" class="text-right" v-model="item.minPrice" :key="index+'min'"></el-input>
                        </el-col>
                        <el-col :span="2" class="text-center">~</el-col>
                        <el-col :span="11">
							<el-input  placeholder="最大价格"  @keyup.native="conditionLimitInput('maxPrice',index)"   class="text-right" v-model="item.maxPrice" :key="index+'max'"></el-input>
                        </el-col>
                      </el-row>
                    </el-form-grid>
                    <el-form-grid size="xxs" v-show="index !== chooseCondition.price.length - 1">
                      <el-select  placeholder="选择"  v-model="item.condition" class="is-gray">
                        <el-option label="并且" value="and"></el-option>
                        <el-option label="或者" value="or"></el-option>
                      </el-select>
                    </el-form-grid>
                    <el-form-grid v-show="index !== chooseCondition.price.length - 1"><el-button @click="deleteItem(chooseCondition.price, index)" type="icon"><i class="bui-delete"></i></el-button></el-form-grid>
                    <el-form-grid v-show="index === chooseCondition.price.length - 1"><el-button @click="addItem(chooseCondition.price,'price',index)" type="icon"><i class="bui-add"></i></el-button></el-form-grid>
                  </el-form-item>
                  <el-form-item label="商品分类：" v-for="(item, index) in chooseCondition.cate"  :key="index">
                    <el-form-grid size="md"  :key="index">
                      		<el-popover ref="conditionpopover"
											v-model="item.cateVisible"
											:width="droptreeWidth"
											placement="bottom-start"
											trigger="click" 
											@show="showPopover('condition','cateDropTreeInCondition',index)"
											@hide="hidePopover('condition','cateDropTreeInCondition',index)"
											popper-class="tmp-droptree-popover">
								<el-input class="tmp-droptree-search" placeholder="输入关键字进行过滤" v-model="conditionsFilter[index]" ></el-input>
									<el-scrollbar wrap-class="tmp-droptree-scroll"
												  view-class="template-form-list">
										<el-tree ref="cateDropTreeInCondition" 
										 node-key="code" 
										 show-checkbox 
										 :data="dropTreeList" 
										 :expand-on-click-node="false" 
										 :filter-node-method="filterNode"
										  class="tmp-droptree-tree"
										 ></el-tree>
									</el-scrollbar>
									<div class="tmp-droptree-footer">
										<el-button size="mini" type="text" @click="()=>{item.cateVisible = false; $refs['conditionpopover'][index].showPopper = false;}">取消</el-button>
										<el-button type="primary" size="mini" @click="()=>{item.cateVisible = false;confirmCheck('cateDropTreeInCondition','condition',index)}">确定</el-button>
									</div>
									<el-input ref="conditionDroptreeInput" v-model="item.cateName"  readonly 
								@click.native="handleConditionShowDropTree(index)" :icon="item.cateName? 'circle-close':''"
								:on-icon-click="()=>{handleIconClick(index,'condition')}" 
								placeholder="请选择" 
								class="tmp-droptree-input"slot="reference" ></el-input>
								</el-popover>
                    </el-form-grid>
                    <el-form-grid size="xxs" v-show="index !== chooseCondition.cate.length - 1">
                      <el-select  placeholder="选择"  v-model="item.condition" class="is-gray">
                        <el-option label="并且" value="and"></el-option>
                        <el-option label="或者" value="or"></el-option>
                      </el-select>
                    </el-form-grid>
                    <el-form-grid v-show="index !== chooseCondition.cate.length - 1"><el-button @click="deleteItem(chooseCondition.cate,index)" type="icon"><i class="bui-delete"></i></el-button></el-form-grid>
                    <el-form-grid v-show="index === chooseCondition.cate.length - 1"><el-button @click="addItem(chooseCondition.cate,'cate',index)" type="icon"><i class="bui-add"></i></el-button></el-form-grid>
                  </el-form-item>
                  <el-form-item >
                    <el-form-grid>
                      <el-button type="primary" @click="goodsPreview">商品预览</el-button>
                    </el-form-grid>
                  </el-form-item>
                </el-form>
              </div>
              <div class="condition-right">
                <el-table :data="goodsData" 
                v-loading="tableLoading"  
                    element-loading-text="拼命加载中" >
                  <el-table-column property="title" label="商品名称" show-overflow-tooltip></el-table-column>
                  <el-table-column property="outerId" label="商家编码" show-overflow-tooltip width="120"></el-table-column>
                </el-table>
                <el-pagination v-if="ns_pagination.enable"
                  class="template-table-pagination"
                  layout="prev, pager, next"
                  :page-size="ns_pagination.currSize"
                  :current-page="ns_pagination.currPage"
                  :total="ns_pagination.total"
                  @current-change="pageChange">
                </el-pagination>
              </div>
            </el-row>
            <br>
            </div>
            <div slot="footer" class="dialog-footer">
              <el-button @click="chooseConditionVisible = false">取 消</el-button>
              <el-button type="primary" @click="saveCondition">确 定</el-button>
            </div>
          </el-dialog>
          <!-- /end 选择条件弹窗结构 -->
          </div>

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
			_this.tableLoading = true;
			$.post(_this.goodsTableUrl,params).done(function (resp) {
				if (resp.success && resp.result.data.length > 0){
					_this.$set(_this,'goodsData',resp.result.data);
					_this.$set(_this.ns_pagination,"total",resp.result.recordsTotal);
					_this.$set(_this.ns_pagination,"enable",true);
					
				} else {
					_this.goodsData = [];
					_this.$set(_this.ns_pagination,"enable",false);
				}
				setTimeout(()=>{
					_this.goodsLoading = false;
					_this.conditionLoading = false;
				},200)
				if(_this.chooseGoodsVisible){
					_this.$nextTick(function(){
						_this.toggleSelection(_this.goodsSelectedData,_this.goodsData);
					})
				}
				_this.tableLoading = false;
			}).fail(function (resp) {
				console.log(resp.msg);
				_this.$nextTick(function(){
					setTimeout(()=>{
						_this.goodsLoading = false;
						_this.conditionLoading = false;
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
	
	var originalCondition ={
			title: [{
				value: "",
				condition: ""
			}],
			outerId: [{
				value: "",
				condition: ""
			}],
			price:[{
				minPrice: "",
				maxPrice: "",
				condition: ""
			}],
			cate: [{
				cateName: "",
				cid: "",
				condition: "",
				cateVisible: false
			}]
	}

	
	var props = {
		goods: {
			type: Array,
			default: function(){
				return []
			}
		},
		conditions: {
			type: Object,
			default: function(){
				return originalCondition
			}
		},
		goodsMaxCount: {
			type: Number,
			default: function(){
				return 500;
			}
		},
		showConditionsSelect:{
			type: Boolean,
			default: function(){
				return false;
			}
		},
		goodsTableUrl: {
			type: String,
			default:function(){
				return ctx + "/base/common/queryKdGoodsList";
			}
		},
		goodsCategoryUrl:{
			type: String,
			default:function(){
				return ctx+"/base/common/loadGoodsCategoryTree";
			},
		},
		goodsDetailsUrl:{
			type: String,
			default:function(){
				return ctx+ "/base/common/queryGoodsSkuList";
			}
		},
		isOr:{
			type:Boolean,
			default: function(){
				return false;
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
		//显示浮层时触发
		showPopover(type,dropTree,index){
			if(type){
				this.$refs[dropTree][index].setCheckedKeys(String(this.chooseCondition.cate[index].cid).split(','));
			}else{
				if(this.model.cate && this.model.cate != '')
					this.$refs.cateDropTreeInGoods.setCheckedKeys(String(this.model.cate).split(','));
			}
			
		},
		//隐藏浮层触发
		hidePopover(type,dropTree,index){
			if(type){
				this.$refs[dropTree][index].setCheckedKeys(String(this.chooseCondition.cate[index].cid).split(','));
			}else{
				this.$refs.cateDropTreeInGoods.setCheckedKeys([]);
			}
		},
		//价格验证
		conditionPriceValid(rule,val,callback,index){ 
    		if(parseInt(this.chooseCondition.price[index].minPrice) > parseInt(this.chooseCondition.price[index].maxPrice)){
    			callback(new Error(""));
    			this.$notify.warning("最小价格不能大于最大价格");
    		}
    		else
    			callback();
    	 },
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
    	//条件价格限制输入
    	 conditionLimitInput(name,index){
    		 this.chooseCondition.price[index][name] = this.LimitInputNumber(this.chooseCondition.price[index][name]);	
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
			this.$set(this,'goodsSelectedData',[].concat(this.confirmGoodsData));
			this.chooseGoodsVisible = true;
		},
		//打开选择条件
		showChooseCondition: function(){
			this._init();
			var conditions = this.confirmConditionData;	
			this.initConditions(conditions);
			this.$set(this,'chooseCondition',$.extend(true,{},conditions));
			this.chooseConditionVisible = true;	
		},
		//初始化回显条件
		initConditions(conditions){
			var maxlength = conditions.cate.length+conditions.outerId.length+conditions.price.length+conditions.title.length;
			if(maxlength>5){
				this.$children[0].isOverflow = true;
			}
			if (!conditions.title || conditions.title.length == 0) {
				conditions.title = [{
						value:"",
						condition:""
				}]
			}
			if(!conditions.outerId || conditions.outerId.length == 0){
				conditions.outerId = [{
						value:"",
						condition:""
				}]
			}
			if(!conditions.price || conditions.price.length == 0){
				conditions.price = [{
						minPrice:"",
						maxPrice:"",
						condition:""
				}]
			}
			if(!conditions.cate || conditions.cate.length == 0){
				conditions.cate = [{
						cid:"",
						condition:"",
						cateName:"",
						cateVisible:""
				}]
			}
			for(var i = 0 ;i <this.chooseCondition.cate.length; i++){
				this.chooseCondition.cate[i].cateVisible = false;	
				var cids = []
				if(this.chooseCondition.cate[i].cid != '')
					cids = this.chooseCondition.cate[i].cid.split(",");
				if(this.dropTreeList.length >0)
					this.$refs.cateDropTreeInCondition[i].setCheckedKeys(cids);		
			}
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
		conditionClose: function(){
			 this.$set(this,'chooseCondition',this.$options.data().chooseCondition); 
			 this.conditionLoading =true;
		},
		//保存商品
		saveGoods: function(){
			// 组件bus-toggle 内容区高度重新赋值
			this.$refs.togglesElement.contentHeight = this.$refs.togglesElement.$refs.toggleContent.clientHeight;
			var goods = this.$data.goodsSelectedData;
//			this.$children[0].showToggleModel();
			if(goods.length>5){
				this.$children[0].isOverflow = true;
			}
			if(goods.length > this.goodsMaxCount){
				this.$notify.warning("最多选择"+this.goodsMaxCount+"件商品");
			}else{
				this.$set(this,'confirmGoodsData',goods);
				this.callback();
				this.$data.chooseGoodsVisible = false;
			}
		},
		//保存条件
		saveCondition: function(){
			// 组件bus-toggle 内容区高度重新赋值
			this.$refs.togglesElement.contentHeight = this.$refs.togglesElement.$refs.toggleContent.clientHeight;
			var conditions = $.extend(true, {},this.$data.chooseCondition);
			var maxlength = conditions.cate.length+conditions.outerId.length+conditions.price.length+conditions.title.length;
			if(maxlength>5){
				this.$children[0].isOverflow = true;
			}
			this.confirmConditionData = conditions;
			this.conditionLength = this.hasConditionLen(this.confirmConditionData);
			this.callback();
			this.$data.chooseConditionVisible = false;
		},
		/**
		 * 回调
		 */
		callback: function () {
			var opts = {
				goods: this.handleGoodsData(this.confirmGoodsData),
				conditions: this.handleConditionData(this.confirmConditionData),
			};
			this.$emit('callback', opts);	
		},
		// 选择商品下拉树 
		handleGoodsShowDropTree: function () {
			this.droptreeWidth = this.$refs.goodsDropTreeInput.$el.clientWidth;
		},
		//选择条件下拉树
		handleConditionShowDropTree: function (index) {
			this.droptreeWidth = this.$refs.conditionDroptreeInput[index].$el.clientWidth;
		},
		//删除条件
		deleteCondition: function(type,index){
			delete this.confirmConditionData[type].splice(index,1);	
			this.conditionLength = this.hasConditionLen(this.confirmConditionData);
		},
		//下拉树确定选中
		confirmCheck: function(dropTree,type,index){
			var checkArr = [];
			if(type != 'condition'){
				checkArr = this.$refs[dropTree].getCheckedNodes();
			}else{
				checkArr = this.$refs[dropTree][index].getCheckedNodes();
			}
			var checkArrLabel = [];
			var checkArrCode = [];
			for (var i = 0; i < checkArr.length; i++) {
				checkArrLabel.push(checkArr[i].label);
				checkArrCode.push(checkArr[i].code);
			}
			var cate = checkArrCode.join(',');
			if(type != 'condition'){
				this.model.cateName = checkArrLabel.join(',');
				this.model.cate = cate; 
				this.cateDropTreeVisible = false;
			}else{
				this.$set(this.chooseCondition.cate[index],"cid",cate);
				this.$set(this.chooseCondition.cate[index],"cateName", checkArrLabel.join(','));
				this.$refs['conditionpopover'][index].showPopper = false;
			}
		},
		// 添加条件
	    addItem (arr,conditionName,index) {
		  this.chooseCondition[conditionName][index].condition = 'and';
	      arr.push($.extend(true,{},originalCondition[conditionName][0]));
	    },
	    // 删除条件
	    deleteItem (arr, index) {
	      arr.splice(index, 1)
	    },
		// 初始化商品分类下拉树
		initDropTree: function () {
			var _this = this;
			_this.dropTreeList.splice(0);
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
	   	 handleIconClick(index,type){
			if(type){
			
					this.chooseCondition.cate[index].cid = '';
					this.chooseCondition.cate[index].cateName = '';
			}else{
				this.model.cateName = '';
		   		this.model.cate = '';
			}
	   		 
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
		//商品预览
		goodsPreview: function(){
			var titles="";
			var params = {
				searchMap: {
					conditions: JSON.stringify(this.chooseCondition)
				}
			}
			this.search(params);
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
		//处理返回的条件数据
		handleConditionData: function(data){
			var conditions = $.extend(true,{},data);
			conditions.cate.map((item,index)=>{
				delete item.cateVisible;
			})
			return conditions;
		},
		//处理返回的商品数据
		handleGoodsData: function(data){
			var goods = [];
			data.map((item,index)=>{
				goods.push({id:item.id,title:item.title});
			})
			return goods;
		},
		//计算条件数量
		hasConditionLen: function(conditions){
			var len = 0;
			conditions.title.map((item,i)=>{
					if(item.value != ''){
						len +=1; 
					}
			})
			conditions.outerId.map((item,i)=>{
					if(item.value != ''){
						len+=1; 
					}
			})
			conditions.price.map((item,i)=>{
					if(item.minPrice != '' && item.maxPrice != ''){
						len +=1; 
					}
			})
			conditions.cate.map((item,i)=>{
					if(item.cateName != '' && item.cid != ''){
						len +=1; 
					}
			})
			return len;
		},
		//重置数据
		resetData: function(){
			this.$set(this,"confirmConditionData",this.$options.data().confirmConditionData);
			this.$set(this,"chooseCondition",this.$options.data().chooseCondition);
			this.$set(this,"goodsSelectedData",this.$options.data().goodsSelectedData);
			this.$set(this,"confirmGoodsData",this.$options.data().confirmGoodsData);
			this.callback();
		},
		//商品列表回显
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
		//表格勾选所有数据
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
		//验证条件数据类型
		validConditionDataType(conditions){
			if( conditions instanceof Object){
				if(!conditions.hasOwnProperty('title')){
          conditions.title = [];
				}
				if(!conditions.hasOwnProperty('outerId')){
          conditions.outerId = [];
				}
				if(!conditions.hasOwnProperty("cate")){
          conditions.cate = [];
				}
        if(!conditions.hasOwnProperty("price")){
          conditions.price = [];
        }
				return true;
			}else{
				return false;
			}
		}
	};
	var computed = {
			"ns_limit": function(){
				return {
					start: (this.ns_pagination.currPage-1)*this.ns_pagination.currSize,
					length: this.ns_pagination.currSize
				}
			}
		};
	var mounted = function () {		
		if(this.goods.length > 0){
			this.confirmGoodsData = [].concat(this.goods);
			if(this.goods.length>5){
				this.$children[0].isOverflow = true;
			}
		}
		if(this.validConditionDataType(this.conditions)){
			this.$set(this,'confirmConditionData',$.extend(true,{},this.conditions));
			this.$set(this,'chooseCondition',$.extend(true,{},this.conditions));
			this.conditionLength = this.hasConditionLen(this.conditions);
			this.initConditions(this.conditions);
		}
	};
	var watch = {
		//商品条件下拉树过滤
		"goodsFilter": function(val){
			this.$refs.cateDropTreeInGoods.filter(val);
		},
		//监听条件下拉树过滤
		"conditionsFilter": function(val){
			for(var i = 0;i < val.length; i++){
				this.$refs.cateDropTreeInCondition[i].filter(val[i]);
			}
		},
		//监听回传商品
		"goods": function(val){
			if(val instanceof Array){
				this.$set(this,"goodsSelectedData",[].concat(val));
				this.$set(this,"confirmGoodsData",[].concat(val));
			}else{
				throw new Error("商品数据类型初始化错误");
			}		
		},
		//监听回传条件
		"conditions": function(val){
			if(this.validConditionDataType(this.conditions)){
				this.confirmConditionData =  $.extend(true, {},val);
				this.chooseCondition =  $.extend(true, {},val);
				this.conditionLength = this.hasConditionLen(val);
			}else{
				throw new Error("条件数据类型初始化错误");
			}
		}

	};
	// 商品选择组件定义
	Vue.component("ns-goods-conditions-select", {
		template: $template,
		data (){
			return {
				goodsData: [],//商品列表数据
				chooseGoodsVisible: false, 
				chooseConditionVisible: false,
				chooseCondition: originalCondition,
				model:{
					title: "",
					outerId: "",
					cate:"",
					cateName: "",
					minPrice: null,
					maxPrice: null
				},
				goodsFilter: "", //商品分类下拉树过滤文本
				conditionsFilter: [], //条件商品分类下拉树过滤文本
				goodsSelectedData: [], // 选中的商品表格数据
				confirmGoodsData: [], //确认选择的商品数据
				confirmConditionData: {
					title:[],
					outerId:[],
					cate:[],
					price:[],
				},//确认保存条件的数据
				goodsConditionData: [], // 选中的条件
				ns_pagination: ns_pagination, // 分页参数
				ns_order: ns_order, // 排序
				custom: "custom",
				searchMap: {},
				goodsSku: [],
				// 下拉树配置项：
				cateDropTreeVisible: false,
				dropTreeList: [],
				droptreeWidth: '',
				conditionLength: 0, //已选择条件的数量
				// 下拉树配置项/end
				conditionLoading: true,
				goodsLoading: true,
				tableLoading: false,
			}
		},
		methods: Object.assign(built_in_methods, $methods),
		props: props,
		mounted: mounted,
		computed: computed,
		watch: watch
	});

});