<template>
    <div>
        <i-panel>
            <i-cell-group>
                <!-- 'path?key=value&key2=value2 -->
                <i-cell v-for="(item,index) in applyRecordList" :key="index" :title="item.unCheckCount + '个申请'" is-link :url="item.url">
                    <i-icon type="group_fill" slot="icon" />
                    <i-avatar :src="item.avatarUrl" slot="footer"></i-avatar>
                </i-cell>
            </i-cell-group>
        </i-panel>
    </div>
</template>

<script>
export default {
    onLoad() {
        let openId = (wx.getStorageSync('openId'));
        if (openId) {
            // 获取待审批的列表
            wx.request({
                url: 'https://notification.wechat.te642.com/api/workgroup/get-uncheck-workgroup-list',
                method: 'POST',
                data: {
                    openid: openId
                },
                success: (res) => {
                    console.log(res.data);
                    res.data.data.applyRecordList.forEach(function (element) {
                        element.avatarUrl = element.userinfo.avatarUrl;
                        element.url = '/pages/backend/approval-detail/main?openid=' + element.openid;
                    }, this);
                    this.applyRecordList = res.data.data.applyRecordList;
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
            applyRecordList: []
        }
    },
    methods: {

    }
}
</script>

<style lang="less">

</style>
