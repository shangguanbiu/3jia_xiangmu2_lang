<template>
	<view class="contentare">

		<view class="mainare" style="background-color: #f7f7f7;padding-top: 10px;">

			<van-cell>
				<!-- 使用 title 插槽来自定义标题 -->
				<template #title>
					<view style="align-items: center; display: flex;">
						<van-icon :name="lock" style="padding: 0 10px;" />
						<input type="password" placeholder="請輸入舊密碼" v-show="!seeold" class="input_com"
							v-model="old_pwd" />
						<input type="text" placeholder="請輸入舊密碼" v-show="seeold" class="input_com" v-model="old_pwd" />
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
						<van-icon :name="lock" style="padding: 0 10px;" />
						<input type="password" placeholder="請輸入新密碼" v-show="!seenew" class="input_com"
							v-model="new_pwd" />
						<input type="text" placeholder="請輸入新密碼" v-show="seenew" class="input_com" v-model="new_pwd" />
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
						<van-icon :name="lock" style="padding: 0 10px;" />
						<input type="password" placeholder="請再次輸入新密碼" v-show="!seerepsw" class="input_com"
							v-model="renew_pwd" />
						<input type="text" placeholder="請再次輸入新密碼" v-show="seerepsw" class="input_com"
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
				<van-button type="warning" block class="loginout" round @click="submit_psw" :disabled="ifopen">保存
				</van-button>
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
			};
		},
		watch: {
			renew_pwd(val) {
				if (this.old_pwd !== '' && val !== '' && this.new_pwd !== '' && this.new_pwd == this.renew_pwd) {
					this.ifopen = false
				}else{
					this.ifopen=true
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
					Toast.fail("兩次密碼輸入不相同！");
					this.ifopen = true
					return
				} else {
					this.ifopen = false
				}
				if (this.old_pwd == '' || this.new_pwd == '' || this.renew_pwd == '') {
					Toast.fail("請完善密碼輸入！");
					this.ifopen = true
				} else {
					this.ifopen = false
				}
				Toast.loading({
					duration: 0,
					message: '提交中...',
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
					Toast.success('密碼已修改成功！');
					uni.setStorageSync('token', res.data.token)
					
					setTimeout(function() {
						uni.navigateTo({
							url: '/pages/login/login',
						})
					}, 1500)
				
				} else {
					Toast.clear();
					Toast.loading({
						duration: 0,
						message: res.msg,
						forbidClick: true,
					});
					setTimeout(function() {
						Toast.clear();
					}, 1500)
					//uni.removeStorageSync("ifLogin")
				}
				
			}
		},
		mounted() {},
		activated() {},
		beforeCreate() {}
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

		line-height: 40px;
	}

	.van-icon {
		font-size: 19px;
	}

	.van-cell {
		padding: 16px;
	}
</style>
