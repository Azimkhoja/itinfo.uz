const {Schema, model} = require('mongoose')
const Category = require('./Category')
const Dictionary = require('./Dictionary')

const descriptionSchema = new Schema({
    dict_id: {
        type: Schema.Types.ObjectId,
        ref: "Dictionary",
    },
    category_id: {
        type: Schema.Types.ObjectId,
        ref: "Category",     
    },
    description: {
        type: String,
        required:true
    }
}, {versionKey: false}
)

module.exports = model("Description", descriptionSchema)
