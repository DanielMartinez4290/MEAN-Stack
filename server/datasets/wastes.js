var mongoose = require('mongoose')
  , Schema = mongoose.Schema;


 var wasteSchema = Schema({
  user: String,
  userId: { type: String, ref: 'User' },
  content: String,
  date: {type: Date, default: Date.now}
});

module.exports  = mongoose.model('Waste', wasteSchema);

/*
var mongoose = require('mongoose');
module.exports = mongoose.model('Waste', {
    user: String,
    userId: String,
    content: String,
    date: {type: Date, default: Date.now}
})
*/