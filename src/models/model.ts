import clone from '@/lib/clone';

//record list
const localStorageKeyName = 'recordList';

const model = {
    data: [] as RecordItem[],
    create(record: RecordItem) {
        const record2 = clone(record); //deepClone(将record的复制保存到list)
        record2.createdAt = new Date();
        this.data.push(record2);
    },
    fetch() {
        this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
        return this.data;
    },
    save() {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
    }
};


export default model;