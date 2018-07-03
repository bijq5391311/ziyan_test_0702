import Vue from 'vue'
import NuiJs from 'nui-js'
import busMultiFilter from '../../../components/business-multi-filter/index'

Vue.use(NuiJs)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#example',
  components: {
    busMultiFilter
  },
  data () {
    return {
      activeName: 'first',
      tableData: [], // 默认表格
      tableEmptyTip: '暂无数据', // 表格数据为空时的提示语
      currentPage4: 4,
      date: '',
      smsDialogVisible: false,  // 新增短信发货提醒弹窗

      // 多层级店铺选择配置项
      dataOnline: [
        {
          'label': '天猫',
          'id': 1,
          'children': [
            {
              'label': '晨光官方旗舰店',
              'id': 2,
              'children': []
            },
            {
              'label': 'mg晨光上海专卖店',
              'id': 5
            },
            {
              'label': 'mg晨专卖店',
              'id': 15
            },
            {
              'label': 'mg专卖店',
              'id': 16
            },
            {
              'label': 'mg晨专卖店',
              'id': 18
            },
            {
              'label': 'mg专卖店',
              'id': 16
            }
          ]
        },
        {
          'label': '京东',
          'id': 6,
          'children': [
            {
              'label': 'MG晨光文具旗舰店',
              'id': 7
            }
          ]
        },
        {
          'label': '有赞',
          'id': 8,
          'children': [
            {
              'label': '晨光文具',
              'id': 9
            }
          ]
        }
      ],
      onlineProps: {
        children: 'children',
        label: 'label'
      },
      checkAll: false, // 线上是否全选
      isIndeterminate: false,
      defaultCheckedKeys: [5, 8], // 默认选中的项
      defaultCheckedAll: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], // 全部选中的项
      resultMultilayer: '',
      dialogMultilyaerVisible: false,
      // 多层级店铺选择配置项/end
      level: 'level1',
      time: 'time1',
      formRadio: '',
      smsValidateForm: {
        mission: ''
      },
      defaultSelect: '',

      // 会员分组 下拉树配置项：
      dropTreeValue: '',
      dropTreeVisible: false,
      dropTreeList: [{
        label: '一级 1',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }]
      }, {
        label: '一级 2',
        children: [{
          label: '二级 2-1',
          children: [{
            label: '三级 2-1-1'
          }]
        }, {
          label: '二级 2-2',
          children: [{
            label: '三级 2-2-1'
          }]
        }]
      }, {
        label: '一级 3',
        children: [{
          label: '二级 3-1',
          children: [{
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          children: [{
            label: '三级 3-2-1'
          }]
        }]
      }],
      droptreeWidth: ''
      // 会员分组 下拉树配置项/end
    }
  },
  mounted () {
    this.getTableData()
    // 选中店铺数量
    this.resultMultilayer = this.defaultCheckedKeys.length
    this.isIndeterminate = this.defaultCheckedKeys.length > 0
  },
  methods: {
    // 默认获取表格数据
    getTableData () {
      window.fetch('http://192.168.1.24:8071/templateBeta/tableData.json').then((response) => {
        return response.json()
      }).then((json) => {
        this.tableData = json
      }).catch((ex) => {
        console.log('parsing failed', ex)
      })
    },
    // 当前页显示页码总数
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    // 页码切换
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    // 显示"新增短信发货提醒"窗口
    handerlSmsDialogVisible () {
      this.smsDialogVisible = true
    },
    // 多层级店铺选择 event
    // 显示多层级店铺选择器窗口
    handerlMultilayerVisible () {
      this.dialogMultilyaerVisible = true
    },
    handleCheckAllChange (event) {
      this.$refs.online.setCheckedKeys(event.target.checked ? this.defaultCheckedAll : [])
      this.isIndeterminate = false
    },
    handleCheckChange (value) {
      let checkedCount = this.$refs.online.getCheckedNodes().length
      this.checkAll = checkedCount === this.defaultCheckedAll.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.defaultCheckedAll.length
    },
    // 保存选中结果
    saveMultilayerSelect () {
      this.resultMultilayer = this.$refs.online.getCheckedNodes().length
      this.defaultCheckedKeys = this.$refs.online.getCheckedNodes()
      this.dialogMultilyaerVisible = false
    },
    cancleMultilayerSelect () {
      this.defaultCheckedKeys = this.defaultCheckedKeys
      this.dialogMultilyaerVisible = false
    },
    // 多层级店铺选择 event/end
    // 表单验证
    submitSmsForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.smsDialogVisible = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 表单验证 event/end

    // 表单下拉树 event
    handleShowDropTree () {
      this.droptreeWidth = this.$refs.droptreeinput.$el.clientWidth
    },
    handleSelectValue (data) {
      this.dropTreeVisible = false
      this.dropTreeValue = data.label
    },
    // 表单下拉树 event/end// 多条件筛选组件应用 event
    submitSearch () {
      console.log('提交筛选')
    },
    resetSearch () {
      console.log('重置筛选条件')
    },
    cleanSearch () {
      console.log('清空筛选条件')
      // 重新获取表格数据
      this.getTableData()
    },
    recoverSearch () {
      console.log('修改筛选条件')
    }
  }
})
