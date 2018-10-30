// Kamiar

// Weather unlocked does not allow US ski resort data on free version
// username: APCS pw: blizzardkicker email: kamiar.junk@gmail.com
// https://developer.weatherunlocked.com/ user: APCS_Master pw: blizzardkicker email: kamiar.junk@gmail.com
// App name: APCS's App
// App ID: 854428ed
// Key: ea41306d613ed7bbcfcbb8ece0c62b06
// api.weatherunlocked.com/api/snowreport/999001?app_id={APP_ID}&app_key={APP_KEY}
// api/snowreport/{resort_id}?app_id={APP_ID}&app_key={APP_KEY}
// api.weatherunlocked.com/api/snowreport/999001?app_id={854428ed}&app_key={ea41306d613ed7bbcfcbb8ece0c62b06}



const mongoose = require('mongoose');

const APIdataSchema = new mongoose.Schema({
  snowDepth: {
    type: Float,
  },
  currentTempF: {
    type: Float,
  },
});

module.exports = mongoose.model('DataCacheAPI', APIdataSchema);
