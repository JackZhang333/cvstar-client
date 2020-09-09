<template>
  <div class="setting-wrapper">
    <div class="set-content">
      <div class="storeName">
        <span>店铺名称：</span>
        <span>{{$store.state.acount.storeName}}</span>
        <text-button action="编辑" :actionHandler="editClick" />
      </div>
      <div class="phoneNumber">
        <span>账户：</span>
        <span>{{$store.state.acount.acount}}</span>
        <text-button action="修改密码" :actionHandler="changePassword" />
      </div>
    </div>
    <edit-store-name ref="editStoreName"/>
    <edit-password ref="editPassword"/>
  </div>
</template>

<script>
import TextButton from "../components/TextButton";
import EditStoreName from '../fulldialogs/EditStoreName'
import EditPassword from '../fulldialogs/EditPassword'

export default {
  components: {
    TextButton,
    EditStoreName,
    EditPassword,
  },
  data() {
 
    return {
      
    };
  },
  methods: {
    editClick() {
      this.$refs.editStoreName.open()
    },
    changePassword() {
      this.$refs.editPassword.open()
    },
    
  },
};
</script>

<style lang="css" scoped>
.setting-wrapper {
  height: 100%;
  width: 100%;
  background: #f5f5f5;
  padding: 20px;
}
.set-content {
  height: 100%;
  width: 100%;
  background: #fff;
  border-radius: 5px;
  padding:50px 30px;
  font-size: 18px;
  line-height: 25px;
  color: #333;
}
.storeName,.phoneNumber {
    margin-bottom: 10px;
}
</style>