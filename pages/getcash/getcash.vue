<template>
	<view class="contentare">
		<view class="mainare">
			<view class="takeare">
				<!-- <view class="taketype">
					<van-cell is-link @click="JumpPage()" style="margin-top: 10px;">
						
						<template #title>
							<view style="align-items: center; display: flex;">
								<view>提現</view>
								<view style="padding-left: 20px; width: 50%; display: flex;align-items: center;">
									<view v-if="list.length!==0&&default_data ==''">請選擇提現賬户</view>
									<view class="bank_imsg" style="font-size: 20px; margin-right:5px">
										<van-icon :name="alipayico" v-if="default_data.account_type==1"></van-icon>
										<van-icon :name="weichartico" v-if="default_data.account_type==2"></van-icon>
										<van-icon :name="bankico" v-if="default_data.account_type==3"></van-icon>
										<van-icon :name="usdtico" v-if="default_data.account_type==4"></van-icon>

									</view>
									<view v-if="list.length==0">請立即綁定賬户</view>
									<view v-if="list.length!==0&&default_data !==''">{{default_data.account_number}}
									</view>
								</view>
							</view>
						</template>
						<template #right-icon>
							<view class="bank_imsg" style="color: #333;">
								<view class="bank_imsg">
									<van-icon name="arrow" />
								</view>
							</view>
						</template>
					</van-cell>
				</view> -->
				<view class="take_com">
					<van-cell value="">
						<!-- 使用 title 插槽来自定义标题 -->
						<template #title>
							<view style="align-items: center; display: flex;">
								{{$t('get_cash.number')}}
							</view>
						</template>
					</van-cell>
					<van-cell value="">
						<!-- 使用 title 插槽来自定义标题 -->
						<template #title>
							<view style="align-items: center; font-size: 20px; display: flex;">
								<view>￥</view>
								<view><input type="number" v-model="money" class="input_com" /></view>
							</view>
						</template>
					</van-cell>
					<van-cell>
						<!-- 使用 title 插槽来自定义标题 -->
						<template #title>
							<view style="align-items: center;">
								<view>{{$t('get_cash.can_get')}}: {{ formatNum(userinfo.balance) }}{{$t('get_cash.danwei')}},</view>
							</view>
						</template>
						<template #right-icon>
							<b class="getall" @click="GetAll">{{$t('get_cash.get_all')}}</b>
						</template>
					</van-cell>
					<van-cell>
						<!-- 使用 title 插槽来自定义标题 -->
						<template #title>
							<view style="align-items: center;">
								<view>{{$t('get_cash.need_bet')}} </view>
							</view>
						</template>
						<template #right-icon>
							<b class="getall" v-if="userinfo.total_ma !==undefined ">{{Number(userinfo.total_ma)>=Number(userinfo.hand_val)?$t('get_cash.bet_ok'):Number(userinfo.hand_val)-Number(userinfo.total_ma)}}</b>
						</template>
					</van-cell>

				</view>

			</view>

			<view style="margin: 16px;">
				<!-- <van-button block type="danger" @click="onSubmit">提現</van-button> -->
				<!-- <view
					style=" height: 44px; color:#fff ; background: #EAC477; text-align: center; line-height: 44px;  font-size: 14px;"
					@click="onSubmit">提現</view> -->
					<button type="default" style=" height: 44px; color:#fff ; background: #EAC477; text-align: center; line-height: 44px; border-radius: 28px; font-size: 14px;" @click="onSubmit">{{$t('get_cash.btn_get')}}</button>
					
			</view>
			<view style="margin: 16px;" v-if="show_flow ==true">
				<view style="font-size: 14px; line-height: 30px;padding: 15px 0; color: #fff;">{{$t('get_cash.get_status')}}</view>
				<van-progress :pivot-text="title_flow" color="#1989fa" :percentage="num" />
				<view style="font-size: 14px; line-height: 30px;padding: 15px 0; color: #fff;">{{$t('get_cash.get_now_No')}}：{{get_money}}</view>
			</view>

			<van-toast id="van-toast"></van-toast>
		</view>
	</view>
</template>

<script>
	import {
		bankico,
		alipayico,
		weichartico,
		usdtico,
	} from "@/util/img.js";
	import Toast from '@/wxcomponents/vant/dist/toast/toast';
	export default {
		name: "salepage",
		components: {},
		props: {},
		watch: {
			money: function(newval) {
				if (newval !== "") {
					this.checkbtn = false;
				}
				if (newval > this.allmoney) {
					this.checkbtn = true;
				} else {
					this.checkbtn = false;
				}
			}
		},
		data() {
			return {
				index: 3,
				num: 10,
				title_flow: '處理中',
				ifbind: false,
				money: "",
				allmoney: 0,
				checkbtn: true,
				bankico,
				alipayico,
				usdtico,
				data_mag: '',
				userinfo: {},
				cz_id: '',
				list: [],
				default_data: '', 
				show_flow: false,
				get_money:0,
				language_type:'zhCN'
			};
		},
		methods: {
			JumpPage() {
				uni.setStorageSync('type', 1)
				uni.navigateTo({
					url: '/pages/usercenter/card/Index',
				});
				//判断是否有绑定


			},
			async getList() {

				const res = await this.$myRuquest({
					url: '/api/front/user/getAccountList',
					method: "POST",

				})
				if (res.code == 200) {
					this.list = res.data
					this.list.forEach((item) => {
						if (item.is_default == 1) {
							this.default_data = item
							this.cz_id = item.id
						}
					})
				}
			},
			async onSubmit() {
				
				if( Number(this.userinfo.hand_val)>Number(this.userinfo.total_ma)){
					Toast.fail(this.$t('get_cash.get_notice1'));
					return;
				}
				
				if (this.money == "") {
					Toast.fail(this.$t('get_cash.get_notice2'));
					return;
				}
				if (this.money < 0 || this.money == 0) {
					Toast.fail(this.$t('get_cash.get_notice3'));
					return;
				}

				if (Number(this.money) > Number(this.userinfo.balance)) {
					Toast.fail(this.$t('get_cash.get_notice4')+":" + this.userinfo.balance);
					return;
				}
				// if (this.imgbase == "") {
				// 	Toast.fail("请上传付款截图凭证");
				// 	return;
				// }
				// if (this.default_data == '') {
				// 	Toast.fail("請綁定提現賬户");
				// 	return
				// }
				// if (this.cz_id == '') {
				// 	Toast.fail("請選擇默認提現賬户");
				// 	return
				// }
				const res = await this.$myRuquest({
					url: '/api/front/user/doWithdrawal',
					method: "POST",
					data: {
						account_id: 0, // this.cz_id,
						amount: parseInt(this.money),

					},
				})
				if (res.code == 200) {
					Toast.success(this.$t('get_cash.get_success'));
					this.getList_check()
					this.get_userInfo()
					this.money == ""
				} else {
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
					if (this.userinfo.flow_val == 1) {
						this.num = 10
						this.title_flow = this.$t('get_cash.set_flow1') //"處理中"
					} else if (this.userinfo.flow_val == 2) {
						this.num = 85
						this.title_flow = this.$t('get_cash.set_flow2') //"轉賬中"
					} else if (this.userinfo.flow_val == 3) {
						this.num = 100
						this.title_flow = this.$t('get_cash.set_flow3') //"已成功"
					}

				}

			},
			async getList_check(callBack) {
				const res = await this.$myRuquest({
					url: '/api/front/user/getWithdrawalList',
					method: "POST",
					data: {
						page: this.page,
						pagesize: this.pagesize,

					},
				})
				if (res.code == 200) {
					if (res.data.data.length !== 0) {
						res.data.data.forEach((item) => {
							if (item.status == 1) {
								this.show_flow = true
								this.get_money=item.amount
							}
							

							//console.log('ffffffff', this.show_flow)
						})
					}
				}

				callBack && callBack()

			},
			GetAll() {
				this.money = this.userinfo.balance;
			},
			formatNum: function(value) {
				if (!value && value !== 0) return 0;
				let str = value.toString();
				let reg =
					str.indexOf(".") > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g;
				return str.replace(reg, "$1,");
			},
		},
		onLoad() {

		},
		onBackPress(event) {
			uni.navigateTo({
				url: '/pages/usercenter/usercenter',
			});
			return true

		},
		onShow() {
			var had_token = uni.getStorageSync('token')
			this.language_type = uni.getStorageSync('language')
			
			
			if (had_token !== '') {
				this.get_userInfo()
				this.getList()
				this.getList_check()
			}
			
			uni.setNavigationBarTitle({
				title: this.$t('get_cash.title')
			})
			
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	page {
		background: #000;
	}

	.takeare {
		height: auto;
		width: 100%;
		margin: auto;
		background: #fff;
	}

	.taketype {
		background: #f8f8f8;
	}

	.van-cell {
		background: #f8f8f8;
	}

	.take_com {
		height: auto;
		overflow: hidden;
		width: 100%;
		padding-bottom: 20px;
	}

	.take_com .van-cell {
		background: #fff;
	}

	.getall {
		color: #5b6a91;
		font-weight: normal;
	}

	.bank_imsg {
		color: #939393;
		align-items: center;

	}
</style>
