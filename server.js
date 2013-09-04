var express = require('express')

var app = express()

var server = require('http').createServer(app);

app.set('views', __dirname + '/views');
app.use(express.logger('dev'));


app.use(express.static(__dirname + '/app'));

app.listen(3000);
console.log('Listening on port 3000');