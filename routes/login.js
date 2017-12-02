// authentication code gotten from: https://scotch.io/tutorials/easy-node-authentication-setup-and-local



exports.init = function(app, passport) {

    app.get('/login', getLogin);
    app.get('/signup', getSignup);

    app.get('/profile', isLoggedIn, function(req,res){
        res.render('main/profile', {
            user: req.user // get the user out of session and pass to template
        }
        );
    });
    
    app.get('/logout', function(req,res){
        req.logout();
        res.redirect('/');
    });


    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/',
        failureRedirect : '/login', //redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

}


getLogin = function(req,res) {
    // render the page and pass in any flash data if it exists
    res.render('main/login', {message: req.flash('loginMessage')});
}

getSignup = function(req,res) {
    // render the page and pass in any flash data if it exists
    res.render('main/signup', {message: req.flash('signupMessage')});
}



function isLoggedIn(req, res, next) {
    console.log('checking log in')
    // if user is authenticated in the session, carry on
    if(req.isAuthenticated()){
        console.log('successfully authenticated')
        return next;
    }

    // if user is not authenticated in the session, redirect to homepage
    res.redirect('/')
}
