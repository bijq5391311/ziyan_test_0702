import Vue from 'vue'
import NuiJs from 'nui-js'
import './page.css'
import moment from 'moment'
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
      tableData: [],
      formInline: {
        user: ''
      },
      currentPage4: 4,
      dialogFormVisible: false,
      dialogAddVisible: false,
      formLabelWidth: '80px',
      tableForm: {
        date: '',
        name: '',
        address: '',
        province: ''
      },
      multipleSelection: [],
      addForm: {
        date: '',
        name: '',
        address: '',
        province: ''
      },
      addRules: {
        date: [
          {required: true, type: 'date', message: '请选择日期', trigger: 'change'}
        ],
        name: [
          {required: true, message: '请输入姓名', trigger: 'blur'}
        ],
        address: [
          {required: true, message: '请输入地址', trigger: 'blur'}
        ],
        province: [
          {required: true, message: '请输入省份', trigger: 'blur'}
        ]
      },
      multipleForm: {
        user: '',
        date: '',
        address: '',
        province: ''
      },
      multipleSearchCollapse: true,
      multipleFilterStatus: true,
      loadingtable: false
    }
  },
  mounted () {
    this.getTableData()
  },
  methods: {
    getTableData () {
      window.fetch('http://192.168.1.24:8071/templateBeta/tableData.json').then((response) => {
        return response.json()
      }).then((json) => {
        this.tableData = json
      }).catch((ex) => {
        console.log('parsing failed', ex)
      })
    },
    // 表格行多选择
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // 筛选
    filterSubmit () {
      if (this.formInline.user) {
        const newList = []
        for (let i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].name.indexOf(this.formInline.user) >= 0) {
            newList.push(this.tableData[i])
          }
        }
        this.tableData = newList
      } else {
        this.getTableData()
      }
    },
    // 编辑行数据
    editRow (index, rows) {
      this.dialogFormVisible = true
      this.tableForm = rows[index]
    },
    // 编辑行数据保存
    saveForm () {
      this.dialogFormVisible = false
      this.tableForm.date = moment(this.tableForm.date).format('YYYY-MM-DD')
    },
    delRow (index, rows) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.showMessage('success', '删除成功')
        rows.splice(index, 1)
      }).catch(() => {
        this.showMessage('info', '已取消删除')
      })
    },
    // 批量删除
    delLotRow () {
      if (this.multipleSelection.length > 0) {
        this.$confirm('此操作将永久删除数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.showMessage('success', '删除成功')
          this.tableData.splice(0, this.multipleSelection.length)
        }).catch(() => {
          this.showMessage('info', '已取消删除')
        })
      } else {
        this.showMessage('error', '请至少选择一项')
      }
    },
    // 新增数据显示弹窗
    addRow (index, rows) {
      this.dialogAddVisible = true
    },
    // 新增数据保存
    addSubmit () {
      this.$refs.addFormElement.validate((valid) => {
        if (valid) {
          this.tableData.push({
            date: moment(this.addForm.date).format('YYYY-MM-DD'),
            name: this.addForm.name,
            province: this.addForm.province,
            address: this.addForm.address,
            level: '普通会员'
          })
          this.dialogAddVisible = false
          this.showMessage('success', '数据添加成功')
          this.addReset()
        } else {
          this.showMessage('error', '数据还未填写完整')
          return false
        }
      })
    },
    // 重置新增表单
    addReset () {
      this.$refs.addFormElement.resetFields()
    },
    addCancel () {
      this.addReset()
      this.dialogAddVisible = false
    },
    showMessage (type, msg) {
      this.$message({
        type: type,
        message: msg
      })
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      this.currentPage4 = val
      console.log(`当前页: ${val}`)
    },
    // 多条件筛选事件：
    // 展开收缩多条件筛选表单
    multipleShow () {
      let buttonText
      let iconName
      if (this.multipleSearchCollapse) {
        this.multipleSearchCollapse = false
        buttonText = '收缩滤选'
        iconName = 'up'
      } else {
        this.multipleSearchCollapse = true
        buttonText = '展开滤选'
        iconName = 'down'
      }
      this.$refs.multipleSearchText.$el.innerHTML = buttonText + '<i class="el-icon-arrow-' + iconName + ' el-icon--right"></i>'
    },
    // 提交筛选
    multipleSubmitSearch () {
      console.log('提交筛选')
      this.multipleFilterStatus = false
    },
    // 重置筛选条件
    multipleResetSearch () {
      console.log('重置筛选')
      this.multipleFilterStatus = true
    },
    // 修改筛选条件
    multipleRecoverSearch () {
      console.log('修改筛选条件')
      this.multipleFilterStatus = true
    },
    // 表格内容区域显示加载中
    setTableLoading () {
      this.loadingtable = true
      setTimeout(() => {
        this.loadingtable = false
      }, 5000)
    },
    // 多条件筛选组件应用 event
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
    // 多条件筛选组件应用 event/end
  }
})

