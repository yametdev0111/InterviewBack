const mongoose = require("mongoose");

const influencerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      unique: true,
    },
    following: Number,
    address: String,
    phone: String,
    email: String,
    ip: String,
    specialty: Array,
  },
  { timestamps: true }
);

const Influencer = mongoose.model("influencer", influencerSchema);

module.exports = Influencer;
