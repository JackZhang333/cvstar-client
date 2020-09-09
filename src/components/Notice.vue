<template>
  <div>
    <div class="container" v-if="notices.length != 0">
      <div class="wrapper" v-for="(item,index) in notices" :key="index">
        <span>{{item.content}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      notices:[
         
      ],
      id:0
    };
  },
  methods:{
      addNotice(notice){
          let id = this.id++
          let newNotice = {...notice,id}
          this.notices.push(newNotice)
          this.delNotice()
      },
      delNotice(){
          let lastNotice = this.notices[this.notices.length-1]
          if(lastNotice){
              let {duration} = lastNotice
              setTimeout(()=>this.notices.pop(),duration)
          }
      }
  }
};
</script>

<style lang="css" scoped>
.container {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.65);
}
.wrapper {
  width: 600px;
  height: 400px;
  border-radius: 5px;
  font-size: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
}
.wrapper > span {
    background: #fff;
}
</style>