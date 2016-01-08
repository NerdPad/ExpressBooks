/*global console */
var express = require('express'),
    mongoose = require('mongoose'),
    bodyParses = require('body-parser'),
    us = require('underscore');

// Database
mongoose.connect('mongodb://localhost/bookAPI');

// Models
var Book = require('./models/bookModel');

// Init App
var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParses.urlencoded({
    extended: true
}));
app.use(bodyParses.json());

// Routes
var bookRouter = require('./routes/book')(Book);
var authorRouter = require('./routes/author')

app.use('/api/books', bookRouter);
app.use('/api/author', authorRouter);

app.get('/', function(req, res) {
    res.send('Welcome to my API!');
});

app.listen(port, function() {
    console.log('Gulp is running my app on port ' + port);
});

module.exports = app;
