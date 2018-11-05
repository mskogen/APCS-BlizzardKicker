// Author: Kamiar Coffey
// Purpose: backend structure for storing API data in mongoDB

const mongoose = require('mongoose');

const dataCacheSchema = new mongoose.Schema({
  resortid: {
    type: Number,
  },
  resortname: {
    type: String,
  },
  resortcountry: {
    type: String,
  },
  newsnow_cm: {
    type: Number,
  },
  newsnow_in: {
    type: Number,
  },
});

module.exports = mongoose.model('DataCacheAPI', dataCacheSchema);
