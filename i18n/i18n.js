import Vue from 'vue'
import VueI18n from 'vue-i18n'
import zhCN from './langs/zh-CN'
import en from './langs/en'
import zh from './langs/zh'
import de from './langs/de'
import eyu from './langs/eyu'
import franch from './langs/franch'
import han from './langs/han'
import japan from './langs/japan'
import xby from './langs/xby'
Vue.use(VueI18n)

const messages = {
	en, //英语
	zhCN, //中文繁体
	zh, //中文
	de, //德语
	eyu, //俄语
	franch, //法语
	han, //韩语
	japan, //日语
	xby //西班牙

}
const i18n = new VueI18n({
	locale: uni.getStorageSync('language'), //默认中文，也可根据系统语言动态设置
	messages
})

export default i18n
