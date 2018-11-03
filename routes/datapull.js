// Author: Kamiar Coffey
// Purpose: javscript code to pull from API and pass to mongoDB

const express = require('express');
const mongoose = require('mongoose');
const DataCacheAPI = mongose.model('DataCacheAPI'); // use DataCacheAPI database


// $.ajax({
//   url: "https://api.weatherunlocked.com/api/snowreport/{RESORT_ID}?app_id={APP_ID}&app_key={APP_KEY}",
//   type: "GET",
//   success: function (parsedResponse, statusText, jqXhr) {
//     console.log(parsedResponse);
//   },
//   error: function (error) {
//       console.log(error);
//   }
// });

// Val d'Isere resort key: 333019

var callAPI = new XMLHttpRequest();
var url = 'https://api.weatherunlocked.com/api/snowreport/333019?app_id=854428ed&app_key=b75b1bb6575f88dbf10b279301b0d7e4';
callAPI.open('GET', url, true);

callAPI.onload = function () {
  var data = JSON.parse(this.response);
  console.log(data['resortname']);
  console.log(data['newsnow_in']);
  };

callAPI.send();


// var Resort = mongose.model('DataCacheAPI', schema);
// var snowFall = new Resort()
