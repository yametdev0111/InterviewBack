const mongoose = require("mongoose")

const adSchema = new mongoose.Schema({
  business: String,
  influencer: {
    type: String,
    default: ""
  },
  accepted: Boolean,
  budget: Number,
  message: String,
  website: String,
  redirect: String,
  clicks: Number,
  visits: {
    type: Array,
    default: []
  }
}, { timestamps: true })

const Ad = mongoose.model('ad', adSchema);

module.exports = Ad;