<template>
    <div>
        <div class="mask" v-if="showDialog">
            <div class="dialog">
                <div class="close" @click="closeDialog"></div>
                <p>{{ contentMsg }}</p>
                <div class="actions">
                    <lined-button :action = 'cancelName' class="left-btn" :LBtnClick="closeDialog"/>
                    <filed-button :action= 'confirmName' class="right-btn" :FBtnClick="confirmAction"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import FiledButton from './FilledButton'
import LinedButton from './LinedButton'

    export default {
        props:{
            cancelName:{
                default:'取消'
            },
            confirmName:{
                default:'确定'
            },
            contentMsg:{
                default:'确定要继续操作吗？'
            },
            confirmHandler:{
                required:true
            }
        },
        data(){
            return {
               
                showDialog:false
            }
        },
        components:{ FiledButton, LinedButton},
        methods:{
            openDialog(){
                this.showDialog = true
            },
            closeDialog(){
                this.showDialog = false
            },
            confirmAction(){
                this.confirmHandler()
                this.closeDialog()
            }
        }
    }
</script>

<style lang="css" scoped>
    .mask {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, .65);
        z-index: 1000;
    }
    .dialog {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        width: 560px;
        height: 320px;
        border-radius: 4px;
        background: #fff;
        text-align: center;
        font-size: 20px;
        padding: 0 20px;
        color:#333;
    }
    .dialog > p {
        margin-top:104px ;
    }
    .actions {
       position: absolute;
       bottom: 40px;
       left: 50%;
       transform:translateX(-50%);
        
    }
    .actions .left-btn {
        
        margin-right: 10px;
        
    }
    .actions .right-btn {
        margin-left: 10px;
        display: inline-block;

    }
    .close {
        position: absolute;
        top: 10px;
        right: 10px;
        background:url('../assets/close.png');
        background-size: 24px;
        cursor: pointer;
        width: 24px;
        height: 24px;
    }
</style>