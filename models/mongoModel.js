// Uses Node.js mongoDB Driver
// to install: npm install mongodb --save

// var mongoClient = require('mongodb').MongoClient;

// // Connection string for running MongoDB locally


// var connection_string = 'mongodb://minniew:Yu35016188!@ds111496.mlab.com:11496/usersdb'

// console.log(process.env.password)
// if(process.env.password){
//     console.log('using secret password')
//     connection_string = `mongodb://minniew:${process.env.password}@ds111496.mlab.com:11496/usersdb`
// }

// console.log(connection_string)
// // Global variable of the connected database
// var mongoDB;

// Use connect method to connect to the MongoDB server
// mongoClient.connect(connection_string,function(err, db){
//     if (err) doError(err);
//     console.log('Connected to the MongoDB server at: ' + connection_string);
//     mongoDB = db; // make reference to db globally available
// });

/* CRUD Retrieve -> Mongo Find
@param {string} collection - The collection within the database
@param {object} data - The object to insert as a MongoDB document
@param {function} callback - Function to call upon insert completion

See API for more information on insert:
http://mongodb.github.io/node-mongodb-native/2.0/api/Collection.html#insertOne
*/

exports.create = function(data, callback){
    console.log('4. Start insert in MongoModel');
    mongoDB.collection('users').insertOne(
        data, // object to be inserted
        function(err, status) { // callback upon completion
            if (err) doError (err);
            console.log('5. Done with mongo insert operation in mongoModel')
            // use the callback function supplied by the controller to pass 
            // back true if successful else false
            var success = (status.result.n ==1? true : false);
            callback(success);
            console.log('6. Done with the insert operation callback in mongoModel');
        });
    console.log('7. Done with insert function in MongoModel');
}

// CRUD Retrieve -> Mongo Find 
// @param {string} collection - The collection within the database
// @param {object} query - The query object to search with
// @param {function} callback - Function to call upon completion

exports.retrieve = function(query, callback) {
    mongoDB.collection('users').find(query).toArray(function (err, docs){
        if (err) doError(err);
        // docs are MongoDB documents, returned as an array of Javascript objects
        // Use the callbacks provided by the controller to send backc the docs
        callback(docs);
    });
}

// CRUD Update -> Mongo updateMany
// @param {string} collection - The collection within the database
// @param {object} filter - The MongoDB filter
// @param {object} update - The update operation to perform
// @param {function} callback - Function to call upon completion

exports.update = function(filter, update, callback){
    console.log('4. start update in MongoModel')
    mongoDB
        .collection('users')
        .updateMany(
            filter,
            update,
            {upsert: true},

            function(err,status){
                if (err) doError(err);
                callback('Modified ' + status.modifiedCount + ' and added' + status.upsertedCount+ " documents");

            });
}

// CRUD Delete -> Mongo deleteOne 
exports.delete = function(filter, callback){
    mongoDB.collection('users').deleteOne(filter, function(err, status){
        if (err) doError(err);
        callback('Deleted one object from collection')
    })
}

var doError = function(e) {
    console.log('ERROR ' + e);
    throw new Error(e);
}