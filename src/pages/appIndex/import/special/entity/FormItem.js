import param from "@/config/Util/Param"
class Item {
	constructor() {
		this.formItemList = [{
			label: "合作项目名称",
			prop: "biddingName",
			type: "input"
		}, {
			label: "单位名称",
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
		this.biddingName = "";
		this.supplierName = "";
	}
	export() {
		return {
			biddingName: this.biddingName,
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