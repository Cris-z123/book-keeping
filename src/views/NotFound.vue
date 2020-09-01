<template>
    <div>
        <div>当前页面不存在，请检查网址是否正确</div>
        <div>
            <router-link to="/">返回首页</router-link>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'

    export default Vue.extend({
        name: 'NotFound'
    })
</script>

<style lang="sass" scoped>

</style>