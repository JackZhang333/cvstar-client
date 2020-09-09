export default {
    //得到所有的类目，及其对应的商品数量
    getCategaryInfos(state){
        let oterMenus = [...state.menus.menus,'其他分类']
        let categaryInfos = oterMenus.map(menu=>{
            let count = state.products.products.filter(v=>v.categary==menu).length
            return {
                menu,count
            }
        })
        return categaryInfos
    }
}