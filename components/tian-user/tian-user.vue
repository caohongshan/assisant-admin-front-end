<template>
	<view>
		<view v-for="(item,index) in value" :key="index">
			<view class="">
				<image :src="item.avatar?item.avatar:'/static/logo.png'" mode="aspectFill" class="image-width-80">
				</image>
			</view>
			<view class="">
				<text>{{item.mobile}}</text>
			</view>
			<view class="">
				<text>{{item.nickname}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "tian-user",
		data() {
			return {

			};
		},
		props: {
			value: {
				type: Array,
				default: () => {
					return []
				}
			}
		}
	}
</script>

<style lang="scss">

</style>
