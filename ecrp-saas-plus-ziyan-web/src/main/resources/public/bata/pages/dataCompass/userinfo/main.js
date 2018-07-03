import Vue from 'vue'
import NuiJs from 'nui-js'
import './page.css'
import moment from 'moment'
import busToggles from '../../../components/business-toggles/index'
import busMultiFilter from '../../../components/business-multi-filter/index'
import infiniteScroll from 'vue-infinite-scroll'
import { addScrollListener } from '../../../utils/scrollLoadmoreListener'

Vue.use(NuiJs)
Vue.config.productionTip = false
Vue.use(infiniteScroll)
/* eslint-disable no-new */

/**
 * business-form-edit
 * @desc 编辑基本信息组件
 * @param {String} value     - 值传递进来，用于修改后的保存值
 * @param {Boolean} editable - 是否启动编辑状态（默认为true，设置为false时，则不可点击编辑）
 * @param {String} type      - 保存数据（value）的类型转换， type = 'date'时，可以把把value值转换成String;其他类型转换待扩展
 *
 * @event @edit-save         - 提交筛选
 * @event @edit-cancel       - 取消修改（不保存当前表单修改）
 *
 * @slot content             - 文本区域
 * @slot edit                - 编辑区域，一般放置表单如input,select等
 *
 * @example
 *<business-form-edit label="客户ID">
 *   <el-form-grid slot="content">1212143423</el-form-grid>
 *   <el-form-grid size="sm" slot="edit"><el-input value="1212143423"></el-input></el-form-grid>
 *</business-form-edit>
 *
 */
Vue.component('business-form-edit', {
  data () {
    return {
      editStatus: false,
      oldValue: ''
    }
  },
  props: {
    value: [String, Number, Object, Array, Boolean, Date],
    editable: {
      type: Boolean,
      default: true
    },
    type: String
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
    // 信息编辑
    handleFormItemEdit (oldValue) {
      this.oldValue = oldValue
      this.editStatus = true
      this.$emit('edit', this.model)
    },
    // 信息编辑 保存结果
    handleFormItemEditSave () {
      this.editStatus = false
      // 当value的值是日期格式（object）且组件类型type='date'时，对数据进行转换,如果有其他格式转换的问题，请再依次写格式转换方法
      if (typeof (this.model) === 'object' && this.type === 'date') {
        this.model = moment(this.model).format('YYYY-MM-DD')
      }
      this.$emit('edit-save', this.model)
    },
    // 信息编辑 取消
    handleFormItemEditCancel () {
      this.model = this.oldValue
      this.editStatus = false
      this.$emit('edit-cancel', this.oldValue)
    }
  },
  mounted () {
  },
  template: '<span v-if="!editStatus" class="bus-form__edit is-status">' +
  '<slot name="content"></slot>' +
  '<span class="bus-form__edit-control">' +
  '<a title="编辑" class="bus-form__edit-icon is-noedit" @click="handleFormItemEdit(value)" v-if="editable"><i class="el-icon-edit"></i></a>' +
  '</span>' +
  '</span>' +
  '<span v-else="editStatus" class="bus-form__edit" >' +
  '<slot name="edit"></slot>' +
  '<span class="bus-form__edit-control">' +
  '<a title="保存" class="bus-form__edit-icon" @click="handleFormItemEditSave"><i class="el-icon-circle-check"></i></a> ' +
  '<a title="取消" class="bus-form__edit-icon"  @click="handleFormItemEditCancel(oldValue)"><i class="el-icon-circle-cross"></i></a>' +
  '</span>' +
  '</span>'
})
/* /end 编辑基本信息组件 */
var count = 0
new Vue({
  el: '#userinfo',
  components: {
    busToggles,
    busMultiFilter
  },
  data () {
    return {
      activeNameTab: 'first',
      tableData: [],
      userName: '李百灵',
      activeName: '1',
      userIntegral: 567,
      userConsumption: 472,
      userIntegrity: 45,
      showDialog: false,
      baseAttr: [
        {
          attr: [
            {
              title: '客户ID',
              content: '123456'
            },
            {
              title: '性别',
              content: '保密'
            },
            {
              title: '生日',
              content: '2016-12-13'
            },
            {
              title: '手机',
              content: '186266666015'
            },
            {
              title: 'QQ',
              content: '123456789'
            },
            {
              title: '会员卡号',
              content: '123456789'
            }
          ]
        },
        {
          attr: [
            {
              title: '会员姓名',
              content: '李百灵'
            },
            {
              title: '会员等级',
              content: 'V5'
            },
            {
              title: '身份证',
              content: '123456789123456798'
            },
            {
              title: '固定电话',
              content: '186266666015'
            },
            {
              title: 'Email',
              content: '123456789'
            }
          ]
        }
      ],
      baseLongAttr: [
        {
          title: '地区',
          content: '吉林省长春市市、县、区'
        },
        {
          title: '详细地址',
          content: '双德乡创建街246号，吉林加一土产有限公司'
        }
      ],
      selected: '',
      checkArray: ['全部', '富隆维特思旗舰店', '富隆酒窖旗舰店'],
      checklist: ['富隆维特思旗舰店'],
      userinfoTable: [{
        brand: '品牌1',
        vip: '注册',
        integral: '50000',
        right: false,
        touch: true
      }, {
        brand: '品牌2',
        vip: '注册',
        integral: '64363',
        right: true,
        touch: true
      }, {
        brand: '品牌3',
        vip: '注册',
        integral: '643463',
        right: true,
        touch: true
      }, {
        brand: '品牌5',
        vip: '注册',
        integral: '4525',
        right: true,
        touch: false
      }],
      editValue1: '1234568',
      levelValue: ['v1'],
      sexValue: '保密',
      baseInfo: [],
      baseInfoAdd: [
        {
          'label': '地区',
          'value': ['福建省', '厦门市', '思明区'],
          'style': 'cascader',
          'type': 'text',
          'edit': false,
          'options': [{
            'label': '福建省',
            'value': '福建省',
            'children': [
              {
                'label': '厦门市',
                'value': '厦门市',
                'children': [{
                  'label': '思明区',
                  'value': '思明区'
                }, {
                  'label': '湖里区',
                  'value': '湖里区'
                }, {
                  'label': '集美区',
                  'value': '集美区'
                }]
              },
              {
                'label': '福州市',
                'value': '福州市',
                'children': [
                  {
                    'label': '鼓楼区',
                    'value': '鼓楼区'
                  },
                  {
                    'label': '台江区',
                    'value': '台江区'
                  }
                ]
              }
            ]
          }, {
            'label': '广东省',
            'value': '广东省',
            'children': [
              {
                'label': '广州市',
                'value': '广州市'
              },
              {
                'label': '深圳市',
                'value': '深圳市',
                'children': [
                  {
                    'label': '福田区',
                    'value': '福田区'
                  }]
              }]
          }]
        },
        {
          'label': '详细地址',
          'value': '双德乡创建街246号，吉林加一土产有限公双德乡创建街246号，吉林加一土产有限公双德乡创建街246号，吉林加一土产有限公司',
          'style': 'input',
          'type': 'text',
          'edit': true,
          'options': []
        }
      ],
      date1: '2017-04-04 12:23:42',
      contrailTableData1: [{
        plat: '天猫',
        orders: 13,
        pays: 32,
        total: 200,
        deal: 4390,
        unitprice: 12
      }, {
        plat: '天猫',
        orders: 13,
        pays: 32,
        total: 200,
        deal: 4390,
        unitprice: 12
      }],
      // begin 商品数据
      goodsVisible: false,
      // /end 商品数据
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
      // 部门下拉树配置项：
      defaultSelect: '',
      dropTreeValue: '',
      dropTreeVisible: false,
      dropTreeList: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 11,
          label: '二级 1-1',
          children: [{
            id: 111,
            label: '三级 1-1-1'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 21,
          label: '二级 2-1',
          children: [{
            id: 211,
            label: '三级 2-1-1'
          }]
        }, {
          id: 22,
          label: '二级 2-2',
          children: [{
            id: 221,
            label: '三级 2-2-1'
          }]
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 31,
          label: '二级 3-1',
          children: [{
            id: 311,
            label: '三级 3-1-1'
          }]
        }]
      }],
      droptreeWidth: '',
      //  部门下拉树配置项/end
      brandRadio: '品牌一',
      orderDetailDialog: false,
      flatCheck: '',
      scrollData: [],
      loadingTip: '没有更多啦！'
    }
  },
  mounted () {
    this.getTableData()
    for (var i = 1, j = 10; i < j; i++) {
      this.scrollData.push({name: count++})
    }
  },
  methods: {
    // 会员数据
    getTableData () {
      window.fetch('http://192.168.1.24:8071/templateBeta/tableData.json').then((response) => {
        return response.json()
      }).then((json) => {
        this.tableData = json
      }).catch((ex) => {
        console.log('parsing failed', ex)
      })
    },
    getBaseInfo () {
      window.fetch('http://192.168.1.24:8071/templateBeta/baseInfo.json').then((response) => {
        return response.json()
      }).then((json) => {
        this.baseInfo = json.data
      }).then(() => {
        this.baseInfo.foreach((info, index) => {
          if (info.type === 'date') {
            info.value = moment(info.value).format('YYYY-MM-DD')
            console.log(info.value)
          }
        })
      }).catch((ex) => {
        console.log('baseInfo.json parsing failed', ex)
      })
    },
    closeDialog () {
      this.showDialog = false
    },
    selectType (button) {
      this.selected = button.currentTarget.getElementsByTagName('span')[0].innerText
    },
    openDialog () {
      this.showDialog = true
      this.getBaseInfo()
      this.$nextTick(() => {
        // 购物轨迹 监听滚动变化 工具类
        addScrollListener(this.$refs.trail.$el.children[0], this.lineLoadMore)
      })
    },
    // 购物轨迹，滚动加载更多(后台工程使用require模式，请查看core首页 )
    lineLoadMore () {
      this.loadingTip = '努力加载中...'
      let lastValue = this.scrollData[this.scrollData.length - 1].name
      if (lastValue < 30) {
        console.log('----加载中----')
        setTimeout(() => {
          for (let i = 1; i <= 10; i++) {
            this.scrollData.push({name: lastValue + i})
          }
          console.log('----加载完成----')
        }, 3000)
      } else {
        console.log('--没有更多啦--')
        this.loadingTip = '没有更多啦！'
      }
    },
    handleSwitch (val) {
      console.log('权益黑名单：' + val)
    },
    // /end 会员数据
    // begin 商品数据
    openGoodsDialog () {
      this.goodsVisible = true
    },
    // /end 会员数据,
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
    },
    // 多条件筛选组件应用 event/end
    // 部门下拉树 event
    // 清空输入框
    handleCleanClick () {
      this.dropTreeValue = ''
      this.$refs.dropTree.setCheckedKeys([])
    },
    handleShowDropTree () {
      this.droptreeWidth = this.$refs.droptreeinput.$el.clientWidth
    },
    handleSelectValue (data, checked, indeterminate) {
      // this.dropTreeVisible = false
      //   this.dropTreeValue = data.label
      let checkArr = this.$refs.dropTree.getCheckedNodes()
      let checkArrLable = []
      for (let i = 0; i < checkArr.length; i++) {
        checkArrLable.push(checkArr[i].label)
      }
      this.dropTreeValue = checkArrLable.join(',')
    },
    handleHideDroptree () {
      this.dropTreeVisible = false
    },
    // 部门下拉树 event/end
    openOrderDetail () {
      this.orderDetailDialog = true
    },
    // 弹窗内容区域滚动条监听事件
    handleScroll (val) {
      let oldClassName = document.getElementById('userinfo-tabs').className
      if (val > 1) {
        if (oldClassName.indexOf(' is-stick') < 0) {
          document.getElementById('userinfo-tabs').className = oldClassName.concat(' is-stick')
        }
      } else if (val === 0) {
        if (oldClassName.indexOf('is-stick') > 0) {
          document.getElementById('userinfo-tabs').className = oldClassName.replace(/ is-stick/, '')
        }
      }
    }
  }
})
