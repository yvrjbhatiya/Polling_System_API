require('dotenv').config();

// modules
const express = require('express');
const morgan = require('morgan');


// importing database connection file
const db = require('./config/mongoose');


// starting a new express application
const app = express();


// port on which server will listen
const port = process.env.PORT || 8000;


// middleware

// morgan() to handle logs
app.use(morgan('dev'));

// express.urlencoded() parses incoming requests with urlencoded payloads
app.use(express.urlencoded({extended: false}));

// express.json() parses incoming requests with JSON payloads
app.use(express.json());


// handling routes
app.use('/', require('./routes'));



// handle incorrect routes
app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});


// binds and listens for connections on the specified host and port
app.listen(port, (err) => {
    if(err){
        console.log("There is an error in starting the server.", err);
        return;
    }
    console.log("Server is running on the port ", port);
});