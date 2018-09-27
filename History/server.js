var express = require('express');
var app = express();

const PORT = 3001

app.get('/', function(req, res){
	res.send('hello History!');
});

console.log('Listening on port:',PORT)
app.listen(PORT);