<template>
	<view>
		<ly-tree :tree-data="treeData" :ready="ready" :props="props" node-key="_id" highlightCurrent showNodeIcon
			:expandOnClickNode="false" :showCheckbox="showCheckbox" :showRadio="showRadio" @check="checkItems">
		</ly-tree>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				categories: [],
				treeData: [],
				ready: false, // 这里用于自主控制LyTree 的 loading加载状态，避免异步正在加载数据的空档显示“暂无数据”
				props: function() {
					return {
						label: 'name', // 指把数据中的‘personName’当做label也就是节点名称
						icon(data, node) {
							if (node.data.parent_id == "") {
								return ""
							}
						}
					}
				},
			};
		},
		props: {
			value: [Number, String, Array],
			isEdit: {
				type: Boolean,
				default: false
			},
			// 节点多
			showCheckbox: {
				type: Boolean,
				default: true
			},
			// 节点单选
			showRadio: {
				type: Boolean,
				default: false
			},
			field: {
				type: String,
				default: "_id"
			},
			shopid: {
				type: String,
				default: ""
			}
		},
		watch: {
			value(newVal) {
				this.initValue(newVal)
				if (this.formItem) {
					this.formItem.setValue(newVal)
				}
				console.log("watch value", newVal)
				/* if (!this.ready) {
					this.loadCategories()
				} */
			}
		},
		created() {
			this.initValue(this.value)
			this.form = this.getForm('uniForms')
			this.formItem = this.getForm('uniFormsItem')
			if (this.formItem) {
				if (this.formItem.name) {
					this.rename = this.formItem.name
					this.form.inputChildrens.push(this)
				}
			}
			if (!this.isEdit) {
				this.loadCategories()
			}
		},
		methods: {
			initValue(val) {
				if (!val) {
					this.categories = [];
					return;
				}
				this.categories = val;
			},
			/**
			 * 获取父元素实例
			 */
			getForm(name = 'uniForms') {
				let parent = this.$parent;
				let parentName = parent.$options.name;
				while (parentName !== name) {
					parent = parent.$parent;
					if (!parent) return false;
					parentName = parent.$options.name;
				}
				return parent;
			},
			loadCategories() {
				this.$requestApp("mall/category/categories").then(res => {
					this.treeData = res;
					this.preCheckItems(this.treeData);
				}).catch((err) => {
					uni.showModal({
						content: err.message || '请求服务失败',
						showCancel: false
					})
				}).finally(() => {
					this.ready = true // 关闭tree控件的等待loading
				})
			},
			preCheckItems(items) {
				let checked = false;
				if (items && items.length > 0) {
					checked = true;
					items.forEach(e => {
						if (this.showCheckbox) {
							if (e.children && e.children.length > 0) {
								e.checked = this.preCheckItems(e.children);
							} else {
								e.checked = this.categories && this.categories.indexOf(e[this.field]) != -1;
							}
							//只要有一个没选择，则上级不选择
							if (!e.checked) {
								checked = false;
							}
						} else if (this.showRadio) {
							if (e.children && e.children.length > 0) {
								this.preCheckItems(e.children);
							}
							e.checked = this.categories && this.categories.indexOf(e[this.field]) != -1;
						}
					})
				}
				return checked;
			},
			checkItems(e) {
				//全选中和半选中
				this.categories = e.halfCheckedNodes.concat(e.checkedNodes).map(per => per[this.field]).sort();
				console.log("checkItems", this.categories)
				let newVal = e.halfCheckedNodes.concat(e.checkedNodes).map(per => {
					return per._id
				});
				if (this.showRadio) {
					newVal = newVal && newVal.length > 0 ? newVal[0] : "";
				}
				this.$emit('input', newVal);
				console.log("checkItems", newVal)
			}
		}
	}
</script>
