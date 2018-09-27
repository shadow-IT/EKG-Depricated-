var express = require('express');
var Api = require('./api/Api');
var app = express();


const PORT = 3001

app.get('/', function(req, res){
	res.send('hello History!');
});

app.get('/api', function(req, res) {
	res.send(Api())
})

console.log('Listening on port:',PORT)
app.listen(PORT);