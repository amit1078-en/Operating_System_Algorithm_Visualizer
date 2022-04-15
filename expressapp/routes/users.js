var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

router.post('/register', function (req, res, next) {
  addToDB(req, res);
});


async function addToDB(req, res) {

  var user = new User({
    email: req.body.email,
    
    username: req.body.username,
    password: User.hashPassword(req.body.password),
    creation_dt: Date.now()
  });

  try {
    doc = await user.save();
    return res.status(201).json(doc);
  }
  catch (err) {
    return res.status(501).json(err);
  }
}


router.post('/login',function(req,res,next){
  
  passport.authenticate('local', function(err, user, info) {
    if (err) { return res.status(501).json(err); }
    if (!user) { return res.status(501).json(info); }
    req.logIn(user, function(err) {
      if (err) { return res.status(501).json(err); }
      return res.status(200).json({message:'Login Success'});
    });
  })(req, res, next);
});

router.get('/user',isValidUser,function(req,res,next){
  return res.status(200).json(req.user);
});

router.get('/logout',isValidUser, function(req,res,next){
  req.logout();
  return res.status(200).json({message:'Logout Success'});
})
router.delete('/delete',isValidUser,function(req,res,next){
  // return res.status(401).json({message:'Unauthorized Request'});
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("MeanStackDb");
    var temp = req.user.username;
    var myquery = { username: temp };
    dbo.collection("users").deleteOne(myquery, function(err, obj) {
      db.close();
      return res.status(401).json({message:'Unauthorized Request'});

      
    });
  });
})
function isValidUser(req,res,next){
  if(req.isAuthenticated()) next();
  else return res.status(401).json({message:'Unauthorized Request'});
}

module.exports = router;