const express = require('express')
const app = express()

var fs = require('fs');
var bodyParser = require('body-parser');

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(3000, () => console.log('Listening on port 3000!'))