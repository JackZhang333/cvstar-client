import axios from 'axios'

export default {
    getMenus:async (userId,cb)=>{
        let {data} = await axios.get(`/api/menus/?userId=${userId}`)
        cb(data)
    },
    async addMenu(menu,cb){
        const {data} =await axios.post('/api/addMenu',menu)
        cb(data)
    },
    async removeMenu(name,cb){
        const {data} = await axios.post('/api/removeMenu',{name})
        cb(data)
    }
}