<template>
    <div class="container">
        <i-panel title="组群">
            <checkbox-group @change="checkboxChange">
                <label class="weui-cell weui-check__label" v-for="(item,index) in items" :key="index">
                    <view class="weui-cell__hd">
                        <checkbox :value="item.name" :checked="item.checked" />
                    </view>
                    <view class="weui-cell__bd">{{item.value}}</view>
                </label>
            </checkbox-group>
        </i-panel>
        <div style="height:46px"></div>
        <div class="action">
            <i-button long="true" bind:click="handleClick" type="warning" size="small">申请</i-button>
        </div>
    </div>
</template>

<script>
export default {
    created() {
    },
    components: {
    },
    data() {
        return {
            items: [
                {name: 'USA', value: '美国群'},
                {name: 'CHN', value: '中国群'},
                {name: 'BRA', value: '巴西群'},
                {name: 'JPN', value: '日本群'},
                {name: 'ENG', value: '英国群'},
                {name: 'TUR', value: '法国群'},
            ],
            current: []
        }
    },
    methods: {
        checkboxChange(e) {
            let items = this.items;
            let values = e.mp.detail.value;
            for (let i = 0, lenI = items.length; i < lenI; ++i) {
                items[i].checked = false;

                for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
                    if (items[i].name == values[j]) {
                        items[i].checked = true;
                        break
                    }
                }
            }
            this.current = items.filter(v => v.checked).map(v => v.name);
            console.log(this.current);
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
