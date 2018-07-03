define(["vue", "event-manager"] , function(Vue, EventManager) {
	return {
		props: {
			"uid": {
				type: String,
				default: function() {
					return null;
				}
			},
			"autoMatch": {
				default: function() {
					return false;
				}
			}
		},
		
		mounted: function() {
			var that = this;
			if(Boolean(this.uid) === false) 
				return;
			else {
				//如果使用了自动匹配方式，则注册一个调度方法
				if(this.autoMatch === true) {
					EventManager.register(this.uid, "$dispatch", function({type, data}) {
						if(that.hasOwnProperty(type) && "function" === typeof that[type]) {
							that[type](data);
							return true;
						} else {
							return false;
						}
					})
				}
			}
		},
		destroy: function() {
			if(Boolean(this.uid) === true)
				EventManager.destroy(this.uid);
		}
		
	}
})