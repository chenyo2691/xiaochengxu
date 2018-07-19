<template>
    <div>
        <i-panel>
            <i-cell-group>
                <i-cell title="组办" is-link url="/pages/backend/statistics-list/main">
                    <span slot="footer" class="cell-badge">
                        <i-badge count="66" i-class-alone="badge-alone"></i-badge>
                        <i-badge count="66" i-class-alone="badge-alone blue"></i-badge>
                    </span>
                </i-cell>
                <i-cell title="结算股" is-link url="/pages/backend/statistics-list/main">
                    <span slot="footer" class="cell-badge">
                        <i-badge count="66" i-class-alone="badge-alone"></i-badge>
                        <i-badge count="66" i-class-alone="badge-alone blue"></i-badge>
                    </span>
                </i-cell>
                <i-cell title="预算股" is-link url="/pages/backend/statistics-list/main">
                    <span slot="footer" class="cell-badge">
                        <i-badge count="66" i-class-alone="badge-alone"></i-badge>
                        <i-badge count="66" i-class-alone="badge-alone blue"></i-badge>
                    </span>
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
