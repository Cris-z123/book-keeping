<template>
        <Layout>
            <Tabs class-Prefix="type" :data-source="recordTypeList" :value.sync="type"></Tabs>
            <Tabs class-Prefix="interval" :data-source="intervalList" :value.sync="interval"></Tabs>
            <div>
                <ol>
                    <li v-for="group in result" :key="group.title">
                        <h3 class="title">{{beautify(group.title)}}</h3>
                        <ol>
                            <li v-for="item in group.items" :key="item.id"
                                class="record">
                                <span>{{tagString(item.tags)}}</span>
                                <span class="notes">{{item.notes}}</span>
                                <span>￥{{item.amount}}</span>
                            </li>
                        </ol>
                    </li>
                </ol>
            </div>
        </Layout>
</template>

<script lang="ts">
    import Vue from 'vue'
    import { Component } from 'vue-property-decorator';
    import Tabs from '@/components/Tabs.vue';
    import intervalList from '@/constants/intervalList'
    import recordTypeList from '@/constants/recordTypeList'
    import dayjs from 'dayjs'
import clone from '@/lib/clone';

    @Component({
        components: {Tabs}
    })
    export default class Statistics extends Vue{
        type = '-';
        interval = 'day';
        intervalList = intervalList;
        recordTypeList = recordTypeList;

        beautify(string: string) {
            const day = dayjs(string);
            const now = dayjs();
            if(day.isSame(now, 'day')) {
                return '今天'
            } else if (day.isSame(now.subtract(1, 'day'), 'day')) {
                return '昨天'
            } else if (day.isSame(now.subtract(2, 'day'), 'day')) {
                return '前天'
            } else if (day.isSame(now, 'year')) {
                return day.format('M月D日')
            } else {
                return day.format('YYYY年M月D日')
            }
        }

        tagString(tags: Tag[]) {
            return tags.length === 0 ? '无' : tags.join(',');
        }

        get recordList() {
            return (this.$store.state as RootState).recordList;
        }
        get result() {
            const {recordList} = this;
            type HashTableValue = {title: string; items: RecordItem[] }

            // const hashTable: {[key: string]: HashTableValue } = {};
            // for(let i=0; i<recordList.length; i++) {
            //     // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            //     const [date] = recordList[i].createdAt!.split('T');
            //     hashTable[date] = hashTable[date] || {title: date, items: []};
            //     hashTable[date].items.push(recordList[i]);
            // }
            // return hashTable
            const newList = clone(recordList).sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf())
            return []
        }
        beforeCreate() {
            this.$store.commit('fetchRecords')
        }
    }
</script>

<style lang="scss" scoped>
::v-deep .type-tabs-item{
    background: yellow;
    &.selected {
        background: black;
    }
}
::v-deep .interval-tabs-item {
    height: 10px;
    border: 1px solid red;
}
%item {
    padding: 8px 16px;
    line-height: 24px;
    display: flex;
    justify-content: space-between;
    align-content: center;
}
.title {
    @extend %item;
}
.record {
    background: white;
    @extend %item;
}
.notes {
    margin-right: auto;
    margin-left: 16px;
    color: #999999;
}
</style>