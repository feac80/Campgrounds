const express = require("express"),
      router   = express.Router(),
      passport  = require("passport"),
      User = require("../models/users");

//root route
router.get("/", function(req, res){
  
  res.render("landingpage");
});

//Show the register form
router.get("/register", function (req, res){
    res.render("register",{page: 'register'}); 
});

// handling the form submitted and will sign up the user
router.post("/register", function(req,res){
    const newUser= new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if (err){
         // req.flash("error", err.message); 
          return res.render("register", {error:err.message});
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to the Yelp Camp " + user.username); 
            res.redirect("/campgrounds");
        });
    });
});
// show the login form
router.get("/login", function(req, res){
    
   res.render("login",{page: 'login'}); 
});
// check if the user is in db and redirect to /campgrounds or login
router.post("/login", passport.authenticate("local", {
    successRedirect:"/campgrounds",
    failureRedirect:"/login",
    failureFlash: true
}), function(req, res){
    
   
});
//log out
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "You are logged out");
    res.redirect("/campgrounds");
});

//never used function message
// function isLoggedIn(req, res, next){
//     if(req.isAuthenticated()){
//         return next();
//     }
//     res.redirect("/login");
// }
module.exports= router;