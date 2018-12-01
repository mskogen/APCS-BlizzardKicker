const express = require('express');
const mongoose = require('mongoose'); //mongodb databases

const router = express.Router();

// router.get('/', (req, res) => {
// 	res.render('cave');
// });

var USERLIBRARY = USERLIBRARY || (function(){
    var _args = {}; // private

    return {
        init : function(Args) {
            _args = Args;
            // some other initialising
        },
        helloWorld : function() {
            alert('Hello World! -' + _args[0]);
        }
    };
}());

const domContainer = document.querySelector('#button_container');
ReactDOM.render(e(LikeButton), domContainer);

// module.exports = router;
