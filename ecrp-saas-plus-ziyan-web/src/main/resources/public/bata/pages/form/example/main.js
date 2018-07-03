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
      time: '',
      timeSecond: '',
      dateValue: '',
      validateForm: {
        trade: {
          start: '',
          end: ''
        },
        keyword: '',
        word: '',
        kuaidi: '',
        wuliu: '',
        address: '',
        order: ''
      },
      levelrule: '',
      formRadio: '',
      formCheck: [],
      delivery: false,
      delivery2: false,
      selectedOptions: [],
      defaultSelect: '',
      defaultSelect2: '',
      defaultMultipleSelect: [],
      fileList: [
        {
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        },
        {
          name: 'food2.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }
      ],
      // 下拉树配置项：,
      droptreeForm: {
        dropTreeValue: '初始值',
        dropTreeVisible: false
      },
      dropTreeVisible: false,
      dropTreeList: [{
        label: '一级 1',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }]
      }, {
        label: '一级 2',
        children: [{
          label: '二级 2-1',
          children: [{
            label: '三级 2-1-1'
          }]
        }, {
          label: '二级 2-2',
          children: [{
            label: '三级 2-2-1'
          }]
        }]
      }, {
        label: '一级 3',
        children: [{
          label: '二级 3-1',
          children: [{
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          children: [{
            label: '三级 3-2-1'
          }]
        }]
      }],
      droptreeWidth: '',
      // 下拉树配置项/end
      appGoods: true,
      appCate: '0',
      sendSeting: [{
        name: '赠品标题',
        code: '赠品编码',
        num: '件数',
        content: '备注',
        value: ''
      }, {
        name: '赠品标题',
        code: '赠品编码',
        num: '件数',
        content: '备注',
        value: ''
      }, {
        name: '赠品标题',
        code: '赠品编码',
        num: '件数',
        content: '备注',
        value: ''
      }, {
        name: '赠品标题',
        code: '赠品编码',
        num: '件数',
        content: '备注',
        value: ''
      }]
    }
  },
  components: {
    busDraggable
  },
  mounted () {
    this.getTableData()
  },
  computed: {},
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
    // 表单下拉树 event
    handleShowDropTree () {
      this.droptreeWidth = this.$refs.droptreeinput.$el.clientWidth
    },
    handleSelectValue (data) {
      this.droptreeForm.dropTreeVisible = false
      this.droptreeForm.dropTreeValue = data.label
    },
    // 表单下拉树 event/end
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },

    addSendSeting () {
      this.sendSeting.push({
        name: '赠品标题',
        code: '赠品编码',
        num: '件数',
        content: '备注',
        value: ''
      })
    },

    appCateChange (val) {
      if (val === '1') {
        this.appGoods = false
      } else {
        this.$nextTick(() => {
          this.appGoods = true
        })
      }
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
})

