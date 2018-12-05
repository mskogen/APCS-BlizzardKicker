//Data Scraper to take info from onthesnow
const rp = require('request-promise');
const $ = require('cheerio');
const mongoose = require('mongoose'); // use mongo database
var Resort = require('../models/Resorts.js') // route to mongoDB schema

const skiData = function(url) {
	return rp(url)
	.then(function(html) {
		//create a list of dates for snowfall
		var dateList= [];
		//get every date and push it to the list
		$('._report_content .time span', html).each(function(i, elem){
			dateList.push([$(elem).text()]);
		});
		//get every snowfall and add it to it's date pair
		$('._report_content .predicted_snowfall .bluePill', html).each(function(i, elem){
			dateList[i].push($(elem).text());
		});
		//skiInfo is the object containing all the ski info
		var skiInfo= {
			//get resort using all the words in the title except the last 4
			resort: $('title', html).text().split(" ",$('title', html).text().split(" ").length-4).join(" "),

			condition:{
				upper: {
					snow: $('.elevation.upper > .bluePill', html).text(),
					condition: $('.elevation.upper strong', html).text(),
				},
				middle: {
					snow: $('.elevation.middle > .bluePill', html).text(),
					condition: null,
				},
				lower: {
					snow: $('.elevation.lower > .bluePill', html).text(),
					condition: $('.elevation.lower strong', html).text(),
				},
			},
			//historical and predicted are added using dateList
			snowfall: {
				today: $('._report_content .today .bluePill', html).text(),

				historical: {
				},
				predicted: {
				},
			},
	  	};
	  	//seperates the last 3 from the group because they're historical
		skiInfo.snowfall.historical=dateList.slice(0,dateList.length-3);
		skiInfo.snowfall.predicted=dateList.slice(-3);
		var resort = new Resort (
			{
				_id: 1,
				resort_name: skiInfo.resort,
				time_stamp: new Date(),
				// newsnow_in: skiInfo.snowfall.today.historical,
				snow_conition: skiInfo.condition.upper.condition
			}
		);
		resort.save()
		console.log(resort);
		return skiInfo;
	})
	.catch(function(err) {
	  //handle error
	});
};


module.exports = skiData;
