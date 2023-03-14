const { Schema, model } = require("mongoose");

const dictioanrySchema = new Schema(
  {
    term: {
      type: String,
      required: [true, "term not entered!"],
      trim: true,
    },
    letter: {
      type: String,
      maxLength: 1,
      uppercase: true,
    },
  },
  { versionKey: false }
);

module.exports = model("Dictionary", dictioanrySchema);
