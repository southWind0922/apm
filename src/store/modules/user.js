import { login, validate, logout } from './service'
import menu from '@/config/menu'
import util from '@/config/Util/CommonUtil'

function permission(data) {
    let res = data.filter((val) => {
        return !val.pId || val.pId == "0"
    })
    res = util.buildTree(res, data)
    res = util.deepSort(res, 'order')
    return res
}
function getRoutes(menu) {
    console.log(menu)
    function getRedirect(data) {
        let url = ""
        if(data.children && data.children.length > 0) {
            let childData = data.children[0]
            if(childData.children && childData.children.length > 0) {
                url = childData.children[0].url
            } else {
                url = childData.url
            }
        }
        return url
    }
    let _url = ""
    let _res = [{
        path: '/appIndex',
        component: resolve => require(['pages/appIndex'], resolve),
        children: []
    }]
    for(let x of menu) {
        let _x = {
            path: x.url,
            redirect: getRedirect(x),
            name: x.name,
            component: resolve => require(['@/pages/appIndex' + x.url + '/index'], resolve),
            children: []
        }
        if(x.children) {
            for(let y of x.children) {
                if(y.url) {
                    _x.children.push({
                        path: y.url,
                        name: y.name,
                        component: resolve => require(['@/pages/appIndex' + y.url + '/index'], resolve)
                    })
                }
                if(y.children) {
                    for(let z of y.children) {
                        _x.children.push({
                            path: z.url,
                            name: z.name,
                            component: resolve => require(['@/pages/appIndex' + z.url + '/index'], resolve)
                        })
                    }
                }
            }
        }
        _res[0].children.push(_x)
    }
    return _res;
}

const user = {
    state: {
        userInfo: '',
        menu: '',
        routes: ''
    },

    mutations: {
        SET_USERINFO: (state, userInfo) => {
            state.userInfo = userInfo;
        },
        SET_MENU: (state, menu) => {
            state.menu = menu;
        },
        SET_ROUTES: (state, routes) => {
            state.routes = routes;
        }
    },

    actions: {
        //登录
        login({
            commit
        }, userInfo) {
            return new Promise((resolve, reject) => {
                login(userInfo).then((res) => {
                    if(res.status === true) {
                     	const menu = permission(res.content.menu)
                        commit('SET_USERINFO', res.content.userInfo);
                        commit('SET_MENU', menu);
                        commit('SET_ROUTES', getRoutes(menu));
                        resolve()
                    }
                })
            });
        },

        // 获取用户信息
        autoLogin({
            commit
        }) {
            return new Promise((resolve, reject) => {
                validate().then((res) => {
                     if(res.status === true) {
                     	const menu = permission(res.content.menu)
                        commit('SET_USERINFO', res.content.userInfo);
                        commit('SET_MENU', menu);
                        commit('SET_ROUTES', getRoutes(menu));
                        resolve()
                    }
                     else{
                     	reject()
                     }
                })
            })
        },

        //登录
		logout({
			commit
		}) {
			return new Promise((resolve, reject) => {
				logout().then((res) => {
					commit('SET_USERINFO', null);
					commit('SET_MENU', null);
					commit('SET_ROUTES', null);
					resolve()
				},()=>{
					commit('SET_USERINFO', null);
					commit('SET_MENU', null);
					commit('SET_ROUTES', null);
					resolve()
				})
			});
		}
    }
};

export default user;
