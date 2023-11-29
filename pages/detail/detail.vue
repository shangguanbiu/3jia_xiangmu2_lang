<template>
	<view>
		<view class="top_lie">
			<view class="top_tit1">应发工资（元）</view>
			<view class="top_tit2">{{detail.fMoney?formatNum(detail.fMoney):0}}</view>
			<view class="over" v-if="!if_check">
				<image :src="over_ico" mode='widthFix' style="width: 100%;">
				</image>
			</view>
		</view>
		<view class="msg_are">
			<view class="msg_are_tit">
				<view v-if="detail.iWagesType==0">基本工资+计件工资</view>
				<view v-if="detail.iWagesType==1">定额工资+超量计件工资</view>
			</view>
			<view class="msg_line">
				<view class="msg_l">
					<view v-if="detail.iWagesType==0">基本工资</view>
					<view v-if="detail.iWagesType==1">定额工资</view>
				</view>
				<view class="msg_r">{{detail.fWagesBasisMoney?formatNum(detail.fWagesBasisMoney):0}}</view>
			</view>
			<view class="msg_line2">
				<van-divider />
			</view>
			<view class="msg_line">
				<view class="msg_l">计件工资</view>
				<view class="msg_r">{{detail.fPieceMoney?formatNum(detail.fPieceMoney):0}}</view>
			</view>
			<view class="msg_line2">
				<van-divider />
			</view>
			<view class="msg_line">
				<view class="msg_l">计件货品</view>
				<view class="msg_r">{{detail.cWagesGoods?detail.cWagesGoods:''}}</view>
			</view>
			<view class="msg_line2">
				<van-divider />
			</view>

			<view class="msg_line">
				<view class="msg_l">计件方式</view>
				<view class="msg_r" @click="see_more(1)" v-if="detail.iWagesLadderType==0">
					按车数计N
					<van-icon v-if="jiben==true" name="arrow-up">
					</van-icon>
					<van-icon v-else name="arrow-down"></van-icon>
				</view>
				<view class="msg_r" @click="see_more(1)" v-else>
					按车数分阶梯计N
					<van-icon v-if="jiben==true" name="arrow-up">
					</van-icon>
					<van-icon v-else name="arrow-down"></van-icon>
				</view>
			</view>
			<view v-show="jiben">
				<view>
					<!-- v-if="detail.iWagesType==0" -->

					<view class="msg_line" style="padding: 8px 16px;">
						<view class="msg_l">运输车数</view>
						<view class="msg_r">{{detail.iCarNumber?detail.iCarNumber:0}}</van-icon>
						</view>
					</view>
					<view class="msg_line" v-if="detail.iWagesType==1" style="padding: 8px 16px;">
						<view class="msg_l">额定车数</view>
						<view class="msg_r">{{detail.fRatedStandardNumber?detail.fRatedStandardNumber:0}}</van-icon>
						</view>
					</view>
					<view class="msg_line"
						v-if="detail.cWagesLadderDtos !==undefined && detail.cWagesLadderDtos.length ==0"
						style="padding: 8px 16px;">
						<view class="msg_l">计件单价
							单价（元/车）</view>
						<view class="msg_r"> {{detail.fWagesPrice?formatNum(detail.fWagesPrice):0}} </van-icon>
						</view>
					</view>
				</view>

				<view v-if="detail.cWagesLadderDtos !==undefined && detail.cWagesLadderDtos.length !==0">
					<!-- <view class="msg_line" style="padding: 8px 16px;">
						<view class="msg_l">运输车数</view>
						<view class="msg_r">{{detail.iCarNumber?detail.iCarNumber:0}}</van-icon>
						</view>
					</view> -->
					<view v-for="(LadderDtos,indexlv) in detail.cWagesLadderDtos" :key="indexlv">
						<view class="msg_line" style="padding: 8px 16px;">
							<view class="msg_l">标准车数</view>
							<!-- <view class="msg_r"> {{LadderDtos.iStartNumber?formatNum(LadderDtos.iStartNumber):0}} <=N<={{LadderDtos.iEndNumber?formatNum(LadderDtos.iEndNumber):0}}    </van-icon>
							</view> -->
							<view class="msg_r" style="display: flex;justify-content: flex-end;">
								{{LadderDtos.iStartNumber?formatNum(LadderDtos.iStartNumber):0}}
								<=N<= <view v-if="indexlv !==0 && LadderDtos.iEndNumber==0">∞
							</view>
							<view v-else>{{ LadderDtos.iEndNumber}}</view>
							<!-- {{LadderDtos.iEndNumber?formatNum(LadderDtos.iEndNumber):0}} -->

						</view>

					</view>
					<view class="msg_line" style="padding: 8px 16px;">
						<view class="msg_l">计件单价(元/车)</view>
						<view class="msg_r"> {{LadderDtos.fWagesPrice?formatNum(LadderDtos.fWagesPrice):0}} </van-icon>
						</view>

					</view>
				</view>

			</view>



		</view>
		<view class="msg_line2">
			<van-divider />
		</view>
	</view>
	<view class="msg_are" style="padding-bottom:15px">
		<view class="msg_are_tit">工资补贴方式</view>

		<view class="msg_line">
			<view class="msg_l">超时补贴金额（元）</view>
			<view class="msg_r" @click="see_more(2)">
				{{detail.fOverTimeMoney?formatNum(detail.fOverTimeMoney):0}}
				<van-icon v-if="chaoshi==true" name="arrow-up"></van-icon>
				<van-icon v-else name="arrow-down"></van-icon>
			</view>
		</view>
		<view v-show="chaoshi">
			<view class="msg_line" style="padding: 8px 16px;">
				<view class="msg_l">超时计价方式</view>
				<view class="msg_r" v-if="detail.iOverTimeType==0">按固定价</view>
				<view class="msg_r" v-if="detail.iOverTimeType==1">按等价阶梯</view>
				<view class="msg_r" v-if="detail.iOverTimeType==2">按不规则阶梯</view>
			</view>
			<view class="msg_line" style="padding: 8px 16px;">
				<view class="msg_l">超时时长(分钟)</view>
				<view class="msg_r">{{detail.fOverTimeNumber}}
				</view>
			</view>
			<view class="msg_line" style="padding: 8px 16px;" v-if="detail.iOverTimeType==0">
				<view class="msg_l">补贴价(元)</view>
				<view class="msg_r">{{detail.fOverTimeSubsidyPrice}}</view>

			</view>
			<view v-for="(LadderDtos,indexlv) in detail.cOverTimeLadderDtos" :key="indexlv">
				<view class="msg_line" style="padding: 8px 16px;">
					<view class="msg_l">限定标准</view>
					<view class="msg_r" style="display: flex; justify-content: flex-end;">
						<view>{{LadderDtos.iStartNumber?formatNum(LadderDtos.iStartNumber):0}}</view>
						<view>-</view>
						<view v-if="indexlv !==0 && LadderDtos.iEndNumber==0">∞</view>
						<view v-else>{{ LadderDtos.iEndNumber}}</view>
						<!-- {{LadderDtos.iEndNumber?formatNum(LadderDtos.iEndNumber):0}} -->

					</view>

				</view>
				<view class="msg_line" style="padding: 8px 16px;">
					<view class="msg_l">补贴价(元)</view>
					<view class="msg_r"> {{LadderDtos.fWagesPrice?formatNum(LadderDtos.fWagesPrice):0}}
					</view>

				</view>
			</view>
			<!-- <view class="msg_line" style="padding: 8px 16px;"
					v-for="(OverTime,indexcs) in detail.cOverTimeLadderDtos" :key="indexcs">
					<view class="msg_l">限定标准
						单价（元）</view>
					<view class="msg_r"> {{OverTime.fWagesPrice?formatNum(OverTime.fWagesPrice):0}} </van-icon>
					</view>
				</view> -->

		</view>
		<view v-if="detail.fOverDistanceSubsidyPrice !==null">
		<view class="msg_line2">
			<van-divider />
		</view>
		<view class="msg_line">
			<view class="msg_l">超距补贴金额（元）</view>
			<view class="msg_r" @click="see_more(3)">
				{{ detail.fOverDistanceMoney?formatNum(detail.fOverDistanceMoney):0}}
				<van-icon v-if="chaoju==true" name="arrow-up"></van-icon>
				<van-icon v-else name="arrow-down"></van-icon>
			</view>
		</view>
		<view v-show="chaoju">
			<view class="msg_line" style="padding: 8px 16px;">
				<view class="msg_l">补贴单价（元/公里/<view v-if="detail.iOverDistanceUnit == 0">方</view><view v-else>车</view>）</view>
				<view class="msg_r"> {{detail.fOverDistanceSubsidyPrice?formatNum(detail.fOverDistanceSubsidyPrice):0}}
					</van-icon>
				</view>
			</view>
			<view class="msg_line" style="padding: 8px 16px;">
				<view class="msg_l">超距距离（公里）</view>
				<view class="msg_r"> {{detail.fOverDistanceNumber?formatNum(detail.fOverDistanceNumber):0}}
					</van-icon>
				</view>
			</view>
			<view class="msg_line" style="padding: 8px 16px;">
				<view class="msg_l" v-if="detail.iOverDistanceUnit==1">超距车数（车）</view>
				<view class="msg_l" v-else>超距方量（方）</view>
				<view class="msg_r"> {{detail.fOverDistanceCarNumberAmount?formatNum(detail.fOverDistanceCarNumberAmount):0}}
					</van-icon>
				</view>
			</view>

		</view>
		</view>
		<view v-if="detail.fExSubsidyPrice !==null">
		<view class="msg_line2">
			<van-divider />
		</view>
		<view class="msg_line">
			<view class="msg_l">退转剩补贴金额（元）</view>
			<view class="msg_r" @click="see_more(5)">{{ detail.fExMoney?formatNum(detail.fExMoney):0}}
				<van-icon v-if="tui==true" name="arrow-up"></van-icon>
				<van-icon v-else name="arrow-down"></van-icon>
			</view>
		</view>
		<view v-show="tui">
			<view class="msg_line" style="padding: 8px 16px;">
				<view class="msg_l">补贴单价（元/<span v-if="detail.iExUnit==0">方</span><span v-else>车</span>）</view>
				<view class="msg_r"> {{detail.fExSubsidyPrice?formatNum(detail.fExSubsidyPrice):0}}</van-icon>
				</view>
			</view>
			<view class="msg_line" style="padding: 8px 16px;">
				<view class="msg_l" v-if="detail.iExUnit==0" >退转剩方量（方）</view>
				<view class="msg_l" v-else >退转剩车数（车）</view>
				<view class="msg_r"> {{detail.fExNumber?formatNum(detail.fExNumber):0}}</van-icon>
				</view>
			</view>
		</view>
		</view>
		<view v-if="detail.fWaterSubsidyPrice !==null">
		<view class="msg_line2">
			<van-divider />
		</view>
		<view class="msg_line">
			<view class="msg_l">水车补贴金额（元）</view>
			<view class="msg_r" @click="see_more(6)">{{ detail.fWaterMoney?formatNum(detail.fWaterMoney):0}}
				<van-icon v-if="shui==true" name="arrow-up"></van-icon>
				<van-icon v-else name="arrow-down"></van-icon>
			</view>
		</view>
		<view v-show="shui">
			<view class="msg_line" style="padding: 8px 16px;">
				<view class="msg_l">水车车数（车）</view>
				<view class="msg_r"> {{detail.fWaterNumber?formatNum(detail.fWaterNumber):0}}</van-icon>
				</view>
			</view>
			<view class="msg_line" style="padding: 8px 16px;">
				<view class="msg_l">补贴单价（元/车）</view>
				<view class="msg_r"> {{detail.fWaterSubsidyPrice?formatNum(detail.fWaterSubsidyPrice):0}}</van-icon>
				</view>
			</view>
		</view>
		</view>
		<view v-if="detail.fWasteSubsidyPrice !==null">
		<view class="msg_line2">
			<van-divider />
		</view>
		<view class="msg_line">
			<view class="msg_l">废水补贴金额（元）</view>
			<view class="msg_r" @click="see_more(7)">{{ detail.fWasteMoney?formatNum(detail.fWasteMoney):0}}
				<van-icon v-if="feishui==true" name="arrow-up"></van-icon>
				<van-icon v-else name="arrow-down"></van-icon>
			</view>
		</view>
		<view v-show="feishui">
			<view class="msg_line" style="padding: 8px 16px;">
				<view class="msg_l">废水车数（车）</view>
				<view class="msg_r"> {{detail.fWasteNumber?formatNum(detail.fWasteNumber):0}}</van-icon>
				</view>
			</view>
			<view class="msg_line" style="padding: 8px 16px;">
				<view class="msg_l">补贴单价（元/车）</view>
				<view class="msg_r"> {{detail.fWasteSubsidyPrice?formatNum(detail.fWasteSubsidyPrice):0}}</van-icon>
				</view>
			</view>
		</view>
		</view>
		<view v-if="detail.fMortarSubsidyPrice !==null">
			<view class="msg_line2">
				<van-divider />
			</view>
		<view class="msg_line">
			<view class="msg_l">砂浆补贴金额（元）</view>
			<view class="msg_r" @click="see_more(8)">{{ detail.fMortarMoney?formatNum(detail.fMortarMoney):0}}
				<van-icon v-if="shajiang==true" name="arrow-up"></van-icon>
				<van-icon v-else name="arrow-down"></van-icon>
			</view>
		</view>
		<view v-show="shajiang">
			<view class="msg_line" style="padding: 8px 16px;">
				<view class="msg_l">砂浆车数（车）</view>
				<view class="msg_r"> {{detail.fMortarNumber?formatNum(detail.fMortarNumber):0}}</van-icon>
				</view>
			</view>
			<view class="msg_line" style="padding: 8px 16px;">
				<view class="msg_l">补贴单价（元/车）</view>
				<view class="msg_r"> {{detail.fMortarSubsidyPrice?formatNum(detail.fMortarSubsidyPrice):0}}</van-icon>
				</view>
			</view>
		</view>
		</view>
		<!-- <view class="msg_line" style="padding-bottom: 15px;">
				<view class="msg_l">补贴单价（元/分钟）</br?>
					数量（分钟）</view>
				<view class="msg_r">222</br?>3333</view>
			</view> -->

	</view>
	<view class="msg_are" style="padding-bottom: 15px;">
		<view class="msg_are_tit">增利分润</view>
		<view class="msg_line">
			<view class="msg_l">其他增减金额（元）</view>
			<view class="msg_r" @click="see_more(4)">{{formatNum(detail.fAddMoney)}}
				<van-icon v-if="fenrun==true" name="arrow-up"></van-icon>
				<van-icon v-else name="arrow-down"></van-icon>
			</view>
		</view>
		<view v-show="fenrun" >
			<view v-for="(cAddMoney,indexlv) in detail.cAddMoneyDtos" :key="indexlv">
				<view class="msg_line" style="padding: 8px 16px;">
					<view class="msg_l">{{cAddMoney.cMoneyName}}</view>
					<view class="msg_r">{{cAddMoney.fMoney}}</van-icon>
					</view>
				</view>
			</view>
		</view>
		<!-- <view class="msg_line2">
				<van-divider />
			</view>
			<view class="msg_line" style="padding-bottom: 15px;">
				<view class="msg_l">限定标准（升/公里）</br?>
					数量（升）</view>
				<view class="msg_r">{{formatNum(6000)}}</br?>{{formatNum(6000)}}</view>
			</view> -->

	</view>
	<view class="ft_msg" v-if="if_check" style="color:#2E2E30 ; display: flex; justify-content: center;">工资条将在
		<van-count-down :time="time" format="DD 天 HH 时 mm 分 ss 秒" />
		后自动确认
	</view>
	<view class="ft_msg" v-if="if_check">温馨提示：如果对工资条有异议，请在倒计时间结束前及时向您单位反馈处理...</view>
	<view style="height: 80px;"></view>
	<view class="ft_btnare" v-if="if_check">
		<van-button type="info" class="ft_btn" size="normal" block round color="#3E3EF7" @click="showdialog=true">
			确认薪资
		</van-button>
	</view>
	<van-dialog use-slot title="标题" :show="showdialog" show-cancel-button @close="onClose" @confirm="set_ok"
		:overlay="true">
		<view style="width: 90%; margin: auto; text-align: center; padding: 30px 0; color: #74778A;">
			查看薪资后，确认无异议？
		</view>
	</van-dialog>
	<van-toast id="van-toast"></van-toast>
	</view>
</template>

<script>
	import Toast from '@/wxcomponents/vant/dist/toast/toast';
	export default {
		data() {
			return {
				title: '动态的标题',
				jiben: false,
				chaoju: false,
				tui: false,
				chaoshi: false,
				
				shui:false,
				feishui:false,
				shajiang:false,
				fenrun: false,
				time: 86400000, //毫秒一天
				timeData: {},
				showdialog: false,
				detail: {},
				id: '',
				if_check: true,
				over_ico: require("@/static/image/over.png"),
			}
		},
		methods: {
			formatNum(value) {
				if (!value && value !== 0) return 0;
				let str = value.toString();
				let reg =
					str.indexOf(".") > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g;
				return str.replace(reg, "$1,");
			},
			see_more(index) {
				if (index == 1) {
					this.jiben = !this.jiben
				}
				if (index == 2) {
					this.chaoshi = !this.chaoshi
				}
				if (index == 3) {
					this.chaoju = !this.chaoju
				}
				if (index == 4) {
					this.fenrun = !this.fenrun
				}
				if (index == 5) {
					this.tui = !this.tui
				}
				if (index == 6) {
					this.shui = !this.shui
				}
				if (index == 7) {
					this.feishui = !this.feishui
				}
				if (index == 8) {
					this.shajiang = !this.shajiang
				}
				
				
				
				
			},
			async set_ok() {
				Toast.loading({
					duration: 0,
					message: '提交中...',
					forbidClick: true,
				});
				const res = await this.$myRuquest({
					url: '/api/app/yTLittleProgram/confirmType',
					method: 'put',
					data: {
						id: this.id,
						iConfirmType: 1
					}
				})

				if (res.code == 200) {
					Toast.clear();
					Toast.success('已确认');
					this.if_check = false

				}

			},

			onClose() {

				this.showdialog = !this.showdialog

				// this.setData({
				// 	show: false
				// });
			},
			async getdetail(callBack, id) {
				Toast.loading({
					duration: 0,
					message: '加载中...',
					forbidClick: true,
				});

				var compay_name = uni.getStorageSync('compay_name')
				const res = await this.$myRuquest({
					url: '/api/app/yTLittleProgram/wageDetail?id=' + this.id,
					header: {
						Authorization: "Bearer " + uni.getStorageSync('ifLogin'),
						"content-type": 'application/json'
					}
				})
				if (res.code == 200) {
					this.detail = res.data
					this.time = res.data.cLastConfirmTime
					if (res.data.iConfirmType == 0) {
						this.if_check = true
					} else {
						this.if_check = false
					}
				}
				Toast.clear();
				callBack && callBack()

			},
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			console.log(option); //打印出上个页面传递的参数。
			uni.setNavigationBarTitle({
				title: option.title
			})
			this.id = option.id
			this.getdetail()
		}
	}
</script>

<style scoped>
	page {
		background: #F7F8FC;
	}

	/deep/ .van-count-down {
		color: red;
	}

	/deep/ .van-dialog {
		z-index: 99999;
	}


	.top_lie {
		height: 130px;
		width: 90%;
		background: url("../../static/image/detail_top.png") no-repeat;
		margin: auto;
		background-size: 100%;
		position: relative;
	}

	.over {
		position: absolute;
		top: 0px;
		right: 0px;
		height: 130px;
		width: 130px;
	}

	.top_tit1 {
		text-align: center;
		color: #fff;
		padding-top: 30px;
	}

	.top_tit2 {
		text-align: center;
		color: #fff;
		font-size: 32px;
		padding-top: 10px;
	}

	.msg_are {
		border-radius: 8px;
		background: #fff;
		width: 90%;

		margin: auto;
	}

	.msg_are_tit {
		padding: 16px;
		font-size: 18px;
		margin-top: 15px;
	}

	.msg_line {
		display: flex;
		justify-content: flex-star;
		padding: 0 16px;
	}

	.msg_line2 {
		padding: 0 16px;
	}

	.msg_l {
		color: #74778A; display: flex;
	}

	.msg_r {
		flex-grow: 2;
		text-align: right;
		color: #2E2E30;

	}

	.ft_msg {
		color: #74778A;
		text-align: center;
		padding: 2px 5px;
		font-size: 13px;
		width: 90%;
		margin: auto;
		margin-top: 10px;
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

	.item {
		display: inline-block;
		width: 22px;
		margin-right: 5px;
		color: #fff;
		font-size: 12px;
		text-align: center;
		background-color: #1989fa;
		border-radius: 2px;
	}
</style>
