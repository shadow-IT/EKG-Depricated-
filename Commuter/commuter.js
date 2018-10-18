const express = require('express')
const app = express()
const fetch = require('isomorphic-unfetch')

const port = 3004

app.get('/', function(req, res) {
	axios.get('https://httpstat.us/200')
		.then(result => {
			console.log('result=',result)
			res.send(result.data)
		}).catch(error => {
			console.log(error)
		});
})

app.get('/health' , function(req, res) {
	res.sendStatus(200)
})

app.listen(port, () => console.log(`Commuter listening on port ${port}!`))
