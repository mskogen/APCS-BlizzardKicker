// Database schema for user data
// combine usernames and preferences into single schema for ease

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  resort_id_list: { // keep as list for now - can always return string name
    type: [Number],
  },
  skill_level: {
    type: Number, // scale 1-10?
  },
  preferred_temperature: {
    type: Number, // also a number.. calc as num degrees off from ideal
  },
  preferred_snowtype: {
    type: String, // string must be from a set only. Could turn string into list of ints?
  }
});

/*
//authenticate input against database
UserSchema.statics.authenticate = function (email, password, callback) {
  User.findOne({ email: email })
    .exec(function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          return callback(null, user);
        } else {
          return callback();
        }
      })
    });
}
*/
//authenticate input against database
UserSchema.statics.authenticate = function (email, password, callback) {
  User.findOne({ email: email, password:password })
    .exec(function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }
      return callback(null, user);
    });
}

// authenticate input against database
// UserSchema.statics.authenticate = function (email, password, callback) {
//   console.log(email, password);
//   User.findOne({ email: email, password: password})
//     .exec(function (err, user) {
//       if (user) {
//         return callback(null, user);
//       } else {
//         var err = new Error('User not found.');
//         err.status = 401;
//         return callback(err, null);
//       }
//     });
// }

/*
// hashing a password before saving it to the database
UserSchema.pre('save', function (next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});
*/

var User = mongoose.model('User', UserSchema);
module.exports = User;
