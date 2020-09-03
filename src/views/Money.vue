<template>
    <Layout class-prefix="layout">
        <NumberPad @update:value="onUpdateAmount"></NumberPad>
        <Types :value.sync="record.type"></Types>
        <Notes @update:value="onUpdateNotes"></Notes>
        <Tags :data-source.sync="tags" @update:value="onUpdateTags"></Tags>
    </Layout>
</template>

<script lang="ts">
    import Vue from 'vue';
    import NumberPad from '@/components/money/NumberPad.vue';
    import Types from '@/components/money/Types.vue';
    import Tags from '@/components/money/Tags.vue';
    import Notes from '@/components/money/Notes.vue';
    import {Component} from 'vue-property-decorator';

    type Record = {
        tags: string[];
        notes: string;
        type: string;
        amount: number;
    }

    @Component({
        components: {Notes, Types, NumberPad, Tags}
    })
    export default class Money extends Vue{
        tags = ['服饰', '饮食', '住宿', '交通'];
        record: Record = {
            tags: [], notes: '', type: '-', amount: 0
        };

        onUpdateTags(value: string[]) {
            this.record.tags = value;
        }
        onUpdateNotes(value: string) {
            this.record.notes = value;
        }
        onUpdateAmount(value: string) {
            this.record.amount = parseFloat(value);
        }
    }
</script>

<style lang="scss">
.layout-content {
    display: flex;
    flex-direction: column-reverse;
}
</style>