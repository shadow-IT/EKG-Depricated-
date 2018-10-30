const mongodb = require('mongodb');
const config = require('./db');
const client = mongodb.MongoClient;

client.connect(config.DB, function(err, db) {
    if(err) {
        console.log('database is not connected')
    }
    else {
        console.log('connected!!')
    }
});

const mongoose = require('mongoose');
mongoose.connect('mongodb://mongo/test');

/*
var kittySchema = new mongoose.Schema({
  name: String
});

kittySchema.methods.speak = function () {
  var greeting = this.name
    ? "Meow name is " + this.name
    : "I don't have a name";
  console.log(greeting);
}

var Kitten = mongoose.model('Kitten', kittySchema);

var fluffy = new Kitten({ name: 'fluffy' });
fluffy.speak(); // "Meow name is fluffy"
*/


exports.set = function(serviceName, serviceUrl, callback) {
	callback({call:'set'})
}

exports.size = function(callback) {
	callback({call: 'size'})
}

exports.get = function(serviceName, callback) {
	callback({call: 'get'})
}

exports.get = async function(serviceName, callback) {
	client.get(serviceName, function (error, result) {
		console.log('client.get,', serviceName)
		if (error) {
			console.log(error);
			throw error;
		}
		console.log('GET result ->' + result);
		callback(result)
	});
}
