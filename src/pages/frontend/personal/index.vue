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
    created() {
    },
    onShow() {
        wx.getSetting({
            success: (res) => {
                if (res.authSetting['scope.userInfo']) {
                    console.log('已授权');
                    this.getUserInfo();
                }
                else {
                    // 否则登录
                    console.log('未授权');
                }
            }
        })
    },
    data() {
        return {
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
        // wx获取用户信息 & 保存用户信息
        getUserInfo() {
            return new Promise((resolve, reject) => {
                wx.getUserInfo({
                    success: (res) => {
                        this.userInfo = res.userInfo;
                        resolve({userInfo: res.userInfo});
                    }
                });
            }).then(({userInfo = {}}) => {
                this.$http.post({url: 'api/user/save-userInfo', data: {openid: wx.getStorageSync('openId'), userInfo: JSON.stringify(userInfo)}});
            }).catch((err) => {

            }).then((result) => {
                console.log('用户信息写入成功');
            });
        }
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
