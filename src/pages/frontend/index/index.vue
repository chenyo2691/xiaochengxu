<template>
    <div>
        <i-cell-group>
            <i-cell v-for="(item,index) in workgroupList" :key="item.workGroupUuid" :title="item.workGroupNameRender" is-link url="/pages/frontend/notifications/main"></i-cell>
        </i-cell-group>
        <i-alert v-if="workgroupList.length===0" show-icon desc>
            <view slot="desc">您暂无工作组，请移步到 我的-组别申请</view>
        </i-alert>
    </div>
</template>

<script>
export default {
    onLoad() {
        let openId = (wx.getStorageSync('openId'));
        if (openId) {
            // 我的工作组列表
            wx.request({
                url: 'https://notification.wechat.te642.com/api/workgroup/my-workgroup-list',
                method: 'POST',
                data: {
                    openid: openId
                },
                success: (res) => {
                    res.data.data.workgroupList.forEach(function (element) {
                        element.workGroupNameRender = item.workGroupName + item.unReadCount === 0 ? '' : `(${item.unReadCount})`;
                    }, this);
                    this.workgroupList = res.data.data.workgroupList;
                },
                fail: () => {

                },
                complete: () => {

                },
            })
        }
    },
    components: {
    },
    data() {
        return {
            workgroupList: []
        }
    },
    methods: {

    }
}
</script>

<style lang="less">

</style>
