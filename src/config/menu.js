export default [{
	id: 1,
	name: "查询系统",
	url: "/check",
	children: [{
		id: 11,
		name: "供应商查询",
		url: "/check/supplierManage",
		icon: "el-icon-goods"
	}, {
		id: 12,
		name: "履约评价",
		url: "/check/agreementManage",
		icon: "el-icon-goods",
		children: [{
			id: 121,
			name: "列表",
			icon: "el-icon-goods",
			url: "/check/agreementList"
		}, {
			id: 122,
			name: "图表",
			icon: "el-icon-goods",
			url: "/check/agreementDiagram"
		}, {
			id: 123,
			name: "预警",
			icon: "el-icon-goods",
			url: "/check/agreementWarning"
		}, {
			id: 124,
			name: "综合查询",
			icon: "el-icon-goods",
			url: "/check/agreementCheck"
		}]
	},
	{
		id: 13,
		name: "特殊情況",
		url: "/check/specialCase",
		icon: "el-icon-goods"
	},{
      id: 14,
      name: "三方查询",
      url: "/check/specialCase",
      icon: "el-icon-goods"
    }]

}, {
	id: 3,
	name: "系统管理",
	url: "/system",
	children: [{
		id: 31,
		name: "角色管理",
		url: "/system/roleManage",
		icon: "el-icon-goods"
	}, {
		id: 32,
		name: "用户管理",
		url: "/system/userManage",
		icon: "el-icon-goods"
	}]
}]
