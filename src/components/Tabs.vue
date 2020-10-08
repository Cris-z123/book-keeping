<template>
    <div>
        <ul class="tabs" :class="{[classPrefix+'-tabs']: classPrefix}">
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
    height: 64px;
    background: #99ccff;
    text-align: center;
    font-size: 20px;
    color: #fff;
    justify-content: center;
    align-items: center;
    &-item {
        display: flex;
        width: 25%;
        height: 40px;
        justify-content: center;
        align-items: center;
        position: relative;
        border: 1px solid black;
        &.selected::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(#6699cc, 0.3);
        }
    }
    &-item:not(:first-child) {
        margin-left: -1px;
    }
    &-item:first-child {
        border-top-left-radius: 8px;
        border-bottom-left-radius: 8px;
        
    }
    &-item:last-child {
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
    }
}
</style>