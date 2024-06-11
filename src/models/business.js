const mongoose = require("mongoose");

const businessSchema = new mongoose.Schema(
  {
    name: String,
    username: {
      type: String,
      require: true,
      unique: true,
    },
    address: String,
    phone: String,
    email: String,
    ip: String,
  },
  { timestamps: true }
);

const Business = mongoose.model("business", businessSchema);

module.exports = Business;
