import CDialog from '../components/CDialog.vue'
import Vue from 'vue'

function dialogConfirm() {
    alert('弹窗中点击了确定按钮')
}
let defaultProps = {
    cancelName: '不清空哟',
    confirmName: '确定清空吗',
    contentMsg: '确定清空所有商品？?',
    confirmHandler: dialogConfirm
}

export default function dialog(dialog){

    let props = dialog || defaultProps
    const Instance = new Vue({
        name:'dialogWrapper',
        render(h){
            return h(CDialog,{props})
        }
    })
    let dialogWrapper = Instance.$mount()

    document.body.appendChild(dialogWrapper.$el)

    let dialogVm = dialogWrapper.$children[0]
    dialogVm.openDialog()

}