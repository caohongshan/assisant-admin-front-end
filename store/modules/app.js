import { request } from '@/js_sdk/uni-admin/request.js'

export default {
	namespaced: true,
	state: {
		inited: false,
		navMenu: [],
		routes: [],
		adminShops: [],
		shop: uni.getStorageSync("admin_shop"), //当前管理店铺，在没有调用下面的设置方法之前，这里从缓存读取
		active: '',
		customer: {},
		share: {},
		appName: process.env.VUE_APP_NAME || ''
	},
	mutations: {
		SET_APP_NAME: (state, appName) => {
			state.appName = appName
		},
		SET_NAV_MENU: (state, navMenu) => {
			state.inited = true
			state.navMenu = navMenu
		},
		SET_ROUTES: (state, routes) => {
			state.routes = routes
		},
		SET_ADMIN_SHOP: (state, shop) => {
			state.shop = shop;
			state.appName = shop.name
			//写入缓存
			uni.setStorageSync("admin_shop", shop)
		},
		TOGGLE_MENU_ACTIVE: (state, url) => {
			state.active = url
		}
	},
	actions: {
		init({
			commit,
			state
		}) {
			let shop = uni.getStorageSync("admin_shop");
			// console.log("admin shop", shop)
			return request('app/init')
				.then(res => {
					const {
						navMenu,
						userInfo,
						customer,
						share,
						adminShops
					} = res
					state.customer = customer;
					state.share = share;
					state.adminShops = adminShops;
					// console.log("all shop", adminShops)
					if (adminShops && adminShops.length > 0) {
						//切换管理店铺
						if (shop && adminShops.findIndex(e => e._id == shop._id) != -1) {
							//存在旧数据，但是以服务器为准
							commit('SET_ADMIN_SHOP', adminShops[adminShops.findIndex(e => e._id == shop._id)])
						} else {
							//默认第一个店铺
							commit('SET_ADMIN_SHOP', adminShops[adminShops.length - 1])
						}

					}
					commit('SET_NAV_MENU', navMenu)
					commit('user/SET_USER_INFO', userInfo, {
						root: true
					})
				})
		},
		setAppName({ commit }, appName) {
			commit('SET_APP_NAME', appName)
		},
		changeMenuActive({ commit }, url) {
			commit('TOGGLE_MENU_ACTIVE', url)
		},
		setRoutes({ commit }, routes) {
			commit('SET_ROUTES', routes)
		}
	}
}
