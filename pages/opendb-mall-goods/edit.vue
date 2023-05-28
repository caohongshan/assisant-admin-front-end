<template>
	<view class="uni-container">
		<uni-forms ref="form" :value="formData" validateTrigger="bind">
			<view class="ti-flex" style="align-items: baseline;">
				<view class="">
					<uni-forms-item name="goods_sn" label="货号" required>
						<uni-easyinput placeholder="商品的唯一货号" v-model="formData.goods_sn" trim="both" />
					</uni-forms-item>
					<uni-forms-item name="name" label="名称" required>
						<uni-easyinput placeholder="商品名称" v-model="formData.name" trim="both" />
					</uni-forms-item>
					<uni-forms-item name="goods_summary" label="摘要">
						<uni-easyinput placeholder="商品摘要" v-model="formData.goods_summary" trim="both" />
					</uni-forms-item>
					<uni-forms-item name="keywords" label="关键字">
						<uni-easyinput placeholder="商品关键字，为搜索引擎收录使用" v-model="formData.keywords" trim="both" />
					</uni-forms-item>
					<uni-forms-item name="goods_banner_imgs" label="商品图">
						<cloud-image name="goods_banner_imgs" v-model="formData.goods_banner_imgs" :imageNumber="8"
							:value="formData.goods_banner_imgs" />
						<view class="">
							<text class="colorBlue">尺寸750x750，支持jpg/png</text>
						</view>
					</uni-forms-item>
					<uni-forms-item name="goods_banner" label="布局大图">
						<uni-file-picker file-mediatype="image" return-type="object" v-model="formData.goods_banner" />
						<view class="">
							<text class="colorBlue">尺寸710x340，支持jpg/png</text>
						</view>
					</uni-forms-item>
					<uni-forms-item name="goods_desc" label="详细描述">
						<cloud-image name="goods_desc" v-model="formData.goods_desc" :imageNumber="10"
							:value="formData.goods_desc" />
						<view class="">
							<text class="colorBlue">尺寸宽度750，高度不限制，支持jpg/png</text>
						</view>
					</uni-forms-item>
					<!-- <uni-forms-item name="city_ids" label="城市编号">
						<uni-easyinput placeholder="请输入城市id,英文逗号隔开" v-model="formData.city_ids" trim="both" />
					</uni-forms-item> -->
					<uni-forms-item name="sku_name" label="规格类型">
						<uni-data-checkbox v-model="formData.sku_name" :localdata="sku_titles" :multiple="true"
							@change="changeSkuName">
						</uni-data-checkbox>
						<view class="margin-top-20">
							<text class="colorBlue">勾选此类型之后，商品自动变为多规格，否则商品为单规格</text>
						</view>
					</uni-forms-item>
					<block v-if="formData.sku_name && formData.sku_name.length > 0">
						<view v-for="(item,index) in skuOriginList" :key="index"
							class="margin-bottom-40 under-line padding-bottom-20" style="display: flex;">
							<text class="font-bold" style="width: 160rpx;line-height: 72rpx;">{{index}}</text>
							<view class="flex-1">
								<view v-for="(item2,index2) in item" :key="index2"
									class="margin-bottom-10 ti-flex align-center margin-left-30">
									<text class="padding-right-20 colorGray">{{index2+1}}</text>
									<uni-easyinput :placeholder="'请输入'+index+(index2+1)" v-model="item2.value" />
									<uni-icons v-if="index2== item.length -1 " class="margin-left-10" type="plusempty"
										@click="addSku(index,index2)"></uni-icons>
									<uni-icons v-else class="margin-left-10" type="closeempty"
										@click="delSku(index,index2)">
									</uni-icons>
								</view>
							</view>
						</view>
						<view class="padding-bottom-20 ti-flex">
							<text class="font-26">宝贝销售规格</text>
							<text class="font-24 colorGray margin-left-10">在标题栏中输入可以进行批量填充</text>
							<view class="flex-1">
							</view>
							<button type="primary" size="mini" @click="btnUnify">批量填充</button>
						</view>
						<uni-table emptyText="暂无更多数据" border>
							<uni-tr>
								<uni-th align="center" v-for="(item,index) in skuOriginList" :key="index">
									<text>{{index}}</text>
								</uni-th>
								<uni-th align="center" style="width: 200rpx;">
									<uni-easyinput v-model="skuUnify.price" :clearable="false" placeholder="价格（元）"
										style="font-weight: normal;">
									</uni-easyinput>
								</uni-th>
								<uni-th align="center" style="width: 200rpx;">
									<uni-easyinput v-model="skuUnify.stock" :clearable="false" placeholder="库存"
										style="font-weight: normal;">
									</uni-easyinput>
								</uni-th>
							</uni-tr>
							<uni-tr v-for="(item,index) in formData.skus" :key="index" class="">
								<uni-td align="center" v-for="(n,index2) in item.names" :key="index2"
									:rowspan="n.rowspan" v-if="n.rowspan>0">
									<text>{{n.name}}</text>
								</uni-td>
								<!-- <uni-td>
									<text>{{showSkuName(item.sku_name)}}</text>
								</uni-td> -->
								<uni-td>
									<uni-easyinput placeholder="请输入价格" type="digit" name="price" :clearable="false"
										v-model="item.price" />
								</uni-td>
								<uni-td>
									<uni-easyinput placeholder="请输入库存" type="number" name="stock" :clearable="false"
										v-model="item.stock" />
								</uni-td>
							</uni-tr>
						</uni-table>
						<view class="margin-bottom-20">

						</view>
					</block>
					<block v-else>
						<uni-forms-item name="price" label="价格">
							<uni-easyinput placeholder="价格" type="number" v-model="formData.price" />
						</uni-forms-item>
						<uni-forms-item name="remain_count" label="库存">
							<uni-easyinput placeholder="库存数量" type="number" v-model="formData.remain_count" />
						</uni-forms-item>
						<uni-forms-item name="market_price" label="市场价">
							<uni-easyinput placeholder="市场价" type="number" v-model="formData.market_price" />
						</uni-forms-item>
					</block>
					<uni-forms-item name="is_on_sale" label="是否上架" required>
						<switch @change="binddata('is_on_sale', $event.detail.value)" :checked="formData.is_on_sale" />
					</uni-forms-item>
					<uni-forms-item name="offline_time" label="下架时间">
						<uni-datetime-picker return-type="timestamp" :value="formData.offline_time" />
					</uni-forms-item>
					<block v-if="$hasRole('admin')">
						<uni-forms-item name="group_buying" label="拼团人数">
							<uni-easyinput placeholder="拼团购买人数，0表示不支持" type="number" v-model="formData.group_buying" />
						</uni-forms-item>
						<uni-forms-item name="group_buying_discount" label="拼团优惠">
							<uni-easyinput placeholder="拼团优惠金额，0表示没优惠,单位分" type="number"
								v-model="formData.group_buying_discount" />
						</uni-forms-item>
						<uni-forms-item name="month_sell_count" label="月销量">
							<uni-easyinput placeholder="月销量" type="number" v-model="formData.month_sell_count" />
						</uni-forms-item>
						<uni-forms-item name="total_sell_count" label="总销量">
							<uni-easyinput placeholder="总销量" type="number" v-model="formData.total_sell_count" />
						</uni-forms-item>
						<uni-forms-item name="comment_count" label="累计评论">
							<uni-easyinput placeholder="累计评论数" type="number" v-model="formData.comment_count" />
						</uni-forms-item>
						<view class="ti-flex">
							<uni-forms-item name="is_alone_sale" label="独立销售" required class="flex-1">
								<switch @change="binddata('is_alone_sale', $event.detail.value)"
									:checked="formData.is_alone_sale" />
							</uni-forms-item>
						</view>
						<view class="ti-flex">
							<uni-forms-item name="is_real" label="是否为实物" class="flex-1">
								<switch @change="binddata('is_real', $event.detail.value)"
									:checked="formData.is_real" />
							</uni-forms-item>
							<uni-forms-item name="is_best" label="最好">
								<switch @change="binddata('is_best', $event.detail.value)"
									:checked="formData.is_best" />
							</uni-forms-item>
						</view>
						<view class="ti-flex">
							<uni-forms-item name="is_new" label="是否新品" class="flex-1">
								<switch @change="binddata('is_new', $event.detail.value)" :checked="formData.is_new" />
							</uni-forms-item>
							<uni-forms-item name="is_hot" label="是否hot">
								<switch @change="binddata('is_hot', $event.detail.value)" :checked="formData.is_hot" />
							</uni-forms-item>
						</view>
						<uni-forms-item name="is_vip" label="是否vip">
							<switch @change="binddata('is_vip', $event.detail.value)" :checked="formData.is_vip" />
						</uni-forms-item>
						<uni-forms-item name="use_score_rate" label="使用积分比例">
							<uni-easyinput type="number" v-model="formData.use_score_rate" />
							<view class="margin-top-20">
								<text class="colorBlue">与“使用固定积分”二选一，必须是0.01-0.99，优先级高，结合整个系统积分兑换金额比例，折算成现金</text>
							</view>
						</uni-forms-item>
						<uni-forms-item name="use_score" label="使用固定积分">
							<uni-easyinput type="number" v-model="formData.use_score" />
							<view class="margin-top-20">
								<text class="colorBlue">与“使用积分比例”二选一，必须是整数，结合整个系统积分兑换金额比例，折算成现金</text>
							</view>
						</uni-forms-item>
						<uni-forms-item name="rebate_score_rate" label="积分返佣">
							<uni-easyinput placeholder="积分返佣，多级别用英文逗号隔开" v-model="formData.rebate_score_rate"
								trim="both" />
							<view class="margin-top-20">
								<text class="colorBlue">小于1表示百分比，例如：0.02=2%；大于1表示固定值，单位“分”</text>
							</view>
						</uni-forms-item>
						<uni-forms-item name="rebate_money_rate" label="现金返佣">
							<uni-easyinput placeholder="现金返佣，多级别用英文逗号隔开" v-model="formData.rebate_money_rate"
								trim="both" />
							<view class="margin-top-20">
								<text class="colorBlue">小于1表示百分比，例如：0.02=2%；大于1表示固定值，单位“分”</text>
							</view>
						</uni-forms-item>
						<uni-forms-item name="rebate_self_money" label="购买者返利">
							<uni-easyinput placeholder="购买者返利" v-model="formData.rebate_self_money" trim="both" />
							<view class="margin-top-20">
								<text class="colorBlue">小于1表示百分比，例如：0.02=2%；大于1表示固定值，单位“分”</text>
							</view>
						</uni-forms-item>
					</block>
					<uni-forms-item name="seller_note" label="">
						<uni-easyinput type="textarea" placeholder="商家备注，仅商家可见" v-model="formData.seller_note"
							trim="both" />
					</uni-forms-item>
				</view>
				<view class="margin-left-80">
					<uni-forms-item name="category_id" label="店铺分类" required labelPosition="top" labelWidth="200">
						<view class="" style="width: 480px;">
							<!-- ly-tree不支持数据刷新，所以必须要商品加载完成之后，再显示 -->
							<tian-mall-categories-admin v-if="formData._id" :shopid="adminShopId"
								v-model="formData.category_id" />
						</view>
					</uni-forms-item>
				</view>
			</view>

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
	import { validator, enumConverter } from '../../js_sdk/validator/opendb-mall-goods.js';
	
	const dbCollectionName = 'opendb-mall-goods';

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
				skuUnify: {
					price: "",
					stock: ""
				},
				formData: {
					"category_id": [],
					"goods_sn": "",
					"name": "",
					city_ids: "",
					offline_time: 0,
					"price": null,
					"market_price": null,
					"keywords": "",
					"goods_desc": [],
					"goods_thumb": "",
					"goods_banner_imgs": [],
					"remain_count": null,
					"month_sell_count": null,
					"total_sell_count": null,
					"comment_count": null,
					"is_real": false,
					"is_on_sale": false,
					"is_alone_sale": false,
					"is_best": false,
					"is_new": false,
					"is_hot": false,
					"is_vip": false,
					"add_date": null,
					"sku_name": [],
					skus: [],
					"group_buying": null,
					"group_buying_discount": null,
					"seller_note": "",
					"use_score_rate": 0,
					"use_score": 0,
					"rebate_score_rate": "",
					"rebate_money_rate": "",
					"rebate_self_money": "",
				},
				timerId: null,
				skuOriginList: {},
				sku_titles: [],
				skuMap: {},
				skuOldIds: [],
				sku_title_result: [],
				formOptions: {
					...enumConverter
				},
				rules: {
					...getValidator(["category_id", "goods_sn", "name", "price", "market_price", "keywords", "goods_desc",
						"goods_thumb", "goods_banner_imgs", "remain_count", "month_sell_count", "total_sell_count",
						"comment_count", "is_real", "is_on_sale", "is_alone_sale", "is_best", "is_new", "is_hot",
						"is_vip", "add_date", "last_modify_date", "sku_name", "seller_note", "use_score_rate",
						"rebate_score_rate", "rebate_money_rate", "rebate_self_money", "use_score", "group_buying",
						"group_buying_discount"
					])
				},
			}
		},
		onLoad(e) {
			const id = e.id
			this.formDataId = id
			this.getDetail(id)
			this.buildSkusTitle()
		},
		onReady() {
			this.$refs.form.setRules(this.rules)
		},
		watch: {
			skuOriginList: {
				handler(newVal) {
					console.log("watch skuOriginList")
					if (this.timerId) {
						clearTimeout(this.timerId);
					}
					this.timerId = setTimeout(() => {
						let formSkus = []
						let keys = Object.keys(newVal)
						// console.log(keys)
						let skus = keys.reduce((pre, key) => {
							newVal[key].forEach(e => {
								e.rowspan = 1
							})
							pre.push(newVal[key].filter(e2 => !!e2.value))
							return pre;
						}, [])
						console.log(skus)
						//处理skus占多少列
						let rowspans = []
						for (let i = 0; i < skus.length - 1; i++) {
							let rowspan = 1;
							for (let j = i + 1; j < skus.length; j++) {
								rowspan = rowspan * skus[j].length
							}
							rowspans.push(rowspan)
						}
						console.log(rowspans)

						let that = this;
						//提取成多个数组
						function joinArr(list, arr, str) {
							let li = []
							for (let i = 0; i < list.length; i++) {
								if (i == list.indexOf(arr)) {
									for (let st of arr) {
										let b = str.concat(st);
										if (i < list.length - 1) {
											joinArr(list, list[i + 1], b);
										} else if (i == list.length - 1) {
											li.push(b)
										}
									}
								}
							}
							// console.log(li.length)
							for (let i = 0; i < li.length; i++) {
								// console.log(li[i])
								//其中有一个是空的，都不算
								let names = li[i].map(e => e.value)
								if (names.filter(e => !!e).length != names.length) {
									continue;
								}
								//统计数量
								let stock = li[i].reduce((pre, v) => {
									pre = pre + parseInt(v.amount)
									return pre;
								}, 0)
								let sku_name = names.join("&gt;");
								let sku = that.skuMap[sku_name] ? that.skuMap[sku_name] : {
									"sku_name": sku_name,
									"price": 0,
									names: names.map(e => {
										return {
											name: e,
											rowspan: 1
										}
									}),
									"market_price": 0,
									goods_thumb: "",
									stock: stock
								}
								// sku.rowspan = rowspans[rowIndex] ? rowspans[rowIndex] : 1
								// sku.names = showNames
								formSkus.push(sku)
							}
						}
						joinArr(skus, skus[0], [])
						console.log("skus", formSkus)
						let names = []
						formSkus.forEach(sku => {
							let name2 = sku.names;
							let zuhe = []
							for (let i = 0; i < name2.length - 1; i++) {
								zuhe.push(name2[i].name)
								let k = zuhe.join("&gt;");
								if (names.indexOf(k) == -1) {
									names.push(zuhe.join("&gt;"))
									if (rowspans[i]) {
										name2[i].rowspan = rowspans[i]
									}
								} else {
									name2[i].rowspan = 0
								}
							}
						})
						console.log("处理合并单元格完成", names)
						//倒序来处理多规格问题，
						//与原来的sku做比较
						this.$set(this.formData, "skus", formSkus)
					}, 1000)
				},
				deep: true
			}
		},
		methods: {
			btnUnify() {
				//批量填充价格和库存
				if (this.formData.skus && this.formData.skus.length > 0) {
					this.formData.skus.forEach(e => {
						if (this.skuUnify.price) {
							e.price = this.skuUnify.price
						}
						if (this.skuUnify.stock) {
							e.stock = this.skuUnify.stock
						}
					})
				}
				//删除原来的数据
				this.skuUnify = {
					price: "",
					stock: ""
				}
			},
			showSkuName(name) {
				return name.split("&gt;").join("/")
			},
			buildSkusTitle() {
				this.sku_titles = []
				//[{text:'',value:''}]
				this.formOptions.sku_titles.map(name => {
					this.sku_titles.push({
						text: name,
						value: name
					})
				})
			},
			changeSkuName(e) {
				//隐藏不存在的
				for (let key in this.skuOriginList) {
					if (e.detail.value.indexOf(key) == -1) {
						delete this.skuOriginList[key]
					}
				}
				console.log("changeSkuName", e)
				for (let name of e.detail.value) {
					if (!this.skuOriginList[name]) {
						this.$set(this.skuOriginList, name, []);
						//this.skuOriginList[name] = [];
						this.skuOriginList[name].push({
							value: "",
							amount: "0",
						})
					}
				}
				if (e.detail.value.length == 0) {
					//删除了
					this.skuOriginList = {}
					//库存，价格初始化
					if (!this.formData.price) {
						this.formData.price = 0
					}
					if (!this.formData.market_price) {
						this.formData.market_price = 0
					}
					if (!this.formData.remain_count) {
						this.formData.remain_count = 0
					}
					this.$refs.form.setRules(this.rules)
				}
				//生成规格信息
				console.log(this.skuOriginList)
			},
			addSku(index, index2) {
				console.log("addSku", index, index2, this.skuOriginList)
				this.skuOriginList[index].push({
					value: "",
					amount: "0",
				})
			},
			delSku(index, index2) {
				console.log("delete", index, index2)
				this.skuOriginList[index].splice(index2, 1)
			},
			/**
			 * 触发表单提交
			 */
			submit() {
				uni.showLoading({ mask: true })
				let goods_banner = this.formData.goods_banner
				this.$refs.form.submit().then((res) => {
					res.last_modify_date = Date.now();
					// console.log(this.formData.skus)
					//强制轮播图的第一张作为商品的缩略图goods_thumb
					if (res.goods_banner_imgs && res.goods_banner_imgs.length > 0) {
						res.goods_thumb = res.goods_banner_imgs[0]
					}
					//res.skus单独处理
					let skus = [];
					if (this.formData.skus && this.formData.skus.length > 0) {
						skus = [...this.formData.skus]
						//提取最低售价，总库存，最低售价的原价
						let minPrice = -1;
						res.remain_count = 0;
						skus.map(sku => {
							//转换单位为分
							sku.price = Math.round(sku.price * 100);
							if (minPrice == -1 || minPrice > sku.price) {
								res.price = parseInt(sku.price);
								res.market_price = 0;
								minPrice = res.price;
							}
							//更新库存类型
							sku.stock = parseInt(sku.stock)
							res.remain_count += parseInt(sku.stock);
						});
					} else {
						res.price = Math.round(res.price * 100);
						res.market_price = res.market_price ? Math.round(res.market_price * 100) : 0;
					}
					delete res.skus;
					if (res.goods_banner && !res.goods_banner.path) {
						delete res.goods_banner;
					}
					if (res.city_ids) {
						res.city_ids = res.city_ids.split(",")
					}
					res.shop_id = this.adminShopId
					console.log("save goods", res)
					this.submitForm(res, skus)
					if (!goods_banner) {
						// 移除此字段
						// res.goods_banner=""
						this.$request("goods/banner", {
							id: this.formDataId
						})
					}
				}).catch((errors) => {
					uni.hideLoading()
				})
			},

			submitForm(value, skus) {
				// 使用 clientDB 提交数据
				this.$requestApp("mall/goods/update", {
					id: this.formDataId,
					data: value
				}).then((res) => {
					uni.showToast({ title: '修改成功' })
					this.saveSkus(skus);
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
			//保存多规格
			saveSkus(skus) {
				let newData = [];
				let extIds = [];
				//如果存在id，就修改，否则新增
				skus.forEach(sku => {
					//转换字段
					sku.price = +sku.price;
					delete sku.names;
					sku.market_price = +sku.market_price;
					sku.goods_id = this.formDataId,
						sku.update_date = Date.now();
					if (!sku._id) {
						sku.create_date = Date.now();
						newData.push(sku);
					} else {
						extIds.push(sku._id)
						db.collection("opendb-mall-sku").doc(sku._id).update({
							...sku,
							_id: undefined
						})
					}
				})
				if (newData.length > 0) {
					db.collection("opendb-mall-sku").add(newData)
				}
				let delIds = this.skuOldIds.filter(id => extIds.indexOf(id) == -1);
				if (delIds.length > 0) {
					db.collection("opendb-mall-sku").where({
						_id: cmd.in(delIds)
					}).remove()
				}
			},

			/**
			 * 获取表单数据
			 * @param {Object} id
			 */
			getDetail(id) {
				uni.showLoading({
					mask: true
				})
				
				this.$requestApp("mall/goods/search", { id }).then(data => {
					if (data) {
						if (!data.goods_banner) {
							data.goods_banner = null
						}
						if (!data.city_ids) {
							data.city_ids = "";
						} else {
							data.city_ids = data.city_ids.join(",")
						}
						//如果预设的规格类型不存在，则自动添加
						if (data.sku_name && data.sku_name.length > 0) {
							data.sku_name.map(name => {
								if (this.formOptions.sku_titles.indexOf(name) == -1) {
									this.formOptions.sku_titles.push(name)
								}
							})
							this.buildSkusTitle()
						}
					
						//价格转化为元
						data.price = data.price / 100
						data.market_price = data.market_price / 100
					
						this.formData = data
						if (this.formData.sku_name) {
							this.getSkusData(id);
						}
					}
				}).catch((err) => {
					uni.showModal({
						content: err.message || '请求服务失败',
						showCancel: false
					})
				}).finally(() => {
					uni.hideLoading()
				})
			},
			getSkusData(id) {
				//查询商品的多规格
				db.collection("opendb-mall-sku").field("goods_id,goods_thumb,market_price,price,sku_name,stock").where({
					goods_id: id
				}).get().then(({ result }) => {
					//处理商品价格
					result.data.forEach(e => {
						e.price = e.price / 100
					})
					this.$set(this.formData, "skus", result.data)
					console.log("this.formData.skus", this.formData.skus)
					let nameMap = {};
					this.formData.sku_name.map(name => {
						nameMap[name] = [];
						this.$set(this.skuOriginList, name, [])
						// this.skuOriginList[name] = []
					})
					this.skuOldIds = []
					//提取原sku标题
					result.data.forEach(sku => {
						this.skuOldIds.push(sku._id)
						sku.names = sku.sku_name.split("&gt;").map((n, index) => {
							let oldData = nameMap[this.formData.sku_name[index]];
							if (oldData.indexOf(n) == -1) {
								nameMap[this.formData.sku_name[index]].push(n)
							}
							return {
								name: n,
								rowspan: 1
							};
						})
						this.skuMap[sku.sku_name] = sku;
					})
					console.log("nameMap", nameMap)
					for (let name in nameMap) {
						nameMap[name].map(s => {
							this.skuOriginList[name].push({
								value: s,
								amount: "0",
							})
						})
					}
				})
			}
		}
	}
</script>
