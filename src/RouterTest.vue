<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="css" scoped>
    a {
        color:#333;
        text-decoration: none;
        margin: 0 20px;
    }
    .router-link-exact-active {
        color:red;
    }
    body {
        margin:0;
        padding:0;
    }
    
</style>