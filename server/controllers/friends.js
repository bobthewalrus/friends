var mongoose = require('mongoose');

var Friend = mongoose.model('Friend');

module.exports = (function(){
    return {
        index: function(req, res){
            Friend.find({}, function(err, results){
                if(err){
                    res.json(err);
                }else{
                    res.json(results);
                }
            })
        },
        create: function(req,res){
            var new_friend = new Friend(req.body);
            new_friend.save(function(err, results){
                if(err){
                    res.json(err);
                }else{
                    res.json(results);
                }
            })
        },
        show: function(req, res){
            id=req.params.id

            Friend.findOne({_id:id}, function(err, results){
                if(err){
                    res.json(err);
                }else{
                    res.json(results);
                }
            })
        },
        edit: function(req, res){
            id = req.params.id;
            Friend.findOne({_id:id}, function(err, results){
                if(err){
                    res.json(err);

                }else{
                    res.json(results);
                }
            })
        },
        update: function(req, res){
            Friend.findOne({_id: req.params.id}, function(err, data){
                for (var i in req.body){
                    if (req.body[i] != data[i]){
                        data[i] = req.body[i];
                    }
                }
                data.save(function(err, data){
                    if(err){
                        res.json(err);

                    }else{
                        res.json(data);
                    }
                })
            })
        },
        delete: function(req, res){
            console.log(req.params.id);
            Friend.findOne({_id: req.params.id}, function(err, data){
                if(err){
                    console.log(err);
                    res.json(err);
                } else {
                    Friend.remove(data, function(error, datum){
                        if(error){
                            console.log(error);
                            res.json(error);
                        }else {
                            console.log(datum);
                            res.json(datum);
                        }
                    })
                }
            })
        }

    }
})();
