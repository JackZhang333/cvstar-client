import Vue from 'vue'
import feedback from './feedback'
import dialog from './dialog'
import toast from './toast'
import showNotice from './notice'

Vue.prototype.$feedback = feedback
Vue.prototype.$dialog = dialog
Vue.prototype.$toast = toast
Vue.prototype.$showNotice = showNotice