<template>
    <div class="text-button" @click="actionHandler">
        <span>{{action}}</span>
    </div>
</template>

<script>

    export default {
        props:{
            action:{
                default:'文字按钮'
            },
            actionHandler:{
                default:()=>{}
            }
        },
    
    }
</script>

<style lang="css" scoped>
    .text-button {
        display: inline-block;
        line-height: 25px;
        font-size: 18px;
        color: #108cee;
        margin-left: 20px;
        cursor: pointer;
    }
    .text-button:hover {
        color: #47adfd;
    }
    .text-button:active {
        color: #0a65ca;
    }
</style>