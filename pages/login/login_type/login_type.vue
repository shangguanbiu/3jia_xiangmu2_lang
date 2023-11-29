<template>
	<view>
		<view class="mian_are mian_are_bg">
			<image src="/static/image/login_bg.png" style="width:100%;" mode='widthFix'>
			</image>
			<van-button color="#3E3EF7" block round open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">微信用户一键登录
			</van-button>
			<view class="text_1" @click="By_phone">手机号码登录/注册</view>
		</view>
		<view class="text_3">登录即表示已阅读并同意<text class="text_2" @click="To_xieyi">《用户协议》</text><text class="text_2"
				@click="To_yinshi">《隐私权政策》</text></view>
		<van-toast id="van-toast"></van-toast>
		<van-popup :show="dial_pohone">

			<view class="pop_are">
				<view class="tit">微信授权</view>
				<view class="input_are" style="background: none; text-align: center;">
					易砼之友 申请获得以下权限
					<view
						style="width:80%;margin: auto; color: #74778A; border-top: 1px solid #ccc;padding:10px 0; margin-top: 10px; text-align: left;">
						申请获取你微信绑定的手机号：10000000000</view>
				</view>
				<view class="ft_btnline">
					<van-button type="default" size="normal" block style="width: 90%; margin-right: 8px;"
						@click="onClose()">拒绝
					</van-button>
					<van-button type="info" size="normal" block color="#3E3EF7" style="width: 90%;margin-left: 8px;"
						@click="on_set_phone()">允许</van-button>
				</view>
			</view>


		</van-popup>
	</view>

</template>

<script>
	import Toast from '@/wxcomponents/vant/dist/toast/toast';
	export default {
		data() {
			return {
				js_code: '',
				dial_pohone: false,
				userInfo:'',
				phone:'',
			}
		},
		methods: {
			onClose() {
				this.dial_pohone = false
			},
			on_set_phone() {
				this.dial_pohone = false
			},
			To_xieyi() {
				uni.navigateTo({
					url: '/pages/xieyi/xieyi',
				});
			},
			To_yinshi() {
				uni.navigateTo({
					url: '/pages/zhengce/zhengce',
				});
			},
			By_phone() {
				uni.navigateTo({
					url: '/pages/login/login',
				});
			},
			async login() {
				Toast.loading({
					duration: 0,
					message: '登录中...',
					forbidClick: true,
				});
				const res = await this.$myRuquest({
					url: '/api/app/WeChat/GetOpenid',
					method: 'post',
					type: 2,
					data: {
						js_code: this.js_code
					}
				})

				if (res.code == 200) {
					Toast.clear();
					Toast.success('已登录');
					uni.setStorageSync({
						key: 'ifLogin',
						data: res.data.data.token
					})
					setTimeout(function() {
						uni.navigateTo({
							url: '/pages/index/index',
						})
					}, 1000)

				}
			},
			async get_phone() {
				const res = await this.$myRuquest({
					url: '/api/app/WeChat/GetOpenid',
					method: 'post',
					data: {
						js_code: this.js_code
					}
				})

				if (res.code == 200) {
					this.dial_pohone = true
				}
			},

			login_wx() {
				var _this = this

				wx.login({
					success(res) {

						if (res.code) {
							wx.request({
								url: "https://333gps.net:9010/api/app/WeChat/GetOpenId?js_code=" + res
									.code,
								method: "POST",
								success(res) {
									_this.dial_pohone = true
									// Toast.clear();
									// setTimeout(function() {
									// 	wx.showToast({
									// 		title: '登录成功',
									// 		icon: 'success',
									// 		duration: 2000
									// 	})
									// }, 500)
									// uni.setStorageSync('ifLogin', res.data.data.token)
									// _this.get_wx_info()
									// setTimeout(function() {
									// 	uni.switchTab({
									// 		url: '/pages/index/index',
									// 	})
									// }, 2000)
								}
							})
						} else {
							wx.showToast({
								title: '出现错误',
								icon: 'fail',
								duration: 5000
							})
							console.log('出现错误！' + res.errMsg)
						}
					}
				})


			},
			// get_wx_info() {
			// 	var _this = this
			// 	wx.getUserInfo({
			// 		success(res) {

			// 			uni.setStorageSync("userinfo", JSON.stringify(res.userInfo))


			// 			console.log('fffggg', uni.getStorageSync("userinfo"))
			// 		}
			// 	})
			// },
			getPhoneNumber(e) {
				var that = this;
				var data = {
					encryptedData: e.detail.encryptedData,
					iv: e.detail.iv,
			 };
				console.log(data)
				if (e.detail.errMsg == "getPhoneNumber:ok") {
					wx.request({
						url: 'https://333gps.net:9010/api/app/WeChat/DecodePhone?encryptedData=' + e.detail
							.encryptedData + "&iv=" + e.detail.iv,
						header: {
							"authorization": "bearer " + uni.getStorageSync('ifLogin')
						},
						method: "post",
						success: function(res) {
							
							
							if(res.statusCode==200){
								that.phone=res.data.data
							}
							that.login()
						}
					})
				}
			},
			async login(){
				Toast.loading({
					duration: 0,
					message: '登录中...',
					forbidClick: true,
				});
				var _this=this
				const res = await this.$myRuquest({
					url: '/api/app/yTLittleProgram/phoneLogin',
					method: 'Post',
					header: {
						Authorization:"Bearer "+uni.getStorageSync('ifLogin'),
						"content-type": 'application/json'
					},
					data: {
						phone: _this.phone,
						verificationCode: 'dos!128cg@qznd',
					}
				})
				
				if (res.code == 200) {
					Toast.clear();
					Toast.success('已登录');
					//uni.setStorageSync('ifLogin',res.data)
					_this.get_userInfo()
					
					
					setTimeout(function() {
						uni.navigateTo({
							url: '/pages/index/index',
						})
					}, 1500)
				
				}else{
					Toast.clear();
				}
			},
			async get_userInfo() {
				const res = await this.$myRuquest({
					url: '/api/app/yTLittleProgram/driverDetail',
					header: {
						Authorization: "Bearer " + uni.getStorageSync('ifLogin'),
						"content-type": 'application/json'
					}
				})
				if (res.code == 200) {
					uni.setStorageSync('userinfo',JSON.stringify(res.data))

				} else {
					
				}
			
			
			},
			
		},
		onShow() {
			
		}
	}
</script>

<style scoped>
	.mian_are {
		width: auto;
		padding: 0 32rpx;

	}

	.mian_are_bg {
		background: #fff;
		border-radius: 16rpx;
		margin: 32rpx;

	}

	.text_1 {
		font-size: 14px;
		color: #74778A;
		text-align: center;
		padding: 30px 0;
	}

	.text_3 {
		font-size: 12px;
		color: #2E2E30;
		text-align: center;
		position: fixed;
		bottom: 100px;
		left: 0;
		width: 100%;
	}

	.text_2 {
		font-size: 12px;
		color: #3E3EF7;
	}
</style>
