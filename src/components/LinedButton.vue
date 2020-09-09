<template>
    <div style="display: inline-block;">
        <div class="filled-btn" @click="LBtnClick">
            <span>{{action}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            action:{
                default:'取消'
            },
            LBtnClick:{
                required:true
            }
        },
        methods:{
            LBtnHandler(){
                alert('点击了取消按钮')
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
        border:1px solid #108cee;
        text-align: center;
        line-height: 50px;
        font-size: 18px;
        color: #108cee;
        cursor: pointer;
    }
    .filled-btn:hover {
        border:1px solid #47adfd;
        color:#47adfd;
    }
    .filled-btn:active {
        border:1px solid #0a65ca;
        color:#0a65ca;
    }
</style>