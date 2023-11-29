<template>
	<view>
		<view  class="title_m">遊戲玩法</view>
		<view class="title_mare">			
				<u-parse :content="room_msg.remark"  noData="暫無內容"></u-parse>
		</view>
	</view>
</template>

<script>
	import uParse from '@/components/u-parse/u-parse.vue'
	export default {
		data() {
			return {
				content: '',
				room_msg:''
			}
		},
		components:{
			uParse
		},
		methods: {
			async get_room_msg(pid) {
				const res = await this.$myRuquest({
					url: '/api/front/room/getRoomInfo',
					method: "POST",
					data: {
						id: pid
					},
				})
				if (res.code == 200) {
					this.room_msg = res.data
			
				}
			},
		},
		onLoad(option) {
			this.get_room_msg(option.id)
		},
		onShow() {
			var had_token=uni.getStorageSync('token')
			if(had_token ==''){
				uni.navigateTo({
					url: '/pages/login/login',
				});
			}
		}
	}
</script>

<style scoped>
	@import url('../../../components/u-parse/u-parse.css');
	.title_m {
		font-size: 16px;
		text-align: center;
		line-height: 30px;
		 font-weight: bold;
	}

	.title_mare {
		font-size: 14px;
		line-height: 25px;
		padding: 15px;
	}
</style>
