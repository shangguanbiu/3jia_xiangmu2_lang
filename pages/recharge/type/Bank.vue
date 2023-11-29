<template>
	<div class="contentare">
		<div class="headare">
			<div class="msgico" @click="goback">
				<van-icon name="arrow-left" />
			</div>
			<div class="input_select" style="text-align: center;">
				银行卡转账
			</div>
			<div class="typeico"></div>
		</div>
		<div class="mainare">
			<div class="banklist">
				<div class="name_l">收款人姓名</div>
				<div class="cont_mdl" style="color: #FF0000; font-size: 13px;">
					{{ username }}
				</div>
				<div
					class="copy_r"
					data-clipboard-action="copy"
					:data-clipboard-text="username"
					@click="copyCode(username)"
				>
					复制
				</div>
			</div>
			<van-divider></van-divider>
			<div class="banklist">
				<div class="name_l">收款账号</div>
				<div class="cont_mdl" style="color: #FF0000; font-size: 13px">
					{{ account }}
				</div>
				<div
					class="copy_r"
					data-clipboard-action="copy"
					:data-clipboard-text="account"
					@click="copyCode(account)"
				>
					复制
				</div>
			</div>
			<van-divider></van-divider>
			<div class="banklist">
				<div class="name_l">银行名称</div>
				<div class="cont_mdl" style="color: #FF0000; font-size: 13px">
					{{ bank_name }}
				</div>
				<div
					class="copy_r"
					data-clipboard-action="copy"
					:data-clipboard-text="bank_name"
					@click="copyCode(bank_name)"
				>
					复制
				</div>
			</div>
			<van-divider></van-divider>
			<div class="banklist">
				<div class="name_l">支行信息</div>
				<div class="cont_mdl" style="color: #FF0000; font-size: 13px">
					{{ bank_address }}
				</div>
				<div
					class="copy_r"
					data-clipboard-action="copy"
					:data-clipboard-text="bank_address"
					@click="copyCode(bank_address)"
				>
					复制
				</div>
			</div>
			<van-divider></van-divider>
			<div class="banklist">
				<div class="name_l">充值金额</div>
				<div class="cont_mdl">
					<input
						type="number"
						class="input_com input_a"
						v-model="money"
					/>
				</div>
			</div>
			<van-divider></van-divider>
			<div class="banklist">
				<div class="name_l">备注</div>
				<div class="cont_mdl">
					<input
						type="text"
						class="input_com input_a"
						v-model="remark"
					/>
				</div>
			</div>
			<van-divider></van-divider>
			<div class="banklist">
				<div class="name_l">转账截图</div>
				<div class="cont_mdl">
					<van-uploader
						v-model="fileList"
						:after-read="afterRead"
						multiple
						:max-count="1"
					>
						<div class="uploadare">
							<van-icon name="photograph"></van-icon>
						</div>
					</van-uploader>
				</div>
			</div>
			<van-button type="danger" @click="Posetdata" size="normal" class="btn_sub"
				>提交</van-button
			>
		</div>
	</div>
</template>

<script>


import { alipayico, bankico } from "@/utils/imgs.js";
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
			bankico,
			alipayico,
			account: "",
			username: "",
			remark: "",
			fileList: [],
			money: "",
			imgbase:"",
			bank_name:'',
			bank_address:''
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

			this.$toast.success("已复制成功");
			oInput.remove();
		},
		getMSG() {
			this.$axios.get(this.$api_url.get_row_bank).then(res => {
				if (res.code == 1) {
					 
					this.data = res.data;
					this.account = this.data.bank_number;
					this.username = this.data.bank_owner;
					this.bank_name=this.data.bank_name;
					this.bank_address=this.data.bank_address;
					
				}
			});
		},
		afterRead(file) {
			// 此时可以自行将文件上传至服务器			
			 this.imgbase=file
		},
		Posetdata() {
			if (this.money == "") {
				this.$toast.fail("请输入金额");
				return;
			}
			if (this.money < 0 || this.money == 0) {
				this.$toast.fail("请输入正确格式金额，大于0的数字");
				return;
			}
			if (this.imgbase == "") {
				this.$toast.fail("请上传付款截图凭证");
				return;
			}
			this.$axios
				.post(this.$api_url.save_bank, {
					money: parseInt(this.money),
					img:this.imgbase.content,
					remark:this.remark,
				})
				.then(res => {
					if (res.code == 1) {
						this.$toast.success("提交成功");
						
						setTimeout(()=>{
							this.$router.push({ path: "/recharge" });
						},2500)
					} else {
						this.$toast.fail(res.msg);
					}
				})
				.catch(ex => {
					//console.log('ex',ex.request.status)
				});
		}
	},
	mounted() {
		this.getMSG();
	},
	activated() {},
	beforeCreate() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.banklist {
	height: auto;
	width: 95%;
	margin: auto;
	border-radius: 5px;
	overflow: hidden;
	color: #fff;
	padding: 15px 0;
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
	width: 90%;color: #333
}
.btn_sub {
	display: block;
	width: 90%;
	margin: auto;
	font-size: 14px; ;
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
