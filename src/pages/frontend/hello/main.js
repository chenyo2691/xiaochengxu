import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
    config: {
        navigationBarTitleText: '小通知',
        "usingComponents": {
            "i-alert": "/static/dist/alert/index",
            "i-button": "/static/dist/button/index"
        }
    }
}