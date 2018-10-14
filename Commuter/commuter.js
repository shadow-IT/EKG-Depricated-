const express = require('express')
const app = express()
const fetch = require('isomorphic-unfetch')

const port = 3004

app.get('/', function(req, res) {

	const health = {health: true}

	// TODO POST to history here, the result of the health check.

	res.send({
		message: 'Hello commuter!'
		// TODO return the result of the save
	})
})

app.listen(port, () => console.log(`Commuter listening on port ${port}!`))
