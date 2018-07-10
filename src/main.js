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
        pages: ['^frontend/pages/index/main', 'frontend/pages/personal/main', 'frontend/pages/notifications/main', 'frontend/pages/notificationDetail/main', 'frontend/pages/groupApplicate/main', 'frontend/pages/logs/main'],
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
            "list": [{
                "pagePath": "frontend/pages/index/main",
                "text": "通知",
                "iconPath": "/static/img/home.png",
                "selectedIconPath": "/static/img/home_selected.png"
            }, {
                "pagePath": "frontend/pages/personal/main",
                "text": "我的",
                "iconPath": "/static/img/personal.png",
                "selectedIconPath": "/static/img/personal_selected.png"
            }]
        }
    }
}
