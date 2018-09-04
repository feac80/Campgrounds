const express = require("express"),
      router   = express.Router({mergeParams:true}),
      Campground = require("../models/campground"),
      Comment =require("../models/comment"),
      middleware =require ("../middleware");
      
//Show the form to add a comment("/campgrounds/:id/comments")
router.get("/new", middleware.isLoggedIn, function (req, res){
    Campground.findById(req.params.id, function(err, foundcamp ){
        if (err){
            req.flash("error", "Campground not found");
            req.redirect("back");
        }else{
        res.render("comments/new", {campground: foundcamp} );   
        }
      
    });
    
});
// Add a comment ("/campgrounds/:id/comments")
router.post("/", middleware.isLoggedIn, function(req,res){
    
// search if the campground exist
Campground.findById(req.params.id, function(err, foundCamp){
                if (err){
                     req.flash("error", "Campground not found");
                     res.redirect("/campgrounds");
                }else{
                Comment.create(req.body.comment, function (err, newComment){
                    if (err){
                        
                        res.redirect("back");
                    }else{
                        newComment.author.id = req.user._id;
                        newComment.author.username = req.user.username;
                        newComment.save();
                        foundCamp.comments.push(newComment);
                        foundCamp.save(function(err, savedCamp){
                            if (err){
                                console.log(err);
                            } 
                            else{
                            req.flash("success", "Succesfully added comment");
                            res.redirect("/campgrounds/"+ savedCamp.id);   
                            }
                        });        
                }
            });
        }
    });
// add a new comment
//link the comment to the campground  and redirect  to show campground
});

// show the form to update the comment ("/campgrounds/:id/comments")
router.get("/:comment_id/edit", middleware.checkCommentOwnership,  function(req, res){
    Campground.findById(req.params.id, function(err, foundcampground){
       if (err || !foundcampground){
           req.flash("error", "Not Campground found");
           res.redirect("back");
       } else {
            Comment.findById(req.params.comment_id, function(err, foundComment){
                if (err || !foundComment){
                    req.flash("error", "Campground not found" + err.message);
                    res.redirect("back");
                }else {
            res.render("comments/edit",{campgroundId:req.params.id, comment:foundComment});          
                }
            }); 
       }
    });


});
//Update comments("/campgrounds/:id/comments")
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
      if (err || !updatedComment){
          req.flash("error", "Campground not found" + err.message);
          res.redirect("back");
      }else{
          req.flash("success", "Succesfully updated comment");
          res.redirect("/campgrounds/" + req.params.id);
      }  
  
    });
});

// Destroy Route delete comments("/campgrounds/:id/comments")
router.delete("/:comment_id",middleware.checkCommentOwnership,  function(req, res){
   
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if (err){
            req.flash("error", "Campground not found" + err.message);
            res.redirect("back");
        }else {
            req.flash("success", "Succesfully deleted comment");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});



module.exports= router;
