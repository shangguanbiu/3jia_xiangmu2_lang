<template>
	<view class="contentare">

		<view class="mainare" style="padding-top: 10px;">

			<van-cell>
				<!-- 使用 title 插槽来自定义标题 -->
				<template #title>
					<view style="align-items: center; display: flex;">
						<!-- <van-icon :name="lock" style="padding: 0 10px;" /> -->
						<image src="../../../static/image/lm_n_07.png" style="width:20px;height: 20px; "
							mode='widthFix'>
							<input type="password" :placeholder="$t('updatepsw.old_psw')" style="width: 80%;" v-show="!seeold" class="input_com"
								v-model="old_pwd" />
							<input type="text" :placeholder="$t('updatepsw.old_psw')" style="width: 80%;" v-show="seeold" class="input_com"
								v-model="old_pwd" />
					</view>
				</template>
				<template #right-icon>
					<view style="align-items: center; display: flex;">
						<van-icon name="closed-eye" v-show="!seeold" @click="seePsw(1)" class="search-icon" />
						<van-icon name="eye-o" v-show="seeold" @click="seePsw(1)" class="search-icon" />
					</view>
				</template>
			</van-cell>
			<van-cell>
				<!-- 使用 title 插槽来自定义标题 -->
				<template #title>
					<view style="align-items: center; display: flex;">
						<image src="../../../static/image/lm_n_07.png" style="width:20px;height: 20px; "
							mode='widthFix'>
							<input type="password" :placeholder="$t('updatepsw.new_psw')" style="width: 80%;" v-show="!seenew" class="input_com"
								v-model="new_pwd" />
							<input type="text" :placeholder="$t('updatepsw.new_psw')"  style="width: 80%;" v-show="seenew" class="input_com"
								v-model="new_pwd" />
					</view>
				</template>
				<template #right-icon>
					<view style="align-items: center; display: flex;">
						<van-icon name="closed-eye" v-show="!seenew" @click="seePsw(2)" class="search-icon" />
						<van-icon name="eye-o" v-show="seenew" @click="seePsw(2)" class="search-icon" />
					</view>
				</template>
			</van-cell>
			<van-cell>
				<!-- 使用 title 插槽来自定义标题 -->
				<template #title>
					<view style="align-items: center; display: flex;">
						<image src="../../../static/image/lm_n_07.png" style="width:20px;height: 20px; "
							mode='widthFix'>
							<input type="password" :placeholder="$t('updatepsw.renew_psw')" style="width: 80%;" v-show="!seerepsw" class="input_com"
								v-model="renew_pwd" />
							<input type="text" :placeholder="$t('updatepsw.renew_psw')" style="width: 80%;" v-show="seerepsw" class="input_com"
								v-model="renew_pwd" />
					</view>
				</template>
				<template #right-icon>
					<view style="align-items: center; display: flex;">
						<van-icon name="closed-eye" v-show="!seerepsw" @click="seePsw(3)" class="search-icon" />
						<van-icon name="eye-o" v-show="seerepsw" @click="seePsw(3)" class="search-icon" />
					</view>
				</template>
			</van-cell>
			<!-- <view @click="submit_psw" class="loginout" >保存</view> -->
			<view class="loginout">
				<!-- <van-button type="warning" block class="loginout" round @click="submit_psw" :disabled="ifopen">保存
				</van-button> -->
				<!-- <view style=" height: 44px; color:#fff ; background: #EAC477; text-align: center; line-height: 44px; border-radius: 28px; font-size: 14px;" @click="submit_psw">保存</view> -->
				<button type="default"
					style=" height: 44px; color:#fff ; background: #EAC477; text-align: center; line-height: 44px; border-radius: 28px; font-size: 14px;"
					@click="submit_psw">{{$t('updatepsw.save')}}</button>

			</view>

		</view>
		<van-toast id="van-toast"></van-toast>
	</view>
</template>

<script>
	import {
		lock
	} from "@/util/img.js";
	import Toast from '@/wxcomponents/vant/dist/toast/toast';
	export default {
		name: "salepage",
		components: {},
		props: {},
		data() {
			return {
				index: 3,
				ifopen: true,
				lock: lock,
				nickname: '环大学',

				old_pwd: '',
				new_pwd: '',
				renew_pwd: '',

				seeold: false,
				seenew: false,
				seerepsw: false,
				language_type:"zhCN"
			};
		},
		watch: {
			renew_pwd(val) {
				if (this.old_pwd !== '' && val !== '' && this.new_pwd !== '' && this.new_pwd == this.renew_pwd) {
					this.ifopen = false
				} else {
					this.ifopen = true
				}
			},

		},
		methods: {
			JumpPage(router) {
				this.$router.push(router);
			},
			seePsw(val) {
				if (val == 1) {
					this.seeold = !this.seeold
				}
				if (val == 2) {
					this.seenew = !this.seenew
				}
				if (val == 3) {
					this.seerepsw = !this.seerepsw
				}
			},
			async submit_psw() {
				if (this.new_pwd !== this.renew_pwd) {
					Toast.fail(this.$t('updatepsw.msg1'));
					this.ifopen = true
					return
				} else {
					this.ifopen = false
				}
				if (this.old_pwd == '' || this.new_pwd == '' || this.renew_pwd == '') {
					Toast.fail(this.$t('updatepsw.msg2'));
					this.ifopen = true
				} else {
					this.ifopen = false
				}
				Toast.loading({
					duration: 0,
					message: this.$t('updatepsw.msg3'),
					forbidClick: true,
				});
				var _this = this
				const res = await this.$myRuquest({
					url: '/api/front/user/resetPwd',
					method: 'Post',

					data: {
						old_pwd: this.old_pwd,
						new_pwd: this.new_pwd
					}
				})

				if (res.code == 200) {
					Toast.clear();
					Toast.success(this.$t('updatepsw.msg4'));
					uni.setStorageSync('token', res.data.token)

					setTimeout(function() {
						uni.navigateTo({
							url: '/pages/login/login',
						})
					}, 1500)

				} else {
					Toast.clear();
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
					// Toast.loading({
					// 	duration: 0,
					// 	message: res.msg,
					// 	forbidClick: true,
					// });
					// setTimeout(function() {
					// 	Toast.clear();
					// }, 1500)
					//uni.removeStorageSync("ifLogin")
				}

			}
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title: this.$t('updatepsw.update_title')
			})
			this.language_type = uni.getStorageSync('language')
		},
		
		activated() {},
		beforeCreate() {}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	/deep/ .van-cell {
		background: #000;
		color: #fff;
	}

	page {
		background: #000;
	}

	.van-swipe-item img {
		width: 100%;
	}

	/deep/ .van-cell:after {
		border-bottom: 1px solid #898989;
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

		line-height: 40px;
	}

	.van-icon {
		font-size: 19px;
	}

	.van-cell {
		padding: 16px;
	}
</style>
