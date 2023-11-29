<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
			var ifhad=uni.getStorageSync('language')
			if(ifhad ==''||ifhad ==undefined){
				uni.setStorageSync('language','en')
			}
			
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "/wxcomponents/vant/dist/common/index.wxss";
	page {
		/* background-color: #F7F8FC; */
		max-width: 750px;margin: auto;
	}
	.input_line_are,.input_line_are2{ display: flex; width: 100%; background: #fff; padding: 10px 0;position: relative;}
	.input_line_l{ width: 112px; text-align: center; color: #323233; font-size: 14px; line-height: 35px;}
	.input_line_r{ flex: 1;}
	.input_line_are2::after{ content: ''; position: absolute;width: 90%; height: 1px; background: #d9d9e3; left: 5%; bottom: 0;}
	.input_com2{ height: 35px; line-height: 35px; font-size: 14px; text-align: left; flex: 1; width: 100%;}
	.input_com{ height: 35px; line-height: 35px;}
	.nav_bar{ height: 50px;padding-top: 10px; position: fixed;z-index:80; left:0;bottom:0;background: #141414; width: 100vw; display: flex;}
	.nav_zi{ width: 50%; font-size: 12px; text-align: center; color: #898989;}
	.nav_hover{ color: #EAC477;}
	
	.pop_are {
		height: auto;
		padding-top: 20px;
		width: calc(100vw - 32px);
		margin: auto;
		background: #fff;
		border-radius: 8px;
	}
	
	.tit {
		font-size: 16px;
		text-align: center;
		line-height: 30px;
		padding-bottom: 10px;
	}
	
	.ft_btnline {
		display: flex;
		justify-content: space-around;
		padding: 16px 16px
	}
</style>
