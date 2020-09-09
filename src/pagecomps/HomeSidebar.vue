<template>
  <div class="sidebar">
    <router-link to="/home/products">
        <sidebar-button :iconProp='icons[0]'/>
    </router-link>
    <router-link to="/home/purchase">
        <sidebar-button :iconProp='icons[1]'/>
    </router-link>
    <router-link to="/home/check">
        <sidebar-button :iconProp='icons[2]'/>
    </router-link>
    <router-link to="/home/order">
        <sidebar-button :iconProp='icons[3]'/>
    </router-link>
    <router-link to="/home/setting">
        <sidebar-button :iconProp='icons[4]'/>
    </router-link>
  </div>
</template>

<script>

import SidebarButton from './SidebarButton'
let sideBarIcons = [
                {
                    num:0,
                    label:'商品信息'
                },
                {
                    num:1,
                    label:'进货管理'
                },
                {
                    num:2,
                    label:'收银结账'
                },
                {
                    num:3,
                    label:'交易流水'
                },
                {
                    num:4,
                    label:'系统设置'
                }
            ]

export default {
    components:{ SidebarButton },
    data(){
        return {
            icons:sideBarIcons
        }
    }
};
</script>

<style lang="css" scoped>

.sidebar {
  width: 120px;
  height: 100%;
  background: #041624;
  font-size: 28px;
  text-align: center;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.router-link-exact-active {
  color: #fff;
}

</style>