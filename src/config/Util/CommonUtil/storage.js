export default {
	cookie: {
        set(key, value) {
            let val = value
            if(this.isArray(val) || this.isObject(val)) {
                val = JSON.stringify(value)
            }
            localStorage[key] = val
        },
        get(key) {
            let val = localStorage[key] || null
            try {
                val = JSON.parse(val)
            } catch(e) {

            }
            return val
        },
        remove(key) {
            localStorage.removeItem(key);
        },
        isArray(obj) {
            return Object.prototype.toString.call(obj) == '[object Array]'
        },
        isObject(obj) {
            return Object.prototype.toString.call(obj) == '[object Object]'
        }
    },
    session: {
        set(key, value) {
            let val = value
            if(this.isArray(val) || this.isObject(val)) {
                val = JSON.stringify(value)
            }
            sessionStorage[key] = val
        },
        get(key) {
            let val = sessionStorage[key] || null
            try {
                val = JSON.parse(val)
            } catch(e) {

            }
            return val
        },
        isArray(obj) {
            return Object.prototype.toString.call(obj) == '[object Array]'
        },
        isObject(obj) {
            return Object.prototype.toString.call(obj) == '[object Object]'
        }
    }
}