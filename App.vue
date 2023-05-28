<script>
	import config from '@/admin.config.js'
	import { version } from './package.json'
	import { mapGetters, mapActions } from 'vuex'
	
	export default {
		created() {
			this.clear = undefined
		},
		computed: {
			...mapGetters({
				isTokenValid: 'user/isTokenValid'
			})
		},
		methods: {
			...mapActions({
				init: 'app/init'
			}),
			clearPlatform() {
				const keysOfPlatform = uni.getStorageInfoSync().keys.filter(key => key.indexOf('platform') > -1)
				keysOfPlatform.length && keysOfPlatform.forEach(key => uni.removeStorageSync(key))
			}
		},
		onPageNotFound(msg) {
			uni.redirectTo({
				url: config.error.url
			})
		},
		onLaunch: function() {
			console.log(
				`%c uniCloud Admin %c 当前版本号 v${version} %c`,
				'background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
				'background:#007aff ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff; font-weight: bold;',
				'background:transparent'
			)
			console.log('App Launch')
			if (!this.isTokenValid) {
				// uni.redirectTo({
				// 	url: config.login.url
				// })
			} else {
				this.init()
			}
		},
		onShow: function() {
			console.log('App Show')
			this.clear = setInterval(() => this.clearPlatform(), 15 * 60 * 1000)
		},
		onHide: function() {
			console.log('App Hide')
			this.clear && clearInterval(this.clear)
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	/* #ifndef APP-NVUE */
	@import '@/common/uni.css';
	@import '@/common/uni-icons.css';
	@import '@/common/admin-icons.css';
	@import '@/common/theme.scss';
	@import "@/common/style.scss";
	/* #endif */
</style>
