import Vue from 'vue'
import NuiJs from 'nui-js'

Vue.use(NuiJs)

Vue.config.productionTip = false
/* eslint-disable no-new */
const tData = [{
  'date': '2016-05-02',
  'name': '王小虎',
  'address': '上海市普陀区金沙江路 1518 弄',
  'province': '上海市',
  'level': '普通会员 '
}, {
  'date': '2016-03-01',
  'name': '金以绶',
  'address': '北京市海淀区',
  'province': '北京市',
  'level': '普通会员 '
}, {
  'date': '2016-02-11',
  'name': '孙杰',
  'address': '福建省厦门市思明区',
  'province': '福建省',
  'level': '普通会员 '
}, {
  'date': '2016-03-12',
  'name': '王小虎',
  'address': '上海市普陀区金沙江路 1518 弄',
  'province': '上海市',
  'level': '普通会员 '
}]
new Vue({
  el: '#example',
  data () {
    return {
      activeName: 'first',
      activeName2: 'fir',
      tableData: tData,

      loadingMask: true,
      loading: true,
      // 接口数据
      orgnazationData: [],
      orgnazationShops: [],
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
    this.loadingMask = false
    this.getOrgnazationData()
    this.$nextTick(() => {
      // body视图高度 - （当前声明区域#example距离浏览器顶部高度offsetHeight + 当前滚动区域顶部距离父级结构的间距大小 offsetTop
      let leftLimitHeight = document.body.offsetHeight - (this.$el.offsetTop + this.$refs.layoutLeftScroll.$el.offsetTop + 3)
      // 左侧栏高度固定
      this.$refs.layoutLeftScroll.$el.children[0].style.height = leftLimitHeight + 'px'
      this.$refs.layoutLeftScroll.$el.children[0].style.oveflowY = 'scroll'
    })
  },
  methods: {
    getOrgnazationData () {
      window.fetch('http://192.168.1.24:8071/templateBeta/orgnazationData.json').then((response) => {
        return response.json()
      }).then((json) => {
        this.orgnazationData = json.data
      }).catch((ex) => {
        console.log('orgnazationData.json parsing failed', ex)
      })
    },
    filterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    handleNodeClick (data, node) {
      // console.log(data)
      // console.log(node)
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
    beforeAddNode (call, data, node, store) {
      call({
        children: []
      })
    },
    // 返回新节点或者编辑状态下节点的最新数据 event
    // newValue为input的输入文本
    saveNewData (call, data, node, store, newValue) {
      let that = this
      if (newValue) {
        call(true, {
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
    }
  }
})
