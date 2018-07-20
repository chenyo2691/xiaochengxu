<template>
    <div>
        <i-panel>
            <i-input :value="title" title="标题" autofocus placeholder="标题" @change="titleChange" />
        </i-panel>
        <i-panel>
            <i-input :value="content" title="内容" placeholder="内容" type="textarea" @change="contentChange" />
        </i-panel>
        <i-panel>
            <picker mode="multiSelector" v-model="dateTime1" @change="changeDateTime1" @columnchange="changeDateTimeColumn1" :range="dateTimeArray1">
                <!-- <view class="tui-picker-detail"> -->
                <i-input type="textarea" v-model="deadline" title="截止时间" placeholder="截止时间" />
                <!-- 选择截止时间: {{dateTimeArray1[0][dateTime1[0]]}}-{{dateTimeArray1[1][dateTime1[1]]}}-{{dateTimeArray1[2][dateTime1[2]]}} {{dateTimeArray1[3][dateTime1[3]]}}:{{dateTimeArray1[4][dateTime1[4]]}} -->
                <!-- </view> -->
            </picker>
        </i-panel>
        <i-panel>
            <picker @change="bindGroupChange" v-model="groupIndex" :range="workGroups" range-key="workgroupName">
                <i-input type="textarea" :value="currentGroup" title="组群" placeholder="选择需要发布的群" />
            </picker>
        </i-panel>
        <i-panel title="消费者" hide-border>
            <i-grid v-for="(itemContaner,index) in customers" :key="index">
                <i-grid-item v-for="(item,index2) in itemContaner" :key="item.nickName" i-class="grid-item">
                    <div v-if="item.avatarUrl" :class="item.selected? 'selected' : ''" class="customer" @tap="selectCustomer(item)">
                        <img class="userinfo-avatar" :src="item.avatarUrl" background-size="cover" />
                        <div class="userinfo-nickname">
                            <card>{{item.nickName}}</card>
                        </div>
                    </div>
                </i-grid-item>
            </i-grid>
        </i-panel>
        <div style="height:46px"></div>
        <div class="action">
            <i-button long="true" @click="handleRease" type="warning" size="small">发布</i-button>
        </div>
        <i-toast id="toast" />
    </div>
</template>

<script>
const {$Toast} = require('../../../base.js');
import dateTimePicker from '@/utils/dateTimePicker';
export default {
    onLoad() {
        // 初始化时间控件
        this.initDatePicker();

        // 初始化组群
        this.initGroup();
    },
    data() {
        return {
            title: '',
            content: '',
            deadline: '',
            group: '',

            workGroups: [],// 工作组
            groupIndex: 0,// 当前选择的工作组索引
            customers: [],// 当前消费者

            dateTime1: null,
            dateTimeArray1: null,
            startYear: 2000,
            endYear: 2050,
        }
    },
    computed: {
        currentGroup() {
            return this.workGroups[this.groupIndex] ? this.workGroups[this.groupIndex]['workgroupName'] : '';
        }
    },
    methods: {
        // 初始化组群
        initGroup() {
            let openId = (wx.getStorageSync('openId'));
            if (openId) {
                // 获取工作组对应的有效用户
                wx.request({
                    url: 'https://notification.wechat.te642.com/api/workgroup/get-workgroup-user-relation',
                    method: 'POST',
                    data: {
                        openid: openId
                    },
                    success: (res) => {
                        res.data.data.relations.forEach(function (element) {
                            this.workGroups.push(
                                {
                                    workgroupUuid: element[0].workgroupUuid,
                                    workgroupName: element[0].workgroupName,
                                    userList: element
                                }
                            );
                        }, this);
                        this.refreshCustomers();
                    },
                    fail: () => {

                    },
                    complete: () => {

                    },
                })
            }
        },
        // 初始化时间控件
        initDatePicker() {
            // 获取完整的年月日 时分秒，以及默认显示的数组
            var obj = dateTimePicker.dateTimePicker(this.startYear, this.endYear);
            var obj1 = dateTimePicker.dateTimePicker(this.startYear, this.endYear);
            // 精确到分的处理，将数组的秒去掉
            var lastArray = obj1.dateTimeArray.pop();
            var lastTime = obj1.dateTime.pop();

            this.dateTime = obj.dateTime;
            this.dateTimeArray = obj.dateTimeArray;
            this.dateTimeArray1 = obj1.dateTimeArray;
            this.dateTime1 = obj1.dateTime;
        },
        changeDateTime1(e) {
            this.dateTime1 = e.mp.detail.value;
            this.deadline = `${this.dateTimeArray1[0][this.dateTime1[0]]}-${this.dateTimeArray1[1][this.dateTime1[1]]}-${this.dateTimeArray1[2][this.dateTime1[2]]} ${this.dateTimeArray1[3][this.dateTime1[3]]}:${this.dateTimeArray1[4][this.dateTime1[4]]}`;
        },
        changeDateTimeColumn1(e) {
            var arr = this.dateTime1, dateArr = this.dateTimeArray1;

            arr[e.mp.detail.column] = e.mp.detail.value;
            dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

            this.dateTimeArray1 = dateArr;
            this.dateTime1 = arr;
            this.deadline = `${this.dateTimeArray1[0][this.dateTime1[0]]}-${this.dateTimeArray1[1][this.dateTime1[1]]}-${this.dateTimeArray1[2][this.dateTime1[2]]} ${this.dateTimeArray1[3][this.dateTime1[3]]}:${this.dateTimeArray1[4][this.dateTime1[4]]}`;
        },
        // 工作组选择
        bindGroupChange: function (e) {
            this.groupIndex = e.mp.detail.value;
            this.refreshCustomers();
        },
        // 刷新当前消费者
        refreshCustomers() {
            this.customers = this.split(
                this.workGroups[this.groupIndex].userList.map(v => ({
                    userWechatOpenid: v.userWechatOpenid,
                    avatarUrl: v.userinfo.avatarUrl,
                    nickName: v.userinfo.nickName,
                    selected: false
                }))
            );
        },
        handleRease() {
            // 发布消息
            let openId = (wx.getStorageSync('openId'));
            let receiveUserOpenidList = [];
            this.customers.forEach(function (element) {
                receiveUserOpenidList = receiveUserOpenidList.concat(element.filter(v => v.selected).map(v => v.userWechatOpenid));
            }, this);
            if (openId) {
                let params = {
                    creatorOpenid: openId,
                    title: this.title,
                    content: this.content,
                    expireTime: this.deadline,
                    workgroupUuid: this.workGroups[this.groupIndex].workgroupUuid,
                    receiveUserOpenidList: receiveUserOpenidList
                };
                // 获取工作组对应的有效用户
                wx.request({
                    url: 'https://notification.wechat.te642.com/api/notification/push-notification',
                    method: 'POST',
                    data: params,
                    success: (res) => {
                        $Toast({
                            content: '发布成功',
                            type: 'success'
                        });
                    },
                    fail: () => {

                    },
                    complete: () => {

                    },
                })
            }
        },
        // 选择消费者
        selectCustomer(item) {
            item.selected = !item.selected;
        },
        // 分组函数
        split(array) {
            let chunks = []
            let count = Math.ceil(array.length / 3)
            while (count > 0) {
                chunks.push(array.slice((count - 1) * 3, count * 3))
                count--
            }
            chunks = chunks.reverse()
            const lastList = chunks[chunks.length - 1]
            const lastLength = lastList.length
            if (lastLength < 3) {
                for (let i = 0; i < 3 - lastLength; i++) {
                    lastList.push({
                        avatarUrl: '',
                        nickName: '-',
                        selected: false
                    })
                }
            }
            return chunks;
        },
        titleChange(e) {
            this.title = e.mp.detail.detail.value;
        },
        contentChange(e) {
            this.content = e.mp.detail.detail.value;
        },
    }
}
</script>

<style lang="less">
.selected {
    background-color: #5cadff;
}

.action {
    position: fixed;
    bottom: 0;
    width: 100%;
}

.customer {
    display: flex;
    flex-direction: column;
    align-items: center;
    // border: 1px solid black;
    // margin: 2px;
    flex-wrap: wrap;
    // width: 300rpx;
    .userinfo-avatar {
        width: 150rpx;
        height: 150rpx;
        border-radius: 50%;
    }

    .userinfo-nickname {
        margin-top: 10rpx;
        color: black;
    }
}

.grid-item {
    padding: 0 !important;
}
</style>
