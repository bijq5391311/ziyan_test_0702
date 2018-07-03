import Vue from 'vue'
import NuiJs from 'nui-js'
import './page.css'
import busToggles from '../../../components/business-toggles/index'
import busDraggable from 'vuedraggable'

Vue.use(NuiJs)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#example',
  components: {
    busToggles, busDraggable
  },
  data () {
    return {
      activeName: 'first',
      delivery: '',
      formRadio: '1',
      date: '',
      showBtn: false,
      wuliu: '',
      levelchance: 'and',
      rewardSelect: '', // 积分奖励
      options: {
        group: {
          name: 'people',
          pull: 'clone',
          put: 'false'
        },
        disabled: true
      },
      ratingData: [{
        name: '普通会员',
        edit: false,
        content: '普通会员',
        ruleCheck: [],
        rule: [{
          label: '累积消费满',
          name: '累积消费金额满',
          value: '',
          placeholder: '输入金额',
          unit: '元',
          popover: false,
          range: 'great',
          logic: 'and'
        }, {
          label: '累积消费满',
          name: '累积消费次数满',
          value: '',
          placeholder: '输入次数',
          unit: '次',
          popover: false,
          range: 'equal',
          logic: 'and'
        }, {
          label: '单笔消费满',
          name: '单笔消费金额满',
          value: '',
          placeholder: '输入金额',
          unit: '元',
          popover: false,
          range: 'less',
          logic: 'and'
        }]
      }],
      ratingInputVisible: false,
      ratingInputValue: '', // 等级名称输入框value
      ratingTabsValue: '', // 会员等级tabs
      ratingTabsList: ['普通会员', '高级会员'],
      // 会员等级条件 配置项/end
      memberRuleCheckData: [{
        label: '累积消费满',
        name: '累积消费金额满',
        value: '',
        placeholder: '输入金额',
        unit: '元',
        popover: false,
        logic: 'and'
      }, {
        label: '累积消费满',
        name: '累积消费次数满',
        value: '',
        placeholder: '输入次数',
        unit: '次',
        popover: false,
        logic: 'and'
      }, {
        label: '单笔消费满',
        name: '单笔消费金额满',
        value: '',
        placeholder: '输入金额',
        unit: '元',
        popover: false,
        logic: 'and'
      }, {
        label: '累积互动次数',
        name: '累积互动次数满',
        value: '',
        placeholder: '输入次数',
        unit: '次',
        popover: false,
        logic: 'and'
      }],
      // 会员等级条件 配置项/end
      // 会员等级排序  配置项
      ratingSort: false,
      ratingDataSort: [],
      ratingTabsShow: true,
      // 会员等级排序  配置项/end
      // 选择商品
      goodaData: [{
        name: '个性拼接民族风松紧带休闲长裤',
        code: 'SZ233080003'
      }, {
        name: '粉色字母花刺绣螺纹长袖上衣',
        code: 'SL532209002'
      }, {
        name: '麻灰猫头鹰刺绣长袖上衣',
        code: 'SL532020007'
      }, {
        name: '黄色蜜蜂刺绣包臀半裙',
        code: 'SZ233080003'
      }, {
        name: '彩色小鸟印花半裙',
        code: 'SL532090004'
      }, {
        name: '白色蜜蜂刺绣连衣裙',
        code: 'SM8330600'
      }],
      dialogChooseGoodsVisible: false,
      dialogChooseConditionVisible: false,
      dialogChooseListHeight: '',
      // /end 选择商品
      // 选择条件
      chooseCondition: {
        name: [{
          value: '',
          rule: 'and'
        }, {
          value: '',
          rule: 'or'
        }],
        code: [{
          value: '',
          rule: 'and'
        }],
        price: [{
          start: '',
          end: '',
          rule: 'and'
        }],
        cate: [{
          select: '',
          rule: 'or'
        }]
      }
      // /end 选择条件
    }
  },
  created () {
    this.ratingTabsValue = this.ratingData.length > 0 ? this.ratingData[0].name : ''
  },
  mounted () {
  },
  methods: {
    // 显示新建会员等级输入框
    showRatingInput () {
      if (this.ratingData.length > 4) {
        this.$message({
          type: 'warning',
          message: '会员等级设置不能超出5个'
        })
      } else {
        this.ratingInputVisible = true
        this.$nextTick(() => {
          this.$refs.saveTagInput.$refs.input.focus()
        })
      }
    },
    /* 点击编辑按钮事件 */
    showEditBtn () {
      this.showBtn = true
      this.options.disabled = false
    },
    // 保存修改
    saveEdit () {
      this.showBtn = false
      this.options.disabled = true
    },
    // 隐藏编辑按钮
    hideEditBtn () {
      this.showBtn = false
      this.options.disabled = true
    },
    // 拖拽会员等级
    // 等级名称点击：
    handleRatingClick (name) {
      this.ratingTabsValue = name
    },
    updateRatingData () {

    },
    // /end 拖拽会员等级
    // 确认添加新会员等级标签
    handleInputConfirm () {
      let inputValue = this.ratingInputValue
      for (let i = 0; i < this.ratingData.length; i++) {
        if (this.ratingData[i].name === inputValue) {
          this.$message({
            type: 'warning',
            message: '已存在等级名称' + inputValue + '，请试试其他名称!'
          })
          this.$nextTick(() => {
            this.$refs.saveTagInput.$refs.input.focus()
          })
          return false
        }
      }
      if (inputValue) {
        this.ratingData.push({
          name: inputValue,
          edit: false,
          content: inputValue + '内容 区域',
          ruleCheck: [],
          rule: [{
            label: '累积消费满',
            name: '累积消费金额满',
            value: '',
            placeholder: '输入金额',
            unit: '元',
            popover: false,
            range: 'equal',
            logic: 'and'
          }]
        })
        this.ratingTabsValue = inputValue
      }
      this.ratingInputVisible = false
      this.ratingInputValue = ''
    },
    // 移除tab标签页
    removeRatingTab (name) {
      this.$confirm('此操作将删除会员等级' + name + ', 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let tabs = this.ratingData
        let activeName = this.ratingTabsValue
        if (activeName === name) {
          tabs.forEach((tab, index) => {
            if (tab.name === name) {
              let nextTab = tabs[index + 1] || tabs[index - 1]
              if (nextTab) {
                activeName = nextTab.name
              }
            }
          })
        }
        this.ratingTabsValue = activeName
        this.ratingData = tabs.filter(tab => tab.name !== name)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // tab标题文本编辑
    handleRatingEdit (index) {
      let data = this.ratingData
      data[index].edit = true
      this.$nextTick(() => {
        this.$refs.ratingNameInput[index].$refs.input.focus()
      })
    },
    // 保存tabs标题文本编辑(失去焦点&点击√)
    handleRatingConfirm (index, oldName) {
      let newName = this.$refs.ratingNameInput[index].$refs.input.value
      // 判断是否存在同样的等级名称
      for (let i = 0; i < this.ratingData.length; i++) {
        if (i !== index && this.ratingData[i].name === newName) {
          this.$message({
            type: 'warning',
            message: '已存在等级名称' + newName + '，请试试其他名称!'
          })
          this.$nextTick(() => {
            this.$refs.ratingNameInput[index].$refs.input.focus()
            this.$refs.ratingNameInput[index].$refs.input.value = oldName
          })
          return false
        }
      }
      this.ratingData[index].edit = false
      this.ratingData[index].name = this.ratingTabsValue = newName
    },
    // 会员等级条件 event
    // 添加条件：
    memberRuleSaveCheck (status, index) {
      if (status === 'cancle') {
        this.ratingData[index].ruleCheck = []
      } else if (status === 'confirm') {
        this.ratingData[index].ruleCheck.forEach((check) => {
          this.memberRuleCheckData.forEach((data) => {
            if (check === data.name) {
              this.ratingData[index].rule.push(data)
            }
          })
        })
        this.ratingData[index].ruleCheck = []
      }
    },
    memeberRulePopoverHide (index) {
      this.ratingData[index].ruleCheck = []
    },
    // 删除条件
    memberRuleDelete (index, series) {
      console.log(1)
      this.ratingData[index].rule.splice(series, 1)
    },
    // 会员等级条件 event/end

    // 会员等级排序 event
    // 显示排序 Popover
    ratingSortPopoverShow () {
      this.ratingDataSort = this.ratingData
    },
    // 保存排序
    ratingSortSave (array) {
      this.ratingData = array
      this.ratingTabsShow = false
      this.$nextTick(() => {
        this.ratingTabsShow = true
      })
    },
    // 会员等级排序 event /end
    // 选择商品弹窗 event
    showChooseDialog () {
      this.dialogChooseGoodsVisible = true
      this.$nextTick(() => {
        // 右侧选择条件结果区域最高高度（决定滚动区域）
        // this.$refs.tmpChooseScroll.$el.children[0].style.maxHeight = this.$refs.conditionItem.$el.clientHeight + 'px'
        this.dialogChooseListHeight = this.$refs.conditionItem.$el.clientHeight
      })
    },
    // 选择商品弹窗 event/end,
    // 选择条件弹窗 event
    showChooseDialog2 () {
      this.dialogChooseConditionVisible = true
      this.$nextTick(() => {
        // 右侧选择条件结果区域最高高度（决定滚动区域）
        // this.$refs.tmpChooseScroll2.$el.children[0].style.maxHeight = this.$refs.conditionItem2.$el.clientHeight - this.$refs.tmpChooseScroll2.$el.offsetTop - 10 + 'px'
      })
    },
    // 添加条件
    addItem (arr) {
      arr.push(arr[0])
    },
    // 删除条件
    deleteItem (arr, index) {
      arr.splice(index, 1)
    }
    // 选择条件弹窗 event/end
  }
})
