import Toast from '../components/Toast.vue'
import Vue from 'vue'
//保证全局只存在一个 toastWrapper和toast实例
let Instance = new Vue({
    name: 'toastWrapper',
    render(h) {
        return h(Toast)
    }
})

export default function showToast(newToast) {

    let toastWrapper = Instance.$mount()
    document.body.appendChild(toastWrapper.$el)

    let toast = toastWrapper.$children[0]
    toast.addToast(newToast)
}