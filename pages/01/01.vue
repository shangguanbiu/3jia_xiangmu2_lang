<template>
	<view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				room_id:14,
				room_sub_id:3,
				uid:3,
				open_no:20230606167
			}
		},
		methods: {
			// websokect
			//连接websocket
			connectSocket() {
				let that = this;
				console.log('调用连接websocket')
				this.socketTask = uni.connectSocket({
						url: 'ws://101.37.80.196:2346',
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
					console.log('收到服务器内容：------------' + res.data);
					//that.handlerMsg(JSON.parse(res.data)) //这里是对获取到的数据进行操作

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
					if (!that.isClose) {
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
				this.connectSocket()

			},
			//发送消息
			sendSocketMessage(msg) {
				console.log('发送信息')
				console.log(msg)
				return new Promise((reslove, reject) => {
					this.socketTask.send({
						data: msg,
						success(res) {
							
							console.log('发送成功0000000000', res)
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
					"room_id": this.room_id,
					"room_sub_id": this.room_sub_id,
					"open_no": this.open_no,
					"uid": this.uid,
				}
				this.timer = setInterval(() => {
					that.sendSocketMessage(JSON.stringify(msg))

					// .then(res => {
					// 	console.log('心跳成功')
					// }).catch(res => {
					// 	console.log('发送失败')
					// 	console.log((res))
					// })

				}, 5000)
			},
		},
		onShow() {
			this.connectSocket()
		}
	}
</script>

<style>

</style>
