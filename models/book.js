const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

var bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    likes: {
      type: Set,
      default: [],
    },
    author: {
      type: ObjectId,
      ref: "Author",
      required: true,
    },
  },
  { timeStamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
