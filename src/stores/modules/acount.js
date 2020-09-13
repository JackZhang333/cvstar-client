import acount from '../../api/acount'

const state = ()=>({
    isLogin: true,
    storeName: '金旺福便利超市',
    acount:'13221059343',
    userId:'',
    num: 12,
    price: 35.50,
})

const mutations = {
    
    toLogin(state,acountInfos) {
        state.isLogin = true
        state.storeName = acountInfos.storeName
        state.acount = acountInfos.userName
        state.userId = acountInfos.id
        // window.console.log('拿到了userID:'+state.userId)
    },
    toLogout(state) {
        state.isLogin = false
    },
    editStoreName(state, payload) {
        // window.console.log('要修改店铺名称了：'+payload)
        state.storeName = payload
    },
    calcCheckSummary(state, payload) {
        state.num = payload.num
        state.price = payload.price
    },
}

const actions = {
    async editPassword({state},infos){
        //调用api请求修改密码，拼接数据加入userName
        return await acount.editPassword({userName:state.acount,...infos})
    },
    editStoreName({commit,state},infos){

        acount.editStoreName({userName:state.acount,storeName:infos},({code,msg})=>{
            if(code==1){
                window.console.log(msg)
                commit('editStoreName',infos)
            }
        })
    },
}

export default {
    namespaced:true,
    state,
    actions,
    mutations,
}