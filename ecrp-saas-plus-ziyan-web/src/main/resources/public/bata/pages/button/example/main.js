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
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      loading: false,
      activeName2: 'first'
    }
  },
  mounted () {
  },
  methods: {}
})

