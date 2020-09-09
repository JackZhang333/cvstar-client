<template>
    <div>
        <div class="feedback" v-if="show">
            <div class="icon"></div>
            <p>{{msg}}</p>
        </div>
    </div>
</template>

<script>
    export default {
        
        data(){
           return {
               show:false,
               msg:'收银成功'
           }
        },
        methods:{
            showFeedback(msg){
                this.msg =msg||'操作成功'
                this.show =true
                setTimeout(()=>this.show=false,1000)
            }
        }
    }
</script>

<style lang="css" scoped>
    .feedback {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        border-radius: 2px;
        width: 140px;
        height: 140px;
        text-align: center;
        line-height: 20px;
        background: rgba(0, 0, 0, .73);
        color: #fff;
        font-size: 18px;
    }
    .icon {
        width: 70px;
        height: 70px;
        background:url('../assets/success.png');
        background-size: 70px;
        margin: 20px auto 12px;
    }
</style>