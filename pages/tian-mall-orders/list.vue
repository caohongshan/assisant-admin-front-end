<template>
	<view>
		<view class="uni-header">
			<view class="uni-group">
				<view class="uni-title">订单管理</view>
				<view class="uni-sub-title">
					<button class="uni-button" :type="state==1?'primary':'default'" size="mini"
						@click="setCondition(1)">待付款</button>
					<button class="uni-button" :type="state==2?'primary':'default'" size="mini"
						@click="setCondition(2)">待发货</button>
					<button class="uni-button" :type="state==3?'primary':'default'" size="mini"
						@click="setCondition(3)">已发货</button>
					<button class="uni-button" :type="state==4?'primary':'default'" size="mini"
						@click="setCondition(4)">待评论</button>
				</view>
			</view>
			<view class="uni-group">
				<input class="uni-search" type="text" v-model="query" @confirm="search" placeholder="请输入搜索内容" />
				<button class="uni-button" type="default" size="mini" @click="search">搜索</button>
				<button class="uni-button" type="primary" size="mini" @click="downloadData">下载本页数据</button>
				<!-- 	<button class="uni-button" type="default" size="mini" @click="navigateTo('./add')">新增</button>
				<button class="uni-button" type="default" size="mini" :disabled="!selectedIndexs.length"
					@click="delTable">批量删除</button> -->
			</view>
		</view>
		<view class="uni-container">
			<unicloud-db ref="udb" collection="tian-mall-orders" action="check_order"
				field="id,create_time,operater_log,address,body,cancel_apply,cancel_style,delivers,shop,cart_count,delivery_hour,payInfo,group_buying,delivery_type,freight,goods,is_delete,juli,last_pay_time,platform,remarks,state,discount,total_fee,invoice,score,userInfo"
				:where="where" page-data="replace" :orderby="orderby" :getcount="true" :page-size="options.pageSize"
				:page-current="options.pageCurrent" v-slot:default="{data,pagination,loading,error,options}"
				:options="options" manual>
				<uni-table :loading="loading" :emptyText="error.message || '没有更多数据'" border stripe type="selection"
					@selection-change="selectionChange">
					<uni-tr>
						<uni-th align="center">单号</uni-th>
						<uni-th align="center">用户信息</uni-th>
						<uni-th align="center">用户收货地址</uni-th>
						<uni-th align="center">商品</uni-th>
						<uni-th align="center">快递</uni-th>
						<uni-th align="center">订单状态</uni-th>
						<uni-th align="center">下单时间</uni-th>
						<uni-th width="140" align="center">操作</uni-th>
					</uni-tr>
					<uni-tr v-for="(item,index) in data" :key="index">
						<uni-td align="center">
							{{item.id}}
						</uni-td>
						<uni-td align="" width="120">
							<tian-user :value="[item.userInfo?item.userInfo:{}]"></tian-user>
						</uni-td>
						<uni-td width="200">
							<view class="" v-if="item.address">
								<text>{{item.address.name}}</text>
								<text class="margin-left-30">{{item.address.alias}}</text>
								<text class="margin-left-30">{{item.address.mobile}}</text>
							</view>
							<view class="" v-if="item.address">
								<text>{{item.address.formatted_address}}</text>
								<text>{{item.address.address}}</text>
							</view>
							<view class="">
								<text>备注：{{item.remarks}}</text>
							</view>
							<view class="">
								<text>配送方式：{{options.delivery_type_valuetotext[item.delivery_type]}}</text>
								<text class="margin-left-30">运费：</text>
								<text class="price">{{item.freight/100}} </text>
							</view>
						</uni-td>
						<uni-td align="" width="300">
							<view class="">
								<text>总数量：</text>
								<text class="font-38">{{item.cart_count}}</text>
							</view>
							<view v-for="(goods,index2) in item.goods" :key="index2" class="margin-top-10">
								<view class="">
									<text>{{index2+1}}：</text>
									<text>{{goods.name}}</text>
								</view>
								<view class="ti-flex">
									<image :src="$thumbImg(goods.goods_thumb,'40x40')"
										@click="previewImage([goods.goods_thumb],0)" mode="aspectFill"
										class="image-width-80"></image>
									<view class="margin-left-30 flex-1">
										<view class="">
											<text>规格：{{goods.sku_name}}</text>
										</view>
										<view class="">
											<text class="">价格：</text>
											<text class="price">{{goods.price/100}}</text>
											<text class="margin-left-30">数量：</text>
											<text class="font-38">{{goods.amount}}</text>
										</view>
									</view>
									<button v-if="item.state.value>0" class="uni-button" size="mini" type="primary"
										@click="addExpress({id:item._id,goods_id:goods.goods_id,sku_id:goods.sku_id})">单品发货</button>
								</view>
							</view>
						</uni-td>
						<uni-td align="">
							<view v-for="(delivery,index2) in item.delivers" :key="index2">
								<view class="colorBlue">
									<view class="">
										<text>{{delivery.company}}：</text>
										<text>{{delivery.number}}</text>
									</view>
									<view class="btns">
										<text class="" @click="showExpress(delivery)">详情</text>
										<text class="margin-left-30 colorRed"
											@click="deleteExpress({id:item._id},delivery)">删除</text>
									</view>
								</view>
							</view>

						</uni-td>

						<uni-td align="" :style="{color: item.state.color}" style="width: 200px;word-break: break-all;">
							<!-- <view class="font-32">
								<text>{{item.state.text}}</text>
							</view> -->
							<view class="">
								<text>{{item.state.content}}</text>
							</view>
							<view class="" v-if="item.payInfo && $hasRole('admin')">
								<view class="">
									<text>支付类型：</text>
									<text>{{item.payInfo.type}}</text>
								</view>
								<view class="" v-if="item.payInfo.subMchId">
									<text>商户号：</text>
									<text>{{item.payInfo.subMchId}}</text>
								</view>
								<view class="" v-else-if="item.payInfo.mchId">
									<text>商户号：</text>
									<text>{{item.payInfo.mchId}}</text>
								</view>
								<view class="">
									<text>订单号：</text>
									<text>{{item.payInfo.outTradeNo}}</text>
								</view>
								<!-- <view class="">
									<text>交易单号：</text>
									<text>{{item.payInfo.transactionId}}</text>
								</view> -->
								<view class="" v-if="item.payInfo.totalFee">
									<text>支付金额：</text>
									<text class="price">{{item.payInfo.totalFee/100}}</text>
								</view>
								<uni-dateformat :date="item.payInfo.time" :threshold="[0, 0]" />
							</view>
							<view class="">
								<text>总优惠：</text>
								<text class="price">{{item.discount/100}}</text>
							</view>
							<view class="">
								<text>总金额：</text>
								<text class="price font-38">{{item.total_fee/100}}</text>
							</view>
							<view class="" v-if="item.shop && item.shop.total_fee">
								<text>预计收入：</text>
								<text class="price font-38">{{item.shop.total_fee/100}}</text>
							</view>
							<view class="" v-if="item.invoice">
								<text>发票抬头：</text>
								<text class="">{{item.invoice}}</text>
							</view>
						</uni-td>
						<uni-td align="center">
							<uni-dateformat :date="item.create_time" :threshold="[0, 0]" />
						</uni-td>
						<uni-td align="">
							<view class="ti-flex btns">
								<block v-if="item.state.value>1">
									<button class="uni-button" size="mini" type="primary"
										@click="printOrder(item)">订单打印</button>
								</block>
								<block v-else-if="item.state.value>0">
									<button class="uni-button" size="mini" type="primary"
										@click="addExpress({id:item._id})">订单发货</button>
									<button class="uni-button" size="mini" type="primary"
										@click="printOrder(item)">订单打印</button>
									<!-- <button class="uni-button" size="mini" type="warn" v-if="item.invoice">申请发票</button> -->
									<button class="uni-button" size="mini" type="warn"
										@click="cancelOrder(item)">强制取消</button>
								</block>
								<block v-else>
									<!-- <button class="uni-button" size="mini" type="primary">提醒付款</button> -->
								</block>
							</view>
						</uni-td>
					</uni-tr>
				</uni-table>
				<view class="uni-pagination-box">
					<uni-pagination show-icon :page-size="pagination.size" v-model="pagination.current"
						:total="pagination.count" @change="onPageChanged" />
				</view>
			</unicloud-db>
		</view>
		<uni-popup ref="expressPopup" type="center">
			<view class="padding-20 bg-white">
				<tian-express @canceled="closeExpressPopup" :value="expressValue" :showNumber="showNumber"
					@comfirm="comfirmExpress">
				</tian-express>
			</view>
		</uni-popup>
		<uni-popup type="center" ref="expressDetailPopup">
			<view class="padding-20 bg-white">
				<tian-express-detail @canceled="closeExpressDetailPopup" :value="expressValue">
				</tian-express-detail>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import XLSX from "xlsx";
	import FileSaver from "file-saver";
	import {
		enumConverter
	} from '../../js_sdk/validator/tian-mall-orders.js';

	const db = uniCloud.database()
	// 表查询配置
	const dbOrderBy = 'create_time desc' // 排序字段
	const dbSearchFields = ["userInfo.mobile", "userInfo.nickname", "address.mobile"] // 模糊搜索字段，支持模糊搜索的字段列表
	// 分页配置
	const pageSize = 10
	const pageCurrent = 1

	export default {
		data() {
			return {
				showNumber: true,
				expressValue: {},
				query: '',
				state: 2,
				where: '',
				orderby: dbOrderBy,
				selectedIndexs: [],
				options: {
					pageSize,
					pageCurrent,
					...enumConverter
				},
				imageStyles: {
					width: 64,
					height: 64
				}
			}
		},
		onLoad(e) {
			if (e.state) {
				this.state = +e.state;
			}
		},
		onReady() {
			this.search()
			console.log(this.where)
		},
		methods: {
			getWhere() {
				const query = this.query.trim()
				if (!query) {
					return ''
				}
				const queryRe = new RegExp(query, 'i')
				return dbSearchFields.map(name => queryRe + '.test(' + name + ')').join(' || ')
			},
			setCondition(state) {
				this.state = state;
				this.search();
			},
			search() {
				let newWhere = this.getWhere()
				let condition = [`shop_id=="${this.adminShopId}"`];
				if (newWhere) {
					condition.push(`(${newWhere})`)
				}
				if (this.state) {
					condition.push(`state == ${this.state-1}`);
				}
				newWhere = condition.join("&&");
				console.log("newWhere", newWhere)
				const isSameWhere = newWhere === this.where
				this.where = newWhere
				if (isSameWhere) { // 相同条件时，手动强制刷新
					this.loadData()
				}
			},
			loadData(clear = true) {
				this.$refs.udb.loadData({
					clear
				})
			},
			onPageChanged(e) {
				this.$refs.udb.loadData({
					current: e.current
				})
			},
			navigateTo(url, clear) {
				// clear 表示刷新列表时是否清除页码，true 表示刷新并回到列表第 1 页，默认为 true
				uni.navigateTo({
					url,
					events: {
						refreshData: () => {
							this.loadData(clear)
						}
					}
				})
			},
			// 多选处理
			selectedItems() {
				var dataList = this.$refs.udb.dataList
				return this.selectedIndexs.map(i => dataList[i]._id)
			},
			// 批量删除
			delTable() {
				this.$refs.udb.remove(this.selectedItems())
			},
			// 多选
			selectionChange(e) {
				this.selectedIndexs = e.detail.index
			},
			confirmDelete(id) {
				this.$refs.udb.remove(id)
			},
			closeExpressPopup() {
				console.log("closeExpressPopup")
				this.$refs.expressPopup.close()
			},
			closeExpressDetailPopup() {
				console.log("closeExpressPopup")
				this.$refs.expressDetailPopup.close()
			},
			comfirmExpress(e) {
				console.log("comfirmExpress", e)
				this.$refs.expressPopup.close()
				setTimeout(() => {
					this.loadData(false)
				}, 2000)
			},
			printExpress(item) {
				this.showNumber = false;
				//快递发货,弹出输入单号
				this.$refs.expressPopup.open()
			},
			editExpress(item, express) {
				this.showNumber = true;
				item.type = "edit"
				this.expressValue = {
					...item,
					...express
				};
				console.log(this.expressValue)
				this.$refs.expressPopup.open()
			},
			deleteExpress(item, express) {
				uni.showModal({
					content: "是否确定删除？",
					success: (res) => {
						if (res.confirm) {
							this.$request("admin/order/deliver", {
								...item,
								...express,
								type: "delete",
							}, {
								functionName: "tiantian-mall"
							}).then(res => {
								uni.showToast({
									title: "删除单号成功"
								})
								this.loadData(false)
							}, err => {
								uni.showToast({
									title: "删除失败",
									icon: "none"
								})
							})
						}
					}
				})
			},
			addExpress(item) {
				item.type = "add"
				this.showNumber = true;
				this.expressValue = item;
				console.log("expressValue", item)
				//快递发货,弹出输入单号
				this.$refs.expressPopup.open()
			},
			showExpress(item) {
				this.showNumber = true;
				console.log("expressValue", item)
				//快递发货,弹出输入单号
				this.$refs.expressDetailPopup.open()
				setTimeout(() => {
					this.expressValue = item;
				}, 200)
			},
			downloadData() {
				const defaultCellStyle = {
					font: {
						name: "Verdana",
						sz: 11,
						color: "FF00FF88"
					},
					fill: {
						fgColor: {
							rgb: "FFFFAA00"
						}
					}
				};
				const wopts = {
					bookType: "xlsx",
					bookSST: false,
					type: "binary",
					defaultCellStyle: defaultCellStyle,
					showGridLines: false
				};
				const wb = {
					SheetNames: ["Sheet1"],
					Sheets: {},
					Props: {}
				};
				let data = [
					["订单序号", "订单号", "状态", "用户姓名", "用户手机号", "收货姓名", "收货手机号", "收货地址", "付款类型", "付款单号", "付款金额", "付款时间",
						"下单时间", "使用积分", "优惠金额", "总金额", "商品id", "商品sn", "商品信息", "商品型号", "商品单价", "商品数量", "是否会员",
						"商品使用积分", "商品合计"
					]
				];
				this.$refs.udb.dataList.map(item => {
					//提取订单号，交易单号，支付类型，商品信息，用户信息，使用积分信息，优惠，时间
					let basic = [item.id, item._id];
					basic.push(item.state.text)
					//下单用户
					if (item.userInfo) {
						basic.push(item.userInfo.nickname)
						basic.push(item.userInfo.mobile)
					} else {
						basic.push("")
						basic.push("")
					}
					//收货地址
					if (item.address) {
						basic.push(item.address.name)
						basic.push(item.address.mobile)
						basic.push(item.address.formatted_address + item.address.address)
					} else {
						basic.push("")
						basic.push("")
						basic.push("")
					}
					//付款信息
					if (item.payInfo) {
						basic.push(item.payInfo.type)
						basic.push(item.payInfo.transaction_id ? item.payInfo.transaction_id : item.payInfo
							.transactionId)
						basic.push(item.payInfo.totalFee ? item.payInfo.totalFee / 100 : item.total_fee)
						basic.push(new Date(item.payInfo.time))
					} else {
						basic.push("")
						basic.push("")
						basic.push("")
						basic.push("")
					}
					//"下单时间","使用积分", "优惠金额", "总金额","商品id", "商品sn","商品信息","商品型号", "商品单价", "商品数量","是否会员", "商品使用积分", "商品合计"
					basic.push(new Date(item.create_time))
					basic.push(item.score)
					basic.push(item.discount / 100)
					basic.push(item.total_fee / 100)

					item.goods.map(g => {
						let goodsInfo = [];
						goodsInfo.push(g.goods_id)
						goodsInfo.push(g.goods_sn)
						goodsInfo.push(g.name)
						goodsInfo.push(g.sku_name)
						goodsInfo.push(g.price / 100)
						goodsInfo.push(g.amount)
						goodsInfo.push(g.is_vip ? "是" : "否")
						goodsInfo.push(g.use_score)
						goodsInfo.push(g.total / 100)
						data.push([...basic, ...goodsInfo])
					})
				});
				// console.log("data", data)
				wb.Sheets["Sheet1"] = XLSX.utils.json_to_sheet(data);

				//创建二进制对象写入转换好的字节流
				let tmpDown = new Blob([this.s2ab(XLSX.write(wb, wopts))], {
					type: "application/octet-stream"
				});
				// 保存文件
				FileSaver.saveAs(tmpDown, "order-" + (this.$formatDate(new Date(), "yyyy_MM_dd_hh_mm_ss")) + ".xls");
			},
			// 字符串转字符流
			s2ab(s) {
				if (typeof ArrayBuffer !== "undefined") {
					let buf = new ArrayBuffer(s.length);
					let view = new Uint8Array(buf);
					for (let i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
					return buf;
				} else {
					let buf = new Array(s.length);
					for (let j = 0; j != s.length; ++j) buf[j] = s.charCodeAt(j) & 0xff;
					return buf;
				}
			},
			cancelOrder(item) {
				uni.showModal({
					content: `是否确定取消订单，系统将直接退款`,
					success: (res) => {
						if (res.confirm) {
							this.$request(
								'admin/order/cancel', {
									id: item._id,
									module: "mall",
								}, {
									functionName: 'tiantian-mall'
								}
							).then(res => {
								uni.hideLoading()
								uni.showToast({
									title: res.message || "操作成功"
								})
								setTimeout(() => {
									this.loadData(false);
								}, 2000)
							});
						}
					}
				})
			},
			printOrder(item) {
				console.log("item", item)
				let time = this.$dateFormat("Y-m-d H:i:s", item.create_time)
				let data = [
					`<p><span style="width:200px;display: inline-block;">订单号：${item.id}</span>下单时间：${time}</p>`,
					this.$stringFormat(
						`<p><span style="width:200px;display: inline-block;">姓名：{address.name}</span>电话：{address.mobile}</p><p>地址：{address.formatted_address}{address.address}</p>`,
						item),
					"<table class='table border table-striped table-bordered'>",
					"<tr><th>货号</th><th>名称</th><th>规格</th><th>单价</th><th>数量</th><th>总计</th></tr>"
				]
				let goodsInfo = item.goods.map(t => {
					let info = `<tr>`;
					info += `<td>${t.goods_sn}</td>`
					info += `<td style="width:200px">${t.name}</td>`
					info += `<td >${t.sku_name}</td>`
					info += `<td >￥${t.price/100}</td>`
					info += `<td >${t.amount}</td>`
					info += `<td >￥${t.total/100}</td>`
					info += '</tr>';
					return info;
				})
				data = data.concat(goodsInfo)
				data.push("</table>")
				data.push(
					`<p style="font-size:22px;text-align:right;">合计：共${item.cart_count}件，￥ ${item.total_fee/100}</p>`)
				if (item.invoice) {
					data.push(`<p style="font-size:22px;text-align:right;">发票抬头：${item.invoice}</p>`)
				}
				//打印申请表
				this.$printContents(data.join(""), "销售订单")
			},
		}
	}
</script>

<style lang="scss">
	.btns {
		flex-direction: column;

		.uni-button+.uni-button {
			margin-left: 0px;
			margin-top: 10px;
		}
	}
</style>
