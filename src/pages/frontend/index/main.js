import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
    config: {
        navigationBarTitleText: '小通知',
        "usingComponents": {
            "i-cell-group": "/static/dist/cell-group/index",
            "i-cell": "/static/dist/cell/index",
            "i-alert": "/static/dist/alert/index"
        },
        "enablePullDownRefresh": true
    }
}