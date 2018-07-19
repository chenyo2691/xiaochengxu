<template>
    <div>
        <i-panel>
            <view style="padding: 15rpx;">
                <div class="userinfo">
                    <img class="userinfo-avatar" :src="userInfo.avatarUrl" background-size="cover" />
                    <div class="userinfo-nickname">
                        <card>{{userInfo.nickName}}</card>
                    </div>
                </div>
            </view>
        </i-panel>

        <i-panel>
            <view style="padding: 15rpx;">
                <i-cell-group i-class>
                    <i-cell v-for="(ditem,index) in workgroupList" :key="ditem.workGroupUuid" :title="ditem.workGroupName">

                        <!-- <i-radio-group slot="footer" :current="ditem.applyStatus" @change="handleStatusChange(ditem.workGroupName,$event)">
                            <i-radio value="待审批" class="cell-radio"></i-radio>
                            <i-radio value="通过" class="cell-radio"></i-radio>
                            <i-radio value="禁止" class="cell-radio"></i-radio>
                        </i-radio-group> -->

                        <radio-group class="radio-group-cys" slot="footer" @change="radioChange(ditem,$event)">
                            <label class="radio-label-cys">
                                <view>
                                    <radio value="2" :checked="ditem.applyStatus === 2" />
                                </view>
                                <view>待审批</view>
                            </label>

                            <label class="radio-label-cys">
                                <view>
                                    <radio value="1" :checked="ditem.applyStatus === 1" />
                                </view>
                                <view>通过</view>
                            </label>

                            <label class="radio-label-cys">
                                <view>
                                    <radio value="0" :checked="ditem.applyStatus === 0" />
                                </view>
                                <view>禁止</view>
                            </label>
                        </radio-group>

                    </i-cell>
                </i-cell-group>
            </view>
        </i-panel>

        <div style="height:46px"></div>

        <div class="action">
            <i-button long="true" @click="handleSubmit" type="warning" size="small">确认</i-button>
        </div>

        <i-toast id="toast" />
    </div>
</template>

<script>
const {$Toast} = require('../../../base.js');
export default {
    onLoad() {
        if (this.$root.$mp.query) {
            let openid = this.$root.$mp.query.openid;
            // 获取消费者所申请的所有工作组
            wx.request({
                url: 'https://notification.wechat.te642.com/api/workgroup/get-user-apply-workgroup',
                method: 'POST',
                data: {
                    openid: openid
                },
                success: (res) => {
                    console.log(res.data);
                    // res.data.data.applyRecordList.forEach(function (element) {
                    //     element.avatarUrl = element.userinfo.avatarUrl;
                    //     element.url = '/pages/backend/approval-detail/main?openid=' + element.openid;
                    // }, this);
                    // this.applyRecordList = res.data.data.applyRecordList;
                    this.userInfo.avatarUrl = res.data.data.userInfo.avatarUrl;
                    this.userInfo.nickName = res.data.data.userInfo.nickName;
                    this.workgroupList = res.data.data.workgroupList;
                },
                fail: () => {

                },
                complete: () => {

                }
            })
        }
    },
    data() {
        return {
            userInfo: {
                avatarUrl: '',
                nickName: ''
            },
            workgroupList: [],
            list: [
                {
                    title: '组办',
                    currentStatus: '待审批',
                },
                {
                    title: '预算股',
                    currentStatus: '通过',
                },
                {
                    title: '结算股',
                    currentStatus: '禁止',
                },
            ],
            statusSetting: [
                {
                    key: '待审批',
                    value: '待审批'
                },
                {
                    key: '通过',
                    value: '通过'
                },
                {
                    key: '禁止',
                    value: '禁止'
                }
            ]
        }
    },
    methods: {
        radioChange(item, e) {
            console.log(item, e);
            // console.log('radio发生change事件，携带value值为：', e.mp.detail.value)
            item.applyStatus = parseInt(e.mp.detail.value);
            // var items = this.data.items;
            // for (var i = 0, len = items.length; i < len; ++i) {
            //     items[i].checked = items[i].value === e.mp.detail.value
            // }
            // console.log(items);
            // this.setData({
            //     items: items
            // });
        },
        handleStatusChange(title, current) {
            let found = this.list.find(v => v.title === title);
            if (found) {
                found.currentStatus = current.mp.detail.value;
            }
        },
        handleSubmit() {
            $Toast({
                content: '审核成功',
                type: 'success'
            });
        }
    }
}
</script>

<style lang="less">
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
        border-radius: 50%;
    }

    .userinfo-nickname {
        margin-top: 10px;
        color: #aaa;
    }
}

.circle {
    border-radius: 50%;
    width: 150rpx;
    height: 150rpx;
}

.action {
    position: fixed;
    bottom: 0;
    width: 100%;
}

.cell-radio {
    display: inline-block;
    margin: -7px;
}

.radio-group-cys {
    display: flex;

    .radio-label-cys {
        display: flex;
        padding-right: 7px;
    }
}
</style>
