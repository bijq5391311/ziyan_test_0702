import Vue from 'vue'
import NuiJs from 'nui-js'
import './page.css'
import moment from 'moment'
import busMultiFilter from '../../../components/business-multi-filter/index'
import busTable from '../../../components/business-table/index'

Vue.use(NuiJs)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#example',
  components: {
    busMultiFilter, busTable
  },
  data () {
    return {
      activeName: 'first', // tab默认选择
      tableData: [], // 默认表格
      tableEmptyTip: '暂无数据', // 表格数据为空时的提示语
      currentPage4: 4, // 当前选中页码
      formLabelWidth: '80px',
      // 详情信息表单数据
      tableForm: {
        date: '',
        name: '',
        address: '',
        province: ''
      },
      // 显示详情
      dialogFormVisible: false,
      // 筛选表单数据
      multipleForm: {
        user: '',
        date: '',
        date2: '',
        address: '厦门市',
        province: '',
        trade: {
          start: '0',
          end: '12'
        },
        source: '',
        logistics: ''
      },
      // 存放初始值
      initForm: {
        user: '',
        date: '',
        address: '',
        province: '',
        trade: {}
      },
      multipleSearchCollapse: true,  // 单条件与多条件区域切换
      multipleFilterStatus: true,    // 多条件区域与搜索结果切换
      searchResultStatus: true,      // 筛选结果
      searchResultTags: [],            // 筛选结果标签集
      formRadio: '',
      formCheck: [],
      delivery: false,
      analysiesSelect: '表格',
      // 评价标签
      evaluateTag: [{
        name: '默认未选',
        check: false
      }, {
        name: '默认选中',
        check: true
      }, {
        name: '默认未选',
        check: false
      }, {
        name: '默认未选',
        check: false
      }
      ],
      paginationParam: {
        current_page: 1,
        total: 30,
        'page-count': 0,
        page_size: 12,
        page_sizes: [3, 9, 12, 24],
        layout: 'total, sizes, prev, pager, next, jumper'
      }
    }
  },
  mounted () {
    this.getTableData()
    // 多条件表单输入的初始值
    this.initForm.user = this.multipleForm.user
    this.initForm.date = this.multipleForm.date
    this.initForm.date = this.multipleForm.date2
    this.initForm.address = this.multipleForm.address
    this.initForm.province = this.multipleForm.province
    this.initForm.trade.start = this.multipleForm.trade.start
    this.initForm.trade.end = this.multipleForm.trade.end
  },
  methods: {
    initFormData (data) {
      this.initForm = data
    },
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
    // 获取搜索结果表格数据 result 请求参数
    getSearchResultData (result) {
      window.fetch('http://192.168.1.24:8071/templateBeta/formSearchResult.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'user=' + result.user + '&date=' + result.date + '&province=' + result.province + '&address=' + result.address + '&startTrade=' + result.trade.start + '&endTrade=' + result.trade.end
      }).then((response) => {
        return response.json()
      }).then((json) => {
        this.tableData = json.data
      }).catch((ex) => {
        console.log('parsing failed', ex)
      })
    },
    // 获取搜索结果标签数据
    getSearchResultTags () {
      window.fetch('http://192.168.1.24:8071/templateBeta/searchResultTags.json').then((response) => {
        return response.json()
      }).then((json) => {
        this.searchResultTags = json.data
      }).catch((ex) => {
        console.log('parsing failed', ex)
      })
    },
    // 获取表格其他页码数据
    getTablePageData () {
      window.fetch('http://192.168.1.24:8071/templateBeta/tableDataPage.json').then((response) => {
        return response.json()
      }).then((json) => {
        this.tableData = json.data
      }).catch((ex) => {
        console.log('parsing failed', ex)
      })
    },
    // 表格行选择
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // 单条件筛选
    filterSubmit () {
      if (this.multipleForm.user) {
        this.getSearchResultData(this.multipleForm)
        if (this.tableData.length === 0) {
          this.tableEmptyTip = '查无结果'
        }
      } else {
        this.getTableData()
      }
    },
    // 表格操作列的“更多”菜单项事件
    handleMoreCommand (command) {
      this.delRow(command, this.tableData)
    },
    // 编辑行数据
    editRow (index, rows) {
      this.dialogFormVisible = true
      document.body.appendChild(this.$refs.editDialog.$el)
      this.tableForm = rows[index]
    },
    // 编辑行数据保存
    saveForm () {
      this.dialogFormVisible = false
      this.tableForm.date = moment(this.tableForm.date).format('YYYY-MM-DD')
    },
    // 删除表格中的行数据
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
    showMessage (type, msg) {
      this.$message({
        type: type,
        message: msg
      })
    },
    // 当前页显示页码总数切换更新表格数据
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.getTablePageData()
    },
    // 页码切换更新表格数据
    handleCurrentChange (val) {
      this.currentPage4 = val
      // console.log(`当前页: ${val}`)
      this.getTablePageData()
    },
    // 多条件筛选事件：
    // 设置收缩或展开滤选文案
    setMultipleSearchText (button, icon) {
      this.$refs.multipleSearchText.$el.innerHTML = button + '<i class="el-icon-arrow-' + icon + ' el-icon--right"></i>'
    },
    // 展开收缩多条件筛选表单
    multipleShow () {
      if (this.multipleSearchCollapse) {
        this.multipleSearchCollapse = false
        this.setMultipleSearchText('收缩滤选', 'up')
      } else {
        this.multipleSearchCollapse = true
        this.setMultipleSearchText('展开滤选', 'down')
      }
    },
    // 提交筛选
    multipleSubmitSearch () {
      this.multipleFilterStatus = false
      this.getSearchResultData(this.multipleForm)
      this.getSearchResultTags()
    },
    // 重置筛选条件
    multipleResetSearch () {
      this.multipleFilterStatus = true
      // 表单数据恢复成初始化数据
      this.multipleForm.user = this.initForm.user
      this.multipleForm.date = this.initForm.date
      this.initForm.date = this.multipleForm.date2
      this.multipleForm.address = this.initForm.address
      this.multipleForm.province = this.initForm.province
      this.multipleForm.trade.start = this.initForm.trade.start
      this.multipleForm.trade.end = this.initForm.trade.end
      this.$nextTick(() => {
        this.setMultipleSearchText('收缩滤选', 'up')
      })
      // 重新获取表格数据
      this.getTableData()
    },
    // 清空筛选条件
    multipleCleanSearch () {
      this.multipleSearchCollapse = true
      this.multipleFilterStatus = true
      // 重新获取表格数据
      this.getTableData()
    },
    // 修改筛选条件
    multipleRecoverSearch () {
      this.multipleFilterStatus = true
      this.$nextTick(() => {
        this.setMultipleSearchText('收缩滤选', 'up')
      })
      // 重新获取表格数据
      this.getTableData()
    },
    // 展开收缩结果
    resultShow () {
      if (this.searchResultStatus) {
        this.searchResultStatus = false
        this.$refs.resultCollapseText.$el.innerHTML = '展开结果' + '<i class="el-icon-arrow-' + 'down' + ' el-icon--right"></i>'
      } else {
        this.searchResultStatus = true
        this.$refs.resultCollapseText.$el.innerHTML = '收缩结果' + '<i class="el-icon-arrow-' + 'up' + ' el-icon--right"></i>'
      }
    },
    // 标签删除
    tagClose (tag) {
      this.searchResultTags.splice(this.searchResultTags.indexOf(tag), 1)
      if (this.searchResultTags.length > 0) {
        this.getSearchResultData(this.multipleForm)
      } else {
        // 标签已删除最后一个
        // 重置筛选条件
        this.multipleCleanSearch()
      }
    },
    // 多条件筛选组件应用 event
    submitSearch () {
      console.log('提交筛选')
      this.getSearchResultTags()
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
    },
    // 多条件筛选组件应用 event/end
    tagCloseSearch (tag) {
      this.searchResultTags.splice(this.searchResultTags.indexOf(tag), 1)
      if (this.searchResultTags.length > 0) {
        this.getSearchResultData(this.multipleForm)
      } else {
        // 标签已删除最后一个
        // 重置筛选条件
        this.$refs.multifilter.multipleCleanSearch()
      }
    },
    clearTagCheck () {

    },
    tagHandleClick (index) {
      for (let i = 0; i < this.evaluateTag.length; i++) {
        if (i === index) {
          if (this.evaluateTag[i].check) {
            this.evaluateTag[i].check = false
          } else {
            this.evaluateTag[i].check = true
          }
        } else {
          this.evaluateTag[i].check = false
        }
      }
    },
    onChangeCurrentChange (page) {
      this.$message('当前页是第' + page + '页')
    },
    onChangePageSize (pageSize) {
      this.$message('当前每页显示' + pageSize + ' 条')
    }
  }
})

