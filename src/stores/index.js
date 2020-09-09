import Vue from 'vue'
import Vuex from 'vuex'

import acount from './modules/acount'
import menus from './modules/menus'
import companies from './modules/companies'
import products from './modules/products'
import checkOrders from './modules/checkOrders'
import purchaseOrders from './modules/purchaseOrders'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
    getters,
    modules:{
        acount,
        menus,
        companies,
        products,
        checkOrders,
        purchaseOrders,
    }
})