<template>
    <div>
        <i-tabs :current="current" color="#f759ab" @change="handleChange">
            <i-tab key="tab1" title="未读" count="3"></i-tab>
            <i-tab key="tab2" title="已读"></i-tab>
        </i-tabs>
        <div v-if="current==='tab1'">
            <i-cell-group>
                <i-cell title="月底结算提交提醒" label="2018-06-28 14:23" is-link url="/frontend/pages/notificationDetail/main"></i-cell>
                <i-cell title="7月1号国家最新政策宣贯" label="2018-06-28 14:23" is-link url="/frontend/pages/notificationDetail/main"></i-cell>
            </i-cell-group>
        </div>
        <div v-if="current==='tab2'">
            <i-cell-group>
                <i-cell title="月底结算提交提醒" label="2018-06-28 14:23" is-link url="/frontend/pages/notificationDetail/main"></i-cell>
                <i-cell title="7月1号国家最新政策宣贯" label="2018-06-28 14:23" is-link url="/frontend/pages/notificationDetail/main"></i-cell>
            </i-cell-group>
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
            current: 'tab1',
        }
    },
    methods: {
        handleChange(e) {
            this.current = e.mp.detail.key
        }
    }
}
</script>

<style lang="less">

</style>
