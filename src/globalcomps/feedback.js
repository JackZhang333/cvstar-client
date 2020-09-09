import Feedback from '../components/Feedback.vue'
import Vue from 'vue'
//保证全局只存在一个 toastWrapper和toast实例
let Instance = new Vue({
    name: 'feedbackWrapper',
    render(h) {
        return h(Feedback)
    }
})

export default function showFeedback(msg) {

    let feedbackWrapper = Instance.$mount()
    document.body.appendChild(feedbackWrapper.$el)

    let feedback = feedbackWrapper.$children[0]
    feedback.showFeedback(msg)
}