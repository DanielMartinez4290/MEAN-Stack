var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

var app = express();
var authenticationController = require('./server/controllers/authentication-controller');
var profileController = require('./server/controllers/profile-controller');
var wasteController = require('./server/controllers/waste-controller');
var usersController = require('./server/controllers/users-controller');
var config = require('./config');

mongoose.connect(config.database);
mongoose.connection.on('error', function() {
  console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?'.red);
});


app.use(bodyParser.json());
app.use(multipartMiddleware);
app.use('/app', express.static(__dirname + "/app" ));
app.use('/node_modules', express.static(__dirname + "/node_modules"));
app.use('/uploads', express.static(__dirname + "/uploads"));
app.use('/tmp', express.static(__dirname + "/tmp"));



app.get('/', function(req, res){
    res.sendfile('index.html');
});


//Authentication
app.post('/api/user/signup', authenticationController.signup);
app.post('/api/user/login', authenticationController.login);

//Profile
app.post('/api/profile/editPhoto', multipartMiddleware, profileController.updatePhoto);
app.post('/api/profile/updateUserInfo', profileController.updateUserInfo);

//Waste
app.post('/api/waste/post', wasteController.postWaste);
app.post('/api/waste/get', wasteController.getWastes);
app.get('/api/waste/getUserWastes/:id', wasteController.getUserWastes);

//User
app.get('/api/users/getUserInfo/:id', usersController.getUserInfo);
app.get('/api/users/get', usersController.getUsers);
app.post('/api/users/follow', usersController.followUser);



app.listen(process.env.PORT || 3000);
console.log("Listening on Port 3000");