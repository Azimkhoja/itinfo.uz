const {Schema, model} = require('mongoose')

const question_answerSchema = new Schema({
    question: {
        type:String,
    },
    answer: {
        type: String,
    },
    is_checked: {
        type: Boolean,
        required: true,

    },
    expert_id: {
        type: Schema.Types.ObjectId,
        ref: "author",
        required: true,   
    }

}, {versionKey: false, timestamps: true})
    
module.exports = model("question_answer", question_answerSchema)