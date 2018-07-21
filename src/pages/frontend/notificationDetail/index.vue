<template>
    <div class="container">
        <div class="content">
            <i-avatar class="avatar" size="large" :src="notificationDetail.avatarUrl"></i-avatar>
            <p class="title">{{notificationDetail.notificationSendTitle}}</p>
            <p class="time">{{notificationDetail.notificationSendCreateTime}} ~ {{notificationDetail.notificationSendExpireTime}}</p>
            <p class="detail">{{notificationDetail.notificationSendContent}}</p>
        </div>
        <div class="action">
            <i-button long="true" @click="handleRead" type="warning" size="small">我知道了</i-button>
        </div>

        <i-toast id="toast" />
    </div>
</template>

<script>
const {$Toast} = require('../../../base.js');
export default {
    onShow() {
        if (this.$root.$mp.query) {
            let notificationSendUuid = this.$root.$mp.query.notificationSendUuid;
            // 获取消息详情
            wx.request({
                url: 'https://notification.wechat.te642.com/api/notification/get-notification-detail',
                method: 'POST',
                data: {
                    notificationSendUuid: notificationSendUuid
                },
                success: (res) => {
                    console.log(res.data.data.notificationDetail);
                    this.notificationDetail = Object.assign({}, this.notificationDetail, {
                        notificationSendUuid: res.data.data.notificationDetail.notificationSendUuid,
                        notificationSendTitle: res.data.data.notificationDetail.notificationSendTitle,
                        notificationSendContent: res.data.data.notificationDetail.notificationSendContent,
                        notificationSendCreateTime: res.data.data.notificationDetail.notificationSendCreateTime,
                        notificationSendExpireTime: res.data.data.notificationDetail.notificationSendExpireTime,
                        avatarUrl: res.data.data.notificationDetail.notificationCreator.user_info.avatarUrl,
                        nickName: res.data.data.notificationDetail.notificationCreator.user_info.nickName
                    });
                },
                fail: () => {

                },
                complete: () => {

                }
            })
        }
    },
    components: {
    },
    data() {
        return {
            notificationDetail: {
                notificationSendUuid: '',
                notificationSendTitle: '',
                notificationSendContent: '',
                notificationSendCreateTime: '',
                notificationSendExpireTime: '',
                avatarUrl: '',
                nickName: ''
            }
        }
    },
    methods: {
        handleRead() {
            let openId = (wx.getStorageSync('openId'));
            if (openId) {
                // 标记消息已读
                wx.request({
                    url: 'https://notification.wechat.te642.com/api/notification/mark-notification-read',
                    method: 'POST',
                    data: {
                        openid: openId,
                        notificationSendUuid: this.notificationDetail.notificationSendUuid,
                    },
                    success: (res) => {
                        $Toast({
                            content: '已读',
                            type: 'success'
                        });
                    },
                    fail: () => {

                    },
                    complete: () => {

                    }
                })
            }
        }
    }
}
</script>

<style lang="less">
.container {
    .content {
        margin-bottom: 200rpx;
        text-align: center;
        .avatar {
            margin: 20rpx;
        }
        .title {
            font-weight: bolder;
            margin: 20rpx;
        }
        .time {
            font-size: 30rpx;
        }
        .detail {
            text-align: left;
            margin: 20rpx;
        }
    }
    .action {
        position: fixed;
        bottom: 0;
        width: 100%;
    }
}
</style>
