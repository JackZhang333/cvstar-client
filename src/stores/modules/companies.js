import company from '../../api/companies'

const state = ()=>({
    companies:[]
})

const mutations = {
    addCompany(state,company){
        state.companies.unshift(company)
    },
    removeCompany(state,id){
        let index = state.companies.findIndex(v=>v.id == id)
        state.companies.splice(index,1)
    },
    setCompany(state,companies){
        state.companies = companies
    }
}
const actions = {
    getCompanies({commit,rootState}){
        company.getCompanies(rootState.acount.userId,companies=>{
            commit('setCompany',companies)
        })
    },
    addCompany({commit,rootState},c){
        company.addCompany({userId:rootState.acount.userId,...c},({code,msg,backData})=>{
            if(code==1){
                //把服务器返回的对象提交给数据状态，避免产生缺少 ID 的对象，引发删除错误
                commit('addCompany',backData)
                window.console.log(msg)
            }
        })
    },
    removeCompany({commit},id){
        company.removeCompany(id,({code,msg})=>{
            if(code==1){
                commit('removeCompany',id)
                window.console.log(msg)
            }
        })
    }
}
const getters = {
    getAllCompany(state){
        let allCompany = [...state.companies]
        allCompany.unshift({name:'全部供应商',phone:''})
        allCompany.push({name:'其他供应商',phone:''})
        return allCompany.map(v=>v.name)
    },
    getOtherCompany(state){
        let oterCompany = [...state.companies]
        oterCompany.push({name:'其他供应商',phone:''})
        return oterCompany
    }
}

export default {
    namespaced:true,
    state,
    mutations,
    actions,
    getters,
}