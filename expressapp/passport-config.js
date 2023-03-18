var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');

passport.use('local',new LocalStrategy({
    usernameField:'email',
    passwordField:'password'
},
    function (username, password, done) {
        User.findOne({ email: username }).then((user)=>{
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.isValid(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);

        }).catch((err)=>{
            return done(err);
        })
    }
));


passport.serializeUser(function(user, done) {
    done(null, user._id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id).then((user)=>{
        done(undefined,user);
    }).catch((error)=>{
        done(error,undefined);
    })
  });