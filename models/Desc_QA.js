const {Schema, model} = require('mongoose')

const Desc_QASchema = new Schema({
    QA_id: {
        type: Schema.Types.ObjectId,
        required:true,
        ref: "question_answer",
    },
    desc_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "description"
    }
},{versionKey: false})

module.exports = model("desc_QA", Desc_QASchema)