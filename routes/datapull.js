// Author: Kamiar Coffey
// Purpose: javscript code to pull from API and pass to mongoDB
// Weather unlocked does not allow US ski resort data on free version
// username: APCS pw: blizzardkicker email: kamiar.junk@gmail.com
// https://developer.weatherunlocked.com/ user: APCS_Master pw: blizzardkicker email: kamiar.junk@gmail.com
// App name: APCS's App
// App ID: 854428ed
// Key: ea41306d613ed7bbcfcbb8ece0c62b06
// Key2: b75b1bb6575f88dbf10b279301b0d7e4
// Val d'Isere resort key: 333019
// api.weatherunlocked.com/api/snowreport/999001?app_id={APP_ID}&app_key={APP_KEY}
// api/snowreport/{resort_id}?app_id={854428ed}&app_key={ea41306d613ed7bbcfcbb8ece0c62b06}
// api.weatherunlocked.com/api/snowreport/999001?app_id={854428ed}&app_key={ea41306d613ed7bbcfcbb8ece0c62b06}

// Collections
// MongoDB stores documents in collections. Collections are analogous to tables in relational databases.

// http://clientservice.onthesnow.com/externalservice/resort/[resort_id]/snowreport?token=[token]
// where [resort_id] indicates the particular resort requested and [token] is the authorization token unique to your account.

const express = require('express'); // use express routing
const mongoose = require('mongoose'); // use mongo database
const router = express.Router();

router.get('/', function (req, res) { // upp data upon get request
    var use = require('../models/DataCacheAPI.js') // route to mongoDB schema
    const DataCacheAPI = mongoose.model('DataCacheAPI'); // use DataCacheAPI schema
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest; // include API request pulls

    const callAPI = new XMLHttpRequest();
    const url='https://api.weatherunlocked.com/api/snowreport/333019?app_id=854428ed&app_key=b75b1bb6575f88dbf10b279301b0d7e4';
    callAPI.open("GET", url);
    callAPI.send();

    callAPI.onreadystatechange=function() {
      if(this.readyState==4 && this.status==200) {
        var data_object = JSON.parse(callAPI.responseText)

        var resort = new DataCacheAPI( {_id: data_object.resortid, resortname: data_object.resortname, newsnow_in: data_object.newsnow_in});
        resort.save()

      }
    }

    // callAPI.onreadystatechange=function() { // execute when the API returns
    //   if(this.readyState==4 && this.status==200) {
    //     var data_object = JSON.parse(callAPI.responseText) // turn the JSON response into an object
    //
    //     // Method works via Mongodb unique key resolution
    //     // manually make the uniqye key _id the resort ID, rather than mongoDB generated code
    //     // adding a 'new' resort with the same key overwrites the previous object
    //     var current_time = new Date()
    //     var resort = new DataCacheAPI( {_id: data_object.resortid,
    //                                     time_stamp: current_time,
    //                                     resort_name: data_object.resortname,
    //                                     newsnow_in: data_object.newsnow_in,
    //                                     // percent_terrain_open: data_object.ADDME,
    //                                     // current_temperature: data_object.ADDME,
    //                                     // snow_conition: data_object.ADDME,
    //                                     // num_expert_runs: data_object.ADDME,
    //                                     // num_intermediate_runs: data_object.ADDME,
    //                                     // num_beginner_runs: data_object.ADDME,
    //                                     // new_snow_24h: data_object.ADDME,
    //                                     // new_snow_48h: data_object.ADDME,
    //                                     // new_snow_72h: data_object.ADDME,
    //                                     // new_snow_24h: data_object.ADDME,
    //                                     // snow_conition: data_object.ADDME,})
    //     resort.save()
    //   }
    // }
    res.render('status_API');
});

module.exports = router;
