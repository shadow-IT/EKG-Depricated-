var express = require('express');
var bodyParser = require('body-parser')
var redis = require('redis');
var bodyParser = require('body-parser')
const PORT = 3001

var app = express();
var client = redis.createClient('https://redis');

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
	extended: true
})); 

client.on('connect', function() {
	console.log('Redis client connected');
});

client.on('error', function (err) {
	console.log('Something went wrong ' + err);
});


app.get('/', function(req, res){
	res.send('hello History!');
});

/**
 * Designated to return the number of entries in the DB.
 * @name get/api
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
app.get('/api', function(req, res) {
	client.dbsize(function(error, result) {
		result = result - 2 // 2 is the number of entries in an empty Redis DB.
		console.log('DBSize result ->' +result)
		res.send({result})
	})
})

/**
 * Returns the value of the corresponding servicename
 * @name get/api/:serviceName
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
app.get('/api/:serviceName', function(req, res) {
	const serviceName = req.params.serviceName

	client.get(serviceName, function (error, result) {
		console.log('client.get,', serviceName)
		if (error) {
			console.log(error);
			throw error;
		}
		console.log('GET result ->' +result);

		res.send(result)
	});
})

/**
 * Returns the value of the corresponding servicename
 * @name post/api/:serviceName
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
app.post('/api/:serviceName', function(req, res) {
	const serviceName = req.params.serviceName
	const url = req.body.url

	if(!serviceName || !url){
		res.statusCode = 400
		res.send('A required param is missing.')
	} else { // Required params are provided
		client.set(serviceName, url, function (error, result) {
			console.log('GET ' +serviceName+ 'result ->' +url)
			if (error) {
				console.log(error);
				throw error;
			}

			res.send(result)
		});
	}
})

console.log('Listening on port:', PORT)
app.listen(PORT);
