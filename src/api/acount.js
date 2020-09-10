import axios from 'axios'

export default {
    toLogin:async ({name, password, verifyImage},cb)=>{
    let {data} = await axios.get(`/api/login/?name=${name}&&password=${password}&&verifyImage=${verifyImage}`)
    cb(data)
},
    toRegister:async(user,cb)=>{
        let {data} = await axios.post('/api/register',user)
        cb(data)
    },
    editStoreName:async(userInfo,cb)=>{
        // window.console.log(userInfo)
        let {data} =await axios.post('/api/editStoreName',userInfo)
        cb(data)
    },
    editPassword:async(userInfo)=>{
        let {data} = await axios.post('/api/editPassword',userInfo)
        return data
    }
} 