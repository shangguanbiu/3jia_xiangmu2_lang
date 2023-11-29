<template>
	<view class="contentare">
		<view class="mainare" style="background-color: #f7f7f7;">
			<view style="height: 104px;" v-for="(listitem,indexcz) in type_list" :key="indexcz">
			<view class="banklist " :class="{'alipay':listitem.type_id==1,'weichart':listitem.type_id==2,'bank':listitem.type_id==3,'usdt':listitem.type_id==4}" @click="to_recharge(listitem.id)">
				<view class="bankline">
					<view class="bankl">
						<image :src="alipayico" mode='widthFix' v-if="listitem.type_id==1"></image>
						<image :src="weichart" mode='widthFix' v-if="listitem.type_id==2"></image>
						<image :src="bankico" mode='widthFix' v-if="listitem.type_id==3"></image>
						<image :src="usdt" mode='widthFix' v-if="listitem.type_id==4"></image>
					</view>
					<view class="bankmdl">
						
						<p v-if="listitem.type_id==1">支付宝</p>
						<p  v-if="listitem.type_id==2">微信</p>
						<p  v-if="listitem.type_id==3">银行卡</p>
						<p v-if="listitem.type_id==4">USDT</p>
						
						<p class="type" v-if="listitem.type_id==1">方便快速，到账快</p>
						<p class="type" v-if="listitem.type_id==2">方便快速，到账快</p>
						<p class="type" v-if="listitem.type_id==3">大额方便</p>
						<p class="type" v-if="listitem.type_id==4">隐秘便捷</p>
					</view>
					<view class="bankr">

						<span style="font-size: 20px;margin-left: 12px;">
							<van-icon name="arrow"  />
						</span>
					</view>
				</view>
			</view>
			</view>
			<!-- <view class="banklist bank">
				<view class="bankline">
					<view class="bankl">
						<image :src="bankico" mode='widthFix'></image>
					</view>
					<view class="bankmdl">
						<p>银行卡</p>
						<p class="type">大额方便</p>
					</view>
					<view class="bankr">

						<span style="font-size: 20px;margin-left: 12px;">
							<van-icon name="arrow" @click="JumpPage(1,2)" />
						</span>
					</view>
				</view>

			</view>
			<view class="banklist weichartpay">
				<view class="bankline">
					<view class="bankl">
						<image :src="alipayico" mode='widthFix'></image>
					</view>
					<view class="bankmdl">
						<p>微信</p>
						<p class="type">方便快速，到账快</p>
					</view>
					<view class="bankr">

						<span style="font-size: 20px;margin-left: 12px;">
							<van-icon name="arrow" @click="JumpPage(1,1)" />
						</span>
					</view>
				</view>

			</view>
			<view class="banklist bank">
				<view class="bankline">
					<view class="bankl">
						<image :src="bankico" mode='widthFix'></image>
					</view>
					<view class="bankmdl">
						<p>USDT</p>
						<p class="type">隐秘便捷</p>
					</view>
					<view class="bankr">
						<span style="font-size: 20px;margin-left: 12px;">
							<van-icon name="arrow" @click="JumpPage(1,2)" />
						</span>
					</view>
				</view>

			</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		name: "salepage",
		components: {},
		props: {},
		data() {
			return {
				index: 3,

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
				alipayico: require("../../static/image/alipay.jpg"),
				bankico: require("../../static/image/bank.jpg"),
				weichart:require("../../static/image/weichart.png"),
				usdt:require("../../static/image/usdt.png"),
				fromTake: false,
				type_list:[]
			};
		},
		methods: {
			JumpPage(router, data) {
				if (router == 1) {
					uni.navigateTo({
						url: '/pages/usercenter/card/Edit',
					});
				} else {
					uni.navigateTo({
						url: '/pages/usercenter/bindcard/bindcard',
					});
				}
			},

			to_recharge(id) {
				uni.navigateTo({
					url: '/pages/recharge/type/Ali?id='+id,
				});
			},
			
			async get_paytype_list() {
				const res = await this.$myRuquest({
					url: '/api/front/recharge/getList',
					method: "POST",
				})
				if (res.code == 200) {
					this.type_list = res.data.list
					
				}
			
			},
		},
		onLoad() {},
		onShow() {
			var had_token=uni.getStorageSync('token')
			if(had_token ==''){
				uni.navigateTo({
					url: '/pages/login/login',
				});
			}else{
				this.get_paytype_list()
			}
		},
	
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
		padding: 25px 0;
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
		height: 50px;
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
		margin-top: 5px;
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
		background: url(../../static/image/alipaybg.png) no-repeat #5d75f6;
		background-size: 27%;
		background-position: 80% 50%;
	}

	.weichartpay {
		background: url(../../static/image/alipaybg.png) no-repeat #4fc08d;
		background-size: 27%;
		background-position: 80% 50%;
	}


	.bank {
		background: url(../../static/image/bankbg.png) no-repeat #ec685a;
		background-size: 22%;
		background-position: 80% 50%;
	}
	.weichart {
		background: #1BAB50;
		background-size: 22%;
		background-position: 80% 50%;
	}
.usdt {
		background: #baac13;
		background-size: 22%;
		background-position: 80% 50%;
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
