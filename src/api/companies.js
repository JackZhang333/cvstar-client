import axios from 'axios'

export default {
    getCompanies : async (userId,cb)=>{
        let { data } = await axios.get(`/api/companies/?userId=${userId}`)
        cb(data)
    },
    addCompany:async(company,cb)=>{
        let {data} = await axios.post('/api/addCompany',company)
        cb(data)
    },
    removeCompany:async(id,cb)=>{
        let {data} =await axios.post('/api/removeCompany',{id})
        cb(data)
    }
}