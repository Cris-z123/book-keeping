<template>
    <Layout class-prefix="layout">
        <NumberPad @update:value="onUpdateAmount" @submit="saveRecord"></NumberPad>
        <Types :value.sync="record.type"></Types>
        <Notes  field-name="备注"
                placeholder="在这里输入" 
                @update:value="onUpdateNotes"></Notes>
        <Tags></Tags>
    </Layout>
</template>

<script lang="ts">
    import Vue from 'vue';
    import NumberPad from '@/components/money/NumberPad.vue';
    import Types from '@/components/money/Types.vue';
    import Tags from '@/components/money/Tags.vue';
    import Notes from '@/components/money/Notes.vue';
    import {Component} from 'vue-property-decorator';
    import store from '@/store/index2.ts';

    // const version = window.localStorage.getItem('version') || '0';
    // if(version === '0.0.1') {
    //     // 数据库升级，数据迁移
    //     recordList.forEach(record => {
    //         record.createdAt = new Date(2020, 0, 1)
    //     });
    //     //保存数据
    //     window.localStorage.setItem('recordList', JSON.stringify(recordList));
    // }
    // window.localStorage.setItem('version', '0.0.2')
 

    @Component({
        components: {Notes, Types, NumberPad, Tags},
        computed: {
            recordList() {
                return store.recordList;
            }
        }
    })
    export default class Money extends Vue{
        record: RecordItem = {
            tags: [], notes: '', type: '-', amount: 0
        };

        onUpdateNotes(value: string) {
            this.record.notes = value;
        }
        onUpdateAmount(value: string) {
            this.record.amount = parseFloat(value);
        }
        saveRecord() {
            store.createRecord(this.record);
        }
    }
</script>

<style lang="scss">
.layout-content {
    display: flex;
    flex-direction: column-reverse;
}
</style>