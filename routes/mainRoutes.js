exports.init = function(app){
    app.get('/', isLoggedIn, getIndex); // welcome page

}

getIndex = function(req,res){
    console.log("session",req.session)
    res.render("index", {user: req.user})
};

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    else {
        res.render('guestHome')
    }
}