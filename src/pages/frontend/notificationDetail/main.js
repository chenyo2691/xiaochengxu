import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
    config: {
        navigationBarTitleText: '消息内容',
        "usingComponents": {
            "i-avatar": "/static/dist/avatar/index",
            "i-button": "/static/dist/button/index",
            "i-toast": "/static/dist/toast/index",
            "i-panel": "/static/dist/panel/index"
        }
    }
}