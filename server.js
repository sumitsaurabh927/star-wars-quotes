// using express
const express = require('express');
const app = express();

// using 'body-parser' to extract data sent in the html form element
const bodyParser = require('body-parser');

// ***************************************************
// always user bodyParser before CRUD handlers
// ***************************************************

// to test if node can run this file
console.log('may node be with you!');

// using body-parser middleware with express for tidying up req object
app.use(bodyParser.urlencoded({ extended: true }));

// *************************************************************
// CRUD handlers
// listen on PORT for http requests
app.listen(3000, () => console.log(`listening on port 3000`));

// GET request handling
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

// POST request handling
app.post('/quotes', (req, rest) => {
    console.log(`Response received on '/quotes'`)
    console.log('.');
    console.log(req.body)
})