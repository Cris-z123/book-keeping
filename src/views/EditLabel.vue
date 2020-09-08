<template>
    <Layout>
        <div class="navBar">
            <Icon class="leftIcon" name="right" @click.native="goBack"></Icon>
            <span class="title">编辑标签</span>
            <span class="rightIcon"></span>
        </div>
        <div class="form-wrapper">
            <Notes :value="tag.name"
                    @update:value="update"
                    field-name="标签名" placeholder="请输入标签名"></Notes>
        </div>
        <div class="createTag-wrapper">
            <button class="createTag" @click="remove">删除标签</button>
        </div>
    </Layout>
</template>

<script lang="ts">
    import Vue from 'vue';
    import { Component } from 'vue-property-decorator';
    import tagListModel from '@/models/tagListModel';
    import Notes from '@/components/money/Notes.vue';

    @Component({
        components: {Notes}
    })
    export default class EditLabel extends Vue {
        tag?: {id: string; name: string} = undefined;

        created() {
            const id = this.$route.params.id;
            tagListModel.fetch();
            const tags = tagListModel.data
            const tag = tags.filter(t => t.id === id)[0]
            if(tag) {
                this.tag = tag;
            } else {
                this.$router.replace('/404');
            }
        }

        update(name: string) {
            if(this.tag) {
                tagListModel.update(this.tag.id, name);
            }
        }
        remove() {
            if(this.tag) {
                if(tagListModel.remove(this.tag.id)) {
                    this.$router.back();
                } else {
                    window.alert('删除失败')
                }
            }
        }
        goBack() {
            this.$router.back();
        }
    }
</script>

<style lang="scss" scoped>
.navBar {
    text-align: center;
    font-size: 16px;
    padding: 12px 16px;
    background: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    > .leftIcon {
        width: 24px;
        height: 24px;
        transform: rotate(180deg);
    }
    > .rightIcon {
        width: 24px;
        height: 24px;
    }
}
.form-wrapper {
    background: white;
    margin-top: 8px;
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