const mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1 = require("uuid/v1");

var authorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    hashed_password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    salt: String,
    books: {
      type: Array,
      default: [],
    },
    likedBooks: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

authorSchema
  .virtual("password")
  .set((password) => {
    this._password = password;
    this.salt = uuidv1();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(() => {
    return this._password;
  });

authorSchema.methods = {
  authenticate: (password) => {
    return this.encryptPassword(password) === this.hashed_password;
  },
  encryptPassword: (password) => {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
};

module.exports = mongoose.model("Author", authorSchema);
