type RecordItem = {
    tags: Tag[];
    notes: string;
    type: string;
    amount: number;
    createdAt?: string;
}

type RootState = {
    recordList: RecordItem[];
    createRecordError: Error | null;
    createTagError: Error | null;
    tagList: Tag[];
    currentTag?: Tag;
}

type Tag = {
    id: string;
    name: string;
}
type TagListModel = {
    data: Tag[];
    fetch: () => Tag[];
    create: (name: string) => 'success' | 'duplicated'; //联合类型
    update: (id: string, name: string) => 'success' | 'duplicated' | 'not found';
    remove: (id: string) => boolean;
    save: () => void; 
}
