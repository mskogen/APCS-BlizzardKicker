const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
  },
  pass: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model('Registration', registrationSchema);