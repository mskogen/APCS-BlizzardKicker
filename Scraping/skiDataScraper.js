//Data Scraper to take info from onthesnow
const rp = require('request-promise');
const $ = require('cheerio');

const skiData = function(url) {
	return rp(url)
	.then(function(html) {
		//create a list of dates for snowfall
		var dateList= [];
		$('._report_content .time span', html).each(function(i, elem){
			dateList.push($(this).text());
		});

		//create a list of snowdepths
		var snowFallList=[];
		$('._report_content .predicted_snowfall .bluePill', html).each(function(i, elem){
			snowFallList.push($(this).text());
		});

		var skiInfo= {
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
			snowfall: {
				today: $('._report_content .today .bluePill', html).text(),
				
				historical: {

				},
				predicted: {
				},
			},
	  	};
	  	//loop through dates and add them to the historical data
		for (var i = 0; i < dateList.length-3; i++) {
			skiInfo.snowfall.historical[dateList[i]] =snowFallList[i];
		}
		//loop through dates and add the ones in the future
		for (var i = dateList.length-3; i < dateList.length; i++) {
			skiInfo.snowfall.predicted[dateList[i]] =snowFallList[i];
		}
		
		return skiInfo;
	})
	.catch(function(err) {
	  //handle error
	});
};


module.exports = skiData;