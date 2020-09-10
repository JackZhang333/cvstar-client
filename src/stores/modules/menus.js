import menu from '../../api/menus'

const state = ()=>({
    menus:[],
})

const mutations = {
    addMenu(state,payload){
        //在倒数第二个位置插入新菜单
        state.menus.splice(state.menus.length-1,0,payload)
    },
    removeMenu(state,payload){
        let index = state.menus.findIndex(v=>v==payload)
        state.menus.splice(index,1)
    },
    setMenu(state,menus){
        state.menus = menus
    }
}
const actions = {
    getMenus:({commit,rootState})=>{
        menu.getMenus(rootState.acount.userId,menus=>{
            // window.console.log(menus)
            let menuNames = menus.map(v=>v.name)
            // window.console.log(menus,typeof(menus))
            commit('setMenu',menuNames)
        })
    },
    addMenu:({commit,rootState},data)=>{
        // window.console.log('数据moduel接受到了这条信息'+data)
        //请求服务器，新建一条菜单数据，如果新建成功。则在本地状态也增加一条
        //通过 name 删除，而非 id 所以不会引发错误
        menu.addMenu({userId:rootState.acount.userId,name:data},({code,msg})=>{
            if(code==1){
                commit('addMenu',data)
                window.console.log(msg)
            }else if(code==-1){
                window.console.log(msg)
            }
        })
    },
    removeMenu:({commit},name)=>{
        menu.removeMenu(name,({code,msg})=>{
            if(code==1){
                commit('removeMenu',name)
                window.console.log(msg)
            }else if(code==-1){
                window.console.log(msg)
            }
        })
    }

}
const getters = {
    //得到包含“全部分类”的的类目，用于筛选
    allMenus(state){
        let allMenus =['全部分类',...state.menus,'其他分类']
     
      return allMenus
    },
    otherMenus(state){
        let otherMenus = [...state.menus]
        otherMenus.push('其他分类')
        return otherMenus
    }
    //得到所有的类目，及其对应的商品数量
    // getCategaryInfos(state,getters,rootState,rooterGetters){
    //     window.console.log(rootState,getters,rooterGetters)
    //     let categaryInfos = state.menus.map(menu=>{
    //         let count = rootState.products.products.filter(v=>v.categary==menu).length
    //         return {
    //             menu,count
    //         }
    //     })
    //     return categaryInfos
    // }
}

export default {
    namespaced:true,
    state,
    mutations,
    actions,
    getters
}