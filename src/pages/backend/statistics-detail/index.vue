<template>
    <div>
        <div class="content">
            <i-panel>
                <i-avatar class="avatar" size="large" src="https://i.loli.net/2017/08/21/599a521472424.jpg"></i-avatar>
                <p class="title">各位同事，记得准时提交月底结算单哦！</p>
                <p class="time">2018-07-08 13:30:00 ~ 2018-07-15 17:30:00</p>
            </i-panel>
        </div>
        <div>
            <i-panel>
                <i-cell-group>
                    <i-cell title="Apple" label="2018-07-08 13:30:00">
                        <i-avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" size="large" slot="icon"></i-avatar>
                        <i-icon size="28" type="success_fill" slot="footer" color="#19be6b" />
                    </i-cell>
                    <i-cell title="Orange" label="-" i-class="opaction">
                        <i-avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" size="large" slot="icon"></i-avatar>
                        <i-icon size="28" type="warning_fill" slot="footer" color="#ed3f14" />
                    </i-cell>
                </i-cell-group>
            </i-panel>
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

        }
    },
    methods: {

    }
}
</script>

<style lang="less">
.content {
    padding-bottom: 100rpx;
    text-align: center;
    border-bottom: 1px solid #ccc;
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

.opaction {
    opacity: 0.6;
}
</style>
