import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
    config: {
        navigationBarTitleText: '发布',
        "usingComponents": {
            "i-input": "/static/dist/input/index",
            "i-panel": "/static/dist/panel/index",
            "i-radio-group": "/static/dist/radio-group/index",
            "i-radio": "/static/dist/radio/index",
            "i-avatar": "/static/dist/avatar/index",
            "i-grid": "/static/dist/grid/index",
            "i-grid-item": "/static/dist/grid-item/index",
            "i-grid-icon": "/static/dist/grid-icon/index",
            "i-grid-label": "/static/dist/grid-label/index",
            "i-button": "/static/dist/button/index",
            "i-toast": "/static/dist/toast/index"
        }
    }
}