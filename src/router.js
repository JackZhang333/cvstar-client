import Router from 'vue-router'
import Vue from 'vue'

import Home from './pages/Home.vue'
import Login from './pages/Login.vue'
import Register from './pages/Register.vue'
import Products from './pages/Products.vue'
import Purchase from './pages/Purchase.vue'
import Check from './pages/Check.vue'
import Order from './pages/Order.vue'
import Setting from './pages/Setting.vue'

Vue.use(Router)

const routes = [
    { path:'/home', component:Home, children:[
        { path:'products',component:Products },
        { path:'purchase',component:Purchase },
        { path:'check',component:Check },
        { path:'order',component:Order },
        { path:'setting',component:Setting },
    ],
    redirect:'/home/check' 
},
    { path:'/login', component:Login },
    { path:'/', component:Login },
    { path:'/register', component:Register },
]

const router = new Router({
    mode:'history',
    routes
})

export default router