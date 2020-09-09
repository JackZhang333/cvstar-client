import axios from 'axios'

export default {
    getPurchaseOrders:async (userId,cb)=>{
        let {data} = await axios.get(`/api/purchaseOrders/?userId=${userId}`)
        cb(data)
    },
    addPurchaseOrder:async(order,cb)=>{
        let {data} = await axios.post('/api/addPurchaseOrder',order)
        cb(data)
    }
}