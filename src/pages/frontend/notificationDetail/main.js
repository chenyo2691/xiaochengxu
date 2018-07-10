import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
    config: {
        navigationBarTitleText: '消息内容',
        "usingComponents": {
            "i-avatar": "/static/dist/avatar/index",
            "i-button": "/static/dist/button/index"
        }
    }
}