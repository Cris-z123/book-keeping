<template>
    <div>
        <router-link to="/money">记账</router-link>
        <router-link to="/labels">
            <svg>
                <use xlink:href="#label"></use>
            </svg>
        </router-link>
        <router-link to="/statistics">统计</router-link>
    </div>
</template>

<script lang="ts">
    const importAll = (requireContext: __WebpackModuleApi.RequireContext) => requireContext.keys().forEach(requireContext)
    try {
        importAll(require.context('../assets/icons', true, /\.svg$/))
    } catch (error) {
        console.log(error);
    }

    export default {
        name: 'Nav'
    }
</script>

<style lang="scss" scoped>

</style>