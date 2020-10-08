<template>
    <div>
        <Layout>
            <div class="navBar">
                <span class="title">编辑标签</span>
            </div>
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
    import {Component} from 'vue-property-decorator';
    import {mixins} from 'vue-class-component';
    import TagHelper from '@/mixins/TagHelper';

    @Component
    export default class Labels extends mixins(TagHelper) {
        get tags() {
            return this.$store.state.tagList;
        }
        
        beforeCreate() {
            this.$store.commit('fetchTags');
        }
    }
</script>

<style lang="scss" scoped>
.navBar {
    text-align: center;
    font-size: 16px;
    color: white;
    padding: 12px 16px;
    background: #99ccff;
    display: flex;
    align-items: center;
    justify-content: center;
}
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