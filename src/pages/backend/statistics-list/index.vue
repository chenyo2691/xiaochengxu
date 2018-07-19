<template>
    <div>
        <i-panel>
            <i-cell-group>
                <i-cell title="值班通知" label="2018-07-08 13:30:00 - 2018-07-08 13:30:00" is-link url="/pages/backend/statistics-detail/main">
                    <i-icon type="warning_fill" slot="icon" color="#ed3f14" />
                </i-cell>
                <i-cell title="月底组办报表提交" label="2018-07-08 13:30:00 - 2018-07-08 13:30:00" is-link url="/pages/backend/statistics-detail/main">
                    <i-icon type="success_fill" slot="icon" color="#19be6b" />
                </i-cell>
            </i-cell-group>
        </i-panel>
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
.cell-badge {
    // margin-right: 40rpx;
    display: block;
}

.badge-alone {
    position: static !important;
    transform: none !important;
    &.blue {
        background: #2b85e4 !important;
    }
}
</style>
