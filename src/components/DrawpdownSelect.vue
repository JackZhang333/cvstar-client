<template>
    <div class="drawpdown">
      <div class="drowdown-container" @click="spreadHandler" :style = '{width:drawpWidth}'>
        <div class="dropdown-label">{{selected}}</div>
        <div :class="{icon:true,dropdownspreaded:spreaded}"></div>
      </div>
      <div class="dropdown-menu" v-show = 'spreaded' :style = '{right:menuPosition}'>
          <div class="item" v-for="(item,index) in menus" 
          :key='index' 
          @click = 'selectHandler'
          :data-index = 'index'>
              {{item}}
          </div>
      </div>
    </div>
</template>

<script>
export default {
  props:{
    menus:{
      required:true
    },
    selected:{
      required:true
    },
    drawpWidth:{
      default:'136px'
    },
    menuPosition:{
      default:'0'
    }
  },
  data() {
    return {
      spreaded: false,
    };
  },
  methods: {
    spreadHandler() {
      this.spreaded = !this.spreaded;
    },
    selectHandler(e){
      let index = e.target.dataset.index
      // console.log('点击的菜单序号是：'+index)
      let selected = this.menus[index]
      this.$emit('update:selected',selected)
      this.spreaded = false
    }
  }
};
</script>

<style lang="css" scoped>
.drawpdown {
    display: inline-block;
    position: relative;
}
.drowdown-container {
  height: 50px;
  border-radius: 4px;
  border: 1px solid #108cee;
  color: #108cee;
  line-height: 50px;
  user-select: none;
  cursor: pointer;
}
.drowdown-containerr:hover {
  border: 1px solid #47adfd;
  color: #47adfd;
}
.drowdown-container:active {
  border: 1px solid #0a65ca;
  color: #0a65ca;
}
.dropdown-label {
  float: left;
  margin-left: 16px;
  font-size: 18px;
  width: calc(100% - 52px);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.icon {
  float: right;
  width: 16px;
  height: 16px;
  margin-top: 16px;
  margin-right: 16px;
  background: url("../assets/drawpdown.png") no-repeat;
  background-size: 16px;
}
.dropdownspreaded {
  transform: rotate(180deg);
  transition: transform 0.2s ease;
}
.dropdown-menu {
    position:absolute;
    top: 60px;
   
    width: 250px;
    height: 240px;
    border-radius: 4px;
    background: rgba(0, 0, 0, .64);
    overflow: auto;
    z-index: 99;
    
}
.dropdown-menu .item {
    height: 42px;
    line-height: 42px;
    text-align: center;
    color: #fff;
    cursor: pointer;
}
.dropdown-menu .item:hover {
    background: rgba(16, 140, 238, .21);
}
</style>