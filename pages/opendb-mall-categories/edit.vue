<template>
	<view class="uni-container">
		<uni-forms ref="form" :value="formData" validateTrigger="bind">
			<uni-forms-item name="parent_id" label="父级ID">
				<uni-easyinput placeholder="父ID，用于多级分类" disabled v-model="formData.parent_id" />
			</uni-forms-item>
			<uni-forms-item name="name" label="类别名称" required>
				<uni-easyinput placeholder="类别名称" v-model="formData.name" trim="both" />
			</uni-forms-item>
			<uni-forms-item name="icon" label="图标">
				<cloud-image name="icon" v-model="formData.icon" :value="formData.icon" />
			</uni-forms-item>
			<uni-forms-item name="sort" label="排序">
				<uni-easyinput placeholder="类别排序，越大越靠后" type="number" v-model="formData.sort" />
			</uni-forms-item>
			<uni-forms-item name="description" label="类别描述">
				<uni-easyinput placeholder="类别描述" v-model="formData.description" trim="both" />
			</uni-forms-item>
			<uni-forms-item name="is_hot_show" label="加入热门显示">
				<switch @change="binddata('is_hot_show', $event.detail.value)" :checked="formData.is_hot_show" />
			</uni-forms-item>
			<uni-forms-item name="is_index_show" label="首页显示">
				<switch @change="binddata('is_index_show', $event.detail.value)" :checked="formData.is_index_show" />
			</uni-forms-item>
			<uni-forms-item name="status" label="生效状态">
				<switch @change="binddata('status', $event.detail.value)" :checked="formData.status" />
			</uni-forms-item>
		
			<view class="uni-button-group">
				<button type="primary" class="uni-button" style="width: 100px;" @click="submit">提交</button>
				<navigator open-type="navigateBack" style="margin-left: 15px;">
					<button class="uni-button" style="width: 100px;">返回</button>
				</navigator>
			</view>
		</uni-forms>
	</view>
</template>

<script>
	import { validator } from '../../js_sdk/validator/opendb-mall-categories.js';

	const db = uniCloud.database();
	const dbCmd = db.command;
	const dbCollectionName = 'opendb-mall-categories';

	function getValidator(fields) {
		let reuslt = {}
		for (let key in validator) {
			if (fields.includes(key)) {
				reuslt[key] = validator[key]
			}
		}
		return reuslt
	}

	export default {
		data() {
			return {
				formData: {
					"parent_id": "",
					"name": "",
					"icon": "",
					"sort": null,
					"description": "",
					"is_hot_show": null,
					"is_index_show": null,
					"status": true,
					"create_date": null
				},
				formOptions: {},
				rules: {
					...getValidator(["parent_id", "name", "icon", "sort", "description", "is_hot_show", "is_index_show",
						"status", "create_date"
					])
				}
			}
		},
		onLoad(e) {
			const id = e.id
			this.formDataId = id
			this.getDetail(id)
		},
		onReady() {
			this.$refs.form.setRules(this.rules)
		},
		methods: {
			/**
			 * 触发表单提交
			 */
			submit() {
				uni.showLoading({ mask: true })
				this.$refs.form.submit().then((res) => {
					res.shop_id = this.adminShopId
					this.submitForm(res)
				}).catch((errors) => {
					uni.hideLoading()
				})
			},

			submitForm(value) {
				this.$requestApp("mall/category/update", { id: this.formDataId, value }).then(res => {
					uni.showToast({
						title: '修改成功'
					})
					this.getOpenerEventChannel().emit('refreshData')
					setTimeout(() => uni.navigateBack(), 500)
				}).catch((err) => {
					uni.showModal({
						content: err.message || '请求服务失败',
						showCancel: false
					})
				}).finally(() => {
					uni.hideLoading()
				})
			},

			/**
			 * 获取表单数据
			 * @param {Object} id
			 */
			getDetail(id) {
				uni.showLoading({ mask: true })
				
				this.$requestApp("mall/category/search", { id }).then((res) => {					
					this.formData = res
				}).catch((err) => {
					uni.showModal({
						content: err.message || '请求服务失败',
						showCancel: false
					})
				}).finally(() => {
					uni.hideLoading()
				})
			}
		}
	}
</script>
