exports.init = function(app){
    app.get('/', index); // welcome page
}

index = function(req,res){
    res.render("index")
};

