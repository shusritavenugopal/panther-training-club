const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  customerName: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String }
}, { timestamps: true });

const TrainerSchema = new Schema({
  name: { type: String, required: true, maxlength: 500 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNo: { type: String, maxlength: 10, required: true },
  age: { type: Number, maxlength: 2, required: true },
  gender: { type: String, maxlength: 100, required: true },
  specializations: { type: String, required: true, maxlength: 255 },
  reviews: [ReviewSchema]
});

module.exports = mongoose.model("trainer", TrainerSchema);
