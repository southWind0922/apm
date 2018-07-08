<template>
	<div class="singularity-echarts" ref="echartsContainer">
		<div class="echarts" ref="echarts" v-loading="loading" :style="style">
		</div>
	</div>
</template>

<script>
	import echarts from 'echarts'
	import bar from './template/bar'
	import line from './template/line'

	export default {
		props: {
			option: {
				type: [Object],
				default: function() {
					return {}
				}
			},
			template: {
				type: [String],
				default: function() {
					return ""
				}
			},
			data: {
				type: [Object],
				default: function() {
					return {}
				}
			}
		},
		mounted() {
			this.init()
		},
		watch: {
			option(curVal, oldVal) {
				this.setOption()
			},
			data(curVal, oldVal) {
				this.setOption()
			}
		},
		computed: {
			loading() {
				return JSON.stringify(this.option) == "{}" && JSON.stringify(this.data) == "{}"
			}
		},
		data() {
			return {
				chart: null,
				style: {}
			};
		},
		methods: {
			init() {
				if(this.chart){
					this.chart.clear()
				}
				this.chart = echarts.init(this.$refs.echarts);
				this.setOption()
			},
			setOption(){
				if(JSON.stringify(this.option) != "{}") {
					this.chart.setOption(this.option)
				} else if(JSON.stringify(this.data) != "{}"){
					if(this.template == "bar") {
						this.chart.setOption(this.getBarTemplate())
					}
					if(this.template == "line") {
						this.chart.setOption(this.getLineTemplate())
					}
				}
			},
			fullScreen() {
				this.style = {
					"position": "fixed",
					"top": 0,
					"left": 0,
					"height": "100%",
					"width": "100%",
					"background": "#FFF",
					"z-index": 999
				}
				setTimeout(() => {
					document.body.appendChild(this.$refs.echarts)
					this.chart.resize()
				})
			},
			exitFullscreen() {
				this.style = {}
				setTimeout(() => {
					this.$refs.echartsContainer.appendChild(this.$refs.echarts)
					this.chart.resize()
				})
			},
			getBarTemplate(){
				return bar(echarts, this.data, this.fullScreen, this.exitFullscreen)
			},
			getLineTemplate(){
				return line(echarts, this.data, this.fullScreen, this.exitFullscreen)
			}
		}
	};
</script>

<style lang="less" scoped>
	.singularity-echarts {
		height: 100%;
		width: 100%;
		.echarts {
			height: 100%;
			width: 100%;
		}
	}
</style>