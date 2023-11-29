<template>
	<view class="contentare">
		<view class="mainare" style="background-color: #f1f1f1;">
			<view class="takeare">
				<view class="taketype">
					<van-cell is-link @click="JumpPage()" style="margin-top: 10px;">
						<!-- 使用 title 插槽来自定义标题 -->
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
				</view>
				<view class="take_com">
					<van-cell value="">
						<!-- 使用 title 插槽来自定义标题 -->
						<template #title>
							<view style="align-items: center; display: flex;">
								提現金額
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
								<view>當前可提現餘額{{ formatNum(userinfo.balance) }}元,</view>
							</view>
						</template>
						<template #right-icon>
							<b class="getall" @click="GetAll">全部提現</b>
						</template>
					</van-cell>

				</view>

			</view>

			<view style="margin: 16px;">
				<van-button block type="danger" @click="onSubmit">提現</van-button>
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
				default_data: ''
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
				if (this.money == "") {
					Toast.fail("請輸入金額");
					return;
				}
				if (this.money < 0 || this.money == 0) {
					Toast.fail("請輸入正確格式金額，大於0的數字");
					return;
				}

				if (Number(this.money) > Number(this.userinfo.balance)) {
					Toast.fail("最高可提現金額為:" + this.userinfo.balance);
					return;
				}
				// if (this.imgbase == "") {
				// 	Toast.fail("请上传付款截图凭证");
				// 	return;
				// }
				if (this.default_data == '') {
					Toast.fail("請綁定提現賬户");
					return
				}
				if (this.cz_id == '') {
					Toast.fail("請選擇默認提現賬户");
					return
				}
				const res = await this.$myRuquest({
					url: '/api/front/user/doWithdrawal',
					method: "POST",
					data: {
						account_id: this.cz_id,
						amount: parseInt(this.money),

					},
				})
				if (res.code == 200) {
					Toast.success("提交成功");
				} else {
					Toast.fail(res.msg);
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

			if (had_token !== '') {
				this.get_userInfo()
				this.getList()
			}
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
