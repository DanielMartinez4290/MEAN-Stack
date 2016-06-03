var Users = require('../datasets/users');

module.exports.getUserInfo = function(req, res){
	//console.log(req.params.id);

	Users.findById(req.params.id, function(err, userInfo){
		if (err){
			res.error(err);
		} else {
			res.json(userInfo);
		}
	})
}

module.exports.getUsers = function(req, res){
	Users.find({}, function(err, usersData){
		if (err){
			res.error(err);
		} else {
			res.json(usersData);
		}
	})
}

module.exports.followUser = function(req, res){
	console.log("follow user tripped");
	
	var userId = req.body.userId,
		wasterId = req.body.wasterId;
	
	Users.findById(wasterId, function(err, waster){
		waster.followers.push({userId: userId});
		waster.save();
	})
	
	Users.findById(userId, function(err, follower){
		follower.following.push({userId: wasterId});
		follower.save();
	})
}