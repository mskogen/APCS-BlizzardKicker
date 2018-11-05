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

const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

router.get('/', function (req, res) {
    var use = require('../models/DataCacheAPI.js')
    const DataCacheAPI = mongoose.model('DataCacheAPI');
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

    const callAPI = new XMLHttpRequest();
    const url='https://api.weatherunlocked.com/api/snowreport/333019?app_id=854428ed&app_key=b75b1bb6575f88dbf10b279301b0d7e4';
    callAPI.open("GET", url);
    callAPI.send();
    callAPI.onreadystatechange=function() {
      if(this.readyState==4 && this.status==200) {
        var data_object = JSON.parse(callAPI.responseText)

        var resortName = new DataCacheAPI( {resortname: data_object.resortname} );
        resortName.save()

        const newsnow_in = new DataCacheAPI( {newsnow_in: data_object.newsnow_in} );
        newsnow_in.save()
      }
    }
    res.render('status_API');
});

module.exports = router;
