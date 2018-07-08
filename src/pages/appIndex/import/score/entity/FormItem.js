import param from "@/config/Util/Param"
class Item {
	constructor() {
		this.formItemList = [{
			label: "合同名称",
			prop: "projectName",
			type: "input"
		}, {
			label: "合作单位",
			prop: "supplierName",
			type: "input"
		}]
	}
	export() {
		return this.formItemList
	}
}
class Search {
	constructor() {
		this.projectName = "";
		this.supplierName = "";
	}
	export() {
		return {
			projectName: this.projectName,
			supplierName: this.supplierName
		}
	}
}
export const FormItem = () => {
	return new Item()
}
export const SearchForm = () => {
	return new Search()
}