import Vue from 'vue'
import NuiJs from 'nui-js'
import './page.css'

Vue.use(NuiJs)
Vue.config.productionTip = false
/* eslint-disable no-new */

/**
 * bus-refresh
 * @desc 数值更新
 * @param {String} value     - 值传递进来，用于修改后的保存值
 *
 * @event @click         - 点击刷新
 *
 * @example
 *<bus-refresh v-modle="text" @click="handleClick"></bus-refresh>
 *
 */
Vue.component('bus-refresh', {
  data () {
    return {
      showShade: false
    }
  },
  props: {
    value: [String, Number]
  },
  computed: {
    model: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    handleClick () {
      if (!this.showShade) {
        this.showShade = true
        setTimeout(() => {
          this.showShade = false
        }, 3000)
        this.$emit('click')
      } else {
      }
    }
  },
  template: '<strong class="cate-number" @click="handleClick" :class="{ \'is-refreshing\': this.showShade}"><span class="cate-shade" v-show="showShade"><i class="bui-refresh"></i></span>' +
  '{{value}}' +
  '</strong>'
})
/* /end 编辑基本信息组件 */

let id = 1000
let count = 90000
new Vue({
  el: '#example',
  data () {
    return {
      // 接口数据
      orgnazationData: [],
      orgnazationEmpty: '数据加载中',
      refreshData: '2,322,323',
      listData: [{
        'name': '至尊VIP送礼物组1',
        'group': '2,322,323',
        'marketing': '12,333',
        'denied': true
      }, {
        'name': '至尊VIP送礼物组2',
        'group': '54,354',
        'marketing': '168,819',
        'denied': true
      }, {
        'name': '至尊VIP送礼物组3',
        'group': '2,322,323',
        'marketing': '12,333',
        'denied': true
      }, {
        'name': '至尊VIP送礼物组4',
        'group': '54,354',
        'marketing': '22,374',
        'denied': true
      }, {
        'name': '至尊VIP送礼物组5',
        'group': '2,322,323',
        'marketing': '12,333',
        'denied': true
      }, {
        'name': '至尊VIP送礼物组6',
        'group': '52,374',
        'marketing': '27,742',
        'denied': false
      }, {
        'name': '至尊VIP送礼物组10',
        'group': '2,834,075',
        'marketing': '12,333',
        'denied': true
      }, {
        'name': '至尊VIP送礼物组7',
        'group': '54,354',
        'marketing': '2,654',
        'denied': false
      }, {
        'name': '至尊VIP送礼物组8',
        'group': '2,872,365',
        'marketing': '64,213',
        'denied': false
      }, {
        'name': '至尊VIP送礼物组9',
        'group': '354',
        'marketing': '222',
        'denied': true
      }],
      // 选择部门 下拉树配置项：
      dropTreeValue: '',
      dropTreeVisible: false,
      dropTreeList: [{
        label: '工程部',
        children: [{
          label: '总经办',
          children: [{
            label: '企划部'
          }]
        }]
      }, {
        label: '人事行政中心',
        children: [{
          label: '人事部'
        }, {
          label: '行政部'
        }]
      }, {
        label: '研发中心',
        children: [{
          label: '研发一部',
          children: [{
            label: '爱互动组'
          }]
        }, {
          label: '研发二部',
          children: [{
            label: 'CRM 项目组'
          }]
        }]
      }],
      droptreeWidth: ''
      // 选择部门 下拉树配置项/end
    }
  },
  mounted () {
    this.getOrgnazationData()
    this.$nextTick(() => {
      let rightScrollHeight = document.body.offsetHeight - (this.$el.offsetTop + this.$refs.layoutScroll.$el.offsetTop + 3)
      this.$refs.layoutScroll.$el.children[0].style.height = rightScrollHeight + 'px'
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
    handleRefreshClick (index) {
      let newData = {
        'name': '至尊VIP送礼物组1',
        'group': Math.round(Math.random() * 10000),
        'marketing': Math.round(Math.random() * 10000)
      }
      let deniedata = {}
      if (index === 5 || index === 7 || index === 8) {
        deniedata = {
          'denied': false
        }
      } else {
        deniedata = {
          'denied': true
        }
      }
      Object.assign(newData, deniedata)
      this.$set(this.listData, index, newData)
    },
    // 表单下拉树 event
    handleShowDropTree () {
      this.droptreeWidth = this.$refs.droptreeinput.$el.clientWidth
    },
    handleSelectValue (data) {
      this.dropTreeVisible = false
      this.dropTreeValue = data.label
    }
  }
})
