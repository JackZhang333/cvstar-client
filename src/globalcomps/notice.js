import Notice from '../components/Notice.vue'
import Vue from 'vue'

function showNotice(notice) {
    let newNotice = notice ||{content: "这是一条消息",duration: 3000}
    
    const Instance = new Vue({
      name:'noticeWrapper',
      render(h) {
        return h(Notice);
      },
    });

    let comp = Instance.$mount();

    document.body.appendChild(comp.$el);

    let notice2 = comp.$children[0];
    notice2.addNotice(newNotice);
  }

  export default showNotice