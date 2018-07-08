<template>
	<singularity-dialog title="配置权限" ref="dialog" @submit="submit">
		<el-tree ref="tree" :data="menuList" show-checkbox node-key="id" check-strictly default-expand-all :default-checked-keys="defaultChecked" :props="defaultProps">
		</el-tree>
	</singularity-dialog>
</template>

<script>
	import {
		getPermission,
		savePermission
	} from "./service";

	export default {
		data() {
			return {
				roleId: "",
				menuList: [],
				defaultChecked: [],
				defaultProps: {
					label: 'name'
				}
			}
		},
		methods: {
			getPage(data) {
				this.$refs.dialog.show()
				this.roleId = data.id
				this.getPermission()
			},
			async getPermission() {
				let data = {
					roleId: this.roleId
				}
				this.menuList = []
				let res = await getPermission(data);
				this.menuList = this.$.getMenu(res.content.menu)
				this.defaultChecked = this.$.getValue(res.content.permission, "menuId")
			},
			submit() {
				this.$refs.dialog.hide()
				let data = {
					roleId: this.roleId,
					permission: this.$refs.tree.getCheckedKeys()
				}
				savePermission(data).then((res) => {
					this.$parent.queryData();
				});
			}
		}
	}
</script>

<style>
	#roleManage #check .el-dialog {
		bottom: 5%
	}
	
	#roleManage #check .el-dialog__body {
		height: calc(100% - 115px);
		overflow: auto;
	}
</style>