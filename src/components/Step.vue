<template>
   <div class="step">
      <div class="minus btn" @click="minus"></div>
      <span>{{num}}</span>
      <div class="plus btn" @click="plus"></div>
    </div>
</template>

<script>
export default {
    props:{
        num:{
            default:1
        },
        dataIndex:{

        }
    },
  data() {
    return {
      
    };
  },
  methods: {
    minus() {
      
      if (this.num > 1) {
          let num = this.num -1
           this.$emit('update:num',num)
           this.toCalc()
      } else {
        //得到引用本组件的父级组件，并派发一个事件，传入当前数据的下标值
        this.$parent.$emit('deleteData',this.dataIndex)
        this.toCalc()
        // console.log("这条数据将会被隐藏");
      }
    },
    plus() {
      
        if(this.num <1000){
            let num = this.num +1
           this.$emit('update:num',num)
           this.toCalc()
        }
      
    },
    toCalc(){
      //调用父类的方法重新统计商品数量和金额
      this.$parent.calcSummary()
    }
  },
};
</script>

<style lang="css" scoped>
.step {
  margin: 25px auto;
  user-select: none;
  display: flex;
}
.btn {
  height: 38px;
  width: 38px;
  cursor: pointer;
  color: #108cee;
  font-size: 24px;
  line-height: 38px;
  text-align: center;
}
.minus {
  background-image: url("../assets/step.png");
  background-position: -42px -82px;
  background-size: 80px;
}
.minus:hover {
  background-position: -42px -2px;
}
.minus:active {
  background-position: -42px -42px;
}
.plus {
  background-image: url("../assets/step.png");
  background-size: 80px;
  background-position: -2px -82px;
}
.plus:hover {
  background-position: -2px -2px;
}
.plus:active {
  background-position: -2px -42px;
}
.step > span {
  display: inline-block;
  min-width: 36px;
  height: 36px;
  margin: 0 6px;
  color: #333;
  font-size: 24px;
  line-height: 36px;
  text-align: center;
}
</style>