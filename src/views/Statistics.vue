<template>
        <Layout>
            <Tabs class-Prefix="type" :data-source="recordTypeList" :value.sync="type"></Tabs>
            <div class="chart-wrapper" ref="chartWrapper">
                <line-chart class="chart" :options="chartOptions"></line-chart>
            </div>
                <ol v-if="groupedList.length>0">
                    <li v-for="(group,index) in groupedList" :key="index">
                        <h3 class="title">{{beautify(group.title)}}<span>总计: ￥{{group.total}}</span></h3>
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
                <div v-else class="noResult">
                    目前没有相关记录
                </div>
        </Layout>
</template>

<script lang="ts">
    import Vue from 'vue'
    import { Component } from 'vue-property-decorator';
    import Tabs from '@/components/Tabs.vue';
    import LineChart from '@/components/Chart.vue';
    import recordTypeList from '@/constants/recordTypeList'
    import dayjs from 'dayjs'
    import clone from '@/lib/clone';
    import _ from 'lodash';

    @Component({
        components: {Tabs, LineChart}
    })
    export default class Statistics extends Vue{
        type = '-';
        interval = 'day';
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
            return tags.length === 0 ? '无' : tags.map(t => t.name).join(',');
        }

        get recordList() {
            return (this.$store.state as RootState).recordList;
        }
        get groupedList() {
            type Result = {
                title: string;
                total?: number;
                items: RecordItem[];
            }[]
            const {recordList} = this;
            const newList = clone(recordList).filter(r => r.type === this.type).sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
            
            if(newList.length === 0) { return []; }
            const result: Result = [{title: dayjs(newList[0].createdAt).format('YYYY-MM-DD'), items: [newList[0]]}];
            for(let i=1; i<newList.length; i++) {
                const current = newList[i];
                const last = result[result.length - 1];
                if(dayjs(last.title).isSame(dayjs(current.createdAt), 'day')) {
                    last.items.push(current);
                } else {
                    result.push({title: dayjs(current.createdAt).format('YYYY-MM-DD'), items: [current]});
                }
            }
            result.map(group => {
                group.total = group.items.reduce((sum, item) => sum + item.amount, 0);
            })
            return result;
        }
        get keyValueList() {
            const today = new Date();
            const array = [];
            for(let i=0; i<=29; i++) {
                const dateString = dayjs(today).subtract(i, 'day').format('YYYY-MM-DD');
                const found = _.find(this.groupedList, {title: dateString});
                array.push({
                    key: dateString,
                    value: found ? found.total : 0
                });
            }
            array.sort((a, b) => {
                if(a.key > b.key) {
                    return 1;
                }else if(a.key === b.key) {
                    return 0;
                }else {
                    return -1;
                }
            });
            return array;
        }
        get chartOptions() {
            const keys = this.keyValueList.map(item => item.key);
            const values = this.keyValueList.map(item => item.value);
            return {
                backgroundColor: '#ffffff',
                title: {
                    text: '近一个月的账目',
                    x: 'right',
                    y: 'bottom',
                    textStyle: {
                        fontSize: 18,
                        fontWeight: 'none',
                        color: '#999999'
                    }
                },
                grid: {
                    left: 0,
                    right: 0
                },
                xAxis: {
                    type: 'category',
                    data: keys,
                    axisTick: {
                        alignWithLabel: true
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#666'
                        }
                    }
                },
                yAxis: {
                    type: 'value',
                    show: false
                },
                series: [{
                    symbol: 'circle',
                    symbolSize: 12,
                    itemStyle: {
                        borderWidth: 1,
                        color: '#ccccff',
                        borderColor: '#666'
                    },
                    data: values,
                    type: 'line'
                }],
                tooltip: {
                    show: true,
                    triggerOn: 'click',
                    position: 'top',
                    formatter: '{c}',
                    backgroundColor: 'rgba(153, 204, 255, .6)'
                }
            }
        }
        mounted() {
            const div = (this.$refs.chartWrapper as HTMLDivElement);
            div.scrollLeft = div.scrollWidth;
        }
        beforeCreate() {
            this.$store.commit('fetchRecords')
        }
    }
</script>

<style lang="scss" scoped>
.noResult {
    padding: 16px;
    text-align: center;
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
.echarts {
    max-width: 100%;
    height: 400px;
}
.chart {
    width: 430%;
    &-wrapper {
        overflow: auto;
    }
}
</style>