<template>
	<singularity-dialog id="scoreAlertMail" :title="title" ref="dialog" fullscreen margin="0" @submit="submit">
		<div class="chartContent">
			<singularity-echarts template="line" :data="option">

			</singularity-echarts>
		</div>
	</singularity-dialog>
</template>

<script>
	import UE from "components/UE";

	import {
		queryChart
	} from "./service";

	export default {
		data() {
			return {
				option: {},
				title: "历史得分"
			}
		},
		methods: {
			getPage(data) {
				this.data = data
				this.title = "历史得分 - " + data.name
				this.queryChart()
				this.$refs.dialog.show()
			},
			async queryChart() {
				let data = {
					supplierName: this.data.name
				}
				let res = await queryChart(data)
				this.option = {
					x: res.content.x,
					y: res.content.y
				}
			},
			submit() {
				this.$refs.dialog.hide()
			}
		}
	}
</script>

<style lang="less">
	#scoreAlertMail {
		.el-dialog {
			min-width: 1150px;
		}
		.chartContent {
			height: 100%;
			width: 100%;
		}
	}
</style>