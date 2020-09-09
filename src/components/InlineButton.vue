<template>
  <div class="btn" @click="clickHandler">
    <span>{{action}}</span>
  </div>
</template>

<script>
export default {
  props: ["action", "clickHandler"],
};
</script>

<style lang="css" scoped>
.btn {
  display: inline-block;
  width: 54px;
  height: 32px;
  border-radius: 2px;
  border: 1px solid #999;
  text-align: center;
  line-height: 32px;
  font-size: 16px;
  color: #666;
  cursor: pointer;
}
.btn:hover {
  border: 1px solid #108cee;
  color: #108cee;
}
.btn:active {
  border: 1px solid #0a65ca;
  color: #0a65ca;
}
</style>