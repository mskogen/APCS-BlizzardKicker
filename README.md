# APCS-BlizzardKicker
Team ApplePeelerCorerSlicer

## The issue: 
During winter in Colorado, one of the biggest decisions people are forced to make on a daily basis is deciding which ski resort would be the most fun to go to on any given day. Snow conditions, driving times, weather, ski pass availability, and other factors can make this extremely complicated.

## Problem Statement:
Team Apple Peeler Corer Slicer (APCS) will create a web app product that will make all its users’ ski trip experiences better in ways that specifically tailor to each user’s preferences.

## How to Run the Server and Open Blizzard Kicker
1. Install node.js and mongodb
2. launch your mongodb server on the default port
3. `cd` into APCS-BlizzardKicker in your terminal and type `npm run watch`
4. go to http://localhost:3000 in your browser

## File Structure
APCS-BlizzardKicker/
├── app.js
├── BlizzardKicker Demo Movie.zip
├── docker-compose.yml
├── Dockerfile
├── homepage.html
├── jenkins
│   └── scripts
├── Jenkinsfile
├── layouts
│   └── layout.pug
├── map.js
├── models
│   ├── resorts.js
│   └── users.js
├── node_modules
│   ├── ...
├── package.json
├── package-lock.json
├── README.md
├── routes
│   ├── cave.js
│   ├── datapull.js
│   ├── index.js
│   ├── learn_more.js
│   ├── login.js
│   ├── register.js
│   ├── userPrefs.js
│   ├── viewData.js
│   └── viewSkiData.js
├── Scraping
│   └── skiDataScraper.js
├── start.js
├── styles
│   └── css
├── test.txt
├── users.htpasswd
└── views
    ├── cave.pug
    ├── form.pug
    ├── index.pug
    ├── learn_more.pug
    ├── login_error.pug
    ├── login.pug
    ├── prefs.pug
    ├── profile.pug
    ├── register.pug
    ├── reg.pug
    ├── status_API.pug
    ├── viewData.pug
    └── viewSkiData.pug

## Additional Notes

# Mac Instructions
1. Run `brew install mongodb`
2. `brew install node`
3. cd into your APCS-BlizzardKicker
4. `brew services start mongodb`
5. `npm run watch`
6. Go to http://localhost:3000

# Docker is an additional way to run!
It allows you to run everything on any computer without running mongo or node

# Docker Instructions
1. Download and install docker https://store.docker.com/search?offering=community&type=edition for your specific device
2. `cd` into your APCS-BlizzardKicker folder
3. `docker-compose up -d --build`
4. Whenever you make changes run `docker-compose up -d --build` again to see them update
5. To stop the service run `docker-compose down`

# To run with docker, set env to 	DATABASE=mongodb://mongo:27017/BlizzardKickerDev
# to run locally, set .env to		DATABASE=mongodb://localhost:27017/BlizzardKickerDev

