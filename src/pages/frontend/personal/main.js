import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
    config: {
        navigationBarTitleText: '个人中心',
        usingComponents: {
            "i-button": "/static/dist/button/index",
            "i-panel": "/static/dist/panel/index",
            "i-cell-group": "/static/dist/cell-group/index",
            "i-cell": "/static/dist/cell/index",
            // "i-toast": "/static/dist/toast/index",
            "i-message": "/static/dist/message/index"
        }
    }
}