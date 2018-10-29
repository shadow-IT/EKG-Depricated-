var redis = require('redis');
var client = redis.createClient('https://redis-subscription');
client.on('connect', function() {
	console.log('Redis client connected');
});

client.on('error', function (err) {
	console.log('Something went wrong ' + err);
});

exports.set = function(serviceName, serviceUrl) {
	return client.set(serviceName, serviceUrl, function (error, result) {
		console.log('client.set ' +serviceName+ ' url:' +serviceUrl)
		if (error) {
			console.log(error);
			throw error;
		}
		return result
	});
}

exports.size = function() {
	return client.dbsize(function(error, result) {
		console.log('result:',result)
		return {result}
	})
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
