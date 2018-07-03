import Vue from 'vue'
import NuiJs from 'nui-js'
import './page.css'

Vue.use(NuiJs)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#example',
  data () {
    return {
      orgnazationData: [],
      orgnazationEmpty: '数据加载中',
      shopList: [],
      authorityCate: 'data',
      data: [{
        label: '总经办总经办总经办总经办',
        children: [{
          label: '企划部企划部企划部企',
          children: []
        }, {
          label: '法务部',
          children: []
        }]
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
          children: [{
            label: '爱互动组'
          }, {
            label: '前端组'
          }, {
            label: '智客组'
          }]
        }, {
          label: '研发二部',
          children: [{
            label: 'CRM 项目组'
          }]
        }]
      }]
    }
  },
  mounted () {
    this.getOrgnazationData()
    this.$nextTick(() => {
      // body视图高度 - （当前声明区域#example距离浏览器顶部高度offsetHeight + 当前滚动区域顶部距离父级结构的间距大小 offsetTop + tab页签高度
      let leftScrollOrgHeight1 = document.body.offsetHeight - (this.$el.offsetTop + this.$refs.leftScrollOrg.$el.offsetTop + 3)
      // 左侧栏“选择组织架构”高度固定：
      this.$refs.leftScrollOrg.$el.children[0].style.height = leftScrollOrgHeight1 + 'px'
      // 选择渠道 树的最大高度： body视图高度 - (头部导航高度 + 当前滚动区域顶部距离父级结构的间距大小 offsetTop + tab页签标题高度及顶部间距 + 3)
      this.$refs.channelTreeScroll.$el.children[0].style.maxHeight = document.body.offsetHeight - (this.$el.offsetTop + this.$refs.channelTreeScroll.$el.offsetTop + 46 + 3) + 'px'
      // 选择店铺 店铺列表最大高度： body视图高度 - (头部导航高度 + 当前滚动区域顶部距离父级结构的间距大小 offsetTop + tab页签标题高度及顶部间距 + 保存与重置按钮高度 + 3)
      this.$refs.shopListScroll.$el.children[0].style.maxHeight = document.body.offsetHeight - (this.$el.offsetTop + this.$refs.shopListScroll.$el.offsetTop + 46 + 40 + 3) + 'px'
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
    handleTab (tab) {
      if (tab.name === 'func') {
        this.$nextTick(() => {
          // 功能权限 树的最大高度：  body视图高度 - (头部导航高度 + 当前滚动区域顶部距离父级结构的间距大小 offsetTop  + 当前滚动区域父级顶部间距 + tab页签标题高度及顶部间距 + 3)
          this.$refs.permissionScroll.$el.children[0].style.maxHeight = document.body.offsetHeight - (this.$el.offsetTop + this.$refs.permissionScroll.$el.offsetTop + 10 + 46 + 3) + 'px'
        })
      }
    }
  }
})

