<template>
	<view>
		<view class="title_line title_line2">
			<view class="title_lc">金額</view>
			<view class="title_lc">狀態</view>
			<view class="title_l">提交時間</view>

		</view>
		<view v-if="list.length !==0">
		<view  class="title_line" v-for="(listitem,indexs) in list" :key="indexs" :class="{'jiange':indexs%2 ==1}">
			<view class="title_lc" v-if="listitem.status==1">
				處理中
			</view>
			<view class="title_lc" v-if="listitem.status==2">
				成功
			</view>
			<view class="title_lc" v-if="listitem.status==3">
				失敗
			</view>
		</view>
		<view style="text-align: center; line-height: 50px; color: #ccc;">{{notice}}</view>
		</view>
		<view v-else class="listare li_are">
			<view class="empty_ico">
				<van-empty class="custom-image" :image="empty_img" description="暫無記錄..." />
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				page: 1,
				loadingType: 0,
				empty_img: require("@/static/image/empty_ico1.png"),
				loadingText: '加載中...',
				contentText: {
					contendown: '上拉显示更多',
					contenrefresh: '正在加载...',
					contennomore: '没有更多数据了',
				},
				timer: {},
				pagesize:21,
				notice:"上拉顯示更多",
			}
		},
		methods: {
			async getList(callBack) {

				

				const res = await this.$myRuquest({
					url: '/api/front/user/getWithdrawalList',
					method: "POST",
					data: {
						page: this.page,
						pagesize:  this.pagesize,
						
					},
				})
				if (res.code == 200) {
					this.list = [...this.list, ...res.data.data]
				}
				
				callBack && callBack()
				
			},
			async getmorelists() {
				this.notice='正在加載...'
				
				if (this.loadingType !== 0) { //loadingType!=0;直接返回
					return false
				}
				this.loadingType = 1
				uni.showNavigationBarLoading() //显示加载动画
				this.page++ 
				const res = await this.$myRuquest({
					url: '/api/front/user/getWithdrawalList',
					method: "POST",
					data: {
						page: this.page,
						pagesize: this.pagesize,
						
					},
				})
				if (res.code == 200) {

					// 得到数据之后 page+1
					if (this.page ==Number(res.data.last_page)) { // 没有数据
						this.loadingType = 2
						this.notice='沒有更多數據了'
						uni.hideNavigationBarLoading() // 关闭加载动画
						return
					}
					
					this.list = this.list.concat(res.data.data) //将数据拼接在一起
					this.loadingType = 0 // 将loadingType归0重置
					uni.hideNavigationBarLoading() // 关闭加载动画
				}

			}
		},
		onLoad() {

		},
		onShow() {
			var had_token=uni.getStorageSync('token')
			if(had_token ==''){
				uni.navigateTo({
					url: '/pages/login/login',
				});
			}else{
				this.list = []
				this.getList()
			}
		},
		onPullDownRefresh() {
			this.page = 1
			this.list = []
			this.getList().then(res => wx.stopPullDownRefresh())
		},
		onReachBottom() {
			this.getmorelists()

		}
	}
</script>

<style scoped>
	.title_line {
		height: auto;
		width: 100%;
		display: flex;
		line-height: 25px;
		font-size: 14px;
		padding: 5px 0;
		position: relative;
	}
.empty_ico {
		display: block;
		margin-top: 20px;
		color: #74778A;
	}
	.title_line::after {
		height: 1px;
		background: #eaeaea;
		width: 100%;
		position: absolute;
		left: 0;
		bottom: 0;
		content: '';
	}

	.title_line2 {
		background: #ccc;
	}

	.title_l {
		width: 153px;
		text-align: center;
	}

	.title_lc {
		text-align: center;
		padding: 0px 5px;
		flex: 1;
	}

	.value_m {
		border-radius: 50%;
		color: #fff;
		width: 25px;
		height: 25px;
		display: block;
		margin: auto;
	}

	.value_1 {
		background: #409eff;
	}

	.value_2 {
		background: #583212;
	}

	.jiange {
		background: #eaeaea;
	}
</style>
