<template>
    <div class="container">
        <i-panel>
            <view style="padding: 15rpx;">
                <!--  @click="bindViewTap" -->
                <div class="userinfo">
                    <img v-if="userInfo.avatarUrl" class="userinfo-avatar" :src="userInfo.avatarUrl" background-size="cover" />
                    <button v-if="!userInfo.avatarUrl" class="circle" open-type="getUserInfo" @getuserinfo="getUserInfo"></button>
                    <div class="userinfo-nickname">
                        <card :text="userInfo.nickName"></card>
                        <button v-if="!userInfo.avatarUrl" class="btn-text" open-type="getUserInfo" @getuserinfo="getUserInfo">点击获取头像</button>
                    </div>
                </div>
            </view>
        </i-panel>

        <i-panel>
            <view style="padding: 15rpx;">
                <i-cell-group>
                    <i-cell title="组别申请" is-link @click="handleApplication"></i-cell>
                    <i-cell title="后台管理" is-link @click="handleBackEnd"></i-cell>
                </i-cell-group>
            </view>
        </i-panel>

        <i-message id="message" />
    </div>
</template>

<script>
import card from '@/components/card';
const {$Message} = require('../../../base.js');

export default {
    data() {
        return {
            motto: 'Hello World',
            userInfo: {}
        }
    },

    components: {
        card
    },

    methods: {
        handleApplication() {
            if (!this.userInfo.avatarUrl) {
                $Message({
                    content: '请点击头像获取用户信息',
                    type: 'warning',
                    duration: 2
                });
            }
            else {
                const url = '/pages/frontend/groupApplicate/main';
                wx.navigateTo({url});
            }
        },
        handleBackEnd() {
            if (!this.userInfo.avatarUrl) {
                $Message({
                    content: '您不是管理员',
                    type: 'warning',
                    duration: 2
                });
            }
            else {
                const url = '/pages/backend/index/main';
                wx.navigateTo({url});
            }
        },
        saveUserInfo({openid, userInfo}) {
            wx.request({
                url: 'https://notification.wechat.te642.com/api/user/save-userInfo',
                method: 'POST',
                data: {
                    openid: openid,
                    userInfo: JSON.stringify(userInfo)
                },
                success: (resp) => {
                    console.log('保存用户信息', resp);
                },
                fail: () => {
                    console.log('开发服务器失败')
                },
                complete: () => {
                    console.log('开发服务器请求完成！')
                },
            });
            wx.request({
                url: 'https://notification.wechat.te642.com/api/workgroup/get-all-workgroup',
                method: 'POST',
                data: {
                    openid: openid
                },
                success: (resp) => {
                    console.log('获取工作组信息信息', resp);
                },
                fail: () => {
                    console.log('开发服务器失败')
                },
                complete: () => {
                    console.log('开发服务器请求完成！')
                },
            })
        },
        // 获取用户信息
        getUserInfo() {
            wx.getUserInfo({
                // withCredentials: true,
                success: (res) => {
                    console.log('获取用户信息', res);
                    this.userInfo = res.userInfo;
                    this.saveUserInfo({openid: wx.getStorageSync('openId'), userInfo: res.userInfo});
                },
                fail: () => {
                    console.log('获取用户信息失败!')
                },
                complete: () => {
                    console.log('获取用户信息完成！')
                },
            });
        },
        // 获取开发机返回token
        getOpenID(code) {
            wx.request({
                url: 'https://notification.wechat.te642.com/api/user/request-platform',
                method: 'POST',
                data: {
                    code: code
                },
                success: (resp) => {
                    console.log(resp.data.data);
                    wx.setStorageSync('openId', resp.data.data.openid);
                },
                fail: () => {
                    console.log('开发服务器失败')
                },
                complete: () => {
                    console.log('开发服务器请求完成！')
                },
            })
        },
        // 登录微信获取临时登录凭证（code）
        loginWx() {
            wx.login({
                success: (res) => {
                    if (res.code) {
                        console.log('登录微信获取临时登录凭证（code）', res.code);
                        this.getOpenID(res.code);
                        this.getUserInfo();
                    }
                    else {
                        console.log('登录失败！' + res.errMsg)
                    }
                }
            });
        }
    },
    created() {
        let openId = (wx.getStorageSync('openId'));
        if (openId) {
        }

        // 查看是否授权
        wx.getSetting({
            success: (res) => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                    console.log('已授权')
                    this.getUserInfo();
                }
                else {
                    // 否则登录
                    console.log('未授权')
                    this.loginWx();
                }
            }
        })
    }
}
</script>

<style lang="less">
// .container {
//     height: 100%;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     padding: 200rpx 0;
//     box-sizing: border-box;

.btn-text {
    padding-left: 0;
    padding-right: 0;
    background-color: #fff;
    color: #aaa;
    font-size: 36rpx;
    line-height: 40rpx;
}

.userinfo {
    display: flex;
    flex-direction: column;
    align-items: center;
    .userinfo-avatar {
        width: 150rpx;
        height: 150rpx;
        // margin: 20rpx;
        border-radius: 50%;
    }

    .userinfo-nickname {
        color: #aaa;
    }
}

.circle {
    border-radius: 50%;
    // border: 1px solid #e80000;
    width: 150rpx;
    height: 150rpx;
    // margin: 0 auto;
    // line-height: 30px;
    // color: #e80000;
}

//     .usermotto {
//         // margin-top: 150px;
//     }
// }
</style>
