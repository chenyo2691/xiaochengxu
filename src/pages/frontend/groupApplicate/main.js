import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
    config: {
        navigationBarTitleText: '组别申请',
        "usingComponents": {
            "i-panel": "/static/dist/panel/index",
            "i-checkbox-group": "/static/dist/checkbox-group/index",
            "i-checkbox": "/static/dist/checkbox/index",
            "i-button": "/static/dist/button/index"
        }
    }
}