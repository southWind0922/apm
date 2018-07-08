import param from "@/config/Util/Param"
class Item {
	constructor() {
		this.formItemList = [{
			label: "一级分类",
			prop: "category",
			type: "select",
			options: {
				list: param.supplier.category
			}
		}, {
			label: "二级分类",
			prop: "type",
			type: "select",
			options: {
				list: param.supplier.type
			}
		}, {
			label: "定级",
			prop: "rank",
			type: "select",
			options: {
				list: param.supplier.rank
			}
		}, {
			label: "名册",
			prop: "register",
			type: "select",
			options: {
				list: param.supplier.register
			}
		}, {
			label: "对应业态",
			prop: "businessFormat",
			type: "select",
			options: {
				list: param.supplier.businessFormat
			}
		}, {
			label: "企业类型",
			prop: "enterpriseType",
			type: "select",
			options: {
				list: param.supplier.enterpriseType
			}
		}, {
			label: "资质等级",
			prop: "resourceClass",
			type: "select",
			options: {
				list: param.supplier.resourceClass
			}
		}, {
			label: "安全生产许可证",
			prop: "",
			type: "input"
		}, {
			label: "对应华润置地区域",
			prop: "region",
			type: "select",
			options: {
				list: param.supplier.region
			}
		}, {
			label: "供应商名称",
			prop: "name",
			type: "input"
		}]
	}
	export() {
		return this.formItemList
	}
}
class Search {
	constructor() {
		this.name = "";
		this.category = "";
		this.type = "";
		this.rank = "";
		this.register = "";
		this.businessFormat = "";
		this.enterpriseType = "";
		this.resourceClass = "";
		this.region = "";
	}
	export() {
		return {
			name: this.name,
			category: this.category,
			type: this.type,
			rank: this.rank,
			register: this.register,
			businessFormat: this.businessFormat,
			enterpriseType: this.enterpriseType,
			resourceClass: this.resourceClass,
			region: this.region
		}
	}
}
export const FormItem = () => {
	return new Item()
}
export const SearchForm = () => {
	return new Search()
}