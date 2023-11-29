<template>
	<view>
		<view class="rizi_top">
			<view class="rizi_line">
				<view class="tit_l">
					<view class="r_rr">
						<van-icon name="notes-o"></van-icon>
					</view>年度工资列表
				</view>
				<view class="tit_day">
					<view class="r_rl">
						<van-icon name="notes-o"></van-icon>
					</view>
					<view class="r_year" @click="ifdown=true">{{year}}年</view>
					<view class="r_dowm" @click="ifdown=true" v-if="!ifdown==true">
						<van-icon name="arrow-down"></van-icon>
					</view>
					<view class="r_dowm" @click="ifdown=false" v-else="ifdown">
						<van-icon name="arrow-up"></van-icon>
					</view>
				</view>
			</view>
		</view>
		<view class="listare">
			<view v-if="list.length !==0">
				<view class="li_are" v-for="(listitem,k) in list" :key="k">
					<view class="li_a_top">
						<van-tag plain v-if="listitem.iConfirmType" size="large" type="success">已确认</van-tag>
						<van-tag plain v-else size="large" type="warning ">未确认</van-tag>

						<view class="li_tit">{{listitem.iSettlementYear}}年{{listitem.iSettlementMonth}}月工资单</view>
						<view @click="see_detail(listitem)" class="li_more">明细>></view>

					</view>
					<van-divider />
					<view class="li_a_top money_line">
						<view class="li_money">
							<view class="li_moneytt">应发工资（元）：</view>
							<view v-if="!listitem.ifsee" style="padding-top:5px">******</view>
							<view v-else>{{formatNum(listitem.fMoney)}}</view>
						</view>
						<view class="li_see" v-if="!listitem.ifsee" @click="see_money(k)">
							<van-icon name="closed-eye" />
						</view>
						<view class="li_see" v-else @click="see_money(k)">
							<van-icon name="eye-o" />
						</view>
					</view>
				</view>
			</view>
			<view v-else class="listare li_are">
				<view class="empty_ico">
					<van-empty class="custom-image" :image="empty_img" description="你还没有任何工资单记录..." />
				</view>
			</view>
		</view>
		<van-popup :show="ifdown" position="bottom" :lock-scroll="true" custom-style="height: 46%;"
			bind:close="onClose">
			<!-- catch:touchstart -->
			<van-picker :columns="columns" :default-index="data_index" @cancel="onClose" @confirm="onSelect" show-toolbar>
			</van-picker>

		</van-popup>

		<van-toast id="van-toast"></van-toast>
	</view>
</template>

<script>
	import Toast from '@/wxcomponents/vant/dist/toast/toast';
	export default {
		data() {
			return {
				year: 0,
				data_index:0,
				ifdown: false,
				ifpop: false,
				page: 1,
				loadingType: 0,
				loadingText: '加载中...',
				contentText: {
					contendown: '上拉显示更多',
					contenrefresh: '正在加载...',
					contennomore: '没有更多数据了',
				},
				timer: {},
				minDate: 1546275676,
				columns: [],
				empty_img: require("@/static/image/empty_ico1.png"),
				list: []
			}
		},
		methods: {
			see_money(index) {
				this.list[index].ifsee = !this.list[index].ifsee
			},
			see_detail(data) {
				uni.navigateTo({
					url: '../detail/detail?id=' + data.id+'&title='+data.iSettlementYear+'年'+data.iSettlementMonth+'月工资单',
				});
				
			},
			onChange(event) {
				console.log(event)
			},
			onClose() {
				this.ifdown = false
			},
			onSelect(event) {
				this.ifdown = false
				this.year = event.detail.value
				Toast.loading({
					duration: 0,
					message: '加载中...',
					forbidClick: true,
				});
				this.list = []
				this.getList()
			},
			async getList(callBack) {

				var compay_name = uni.getStorageSync('compay_name')

				const res = await this.$myRuquest({
					url: '/api/app/yTLittleProgram/pagerList?iYear=' + this.year,
					header: {
						Authorization:"Bearer "+ uni.getStorageSync('ifLogin'),
						"content-type": 'application/json'
					}
				})
				if (res.code == 200) {
					this.list = [...this.list, ...res.data]
				}
				Toast.clear();
				callBack && callBack()
				this.list.forEach(elem => {
					this.$set(elem, 'ifsee', false)
				})
			},
			formatNum(value) {
				if (!value && value !== 0) return 0;
				let str = value.toString();
				let reg =
					str.indexOf(".") > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g;
				return str.replace(reg, "$1,");
			},
			async getmorelists() {
				if (this.loadingType !== 0) { //loadingType!=0;直接返回
					return false
				}
				this.loadingType = 1
				uni.showNavigationBarLoading() //显示加载动画

				const res = await this.$myRuquest({
					url: '/api/app/settlementDriverWagesInfo/pagerList?iSettlementYear=' + this.year +
						'&page=' + this.page
				})
				if (res.code == 200) {

					this.page++ // 得到数据之后 page+1
					if (res.data.rows.length < 1) { // 没有数据
						this.loadingType = 2
						uni.hideNavigationBarLoading() // 关闭加载动画
						return
					}
					this.page++ // 每触底一次 page +1
					this.list = this.list.concat(res.data.rows) //将数据拼接在一起
					this.loadingType = 0 // 将loadingType归0重置
					uni.hideNavigationBarLoading() // 关闭加载动画
				}

			}


		},
		onLoad() {
			this.getList()
			const b = new Date();
			this.year=b.getFullYear()
			this.columns.push(this.year-1)
			for (let i = 0; i < 5; i++) {
				this.columns.push(this.year+i)
			}
			 this.columns.forEach((element, index) => {
				 if(element==this.year){
					 this.data_index=index
				 }
			 })
			
		},
		onPullDownRefresh() {
			this.page = 1
			this.list = []
			this.getList().then(res=>wx.stopPullDownRefresh())
		},
		onReachBottom() {
			if (this.timer !== null) {
				clearTimeout(this.timer)
			}
			this.timer = setTimeout(() => {
				this.getmorelists()
			}, 1000)

		}
	}
</script>

<style scoped>
	page {
		background: #F7F8FC;
	}

	/deep/ .van-popup {
		z-index: 99999;
	}

	/deep/ .van-empty__image {
		width: 230px;
		height: 230px;
	}

	.rizi_top {
		height: 110px;
		background: #3E3EF7;
		border-radius: 0 0 22px 22px;

	}

	.rizi_line {

		display: flex;
		justify-content: space-between;
		padding: 10px 0;

	}

	.tit_l {
		font-size: 16px;
		color: #fff;
		padding: 0px 15px;
		position: relative;
		line-height: 30px;
		display: flex;
	}


	.tit_day {
		background: #fff;
		border-radius: 17px;
		display: flex;
		padding: 5px 15px;
		margin-right: 15px;
	}

	.r_rr {
		color: #fff;
		font-size: 22px;
		margin-right: 5px;
	}

	.r_rl {
		color: #3E3EF7;
		font-size: 22px;
	}

	.r_year {
		font-size: 14px;
		padding: 0 10px;
		line-height: 28px;
	}

	.r_dowm {
		color: #74778A;
		font-size: 18px;
		line-height: 28px;
		padding-left: 5px;
	}

	.listare {
		height: auto;
		width: 90%;
		margin: auto;
		margin-top: -30px;
	}

	.li_are {
		height: auto;
		overflow: hidden;
		width: calc(100% - 64rpx);
		border-radius: 8px;
		padding: 16px;
		background: #fff;
		margin-bottom: 15px;
	}

	.li_a_top {
		display: flex;
		width: 100%;
		justify-content: flex-start
	}

	.li_tit {
		padding-left: 15px;
		flex-grow: 2
	}

	.li_more {
		color: #74778A;
		font-size: 13px;
		line-height: 24px;
	}

	.li_money {
		flex-grow: 2;
		font-size: 24px;
		display: flex;
	}

	.li_moneytt {
		font-size: 13px;
		color: #74778A;
		line-height: 31px;
	}

	.li_see {
		line-height: 31px;
		font-size: 24px;
	}

	.money_line {
		margin-top: 20px;
		margin-bottom: 20px;
		height: 40px;
	}

	.empty_ico {
		display: block;
		margin-top: 20px;
		color: #74778A;
	}
</style>
