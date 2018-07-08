<template>
	<singularity-dialog title="新建用户" ref="dialog" @submit="submit">
		<singularity-form :model="form" :rules="rules" :item="formItemList" ref="form"></singularity-form>
	</singularity-dialog>
</template>

<script>
	import {
		create,
		getRoleList
	} from "./service";

	import {
		CreateControl,
		CreateData,
		CreateRule
	} from "./entity";

	export default {
		data() {
			return {
				form: CreateData(),
				rules: CreateRule(),
				formItem: CreateControl()
			}
		},
        computed: {
        	formItemList: function(){
        		return this.formItem.export()
        	}
        },
		methods: {
			getPage() {
				this.getRole()
				if(this.$refs.form) {
					this.$refs.form.resetFields();
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
						create(this.form.export()).then((res) => {
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