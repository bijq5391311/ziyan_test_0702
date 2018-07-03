import Vue from 'vue'
import NuiJs from 'nui-js'
import './page.css'
import busTable from '../../../components/business-table/index'

Vue.use(NuiJs)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#example',
  components: {
    busTable
  },
  data () {
    return {
      activeName: 'first',
      tableData: [],
      formRadio: '',
      analysiesSelect: '表格',
      // 筛选表单数据
      multipleForm: {
        user: '',
        date: '2017-04-19',
        address: '厦门市',
        province: '',
        trade: {
          start: '0',
          end: '12'
        },
        source: '',
        logistics: ''
      },
      tableParam: {
        class: 'si-ddddd',
        border: true
      },
      tableParam2: {},
      tableParam3: {
        border: false,
        showHeader: false
      },
      paginationParam: {
        currentPage: 1,
        total: 30,
        'page-count': 0,
        pageSize: 9,
        pageSizes: [3, 9, 12, 24]
      },
      paginationParam2: {
        currentPage: 2,
        total: 40,
        'pageCount': 0,
        pageSize: 10
      },
      fields: [{
        key: 'id',
        label: 'ID',
        width: 50,
        resizable: false,
        html: function (h, {data}) {
          return h('div', {
            'class': ['render-box', 'bg'],
            domProps: {
              innerHTML: data.date + 'ddd'
            }
          })
        }
      }, {
        key: 'name',
        label: '姓名',
        width: 100
      }, {
        key: 'date',
        label: '日期'
      }],
      btnParam: {
        width: 110,
        list: [{
          text: '查看 | ',
          fn: ({dataRowIndex}) => {
            console.log('查看')
            this.$message('点击了第 ' + dataRowIndex + ' 行的查看')
          }
        }, {
          text: '编辑',
          fn: ({dataRowIndex}) => {
            console.log('编辑')
            this.$message('点击了第 ' + dataRowIndex + ' 行的编辑')
          }
        }, {
          text: '添加',
          fn: ({dataRowIndex}) => {
            console.log('添加')
            this.$message('点击了第 ' + dataRowIndex + ' 行的添加')
          }
        }, {
          text: '删除',
          fn: (opts) => {
            this.$message('点击了第 ' + opts.dataRowIndex + ' 行的删除')
            console.log('删除')
            console.log('data')
            console.log(opts.data)
            console.log('dataRow')
            console.log(opts.dataRow)
            console.log('btnIndex')
            console.log(opts.btnIndex)
            console.log('dataRowIndex')
            console.log(opts.dataRowIndex)
            console.log('btnInfo')
            console.log(opts.btnInfo)
          }
        }]
      },
      btnParam2: {
        width: 90,
        list: [
          {
            text: '编辑'
          },
          {
            text: '查看'
          }
        ]
      },
      btnParam3: {
        list: [
          {
            text: '查看'
          }
        ]
      },
      toolbarBtnsInfo: [{
        text: '编辑1',
        fn: (btn) => {
          console.log('编辑')
          this.$message('点击了 ' + btn.text + ' 的编辑')
        }
      }, {
        text: '编辑2',
        fn: (btn) => {
          console.log('编辑')
          this.$message('点击了 ' + btn.text + ' 的编辑')
        }
      }, {
        text: '编辑3',
        fn: (btn) => {
          console.log('编辑')
          this.$message('点击了 ' + btn.text + ' 的编辑')
        }
      }, {
        text: '编辑4',
        fn: (btn) => {
          console.log('编辑')
          this.$message('点击了 ' + btn.text + ' 的编辑')
        }
      }, {
        text: '编辑5',
        fn: (btn) => {
          console.log('编辑')
          this.$message('点击了 ' + btn.text + ' 的编辑')
        }
      }]
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
    filterSubmit (ev) {
      console.log('filterSubmit')
      this.$message('点击了单条件表单的搜索')
    },
    submitSearch () {
      console.log('提交筛选')
      // 重新获取表格数据
      this.getTableData()
    },
    resetSearch () {
      console.log('重置筛选条件')
      // 重新获取表格数据
      this.getTableData()
    },
    cleanSearch () {
      console.log('清空筛选条件')
      // 重新获取表格数据
      this.getTableData()
    },
    recoverSearch () {
      console.log('修改筛选条件')
      // 重新获取表格数据
      this.getTableData()
    },
    onPageSizeChange (pageSize) {
      console.log(`每页 ${pageSize} 条`)
    },
    onCurrentPageChange (page) {
      console.log(`当前页: ${page}`)
    },
    onSelectionChange (rows) {
      console.log(rows)
      rows.forEach((item) => {
        console.log(item.id)
      })
    },
    columnBtnsMethods (opts) {
      console.log(opts)
      this.$message('点击了第 ' + opts.dataRowIndex + ' 行的编辑')
    }
  }
})

