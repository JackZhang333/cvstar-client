<template>
    <div class="sidebar-button">
        <div class="sidebar-button-img" :style="{ backgroundPositionY:-iconProp.num*56+'px'}"></div>
        <span>{{iconProp.label}}</span>
    </div>
</template>

<script>

    export default {
        props:{
            iconProp:{
                default:()=>{return{ num:0, label:'商品信息'}}
            }
        }
    }
</script>

<style lang="css" scoped>
.sidebar-button {
    position: relative;
    display: inline-block;
    width: 120px;
    height: 120px;
    line-height: 27px;
    font-size: 12px;
    color:#fff;
    text-align: center;
    opacity: .68;
}
.sidebar-button > span {
    display: inline-block;
    margin-top:84px;
}
.sidebar-button-img {
    position: absolute;
    width: 56px;
    height: 56px;
    top: 23px;
    left: 32px;
    background: url('../assets/sidebar.png');
    background-size: 56px;
}
.router-link-exact-active > .sidebar-button {
    background: rgba(16, 140, 238, .31);
    opacity: 1;
}
</style>