export default {
	tree: {
        forEach(arr, callback){
        	let fn = (arr, callback) => {
        		arr.forEach((val)=>{
	        		callback(val)
	        		if(val.children){
	        			fn(val.children, callback)
	        		}
	        	})
        	}
        	fn(arr, callback)
        },
        map(arr, callback){
        	let res = []
        	let fn = (arr, callback) => {
        		arr.forEach((val)=>{
	        		res.push(callback(val))
	        		if(val.children){
	        			fn(val.children, callback)
	        		}
	        	})
        	}
        	fn(arr, callback)
        	return res
        },
        filter(arr, callback){
        	let res = []
        	let fn = (arr, callback) => {
        		arr.forEach((val)=>{
	        		if(callback(val)){
	        			res.push(val)
	        		}
	        		if(val.children){
	        			fn(val.children, callback)
	        		}
	        	})
        	}
        	fn(arr, callback)
        	return res
        },
        some(arr, callback){
        	let res = false
        	let fn = (arr, callback) => {
        		arr.forEach((val)=>{
	        		if(callback(val)){
	        			res = true
	        		}
	        		if(val.children){
	        			fn(val.children, callback)
	        		}
	        	})
        	}
        	fn(arr, callback)
        	return res
        },
        every(arr, callback){
        	let res = true
        	let fn = (arr, callback) => {
        		arr.forEach((val)=>{
	        		if(!callback(val)){
	        			res = false
	        		}
	        		if(val.children){
	        			fn(val.children, callback)
	        		}
	        	})
        	}
        	fn(arr, callback)
        	return res
        }
    }
}