<template>
    <div class="tags">
        <div class="new">
            <Icon name="tag"></Icon>
            <button @click="create">新增标签</button>
        </div>
        <ul class="current">
            <li v-for="tag in tagList" :key="tag.id"
                :class="{selected: selectedTags.indexOf(tag)>=0}"
                @click="toggle(tag)">{{tag.name}}</li>
        </ul>
    </div>
</template>

<script lang="ts">
    import store from '@/store/index2';
    import Vue from 'vue';
    import {Component} from 'vue-property-decorator';

    @Component
    export default class Tags extends Vue{
        tagList = store.fetchTags();
        selectedTags: string[] = [];
        
        toggle(tag: string) {
            const index = this.selectedTags.indexOf(tag)
            if(index >= 0) {
                this.selectedTags.splice(index, 1)
            }else {
                this.selectedTags.push(tag);
            }
            this.$emit('update:value', this.selectedTags)
        }
        create() {
            const name = window.prompt('请输入标签')
            if(!name) {
                return window.alert('标签名不能为空');
            }
            store.createTag(name);
        }
    }
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.tags {
    background: white;
    font-size: 14px;
    padding: 16px;
    display: flex;
    flex-grow: 1;
    flex-direction: column-reverse;
    > .current {
        display: flex;
        flex-wrap: wrap;
        > li {
            height: 24px;
            line-height: 24px;
            border-radius: (24px/2);
            padding: 0 16px;
            margin-right: 12px;
            margin-top: 4px;
            box-shadow: inset 5em 1em 0.5;
            background: #ccccff;
            color: white;
            &.selected {
                background: darken(#ccccff, 15%);
            }
        }  
    }
    > .new {
        padding-top: 16px;
        button {
            background: transparent;
            border: none;
            border-bottom: 1px solid;
            color: #999;
            padding: 0 4px;
        }
    }
}
</style>