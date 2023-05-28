export default {
	login: {
		url: '/pages/login/login' // 登录页面路径
	},
	index: {
		url: '/pages/index/index' // 登录后跳转的第一个页面
	},
	error: {
		url: '/pages/error/404' // 404 Not Found 错误页面路径
	},
	navBar: { // 顶部导航
		logo: '/static/logo.png', // 左侧 Logo
		links: [],
		debug: {
			enable: process.env.NODE_ENV !== 'production', //是否显示错误信息
			engine: []
		}
	},
	cloud: {
		url: "https://tmall-api.cqsort.com" //基本数据云同步
	},
	sideBar: { // 左侧菜单
		// 配置静态菜单列表（放置在用户被授权的菜单列表下边）
		staticMenu: []
	},
	uniStat:{
		uploadSourceMapCloudSpaceId:"",//tcb-xxxxx5a2a923f
		cloudSourceMapUrl:""//https://7463-txxx.tcb.qcloud.la/__UNI__/uni-stat/sourcemap
	}
}
