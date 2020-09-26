<template>
  
    <div class="cinput">
      <label for="prop">{{name}}:</label>
      <input 
      :type="type" 
      :name="prop" 
      :placeholder="placeholder" 
      :value="value" 
      @change="inputHandler"
      :style = '{width:inputWidth}'
      autocomplete="off"
      maxlength="50"
      />
      <slot></slot>
    </div>
 
</template>

<script>
export default {

props:{
    prop:{
        required:true
    },
    type:{
        default:'text'
    },
    name:{
        default:'名称'
    },
    value:{
        required:true
    },
    inputWidth:{
        default:'235px'
    }
},
  data(){
      return {
        //   placeholder:'请输入'+this.name
      }
  },
  computed:{
      placeholder(){
          return '请输入'+this.name
      }
  },
  methods:{
      inputHandler(e){
          let value = e.target.value
          this.$emit('update:value',value)
      }
  }

};
</script>

<style lang="css" scoped>
    .cinput {
      display: inline-block;
        height: 42px;
        line-height: 42px;
        margin-bottom: 25px;
    }
    .cinput label {
        font-size: 18px;
        color:18px;
        margin-right: 5px;
    }
    .cinput input {
        height: 42px;
        border: 1px solid #e5e5e5;
        border-radius:2px;
        outline: none;
        font-size: 18px;
        text-indent: 1em;
        caret-color: #108cee;
    }
    .cinput input:focus{
        border:1px solid #108cee;
    }
    .cinput input:hover{
        border:1px solid #47adfd;
    }
</style>