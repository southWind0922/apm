class TemplateCompile {
	constructor() {
		function getValue(data) {
			if(data) {
				return data[this.name] || this.default
			}
			return this.default
		}
		this.list = [{
			name: "supplierName",
			template: "{{供应商}}",
			default: "xxx公司",
			getValue: function(data) {
				return getValue.bind(this)(data)
			},
			postData: "#{#supplier.name}"
		}, {
			name: "contacts",
			template: "{{联系人}}",
			default: "xxx人员",
			getValue: function(data) {
				return getValue.bind(this)(data)
			},
			postData: "#{#supplier.contacts}"
		}, {
			name: "score",
			template: "{{履约得分}}",
			default: "xxx分",
			getValue: function(data) {
				return getValue.bind(this)(data)
			},
			postData: "#{#performanceScore.score}"
		}]
	}
	parse(str, data) {
		let res = str
		this.list.forEach((val)=>{
			let test = new RegExp(val.template, 'g')
			if(val.getValue) {
				res = res.replace(test, val.getValue(data))
			}
		})
		return res
	}
	format(str) {
		let res = str
		this.list.forEach((val)=>{
			let test = new RegExp(val.template, 'g')
			if(val.postData) {
				res = res.replace(test, val.postData)
			}
		})
		return res
	}
}

export const Template = () => {
	return new TemplateCompile()
}