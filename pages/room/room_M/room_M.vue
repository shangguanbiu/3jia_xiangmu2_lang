<template>
	<view>
		<view class="room_topnav">
			<view class="room_tn_l" @click="top_nav_click(1)">
				<van-icon name="arrow-left" />
			</view>
			<view class="room_tn_mdl">{{room_name}}</view>
			<view class="room_tn_r" @click="top_nav_click(2)">{{$t('room_m.more_list')}}</view>
		</view>
		<view class="top_line">
			<view class="top_l_l">
				<view class="top_ltit">{{$t('room_m.close_time1')}}{{open_no}}{{$t('room_m.close_time2')}}</view>
				<view class="top_l_num" v-if="!if_over">
					<view class="top_l_num_zi">{{time1}}</view>:
					<view class="top_l_num_zi">{{time2}}</view>:
					<view class="top_l_num_zi">{{time3}}</view>
				</view>
				<view class="top_l_num" v-if="if_over">
					<view style="text-align:center; line-height: 25px; color: red;">{{$t('room_m.close_statu')}}</view>

				</view>
			</view>
			<view class="top_l_r">
				<view class="top_ltit" style="color: #409eff;">{{$t('room_m.yue')}}</view>
				<view class="top_ltit" style="padding: 0;">{{formatNum(this.userinfo.balance)}}</view>
			</view>
		</view>
		<view style="background: #000; display: block;  position: relative; padding: 10px 0;">
			<view class="open_line" v-for="(listitem,indext) in wangqi_list.slice(0,1)" :key="indext"
				@click="see_list(1)">
				<view v-if="language_type=='zhCN'||language_type=='zh'" class="open_line_l" style="font-size: 13px;">
					第{{listitem.open_no}}期
				</view>
				<view v-else class="open_line_l" style="font-size: 13px;">
					{{$t('room_m.qishu')}}:{{listitem.open_no}}
				</view>
				
				
				<view class="open_line_mdl">

					<view class="top_l_num">
						<view class="top_l_num_zis">{{listitem.number !== undefined?listitem.number.split(",")[0]:''}}
						</view>+
						<view class="top_l_num_zis">{{listitem.number !== undefined?listitem.number.split(",")[1]:''}}
						</view>+
						<view class="top_l_num_zis">{{listitem.number !== undefined?listitem.number.split(",")[2]:''}}
						</view>=
						<view class="top_l_num_zis he">{{listitem.number_sum}}</view>
						<view style="font-size: 12px;padding:0 3px; display: flex;" v-if="language_type=='zhCN'||language_type=='zh'">
							(
							<view v-if="listitem.number_sum<13 ||listitem.number_sum==13">{{$t('room_m.xiao')}}</view>
							<view v-if="listitem.number_sum>14||listitem.number_sum==14">{{$t('room_m.da')}}</view>
							<view v-if="listitem.number_sum % 2 === 1">{{$t('room_m.dan')}}</view>
							<view v-if="listitem.number_sum% 2 === 0">{{$t('room_m.shuang')}}</view>
							)
						</view>

					</view>

				</view>
				<view class="open_line_r" style="color: #fff; line-height: 23px;" v-show="ifdowm">
					<van-icon name="arrow-up" size="20px" @click="see_list(1)" />
				</view>
				<view class="open_line_r" style="color: #fff; line-height: 23px;" v-show="ifup">
					<van-icon name="arrow-down" size="20px" @click="see_list(2)" />
				</view>
			</view>
			<view class="jilu_are" v-show="ifup" style="max-height:400px; overflow-y: scroll;">
				<view v-if="language_type=='zhCN'||language_type=='zh'">
					<view class="open_line">
						<view class="jilu_are_zi">
							{{$t('room_m.qishu')}}
						</view>
						<view class="open_line_mdl jilu_are_zi" style="width: 45%;">
							{{$t('room_m.he')}}
						</view>
						<view class="jilu_are_zi" style=" line-height: 23px;width: 18%;">
							{{$t('room_m.jieguo')}}
						</view>
					</view>
					<view class="open_line" v-for="(listitem,indexls) in wangqi_list.slice(1)" :key="indexls">
						<view class="jilu_are_zi">
							第{{listitem.open_no}}期
						</view>
						<view class="open_line_mdl jilu_are_zi" style="width: 45%;">
							<view class="top_l_num" style="color: #000;">
								<view class="top_l_num_zi3">
									{{listitem.number !== undefined?listitem.number.split(",")[0]:''}}
								</view>+
								<view class="top_l_num_zi3">
									{{listitem.number !== undefined?listitem.number.split(",")[1]:''}}
								</view>+
								<view class="top_l_num_zi3">
									{{listitem.number !== undefined?listitem.number.split(",")[2]:''}}
								</view>=
								<view class="top_l_num_zi3 he" style="color:#fff">{{listitem.number_sum}}</view>
					
							</view>
						</view>
						<view class="jilu_are_zi" style="color: #409eff; line-height: 23px;width: 18%; display: flex;">
							(
							<view v-if="listitem.number_sum<13 ||listitem.number_sum==13">{{$t('room_m.xiao')}}</view>
							<view v-if="listitem.number_sum>14||listitem.number_sum==14">{{$t('room_m.da')}}</view>
							<view v-if="listitem.number_sum % 2 === 1">{{$t('room_m.dan')}}</view>
							<view v-if="listitem.number_sum% 2 === 0">{{$t('room_m.shuang')}}</view>
							)
						</view>
					</view>
				</view>
				<view v-else>
					<view class="open_line" style="display: block; padding-top: 5px;padding-bottom: 5px;" v-for="(listitem,indexls) in wangqi_list.slice(1)" :key="indexls" :class="{'jiange':indexls%2 ==1}">
						<view class="jilu_are_zi" style="width: 100%; text-align: left;">
							{{$t('room_m.qishu')}}:{{listitem.open_no}}
						</view>
						
						<view class="jilu_are_zi" style="color: #409eff; line-height: 23px;width: 100%; display: flex; padding: 5px 0;">
							{{$t('room_m.jieguo')}}:
							
							<view v-if="listitem.number_sum<13 ||listitem.number_sum==13">{{$t('room_m.xiao')}}</view>
							<view v-if="listitem.number_sum>14||listitem.number_sum==14">{{$t('room_m.da')}}</view>
							<view v-if="listitem.number_sum % 2 === 1">{{$t('room_m.dan')}}</view>
							<view v-if="listitem.number_sum% 2 === 0">{{$t('room_m.shuang')}}</view>
							
						</view>
						<view class="open_line_mdl jilu_are_zi" style="width: 100%; display: flex;">
							{{$t('room_m.he')}}:
							<view class="top_l_num" style="color: #000;">
								<view class="top_l_num_zi3">
									{{listitem.number !== undefined?listitem.number.split(",")[0]:''}}
								</view>+
								<view class="top_l_num_zi3">
									{{listitem.number !== undefined?listitem.number.split(",")[1]:''}}
								</view>+
								<view class="top_l_num_zi3">
									{{listitem.number !== undefined?listitem.number.split(",")[2]:''}}
								</view>=
								<view class="top_l_num_zi3 he" style="color:#fff">{{listitem.number_sum}}</view>
											
							</view>
						</view>
						
					</view>
				</view>
				
			</view>
			
			
			<view class="jilu_are_mb" v-show="ifup" @click="see_list(2)"></view>
		</view>
		<view class="bet_main" @click="show_more=false">

			<scroll-view scroll-y="true" :scroll-top="to_top" style="height: calc(100vh - 340px);">
				<view v-for="(orderitem,indexor) in HistoryOrder" :key="'hs'+indexor">
					<view v-if="orderitem.msg_type=='order'">
						<view class="other_tolk" v-if="orderitem.user_id !==userinfo.id">
							<view class="other_img">
								<image :src="user_headico">
								</image>
							</view>
							<view class="other_msg">
								<view>
									<view class="bet_msg_line" style="color: #000;">
										<!-- <view class="bet_msg_l" style="width: 30%;">{{formatName(orderitem)}}</view> -->
										<view class="bet_msg_r2" style="flex: 1;" v-if="language_type=='zhCN'||language_type=='zh'">第{{orderitem.open_no}}期</view>
										<view class="bet_msg_r2" style="flex: 1;" v-else>{{$t('room_m.qishu')}}{{orderitem.open_no}}</view>
										
									</view>
									<view class="bet_msg_line bet_msg_line2">
										<view class="bet_msg_l color_nb">{{$t('room_m.type')}}</view>
										<view class="bet_msg_r color_nb">{{$t('room_m.jine')}}</view>
									</view>
									<view class="bet_msg_line">
										<!-- <view class="bet_msg_l color_nb" style="width: 50%;">{{orderitem.name}} {{orderitem.multiple_id}}   </view>
										 -->
										<view class="bet_msg_l color_nb" style="width: 50%;" v-if="language_type=='zhCN'">{{orderitem.name}}</view>
										<view class="bet_msg_l color_nb" style="width: 50%;" v-if="language_type=='zh'">{{orderitem.name_zhCN}}</view>
										<view class="bet_msg_l color_nb" style="width: 50%;" v-if="language_type=='en'">{{orderitem.name_en}}</view>
										<view class="bet_msg_l color_nb" style="width: 50%;" v-if="language_type=='de'">{{orderitem.name_de}}</view>
										<view class="bet_msg_l color_nb" style="width: 50%;" v-if="language_type=='eyu'">{{orderitem.name_eyu}}</view>
										<view class="bet_msg_l color_nb" style="width: 50%;" v-if="language_type=='han'">{{orderitem.name_han}}</view>
										<view class="bet_msg_l color_nb" style="width: 50%;" v-if="language_type=='xby'">{{orderitem.name_xby}}</view>
										<view class="bet_msg_l color_nb" style="width: 50%;" v-if="language_type=='franch'">{{orderitem.name_french}}</view>
										<view class="bet_msg_l color_nb" style="width: 50%;" v-if="language_type=='japan'">{{orderitem.name_japan}}</view>
										
										
										
										<view class="bet_msg_r color_nb" style="width: 50%;">{{orderitem.amount}}{{$t('get_cash.danwei')}}
										</view>
									</view>
									<view class="bet_msg_line">
										<view class="bet_msg_l color_nb">
											{{$t('room_m.msg7')}}{{(String(orderitem.multiple_id).split(',')).length}}{{$t('room_m.msg8')}},{{((String(orderitem.multiple_id).split(',')).length)*orderitem.amount}}{{$t('get_cash.danwei')}}
										</view>

									</view>
								</view>
								<view class="other_sjx"></view>
							</view>
							<view class="other_img">

							</view>
						</view>

						<view class="other_tolk" v-if="orderitem.user_id ==userinfo.id">
							<view class="other_img">
							</view>
							<view class="other_msg" style='margin-left: 0px;margin-right: 18px;'>
								<view>
									<view class="bet_msg_line" style="color: #000;">
										
										
										<!-- <view class="bet_msg_l" style="width: 30%;">{{formatName(orderitem)}}</view> -->
										<view class="bet_msg_r2" style="flex: 1;" v-if="language_type=='zhCN'||language_type=='zh'">第{{orderitem.open_no}}期</view>
										<view class="bet_msg_r2" style="flex: 1;" v-else>{{$t('room_m.qishu')}}: {{orderitem.open_no}}</view>
										
									</view>
									<view class="bet_msg_line bet_msg_line2">

										<view class="bet_msg_l color_nb">{{$t('room_m.type')}}</view>
										<view class="bet_msg_r color_nb">{{$t('room_m.jine')}}</view>

									</view>
									<view class="bet_msg_line">
										<!-- <view class="bet_msg_l color_nb" style="width: 50%;">{{orderitem.name}}</view> -->
										
										<view class="bet_msg_l color_nb" style="width: 50%;" v-if="language_type=='zhCN'">{{orderitem.name}}</view>
										<view class="bet_msg_l color_nb" style="width: 50%;" v-if="language_type=='zh'">{{orderitem.name_zhCN}}</view>
										<view class="bet_msg_l color_nb" style="width: 50%;" v-if="language_type=='en'">{{orderitem.name_en}}</view>
										<view class="bet_msg_l color_nb" style="width: 50%;" v-if="language_type=='de'">{{orderitem.name_de}}</view>
										<view class="bet_msg_l color_nb" style="width: 50%;" v-if="language_type=='eyu'">{{orderitem.name_eyu}}</view>
										<view class="bet_msg_l color_nb" style="width: 50%;" v-if="language_type=='han'">{{orderitem.name_han}}</view>
										<view class="bet_msg_l color_nb" style="width: 50%;" v-if="language_type=='xby'">{{orderitem.name_xby}}</view>
										<view class="bet_msg_l color_nb" style="width: 50%;" v-if="language_type=='franch'">{{orderitem.name_french}}</view>
										<view class="bet_msg_l color_nb" style="width: 50%;" v-if="language_type=='japan'">{{orderitem.name_japan}}</view>
										
										
										<view class="bet_msg_r color_nb" style="width: 50%;">{{orderitem.amount}}{{$t('get_cash.danwei')}}
										</view>
									</view>
									<view class="bet_msg_line">
										<view class="bet_msg_l">
											{{$t('room_m.msg7')}}{{(String(orderitem.multiple_id).split(',')).length}}{{$t('room_m.msg8')}},{{((String(orderitem.multiple_id).split(',')).length)*orderitem.amount}}{{$t('get_cash.danwei')}}
										</view>

									</view>
								</view>
								<view class="other_sjxr"></view>
							</view>

							<view class="other_img">
								<image :src="user_headico">
								</image>
							</view>
						</view>
					</view>
					<view class="sys_msg" v-else>
						<view class="sys_msg_tit">No.{{orderitem.open_no}}</view>
						<view class="sys_msg_com">{{$t('room_m.bet_notice1')}}</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="bet_main_line"
			style="position: fixed; left:0; bottom: 0;width: 100vw; max-width: 750px; z-index: 50;">
			<view class="btn_left" @click="create_bet()">{{$t('room_m.bet_btn1')}}</view>
			<view class="btn_right" @click="goback()">{{$t('room_m.bet_btn2')}}</view>
		</view>
		<view class="sjx" v-show="show_more"></view>
		<view class="more_list" v-show="show_more">
			<view class="more_list_tit" @click="go_list(1)">{{$t('room_m.bet_nav1')}}</view>
			<!-- <view class="more_list_tit" @click="go_list(2)">交易記錄</view> -->
			<view class="more_list_tit" @click="go_list(3)">{{$t('room_m.bet_nav2')}}</view>
			<view class="more_list_tit" @click="go_list(4)">{{$t('room_m.bet_nav3')}}</view>
		</view>
		<view v-show="show_bit" class="ge_meng" @click="show_bit=false"></view>
		<view class="bet_num_are" v-show="show_bit">
			<view class="bet_num_are_top">
				<view class="bet_num_are_span" @click="tabs_change(1)" :class="{'bet_num_are_spanhover':tab==1}">
					{{$t('room_m.game_type1')}}
				</view>
				<view class="bet_num_are_span" @click="tabs_change(2)" :class="{'bet_num_are_spanhover':tab==2}">
					{{$t('room_m.game_type2')}}
				</view>
				<view class="bet_num_are_span" @click="tabs_change(3)" :class="{'bet_num_are_spanhover':tab==3}">
					{{$t('room_m.game_type3')}}
				</view>
			</view>
			<view class="bet_num_arem" v-show="tab==1">
				<view class="bet_lines" v-for="(numitem,indexm) in dzds_list" :key="indexm">
					<view class="bet_linesm " :class="{'bet_line_get':numitem.ifget}" @click="get_item(1,indexm)">

						<view class="bet_lsm_l" v-if="language_type=='zhCN'">{{numitem.name}}</view>
						<view class="bet_lsm_l" v-if="language_type=='zh'">{{numitem.name_zhCN}}</view>
						<view class="bet_lsm_l" v-if="language_type=='en'">{{numitem.name_en}}</view>
						<view class="bet_lsm_l" v-if="language_type=='de'">{{numitem.name_de}}</view>
						<view class="bet_lsm_l" v-if="language_type=='eyu'">{{numitem.name_eyu}}</view>
						<view class="bet_lsm_l" v-if="language_type=='han'">{{numitem.name_han}}</view>
						<view class="bet_lsm_l" v-if="language_type=='xby'">{{numitem.name_xby}}</view>
						<view class="bet_lsm_l" v-if="language_type=='franch'">{{numitem.name_french}}</view>
						<view class="bet_lsm_l" v-if="language_type=='japan'">{{numitem.name_japan}}</view>

						<view class="bet_lsm_r">{{numitem.multiple}}
						</view>
					</view>
				</view>
			</view>
			<view class="bet_num_arem" v-show="tab==2">
				<view class="bet_lines" v-for="(numitem,indexm) in number_list" :key="indexm">
					<view class="bet_linesm " :class="{'bet_line_get':numitem.ifget}" @click="get_item(2,indexm)">
						<view class="bet_lsm_l">{{numitem.name}}</view>
						<view class="bet_lsm_r">{{numitem.multiple}}
						</view>
					</view>
				</view>

			</view>
			<view class="bet_num_arem" v-show="tab==3">
				<view class="bet_lines" v-for="(numitem,indexm) in tesu_list" :key="indexm">
					<view class="bet_linesm " :class="{'bet_line_get':numitem.ifget}" @click="get_item(3,indexm)">
						<view class="bet_lsm_l" v-if="language_type=='zhCN'">{{numitem.name}}</view>
						<view class="bet_lsm_l" v-if="language_type=='zh'">{{numitem.name_zhCN}}</view>
						<view class="bet_lsm_l" v-if="language_type=='en'">{{numitem.name_en}}</view>
						<view class="bet_lsm_l" v-if="language_type=='de'">{{numitem.name_de}}</view>
						<view class="bet_lsm_l" v-if="language_type=='eyu'">{{numitem.name_eyu}}</view>
						<view class="bet_lsm_l" v-if="language_type=='han'">{{numitem.name_han}}</view>
						<view class="bet_lsm_l" v-if="language_type=='xby'">{{numitem.name_xby}}</view>
						<view class="bet_lsm_l" v-if="language_type=='franch'">{{numitem.name_french}}</view>
						<view class="bet_lsm_l" v-if="language_type=='japan'">{{numitem.name_japan}}</view>
						<view class="bet_lsm_r">{{numitem.multiple}}
						</view>
					</view>
				</view>
			</view>
			<view style="position: fixed; bottom: 0; left:0;width:100vw; background: #ccc;">
				<view class="bet_imput_line">
					<view style="width:80px; text-align: center; line-height: 45px;">{{$t('room_m.jine')}}：</view>
					<view style="flex:1;">
						<input class="uni-input"
							:placeholder="$t('room_m.use_jine')+':'+userinfo.balance+'，'+$t('room_m.limit_jine')+':'+room_info.limit_amount"
							style="width:100%; line-height: 45px; height: 45px;" v-model="bet_money" />
					</view>
				</view>
				<view class="bet_main_line">
					<view class="btn_left" @click="reset()">{{$t('room_m.pop_btn1')}}</view>
					<view class="btn_right" @click="submit_bet()">{{$t('room_m.pop_btn2')}}</view>
				</view>
			</view>
		</view>
		<van-dialog use-slot :title="$t('room_m.bet_nav3')" :show="show_msg" :zIndex='91' @confirm="onClose"
			confirm-button-color="#409eff" :confirmButtonText="$t('usercenter.ok')">
			<view class="msg_are">
				<!-- <u-parse :content="subroom_msg.remark" :noData="$t('room_m.pop_notice')"></u-parse> -->
				<u-parse :content="subroom_msg.remark" v-if="language_type=='zhCN'" :noData="$t('room_m.pop_notice')"></u-parse>
				<u-parse :content="subroom_msg.remark_zhCN" v-if="language_type=='zh'" :noData="$t('room_m.pop_notice')"></u-parse>
				<u-parse :content="subroom_msg.remark_en" v-if="language_type=='en'" :noData="$t('room_m.pop_notice')"></u-parse>
				<u-parse :content="subroom_msg.remark_de" v-if="language_type=='de'" :noData="$t('room_m.pop_notice')"></u-parse>
				<u-parse :content="subroom_msg.remark_eyu" v-if="language_type=='eyu'" :noData="$t('room_m.pop_notice')"></u-parse>
				<u-parse :content="subroom_msg.remark_han" v-if="language_type=='han'" :noData="$t('room_m.pop_notice')"></u-parse>
				<u-parse :content="subroom_msg.remark_xby" v-if="language_type=='xby'" :noData="$t('room_m.pop_notice')"></u-parse>
				<u-parse :content="subroom_msg.remark_french" v-if="language_type=='franch'" :noData="$t('room_m.pop_notice')"></u-parse>
				<u-parse :content="subroom_msg.remark_japan" v-if="language_type=='japan'" :noData="$t('room_m.pop_notice')"></u-parse>
			</view>
		</van-dialog>
		<van-toast id="van-toast"></van-toast>
	</view>
</template>

<script>
	import Toast from '@/wxcomponents/vant/dist/toast/toast';
	import uParse from '@/components/u-parse/u-parse.vue'
	export default {
		components: {
			uParse
		},
		data() {
			return {
				open_no: '',
				p_name: '',
				to_top: 999999,
				hand_close: false,
				is_close: false,
				time_build: null,
				tab: 1,
				sub_id: '',
				pid: '',
				show_msg: false,
				qishu: 1234,
				user_headico: require("@/static/image/usercenter_04.png"),
				time1: 0,
				time2: 0,
				time3: 0,
				money: 98767,
				bet_money: '',
				ifdowm: true,
				ifup: false,
				show_more: false,
				show_bit: false,
				wangqi_list: [],
				dzds_list: [],
				tesu_list: [],
				number_list: [],
				get_bei_id: [],
				userinfo: {},
				room_info: {},
				jaingqi_msg: {},
				subroom_msg: {},
				HistoryOrder: [],
				all_plv: [],
				runtime_obj: '',
				if_over: false,
				bottomIds: '',
				room_name: '',
				language_type: 'zhCN',
				 
			}
		},
		watch: {
			time1: function(val) {
				var _this = this
				if (val == NaN || val == 'NaN') {
					this.if_over = true
					clearInterval(this.time_build);
					this.time_build = null;
					setTimeout(function() {
						_this.get_jiangqi_msg()
					}, 1)
				}
			},
			time2: function(val) {
				var _this = this
				if (val == NaN || val == 'NaN') {
					this.if_over = true
					clearInterval(this.time_build);
					this.time_build = null;
					setTimeout(function() {
						_this.get_jiangqi_msg()
					}, 1)
				}
			},

			time3: function(val) {
				var _this = this
				if (this.time1 < 0 || this.time2 < 0 || this.time3 < 0 || this.time1 == NaN || this.time2 == NaN ||
					this.time3 == NaN || this.time1 == 'NaN' || this.time2 == 'NaN' ||
					this.time3 == 'NaN') {
					this.if_over = true
					clearInterval(this.time_build);
					this.time_build = null;
					setTimeout(function() {
						_this.get_renew()
					}, 10000)
				}
				if (this.time1 == this.time2 && this.time2 == this.time3 && val == 0) {
					//clearInterval(this.runtime_obj)
					this.if_over = true
					//this.run_time_sfm(2,'')
					this.time1 = 0
					this.time2 = 0
					this.time3 = 0

					clearInterval(this.time_build);
					this.time_build = null;
					setTimeout(function() {
						_this.get_renew()
					}, 10000)

				}

			},

		},
		methods: {
			showtime(endate) {
				if (endate !== '') {
					var nowtime = new Date(), //获取当前时间
						endtime = new Date(endate); //定义结束时间
					var lefttime = endtime.getTime() - nowtime.getTime(), //距离结束时间的毫秒数
						leftd = Math.floor(lefttime / (1000 * 60 * 60 * 24)), //计算天数
						lefth = Math.floor(lefttime / (1000 * 60 * 60) % 24), //计算小时数
						leftm = Math.floor(lefttime / (1000 * 60) % 60), //计算分钟数
						lefts = Math.floor(lefttime / 1000 % 60); //计算秒数
					//console.log('dddd', lefth + ':' + leftm + ':' + lefts)
					this.time1 = lefth
					this.time2 = leftm
					this.time3 = lefts
					return leftd + "天" + lefth + ":" + leftm + ":" + lefts; //返回倒计时的字符串
				} else {
					clearInterval(this.time_build);
					this.time_build = null;
					this.if_over = true
				}
			},
			getPart(endTime) {
				if (endTime !== '') {
					const current = Math.floor(Date.now() / 1000);
					//时间戳相差多少秒
					let diff = Math.floor(endTime / 1000) - current;
					//判断是否过时
					let _diffData;
					if (diff > 0) {
					    let d = Math.floor(diff / (3600 * 24))        //获取天数
					    let h = Math.floor((diff % (3600 * 24)) / (60 * 60)); //获取时
					    let m = Math.floor(((diff % (3600 * 24)) % (60 * 60)) / 60); //获取分
					    let s = Math.floor(diff % 60); //获取秒
					    // d = d < 10? "0" + d : d;
					    h = h < 10 ? "0" + h : h;
					    m = m < 10 ? "0" + m : m;
					    s = s < 10 ? "0" + s : s;
						this.time1=h
						this.time2=m
						this.time3=s
					   // _diffData = `${d > 0 ? `${d}d : `: ''}${h}h : ${m}m : ${s}s Left`;
					} else {
					    //_diffData = `00h : 00m : 00s Left`;
						this.time1=0
						this.time2=0
						this.time3=0
					}
				}else {
					clearInterval(this.time_build);
					this.time_build = null;
					this.if_over = true
				}
				
			   
			 
			   // return _diffData;
			},
			gettimers(time){
				var _this=this
			    // 得到本地时间与GMT时间的时间偏移差
			    const cn = -28800000;
			    const t = new Date(time).getTime();
			    const offset = new Date().getTimezoneOffset() * 60 * 1000;
			 
			    // 后台给的时间戳与offset相加得到现在的格林尼治时间
			     const utcTime = t + cn - offset;
			    //const utcTime = t - offset;
			    // const dayjs = require("dayjs");
			    // 得到正确的时间 如果要转成时间戳就加getTime()方法
			    return _this.getPart(utcTime);
			},
			formatName(data) {

				var newStr;
				if (data.nickname !== '') {
					if (data.nickname.length === 2) {
						newStr = data.nickname.substr(0, 1) + '**';
					} else if (data.nickname.length > 2) {
						newStr = data.nickname.substr(0, 1) + "**" + data.nickname.substr(2)
					}
				} else {
					newStr = this.$t('room_m.robet_name') //'未設置暱稱用户';
				}

				return newStr;
			},
			onChange(e) {
				this.setData({
					timeData: e.detail,
				});
			},
			formatNum(value) {
				if (!value && value !== 0) return 0;
				let str = value.toString();
				let reg =
					str.indexOf(".") > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g;
				return str.replace(reg, "$1,");
			},
			see_list(type) {

				this.ifup = !this.ifup
				this.ifdowm = !this.ifdowm
				// if (type == 1) {
				// 	this.ifup = true
				// 	this.ifdowm = false
				// } else {
				// 	this.ifdowm = true
				// 	this.ifup = false
				// }

			},
			onNavigationBarButtonTap(e) {
				//通过index区分点击了哪个
				
			},
			top_nav_click(type){
				if(type==1){
					uni.navigateBack()
				}else{
					this.show_more = !this.show_more
				}
				
			},
			go_list(id) {
				this.show_more = !this.show_more
				if (id == 1) {
					uni.navigateTo({
						url: '/pages/room/zoushi/zoushi?pid=' + this.pid + '&sub_id=' + this.sub_id,
					});
				} else if (id == 2) {
					uni.navigateTo({
						url: '/pages/usercenter/bet_record/bet_record',
					});
				} else if (id == 3) {
					uni.navigateTo({
						url: '/pages/kefu/kefu_index',
					});
				} else if (id == 4) {
					this.show_msg = !this.show_msg
				}
			},
			tabs_change(id) {
				this.tab = id
				if (id == 1) {
					this.dzds_list.forEach((item) => {
						item.ifget = false
					})
				} else if (id == 2) {
					this.number_list.forEach((item) => {
						item.ifget = false
					})
				} else {
					this.tesu_list.forEach((item) => {
						item.ifget = false
					})
				}
			},
			get_item(type, index) {
				if (type == 1) {
					this.dzds_list[index].ifget = !this.dzds_list[index].ifget
				} else if (type == 2) {
					this.number_list[index].ifget = !this.number_list[index].ifget
				} else {
					this.tesu_list[index].ifget = !this.tesu_list[index].ifget
				}

			},
			onClose() {

				this.show_msg = !this.show_msg
			},
			async get_userInfo(type) {
				var _this = this
				const res = await this.$myRuquest({
					url: '/api/front/user/getUserInfo',
					method: "POST",
				})
				if (res.code == 200) {
					this.userinfo = res.data

				}
				if (type == undefined) {
					_this.connectSocket()
				}


			},
			goback() {
				uni.navigateBack()
			},
			async get_subroom_msg(subid) {
				const res = await this.$myRuquest({
					url: '/api/front/room/getRoomSubInfo',
					method: "POST",
					data: {
						id: subid
					},
				})
				if (res.code == 200) {
					this.subroom_msg = res.data


				}
			},
			async get_HistoryOrder() {
				var _this = this
				const res = await this.$myRuquest({
					url: '/api/front/order/getHistoryOrder',
					method: "POST",
					data: {
						room_id: _this.pid,
						room_sub_id: _this.sub_id
					},

				})
				if (res.code == 200) {
				
					var new_mul_id = new Array()
					this.HistoryOrder=[]
					this.HistoryOrder = res.data
					
					this.HistoryOrder.forEach((item) => {
						this.$set(item, 'name', '')

						this.all_plv.forEach((item_all) => {
							if (item.msg_type == "order") {
								var multiple_id = String(item.multiple_id)
								this.$set(item, 'type', 1)
								new_mul_id = multiple_id.split(',')
								new_mul_id.forEach((item_list) => {
									if (Number(item_list) == Number(item_all.id)) {
										if (new_mul_id.length > 2 || new_mul_id.length == 2) {
											item.name += item_all.name + '，'
										} else {
											item.name = item_all.name
										}

									}
								})
							} else {
								this.$set(item, 'type', 2)
							}


						})
						
						

					})




				}
			},
			async get_renew() {
				var _this = this

				const res = await this.$myRuquest({
					url: '/api/front/room/getNewOpenData',
					method: "POST",
					data: {
						room_id: _this.pid,
						room_sub_id: _this.sub_id
					},

				})

				if (res.code == 200) {


					_this.open_no = res.data.open_no
					_this.next_open_id = res.data.id
					_this.run_time_val = res.data.open_time
					_this.time_build = setInterval(() => {
						//_this.showtime(_this.run_time_val) 222
						_this.gettimers(_this.run_time_val)
						_this.if_over = false
					}, 1000)
					_this.heart()

				}

			},

			async get_jiangqi_msg() {
				var _this = this
				this.dzds_list = []
				this.number_list = []
				this.tesu_list = []
				const res = await this.$myRuquest({
					url: '/api/front/room/getActionDetail',
					method: "POST",
					data: {
						room_id: _this.pid,
						room_sub_id: _this.sub_id
					},

				})
				_this.get_userInfo()

				if (res.code == 200) {

					this.if_over = false
					_this.room_info = res.data.room_info[0]
					_this.jaingqi_msg = res.data.next_open_data
					_this.open_no = _this.jaingqi_msg.open_no
					_this.next_open_id = _this.jaingqi_msg.id
					_this.wangqi_list = res.data.history_open_data
					_this.all_plv = res.data.multiple_data


					switch (this.language_type) {
						case 'zh':
							this.room_name = _this.room_info.room_name_zhCN + '-' + _this.room_info.room_sub_name_zhCN
							break;
						case 'zhCN':
							this.room_name = _this.room_info.room_name + '-' + _this.room_info.room_sub_name
							break;
						case 'en':
							this.room_name = _this.room_info.room_name_en + '-' + _this.room_info.room_sub_name_en
							break;
						case 'xby':
							this.room_name = _this.room_info.room_name_xby + '-' + _this.room_info.room_sub_name_xby
							break;
						case 'han':
							this.room_name = _this.room_info.room_name_han + '-' + _this.room_info.room_sub_name_han
							break;
						case 'eyu':
							this.room_name = _this.room_info.room_name_eyu + '-' + _this.room_info.room_sub_name_eyu
							break;
						case 'japan':
							this.room_name = _this.room_info.room_name_japan + '-' + _this.room_info
								.room_sub_name_japan
							break;
						case 'franch':
							this.room_name = _this.room_info.room_name_french + '-' + _this.room_info
								.room_sub_name_french
							break;
						case 'de':
							this.room_name = _this.room_info.room_name_de + '-' + _this.room_info.room_sub_name_de
							break;
					}

					uni.setNavigationBarTitle({
						title: this.room_name
					});


					//_this.run_time_sfm(1, res.data.next_open_data.open_time)
					//res.data.next_open_data.open_time

					// this.time_build = setInterval(function() {

					// 	_this.showtime(res.data.next_open_data.open_time)

					// }, 1000)
					//_this.run_time_val = ''
					_this.run_time_val = res.data.next_open_data.open_time

					//uni.setStorageSync('open_time', res.data.next_open_data.open_time)

					this.time_build = setInterval(() => {
						//_this.showtime(_this.run_time_val)  111
						_this.gettimers(_this.run_time_val)
						
						
					}, 1000)

					this.get_HistoryOrder()
					var dzds_data = {
						"id": '',
						"type_id": '',
						"name": '',

						"name_zhCN": "",
						"name_en": "",
						"name_de": "",
						"name_eyu": "",
						"name_french": "",
						"name_han": "",
						"name_japan": "",
						"name_xby": "",

						"multiple": '',
						"ifget": false
					}
					var number_data = {
						"id": '',
						"type_id": '',
						"name": '',
						"multiple": '',
						"ifget": false
					}
					var teshu_data = {
						"id": '',
						"type_id": '',
						"name": '',
						"name_zhCN": "",
						"name_en": "",
						"name_de": "",
						"name_eyu": "",
						"name_french": "",
						"name_han": "",
						"name_japan": "",
						"name_xby": "",
						"multiple": '',
						"ifget": false
					}
					if (res.data.multiple_data.length !== 0) {
						res.data.multiple_data.forEach((item) => {
							if (item.type_id == 1) {
								dzds_data.id = item.id
								dzds_data.type_id = item.type_id
								dzds_data.name = item.name
								dzds_data.name_zhCN= item.name_zhCN
								dzds_data.name_en= item.name_en
								dzds_data.name_de= item.name_de
								dzds_data.name_eyu= item.name_eyu
								dzds_data.name_french= item.name_french
								dzds_data.name_han= item.name_han
								dzds_data.name_japan= item.name_japan
								dzds_data.name_xby= item.name_xby
								
								dzds_data.multiple = item.multiple
								this.dzds_list.push(dzds_data)
								dzds_data = {
									"id": '',
									"type_id": '',
									"name": '',
									"name_zhCN": "",
									"name_en": "",
									"name_de": "",
									"name_eyu": "",
									"name_french": "",
									"name_han": "",
									"name_japan": "",
									"name_xby": "",
									"multiple": '',
									"ifget": false
								}
							}
							if (item.type_id == 2) {
								number_data.id = item.id
								number_data.type_id = item.type_id
								number_data.name = item.name
								number_data.name_zhCN= item.name
								number_data.name_en= item.name
								number_data.name_de= item.name
								number_data.name_eyu= item.name
								number_data.name_french= item.name
								number_data.name_han= item.name
								number_data.name_japan= item.name
								number_data.name_xby= item.name
								number_data.multiple = item.multiple
								this.number_list.push(number_data)
								number_data = {
									"id": '',
									"type_id": '',
									"name": '',
									"multiple": '',
									"ifget": false
								}
							}
							if (item.type_id == 3) {
								teshu_data.id = item.id
								teshu_data.type_id = item.type_id
								teshu_data.name = item.name
								teshu_data.name = item.name
								teshu_data.name_zhCN= item.name_zhCN
								teshu_data.name_en= item.name_en
								teshu_data.name_de= item.name_de
								teshu_data.name_eyu= item.name_eyu
								teshu_data.name_french= item.name_french
								teshu_data.name_han= item.name_han
								teshu_data.name_japan= item.name_japan
								teshu_data.name_xby= item.name_xby
								teshu_data.multiple = item.multiple
								this.tesu_list.push(teshu_data)
								teshu_data = {
									"id": '',
									"type_id": '',
									"name": '',
									"name_zhCN": "",
									"name_en": "",
									"name_de": "",
									"name_eyu": "",
									"name_french": "",
									"name_han": "",
									"name_japan": "",
									"name_xby": "",
									"multiple": '',
									"ifget": false
								}
							}
						})
					}


				}
			},
			create_bet() {
				this.show_bit = !this.show_bit
			},
			reset() {
				this.bet_money = ''
				if (this.tab == 1) {
					this.dzds_list.forEach((item) => {
						item.ifget = false
					})
				} else if (this.tab == 2) {
					this.number_list.forEach((item) => {
						item.ifget = false
					})
				} else if (this.tab == 3) {
					this.tesu_list.forEach((item) => {
						item.ifget = false
					})
				}

			},
			submit_bet() {
				if (this.userinfo.freeze_status == 0) {
					Toast.fail(this.$t('room_m.lock'));
					return
				}
				if (this.if_over == true) {
					Toast.fail(this.jaingqi_msg.open_no + this.$t('room_m.lockgame')); // "已经封盘!"
					return
				}
				if (this.bet_money == '' || this.bet_money == 0) {
					Toast.fail(this.$t('room_m.msg1')); //"請輸入投注金額"
					return
				} else if (Number(this.bet_money) > Number(this.userinfo.balance)) {
					Toast.fail(this.$t('room_m.msg2')); //"可用餘額額不足"
					return
				} else if (Number(this.bet_money) < Number(this.room_info.limit_amount)) {
					Toast.fail(this.$t('room_m.msg3') + this.room_info.limit_amount); //"單注最低投注額為"
					return
				} else if (Number(this.bet_money) > Number(this.room_info.max_amount)) {
					Toast.fail(this.$t('room_m.msg4') + this.room_info.max_amount); //"單注最高投注額為"
					return
				}

				if (this.tab == 1) {
					this.dzds_list.forEach((item) => {
						if (item.ifget == true) {
							this.get_bei_id.push(item.id)
						}
					})
				} else if (this.tab == 2) {
					this.number_list.forEach((item) => {
						if (item.ifget == true) {
							this.get_bei_id.push(item.id)
						}
					})
				} else if (this.tab == 3) {
					this.tesu_list.forEach((item) => {
						if (item.ifget == true) {
							this.get_bei_id.push(item.id)
						}
					})
				}

				var count = this.get_bei_id.length
				var total_bet = Number(count) * Number(this.bet_money)
				if (Number(total_bet) > Number(this.userinfo.balance)) {
					Toast.fail(this.$t('room_m.msg2')); //"您當前可用餘額不足！"
					return
				}
				this.post_data()
			},
			async post_data() {
				Toast.loading({
					duration: 0,
					message: this.$t('room_m.msg5'), //'投注中...',
					forbidClick: true,
				});
				const res = await this.$myRuquest({
					url: '/api/front/order/createOrder',
					method: "POST",
					data: {
						room_id: this.room_info.room_id,
						room_sub_id: this.room_info.room_sub_id,
						next_open_id: this.next_open_id,
						multiple_id: this.get_bei_id.toString(),
						amount: Number(this.bet_money)
					}
				})
				if (res.code == 200) {
					Toast.success(this.$t('room_m.msg6')); //'已投注'
					//成功后
					this.get_bei_id = []
					this.show_bit = !this.show_bit
					this.reset()
					this.get_userInfo(1)
					//this.get_HistoryOrder()


				} else {
					this.get_bei_id = []
					Toast.clear();
					
					
					switch(this.language_type){
						case 'zh':
						Toast.loading({
							duration: 0,
							message: res.msg.zhCN,
							forbidClick: true,
						});
						setTimeout(function() {
							Toast.clear();
						}, 1500)
						break;
						case 'zhCN':
						Toast.loading({
							duration: 0,
							message: res.msg.zh,
							forbidClick: true,
						});
						setTimeout(function() {
							Toast.clear();
						}, 1500)
						break;
						case 'en':
						Toast.loading({
							duration: 0,
							message: res.msg.en,
							forbidClick: true,
						});
						setTimeout(function() {
							Toast.clear();
						}, 1500)
						break;
						case 'xby':
						Toast.loading({
							duration: 0,
							message: res.msg.xby,
							forbidClick: true,
						});
						setTimeout(function() {
							Toast.clear();
						}, 1500)
						break;
						case 'han':
						Toast.loading({
							duration: 0,
							message: res.msg.han,
							forbidClick: true,
						});
						break;
						case 'eyu':
						Toast.loading({
							duration: 0,
							message: res.msg.eyu,
							forbidClick: true,
						});
						setTimeout(function() {
							Toast.clear();
						}, 1500)
						break;
						case 'japan':
						Toast.loading({
							duration: 0,
							message: res.msg.japan,
							forbidClick: true,
						});
						setTimeout(function() {
							Toast.clear();
						}, 1500)
						break;
						case 'franch':
						Toast.loading({
							duration: 0,
							message: res.msg.french,
							forbidClick: true,
						});
						setTimeout(function() {
							Toast.clear();
						}, 1500)
						break;
						case 'de':
						Toast.loading({
							duration: 0,
							message: res.msg.de,
							forbidClick: true,
						});
						setTimeout(function() {
							Toast.clear();
						}, 1500)
						break;
					}
					
					
					
					
				}


			},
			// websokect
			//连接websocket
			connectSocket() {
				let that = this;
				console.log('调用连接websocket')
				this.socketTask = uni.connectSocket({
						url: 'wss://mgmvip.cn/socket/',
						success(res) {
							console.log("websocket连接成功");
							// that.isSuccess = true
						},
						fail(err) {
							console.log("报错", err);
						}
					},

				);
				this.socketTask.onOpen(function(res) {
					console.log('WebSocket连接已打开！');
					//that.isSuccess = true
					//that.getStatus()
					that.heart()
				})
				this.socketTask.onMessage(function(res) {

					var new_mul_id = new Array()
					//that.handlerMsg(JSON.parse(res.data)) //这里是对获取到的数据进行操作
					//console.log(res.data)
					
					if (res.data !== '链接成功') {
						
						//console.log('1----' + res.data)
						var get_data = JSON.parse(res.data)
						
						if (get_data.type == "order") {
						
							var change_data = {
								"msg_type": 'order',
								"room_id": get_data.data.room_id,
								"room_sub_id": get_data.data.room_sub_id,
								"user_id": Number(get_data.data.user_id),
								"order_no": get_data.data.order_no,
								"amount": get_data.data.amount,
								"nickname": get_data.data.nickname,
								"create_time": get_data.data.create_time,
								"open_no": get_data.data.open_no,
								"multiple_id": get_data.data.multiple_id,
								
								"name": '',
								"name_zhCN": "",
								"name_en": "",
								"name_de": "",
								"name_eyu": "",
								"name_french": "",
								"name_han": "",
								"name_japan": "",
								"name_xby": "",
							}
							var str_new_mul_id = String(get_data.data.multiple_id)
							new_mul_id = str_new_mul_id.split(',')
							new_mul_id.forEach((item_list) => {
								that.all_plv.forEach((item_all) => {
									if (Number(item_list) == Number(item_all.id)) {
										change_data.multiple_id =str_new_mul_id 
											
										if (new_mul_id.length > 2 || new_mul_id.length == 2) {
											change_data.name += item_all.name + '，'
											
											change_data.name_zhCN+= item_all.name_zhCN + '，'
											change_data.name_en+= item_all.name_en + '，'
											change_data.name_de+= item_all.name_de + '，'
											change_data.name_eyu+= item_all.name_eyu + '，'
											change_data.name_french+= item_all.name_french + '，'
											change_data.name_han+= item_all.name_han + '，'
											change_data.name_japan+= item_all.name_japan + '，'
											change_data.name_xby+= item_all.name_xby + '，'
										} else {
											change_data.name = item_all.name
											
											change_data.name_zhCN= item_all.name_zhCN
											change_data.name_en= item_all.name_en
											change_data.name_de= item_all.name_de 
											change_data.name_eyu= item_all.name_eyu
											change_data.name_french= item_all.name_french
											change_data.name_han= item_all.name_han
											change_data.name_japan= item_all.name_japan 
											change_data.name_xby= item_all.name_xby 
											
										}							
									}
									
									
							
								})
							
							})
							
							
							
							// if(new_mul_id.length==1){
							// 	console.log('1111111111',new_mul_id[0])
							// 	console.log('333',get_data.data.nickname)
							// 	console.log('444',get_data.data.amount)
							// 	that.all_plv.forEach((item_all) => {
							// 		if (Number(new_mul_id[0]) == Number(item_all.id)) {
							// 			console.log('222222',item_all.id)
							// 			change_data.multiple_id =str_new_mul_id 
							// 			change_data.name = item_all.name						
							// 		}
																
							// 	})
							// }else{
							// 	new_mul_id.forEach((item_list) => {
							// 		that.all_plv.forEach((item_all) => {
							// 			if (Number(item_list) == Number(item_all.id)) {
							// 				// change_data.name = item_all.name
							// 				change_data.multiple_id =
							// 					str_new_mul_id //get_data.data.multiple_id.toString()
								
							// 				if (new_mul_id.length > 2 || new_mul_id.length == 2) {
							// 					change_data.name += item_all.name + '，'
							// 				} else {
							// 					change_data.name = item_all.name
							// 				}
								
								
							// 			}
								
							// 		})
								
							// 	})
							// }
							


							that.HistoryOrder.push(change_data)
							change_data = {
								"msg_type": 'order',
								"room_id": '',
								"room_sub_id": '',
								"user_id": '',
								"order_no": '',
								"amount": '',
								"nickname": '',
								"create_time": '',
								"open_no": '',
								"multiple_id": '',
								"name": '',
								"name_zhCN": "",
								"name_en": "",
								"name_de": "",
								"name_eyu": "",
								"name_french": "",
								"name_han": "",
								"name_japan": "",
								"name_xby": "",
							}

							that.to_top = that.to_top + that.HistoryOrder.length + 100
						} else if (get_data.type == "end") {
							that.if_over = true
							// var change_data = {
							// 	"type": 2,
							// 	"room_id": get_data.room_id,
							// 	"room_sub_id": get_data.room_sub_id,
							// 	"user_id": Number(get_data.user_id),
							// 	"order_no": get_data.order_no,
							// 	"amount": '',
							// 	"nickname": '',
							// 	"create_time": '',
							// 	"open_no": get_data.open_no,
							// 	"multiple_id": '',
							// 	"name": '',

							// }
							var change_data = {
								"msg_type": 'end',
								"room_id": get_data.room_id,
								"room_sub_id": get_data.room_sub_id,
								"user_id": Number(get_data.user_id),
								"order_no": '',
								"amount": '',
								"nickname": '',
								"create_time": '',
								"open_no": get_data.open_no,
								"multiple_id": '',
								"name": '',
								"name_zhCN": "",
								"name_en": "",
								"name_de": "",
								"name_eyu": "",
								"name_french": "",
								"name_han": "",
								"name_japan": "",
								"name_xby": "",
							}

							that.HistoryOrder.push(change_data)
							change_data = {
								"msg_type": 'end',
								"room_id": '',
								"room_sub_id": '',
								"user_id": '',
								"order_no": '',
								"amount": '',
								"nickname": '',
								"create_time": '',
								"open_no": '',
								"multiple_id": '',
								"name": '',
								"name_zhCN": "",
								"name_en": "",
								"name_de": "",
								"name_eyu": "",
								"name_french": "",
								"name_han": "",
								"name_japan": "",
								"name_xby": "",
							}
							that.to_top = that.to_top + that.HistoryOrder.length + 100

						} else if (get_data.type == "new") {
							//that.if_over = false
							// that.open_no = ''
							// that.run_time_val = ''
							// uni.setStorageSync('open_time', get_data.next_open_data.open_time)
							// that.open_no = get_data.next_open_data.open_no
							// that.run_time_val = get_data.next_open_data.open_time
							// that.next_open_id = get_data.next_open_data.id
							// clearInterval(that.time_build)
							// that.heart()
							// that.time_build = setInterval(() => {
							// 	that.showtime(that.run_time_val)

							// }, 1000)


						}

					}
					that.to_top = that.to_top + that.HistoryOrder.length + 100



				});

				this.socketTask.onError(function(res) {
					console.log('WebSocket连接打开失败，请检查！');
					console.log(res);

					// this.isSuccess = false
					// that.connectSocket()

					//进入重新连接
					that.reconnect();

				})
				// // 监听连接关闭 -
				this.socketTask.onClose((e) => {
					console.log('WebSocket连接关闭！');
					clearInterval(that.timer)
					that.timer = ''
					if (!that.isClose && !that.hand_close) {
						that.reconnect()
					}
				})
				console.log(this.socketTask)
			},
			//进入重新连接
			reconnect() {
				console.log('进入断线重连');
				// this.socketTask.close();
				this.socketTask = null;
				if (this.hand_close == false) {
					this.connectSocket()
				}


			},
			//发送消息
			sendSocketMessage(msg) {
				//console.log('发送信息')
				//console.log(msg)
				return new Promise((reslove, reject) => {
					this.socketTask.send({
						data: msg,
						success(res) {

							//console.log('发送成功0000000000', res)
							reslove(res)
						},
						fail(res) {
							console.log('发送失败')
							console.log(res)
							reject(res)
						}
					});
				})

			},

			//心跳
			heart() {
				let that = this;
				clearInterval(this.timer);
				this.timer = '';
				// let msg = {
				// 	"type": "heartbeat",
				// }
				let msg = {
					"type": "heartbeat",
					"room_id": that.pid,
					"room_sub_id": that.sub_id,
					"open_no": that.open_no,
					"uid": that.userinfo.id,
				}
				if (that.if_over == false) {
					that.timer = setInterval(() => {
						//回滚底部

						that.sendSocketMessage(JSON.stringify(msg))

						// .then(res => {
						// 	console.log('心跳成功')
						// }).catch(res => {
						// 	console.log('发送失败')
						// 	console.log((res))
						// })


					}, 10000)
				} else {
					clearInterval(this.timer);
				}




			},

		},
		onLoad(option) {
			this.pid = option.pid
			this.sub_id = option.id
			this.p_name = option.p_name
			this.get_subroom_msg(this.sub_id)
			// uni.setNavigationBarTitle({
			// 	title: option.p_name + '-' + option.sub_name
			// });
			//setTitle('dddddddd')


			var had_token = uni.getStorageSync('token')
			if (had_token == '') {
				uni.navigateTo({
					url: '/pages/login/login',
				});
			} else {

			}
		},
		onBackPress(event) {
			this.hand_close = true
			this.socketTask.close({
				success() {
					this.hand_close = true
					console.log('已关闭')
				}
			});
			uni.navigateTo({
				url: '/pages/room/room?pid=' + this.pid + '&room_name=' + this.p_name,
			});

			return true
		},
		destroyed() {
			clearInterval(this.time_build);
			this.time_build = null;
			this.socketTask.close({
				success() {
					this.hand_close = true
					console.log('已关闭')
				}
			});
		},
		onHide() {
			clearInterval(this.time_build);
			this.time_build = null;
			this.socketTask.close({
				success() {
					this.hand_close = true
					console.log('已关闭')
				}
			});

		},
		onShow() {

			var _this = this
			var had_token = uni.getStorageSync('token')
			this.language_type = uni.getStorageSync('language')

			if (had_token !== '') {


				_this.get_jiangqi_msg()
				//_this.get_HistoryOrder()

				// setInterval(() => {
				// 	_this.to_top = _this.to_top + _this.HistoryOrder.length + 100
				// }, 500)

			}

		}
	}
</script>

<style scoped>
	@import url('../../../components/u-parse/u-parse.css');

	/deep/ .van-fade-enter-active,
	.van-fade-leave-active {
		z-index: 91;
	}

	/deep/ .van-dialog {
		z-index: 92;
	}

	page {
		background: #ccc;
	}
	.jiange {
		background: #eaeaea;
	}
.room_topnav{ height: 44px; width: 100%; display: flex; background-color: #000;}
.room_tn_l{ width: 30px; color: #fff; font-size: 25px;padding: 0 5px;line-height: 44px; text-align: center;}
.room_tn_mdl{ flex: 1; text-align: center; line-height: 44px; color: #fff; font-size: 16px;}
.room_tn_r{  color: #fff; font-size: 14px; line-height: 44px; padding: 0 10px;}
	.ge_meng {
		height: 100vh;
		width: 100vw;
		display: block;
		position: fixed;
		z-index: 20;
		left: 0;
		top: 0;
		background: rgba(0, 0, 0, 0.5);
	}

	.top_line {
		display: flex;
		background: #000;
		padding: 15px 0;
	}

	.top_l_l {
		width: 50%;
		position: relative;
	}

	.top_l_l::after {
		position: absolute;
		top: 0;
		right: 0;
		content: '';
		height: 65px;
		width: 1px;
		background: #fff;
	}

	.top_ltit {
		font-size: 14px;
		color: #fff;
		text-align: center;
		padding: 10px 0;
	}

	.top_l_num {
		display: flex;
		justify-content: center;
		color: #fff;
		line-height: 25px;
	}

	.jilu_are_zi {
		width: 33.3%;
		line-height: 23px;
		color: #000;
		font-size: 12px;
		text-align: center;
	}

	.top_l_num_zi {
		width: 25px;
		height: 25px;
		background: #fff;
		color: #000;
		text-align: center;
		line-height: 25px;
		border-radius: 5px;
		margin: 0 2px;
	}

	.top_l_num_zis {
		width: 23px;
		height: 23px;
		border: 1px solid #fff;
		color: #fff;
		text-align: center;
		line-height: 23px;
		border-radius: 50%;
		margin: 0 2px;
		font-size: 14px;
	}

	.top_l_num_zi3 {
		width: 23px;
		height: 23px;
		display: block;
		border: 1px solid #409eff;
		color: #409eff;
		text-align: center;
		line-height: 23px;
		border-radius: 50%;
		margin: 0 2px;
	}

	.he {
		background: #409eff;
	}

	.top_l_r {
		width: 50%;
	}

	.open_line {
		display: flex;
		padding: 5px 10px;
	}

	.open_line_l {
		width: 130px;
		color: #fff;
		line-height: 23px;
		font-size: 14px;
	}

	.open_line_mdl {
		flex: 1;
	}

	.open_line_r {
		width: 30px;
	}

	.jilu_are {
		background: #fff;
		border-radius: 8px;
		width: calc(100% - 46rpx);
		position: absolute;
		top: 55px;
		left: 13px;
		z-index: 80;
		padding-bottom: 15px;
	}

	.jilu_are_mb {
		background: rgba(0, 0, 0, 0.5);
		z-index: 70;
		position: absolute;
		top: 35px;
		left: 0px;
		width: 100%;
		height: calc(100vh - 100px);
	}

	.bet_main {
		height: calc(100vh - 280px);
		overflow-y: scroll;
	}

	.bet_main_line {
		height: 40px;
		background: #fff;
		display: flex;
		justify-content: space-around;

		padding: 10px 0;

	}

	.btn_left {
		width: 45%;
		height: 40px;
		border-radius: 20px;
		text-align: center;
		color: #fff;
		font-size: 14px;
		background: #000;
		line-height: 40px;
	}

	.btn_right {
		width: 45%;
		width: 45%;
		height: 40px;
		line-height: 40px;
		border-radius: 20px;
		text-align: center;
		color: #fff;
		font-size: 14px;
		background: #000;
	}

	.more_list {
		background: #fff;
		width: 100px;
		border-radius: 8px;
		position: absolute;
		top: 50px;
		right: 0px;

	}

	.more_list_tit {
		font-size: 14px;
		text-align: center;
		line-height: 35px;
	}

	.sjx {
		position: absolute;
		top: 40px;
		right: 9px;

		border-left: 16px solid transparent;
		border-right: 16px solid transparent;
		border-bottom: 16px solid #fff;
	}

	.bet_num_are {
		background: #fff;
		height: 500px;
		position: absolute;
		bottom: 0;
		left: 0;
		z-index: 999;
		width: 100vw;
	}

	.bet_num_are_top {
		display: flex;
		width: 100%;
	}

	.bet_num_are_span {
		width: 33.3%;
		text-align: center;
		line-height: 40px;
		font-size: 14px;
		color: #000;
		border-bottom: 2px solid #fff;
	}

	.bet_num_are_spanhover {
		border-bottom: 2px solid #000;
	}

	.bet_num_arem {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		height: 330px;
		overflow-y: scroll;
		align-content: flex-start;
	}

	.bet_imput_line {
		display: flex;
		padding: 10px 0
	}

	.bet_lines {
		width: 50%;
	}

	.bet_linesm {
		margin: 10px 10px;
		font-size: 12px;
		border: 1px solid #ccc;
		line-height: 35px;
		border-radius: 8px;
		display: flex;
	}

	.bet_lsm_l {
		
		flex: 1;
		text-align: left; padding-left: 10px;
	}

	.bet_lsm_r {
		width: 30%;
		text-align: right;
		padding-right: 10px;
	}

	.bet_lsm_rr {
		width: 30%;
		text-align: center;
	}

	.bet_line_get {
		border: 1px solid #409eff;
		background: #409eff;
		color: #fff;
	}

	.other_tolk {
		display: flex;
		width: 95%;

		margin: 15px auto;
	}

	.other_img {
		width: 40px;
		height: 40px;

		border-radius: 50%;
	}

	.other_img image {
		width: 40px;
		height: 40px;
		border-radius: 50%;
	}

	.other_msg {
		flex: 1;
		margin-left: 18px;
		position: relative;
		background: #fff;
		border-radius: 8px;
		padding: 5px 10px;
		position: relative;
		z-index: 10;
	}

	.other_sjx {
		position: absolute;
		top: 10px;
		left: -9px;
		border-top: 10px solid transparent;
		border-bottom: 10px solid transparent;
		border-right: 10px solid #fff;
	}

	.other_sjxr {
		position: absolute;
		top: 10px;
		right: -9px;
		border-top: 10px solid transparent;
		border-bottom: 10px solid transparent;
		border-left: 10px solid #fff;
	}

	.sys_msg {
		width: 50%;
		margin: 20px auto;
		padding: 5px 10px;
		background-color: #fff;
		border-radius: 8px;
		text-align: center;
		font-size: 12px;
	}

	.sys_msg_tit {
		color: #FF643A;
		line-height: 30px;
	}

	.sys_msg_com {
		color: #409eff;
		line-height: 20px;
	}

	.bet_msg_line,
	.bet_msg_line2 {
		display: flex;
		font-size: 13px;
		color: #ccc;
		line-height: 30px;
		position: relative;
	}

	.bet_msg_line2::after {
		position: absolute;
		left: 0;
		height: 1px;
		width: 100%;
		background: #ccc;
		bottom: -3px;
		content: '';
	}

	.bet_msg_l {
		width: 50%;
	}

	.bet_msg_r {
		width: 50%;
		text-align: right;
		
	}
	.bet_msg_r2 {
		
		width: 100%;
		text-align: left;
	}

	.color_nb {
		color: #409eff;
	}

	.bet_msg_tt {
		font-size: 14px;
	}

	.msg_are {
		padding: 20px 15px;
		font-size: 14px;
		line-height: 25px;
	}
</style>
