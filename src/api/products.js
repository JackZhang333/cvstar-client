import axios from 'axios'

export default {
    async getProducts(userId,cb){
        let products = await axios.get(`/api/products/?userId=${userId}`)
        cb(products.data)
    },
    async addProduct(product,cb){
        let {data} = await axios.post('/api/addProduct',product)
        cb(data)
    },
    async removeProduct(id,cb){
        let {data} = await axios.post('/api/removeProduct',{id})
        cb(data)
    },
    async updateProduct(product,cb){
        let {data} = await axios.post('/api/updateProduct',product)
        cb(data)
    },
    async getCloudProduct(barcode,cb){
        let {data} = await axios.post('/api/getCloudProduct',barcode)
        cb(data)
    }
}