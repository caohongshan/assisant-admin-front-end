<template>
	<view class="root">
		<view class="title">
			<text>请录入快递信息</text>
		</view>
		<view class="row">
			<text class="expressTitle">快递公司</text>
			<picker class="picker" mode="selector" :value="expressIndex" @change="pickerChange" :range="expressList"
				range-key="com">
				<view class="ti-flex">
					<text v-if="expressIndex === null" class="comText">请选择</text>
					<text v-else class="comText">{{expressList[expressIndex]['com']}}</text>
					<uni-icons class="pickerIcon" type="arrowdown" color="#999999"></uni-icons>
				</view>
			</picker>
		</view>
		<view class="row" v-if="showNumber">
			<text class="expressTitle">快递单号</text>
			<view class="inputBox ti-flex">
				<input @blur="getCom" v-model="express.number" placeholder="请输入快递单号" class="expressNumber" type="text"
					maxlength="32" />
				<uni-icons v-if="express.number" @click="deteleNumber" class="closeIcon" type="close" color="#999999">
				</uni-icons>
			</view>
			<!-- #ifdef APP-PLUS -->
			<uni-icons @click="scanCode" class="scanIcon" type="scan"></uni-icons>
			<!-- #endif -->
		</view>
		<view class="row">
			<text class="expressTitle">商品数量</text>
			<view class="inputBox ti-flex">
				<uni-easyinput v-model="amount" :inputBorder="false" placeholder="请输入数量"></uni-easyinput>
			</view>
		</view>
		<view class="ti-flex row">
			<button @click="close()" type="default" size="mini">取消录入</button>
			<button @click="submit()" type="primary" size="mini">确定录入</button>
		</view>
	</view>
</template>
<script>
	import expressList from './express.js';
	/**
	 * @event {Function()} comfirm
	 * @event {Function()} canceled
	 */
	export default {
		data() {
			return {
				expressList: [], //物流公司列表
				expressIndex: null, //第几个索引
				amount: 1,
				companyKey: "express_company_key",
				//物流信息
				express: {
					company: "", //快递公司名称
					code: "", //对应快递公司code
					number: "" //快递单号
				}
			};
		},
		props: {
			value: {
				type: Object,
				default: () => {
					return {}
				}
			},
			showNumber: {
				type: Boolean,
				default: true
			}
		},
		created() {
			this.expressList = expressList;
			//默认上一次选择的快递公司
			let exp = uni.getStorageSync(this.companyKey)
			if (exp) {
				this.express.company = exp.company
				this.express.code = exp.code
				this.expressIndex = exp.expressIndex
			}
		},
		methods: {
			//删除
			deteleNumber() {
				this.express.number = ""
			},
			//选择快递公司
			pickerChange(e) {
				this.expressIndex = e.detail.value;
				this.express.company = this.expressList[this.expressIndex].com;
				this.express.code = this.expressList[this.expressIndex].code;
			},
			//根据快递单号，识别是什么快递公司
			getCom() {
				if (!this.express.code) {
					const num = this.express.number;
					console.log(num);
					this.$request("mall/express/company", {
						number: num
					}, {
						functionName: "tiantian-mall"
					}).then(res => {
						console.log("mall/express/company", res)
						let company = this.expressList.filter(e => e.code == res);
						if (company.length > 0) {
							this.express.company = company[0].com;
							this.express.code = company[0].code;
						}
					})
				}
			},
			//扫码
			scanCode() {
				uni.scanCode({ // 允许从相机和相册扫码
					success: res => {
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
						this.express.number = res.result;
						this.getCom();
					}
				});
			},
			submit() {
				//写入缓存
				uni.setStorage({
					key: this.companyKey,
					data: {
						expressIndex: this.expressIndex,
						code: this.express.code,
						company: this.express.company,
					}
				})
				if (this.showNumber) {
					//手动输入
					this.$request("admin/order/deliver", {
						...this.value,
						amount: this.amount,
						code: this.express.code,
						company: this.express.company,
						number: this.express.number
					}, {
						functionName: "tiantian-mall"
					}).then(res => {
						uni.showToast({
							title: "录入单号成功"
						})
						console.log("mall/express/company", res)
					}, err => {
						uni.showToast({
							title: "录入失败",
							icon: "none"
						})
					})
				} else {
					if (this.express.code) {
						//云端打印
						let info = {
							/* shop: this.express.shop,
							address: this.express.address, */
							...this.value,
							count: 1,
							company: this.express.code
						};
						this.$request("mall/express/print", info, {
							functionName: "tiantian-mall"
						}).then(res => {
							uni.showToast({
								title: "打印完成"
							})
						}, err => {
							uni.showToast({
								title: "打印失败",
								icon: "none"
							})
						})
					} else {
						uni.showToast({
							title: "快递公司不能为空",
							icon: "none"
						})
					}
				}
				this.$emit('comfirm', this.express)
			},
			close() {
				console.log("close")
				this.$emit('canceled')
			}
		}
	}
</script>
<style lang="scss" scoped>
	.root {
		background-color: #FFFFFF;
		flex: 1;
		padding: 20rpx 40rpx;

		.title {
			font-size: 36rpx;
			text-align: center;
			padding-bottom: 30rpx;
			padding-top: 20rpx
		}
	}

	.row {
		// height: 50px;
		display: flex;
		align-items: center;
		flex-direction: row;
		background-color: #FFFFFF;
		padding-bottom: 20rpx;
	}

	.expressTitle {
		color: #333333;
		font-size: 30rpx;
	}

	.picker,
	.inputBox {
		width: 450rpx;
		flex-direction: row;
		background-color: #F7F7F7;
		border-radius: 6px;
		margin-left: 15rpx;
		height: 35px;
		line-height: 35px;
		padding: 0 20rpx;
	}

	.picker {
		justify-content: center;
	}

	.inputBox {
		justify-content: space-between;
	}

	.comText {
		font-size: 30rpx;
		line-height: 35px;
		color: #007AFF;
		background-color: #F7F7F7;
		flex: 1;
	}

	.pickerIcon,
	.closeIcon {
		width: 50rpx;
		font-size: 30rpx;
		line-height: 35px;
	}

	.expressNumber {
		background-color: #F7F7F7;
		width: 360rpx;
		height: 35px;
		line-height: 35px;
		border-radius: 6px;
		font-size: 30rpx;
		color: #999999;
	}

	.scanIcon {
		margin-left: 30rpx;
		font-size: 50rpx;
		color: #007AFF;
	}

	.scanIcon:active {
		color: #348ffe;
	}

	.buttomBox {
		width: 710rpx;
		margin: 30rpx 20rpx;
		justify-content: space-around;
		flex-direction: row;
	}

	.btn {
		width: 200rpx;
	}
</style>
