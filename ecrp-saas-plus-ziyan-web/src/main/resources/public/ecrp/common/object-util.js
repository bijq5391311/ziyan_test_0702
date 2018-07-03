(function() {
	function toMap(obj, preffix, map = {}) {
		var isObject = function (obj) {
			if(typeof obj === "object" && !Array.isArray(obj))
				return true;
			return false;
		}
		
		var isArray = Array.isArray;
		
		function arrayToMap(arr, preffix = "", map = {}) {
			for(var i = 0; i < arr.length; i++) {
				var pre = `${preffix}[${i}]`;
				if(isArray(arr[i])) {
					arrayToMap(arr[i], pre, map)
				} else if(arr[i] instanceof Date) {
					map[pre] = arr[i];
				} else if(isObject(arr[i])) {
					objectToMap(arr[i], pre, map)
				} else {
					map[pre] = arr[i];
				}
			}
		}

		function objectToMap(obj, preffix = "", map = {}) {
			if(obj === undefined || obj === null)
				return;
			var keys = Object.keys(obj);
			for(var i = 0; i < keys.length; i++) {
				var pre = `${preffix}.${keys[i]}`;
				if(pre.startsWith(".")) {
					pre = pre.substr(1);
				}
				var curr = obj[keys[i]];
				if(isArray(curr)) {
					arrayToMap(curr, pre, map)
				} else if(curr instanceof Date) {
					map[pre] = curr;
				} else if(isObject(curr)) {
					objectToMap(curr, pre, map)
				} else {
					map[pre] = curr;
				}
			}
		}
		
		if(isArray(obj)) {
			arrayToMap(obj, preffix, map);
		} else {
			objectToMap(obj, preffix, map)
		}
		
		return map;
	}

	var ObjectUtil = {
		toMap: toMap
	}
	
	this.ObjectUtil = {
		toMap: function(obj, preffix, map = {}) {
			return toMap(obj, preffix, map);
		}
	}
	return ObjectUtil;
})(this)
