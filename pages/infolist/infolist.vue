<template>
	<view>
		<view class="list_are">
			<!-- <van-cell title="头像" is-link /> -->
			<van-cell title="用户名" is-link @click="set_username()" :value="userinfo.nikeName" />
			<van-cell title="性别" is-link @click="set_sex()" :value="sex" />
			<van-cell title="手机号" :value="userinfo.phone" />
			<van-cell title="我的生日" @click="set_birth()" is-link
				:value="userinfo.cBirthDay==''?'去完善':userinfo.cBirthDay" />
		</view>
		<view class="list_are">
			<van-cell title="用户协议" is-link link-type="navigateTo" url="/pages/xieyi/xieyi" />
			<van-cell title="隐私权政策" is-link link-type="navigateTo" url="/pages/zhengce/zhengce" />

		</view>
		<van-popup :show="show_namedailod" bind:close="set_username">
			<view class="pop_are">
				<view class="tit">修改用户名</view>
				<view class="input_are">
					<input class="uni-input "  v-model="nikeName" />
				</view>
				<view class="ft_btnline">
					<van-button type="default" size="normal" block style="width: 90%; margin-right: 8px;"
						@click="set_username()">取消
					</van-button>
					<van-button type="info" size="normal" block color="#3E3EF7" style="width: 90%;margin-left: 8px;"
						@click="set_username_ok()">确认</van-button>
				</view>
			</view>


		</van-popup>
		<van-action-sheet :show="show_sexdailod" :actions="actions_LIST" @cancel="onClose" @select="onSelect"
			cancel-text="取消">
		</van-action-sheet>
		<van-popup :show="show_birthdailod" position="bottom">
			<view style="width: 100vw;">
				<van-datetime-picker type="date" @cancel="onClosebir" @confirm="onSelectbir" :min-date="minDate" />
			</view>

		</van-popup>
		<van-toast id="van-toast"></van-toast>
		<view class="ft_btnare">
			<van-button type="info" class="ft_btn" size="normal" block round color="#3E3EF7" @click="showdialog=true">
				退出登录
			</van-button>
		</view>
		<van-popup :show="showdialog">

			<view class="pop_are">
				<view class="tit">提示</view>
				<view class="input_are" style="background: none; text-align: center;">
					确定退出登录？
				</view>
				<view class="ft_btnline">
					<van-button type="default" size="normal" block style="width: 90%; margin-right: 8px;"
						@click="onClose()">取消
					</van-button>
					<van-button type="info" size="normal" block color="#3E3EF7" style="width: 90%;margin-left: 8px;"
						@click="on_setlogout()">确认</van-button>
				</view>
			</view>


		</van-popup>
		<!-- <van-action-sheet :show="show_sexdailod">
			<view class="select_are">
				<view class="select_btn">
					<view class="select_l" @click="onClose">取消</view>
					<view class="select_r" @click="onSelect">确认</view>
				</view>
				<view>
					<view class="select_item" v-for="(item,indexd) in actions_LIST" :key="indexd">{{item.name}}</view>
				</view>
			</view>
		</van-action-sheet> -->
	</view>
</template>

<script>
	import Toast from '@/wxcomponents/vant/dist/toast/toast';
	export default {
		data() {
			return {
				showdialog: false,
				userinfo: {
					img: '',
					nikeName: '',
					sex: 1,
					phone: '',
					cBirthDay: ''
				},
				nikeName: '',
				sex: '',
				sex_id:'',
				cBirthDay: '',
				actions_LIST: [{
					name: '未知',
					value: 0
				}, {
					name: '男',
					value: 1
				}, {
					name: '女',
					value: 2
				}],
				show_namedailod: false,
				show_sexdailod: false,
				show_birthdailod: false,
				currentDate: new Date().getTime(),
				minDate: 315507676, //new Date().getTime(),
				formatter(type, value) {
					if (type === 'year') {
						return `${value}年`;
					}
					if (type === 'month') {
						return `${value}月`;
					}
					return value;
				},
			}
		},
		methods: {
			async get_userInfo() {
				
				const res = await this.$myRuquest({
					url: '/api/app/yTLittleProgram/driverDetail',
					header: {
						Authorization: "Bearer " + uni.getStorageSync('ifLogin'),
						"content-type": 'application/json'
					}
				})
				if (res.code == 200) {
					this.userinfo = res.data
					this.nikeName=this.userinfo.nikeName
					uni.removeStorageSync('userinfo')
					uni.setStorageSync('userinfo',JSON.stringify(this.userinfo))
					if (this.userinfo.sex == 0) {
						this.sex = '未知'
					} else if (this.userinfo.sex == 1) {
						this.sex = '男'
					} else {
						this.sex = '女'
					}
					if(this.userinfo.nikeName==''){
						this.userinfo.nikeName=this.userinfo.name
					}
					
				} else {
					Toast.fail(res.msg)
					setTimeout(function() {
						
					}, 1500)
				}


			},
			set_username() {
				this.nikeName=this.userinfo.nikeName
				this.show_namedailod = !this.show_namedailod
				
			},
			set_sex() {
				this.show_sexdailod = !this.show_sexdailod
			},
			set_birth() {
				this.show_birthdailod = !this.show_birthdailod
			},
			set_username_ok() {
				if (this.nikeName !== '') {
					this.set_userInfo_name()
				} else {
					Toast.fail('请设置用户名');

				}
			},
			async set_userInfo_name() {
				Toast.loading({
					duration: 0,
					message: '加载中...',
					forbidClick: true,
				});
				const res = await this.$myRuquest({
					url: '/api/app/yTLittleProgram/nikeName',
					method: 'put',
					data: {
						nikeName: this.nikeName
					},
					header: {
						Authorization:"Bearer "+ uni.getStorageSync('ifLogin'),
						"content-type": 'application/json'
					}
				})

				if (res.code == 200) {
					Toast.clear();
					this.show_namedailod=false
					Toast.success('设置成功');
					this.get_userInfo()
				}else{
					Toast.clear();
					Toast.fail(res.msg);
				}

			},
			async get_userInfo_sex() {
				Toast.loading({
					duration: 0,
					message: '加载中...',
					forbidClick: true,
				});
				if (this.sex == '未知') {
					this.sex_id = 0
				} else if (this.sex == '男') {
					this.sex_id = 1
				} else {
					this.sex_id = 2
				}	
				const res = await this.$myRuquest({
					url: '/api/app/yTLittleProgram/sex',
					method: 'put',
					data: {
						sex: this.sex_id
					},
					header: {
						Authorization:"Bearer "+ uni.getStorageSync('ifLogin'),
						"content-type": 'application/json'
					}
				})

				if (res.code == 200) {
					Toast.clear();
					Toast.success('设置成功');
					this.get_userInfo()
				}else{
					Toast.clear();
					Toast.fail(res.msg);
				}

				this.get_userInfo()
			},
			async get_userInfo_birth() {

				Toast.loading({
					duration: 0,
					message: '加载中...',
					forbidClick: true,
				});
				const res = await this.$myRuquest({
					url: '/api/app/yTLittleProgram/birthDay',
					method: 'put',
					data: {
						birthDay: this.cBirthDay
					},
					header: {
						Authorization: "Bearer " + uni.getStorageSync('ifLogin'),
						"content-type": 'application/json'
					}
				})
				
				if (res.code == 200) {
					Toast.clear();
					Toast.success('设置成功');
					this.get_userInfo()
				}else{
					Toast.clear();
					Toast.fail(res.msg);
				}

				this.get_userInfo()
			},
			onClose() {
				this.show_sexdailod = false
			},
			onSelect(event) {
				console.log(event.detail)
				this.show_sexdailod = false
				
				this.sex=event.detail.name
				this.get_userInfo_sex()
			},
			onClosebir() {
				this.show_birthdailod = false
			},
			onSelectbir(event) {
				this.show_birthdailod = false
				this.cBirthDay = this.timestampToTime(event.detail)
				this.get_userInfo_birth()


			},
			onInput(event) {
				// this.setData({
				//   currentDate: event.detail,
				// });
			},
			timestampToTime(timestamp) {

				var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
				var Y = date.getFullYear() + '-';
				var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
				var D = date.getDate() + ' ';
				var h = date.getHours() + ':';
				var m = date.getMinutes() + ':';
				var s = date.getSeconds();
				return Y + M + D

			},
			onClose() {

				this.showdialog = !this.showdialog

				// this.setData({
				// 	show: false
				// });
			},
			async on_setlogout() {
				this.showdialog = false
				Toast.loading({
					duration: 0,
					message: '退出中...',
					forbidClick: true,
				});

				const res = await this.$myRuquest({
					url: '/api/app/yTLittleProgram/loginOut',
					method: 'post',
					header: {
						Authorization: "Bearer " + uni.getStorageSync('ifLogin'),
						"content-type": 'application/json'
					}
				})

				if (res.code == 200) {
					Toast.clear();
					Toast.success('已退出')
					setTimeout(function() {
						Toast.clear();
						uni.navigateTo({
							url: '/pages/index/index',
						})
					}, 500)
					uni.removeStorageSync("ifLogin")
					uni.removeStorageSync("userinfo")
					uni.removeStorageSync("compay_name")
					uni.removeStorageSync("compay_id")
					uni.removeStorageSync("if_login_check")

					// setTimeout(function() {
					// }, 600)
				} else {
					Toast.fail(res.msg)
					setTimeout(function() {
						Toast.clear();
					}, 500)
				}

				//

			}

		},
		onLoad() {

			var ifLogin = uni.getStorageSync("if_login_check")
			if (ifLogin !== '') {
				this.get_userInfo()
			} else {
				uni.navigateTo({
					url: '/pages/login/login',
				});
			}

		}
	}
</script>

<style scoped>
	page {
		background-color: #F7F8FC;
	}

	/deep/ .van-popup {
		z-index: 99999;
		background: none;
	}

	.list_are {
		height: auto;
		width: calc(100% - 32px);
		margin: auto;
		background: #fff;
		border-radius: 8px;
		margin-top: 15px;
		overflow: hidden;
	}


	.input_are {
		width: calc(100vw - 96px);
		margin: auto;
		padding: 16px;
		min-height: 40px;
		background: #F7F8FC;
		border-radius: 8px;
	}

	.select_are {
		background-color: #ffffff;
		width: 100vw;
	}

	.select_btn {
		display: block;
		height: 45px;
		background-color: #ffffff;

	}

	.select_l {
		float: left;
		width: 60px;
		font-size: 16px;
		text-align: center;
		line-height: 40px;
		color: #9C9FB7;
	}

	.select_r {
		float: right;
		width: 60px;
		font-size: 16px;
		text-align: center;
		line-height: 40px;
		color: #3E3EF7;
	}

	.select_item {
		display: block;
		width: 100%;
		padding: 14px 0px;
		font-size: 16px;
		background-color: #fff;
		border: none;
		cursor: pointer;
		text-align: center;
	}

	.ft_btnare {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		background: #fff;
		padding: 10px 0;
	}

	.ft_btn {
		width: 90%;
		margin: auto;
		display: block;
	}
</style>
