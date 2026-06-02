const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  age: { type: String, required: true, trim: true },
  gender: { type: String, required: true, trim: true },
  contactNumber: { type: String, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  type: {
    type: String,
    enum: ['admin', 'editor', 'viewer'],
    default: 'editor',
  },
  username: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  address: { type: String, trim: true },
  isActive: { type: Boolean, default: true },
});

module.exports =
  mongoose.models.User ||
  mongoose.model('User', userSchema);