//Data Scraper to take info from onthesnow
const rp = require('request-promise');
const $ = require('cheerio');

const skiData = function(url) {
  return rp(url)
  .then(function(html) {
    var skiInfo= {
      resort: $('title', html).text().split(" ",$('title', html).text().split(" ").length-4).join(" "),

      condition:{
        upper: {
          snow: eval($('.elevation.upper > .bluePill', html).text().split('"')[0]),
          condition: $('.elevation.upper strong', html).text(),
        },
        middle: {
          snow: eval($('.elevation.middle > .bluePill', html).text().split('"')[0]),
          condition: null,
        },
        lower: {
          snow: eval($('.elevation.lower > .bluePill', html).text().split('"')[0]),
          condition: $('.elevation.lower strong', html).text(),
        },
      },
      snowfall: {
        today: eval($('._report_content .today .bluePill', html).text().split('"')[0]),
        
        historical: {

        },
        predicted: {
        },
      },
      runs:{
        open: eval($('p:contains("Runs Open")', html).siblings(".pie_chart_item").text().split(" ")[0]),
        total: eval($('p:contains("Runs Open")', html).siblings(".pie_chart_item").text().split(" ")[2]),
      },
      terrain:{
        open: eval($('p:contains("Lifts Open")', html).siblings(".pie_chart_item").text().split(" ")[0]),
        total: eval($('p:contains("Lifts Open")', html).siblings(".pie_chart_item").text().split(" ")[2]),
      },
      };

      //create a list of dates for snowfall
    var dateList= [];
    //dates
    $('._report_content .time span', html).each(function(i, elem){
      dateList.push([$(elem).text()]);
    });
    //snowfalls
    $('._report_content .predicted_snowfall .bluePill', html).each(function(i, elem){
      dateList[i].push(eval($(elem).text().split('"')[0]));
    });

    skiInfo.snowfall.historical=dateList.slice(0,dateList.length-3);
    skiInfo.snowfall.predicted=dateList.slice(-3);


    return skiInfo;
  })
  .catch(function(err) {
  });
};


module.exports = skiData;