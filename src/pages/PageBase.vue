<template>
  <div class="page-wrapper">
    <div class="page-top">
      <slot name="top"></slot>
    </div>
    <div class="page-divider"></div>
    <div class="page-middle">
      <slot name="middle"></slot>
    </div>
    <div class="page-bottom">
      <slot name="bottom"></slot>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  created() {},
  methods: {},
};
</script>

<style lang="css" scoped>
.page-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.page-top {
  flex-shrink: 0;
  height: 100px;
  width: 100%;
  background: #fff;
}
.page-divider {
  flex-shrink: 0;
  width: 100%;
  height: 10px;
  background: #f5f5f5;
}
.page-middle {
  width: 100%;
  flex-grow: 1;
  flex-shrink: 1;
  background: #fff;
  overflow: auto;
}
.page-bottom {
  flex-shrink: 0;
  width: 100%;
  height: 120px;
  background: #f5f5f5;
}
</style>