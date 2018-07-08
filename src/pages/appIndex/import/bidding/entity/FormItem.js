import param from "@/config/Util/Param"
class Item {
	constructor() {
		this.formItemList = [{
			label: "大区",
			prop: "biddingRange",
			type: "select",
			options: {
				list: param.biddingRangeCase.biddingRangeCase,
			}
		}, {
			label: "合同名称",
			prop: "contractName",
			type: "input"
		}, {
			label: "项目名称",
			prop: "biddingName",
			type: "input"
		}, {
			label: "供应商名称",
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
		this.contractName = "";
		this.biddingName = "";
		this.supplierName = "";
		this.biddingRange = "";
	}
	export() {
		return {
			contractName: this.contractName,
			biddingName: this.biddingName,
			supplierName: this.supplierName,
			biddingRange: this.biddingRange
		}
	}
}
export const FormItem = () => {
	return new Item()
}
export const SearchForm = () => {
	return new Search()
}