<template>
	<view>
		<view class="uni-header">
			<uni-stat-breadcrumb class="uni-stat-breadcrumb-on-phone" />
			<view class="uni-group">
				<text class="colorGray">转账接口：</text>
				<uni-data-checkbox mode="tag" v-model="type" :localdata="types" @change="changeType" />
				<input class="uni-search" type="text" v-model="query" @confirm="search" placeholder="请输入搜索内容" />
				<button class="uni-button" type="default" size="mini" @click="search">搜索</button>
				<button class="uni-button" type="primary" size="mini" @click="downloadData">下载本页数据</button>
				<button class="uni-button" type="default" size="mini" :disabled="!selectedIndexs.length"
					@click="delTable">批量删除</button>
			</view>
		</view>
		<view class="uni-container">
<!-- 			<unicloud-db ref="udb" collection="tian-user-cashouts"
				field="create_time,update_time,user_id,user,payment,amount,balance,status,mode" :where="where"
				page-data="replace" :orderby="orderby" :getcount="true" :page-size="options.pageSize"
				:page-current="options.pageCurrent" v-slot:default="{data,pagination,loading,error,options}"
				:options="options"> -->
				<uni-table :loading="loading" :emptyText="error.message || '没有更多数据'" border stripe type="selection"
					@selection-change="selectionChange">
					<uni-tr>
						<uni-th align="center">用户</uni-th>
						<uni-th align="center">金额</uni-th>
						<uni-th align="center">余额</uni-th>
						<uni-th align="center">状态</uni-th>
						<uni-th align="center">付款</uni-th>
						<uni-th align="center">提现方式</uni-th>
						<uni-th align="center">申请时间</uni-th>
						<uni-th align="center">修改时间</uni-th>
						<uni-th width="204" align="center">操作</uni-th>
					</uni-tr>
					<uni-tr v-for="(item,index) in data" :key="index">
						<uni-td align="center">
							<tian-user :value="[item.user]" />
						</uni-td>
						<uni-td align="center"> {{item.amount/100}} </uni-td>
						<uni-td align="center"> {{item.balance/100}} </uni-td>
						<uni-td align="center"> {{options.status_valuetotext[item.status]}} </uni-td>
						<uni-td align="center"> {{item.payment?"已付款":"未付款"}} </uni-td>
						<uni-td align="center">
							<view class="">
								<text>{{options.mode_valuetotext[item.mode]}}</text>
							</view>
							<view class="" v-if="item.mode=='bank'">
								<text>{{item.user.bankinfo.title}},</text>
								<text>{{item.user.bankinfo.name}}</text>
								<view class="">
									<text>{{item.user.bankinfo.number}}</text>
								</view>
							</view>
						</uni-td>
						<uni-td align="center">
							<uni-dateformat :date="item.create_time" :threshold="[0, 0]" />
						</uni-td>
						<uni-td align="center">
							<uni-dateformat :date="item.update_time" :threshold="[0, 0]" />
						</uni-td>
						<uni-td align="center">
							<view class="uni-group" v-if="item.status==0">
								<button @click="passed(item._id)" class="uni-button" size="mini"
									type="primary">通过</button>
								<button @click="refuse(item._id)" class="uni-button" size="mini" type="warn">拒绝</button>
							</view>
						</uni-td>
					</uni-tr>
				</uni-table>
				<view class="uni-pagination-box">
					<uni-pagination show-icon :page-size="pagination.size" v-model="pagination.current"
						:total="pagination.count" @change="onPageChanged" />
				</view>
			<!-- </unicloud-db> -->
		</view>
	</view>
</template>

<script>
	import XLSX from "xlsx";
	import FileSaver from "file-saver";
	import { enumConverter } from '../../js_sdk/validator/tian-user-cashouts.js';

	const db = uniCloud.database()
	// 表查询配置
	const dbOrderBy = 'create_time desc' // 排序字段
	const dbSearchFields = ["user.nickname", "user.mobile"] // 模糊搜索字段，支持模糊搜索的字段列表
	// 分页配置
	const pageSize = 10
	const pageCurrent = 1

	export default {
		data() {
			return {
				query: '',
				where: '',
				orderby: dbOrderBy,
				selectedIndexs: [],
				type: "tiantian-mall",
				types: [{
					text: "旧版本",
					value: "tiantian-mall"
				}, {
					text: "新版本",
					value: "tiantian-wxpay-v3"
				}],
				options: {
					pageSize,
					pageCurrent,
					...enumConverter
				},
				imageStyles: {
					width: 64,
					height: 64
				},
				loading: false,
				data: {},
				error: {
					message: ''
				},
				pagination: {
					count: 3,
					current: 1, 
					size: 10
				}
			}
		},
		onLoad() {
			this.loadData();
			let type = uni.getStorageSync("tian-user-cashouts-type")
			if (type) {
				this.type = type
			}
		},
		methods: {			
			changeType(e) {
				console.log(e.detail.value)
				//写入缓存，方便下次读取
				uni.setStorageSync("tian-user-cashouts-type", e.detail.value)
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
				const newWhere = this.getWhere()
				const isSameWhere = newWhere === this.where
				this.where = newWhere
				if (isSameWhere) { // 相同条件时，手动强制刷新
					this.loadData()
				}
			},
			loadData(clear = true) {
				this.$request("admin/tian_user_cashouts/getCashout", {id: "17"}).then(res => {
					this.data = res;
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
			refuse(id) {
				uni.showModal({
					content: "是否确定拒绝提现？",
					success: (res) => {
						if (res.confirm) {
							uni.showLoading({
								mask: true
							})
							this.$request(
								'admin/tian_user_cashouts/refuse', {
									id
								}, {
									functionName: this.type
								}
							).then(res => {
								uni.hideLoading()
								uni.showToast({
									title: res.message || "操作成功"
								})
								setTimeout(() => {
									this.loadData(false);
								}, 2000)
							}, err => {
								uni.hideLoading()
							});
						}
					}
				})
			},
			passed(id) {
				uni.showModal({
					content: "是否确定审核通过？",
					success: (res) => {
						if (res.confirm) {
							uni.showLoading({
								mask: true
							})
							this.$request(
								'admin/tian_user_cashouts/passed', {
									id: "17"
								}, {
									functionName: this.type
								}
							).then(res => {
								uni.hideLoading()
								uni.showToast({
									title: res.message || "操作成功"
								})
								setTimeout(() => {
									this.loadData(false);
								}, 2000)
							}, err => {
								uni.hideLoading()
							});
						}
					}
				})
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
					["用户ID", "用户姓名", "用户手机号", "提现金额", "余额", "审核状态", "付款类型", "提现方式", "申请时间", "修改时间"]
				];
				this.$refs.udb.dataList.map(item => {
					let basic = [];
					//用户
					if (item.user) {
						basic.push(item.user._id)
						basic.push(item.user.nickname)
						basic.push(item.user.mobile)
					} else {
						basic.push("")
						basic.push("")
					}
					basic.push(item.amount / 100)
					basic.push(item.balance / 100)
					basic.push(this.options.status_valuetotext[item.status])
					basic.push(item.payment ? "已付款" : "未付款")
					basic.push(this.options.mode_valuetotext[item.mode])
					basic.push(new Date(item.create_time))
					basic.push(new Date(item.update_time))
					data.push(basic)
				});
				// console.log("data", data)
				wb.Sheets["Sheet1"] = XLSX.utils.json_to_sheet(data);

				//创建二进制对象写入转换好的字节流
				let tmpDown = new Blob([this.s2ab(XLSX.write(wb, wopts))], {
					type: "application/octet-stream"
				});
				// 保存文件
				FileSaver.saveAs(tmpDown, "cashouts-" + (this.$formatDate(new Date(), "yyyy_MM_dd_hh_mm_ss")) + ".xls");
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
			}
		}
	}
</script>
