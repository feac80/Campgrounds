const express     = require("express"),
      app         = express(),
      bodyParser  = require("body-parser"),
      mongoose    = require("mongoose"),
      flash       = require ("connect-flash"),
      passport    = require("passport"),
      LocalStrategy = require("passport-local"),
      methodOverride = require("method-override"),
      Campground  = require("./models/campground"),
      Comment     = require("./models/comment"),
      seedDB      = require("./seedDB"),
      User        = require("./models/users.js");
      
const campgroundRoute  = require("./routes/campgrounds"),
      commentRoute     = require("./routes/comments"),
      indexRoute       =  require("./routes/index");
   
    
//App setting
mongoose.connect("mongodb://localhost:27017/yelp-camp_v10",{ useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
// declare a middleware to pass the current user to all the ejs pages 
// Passport configuration
app.use(require("express-session")({
    secret:"I have to make it",
    resave:false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(methodOverride('_method'));
app.use(flash());
//seedDB(); //seed the db

//to make currentUser available in all templates
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

app.get("/", function(req, res){
  
      res.render("landingpage");
});

app.use("/campgrounds",  campgroundRoute);
app.use("/campgrounds/:id/comments", commentRoute);
app.use("/", indexRoute);


app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The Yelp camp server is up and running"); 
});
