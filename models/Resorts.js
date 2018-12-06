// Author: Kamiar Coffey
// Purpose: backend structure for storing API data in mongoDB

const mongoose = require('mongoose');

const dataCacheSchema = new mongoose.Schema({
  time_stamp: {
    type: Date,
  },
  resort_name: {
    type: String,
  },
  condition: {
    upper: {
      snow: Number,
      condition: String,
    },
    middle: {
      snow: Number,
      condition: String,
    },
    lower: {
      snow: Number,
      condition: String,
    }
  },
  //snowfall is arrays of date snowfall pairs [date, snowfall]
  snowfall: {
    today: Number,
    historical: [[mongoose.Mixed]],
    predicted: [[mongoose.Mixed]],
  },
  runs:{
    open: Number,
    total: Number,
  },
  lifts:{
    open: Number,
    total: Number,
  },
});

var Res = mongoose.model('Resorts', dataCacheSchema);
module.exports = Res;