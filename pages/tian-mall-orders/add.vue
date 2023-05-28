<template>
	<view class="uni-container">
		<uni-forms ref="form" :value="formData" validateTrigger="bind">
			<uni-forms-item name="create_time" label="">
				<uni-datetime-picker return-type="timestamp" :value="formData.create_time" />
			</uni-forms-item>
			<uni-forms-item name="operater_log" label="后台操作日志，0最新操作">
				<uni-data-checkbox :multiple="true" v-model="formData.operater_log" />
			</uni-forms-item>
			<uni-forms-item name="body" label="内容">
				<uni-easyinput v-model="formData.body" />
			</uni-forms-item>
			<uni-forms-item name="cancel_apply" label="取消订单请求列表">
				<uni-data-checkbox :multiple="true" v-model="formData.cancel_apply" />
			</uni-forms-item>
			<uni-forms-item name="cancel_style" label="取消类型">
				<uni-data-checkbox v-model="formData.cancel_style" :localdata="formOptions.cancel_style_localdata" />
			</uni-forms-item>
			<uni-forms-item name="cart_count" label="购物车数量">
				<uni-easyinput type="number" v-model="formData.cart_count" />
			</uni-forms-item>
			<uni-forms-item name="delivery_type" label="配送方式">
				<uni-data-checkbox v-model="formData.delivery_type" :localdata="formOptions.delivery_type_localdata" />
			</uni-forms-item>
			<uni-forms-item name="freight" label="运费">
				<uni-easyinput type="number" v-model="formData.freight" />
			</uni-forms-item>
			<uni-forms-item name="goods" label="商品">
				<uni-data-checkbox :multiple="true" v-model="formData.goods" />
			</uni-forms-item>
			<uni-forms-item name="is_delete" label="是否删除">
				<uni-data-checkbox v-model="formData.is_delete" :localdata="formOptions.is_delete_localdata" />
			</uni-forms-item>
			<uni-forms-item name="juli" label="距离，米">
				<uni-easyinput type="number" v-model="formData.juli" />
			</uni-forms-item>
			<uni-forms-item name="last_pay_time" label="最后支付时间">
				<uni-datetime-picker return-type="timestamp" :value="formData.last_pay_time" />
			</uni-forms-item>
			<uni-forms-item name="platform" label="操作平台">
				<uni-easyinput v-model="formData.platform" />
			</uni-forms-item>
			<uni-forms-item name="remarks" label="备注">
				<uni-easyinput v-model="formData.remarks" />
			</uni-forms-item>
			<uni-forms-item name="state" label="订单状态">
				<uni-easyinput type="number" v-model="formData.state" />
			</uni-forms-item>
			<uni-forms-item name="discount" label="优惠金额">
				<uni-easyinput type="number" v-model="formData.discount" />
			</uni-forms-item>
			<uni-forms-item name="total_fee" label="订单总金额">
				<uni-easyinput type="number" v-model="formData.total_fee" />
			</uni-forms-item>
			<uni-forms-item name="invoice" label="">
				<uni-easyinput placeholder="发票" v-model="formData.invoice" />
			</uni-forms-item>
			<uni-forms-item name="score" label="使用积分">
				<uni-easyinput type="number" v-model="formData.score" />
			</uni-forms-item>
			<uni-forms-item name="user_id" label="用户">
				<uni-easyinput placeholder="用户" v-model="formData.user_id" />
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
	import {
		validator
	} from '../../js_sdk/validator/tian-mall-orders.js';

	const db = uniCloud.database();
	const dbCmd = db.command;
	const dbCollectionName = 'tian-mall-orders';

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
					"create_time": null,
					"operater_log": [],
					"address": null,
					"body": "",
					"cancel_apply": [],
					"cancel_style": "",
					"cart_count": null,
					"delivery_hour": null,
					"delivery_type": "",
					"freight": null,
					"goods": [],
					"is_delete": 0,
					"juli": null,
					"last_pay_time": null,
					"platform": "",
					"remarks": "",
					"state": null,
					"discount": null,
					"total_fee": null,
					"invoice": "",
					"score": null,
					"user_id": ""
				},
				formOptions: {
					"cancel_style_localdata": [{
							"text": "自动",
							"value": "auto"
						},
						{
							"text": "用户",
							"value": "user"
						},
						{
							"text": "商家",
							"value": "shop"
						}
					],
					"delivery_type_localdata": [{
							"text": "配送到家",
							"value": "get_home"
						},
						{
							"text": "快递",
							"value": "express"
						},
						{
							"text": "到店/自提点自提",
							"value": "self_extraction"
						}
					],
					"is_delete_localdata": [{
							"text": "否",
							"value": 0
						},
						{
							"text": "是",
							"value": 1
						}
					]
				},
				rules: {
					...getValidator(["create_time", "operater_log", "address", "body", "cancel_apply", "cancel_style",
						"cart_count", "delivery_hour", "delivery_type", "freight", "goods", "is_delete", "juli",
						"last_pay_time", "platform", "remarks", "state", "discount", "total_fee", "invoice", "score",
						"user_id"
					])
				}
			}
		},
		onReady() {
			this.$refs.form.setRules(this.rules)
		},
		methods: {
			/**
			 * 触发表单提交
			 */
			submit() {
				uni.showLoading({
					mask: true
				})
				this.$refs.form.submit().then((res) => {
					this.submitForm(res)
				}).catch((errors) => {
					uni.hideLoading()
				})
			},

			submitForm(value) {
				// 使用 clientDB 提交数据
				db.collection(dbCollectionName).add(value).then((res) => {
					uni.showToast({
						title: '新增成功'
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
			}
		}
	}
</script>
