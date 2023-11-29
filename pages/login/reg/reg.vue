<template>
	<view class="page">
		<view class="mian_are mian_are_bg">
			<view style="width:100px; height: 100px; margin: auto;  padding: 25px  0; padding-bottom: 0;">
				<image src="../../../static/image/logo_b.png" style="width:100%; " mode='widthFix'></image>
			</view>
			
			<view style="width:100px; margin: auto;padding-bottom: 25px;">
				<image src="/static/image/name_new.png" style="width:100%; " mode='widthFix'></image>
			</view>
			<view>
				<view class="msm_mt">
					<view class="msm_mt_l">
						<!-- <van-icon name="manager" /> -->
						<image src="../../../static/image/lm_n_06.png" style="width:100%; " mode='widthFix'>
					</view>
					<input class="uni-input inmut_l" focus v-model="user_login" :placeholder="$t('reg.account')" />
				</view>
				<view class="msm_mt">
					<view class="msm_mt_l">
						<image src="../../../static/image/lm_n_07.png" style="width:100%; " mode='widthFix'>
					</view>
					<input class="uni-input inmut_l" focus v-model="password" type="password" @click-icon="onClickIcon"
						icon="eye-o" :placeholder="$t('reg.psw')" v-show="!open" />
					<input class="uni-input inmut_l" focus v-model="password" @click-icon="onClickIcon" icon="eye-o"
						:placeholder="$t('reg.psw')" v-show="open" />
					<view class="msm_mt_eye">
						<van-icon name="closed-eye" @click="open_eye()" v-show="!open" />
						<van-icon name="eye-o" @click="open_eye()" v-show="open" />
					</view>
				</view>
				<view class="msm_mt">
					<view class="msm_mt_l">
						<image src="../../../static/image/lm_n_07.png" style="width:100%; " mode='widthFix'>
					</view>
					<input class="uni-input inmut_l" focus v-model="repassword" type="password"
						@click-icon="onClickIcon" icon="eye-o" :placeholder="$t('reg.repsw')" v-show="!open" />
					<input class="uni-input inmut_l" focus v-model="repassword" @click-icon="onClickIcon" icon="eye-o"
						:placeholder="$t('reg.repsw')" v-show="open" />
					<view class="msm_mt_eye">
						<van-icon name="closed-eye" @click="open_eye()" v-show="!open" />
						<van-icon name="eye-o" @click="open_eye()" v-show="open" />
					</view>
				</view>
				<view class="msm_mt">
					<view class="msm_mt_l" style="color: #EAC477;">
						<van-icon name="phone" type="number" />
					</view>
					<input class="uni-input inmut_l" focus v-model="mobile" :placeholder="$t('reg.phone')" />
				</view>
				<view class="msm_mt" v-show="ifneed">
					<view class="msm_mt_l">
						<van-icon name="qr" />
					</view>
					<input class="uni-input inmut_l" focus v-model="register_code" :placeholder="$t('reg.code_invite')" />
				</view>
				<view class="msm_line msm_mt">
					<view class="msm_mt_l"  style="color: #EAC477;">
						<van-icon name="qr" />
					</view>
					<view class="inmut_l" style="display: flex; width: 100%;">
						<input class="uni-input inmut_l2" style="width: 60%; font-size: 13px;" focus v-model="code"
							:placeholder="$t('reg.code')" />
						<view style="flex:1; padding-right: 12px;padding-top: 3px; cursor: pointer;">
							<image :src="base_url+'/api/front/captcha/index?t='+time" @click="run_time" mode='widthFix'
								style="width: 114px;"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="mian_are" style="padding: 20px 20px;">
			<!-- :disabled="ifopen" -->
			<!-- <van-button type="warning" block round @click="regiest">免費註冊</van-button> -->
			<!-- <view style=" height: 44px; color:#fff ; background: #EAC477; text-align: center; line-height: 44px; border-radius: 28px; font-size: 14px;" @click="regiest"></view>
			 -->
			 <button type="default" style=" height: 44px; color:#fff ; background: #EAC477; text-align: center; line-height: 44px; border-radius: 28px; font-size: 14px;" @click="regiest">{{$t('reg.reg_btn1')}}</button>
			<view style="margin-top: 10px;">
				<!-- <van-button block plain type="warning" round @click="to_create">立即登錄</van-button> -->
				<view style=" height: 44px; color:#EAC477 ; border: 1px solid #EAC477; text-align: center; line-height: 44px; border-radius: 28px; font-size: 14px;" @click="to_create">{{$t('reg.reg_btn2')}}</view>
							
			</view>

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
				time: parseInt(new Date().getTime() / 1000),
				ifopen: true,
				ifsend: true,
				base_url: '',
				sms: '',
				phone: '',
				msg_msg: '发送验证码',
				countDownT: 60,
				userInfo: {},
				psw: '',
				open: false,
				ifneed: true,

				user_login: '',
				password: '',
				mobile: '',
				code: '',
				register_code: '',

				repassword: '',
				language_type:"zhCN"



			}
		},
		watch: {
			code(val) {
				if (this.user_login !== '' && this.password !== '' && this.mobile !== '' && this.repassword !== '' && this
					.repassword == this.password && val !== '') {
					this.ifopen = false
				} else {
					this.ifopen = true
				}
			}
		},
		methods: {
			run_time() {
				this.time = parseInt(new Date().getTime() / 1000)
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
			async chack_ifneed_code() {
				const res = await this.$myRuquest({
					url: '/api/front/user/getBaseConfig',
					method: "POST",

				})
				if (res.code == 200) {
					if (res.data.is_invitation_code == "1") {
						this.ifneed = true
					} else {
						this.ifneed = false
					}
				}

			},

			async regiest() {

				// var account = /^(?!\d+$)(?![A-Za-z]+$)[a-zA-Z0-9]{6,8}$/; // 任意6-8个数字和英文大小写字符
				// if (!account.test(this.user_login)) {
				// 	Toast.fail('輸入任意6-8個數字和英文的賬號');
				// 	this.ifopen = true
				// 	return
				// }
				if (this.user_login.length <6) {
					Toast.fail(this.$t('reg.account'));//'輸入至少任意6个長度字符'
					this.ifopen = true
					return
				} else {
					this.ifopen = false
				}
				if (this.password.length <6) {
					Toast.fail(this.$t('reg.psw'));//'輸入至少任意6个長度字符'
					this.ifopen = true
					return
				}

				if (this.password !== this.repassword) {
					Toast.fail(this.$t('reg.reg_msg'));
					this.ifopen = true
					return
				} else {
					this.ifopen = false
				}

				var isPhone = /^[1][3-8]\d{9}$|^([6|9])\d{7}$|^[0][9]\d{8}$|^[6]([8|6])\d{5}$/; //手机号码
				
				// if (!isPhone.test(this.mobile)) {
				// 	Toast.fail('輸入正確手機號碼');
				// 	this.ifopen = true
				// 	return
				// } else {
				// 	this.ifopen = false
				// }
				if (this.mobile.length !==11) {
					Toast.fail(this.$t('reg.phone'));//'輸入正確手機號碼'
					this.ifopen = true
					return
				} else {
					this.ifopen = false
				}

				if (this.ifneed == true && this.register_code == '') {
					Toast.fail(this.$t('reg.code_invite'));//'請輸入註冊邀請碼'
					this.ifopen = true
					return
				} else {
					this.ifopen = false
				}
				Toast.loading({
					duration: 0,
					message: this.$t('reg.subimt'),//'提交中...',
					forbidClick: true,
				});
				var _this = this
				const res = await this.$myRuquest({
					url: '/api/front/user/register',
					method: 'Post',

					data: {
						"user_login": this.user_login,
						"password": this.password,
						"mobile": this.mobile,
						"code": this.code,
						"register_code": this.register_code
					}
				})

				if (res.code == 200) {
					Toast.clear();
					Toast.success(this.$t('reg.success'));//'註冊成功'
					this.user_login = ''
					this.password = ''
					this.mobile = ''
					this.code = ''
					this.register_code = ''
					//uni.setStorageSync('ifLogin',res.data)
					// _this.get_userInfo()
					// setTimeout(function() {
					// 	uni.navigateTo({
					// 		url: '/pages/index/index',
					// 	})
					// }, 1500)
					this.run_time()
					setTimeout(function() {
						uni.navigateTo({
							url: '/pages/login/login',
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
					this.run_time()
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
			async get_userInfo() {
				const res = await this.$myRuquest({
					url: '/api/app/yTLittleProgram/driverDetail',
					header: {
						Authorization: "Bearer " + uni.getStorageSync('ifLogin'),
						"content-type": 'application/json'
					}
				})
				if (res.code == 200) {
					uni.setStorageSync('userinfo', JSON.stringify(res.data))

				} else {

				}


			},
			to_create() {

				uni.navigateTo({
					url: '/pages/login/login',
				});
			},
			onClickIcon() {

			},
			open_eye() {
				this.open = !this.open
			}
		},
		onLoad() {
			//

		},
		onShow() {
			//this.userInfo = JSON.parse(uni.getStorageSync("userinfo"))
			this.chack_ifneed_code()
			this.language_type = uni.getStorageSync('language')
			this.base_url = this.$baseurl()
			uni.setNavigationBarTitle({
				title: this.$t('reg.title')
			})
		}
	}
</script>

<style scoped>
	.inmut_l {
		/* border: 1px solid #ccc; */
		border-radius: 28px;
		padding-left: 35px;
		height: 42px;
		line-height: 42px;
		font-size: 13px;
		 color: #EAC477;background: #191919;
	}

	.inmut_l2 {

 color: #EAC477;
		height: 42px;
		line-height: 42px;
	}

	.page {
		min-height: calc(100vh - 45px);
		;
		background-color: #000;
		background-image: url(../../../static/image/lg_bg_new.png);
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
		color: #2E2E30;

		padding: 15px 0;
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

/* 	.msm_line:before {
		content: '';
		height: 1px;
		width: 100%;
		position: absolute;
		top: 0px;
		left: 0px;
		background: #E6E9F5;
	} */

	.msm_mt {
		padding: 10px 0;
		position: relative;
	}

	.msm_mt_eye {
		height: 20px;
		width: 20px;
		position: absolute;
		right: 14px;
		top: 23px; color: #707070;
		
	}

	.msm_mt_l {
		height: 20px;
		width: 20px;
		position: absolute;
		left: 14px;
		top: 20px
	}
</style>
