// Database schema for user data
// combine usernames and preferences into single schema for ease

var mongoose = require('mongoose');

var bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;

var uniqueValidator = require('mongoose-unique-validator');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  username:{
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  resorts: { // keep as list for now - can always return string name
    type: [String],
  },
  skill_level: {
    type: Number, // scale 1-10?
  },
  preferred_temperature: {
    type: String, // string (cold, hot, or n/a) //filled
  },
  preferred_snowType: {
    type: String, // string (whatever options there are from the api) //filled
  },
  preferred_travelTime: {
    type: String, // string, is travel time an issue/desire? //filled
  },
  pass: { //filled
    type: [String],
  }
});

UserSchema.plugin(uniqueValidator);

UserSchema.pre('save', function(next) {
    var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      if (err) return next(err);

      // hash the password using our new salt
      bcrypt.hash(user.password, salt, null, null, function(err, hash) {
          if (err) return next(err);

          // override the cleartext password with the hashed one
          user.password = hash;
          next();
      });
  });


});

//compare password entered to hashed password
UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

//Authenticate valid login
UserSchema.statics.auth = function(email, password, cb){
  //find user entered
  User.findOne({email: email}, function(err, user){
    //send any errors
    if (err) return cb(err);
    //if there's no user tell em
    else if (!user){
      var err = new Error('User not found');
      err.status = 401;
      return cb(err);
    }

    //Authenticate password if the user exits
    user.comparePassword(password, function(err, isMatch){

      //toss an error
      if (err) throw err;
      //if there's no match they entered the wrong password
      else if(!isMatch){
        var err = new Error('Incorrect Password');
        err.status = 401;
        return cb(err);
      }
      //Username and password are valid
      else{
        return cb(null, user);
      }
    });
  });
}

//load resorts into users
UserSchema.methods.loadResorts = function(){
  this.resorts=[];
  var ikonPass = ['Eldora Mountain Resort','Copper Mountain Resort','Aspen / Snowmass','Winter Park Resort'];
  var epicPass = ['Arapahoe Basin Ski Area','Vail','Breckenridge','Telluride','Crested Butte Mountain Resort','Beaver Creek','Keystone'];
  if(this.pass){
      this.pass.forEach((pass)=>{
        if(pass=="Epic"){
          this.resorts=this.resorts.concat(epicPass);
        }else if(pass=="Ikon"){
          this.resorts=this.resorts.concat(ikonPass);
        }
    });
  }
}

//update user's resort list
UserSchema.statics.updateResortList = function(email){
  User.findOne({email: email}).exec()
  .then((user)=>{
    user.loadResorts();
    return User.updateOne({email:email}, user).exec()
  })
  .then((info)=>{
    console.log(info);
  }).catch((err)=>{
    console.log(err);
  })
}


var User = mongoose.model('User', UserSchema);
module.exports = User;
