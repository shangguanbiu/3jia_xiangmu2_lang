<template>
	<view>

		<view class="page-section ">
			<view class="gongzi">
				<image :src="room_msg.big_img" style="width:100%; height: 400rpx;" mode='widthFix'>
				</image>
			</view>
			<view class="main_i">
				<view class="index_lanmu">
					<view class="index_lm_zi" @click="on_func_notice(roomitem)" v-for="(roomitem,index) in room_list"
						:key="index">
						<view class="index_lm_zim">
							<!-- <view class="index_lm_zim_tit">{{roomitem.name}}</view> -->
							<view class="index_lm_zim_tit" v-if="language_type=='zhCN'">{{roomitem.name}}</view>
							<view class="index_lm_zim_tit" v-if="language_type=='zh'">{{roomitem.name_zhCN}}</view>
							<view class="index_lm_zim_tit" v-if="language_type=='en'">{{roomitem.name_en}}</view>
							<view class="index_lm_zim_tit" v-if="language_type=='de'">{{roomitem.name_de}}</view>
							<view class="index_lm_zim_tit" v-if="language_type=='eyu'">{{roomitem.name_eyu}}</view>
							<view class="index_lm_zim_tit" v-if="language_type=='han'">{{roomitem.name_han}}</view>
							<view class="index_lm_zim_tit" v-if="language_type=='xby'">{{roomitem.name_xby}}</view>
							<view class="index_lm_zim_tit" v-if="language_type=='franch'">{{roomitem.name_french}}</view>
							<view class="index_lm_zim_tit" v-if="language_type=='japan'">{{roomitem.name_japan}}</view>
							<image :src="roomitem.img" style="width:100%; " mode='widthFix'>
							</image>
							<!-- :class="'index_lm_tit'+index" -->
							<!-- <view class="index_lm_tit_com">
								<view style="width: 70px; padding: 10px 10px 0 20px;">
									<image :src="roomitem.img" style="width:100%; " mode='widthFix'>
									</image>
								</view>
								<view class="index_lm_tit_t">
									{{roomitem.name}}
								</view>
								<view class="index_lm_tit_btn">
									<view class="btn_msg">底注：{{roomitem.limit_amount}}</view>
									<view class="btn_msg">准入：{{roomitem.limit_user_amount}}</view>
								</view>
							</view> -->
						</view>
					</view>


				</view>
			</view>
		</view>

		<van-toast id="van-toast"></van-toast>

	</view>
</template>

<script>
	import Toast from '@/wxcomponents/vant/dist/toast/toast';

	export default {
		data() {
			return {
				getitem: 0,
				indicatorDots: true,
				autoplay: true,
				interval: 3000,
				duration: 500,
				bannerdata: [require("@/static/image/index_top.png"), require("@/static/image/index_top.png")],
				indicatorColor: "#292b40",
				indicatorActiveColor: "#ffffff",
				show_team: false,
				team: '',
				get_data: '',
				compay_name: '正在获取中正在获取中',
				select_compay: false,
				compay_list: [],
				if_login_check: false,
				compay_id: '',
				index_ico: require("@/static/image/index.png"),
				index_ico_h: require("@/static/image/index_hover.png"),
				user_ico: require("@/static/image/usercenter.png"),
				user_ico_h: require("@/static/image/usercenter_hover.png"),
				room_list: [],
				pid: '',
				p_name: '',
				userinfo: {},
				room_msg:{},
				language_type:'zhCN',
				room_name:''
			}
		},
		methods: {
			async get_userInfo() {
				const res = await this.$myRuquest({
					url: '/api/front/user/getUserInfo',
					method: "POST",
				})
				if (res.code == 200) {
					this.userinfo = res.data
					
				}
			
			},
			async get_room_msg() {
				const res = await this.$myRuquest({
					url: '/api/front/room/getRoomInfo',
					method: "POST",
					data: {
						id: this.pid
					},
				})
				if (res.code == 200) {
					this.room_msg = res.data
					switch(this.language_type){
						case 'zh':
						this.room_name=this.room_msg.name_zhCN
						break;
						case 'zhCN':
						this.room_name=this.room_msg.name
						break;
						case 'en':
						this.room_name=this.room_msg.name_en
						break;
						case 'xby':
						this.room_name=this.room_msg.name_xby
						break;
						case 'han':
						this.room_name=this.room_msg.name_han
						break;
						case 'eyu':
						this.room_name=this.room_msg.name_eyu
						break;
						case 'japan':
						this.room_name=this.room_msg.name_japan
						break;
						case 'franch':
						this.room_name=this.room_msg.name_french
						break;
						case 'de':
						this.room_name=this.room_msg.name_de
						break;
					}
					
					uni.setNavigationBarTitle({
						title: this.room_name
					});
					
				}
			},
			async get_xiaoroom_info() {
				const res = await this.$myRuquest({
					url: '/api/front/room/getSubList',
					method: "POST",
					data: {
						pid: this.pid,
						page: 1,
						pagesize: 10
					},
				})
				if (res.code == 200) {
					this.room_list = res.data.list

				}
			},
			on_func_notice(data) {
				if (Number(data.limit_user_amount) > Number(this.userinfo.balance)) {
					Toast.fail(this.$t('room_m.in_limit'));//"您金額不足，不可進入"
					setTimeout(function() {
						Toast.clear()

					}, 1000)
					return
				} else {
					var lag_name
					if (this.language_type == 'zhCN') {
						lag_name = data.name
					} else if (this.language_type == 'zh') {
						lag_name = data.name_zhCN
					} else if (this.language_type == 'en') {
						lag_name = data.name_en
					} else if (this.language_type == 'japan') {
						lag_name = data.name_japan
					} else if (this.language_type == 'han') {
						lag_name = data.name_han
					} else if (this.language_type == 'franch') {
						lag_name = data.name_french
					} else if (this.language_type == 'de') {
						lag_name = data.name_de
					} else if (this.language_type == 'xby') {
						lag_name = data.name_xby
					} else if (this.language_type == 'eyu') {
						lag_name = data.name_eyu
					}
					
					uni.navigateTo({
						url: '/pages/room/room_M/room_M?pid=' + data.pid + '&id=' + data.id + '&p_name=' + this
							.p_name + '&sub_name=' + lag_name,
					});
				}



			},
			jump(type) {
				if (type == 1) {
					uni.navigateTo({
						url: '/pages/index/index',
					});
				} else {
					uni.navigateTo({
						url: '/pages/usercenter/usercenter',
					});
				}
			},
			onNavigationBarButtonTap(e) {
				//通过index区分点击了哪个
				if (e.index == 0) {
					uni.navigateTo({
						url: '/pages/room/wanfa/wanfa?id='+this.pid,
					});
				}

			}

		},
		onBackPress(event) {
			uni.navigateTo({
				url: '/pages/index/index'
			});
		
			return true
		},
		onLoad(option) {
			this.pid = option.pid
			this.p_name = option.room_name
			
			this.language_type=uni.getStorageSync('language')
						
			var had_token = uni.getStorageSync('token')
			if (had_token == '') {
				uni.navigateTo({
					url: '/pages/login/login',
				});
			} else {
				this.get_xiaoroom_info()
				this.get_room_msg()
				//this.userinfo = JSON.parse(uni.getStorageSync("userinfo"))
				
				
				
			}
		},
		onShow() {
			var had_token = uni.getStorageSync('token')
			if (had_token !== '') {
				this.get_userInfo()
			}
			

		}
	}
</script>
<style>
	/deep/ .uni-swiper-dots-horizontal {
		bottom: 80rpx;
	}

	.gongzi /deep/ uni-image>img {
		width: 100%;

	}

	/deep/ .van-action-sheet__item {
		background: #fff;

	}
</style>
<style scoped>
	.gongzi {
		margin-top: 0px;
	}

	.top_select {
		position: absolute;
		top: 48px;
		left: 10px;
		border-radius: 50px;
		height: 32px;
		width: 130px;
		background-color: rgba(0, 0, 0, 0.2);
		display: block;
		z-index: 99;
		display: flex;
		padding: 0px 15px;
		padding-right: 5px;
		color: #fff;
	}

	.com_name {
		line-height: 32px;
		padding: 0 5px;
		font-size: 13px;
	}

	page {
		background: #000000;
	}



	.page-section {
		position: relative;
	}

	.index_lanmu {
		height: auto;
		overflow: hidden;
		width: 100%;
		display: flex;
		flex-wrap: wrap
	}

	.index_lm_zi {
		width: 100%;
		margin: 5px auto;

	}

	.index_lm_zim {
		/* border-radius: 16rpx;
		height: 180rpx;
		background: #1E1C36;
		color: #fff; */
		display: block; width: 100%; height: auto; position: relative;
	}
	.index_lm_zim_tit{ position: absolute;top: 39px; left: 0; width: 100%; text-align: center; z-index: 80; color: #fff; font-size: 14px; line-height: 35px;}

	.index_lm_zim0 {

		background: url("../../static/image/index_gl_01s.png") no-repeat right bottom #EBEBFF;
		background-size: 43%;
		margin: 0px 0rpx 0rpx 0;
		border: 1px solid #E4E4FF;
	}

	.index_lm_zim1 {

		background: url("../../static/image/index_gl_02s.png") no-repeat right bottom #FFEFEB;
		background-size: 43%;
		margin: 0px 0px 0px 0rpx;
		border: 1px solid #FFE8E4;
	}

	.index_lm_zim2 {
		background: url("../../static/image/index_gl_03s.png") no-repeat right bottom #FFF7EB;
		background-size: 43%;
		margin: 0px 0rpx 0rpx 0;
		border: 1px solid #FBEDDD;
	}

	.index_lm_zim3 {
		background: url("../../static/image/index_gl_04s.png") no-repeat right bottom #EDFBF9;
		background-size: 43%;
		margin: 0px 0px 0px 0rpx;
		border: 1px solid #DAF8F3;
	}

	.index_lm_tit_com,
	.index_lm_tit1 {
		font-size: 28rpx;
		position: relative;
		color: #2E2E30;
		display: block;

		display: flex;
	}

	.index_lm_tit_btn {
		width: 100px;
		justify-content: center;
		align-items: center;
		padding: 0 20px;

	}

	.btn_msg {
		border-radius: 8px;

		color: #fff;
		font-size: 12px;
		text-align: center;
		line-height: 28px;
		margin-top: 12px;
		background: -webkit-gradient(linear, left top, right bottom, from(#CEB392), to(#B28C6B));
		background: linear-gradient(to bottom, #CEB392, #B28C6B);
	}

	.index_lm_tit_t {
		flex: 1;
		line-height: 95px;
		color: #fff;
	}

	.index_lm_tit0::after {
		content: '';
		left: 10px;
		top: 10px;
		height: 70px;
		width: 70px;
		position: absolute;

		background: url("../../static/image/room_vip1.png") no-repeat center;
		background-size: 100%;
	}

	.index_lm_tit1::after {
		content: '';
		left: 10px;
		top: 10px;
		height: 70px;
		width: 70px;
		position: absolute;

		background: url("../../static/image/room_vip2.png") no-repeat center;
		background-size: 100%;
	}

	.index_lm_tit2::after {
		content: '';
		left: 10px;
		top: 10px;
		height: 70px;
		width: 70px;
		position: absolute;

		background: url("../../static/image/room_vip3.png") no-repeat center;
		background-size: 100%;
	}

	.index_lm_tit3::after {
		content: '';
		left: 10px;
		top: 10px;
		height: 70px;
		width: 70px;
		position: absolute;

		background: url("../../static/image/index_gl_04.png") no-repeat center;
		background-size: 100%;
	}

	.banner {
		width: 750rpx;
		height: 482rpx;
		background-color: #0f0f27;

	}

	.banner .swiper {
		width: 750rpx;
		height: 482rpx !important;
	}

	.banner .swiper-item {
		width: 750rpx;
		height: 482rpx !important;
	}

	.banner .swiper-item image {
		display: block;
		width: 750rpx;
		height: 482rpx !important;
	}

	.main_ge {
		height: 30px;
		display: block;
		width: 100%;
		background: #3E3EF7;
	}

	.main_i {
		background: #000;
		border-radius: 44rpx 44rpx 0 0;
		padding: 20rpx 30rpx;

		display: block;
		width: calc(100% - 60rpx);

	}

	.title_line {
		color: #2E2E30;
		font-size: 32rpx;
		padding-left: 20rpx;
		position: relative;
		margin-bottom: 28rpx;
	}

	.selectitem {
		position: relative;
	}

	.selectitem::after {
		content: ;
		right: 10px;
		top: 10px;
	}

	.title_line::after {
		content: '';
		position: absolute;
		left: 2px;
		top: 0;
		background: #3E3EF7;
		height: 20px;
		width: 2px;
		border-radius: 5px;
	}

	.pop_are {
		height: auto;
		padding-top: 10px;
		width: calc(100vw - 32px);
		margin: auto;
		background: #fff;
		border-radius: 8px;
	}

	/deep/ .van-popup {
		z-index: 99999;
		background: none;
	}

	.input_are {
		width: calc(100vw - 96px);
		margin: auto;
		padding: 16px;

		background: #F7F8FC;
		border-radius: 8px;
	}

	.tit {
		font-size: 16px;
		text-align: center;
		line-height: 30px;
		padding-bottom: 10px;
	}

	.ft_btnline {

		padding: 16px 16px
	}



	/* // */
	.select_are {
		background-color: #ffffff;
		width: 100vw;
		height: 150px;
		overflow: hidden;
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
		display: flex;
		width: 100%;
		padding: 14px 0px;
		font-size: 16px;
		background-color: #fff;
		border: none;
		cursor: pointer;
		text-align: center;
		justify-content: center;
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
