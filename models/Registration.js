// Database schema for user data
// combine usernames and preferences into single schema for ease
// option to separate out later

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
  // resort_id_list: { // keep as list for now - can always return string name
  //   type: [Number],
  // },
  skill_level: {
    type: Number, // scale 1-10?
  },
  preferred_temperature: {
    type: Number, // also a number.. calc as num degrees off from ideal
  },
  preferred_snowtype: {
    type: String, // string must be from a set only. Could turn string into list of ints?
  },
});

module.exports = mongoose.model('Registration', registrationSchema);
