
import checkOrder from '../../api/checkOrders'

const state = ()=>({
    checkOrders:[]
})

const mutations = {
    addCheck(state,check){
        // window.console.log(check)
        state.checkOrders.unshift(check)
        // window.console.log(state.checkOrders)
    },
    setChecks(state,checks){
        state.checkOrders = checks
    }
}
const actions = {
    getChecks({commit,rootState}){
        checkOrder.getOrders(rootState.acount.userId,orders=>{
            commit('setChecks',orders)
        })
    },
    addCheck({commit},order){
        checkOrder.addOrder(order,({code,msg})=>{
            if(code==1){
                commit('addCheck',order)
                window.console.log(msg)
            }
        })
    }
}
const getters = {
    //根据最原始的进货单列表数据得到在进货单列表展示的简要数据
    getSimpleCheck(state){
        let simplecheck = state.checkOrders.map(v=>{
            //简要数据的图片数值
            let pics = v.products.map(v=>v.pic).slice(0,3)
            //累加收银商品的总价得到简要数据的合计收银金额
            let totalMoney = v.products.reduce((pre,v)=>{
                return pre + Number(v.totalPrice)
            },0)
            //计算每单的毛利
            let totalProfile = v.products.reduce((pre,v)=>{
                let profile = (v.price - v.pPrice)*v.count
                return pre + profile
            },0)
            //计算每单的商品数量
            let totalCount = v.products.reduce((pre,v)=>{
                return pre + v.count
            },0)
            return {
                pics,totalMoney,totalProfile,totalCount,...v
            }
        })
        return simplecheck
    }
}

export default {
    namespaced:true,
    state,
    mutations,
    actions,
    getters,
}