export const TableOption = () => {
	return [{
			prop: "category",
			label: "一级分类"
		},
		{
			prop: "type",
			label: "二级分类"
		},
		{
			prop: "rank",
			label: "定级"

		},
		{
			prop: "businessFormat",
			label: "对应业态"
		},
		{
			prop: "enterpriseType",
			label: "企业类型"
		},
		{
			prop: "resourceClass",
			label: "资质等级"
		},
		{
			prop: "",
			label: "资质等级有效期"
		},
		{
			prop: "",
			label: "安全生产许可证有效期"
		},
		{
			prop: "region",
			label: "对应华润置地地区"
		}
	]
}
export const TableOptionBase = () => {
	return [{
		label: "公司全称",
		prop: "name"
	}, {
		label: "一级分类",
		prop: "category"
	}, {
		label: "二级分类",
		prop: "type"
	}, {
		label: "定级",
		prop: "rank"
	}, {
		label: "名册",
		prop: "register"
	}, {
		label: "对应业态",
		prop: "businessFormat"
	}, {
		label: "对应产品线",
		prop: "productLine"
	}, {
		label: "品牌",
		prop: "brand"
	}, {
		label: "企业类型",
		prop: "enterpriseType"
	}, {
		label: "资质等级",
		prop: 'resourceClass'
	}, {
		label: "注册资金",
		prop: "registeredCapital"
	}, {
		label: "注册地址",
		prop: "registeredAddress"
	}, {
		label: "法人代表",
		prop: "legalPerson"
	}, {
		label: "分支机构",
		prop: "agency"
	}, {
		label: "对应华润置地地区",
		prop: "region"
	}, {
		label: "联系人",
		prop: "contacts"
	}, {
		label: "手机号码",
		prop: "phone"
	}, {
		label: "邮箱",
		prop: "email"
	}, {
		label: "管理层人员",
		prop: "manager"
	}, {
		label: "职务",
		prop: "position"
	}, {
		label: "电话",
		prop: "telephone"
	}, {
		label: "经办人",
		prop: "operator"
	}]
}

export const TableOptionShort = () => {
	return [{
			prop: "biddingName",
			label: "项目名称"
		},
		{
			prop: "inviteDate",
			label: "时间",
			filter: function(date) {
				return new Date(date).toLocaleDateString().replace(/\//g, "-")
			}
		},
		{
			prop: "operator",
			label: "经办人"
		}
	]
}
export const TableOptionBidding = () => {
	return [
		{
			prop: "inviteDate",
			label: "时间",
			filter: function(date) {
				return new Date(date).toLocaleDateString().replace(/\//g, "-")
			}
		},
		{
			prop: "operator",
			label: "经办人"
		}
	]
}
export const TableOptionSpecial = () => {
	return [{
			prop: "specialCase",
			label: "类别"
		},
		{
			prop: "biddingName",
			label: "项目名称"
		},
		{
			prop: "reason",
			label: "原因"
		},
		{
			prop: "openTime",
			label: "发生时间",
			filter: function(date) {
				return new Date(date).toLocaleDateString()
			}
		}
	]
}