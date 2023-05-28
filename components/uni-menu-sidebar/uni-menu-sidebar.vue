<template>
	<view class="pointer">
		<template v-for="(item,index) in data">
			<template v-if="!item.children || !item.children.length">
				<navigator :url="item.url">
					<uni-menu-item :index="item">
						<view :class="item.icon" />
						<text :class="{title: item.icon}">{{item.name}}</text>
					</uni-menu-item>
				</navigator>
			</template>
			<uni-sub-menu v-else :index="item">
				<template v-slot:title>
					<view :class="item.icon" />
					<text :class="{title: item.icon}">{{item.name}}</text>
				</template>
				<uni-menu-sidebar class="item-bg" :data="item.children" :key="item._id" />
			</uni-sub-menu>
		</template>
	</view>
</template>

<script>
	export default {
		name: 'uniMenuSidebar',
		props: {
			data: {
				type: Array,
				default () {
					return []
				}
			}
		},
	}
</script>

<style lang="scss">
	.title {
		margin-left: 5px;
	}
</style>
