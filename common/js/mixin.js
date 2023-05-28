export default {
	data() {
		return {
			itemDataKey: "itemDataKey"
		}
	},
	computed: {
		currentAdminShop() {
			let shop = this.$store.state.app.shop;
			if (shop) {
				return shop
			}
			return {}
		},
		shopCondition() {
			return `shop_id=="${this.adminShopId}"`;
		},
		userInfo() {
			return this.$store.state.user.userInfo;
		},
		adminShopId() {
			return this.currentAdminShop._id;
		}
	},
	methods: {
		getLastSort(name, field = "sort", callback) {
			uniCloud.database().collection(name).orderBy(field, "desc").limit(1).get({
				getOne: true
			}).then(({
				result
			}) => {
				callback(result.data[field] + 1)
			})
		},
		previewImage(urls, current = 0) {
			uni.previewImage({
				urls,
				current
			})
		},
		log(data) {
			console.log(JSON.parse(JSON.stringify(data)))
		},

		/**
		 * navigatorTo跳转页面
		 * @param {String} url
		 * @param {Object} item 传递到下一界面的值
		 * @param {Object} options
		 * @param {Boolean} options.login 是否检测登录
		 */
		navTo(url, item, options = {}) {
			if (!url) {
				return;
			}
			console.log("url", url)
			if (item) {
				uni.setStorageSync(this.itemDataKey, item);
			} else {
				uni.removeStorage({
					key: this.itemDataKey
				})
			}
			uni.navigateTo({
				url,
				events: {
					refreshData: () => {
						//一般整页刷新
						this.loadData()
					},
					addData: (e) => {
						console.log("mixin addData", e)
						//用于某一项数据的更新
						this.editData(e)
					}
				},
				fail: () => {}
			})
		},
		/**
		 * 重定向到新页面
		 * @param {Object} url
		 * @param {Object} item
		 */
		redirectToItem(url, item) {
			if (item) {
				uni.setStorageSync(this.itemDataKey, item);
			}
			uni.redirectTo({
				url: url
			})
		},
		/**
		 * 定时返回，用于提交成功后，消息显示完成后，跳转其他页面
		 * @param {String} isRefresh 是否刷新上一页数据
		 * @param {Object} time 跳转时间
		 */
		navTimeBack(isRefresh, time = 2000, callback = false) {
			setTimeout(() => {
				if (isRefresh) {
					try {
						//需要上一个页面定义loadData
						this.getOpenerEventChannel().emit('refreshData')
					} catch (e) {
						console.log("刷新上一页数据错误");
					}
				}
				uni.navigateBack({})
				if (callback) {
					callback()
				}
			}, time);
		},
		/**
		 * 获取上一个页面传过来的数据,对象是最好的，不要来数组
		 * @param {Boolean} isAutoSet 是否设置到data数据中
		 */
		getItemData(isAutoSet) {
			let data = uni.getStorageSync(this.itemDataKey);
			if (isAutoSet && data) {
				//数组不允许设置
				//console.log(typeof(data))
				if (typeof(data) == "array") {
					return data;
				}
				for (let key in data) {
					this[key] = data[key];
				}
			}
			return data;
		},
		setRootData(data) {
			for (let key in data) {
				this[key] = data[key];
			}
		},
		/**
		 * 定时跳转，用于提交成功后，消息显示完成后，跳转其他页面
		 * @param {String} url
		 * @param {Object} options
		 * @param {Boolean} options.login 是否检测登录
		 * @param {Object} time 跳转时间
		 */
		navTimeTo(url, options = {}, time = 2000) {
			setTimeout(() => {
				this.navTo(url, options);
			}, time);
		},
		/**
		 * 弹窗二次封装
		 * @param {Object} callback
		 * @param {Object} content
		 * @param {Object} title
		 */
		confirmAction(callback, content = "", title = "") {
			console.log("confirmAction")
			//弹出确定操作
			uni.showModal({
				title,
				content,
				success: (res) => {
					if (res.confirm) {
						callback();
					}
				}
			})
		},
	},
}
