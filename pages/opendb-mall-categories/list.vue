<template>
	<view>
		<view class="uni-header">
			<view class="uni-group">
				<view class="uni-title">分类信息管理<text class="font-24 margin-left-10 colorGray">(两级分类)</text> </view>
				<view class="uni-sub-title">
					<button class="uni-button" v-for="(item,index) in filterBtns" :key="index"
						:type="filters==item.condition?'primary':'default'" size="mini"
						@click="setFilters(item.condition)">{{item.title}}</button>
				</view>
			</view>
			<view class="uni-group">
				<input class="uni-search" type="text" v-model="query" @confirm="search" placeholder="请输入搜索内容" />
				<button class="uni-button" type="default" size="mini" @click="search">搜索</button>
				<button class="uni-button" type="default" size="mini" @click="navigateTo('./add')">新增</button>
				<button class="uni-button" type="default" size="mini" :disabled="!selectedIndexs.length"
					@click="delTable">批量删除</button>
			</view>
		</view>
		<view class="uni-container">
			<uni-table border stripe type="selection" @selection-change="selectionChange">
				<uni-tr>
					<uni-th align="">名称</uni-th>
					<uni-th align="center">图标</uni-th>
					<uni-th align="center">排序</uni-th>
					<!-- <uni-th align="center">首页显示</uni-th> -->
					<uni-th align="center">生效状态</uni-th>
					<uni-th align="center">create_date</uni-th>
					<uni-th width="" align="center">操作</uni-th>
				</uni-tr>
				<uni-tr v-for="(item,index) in dataList" :key="index">
					<uni-td align=""> {{item.name}} </uni-td>
					<uni-td align="center">
						<image v-if="item.icon" :src="$thumbImg(item.icon,'40x40')" @click="previewImage([item.icon],0)"
							mode="aspectFill" class="image-width-80 border-radius">
						</image>
					</uni-td>
					<uni-td align="center"> {{item.sort}} </uni-td>
					<!-- <uni-td align="center">
						<view class="" v-if="!item.parent_id" @click="changeBooleanProperty(item,'is_index_show')">
							<text>{{item.is_index_show == true ? '✅' : '❌'}}</text>
						</view>
					</uni-td> -->
					<uni-td align="center">
						<view class="" @click="changeBooleanProperty(item,'status')">
							<text>{{item.status == true ? '✅' : '❌'}}</text>
						</view>
					</uni-td>
					<uni-td align="center">
						<uni-dateformat :date="item.create_date" :threshold="[0, 0]" />
					</uni-td>
					<uni-td align="center">
						<view class="uni-group">
							<button v-if="!item.parent_id" @click="navigateTo('./add?pid='+item._id, false)"
								class="uni-button" size="mini" type="primary">子分类</button>
							<button v-else @click="navigateTo('/pages/opendb-mall-goods/list?cid='+item._id, false)"
								class="uni-button" size="mini" type="primary">商品</button>
							<button @click="navigateTo('./edit?id='+item._id, false)" class="uni-button" size="mini"
								type="primary">修改</button>
							<button @click="confirmDelete(item._id)" class="uni-button" size="mini"
								type="warn">删除</button>
						</view>
					</uni-td>
				</uni-tr>
			</uni-table>
		</view>
	</view>
</template>

<script>
	import { enumConverter } from '../../js_sdk/validator/opendb-mall-categories.js';

	const db = uniCloud.database()
	// 表查询配置
	const dbOrderBy = '' // 排序字段
	const dbSearchFields = ["name", "description"] // 模糊搜索字段，支持模糊搜索的字段列表
	// 分页配置
	const pageSize = 10
	const pageCurrent = 1
	// 菜单扁平化
	function flatMenu(menu, result, depth = 0) {
		menu.name = (depth ? '　'.repeat(depth) + '|-' : '') + menu.name
		result.push(menu)
		if (menu.children) {
			flatMenus(menu.children, result, depth + 1)
		}
	}

	function flatMenus(menus, result = [], depth = 0) {
		menus.forEach(menu => flatMenu(menu, result, depth))
		return result
	}
	export default {
		data() {
			return {
				filters: "status==true",
				filterBtns: [
					{
						title: "所有分类",
						condition: "name!=null"
					}, 
					{
						title: "有效分类",
						condition: "status==true"
					}, 
					{
						title: "首页显示",
						condition: "is_index_show==true"
					}
				],
				dataList: [],
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
				}
			}
		},
		onLoad() {
			this.search()
		},
		methods: {
			setFilters(str) {
				this.filters = str;
				this.search();
			},
			getWhere() {
				const query = this.query.trim()
				if (!query) {
					return;
				}
				const queryRe = new RegExp(query, 'i')
				return dbSearchFields.map(name => queryRe + '.test(' + name + ')').join(' || ')
			},
			search() {
				this.loadData();
			},
			loadData() {
				const newWhere = this.getWhere()
				let condition = ["name!=null", `shop_id=="${this.adminShopId}"`]
				if (newWhere) {
					condition.push(`(${newWhere})`)
				}
				if (this.filters) {
					condition.push(this.filters)
				}

				console.log(condition.join(" && "))
				this.where = condition.join(" && ");
				console.log("this.where=", this.where)
				this.$requestApp("mall/category/categories").then(res => {
					this.dataList = flatMenus(res);
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
				return this.selectedIndexs.map(i => this.dataList[i]._id)
			},
			// 批量删除
			delTable() {
				let ids = this.selectedItems().join(",");
				uni.showModal({
					content: "是否确定删除？",
					success: (res) => {
						if (res.confirm) {
							this.confirmDelete(ids)
						}
					}
				})

			},
			// 多选
			selectionChange(e) {
				this.selectedIndexs = e.detail.index
			},
			confirmDelete(id) {
				uni.showModal({
					content: "是否确定删除？",
					success: (res) => {
						if (res.confirm) {
							this.$requestApp("mall/category/remove", { ids: id }).then(res => {
								uni.showToast({
									icon: "success",
									title: "删除成功"
								})
								this.search()
							})
						}
					}
				})
			},
			changeBooleanProperty(item, field) {
				item[field] = !item[field];
				db.collection("opendb-mall-categories").doc(item._id).update({
					[field]: item[field]
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
