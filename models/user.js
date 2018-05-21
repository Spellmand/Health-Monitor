var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// User Schema
var UserSchema = mongoose.Schema({
	password: {
		type: String
	},
	name: {
		type: String,
		index: true
	},
	indicators: []
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
};

module.exports.getUserByUsername = function(name, callback){
	var query = {name: name};
	User.findOne(query, callback);
};

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
};

module.exports.writeIndicators = function(name, onceIndicatorData, callback) {
	var user = {name: name};
	var setNewData = {$push:{'indicators':onceIndicatorData}};
	User.update(user, setNewData, callback);
};

module.exports.getUserData = {
	
};

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
};
