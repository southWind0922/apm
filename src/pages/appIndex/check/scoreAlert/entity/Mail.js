import {
	Template
} from "./Template";

class Data {
	constructor() {
		this.names = "";
		this.mail = {
			subject: "",
			content: ""
		}
	}
	export() {
		let template = Template()
		return {
			names: this.names,
			mail: {
				subject: this.mail.subject,
				content: template.format(this.mail.content)
			}
		}
	}
}
class Rule {
	constructor() {
		this.subject = [{
			required: true,
			message: "请填写邮件主题",
			trigger: 'change'
		}]
		this.content = [{
			required: true,
			message: "请填写邮件主题",
			trigger: 'change'
		}]
	}
}
export const MailData = () => {
	return new Data()
}
export const MailRule = () => {
	return new Rule()
}