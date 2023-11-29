<template>
	<view class="contentare">
		<view class="mainare">
			<view class="banklist">
				<view class="name_l">收款人姓名</view>
				<view class="cont_mdl" style="color: #FF0000; font-size: 13px;">
					{{ username }}
				</view>
				<view class="copy_r" data-clipboard-action="copy" :data-clipboard-text="username"
					@click="copyCode(username)">
					複製
				</view>
			</view>
			<van-divider></van-divider>
			<view class="banklist">
				<view class="name_l">收款賬號</view>
				<view class="cont_mdl" style="color: #FF0000; font-size: 13px">
					{{ account }}
				</view>
				<view class="copy_r" data-clipboard-action="copy" :data-clipboard-text="account"
					@click="copyCode(account)">
					複製
				</view>
			</view>
			<van-divider></van-divider>
			<view class="banklist">
				<view class="name_l">詳細信息</view>
				<view class="cont_mdl" style="color: #FF0000; font-size: 13px">
					{{ msg }}
				</view>

			</view>
			<van-divider></van-divider>
			<view class="banklist">
				<view class="name_l">充值金額</view>
				<view class="cont_mdl">
					<input type="number" class="input_com input_a" v-model="money" />
				</view>
			</view>
			<van-divider></van-divider>
			<view class="banklist">
				<view class="name_l">備註</view>
				<view class="cont_mdl">
					<input type="text" class="input_com input_a" v-model="remark" />
				</view>
			</view>
			<van-divider></van-divider>
			<view class="banklist">
				<view class="name_l">轉賬截圖</view>
				<view class="cont_mdl" style="display: flex;">
					<view style="height: 60px; width: 60px; margin-right:10px" v-if="imgurl !==''">
						<image :src="imgurl" style="width:100%; height: 400rpx;" mode='widthFix'>
						</image>
					</view>
					<view @click="get_img_file"
						style="height: auto; width: 60px; color: #000; padding: 20px 0; text-align: center; background-color: #f3f3f3;">
						<van-icon name="photograph" />
					</view>
					<!-- <van-uploader :after-read="afterRead" multiple :max-count="1">
						<view class="uploadare">
							<van-icon name="photograph"></van-icon>
						</view>
					</van-uploader> -->
				</view>
			</view>

		</view>
		<van-button type="danger" @click="Posetdata"  :disabled="if_ok" block size="normal" class="btn_sub">提交</van-button>
		<van-toast id="van-toast"></van-toast>
	</view>
</template>

<script>
	import Toast from '@/wxcomponents/vant/dist/toast/toast';
	export default {
		name: "type",
		components: {},
		props: {},
		data() {
			return {
				index: 0,
				sel_value: "",
				data: "",
				id: "",
				account: "",
				username: "",
				remark: "",
				fileList: [],
				money: "",
				imgbase: '',
				cz_id: '',
				msg: '',
				imgurl: '',
				cz_msg: {},
				get_url: '',
				ifneed_img: true,
				if_ok:true
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
			goback() {
				this.$router.go(-1);
			},
			copyCode(data) {
				let url = data;
				let oInput = document.createElement("input");
				oInput.value = url;
				document.body.appendChild(oInput);
				oInput.select(); // 选择对象;

				document.execCommand("Copy"); // 执行浏览器复制命令

				Toast.success("已複製成功");
				oInput.remove();
			},

			async get_pay_MSG(id_val) {
				const res = await this.$myRuquest({
					url: '/api/front/recharge/getInfo',
					method: "POST",
					data: {
						id: id_val
					},
				})
				if (res.code == 200) {
					this.cz_msg = res.data
					this.cz_id = res.data.id
					this.account = res.data.account_number
					this.username = res.data.title
					this.msg = res.data.remark

				}
			},
			async get_ifneed_img() {
				const res = await this.$myRuquest({
					url: '/api/front/index/getRechargeConfig',
					method: "POST",

				})
				if (res.code == 200) {

					if (res.data.is_img_voucher == 1) {
						this.ifneed_img = true
					} else {
						this.ifneed_img = false
					}

				}
			},
			afterRead(file, filename) {
				// 此时可以自行将文件上传至服务器			
				this.imgbase = file

			},

			get_img_file() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择
					success: (res) => {
						this.imgurl = res.tempFilePaths[0]
						this.imgbase = res.tempFiles[0]
						if (this.ifneed_img == true) {
							uni.uploadFile({
								url: '/api/front/index/upload',
								filePath: res.tempFilePaths[0],
								name: 'img', // 在FormData 中文件对应的属性名
								fileType: 'image',
								header:{
									"XX-Api-Version": 1,
									"XX-Device-Type":'mobile',
									"XX-Token": uni.getStorageSync('token'),
								},
								success: (res3) => {
									
									if (res3.statusCode == 200) {
										
										const get_data =JSON.parse(res3.data)
										this.get_url = get_data.data.url
										
										this.if_ok=false
									}
								},
								fail: (err) => {
									console.log(err)
									//Toast.success("提交成功");
								}
							});
						}else{
							this.if_ok=false
						}

					}
				})

			},
			async Posetdata() {
				if (this.money == "") {
					Toast.fail("請輸入金額");
					return;
				}
				if (this.money < 0 || this.money == 0) {
					Toast.fail("請輸入正確格式金額，大於0的數字");
					return;
				}
				if (Number(this.money) < Number(this.cz_msg.min_amount)) {
					Toast.fail("最低充值金額為:" + this.cz_msg.min_amount);
					return;
				}
				if (Number(this.money) > Number(this.cz_msg.max_amount)) {
					Toast.fail("最高充值金額為:" + this.cz_msg.max_amount);
					return;
				}
				if (this.ifneed_img == true) {
					if (this.get_url == "") {
						Toast.fail("請上傳付款截圖憑證");
						return;
					}
				}
				
				const res = await this.$myRuquest({
					url: '/api/front/user/doRecharge',
					method: "POST",
					data: {
						account_id: this.cz_id,
						amount: parseInt(this.money),
						remark: this.remark,
						img: this.get_url
					},
				})
				if (res.code == 200) {
					Toast.success("提交成功");
					setTimeout(function() {
						uni.navigateTo({
							url: '/pages/usercenter/rechargelist/recharge',
						});
					}, 1500)
				} else {
					Toast.fail(res.msg);
				}

			}
		},
		onLoad(option) {
			this.get_pay_MSG(option.id)
		},
		onShow() {

			var had_token = uni.getStorageSync('token')
			if (had_token == '') {
				uni.navigateTo({
					url: '/pages/login/login',
				});
			} else {
				//this.get_pay_MSG()
				this.get_ifneed_img()
			}
		},
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.mainare {
		padding-top: 20px;
	}

	.banklist {
		height: auto;
		width: 95%;
		margin: auto;
		border-radius: 5px;
		overflow: hidden;
		color: #fff;
		padding: 0px 0;
		display: flex;
		align-items: center;
	}

	.titel {
		font-size: 14px;
		font-weight: bold;
	}

	.times {
		font-size: 13px;
		line-height: 35px;
	}

	.msg {
		font-size: 13px;
		line-height: 25px;
		padding: 15px;
		padding-top: 10px;
	}

	.msgheadare {
		padding: 15px;
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
		font-size: 14px;
		color: #fff;
	}

	.bankl img {
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

	.name_l {
		width: 80px;
		color: #333;
		font-size: 13px;
	}

	.cont_mdl {
		flex: 1;
	}

	.copy_r {
		width: 40px;
		color: #ff0000;
		font-size: 13px;
		text-align: center;
	}

	.van-divider {
		margin: 0;
	}

	.input_a {
		background: #f3f3f3;
		height: 35px;
		padding-left: 5px;
		border-radius: 5px;
		width: 90%;
		color: #333
	}

	.btn_sub {
		display: block;
		width: 90%;
		margin: auto;
		font-size: 14px;
		margin-top: 15px;
	}

	.uploadare {
		height: 60px;
		background: #f3f3f3;
		border-radius: 5px;
		text-align: center;
		justify-content: center;
		width: 60px;
		color: #000;
		font-size: 20px;
		display: flex;
		align-items: center;
	}
</style>
