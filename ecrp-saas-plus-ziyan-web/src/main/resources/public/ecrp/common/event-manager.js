define([], function() {
	if(this.EventManager === undefined) {
		this.EventManager = (function(fac) {
			var dataCache = {};
			var listeners = {};
			
			function hasOwnProperty(obj, ...props) {
				for(var i = 0; i < props.length; i++) {
					if(obj.hasOwnProperty(props[i])) {
						obj = obj[props[i]];
					} else 
						return false;
				}
				return true;
			}
			
			function afterRegister(id, type, handler) {
				if(type === "$dispatch") {
					if(hasOwnProperty(dataCache, id)) {
						var cache = dataCache[id];
						var types = Object.keys(dataCache[id]);
						for(var i = 0; i < types.length; i++) {
							if(listeners[id]["$dispatch"]({type: types[i], data:cache[types[i]]})) {
								if(hasOwnProperty(dataCache, id, types[i]))
									delete dataCache[id][types[i]];
							}
						}
					}
				} else {
					if(hasOwnProperty(dataCache, id, type)) {
						handler(dataCache[id][type]);
						delete dataCache[id][type];
					}
				}
			}
	
			var EventManager = {
				/**
				 * 事件注册
				 * @param id 唯一标识
				 * @param type 事件类型
				 * @param handler 处理方法
				 */
				register: function(id, type, handler) {
					if(hasOwnProperty(listeners, id, type)) {
						listeners[id][type] = handler;
					} else {
						if(!hasOwnProperty(listeners, id)) {
							listeners[id] = {};
						}
						
						listeners[id][type] = handler;
						afterRegister(id, type, handler);
					}
				},
				
				/**
				 * 事件销毁
				 */
				destroy: function(id, type) {
					if(type === undefined) {
						if(hasOwnProperty(listeners, id)) {
							delete listeners[id];
						}
					} else {
						if(hasOwnProperty(listeners, id, type)) {
							delete listeners[id][type];
						}
					}
				},
				
				/**
				 * 事件通知
				 */
				notify: function(id, type, data) {
					if(type === "$dispatch") {
						type = data.type;
						data = data.data;
					}
					
					if(hasOwnProperty(listeners, id, type)) {
						listeners[id][type](data);
					} else {
						if(hasOwnProperty(listeners, id, "$dispatch")) {
							if(listeners[id]["$dispatch"]({type,data}) === false) {
								if(!hasOwnProperty(dataCache, id)) {
									dataCache[id] = {};
								}
								dataCache[id][type] = data;
							}
						}else {
							if(!hasOwnProperty(dataCache, id)) {
								dataCache[id] = {};
							}
							dataCache[id][type] = data;
						}
							
					}
				}
			}
			return EventManager;
		})(this)
	}
	
	return this.EventManager;
})