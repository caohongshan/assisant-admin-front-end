<template>
	<view class="content" v-if="loaded">
		<view class="ti-flex">
			<view class="flex-1 bg-white margin-right-20 padding-22 border-radius">
				<qiun-title-bar title="数据统计" />
				<view class="ti-flex font-24">
					<view class="flex-1 flex-column ti-flex">
						<text class="padding-bottom-20">销售总额</text>
						<text class="price number">{{totalSale/100}}</text>
					</view>
					<view class="flex-1 flex-column ti-flex">
						<text class="padding-bottom-20">会员总数</text>
						<text class="number">{{totalUser}}</text>
					</view>
					<view class="flex-1 flex-column ti-flex">
						<text class="padding-bottom-20">支付笔数</text>
						<text class="number">{{orderStateMap.total}}</text>
					</view>
					<view class="flex-1 flex-column ti-flex">
						<text class="padding-bottom-20">成交笔数</text>
						<text class="number">{{orderStateMap.chengjiao}}</text>
					</view>
				</view>
			</view>
			<view class="flex-1 bg-white padding-22 border-radius">
				<qiun-title-bar title="代办事项" />
				<view class="ti-flex font-24">
					<view class="flex-1 flex-column ti-flex" @click="navTo('/pages/tian-mall-orders/list?state=2')">
						<text class="padding-bottom-20">待发货订单</text>
						<text class="number">{{orderStateMap.fahuo}}</text>
					</view>
					<view class="flex-1 flex-column ti-flex" @click="navTo('/pages/tian-mall-order-refunds/list')">
						<text class="padding-bottom-20">退货处理</text>
						<text class="number">{{goodsReturnCount}}</text>
					</view>
					<view class="flex-1 flex-column ti-flex" @click="navTo('/pages/opendb-mall-goods/list?type=remain')">
						<text class="padding-bottom-20">库存预警</text>
						<text class="number">{{remainWaring}}</text>
					</view>
					<view class="flex-1 flex-column ti-flex">
						<text class="padding-bottom-20">用户反馈</text>
						<text class="number">0</text>
					</view>
				</view>
			</view>
		</view>
		<view class="ti-flex margin-top-22" style="align-items: inherit;">
			<view class="flex-4 margin-right-20 ">
				<view class="bg-white padding-22 border-radius">
					<view class="ti-flex">
						<qiun-title-bar title="订单统计" />
						<view class="flex-1">

						</view>
						<view v-for="(item,index) in orderConditions" :key="index" class="subMenu"
							:class="{current:orderIndex==index}" @click="changeOrderMenu(index)">
							<text>{{item.title}}</text>
						</view>
					</view>
					<view class="charts-box">
						<qiun-data-charts class="charts-box" type="column" :chartData="orderData" />
					</view>
				</view>
				<view class="ti-flex margin-top-22" style="align-items: inherit;">
					<view class="flex-1 bg-white padding-22 border-radius margin-right-20">
						<qiun-title-bar title="用户排行" />
						<unicloud-db ref="udb" collection="tian-mall-shops-consumption" orderby="consumption desc"
							:where="shopCondition" action="user_infos" field="user_id,consumption"
							v-slot:default="{data,pagination,loading,error,options}" :page-size="10"
							page-data="replace">
							<uni-table :loading="loading" :emptyText="error.message || '没有更多数据'">
								<uni-tr>
									<uni-th align="">用户</uni-th>
									<uni-th align="center">消费金额</uni-th>
								</uni-tr>
								<uni-tr v-for="(item,index) in data" :key="index">
									<uni-td align="">
										<view class="ti-flex">
											<image :src="item.avatar?item.avatar:'/static/missing-face.png'"
												mode="aspectFill" class="user-avatar border-radius"></image>
											<text class="flex-1 margin-left-18"
												v-if="item.nickname">{{item.nickname}}</text>
											<text class="flex-1 margin-left-18"
												v-else-if="item.mobile">{{item.mobile}}</text>
											<text class="flex-1 margin-left-18" v-else>{{item.id}}</text>
										</view>
									</uni-td>
									<uni-td align="center">
										<text>{{item.consumption?item.consumption/100:0}}</text>
									</uni-td>
								</uni-tr>
							</uni-table>
						</unicloud-db>
					</view>
					<view class="flex-1 bg-white padding-22 border-radius">
						<qiun-title-bar title="热搜排行" />
						<unicloud-db ref="udb" collection="opendb-search-hot" orderby="count desc" field="count,content"
							v-slot:default="{data,pagination,loading,error,options}" :page-size="10"
							page-data="replace">
							<uni-table :loading="loading" :emptyText="error.message || '没有更多数据'">
								<uni-tr>
									<uni-th align="">关键词</uni-th>
									<uni-th align="center">搜索次数</uni-th>
								</uni-tr>
								<uni-tr v-for="(item,index) in data" :key="index">
									<uni-td align="">
										<view class="padding-6">
											<text>{{item.content}}</text>
										</view>
									</uni-td>
									<uni-td align="center">
										<text>{{item.count?item.count:0}}</text>
									</uni-td>
								</uni-tr>
							</uni-table>
						</unicloud-db>
					</view>
				</view>
			</view>
			<view class="flex-2 ">
				<view class="bg-white border-radius padding-22">
					<qiun-title-bar title="热销排行" />
					<view class="">
						<unicloud-db ref="udb" collection="opendb-mall-goods" orderby="month_sell_count desc"
							field="name,goods_thumb,month_sell_count,visite_count" :where="shopCondition"
							v-slot:default="{data,pagination,loading,error,options}" :page-size="16"
							page-data="replace">
							<uni-table :loading="loading" :emptyText="error.message || '没有更多数据'">
								<uni-tr>
									<uni-th align="">商品</uni-th>
									<uni-th align="center">浏览</uni-th>
									<uni-th align="center">销量</uni-th>
								</uni-tr>
								<uni-tr v-for="(item,index) in data" :key="index">
									<uni-td align="">
										<view class="ti-flex">
											<image :src="item.goods_thumb" mode="aspectFill"
												class="user-avatar border-radius"></image>
											<text class="flex-1 margin-left-18">{{item.name}}</text>
										</view>
									</uni-td>
									<uni-td align="center"><text>{{item.visite_count?item.visite_count:0}}</text>
									</uni-td>
									<uni-td align="center">
										<text>{{item.month_sell_count?item.month_sell_count:0}}</text>
									</uni-td>
								</uni-tr>
							</uni-table>
						</unicloud-db>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	//下面是uCharts的配置文件及qiun-data-charts组件的公用中转参数，可以从本配置文件中获取uCharts实例、opts配置、format配置（APP端因采用renderjs无法从此配置文件获取uCharts实例）
	import uCharts from '@/uni_modules/qiun-data-charts/js_sdk/u-charts/config-ucharts.js';
	const db = uniCloud.database();
	const cmd = db.command;
	
	export default {
		data() {
			return {
				startDate: '2021-03-01',
				start7Date: "",
				endDate: "",
				endDateStr: "",
				start30DateStr: "",
				goodsSaleWhere: "",
				orderConditions: [],
				orderData: {},
				orderIndex: 0,
				loaded: false,
				totalSale: 0,
				totalUser: 0,
				orderStateMap: {
					total: 0,
					fahuo: 0,
					chengjiao: 0
				},
				remainWaring: 0,
				goodsReturnCount: 0, //退货
			};
		},
		onLoad() {
			let start30DateStr = this.$formatDate(Date.now() - 3600 * 24 * 30 * 1000, "yyyy-MM-dd");
			let yestoday = this.$formatDate(Date.now() - 3600 * 24 * 1000, "yyyy-MM-dd hh:mm");

			//'state>0 &&create_time >= ' + new Date(start7Date).getTime() + ' && create_time <= ' + Date.now()
			this.endDate = this.$formatDate(new Date(), "yyyy-MM-dd")
			this.start7Date = this.$formatDate(Date.now() - 3600 * 24 * 6 * 1000, "yyyy-MM-dd")
			console.log("this.endDate", this.endDate, this.start7Date)
			console.log("start30DateStr", start30DateStr)
			// let endDateStr = this.$util.date("Y-m-d")
			// this.goodsSaleWhere = `day >= "${this.start7Date}" && day <= "${endDateStr}"`
			this.orderConditions.push({
				title: "近一个月",
				start: start30DateStr,
				type: "day",
				where: this.shopCondition + ' && state>0 && create_time >= ' + new Date(start30DateStr)
					.getTime()
			})
			this.orderConditions.push({
				title: "近一周",
				start: this.start7Date,
				type: "day",
				where: this.shopCondition + ' && state>0 && create_time >= ' + new Date(this.start7Date)
					.getTime()
			})
			this.orderConditions.push({
				title: "24小时",
				start: yestoday,
				where: this.shopCondition + ' && state>0 && create_time >= ' + new Date(yestoday)
					.getTime()
			})
			this.changeOrderMenu(0);
			// this.getStatic();
			this.loaded = true;
		},
		methods: {
			getStatic() {
				db.collection("tian-mall-shops-consumption").where(this.shopCondition).groupBy("shop_id").groupField(
					"sum(consumption) as value,count(*) as user").get().then(({
					result
				}) => {
					console.log("shop consumption", result)
					if (result.data.length > 0) {
						this.totalSale = result.data[0].value;
						this.totalUser = result.data[0].user
					}
				})
				db.collection('tian-mall-orders')
					.where(this.shopCondition + ' && state>0')
					.groupBy('state')
					.groupField('count(*) as total')
					.get()
					.then(({
						result
					}) => {
						let stateMap = {
							total: 0,
							fahuo: 0,
							chengjiao: 0
						};
						console.log('user statitics2', result.data);

						result.data.map(e => {
							//总支付单数
							stateMap.total += e.total * 1;
							if (e.state == 1) {
								stateMap.fahuo = e.total
							} else if (e.state == 3) {
								//确定收货数量
								stateMap.chengjiao = e.total
							}
						})
						this.orderStateMap = stateMap;
					});
				//库存预警，小于10件的商品
				db.collection("opendb-mall-goods").where(this.shopCondition + "&& remain_count<10").count().then(({
					result
				}) => {
					this.remainWaring = result.total;
					console.log("remain_count", result.total)
				});
				//退货订单
				db.collection("tian-mall-order-refunds").where(this.shopCondition + "&& state==0").count().then(({
					result
				}) => {
					this.goodsReturnCount = result.total;
					console.log("goodsReturnCount", result.total)
				});
			},
			changeOrderMenu(index) {
				this.orderIndex = index;
				this.getOrderStatistics();
			},
			async getOrderStatistics() {
				let order = this.orderConditions[this.orderIndex];
				console.log("condition", order)
				this.orderStart = order.start;
				let tmpcategories = [];
				let orderCount = []
				let orderMoney = []
				//查询订单量和销售额
				if (order.type == "day") {
					let {
						result: totalResult
					} = await db.collection("tian-mall-orders").where(order.where).field("total_fee,create_time")
						.groupBy(
							"dateToString(add(new Date(0),create_time),'%Y-%m-%d','+0800') as text").groupField(
							"sum(total_fee) as value").get();
					console.log(totalResult)
					let moneyMap = totalResult.data.reduce((total, item) => {
						total[item.text] = item.value;
						return total;
					}, {});
					let idate = new Date(order.start)
					let edate = new Date(this.endDate)
					while (idate <= edate) {
						let key = this.$formatDate(idate, "yyyy-MM-dd");
						tmpcategories.push(this.$formatDate(idate, "dd"))
						idate = idate.setDate(idate.getDate() + 1)
						idate = new Date(idate)
						orderMoney.push(moneyMap[key] ? moneyMap[key] / 100 : 0)
					}
				} else {
					//小时统计
					let {
						result: totalResult
					} = await db.collection("tian-mall-orders").where(order.where).field("total_fee,create_time")
						.groupBy(
							"dateToString(add(new Date(0),create_time),'%Y-%m-%d %H','+0800') as text").groupField(
							"sum(total_fee) as value").get();
					console.log(totalResult)
					let moneyMap = totalResult.data.reduce((total, item) => {
						total[item.text] = item.value;
						return total;
					}, {});
					console.log(order.start)
					let idate = new Date(order.start)
					let edate = new Date()
					while (idate <= edate) {
						let key = this.$formatDate(idate, "yyyy-MM-dd hh");
						tmpcategories.push(this.$formatDate(idate, "hh"))
						idate = idate.setHours(idate.getHours() + 1)
						idate = new Date(idate)
						orderMoney.push(moneyMap[key] ? moneyMap[key] / 100 : 0)
					}
				}
				console.log("orderCount", tmpcategories, orderMoney)

				this.orderData = {
					categories: tmpcategories,
					series: [{
						name: "支付金额",
						data: orderMoney,
					}]
				};
			},
			complete(e) {
				console.log(e);
				//uCharts.instance[e.id]代表当前的图表实例（除APP端，APP不可在组件外调用uCharts的实例）
				console.log(uCharts.instance[e.id]);
			}
		}
	};
</script>

<style lang="scss">
	page {
		box-shadow: none;
		background: transparent;
	}

	.content {
		display: flex;
		flex-direction: column;
		flex: 1;
		font-size: 24rpx;
	}

	.number {
		color: #1890FF;
		font-size: 32rpx;
		font-weight: 600;
	}

	.subMenu {
		margin-left: 12rpx;

		&.current {
			color: #1890FF;
			font-weight: 600;
		}
	}

	.charts-box {
		width: 100%;
		height: 300px;
	}

	.uni-table-scroll {
		min-height: 200px;
	}
</style>
