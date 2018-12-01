const express = require('express');
const mongoose = require('mongoose'); //mongodb databases
const router = express.Router();
<<<<<<< Updated upstream
const Registration = mongoose.model('Registration'); //uses registration database
=======
const User = require('../models/Registration');
// const Registration = mongoose.model('Registration'); //uses registration database

const { body, validationResult } = require('express-validator/check'); //checks inputs for validity
const bodyParser = require('body-parser'); // duplicate??

// const express = require('express');
// const router = express.Router();

>>>>>>> Stashed changes

// GET route for reading data
router.get('/', function (req, res, next) {
	res.render('index');
});

<<<<<<< Updated upstream
//handles post requests
router.post('/', [ //allow input into form
	body('email')
		.isLength({ min: 1 })
		.withMessage('Please enter a name'),
	body('pass')
		.isLength({ min: 1 })
		.withMessage('Please enter a password'),
	],
	(req, res) => {
		const errors = validationResult(req);

		if (errors.isEmpty()){
			const registration = new Registration(req.body);
			registration.save()
				.then(() => { res.send('Thank you for your registration!'); })
				.catch(() => { res.send('Sorry something went wrong.');})
		}else{
			res.render('login', {
				errors: errors.array(),
				data: req.body,
				});
		}
});

module.exports = router;
=======

//POST route for updating data
router.post('/', function (req, res, next) {
  if (req.body.email && req.body.password) { // both required
    var userData = {
      email: req.body.email,
      password: req.body.password,
    }

    User.create(userData, function (error, user) {
      if (error) {
        return next(error);
      } else {
        req.session.userId = user._id;
        return res.redirect('/profile');
      }
    });

  } else if (req.body.email && req.body.password) {
    User.authenticate(req.body.email, req.body.password, function (error, user) {
      if (error || !user) {
        var err = new Error('Wrong email or password.');
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        return res.redirect('/profile');
      }
    });
  } else {
    var err = new Error('All fields required.');
    err.status = 400;
    return next(err);
  }
})

// GET route after registering
router.get('/profile', function (req, res, next) {
  User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          var err = new Error('Not authorized! Go back!');
          err.status = 400;
          return next(err);
        } else {
          return res.send('<h1>Name: </h1>' + user.username + '<h2>Mail: </h2>' + user.email + '<br><a type="button" href="/logout">Logout</a>')
        }
      }
    });
});

// GET for logout logout
router.get('/logout', function (req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});

module.exports = router;




//
// router.get('/', (req, res) => {
// 	res.render('index');
// });
//
// // find() returns a cursor (aka a pointer)
// // findOne() returns a document
// /* works in the shell -- however, to script, need to create connection using port ID
// > use BlizzardKickerDev
// switched to db BlizzardKickerDev
// > x = db.registrations.find({user:'kamiar.coffey@colorado.edu'});
// > print(x)
// DBQuery: BlizzardKickerDev.registrations -> { "user" : "kamiar.coffey@colorado.edu" }
// */
//
//
// //handles post requests
// router.post('/', [ //allow input into form
// 	body('email')
// 		.isLength({ min: 1 })
// 		.withMessage('Please enter a name'),
// 	body('pass')
// 		.isLength({ min: 1 })
// 		.withMessage('Please enter a password'),
// 	],
// 	(req, res) => {
// 		var errors = validationResult(req);
// 		var existingUser = false;
// 		var validPass = false;
// 		Registration.find({email:body.email})
// 			.then((registrations) => {
// 				existingUser = true;
// 				res.send('This email is alredy registred. Please login instead.');
// 			})
// 			.catch(() => {
// 				res.send('Mongo lookup error');
// 			})
//
// 		if ( (errors.isEmpty()) && (!existingUser) ) {
// 			var registration = new Registration(req.body);
// 			registration.save()
// 				.then(() => { res.send('Thank you for your registration!'); })
// 				.catch(() => { res.send('Sorry something went wrong.');})
// 		}else{
// 			res.render('login_error', {
// 				errors: errors.array(),
// 				data: req.body,
// 				});
// 		}
// });
//
// module.exports = router;
>>>>>>> Stashed changes
