<template>
    <div>
        <ul class="tabs" :class="{[classPrefix+'-tabs']:classPrefix}">
            <li v-for="item in dataSource" :key="item.value"
                class="tabs-item"
                :class="liClass(item)"
                @click="select(item)">{{item.text}}
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import { Component, Prop } from 'vue-property-decorator'

    type DataSourceItem = {text: string; value: string}

    @Component
    export default class Tabs extends Vue{
        @Prop({required: true, type: Array}) dataSource!: DataSourceItem[];
        @Prop(String) readonly value!: string;
        @Prop(String) classPrefix?: string;

        liClass(item: DataSourceItem) {
            return {
                [this.classPrefix + '-tabs-item']: this.classPrefix, selected: item.value === this.value
            };
        }

        select(item: DataSourceItem) {
            this.$emit('update:value', item.value);
        }
    }
</script>

<style lang="scss" scoped>
.tabs {
    display: flex;
    background: #99ccff;
    text-align: center;
    font-size: 24px;
    color: #fff;
    &-item {
        display: flex;
        width: 50%;
        height: 64px;
        justify-content: center;
        align-items: center;
        position: relative;
        &.selected::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(#6699cc, 0.2);
        }
    }
}
</style>