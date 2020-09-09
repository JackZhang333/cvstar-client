<template>
    <div class="radios" >
        <span style="marginRight:10px">{{label}}:</span>
      <label v-for='(hobby,index) in values' :key="index">
        <input type="radio" :name="name" :value="hobby" @click="clickHandler" ref='input'/>
        <span >{{hobby}}</span>
      </label>
    </div>
</template>

<script>
export default {
    props:['name','values','label','checked'],
    data(){
        return {
            
        }
    },
    mounted(){
        this.$refs.input[0].click()
    },
    methods:{
        clickHandler(e){
            let checked = e.target.value
            this.$emit('update:checked',checked)
        }
    }
};
</script>

<style lang="css" scoped>
.radios {
    width: 100%;
    height: 42px;
    line-height: 42px;
    margin-bottom: 25px;
}
.radios-name {
    display: inline-block;
    margin-right: 5px;
}

input[type='radio'] {
    appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 8px;
    border:1px solid #e5e5e5;
    outline: none;
    background: #fff;
    margin:0 5px 0 0;
    bottom: -1px;
    text-align: center;
    cursor: pointer;
}
input[type='radio']:checked {
    border:1px solid #108cee;
}
input[type='radio']::after {
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 8px;
    height: 8px;
    content:'';
    border-radius: 4px;
    background: #108cee;
    margin: auto;
    transform: scale(0);
    transition: transform .2s ease-out;
}
input[type='radio']:checked::after {
    transform: scale(1);
}
.wrapper > span{
    font-size: 18px;
    margin-right: 5px;
}
label {
    cursor: pointer;
    user-select: none;
    font-size: 18px;
}
input {
    margin:0 5px 5px;
    position: relative;
    bottom: 3px;
}

input:checked + span {
  color: #108cee;
}
label + label {
    margin-left: 20px;
}
</style>