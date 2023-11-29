<template>
	<view class="page">
		<view class="mian_are mian_are_bg">
			<view style="width:100px; height: 100px; margin: auto; padding: 25px  0; padding-bottom: 0;">
				<image src="/static/image/logo_b.png" style="width:100%; " mode='widthFix'></image>
			</view>
			<view style="width:100px; margin: auto;padding-bottom: 25px;">
				<image src="/static/image/name_new.png" style="width:100%; " mode='widthFix'></image>
			</view>
			<view>
				<view class="msm_mt">
					<view class="msm_mt_l">
						<image src="../../static/image/lm_n_06.png" style="width:100%; " mode='widthFix'>
					</view>
					<input class="uni-input inmut_l" focus v-model="username" :placeholder="$t('login.account')" />
				</view>
				<view class="msm_mt">
					<view class="msm_mt_l">
						<!-- <van-icon name="lock" /> -->
						<image src="../../static/image/lm_n_07.png" style="width:100%; " mode='widthFix'>
					</view>
					<input class="uni-input inmut_l" focus v-model="password" type="password" @click-icon="onClickIcon"
						icon="eye-o" :placeholder="$t('login.psw')" v-show="!open" />
					<input class="uni-input inmut_l" focus v-model="password" @click-icon="onClickIcon" icon="eye-o"
						:placeholder="$t('login.psw')" v-show="open" />
					<view class="msm_mt_eye">
						<van-icon name="closed-eye" @click="open_eye()" v-show="!open" />
						<van-icon name="eye-o" @click="open_eye()" v-show="open" />
					</view>
				</view>

			</view>
		</view>
		<view class="mian_are" style="padding: 20px 20px;">
			<!-- <van-button  color="#EAC477" block round  :disabled="ifopen">立即登錄</van-button> -->
			<!-- <view style=" height: 44px; color:#fff ; background: #EAC477; text-align: center; line-height: 44px; border-radius: 28px; font-size: 14px;" @click="login">立即登錄</view>
			 -->
			 <button type="default" style=" height: 44px; color:#fff ; background: #EAC477; text-align: center; line-height: 44px; border-radius: 28px; font-size: 14px;" @click="login">{{$t('login.btn_b1')}}</button>
			<view style="margin-top: 10px;">
				<!-- <van-button block plain type="warning" round @click="to_create">免費註冊</van-button> -->
				<view style=" height: 44px; color:#EAC477 ;  border: 1px solid #EAC477; text-align: center; line-height: 44px; border-radius: 28px; font-size: 14px;" @click="to_create">{{$t('login.btn_b2')}}</view>
			
			</view>
			<view class="text_3" >{{$t('login.forget1')}}? <view style="color: #EAC477; padding-left: 10px;" @click="update_psw">{{$t('login.connect_kf')}}</view></view>
			<!-- <view class="text_3">登录即表示已阅读并同意<text class="text_2" @click="To_xieyi">《用户协议》</text><text class="text_2"
					@click="To_yinshi">《隐私权政策》</text></view> -->
		</view>
		<van-toast id="van-toast"></van-toast>
	</view>
</template>

<script>
	import Toast from '@/wxcomponents/vant/dist/toast/toast';
	export default {
		data() {
			return {
				ifopen: true,
				ifsend: true,
				sms: '',
				username: '',
				msg_msg: '发送验证码',
				countDownT: 60,
				userInfo: {},
				password: '',
				open: false,
				language_type:"zhCN"

			}
		},
		watch: {
			password(val) {
				if (this.username !== '' && val !== '') {
					this.ifopen = false
				} else {
					this.ifopen = true
				}
			},

		},
		methods: {
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
			update_psw() {
				uni.navigateTo({
					url: '/pages/kefu/kefu_index',
				});
			},

			async login() {
				Toast.loading({
					duration: 0,
					message: this.$t('login.status1'),
					forbidClick: true,
				});
				var _this = this
				const res = await this.$myRuquest({
					url: '/api/front/user/login',
					method: 'Post',

					data: {
						username: this.username,
						password: this.password
					}
				})

				if (res.code == 200) {
					Toast.clear();
					Toast.success(this.$t('login.status2'));
					uni.setStorageSync('token', res.data.token)

					uni.setStorageSync("userinfo", JSON.stringify(res.data.userInfo))
					setTimeout(function() {
						uni.navigateTo({
							url: '/pages/index/index',
						})
					}, 1500)

				} else {
					Toast.clear();
					// Toast.loading({
					// 	duration: 0,
					// 	message: res.msg,
					// 	forbidClick: true,
					// });
					// setTimeout(function() {
					// 	Toast.clear();
					// }, 1500)
					switch(this.language_type){
						case 'zh':
						Toast.loading({
							duration: 0,
							message: res.msg.zhCN,
							forbidClick: true,
						});
						setTimeout(function() {
							Toast.clear();
						}, 1500)
						break;
						case 'zhCN':
						Toast.loading({
							duration: 0,
							message: res.msg.zh,
							forbidClick: true,
						});
						setTimeout(function() {
							Toast.clear();
						}, 1500)
						break;
						case 'en':
						Toast.loading({
							duration: 0,
							message: res.msg.en,
							forbidClick: true,
						});
						setTimeout(function() {
							Toast.clear();
						}, 1500)
						break;
						case 'xby':
						Toast.loading({
							duration: 0,
							message: res.msg.xby,
							forbidClick: true,
						});
						setTimeout(function() {
							Toast.clear();
						}, 1500)
						break;
						case 'han':
						Toast.loading({
							duration: 0,
							message: res.msg.han,
							forbidClick: true,
						});
						break;
						case 'eyu':
						Toast.loading({
							duration: 0,
							message: res.msg.eyu,
							forbidClick: true,
						});
						setTimeout(function() {
							Toast.clear();
						}, 1500)
						break;
						case 'japan':
						Toast.loading({
							duration: 0,
							message: res.msg.japan,
							forbidClick: true,
						});
						setTimeout(function() {
							Toast.clear();
						}, 1500)
						break;
						case 'franch':
						Toast.loading({
							duration: 0,
							message: res.msg.french,
							forbidClick: true,
						});
						setTimeout(function() {
							Toast.clear();
						}, 1500)
						break;
						case 'de':
						Toast.loading({
							duration: 0,
							message: res.msg.de,
							forbidClick: true,
						});
						setTimeout(function() {
							Toast.clear();
						}, 1500)
						break;
					}
					//uni.removeStorageSync("ifLogin")
				}

			},

			to_create() {

				uni.navigateTo({
					url: '/pages/login/reg/reg',
				});
			},
			onClickIcon() {

			},
			open_eye() {
				this.open = !this.open
			},

		},
		onBackPress(event) {

			uni.navigateTo({
				url: '/pages/index/index',
			});
			return true
		},
		onLoad() {
			//

		},
		onShow() {
			//this.userInfo = JSON.parse(uni.getStorageSync("userinfo"))
			uni.removeStorageSync('token')
			uni.setNavigationBarTitle({
				title: this.$t('login.title')
			})
			this.language_type = uni.getStorageSync('language')
		}
	}
</script>

<style scoped>
	.inmut_l {
		/* border: 1px solid #ccc; */
		border-radius: 28px;
		padding-left: 35px;
		height: 42px;
		line-height: 42px; color: #EAC477; background: #191919;
	}

	.page {
		min-height: calc(100vh - 45px);
		;
		background-color: #000;
		background-image: url(../../static/image/lg_bg_new.png);
		background-position: top;
		background-repeat: no-repeat;
		background-size: 100%;
	}

	.mian_are {
		width: auto;
		padding: 0 4rpx;

	}

	.mian_are_bg {

		border-radius: 16rpx;
		margin: 32rpx;
		margin-top: 0;

	}

	.text_3 {
		font-size: 12px;
		color: #EAC477; display: flex;

		padding: 25px 0;
	}

	.text_2 {
		font-size: 12px;
		color: #3E3EF7;

	}

	.title {
		font-family: 22px;
		font-weight: bold;

		color: #000;
		padding: 15px 0
	}

	.msm_line {
		display: flex;
		justify-content: space-between;
		position: relative;
	}

	.msm_line:before {
		content: '';
		height: 1px;
		width: 100%;
		position: absolute;
		top: 0px;
		left: 0px;
		background: #E6E9F5;
	}

	.msm_mt {
		padding: 10px 0;
		position: relative;
	}

	.msm_mt_eye {
		height: 20px;
		width: 20px;
		position: absolute;
		right: 14px;
		top: 23px
	}

	.msm_mt_l {
		height: 20px;
		width: 20px;
		position: absolute;
		left: 14px;
		top: 20px
	}
</style>
