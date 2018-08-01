<template>
    <div>
        <i-cell-group>
            <i-cell v-for="(item,index) in workgroupList" :key="item.workGroupUuid" :title="item.workGroupNameRender" is-link :url="item.url"></i-cell>
        </i-cell-group>
        <i-alert v-if="workgroupList.length===0" show-icon desc>
            <view slot="desc">您暂无工作组，请移步到 我的-组别申请</view>
        </i-alert>
    </div>
</template>

<script>
export default {
    // 下拉刷新回调接口
    onPullDownRefresh() {
        this.initList();
    },
    onShow() {
        this.initList();
    },
    onLoad() {

    },
    components: {
    },
    data() {
        return {
            workgroupList: []
        }
    },
    methods: {
        initList() {
            let openId = (wx.getStorageSync('openId'));
            if (openId) {
                // 我的工作组列表
                let url = 'api/workgroup/my-workgroup-list';
                this.$http.post({url, data: {openid: openId}}).then((res) => {
                    res.data.workgroupList.forEach(function (element) {
                        let unReadMsg = element.unReadCount === 0 ? '' : '(' + element.unReadCount + ')';
                        element.workGroupNameRender = element.workGroupName + unReadMsg;
                        element.url = '/pages/frontend/notifications/main?workgroupUuid=' + element.workGroupUuid;
                    }, this);
                    this.workgroupList = res.data.workgroupList;
                    wx.stopPullDownRefresh();
                });
            }
        }
    }
}
</script>

<style lang="less">

</style>
