<template>
	<div class="singularity-upload" v-loading.fullscreen.lock="loading">
		<el-input v-model="fileName" placeholder="文件名称" disabled>
			<template slot="append">
				<el-upload ref="upload" :action="action" :on-success="success" :on-error="error" :on-change="changeFile" :auto-upload="false" :data="data" :show-file-list="false">
					<el-button size="small" type="primary" @click="clear" icon="el-icon-upload2"></el-button>
				</el-upload>
			</template>
		</el-input>

	</div>
</template>

<script>
	export default {
		props: {
			action: {
				type: [String],
				default: ""
			},
			data: {
				type: [Object],
				default: function() {
					return {}
				}
			},
			value: {

			}
		},
		computed: {
			fileName: {
				get: function() {
					return this.value;
				},
				set: function(val) {
					this.$emit('input', val);
				}
			}
		},
		data() {
			return {
				loading: false
			}
		},
		methods: {
			clear() {
				this.$refs.upload.clearFiles()
			},
			changeFile(file, fileList) {
				this.fileName = file.name
			},
			success(response, file, fileList) {
				this.loading = false
				if(response.status == true) {
					this.$notify({
						title: '成功',
						message: response.message || "操作成功",
						type: 'success'
					});
				} else {
					this.$notify.error({
						title: '失败',
						message: response.message || "操作失败"
					});
				}
				this.$emit("success", response, file, fileList)
			},
			error(response, file, fileList) {
				this.$notify.error({
					title: '失败',
					message: "数据导入失败，请检查Excel",
					duration: 3000
				});
				this.loading = false
				this.$emit("error", response, file, fileList)
			},
			submit() {
				this.loading = true
				this.$refs.upload.submit()
			}
		}
	};
</script>

<style lang="less">
	.singularity-upload {
		.el-input.is-disabled .el-input__inner {
			background: transparent;
		}
	}
</style>