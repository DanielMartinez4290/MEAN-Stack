var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var userSchema = Schema({
  email: String,
  username: String,
  password: String,
  image: String,
  bio: String,
  following: [{userId: String}],
  followers: [{userId: String}],
  wastes : [{ type: Schema.Types.ObjectId, ref: 'Waste' }]
});

module.exports = mongoose.model('User', userSchema);

/*
var mongoose = require('mongoose');
module.exports = mongoose.model('User', {
    email: String,
    username: String,
    password: String,
    image: String,
    bio: String,
	following: [{userId: String}],
	followers: [{userId: String}]
});
*/