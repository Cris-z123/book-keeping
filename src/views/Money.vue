<template>
    <Layout class-prefix="layout">
        <NumberPad @update:value="onUpdateAmount" @submit="saveRecord"></NumberPad>
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
    import {Component, Watch} from 'vue-property-decorator';

    const version = window.localStorage.getItem('version') || '0';
    const recordList: Record[] = JSON.parse(window.localStorage.getItem('recordList') || '[]');
    if(version === '0.0.1') {
        // 数据库升级，数据迁移
        recordList.forEach(record => {
            record.createdAt = new Date(2020, 0, 1)
        });
        //保存数据
        window.localStorage.setItem('recordList', JSON.stringify(recordList));
    }
    window.localStorage.setItem('version', '0.0.2')

    type Record = {
        tags: string[];
        notes: string;
        type: string;
        amount: number;
        createdAt?: Date;
    }

    @Component({
        components: {Notes, Types, NumberPad, Tags}
    })
    export default class Money extends Vue{
        tags = ['服饰', '饮食', '住宿', '交通'];
        recordList: Record[] = JSON.parse(window.localStorage.getItem('recordList') || '[]');
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
        saveRecord() {
            const record2 = JSON.parse(JSON.stringify(this.record)); //deepClone(将record的复制保存到list)
            record2.createdAt = new Date();
            this.recordList.push(record2);
        }
        
        @Watch('recordList')
        onRecordListchange() {
            window.localStorage.setItem('recordList', JSON.stringify(this.recordList))
        }
    }
</script>

<style lang="scss">
.layout-content {
    display: flex;
    flex-direction: column-reverse;
}
</style>