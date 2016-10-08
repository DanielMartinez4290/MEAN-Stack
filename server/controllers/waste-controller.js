var Waste = require('../datasets/wastes');
module.exports.postWaste = function (req, res){
    var waste = new Waste(req.body);
    waste.save();
    //res.json("passed");
    
    Waste.find({})
        .sort({date: -1}).exec(function(err, allWastes){
        if (err){
            res.error(err);
        } else {
            res.json(allWastes);
        }
    });
    
}

module.exports.getWastes = function (req, res){
	
     console.log("returning user wastes");
  	 var requestedWastes = [];
       
  	 for (var key in req.body.following) {
        requestedWastes.push({userId: req.body.following[key]});
      }

      console.log(requestedWastes);
      console.log("space");

      var wasteImages = Waste.aggregate([{
        $lookup:{from: "user",localField: "userId",foreignField: "_id",as: "waste_images"}}
      ],function(err,result){
        //console.log(err);
        console.log(result);
      });

    
      //console.log(wasteImages);

/*
 	Waste.find({$or: requestedWastes})
		.sort({date: -1})
		.exec(function(err, allWastes){
						if (err){
							res.error(err)
						} else {
							res.json(allWastes);
						}
						})
*/

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