
import product from '../../api/products'

const state = ()=>({
    products:[]
})

const mutations = {
  //初始化数据
    setProducts(state,products){
      state.products = products
    },
    //删除、新增、编辑商品列表
    removeProduct(state,payload){
        window.console.log('接受到了删除产品的通知'+payload)
        let index = state.products.findIndex(v=>v.barCode==payload)
        state.products.splice(index,1)
    },
    addProduct(state,payload){
        state.products.unshift(payload)
    },
    editProduct(state,payload){
        let index = state.products.findIndex(v=>v.barCode==payload.barCode)
        state.products.splice(index,1,payload)
        // state.products[index] = payload
    },
    //把删除分类的商品归为“其他分类”
    editMenuOfProducts(state,menu){
        state.products.forEach((v,i)=>{
            if(v.categary == menu ){
                let newP = {...v,categary:'其他分类'}
                state.products.splice(i,1,newP)
            }
        })
        
    }
}
const actions = {
  getAllProducts({commit,rootState}){
    product.getProducts(rootState.acount.userId,products=>{
      commit('setProducts',products)
    })
  },
  addProduct({commit,rootState},data){
    product.addProduct({...data,userId:rootState.acount.userId},({code,msg,backData})=>{
      if(code==1){
        //此时不能传data里的pic(base64字符串),而是提交服务器返回的图片地址
        // window.console.log('拿到了服务器回传的图片地址：'+picPath)
        //新增时，尝试不提交到本地，要提交也要提交服务器返回的，否则就不会含有 id/userId等值，导致报错
        commit('addProduct',backData)
        window.console.log(msg)
      }
    })
  },
  removeProduct({commit},id){
    product.removeProduct(id,({code,msg})=>{
      if(code==1){
        commit('removeProduct',id)
        window.console.log(msg)
      }
    })
  },
  updateProduct({commit},data){
    product.updateProduct(data,({code,msg})=>{
      //此时不能传data里的pic(base64字符串),而是提交服务器返回的图片地址
      if(code == 1){
        //更新时，可以提交data,因为此时dada中含有 id/userId等字段
        commit('editProduct',data)
        window.console.log(msg)
      }
    })
  }
}
const getters = {
    //通过返回一个函数，给geter传递参数
    searchProduct(state){

        return (data)=>{
          //返回名称或编码中含有关键词的商品对象
          return state.products.find(v=>v.barCode.includes(data)||v.name.includes(data))
  
        }
      },
    quickAddedProducts(state){
      return state.products.filter(v=>v.quickAdd == true)
    }
}

export default {
    namespaced:true,
    state,
    mutations,
    getters,
    actions,
}