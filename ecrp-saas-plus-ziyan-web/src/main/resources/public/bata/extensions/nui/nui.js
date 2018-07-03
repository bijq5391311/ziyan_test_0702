
define(["vue","ELEMENT"],function(Vue,ELEMENT){
	//安装ele插件
	Vue.use(ELEMENT);
	Vue.config.productionTip = false
	Vue.config.errorHandler = function (err, vm, info) {
    // handle error
    // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
    // 只在 2.2.0+ 可用
    console.error('errorHandler start')
    console.log(err)
    console.log(vm)
    console.log(info)
    console.error('errorHandler end')
  }
	return Vue;
})