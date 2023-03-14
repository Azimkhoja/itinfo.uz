const {Schema, model} = require('mongoose')

const auth_socialSchema = new Schema({
    author_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "author"
    },
    social_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "social",
    },
    social_link: {
        type: String,
        required:true,
        unique:true,
    }
}, {versionKey: false})

module.exports = model("Author_Social", auth_socialSchema)