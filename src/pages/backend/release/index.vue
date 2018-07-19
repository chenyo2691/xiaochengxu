<template>
    <div>
        <i-panel>
            <i-input v-model="title" title="标题" placeholder="标题" />
        </i-panel>
        <i-panel>
            <i-input type="textarea" v-model="content" title="内容" placeholder="内容" />
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
            <picker @change="bindGroupChange" v-model="index" :range="array" range-key="label">
                <i-input type="textarea" v-model="array[index]['label']" title="组群" placeholder="组群" />
            </picker>
        </i-panel>
        <i-panel title="消费者" hide-border>
            <i-grid v-for="(item,index) in 3" :key="index">
                <i-grid-item i-class="selected">
                    <i-grid-icon>
                        <image src="https://i.loli.net/2017/08/21/599a521472424.jpg" />
                    </i-grid-icon>
                    <i-grid-label>Grid</i-grid-label>
                </i-grid-item>
                <i-grid-item>
                    <i-grid-icon>
                        <image src="https://i.loli.net/2017/08/21/599a521472424.jpg" />
                    </i-grid-icon>
                    <i-grid-label>Grid</i-grid-label>
                </i-grid-item>
                <i-grid-item>
                    <i-grid-icon>
                        <image src="https://i.loli.net/2017/08/21/599a521472424.jpg" />
                    </i-grid-icon>
                    <i-grid-label>Grid</i-grid-label>
                </i-grid-item>
                <i-grid-item>
                    <i-grid-icon>
                        <image src="https://i.loli.net/2017/08/21/599a521472424.jpg" />
                    </i-grid-icon>
                    <i-grid-label>Grid</i-grid-label>
                </i-grid-item>
            </i-grid>
            </i-grid>
        </i-panel>
        <i-button long="true" @click="handleRease" type="warning" size="small">发布</i-button>
        <i-toast id="toast" />
    </div>
</template>

<script>
const {$Toast} = require('../../../base.js');
import dateTimePicker from '@/utils/dateTimePicker';
export default {
    created() {
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
    components: {
    },
    data() {
        return {
            title: '',
            content: '',
            deadline: '',
            group: '',

            dateTime1: null,
            dateTimeArray1: null,
            startYear: 2000,
            endYear: 2050,

            index: 0,
            array: [
                {
                    id: '1',
                    label: '中国'
                },
                {
                    id: '2',
                    label: '美国'
                }
            ],
        }
    },
    methods: {
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
        bindGroupChange: function (e) {
            this.index = e.mp.detail.value;
        },
        handleRease() {
            $Toast({
                content: '发布成功',
                type: 'success'
            });
        }
    }
}
</script>

<style lang="less">
.selected {
    background-color: #5cadff;
}
</style>
