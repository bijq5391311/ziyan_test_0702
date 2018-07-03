/**
 * 品牌组件封装
 *
 * @author adolph
 */
define(["jquery", "vue", "nui"], function ($, Vue, Nui) {

	var template = `
		<div class="template-multi">
			<div class="template-multi-content">
				<el-multi :data="nodes" accordion node-key="id" :default-checked-keys="defaultCheckedKeys" :set-position="36"
					@check-change="checkChangeHandle" ref="shopNode"  :cols="2" :show-Selectall="false" :props="shopProps">
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
					disabled: "disabled"
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
			 * 通过 keys 设置目前勾选的节点，使用此方法必须设置 node-key 属性
			 * @param keys
			 * @param leafOnly
			 */
			setCheckedKeys: function (keys, leafOnly) {
				this.$refs.shopNode.setCheckedKeys(keys, leafOnly);
			},
			/**
			 * 目前被选中的节点所组成的数组
			 * @returns {*}
			 */
			getCheckedNodes: function () {
				return this.$refs.shopNode.getCheckedNodes();
			},
			
		},
		created: function () {

		},
		mounted: function () {

		}
	});

	var $template = `
		<el-dialog :title="title" v-model="dialogBrandMultilyaerVisible" size="tiny" custom-class="no-padding" :modal-append-to-body="false" :close-on-click-modal="false">
			<div class="template-multi">
				<el-collapse v-model="activeNames" accordion>
					<el-collapse-item :name="node.id" >
						<template slot="title">
						  {{node.label}}
						</template>
						<ns-one-multi-select ref="shopTree" :default-checked-all="defaultCheckedAll" :nodes="node.children" :default-checked-keys="defaultCheckedKeys"></ns-one-multi-select>
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
	function _init(_this, args) {
		_this.$data.refKey = "";
		_this.$data.defaultCheckedAll = [];
		var url="";
		if(args.type == "1"){
			url="/organization/shop/querySysnOAShop";
		}else if(args.type == "0"){
			url="/marketing/zyofflinecoupon/queryOutShopTree";
		}
		// 加载店铺数据
		$.post(ctx + url, {}).done(function (resp) {
			_this.$data.defaultCheckedKeys = args.defaultCheckedKeys;
			_this.node = resp.result[0];
			// 默认展开第一个面板
			_this.activeNames = resp.result[0].id;
			_this.refKey = resp.result.ref;
		}).fail(function (resp) {
			console.log(resp);
		});
	}

	// 品牌店铺主键
	Vue.component("ns-shop-multi-select", {
		template: $template,
		data: function () {
			return {
				activeNames: "",
				dialogBrandMultilyaerVisible: false,
				refKey: "",
				node: {},
				defaultCheckedKeys: [], // 默认选中的项
				defaultCheckedAll: [] // 全部选中的项
			};
		},
		props: {
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
			open: function (args) {
				var _this = this;
				_this.$data.dialogBrandMultilyaerVisible = true;
				_init(_this, args);
			},
			/**
			 * 确定触发回调函数
			 */
			callback: function () {
				var data = [];
				var refs = this.$refs;
				var checkedKeys = refs.shopTree.getCheckedNodes();
				data = data.concat(checkedKeys);
				var args = {
					data: data
				};
				this.$emit("callback", args);
				this.$data.dialogBrandMultilyaerVisible = false;
			}
		},
		created: function () {
			
		},
		mounted: function () {

		}
	});
});		

