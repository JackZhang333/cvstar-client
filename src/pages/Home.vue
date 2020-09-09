<template>
    <div>
        <div class="home-container">
            <home-topbar/>
            <div class="home-content">
                <home-sidebar/>
                <div class="pagecontent">
                    <router-view style="height:100%"></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import HomeSidebar from '../pagecomps/HomeSidebar'
import HomeTopbar from '../pagecomps/HomeTopbar'
    export default {
        name:'home',
        components:{ HomeSidebar, HomeTopbar},
        created(){
            // this.$router.push('/home/products')
            // console.log(this)
            //如果已经登录过了就从本地去数据提交到数据管理
            const userInfos = localStorage.getItem('userInfos')
            if(userInfos){
                this.$store.commit('acount/toLogin',JSON.parse(userInfos))
            }
            
        },
        //添加单组件的路由守卫
        beforeRouteEnter(to,from,next){
            let some =false
            if(some){
                window.console.log(to,from)
            }
            
            next(function(vm){
                let {isLogin} = vm.$store.state.acount
                
                // window.console.log('是否已登录：'+JSON.stringify(isLogin))
                if(isLogin){
                    // window.console.log('你可以进来了')
                }else {
                    
                    vm.$router.push('/')
                    alert('请先登录账户')
                }
            })
        }
    }
</script>

<style lang="css" scoped>
    .home-container {
        width: 100vw;
        height: 100vh;
        min-width: 1160px;
        background: #e5e5e5;
        display: flex;
        flex-direction:column;
    }
    
    .home-content {
        flex: 1;
        width: 100%;
        background: #fff;
        display: flex;
        overflow: auto;
    }
    
    .pagecontent {
        flex: 1;
        height: 100%;
        background: pink;
        overflow: auto;
    }
    
    
</style>