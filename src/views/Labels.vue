<template>
    <div>
        <Layout>
            <div class="tags">
                <router-link class="tag" v-for="tag in tags" :key="tag.id"
                            :to="`/labels/edit/${tag.id}`">
                    <span>{{tag.name}}</span>
                    <Icon name="right"></Icon>
                </router-link>
            </div>
            <div class="createTag-wrapper">
                <button class="createTag" @click="createTag">新增标签</button>
            </div>
        </Layout>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component} from 'vue-property-decorator';
    import store from '@/store/index2';

    @Component
    export default class Labels extends Vue {
        tags = store.tagList;

        createTag() {
            const name = window.prompt('请输入标签名')
            if(name) {
                store.createTag(name);
            }
        }
    }
</script>

<style lang="scss" scoped>
.tags {
    background: white;
    font-size: 16px;
    padding-left: 16px;
    > .tag {
        min-height: 44px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #e6e6e6;
        svg {
            width: 18px;
            height: 18px;
            color: #666;
            margin-right: 16px;
        }
    }
}
.createTag {
    background: #ccccff;
    color: white;
    border-radius: 4px;
    border: none;
    height: 40px;
    padding: 0 16px;
    &-wrapper {
        text-align: center;
        padding: 16px;
        margin-top: 44-16px;
    }
}
</style>