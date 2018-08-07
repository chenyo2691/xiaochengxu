<template>
    <div class="setting">
        <div class="logo">
            <img :src="bird" alt="">
        </div>
        <div class="hello">
            <p>欢迎使用小通知</p>
            <!-- <button v-if="!isRequestForm" type="default" size="mini" open-type="getUserInfo" @getuserinfo="getUserInfo">授权使用</button> -->
            <i-button v-if="!isRequestForm" @click="requestPlatform" shape="circle" size="large" :loading="loading">授权使用</i-button>
        </div>
    </div>
</template>

<script>
import bird from 'static/img/bird.png';

export default {
    onShow() {
        let openId = (wx.getStorageSync('openId'));
        if (openId) {
            this.$http.post({url: 'api/user/check-openid', data: {openid: openId}}).then((res) => {
                if (res.code !== 0) {
                    console.log('openid已存在,但错误');
                    this.isRequestForm = false;
                }
                else {
                    this.isRequestForm = true;
                    wx.switchTab({
                        url: '/pages/frontend/index/main'
                    });
                }
            });
            return false;
        }
        else {
            this.isRequestForm = false;
            // this.requestPlatform();
        }
    },
    components: {
    },
    data() {
        return {
            isRequestForm: false,
            loading: false,
            bird
        }
    },
    methods: {
        getUserInfo() {
            wx.getUserInfo({
                success: (res) => {
                    wx.setStorageSync('userInfo', res.userInfo);
                    console.log('写入userInfo成功');
                    this.updateLogin();
                },
                fail: () => {
                    console.log('获取用户信息失败!')
                },
                complete: () => {
                    // console.log('获取用户信息完成！')
                },
            });
        },
        getSetting() {
            wx.getSetting({
                success: (res) => {
                    if (res.authSetting['scope.userInfo']) {
                        console.log('已授权');
                        this.getUserInfo();
                    }
                    else {
                        console.log('未授权');
                        // this.isRequestForm = true;
                    }
                }
            })
        },
        updateLogin() {
            this.loginWx();
        },
        loginWx() {
            wx.login({
                success: (res) => {
                    if (res.code) {
                        // console.log('登录微信获取临时登录凭证（code）', res.code);
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
            // 通过临时登录凭证进行平台登记
            this.$http.post({url: 'api/user/request-platform', data: {code}}).then((res) => {
                wx.setStorageSync('openId', res.data.openid);
                console.log('写入openid成功');
                const url = '/pages/frontend/index/main';
                // wx.navigateTo({url});
                // wx.redirectTo({
                //     url
                // });
                wx.switchTab({
                    url
                })
            });
        },
        requestPlatform() {
            return new Promise((resolve, reject) => {
                this.loading = true;
                wx.login({
                    success: (res) => {
                        if (res.code) {
                            resolve(res.code);
                        }
                        else {
                            resolve(`登录失败${res.errMsg}`);
                        }
                    }
                });
            }).then((code) => {
                return new Promise((resolve, reject) => {
                    this.$http.post({url: 'api/user/request-platform', data: {code}}).then((res) => {
                        wx.setStorageSync('openId', res.data.openid);
                        console.log('写入openid成功');
                        wx.switchTab({
                            url: '/pages/frontend/index/main'
                        });
                        resolve();
                    });
                });
            }).then(() => {
                this.loading = false;
            }).catch((err) => {
                console.log(err);
            });
        }
    }
}
</script>

<style lang="less">
.setting {
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 100%;

    .logo {
        // border-radius: 200rpx;
        width: 200rpx;
        height: 200rpx;
        // background-color: red;
        margin: 150rpx;

        img {
            width: 200rpx;
            height: 200rpx;
        }
    }

    .hello {
        text-align: center;
    }
}
</style>
