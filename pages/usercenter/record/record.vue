<template>
	<view>
		<view class="title_line title_line2">
			<view class="title_lc">類型</view>
			<view class="title_lc">金額</view>

			<view class="title_l">變動時間</view>

		</view>
		<view  v-if="list.length !==0">
		<view class="title_line" v-for="(qishuitem,indexs) in list" :key="indexs" :class="{'jiange':indexs%2 ==1}">
			<view class="title_lc" v-if="qishuitem.type==1">充值</view>
			<view class="title_lc" v-if="qishuitem.type==2">提現</view>
			<view class="title_lc" v-if="qishuitem.type==3">投注</view>
			<view class="title_lc" v-if="qishuitem.type==4">中獎</view>
			<view class="title_lc jian_money"  v-if="qishuitem.type==2||qishuitem.type==3">{{qishuitem.amount}}</view>
			<view class="title_lc add_money" v-if="qishuitem.type==1||qishuitem.type==4">{{qishuitem.amount}}</view>
			<view class="title_l">
				{{qishuitem.create_time}}
			</view>
		</view>
		</view>
		<view v-else class="listare li_are">
			<view class="empty_ico">
				<van-empty class="custom-image" :image="empty_img" description="暂无记录..." />
			</view>
		</view>
		<view style="text-align: center; line-height: 50px; color: #ccc;">{{notice}}</view>
		<van-popup :show="show" position="right" custom-style="height: 100%;width:300px;background:#f8f8f8 ">
			<view class="sukh1">明細篩選</view>
			<view class="sukmain">
				<view class="sukmaintit">資金類型</view>
				<view class="select_lineare">
					<view class="typezi" v-for="(datatm, tpindex) in typadata" @click="gettype(1, tpindex,datatm.id)"
						:key="tpindex" :class="{ typeziget: cur1 == tpindex }">
						{{ datatm.name }}
					</view>
				</view>
				<view class="sukmaintit">變動時間</view>
				<view class="select_lineare">
					<view class="typezi" v-for="(datatm, tmindex) in timedata" @click="gettype(2, tmindex,datatm.id)"
						:key="tmindex" :class="{ typeziget: cur2 == tmindex }">
						{{ datatm.name }}
					</view>
				</view>
			</view>
			<view class="popft">
				<view class="select_lineare">
					<view class="typezi" @click="openType()"
						style="border-radius: 5px; width: 40%; text-align: center;">取消</view>
					<view class="typezi typeziget" style="border-radius: 5px; width: 40%;text-align: center;" @click="getList">
						確定</view>
				</view>
			</view>
		</van-popup>
		<view class="gettypebtn" @click="openType()">
			<van-icon name="filter-o" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				qishu: [],
				page: 1,
				type:'',
				time_type:'',
				loadingType: 0,
				loadingText: '加載中...',
				empty_img: require("@/static/image/empty_ico1.png"),
				contentText: {
					contendown: '上拉显示更多',
					contenrefresh: '正在加载...',
					contennomore: '没有更多数据了',
				},
				timer: {},
				typadata: [{
						id: '',
						name: "全部"
					},
					{
						id: 1,
						name: "充值"
					},
					{
						id: 2,
						name: "提現"
					},
					{
						id: 3,
						name: "投注"
					},
					{
						id: 4,
						name: "中獎"
					}
				],
				timedata: [{
						id: '',
						name: "全部"
					},
					{
						id: 1,
						name: "近1周"
					},
					{
						id: 2,
						name: "近1個月"
					},
				],
				cur1: 0,
				cur2: 0,
				show: false,
				pagesize:21,
				notice:"上拉顯示更多",
				list:[],
			}
		},
		methods: {
			async getList(callBack) {
				this.show=false
				this.list=[]
				const res = await this.$myRuquest({
					url: '/api/front/user/getBalanceRecord',
					method: "POST",
					data: {
						page: this.page,
						pagesize: this.pagesize,
						type:this.type,
						time_type:this.time_type
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
			this.page++ // 得到数据之后 page+1
				const res = await this.$myRuquest({
					url: '/api/front/user/getBalanceRecord',
					method: "POST",
					data: {
						page: this.page,
						pagesize: this.pagesize,
						type:this.type,
						time_type:this.time_type
					},
				})
				if (res.code == 200) {
			
					
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
			
			},
			openType() {
				this.show = !this.show;
			},
			gettype(type, val,id) {
				if (type == 1) {
					this.cur1 = val;
					this.type=id
				}
				if (type == 2) {
					this.cur2 = val;
					this.time_type=id
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
	/deep/ .van-fade-enter-active,
	.van-fade-leave-active {
		z-index: 91;
	}
	
	/deep/ .custom-class {
		z-index: 200;
	}
	
	.select_lineare {
		display: flex;
		justify-content: space-around;
	}
	
	.sel_span {
		background: #fff;
		border-radius: 20px;
		padding: 5px 10px;
	}
	
	.jian_money {
		color: #53D6C4;
	}

	.add_money {
		color: #f73131;
	}

	.title_line {
		height: auto;
		width: 100%;
		display: flex;
		line-height: 25px;
		font-size: 14px;
		padding: 5px 0;
		position: relative;
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

	.gettypebtn {
		height: 27px;
		width: 35px;
		border-radius: 50%;
		position: fixed;
		right: 20px;
		bottom: 50px;
		background: #ea4036;
		color: #fff;
		font-size: 20px;
		padding-top: 8px;
		text-align: center;
	}

	.sukmain {
		height: auto;
		overflow: hidden;
		padding: 10px;
		background: #fff;
	}

	.sukh1 {
		font-weight: bold;
		font-size: 14px;
		padding-left: 10px;
		background: #f8f8f8;
		line-height: 40px;
		color: #000;
	}

	.sukmaintit {
		font-size: 14px;
		padding-left: 10px;
		line-height: 40px;
		color: #000;
		padding-top: 30px;
	}

	.typezi {
		background: #f6f6f6;
		padding: 7px 10px;
		border-radius: 20px;
		color: #555;
		margin-bottom: 10px; font-size: 14px;
	}

	.typeziget {
		background: #e93340;
		color: #fff;
	}

	.popft {
		position: fixed;
		left: 0;
		bottom: 0;
		background: #fff;
		height: auto;
		overflow: hidden;
		width: 100%;
		padding-top: 10px;
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
