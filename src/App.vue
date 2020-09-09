<template>
  <div id="app">
    <big-button :btnImage = 'iconImage' label = '快捷加购'/>
    <coin cashNum='50'/>
    <input-select :menus="menus" :selected.sync="data.inputSelect"/>
    <full-dialog ref="fullDialog" dialogWidth='320' title='添加商品' :confirm='btnClick'>
      <div slot="content">这是内容区</div>
      <div slot="footer">这是页脚</div>
    </full-dialog>
    <c-dialog 
    :confirmHandler = 'dialogProps.confirmHandler' 
    :cancelName = "dialogProps.cancel"
    :confirmName = "dialogProps.confirm"
    :contentMsg = "dialogProps.msg"
    />
    <logout/>
    <filled-button :FBtnClick="()=>{}"/>
    <lined-button :LBtnClick="()=>{}"/>
    <inline-button action="删除" :clickHandler="btnClick"/>
    <c-input type="text" prop="name" name="姓名" :value.sync="data.name" />
    <c-input type="text" prop="home" name="家乡" :value.sync="data.home" />
    <c-radios name="hobby" label="兴趣爱好" :values="hobbys" :checked.sync="data.hobby" />
    <DrawpdownSelect :menus="menus" :selected.sync="data.catagery" />
    <Upload />
    <step :num.sync="data.num" />
    <Kaiguan :status.sync="data.quick" />
    
    <month-select :selected.sync="data.month" />
    <button @click="submit">提交</button>
    
    <button @click="showNotice2">显示通知2</button>
    <button @click="showDialog">显示弹窗</button>
    <button @click="showDialog3">显示全屏弹窗</button>
    <button @click="showToast">显示toast</button>
    <button @click="showFeedback">显示feedback</button>
    <button @click="showDialog2">显示dialog</button>
    
  </div>
</template>

<script>
import DrawpdownSelect from "./components/DrawpdownSelect.vue";
import InputSelect from "./components/InputSelect.vue";
import Kaiguan from "./components/Kaiguan.vue";
import Upload from "./components/Upload.vue";
import CInput from "./components/CInput.vue";
import CRadios from "./components/CRadios.vue";
import Step from "./components/Step.vue";
import MonthSelect from "./components/MonthSelect";
import FullDialog from './pages/FullDialog'
import Logout from './components/Logout'
import InlineButton from './components/InlineButton'
import FilledButton from './components/FilledButton'
import LinedButton from './components/LinedButton'
import CDialog from './components/CDialog'
import Coin from './pagecomps/Coin'
import BigButton from './pagecomps/BigButton'
import Vue from 'vue'
import quickAdd from './assets/icon-quick-add.png'

export default {
  name: "App",
  components: {
    DrawpdownSelect,
    Kaiguan,
    Upload,
    CInput,
    CRadios,
    Step,
    MonthSelect,
    Logout,
    InlineButton,
    FilledButton,
    LinedButton,
    CDialog,
    FullDialog,
    Coin,
    BigButton,
    InputSelect,
  },
  data() {
    function dialogConfirm(){
      alert('弹窗中点击了确定按钮')
    }
    let dialog = {
        cancel:'不清空哟',
        confirm:'确定清空吗',
        msg:'确定清空所有商品？?',
        confirmHandler:dialogConfirm
      }
    return {
      iconImage:quickAdd,
      dialogProps:dialog,
      hobbys: ["篮球", "足球", "乒乓球", "排球"],
      menus: [
        "酒水饮料",
        "休闲食品",
        "其他分类",
        "休闲食品",
        "其他分类",
        "休闲食品",
        "其他分类",
      ],
      data: {
        quick: false,
        name: "",
        home: "",
        catagery: "全部分类",
        inputSelect:'',
        hobby: "",
        num: 1,
        month: "02",
        items: ["apple", "banana", "orange"],
      },
      dialog:null,
      toastNum:0
    };
  },
  created() {
    this.createDialog()
  },
  methods: {
    showDialog3(){
      this.$refs.fullDialog.created = true
      this.$refs.fullDialog.open()
    },
    showDialog2(){
      let props = {
        cancelName:'返回',
        confirmName:'继续操作',
        contentMsg:'这是一个十分艰难的决定',
        confirmHandler:()=>{alert('该怎么做呢')}
      }
      this.$dialog(props)
    },
    showFeedback(){
      this.$feedback()
    },
    showToast(){
      let id = this.toastNum++
      let toast = {msg:'你真棒，这都可以呀'+id,duration:2}
      this.$toast(toast)
    },
    btnClick(){
      alert('点击了删除按钮！')
    },
    submit() {
      console.log("表单提交了！" + JSON.stringify(this.data));
    },
    showNotice2(){
      this.$showNotice({content:'你好呀，这是来自任何一个vue对象的消息哟！',duration:5000})
    },
    createDialog(){

      let Instance = new Vue({
        name:'DialogWrapper',
        render(h){
          return h(FullDialog)
        }
      })
      let comp = Instance.$mount()
      document.body.appendChild(comp.$el)
      let dialog = comp.$children[0]
      
      this.dialog = dialog
    },
    showDialog(){
      console.log('点击了显示弹窗')
      this.dialog.created = true
      this.dialog.open()
    }
    
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>
