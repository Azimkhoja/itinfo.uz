const {Schema, model} = require('mongoose')

const mediaSchema = new Schema({
    media_name: {
        type: String,
        required: true,
    },
    media_file: {
        type: String,
        required:true,
    },
    target_table_name: {
        type: String,
    }

}, {versionKey:false})

module.exports = model("media", mediaSchema)