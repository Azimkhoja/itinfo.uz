const {Schema, model} = require('mongoose')

const socialSchema = new Schema({
    social_name: {
        type: String,
        required: true,
    },
     social_icon_file: {
        type: String,
        required: true,
     }
}, {versionKey: false})

module.exports = model("Social", socialSchema)