// include DB model for application
var mongoModel = require('../models/mongoModel.js');



// Define routes for this controller
exports.init = function(app) {
   
    // hardcoded collection, eg collection = users
    app.put('/users', doCreate); // CRUD create
    app.post('/users', doUpdate); // CRUD update
    app.get('/users', doRetrieve); // CRUD retrieve
    // The CRUD delete path is up to you to define
    app.delete('/users', doDelete);
}

// No path: display instructions for use


// CRUD Create
// Take the object defined in the request body and do the Create operation in mongoModel

doCreate = function (req,res) {
    console.log('1. Starting doCreate in dbRoutes');
    // First check if req.body has something to create
    // Object.keys(req.body).length is a quick way to count the number of properties in the req.body object
    if (Object.keys(req.body).length == 0){
        res.render('message', {title: 'Mongo Demo', obj: "No create message body found"});
        return;
    }

    mongoModel.create(req.body, 
        function(result){
            // result equal to true means request was successful
            var success = (result ? "Create successful" : "Create unsuccesful");
            res.render('message', {title: 'Mongo Demo', obj: success});
        console.log('2. Done with callback in dbRoutes create');
        });
    console.log('3. Done with doCreate in dbRoutes');
}

doRetrieve = function (req,res) {
    console.log(req.query)
    mongoModel.retrieve(
        req.query,
            function (modelData) {
                if (modelData.length) {
                    res.render('results', {title: 'Mongo Demo', obj: modelData});
                }
                else {
                    var message = "No documents with " + JSON.stringify(req.query) + " in collection " + req.params.collection + " found.";
                    res.render(message, {title: "Mongo Demo", obj: message});
                }
            });
}

doUpdate = function (req,res) {
    console.log('1. Starting doUpdate in dbRoutes');
    // if there is no filter to select documents to update, select all documents
    var filter = req.body.find ? JSON.parse(req.body.find) : {};
    // if there is no update operation defined, render an error page
    if (!req.body.update) {
        res.render('message', {title:"Mongo Demo", obj: "No update operation defined"});
        return;
        /*
        Call the model Update with:
            - The collection to update
            - The filter to select what documents to update
            - The update operation
                E.g. the request body string:
                find = {"name":"pear"}&update={"$set":{"leaves":"green"}} becomes
                filter = {"name":"pear"} and update={"$set":{"leaves":"green"}}
            - As discussed above, an anonymous callback function to be called by the model once the update has been successful
        */
    }
    var update = JSON.parse(req.body.update)
    mongoModel.update(filter, update,
        function (status){
            res.render('message', {title: "Mongo Demo", obj: status})
        console.log('2. Done with callback in dbRoutes update');   
        });



}

doDelete = function (req,res) {
    var filter = req.body.find ? JSON.parse(req.body.find) : {};
    
    console.log("req.body",req.body)
    

    mongoModel.delete(filter, function (status){
        console.log("status",status)
        res.render('message', {title : 'Mongo Demo', obj: status})
    })

    // if (!req.body.delete) {
    //     res.render('message', {title:"Mongo Demo", obj: "No delete operation defined"});
        
    // }


}
