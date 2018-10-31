var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var bodyParser = require('body-parser')
let history = require('./history')

const PORT = 3001

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
	extended: true
})); 

app.get('/', function(req, res){
	// TODO
	res.send('hello History!');
});

app.get('/health', function(req, res) {
	res.sendStatus(200)
})

app.get('/api', function(req, res) {
	// TODO
	res.sendStatus(200)
})

app.get('/api/:serviceName', function(req, res) {
	// TODO
	res.sendStatus(200)
})

app.post('/api', function(req, res) {
	const serviceName = req.body.serviceName
	const serviceResponse = req.body.serviceResponse
	console.log('Recieved history information for',serviceName,'with response',serviceResponse)
	// TODO save sub response to history and respond with success
	res.sendStatus(200)
})

console.log('Listening on port:',PORT)
app.listen(PORT);
