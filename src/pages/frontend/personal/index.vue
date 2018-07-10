<template>
    <div class="container">
        <i-panel>
            <view style="padding: 15rpx;">
                <!--  @click="bindViewTap" -->
                <div class="userinfo">
                    <img v-if="userInfo.avatarUrl" class="userinfo-avatar" :src="userInfo.avatarUrl" background-size="cover" />
                    <button v-if="!userInfo.avatarUrl" class="circle" open-type="getUserInfo" @getuserinfo="bindGetUserInfo"></button>
                    <div class="userinfo-nickname">
                        <card :text="userInfo.nickName"></card>
                        <button v-if="!userInfo.avatarUrl" class="btn-text" open-type="getUserInfo" @getuserinfo="bindGetUserInfo">点击获取头像</button>
                    </div>
                </div>
            </view>
        </i-panel>

        <i-panel>
            <view style="padding: 15rpx;">
                <i-cell-group>
                    <!-- <i-cell :title="userInfo.avatarUrl ? '已授权' : '授权使用'" is-link url="/frontend/pages/dashboard/index"></i-cell> -->
                    <i-cell title="组别申请" is-link @click="groupApplication"></i-cell>
                    <i-cell title="后台管理" is-link @click="management"></i-cell>
                </i-cell-group>
            </view>
        </i-panel>

        <i-message id="message" />

        <!-- <div class="usermotto">
            <button class="circle" size="mini" open-type="getUserInfo" @getuserinfo="bindGetUserInfo">
                {{ userInfo.avatarUrl ? '已授权' : '授权使用' }}
            </button>
        </div>
        <a v-if="userInfo.avatarUrl" href="/frontend/pages/counter/main" class="counter">去往Vuex示例页面</a> -->
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
        groupApplication() {
            if (!this.userInfo.avatarUrl) {
                $Message({
                    content: '请点击头像获取用户信息',
                    type: 'warning',
                    duration: 2
                });
            }
            else {
                const url = '/frontend/pages/groupApplicate/main';
                wx.navigateTo({url});
            }
        },
        management() {
            if (!this.userInfo.avatarUrl) {
                $Message({
                    content: '您不是管理员',
                    type: 'warning',
                    duration: 2
                });
            }
            else {
                const url = '/frontend/pages/groupApplicate/main';
                wx.navigateTo({url});
            }
        },
        bindGetUserInfo() {
            wx.getUserInfo({
                success: (res) => {
                    this.userInfo = res.userInfo
                }
            });
        }
    },
    created() {
        // 调用应用实例的方法获取全局数据
        this.bindGetUserInfo();// 如果已授权，可用

        // wx.getSetting({
        //     success: function (res) {
        //         if (res.authSetting['scope.userInfo']) {
        //             // 已经授权，可以直接调用 getUserInfo 获取头像昵称
        //             wx.getUserInfo({
        //                 success: function (res) {
        //                     console(res.userInfo)
        //                 }
        //             })
        //         }
        //     }
        // })
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
