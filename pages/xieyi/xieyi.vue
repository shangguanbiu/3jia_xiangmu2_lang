<template>
	<view>
		<view class="title">{{detail.name?detail.name:'用户协议'}}</view>
		<view class="mt_mb" v-html="detail.value?detail.value:'内容'">
			
		</view>
		
		<van-toast id="van-toast"></van-toast>
	</view>
</template>

<script>
	import Toast from '@/wxcomponents/vant/dist/toast/toast';
	export default {
		data() {
			return {
				detail: ""
			}
		},
		methods: {
			async get_data() {

				Toast.loading({
					duration: 0,
					message: '加载中...',
					forbidClick: true,
				});
				const res = await this.$myRuquest({
					url: '/api/app/yTLittleProgram/pictureList?iType=1',
					method: 'get',
					
				})

				if (res.code == 200) {
					Toast.clear();
					this.detail=res.data[0]
					
				}

				
			},
		},
		onLoad() {
			this.get_data()
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
	page {
		background-color: #F7F8FC;
		padding: 16px;
		font-size: 14px;
		color: #2E2E30;
		line-height: 25px;
		text-indent: 26px;

	}

	.title {
		font-family: 22px;
		font-weight: bold;
		text-align: center;
		color: #000;
		margin-bottom: 15px;
		margin-top: 15px;
	}

	.mt_mb {
		padding: 16px;
		padding-top: 0px;
		padding-bottom: 5px;
		font-size: 14px;
		color: #2E2E30;
		line-height: 25px;
		text-indent: 26px;
	}
</style>
