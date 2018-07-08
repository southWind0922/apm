window._parse = function(data) {
    console.log(JSON.parse(JSON.stringify(data)))
}

Array.prototype.filterMatch = function(obj){
	for(let i=0;i<this.length;i++){
		let val = this[i]
		let flag = true
		for(let x in obj){
			if(val[x] != obj[x]){
				flag = false
			}
		}
		if(flag){
			return val
		}
	}
}