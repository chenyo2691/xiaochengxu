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
                    <i-cell v-for="(ditem,index) in list" :key="index" :title="ditem.title">
                        <i-radio-group slot="footer" :current="ditem.currentStatus" @change="handleStatusChange(ditem.title,$event)">
                            <i-radio value="待审批" class="cell-radio"></i-radio>
                            <i-radio value="通过" class="cell-radio"></i-radio>
                            <i-radio value="禁止" class="cell-radio"></i-radio>
                        </i-radio-group>
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
    onLoad(option) {
        // 参数
        console.log(option.query);
        console.log(this.$root.$mp.query);
    },
    data() {
        return {
            userInfo: {
                avatarUrl: 'https://i.loli.net/2017/08/21/599a521472424.jpg',
                nickName: '王二麻子'
            },
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
</style>
