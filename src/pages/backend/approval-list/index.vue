<template>
    <div>
        <i-panel>
            <i-cell-group>
                <i-cell title="2个申请" is-link url="/pages/backend/approval-detail/main">
                    <i-icon type="group_fill" slot="icon"/>
                    <i-avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" slot="footer"></i-avatar>
                </i-cell>
                <i-cell title="1个申请" is-link url="/pages/backend/approval-detail/main">
                    <i-icon type="group_fill" slot="icon"/>
                    <i-avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" slot="footer"></i-avatar>
                </i-cell>
                <i-cell title="暂无申请" is-link url="/pages/backend/approval-detail/main">
                    <i-icon type="group_fill" slot="icon"/>
                    <i-avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" slot="footer"></i-avatar>
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

</style>
