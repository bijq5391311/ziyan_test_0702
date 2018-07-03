define([], function() {
	/***
	 * [{
			type: "bar",
			row: {name: "Code", label: "类型"},
			cols: [{name: "ID", label: "类1"}]
		},{
			type: "line",
			row: {name: "Code", label: "类型"},
			cols: [{name: "ID", label: "类1"}]
		},{
			type: "pie",
			row: {name: "Code", label: "类型"},
			cols: [{name: "ID", label: "类1"}]
		}]
	 */
	//创建图形选项
	function mergeChartOption(type, row, cols, data) {
		var x = [];
		var y = {};
		cols.forEach(col => {
			y[col.name] = [];
		});
		var colNames = Object.keys(y);
		
		var labelMap = {};
		[].concat([row]).concat(cols).forEach(item => {
			labelMap[item.name] = item.label;
		});
		
		data.forEach(item => {
			x.push(item[row.name]);
			colNames.map(key => {
				y[key].push(item[key] ? item[key] : 0);
			});
		});
		
		var legend = {
			data: cols.map(item => item.label)
		};
		
		var xAxis = [{
			type: "category",
			data: x
		}];
		
		var series = null;
		if(type == "bar" || type == "line") {
			series = Object.keys(y).map((curr, index, arr) => {
				return {
					name: labelMap[curr],
					type: type,
					data: y[curr]
				}
			});
		} else if(type == "pie") {
			series = Object.keys(y).map((curr, index, arr) => {
				return {
					name: labelMap[curr],
					type: type,
					data: y[curr].map((value, index) => {
						return {
							name: x[index],
							value: value
						};
					})
				}
			});
		}
		
		return {
			legend,
			xAxis,
			series
		}
	}
	
	function genOption(type, data, setting) {
		var option = null;
		
		if(setting && setting.handle) {
			return setting.handle(data, setting);
		}
		
		//var row = {name: "type", label: "类型"};
		//var cols = [{name: "value1", label: "类1"}, {name: "value", label: "类2"}];
		var row = setting.row;
		var cols = setting.cols;
		
		var opt = mergeChartOption(type, row, cols, data);
		if(type == "pie") {
			option = {
		            tooltip : {
				        trigger: 'axis'
				    },
		            legend: opt.legend,
		            series: opt.series
		        };
		} else {
			option = {
	            tooltip : {
			        trigger: 'axis'
			    },
	            legend: opt.legend,
	            xAxis: opt.xAxis,
	            yAxis: {},
	            series: opt.series
	        };
		}
		
		return option;
	}
	
	return genOption;
})