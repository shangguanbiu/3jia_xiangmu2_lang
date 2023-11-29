<template>
	<view class="contentare">
		<view class="mainare" style="background-color: #f7f7f7;">
			<view class="banklist"
				:class="{'alipay':carditem.account_type==1,'weichart':carditem.account_type==2,'bank':carditem.account_type==3,'usdt':carditem.account_type==4}"
				v-for="(carditem,indexcd) in list" :key="indexcd">
				<view class="bankline">
					<view class="bankl">
						<image :src="alipayico" mode='widthFix' v-if="carditem.account_type==1"></image>
						<image :src="weichart" mode='widthFix' v-if="carditem.account_type==2"></image>
						<image :src="bankico" mode='widthFix' v-if="carditem.account_type==3"></image>
						<image :src="usdt" mode='widthFix' v-if="carditem.account_type==4"></image>
					</view>
					<view class="bankmdl">
						<p>{{carditem.username}}</p>
						<p class="type" v-if="carditem.account_type==1">支付寶</p>
						<p class="type" v-if="carditem.account_type==2">微信</p>
						<p class="type" v-if="carditem.account_type==3">銀行卡</p>
						<p class="type" v-if="carditem.account_type==4">USDT</p>
					</view>
					<view class="bankr">
						<span style="font-size: 20px; " v-if="carditem.is_default==1">
							<van-icon name="star" />
						</span>
						<span style="font-size: 20px; " v-if="carditem.is_default==0">
							<van-icon name="star-o" @click="delCard(2,carditem.id)" />
						</span>
						<span style="font-size: 20px;margin-left: 12px;">
							<van-icon name="delete-o" @click="delCard(1,carditem.id)" />
						</span>
						<span style="font-size: 20px;margin-left: 12px;">
							<van-icon name="edit" @click="JumpPage(1,carditem)" />
						</span>
					</view>
				</view>
				<view class="bankno">
					<view class="banknol"><span class="setl" v-if="carditem.is_default==1">默認賬户</span><span class="setl"
							@click="delCard(2,carditem.id)" v-if="carditem.is_default==0">設為默認</span></view>
					<view class="banknol"><span class="setr">{{carditem.account_number}}</span></view>
				</view>
			</view>
			<!-- <view class="banklist bank">
				<view class="bankline">
					<view class="bankl">
						<image :src="bankico" mode='widthFix'></image>
					</view>
					<view class="bankmdl">
						<p>张大仙</p>
						<p class="type">银行卡</p>
					</view>
					<view class="bankr">
						<span style="font-size: 20px; ">
							<van-icon name="star-o" @click="delCard(2,3213)"/>
						</span>
						<span style="font-size: 20px;margin-left: 12px;">
							<van-icon name="delete-o" @click="delCard(1,2323)" />
						</span>
						<span style="font-size: 20px;margin-left: 12px;">
							<van-icon name="edit" @click="JumpPage(1,2)" />
						</span>
					</view>
				</view>
				<view class="bankno">
					<view class="banknol"><span class="setl"  v-if="false" @click="delCard(2,243242332)">設為默認</span></view>
					<view class="banknol"><span class="setr">**** **** **** 9102</span></view>
				</view>
			</view> -->

			<van-button @click="JumpPage(2,'')" style=" display: block; width: 95%; margin: 10px auto;" type="default"
				size="large" icon="plus">添加賬户</van-button>
		</view>
		<van-toast id="van-toast"></van-toast>
		<van-dialog use-slot title="是否删除" :show="show_msg" :showCancelButton="true" cancelButtonText="取消"
			confirmButtonText="確定" :zIndex='91' @confirm="del_cash()" @cancel="delCard(1,'')"
			confirm-button-color="#409eff">
			<view class="msg_are">
				是否確定刪除該提現賬户！
			</view>
		</van-dialog>
		<van-dialog use-slot title="賬户設置" :show="show_msg_tx" :showCancelButton="true" cancelButtonText="取消"
			confirmButtonText="確定" :zIndex='91' @confirm="set_defaul" @cancel="delCard(2,'')"
			confirm-button-color="#409eff">
			<view class="msg_are">
				是否確定該提現賬户設置為默認提現賬户！
			</view>
		</van-dialog>
	</view>
</template>

<script>
	import Toast from '@/wxcomponents/vant/dist/toast/toast';

	export default {
		name: "salepage",
		components: {},
		props: {},
		data() {
			return {
				index: 3,
				show_msg: false,
				show_msg_tx: false,
				show: false,
				actions: [{
					name: "銀行卡"
				}, {
					name: "支付寶"
				}, {
					name: "微信"
				}],
				username: "",
				phoneNo: "",
				banktype: "",
				bankNo: "",
				address: "",
				alipayico: require("../../../static/image/alipay.jpg"),
				bankico: require("../../../static/image/bank.jpg"),
				weichart: require("../../../static/image/weichart.png"),
				usdt: require("../../../static/image/usdt.png"),
				fromTake: false,
				bind_ard: [],
				del_id: '',
				list: []
			};
		},
		methods: {
			JumpPage(router, data) {
				if (router == 1) {
					uni.navigateTo({
						url: '/pages/usercenter/card/Edit?id=' + data.id + '&account_type=' + data.account_type +
							'&username=' + data.username + '&account_number=' + data.account_number +
							'&bank_name=' + data.bank_name,
					});
				} else {
					uni.navigateTo({
						url: '/pages/usercenter/bindcard/bindcard',
					});
				}
			},
			onSubmit(values) {
				console.log("submit", values);
			},
			onSelect(item) {
				// 默认情况下点击选项时不会自动收起
				// 可以通过 close-on-click-action 属性开启自动收起
				this.show = false;
				console.log(item);
				this.banktype = item.name;
			},
			onCancel() {
				this.show = false;
			},
			delCard(type, data) {
				if (type == 1) {
					this.show_msg = !this.show_msg
					this.del_id = data
				} else {

					this.del_id = data
					this.show_msg_tx = !this.show_msg_tx
				}


			},
			async getList() {

				const res = await this.$myRuquest({
					url: '/api/front/user/getAccountList',
					method: "POST",

				})
				if (res.code == 200) {
					this.list = res.data

				}



			},
			async del_cash() {
				const res = await this.$myRuquest({
					url: '/api/front/user/removeAccount',
					method: "POST",
					data: {
						id: this.del_id,

					},

				})
				if (res.code == 200) {
					this.del_id = ''
					Toast.success('删除成功');
					this.show_msg = false
				} else {

					Toast.loading({
						duration: 0,
						message: res.msg,
						forbidClick: true,
					});
					setTimeout(function() {
						Toast.clear();
					}, 1500)
				}
				this.getList()
			},
			async set_defaul() {
				const res = await this.$myRuquest({
					url: '/api/front/user/changeDefaultAccount',
					method: "POST",
					data: {
						id: this.del_id,

					},

				})
				if (res.code == 200) {
					this.del_id = ''
					Toast.success('設置成功');
					this.show_msg_tx = false
				} else {

					Toast.loading({
						duration: 0,
						message: res.msg,
						forbidClick: true,
					});
					setTimeout(function() {
						Toast.clear();
					}, 1500)
				}
				this.getList()
			},
			async get_bind_card() {
				const res = await this.$myRuquest({
					url: '/api/app/yTLittleProgram/driverDetail',

				})
				if (res.code == 200) {
					this.bind_ard = res.data

				} else {

				}
			},


		},
		onBackPress(event) {
			
			if (uni.getStorageSync('type') == 1) {
				
				uni.navigateTo({
					url: '/pages/getcash/getcash',
				});
				return true
				
			} else if (uni.getStorageSync('type') == 2) {
				
				uni.navigateTo({
					url: '/pages/usercenter/qianbao/qianbao',
				});
				return true
				
			}

		},
		onLoad() {

		},
		onShow() {
			var had_token = uni.getStorageSync('token')
			if (had_token == '') {
				uni.navigateTo({
					url: '/pages/login/login',
				});
			} else {
				this.getList()
			}
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	/deep/ .van-fade-enter-active,
	.van-fade-leave-active {
		z-index: 91;
	}

	/deep/ .van-dialog {
		z-index: 92;
	}

	.msg_are {
		padding: 20px 15px;
		font-size: 14px;
		line-height: 25px;
		text-align: center;
	}

	.van-swipe-item img {
		width: 100%;
	}

	.dis_navline {
		width: 100%;
		overflow: hidden;
		height: auto;
		background: #fff;
		padding: 10px 0;
	}

	.dis_nav {
		background: red;
		color: #fff;
		width: 23%;
		padding: 10px 0;
		margin: 3px auto;
		margin-left: 1.5%;
		font-size: 13px;
		float: left;
		text-align: center;
	}

	.loginout {
		height: 40px;
		width: 85%;
		margin: auto;
		margin-top: 30px;
		border: none;
		border-radius: 20px;
		text-align: center;
		color: #fff;
		font-size: 14px;
		background: #ee0a24;
		line-height: 40px;
	}

	.van-cell {
		padding: 16px;
	}

	.banklist {
		height: auto;
		width: 95%;
		margin: auto;
		margin-top: 10px;
		border-radius: 5px;
		overflow: hidden;
		color: #fff;
		padding: 15px 0;
	}

	.bankline {
		height: auto;
		align-items: center;
		width: 95%;
		margin: auto;
		display: flex;
	}

	.bankl {
		width: 50px;

		border-radius: 50%;
	}

	.bankmdl p {
		font-size: 15px;
	}

	.bankmdl p.type {
		font-size: 12px;
	}

	.bankl image {
		width: 100%;
		border-radius: 50%;
		display: block;
	}

	.bankmdl {
		width: 75%;
		padding-left: 15px;
	}

	.bankr {
		width: 115px;
		text-align: right;
		font-size: 15px;
	}

	.alipay {
		background: url(../../../static/image/alipaybg.png) no-repeat #5d75f6;
		background-size: 27%;
		background-position: 83% 250%;
	}

	.bank {
		background: url(../../../static/image/bankbg.png) no-repeat #ec685a;
		background-size: 22%;
		background-position: 83% 136%;
	}

	.weichart {
		background: #4fc08d;
		background-size: 22%;
		background-position: 83% 136%;
	}

	.usdt {
		background: #baac13;
		background-size: 22%;
		background-position: 83% 136%;
	}

	.bankno {
		display: flex;
		width: 100%;
		margin-top: 20px;


		color: #fff;
	}

	.banknol {
		width: 50%;
	}

	.setl {
		padding-left: 15px;
		font-size: 14px;
	}

	.setr {
		text-align: right;
		font-size: 20px;
	}
</style>
