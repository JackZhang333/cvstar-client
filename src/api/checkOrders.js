import axios from 'axios'

export default {
    getOrders : async (userId,cb)=>{
        let {data} = await axios.get(`/api/checkOrders/?userId=${userId}`)
        cb(data)
    },
    addOrder:async(order,cb)=>{
        let {data} = await axios.post('/api/addOrder',order)
        cb(data)
    }
}