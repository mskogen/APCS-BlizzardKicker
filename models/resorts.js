// Author: Kamiar Coffey
// Purpose: backend structure for storing API data in mongoDB

const mongoose = require('mongoose');
const skiData= require('../Scraping/skiDataScraper.js')

const resortInfo = new mongoose.Schema({
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
  url: String,
  pass: [String],
  image: String,
},{timestamps: true});

resortInfo.statics.loadStartData = function(){
  Res.countDocuments({}, function(err, count){
    var skiInfo=[ //steamboat scraping is not working
      {resort_name: "Eldora Mountain Resort", url: "/colorado/eldora-mountain-resort/", pass: ["Ikon"]},
      //{resort_name: "Steamboat", url: "/colorado/steamboat/", pass: ["Ikon"]},
      {resort_name: "Copper Mountain Resort", url: "/colorado/copper-mountain-resort/", pass: ["Ikon"]},
      {resort_name: "Aspen / Snowmass", url: "/colorado/aspen-snowmass/", pass: ["Ikon"]},
      {resort_name: "Winter Park Resort", url: "/colorado/winter-park-resort/", pass: ["Ikon"]},
      {resort_name: "Vail", url: "/colorado/vail/", pass: ["Epic"]},
      {resort_name: "Breckenridge", url: "/colorado/breckenridge/", pass: ["Epic"]},
      {resort_name: "Telluride", url: "/colorado/telluride/", pass: ["Epic"]},
      {resort_name: "Arapahoe Basin Ski Area", url: "/colorado/arapahoe-basin-ski-area/", pass: ["Epic"]},
      {resort_name: "Crested Butte Mountain Resort", url: "/colorado/crested-butte-mountain-resort/", pass: ["Epic"]},
      {resort_name: "Beaver Creek", url: "/colorado/beaver-creek/", pass: ["Epic"]},
      {resort_name: "Keystone", url: "/colorado/keystone/", pass: ["Epic"]},
      {resort_name: "Monarch Mountain", url: "/colorado/monarch-mountain/", pass: []},
      {resort_name: "Purgatory", url: "/colorado/durango-mountain-resort/", pass: []},
      {resort_name: "Loveland", url: "/colorado/loveland/", pass: []},
      {resort_name: "Howelsen Hill", url: "/colorado/howelsen-hill/", pass: []},
      {resort_name: "Sunlight Mountain Resort", url: "/colorado/sunlight-mountain-resort/", pass: []},
      {resort_name: "Echo Mountain", url: "/colorado/echo-mountain/", pass: []},
      {resort_name: "Powderhorn", url: "/colorado/powderhorn/", pass: []},
      {resort_name: "Ski Granby Ranch", url: "/colorado/ski-granby-ranch/", pass: []},
      {resort_name: "Silverton Mountain", url: "/colorado/silverton-mountain/", pass: []},
      {resort_name: "Wolf Creek Ski Area", url: "/colorado/wolf-creek-ski-area/", pass: []},
      {resort_name: "Cooper", url: "/colorado/ski-cooper/", pass: []}
    ]
    if (count!=skiInfo.length) {
      Res.collection.drop();
      Res.insertMany(skiInfo);
    }
  });
}

//pull skiData using scraper takes /$REGION/$RESORT/ url
//returns promise
resortInfo.methods.pullSkiInfo = function(){
  return skiData('https://www.onthesnow.com'+ this.url +'skireport.html')
  .then(function(skiInfo){
    var skiData = {
      resort_name: skiInfo.resort,
      condition: skiInfo.condition,
      snowfall: skiInfo.snowfall,
      runs: skiInfo.runs,
      lifts: skiInfo.lifts,
    }
    //console.log(skiData);
    return skiData;
  }).catch((err)=>{
    return err;
  });
}

/*
desc: the resort if it hasn't been within a given time
params: 
  String resort_name - name of a resort, 
  [Number time - minutes since last update. Default: 30]
ret: Promise 
  - Resolve: String mess - message to console,
  - Reject: String err - error message
*/
resortInfo.statics.updateResort = function(resort_name, time){
  if(!time) time=30;
  //find the resort
  return Res.findOne({resort_name: resort_name}).exec()
  .then(function(resort){
    //is it real?
    if(resort){
      var updateTime = time; //number of minutes until next update
      //update if it's been long enough or it doesn't have conditions
      if((Date.now()-resort.updatedAt)/60000 >= updateTime || (Object.keys(resort.condition.upper).length === 0 && resort.condition.upper.constructor === Object)){
        //pull the info and return skiInfo promise
        return resort.pullSkiInfo();
      }else{
        return Promise.reject(resort_name + " is already up to date");
      }
    }else{
      return Promise.reject('resort: "' + resort_name + '" does not exist ');
    }
  })
  //this is thening pullSkiInfo()
  .then(function(skiData){
    //update using skiData
    return Res.updateOne({resort_name: skiData.resort_name}, skiData).exec()
  })
  .then(function(dat){
    var message = resort_name + " updated";
    //console.log(message);
    return message;
  })
  .catch(function(err){
    return err;
  });
}



var Res = mongoose.model('resorts', resortInfo);
module.exports = Res;








