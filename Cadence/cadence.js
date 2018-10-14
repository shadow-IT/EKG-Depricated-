const express = require('express')
const app = express()

const port = 3002

app.get('/', function(req, res) {

        res.send('Hello cadence!')
})

app.listen(port, () => console.log(`Cadence listening on port ${port}!`))