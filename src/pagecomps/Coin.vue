<template>
    <div class="coin" @click="addCoin">
        <div class="cashNum">
            <span class="cash">{{cashNum}}</span><span class="yuan">元</span>
        </div>
        
    </div>
</template>

<script>
    export default {
        props:{
            cashNum:{
                default:100
            }
        },
        methods:{
            addCoin(){
                // alert('再加'+this.cashNum+'元')
                let num = Number(this.cashNum)
                this.$parent.addCoin(num)
            }
        }
    }
</script>

<style lang="css" scoped>
    .coin {
        display: inline-block;
        position: relative;
        width: 129px;
        height: 124px;
        background: url('../assets/coin-nomal.png') no-repeat;
        background-size: 129px;
        cursor: pointer;
    }
    .cashNum {
        position: absolute;
        top: 37px;
        left:0px;
        line-height: 56px;
        text-align: center;
        width: 100%;
        color: #fff;
    }
    .cashNum .cash {
        font-size: 48px;
        font-weight: 700;
    }
    .cashNum .yuan {
        margin-left: 5px;
        left: 100px;
        font-size: 11px;
    }
    
    .coin:hover {
        background: url('../assets/coin-hover.png') no-repeat;
        background-size: 129px;
    }
    .coin:active {
        background: url('../assets/coin-active.png') no-repeat;
        background-size: 129px;
    }
</style>