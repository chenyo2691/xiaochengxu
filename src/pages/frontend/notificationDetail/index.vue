<template>
    <div class="container">
        <div class="content">
            <i-avatar class="avatar" size="large" src="https://i.loli.net/2017/08/21/599a521472424.jpg"></i-avatar>
            <p class="title">各位同事，记得准时提交月底结算单哦！</p>
            <p class="time">2018-07-08 13:30:00 ~ 2018-07-15 17:30:00</p>
        </div>
        <div class="action">
            <i-button long="true" @click="handleRead" type="warning" size="small">我知道了</i-button>
        </div>

        <i-toast id="toast" />
    </div>
</template>

<script>
const {$Toast} = require('../../../base.js');
export default {
    created() {

    },
    components: {
    },
    data() {
        return {

        }
    },
    methods: {
        handleRead() {
            $Toast({
                content: '已读',
                type: 'success'
            });
        }
    }
}
</script>

<style lang="less">
.container {
    // display: flex;
    // flex-direction: column;
    // justify-content: space-around;
    // align-items: center;
    .content {
        margin-bottom: 200rpx;
        text-align: center;
        .avatar {
            margin: 20rpx;
        }
        .title {
            font-weight: bolder;
            margin: 20rpx;
        }
        .time {
            font-size: 30rpx;
        }
    }
    .action {
        position: fixed;
        bottom: 0;
        width: 100%;
    }
}
</style>
