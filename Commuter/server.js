const express = require('express')
const app = express()
const fetch = require('isomorphic-unfetch')

const port = 3001

app.get('/', function(req, res) {

	res.send({result: 'pass'})
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))