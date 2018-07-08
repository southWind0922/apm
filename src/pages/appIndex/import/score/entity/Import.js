class Data {
	constructor() {
		this.fileName = "";
	}
	export() {
		return {
			filename: this.fileName
		}
	}
}
class Rule {
	constructor() {
		this.fileName = [{
			required: true,
			message: "请选择文件",
			trigger: 'change'
		}]
	}
}
export const ImportData = () => {
	return new Data()
}
export const ImportRule = () => {
	return new Rule()
}