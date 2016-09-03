var User = require('../datasets/users');

module.exports.signup = function (req, res){
    var user = new User(req.body);
    user.save();
    
    //res.json(req.body);
    res.json(user);
}

module.exports.login = function (req, res){
    
    User.find(req.body, function (err, results){
        
        if (results.length===0){
            //console.log("Wrong Login Info");
            res.json({error:"Wrong Login Info"});
        }
        
        else if (results && results.length === 1){
            var userData= results[0];
            res.json({email: req.body.email,
                      _id: userData._id,
                      username: userData.username,
                      image: userData.image,
					  following: userData.following,
					  followers: userData.followers});
        }
    })
}