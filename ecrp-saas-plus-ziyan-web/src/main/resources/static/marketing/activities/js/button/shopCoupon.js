define(["vue", "nui"], function (Vue, Nui) {
  Vue.component('shopCoupon-component', {
    template: ` 
			  <el-tabs v-model="activeName" @tab-click="handleClick">
		        <el-tab-pane label="节点设置" name="first">
		        	<el-form label-width="120px" :model="Node" :rules="rules" ref="contentform" placement="right">
			          <el-form-item label="任务名称：" required  >
			            <el-form-grid size="xmd">
			             <el-form-item prop="nodeName" :rules="{required: true, message: '请输入短信内容', trigger: 'blur'}">
			            	  <el-input placeholder="请输入任务名称"  :disabled="ban_disabled" v-model="Node.nodeName"></el-input>
			             </el-form-item>
			            </el-form-grid>
			          </el-form-item>
			          <el-form-item label="执行时间：" required v-if="!type">
			            <el-form-grid size="xmd">
			            <el-form-item prop="sendTime" >
			                <el-date-picker ref="ele" :disabled="ban_disabled"
			                  v-model="Node.sendTime"
			                  type="datetime"
			                  :editable="false"
			                  placeholder="选择分组日期时间">
			                </el-date-picker>
			                </el-form-item>
			            </el-form-grid>
			          </el-form-item>
			
			          <el-form-item label="延迟：" v-if="type">
			 	          <el-form-grid size="md">
					          <el-form-item prop="marketingDelayHour">
						          <el-input-number :min="0" :max="1000000" :disabled="ban_disabled" v-model="Node.marketingDelayHour"></el-input-number>
					          </el-form-item>
				          </el-form-grid>&nbsp;&nbsp;&nbsp;&nbsp;个小时
			          </el-form-item>
			          <el-form-item label="优惠券：" required>
			            <el-form-grid size="xmd">
			            <el-form-item prop="lineCouponId" >
			                <ns-select :disabled="ban_disabled" v-model="Node.lineCouponId" placeholder="请选择" url="/common/dropdown/querySysCouponList"></ns-select>
			                </el-form-item >
			             </el-form-grid>
			          </el-form-item>
			          <el-form-item label="提示：">
			            <el-form-grid size="lg">
			                为了保证您所选择的分组会员都可以成功发放优惠券，您所选择的优惠券数量为无限。
			             </el-form-grid>
			          </el-form-item>

			         	<el-form-item label="备注：" >
			            <el-form-grid size="lg">
			            	<el-form-item >
			            		<el-input :disabled="ban_disabled" ref="inputRef" type="textarea" :rows="4" placeholder="" v-model="Node.content"></el-input>
			                </el-form-item >
			             </el-form-grid>
			          </el-form-item>
			        </el-form>
		        </el-tab-pane>
		         <el-tab-pane label="保存报告" name="second">
		         	<div v-if="!is_show"  class="is-empty"><i class="bui-warn-fill"></i> 暂无数据</div>
		         </el-tab-pane>
		     </el-tabs>
		  `,
    data() {
      return {
        editAccess: false,
        ban_disabled: false,
        is_show: false,//分析报告
        instanceId: '',//实例id'
        type: false,
        test: false,
        activeName: "first",
        rules: Object.assign({}, {}, {}),
        Node: {
          nodeBean: 'lineCouponNode',
          nodeName: '',	//节点名称
          sendTime: '', //发送时间
          lineCouponId: '',
          number: 0,
          marketingDelayHour: 0, //延时
        }
      }
    },
    mounted: function () {
      var that = this;
      this.ban_disabled = Boolean($('#hidCanEdit').val() == '0');
      //活动id;
      //活动状态
      this.instanceId = $('#instanceId').val();
      var status = $('#hidActivityStatus').val() + "";
      if (status == '5' || status == '9') {
        this.is_show = true;
      }
      if ($('#hidActivityMode').val() == '1') {
        this.type = true;
      }//0单次活动 1循环活动 //这一块可以提到上一级
      var taskdata = this.$root.nodejson[this.$root.nodeId];
      var nodelList = window.vm.nodeedges[this.$root.nodeId];

      if (taskdata) {
        var obj = Object.assign(this.Node, taskdata);
        var obj = Object.assign(this.Node, taskdata);
        this.Node = obj;
      }
    },
    methods: {
      showDailong: function () {
        this.$root.$refs.shortLink.$root.shortLinkDialog = true;
      },
      //加载 表格数据方法 int length, int start
      loadTable(instance_Id, node_Id, length_a, start_a) {
        var aid = $('#instanceId').val();
        var that = this;
        $.ajax({
          type: "get",
          url: "/marketing/activities/queryNodeDateTable",
          //改
          data: {
            instanceId: aid,
            nodeId: that.$root.nodeId,
            length: length_a,
            start: start_a,
            type: 2
          },
          async: false,
          success: function (date) {
            if (date.success) {
              that.tableData = date.result.data;
              that.paginationParam.total = date.result.recordsTotal;
            }
          }
        });
      },

      //页数改变
      pageChange(page) {

        this.loadTable('', '',
            this.paginationParam.pageSize, this.paginationParam.pageSize * (page
            - 1));

      },
      //页面条数事件
      pageSize(sizePage) {
        this.paginationParam.pageSize = sizePage;
        this.loadTable('', '', sizePage, 0)
      },
      handleClick: function (tab, event) {
        var aid = $('#instanceId').val();// 需要instanceId 实例id
        var that = this;
        if (tab.name == "second") {
          //获取总人数//应该可以在前端取
          var nodeid = this.$root.nodeId;
          $.ajax({
            type: "get",
            url: "/marketing/activities/queryNodeDate",
            data: {instanceId: aid, nodeId: that.$root.nodeId},
            async: false,
            success: function (date) {
              if (date.success && typeof(date.result) != 'undefined') {
                that.nodeDate = date.result;
              }
            }
          });
          $.ajax({
            type: "get",
            url: "/marketing/activities/queryNodeDateTable",
            //改
            data: {
              instanceId: aid,
              nodeId: that.$root.nodeId,
              length: 15,
              start: 0,
              type: 2
            },
            async: false,
            success: function (date) {
              if (date.success) {
                that.tableData = date.result.data;
                that.paginationParam.total = date.result.recordsTotal;
              }
            }
          });
        }
      },
      saveTemplate: function () {
        var that = this;
        var templateTitle = that.msgTemplateName;
        var template = that.Node.content;
        if (templateTitle.trim() == '') {
          that.$root.nodeNotifyError("模板名称必须填写");
          return;
        }
        if (template.trim() == '') {
          that.$root.nodeNotifyError("模板内容必须填写");
          return;
        }
        $.ajax({
          type: "post",
          url: "/marketing/activitydesign/saveMsgTemplate",
          data: {
            templateTitle: templateTitle,
            template: template,
            marketingManner: 0,
            templateType: 0
          },
          async: false,
          success: function (date) {
            if (date.success && typeof(date.result) != 'undefined') {
              that.templatebutten = true;
              that.templatename = false;
              that.$root.nodeNotifySuccess(date.msg);
            } else {
              that.$root.nodeNotifyError(date.msg);
            }
          }
        });
      },

      filterSubmit: function () {
        var that = this;
        var searchValue = this.multipleForm.user;
        if (searchValue !== '') {
          that.loadTable('', '', 15, 1, searchValue);
        }
      },

      reset: function () {
        this.customerNick = '';
        this.status = '';
      },

      show: function (val) {

        if (val) {
          this.templatebutten = false;
          this.templatename = true;
        } else {
          this.templatebutten = true;
          this.templatename = false;
        }

      },
      "tagClick": function (val) {

        this.Node.content += val;
      },

      setNodeData: function () {
        var that = this;
        var taskdata = this.$root.nodejson[this.$root.nodeId];
        var nodeResult = window.vm.nodeedges[this.$root.nodeId]; //获取关联连线

        window.DoDesign.disableForm()

        if (taskdata) {
          var obj = Object.assign(this.Node, taskdata);
          this.Node = obj;
        }
      }
    }
  });
})


		        
		  