const {Schema, model, SchemaTypes} = require('mongoose')

const tagSchema = new Schema({
    topic_id: {
        type: SchemaTypes.ObjectId,
        ref: "topic",
        required: true
    },
    category_id: {
        type: SchemaTypes.ObjectId,
        ref: "category",
        required: true,
    }
}, {versionKey: false})

module.exports = model("Tag", tagSchema)