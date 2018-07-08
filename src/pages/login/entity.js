class Data {
	constructor() {
		this.username = "";
		this.password = "";
	}
	export() {
		return {
			username: this.username,
			password: this.password
		}
	}
}
class Rule {
	constructor() {
		this.username = [{
			required: true,
			message: "账号必填",
			trigger: 'change'
		}]
		this.password = [{
			required: true,
			message: "密码必填",
			trigger: 'change'
		}];
	}
	export() {
		return {
			username: this.username,
			password: this.password
		}
	}
}

export const LoginForm = () => {
	return new Data()
}

export const LoginRule = () => {
	return new Rule()
}