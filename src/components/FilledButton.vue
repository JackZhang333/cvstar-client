<template>
    <div style="display: inline-block;">
        <div class="filled-btn" @click="FBtnClick">
            <span>{{action}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            action:{
                default:'提交'
            },
            FBtnClick:{
                
            }
        },
        methods:{
            FBtnHandler(){
                alert('点击了提交按钮')
            }
        }
    }
</script>

<style lang="css" scoped>
    .filled-btn {
        display: inline-block;
        width: 120px;
        height: 50px;
        border-radius: 4px;
        background: #108cee;
        text-align: center;
        line-height: 50px;
        font-size: 18px;
        color: #fff;
        cursor: pointer;
    }
    .filled-btn:hover {
        background: #47adfd;
     
    }
    .filled-btn:active {
        background: #0a65ca;
    
    }
</style>