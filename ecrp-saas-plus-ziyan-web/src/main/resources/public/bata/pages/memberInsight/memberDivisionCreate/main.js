import Vue from 'vue'
import NuiJs from 'nui-js'
import busToggles from '../../../components/business-toggles/index'
import './page.css'

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
      sex: 'nan',
      unsub: 'yes',
      levelrule: 'equal',
      dates: 'd1',
      level: '',
      date1: '',
      levelchance: 'and',
      levelOptions: [{
        value: 'brand1',
        label: '品牌1',
        children: [{
          value: 'level1',
          label: '普通会员'
        }, {
          value: 'level2',
          label: '高级会员'
        }, {
          value: 'level3',
          label: 'VIP会员'
        }, {
          value: 'level4',
          label: '至尊VIP'
        }]
      }, {
        value: 'brand2',
        label: '品牌2',
        children: [{
          value: 'level1',
          label: '普通会员'
        }, {
          value: 'level2',
          label: '高级会员'
        }, {
          value: 'level3',
          label: 'VIP会员'
        }, {
          value: 'level4',
          label: '至尊VIP'
        }]
      }],
      levelSelected: [],
      memberProperty: 'base',
      memberChoose: ['rfm', 'base', 'custom', 'trade', 'market'],
      // 订单商品筛选 弹窗
      goodsFilterDialog: false,
      goodsFilterValidateForm: {
        rule: '',
        formRadioTime: '绝对时间',
        formRadio: '',
        franking: '不限',
        coupon: '不使用',
        orderDate: '',
        ordertime: '',
        select: ''
      },
      // 表单校验配置项
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      relativeTime: false,
      frankingPrice: false,
      couponPrice: false,
      // /end 订单商品筛选 弹窗
      // 选择店铺 下拉树配置项：
      shopDropTreeValue: '',
      shopDropTreeVisible: false,
      shopDropTreeList: [],
      shopDroptreeWidth: ''
      // 选择店铺 下拉树配置项/end
    }
  },
  mounted () {
    this.getOrgnazationShops()

    this.$nextTick(() => {
      let footerHeight
      if (document.getElementsByTagName('footer')[0] !== undefined) {
        footerHeight = document.getElementsByTagName('footer')[0].offsetHeight
      } else {
        footerHeight = 0
      }
      // body视图高度 - （底部栏高度 offsetHeight+ 当前声明区域#example距离浏览器顶部高度offsetHeight + 当前滚动区域顶部距离父级结构的间距大小 offsetTop + tab页签高度
      let leftLimitHeight = document.body.offsetHeight - (footerHeight + this.$el.offsetTop + this.$refs.layoutLeftScroll.$el.offsetTop + 50)
      // body视图高度 - （底部栏高度 offsetHeight+ 当前声明区域#example距离浏览器顶部高度offsetHeight + 当前滚动区域顶部距离父级结构的间距大小 offsetTop + tab页签高度（36）  + 底部栏与内容区域的margin值
      let rightLimitHeight = document.body.offsetHeight - (footerHeight + this.$el.offsetTop + this.$refs.memberChooseScroll.$el.offsetTop + 50 + 15)
      // 左侧栏高度固定
      this.$refs.layoutLeftScroll.$el.children[0].style.maxHeight = leftLimitHeight + 'px'
      // 右侧分层属性类型区域最高高度（决定滚动区域）
      this.$refs.memberChooseScroll.$el.children[0].style.maxHeight = rightLimitHeight + 'px'
    })
  },
  methods: {
    handleChooseChange (val) {
      console.log(val)
    },
    // 点击属性列表设置右侧对应属性
    setPropertyChoose (name) {
      // 判断 memberChoose 中的值是否有与name对应，有的话替换对应位置，没有的话，在memberChoose后面增加一条
      let chooseNames = this.memberChoose.slice(0)
      let index = chooseNames.indexOf(name)

      if (index > -1) {
        chooseNames.splice(index, 1)
      } else {
        this.memberChoose.push(name)
      }

      // 如果原来页面中其他元素有 is-focus 类名，将其去除
      let focus = document.getElementsByClassName('is-focus')
      for (let i = 0; i < focus.length; i++) {
        if (focus.length > 0) {
          document.getElementsByClassName('is-focus')[i].className = focus[i].className.replace(/ is-focus/, '')
        }
      }
      this.$nextTick(() => {
        // 添加 is-focus 类名
        let oldClassName = document.getElementById(name).className
        if (oldClassName.indexOf('is-focus') < 0) {
          document.getElementById(name).className = oldClassName.concat(' is-focus')
        }
      })
    },
    // 时间选择更改
    goodsFilterTime (val) {
      if (val === '绝对时间') {
        this.relativeTime = false
      } else {
        this.relativeTime = true
      }
    },
    // 邮费更改
    goodsFilterFranking (val) {
      if (val === '不限') {
        this.frankingPrice = false
      } else {
        this.frankingPrice = true
      }
    },
    // 优惠券
    goodsFilterCoupon (val) {
      if (val === '不使用') {
        this.couponPrice = false
      } else {
        this.couponPrice = true
      }
    },
    // 选择店铺 表单下拉树 event
    handleShowShopDropTree () {
      this.shopDroptreeWidth = this.$refs.shopDropTreeInput.$el.clientWidth
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
    },
    // 选择店铺 表单下拉树 event/end
    // 品牌店铺
    getOrgnazationShops () {
      window.fetch('http://192.168.1.24:8071/templateBeta/orgnazationShops.json').then((response) => {
        return response.json()
      }).then((json) => {
        this.shopDropTreeList = json.data
      }).catch((ex) => {
        console.log('parsing failed orgnazationShops.json', ex)
      })
    }
  }
})

