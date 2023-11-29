<template>
	<view>
		<view class="mainare">
			<view class="msgheadare">
				
				<view class="titel"  v-if="language_type=='zhCN'">{{data_content.title}}</view>
				<view class="titel"   v-if="language_type=='zh'">{{data_content.title_zhCN}}</view>
				<view class="titel" v-if="language_type=='en'">{{data_content.title_en}}</view>
				<view class="titel" v-if="language_type=='de'">{{data_content.title_de}}</view>
				<view class="titel" v-if="language_type=='eyu'">{{data_content.title_eyu}}</view>
				<view class="titel" v-if="language_type=='han'">{{data_content.title_han}}</view>
				<view class="titel" v-if="language_type=='xby'">{{data_content.title_xby}}</view>
				<view class="titel" v-if="language_type=='franch'">{{data_content.title_french}}</view>
				<view class="titel" v-if="language_type=='japan'">{{data_content.title_japan}}</view>
			</view>
			<view class="msg"> 
				
				<u-parse :content="data_content.content" v-if="language_type=='zhCN'" :noData="$t('notice.no_record')"></u-parse>
				<u-parse :content="data_content.content_zhCN" v-if="language_type=='zh'" :noData="$t('notice.no_record')"></u-parse>
				<u-parse :content="data_content.content_en" v-if="language_type=='en'" :noData="$t('notice.no_record')"></u-parse>
				<u-parse :content="data_content.content_de" v-if="language_type=='de'" :noData="$t('notice.no_record')"></u-parse>
				<u-parse :content="data_content.content_eyu" v-if="language_type=='eyu'" :noData="$t('notice.no_record')"></u-parse>
				<u-parse :content="data_content.content_han" v-if="language_type=='han'" :noData="$t('notice.no_record')"></u-parse>
				<u-parse :content="data_content.content_xby" v-if="language_type=='xby'" :noData="$t('notice.no_record')"></u-parse>
				<u-parse :content="data_content.content_french" v-if="language_type=='franch'" :noData="$t('notice.no_record')"></u-parse>
				<u-parse :content="data_content.content_japan" v-if="language_type=='japan'" :noData="$t('notice.no_record')"></u-parse>
				
			</view>
		</view>
	</view>
</template>

<script>
	import uParse from '@/components/u-parse/u-parse.vue'
	export default {
		data() {
			return {
				data_content:{},
				language_type:'zhCN'
			}
		},
		components:{
			uParse
		},
		methods: {
			async get_detail(row_id) {
				var _this = this
				const res = await this.$myRuquest({
					url: '/api/front/notice/getInfo',
					method: "POST",
					data: {
						id: row_id
					},
			
				})
				if (res.code == 200) {
					this.data_content=res.data
						 
				}
			},
		},
		onLoad(optin) {
			this.get_detail(optin.id)
			this.language_type=uni.getStorageSync('language')
			uni.setNavigationBarTitle({
				title: this.$t('notice.title')
			})
		},
		onShow() {
			
		}
	}
</script>

<style scoped>
	@import url('../../../components/u-parse/u-parse.css');
	page{
		background: #000;
	}
	.titel {
		font-size: 16px;
		font-weight: bold;
		 color: #fff;
	}

	.times {
		font-size: 13px;
		line-height: 35px; color: #fff;
	}

	.msg {
		font-size: 13px;
		line-height: 25px;
		padding: 15px;
		
		background: #fff;
	}

	.msgheadare {
		padding: 15px;
	}
</style>
