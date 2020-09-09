<template>
  <div>
    <div class="container" :class="{wrapperClose:Notshow}" v-if="created" @click="close">
      <div
        class="content"
        :class="Notshow ? 'contentClose' : 'contentOpen'"
        @click.stop
        :style="{width:dialogWidth+'px'}"
      >
        <div class="dialog-header">
          <div class="close" @click="close"></div>
          <h1 class="title">{{title}}</h1>
        </div>
        <div class="dialog-content">
          <slot name="content"></slot>
        </div>
        <div class="dialog-footer" v-show="hasFooter">
          <slot name="footer"></slot>
          <div class="actions">
            <lined-button
              class="btn left"
              :LBtnClick="close"
              :action="sigleButton ? '关闭' : footerActions.lined"
            />
            <filled-button
              v-show="!sigleButton"
              class="btn right"
              :FBtnClick="confirmHandler"
              :action="footerActions.filled"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FilledButton from "../components/FilledButton";
import LinedButton from "../components/LinedButton";

export default {
  components: { LinedButton, FilledButton },
  props: {
    footerActions: {
      default: () => {
        return {
          lined: "取消",
          filled: "提交",
        };
      },
    },
    hasFooter: {
      default: false,
    },
    dialogWidth: {
      default: 720,
    },
    title: {
      default: "编辑商品",
    },
    sigleButton: {
      default: false,
    },
    confirm: {},
  },
  data() {
    return {
      Notshow: true,
      created: false,
      // hasFooter:false
    };
  },
  methods: {
    close() {
      this.Notshow = true;
    },
    open() {
      this.Notshow = false;
    },
    async confirmHandler() {
      //根据返回的值判断，是否提交了完整的表单。提交了完整的表单就可以关闭弹窗了
      let wouldCloce = await this.confirm();
      window.console.log('可以继续关闭弹窗吗？'+wouldCloce)
      if(wouldCloce){
        this.close();
      }
      
    },
  },
};
</script>

<style lang="css" scoped>
.container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.65);
  z-index: 999;
}
.dialog-header {
  height: 60px;
  width: 100%;
  background: #fff;
}
.title {
  font-size: 20px;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.close {
  position: absolute;
  top: 15px;
  left: 15px;
  width: 24px;
  height: 24px;
  background: url("../assets/close.png");
  background-size: 24px;
  cursor: pointer;
}
.dialog-content {
  width: 100%;
  flex-grow: 1;
  background: #f5f5f5;
}
.dialog-footer {
  height: 80px;
  width: 100%;
  background: #fff;
}

.actions {
  float: right;
  padding: 15px 20px;
}
.actions .btn {
  display: inline-block;
}
.actions .right {
  margin-left: 20px;
}
.wrapperClose {
  animation: fadeOut 0.3s ease forwards;
  pointer-events: none;
}
@keyframes fadeOut {
  80% {
    opacity: 0.65;
  }
  100% {
    opacity: 0;
  }
}
.content {
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 0;
  right: 0;

  height: 100%;
  background: #fff;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  transition: transform 0.4 ease-in;
}
.contentClose {
  animation: toRight 0.3s ease-in forwards;
}
@keyframes toRight {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(110%);
  }
}
.contentOpen {
  animation: toLeft 0.5s ease-in forwards;
}
@keyframes toLeft {
  0% {
    transform: translateX(110%);
  }
  100% {
    transform: translateX(0%);
  }
}
</style>