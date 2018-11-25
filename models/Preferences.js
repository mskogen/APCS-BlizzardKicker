// // Author: Kamiar Coffey
// // Purpose: backend structure for storing user Prefs in mongoDB
//
// const mongoose = require('mongoose');
//
// const userPrefsSchema = new mongoose.Schema({
//   resort_id_list: {
//     type: List<Number>,
//   },
//   skill_level : {
//     type: Number, // scale 1-10?
//   }
//   preferred_temperature: {
//     type: Number, // also a number.. calc as num degrees off from ideal
//   },
//   preferred_snowtype : {
//     type: String, // string must be from a set only. Could turn string into list of ints?
//   },
// });
//
// module.exports = mongoose.model('Preferences', userPrefsSchema);
