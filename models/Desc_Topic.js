const {Schema, model} = require('mongoose')

const desc_topic_schema = new Schema({
    desc_id :{
        type: Schema.Types.ObjectId,
        ref: "description",
        required:true
    },
    topic_id: {
        type: Schema.Types.ObjectId,
        ref: "topic",
        required: true
    }
}, {versionKey: false})

module.exports = model("desc_topic", desc_topic_schema)