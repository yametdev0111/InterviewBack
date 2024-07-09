const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const questionSchema = new mongoose.Schema(
  {
    id: { type: Number, default: 0 },
    category: String,
    question: String,
    answer: String,
    views: {
      type: Number,
      default: 0,
    },
    votes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

questionSchema.plugin(AutoIncrement, { inc_field: 'id' });

const Question = mongoose.model("question", questionSchema);

module.exports = Question;
