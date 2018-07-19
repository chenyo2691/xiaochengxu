import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
    // 这个字段走 app.json
    config: {
        // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
        pages: [
            // 开发中
            '^pages/develop/develop/main',
            // 前台
            'pages/frontend/index/main',
            'pages/frontend/personal/main',
            'pages/frontend/notifications/main',
            'pages/frontend/notificationDetail/main',
            'pages/frontend/groupApplicate/main',
            'pages/frontend/logs/main',
            // 后台
            'pages/backend/index/main',
            'pages/backend/approval-detail/main',
            'pages/backend/approval-list/main',
            'pages/backend/release/main',
            'pages/backend/statistics-detail/main',
            'pages/backend/statistics-group/main',
            'pages/backend/statistics-list/main'
        ],
        window: {
            // backgroundTextStyle: 'light',
            // navigationBarBackgroundColor: '#fff',
            // navigationBarTitleText: '小程序通知',
            // navigationBarTextStyle: 'black',
            "navigationBarBackgroundColor": "#FAFAFA",
            "navigationBarTitleText": "iView WeApp",
            "navigationBarTextStyle": "black",
            "backgroundTextStyle": "dark",
            "backgroundColor": "#f9f9f9"
        },
        "tabBar": {
            "list": [
                {
                    "pagePath": "pages/develop/develop/main",
                    "text": "开发中",
                    "iconPath": "/static/img/home.png",
                    "selectedIconPath": "/static/img/home_selected.png"
                },
                {
                    "pagePath": "pages/frontend/index/main",
                    "text": "通知",
                    "iconPath": "/static/img/home.png",
                    "selectedIconPath": "/static/img/home_selected.png"
                },
                {
                    "pagePath": "pages/frontend/personal/main",
                    "text": "我的",
                    "iconPath": "/static/img/personal.png",
                    "selectedIconPath": "/static/img/personal_selected.png"
                }
            ]
        }
    }
}
