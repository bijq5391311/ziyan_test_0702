/**
 * 品牌组件封装
 *
 * @author adolph
 */
define(["jquery", "vue", "nui"], function ($, Vue, Nui) {

	var template = `
		<div class="template-multi">
			<div class="template-multi-content">
				<el-multi :data="nodes" leaf-check-limit accordion node-key="code" :default-checked-keys="defaultCheckedKeys" :set-position="36"
					@check-change="checkChangeHandle" ref="shopNode" :cols="2" :show-Selectall="false" :props="shopProps">
				</el-multi>
			</div>
        </div>
	`;

	// 单个选择组件注册
	Vue.component("ns-one-multi-select", {
		template: template,
		data: function () {
			return {
				shopProps: {
					children: 'children',
					label: 'label',
					appoint: 'showAdd',
					disabled: 'disabled'
				},
				checkAll: false, // 线上是否全选
				isIndeterminate: false
			};
		},
		props: {
			// 节点数据
			nodes: {
				type: Array,
				default: function () {
					return [];
				}
			},
			// 默认选中的项
			defaultCheckedKeys: {
				type: Array,
				default: function () {
					return [];
				}
			},
			// 全部选中的项
			defaultCheckedAll: {
				type: Array,
				default: function () {
					return [];
				}
			}
		},
		methods: {
			/**
			 * 全选
			 * @param event
			 */
			checkAllChangeHandle: function (event) {
				this.$refs.shopNode.setCheckedKeys(event.target.checked ? this.defaultCheckedAll : []);
				this.isIndeterminate = false;
			},
			checkChangeHandle: function (value) {
				let checkedCount = this.$refs.shopNode.getCheckedNodes().length;
				this.checkAll = checkedCount === this.defaultCheckedAll.length;
				this.isIndeterminate = checkedCount > 0 && (checkedCount < this.defaultCheckedAll.length);
			},
			/**
			 * 目前被选中的节点所组成的数组
			 * @returns {*}
			 */
			getCheckedKeys: function () {
				return this.$refs.shopNode.getCheckedKeys();
			},
			/**
			 * 目前被选中的节点所组成的数组
			 * @returns {*}
			 */
			getCheckedNodes: function () {
				return this.$refs.shopNode.getCheckedNodes();
			},
			/**
			 * 通过 keys 设置目前勾选的节点，使用此方法必须设置 node-key 属性
			 * @param keys
			 * @param leafOnly
			 */
			setCheckedKeys: function (keys, leafOnly) {
				this.$refs.shopNode.setCheckedKeys(keys, leafOnly);
			}
		},
		created: function () {

		},
		mounted: function () {

		}
	});

	var $template = `
		<el-dialog :title="title" v-model="dialogBrandMultilyaerVisible" size="tiny" height="400px" :vetically="true" custom-class="no-padding" :modal-append-to-body="false" :close-on-click-modal="false">
			<div class="template-multi">
				<el-collapse v-model="activeNames" accordion>
					<el-collapse-item :name="node.code" v-for="(node,index) in nodes" :key="index">
						<template slot="title">
						  {{node.label}}
						</template>
						<ns-one-multi-select :ref="node.ref" :default-checked-all="defaultCheckedAll" :nodes="node.children" :default-checked-keys="defaultCheckedKeys"></ns-one-multi-select>
					</el-collapse-item>
				</el-collapse>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="dialogBrandMultilyaerVisible=false">取消</el-button>
				<el-button type="primary" @click.native="callback">确定</el-button>
			</div>
		</el-dialog>
	`;

	/**
	 * 初始化
	 * @param _this
	 */
	function _init(_this, args, params) {
		_this.$data.refKeys = [];
		_this.$data.defaultCheckedAll = args.defaultCheckedAll;
		// 加载店铺数据
		$.post(_this.url, params?params:{}).done(function (resp) {
			_this.nodes = resp.result.children ? resp.result.children: [];
			_this.$data.defaultCheckedKeys = args.defaultCheckedKeys;
			// 默认展开第一个面板
			if (resp.result.children) {
				_this.activeNames = resp.result.children[0].code;
			}
			for (var i = 0; i < resp.result.children.length; i++) {
				_this.refKeys.push(resp.result.children[i].ref);
			}
		}).fail(function (resp) {
			console.log(resp);
		});
	}

	// 品牌店铺主键
	Vue.component("ns-brand-multi-select", {
		template: $template,
		data: function () {
			return {
				activeNames: "",
				dialogBrandMultilyaerVisible: false,
				refKeys: [],
				nodes: [],
				defaultCheckedKeys: [], // 默认选中的项
				defaultCheckedAll: [], // 全部选中的项
				shopList:[],
				shopNames:[]
			};
		},
		props: {
			url: {
				type: String,
				default: function () {
					return ctx + "/base/common/queryShopTree";
				}
			},
			title: {
				type: String,
				default: "选择店铺"
			}
		},
		methods: {
			/**
			 * 打开方法
			 * @param opts
			 */
			open: function (args,params) {
				var _this = this;
				_this.$data.dialogBrandMultilyaerVisible = true;
				_init(_this, args,params);
			},
			/**
			 * 确定触发回调函数
			 */
			callback: function () {
				var data = [];
				this.shopList = [];
				this.shopNames = [];
				var refs = this.$refs;
				var refKeys = this.$data.refKeys;
				var checkedNodes = []
				for (var i = 0; i < refKeys.length; i++) {
					var refsKey = refKeys[i];
					var vue = refs[refsKey][0];
					checkedNodes = checkedNodes.concat(vue.getCheckedNodes());
				}
				for (var i = 0; i < checkedNodes.length; i++) {
					var checkedNode = checkedNodes[i];
					if(checkedNode.showAdd){
						data.push(checkedNode.code);
						this.shopNames.push(checkedNode.label);
                        this.shopList.push(checkedNode);
					}
				}
				var args = {
					data: data
				};
				this.$emit("callback", args);
				this.$data.dialogBrandMultilyaerVisible = false;
			},
			//获取选中的店铺
			getCheckShops: function(){
				return this.shopList;
			},
			//获取选中店铺名称
			getText:function(){
                return this.shopNames.join("，");
			}

		},
		created: function () {
			
		},
		mounted: function () {

		}
	});
});		

