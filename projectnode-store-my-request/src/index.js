const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');

const menuItemRoute = require('./routes/menuItems');

const app = express();

//Settings

// set spacing
app.set('json spaces', 4);

// Middleware declaration
// use morgan's PUT, GET, DELETE, PUT
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// routes
app.use('/', menuItemRoute);


// static Files - template here later on


// Start Server

app.listen(1337, () => {
    console.log('Server running on port 1337...');
});


