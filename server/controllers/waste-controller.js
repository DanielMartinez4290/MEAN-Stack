var Waste = require('../datasets/wastes');
module.exports.postWaste = function (req, res){
  //console.log(req);
  console.log(req.body);
  

    var waste = new Waste({user: req.body.user,userId: req.body.userId,content:req.body.content});
    waste.save();
    var requestedWastes = [];
       //console.log(req.body.following);
     for (var key in req.body.following) {
        requestedWastes.push({userId: req.body.following[key].userId});
      }
      console.log("space");
      console.log(requestedWastes);
      

      setTimeout(function(){ 
          Waste
        .find({$or: requestedWastes})
        .populate('userId')
        .sort({date: -1})
        .exec(function (err, wastes) {

          if (err){
                res.error(err);
          } else {
            res.json(wastes);
          }
          
        });
      }, 1000);
    
}

module.exports.getWastes = function (req, res){
	
     console.log("returning user wastes");
  	 var requestedWastes = [];
       //console.log(req.body.following);
  	 for (var key in req.body.following) {
        requestedWastes.push({userId: req.body.following[key].userId});
      }
      console.log("space");
      console.log(requestedWastes);
      

      Waste
      .find({$or: requestedWastes})
      .populate('userId')
      .sort({date: -1})
      .exec(function (err, wastes) {

        if (err){
              res.error(err);
        } else {
          res.json(wastes);
        }
        
      });


}

module.exports.getUserWastes = function(req,res){
    Waste.find({ userId: req.params.id })
          .sort({date: -1})
          .exec(function(err, allWastes){
        if (err){
            res.error(err)
        } else {
            res.json(allWastes);
        }
    })
}