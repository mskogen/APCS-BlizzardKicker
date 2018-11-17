//Data Scraper to take info from onthesnow
const rp = require('request-promise');
const url = 'https://www.onthesnow.com/colorado/vail/skireport.html';
const $ = require('cheerio');

const skiData = function(url) {
	return rp(url)
	.then(function(html) {
		return {
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
				/*
				historical: 
					{
						$('._report_content .time span', html)[0].text(): $('._report_content .time .bluePill', html)[0].text(),
					}
				*/
			},
	  };
	})
	.catch(function(err) {
	  //handle error
	});
};

module.exports = skiData;