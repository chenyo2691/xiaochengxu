<script>
export default {
    created() {
        // 调用API从本地缓存中获取数据
        // const logs = wx.getStorageSync('logs') || []
        // logs.unshift(Date.now())
        // wx.setStorageSync('logs', logs)

        // console.log('app created and cache logs by setStorageSync')

        // 判断是否已授权
        // wx.getSetting({
        //     success: (res) => {
        //         if (res.authSetting['scope.userInfo']) {
        //             // 已经授权，可以直接调用 getUserInfo 获取头像昵称
        //             console.log('已授权')
        //             // this.getUserInfo();
        //         }
        //         else {
        //             // 否则登录
        //             console.log('未授权')
        //             this.loginWx();
        //         }
        //     }
        // })
    },
    methods: {
        loginWx() {
            wx.login({
                success: (res) => {
                    if (res.code) {
                        console.log('登录', res.code);
                        this.getOpenID(res.code);
                        // this.getUserInfo();// 一般需要重新登录的，这里都不会进入到
                    }
                    else {
                        // console.log('登录失败！' + res.errMsg)
                    }
                }
            });
        },
        getOpenID(code = '') {
            // let openId = (wx.getStorageSync('openId'));
            // if (openId) {
            //     console.log('openid已存在');
            //     return false;
            // }
            // else {
            //     // 通过临时登录凭证进行平台登记
            // }
            let url = 'api/user/request-platform';
            this.$http.post({url, data: {code}}).then((res) => {
                wx.setStorageSync('openId', res.data.openid);
                console.log('openid写入成功');
            });
        }
    }
}
</script>

<style>
/* .container {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 200rpx 0;
    box-sizing: border-box;
} */
/* this rule will be remove */
* {
    transition: width 2s;
    -moz-transition: width 2s;
    -webkit-transition: width 2s;
    -o-transition: width 2s;
}

page {
    height: 100%;
}
</style>
