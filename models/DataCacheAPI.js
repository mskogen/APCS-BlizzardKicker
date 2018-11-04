// Author: Kamiar Coffey
// Purpose: backend structure for storing API data in mongoDB


const mongoose = require('mongoose');

const dataCacheSchema = new mongoose.Schema({
  snowDepth: {
    type: Number,
    trim: true,
  },
  currentTemp: { // Farenheit
    type: Number,
    trim: true,
  },
});

module.exports = mongoose.model('DataCacheAPI', dataCacheSchema);
