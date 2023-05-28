<template>
	<view>
		<view class="uni-header">
			<view class="uni-group">
				<view class="uni-title">商品信息管理</view>
				<view class="uni-sub-title">
					<button class="uni-button" v-for="(item,index) in filterBtns" :key="index"
						:type="filters==item.condition?'primary':'default'" size="mini"
						@click="setFilters(item.condition)">{{item.title}}</button>
				</view>
			</view>
			<view class="uni-group">
				<input class="uni-search" type="text" v-model="query" @confirm="search" placeholder="请输入搜索内容" />
				<button class="uni-button" type="primary" size="mini" @click="search">搜索</button>
				<button class="uni-button" type="default" size="mini" @click="navigateTo('./add')">新增</button>
				<button class="uni-button" type="warn" size="mini" :disabled="!selectedIndexs.length"
					@click="delTable">批量删除</button>
				<button class="uni-button" type="default" size="mini" :disabled="!selectedIndexs.length"
					@click="onLine">批量上架</button>
				<button class="uni-button" type="default" size="mini" :disabled="!selectedIndexs.length"
					@click="offLine">批量下架</button>
			</view>
		</view>
		<view class="uni-container">
<!-- 			<unicloud-db ref="udb" collection="opendb-mall-goods,opendb-mall-categories"
				field="category_id,goods_sn,name,price,market_price,keywords,goods_desc,goods_thumb,goods_banner_imgs,remain_count,month_sell_count,total_sell_count,comment_count,is_real,is_on_sale,is_alone_sale,is_best,is_new,is_hot,is_vip,add_date,last_modify_date,sku_name,seller_note,use_score_rate"
				:where="where" page-data="replace" :orderby="orderby" :getcount="true" :page-size="options.pageSize"
				:page-current="options.pageCurrent" v-slot:default="{c,pagination,loading,error,options}"
				:options="options" manual> -->
				<uni-table :loading="loading" :emptyText="error.message || '没有更多数据'" border stripe type="selection"
					@selection-change="selectionChange">
					<uni-tr>
						<uni-th align="center">缩略图</uni-th>
						<uni-th align="">名称</uni-th>
						<uni-th align="center">零售价/原价</uni-th>
						<uni-th align="center">分类(点击过滤)</uni-th>
						<uni-th align="center">月售/总销量/库存</uni-th>
						<uni-th align="center">商品状态</uni-th>
						<uni-th width="204" align="center">操作</uni-th>
					</uni-tr>
					<uni-tr v-for="(item,index) in data" :key="index">
						<uni-td align="center">
							<image v-if="item.goods_thumb" :src="$thumbImg(item.goods_thumb,'60x60')" mode="aspectFill"
								class="image-width-120 border-radius" @click="previewImage([item.goods_thumb],0)">
						</uni-td>
						<uni-td align="" width="200">
							<view class="font-28">
								<text>{{item.name}} </text>
							</view>
							<view class="font-24">
								<text>{{item.seller_note}} </text>
							</view>
							<view class="font-24">
								<text> {{item.keywords}} </text>
							</view>
							<view class="font-24">
								<text>货号： {{item.goods_sn}} </text>
							</view>
						</uni-td>
						<uni-td align="center">
							<text class="price">{{item.price/100}}</text>
							<block v-if="item.market_price">
								<text>/</text>
								<text class="price">{{item.market_price/100}}</text>
							</block>
						</uni-td>
						<uni-td align="" width="140">
							<view v-for="(cate,index2) in item.category_id" :key="index2" v-if="cate.parent_id"
								@click="navigateTo('./list?cid='+cate._id)">
								<text>{{cate.name}}</text>
							</view>
						</uni-td>
						<uni-td align="center"> {{item.month_sell_count}} / {{item.total_sell_count}} /
							{{item.remain_count}}
						</uni-td>
						<uni-td align="">
							<view class="ti-flex" @click="changeBooleanProperty(item,'is_on_sale')">
								<text class="flex-1">上下架</text><text>{{item.is_on_sale == true ? '✅' : '❌'}}</text>
							</view>
							<block v-if="$hasRole('admin')">
								<view class="ti-flex" @click="changeBooleanProperty(item,'is_new')">
									<text class="flex-1">新品</text><text>{{item.is_new == true ? '✅' : '❌'}}</text>
								</view>
								<view class="ti-flex" @click="changeBooleanProperty(item,'is_hot')">
									<text class="flex-1">热门</text><text>{{item.is_hot == true ? '✅' : '❌'}}</text>
								</view>
								<view class="ti-flex" @click="changeBooleanProperty(item,'is_vip')">
									<text class="flex-1">会员</text><text>{{item.is_vip == true ? '✅' : '❌'}}</text>
								</view>
							</block>
						</uni-td>
						<uni-td align="center">
							<view class="uni-group">
								<button @click="navigateTo('./edit?id='+item._id, false)" class="uni-button icon-button"
									size="mini" type="primary">
									<uni-icons type="compose" color="#ffffff" size="18" />
								</button>
								<button @click="confirmDelete(item._id)" class="uni-button icon-button" size="mini"
									type="warn">
									<uni-icons type="trash" color="#ffffff" size="18" />
								</button>
							</view>
						</uni-td>
					</uni-tr>
				</uni-table>
				<view class="uni-pagination-box">
					<uni-pagination v-model="pagination.current" show-icon :page-size="pagination.size"
						:total="pagination.count" @change="onPageChanged" />
				</view>
			<!-- </unicloud-db> -->
		</view>
	</view>
</template>

<script>
	import { enumConverter } from '../../js_sdk/validator/opendb-mall-goods.js';

	const db = uniCloud.database()
	const cmd = db.command;
	// 表查询配置
	const dbOrderBy = 'last_modify_date desc' // 排序字段
	const dbSearchFields = ["name"] // 模糊搜索字段，支持模糊搜索的字段列表
	// 分页配置
	const pageSize = 10
	const pageCurrent = 1

	export default {
		data() {
			return {
				filters: "is_on_sale==true",
				filterBtns: [
					{
						title: "已上架",
						condition: "is_on_sale==true"
					}, 
					{
						title: "已下架",
						condition: "is_on_sale==false"
					}, 
					{
						title: "售罄",
						condition: "remain_count<10"
					}
				],
				cid: '',
				query: '',
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
				},
				data: [],
				loading: false,
				pagination: {
					size: 10,
					current: 1,
					count: 10,
				},
				error: {
					message: ""
				}
			}
		},
		onLoad(e) {
			if (e.cid) {
				this.cid = e.cid;
			}
			if (e.type == "remain") {
				this.filters = "remain_count<10"
			}
			this.search();
		},
		onReady() {
			this.loadData()
		},
		methods: {
			setFilters(str) {
				this.filters = str;
				this.search();
			},
			getWhere() {
				const query = this.query.trim()
				if (!query) {
					return ''
				}
				const queryRe = new RegExp(query, 'i')
				return dbSearchFields.map(name => queryRe + '.test(' + name + ')').join(' || ')
			},
			search() {
				let newWhere = this.getWhere()
				let condition = [`shop_id=="${this.adminShopId}"`]
				if (newWhere) {
					condition.push(`(${newWhere})`)
				}
				if (this.filters) {
					condition.push(this.filters)
				}
				if (this.cid) {
					condition.push(`category_id._id=="${this.cid}"`)
				}
				newWhere = condition.join(" && ");
				const isSameWhere = newWhere === this.where
				this.where = newWhere;
				console.log(this.where)
				if (isSameWhere) { // 相同条件时，手动强制刷新
					this.loadData()
				}
			},
			loadData(clear = true) {
				this.$requestApp("mall/goods/goodsList", 
					{
						"where":{"is_on_sale":true},
						"orderby":"last_modify_date desc",
						"page_no":1,
						"page_size":10,
						"user_id":22,
					}
				).then(res => {
					this.data = res
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
			onLine() {
				db.collection("opendb-mall-goods").where({
					_id: cmd.in(this.selectedItems())
				}).update({
					is_on_sale: true
				}).then(() => {
					uni.showToast({
						icon: "none",
						title: "批量上架成功"
					})
					this.loadData(false)
				})
			},
			offLine() {
				db.collection("opendb-mall-goods").where({
					_id: cmd.in(this.selectedItems())
				}).update({
					is_on_sale: false
				}).then(() => {
					uni.showToast({
						icon: "none",
						title: "批量下架成功"
					})
					this.loadData(false)
				})
			},
			// 多选
			selectionChange(e) {
				this.selectedIndexs = e.detail.index
			},
			confirmDelete(id) {
				this.$requestApp("mall/goods/remove",{id}).then(res => {
					this.loadData()
				})
			},
			changeBooleanProperty(item, field) {
				item[field] = !item[field];
				db.collection("opendb-mall-goods").doc(item._id).update({
					[field]: item[field],
					last_modify_date: Date.now()
				}).then(() => {
					uni.showToast({
						icon: "none",
						title: "更新成功"
					})
				})
			}
		}
	}
</script>
