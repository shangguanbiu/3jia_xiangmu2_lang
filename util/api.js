
// const BASE_URL2 = 'https://test.net:9005'
const BASE_URL = 'https://mgmvip.cn/'

export const baseurl=()=>{
	return BASE_URL
}
export const myRequest = (options) => {
	return new Promise((resolve, reject) => {
		if (options.type == undefined) {
			let token = uni.getStorageSync('token')
			let sid = uni.getStorageSync('sid')
			uni.request({
				url: BASE_URL + options.url,
				method: options.method || 'GET',
				data: options.data || {},
				header: options.header || {
					"XX-Api-Version": 1,
					"XX-Device-Type":'mobile',
					"XX-Token":token,
					'content-type': 'application/json'
					
				},
				success: (res) => {
					if (res.data.code == 9999) {
						 uni.showToast({
							title: '登錄已失效請重新登錄'
						})
						
						setTimeout(function() {
							uni.navigateTo({
								url: '/pages/login/login',
							})
						}, 1500)
						return
					}
					resolve(res.data)
				},
				fail: (err) => {
					uni.showToast({
						title: '請求接口失敗'
					})
					reject(err)
				}
			})
		} else {
			uni.request({
				url: BASE_URL2 + options.url,
				method: options.method || 'GET',
				data: options.data || {},
				success: (res) => {
					if (res.data.code !== 200) {
						return uni.showToast({
							title: '获取数据失败'
						})
					}
					resolve(res.data)
				},
				fail: (err) => {
					uni.showToast({
						title: '请求接口失败'
					})
					reject(err)
				}
			})
		}
	})
}
