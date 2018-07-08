import param from "@/config/Util/Param"
class Item {
	constructor() {
		this.formItemList = [{
			label: "维度",
			prop: "key",
			type: "select",
			options: {
				list: param.supplierWarning.key,
				label: "name",
				value: "id"
			}
		}]
	}
	export() {
		return this.formItemList
	}
}
class Search {
	constructor() {
		this.key = "contacts";
	}
	export() {
		return {
			key: this.key
		}
	}
}
export const FormItem = () => {
	return new Item()
}
export const SearchForm = () => {
	return new Search()
}