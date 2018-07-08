class Table {
	constructor() {
		this.option = []
		this.data = []
		this.loading = true
		this.pageSize = 10
		this.pageNum = 1
	}
	setOption(option){
		this.option = option
	}
	setPageNum(pageNum){
		this.pageNum = pageNum
	}
	setPageSize(pageSize){
		this.pageSize = pageSize
	}
	initTable(){
		this.data = []
		this.pageSize = 10
		this.pageNum = 1
	}
	queryData(condition, query, callback) {
		this.loading = true;
		let data = {
			condition: condition,
			pageSize: this.pageSize,
			pageNum: this.pageNum
		}
		query(data).then((res) => {
			if(res.status == true) {
				this.data = res.content.rows || [];
				this.pageTotal = res.content.total;
			} else {
				this.data = [];
				this.pageTotal = 0;
			}
			this.loading = false;
			if(callback){
				callback()
			}
		});
	}
	queryList(condition, query, callback) {
		this.loading = true;
		query(condition).then((res) => {
			if(res.status == true) {
				this.data = res.content || [];
			} else {
				this.data = [];
			}
			this.loading = false;
			if(callback){
				callback()
			}
		});
	}
	processData(callback){
		let data = callback(this.data)
		if(data){
			this.data = data
		}
	}
}

export default function() {
	return new Table()
}