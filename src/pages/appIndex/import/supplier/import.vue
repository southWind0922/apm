<template>
	<singularity-dialog title="导入" ref="dialog" @submit="submit">
		<el-form :model="form" :rules="rules" ref="form">
			<el-form-item label="文件名称" prop="fileName">
				<singularity-upload ref="upload" v-model="form.fileName" :action="uploadUrl" :data="form" @success="success"></singularity-upload>
			</el-form-item>
		</el-form>
	</singularity-dialog>
</template>

<script>
	import {
		uploadUrl
	} from "./service";

	import {
		ImportData,
		ImportRule,
	} from "./entity";

	export default {
		data() {
			return {
				form: ImportData(),
				rules: ImportRule(),
				uploadUrl: uploadUrl
			}
		},
		methods: {
			getPage() {
				if(this.$refs.form) {
					this.$refs.form.resetFields();
				}
				this.$refs.dialog.show()
			},
			success(response, file, fileList) {
				this.$parent.queryData();
			},
			submit() {
				this.$refs.form.validate((valid) => {
					if(valid) {
						this.$refs.dialog.hide()
						this.$refs.upload.submit()
					} else {
						return false;
					}
				});
			}
		}
	}
</script>

<style lang="less">
</style>