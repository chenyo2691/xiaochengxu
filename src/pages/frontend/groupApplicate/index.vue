<template>
    <div class="container">
        <i-panel title="组群">
            <checkbox-group @change="checkboxChange">
                <label class="weui-cell weui-check__label" v-for="(item,index) in workGroups" :key="item.work_group_uuid">
                    <view class="weui-cell__hd">
                        <checkbox :value="item.work_group_uuid" :checked="item.checked" />
                    </view>
                    <view class="weui-cell__bd">{{item.work_group_name}}</view>
                </label>
            </checkbox-group>
        </i-panel>
        <div style="height:46px"></div>
        <div class="action">
            <i-button long="true" @click="handleApplicate" type="warning" size="small">申请</i-button>
        </div>

        <i-toast id="toast" />
    </div>
</template>

<script>
const {$Toast} = require('../../../base.js');

export default {
    onLoad() {
        let openId = (wx.getStorageSync('openId'));
        if (openId) {
            // 获取工作组信息
            wx.request({
                url: 'https://notification.wechat.te642.com/api/workgroup/get-all-workgroup',
                method: 'POST',
                data: {
                    openid: openId
                },
                success: (res) => {
                    this.workGroups = res.data.data.workGroups;
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
            workGroups: [],
            current: []
        }
    },
    methods: {
        // checkbox改变时
        checkboxChange(e) {
            let items = this.workGroups;
            let values = e.mp.detail.value;
            for (let i = 0, lenI = items.length; i < lenI; ++i) {
                items[i].checked = false;

                for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
                    if (items[i].work_group_uuid === values[j]) {
                        items[i].checked = true;
                        break
                    }
                }
            }
            this.current = items.filter(v => v.checked).map(v => v.work_group_uuid);
        },
        // 申请入组
        handleApplicate() {
            let openId = (wx.getStorageSync('openId'));
            if (openId) {
                // 消费者订阅工作组
                wx.request({
                    url: 'https://notification.wechat.te642.com/api/workgroup/apply-workgroup',
                    method: 'POST',
                    data: {
                        openid: openId,
                        workgroupUuidList: this.current
                    },
                    success: (res) => {
                        $Toast({
                            content: '申请成功',
                            type: 'success'
                        });
                    },
                    fail: () => {

                    },
                    complete: () => {

                    },
                })
            }
            // $Toast({
            //     content: '错误的提示',
            //     type: 'error'
            // });
        }
    }
}
</script>

<style lang="less">
.container {
    // height: 100%;
    // width: 100%;
    // display: flex;
    // justify-content: center;
    // align-items: center;
    // flex-direction: column;

    .group-list {
        margin-bottom: 200rpx;
    }

    .action {
        position: fixed;
        bottom: 0;
        width: 100%;
    }
}

.weui-cell__bd {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
}

.weui-check__label:active {
    background-color: #ececec;
}

.weui-cell {
    padding: 10px 15px;
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
}
.weui-cell:before {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 1rpx solid #d9d9d9;
    color: #d9d9d9;
    left: 15px;
}
.weui-cell:first-child:before {
    display: none;
}
</style>
