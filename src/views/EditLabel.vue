<template>
    <Layout>
        <div class="navBar">
            <Icon class="leftIcon" name="right" @click.native="goBack"></Icon>
            <span class="title">编辑标签</span>
            <span class="rightIcon"></span>
        </div>
        <div class="form-wrapper">
            <Notes :value="currentTag.name"
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
    import Notes from '@/components/money/Notes.vue';

    @Component({
        components: {Notes}
    })
    export default class EditLabel extends Vue {
        get currentTag() {
            return this.$store.state.currentTag;
        }

        created() {
            const id = this.$route.params.id;
            this.$store.commit('fetchTags');
            this.$store.commit('setCurrentTag', id);
            if(!this.currentTag) {
                this.$router.replace('/404');
            }
        }

        update(name: string) {
            if (this.currentTag) {
                this.$store.commit('updateTag', {id: this.currentTag.id, name});
            }
        }

        remove() {
            if(this.currentTag) {
                this.$store.commit('removeTag', this.currentTag.id)
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