<template>
    <div>
        <i-panel title="">
            <i-input :value="searchVal" placeholder="快速搜索你的联系人" type="textarea" mode="wrapped" @change="searchValChange" />
        </i-panel>
        <i-cell-group>
            <!-- 'path?key=value&key2=value2 -->
            <i-cell v-for="(item,index) in computedApplyRecordList" :key="item.openid" :title="item.unCheckCount + '个申请'" is-link :url="item.url">
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
            let url = 'api/workgroup/get-uncheck-workgroup-list';
            this.$http.post({url, data: {openid: openId}}).then((res) => {
                res.data.applyRecordList.forEach(function (element) {
                    element.avatarUrl = element.userinfo ? element.userinfo.avatarUrl : '';
                    element.url = '/pages/backend/approval-detail/main?openid=' + element.openid;
                }, this);
                this.applyRecordList = res.data.applyRecordList;
            });
        }
    },
    components: {
    },
    computed: {
        computedApplyRecordList() {
            if (this.searchVal) {
                return this.applyRecordList.filter(v => v.userinfo ? v.userinfo.nickName.indexOf(this.searchVal) !== -1 : false);
            }
            return this.applyRecordList;
        }
    },
    data() {
        return {
            applyRecordList: [],
            searchVal: ''
        }
    },
    methods: {
        searchValChange(event) {
            this.searchVal = event.mp.detail.detail.value;
        }
    }
}
</script>

<style lang="less">

</style>
