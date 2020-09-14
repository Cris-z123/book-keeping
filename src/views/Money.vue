<template>
    <Layout class-prefix="layout">
        <NumberPad :value.sync="record.amount" @submit="saveRecord"></NumberPad>
        <Tabs :data-source="recordTypeList" :value.sync="record.type"></Tabs>
        <Notes  field-name="备注"
                placeholder="在这里输入" 
                @update:value="onUpdateNotes"></Notes>
        <Tags></Tags>
    </Layout>
</template>

<script lang="ts">
    import Vue from 'vue';
    import NumberPad from '@/components/money/NumberPad.vue';
    import Tags from '@/components/money/Tags.vue';
    import Notes from '@/components/money/Notes.vue';
    import Tabs from '@/components/Tabs.vue';
    import {Component} from 'vue-property-decorator';
    import recordTypeList from '@/constants/recordTypeList';

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
        components: {Notes, Tabs, NumberPad, Tags}
    })
    export default class Money extends Vue{
        get recordList() {
            return this.$store.state.recordList;
        }

        recordTypeList = recordTypeList;

        record: RecordItem = {
            tags: [], notes: '', type: '-', amount: 0
        };
        
        created() {
            this.$store.commit('fetchRecords');
        }
        onUpdateNotes(value: string) {
            this.record.notes = value;
        }
        saveRecord() {
            this.$store.commit('createRecord', this.record);
        }
    }
</script>

<style lang="scss">
.layout-content {
    display: flex;
    flex-direction: column-reverse;
}
</style>