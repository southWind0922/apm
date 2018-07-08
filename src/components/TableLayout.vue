<template>
	<div class="singularity-table-layout">
		<div class="head">
			<singularity-breadcrumb></singularity-breadcrumb>
		</div>
		<div class="layout">
			<div class="container">
				<div class="content">
					<div class="tool">
						<slot name="tool"></slot>
					</div>
					<div class="table">
						<slot name="table"></slot>
					</div>
				</div>

			</div>
		</div>
	</div>
</template>

<script>
</script>

<style lang="less">
	.singularity-table-layout {
		position: relative;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		>.layout {
			height: 0;
			width: 100%;
			flex: auto;
			>.container {
				height: 100%;
				width: 100%;
				padding: 10px;
				background: #F2F7F8;
				>.content {
					height: 100%;
					width: 100%;
					padding: 15px 25px 10px 25px;
					background: #FFF;
					display: flex;
					flex-direction: column;
					flex: 1;
					>.tool {
						.el-form-item {
							margin-right: 20px;
						}
					}
					>.table {
						height: 0;
						flex:auto;
						width: 100%;
						overflow: hidden;
					}
				}
			}
		}
	}
</style>