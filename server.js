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


// connecting to MongoDB using MongoDB client method
const MongoClient = require('mongodb').MongoClient;

let connectionString = 'mongodb+srv://starwars:8Jzi35na2qa9myZe@cluster0.jwijhwf.mongodb.net/?retryWrites=true&w=majority';

// non promise way to connect to DB and catch error

// MongoClient.connect(connectionString, (err, client) => {
//     if (err) return console.error(err);
//     console.log('connected to database');
// })

// promise way of connecting to DB and catching error
MongoClient.connect(connectionString)
    .then(client => {
        console.log('connected to DB');

        // connect to the actual DB and not the default one
        const db = client.db('star-war-quotes');

        // sample methods
        // app.use(/* ... */)
        // app.get(/* ... */)
        // app.post(/* ... */)
        // app.listen(/* ... */)

        // create a new collection
        // remember DB is a room; collection is like boxes inside that room

        const allQuotes = db.collection('quotes');


        // ***********************************************************
        // CRUD DB handlers

        app.post('/quotes', (req, res) => {
            // console.log(`Response received on '/quotes'`)
            // console.log('.');
            // console.log(req.body)

            // sending stuff to the DB
            allQuotes.insertOne(req.body)
                .then(result => {
                    console.log(result);
                    res.redirect('/')
                }).catch(err => console.error(err));
        })

        // reading stuff from DB 
        // using find method to read everything from the DB and converting data to an array
        // by default the find method returns a 'cursor' object that contains a lot of additional stuff

        app.get('/', (req, res) => {
            db.collection('quotes').find().toArray()
                .then(result => console.log(result))
                .catch(err => console.error(err));


            res.sendFile(__dirname + '/index.html')
        })


    }).catch(err => console.error(err));

// *************************************************************
// CRUD handlers
// listen on PORT for http requests
app.listen(3001, () => console.log(`listening on port 3000`));

// GET request handling
// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html')
// })

// POST request handling
// app.post('/quotes', (req, res) => {
//     // console.log(`Response received on '/quotes'`)
//     // console.log('.');
//     // console.log(req.body)

//     // sending stuff to the DB
//     allQuotes.insertOne(req.body)
//         .then(result => {
//             console.log(result);
//         }).catch(err => console.error(err));
// })