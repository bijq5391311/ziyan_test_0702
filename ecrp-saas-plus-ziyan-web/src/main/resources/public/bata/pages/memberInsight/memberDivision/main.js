import Vue from 'vue'
import NuiJs from 'nui-js'
import './page.css'
// import BuiOrgCollapse from '../../../components/org-collapse/index.js'
import busMultiFilter from '../../../components/business-multi-filter/index'

Vue.use(NuiJs)
Vue.config.productionTip = false
/* eslint-disable no-new */
let id = 1000
let count = 90000
new Vue({
  el: '#example',
  components: {
    busMultiFilter
  },
  data () {
    return {
      filterText: '',
      loading: true,
      activeName: 'first',
      defaultSelect: '',
      date: '',
      items: [
        {message: 'Foo'},
        {message: 'Bar'}
      ],
      data: [{
        label: '总经办总经办总经办总经办',
        children: [
          {
            label: '企划部企划部企划部企',
            children: []
          },
          {
            label: '法务部',
            children: []
          }
        ]
      }, {
        label: '人事行政中心',
        children: [{
          label: '人事部',
          children: []
        }, {
          label: '行政部',
          children: []
        }]
      }, {
        label: '研发中心',
        children: [{
          label: '研发一部',
          children: [
            {
              label: '爱互动组'
            },
            {
              label: '前端组'
            },
            {
              label: '智客组'
            }
          ]
        }, {
          label: '研发二部',
          children: [{
            label: 'CRM 项目组'
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      tableData: [], // 默认表格
      tableEmptyTip: '暂无数据', // 表格数据为空时的提示语
      currentPage4: 4,
      lineProps: {
        children: 'children',
        label: 'label',
        mark: 'mark'
      },
      brandNames: '百草味',        // 品牌折叠面板默认打开
      storecheckNames: ['1'], // 类别折叠面板
      // 接口数据
      orgnazationData: [],
      orgnazationShops: [],
      orgnazationEmpty: '数据加载中',
      tree: [],
      list: []
    }
  },
  watch: {
    filterText (val) {
      this.$refs.filterExtra.filter(val)
    }
  },
  mounted () {
    this.getOrgnazationData()
    this.getOrgnazationShops()
    this.$nextTick(() => {
      // body视图高度 - （当前声明区域#example距离浏览器顶部高度offsetHeight + 当前滚动区域顶部距离父级结构的间距大小 offsetTop + tab页签高度
      let leftLimitHeight1 = document.body.offsetHeight - (this.$el.offsetTop + this.$refs.layoutLeftScroll1.$el.offsetTop + 36 + 13)
      let leftLimitHeight12 = document.body.offsetHeight - (this.$el.offsetTop + this.$refs.layoutLeftScroll12.$el.offsetTop + 36 + 13)
      let leftLimitHeight2 = document.body.offsetHeight - (this.$el.offsetTop + this.$refs.layoutLeftScroll2.$el.offsetTop + 36 + 33)
      let leftLimitHeight22 = document.body.offsetHeight - (this.$el.offsetTop + this.$refs.layoutLeftScroll22.$el.offsetTop + 36 + 33)
      let leftLimitHeight3 = document.body.offsetHeight - (this.$el.offsetTop + this.$refs.layoutLeftScroll3.$el.offsetTop + 36 + 33)
      let leftLimitHeight32 = document.body.offsetHeight - (this.$el.offsetTop + this.$refs.layoutLeftScroll32.$el.offsetTop + 36 + 33)
      let layoutLeftScrollColl = document.body.offsetHeight - (this.$el.offsetTop + this.$refs.layoutLeftScrollColl.$el.offsetTop + 36 + 33)
      // 左侧栏高度固定
      this.$refs.layoutLeftScroll1.$el.children[0].style.height = leftLimitHeight1 + 'px'
      this.$refs.layoutLeftScroll12.$el.children[0].style.height = leftLimitHeight12 + 'px'
      this.$refs.layoutLeftScroll2.$el.children[0].style.height = leftLimitHeight2 + 'px'
      this.$refs.layoutLeftScroll22.$el.children[0].style.height = leftLimitHeight22 + 'px'
      this.$refs.layoutLeftScroll3.$el.children[0].style.height = leftLimitHeight3 + 'px'
      this.$refs.layoutLeftScroll32.$el.children[0].style.height = leftLimitHeight32 + 'px'
      this.$refs.layoutLeftScroll1.$el.children[0].style.oveflowY = 'scroll'
      this.$refs.layoutLeftScroll12.$el.children[0].style.oveflowY = 'scroll'
      this.$refs.layoutLeftScroll2.$el.children[0].style.oveflowY = 'scroll'
      this.$refs.layoutLeftScroll22.$el.children[0].style.oveflowY = 'scroll'
      this.$refs.layoutLeftScroll3.$el.children[0].style.oveflowY = 'scroll'
      this.$refs.layoutLeftScroll32.$el.children[0].style.oveflowY = 'scroll'
      this.$refs.layoutLeftScrollColl.$el.children[0].style.height = layoutLeftScrollColl + 'px'
    })
  },
  methods: {
    getOrgnazationData () {
      window.fetch('http://192.168.1.24:8071/templateBeta/orgnazationData.json').then((response) => {
        return response.json()
      }).then((json) => {
        this.orgnazationData = json.data
        this.orgnazationEmpty = '暂无数据'
      }).catch((ex) => {
        console.log('orgnazationData.json parsing failed', ex)
      })
    },
    filterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    getOrgnazationShops () {
      window.fetch('http://192.168.1.24:8071/templateBeta/orgnazationShops.json').then((response) => {
        return response.json()
      }).then((json) => {
        this.loading = false
        this.orgnazationShops = json.data
      }).catch((ex) => {
        console.log('orgnazationShops.json parsing failed', ex)
      })
    },
    ha (val) {
      // TODO 测试用方法
      console.log(val)
      for (let i = 0; i < val.length; i++) {
        if (val[i] !== '3') {
          // if (this.lastLeaf.isShow) {
          //   this.lastLeaf.isIcon = true
          //   this.lastLeaf.isShow = false
          // }
        }
      }
    },
    handleNodeClick (data, node) {
      // console.log(data)
      // console.log(node)
    },
    append (store, data) {
      store.append({id: id++, label: 'testtest', children: []}, data)
    },

    remove (store, data) {
      store.remove(data)
    },
    // 组织树的（增删查）按钮
    renderContent (h, {node, data, store}) {
      return h('span', {
        'class': ['tree-organize-label']
      }, [
        h('span', {
          'class': ['tree-organize--name'],
          domProps: {
            innerHTML: node.label
          }
        }),
        h('span', {
          'class': ['tree-organize--control']
        }, [
          h('i', {
            'class': ['bu-icon', 'bui-add'],
            on: {
              click: function () {
                alert('点击了增加')
              }
            }
          }),
          h('i', {
            'class': ['bu-icon', 'bui-edit'],
            on: {
              click: function () {
                alert('点击了编辑')
              }
            }
          }),
          h('i', {
            'class': ['bu-icon', 'bui-delete'],
            on: {
              click: function () {
                alert('点击了删除')
              }
            }
          }),
          h('i', {
            'class': ['bu-icon', 'bui-shop-setting'],
            on: {
              click: function () {
                alert('点击了店铺设置')
              }
            }
          })
        ])
      ])
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
    // 当前页显示页码总数
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    // 页码切换
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    // 树的扩展相关 event
    // 点击节点 event
    handleOrgClick (data, node, thisel) {
      //  console.log(node)
      //  console.log(data)
      //  console.log(thisel)
    },
    // 删除节点前 事件回调，返回true可删除，false则不删除
    beforeDeleteNode (call, data, node, store) {
      call(confirm('确认删除 节点 -- ' + data.label + ' 吗？'))
    },
    afterDeleteNode (data, node, store) {
      // console.log(node);
      // console.log(store);
      console.log('删除节点后方法')
    },
    // 添加前（可默认配置新节点的基础数据，可不用配置id） event
    beforeAddNode (call, data, node, store) {
      call({
        id: id,
        children: []
      })
    },
    // 返回新节点或者编辑状态下节点的最新数据 event
    // newValue为input的输入文本
    saveNewData (call, data, node, store, newValue) {
      let that = this
      if (newValue) {
        call(true, {
          id: count++,
          label: newValue,
          children: data.children,
          showAdd: true,
          showEdit: true,
          showDelete: true
        })
      } else {
        that.$message({
          message: '节点名称为空,将无法保存',
          type: 'warning'
        })
        call(false, {})
      }
    },
    beforeEditNode (call, data, node, store) {
      console.log('--beforeEditNode--')
      console.log('--  如果不配置下面的call()，则输入框不会获取到焦点 --')
      call()
    },
    saveEditData (call, data, node, store, newValue) {
      setTimeout(() => {
        let that = this
        if (newValue) {
          call(true, {
            id: data.id,
            label: newValue,
            children: data.children,
            showAdd: data.showAdd,
            showEdit: data.showDelete,
            showDelete: data.showDelete
          })
        } else {
          that.$message({
            message: '节点名称为空,将无法保存',
            type: 'warning'
          })
          call(false, {})
        }
      }, 3000)
    },
    // 在“增删改” 图标后面添加 自定义的操作类图标
    setCustomIcon (h, {data, node, store}) {
      let that = this
      return h('span', {
        'class': 'el-tree__extra-action'
      }, [
        h('el-tooltip', {
          attrs: {
            content: data.label,
            placement: 'top',
            effect: 'light'
          }
        }, [
          h('i', {
            class: 'el-icon-share',
            on: {
              'click': function () {
                that.customEvent(data, node, store) // 图标点击事件
              }
            }
          })
        ])
      ])
    },
    customEvent (data, node, store) {
      alert('自定 义事件')
      console.log('自定义事件 : data')
      console.log(data)
      data.mark = true
      this.$nextTick(() => {
        //  数据驱动
        document.getElementById(data.id).style.display = 'none'
      })
    },
    // end/树的扩展相关event
    handleStorecheckCateChange (activName) {
      console.log(this.$refs.a)
      console.log(this.$refs.a[0].getRootLeafNodes())
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
    }
    // 多条件筛选组件应用 event/end
  }
})
