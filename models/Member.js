const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const memberSchema = new Schema({
  name: { type: String, required: true, maxlength: 500 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNo: { type: String, maxlength: 10, required: true },
  age: { type: Number, maxlength: 2, required: true },
  gender: { type: String, maxlength: 100, required: true },
  height: { type: Number, required: true },
  weight: { type: Number, required: true }
});

const Member = mongoose.model('Member', memberSchema);
module.exports = Member;
