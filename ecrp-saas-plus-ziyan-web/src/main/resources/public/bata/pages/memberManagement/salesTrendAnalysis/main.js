import Vue from 'vue'
import NuiJs from 'nui-js'
import Cookies from 'js-cookie'
import './page.css'
import businessEcharts from 'vue-echarts'

Vue.use(NuiJs)

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#example',
  components: {
    businessEcharts
  },
  data () {
    return {
      daterange: '',
      defaultSelect: '',
      defaultSelect1: '',
      defaultSelect2: '',
      defaultSelect3: '',
      defaultSelect4: '',
      cookieState: false, // 帮助说明状态
      isOpen: false, // 搜索条件状态
      // 销售趋势图表
      option: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        grid: {
          left: '0',
          right: '20px',
          bottom: '0',
          top: '20px',
          containLabel: true
        },
        toolbox: {
          show: false,
          feature: {
            saveAsImage: {show: true}
          }
        },
        legend: {
          show: false
        },
        calculable: false,
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: ['03-16', '03-18', '03-20', '03-22', '03-24', '03-26', '03-28', '03-30', '04-01', '04-03', '04-05', '04-07', '04-09', '04-11', '04-13', '04-15', '04-17', '04-19', '04-21', '04-23', '04-25']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '销售趋势',
            type: 'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data: [1200, 110032, 304151, 151212, 154625, 314624, 400021, 10200, 110032, 304151, 151212, 154625, 98521, 226565, 12000, 110032, 304151, 151212, 154625, 314624, 98521]
          }
        ],
        color: ['#519af1']
      },
      // 销售趋势图表-end

      trendCompareRadioData: ['成交金额', '成交订单数', '成交客户数', '销量商品数', '客单价'],
      trendCompareRadio: '成交金额',
      // 表格
      tableData: [{
        date: '2017-12-21',
        turnover: '¥22511151.01',
        orders: '15484',
        clients: '41515',
        goods: '14514',
        price: '¥2251.01'
      }, {
        date: '2017-12-22',
        turnover: '¥1652251.01',
        orders: '1236',
        clients: '26412',
        goods: '12454',
        price: '¥5251.01'
      }, {
        date: '2017-12-23',
        turnover: '¥5245045.01',
        orders: '4245',
        clients: '7852',
        goods: '14514',
        price: '¥7251.01'
      }, {
        date: '2017-12-24',
        turnover: '¥452752.01',
        orders: '452752',
        clients: '14227',
        goods: '24424',
        price: '¥4451.01'
      }],
      // 表格-end
      currentPage4: 4
    }
  },
  beforeMount () {
  },
  mounted () {
    this.checkCookie()
  },
  methods: {
    /* 点击时储存cookie，并切换说明是否展开 */
    getState () {
      this.cookieState = !this.cookieState
      Cookies.set('cookieState', this.cookieState, { path: '' })
    },
    /* 初始化时，判断是否展开帮助说明 */
    checkCookie () {
      if (Cookies.get('cookieState') === 'false') {
        this.cookieState = false
      } else if (Cookies.get('cookieState') === 'true') {
        this.cookieState = true
      } else {
        Cookies.set('cookieState', this.cookieState, { path: '' })
      }
    },
    showMessage (type, msg) {
      this.$message({
        type: type,
        message: msg
      })
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      this.currentPage4 = val
      console.log(`当前页: ${val}`)
    },
    /* 表单重置 */
    resetFun () {
      this.daterange = ''
      this.defaultSelect = ''
      this.defaultSelect1 = ''
      this.defaultSelect2 = ''
      this.defaultSelect3 = ''
      this.defaultSelect4 = ''
    }
  }
})
