<template>
    <div>
        <div class="toast" v-for="(toast,index) in toasts" :key="index">
            <span>{{toast.msg}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                toasts:[],
                id:0
            }
        },
        methods:{
            addToast(toast){
                this.id = this.id +1
                let id = this.id
                let newToast = toast ||{msg:'这是一条新toast',duration:3}
                this.toasts.push({...newToast,id})
                let duration = newToast.duration *1000

                setTimeout(()=>this.delToast(id),duration)
            },
            delToast(id){
                let index = this.toasts.findIndex((v)=>v.id==id)
                this.toasts.splice(index,1)
                // window.console.log('删除了toast'+id)
            }
        }
    }
</script>

<style lang="css" scoped>
    .toast {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        border-radius: 2px;
        width: 172px;
        height: 48px;
        text-align: center;
        line-height: 48px;
        background: rgba(0, 0, 0, .87);
        color: #fff;
        font-size: 16px;
        z-index: 1999;
    }

</style>