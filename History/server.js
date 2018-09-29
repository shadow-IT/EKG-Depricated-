var express = require('express');
var bodyParser = require('body-parser')
var redis = require('redis');
var swaggerJSDoc = require('swagger-jsdoc');

var app = express();
// swagger definition
var swaggerDefinition = {
	info: {
		title: 'Node Swagger API',
		version: '1.0.0',
		description: 'Demonstrating how to describe a RESTful API with Swagger',
	},
	host: 'localhost:3000',
	basePath: '/',
};
// options for the swagger docs
var options = {
	// import swaggerDefinitions
	swaggerDefinition: swaggerDefinition,
	// path to the API docs
	apis: ['./**/routes/*.js','routes.js'],// pass all in array 

};
// initialize swagger-jsdoc
var swaggerSpec = swaggerJSDoc(options);
var bodyParser = require('body-parser')
const PORT = 3001

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
	extended: true
})); 
var client = redis.createClient('https://redis');

client.on('connect', function() {
	console.log('Redis client connected');
});

client.on('error', function (err) {
	console.log('Something went wrong ' + err);
});

// serve swagger
app.get('/swagger.json', function(req, res) {
	res.setHeader('Content-Type', 'application/json');
	res.send(swaggerSpec);
});

/**
 * @swagger
 * /:
 *   get:
 *     tags:
 *       - users
 *     description: Returns the number of entries in the DB.
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An int of entries
 *         schema:
 *           $ref: '#/definitions/root'
 */
app.get('/', function(req, res){
	res.send('hello History!');
});

app.get('/api', function(req, res) {
	client.dbsize(function(error, result) {
		console.log('result:',result)
		res.send({result})
	})
})

app.get('/api/:serviceName', function(req, res) {
	const serviceName = req.params.serviceName
	client.get(serviceName, function (error, result) {
		console.log('client.get,', serviceName)
		if (error) {
			console.log(error);
			throw error;
		}
		console.log('GET result ->' + result);
		res.send(result)
	});
})

app.post('/api/:serviceName', function(req, res) {
	const serviceName = req.params.serviceName
	const url = req.body.url

	if(!serviceName || !url){
		res.statusCode = 400
		console.log('A param is missing')
		res.send('A required param is missing.')
		return
	}

	console.log(serviceName)
	client.set(serviceName, url, function (error, result) {
		console.log('client.set ',serviceName, ' url:', url)
		if (error) {
			console.log(error);
			throw error;
		}
		res.send(result)
	});
})

console.log('Listening on port:',PORT)
app.listen(PORT);
