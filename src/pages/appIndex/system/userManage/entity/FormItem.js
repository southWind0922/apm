class Item {
	constructor() {
		this.formItemList = [{
			label: "姓名",
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
	}
	export() {
		return {
			name: this.name
		}
	}
}
export const FormItem = () => {
	return new Item()
}
export const SearchForm = () => {
	return new Search()
}