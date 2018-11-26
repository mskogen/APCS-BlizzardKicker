// Author: Kamiar Coffey
// Purpose: backend structure for storing API data in mongoDB

const mongoose = require('mongoose');

const dataCacheSchema = new mongoose.Schema({
// Do NOT store the entire JSON object
  _id: Number, // _id is a pre-defined Mongo field that MUST be a unque key.
  // Type cast it as a number rather than defaut BSON
  time_stamp: {
    type: Date,
  },
  resort_id: {
    type: Number,
  },
  resort_name: {
    type: String,
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

module.exports = mongoose.model('DataCacheAPI', dataCacheSchema);
