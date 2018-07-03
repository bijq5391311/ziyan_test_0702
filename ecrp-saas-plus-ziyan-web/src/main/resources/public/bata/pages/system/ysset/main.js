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
      value1: true,
      value2: true,
      value3: true,
      value4: true,
      defaultSelect: '',
      activeName: 'first'
    }
  },
  components: {},
  mounted () {
  },
  methods: {
    clickEdit1 () {
      this.value1 = false
    },
    clickEdit2 () {
      this.value2 = false
    },
    clickEdit3 () {
      this.value3 = false
    },
    clickEdit4 () {
      this.value4 = false
    }
  }
})

