<template>
    <div class="x">
        <Layout>
            <Types classPrefix="zzz" :value.sync="yyy"></Types>
        </Layout>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import { Component } from 'vue-property-decorator';
    import Types from '@/components/money/Types.vue';

    @Component({
        components: {Types}
    })
    export default class Statistics extends Vue{
        yyy = '-'
    }
</script>

<style lang="scss" scoped>
.x ::v-deep .zzz-item{
    background: white;
    &.selected {
        background: #c4c4c4;
    }
}
</style>