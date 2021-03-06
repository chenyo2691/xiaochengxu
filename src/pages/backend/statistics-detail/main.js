import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
    config: {
        navigationBarTitleText: '统计-消息详情',
        "usingComponents": {
            "i-avatar": "/static/dist/avatar/index",
            "i-cell-group": "/static/dist/cell-group/index",
            "i-cell": "/static/dist/cell/index",
            "i-icon": "/static/dist/icon/index"
        }
    }
}