const {Schema, model, SchemaTypes} = require('mongoose')

const topicSchema = new Schema({
    author_id:{
        type: SchemaTypes.ObjectId,
        required:true,
        ref: "author"
    },
    topic_title: {
        type: String,
        unique: true
    },
    topic_text: {
        type: String,
        required: true,
    },
    is_checked: {
        type: Boolean,
        required:true
    },
    is_approved: {
        type: Boolean,
    },
    expert_id: {
        type: SchemaTypes.ObjectId,
        ref: "author",
        required:true,
    }
}, {versionKey: false, timestamps: true})

module.exports = model("Topic", topicSchema)