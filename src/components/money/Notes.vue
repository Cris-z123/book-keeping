<template>
    <div>
        <label class="notes">
            {{value}}
            <span class="name"><Icon name="remarks"></Icon></span>
            <input type="text"
                   v-model="value"
                   placeholder="请输入备注">
        </label>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component, Watch} from 'vue-property-decorator';

    @Component
    export default class Notes extends Vue{
        value = '';

        @Watch('value')
        onValueChanged(value: string) {
            this.$emit('update:value', value)
        }
    }
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.notes {
    display: block;
    display: flex;
    align-items: center;
    padding: 16px 0;
    font-size: 14px;
    background: #f5f5f5;
    .name {
        padding: 16px;
    }
    input {
        height: 64px;
        flex-grow: 1;
        background: transparent;
        border: none;
        padding-right: 16px;
    }
}
</style>