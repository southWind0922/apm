import param from "@/config/Util/Param"
class Item {
	constructor() {
		this.formItemList = [{
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
		this.name = null;
		this.dateRange = null;
	}
	export() {
		return {
			name: this.name,
			dateRange: this.dateRange
		}
	}
}
export const FormItem = () => {
	return new Item()
}
export const SearchForm = () => {
	return new Search()
}