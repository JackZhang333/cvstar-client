<template>
  <div class="edit-password">
    <full-dialog ref="fullDialog" :hasFooter="hasFooter" title="修改密码" :confirm="submitPwd">
      <div class="password-form" slot="content">
        <form>
          <c-input name="原密码" prop="originPwd" :value.sync="model.origin" type="password" />
          <c-input
            class="form-right"
            name="新密码"
            prop="newPwd"
            :value.sync="model.new"
            type="password"
          />
          <c-input name="确认密码" prop="confirmNew" :value.sync="model.confirm" type="password" />
        </form>
      </div>
    </full-dialog>
  </div>
</template>

<script>
import FullDialog from "../pages/FullDialog";
import CInput from "../components/CInput";
import {mapActions } from "vuex";
export default {
  data() {
    return {
      model: {
        origin: "",
        new: "",
        confirm: "",
      },
      hasFooter: true,
    };
  },
  components: {
    FullDialog,
    CInput,
  },
  methods: {
    ...mapActions("acount", ["editPassword"]),
    async submitPwd() {
      //校验表单项是否完整
      let isComplete = true;
      for (let k in this.model) {
        if (this.model[k] == "") {
          isComplete = false;
        }
      }
      if (!isComplete) {
        this.$toast({ msg: "请填写完整的数据", duration: 2 });
        return false;
      } else {
        // // 如果数据完整，则校验输入的原密码是否正确
        // if (this.model.origin != this.password) {
        //   this.$toast({ msg: "原密码输入错误", duration: 2 });
        //   return false;
        // } else {
        //如果原密码输入正确，再校验用户两次输入的密码是否一致
        if (this.model.new != this.model.confirm) {
          this.$toast({ msg: "两次输入的密码不一致", duration: 2 });
          return false;
        } else {
          let {code,msg} = await this.editPassword({
            password: this.model.origin,
            newPassword: this.model.new,
          });
          if(code==1){
            this.$feedback('密码修改成功')
            return true;
          }else{
            this.$toast({msg,duration:2})
            return false
          }  
        }
        // }
      }
    },
    open() {
      this.$refs.fullDialog.created = true;
      this.$refs.fullDialog.open();
    },
  },
  computed: {},
};
</script>

<style lang="css" scoped>
.password-form {
  padding: 20px;
}
.form-right {
  float: right;
}
</style>