<template>
	<view>
		<view v-if="language_type=='zhCN'||language_type=='zh'">
			<view class="title_line title_line2">
				<view class="title_l">{{$t('zoushi.qihao')}}</view>
				<view class="title_lc">{{$t('zoushi.zhi')}}</view>
				<view class="title_lc">{{$t('zoushi.da')}}</view>
				<view class="title_lc">{{$t('zoushi.xiao')}}</view>
				<view class="title_lc">{{$t('zoushi.dan')}}</view>
				<view class="title_lc">{{$t('zoushi.shuang')}}</view>
			</view>
			<view v-if="list.length !==0">
				<view class="title_line" v-for="(qishuitem,indexs) in list" :key="indexs"
					:class="{'jiange':indexs%2 ==1}">
					<view class="title_l">{{qishuitem.open_no}}</view>
					<view class="title_lc">{{qishuitem.number_sum}}</view>
					<view class="title_lc">
						<view v-if="qishuitem.number_sum>14||qishuitem.number_sum==14" class="value_m value_1">
							{{$t('zoushi.da')}}
						</view>
						<view v-else>-</view>

					</view>
					<view class="title_lc">
						<view v-if="qishuitem.number_sum<13 ||qishuitem.number_sum==13" class="value_m value_1">
							{{$t('zoushi.xiao')}}
						</view>
						<view v-else>-</view>


					</view>
					<view class="title_lc">
						<view v-if="qishuitem.number_sum % 2 === 1" class="value_m value_2">{{$t('zoushi.dan')}}
						</view>
						<view v-else>-</view>


					</view>
					<view class="title_lc">

						<view v-if="qishuitem.number_sum% 2 === 0" class="value_m value_2">{{$t('zoushi.shuang')}}
						</view>
						<view v-else>-</view>
					</view>
				</view>
				<view style="text-align: center; line-height: 50px; color: #ccc;">{{notice}}</view>
			</view>
		</view>
		<view v-else>
			<view v-if="list.length !==0">
				<view v-for="(qishuitem,indexs) in list" :key="indexs" :class="{'jiange':indexs%2 ==1}">
					<view class="title_line_no_after ">
						<view class="title_l">{{$t('zoushi.qihao')}}</view>
						<view class="title_lc">{{$t('zoushi.zhi')}}</view>
					</view>
					<view class="title_line_no_after title_line3">
						<view class="title_l ">{{qishuitem.open_no}}</view>
						<view class="title_lc " :class="{'value_2s':indexs%2 ==1}">{{qishuitem.number_sum}}</view>

					</view>
					<view class="title_line_no_after ">
						<view class="title_lc">{{$t('zoushi.da')}}</view>
						<view class="title_lc">{{$t('zoushi.xiao')}}</view>
						<view class="title_lc">{{$t('zoushi.dan')}}</view>
						<view class="title_lc">{{$t('zoushi.shuang')}}</view>
					</view>
					<view class="title_line_no_after title_line3">
						<view class="title_lc ">
							<view v-if="qishuitem.number_sum>14||qishuitem.number_sum==14" class="value_1s">
								{{$t('zoushi.da')}}
							</view>
							<view v-else>-</view>
						</view>
						<view class="title_lc">
							<view v-if="qishuitem.number_sum<13 ||qishuitem.number_sum==13" class="value_2s">
								{{$t('zoushi.xiao')}}
							</view>
							<view v-else>-</view>
						</view>
						<view class="title_lc">
							<view v-if="qishuitem.number_sum % 2 === 1" class="value_1s">{{$t('zoushi.dan')}}
							</view>
							<view v-else>-</view>
						</view>
						<view class="title_lc">
							<view v-if="qishuitem.number_sum% 2 === 0" class="value_2s">{{$t('zoushi.shuang')}}
							</view>
							<view v-else>-</view>
						</view>
					</view>

				</view>
				<view style="text-align: center; line-height: 50px; color: #ccc;">{{notice}}</view>
			</view>
		</view>
		<view v-else class="listare li_are">
			<view class="empty_ico">
				<van-empty class="custom-image" :image="empty_img" :description="nomore" />
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				language: 'zhCN',
				page: 1,
				pagesize: 21,
				empty_img: require("@/static/image/empty_ico1.png"),
				notice: "上拉顯示更多",
				nomore: '暫無記錄...',
				loadingType: 0,
				loadingText: '加載中...',
				contentText: {
					contendown: '上拉显示更多',
					contenrefresh: '正在加载...',
					contennomore: '没有更多数据了',
				},
				timer: {},
				pid: '',
				sub_id: '',
				language_type:'zhCN'
			}
		},
		methods: {
			async getList(callBack) {
				const res = await this.$myRuquest({
					url: '/api/front/room/getHistoryOpenData',
					method: "POST",
					data: {
						page: this.page,
						pagesize: this.pagesize,
						room_id: this.pid,
						room_sub_id: this.sub_id

					},
				})
				if (res.code == 200) {
					this.list = [...this.list, ...res.data.data]
				}

				callBack && callBack()

			},
			async getmorelists() {
				this.change_notice(2)
				if (this.loadingType !== 0) { //loadingType!=0;直接返回
					return false
				}
				this.loadingType = 1
				uni.showNavigationBarLoading() //显示加载动画
				this.page++
				const res = await this.$myRuquest({
					url: '/api/front/room/getHistoryOpenData',
					method: "POST",
					data: {
						page: this.page,
						pagesize: this.pagesize,
						room_id: this.pid,
						room_sub_id: this.sub_id

					},
				})
				if (res.code == 200) {

					//this.page++ // 得到数据之后 page+1
					if (this.page == Number(res.data.last_page)) { // 没有数据
						this.loadingType = 2
						//this.notice = '沒有更多數據了'
						this.change_notice(3)
						uni.hideNavigationBarLoading() // 关闭加载动画
						return
					}
					//this.page++ // 每触底一次 page +1
					this.list = this.list.concat(res.data.data) //将数据拼接在一起
					this.loadingType = 0 // 将loadingType归0重置
					uni.hideNavigationBarLoading() // 关闭加载动画
				}

			},
			change_notice(type) {
				switch (this.language) {
					case 'en':
						if (type == 1) {
							this.notice = "Pull up to display more"
						} else if (type == 2) {
							this.notice = 'Loading...'
						} else {
							this.notice = 'No more...'
						}
						this.nomore = 'No records...'
						break;
					case 'zh':
						if (type == 1) {
							this.notice = "上拉显示示更多"
						} else if (type == 2) {
							this.notice = '正在加载...'
						} else {
							this.notice = '沒有更多数据了...'
						}
						this.nomore = '暂无记录...'
						break;
					case 'de':

						if (type == 1) {
							this.notice = "Hochziehen, um mehr anzuzeigen"
						} else if (type == 2) {
							this.notice = '正在加載...'
						} else {
							this.notice = '沒有更多數據了...'
						}
						this.nomore = 'Derzeit sind keine Datensätze verfügbar...'
						break;
					case 'eyu':

						if (type == 1) {
							this.notice = "Показать больше"
						} else if (type == 2) {
							this.notice = 'Загружается...'
						} else {
							this.notice = 'Больше нет данных.'
						}
						this.nomore = 'Нет записей...'
						break;
					case 'franch':

						if (type == 1) {
							this.notice = "Pull up afficher plus"
						} else if (type == 2) {
							this.notice = 'Chargement en cours...'
						} else {
							this.notice = "Il n'y a plus de données"
						}
						this.nomore = "Pas encore d'enregistrement ..."
						break;
					case 'han':

						if (type == 1) {
							this.notice = "위로 당기기 더 보기"
						} else if (type == 2) {
							this.notice = '로드 중...'
						} else {
							this.notice = '데이터가 더 이상 없습니다...'
						}
						this.nomore = '기록 없음...'
						break;
					case 'japan':

						if (type == 1) {
							this.notice = "詳細を表示するには、ドロップダウン"
						} else if (type == 2) {
							this.notice = 'ロード中...'
						} else {
							this.notice = 'これ以上のデータはありません...'
						}
						this.nomore = '記録はまだありません...'
						break;
					case 'xby':

						if (type == 1) {
							this.notice = "Subir muestra más"
						} else if (type == 2) {
							this.notice = 'Se está cargando...'
						} else {
							this.notice = 'No hay más datos...'
						}
						this.nomore = 'No hay registro por el momento...'
						break;
					default:

						if (type == 1) {
							this.notice = "上拉顯示更多"
						} else if (type == 2) {
							this.notice = '正在加載...'
						} else {
							this.notice = '沒有更多數據了...'
						}
						this.nomore = '暫無記錄...'
				}
			},
		},
		onLoad(option) {
			this.pid = option.pid
			this.sub_id = option.sub_id
			var had_token = uni.getStorageSync('token')
			if (had_token == '') {
				uni.navigateTo({
					url: '/pages/login/login',
				});
			} else {
				this.list = []
				this.getList()
			}
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.$t('zoushi.title')
			})
			this.language_type = uni.getStorageSync('language')
			this.language = uni.getStorageSync('language') !== undefined ? uni.getStorageSync('language') : 'zhCN'

			this.change_notice(1)


		},
		onPullDownRefresh() {
			this.page = 1
			this.qishu = []
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
	.title_line_no_after {
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
	.title_line3 {
		color: #409eff;
	}

	.title_l {
		width: 100px;
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
		background: #7c4519;
	}

	.jiange {
		background: #eaeaea;
	}

	.value_1s {
		color: #409eff;
	}

	.value_2s {
		color: #7c4519;
	}

	.jianges {
		color: #eaeaea;
	}
</style>
