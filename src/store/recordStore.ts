import model from '@/models/model'

export default {
    recordList : model.fetch(),
    createRecord : (record: RecordItem) => model.create(record)
}