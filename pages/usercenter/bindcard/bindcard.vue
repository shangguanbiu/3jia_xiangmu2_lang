<template>
	<view class="contentare">
		<view class="mainare" style="background-color: #f7f7f7; padding-top: 10px;">
			<view class="input_line_are input_line_are2" @click="show = true">
				<view class="input_line_l">賬户類型</view>
				<view class="input_line_rl">
					<view class="input_com" style="text-align: left; color: #323233;">{{banktype}}</view>
				</view>
			</view>
			<view v-if="bank">
				<view class="input_line_are input_line_are2">
					<view class="input_line_l">姓名</view>
					<view class="input_line_rl">
						<input class="uni-input input_com2" focus v-model="username" placeholder="請輸入姓名" />
					</view>
				</view>
				<view class="input_line_are input_line_are2">
					<view class="input_line_l">提現賬號</view>
					<view class="input_line_rl">
						<input class="uni-input input_com2" focus v-model="account_number" placeholder="請輸入提現賬號" />
					</view>
				</view>
				<view class="input_line_are">
					<view class="input_line_l">銀行名稱</view>
					<view class="input_line_rl">
						<input class="uni-input input_com2" focus v-model="bank_name" placeholder="请输入完整的银行名称以及支行" />
					</view>
				</view>
			</view>
			<view v-if="alipay">
				<view class="input_line_are input_line_are2">
					<view class="input_line_l">姓名</view>
					<view class="input_line_rl">
						<input class="uni-input input_com2" focus v-model="username" placeholder="請輸入姓名" />
					</view>
				</view>
				<view class="input_line_are ">
					<view class="input_line_l">提現賬號</view>
					<view class="input_line_rl">
						<input class="uni-input input_com2" focus v-model="account_number" placeholder="請輸入提現賬號" />
					</view>
				</view>
			</view>
			<view v-if="weicharpay">
				<view class="input_line_are input_line_are2">
					<view class="input_line_l">姓名</view>
					<view class="input_line_rl">
						<input class="uni-input input_com2" focus v-model="username" placeholder="請輸入姓名" />
					</view>
				</view>
				<view class="input_line_are ">
					<view class="input_line_l">微信賬號</view>
					<view class="input_line_rl">
						<input class="uni-input input_com2" focus v-model="account_number" placeholder="請輸入微信賬號" />
					</view>
				</view>

			</view>
			<view v-if="usdt">
				<view class="input_line_are input_line_are2">
					<view class="input_line_l">網絡類型</view>
					<view class="input_line_rl">
						<input class="uni-input input_com2" focus v-model="username"
							placeholder="請填寫網絡類型-如ERC20,TRC20" />
					</view>
				</view>
				<view class="input_line_are ">
					<view class="input_line_l">提現地址</view>
					<view class="input_line_rl">
						<input class="uni-input input_com2" focus v-model="account_number" placeholder="請填寫提現地址" />
					</view>
				</view>

			</view>

			<view style="margin: 16px;">
				<van-button round block type="danger" @click="bind_card">提交</van-button>
			</view>

		</view>
		<van-toast id="van-toast"></van-toast>
		<van-action-sheet :show="show" :actions="actions" :z-index='99' @select="onSelect" cancel-text="取消"
			close-on-click-action @cancel="onCancel" />
	</view>
</template>

<script>
	// import { typeico, cpimg, back_w } from "@/utils/img.js";
import Toast from '@/wxcomponents/vant/dist/toast/toast';

	export default {
		name: "salepage",
		components: {},
		props: {},
		watch: {
			banktype: function(newval) {
				if (newval == '支付寶') {
					this.alipay = true;
					this.weicharpay = false;
					this.bank = false;
					this.usdt = false;
				} else if (newval == '微信') {
					this.alipay = false;
					this.weicharpay = true;
					this.bank = false;
					this.usdt = false;
				} else if (newval == '銀行卡') {
					this.alipay = false;
					this.weicharpay = false;
					this.bank = true;
					this.usdt = false;
				} else {
					this.alipay = false;
					this.weicharpay = false;
					this.bank = false;
					this.usdt = true;
				}


			}
		},
		data() {
			return {
				index: 3,
				alipay: true,
				weicharpay: false,
				bank: false,
				usdt: false,
				show: false,
				banktype: '支付寶',

				actions: [{
					name: "支付寶",
					id: 1
				}, {
					name: "微信",
					id: 2
				}, {
					name: "銀行卡",
					id: 3
				}, {
					name: "USDT",
					id: 4
				}],
				account_type: 1,
				
				username: "",
				account_number: '',
				bank_name: '',

				noaddress: true
			};
		},
		methods: {
			JumpPage(router) {
				if (router == "") {
					this.$router.go(-1);
				} else {
					this.$router.push(router);
				}
			},
			onSubmit(values) {
				console.log("submit", values);

			},
			onSelect(item) {
				// 默认情况下点击选项时不会自动收起
				// 可以通过 close-on-click-action 属性开启自动收起
				this.show = false;

				this.banktype = item.detail.name
				this.account_type = item.detail.id
			},
			onCancel() {
				this.show = false;
			},
			async bind_card() {
				if(this.account_type !==3){
					if(this.username ==''|| this.account_number==''){
						Toast.fail('請完善內容填寫');
						return
					}
				}
				if(this.account_type ==3){
					if(this.username ==''|| this.account_number==''||this.bank_name==''){
						Toast.fail('請完善內容填寫');
						return
					}
				}
				const res = await this.$myRuquest({
					url: '/api/front/user/addAccount',
					method: "POST",
					data: {
						account_type: this.account_type,
						username: this.username,
						account_number:this.account_number,
						bank_name:this.bank_name
					},
				})
				if (res.code == 200) {
					Toast.success('設置成功');
					setTimeout(function() {
						uni.navigateTo({
							url: '/pages/usercenter/card/Index',
						})
					}, 1500)

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
			},
		},

		onLoad() {

		},
		onShow() {
			this.banktype = this.actions[0].name
			var had_token = uni.getStorageSync('token')
			if (had_token == '') {
				uni.navigateTo({
					url: '/pages/login/login',
				});
			}
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	/deep/ .van-popup--bottom {
		z-index: 101;
	}
.input_line_rl{ flex: 1;}
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
</style>
