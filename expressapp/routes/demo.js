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