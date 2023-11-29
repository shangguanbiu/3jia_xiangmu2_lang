<template>
	<view>
		<view class="usercenter_top">
			<view style="height: 90px; width: 90px; margin:auto; padding-top: 25px;">
				<image :src="user_headico" style="width:90px; height: 90px; border-radius: 50%;" mode='widthFix'>
				</image>
			</view>
			<view style="margin:auto; text-align: center;">
				<view class="username" @click="set_username">{{userinfo.user_login}}</view>
				<view class="username_msg">
					<!-- {{isLogin?iflg_msg2:iflg_msg}} -->
					{{userinfo.user_nickname !==''?userinfo.user_nickname:$t("usercenter.set_nickname")}}
				</view>
			</view>
			<view class="index_lm_money">
				<view class="new_m_tit" style="display: flex;justify-content: space-between; padding-right: 10px; padding-top: 10px;">
					<view>{{$t("usercenter.balance")}}</view>
					<view style="display: flex;" @click="go_page(3)">
						<image :src="user_headicotx"
							style="width:20px; height: 20px; padding-top: 8px; margin-right: 5px;" mode='widthFix'>
						</image>{{$t("usercenter.Withdrawal")}}>>
					</view>
				</view>
				<view class="new_m_tit_number">{{userinfo.balance}}</view>
				<view class="new_m_tit">{{$t("usercenter.volume")}}</view>
				<view class="new_m_tit_number">
					{{Number(userinfo.total_ma)>=Number(userinfo.hand_val)?$t("usercenter.volumeOK"):Number(userinfo.hand_val)-Number(userinfo.total_ma)}}
				</view>
				<view class="index_lm_zi_chongz" @click="go_page(2)">
					{{$t("usercenter.Recharge")}}

					<image :src="user_headicocz" style="width:40px; height: 40px;margin:0 10px; margin-right: 20px;"
						mode='widthFix'>
					</image>
				</view>
			</view>
			<!-- <view class="mian_are mian_are_bg">
				
				<view class="my_gongzitit ft_line" @click="go_page(2)">
					<view style="height: 20px; width: 20px;">
						<image src="../../static/image/lm_n_02.png" style="width:100%; " mode='widthFix'>
					</view>
					<view style="flex: 1; margin-left: 5px;font-size: 14px;">充值</view>

					<view style="color:#898989 ;">
						<van-icon name="arrow" color="#898989" />
					</view>
				</view>

				<view class="my_gongzitit ft_line2" @click="go_page(3)">

					<view style="height: 20px; width: 20px;">
						<image src="../../static/image/lm_n_03.png" style="width:100%; " mode='widthFix'>
					</view>
					<view style="flex: 1; margin-left: 5px;font-size: 14px;">提現</view>
					<view style="color:#898989 ;">
						<van-icon name="arrow" color="#ccc" />
					</view>
				</view>
			</view> -->
			<view class="mian_are mian_are_bg">

				<view class="my_gongzitit ft_line" @click="go_page(5)">

					<view style="height: 20px; width: 20px;">
						<image src="../../static/image/lm_n_04.png" style="width:100%; " mode='widthFix'>
					</view>
					<view style="flex: 1; margin-left: 5px; font-size: 14px;">{{$t("Update_psw")}}</view>
					<view style="color:#898989 ;">
						<van-icon name="arrow" color="#ccc" />
					</view>
				</view>

				<view class="my_gongzitit ft_line2" @click="go_page(6)">

					<view style="height: 20px; width: 20px;">
						<image src="../../static/image/lm_n_05.png" style="width:100%; " mode='widthFix'>
					</view>
					<view style="flex: 1;; margin-left: 5px;font-size: 14px;">{{$t("log_Out")}}</view>
					<view style="color:#898989 ;">
						<van-icon name="arrow" color="#ccc" />
					</view>
				</view>
			</view>
			<view style="height: 200px;"></view>

		</view>
		<van-dialog use-slot :title="$t('ifout')" :show="show_msg" :showCancelButton="true" :cancelButtonText="$t('Close')"
			:confirmButtonText="$t('log_Out')" :zIndex='91' @confirm="onOk" @cancel="onClose" confirm-button-color="#409eff">
			<view class="msg_are">
				
				{{$t('if_logout')}}
			</view>
		</van-dialog>
		<van-dialog use-slot :title="$t('usercenter.nick_title')" :show="show_namedailod" :showCancelButton="true" :cancelButtonText="$t('Close')"
			:confirmButtonText="$t('usercenter.ok')" :zIndex='91' @confirm="set_username_ok" @cancel="set_username"
			confirm-button-color="#409eff">
			<view class="input_are">
				<input class="uni-input " style="height: 45px; line-height: 45px;" v-model="nikeName"
					:placeholder="$t('usercenter.set_nickname')" />
			</view>
		</van-dialog>

		<view class="nav_bar">
			<view class="nav_zi"  @click="jump(1)">
				<view>
					<image :src="index_ico" style="width:24px; height: 24px;" mode='widthFix'>
					</image>
				</view>
				<view>{{$t("Home")}}</view>
			</view>
			<view class="nav_zi" @click="jump(2)">
				<view>
					<image :src="cz_ico" style="width:24px; height: 24px;" mode='widthFix'>
					</image>
				</view>
				<view>{{$t("Recharge")}}</view>
			</view>
			<view class="nav_zi" @click="jump(3)">
				<view>
					<image :src="kf_ico" style="width:24px; height: 24px;" mode='widthFix'>
					</image>
				</view>
				<view>{{$t("Service")}}</view>
			</view>
			<view class="nav_zi">
				<view>
					<image :src="user_ico_h" style="width:24px; height: 24px;" mode='widthFix'>
					</image>
				</view>
				<view class="nav_hover">{{$t("My")}}</view>
			</view>
			
		</view>
		<van-toast id="van-toast"></van-toast>
	</view>
</template>

<script>
	import Toast from '@/wxcomponents/vant/dist/toast/toast';
	export default {
		data() {
			return {
				show_msg: false,
				nikeName: '',
				show_namedailod: false,
				// userinfo: {
				// 	avatarUrl: require("@/static/image/usercenter_04.png"),
				// 	nikeName: '请点击登录',
				// },
				isLogin: false,
				iflg_msg: 'Hi，歡迎來到~~',
				iflg_msg2: '查看或編輯個人資料>>',
				user_pay: {
					iConfirmNumber: 0,
					iNoConfirmNumber: 0
				},
				isdot: false,
				user_headico: require("@/static/image/usercenter_04.png"),
				user_headicotx: require("@/static/image/tx_ico1.png"),
				user_headicocz: require("@/static/image/to_cz.png"),
				index_ico: require("@/static/image/shouye.png"),
				index_ico_h: require("@/static/image/shouye_hover.png"),
				cz_ico: require("@/static/image/chongzhi.png"),
				cz_ico_h: require("@/static/image/chongzhi_hover.png"),
				kf_ico: require("@/static/image/kefu.png"),
				kf_ico_h: require("@/static/image/kefu_hover.png"),
				user_ico: require("@/static/image/wode.png"),
				user_ico_h: require("@/static/image/wode_hover.png"),
				userinfo: {},
				language_type:'zhCN'
			}
		},
		methods: {

			jump(type) {
				if (type == 1) {
					uni.navigateTo({
						url: '/pages/index/index',
					});
				} else if (type == 2) {
					uni.navigateTo({
						url: '/pages/recharge/recharge',
					});
				} else if (type == 3) {
					uni.navigateTo({
						url: '/pages/kefu/kefu_index',
					});
				} else if (type == 4) {
					uni.navigateTo({
						url: '/pages/usercenter/usercenter',
					});
				}
			},

			formatNum: function(value) {
				if (!value && value !== 0) return 0;
				let str = value.toString();
				let reg =
					str.indexOf(".") > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g;
				return str.replace(reg, "$1,");
			},
			set_username() {
				this.nikeName = this.userinfo.user_nickname
				this.show_namedailod = !this.show_namedailod

			},
			set_username_ok() {
				if (this.nikeName !== '') {
					this.set_userInfo_name()
				} else {
					Toast.fail(this.$t('usercenter.place'));//'請設置暱稱'

				}
			},
			async set_userInfo_name() {
				Toast.loading({
					duration: 0,
					message: this.$t('reg.subimt'),//'加載中...',
					forbidClick: true,
				});
				const res = await this.$myRuquest({
					url: '/api/front/user/changeNickname',
					method: 'post',
					data: {
						nickname: this.nikeName
					},

				})

				if (res.code == 200) {
					Toast.clear();
					this.show_namedailod = false
					Toast.success(this.$t('get_cash.set_flow3'));//'設置成功'
					this.get_userInfo()
				} else {
					Toast.clear();
					// Toast.fail(res.msg);
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
				}

			},
			async get_userInfo() {
				const res = await this.$myRuquest({
					url: '/api/front/user/getUserInfo',
					method: "POST",
				})
				if (res.code == 200) {
					this.userinfo = res.data

				}

			},
			async login_out() {
				const res = await this.$myRuquest({
					url: '/api/front/user/logout',
					method: "POST",
				})
				if (res.code == 200) {
					uni.removeStorageSync('token')
					uni.navigateTo({
						url: '/pages/index/index',
					});

				}

			},
			go_page(type) {
				if (type == 1) {
					uni.navigateTo({
						url: '/pages/usercenter/qianbao/qianbao',
					});
				} else if (type == 2) {
					uni.navigateTo({
						url: '/pages/recharge/recharge',
					});
				} else if (type == 3) {
					uni.navigateTo({
						url: '/pages/getcash/getcash',
					});
				} else if (type == 4) {
					uni.navigateTo({
						url: '/pages/usercenter/bet_record/bet_record',
					});
				} else if (type == 5) {
					uni.navigateTo({
						url: '/pages/usercenter/updatepsw/updatepsw',
					});
				} else if (type == 6) {
					this.show_msg = true
				}
			},
			onClose() {
				this.show_msg = !this.show_msg
			},
			onOk() {
				//退出操作
				this.login_out()

			}
		},
		onLoad() {
			//this.getStorage()
			uni.setBackgroundColor({
				backgroundColor: '#F7F8FC',
			});
		},
		onShow() {
			var had_token = uni.getStorageSync('token')
			this.language_type = uni.getStorageSync('language')
			if (had_token == '') {
				uni.navigateTo({
					url: '/pages/login/login',
				});
			} else {
				this.get_userInfo()
				//this.userinfo = JSON.parse(uni.getStorageSync("userinfo"))
			}


		}
	}
</script>

<style scoped>
	page {
		background-color: #F7F8FC;
	}



	/deep/ .van-fade-enter-active,
	.van-fade-leave-active {
		z-index: 91;
	}

	/deep/ .van-dialog {
		z-index: 92;
	}


	.index_lm_zi_chongz {
		width: calc(100vw - 50px);
		background: #000;
		border-radius: 16px; line-height: 40px;
		 margin: auto;
		height: 40px;
		display: flex;
		justify-content: flex-end; color: #E9C174; font-size: 14px;
	}

	.ft_line {
		position: relative;
		padding: 20px 0;
	}

	.ft_line2 {
		padding: 20px 0;
	}

	.ft_line::after {
		content: '';
		height: 1px;
		background: #6B6B6B;
		width: 98%;
		position: absolute;
		left: 1%;
		bottom: 0;
	}

	.input_are {
		padding: 20px;
	}

	.msg_are {
		padding: 20px 15px;
		font-size: 14px;
		line-height: 25px;
		text-align: center;
	}

	.cammer {
		height: 20px;
		width: 20px;
		position: absolute;
		bottom: 10px;
		right: 20px;

	}

	.usercenter_top {

		background-size: 100%;
		min-height: 130px;
		width: 100%;

	}

	.mian_are {
		width: auto;
		padding: 10px 32rpx;
	}

	page {
		background: #141414;
	}

	.mian_are_bg {
		background: #3B393B;
		border-radius: 16rpx;
		margin: 0 30rpx;
		margin-bottom: 30rpx;
		color: #FFFFFF;
	}

	.mian_top_dl {
		display: flex;
		padding: 43px 0;
		padding-top: 44px;
	}

	.mian_top_dldt {
		height: 90px;
		width: 90px;
		border-radius: 50%;
	}

	.mian_top_dldd {
		width: 60%;
		padding-left: 15px;
		padding-top: 20px;
	}

	.username {
		color: #fff;
		font-size: 20px;
	}

	.username_msg {
		color: #ffffffcc;
		font-size: 14px;
		line-height: 25px;
	}

	.my_gongzitit {
		display: flex;
		width: 100%;

		/* padding: 30rpx 0; */
	}

	.index_lanmu {
		height: auto;
		overflow: hidden;
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		padding-bottom: 7px;
	}

	.index_lm_zi {
		width: 50%;
	}


	.index_lm_zim {
		border-radius: 16rpx;
		height: 144rpx;
	}

	.index_lm_money {

		background: url("../../static/image/new_money_bg.png") no-repeat center;
		background-size: 100% 100% ;
		
		 padding-top: 10px;
		  padding-bottom: 10px;
		   display: block;
		margin: 30rpx;

	}

	.new_m_tit {
		line-height: 35px;
		color: #5D4F2F;
		padding-left: 10px;
		
	}

	.new_m_tit_number {
		line-height: 30px;
		color: #000;
		padding-left: 10px;
		font-size: 20px;
	}

	.index_lm_zim1 {

		background: url("../../static/image/usercenter_02.png") no-repeat right bottom #F7F8FC;
		background-size: 43%;
		margin: 0px 20rpx 20rpx 0;
		border: 1px solid #E4E4FF;
	}

	.index_lm_zim2 {

		background: url("../../static/image/usercenter_03.png") no-repeat right bottom #F7F8FC;
		background-size: 43%;
		margin: 0px 0px 0px 20rpx;
		border: 1px solid #E4E4FF;
	}

	.index_lm_tit1 {
		font-size: 28rpx;
		position: relative;
		color: #74778A;
		display: block;
		position: relative;

		padding-left: 30rpx;
		padding-top: 13px
	}

	.dot_dian {
		position: absolute;
		top: 10px;
		display: block;
		left: 52px;
		background: #FF544E;
		border-radius: 50%;
		height: 8px;
		width: 8px;
	}

	.number_sz {
		font-size: 32rpx;
		font-weight: bold;
	}
</style>
