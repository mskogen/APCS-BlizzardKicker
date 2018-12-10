const express = require('express');
const mongoose = require('mongoose'); //mongodb databases
const router = express.Router();
const User = require('../models/users');
const url = require('url');
const { body, validationResult } = require('express-validator/check'); //checks inputs for validity
const bodyParser = require('body-parser');

function registerUser(regEmail, regUsername, regPassword){
	router.get('/', (req, res) => {
	  data={currentUser:null};
	  if(currentUser = req.session.userId){
	    data.currentUser = currentUser;
	  }
	  res.render('register', {errCode:req.query.errCode, username:req.query.username,data});
	});

	router.post('/', function (req, res, next) {
	  if (regEmail && regUsername && regPassword) { // both filled, create new user
	    var userData = {
	      email: regEmail,
	      username: regUsername,
	      password: regPassword,
	    }
	      //console.log('user data constructed!');


	    User.create(userData, function (error, user) {
	      if (error) {
	        //url query for error handling
	        var query={
	          // 0 - username err, 1 - email err, 2 - unknown
	          "errCode" :2,
	          "username": null,
	        }

	        if(error.errors.username){
	          query.errCode=0;
	          query.username=regUsername;
	          //mess="Sorry, the username " + req.body.username +" is already taken";
	        }else if(error.errors.email){
	          query.errCode=1;
	        }
	        //Send back to register with the new query
	        res.redirect(url.format({
	          pathname: '/register',
	          query: query
	        }));
	        //if we're good send a console log
	      } else {
	          console.log('New User: ' +user.email+' created!');
	          req.session.userId = user.email;
	          data={currentUser:null};
	          if(currentUser = req.session.userId){
	            data.currentUser = currentUser;
	            return true;
	          }
	          //res.redirect('/cave');
	      }
	    });
	  }
	});
}

function testRegisterUser(){
	var testEmail = "Test.Email@Test.com";
	var testUsername = "TestUser";
	var testPassword = "Test@1234";

	var testReg = registerUser(testEmail, testUsername, testPassword);

	console.log('Testing new registration');

	if (testReg === true)
		return console.log('Passed.');

	console.log('Failed.');
}

testRegisterUser();