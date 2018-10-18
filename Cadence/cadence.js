const express = require('express')
const app = express()

const port = 3002

app.get('/', function(req, res) {

        res.send('Hello cadence!')
})

app.get('/health' , function(req, res) {
	res.sendStatus(200)
})

app.listen(port, () => console.log(`Cadence listening on port ${port}!`))
