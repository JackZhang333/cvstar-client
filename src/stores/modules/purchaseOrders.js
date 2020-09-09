import "../../assets/coffee.png";
import "../../assets/tea.png";
import "../../assets/product-default.png";

import purchaseOrder from '../../api/purchaseOrders'

const state = ()=>({
    purchaseOrders:[]
})

const mutations = {
    addPurchase(state,purchase){
        state.purchaseOrders.unshift(purchase)
    },
    setOrders(state,orders){
        state.purchaseOrders = orders
    }
}
const actions = {
    getPurchaseOrders({commit,rootState}){
       purchaseOrder.getPurchaseOrders(rootState.acount.userId,orders=>{
           commit('setOrders',orders)
       })
    },
    addPurchase({commit,rootState},order){
        purchaseOrder.addPurchaseOrder(
            {...order,userId:rootState.acount.userId},
            ({code,msg})=>{
            if(code==1){
                commit('addPurchase',order)
                window.console.log(msg)
            }
        })
    }
}
const getters = {
    //根据最原始的进货单列表数据得到在进货单列表展示的简要数据
    getSimplePurchase(state){
        let simplePurchase = state.purchaseOrders.map(v=>{
            //简要数据的图片数值
            let pics = v.products.map(v=>v.pic).slice(0,3)
            //累加进货单商品的总价得到简要数据的订货单金额
            let totalMoney = v.products.reduce((pre,v)=>{
                return pre + Number(v.totalPrice)
            },0)
            return {
                pics,totalMoney,...v
            }
        })
        return simplePurchase
    }
}

export default {
    namespaced:true,
    state,
    mutations,
    actions,
    getters,
}