// Author: Asher Farr
// Purpose: store info for ski resorts

const mongoose = require('mongoose');

const resortInfo = new mongoose.Schema({
  name: String,
  link: String,
  pass: [String],
});


resortInfo.statics.loadStartData = function(){
  Info.countDocuments({}, function(err, count){
    var skiInfo=[
      {name: "Steamboat", link: "/colorado/steamboat/", pass: ["Ikon"]},
      {name: "Wolf Creek Ski Area", link: "/colorado/wolf-creek-ski-area/", pass: []},
      {name: "Cooper", link: "/colorado/ski-cooper/", pass: []},
      {name: "Vail", link: "/colorado/vail/", pass: ["Epic"]},
      {name: "Aspen / Snowmass", link: "/colorado/aspen-snowmass/", pass: ["Ikon"]},
      {name: "Breckenridge", link: "/colorado/breckenridge/", pass: ["Epic"]},
      {name: "Telluride", link: "/colorado/telluride/", pass: ["Epic"]},
      {name: "Winter Park Resort", link: "/colorado/winter-park-resort/", pass: ["Ikon"]},
      {name: "Arapahoe Basin Ski Area", link: "/colorado/arapahoe-basin-ski-area/", pass: ["Epic"]},
      {name: "Loveland", link: "/colorado/loveland/", pass: []},
      {name: "Crested Butte Mountain Resort", link: "/colorado/crested-butte-mountain-resort/", pass: ["Epic"]},
      {name: "Monarch Mountain", link: "/colorado/monarch-mountain/", pass: []},
      {name: "Purgatory", link: "/colorado/durango-mountain-resort/", pass: []},
      {name: "Beaver Creek", link: "/colorado/beaver-creek/", pass: ["Epic"]},
      {name: "Copper Mountain Resort", link: "/colorado/copper-mountain-resort/", pass: ["Ikon"]},
      {name: "Keystone", link: "/colorado/keystone/", pass: ["Epic"]},
      {name: "Eldora Mountain Resort", link: "/colorado/eldora-mountain-resort/", pass: ["Ikon"]},
      {name: "Howelsen Hill", link: "/colorado/howelsen-hill/", pass: []},
      {name: "Sunlight Mountain Resort", link: "/colorado/sunlight-mountain-resort/", pass: []},
      {name: "Echo Mountain", link: "/colorado/echo-mountain/", pass: []},
      {name: "Powderhorn", link: "/colorado/powderhorn/", pass: []},
      {name: "Ski Granby Ranch", link: "/colorado/ski-granby-ranch/", pass: []},
      {name: "Silverton Mountain", link: "/colorado/silverton-mountain/", pass: []},
    ]
    if (count==0) {
      Info.insertMany(skiInfo);
    }
  });
}

var Info = mongoose.model('resortInfo', resortInfo);

module.exports = Info;
