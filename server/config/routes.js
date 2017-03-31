var friends = require('./../controllers/friends.js');


module.exports = function(app){
    app.get('/', function(req, res){
        res.render('index.html')
    })
    app.get('/friends', function(req, res){
        friends.index(req,res);
    })
    app.get('/showfriend/:id', function(req, res){
        friends.show(req, res);

    })
    app.post('/friend/new', function(req, res){
        friends.create(req,res);
    })
    app.get('/friend/edit/:id', function(req, res){
        friends.edit(req, res);
    })
    app.put('/updatefriend/:id', function(req, res){
        friends.update(req, res);
    })
    app.delete('/delete/:id', function(req, res){
        friends.delete(req, res);
    })
}
