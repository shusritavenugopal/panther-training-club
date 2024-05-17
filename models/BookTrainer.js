const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookTrainerSchema = new Schema({
  memberId: { type: Schema.Types.ObjectId, ref: 'Member', required: true },
  trainerId: { type: Schema.Types.ObjectId, ref: 'Trainer'},
  goal: { type: String, required: true },
  preferredWorkout: { type: String, required: true },
  foodPreferences: { type: String, enum: ['vegan', 'non-vegetarian', 'eggetarian'], required: true },
  medicalHistory: { type: String },
  additionalMessage: { type: String }
});

const BookTrainer = mongoose.model('BookTrainer', bookTrainerSchema);
module.exports = BookTrainer;
