// Author: Kamiar Coffey
// Purpose: backend structure for storing API data in mongoDB

const mongoose = require('mongoose');

const resortInfo = new mongoose.Schema({
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
  link: String,
  pass: [String],
});

resortInfo.statics.loadStartData = function(){
  Res.countDocuments({}, function(err, count){
    var skiInfo=[
      {resort_name: "Steamboat", link: "/colorado/steamboat/", pass: ["Ikon"]},
      {resort_name: "Wolf Creek Ski Area", link: "/colorado/wolf-creek-ski-area/", pass: []},
      {resort_name: "Cooper", link: "/colorado/ski-cooper/", pass: []},
      {resort_name: "Vail", link: "/colorado/vail/", pass: ["Epic"]},
      {resort_name: "Aspen / Snowmass", link: "/colorado/aspen-snowmass/", pass: ["Ikon"]},
      {resort_name: "Breckenridge", link: "/colorado/breckenridge/", pass: ["Epic"]},
      {resort_name: "Telluride", link: "/colorado/telluride/", pass: ["Epic"]},
      {resort_name: "Winter Park Resort", link: "/colorado/winter-park-resort/", pass: ["Ikon"]},
      {resort_name: "Arapahoe Basin Ski Area", link: "/colorado/arapahoe-basin-ski-area/", pass: ["Epic"]},
      {resort_name: "Loveland", link: "/colorado/loveland/", pass: []},
      {resort_name: "Crested Butte Mountain Resort", link: "/colorado/crested-butte-mountain-resort/", pass: ["Epic"]},
      {resort_name: "Monarch Mountain", link: "/colorado/monarch-mountain/", pass: []},
      {resort_name: "Purgatory", link: "/colorado/durango-mountain-resort/", pass: []},
      {resort_name: "Beaver Creek", link: "/colorado/beaver-creek/", pass: ["Epic"]},
      {resort_name: "Copper Mountain Resort", link: "/colorado/copper-mountain-resort/", pass: ["Ikon"]},
      {resort_name: "Keystone", link: "/colorado/keystone/", pass: ["Epic"]},
      {resort_name: "Eldora Mountain Resort", link: "/colorado/eldora-mountain-resort/", pass: ["Ikon"]},
      {resort_name: "Howelsen Hill", link: "/colorado/howelsen-hill/", pass: []},
      {resort_name: "Sunlight Mountain Resort", link: "/colorado/sunlight-mountain-resort/", pass: []},
      {resort_name: "Echo Mountain", link: "/colorado/echo-mountain/", pass: []},
      {resort_name: "Powderhorn", link: "/colorado/powderhorn/", pass: []},
      {resort_name: "Ski Granby Ranch", link: "/colorado/ski-granby-ranch/", pass: []},
      {resort_name: "Silverton Mountain", link: "/colorado/silverton-mountain/", pass: []},
    ]
    if (count<skiInfo.length) {
      Res.insertMany(skiInfo);
    }
  });
}

var Res = mongoose.model('resorts', resortInfo);
module.exports = Res;