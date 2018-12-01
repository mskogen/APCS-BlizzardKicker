const express = require('express');
const mongoose = require('mongoose'); //mongodb databases

const router = express.Router();


router.get('/', (req, res) => {
	res.render('cave');
});

// var USERLIBRARY = USERLIBRARY || (function(){
//     var _args = {}; // private
//
//     return {
//         init : function(Args) {
//             _args = Args;
//             // some other initialising
//         },
//         helloWorld : function() {
//             alert('Hello World! -' + _args[0]);
//         }
//     };
// }());

// const domContainer = document.querySelector('#button_container');
// ReactDOM.render(e(LikeButton), domContainer);

// class User {
//     constructor(username, password) {
//         this.username = username;
//         this.password = password;
// 				 this.skillLevel = null;
//         preferred_temperature = null;
//         preferred_snowtype = null;
//     }
//
//     setSkillLevel(scale1_10) {
//       this.skillLevel = scale1_10;
//     }
//     greeting() {
//         return `Welcome to Blizzard Kicker ${this.name}.`;
//     }
//
//     getUsername() {
//       return this.username;
//     }
//
//     getPassword() {
//       return this.password;
//     }
// }

const User = {
  username: null,
  password: null,
  skillLevel: null,
};

// var USERLIBRARY = USERLIBRARY || (function(){
//     var userData = { // private
//       username: null,
//       password: null,
//       skillLevel: null,
//     };
//
//     return {
//       setSkillLevel: function(Args) {
//           userData.skillLevel = Args;
//       },
//
//       greeting : function() {
//           alert('Welcome to Blizzard Kicker' + userData[0]);
//       }
//     };
// }
// ());

// 'use strict';
//
// const slider = React.createElement;

// var basic_slider = document.getElementById("myRange");
// var basic_output = document.getElementById("demo");
// basic_output.innerHTML = slider.value; // Display the default slider value
//
// // Update the current slider value (each time you drag the slider handle)
// slider.oninput = function() {
//     output.innerHTML = this.value;
//     User.skillLevel = this.value;

// class SkillSlider extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { level: null };
//   }
//
//   render() {
//     if (this.state) {
//       return this.state;
//     }
//   }






// const domContainer = document.querySelector('#skillSlider');
// ReactDOM.render(slider(SkillSlider), domContainer);


// router.get('/', (req, res) => {
// 	res.render('cave');
// });

module.exports = router;
