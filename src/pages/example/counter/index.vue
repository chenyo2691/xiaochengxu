<template>
    <div class="counter-warp">
        <p>Vuex counter：{{ count }}</p>
        <p>Vuex counter：{{ count + 1}}</p>
        <p>
            <button @click="increment">+</button>
            <button @click="decrement">-</button>
        </p>

        <a href="/pages/frontend/index/main" class="home">去往首页</a>
    </div>
</template>

<script>
// Use Vuex
import store from './store'

export default {
    computed: {
        count() {
            return store.state.count
        }
    },
    methods: {
        increment() {
            store.commit('increment')
        },
        decrement() {
            store.commit('decrement')
        }
    },
    created() {
        // `this` 指向 vm 实例
        // console.log('a is: ' + this.a)
    },
    onShow() {
        // `this` 指向 vm 实例
        // console.log('a is: ' + this.a, '小程序触发的 onshow')
    }
}
</script>

<style>
.counter-warp {
    text-align: center;
    margin-top: 100px;
}
.home {
    display: inline-block;
    margin: 100px auto;
    padding: 5px 10px;
    color: blue;
    border: 1px solid blue;
}
</style>
