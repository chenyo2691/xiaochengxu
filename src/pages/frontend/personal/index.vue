<template>
    <div class="container">
        <i-panel>
            <view>
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
        // 组别申请
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
        // 后台管理
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
        // 保存用户信息
        saveUserInfo({openid, userInfo}) {
            // 保存用户信息
            let url = 'api/user/save-userInfo';
            this.$http.post({url, data: {openid, userInfo: JSON.stringify(userInfo)}}).then((res) => {
                console.log('用户信息写入成功');
            });
        },
        // wx获取用户信息
        getUserInfo() {
            wx.getUserInfo({
                // withCredentials: true,
                success: (res) => {
                    // console.log('获取用户信息', res);
                    this.userInfo = res.userInfo;
                    let openId = (wx.getStorageSync('openId'));
                    if (openId) {
                        this.saveUserInfo({openid: wx.getStorageSync('openId'), userInfo: res.userInfo});
                    }
                    else {
                        // 这里出现的情况是openid这个storage已经满了且被垃圾回收了。现在暂不考虑这种情况的发生
                        // this.getOpenID(code).then(() => {
                        //     this.saveUserInfo({openid: wx.getStorageSync('openId'), userInfo: res.userInfo});
                        // });
                    }
                },
                fail: () => {
                    // console.log('获取用户信息失败!')
                },
                complete: () => {
                    // console.log('获取用户信息完成！')
                },
            });
        },
        // 通过临时登录凭证获取openid
        getOpenID(code = '') {
            let openId = (wx.getStorageSync('openId'));
            if (openId) {
                console.log('openid已存在');
                return false;
            }
            else {
                // 通过临时登录凭证进行平台登记
                let url = 'api/user/request-platform';
                this.$http.post({url, data: {code}}).then((res) => {
                    wx.setStorageSync('openId', res.data.openid);
                    console.log('openid写入成功');
                });
            }
        },
        // 登录微信获取临时登录凭证（code）
        loginWx() {
            wx.login({
                success: (res) => {
                    if (res.code) {
                        console.log('登录微信获取临时登录凭证（code）', res.code);
                        this.getOpenID(res.code);
                        // this.getUserInfo();// 一般需要重新登录的，这里都不会进入到
                    }
                    else {
                        // console.log('登录失败！' + res.errMsg)
                    }
                }
            });
        }
    },
    created() {
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
.userinfo {
    margin-top: 35rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    .userinfo-avatar {
        width: 150rpx;
        height: 150rpx;
        // margin: 20rpx;
        border-radius: 5px;
    }

    .userinfo-nickname {
        color: #aaa;

        .btn-text {
            background-color: #fff;
            color: #aaa;
            font-size: 36rpx;
            line-height: 40rpx;
            // padding: 20rpx;
            margin-bottom: 20rpx;
        }
    }

    .circle {
        border-radius: 5px;
        width: 150rpx;
        height: 150rpx;
    }
}
</style>
