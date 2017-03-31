var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FriendSchema = new Schema({
    firstname: {type:String, required: true},
    lastname: {type: String, required: true},
    dob: {type: Date, required: true},
})

mongoose.model('Friend', FriendSchema);
