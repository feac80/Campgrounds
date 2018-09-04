const express = require("express"),
      router   = express.Router(),
      methodOverride = require("method-override"),
      Campground = require("../models/campground"),
      middleware = require("../middleware");

router.use(methodOverride('_method'));

//INDEX route. show all the campgrounds
router.get("/",function(req, res){
    console.log(req.user); 
       // get the values from th db
    Campground.find({},function(err, allCampgrounds){
        if (err){
            console.log(err);
        }else{
            //console.log(app.get('views')); 
           res.render("campgrounds/index", {camps:allCampgrounds, currentUser:req.user, page: 'campgrounds'}); 
        }
    });  
 });
//show the form to add a campground
 router.get("/new", middleware.isLoggedIn, function(req, res){
     res.render("campgrounds/new");
 });

//CREATE  a new campground
 router.post("/", function(req, res){
const newCamp = {

    name:req.body.campground.name,
    image:req.body.campground.image,
    descriptions:req.body.campground.descriptions,
        author:{
         id: req.user._id,
         username: req.user.username,
    }
};  

    Campground.create(newCamp, function(err, newCampground){
      if (err){
          req.flash("error", err.message);
          res.redirect("back");
          
      }else{
    //campGrounds.push(newCampground);
    //console.log(newCampground);
    req.flash("success", "The campground has been added");
    res.redirect("/campgrounds");       
      } 
    });
 });
 
// show the campground
router.get("/:id", function(req, res){
// find the campground with the provided id
// send this values to the template
    Campground.findById(req.params.id).populate("comments").exec( function (err, foundCampground){
        if (err || !foundCampground){
            req.flash("error", "Campground not found." +" Error Message:" +err.message);
            res.redirect("back");
            
        }else{
           // console.log(foundCampground);
          
          res.render("campgrounds/show", {campground:foundCampground});  
        }
     });
});


//show edit form to edit campsgrounds
router.get("/:id/edit", middleware.checkCampgroundOwnership,  function(req, res){
    // check if the user is looged in
    
    // check if the user own the camp ground
    
    // redirect to somewhere 
     Campground.findById(req.params.id, function(err, foundCampground){
            if (err || !foundCampground){
                req.flash("error", "Campground not found " + "Error Message:" +err.message);
                res.redirect("back");
             
            }else{
                res.render("campgrounds/edit", {campground:foundCampground});    
            }
        }); 
    
});
//update


router.put("/:id", middleware.checkCampgroundOwnership , function(req, res){
   Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
       if (err){
           console.log(err);
       }else{
           req.flash("success", "Succesfully updated campground");
           res.redirect("/campgrounds/" + req.params.id);
       }
   });
    
});

router.delete("/:id",middleware.checkCampgroundOwnership, function(req, res ){
   Campground.findByIdAndRemove(req.params.id, function(err){
       if (err){
           console.log(err);
       } else{
           req.flash("success", "Succesfully deleted campground");
           res.redirect("/campgrounds");
       }
   });
});






module.exports= router;