<template>
	<div class="singularity-tabs">
		<el-tabs v-model="activeName" @tab-click="change">
			<el-tab-pane v-for="x in list" :label="x.name" :name="x.id" :key="x.id"></el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	export default {
		props: {
			list: {
				type: [Array],
				default: function() {
					return []
				}
			},
			value: {

			}
		},
		computed: {
			activeName: {
				get: function() {
					return this.value;
				},
				set: function(val) {
					this.$emit('input', val);
				}
			}
		},
		methods:{
			change(){
				this.$emit("change",this.activeName)
			}
		}
	};
</script>

<style lang="less">
	.singularity-tabs {
		.el-tabs {
			border: none;
			box-shadow: none;
			.el-tabs__item {
				min-width: 80px;
				text-align: center;
			}
			.el-tabs__nav-wrap:after {
				background: transparent;
			}
		}
		.el-tabs--border-card {
			>.el-tabs__header {
				margin-top: 1px;
				background: none;
				border: none;
				.el-tabs__item {
					margin: 0
				}
				.el-tabs__item.is-active {
					border-top-color: #d8dce5
				}
			}
		}
	}
</style>