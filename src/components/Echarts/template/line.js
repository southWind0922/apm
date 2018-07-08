export default function(echarts, data, full, exit) {
	if(data.x && data.y) {
		return {
			toolbox: {
				show: true,
				feature: {
					magicType: {
						type: ['line', 'bar']
					},
					saveAsImage: {}
				}
			},
			xAxis: {
				type: 'category',
				data: data.x,
				axisLabel: {
					rotate: 30
				}
			},
			yAxis: {
				type: 'value'
			},
			series: [{
				type: 'line',
				data: data.y,
				label: {
					show: true,
					position: "top"
				},
				itemStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(
							0, 0, 0, 1, [{
									offset: 0,
									color: '#83bff6'
								},
								{
									offset: 0.5,
									color: '#188df0'
								},
								{
									offset: 1,
									color: '#188df0'
								}
							]
						)
					}
				},
				markLine: {
					data: [{
						type: "average",
						name: "平均值",
						label: {
							formatter: "{b}: {c}"
						}
					}]
				}
			}]
		}
	}
	return {}
}