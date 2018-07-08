<template>
	<singularity-dialog title="编辑用户" ref="dialog" @submit="submit">
		<singularity-form :model="form" :rules="rules" :item="formItemList" ref="form"></singularity-form>
	</singularity-dialog>
</template>

<script>
	import {
		edit,
		getRoleList
	} from "./service";

	import {
		EditControl,
		EditData,
		EditRule
	} from "./entity";

	export default {
		data() {
			return {
				form: EditData(),
				rules: EditRule(),
				formItem: EditControl()
			}
		},
		computed: {
			formItemList: function() {
				return this.formItem.export()
			}
		},
		methods: {
			getPage(data) {
				this.getRole()
				this.form.setData(data);
				if(this.$refs.form) {
					this.$refs.form.resetFields();
				} else {
					this.rules = EditRule(this.form.id)
				}
				this.$refs.dialog.show()
			},
            async getRole() {
                let res = await getRoleList();
                this.formItem.setRoleList(res.content || [])
            },
			submit() {
				this.$refs.form.validate((valid) => {
					if(valid) {
						this.$refs.dialog.hide()
						edit(this.form.export()).then((res) => {
							this.$parent.queryData();
						});
					} else {
						return false;
					}
				});
			}
		}
	}
</script>

<style scoped>

</style>