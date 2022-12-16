const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

var bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    likes: {
      type: Array,
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

bookSchema.set("toObject", { virtuals: true });
bookSchema.set("toJSON", { virtuals: true });

bookSchema.virtual("numberOfLikes").get(function () {
  return this.likes.length;
});

module.exports = mongoose.model("Book", bookSchema);
