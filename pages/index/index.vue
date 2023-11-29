<template>
	<view>
		<view class="index_topline">
			<view class="index_top_l" @click="to_notice">
				<view style="padding-top: 5px;">
					<image src="../../static/image/ding.png" style="width:25px;height: 25px;  margin-top: 3px; "
						mode='widthFix' />
				</view>
			</view>
			<view class="index_top_mdl"></view>
			<view class="index_top_r" @click="change_pop" v-if="get_yuyan.length !==1">
				<!-- {{$t("Language")}} -->
				<view class="lag_line" v-if="language_type=='zhCN'">
					<view class="lag_line_ico">
						<image :src="zhCN" style="width:100%; margin-top: 12px; " mode='widthFix' />
					</view>
					<view>繁体中文</view>
				</view>
				<view class="lag_line" v-if="language_type=='zh'">
					<view class="lag_line_ico">
						<image :src="zh" style="width:100%; margin-top: 12px; " mode='widthFix' />
					</view>
					<view>简体中文</view>
				</view>
				<view class="lag_line" v-if="language_type=='en'">
					<view class="lag_line_ico">
						<image :src="en" style="width:100%; margin-top: 12px; " mode='widthFix' />
					</view>
					<view>English</view>
				</view>
				<view class="lag_line" v-if="language_type=='japan'">
					<view class="lag_line_ico">
						<image :src="japan" style="width:100%; margin-top: 12px; " mode='widthFix' />
					</view>
					<view>Japanese</view>
				</view>
				<view class="lag_line" v-if="language_type=='han'">
					<view class="lag_line_ico">
						<image :src="han" style="width:100%; margin-top: 12px; " mode='widthFix' />
					</view>
					<view>Korean</view>
				</view>
				<view class="lag_line" v-if="language_type=='franch'">
					<view class="lag_line_ico">
						<image :src="franch" style="width:100%; margin-top: 12px; " mode='widthFix' />
					</view>
					<view>French</view>
				</view>
				<view class="lag_line" v-if="language_type=='de'">
					<view class="lag_line_ico">
						<image :src="de" style="width:100%; margin-top: 12px; " mode='widthFix' />
					</view>
					<view>German</view>
				</view>
				<view class="lag_line" v-if="language_type=='xby'">
					<view class="lag_line_ico">
						<image :src="xby" style="width:100%; margin-top: 12px; " mode='widthFix' />
					</view>
					<view>Spanish</view>
				</view>
				<view class="lag_line" v-if="language_type=='eyu'">
					<view class="lag_line_ico">
						<image :src="eyu" style="width:100%; margin-top: 12px; " mode='widthFix' />
					</view>
					<view>Russian</view>
				</view>

				<view class="language_pop" v-show="language_pop">
					<view class="lang_type" v-if="get_yuyan.includes('zhCN')" @click="change_langs('zh')">
						<view class="lag_line2">
							<view class="lag_line_ico">
								<image :src="zh" style="width:100%; margin-top: 3px;" mode='widthFix' />
							</view>
							<view>简体中文</view>
						</view>
					</view>
					<view class="lang_type" v-if="get_yuyan.includes('zh')" @click="change_langs('zhCN')">
						<view class="lag_line2">
							<view class="lag_line_ico">
								<image :src="zhCN" style="width:100%; margin-top: 3px;" mode='widthFix' />
							</view>
							<view>繁体中文</view>
						</view>
					</view>
					<view class="lang_type" v-if="get_yuyan.includes('en')" @click="change_langs('en')">
						<view class="lag_line2">
							<view class="lag_line_ico">
								<image :src="en" style="width:100%; margin-top: 3px;" mode='widthFix' />
							</view>
							<view>English</view>
						</view>
					</view>
					<view class="lang_type" v-if="get_yuyan.includes('japan')" @click="change_langs('japan')">
						<view class="lag_line2">
							<view class="lag_line_ico">
								<image :src="japan" style="width:100%; margin-top: 3px;" mode='widthFix' />
							</view>
							<view>Japanese</view>
						</view>
					</view>
					<view class="lang_type" v-if="get_yuyan.includes('han')" @click="change_langs('han')">
						<view class="lag_line2">
							<view class="lag_line_ico">
								<image :src="han" style="width:100%; margin-top: 3px;" mode='widthFix' />
							</view>
							<view>Korean</view>
						</view>
					</view>
					<view class="lang_type" v-if="get_yuyan.includes('franch')" @click="change_langs('franch')">
						<view class="lag_line2">
							<view class="lag_line_ico">
								<image :src="franch" style="width:100%; margin-top: 3px;" mode='widthFix' />
							</view>
							<view>French</view>
						</view>

					</view>
					<view class="lang_type" v-if="get_yuyan.includes('de')" @click="change_langs('de')">
						<view class="lag_line2">
							<view class="lag_line_ico">
								<image :src="de" style="width:100%; margin-top: 3px;" mode='widthFix' />
							</view>
							<view>German</view>
						</view>
					</view>
					<view class="lang_type" v-if="get_yuyan.includes('xby')" @click="change_langs('xby')">
						<view class="lag_line2">
							<view class="lag_line_ico">
								<image :src="xby" style="width:100%; margin-top: 3px;" mode='widthFix' />
							</view>
							<view>Spanish</view>
						</view>
					</view>
					<view class="lang_type" v-if="get_yuyan.includes('eyu')" @click="change_langs('eyu')">
						<view class="lag_line2">
							<view class="lag_line_ico">
								<image :src="eyu" style="width:100%; margin-top: 3px;" mode='widthFix' />
							</view>
							<view>Russian</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="page-section swiper">
			<view style="position: relative;">
				<swiper :indicator-dots="indicatorDots" :indicator-color="indicatorColor"
					:indicator-active-color="indicatorActiveColor" :autoplay="autoplay" :interval="interval"
					:duration="duration">
					<swiper-item v-for="(banner,indexbn) in bannerdata" :key="indexbn">
						<image :src="banner.img" mode='widthFix' style="width: 100%;"></image>
					</swiper-item>

				</swiper>
			</view>
			<view style="width: 100vw; display:flex; background-color: #fffbe8;">
				<!-- <van-notice-bar left-icon="volume-o" :scrollable="true" text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。" /> -->
				<view class="laba">
					<van-icon name="volume-o" />
				</view>
				<view class="announcement" style="flex:1">
					<view class="cont">
						<!-- @mouseover="stopScroll" @mouseout="startScroll" -->
						<view class="contlist" ref="contlist">
							<view class="contlistul" v-for="(item, index) in run_txt" @click="see_detail(item)"
								:key="index">
								<!-- <view class="contlistli">
									{{ item.title }}
								</view> -->
								<view class="contlistli" v-if="language_type=='zhCN'">{{item.title}}</view>
								<view class="contlistli" v-if="language_type=='zh'">{{item.title_zhCN}}</view>
								<view class="contlistli" v-if="language_type=='en'">{{item.title_en}}</view>
								<view class="contlistli" v-if="language_type=='de'">{{item.title_de}}</view>
								<view class="contlistli" v-if="language_type=='eyu'">{{item.title_eyu}}</view>
								<view class="contlistli" v-if="language_type=='han'">{{item.title_han}}</view>
								<view class="contlistli" v-if="language_type=='xby'">{{item.title_xby}}</view>
								<view class="contlistli" v-if="language_type=='franch'">{{item.title_french}}</view>
								<view class="contlistli" v-if="language_type=='japan'">{{item.title_japan}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>

			<view class="main_i">

				<view class="title_line">{{$t("Index_menu1")}}</view>
				<view class="index_lanmu" v-if="if_long">
					<view class="index_lm_long" @click="on_func_notice(roomitem)" v-for="(roomitem,indexl) in room"
						:key="indexl">
						<view class="index_lm_zim">
							<image :src="roomitem.img" style="width:100%; height: auto;" mode='widthFix'>
							</image>
						</view>
					</view>
				</view>
				<view class="index_lanmu" v-else>
					<view class="index_lm_zi" @click="on_func_notice(roomitem)" v-for="(roomitem,index) in room"
						:key="index">
						<view class="index_lm_zim" style="position: relative;"
							:class="{'index_lm_ziml':index==0||index==2}">
							<image :src="roomitem.img" style="width:100%;height: auto; " mode='widthFix'>
							</image>
							<view class="new_title_Line">
								<view class="new_txt" style="font-size: 22px;" v-if="language_type=='zhCN'">
									{{roomitem.name}}
								</view>
								<view class="new_txt" style="font-size: 22px;" v-if="language_type=='zh'">
									{{roomitem.name_zhCN}}
								</view>
								<view class="new_txt" v-if="language_type=='en'">{{roomitem.name_en}}</view>
								<view class="new_txt" v-if="language_type=='de'">{{roomitem.name_de}}</view>
								<view class="new_txt" v-if="language_type=='eyu'">{{roomitem.name_eyu}}</view>
								<view class="new_txt" v-if="language_type=='han'">{{roomitem.name_han}}</view>
								<view class="new_txt" v-if="language_type=='xby'">{{roomitem.name_xby}}</view>
								<view class="new_txt" v-if="language_type=='franch'">{{roomitem.name_french}}</view>
								<view class="new_txt" v-if="language_type=='japan'">{{roomitem.name_japan}}</view>
							</view>
						</view>
					</view>
				</view>

			</view>

		</view>
		<!-- <van-action-sheet :show="select_compay" :actions="compay_list" :round="false" @cancel="onClose" @select="onSelect" 
			cancel-text="取消">
		</van-action-sheet> -->

		<van-toast id="van-toast"></van-toast>
		<van-dialog use-slot :title="$t('Noitce')" :show="show_login" :showCancelButton="true"
			:cancelButtonText="$t('Close')" :confirmButtonText="$t('To_Login')" :zIndex='91' @confirm="noOk"
			@cancel="onClose" confirm-button-color="#409eff">
			<view class="msg_are">
				{{$t("No_login")}}
			</view>
		</van-dialog>
		<view class="nav_bar" v-show="!select_compay">
			<view class="nav_zi">
				<view>
					<image :src="index_ico_h" style="width:24px; height: 24px;" mode='widthFix'>
					</image>
				</view>
				<view class="nav_hover">{{$t("Home")}}</view>
			</view>
			<view class="nav_zi" @click="jump(2)">
				<view>
					<image :src="cz_ico" style="width:24px; height: 24px;" mode='widthFix'>
					</image>
				</view>
				<view>{{$t("Recharge")}}</view>
			</view>
			<view class="nav_zi" @click="jump(3)">
				<view>
					<image :src="kf_ico" style="width:24px; height: 24px;" mode='widthFix'>
					</image>
				</view>
				<view>{{$t("Service")}}</view>
			</view>
			<view class="nav_zi" @click="jump(4)">
				<view>
					<image :src="user_ico" style="width:24px; height: 24px;" mode='widthFix'>
					</image>
				</view>
				<view>{{$t("My")}}</view>
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
				if_long: false,
				scrollW: 0,
				show_login: false,
				indicatorDots: true,
				autoplay: true,
				interval: 3000,
				duration: 500,
				bannerdata: [require("@/static/image/banner1.png"), require("@/static/image/banner2.png"), require(
					"@/static/image/banner3.png")],
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

				index_ico: require("@/static/image/shouye.png"),
				index_ico_h: require("@/static/image/shouye_hover.png"),
				cz_ico: require("@/static/image/chongzhi.png"),
				cz_ico_h: require("@/static/image/chongzhi_hover.png"),
				kf_ico: require("@/static/image/kefu.png"),
				kf_ico_h: require("@/static/image/kefu_hover.png"),
				user_ico: require("@/static/image/wode.png"),
				user_ico_h: require("@/static/image/wode_hover.png"),
				index_ft_bg: require("@/static/image/logo_mg.png"),
				en: require("@/static/image/english.png"),
				de: require("@/static/image/de.png"),
				eyu: require("@/static/image/eyu.png"),
				franch: require("@/static/image/franch.png"),
				han: require("@/static/image/han.png"),
				xby: require("@/static/image/xby.png"),
				japan: require("@/static/image/japan.png"),
				zh: require("@/static/image/cn.png"),
				zhCN: require("@/static/image/zhcn.png"),
				room: [],
				list: [],
				run_txt: [],
				userinfo: {},
				language_pop: false,
				language: [{
						keyword: 'zh',
						name: '中文'
					},
					{
						keyword: 'zhCN',
						name: '繁体中文'
					},
					{
						keyword: 'en',
						name: 'English'
					},
					{
						keyword: 'japan',
						name: 'Japanese'
					},
					{
						keyword: 'han',
						name: 'Korean'
					},
					{
						keyword: 'franch',
						name: 'French'
					},
					{
						keyword: 'de',
						name: 'German'
					},
					{
						keyword: 'xby',
						name: 'Spanish'
					},
					{
						keyword: 'eyu',
						name: 'Russian'
					}
				],
				get_yuyan: [],
				language_type: 'zhCN'
			}
		},
		methods: {
			change_pop() {
				this.language_pop = !this.language_pop
			},
			change_langs(value) {
				this.$i18n.locale = value
				uni.setStorageSync('language', value)
				this.language_type = value
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
			see_detail(data) {
				// var had_token = uni.getStorageSync('token')
				// if (had_token == '') {
				// 	this.show_login = !this.show_login
				// 	return
				// }
				uni.navigateTo({
					url: './detail/detail?id=' + data.id,
				});

			},
			on_func_notice(data) {

				var had_token = uni.getStorageSync('token')
				if (had_token == '') {
					this.show_login = !this.show_login
					//return
				} else if (this.userinfo.level == 0 || this.userinfo.level == undefined) {


					Toast.fail(this.$t('index.no_level'));


					//return
				} else if (Number(data.member_level_limit) > Number(this.userinfo.level)) {

					Toast.fail(this.$t('index.no_levellimt'));
					//
					// setTimeout(function() {
					// 	Toast.clear()
					// }, 1000)

					//return

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
						url: '/pages/room/room?pid=' + data.id + '&room_name=' + lag_name,
					});
				}

			},
			jump(type) {
				if (type == 1) {
					uni.navigateTo({
						url: '/pages/index/index',
					});
				} else if (type == 2) {
					uni.navigateTo({
						url: '/pages/recharge/recharge',
					});
				} else if (type == 3) {
					uni.navigateTo({
						url: '/pages/kefu/kefu_index',
					});
				} else if (type == 4) {
					uni.navigateTo({
						url: '/pages/usercenter/usercenter',
					});
				}
			},
			async get_room_info() {
				const res = await this.$myRuquest({
					url: '/api/front/room/getList',
					method: "POST",
					data: {
						page: 1
					},
				})
				if (res.code == 200) {
					this.room = res.data.list

				}
			},
			async get_Languages() {
				const res = await this.$myRuquest({
					url: '/api/front/index/getLanguages',
					method: "POST",
					data: {
						page: 1
					},
				})
				if (res.code == 200) {
					this.get_yuyan = res.data.languages


				}
			},

			async get_banner(type_id) {
				var _this = this
				const res = await this.$myRuquest({
					url: '/api/front/notice/getList',
					method: "POST",
					data: {
						type: type_id
					},

				})
				if (res.code == 200) {

					if (type_id == 1) {
						_this.bannerdata = res.data.list
					} else if (type_id == 2) {
						_this.run_txt = res.data.list
					}
				}
			},
			onClose() {
				this.show_login = !this.show_login
			},
			noOk() {
				uni.navigateTo({
					url: '/pages/login/login',
				});
			},
			to_notice() {
				uni.navigateTo({
					url: '/pages/notice/notice',
				});
			},
			onNavigationBarButtonTap(e) {
				var had_token = uni.getStorageSync('token')
				if (had_token !== '') {
					if (e.index == 0) {
						uni.navigateTo({
							url: '/pages/notice/notice',
						});
					} else {
						uni.navigateTo({
							url: '/pages/login/login',
						});
					}
				} else {
					this.show_login = true
				}

			},
			getRefs() {
				let that = this
				return new Promise((resolve, reject) => {
					resolve(that.$refs)
				})
			},
			//鼠标悬停，停止滚动
			stopScroll() {
				var target = this.$refs.contlist;
				clearInterval(this.scrollTime);
			},
			//鼠标移开 ，接着滚动
			startScroll() {
				//var target = this.$refs.contlist;
				this.getRefs().then(res => {
					//that.top_height = res.contlist.$el.offsetHeight
					this.scrollW = res.contlist.$el.offsetLeft
				})
				// 移开时记录向左移动的距离
				this.scroll();
			},
			//循环滚动
			scroll() {
				var that = this; //因为定时器里要使用vue对象时不能用this, 在定时器中的 this 代表
				var target
				this.getRefs().then(res => {
					//that.top_height = res.contlist.$el.offsetHeight
					target = res.contlist.$el
				})

				var initLeft = 0;
				if (this.scrollW < 0) {
					initLeft = this.scrollW * -1;
				}
				//定时器
				this.scrollTime = setInterval(function() {
					initLeft++;
					if (initLeft >= target.offsetWidth / 2) {
						initLeft = 0;
					}
					target.style.left = "-" + initLeft + "px"; //获取不到translateX的值改用 left

					//target.style = 'transform: translateX(-'+ initLeft +'px)';
				}, 16);
			},
			async get_kefu_url() {
				const res = await this.$myRuquest({
					url: '/api/front/index/getKefuUrl',
					method: "POST",
					data: {
						page: 1
					},
				})
				if (res.code == 200) {

					if (Number(res.data.if_long) !== 1) {
						this.if_long = true
					} else {
						this.if_long = false
					}


				}
			},

		},
		onLoad() {
			this.getRefs()
			this.scroll()
			this.get_banner(1)
			this.get_banner(2)
			this.get_kefu_url()
			this.get_Languages()
		},
		onShow() {
			this.show_login = false
			var had_token = uni.getStorageSync('token')
			this.language_type = uni.getStorageSync('language')
			if (had_token !== '') {
				this.get_userInfo()
				//this.userinfo = JSON.parse(uni.getStorageSync("userinfo"))
			}
			this.get_room_info()
			this.language_pop = false


		}
	}
</script>
<style>
	/deep/ .uni-swiper-dots-horizontal {
		bottom: 20rpx;
	}

	.gongzi /deep/ uni-image>img {
		width: 100%;

	}

	/deep/ .van-action-sheet__item {
		background: #fff;

	}
</style>
<style scoped>
	.lag_line {
		display: flex;
		justify-content: flex-end;
	}

	.lag_line2 {
		display: flex;
		justify-content: center
	}

	.lag_line_ico {
		width: 20px;
		height: 20px;
		margin-right: 5px;
	}

	.new_title_Line {
		position: absolute;
		left: 0;
		bottom: 25px;
		width: 100%;
	}

	.new_txt {
		text-align: center;
		color: #fff;
		font-size: 21px;
	}

	.index_topline {
		width: 100%;
		display: flex;
		background: url("../../static/image/new_top.png") no-repeat center;
		background-size: 100%;
	}

	.index_top_l {
		width: 50px;
		height: 44px;
		text-align: center;

		color: #fff;

	}

	.index_top_r {
		width: 30%;
		height: 44px;
		text-align: right;
		line-height: 44px;
		padding-right: 10px;
		color: #fff;
		position: relative;

	}

	.language_pop {
		position: absolute;
		right: 5px;
		top: 43px;
		width: 100px;
		background: #fff;
		border-radius: 15px;
		z-index: 80;
		padding: 10px 0;
	}

	.lang_type {
		font-size: 13px;
		color: #000;
		text-align: center;
		line-height: 25px;
	}

	.index_top_mdl {
		flex: 1;
		display: block;
		text-align: center;
	}

	.laba {
		width: 40px;
		line-height: 40px;
		text-align: center;
		background-color: #fffbe8;
		color: #ed6a0c;
	}

	.cont {
		height: 40px;
		line-height: 40px;
		background-color: #fffbe8;
		color: #ed6a0c;
		font-size: 14px;
		overflow: hidden;
		position: relative;
	}

	.contlist {
		position: absolute;
		white-space: nowrap;
		display: flex;
		flex-direction: row;
	}

	.contlistul {
		display: flex;
		flex-direction: row;
	}

	.contlistli {
		font-size: 12px;
		margin-right: 25px;
		height: 40px;
		line-height: 40px;
		display: flex;
		flex-direction: row;
	}

	.contlistem {
		color: #f80;
		font-size: 12px;
		padding-right: 10px;
	}

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
		background: #000;

	}

	.gongzi {
		margin-bottom: 28rpx;
	}

	.page-section {
		position: relative;
	}

	.index_lanmu {
		height: auto;
		overflow: hidden;
		width: 100%;
		display: flex;
		flex-wrap: wrap;

	}

	.index_lm_zi {
		width: 50%;
		margin: 5px auto;
	}

	.index_lm_long {
		width: 100%;
		margin: 5px auto;

		display: block;

	}

	.index_lm_zim {
		border-radius: 16rpx;
		height: auto;
		padding-left: 5px;

	}

	.index_lm_ziml {
		padding-right: 5px;
		padding-left: 0px;
	}

	.index_lm_zim image {
		width: 100%;
		display: block;
	}

	.index_lm_zim1 {

		background: url("../../static/image/index_gl_01s.png") no-repeat right bottom #EBEBFF;
		background-size: 43%;
		margin: 0px 20rpx 20rpx 0;
		border: 1px solid #E4E4FF;
	}

	.index_lm_zim2 {

		background: url("../../static/image/index_gl_02s.png") no-repeat right bottom #FFEFEB;
		background-size: 43%;
		margin: 0px 0px 0px 20rpx;
		border: 1px solid #FFE8E4;
	}

	.index_lm_zim3 {
		background: url("../../static/image/index_gl_03s.png") no-repeat right bottom #FFF7EB;
		background-size: 43%;
		margin: 0px 0rpx 20rpx 0;
		border: 1px solid #FBEDDD;
	}

	.index_lm_zim4 {
		background: url("../../static/image/index_gl_04s.png") no-repeat right bottom #EDFBF9;
		background-size: 43%;
		margin: 0px 0px 0px 20rpx;
		border: 1px solid #DAF8F3;
	}

	.index_lm_tit1 {
		font-size: 28rpx;
		position: relative;
		color: #2E2E30;
		display: block;
		line-height: 144rpx;
		padding-left: 100rpx;
	}

	.index_lm_tit1::after {
		content: '';
		left: 8%;
		top: 27%;
		height: 35px;
		width: 35px;
		position: absolute;

		background: url("../../static/image/index_gl_01.png") no-repeat center;
		background-size: 100%;
	}

	.index_lm_tit2::after {
		content: '';
		left: 8%;
		top: 27%;
		height: 35px;
		width: 35px;
		position: absolute;

		background: url("../../static/image/index_gl_02.png") no-repeat center;
		background-size: 100%;
	}

	.index_lm_tit3::after {
		content: '';
		left: 8%;
		top: 27%;
		height: 35px;
		width: 35px;
		position: absolute;

		background: url("../../static/image/index_gl_03.png") no-repeat center;
		background-size: 100%;
	}

	.index_lm_tit4::after {
		content: '';
		left: 8%;
		top: 27%;
		height: 35px;
		width: 35px;
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
		background: #583212;
	}

	.main_i {
		/* background: #F7F8FC; */
		border-radius: 44rpx 44rpx 0 0;
		padding: 20rpx 20rpx;

		display: block;
		width: calc(100% - 40rpx);

		padding-top: 25px;
		border-radius: 20px 20px 0 0;
		z-index: 90;
		/* position: absolute;
		left: 0;
		bottom: -730rpx; */
	}

	.title_line {
		/* color: #2E2E30; */
		color: #EAC477;
		font-size: 32rpx;
		padding-left: 20rpx;
		position: relative;
		margin-bottom: 28rpx;
		line-height: 21px;
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
		background: #EAC477;
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



	.input_are {
		width: calc(100vw - 96px);
		margin: auto;
		padding: 16px;

		/* background: #F7F8FC; */
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
