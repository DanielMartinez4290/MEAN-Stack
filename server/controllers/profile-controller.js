var User = require('../datasets/users');
var fs = require('fs-extra');
var path = require('path');

module.exports.updatePhoto = function (req, res){
    var file = req.files.file;
    //console.log(req.files);
    console.log("spaccceeeee");
    console.log(req.files.file);
    var userId = req.body.userId;
    
    console.log("User " + userId + " is submitting " + file);
    var uploadDate = new Date().toISOString();
    console.log(uploadDate);
   
    
    var tempPath = file.path;
    console.log("the temp path is " + tempPath);
    //var targetPath = path.join(__dirname, "../../../uploads/" + userId + uploadDate + file.name);
    var targetPath = path.join(__dirname, "../../uploads/" + userId + uploadDate + file.name);
    console.log("the target path is " + targetPath);
    var savePath = "/uploads/" + userId + uploadDate + file.name;
    console.log("the save path is " + savePath);
  

    //var savePath = "/uploads/" + userId;
    var is = fs.createReadStream(tempPath);
    var os = fs.createWriteStream(targetPath);

    if(is.pipe(os)) {
        fs.unlink(tempPath, function (err) { //To unlink the file from temp path after copy
            if (err) {
                console.log(err);
            }
        });
        //return res.json(targetPath);
        User.findById(userId, function(err, userData){
                var user = userData;
                user.image = savePath;
                user.save(function(err){
                    if (err){
                        console.log("failed save")
                        res.json({status: 500})
                    } else {
                        console.log("save successful");
                        res.json({image:user.image})
                    }
                })
            })
    }else
        return res.json('File not uploaded');
    
    
};

module.exports.updateUserInfo = function (req, res){
    console.log(req.body);
    var username = req.body.username;
    var bio = req.body.bio;
    var email = req.body.email;
    var userId = req.body.userId;
    console.log(typeof userId);
    //var userId = "57f09311461e4132653a9bec";
    //var o_id = new ObjectId(userId);



    User.findById(userId, function (err, userData){
        console.log("found user");
        console.log(userData);
        var user = userData;
        user.username = username;
        user.bio = bio;
        user.email = email;
        
        user.save(function(err){
            if (err){
                console.log("fail");
                res.json({status: 500});
            } else {
                console.log("success");
                 res.json({email: email,
                      _id: userData._id,
                      username: username,
                      bio: bio,
                      following: userData.following,
                      followers: userData.followers})
            }
        })
    });
};
