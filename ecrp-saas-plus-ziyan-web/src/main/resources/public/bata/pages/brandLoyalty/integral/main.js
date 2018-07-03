import Vue from 'vue'
import NuiJs from 'nui-js'
import busToggles from '../../../components/business-toggles/index'

Vue.use(NuiJs)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#example',
  components: {
    busToggles
  },
  data () {
    return {
      activeName: 'first',
      // 启用开关
      delivery: '',
      // /end 启用开关

      // 积分取整规则
      defaultSelect: '',
      // 排除渠道
      selectPlatFrom: '',
      // 单选
      formRadio1: '',
      formRadio2: '',
      formRadio3: '',
      // /end 单选

      // 选择店铺 下拉树配置项：
      shopDropTreeValue: '',
      shopDropTreeVisible: false,
      shopDropTreeList: [],
      shopDroptreeWidth: '',
      // /end 选择店铺 下拉树配置项：

      // 选择商品
      showToggles: false
      // /end 选择商品
    }
  },
  mounted () {
    this.getOrgnazationShops()
  },
  methods: {
    // 表单下拉树 event
    handleShowDropTree () {
      this.droptreeWidth = this.$refs.droptreeinput.$el.clientWidth
    },
    handleSelectValue (data) {
      this.dropTreeVisible = false
      this.dropTreeValue = data.label
    },
    // 选择店铺 表单下拉树 event
    handleShowShopDropTree () {
      this.shopDroptreeWidth = this.$refs.shopDropTreeInput.$el.clientWidth
    },
    // 品牌店铺
    getOrgnazationShops () {
      window.fetch('http://192.168.1.24:8071/templateBeta/orgnazationShops.json').then((response) => {
        return response.json()
      }).then((json) => {
        this.shopDropTreeList = json.data
      }).catch((ex) => {
        console.log('parsing failed orgnazationShops.json', ex)
      })
    },
    handleShopSelectValue (data) {
      this.shopDropTreeVisible = false
      this.shopDropTreeValue = data.label
    },
    handleSaveShopSelect () {
      this.shopDropTreeVisible = false
      console.log(this.$refs.shopDropTree.getCheckedNodes())
      let selectArray = this.$refs.shopDropTree.getCheckedNodes()
      let resultArray = []
      selectArray.forEach((data) => {
        resultArray.push(data.label)
      })
      console.log(resultArray)
      this.shopDropTreeValue = resultArray.join(',')
    }
    // 选择店铺 表单下拉树 event/end
  }
})
