<template>
    <div>
        <label class="notes">
            <span class="name">{{this.fieldName}}</span>
            <input type="text"
                   v-model="value"
                   :placeholder="this.placeholder">
        </label>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component, Watch, Prop} from 'vue-property-decorator';

    @Component
    export default class Notes extends Vue{
        value = '';

        @Prop({required: true}) fieldName!: string;
        @Prop() placeholder?: string;

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