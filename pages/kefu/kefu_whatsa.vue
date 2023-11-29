<template>
	<view>
		<web-view  :src="url"></web-view>
		<!-- <view  class="main">
		<iframe id="iframe_id" :src="url" frameborder="0" class="main" style="width:100%;" scrolling="no"  onload="this.height=this.contentWindow.document.documentElement.scrollHeight"></iframe>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url:''
			}
		},
		methods: {
			async get_kefu_url() {
				const res = await this.$myRuquest({
					url: '/api/front/index/getKefuUrl',
					method: "POST",
					data: {
						page: 1
					},
				})
				if (res.code == 200) {
					this.url = res.data.other_val
			
				}
			},
		},
		onLoad() {
			
		},
		onShow() {
			this.get_kefu_url()
		}
	}
</script>

<style scoped>
	.main{ width: 100%; height:calc(100vh - 45px);}
	page{
		 background: #000;
	}
</style>
