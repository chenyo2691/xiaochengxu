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
            let url = 'api/notification/get-notification-detail';
            this.$http.post({url, data: {openid: openId, workgroupUuidList: this.current}}).then((res) => {
                this.notificationDetail = Object.assign({}, this.notificationDetail, {
                    notificationSendUuid: res.data.notificationDetail.notificationSendUuid,
                    notificationSendTitle: res.data.notificationDetail.notificationSendTitle,
                    notificationSendContent: res.data.notificationDetail.notificationSendContent,
                    notificationSendCreateTime: res.data.notificationDetail.notificationSendCreateTime,
                    notificationSendExpireTime: res.data.notificationDetail.notificationSendExpireTime,
                    avatarUrl: res.data.notificationDetail.notificationCreator.user_info.avatarUrl,
                    nickName: res.data.notificationDetail.notificationCreator.user_info.nickName
                });
            });
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
                let url = 'api/notification/mark-notification-read';
                this.$http.post({url, data: {openid: openId, notificationSendUuid: this.notificationDetail.notificationSendUuid, }}).then((res) => {
                    $Toast({
                        content: '已读',
                        type: 'success'
                    });
                });
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
