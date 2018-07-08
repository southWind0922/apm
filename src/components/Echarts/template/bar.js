export default function(echarts, data, full, exit) {
	if(data.x && data.y) {
		let len1 = data.x[0].length
		let len2 = data.x.reduce((pre, val) => {
			return pre.length > val.length ? pre : val
		}).length
		let leftDistance = Math.ceil(len1 * 14 / 1.414) + 10
		let bottomDistance = Math.ceil(len2 * 14 / 1.414) + 30

		let percent = 1000 / data.x.length > 100 ? 100 : 1000 / data.x.length
		return {
			toolbox: {
				show: true,
				feature: {
					myFullScreen: {
						show: true,
						title: '全屏',
						icon: 'path://M547.4 197.4v46l200.3 0.1L546.1 444l32.4 32.6 201.9-200.7v200.9h46V197.5zM471.4 584.4l-32.6-32.6L243.6 747V547.9h-46v278.7h279v-46H275z',
						onclick: function(ec, echartsInstance, e) {
							full()
						}
					},
					myExitFullScreen: {
						show: true,
						title: '退出全屏',
						icon: 'path://M848.3 209.1l-32.5-32.6L598.1 393V191.9h-46v279.4l279 0.1v-46l-200.3-0.1zM208.4 848.3L425 631v201.1h46V553.4H191.9v46h199.7L175.8 815.8z',
						onclick: function(ec, echartsInstance, e) {
							exit()
						}
					},
					magicType: {
						type: ['line', 'bar']
					},
					saveAsImage: {}
				}
			},
			grid: {
				left: leftDistance,
				right: leftDistance,
				top: 40,
				bottom: bottomDistance
			},
			xAxis: {
				type: 'category',
				data: data.x,
				axisLabel: {
					rotate: 45
				}
			},
			yAxis: {
				type: 'value',
				min: 60
			},
			dataZoom: [{
				show: true,
				start: 0,
				end: percent
			}],
			series: [{
				type: 'bar',
				data: data.y,
				barMaxWidth: 30,
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