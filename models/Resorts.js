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
      snow: String,
      condition: String,
    },
    middle: {
      snow: String,
      condition: String,
    },
    lower: {
      snow: String,
      condition: String,
    }
  },
  newsnow_in: {
    type: Number,
  },
  percent_terrain_open: {
    type: Number,
  },
  current_temperature: {
    type: Number,
  },
  snow_conition: {
    type: String,
  },
  num_expert_runs: {
    type: Number,
  },
  num_intermediate_runs: {
    type: Number,
  },
  num_beginner_runs: {
    type: Number,
  },
  new_snow_24h: {
    type: Number,
  },
  new_snow_48h: {
    type: Number,
  },
  new_snow_72h: {
    type: Number,
  },
  snow_condition: {
    type: String,
  },
});

var Res = mongoose.model('Resorts', dataCacheSchema);
module.exports = Res;
