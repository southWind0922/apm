import vm from '@/main'
/**
 * singularity内部通用函数
 */
export default {
	/**
	 * 监听全局resize事件
	 */
	addResizeLisener() {
		window.onresize = this.debounce(() => {
			vm.$notify({
				title: '提示',
				message: '检测到您调整了窗口大小,建议刷新页面以便调整到最佳使用效果(F5)',
				type: 'warning',
				duration: 3000
			});
		}, 1000)
	},
	delete(callback) {
		vm.$confirm("此操作将永久删除所选数据, 是否继续?", '提示', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning'
		}).then(() => {
			if(callback){
				callback()
			}
		}).catch(() => {
			vm.$message({
				type: 'info',
				message: '已取消移除'
			});
		});
	},
	/**
	 * 查重校验
	 */
	unique(fun, id = null, key = "name", extra) {
		return this.debounce((rule, value, callback) => {
			if(value) {
				let data = {}
				data[key] = value
				if(extra) {
					for(let x in extra) {
						data[x] = extra[x];
						if(extra[x] == "") {
							callback()
						}
					}
				}
				if(id != null) {
					data.id = id
				}
				fun(data).then((res) => {
					if(res.content) {
						callback()
					} else {
						callback(new Error(res.message || "该名称已存在"));
					}
				})
			}
		}, 1000)
	},
	/**
	 * 对于非字符值控件必填项校验
	 */
	validateRequire(msg) {
		return(rule, value, callback) => {
			let flag = false
			if(this.isArray(value)) {
				flag = value.length == 0
			} else if(this.isString(value)) {
				flag = value == ""
			} else {
				flag = !value
			}
			if(!flag) {
				callback()
			} else {
				callback(new Error(msg));
			}
		};
	},
	/**
	 * 偏好设置
	 */
	setPreference(key, value){
		let preference = this.cookie.get("preference")
		if(!preference){
			preference = {}
		}
		preference[key] = value
		this.cookie.set("preference",preference)
	},
	getPreference(key){
		let preference = this.cookie.get("preference")
		if(!preference){
			preference = {}
		}
		return preference[key] || null
	}
}