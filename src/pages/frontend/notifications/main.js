import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
    config: {
        navigationBarTitleText: '小通知',
        "usingComponents": {
            "i-tabs": "/static/dist/tabs/index",
            "i-tab": "/static/dist/tab/index",
            "i-cell-group": "/static/dist/cell-group/index",
            "i-cell": "/static/dist/cell/index"
        }
    }
}