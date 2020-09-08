<template>
    <div>
        <label class="notes">
            <span class="name">{{this.fieldName}}</span>
            <input type="text"
                   :value="value"
                   @input="onValueChanged($event.target.value)"
                   :placeholder="placeholder">
        </label>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component, Prop} from 'vue-property-decorator';

    @Component
    export default class Notes extends Vue{
        @Prop({default: ''}) readonly value!: string;

        @Prop({required: true}) fieldName!: string;
        @Prop() placeholder?: string;

        onValueChanged(value: string) {
            this.$emit('update:value', value)
        }
    }
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.notes {
    display: flex;
    align-items: center;
    padding-left: 16px;
    font-size: 14px;
    .name {
        padding: 16px;
    }
    input {
        height: 44px;
        flex-grow: 1;
        background: transparent;
        border: none;
        padding-right: 16px;
    }
}
</style>