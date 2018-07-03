import Vue from 'vue'
import NuiJs from 'nui-js'
import busDraggable from 'vuedraggable'
import './page.css'

Vue.use(NuiJs)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#example',
  data () {
    return {
      activeName2: 'first',
      // 拖拽配置项/begin
      configureColSpan: [4, 6, 14],
      isView: true,
      viewCol: 6, // 是否显示预览时的配置区域栅格
      tableData: [],
      list: [{
        name: '表单编辑'
      }, {
        name: 'Name'
      }, {
        name: 'Code'
      }, {
        name: '表单编辑2'
      }, {
        name: 'Name2'
      }, {
        name: 'Code2'
      }, {
        name: '表单编辑'
      }, {
        name: 'Name'
      }, {
        name: 'Code'
      }],
      list2: [{
        name: '表单编辑'
      }, {
        name: 'Name'
      }, {
        name: 'Code'
      }],
      listForm: [{
        name: '表单编辑2Name'
      }, {
        name: '表单编辑1Name'
      }, {
        name: '表单编辑3Name'
      }]
      // 拖拽配置项/end
    }
  },
  components: {
    busDraggable
  },
  mounted () {
    this.getTableData()
    this.$nextTick(() => {
      // 右侧栏高度固定
      this.$refs.layoutLeftScroll.$el.children[0].style.height = document.body.offsetHeight - this.$refs.tmpConfigure.$el.offsetTop - this.$refs.tmpConfigure.$el.offsetTop - this.$refs.layoutLeftScroll.$el.offsetTop - 30 + 'px'
      this.$refs.layoutLeftScroll.$el.children[0].style.oveflowY = 'scroll'
    })
  },
  computed: {
    viewIconClass () {
      return this.isView ? 'arrow-right' : 'arrow-left'
    },
    viewTips () {
      return this.isView ? '收缩预览' : '展开预览'
    }
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
    // 拖拽 event
    handleCloseItem (tag) {
      this.$confirm('此操作删除配置项' + tag + ', 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.list2.splice(this.list2.indexOf(tag), 1)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleOnEnd () {
      console.log('拖拽结束')
    },
    handleView () {
      this.isView = !this.isView
      this.isView ? this.viewCol = 6 : this.viewCol = 20
    }
    // 拖拽 event/end
  }
})

