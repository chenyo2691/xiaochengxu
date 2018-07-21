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
                wx.request({
                    url: 'https://notification.wechat.te642.com/api/notification/get-workgroup-notification-list',
                    method: 'POST',
                    data: {
                        openid: openId,
                        workgroupUuid: workgroupUuid,
                    },
                    success: (res) => {
                        // res.data.data.workgroupList.forEach(function (element) {
                        //     let unReadMsg = element.unReadCount === 0 ? '' : '(' + element.unReadCount + ')';
                        //     element.workGroupNameRender = element.workGroupName + unReadMsg;
                        //     element.url = '/pages/frontend/notifications/main?workgroupUuid=' + element.workGroupUuid;
                        // }, this);
                        // this.workgroupList = res.data.data.workgroupList;
                        this.read = res.data.data.notification.read;
                        this.unread = res.data.data.notification.unread;
                        this.unreadCount = this.unread.length;
                        console.log(this.unread);
                    },
                    fail: () => {

                    },
                    complete: () => {

                    }
                })
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
