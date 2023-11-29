import App from './App'
import { myRequest,baseurl } from './util/api.js'
import i18n from './i18n/i18n'

Vue.prototype.$myRuquest = myRequest
Vue.prototype.$baseurl = baseurl
Vue.prototype._i18n = i18n


// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif