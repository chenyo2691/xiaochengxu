<template>
    <div>
        <i-tabs :current="current" color="#f759ab" @change="handleChange">
            <i-tab key="tab1" title="未读" :count="unreadCount"></i-tab>
            <i-tab key="tab2" title="已读"></i-tab>
        </i-tabs>
        <div v-if="current==='tab1'">
            <i-cell-group>
                <i-cell v-for="(item,index) in unread" :key="item.notificationSendUuid" :title="item.notificationSendTitle" :label="item.notificationSendCreateTime" is-link :url="'/pages/frontend/notificationDetail/main?notificationSendUuid='+item.notificationSendUuid"></i-cell>
            </i-cell-group>
        </div>
        <div v-if="current==='tab2'">
            <i-cell-group>
                <i-cell v-for="(item,index) in read" :key="item.notificationSendUuid" :title="item.notificationSendTitle" :label="item.notificationSendCreateTime" is-link :url="'/pages/frontend/notificationDetail/main?notificationSendUuid='+item.notificationSendUuid"></i-cell>
            </i-cell-group>
        </div>
    </div>
</template>

<script>
export default {
    onShow() {
        if (this.$root.$mp.query) {
            let workgroupUuid = this.$root.$mp.query.workgroupUuid;
            let openId = (wx.getStorageSync('openId'));
            if (openId) {
                // 我的工作组列表
                let url = 'api/notification/get-workgroup-notification-list';
                this.$http.post({url, data: {openid: openId, workgroupUuid: workgroupUuid}}).then((res) => {
                    this.read = res.data.notification.read;
                    this.unread = res.data.notification.unread;
                    this.unreadCount = this.unread.length;
                });
            }
        }
    },
    components: {
    },
    data() {
        return {
            current: 'tab1',
            read: [],
            unread: [],
            unreadCount: 0
        }
    },
    methods: {
        handleChange(e) {
            this.current = e.mp.detail.key
        }
    }
}
</script>

<style lang="less">

</style>
