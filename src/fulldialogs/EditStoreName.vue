<template>
    <div class="edit-store-name">
        <full-dialog 
        ref="fullDialog"
        :hasFooter = 'hasFooter'
        title = '修改店铺名称'
        :confirm = 'submitName'
        >
        <div class="store-name-form" slot="content">
            <c-input name = '店铺名称' prop='storeName' :value.sync = 'startName'/>
        </div>
        </full-dialog>
    </div>
</template>

<script>
import FullDialog from '../pages/FullDialog'
import CInput from '../components/CInput'
import { mapState, mapActions}from 'vuex'
    export default {
        data(){
            
            return {
                startName:'',
                hasFooter:true,
            }
        },
        components:{
            FullDialog,
            CInput
        },
        created(){
            this.startName = this.storeName
        },
        methods:{
            ...mapActions('acount',['editStoreName']),
            submitName(){
                if(this.storeName!=''){
                    this.editStoreName(this.startName)
                    this.$feedback('修改成功')
                    return true
                }else {
                    this.$toast({msg:'请输入完整的数据',duration:2})
                    return false
                }
                
                // window.console.log('修改后的店铺名称：'+this.$store.state.storeName)
                
            },
            open(){
                this.$refs.fullDialog.created = true
                this.$refs.fullDialog.open()
            }
        },
        computed:{
            ...mapState('acount',['storeName'])
        },
    }
</script>

<style lang="css" scoped>
    .store-name-form {
        padding: 20px;
    }
</style>